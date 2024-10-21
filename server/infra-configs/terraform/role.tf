# iam_roles.tf
# IAM Role for uploading photos (write access)
resource "aws_iam_role" "photo_upload_role" {
  name               = "photo-upload-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"  # Change this depending on what entity assumes this role
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

# IAM policy allowing write access to the S3 bucket
resource "aws_iam_policy" "s3_write_policy" {
  name        = "photo-upload-s3-policy"
  description = "Policy allowing write access to the photo S3 bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = [
          "s3:PutObject",
          "s3:PutObjectAcl"
        ]
        Resource = "${aws_s3_bucket.photo_bucket.arn}/*" # Write access to objects in the bucket
      }
    ]
  })
}

# Attach the S3 write policy to the upload role
resource "aws_iam_role_policy_attachment" "photo_upload_policy_attachment" {
  role       = aws_iam_role.photo_upload_role.name
  policy_arn = aws_iam_policy.s3_write_policy.arn
}

# IAM Role for read-only access to the S3 bucket
resource "aws_iam_role" "photo_readonly_role" {
  name               = "photo-readonly-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"  # Change this depending on what entity assumes this role
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

# IAM policy for read-only access to the S3 bucket
resource "aws_iam_policy" "s3_read_policy" {
  name        = "photo-readonly-s3-policy"
  description = "Policy allowing read-only access to the photo S3 bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = [
          "s3:GetObject"
        ]
        Resource = "${aws_s3_bucket.photo_bucket.arn}/*" # Read access to objects in the bucket
      }
    ]
  })
}

# Attach the S3 read policy to the read-only role
resource "aws_iam_role_policy_attachment" "photo_readonly_policy_attachment" {
  role       = aws_iam_role.photo_readonly_role.name
  policy_arn = aws_iam_policy.s3_read_policy.arn
}
