Explanation of Configuration
Certbot Service:

Runs Certbot’s renew command in a loop to automatically renew certificates every 12 hours.
Stores certificates in ./nginx/ssl, which is mounted by NGINX to /etc/letsencrypt.
NGINX Configuration:

HTTP Redirect to HTTPS: HTTP traffic is redirected to HTTPS.
SSL Configuration: Uses SSL certificates from Certbot for secure access.
Frontend Proxy: NGINX proxies traffic to the frontend service (frontend:3000).
File Server Location: /files serves files from the uploads volume directory.
Generate Initial Certificates
Before running the setup, you’ll need to generate initial certificates with Certbot. Run the following command in a terminal to obtain the certificates:

bash

``` docker run --rm -v $(pwd)/nginx/ssl:/etc/letsencrypt certbot/certbot certonly --webroot -w /usr/share/nginx/html -d example.com -d www.example.com ```

Replace example.com and www.example.com with your actual domain names.

Running the Setup
After configuring the initial certificates, you can start the services:

bash

``` docker-compose up -d ```
This setup provides HTTPS-secured access to both the frontend and file server endpoints, with Certbot handling automatic certificate renewal. Replace example.com in the configuration with your actual domain names. Adjust paths as necessary for your environment.