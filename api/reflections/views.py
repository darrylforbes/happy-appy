from rest_framework import viewsets
from .serializers import ReflectionSerializer
from .models import Reflection


class ReflectionViewSet(viewsets.ModelViewSet):
    """This class defines the create behavior of our rest api."""

    queryset = Reflection.objects.all().order_by("author")
    serializer_class = ReflectionSerializer
