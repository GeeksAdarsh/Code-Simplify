variable "aws_region" {
  description = "AWS region to deploy into. eu-north-1 (Stockholm) is one of the regions where the EC2 free tier gives t3.micro instead of t2.micro."
  type        = string
  default     = "eu-north-1"
}

variable "project_name" {
  description = "Short name used to prefix and tag all resources."
  type        = string
  default     = "codesimplify"
}

variable "instance_type" {
  description = "EC2 instance type. t3.micro = 750 free hours/month for the first 12 months."
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "Name of an EXISTING EC2 key pair in this region, for emergency SSH access. Create one with: aws ec2 create-key-pair --region <region> --key-name codesimplify --query 'KeyMaterial' --output text > codesimplify.pem"
  type        = string
}

variable "ssh_ingress_cidr" {
  description = "CIDR allowed to reach port 22. Restrict this to your own IP, e.g. '203.0.113.4/32'. Find yours with: curl -s https://checkip.amazonaws.com"
  type        = string
  default     = "0.0.0.0/0"
}

variable "root_volume_gb" {
  description = "Root EBS volume size in GB (30 GB/month is free tier)."
  type        = number
  default     = 20
}

variable "domain_name" {
  description = "Optional real domain to serve on (e.g. app.example.com). Leave empty to automatically use a free '<elastic-ip>.sslip.io' hostname instead, which still gets a real Let's Encrypt certificate."
  type        = string
  default     = ""
}

variable "acme_email" {
  description = "Email address Caddy registers with Let's Encrypt for certificate notices. Leave empty to skip (Caddy will still issue certs, just without an account email)."
  type        = string
  default     = ""
}

variable "github_repo" {
  description = "GitHub repo allowed to assume the CI/CD deploy role via OIDC, formatted 'owner/repo'."
  type        = string
}
