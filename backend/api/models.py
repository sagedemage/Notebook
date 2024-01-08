""" Models to define the tables' structure for the database """

from django.db import models


# Create your models here.

class User(models.Model):  # pylint: disable=unused-variable
    """ User Table """
    email = models.EmailField(null=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=200)


class Note(models.Model):  # pylint: disable=unused-variable
    """ Note Table """
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=200)
    user_id = models.IntegerField()
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
