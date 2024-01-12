""" Note Testing """

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient


class NoteTest(TestCase):
    """ Unit tests for Note Operations """
    client = APIClient()

    def test_adding_the_note(self):
        """ Test adding a new note (CREATE) """
        response = self.client.post('/api/add-note', {
            'title': 'First Note',
            'description': 'This is the first note.',
            'user_id': 1
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.content,
            b'Add Note'
        )

    def test_fetching_the_note(self):
        """ Test fetching a note (READ) """
        # Add a note
        self.client.post('/api/add-note', {
            'title': 'First Note',
            'description': 'This is the first note.',
            'user_id': 1
        }, format='json')

        response = self.client.get('/api/fetch-note?note_id=1', format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.content,
            b'{"title": "First Note", "description": "This is the first note."}'
        )

    def test_editing_the_note(self):
        """ Test editing a note (UPDATE) """
        # Add a note
        self.client.post('/api/add-note', {
            'title': 'Second Note',
            'description': 'This is the second note.',
            'user_id': 1
        }, format='json')

        response = self.client.patch('/api/edit-note', {
            'title': 'First Note',
            'description': 'This is the first note.',
            'note_id': 1
        }, format='json', content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.content,
            b'Update Note'
        )

    def test_deleting_the_note(self):
        """ Test deleting a note (DELETE) """
        # Add a note
        self.client.post('/api/add-note', {
            'title': 'First Note',
            'description': 'This is the first note.',
            'user_id': 1
        }, format='json')

        response = self.client.delete('/api/delete-note?note_id=1', format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.content,
            b'Delete Note'
        )

    def test_viewing_the_notes(self):
        """ Test viewing the notes (READ) """
        # Register a new user
        self.client.post('/api/register', {
            'email': 'test1000@email.com',
            'username': 'test1000',
            'password': 'test1000'
        }, format='json')

        # Register a new user
        self.client.post('/api/register', {
            'email': 'test1001@email.com',
            'username': 'test1001',
            'password': 'test1001'
        }, format='json')

        # Add a note
        self.client.post('/api/add-note', {
            'title': 'First Note',
            'description': 'This is the first note.',
            'user_id': 1
        }, format='json')

        # Add a note
        self.client.post('/api/add-note', {
            'title': 'First Note',
            'description': 'This is the first note.',
            'user_id': 2
        }, format='json')

        # Add a note
        self.client.post('/api/add-note', {
            'title': 'Second Note',
            'description': 'This is the second note.',
            'user_id': 1
        }, format='json')

        # Add a note
        self.client.post('/api/add-note', {
            'title': 'Second Note',
            'description': 'This is the second note.',
            'user_id': 2
        }, format='json')

        # Add a note
        self.client.post('/api/add-note', {
            'title': 'Third Note',
            'description': 'This is the third note.',
            'user_id': 1
        }, format='json')

        # Add a note
        self.client.post('/api/add-note', {
            'title': 'Third Note',
            'description': 'This is the third note.',
            'user_id': 2
        }, format='json')

        response = self.client.get('/api/view-notes?user_id=1', format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn(b'{"id": 1, "title": "First Note", "description": "This is the first note."}', response.content)
        self.assertIn(b'{"id": 3, "title": "Second Note", "description": "This is the second note."}', response.content)
        self.assertIn(b'{"id": 5, "title": "Third Note", "description": "This is the third note."}', response.content)

        response = self.client.get('/api/view-notes?user_id=2', format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn(b'{"id": 2, "title": "First Note", "description": "This is the first note."}', response.content)
        self.assertIn(b'{"id": 4, "title": "Second Note", "description": "This is the second note."}', response.content)
        self.assertIn(b'{"id": 6, "title": "Third Note", "description": "This is the third note."}', response.content)
