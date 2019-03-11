# -*- coding: utf-8 -*-
import os
import sys

path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,path)

from vistas.Plantillas import ConformarPaginaHTML

def application(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html; charset=utf-8')])
    urlHome = environ['wsgi.url_scheme']+'://'
    if environ.get('HTTP_HOST'):
            urlHome += environ['HTTP_HOST']
    else:
            urlHome += environ['SERVER_NAME']
    paginaWebCompleta = ConformarPaginaHTML('biblia',environ["PATH_INFO"], urlHome)
    presentacionBiblia = paginaWebCompleta.conformandoPagina()
    respuesta = presentacionBiblia
    return [respuesta.encode()]