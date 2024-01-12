""" JWT Testing """

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from api.views.jwt import generate_token, decode_token


class JwtTest(TestCase):
    """ Unit tests for JWT encoding and decoding operations """
    client = APIClient()

    def test_encoding_and_decoding_token(self):
        """ Test encoding and decoding a token """
        user_id = 2
        token = generate_token(user_id)

        value = decode_token(token)
        self.assertEqual(value, {'auth': True, 'user_id': 2})

    def test_getting_decoded_token(self):
        """ Test getting the decoded token where the token is retrieved from the login request """

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
