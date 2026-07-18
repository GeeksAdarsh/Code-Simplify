<#
.SYNOPSIS
  Builds the frontend/backend Docker images and pushes them to ECR.
  Run this after `terraform apply` has created the ECR repositories.

.EXAMPLE
  ./scripts/deploy.ps1 -AwsRegion eu-north-1 -ProjectName codesimplify
#>
param(
    [string]$AwsRegion = "eu-north-1",
    [string]$ProjectName = "codesimplify",
    [string]$Tag = "latest"
)

$ErrorActionPreference = "Stop"
$RepoRoot = Resolve-Path "$PSScriptRoot/.."

$accountId = (aws sts get-caller-identity --query Account --output text)
if (-not $accountId) { throw "Could not resolve AWS account id - is 'aws configure' set up?" }

$registry = "$accountId.dkr.ecr.$AwsRegion.amazonaws.com"
$frontendImage = "$registry/$ProjectName-frontend:$Tag"
$backendImage = "$registry/$ProjectName-backend:$Tag"

Write-Host "Logging in to ECR ($registry)..." -ForegroundColor Cyan
aws ecr get-login-password --region $AwsRegion | docker login --username AWS --password-stdin $registry

Write-Host "Building backend image..." -ForegroundColor Cyan
docker build -t $backendImage "$RepoRoot/backend"

Write-Host "Building frontend image..." -ForegroundColor Cyan
docker build -t $frontendImage "$RepoRoot/frontend"

Write-Host "Pushing backend image..." -ForegroundColor Cyan
docker push $backendImage

Write-Host "Pushing frontend image..." -ForegroundColor Cyan
docker push $frontendImage

Write-Host ""
Write-Host "Done. Images pushed:" -ForegroundColor Green
Write-Host "  $backendImage"
Write-Host "  $frontendImage"
Write-Host ""
Write-Host "Now redeploy on the instance with:" -ForegroundColor Yellow
Write-Host "  ./scripts/redeploy-remote.ps1 -InstanceIp <ip> -KeyPath <path-to-key.pem>"
