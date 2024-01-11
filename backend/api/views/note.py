""" Note Operations """

from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from ..serializers import NoteSerializer
from ..models import Note, User


@csrf_exempt
@api_view(['POST'])
def add_note(request):
    """
    Add a note and store the user_id associated with the note
    Request Parameters:
    - title: string
    - description: string
    - user_id: integer
    """
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        note = Note(
            title=request.data.get('title'),
            description=request.data.get('description'),
            user_id=request.data.get('user_id'),
        )
        note.save()
        return HttpResponse('Add Note')

    return HttpResponse('Data not valid')


@csrf_exempt
@api_view(['PATCH'])
def edit_note(request):
    """
    Update a note by id (Note id)
    Request Parameters:
    - note_id: integer
    - title: string
    - description: string
    """
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        note_id = request.data.get('note_id')
        note = Note.objects.get(id=note_id)
        note.title = request.data.get('title')
        note.description = request.data.get('description')
        note.save()
        return HttpResponse('Update Note')

    return HttpResponse('Data not valid')


@csrf_exempt
@api_view(['DELETE'])
def delete_note(request):
    """
    Delete a note by id (Note id)
    Route: /api/delete-note?note_id={number}
    Example Route: /api/delete-note?note_id=1
    URL Parameters:
    - note_id: integer
    """
    note_id = request.GET.get('note_id', '')
    note = Note.objects.filter(id=note_id)
    note.delete()
    return HttpResponse('Delete Note')


@csrf_exempt
@api_view(['GET'])
def view_notes(request):
    """
    Return the notes the user owns
    Request Parameters:
    - user_id: integer
    """
    user_id = request.GET.get('user_id', '')
    user = User.objects.filter(id=user_id)
    if user.exists():
        notes = Note.objects.filter(user_id__exact=user_id)
        serializer = NoteSerializer(notes, many=True)
        return JsonResponse({'notes': serializer.data})

    return HttpResponse('User does not exist')


@csrf_exempt
@api_view(['GET'])
def fetch_note(request):
    """
    Fetch a note by id (Note id)
    Route: /api/fetch-note?note_id={number}
    Example Route: /api/fetch-note?note_id=1
    URL Parameters:
    - note_id: integer
    """
    note_id = request.GET.get('note_id', '')
    note = Note.objects.get(id=note_id)
    return JsonResponse({'title': note.title, 'description': note.description})
