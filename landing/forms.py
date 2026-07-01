from django import forms
from django.forms import inlineformset_factory, modelformset_factory

from .models import HeroBlock, HeroStat, TeamMember, Vacancy, Direction, Benefit


class HeroForm(forms.ModelForm):
    class Meta:
        model = HeroBlock
        fields = ["title", "subtitle"]


# Статистика Hero — дочерняя модель (связь ForeignKey), поэтому inline.
HeroStatFormSet = inlineformset_factory(
    HeroBlock,
    HeroStat,
    fields=["value", "label", "order"],
    extra=1,
    can_delete=True,
)

# Блоки-списки — самостоятельные модели, поэтому modelformset.
TeamMemberFormSet = modelformset_factory(
    TeamMember,
    fields=["name", "position", "photo", "order"],
    extra=1,
    can_delete=True,
)

VacancyFormSet = modelformset_factory(
    Vacancy,
    fields=["title", "format", "url", "order"],
    extra=1,
    can_delete=True,
)

DirectionFormSet = modelformset_factory(
    Direction,
    fields=["name", "description", "technologies", "order"],
    extra=1,
    can_delete=True,
)

BenefitFormSet = modelformset_factory(
    Benefit,
    fields=["title", "description", "order"],
    extra=1,
    can_delete=True,
)
