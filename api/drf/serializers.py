from rest_framework import serializers
from .models import Letter

class LetterSerializer(serializers.ModelSerializer):
    """Serializer to map the Letter instance into JSON format."""
    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Letter
        fields = ('author', 'content', 'recipient', 'title')
        read_only_fields = ('date_created', )

