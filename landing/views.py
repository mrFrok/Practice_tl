from django.shortcuts import redirect, render

from .forms import HeroForm, HeroStatFormSet
from .models import HeroBlock


def home(request):
    """Публичная страница: показываем Hero с данными из БД."""
    hero = HeroBlock.objects.first()
    return render(request, "landing/home.html", {"hero": hero})


def hero_edit(request):
    """Админка: редактирование Hero-блока и его статистики."""
    hero = HeroBlock.objects.first()

    if request.method == "POST":
        # Форму отправили — наполняем формы присланными данными (request.POST)
        form = HeroForm(request.POST, instance=hero)
        formset = HeroStatFormSet(request.POST, instance=hero)
        if form.is_valid() and formset.is_valid():
            form.save()      # сохраняем заголовок/подзаголовок
            formset.save()   # добавляет новые, удаляет отмеченные, обновляет старые
            return redirect("landing:hero_edit")   # PRG: после сохранения — редирект
    else:
        # Обычное открытие страницы (GET) — формы с текущими данными
        form = HeroForm(instance=hero)
        formset = HeroStatFormSet(instance=hero)

    return render(request, "landing/manage/hero_edit.html", {
        "form": form,
        "formset": formset,
        "hero": hero,
    })
