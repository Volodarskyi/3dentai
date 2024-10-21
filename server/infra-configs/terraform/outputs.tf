# outputs.tf
output "bucket_name" {
  value = aws_s3_bucket.photo_bucket.bucket
}

output "bucket_arn" {
  value = aws_s3_bucket.photo_bucket.arn
}

output "upload_role_arn" {
  value = aws_iam_role.photo_upload_role.arn
}

output "readonly_role_arn" {
  value = aws_iam_role.photo_readonly_role.arn
}
