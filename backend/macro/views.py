from django.shortcuts import render
from django.http import HttpResponse


# CREATE YOUR VIEWS HERE:

# 1: create an index function that will take in a request and return an HTTP response
def index(request):
    return HttpResponse("Hello World! This is the macro views index.", content_type="application/json")
