FROM debian:11

# Install necessary packages
RUN apt update && apt install -y \
    nginx \
    certbot \
    python3-certbot-nginx \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Create a directory for SSL certificates
RUN mkdir -p /etc/nginx/ssl

# Expose ports 80 and 443

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/sites-enabled/default.conf

# Add entrypoint script to run Certbot and Nginx
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Run entrypoint script to generate certificates and start Nginx
CMD ["/entrypoint.sh"]
