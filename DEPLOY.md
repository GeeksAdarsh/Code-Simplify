# Deploying CodeSimplify to AWS (Docker + Terraform, Free Tier)

**Architecture:** one `t3.micro` EC2 instance (Free Tier eligible in
`eu-north-1`) runs three containers via Docker Compose — `frontend`
(Next.js), `backend` (Spring Boot), and `caddy` (reverse proxy + automatic
HTTPS via Let's Encrypt, using a free `sslip.io` hostname derived from the
instance's Elastic IP since no domain is configured yet). Images live in
two ECR repos. GitHub Actions builds/pushes images and redeploys via SSM —
no long-lived AWS keys stored in GitHub (uses OIDC), no SSH key
distribution needed for day-to-day deploys.

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
notepad terraform.tfvars   # fill in key_name, ssh_ingress_cidr, acme_email, github_repo
```

## 2. Provision AWS infrastructure with Terraform

```powershell
cd infra
terraform init
terraform plan    # review what will be created
terraform apply   # type "yes" to confirm
```

This creates: a security group (22 restricted to you, 80/443 open), the
EC2 instance + Elastic IP, two ECR repos with a 5-image retention policy,
an IAM instance role (ECR pull + SSM), and a GitHub OIDC IAM role for
CI/CD. Nothing here has a fixed monthly cost as long as you stay within
Free Tier limits (see "Costs" below). The instance's own boot script
(`templates/user_data.sh.tpl`) installs Docker, adds a 1 GB swapfile
(the instance only has 1 GB RAM), writes the Caddyfile + compose file, and
starts the stack — but the images don't exist in ECR yet, so it'll be
crash-looping until step 3.

Copy the outputs:

```powershell
terraform output
```

You'll see `site_url`, `instance_id`, `ecr_frontend_url`, `ecr_backend_url`,
and `github_actions_role_arn`.

## 3. First image build & push

```powershell
cd ..
./scripts/deploy.ps1 -AwsRegion eu-north-1 -ProjectName codesimplify
```

This builds both Docker images locally and pushes them to ECR. Then
redeploy on the instance:

```powershell
./scripts/redeploy-remote.ps1 -InstanceIp <instance_public_ip output> -KeyPath .\codesimplify.pem
```

Then open the `site_url` from the Terraform output in your browser. First
HTTPS request may take a few seconds while Caddy obtains its certificate.

## 4. Set up GitHub Actions CI/CD (so `git push` auto-deploys)

In your GitHub repo → **Settings → Secrets and variables → Actions →
Variables**, add these repository variables (values from
`terraform output`):

| Variable          | Value                           |
| ----------------- | -------------------------------- |
| `AWS_ROLE_ARN`     | `github_actions_role_arn` output |
| `AWS_REGION`       | `eu-north-1`                     |
| `EC2_INSTANCE_ID`  | `instance_id` output             |
| `ECR_FRONTEND_URL` | `ecr_frontend_url` output        |
| `ECR_BACKEND_URL`  | `ecr_backend_url` output         |

No secrets (access keys) needed — `.github/workflows/deploy.yml` assumes
the OIDC role directly.

From then on, every push to `main` touching `frontend/**` or `backend/**`
builds both images, pushes them to ECR, and runs `redeploy.sh` on the
instance via SSM automatically. You can also trigger it manually from the
Actions tab (`workflow_dispatch`).

## 5. Day-to-day operations

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

## 6. Tearing everything down

```powershell
cd infra
terraform destroy
```

## Costs / staying in Free Tier

- **EC2 `t3.micro`**: 750 hrs/month free for 12 months — one instance
  running 24/7 uses ~720 hrs/month, so you're covered.
- **EBS**: 30 GB/month free; the root volume here is 20 GB.
- **Elastic IP**: free while attached to a *running* instance.
  `terraform destroy` releases it, which is the safe path when not in use
  (an idle/unattached EIP is billed hourly).
- **ECR**: 500 MB-month free for 12 months; the lifecycle policy keeps only
  the last 5 images per repo.
- **Data transfer**: 100 GB/month outbound free for 12 months.
- After the 12-month Free Tier window, this setup costs roughly $7–9/month
  (one small EC2 instance + EIP), since ECS Fargate/Elastic Beanstalk were
  intentionally avoided.

## Getting a real domain later

Once you own a domain, point an `A` record at the `instance_public_ip`
output, set `domain_name` in `infra/terraform.tfvars` to that domain, and
re-run `terraform apply` — Caddy will request a certificate for the new
domain on next boot/redeploy.
