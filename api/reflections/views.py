from rest_framework import viewsets, permissions
from .serializers import ReflectionSerializer
from .models import Reflection
from .permissions import IsUser


class ReflectionViewSet(viewsets.ModelViewSet):
    """This class defines the create behavior of our rest api."""

    queryset = Reflection.objects.all().order_by("author")
    serializer_class = ReflectionSerializer

    def get_permissions(self):
        if self.action == "list":
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [IsUser]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
