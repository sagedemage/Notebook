from django.test import TestCase
from rest_framework import status

# Create your tests here.

from rest_framework.test import APIClient


class Auth(TestCase):
    client = APIClient()
    def test_register_success(self):
        response = self.client.post('/api/register', {'email': 'test1000@email.com', 'username': 'test1000', 'password': 'test1000'}, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.content, b'{"registered": true, "success_msg": "User Registration Success"}')

    def test_login_success(self):
        # Register user
        self.client.post('/api/register', {'email': 'test1000@email.com', 'username': 'test1000', 'password': 'test1000'}, format='json')

        response = self.client.post('/api/login', {'username': 'test1000', 'password': 'test1000'}, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertIn(b'"auth": true', response.content)

    def test_login_failure(self):
        response = self.client.post('/api/login', {'username': 'test1000', 'password': 'test1000'}, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.content, b'{"auth": false, "err_msg": "User does not exist"}')
