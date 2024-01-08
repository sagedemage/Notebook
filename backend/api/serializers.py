""" Serializers to verify the tables' fields """

from rest_framework import serializers
from .models import User, Note


class UserSerializer(serializers.ModelSerializer):  # pylint: disable=unused-variable
    """ Verify User Fields """
    class Meta:
        model = User
        fields = ['email', 'username', 'password']


class NoteSerializer(serializers.ModelSerializer):  # pylint: disable=unused-variable
    """ Verify Note Fields """
    class Meta:
        model = Note
        fields = ['id', 'title', 'description']

