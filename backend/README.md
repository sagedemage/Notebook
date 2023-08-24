# Django App (backend)

## Run the Django App
```
python3 manage.py runserver
```

## To make model changes:

1. Change your models in models.py


2. Create make migrations for thoses changes
```
python3 manage.py makemigrations
```

3. Apply thoses changes to the database
```
python3 manage.py migrate 
```

## Install dependencies for virtual environment

Create virtual environment
```
python3 -m venv venv
```

Activate virtual environment
```
source venv/bin/activate
```

Install dependencies of the Django app
```
pip install -r requirements.txt
```
