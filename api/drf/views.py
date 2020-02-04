from rest_framework import viewsets
from .serializers import LetterSerializer
from .models import Letter

class LetterViewSet(viewsets.ModelViewSet):
    """This class defines the create behavior of our rest api."""
    queryset = Letter.objects.all().order_by('author')
    serializer_class = LetterSerializer

