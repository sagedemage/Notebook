""" Row Operations """

from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt;
from rest_framework.decorators import api_view
from ..serializers import NoteSerializer
from ..models import Note, User


@csrf_exempt
@api_view(['POST'])
def add_note(request):
    """
    Request Parameters:
    - title: string
    - description: string
    - user_id: integer
    """
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        # user = User.objects.filter(id=user_id)
        note = Note(
            title=request.data.get("title"),
            description=request.data.get("description"),
            user_id=request.data.get("user_id"),
        )
        note.save()
        return HttpResponse("Add Note")
    else:
        return HttpResponse("Data not valid")


@csrf_exempt
@api_view(['PATCH'])
def update_note(request):
    """
    Request Parameters:
    - id: integer
    - title: integer
    - description: integer
    """
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        note_id = request.data.get("id")
        note = Note.objects.get(id=note_id)
        note.title = request.data.get("title")
        note.description = request.data.get("description")
        note.save()
        return HttpResponse("Update Note")
    else:
        return HttpResponse("Data not valid")

@csrf_exempt
@api_view(['DELETE'])
def delete_note(request):
    """
    Request Parameters:
    - note_id: integer
    """
    note_id = request.GET.get("id", "")
    row = Note.objects.filter(id=note_id)
    row.delete()
    return HttpResponse("Delete Note")

@csrf_exempt
@api_view(['GET'])
def view_notes(request):
    """
    Request Parameters:
    - note_id: integer
    """
    user_id = request.GET.get("user_id", "")
    user = User.objects.filter(id=user_id)
    if user.exists():
        notes = Note.objects.filter(user_id__exact=user_id)
        serializer = NoteSerializer(notes, many=True)
        return JsonResponse({'rows': serializer.data})
    else:
        return HttpResponse("User does not exist")

@csrf_exempt
@api_view(['GET'])
def fetch_note(request):
    """
    Route: /api/fetch-note?user_id={number}
    Example Route: /api/fetch-note?user_id=1
    URL Parameters:
    - user_id: integer
    """
    note_id = request.GET.get('id', '')
    note = Note.objects.get(id=note_id)
    return JsonResponse({"title": note.title, "description": note.description})