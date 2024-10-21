# s3_bucket.tf
resource "aws_s3_bucket" "photo_bucket" {
  bucket = "my-photo-storage-bucket" # Change to your unique bucket name
  acl    = "private"                 # Default private access for the bucket
}

resource "aws_s3_bucket_policy" "public_read_policy" {
  bucket = aws_s3_bucket.photo_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.photo_bucket.arn}/*"  # Publicly readable objects
      }
    ]
  })
}
