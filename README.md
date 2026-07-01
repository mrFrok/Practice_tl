# TL:TECH — мини-конструктор лендинга

Учебный проект: мини-конструктор сайтов на примере главной страницы [travelline.tech](https://travelline.tech).
Контент страницы (5 блоков) редактируется через **админ-панель** без правки кода — изменения сразу
отражаются на публичной странице.

## Стек

- **Backend:** Django 5.2 + Django REST Framework
- **База данных:** PostgreSQL 16
- **Frontend:** React (Vite) — публичная страница на данных из API.
  Плюс SSR-версия на Django Templates (для админки и как резервный вариант).
- **Инфраструктура:** Docker Compose

## Управляемые блоки

Hero (заголовок + статистика), Команда, Вакансии, Направления, Бонусы.

## Структура проекта

```
config/                — настройки Django (settings, urls)
landing/               — основное приложение
  models.py            — модели блоков
  views.py             — SSR-вьюхи + обобщённая админка (реестр LIST_BLOCKS)
  forms.py             — формы и formset'ы админки
  serializers.py       — сериализаторы DRF
  api.py               — ViewSet'ы и router API
  tests.py             — pytest-тесты
  templates/           — шаблоны (публичная страница + админка)
  fixtures/demo.json   — демо-данные
frontend/              — React-приложение (Vite)
  src/components/      — компоненты блоков
  public/team/         — placeholder-аватары команды (SVG)
  Dockerfile           — образ фронта для docker compose
Dockerfile             — образ бэкенда (Django)
entrypoint.sh          — старт web: миграции + демо-данные + админ + сервер
docker-compose.yml, requirements.txt
```

## Запуск

Весь проект (PostgreSQL + Django API + React) поднимается **одной командой**:

```bash
cp .env.example .env          # создать файл окружения (один раз)
docker compose up --build     # поднять всё: БД, бэкенд и фронт
```

При первом старте web-контейнер сам применит миграции, загрузит демо-данные и
создаст админа (логика в `entrypoint.sh`). Демо-данные грузятся **только в пустую
базу** — правки из админки не затираются при перезапуске.

Что открыть:

| URL | Что это |
|-----|---------|
| http://localhost:5173 | Публичная страница (React) |
| http://localhost:5173/admin | Админ-панель (React, CRUD через API) |
| http://localhost:8000/ | Публичная страница (SSR, резервный вариант) |
| http://localhost:8000/manage/ | Админ-панель блоков (SSR-вариант) |
| http://localhost:8000/admin/ | Django-admin (логин `admin`, пароль `admin`) |

> Если раньше запускал фронт вручную через `npm run dev` — останови его, чтобы
> освободить порт **5173** для контейнера.

## REST API

| Эндпоинт | Данные |
|----------|--------|
| `GET /api/hero/` | Hero + вложенная статистика |
| `GET /api/team/` | сотрудники |
| `GET /api/vacancies/` | вакансии |
| `GET /api/directions/` | направления |
| `GET /api/benefits/` | бонусы |

Каждый эндпоинт поддерживает полный CRUD (list / create / update / delete).

## Тесты

```bash
docker compose exec web pytest
```

## Автор

ФИО, группа — _(заполнить)_
