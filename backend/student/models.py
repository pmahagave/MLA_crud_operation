from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    
    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'students'