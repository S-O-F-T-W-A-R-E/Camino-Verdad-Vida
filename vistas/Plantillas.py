# -*- coding: utf-8 -*-
'''
Created on Feb 16, 2019

@author: cob19
'''
import os
import sys
path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pathTitulosLibrosTxt = os.path.join(path, 'librostxt/tituloslibrosbiblia.txt')
pathLibrosCompletos = os.path.join(path, 'librostxt')
sys.path.insert(0,path)

from ficheros.GestionFicheros import GestionFicherosTexto

class PresentacionBiblia(object):
    '''
    Esta clase contempla la vista de los libros y capítulos de la Biblia. Se basa en propiedades tipo string que contendrán los diferentes
     elementos y etiquetas html que serán visualizados de forma estático generalmente.
    '''
    segmento1 = '''<!DOCTYPE html>
     <html>
    <head>
        <meta charset="UTF-8">
        <title>Yo soy el camino, y la verdad, y la vida </title>
        <style type="text/css">
        body { /* Redefinimos la etiqueta body */
            padding: 0px;
            margin: 0px;
            font-family: arial, helvetica;
            width: 80%;
            margin: 0 auto; 
        }
        h1, h2 { /* Redefinimos las etiquetas de cabecera */
            color: navy;
        }
        #header { /* Estilo para la cabecera usando su identificador */
            padding: 15px 20px;
            background-color: #E3DAFF;
            border-bottom: 1px solid silver; 
        }
        #article
        { background:#c0c0c0;
         color:#000080;
         font-family:"Century Gothic";
         float: left;
         width: 80%;
         }
        #sidebar {
            float: left;
            width: 15%;
        }
        #article {
            float: left;
            width: 80%;
        }
        #footer {
            clear: both; 
            text-align: center;
            border-top: 1px solid silver; 
            font-size: small;
            color: gray;
            background-color: #E3DAFF;
            padding: 20px;
        }
        #sidebar a { /* Estilo para los enlaces de la barra lateral */
            text-transform: uppercase;
            text-decoration: none;
            padding: 1px 5px; 
            display: block; 
        }
        #sidebar a:hover { /* Pseudo-clase para los enlaces */
            background-color: navy;
            color: white; 
        }
        
        #sidebar a:visited{
            color: blue
        }
        #article p {
            line-height: 20pt;
        }
        .nota { /* Definimos la clase .nota */
            background-color: yellow;
        }
        .alineado-derecha { /* Definimos la clase .alineado-derecha */
            text-align: right;
        }
    </style>
    </head>
   <body>
    <div id="header">
        <h1>Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.</h1>
    </div>
    <div id="content">

        <div id="sidebar" style="padding-top: 15px"> '''
    
    segmento2 = '''
     </div>
        <div id="article">

            <h2>Contenidos</h2>

            <p>'''
            
    segmento3 = '''</p>            

        </div>    
    </div>
    <div id="footer">
        Web de ejemplo
    </div>
</body>
</html> '''

    def __init__(self):
        '''
        Constructor
        '''
class ConformarPaginaHTML:
    def __init__(self, tipoPagina,urlSolicitada):        
        '''
        Inicializa la variable tipoPagina la cual será utilizada para determinar que tipo de plantilla será conformada
        '''
        self.tipoPagina = tipoPagina
        self.urlSolicitada = urlSolicitada
        
    def conformandoPagina(self):
        '''
        Concatena las variables que contienen los elementos html de las plantillas y las variables dinámicas. 
        Estas variables dinámicas serán gestionadas por diferentes métodos, las mismas estarán vinculadas tanto
         a ficheros de textos como a bases de datos
        '''
        if self.tipoPagina == 'biblia':
            plantilla = PresentacionBiblia()
            titulosLibros = GestionFicherosTexto()
            nombreFicherosTitulosLibros = titulosLibros.gestionarTitulosLibrosTitulosFicherosBiblia(pathTitulosLibrosTxt)
            listaTitulosRef = ''
            
            for nombreFichero, tituloLibro in nombreFicherosTitulosLibros.items():
                listaTitulosRef+='''<a href="http://www.caminoverdadvida.net/libros/'''+ nombreFichero +'''">''' + tituloLibro + '''</a></br>'''
            contenidoBody = self.gestionarContenidoBody()   
            presentacionBiblia = plantilla.segmento1 + listaTitulosRef + plantilla.segmento2 + contenidoBody + plantilla.segmento3
        return presentacionBiblia
    
    
    
    def gestionarContenidoBody(self):
        '''
        Se gestiona el contenido de la página solicitada utilizando el diccionario que se gestiona a través del módulo GestionFicheros, 
        usando expecíficamente el método gestionarTitulosLibrosTitulosFicherosBiblia()         
        '''
        if self.tipoPagina == 'biblia':   
            plantilla = PresentacionBiblia()
            libros = GestionFicherosTexto()
            contenidoLibro = ""
            if self.urlSolicitada == "/":
                contenidoLibro = libros.gestionarContenidoLibroCompletoTxt(pathLibrosCompletos+"/genesis.txt")
                return contenidoLibro
            
            nombreFicherosTitulosLibros = libros.gestionarTitulosLibrosTitulosFicherosBiblia(pathTitulosLibrosTxt)
            for nombreFichero, tituloLibro in nombreFicherosTitulosLibros.items():
                #print(nombreFichero.rstrip('\n') + self.urlSolicitada.split("/")[2].rstrip('\n'))
                if nombreFichero.rstrip('\n') == self.urlSolicitada.split("/")[2].rstrip('\n'):
                    rutaLibroTxt = ("librostxt/"+nombreFichero).rstrip('\n')
                    contenidoLibro=libros.gestionarContenidoLibroCompletoTxt(rutaLibroTxt +".txt")
                    break
        return contenidoLibro
    
    def obtenerContenidoLibroCompletoTxt(self):        
        titulosLibros = GestionFicherosTexto()
        nombreFicherosTitulosLibros = titulosLibros.gestionarTitulosLibrosTitulosFicherosBiblia(pathTitulosLibrosTxt)
        return nombreFicherosTitulosLibros
            
# algo = ConformarPaginaHTML('biblia','/libros/genesis')
# print(algo.conformandoPagina())