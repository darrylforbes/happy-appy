import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Reflection
from django.contrib.auth.models import User


# Model tests
def test_create_reflection():
    """Test a reflection can be created."""
    reflection = Reflection()
    assert isinstance(reflection, Reflection)


# View Tests
@pytest.fixture
def client_setup():
    url = reverse('token_obtain_pair')
    user = User.objects.create_user(username='user', password='pass')
    user.save()

    client = APIClient()

    resp = client.post(url, {'username': 'user', 'password': 'pass'}, format='json')
    token = resp.data['access']
    client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

    reflection_data = {'title':'test_title', 'recipient':'test_recipient', 'content':'test_content'}
    response = client.post(reverse('reflection-list'), reflection_data, format='json')
    return client, reflection_data, response


@pytest.mark.django_db
def test_api_can_create_reflection(client_setup):
    """Test the api can create a reflection."""
    client, reflection_data, response = client_setup
    assert response.status_code == status.HTTP_201_CREATED


@pytest.mark.django_db
def test_api_can_get_reflection(client_setup):
    """Test the api can get a reflection."""
    client, reflection_data, response = client_setup
    reflection = Reflection.objects.get()
    response = client.get(reverse('reflection-detail', kwargs={'pk': reflection.id}), format='json')
    assert response.status_code == status.HTTP_200_OK
    for x in response:
        assert bytes(str(reflection), 'utf-8') in x


@pytest.mark.django_db
def test_api_can_update_reflection(client_setup):
    """Test the api can update a given reflection."""
    client, reflection_data, response = client_setup
    reflection = Reflection.objects.get()
    change_reflection = {'author': 'new_author', 'recipient': 'new_recipient'}
    response = client.put(reverse('reflection-detail', kwargs={'pk': reflection.id}), change_reflection, format='json')
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_api_can_delete_reflection(client_setup):
    """Test the api can delete a reflection."""
    client, reflection_data, response = client_setup
    reflection = Reflection.objects.get()
    response = client.delete(reverse('reflection-detail', kwargs={'pk': reflection.id}), format='json', follow=True)
    assert response.status_code == status.HTTP_204_NO_CONTENT
