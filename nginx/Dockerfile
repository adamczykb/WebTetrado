FROM nginx:1.17.2

RUN rm /etc/nginx/conf.d/default.conf
COPY custom_50x.html /usr/share/nginx/html/
COPY custom_404.html /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d
USER root
EXPOSE 8080