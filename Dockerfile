# Use PHP with Apache as the base image
FROM php:8.2-apache

# Enable mod_rewrite (if needed)
RUN a2enmod rewrite

# Set working directory inside the container
WORKDIR /var/www/html

# Copy public files (index.html, favicon, etc.)
COPY public/ /var/www/html/

# Copy PHP files from the api directory
COPY api/ /var/www/html/api/

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port 80 for the web server
EXPOSE 80

# Start Apache server
CMD ["apache2-foreground"]
