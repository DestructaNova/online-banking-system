#!/bin/bash

echo "☁️ Deploying to AWS Lightsail (Simple Instance)"
echo "=============================================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if AWS is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Generate JWT secret
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')

echo "🔧 Building JAR file..."
mvn clean package -DskipTests

if [ ! -f "target/online-banking-system-0.0.1-SNAPSHOT.jar" ]; then
    echo "❌ JAR file not found. Build failed."
    exit 1
fi

echo "⚙️ Creating Lightsail instance..."
aws lightsail create-instances \
    --instance-names online-banking-app \
    --availability-zone us-east-1a \
    --blueprint-id ubuntu_20_04 \
    --bundle-id nano_2_0 \
    --tags key=Project,value=OnlineBanking

echo "⏳ Waiting for instance to be ready..."
sleep 30

# Get instance IP
INSTANCE_IP=$(aws lightsail get-instance --instance-name online-banking-app --query 'instance.publicIpAddress' --output text 2>/dev/null)

if [ "$INSTANCE_IP" = "None" ] || [ -z "$INSTANCE_IP" ]; then
    echo "⏳ Instance still starting up. Waiting longer..."
    sleep 60
    INSTANCE_IP=$(aws lightsail get-instance --instance-name online-banking-app --query 'instance.publicIpAddress' --output text)
fi

echo "🌐 Instance IP: $INSTANCE_IP"

echo "🔧 Opening firewall port 8080..."
aws lightsail open-instance-public-ports \
    --instance-name online-banking-app \
    --port-info fromPort=8080,toPort=8080,protocol=TCP

echo ""
echo "🎉 Lightsail instance created successfully!"
echo "📋 Next steps:"
echo "1. Instance IP: $INSTANCE_IP"
echo "2. SSH into instance: ssh ubuntu@$INSTANCE_IP"
echo "3. Upload and run the JAR file"
echo ""
echo "🔧 Manual setup commands:"
echo "   scp target/online-banking-system-0.0.1-SNAPSHOT.jar ubuntu@$INSTANCE_IP:~/"
echo "   ssh ubuntu@$INSTANCE_IP"
echo "   sudo apt update && sudo apt install -y openjdk-17-jdk"
echo "   java -Dserver.port=8080 -Dspring.profiles.active=h2 -jar online-banking-system-0.0.1-SNAPSHOT.jar"
echo ""
echo "🌐 Your app will be available at: http://$INSTANCE_IP:8080/api"
