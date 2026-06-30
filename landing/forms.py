from django import forms
from .models import HeroBlock


class HeroForm(forms.ModelForm):
    class Meta:
        model = HeroBlock
        fields = ["title", "subtitle"]
