from django.shortcuts import redirect, render

from .forms import HeroForm, HeroStatFormSet, TeamMemberFormSet
from .models import HeroBlock, TeamMember


def home(request):
    """Публичная страница: показываем Hero с данными из БД."""
    hero = HeroBlock.objects.first()
    team = TeamMember.objects.all()
    return render(request, "landing/home.html", {"hero": hero, "team": team})


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
            # PRG: после сохранения — редирект
            return redirect("landing:hero_edit")
    else:
        # Обычное открытие страницы (GET) — формы с текущими данными
        form = HeroForm(instance=hero)
        formset = HeroStatFormSet(instance=hero)

    return render(request, "landing/manage/hero_edit.html", {
        "form": form,
        "formset": formset,
        "hero": hero,
    })


def team_edit(request):
    """Админка: редактирование Team-блока и его статистики."""
    team = TeamMember.objects.first()

    if request.method == "POST":
        # Форму отправили — наполняем формы присланными данными (request.POST)
        formset = TeamMemberFormSet(
            request.POST, queryset=TeamMember.objects.all())
        if formset.is_valid():
            formset.save()   # добавляет новые, удаляет отмеченные, обновляет старые
            # PRG: после сохранения — редирект
            return redirect("landing:team_edit")
    else:
        # Обычное открытие страницы (GET) — формы с текущими данными
        formset = TeamMemberFormSet(queryset=TeamMember.objects.all())

    return render(request, "landing/manage/hero_edit.html", {
        "formset": formset,
        "team": team,
    })
