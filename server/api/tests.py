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
