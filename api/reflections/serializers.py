from rest_framework import serializers
from .models import Reflection


class ReflectionSerializer(serializers.ModelSerializer):
    """Serializer to map the Reflection instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""

        model = Reflection
        fields = ("author", "content", "recipient", "title")
        read_only_fields = ("date_created",)
