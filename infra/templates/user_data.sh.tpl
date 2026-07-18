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

# `docker compose build` shells out to buildx - the plain "docker" dnf package
# doesn't ship it, and buildx's GitHub releases use versioned filenames (no
# fixed "latest" asset name), so resolve the tag via the API first.
BUILDX_VERSION=$(curl -s https://api.github.com/repos/docker/buildx/releases/latest \
  | sed -n 's/.*"tag_name": *"\([^"]*\)".*/\1/p' | head -1)
curl -sSL "https://github.com/docker/buildx/releases/download/${BUILDX_VERSION}/buildx-${BUILDX_VERSION}.linux-amd64" \
  -o /usr/local/lib/docker/cli-plugins/docker-buildx
chmod +x /usr/local/lib/docker/cli-plugins/docker-buildx

# t3.micro has only 1GB RAM; building Next.js + Maven on it needs real swap headroom.
if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile
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

cat > redeploy.sh <<'REDEPLOY'
#!/bin/bash
set -euxo pipefail
cd /opt/codesimplify
git pull origin main
docker compose -f docker-compose.prod.yml build backend
docker compose -f docker-compose.prod.yml build frontend
docker compose -f docker-compose.prod.yml up -d
docker image prune -f
REDEPLOY
chmod +x redeploy.sh

./redeploy.sh
