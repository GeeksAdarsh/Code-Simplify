<#
.SYNOPSIS
  SSHes into the EC2 instance and pulls the latest images pushed to ECR.
  Run this after ./scripts/deploy.ps1 has pushed new images.

.EXAMPLE
  ./scripts/redeploy-remote.ps1 -InstanceIp 13.51.xx.xx -KeyPath C:\keys\my-key.pem
#>
param(
    [Parameter(Mandatory = $true)][string]$InstanceIp,
    [Parameter(Mandatory = $true)][string]$KeyPath
)

$ErrorActionPreference = "Stop"

ssh -i $KeyPath -o StrictHostKeyChecking=accept-new "ec2-user@$InstanceIp" "cd /opt/codesimplify && sudo ./redeploy.sh"
