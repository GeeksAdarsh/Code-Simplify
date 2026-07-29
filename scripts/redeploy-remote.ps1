<#
.SYNOPSIS
  SSHes into the EC2 instance and re-runs redeploy.sh: git pull + pull the
  latest pre-built images from ECR (built by GitHub Actions) + restart the
  stack. Useful for a manual redeploy without waiting on a GitHub Actions
  run - normally deploys happen automatically on push to main.

.EXAMPLE
  ./scripts/redeploy-remote.ps1 -InstanceIp 16.192.95.202 -KeyPath ~/.ssh/codesimplify.pem
#>
param(
    [Parameter(Mandatory = $true)][string]$InstanceIp,
    [Parameter(Mandatory = $true)][string]$KeyPath
)

$ErrorActionPreference = "Stop"

ssh -i $KeyPath -o StrictHostKeyChecking=accept-new "ec2-user@$InstanceIp" "cd /opt/codesimplify && sudo ./redeploy.sh"
