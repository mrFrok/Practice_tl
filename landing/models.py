from django.db import models


class HeroBlock(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return self.title


class HeroStat(models.Model):
    hero = models.ForeignKey(HeroBlock, on_delete=models.CASCADE,
                             related_name='stats')
    value = models.CharField(max_length=20)
    label = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.value} {self.label}"
