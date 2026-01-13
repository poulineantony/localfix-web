# LocalFix Web Deployment Guide

## Prerequisites
- A server with Node.js installed (Ubuntu/Debian recommended)
- Domain: www.localfix.app (or localfix.app)
- SSH access to your server
- Git installed on server

## Step 1: Prepare Your Server

### 1.1 Install Required Software
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (v18 or higher)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx (web server)
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Git
sudo apt install -y git
```

## Step 2: Clone and Build Your Application

### 2.1 Clone the Repository
```bash
# Navigate to web directory
cd /var/www

# Clone your repository (replace with your actual repo URL)
sudo git clone <your-git-repo-url> localfix-web

# Or if you're uploading files directly:
sudo mkdir -p /var/www/localfix-web
# Then upload your localfixWeb folder contents to /var/www/localfix-web
```

### 2.2 Install Dependencies and Build
```bash
cd /var/www/localfix-web

# Install dependencies
sudo npm install

# Build the production version
sudo npm run build

# This creates a 'dist' folder with optimized files
```

## Step 3: Configure Nginx

### 3.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/localfix-web
```

### 3.2 Add This Configuration:
```nginx
server {
    listen 80;
    server_name localfix.app www.localfix.app;

    root /var/www/localfix-web/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 3.3 Enable the Site
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/localfix-web /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Step 4: Configure Domain DNS

### 4.1 Add DNS Records
Go to your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare) and add these records:

```
Type: A
Name: @
Value: <your-server-ip-address>
TTL: 3600

Type: A
Name: www
Value: <your-server-ip-address>
TTL: 3600
```

Wait 5-30 minutes for DNS propagation.

## Step 5: Install SSL Certificate (HTTPS)

### 5.1 Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 5.2 Get SSL Certificate
```bash
sudo certbot --nginx -d localfix.app -d www.localfix.app
```

Follow the prompts:
- Enter your email
- Agree to terms
- Choose to redirect HTTP to HTTPS (option 2)

### 5.3 Auto-Renewal
Certbot automatically sets up renewal. Test it:
```bash
sudo certbot renew --dry-run
```

## Step 6: Set Up Automatic Deployment (Optional)

### 6.1 Create Deployment Script
```bash
sudo nano /var/www/localfix-web/deploy.sh
```

Add this content:
```bash
#!/bin/bash
cd /var/www/localfix-web
git pull origin master
npm install
npm run build
sudo systemctl reload nginx
echo "Deployment completed at $(date)"
```

### 6.2 Make it Executable
```bash
sudo chmod +x /var/www/localfix-web/deploy.sh
```

### 6.3 Deploy Updates
```bash
cd /var/www/localfix-web
sudo ./deploy.sh
```

## Step 7: Verify Deployment

### 7.1 Check Website
Open your browser and visit:
- http://localfix.app (should redirect to https)
- https://localfix.app
- https://www.localfix.app

### 7.2 Test All Pages
- Home page: https://www.localfix.app/
- Privacy Policy: https://www.localfix.app/privacy-policy
- Terms of Service: https://www.localfix.app/terms-of-service

## Troubleshooting

### Issue: 502 Bad Gateway
```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Issue: Files Not Found
```bash
# Verify build folder exists
ls -la /var/www/localfix-web/dist

# Check file permissions
sudo chown -R www-data:www-data /var/www/localfix-web
sudo chmod -R 755 /var/www/localfix-web
```

### Issue: Domain Not Resolving
```bash
# Check DNS propagation
nslookup localfix.app
dig localfix.app

# Verify Nginx is listening
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443
```

## Maintenance

### Update the Website
```bash
cd /var/www/localfix-web
sudo ./deploy.sh
```

### View Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### Renew SSL Certificate Manually
```bash
sudo certbot renew
sudo systemctl reload nginx
```

## Performance Optimization

### Enable HTTP/2
Already enabled if using Certbot with Nginx.

### Enable Brotli Compression (Optional)
```bash
sudo apt install -y nginx-module-brotli
```

Add to Nginx config:
```nginx
brotli on;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml;
```

## Security Checklist
- ✅ SSL certificate installed
- ✅ HTTPS redirect enabled
- ✅ Security headers configured
- ✅ Firewall configured (UFW)
- ✅ Regular updates scheduled

## Firewall Setup
```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow ssh

# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'

# Check status
sudo ufw status
```

## Support
For issues, contact: support@localfix.app
