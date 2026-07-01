import pytest

from landing.models import HeroBlock
from landing.forms import HeroForm, Vacancy


@pytest.mark.django_db
def test_hero_stats_relation():
    """У Hero-блока корректно создаётся и считается связанная статистика."""
    hero = HeroBlock.objects.create(title="TravelLine", subtitle="Растём")
    hero.stats.create(value="300+", label="сотрудников", order=1)
    hero.stats.create(value="12 000+", label="клиентов", order=2)

    assert hero.stats.count() == 2                         # обе записи на месте
    # __str__ + сортировка по order
    assert str(hero.stats.first()) == "300+ сотрудников"


def test_hero_form_rejects_empty_title():
    form = HeroForm(data={
        "title": "",
        "subtitle": "Растём",
    })
    assert not form.is_valid()
    assert "title" in form.errors


@pytest.mark.django_db
def test_public_page_accessibility(client):
    hero = HeroBlock.objects.create(title="TravelLine")
    hero.stats.create(value="300+")
    response = client.get("/")
    assert response.status_code == 200
    content = response.content.decode("utf-8")
    assert "TravelLine" in content
    assert "300+" in content


@pytest.mark.django_db
def test_hero_block_edits():
    hero = HeroBlock.objects.create(title="Old Title", subtitle="Old Subtitle")
    hero.stats.create(value="100+")
    form = HeroForm(data={"title": "New Title",
                    "subtitle": "New Subtitle"}, instance=hero)
    assert form.is_valid()
    form.save()
    hero.refresh_from_db()
    assert hero.title == "New Title"


@pytest.mark.django_db
def test_hero_block_deletion():
    hero = HeroBlock.objects.create(
        title="To be deleted", subtitle="Also to be deleted")
    stat = hero.stats.create(value="100+", label="a")
    assert hero.stats.count() == 1
    stat.delete()
    assert hero.stats.count() == 0


def test_unknown_block_returns_404(client):
    response = client.get("/manage/list/nonexistent/")
    assert response.status_code == 404


@pytest.mark.django_db
def test_home_shows_vacancy(client):
    Vacancy.objects.create(title="Тестовая вакансия", order=1)
    response = client.get("/")
    assert response.status_code == 200
    assert "Тестовая вакансия" in response.content.decode("utf-8")
