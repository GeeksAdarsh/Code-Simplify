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
  description = "Root EBS volume size in GB. Must be >= 30 (the AL2023 AMI snapshot requires it), which is exactly the free tier limit."
  type        = number
  default     = 30
}

variable "git_repo_url" {
  description = "HTTPS clone URL the instance uses to pull source and build images directly on the box."
  type        = string
  default     = "https://github.com/GeeksAdarsh/Code-Simplify.git"
}

variable "http_ingress_cidrs" {
  description = "CIDRs allowed to reach port 80. Defaults to Cloudflare's published IPv4 ranges (https://www.cloudflare.com/ips-v4) so the raw EC2/EIP address isn't reachable except through your Cloudflare-proxied domain. Set to [\"0.0.0.0/0\"] to allow direct IP access again."
  type        = list(string)
  default = [
    "173.245.48.0/20",
    "103.21.244.0/22",
    "103.22.200.0/22",
    "103.31.4.0/22",
    "141.101.64.0/18",
    "108.162.192.0/18",
    "190.93.240.0/20",
    "188.114.96.0/20",
    "197.234.240.0/22",
    "198.41.128.0/17",
    "162.158.0.0/15",
    "104.16.0.0/13",
    "104.24.0.0/14",
    "172.64.0.0/13",
    "131.0.72.0/22",
  ]
}
