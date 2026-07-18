<#
.SYNOPSIS
  SSHes into the EC2 instance and re-runs redeploy.sh: git pull + rebuild the
  Docker images on the box itself + restart the stack.

.EXAMPLE
  ./scripts/redeploy-remote.ps1 -InstanceIp 16.192.95.202 -KeyPath ~/.ssh/codesimplify.pem
#>
param(
    [Parameter(Mandatory = $true)][string]$InstanceIp,
    [Parameter(Mandatory = $true)][string]$KeyPath
)

$ErrorActionPreference = "Stop"

ssh -i $KeyPath -o StrictHostKeyChecking=accept-new "ec2-user@$InstanceIp" "cd /opt/codesimplify && sudo ./redeploy.sh"
