FROM ubuntu:20.04
FROM python:3.10
FROM node:17

ENV PYTHONUNBUFFERED 1
RUN apt-get update && apt-get install -y python3-pip
RUN mkdir -p /home/badamczyk/webtetrado
WORKDIR /home/badamczyk/webtetrado/
COPY . /home/badamczyk/webtetrado/
RUN apt-get install -y supervisor sudo

COPY build/worker_supervisor.conf /etc/supervisor/conf.d/
# COPY server/celery_beat_docker.conf /etc/supervisor/conf.d/
# WORKDIR /home/solo/RNAsolo/
RUN pip3 install -r requirements.txt
# RUN server/pymol_source_ubuntu.sh
WORKDIR /home/badamczyk/webtetrado/frontend
RUN npm install
WORKDIR /home/badamczyk/webtetrado
EXPOSE 8000
WORKDIR /home/badamczyk/webtetrado/build/
RUN ./build_front.sh
WORKDIR /home/badamczyk/webtetrado
# RUN mkdir /home/badamczyk/webtetrado/supervisor

CMD ["supervisord"]
