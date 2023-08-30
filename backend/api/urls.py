from django.urls import path

from . import views
from .views import note, auth, test, jwt

urlpatterns = [
        # authentication
        path('register', auth.register, name='register'),
        path('login', auth.login, name='login'),

        # jwt
        path('get-decoded-token', jwt.get_decoded_token, name='get-decoded-token'),

        # note CRUD operations
        path('add-note', note.add_note, name='add_note'),
        path('fetch-note', note.fetch_note, name='fetch_note'),
        path('edit-note', note.edit_note, name='edit_note'),
        path('delete-note', note.delete_note, name='delete_note'),

        # view the list of all notes
        path('view-notes', note.view_notes, name='view_notes'),

        # test
        path('test', test.test, name='test'),
]
