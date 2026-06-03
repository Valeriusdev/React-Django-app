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

@pytest.mark.django_db
def test_create_book_returns_201(api_client):
    payload = {'title': 'New Book', 'release_year': 2026}
    response = api_client.post(reverse('create_book'), payload, format='json')
    assert response.status_code == 201
    assert response.json()['title'] == 'New Book'

@pytest.mark.django_db
def test_update_book_returns_200(api_client):
    book = Book.objects.create(title='Old Title', release_year=2020)
    payload = {'title': 'Updated Title', 'release_year': 2026}
    response = api_client.put(reverse('book_detail', args=[book.pk]), payload, format='json')
    assert response.status_code == 200
    assert response.json()['title'] == 'Updated Title'

@pytest.mark.django_db
def test_delete_book_returns_204(api_client):
    book = Book.objects.create(title='Book to Delete', release_year=2020)
    response = api_client.delete(reverse('book_detail', args=[book.pk]))
    assert response.status_code == 204
    assert Book.objects.filter(pk=book.pk).exists() is False