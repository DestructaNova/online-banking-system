#!/bin/bash

echo "🚂 Deploying Online Banking System to Railway (Fixed)"
echo "=================================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI is not installed. Installing now..."
    npm install -g @railway/cli
fi

# Check if user is logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway first:"
    railway login
    echo "Press Enter after logging in..."
    read
fi

echo "🔧 Setting up Railway project..."

# Create new Railway project
railway init

echo "⚙️ Setting environment variables..."

# Set environment variables one by one
railway variables set SPRING_PROFILES_ACTIVE h2
railway variables set PORT 8080
railway variables set JWT_SECRET mySecretKey1234567890123456789012345678901234567890123456789012345678901234567890
railway variables set DAILY_TRANSFER_LIMIT 10000.00
railway variables set HOURLY_TRANSFER_LIMIT 15000.00
railway variables set NEW_ACCOUNT_LIMIT 5000.00
railway variables set FRAUD_DETECTION_ENABLED true
railway variables set JWT_EXPIRATION 86400000

echo "🚀 Deploying application..."
railway up

echo ""
echo "🎉 Railway deployment completed!"
echo "📋 Useful commands:"
echo "   railway logs    - View application logs"
echo "   railway status  - Check deployment status"
echo "   railway domain  - Get your app URL"
echo ""
echo "🌐 Getting your app URL..."
sleep 5
railway domain
