#!/bin/bash

# Run Certbot to generate SSL certificates (if they don't exist)
certbot certonly --standalone --agree-tos --email your-email@domain.com -d garb-anzo.tech 

# Copy certificates to the appropriate location
cp /etc/letsencrypt/live/garb-anzo.tech/fullchain.pem /etc/nginx/ssl/fullchain.pem
cp /etc/letsencrypt/live/garb-anzo.tech/privkey.pem /etc/nginx/ssl/privkey.pem

# Start Nginx
nginx -g "daemon off;"
