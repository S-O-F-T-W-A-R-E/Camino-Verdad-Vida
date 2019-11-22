from django.urls import path
from . import views as biblebooks_views


urlpatterns = [ path('', biblebooks_views.home_view), ]