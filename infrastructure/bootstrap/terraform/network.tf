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
    protocol   
