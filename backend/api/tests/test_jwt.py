""" JWT Testing """

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient


class JwtTest(TestCase):
    """ Unit tests for JWT encoding and decoding operations """
    client = APIClient()

    def test_getting_decoded_token(self):
        """ Test getting the decoded token """

        # Register user
        self.client.post('/api/register',
                         {
                             'email': 'test1000@email.com',
                             'username': 'test1000',
                             'password': 'test1000'
                         },
                         format='json')

        # Login user
        token = self.client.post('/api/login', {
            'username': 'test1000',
            'password': 'test1000'}, format='json').json()['token']

        response = self.client.post('/api/get-decoded-token', {
            'token': token}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(b'{"auth": true, "user_id": 1}', response.content)
