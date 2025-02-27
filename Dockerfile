# Use official PHP with Apache
FROM php:8.2-apache

# Install required PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Enable mod_rewrite for Apache (needed for clean URLs)
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy all project files to the container
COPY . /var/www/html/

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html/

# Expose port 80 (default for Apache)
EXPOSE 80

# Start Apache server
CMD ["apache2-foreground"]
