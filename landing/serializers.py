from rest_framework import serializers

from .models import HeroBlock, HeroStat, TeamMember, Vacancy, Direction, Benefit


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ["id", "name", "position", "photo", "order"]


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = ["id", "title", "format", "url", "order"]


class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = ["id", "name", "description", "technologies", "order"]


class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefit
        fields = ["id", "title", "description", "order"]


# Hero — с вложенной статистикой (nested serializer).
class HeroStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroStat
        fields = ["id", "value", "label", "order"]


# Отдельный сериализатор для записи статистики через /api/stats/:
# включает поле hero (к какому Hero-блоку относится строка).
class HeroStatWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroStat
        fields = ["id", "hero", "value", "label", "order"]


class HeroSerializer(serializers.ModelSerializer):
    # stats — вложенный список статистики; работает через related_name="stats".
    # read_only: пока отдаём на чтение (запись вложенных данных сложнее).
    stats = HeroStatSerializer(many=True, read_only=True)

    class Meta:
        model = HeroBlock
        fields = ["id", "title", "subtitle", "stats"]
