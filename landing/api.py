from rest_framework import viewsets

from .models import HeroBlock, TeamMember, Vacancy, Direction, Benefit
from .serializers import (
    HeroSerializer, TeamMemberSerializer, VacancySerializer,
    DirectionSerializer, BenefitSerializer,
)


# Образец: ModelViewSet даёт весь CRUD (список, создать, изменить, удалить) сразу.
# Достаточно указать queryset (какие объекты) и serializer_class (чем в JSON).
class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


# ↓↓↓ ТВОЯ ЧАСТЬ: три ViewSet по образцу (Vacancy, Direction, Benefit) ↓↓↓
