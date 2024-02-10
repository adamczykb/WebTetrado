FROM alpine:3.19.1

ENV PYTHONUNBUFFERED 1
RUN apk add nodejs npm python3-dev curl supervisor py3-pip postgresql-dev musl-dev git

RUN mkdir -p /opt/webtetrado
WORKDIR /opt/webtetrado/
COPY . /opt/webtetrado/

RUN chmod a+x frontend/compile_less.sh
COPY build/celery_worker_docker.conf /etc/supervisor/conf.d/
COPY build/celery_beat_docker.conf /etc/supervisor/conf.d/
COPY build/worker_supervisor.conf /etc/supervisor/conf.d/
COPY build/ws_supervisor.conf /etc/supervisor/conf.d/
COPY build/web_supervisor.conf /etc/supervisor/conf.d/
RUN echo "files = /etc/supervisor/conf.d/*.conf" >> /etc/supervisord.conf
RUN pip3 install --break-system-packages -r requirements.txt
RUN pip3 install --break-system-packages git+https://github.com/celery/django-celery-beat#egg=django-celery-beat
WORKDIR /opt/webtetrado
