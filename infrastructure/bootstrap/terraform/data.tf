# Data Source: Retrieve the latest Ubuntu 22.04 LTS AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical's AWS account ID

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}

# Data Source: Get the default VPC
data "aws_vpc" "default" {
    default = true
}

# Data Source: Find a public subnet in the default VPC
data "aws_subnet" "public_subnet" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }

  availability_zone = "us-east-1c"
  filter {
    name   = "map-public-ip-on-launch"
    values = ["true"]
  }
  # Fetch the first available subnet in the default VPC
  
}

# Data Source: Get existing Route 53 Hosted Zone for labofdev.com
data "aws_route53_zone" "existing_zone" {
  name         = "labofdev.com."  # Replace with your exact domain name, including the trailing dot
  private_zone = false
}
