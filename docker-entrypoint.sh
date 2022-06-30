#!/bin/sh
python3 manage.py makemigrations;
python3 manage.py migrate;

cd /home/badamczyk/webtetrado/frontend;
npm install;
cd /home/badamczyk/webtetrado/build/;
supervisord;
bash ./build_front.sh;
cd /home/badamczyk/webtetrado/;
python3 manage.py collectstatic --no-input;

if [[ ! -d /home/badamczyk/webtetrado/supervisor ]];
then
    mkdir -p /home/badamczyk/webtetrado/supervisor
fi

if [[ ! -d /home/badamczyk/webtetrado/logs/celery ]];
then
    mkdir -p /home/badamczyk/webtetrado/logs/celery
fi
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@admin.com', 'admin') if User.objects.all().count()==0 else None" | python3 manage.py shell;


while :
do
  sleep 10
done
