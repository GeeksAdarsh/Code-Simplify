#!/bin/bash
# Rendered by Terraform's templatefile(): the interpolated placeholders below are
# substituted at `terraform apply` time with real values, NOT bash variables. Plain
# $VAR (no braces) below are genuine shell variables evaluated on the instance at boot.
set -euxo pipefail

dnf update -y
dnf install -y docker git
systemctl enable --now docker
usermod -aG docker ec2-user

mkdir -p /usr/local/lib/docker/cli-plugins
curl -sSL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
  -o /usr/local/lib/docker/cli-plugins/docker-compose
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Images are built by GitHub Actions and pulled from ECR - this box never
# builds anything, so buildx isn't needed here anymore.

# t3.micro has only 1GB RAM; a little swap keeps the frontend (Node) +
# backend (JVM) stack from OOMing under load spikes.
if [ ! -f /swapfile ]; then
  fallocate -l 1G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

if [ -d /opt/codesimplify/.git ]; then
  cd /opt/codesimplify
  git pull origin main
else
  rm -rf /opt/codesimplify
  git clone ${git_repo_url} /opt/codesimplify
  cd /opt/codesimplify
fi

cat > /opt/codesimplify/.env <<EOF
ECR_REGISTRY=${ecr_registry}
EOF

cat > redeploy.sh <<'REDEPLOY'
#!/bin/bash
set -euxo pipefail
cd /opt/codesimplify
git pull origin main
aws ecr get-login-password --region ${aws_region} | docker login --username AWS --password-stdin ${ecr_registry}
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
docker image prune -f
REDEPLOY
chmod +x redeploy.sh

./redeploy.sh
