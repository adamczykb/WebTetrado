FROM ubuntu:20.04
FROM python:3.10
FROM node:17

ENV PYTHONUNBUFFERED 1
RUN apt-get update && apt-get install -y python3-pip curl supervisor uvicorn
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get -y install nodejs 
RUN mkdir -p /opt/webtetrado
WORKDIR /opt/webtetrado/
COPY . /opt/webtetrado/

COPY build/celery_worker_docker.conf /etc/supervisor/conf.d/
COPY build/celery_beat_docker.conf /etc/supervisor/conf.d/
COPY build/worker_supervisor.conf /etc/supervisor/conf.d/
COPY build/ws_supervisor.conf /etc/supervisor/conf.d/
COPY build/web_supervisor.conf /etc/supervisor/conf.d/
RUN pip3 install -r requirements.txt



WORKDIR /opt/webtetrado
