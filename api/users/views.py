from rest_framework import viewsets
from .serializers import UserSerializer
from django.contrib.auth.models import User


class UserViewSet(viewsets.ModelViewSet):
    """This class defines the create behavior of our rest api."""

    queryset = User.objects.all()
    serializer_class = UserSerializer
