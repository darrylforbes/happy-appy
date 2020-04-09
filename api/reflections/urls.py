from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"reflections", views.ReflectionViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
