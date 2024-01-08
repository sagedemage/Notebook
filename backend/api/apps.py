""" App Configuration """

from django.apps import AppConfig


class ApiConfig(AppConfig):  # pylint: disable=unused-variable
    """ API Configuration """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
