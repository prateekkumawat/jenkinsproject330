# variable define for region
variable "aws_region" {}
variable "aws_vpc_cidr" {}
variable "aws_az" {
  type = list(any)
}
variable "subnet_cidr" {
  type = list(any)
}