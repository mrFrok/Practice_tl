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
Dockerfile, docker-compose.yml, requirements.txt
```

## Запуск

### 1. Backend (Django + PostgreSQL в Docker)

```bash
cp .env.example .env                                    # создать файл окружения
docker compose up --build -d                            # поднять Django + PostgreSQL
docker compose exec web python manage.py migrate        # применить миграции
docker compose exec web python manage.py loaddata demo  # загрузить демо-данные
```

Django доступен на http://localhost:8000
- Публичная страница (SSR): `/`
- Админка блоков: `/manage/`
- REST API: `/api/`

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

React-версия страницы: http://localhost:5173

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
