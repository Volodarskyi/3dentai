# Route 53 Record for Subdomain
resource "aws_route53_record" "subdomain" {
  zone_id = data.aws_route53_zone.existing_zone.zone_id
  name    = "3dentai.labofdev.com"  # Subdomain name
  type    = "A"
  ttl     = 300
  records = [aws_eip.app_eip.public_ip]  # Point to the Elastic IP
}
