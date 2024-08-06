
# Tic Tac Toe based on WebSocket
This is a simple Tic Tac Toe project created to test the capabilities offered by Terraform and Docker. The project showcases basic infrastructure as code principles and containerization techniques, making it an ideal starting point for experimentation.


## Project Tech Stack

**Backend:** Java, Spring Boot

**Frontend:** JavaScript, Node

**Deployment:** Terraform

The backend is responsible for configuring WebSocket communication and controlling tic tac toe game board. The frontend uses Express.js to serve static files and proxy WebSocket connections to the backend. It connects to the backend WebSocket endpoint using SockJS and STOMP.
Deployment part is used for deploying this application on EC2 instance in AWS cloud provider.
## Run Locally

Running the Project Locally with Docker Compose

```bash
  docker-compose up --build -d
```

## Deploying to AWS EC2 using Terraform


To deploy this project to AWS EC2 using Terraform, follow these steps:

1. Install Terraform:
   Make sure you have Terraform installed.

2. Set up AWS credentials:
   Ensure your AWS credentials are configured. This project uses the default profile for AWS credentials. You can configure your AWS credentials by running:

```bash
  aws configure
```

Alternatively, ensure that your ~/.aws/credentials file contains the default profile:

```bash
[default]
aws_access_key_id = YOUR_ACCESS_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
```

To securely access EC2 instance, you need an SSH key pair.
* Generate a new Key Pair in AWS and name them "tic_tac_toe_key_pair_2"
* Move the downloaded key pair file (tic_tac_toe_key_pair_2.pem) to the deployment directory of your project.


3. Navigate to the deployment directory and run those commands:
```bash
cd deployment/terraform
```


```bash
terraform init
```
```bash
terraform plan
```
```bash
 terraform apply
```

## Infrastructure Description
This project sets up a basic infrastructure on AWS to host simple Tic Tac Toe game. The following resources will be created:
1. AWS EC2 Instance:

* AMI: ami-04e5276ebb8451442 (Amazon Linux 2)
* Instance Type: t2.micro (suitable for low-traffic applications and testing)
* Key Pair: tic_tac_toe_key_pair_2 (used for SSH access)
* Public IP: The instance will have an associated public IP address.
* User Data Script: install-app.sh (used to set up the application on instance launch)
* Tags: "Tic Tac Toe 2"

2. VPC (Virtual Private Cloud)
* CIDR Block: 10.0.0.0/16
* DNS Support: Enabled
* DNS Hostnames: Enabled
* Tags: "Vpc Tic Tac Toe 2"

3. Subnet
* CIDR Block: 10.0.1.0/24
* VPC: Associated with vpc_tic_tac_toe_game2
* Tags: "Subnet Tic Tac Toe 2"

4. Internet Gateway
* VPC: Attached to vpc_tic_tac_toe_game2
* Tags: "Gateway Tic Tac Toe 2"

5. Route Table
* VPC: Associated with vpc_tic_tac_toe_game2
* Routes: 0.0.0.0/0 (Internet traffic routed through the internet gateway)
* Tags: "Route table Tic-tac-toe 2"

6. Route Table Association
* Subnet: subnet_tic_tac_toe_game2
* Route Table: route_table_tic_tac_toe_game2

7. Security Group
* Egress Rules:
    * Allow all outbound traffic (ports: 0-65535, protocol: all, CIDR: 0.0.0.0/0)
* Ingress Rules:
    * Allow SSH access (port: 22, protocol: TCP, CIDR: 0.0.0.0/0)
    * Allow backend access (port: 8080, protocol: TCP, CIDR: 0.0.0.0/0)
    * Allow frontend access (port: 8081, protocol: TCP, CIDR: 0.0.0.0/0)