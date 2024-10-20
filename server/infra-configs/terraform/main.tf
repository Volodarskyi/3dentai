terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>5"
    }
    random = {
      source  = "hashicorp/random"
      version = "~>3.5"
    }
  }

  backend "s3" {
    bucket = "terraform-hackaton"
    key    = "terraform_hackaton_infra.tfstate"
    region = "us-east-1"
  }

  required_version = ">= 1.3"
}