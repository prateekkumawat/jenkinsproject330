resource "aws_vpc" "dev" {
  cidr_block = var.aws_vpc_cidr
  tags = {
    Name = "vpc-dev-learn"
  }
}

resource "aws_subnet" "public1" {
  vpc_id                  = aws_vpc.dev.id
  cidr_block              = var.subnet_cidr[0]
  availability_zone       = var.aws_az[0]
  map_public_ip_on_launch = true

  tags = {
    Name = "dev-vpc-learn-pub-az1"
  }
}

resource "aws_subnet" "public2" {
  vpc_id                  = aws_vpc.dev.id
  cidr_block              = var.subnet_cidr[1]
  availability_zone       = var.aws_az[1]
  map_public_ip_on_launch = true

  tags = {
    Name = "dev-vpc-learn-pub-az2"
  }
}

resource "aws_subnet" "private1" {
  vpc_id                  = aws_vpc.dev.id
  cidr_block              = var.subnet_cidr[2]
  availability_zone       = var.aws_az[0]
  map_public_ip_on_launch = true

  tags = {
    Name = "dev-vpc-learn-private-az1"
  }
}

resource "aws_subnet" "private2" {
  vpc_id                  = aws_vpc.dev.id
  cidr_block              = var.subnet_cidr[3]
  availability_zone       = var.aws_az[1]
  map_public_ip_on_launch = true

  tags = {
    Name = "dev-vpc-learn-private2-az2"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.dev.id
  tags = {
    Name = "dev-vpc-learn-igw"
  }
}

resource "aws_eip" "nateip" {
  domain = "vpc"
  tags = {
    Name = "dev-vpc-learn-nat-eip"
  }
}

resource "aws_nat_gateway" "natgw" {
  allocation_id = aws_eip.nateip.id
  subnet_id     = aws_subnet.public1.id

  tags = {
    Name = "dev-vpc-learn-natgw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.dev.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = {
    Name = "dev-vpc-public-rt"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.dev.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_nat_gateway.natgw.id
  }
  tags = {
    Name = "dev-vpc-private-rt"
  }
}

resource "aws_route_table_association" "rtasspublic1" {
  subnet_id      = aws_subnet.public1.id
  route_table_id = aws_route_table.public.id
}
resource "aws_route_table_association" "rtasspublic2" {
  subnet_id      = aws_subnet.public2.id
  route_table_id = aws_route_table.public.id
}
resource "aws_route_table_association" "rtassprivate1" {
  subnet_id      = aws_subnet.private1.id
  route_table_id = aws_route_table.private.id
}
resource "aws_route_table_association" "rtassprivate2" {
  subnet_id      = aws_subnet.private2.id
  route_table_id = aws_route_table.private.id
}