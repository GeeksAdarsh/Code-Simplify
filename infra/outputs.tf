output "site_url" {
  description = "Public HTTPS URL of the deployed app"
  value       = "https://${local.domain}"
}

output "instance_id" {
  description = "EC2 instance ID (GitHub Actions repo variable EC2_INSTANCE_ID)"
  value       = aws_instance.app.id
}

output "instance_public_ip" {
  value = aws_eip.app.public_ip
}

output "ecr_frontend_url" {
  description = "ECR repo URL for the frontend image (GitHub Actions repo variable ECR_FRONTEND_URL)"
  value       = aws_ecr_repository.frontend.repository_url
}

output "ecr_backend_url" {
  description = "ECR repo URL for the backend image (GitHub Actions repo variable ECR_BACKEND_URL)"
  value       = aws_ecr_repository.backend.repository_url
}

output "github_actions_role_arn" {
  description = "Role ARN for GitHub Actions OIDC (GitHub Actions repo variable AWS_ROLE_ARN)"
  value       = aws_iam_role.github_actions.arn
}

output "ssh_command" {
  description = "Emergency SSH command (day-to-day use should be via SSM instead)"
  value       = "ssh -i <path-to-${var.key_name}.pem> ec2-user@${aws_eip.app.public_ip}"
}
