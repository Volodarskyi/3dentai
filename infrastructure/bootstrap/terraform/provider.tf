provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket = "terraform-hackaton"
    key    = "terraform-infrastructure.tfstate"
    region = "us-east-1"
  }
}
