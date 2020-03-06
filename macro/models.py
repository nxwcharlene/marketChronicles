from django.db import models

# Create your models here.

class Instrument(models.Model):
    date = models.CharField(max_length=255)
    open = models.CharField(max_length=255)
    high = models.CharField(max_length=255)
    low = models.CharField(max_length=255)
    close = models.CharField(max_length=255)

    def __str__(self):
        return self.first_name