# -*- coding: utf-8 -*-
'''
Created on Feb 16, 2019

@author: cob19
'''

from biblebooks.paths.paths import txt_paths
import re
import os
#import sys

path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# sys.path.insert(0,path)


class ContentManagementTextFiles:
    '''
    This class will be used for everything related to the text files used by the application,
    methods that manage content in the files are implemented, as well as managing the text files
    for their creation, deletion, change of names, etc. .
    '''

    def create_bible_dictionary(self):
        '''
       To create a object of the type dictionary, that save the old and new testament, with their respective books, chapters and contents.
       books_chapters_old_t_dictionary is the dictionary return in the create_books_chapters_dictionary function
        '''
        books_chapters_new_t_dictionary = self.create_books_chapters_dictionary(
            'NT')
        books_chapters_old_t_dictionary = self.create_books_chapters_dictionary(
            'AT')
        bible_dictionary = {
            'AT': books_chapters_old_t_dictionary, 'NT': books_chapters_new_t_dictionary}

        return bible_dictionary

    def create_books_chapters_dictionary(self, testament="AT"):
        '''
        Create a dictionary type object, which according to the "testament" parameter, which is passed to the function,
        will return a data structure of the new or the old testament with all the books, its chapters,
        and the content of each chapter with a structure hierarchical.
        The returned object books_chapters_dictionary will have the following format:
        books_chapters_dictionary={
                              title_book1 : chapter_content_verse_book1,
                              title_book2 : chapter_content_verse_book2,
                              ...
                              title_book3 : chapter_content_verse_book3,
                              }
        The chapter_content_verse_book objects would be the object returned in the create_chapter_content_verse() function
        '''
        books_chapters_dictionary = {}
        file_names_and_titles_books = {}

        if(testament == 'AT'):
            file_names_and_titles_books = self.management_file_name_title_book(
                txt_paths['path_titles_o_t_books_txt'])
            book_route_txt_format = txt_paths['path_o_t_books']
        else:
            file_names_and_titles_books = self.management_file_name_title_book(
                txt_paths['path_titles_n_t_books_txt'])
            book_route_txt_format = txt_paths['path_n_t_books']

        for (file, title) in file_names_and_titles_books.items():

            title_n_l = title.rstrip()
            title_n_l = title_n_l.replace('° de', '')
            title_n_l = title_n_l.replace('ª a los', '')
            title_n_l = title_n_l.replace('ª a', '')
            title_n_l = title_n_l.replace('ª de', '')
            title_n_l = title_n_l.replace('Los Salmos', 'Salmo')
            title_n_l = title_n_l.replace('El Cantar de los ', '')
            title_n_l = title_n_l.replace(
                'Lamentaciones de Jeremías', 'Lamentaciones')
            title_n_l = title_n_l.replace('Los ', '')

            txt_book_path = book_route_txt_format + file.rstrip() + '.txt'
            chapters_contents_dict = self.manage_complete_content_book(
                title_n_l, txt_book_path)
            chapter_content_verse = self.create_chapter_content_verse(
                chapters_contents_dict)
            books_chapters_dictionary[title_n_l] = chapter_content_verse
        return books_chapters_dictionary

    def create_chapter_content_verse(self, chapters_contents_dict):
        '''
        This method manages the contents of a book and the positions of each number of the verses in the content.
        Returns a chapter_content_verse object of the dictionary type that contains all the chapters and their contents.
        Each chapter will be the key and the value will be a tuple with the biblical content of each chapter and a dictionary with the verse and its position.
        The returned object chapter_content_verse will have the following format:
        chapter_content_verse={
                              chapter1:[content,{verse:(positionStart,positionEnd)}],
                              chapter2:[...],
                              chapter3:[...],
                              }
        '''
        chapter_content_verse = {}
        for chapter in chapters_contents_dict:
            verses = {}
            content = {}
            content['otherHeader'] = re.split(
                chapter, chapters_contents_dict[chapter])[0]
            content['titleChapter'] = chapter
            content['desarrollo'] = re.split(
                chapter + '</br>', chapters_contents_dict[chapter])[1]
            regeditReferences = re.compile(
                "\((([0-9]+ )|())([a-zA-Z]+)\. [0-9]+\.[0-9]+((-[0-9]+)|())(((; [0-9]+\.[0-9]+((-[0-9]+)|()))+)|())(((; (([0-9]+ )|())([a-zA-Z]+)\. [0-9]+\.[0-9]+((-[0-9]+)|())(((; [0-9]+\.[0-9]+((-[0-9]+)|()))+)|()))+)|())\)")
            b = content['desarrollo']
            for reference in regeditReferences.finditer(content['desarrollo']):
                repl = ''
                for character in range(len(reference.group(0))-2):
                    repl += '@'
                b = re.sub(reference.group(0), repl, b)
            versesList = []
            for m in re.finditer("\d+", b):
                versesList.append(m.span()[0])
                verses[m.group(0)] = [m.span()[0], len(b)-1]
                if(int(m.group(0)) > 1):
                    verses[str(int(m.group(0))-1)][1] = m.span()[0]
            chapter_content_verse[chapter] = [content, verses]

        return chapter_content_verse

    def manage_complete_content_book(self, book_name, book_route_txt_format):
        '''
        This method manages the content of a book in the text file according to the route passed as a parameter. 
        Returns a chapters_contents_dict object of the dictionary type which contains all the chapters and their contents. 
        Each chapter will be the key and the content will be the value.
        '''
        chapters_contents_dict = {}
        file = open(book_route_txt_format, encoding='windows-1252')
        content = file.readlines()
        book_name = book_name.upper()
        line_break = '</br>'
        key = ""
        value = ""
        #chapters_contents_dict[key] = ""
        for line in content:
            y = re.search("\A&", line)
            if(y != None):
                value = line.replace('&', '').strip().replace(
                    '\n', '') + line_break
                key = ""
            else:
                line = line.strip().replace('\n', '')
                if(line != ''):
                    value += line + line_break
            x = re.search(book_name+" \d+", line)
            if(x != None):
                key = x.string.rstrip().replace('&', '')
            if(key != ""):
                chapters_contents_dict[key] = value
        file.close()
        return chapters_contents_dict

    def management_file_name_title_book(self, path_file_titles_books):
        '''
        It manages the names of the files of each book as well as the title of the book in a more literary way. 
        This management will be based on a text file, which must have related to each other the titles of each 
        biblical book and its respective name of the text file. It will return a dictionary with the names of 
        the files as keys and the titles as the values
        '''
        file = open(path_file_titles_books, encoding='windows-1252')
        content = file.readlines()
        fragmented_line = ()
        file_names_and_titles_books = {}

        for title in content:
            fragmented_line = title.split(" ")
            counter = 0
            file_name_dictionary_key = fragmented_line[len(fragmented_line)-1]
            title_book_dictionary_value = ""
            while counter < (len(fragmented_line)-1):
                title_book_dictionary_value += (fragmented_line[counter]+" ")
                counter += 1
            file_names_and_titles_books[file_name_dictionary_key] = title_book_dictionary_value
        file.close()
        return file_names_and_titles_books


a = ContentManagementTextFiles()
b = a.create_books_chapters_dictionary()
print(b['Génesis']['GÉNESIS 1'][1])
print(b['Génesis']['GÉNESIS 1'][0])
