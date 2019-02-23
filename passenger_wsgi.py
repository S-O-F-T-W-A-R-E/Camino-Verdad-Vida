# -*- coding: utf-8 -*-
import os
import sys

path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,path)

from vistas.Plantillas import ConformarPaginaHTML

def application(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html; charset=utf-8')])
    paginaWebCompleta = ConformarPaginaHTML('biblia',environ["PATH_INFO"])
    presentacionBiblia = paginaWebCompleta.conformandoPagina()
    respuesta = presentacionBiblia
    return [respuesta.encode()]