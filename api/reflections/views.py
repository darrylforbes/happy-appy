from rest_framework import viewsets, permissions
from .serializers import ReflectionSerializer
from .models import Reflection


class ReflectionViewSet(viewsets.ModelViewSet):
    """This class defines the create behavior of our rest api."""

    queryset = Reflection.objects.all().order_by("author")
    serializer_class = ReflectionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
