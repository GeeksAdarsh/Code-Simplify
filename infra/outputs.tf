output "site_url" {
  description = "Public URL of the deployed app (plain HTTP for now)"
  value       = "http://${aws_eip.app.public_ip}"
}

output "instance_id" {
  value = aws_instance.app.id
}

output "instance_public_ip" {
  value = aws_eip.app.public_ip
}

output "ssh_command" {
  description = "Emergency SSH command (day-to-day use should be via SSM instead)"
  value       = "ssh -i <path-to-${var.key_name}.pem> ec2-user@${aws_eip.app.public_ip}"
}

output "ecr_frontend_repo" {
  description = "Push target for the frontend image (GitHub Actions builds + pushes here)"
  value       = aws_ecr_repository.frontend.repository_url
}

output "ecr_backend_repo" {
  description = "Push target for the backend image (GitHub Actions builds + pushes here)"
  value       = aws_ecr_repository.backend.repository_url
}
