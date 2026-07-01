from django import forms
from django.forms import inlineformset_factory, modelformset_factory

from .models import HeroBlock, HeroStat, TeamMember


class HeroForm(forms.ModelForm):
    class Meta:
        model = HeroBlock
        fields = ["title", "subtitle"]


# Набор форм для статистики Hero. Вынесен из класса HeroForm —
# это самостоятельный объект уровня файла.
HeroStatFormSet = inlineformset_factory(
    HeroBlock,                           # родительская модель
    # дочерняя модель (её поля и редактируем)
    HeroStat,
    fields=["value", "label", "order"],  # поля именно HeroStat
    extra=1,                             # одна пустая форма — для новой записи
    can_delete=True,                     # галочка «удалить» у каждой формы
)

TeamMemberFormSet = modelformset_factory(
    TeamMember,
    fields=["name", "position", "photo", "order"],
    extra=1,
    can_delete=True,
)
