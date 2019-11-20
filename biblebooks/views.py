# -*- coding: utf-8 -*-
#Bible books views


from biblebooks.content.ContentManagementTextFiles import ContentManagementTextFiles
from django.shortcuts import render

def home_view(request):
    '''List existing posts.'''    
    a = ContentManagementTextFiles()
    b = a.create_bible_dictionary()
    return render(request, 'book.html', {'name': b}) 

def book_view(request, testamento, libro, capitulo, initial_verse, final_verse):
    '''List existing posts.'''    
    a = ContentManagementTextFiles()
    b = a.create_bible_dictionary()
    return render(request, 'book.html', {'name': b})   
