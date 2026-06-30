from django.shortcuts import render
from .models import HeroBlock


def home(request):
    hero = HeroBlock.objects.first()
    return render(request, "landing/home.html", {"hero": hero})
