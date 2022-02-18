FROM ubuntu:20.04
FROM python:3.8

ENV PYTHONUNBUFFERED 1
RUN apt-get update && apt-get install -y python3-pip
RUN mkdir -p /home/solo/webtetrado
WORKDIR /home/solo/webtetrado/
COPY . /home/solo/webtetrado/
RUN apt-get install -y supervisor sudo nodejs npm

# COPY server/celery_worker_docker.conf /etc/supervisor/conf.d/
# COPY server/celery_beat_docker.conf /etc/supervisor/conf.d/
# WORKDIR /home/solo/RNAsolo/
RUN pip3 install -r requirements.txt
# RUN server/pymol_source_ubuntu.sh
WORKDIR /home/solo/webtetrado/frontend
RUN npm install
WORKDIR /home/solo/webtetrado
EXPOSE 8000
WORKDIR /home/solo/webtetrado/server/
RUN ./build_front.sh
WORKDIR /home/solo/webtetrado/

# RUN mkdir -p /home/solo/RNAsolo/logs/celery

# CMD ["touch", "/var/run/supervisor.sock"]
# CMD ["chmod", "777", "/var/run/supervisor.sock"]
# CMD ["service", "supervisor", "restart"]
# CMD ["chmod","777","/etc/supervisor/supervisord.conf"]
# CMD ["supervisord"]
# CMD ["supervisorctl", "-c", "/etc/supervisor/supervisord.conf"]

