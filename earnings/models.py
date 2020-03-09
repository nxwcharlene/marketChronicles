from django.db import models

# Create your models here.

class StockPrice(models.Model):
    stock_id = models.CharField()
    ticker = models.CharField(max_length=64)
    close_price = models.FloatField()
