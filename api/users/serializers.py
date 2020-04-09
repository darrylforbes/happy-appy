from rest_framework import serializers
from django.contrib.auth.models import User
from reflections.models import Reflection


class UserSerializer(serializers.ModelSerializer):
    """Serializer to map the User instance into JSON format."""

    reflections = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Reflection.objects.all()
    )

    class Meta:
        """Meta class to map serializer's fields with the model fields."""

        model = User
        fields = ("id", "username", "reflections")
