FROM ubuntu:20.04
FROM python:3.10
FROM node:17

ENV PYTHONUNBUFFERED 1
RUN apt-get update && apt-get install -y python3-pip curl 
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get -y install nodejs
RUN mkdir -p /home/badamczyk/webtetrado
WORKDIR /home/badamczyk/webtetrado/
COPY . /home/badamczyk/webtetrado/

RUN apt-get install supervisor

COPY build/celery_worker_docker.conf /etc/supervisor/conf.d/
COPY build/celery_beat_docker.conf /etc/supervisor/conf.d/
COPY build/worker_supervisor.conf /etc/supervisor/conf.d/
# COPY server/celery_beat_docker.conf /etc/supervisor/conf.d/
RUN pip3 install -r requirements.txt

WORKDIR /home/badamczyk/webtetrado
EXPOSE 8000
RUN python3 manage.py collectstatic --no-input


WORKDIR /home/badamczyk/webtetrado
RUN mkdir -p /home/badamczyk/webtetrado/logs/celery/
RUN supervisord
