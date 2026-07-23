from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=50)
    release_year = models.IntegerField()
    author = models.CharField(max_length=100, default="")
    genre = models.CharField(max_length=50, default="")

    def __str__(self):
        return self.title