#!/bin/sh
python3 manage.py makemigrations;
python3 manage.py migrate;

cd /opt/webtetrado/frontend;
npm install;
cd /opt/webtetrado/build/;
supervisord;
bash ./build_front.sh;
cd /opt/webtetrado/;
python3 manage.py collectstatic --no-input;
cp /opt/webtetrado/public/* /opt/webtetrado/static/
if [[ ! -d /opt/webtetrado/supervisor ]];
then
    mkdir -p /opt/webtetrado/supervisor
fi

if [[ ! -d /opt/webtetrado/logs/celery ]];
then
    mkdir -p /opt/webtetrado/logs/celery
fi
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@admin.com', 'admin') if User.objects.all().count()==0 else None" | python3 manage.py shell;


while :
do
  sleep 10
done
