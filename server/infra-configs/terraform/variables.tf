# variables.tf
variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
  default     = "my-photo-storage-bucket"
}

variable "region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-1"
}
