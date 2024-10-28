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

# Data Source: Get the existing VPC
data "aws_vpc" "existing_vpc" {
  id = "vpc-6afe2f17" # Replace with your VPC ID
}

# Data Source: Public subnet within the VPC
data "aws_subnet_ids" "public_subnets" {
  vpc_id = data.aws_vpc.existing_vpc.id

  tags = {
    "Network" = "public" # Replace or remove tag filter based on your setup
  }
}

data "aws_subnet" "public_subnet" {
  id = data.aws_subnet_ids.public_subnets.ids[0] # Select the first public subnet
}

# Data Source: Get existing Route 53 Hosted Zone for labofdev.com
data "aws_route53_zone" "existing_zone" {
  name         = "labofdev.com."  # Replace with your exact domain name, including the trailing dot
  private_zone = false
}
