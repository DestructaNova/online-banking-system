#!/bin/bash

echo "☁️ Deploying to AWS Lightsail"
echo "============================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first:"
    echo "   https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Generate JWT secret
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')

echo "🔧 Building Docker image..."
docker build -f Dockerfile.lightsail -t online-banking-system .

echo "⚙️ Creating Lightsail container service..."
aws lightsail create-container-service \
    --service-name online-banking \
    --power small \
    --scale 1 \
    --tags key=Project,value=OnlineBanking

echo "⏳ Waiting for container service to be ready..."
aws lightsail wait container-service-ready --service-name online-banking

echo "🚀 Creating deployment..."
cat > lightsail-deployment.json << EOF
{
    "containers": {
        "banking-app": {
            "image": "online-banking-system",
            "ports": {
                "8080": "HTTP"
            },
            "environment": {
                "SPRING_PROFILES_ACTIVE": "h2",
                "JWT_SECRET": "$JWT_SECRET",
                "DAILY_TRANSFER_LIMIT": "10000.00",
                "HOURLY_TRANSFER_LIMIT": "15000.00",
                "NEW_ACCOUNT_LIMIT": "5000.00",
                "FRAUD_DETECTION_ENABLED": "true",
                "SERVER_PORT": "8080"
            }
        }
    },
    "publicEndpoint": {
        "containerName": "banking-app",
        "containerPort": 8080,
        "healthCheck": {
            "path": "/api/actuator/health",
            "intervalSeconds": 30
        }
    }
}
EOF

aws lightsail create-container-service-deployment \
    --service-name online-banking \
    --cli-input-json file://lightsail-deployment.json

echo ""
echo "🎉 AWS Lightsail deployment initiated!"
echo "📋 Deployment Status:"
aws lightsail get-container-services --service-name online-banking --query 'containerServices[0].state'

echo ""
echo "⏳ Waiting for deployment to complete (this may take 5-10 minutes)..."
echo "🔧 You can check status with:"
echo "   aws lightsail get-container-services --service-name online-banking"
echo ""
echo "🌐 Once deployed, get your URL with:"
echo "   aws lightsail get-container-services --service-name online-banking --query 'containerServices[0].url' --output text"
