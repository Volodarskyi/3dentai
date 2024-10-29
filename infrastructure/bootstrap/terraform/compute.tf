# EBS volume for shared file storage
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
  instance_type               = "c7a.medium"
  subnet_id                   = data.aws_subnet.public_subnet.id
  vpc_security_group_ids      = [aws_security_group.app_sg.id]
  associate_public_ip_address = true
  key_name                    = "jenkins_hackaton_3denai" # Replace with your SSH key name

  root_block_device {
    volume_size = 8
  }

  tags = {
    Name = "3DenAiAppInstance"
  }

  # Mount the EBS volume on /app/uploads using user_data
  user_data = <<-EOF
              #!/bin/bash
              # Update and install dependencies
              apt-get update -y
              apt-get install -y awscli

              # Format the EBS volume if it's not already formatted
              if ! file -s /dev/xvdf | grep -q "ext4"; then
                  mkfs -t ext4 /dev/xvdf
              fi

              # Create the mount point and mount the volume
              mkdir -p /app/uploads
              mount /dev/xvdf /app/uploads

              # Update fstab to mount the EBS volume automatically on reboot
              echo "/dev/xvdf /app/uploads ext4 defaults,nofail 0 2" >> /etc/fstab

              # Set permissions for Docker to access the directory
              chmod 777 /app/uploads
            EOF
}

# Attach EBS volume to the EC2 instance
resource "aws_volume_attachment" "app_volume_attachment" {
  device_name = "/dev/xvdf" # Attach volume as /dev/xvdf (mapped to /app/uploads)
  volume_id   = aws_ebs_volume.app_volume.id
  instance_id = aws_instance.app_instance.id
}

# Elastic IP for the EC2 instance
resource "aws_eip" "app_eip" {
  instance = aws_instance.app_instance.id
  vpc      = true
}
