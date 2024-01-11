""" Serializers to verify the tables' fields """

from rest_framework import serializers
from .models import User, Note


class UserSerializer(serializers.ModelSerializer):
    """ Verify User Fields """

    class Meta:
        model = User
        fields = ['email', 'username', 'password']


class NoteSerializer(serializers.ModelSerializer):
    """ Verify Note Fields """

    class Meta:
        model = Note
        fields = ['id', 'title', 'description']
