from rest_framework import viewsets

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
