output "instance_ip" {
  description = "Public IP of the instance"
  value       = aws_instance.app_instance.public_ip
}

output "elastic_ip" {
  description = "Elastic IP associated with the instance"
  value       = aws_eip.app_eip.public_ip
}

output "subdomain_url" {
  description = "URL of the subdomain"
  value       = "http://3dentai.labofdev.com"
}
