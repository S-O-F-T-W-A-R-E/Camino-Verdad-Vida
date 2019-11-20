'''
Created on Apr 2, 2019

@author: cob19
'''
import os
path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
path_titles_n_t_books_txt = os.path.join(path, 'static/biblebookstxt/titlesbooksnewtestament.txt')
path_titles_o_t_books_txt = os.path.join(path, 'static/biblebookstxt/titlesbooksoldtestament.txt')
path_n_t_books = os.path.join(path, 'static/biblebookstxt/newtestament/')
path_o_t_books = os.path.join(path, 'static/biblebookstxt/oldtestament/')

txt_paths = {'path_titles_n_t_books_txt' : path_titles_n_t_books_txt,
           'path_titles_o_t_books_txt' : path_titles_o_t_books_txt,
           'path_n_t_books' : path_n_t_books,
           'path_o_t_books' : path_o_t_books,
           }