""" Authentication Testing """

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient


class AuthTest(TestCase):
    """ Unit tests for Authentication """
    client = APIClient()

    def test_register_success(self):
        """ Test successful user registration """
        response = self.client.post('/api/register', {
            'email': 'test1000@email.com',
            'username': 'test1000',
            'password': 'test1000'
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.content,
            b'{"registered": true, "success_msg": "User Registration Success"}'
        )

    def test_register_failure(self):
        """ Test failure user registration where the email already exists """
        # Register a new user
        self.client.post('/api/register', {
            'email': 'test1000@email.com',
            'username': 'test1000',
            'password': 'test1000'
        }, format='json')

        response = self.client.post('/api/register', {
            'email': 'test1000@email.com',
            'username': 'test1000',
            'password': 'test1000'
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.content,
            b'{"registered": false, "err_msg": "Email already exists!"}'
        )

    def test_login_success_username_does_exist(self):
        """ Test successful login when the username does exist """

        # Register user
        self.client.post('/api/register',
                         {
                             'email': 'test1000@email.com',
                             'username': 'test1000',
                             'password': 'test1000'
                         },
                         format='json')

        response = self.client.post('/api/login', {
            'username': 'test1000',
            'password': 'test1000'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn(b'"auth": true', response.content)

    def test_login_failure(self):
        """ Test failure user registration when the user does not exist """
        response = self.client.post('/api/login', {
            'username': 'test1001',
            'password': 'test1000'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.content,
            b'{"auth": false, "err_msg": "Failed to Login"}'
        )
