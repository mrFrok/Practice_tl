from django import forms
from django.forms import inlineformset_factory

from .models import HeroBlock, HeroStat


class HeroForm(forms.ModelForm):
    class Meta:
        model = HeroBlock
        fields = ["title", "subtitle"]


# Набор форм для статистики Hero. Вынесен из класса HeroForm —
# это самостоятельный объект уровня файла.
HeroStatFormSet = inlineformset_factory(
    HeroBlock,                           # родительская модель
    HeroStat,                            # дочерняя модель (её поля и редактируем)
    fields=["value", "label", "order"],  # поля именно HeroStat
    extra=1,                             # одна пустая форма — для новой записи
    can_delete=True,                     # галочка «удалить» у каждой формы
)
