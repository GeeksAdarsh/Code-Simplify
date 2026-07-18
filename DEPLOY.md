# Deploying CodeSimplify to AWS (Docker + Terraform, Free Tier)

**Architecture:** one `t3.micro` EC2 instance (Free Tier eligible in
`eu-north-1`) runs two containers via Docker Compose — `frontend`
(Next.js, published on port 80) and `backend` (Spring Boot, internal only —
the frontend proxies `/api/*` to it server-side, so it's never exposed to
the internet). Plain HTTP for now; TLS/domain is handled externally later
(e.g. Cloudflare in front of the instance's IP). The instance `git clone`s
this repo itself and builds both images from source on the box
(`docker-compose.prod.yml`) — no image registry, no CI/CD involved.
Redeploys are a manual `ssh` + `git pull && docker compose build && up -d`
via `scripts/redeploy-remote.ps1`.

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
EC2 instance + Elastic IP, and an IAM instance role (SSM only). Nothing
here has a fixed monthly cost as long as you stay within Free Tier limits
(see "Costs" below).

The instance's own boot script (`infra/templates/user_data.sh.tpl`)
installs Docker + git, adds a 2 GB swapfile (the instance only has 1 GB
RAM — needed as headroom for building Next.js + Maven on-box), clones
this repo to `/opt/codesimplify`, and runs `redeploy.sh`, which does the
actual `git pull && docker compose -f docker-compose.prod.yml build && up
-d`. First boot takes several minutes (cloning + building both images on a
small instance) — this is normal.

Copy the outputs:

```powershell
terraform output
```

You'll see `site_url`, `instance_id`, and `instance_public_ip`.

## 3. Watch the first deploy finish, then check the site

No local build/push step needed — the instance builds from source itself
on boot. Give it 5-10 minutes after `terraform apply` completes, then open
the `site_url` from the Terraform output in your browser.

To watch progress or debug, SSM into the instance (no SSH key needed):

```powershell
aws ssm start-session --target <instance_id>
sudo cat /var/log/cloud-init-output.log   # boot script log
```

Once it's up, every subsequent deploy is just:

```powershell
./scripts/redeploy-remote.ps1 -InstanceIp <instance_public_ip> -KeyPath <path-to-codesimplify.pem>
```

which SSHes in and re-runs `cd /opt/codesimplify && sudo ./redeploy.sh`.

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
- After the 12-month Free Tier window, this setup costs roughly $7–9/month
  (one small EC2 instance + EIP), since ECS Fargate/Elastic Beanstalk were
  intentionally avoided.

## Adding your domain + HTTPS later (e.g. Cloudflare)

Point your domain at the `instance_public_ip` output (an `A` record), then
put it behind Cloudflare (or similar) for TLS termination — set Cloudflare's
SSL mode to "Flexible" so it talks plain HTTP to the origin (port 80),
matching this setup. No changes needed on the instance side for that.
