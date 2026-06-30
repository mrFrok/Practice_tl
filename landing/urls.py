from django.urls import path

from . import views

# Пространство имён приложения — чтобы ссылаться на маршруты как "landing:home"
app_name = "landing"

urlpatterns = [
    # Пустой путь "" = корень сайта (http://localhost:8000/) → вьюха home
    path("", views.home, name="home"),
    # Админка: редактирование Hero-блока
    path("manage/hero/", views.hero_edit, name="hero_edit"),
]
