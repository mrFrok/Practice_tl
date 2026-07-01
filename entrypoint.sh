#!/bin/sh
# Стартовый скрипт web-контейнера: применяет миграции, при первом запуске
# наполняет базу демо-данными и создаёт админа, затем поднимает сервер.
# Благодаря этому весь проект стартует одной командой: docker compose up.
set -e

echo "→ Применяем миграции..."
python manage.py migrate --noinput

# Демо-данные грузим ТОЛЬКО если база пустая — чтобы правки из админки
# не затирались при каждом перезапуске.
if python manage.py shell -c "from landing.models import HeroBlock; print(HeroBlock.objects.exists())" | grep -q True; then
  echo "→ Данные уже есть, пропускаем загрузку демо."
else
  echo "→ База пустая, загружаем демо-данные..."
  python manage.py loaddata demo
fi

# Админ для входа в /admin (логин/пароль см. в .env / README).
echo "→ Проверяем суперпользователя..."
python manage.py createsuperuser --noinput \
  --username "${DJANGO_SUPERUSER_USERNAME:-admin}" \
  --email "${DJANGO_SUPERUSER_EMAIL:-admin@example.com}" 2>/dev/null \
  && echo "→ Суперпользователь создан." \
  || echo "→ Суперпользователь уже существует."

echo "→ Запускаем Django..."
exec python manage.py runserver 0.0.0.0:8000
