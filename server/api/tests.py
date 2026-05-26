import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from api.models import Book


@pytest.fixture
def api_client():
    return APIClient()


@pytest.mark.django_db
def test_get_books_returns_200(api_client):
    response = api_client.get(reverse('get_books'))
    assert response.status_code == 200

@pytest.mark.django_db
def test_get_books_returns_list(api_client):
    Book.objects.create(title='Test Book', release_year=2026)
    response = api_client.get(reverse('get_books'))
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]['title'] == 'Test Book'