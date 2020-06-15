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
        fields = ("id", "username", "reflections", "email", "password")
        write_only_fields = ("password",)
        read_only_fields = ("id",)

    def create(self, validated_data):
        """Creates new user."""
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
            email=validated_data["email"],
        )
        user.save()

        return user
