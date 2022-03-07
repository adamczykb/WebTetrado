FROM nginx:1.18
RUN apt-get update
RUN apt-get install -y certbot python-certbot-nginx bash  
RUN rm /etc/nginx/conf.d/default.conf
COPY custom_50x.html /usr/share/nginx/html/
COPY custom_404.html /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d
RUN mkdir -p /var/letsencrypt
# RUN certbot certonly --webroot --webroot-path=/var/letsencrypt --email bartosz.adamczyk@student.put.poznan.pl --agree-tos --no-eff-email -d webtetrado.cs.put.poznan.pl
# RUN certbot --nginx --email bartosz.adamczyk@student.put.poznan.pl -d webtetrado.cs.put.poznan.pl
USER root
EXPOSE 8080
