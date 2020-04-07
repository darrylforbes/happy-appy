from django.db import models

class Reflection(models.Model):
    """This class represents the Reflection model."""
    author = models.CharField(max_length=255, blank=False)
    content = models.TextField(null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    recipient = models.CharField(max_length=255, blank=False)
    title = models.CharField(default="test", max_length=255)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}".format(self.author)
