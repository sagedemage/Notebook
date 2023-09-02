from django.test import TestCase
from rest_framework import status

# Create your tests here.

from rest_framework.test import APIClient


class Auth(TestCase):
    def test_register_success(self):
        client = APIClient()
        response = client.post('/api/register', {'email': 'test1000@email.com', 'username': 'test1000', 'password': 'test1000'}, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.content, b'{"registered": true, "success_msg": "User Registration Success"}')

    def test_login_failure(self):
        client = APIClient()
        response = client.post('/api/login', {'username': 'test1000', 'password': 'test1000'}, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.content, b'{"auth": false, "err_msg": "User does not exist"}')
