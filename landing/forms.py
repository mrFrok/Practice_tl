from django import forms
from django.forms import inlineformset_factory
from .models import HeroBlock, HeroStat


class HeroForm(forms.ModelForm):
    class Meta:
        model = HeroBlock
        fields = ["title", "subtitle"]
    HeroStatFromSet = inlineformset_factory(
        HeroBlock,
        HeroStat,
        fields=["title", "subtitile", "order"],
        extra=1,
        can_delete=True,
    )
