from django.urls import path

from . import views

# Пространство имён приложения — чтобы ссылаться на маршруты как "landing:home"
app_name = "landing"

urlpatterns = [
    # Публичная страница
    path("", views.home, name="home"),

    # Админка
    path("manage/", views.manage_dashboard, name="manage_dashboard"),
    path("manage/hero/", views.hero_edit, name="hero_edit"),
    # Один маршрут на все блоки-списки: <block> = team / vacancy / direction / benefit
    path("manage/list/<str:block>/", views.list_block_edit, name="list_block_edit"),
]
