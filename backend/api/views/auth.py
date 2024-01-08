""" Authentication """

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view

from .jwt import generate_token
from ..serializers import UserSerializer
from ..models import User


@csrf_exempt
@api_view(['POST'])
def register(request):  # pylint: disable=unused-variable
    """
    Register a new user

    Route: /api/register
    Request Parameters:
    - email: string
    - username: string
    - password: string
    """
    response = JsonResponse({'err_msg': "Data not valid"})

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        email_match = User.objects.filter(email__exact=serializer.data.get("email"))
        username_match = User.objects.filter(username__exact=serializer.data.get("username"))
        password = serializer.data.get("password")
        if email_match.exists() is True:
            response = JsonResponse({'registered': False, 'err_msg': "Email already exists!"})
        elif username_match.exists() is True:
            response = JsonResponse({'registered': False, 'err_msg': "Username already exists!"})
        else:
            hashed_password = make_password(password)
            user = User(email=serializer.data.get("email"), username=serializer.data.get("username"),
                        password=hashed_password)
            user.save()
            response = JsonResponse({'registered': True, 'success_msg': "User Registration Success"})

    return response


@csrf_exempt
@api_view(['POST'])
def login(request):  # pylint: disable=unused-variable
    """
    Login a user

    Route: /api/login
    Request Parameters:
    - username: string
    - password: string
    """
    email_match = User.objects.filter(email__exact=request.data.get("username"))
    username_match = User.objects.filter(username__exact=request.data.get("username"))
    entered_password = request.data.get("password")
    if email_match.exists():
        actual_password = email_match.values_list('password', flat=True).get()
        password_match = check_password(entered_password, actual_password)
        if password_match:
            user_id = email_match.values_list('id', flat=True).get()
            token = generate_token(user_id)
            return JsonResponse({'auth': True, 'token': token, 'success_msg': "Successful Login"})
    elif username_match.exists():
        actual_password = username_match.values_list('password', flat=True).get()
        password_match = check_password(entered_password, actual_password)
        if password_match:
            user_id = username_match.values_list('id', flat=True).get()
            token = generate_token(user_id)
            return JsonResponse({'auth': True, 'token': token, 'success_msg': "Successful Login"})

    return JsonResponse({'auth': False, 'err_msg': "Failed to Login"})
