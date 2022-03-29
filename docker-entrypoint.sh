#!/bin/sh
python3 manage.py makemigrations
python3 manage.py migrate 
cd /home/badamczyk/webtetrado/frontend
npm install
cd /home/badamczyk/webtetrado/build/
bash ./build_front.sh
cd /home/badamczyk/webtetrado/
python3 manage.py collectstatic --no-input
mkdir supervisor
supervisord
#python3 manage.py loaddata db.json
# echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@admin.com', 'admin')" | python3 manage.py shell
# supervisord
# supervisorctl -c /etc/supervisor/supervisord.conf
# supervisorctl reread
# supervisorctl update
# supervisorctl start all
gunicorn webTetrado.wsgi:application -b :8000
