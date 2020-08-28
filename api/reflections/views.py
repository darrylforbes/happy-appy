from rest_framework import viewsets, permissions
from .serializers import ReflectionSerializer
from .models import Reflection
from .permissions import IsUser


class ReflectionViewSet(viewsets.ModelViewSet):
    """This class defines the create behavior of our rest api."""

    queryset = Reflection.objects.all().order_by("author")
    serializer_class = ReflectionSerializer

    def get_queryset(self):
        if self.action == 'list':
            return self.queryset.filter(author=self.request.user)
        return self.queryset

    def get_permissions(self):
        # if self.action == "create":
        #     permission_classes = [permissions.IsAuthenticated]
        #     permission_classes = [IsUser]
        # elif self.action == "list":
        #     permission_classes = [permissions.IsAdminUser]
        #     permission_classes = [IsUser]
        # else:
        #     permission_classes = [IsUser]
        permission_classes = [IsUser]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
