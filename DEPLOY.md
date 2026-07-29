# Deploying CodeSimplify to AWS (Docker + Terraform + GitHub Actions, Free Tier)

**Architecture:** one `t3.micro` EC2 instance (Free Tier eligible in
`eu-north-1`) runs two containers via Docker Compose — `frontend`
(Next.js, published on port 80) and `backend` (Spring Boot, internal only —
the frontend proxies `/api/*` to it server-side, so it's never exposed to
the internet). Plain HTTP for now; TLS/domain is handled externally later
(e.g. Cloudflare in front of the instance's IP).

Images are **built by GitHub Actions**, not on the instance: a t3.micro only
has 1 GB RAM, and building this app locally on it (Next.js + Maven) took
30+ minutes and got worse as the app grew, because it swaps to disk under
memory pressure. GitHub's runners build both images in a couple of minutes
and push them to **ECR**; the instance's only job is to `docker compose
pull && up -d`, authenticated automatically via its IAM instance role (no
credentials stored on the box). See `.github/workflows/deploy.yml`.

## 0. Rotate your AWS credentials first

If you ever pasted an access key/secret anywhere outside your own terminal
(chat, screenshot, ticket, etc.), treat it as compromised: deactivate +
delete it in IAM → Users → your user → Security credentials, then create a
fresh one and run `aws configure` locally with it. Never paste keys into
chat or commit them anywhere.

## 1. One-time local setup

Create an EC2 key pair (for emergency SSH access only — day-to-day
management uses SSM):

```powershell
aws ec2 create-key-pair --region eu-north-1 --key-name codesimplify `
  --query "KeyMaterial" --output text > codesimplify.pem
```

Find your public IP, to restrict SSH access to just you:

```powershell
curl.exe -s https://checkip.amazonaws.com
```

```powershell
cd infra
copy terraform.tfvars.example terraform.tfvars
notepad terraform.tfvars   # fill in key_name, ssh_ingress_cidr
```

## 2. Provision AWS infrastructure with Terraform

```powershell
cd infra
terraform init
terraform plan    # review what will be created
terraform apply   # type "yes" to confirm
```

This creates: a security group (22 restricted to you, 80 open), the
EC2 instance + Elastic IP, an IAM instance role (SSM + ECR read-only), and
two ECR repositories (`codesimplify-frontend`, `codesimplify-backend`).
Nothing here has a fixed monthly cost as long as you stay within Free Tier
limits (see "Costs" below).

The instance's own boot script (`infra/templates/user_data.sh.tpl`)
installs Docker + git, adds a small swapfile, clones this repo to
`/opt/codesimplify`, writes an `.env` with the ECR registry URL, and runs
`redeploy.sh` — which logs in to ECR (via the instance's IAM role) and does
`docker compose -f docker-compose.prod.yml pull && up -d`. **The very
first boot will fail to find any images** until you've run the GitHub
Actions workflow at least once (see step 3) — that's expected.

Copy the outputs:

```powershell
terraform output
```

You'll see `site_url`, `instance_id`, `instance_public_ip`,
`ecr_frontend_repo`, and `ecr_backend_repo`.

## 3. Wire up GitHub Actions to build + deploy

Add these secrets in your GitHub repo (**Settings → Secrets and variables →
Actions**):

- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` — an IAM user with
  `AmazonEC2ContainerRegistryFullAccess` (push to ECR) and
  `AmazonSSMFullAccess` (or a scoped `ssm:SendCommand` /
  `ssm:GetCommandInvocation` policy) so the workflow can trigger the
  redeploy.
- `EC2_INSTANCE_ID` — the `instance_id` from `terraform output`.

Then push to `main` (or run the workflow manually from the Actions tab).
`.github/workflows/deploy.yml` builds both images, pushes them to ECR, and
triggers `redeploy.sh` on the instance over SSM — typically finishes in
2-4 minutes total, versus 30+ minutes building on the instance itself.

To watch progress or debug on the instance, SSM into it (no SSH key
needed):

```powershell
aws ssm start-session --target <instance_id>
sudo cat /var/log/cloud-init-output.log   # boot script log
cd /opt/codesimplify && docker compose logs -f
```

Every subsequent deploy just happens automatically on push to `main`. To
trigger one manually without a GitHub Actions run, you can still:

```powershell
./scripts/redeploy-remote.ps1 -InstanceIp <instance_public_ip> -KeyPath <path-to-codesimplify.pem>
```

which SSHes in and re-runs `cd /opt/codesimplify && sudo ./redeploy.sh`
(pulling whatever image is currently tagged `latest` in ECR).

## 4. Day-to-day operations

```powershell
# Interactive shell on the instance, no SSH/keys needed
aws ssm start-session --target <instance_id>

# Then on the instance:
cd /opt/codesimplify && docker compose ps
docker compose logs -f

# Or trigger a one-off command without an interactive session:
aws ssm send-command --instance-ids <instance_id> --document-name "AWS-RunShellScript" `
  --parameters 'commands=["cd /opt/codesimplify && docker compose ps"]'
```

## 5. Tearing everything down

```powershell
cd infra
terraform destroy
```

## Costs / staying in Free Tier

- **EC2 `t3.micro`**: 750 hrs/month free for 12 months — one instance
  running 24/7 uses ~720 hrs/month, so you're covered.
- **EBS**: 30 GB/month free; the root volume here is 30 GB.
- **Elastic IP**: free while attached to a *running* instance.
  `terraform destroy` releases it, which is the safe path when not in use
  (an idle/unattached EIP is billed hourly).
- **Data transfer**: 100 GB/month outbound free for 12 months.
- **ECR**: 500 MB-month of storage free for 12 months; the lifecycle policy
  keeps only the last 5 tags per repo so this shouldn't be exceeded. After
  the free tier, storage is ~$0.10/GB-month, negligible for a couple of
  small images.
- **GitHub Actions**: free for public repos; private repos get 2,000
  minutes/month free, and this build takes only a couple of minutes.
- After the 12-month Free Tier window, this setup costs roughly $7–9/month
  (one small EC2 instance + EIP), since ECS Fargate/Elastic Beanstalk were
  intentionally avoided.

## Adding your domain + HTTPS later (e.g. Cloudflare)

Point your domain at the `instance_public_ip` output (an `A` record), then
put it behind Cloudflare (or similar) for TLS termination — set Cloudflare's
SSL mode to "Flexible" so it talks plain HTTP to the origin (port 80),
matching this setup. No changes needed on the instance side for that.
