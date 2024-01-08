#!/bin/sh

pylint --load-plugins pylint_django --django-settings-module=backend.settings api/*.py api/views/
