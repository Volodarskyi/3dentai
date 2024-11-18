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


### standalone configuration
bash

``` docker run --rm -p 80:80 -p 443:443 \
    -v $(pwd)/nginx/ssl:/etc/letsencrypt \
    -v $(pwd)/nginx/ssl-dhparams:/ssl-dhparams \
    certbot/certbot certonly --standalone \
    -d 3dentai.labofdev.com -d 3dentai-be.labofdev.com -d 3dentai-nginx.labofdev.com \
    --email axelpasechnik@gmail.com --agree-tos -n -vvvv
```

Replace example.com and www.example.com with your actual domain names.

Running the Setup
After configuring the initial certificates, you can start the services:

bash

``` docker-compose up -d ```
This setup provides HTTPS-secured access to both the frontend and file server endpoints, with Certbot handling automatic certificate renewal. Replace example.com in the configuration with your actual domain names. Adjust paths as necessary for your environment.