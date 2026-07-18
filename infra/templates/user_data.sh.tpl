#!/bin/bash
# Rendered by Terraform's templatefile(): the interpolated placeholders below are
# substituted at `terraform apply` time with real values, NOT bash variables. Plain
# $VAR (no braces) below are genuine shell variables evaluated on the instance at boot.
set -euxo pipefail

dnf update -y
dnf install -y docker
systemctl enable --now docker
usermod -aG docker ec2-user

mkdir -p /usr/local/lib/docker/cli-plugins
curl -sSL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
  -o /usr/local/lib/docker/cli-plugins/docker-compose
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# t3.micro has only 1GB RAM; a 1GB swapfile gives Next.js/Spring Boot/Caddy headroom.
if [ ! -f /swapfile ]; then
  fallocate -l 1G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

mkdir -p /opt/codesimplify
cd /opt/codesimplify

cat > Caddyfile <<'CADDY'
${caddy_global_block}
${domain} {
	encode gzip
	handle /api/* {
		reverse_proxy backend:8080
	}
	handle {
		reverse_proxy frontend:3000
	}
}
CADDY

cat > docker-compose.yml <<COMPOSE
services:
  caddy:
    image: caddy:2-alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - frontend
      - backend

  frontend:
    image: ${ecr_frontend_repo}:latest
    restart: always
    expose:
      - "3000"
    environment:
      - NODE_ENV=production

  backend:
    image: ${ecr_backend_repo}:latest
    restart: always
    expose:
      - "8080"
    environment:
      - APP_CORS_ALLOWED_ORIGINS=https://${domain}

volumes:
  caddy_data:
  caddy_config:
COMPOSE

cat > redeploy.sh <<'REDEPLOY'
#!/bin/bash
set -euxo pipefail
cd /opt/codesimplify
REGISTRY=$(echo "${ecr_frontend_repo}" | cut -d/ -f1)
aws ecr get-login-password --region ${aws_region} | docker login --username AWS --password-stdin "$REGISTRY"
docker compose pull
docker compose up -d
docker image prune -f
REDEPLOY
chmod +x redeploy.sh

./redeploy.sh
