from rest_framework import viewsets
from rest_framework.routers import DefaultRouter

from .models import HeroBlock, TeamMember, Vacancy, Direction, Benefit
from .serializers import (
    HeroSerializer, TeamMemberSerializer, VacancySerializer,
    DirectionSerializer, BenefitSerializer,
)


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class DirectionViewSet(viewsets.ModelViewSet):
    queryset = Direction.objects.all()
    serializer_class = DirectionSerializer


class BenefitViewSet(viewsets.ModelViewSet):
    queryset = Benefit.objects.all()
    serializer_class = BenefitSerializer


class VacancyViewSet(viewsets.ModelViewSet):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer


class HeroViewSet(viewsets.ModelViewSet):
    queryset = HeroBlock.objects.all()
    serializer_class = HeroSerializer


# Router строит URL'ы для каждого ViewSet автоматически:
#   /api/team/ (список) и /api/team/<id>/ (одна запись), и так для всех.
router = DefaultRouter()
router.register("hero", HeroViewSet)
router.register("team", TeamMemberViewSet)
router.register("vacancies", VacancyViewSet)
router.register("directions", DirectionViewSet)
router.register("benefits", BenefitViewSet)
