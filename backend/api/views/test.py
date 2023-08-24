""" Test """

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt;
from rest_framework.decorators import api_view

@csrf_exempt
@api_view(['GET', 'POST'])
def test(request):
    if request.method == 'GET':
        return JsonResponse({'test': 'test1'})
    elif request.method == 'POST':
        test_data = request.data.get("test")
        return JsonResponse({'test': test_data})