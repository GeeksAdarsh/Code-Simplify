output "site_url" {
  description = "Public HTTPS URL of the deployed app"
  value       = "https://${local.domain}"
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
