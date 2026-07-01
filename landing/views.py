from django.http import Http404
from django.shortcuts import redirect, render

from .forms import (
    HeroForm, HeroStatFormSet,
    TeamMemberFormSet, VacancyFormSet, DirectionFormSet, BenefitFormSet,
)
from .models import HeroBlock, TeamMember, Vacancy, Direction, Benefit


def home(request):
    """Публичная страница: все блоки с данными из БД."""
    return render(request, "landing/home.html", {
        "hero": HeroBlock.objects.first(),
        "team": TeamMember.objects.all(),
        "vacancies": Vacancy.objects.all(),
        "directions": Direction.objects.all(),
        "benefits": Benefit.objects.all(),
    })


def hero_edit(request):
    """Админка: Hero-блок и его статистика (особый — тексты секции + список)."""
    hero = HeroBlock.objects.first()
    if request.method == "POST":
        form = HeroForm(request.POST, instance=hero)
        formset = HeroStatFormSet(request.POST, instance=hero)
        if form.is_valid() and formset.is_valid():
            form.save()
            formset.save()
            return redirect("landing:hero_edit")
    else:
        form = HeroForm(instance=hero)
        formset = HeroStatFormSet(instance=hero)
    return render(request, "landing/manage/hero_edit.html", {
        "form": form, "formset": formset, "hero": hero,
    })


# ── Реестр блоков-списков: ключ в URL → какой formset, модель и заголовок ──
LIST_BLOCKS = {
    "team":      {"formset": TeamMemberFormSet, "model": TeamMember, "title": "Команда"},
    "vacancy":   {"formset": VacancyFormSet,    "model": Vacancy,    "title": "Вакансии"},
    "direction": {"formset": DirectionFormSet,  "model": Direction,  "title": "Направления"},
    "benefit":   {"formset": BenefitFormSet,    "model": Benefit,    "title": "Бонусы"},
}


def list_block_edit(request, block):
    """Одна вьюха на все блоки-списки. `block` приходит из URL."""
    cfg = LIST_BLOCKS.get(block)
    if cfg is None:                       # запросили несуществующий блок
        raise Http404("Неизвестный блок")

    FormSet = cfg["formset"]
    queryset = cfg["model"].objects.all()

    if request.method == "POST":
        formset = FormSet(request.POST, queryset=queryset)
        if formset.is_valid():
            formset.save()
            return redirect("landing:list_block_edit", block=block)
    else:
        formset = FormSet(queryset=queryset)

    return render(request, "landing/manage/list_block.html", {
        "formset": formset,
        "title": cfg["title"],
        "block": block,
    })


def manage_dashboard(request):
    """Главная страница админки — ссылки на все блоки."""
    return render(request, "landing/manage/dashboard.html", {
        "list_blocks": LIST_BLOCKS,
    })
