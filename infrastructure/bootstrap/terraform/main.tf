provider "aws" {
  region = "us-east-1" # Updated region
}

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
  id = "vpc-xxxxxxxx" # Replace with your VPC ID
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

# Elastic IP for the EC2 instance
resource "aws_eip" "app_eip" {
  instance = aws_instance.app_instance.id
  vpc      = true
}

# Security Group allowing HTTP (80), HTTPS (443), and SSH (22) access
resource "aws_security_group" "app_sg" {
  name        = "app-instance-sg"
  description = "Allow HTTP, HTTPS, and SSH access"
  vpc_id      = data.aws_vpc.existing_vpc.id

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EBS volume for file storage
resource "aws_ebs_volume" "app_volume" {
  availability_zone = data.aws_subnet.public_subnet.availability_zone
  size              = 20 # Adjust size based on needs, in GB
  tags = {
    Name = "AppInstanceFileStorage"
  }
}

# EC2 Instance with the Ubuntu AMI and in the first public subnet
resource "aws_instance" "app_instance" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "c7g.medium"
  subnet_id                   = data.aws_subnet.public_subnet.id
  vpc_security_group_ids      = [aws_security_group.app_sg.id]
  associate_public_ip_address = true
  key_name                    = "my-key" # Replace with your SSH key name

  root_block_device {
    volume_size = 8
  }

  tags = {
    Name = "AppInstance"
  }

  # Attach the EBS volume after instance creation
  provisioner "local-exec" {
    command = "echo ${aws_instance.app_instance.public_ip} > public_ip.txt"
  }
}

# Attach EBS volume to the EC2 instance
resource "aws_volume_attachment" "app_volume_attachment" {
  device_name = "/dev/xvdb" # Choose appropriate device name based on the OS
  volume_id   = aws_ebs_volume.app_volume.id
  instance_id = aws_instance.app_instance.id
}

output "instance_ip" {
  description = "Public IP of the instance"
  value       = aws_instance.app_instance.public_ip
}

output "elastic_ip" {
  description = "Elastic IP associated with the instance"
  value       = aws_eip.app_eip.public_ip
}
