'''
Created on Feb 16, 2019

@author: cob19
'''
class GestionFicherosTexto:
    '''
    Esta clase se usará para todo lo relacionado con los ficheros de textos que utilice la aplicación, 
    se implementan métodos que gestionan contenidos en los ficheros, al igual que administraran los ficheros de textos para su creación, 
    borrado, cambio de nombres, etc.
    '''
    #def __init__(self, nombreFichero):
     #   '''
     #   Se inicializa una variable con el nombre del fichero de texto que se gestionará
     #   '''
     #   self.nombreFichero = nombreFichero
        
    def gestionarTitulosLibrosTitulosFicherosBiblia(self, rutaFicheroTitulosLibros):
        '''
        Gestiona los nombres de los ficheros de cada libro así como el título del libro de forma más literario.
         Esta gestión será a partir de un fichero de texto, el cuál deberá tener relacionados entre sí los títulos de cada libro
         bíblico y su respectivo nombre del fichero de texto. Devolverá un diccionario con los nombres de los ficheros como claves 
         y los títulos como los valores
        '''
        archivo = open(rutaFicheroTitulosLibros, encoding='windows-1252')
        contenido = archivo.readlines()
        misTitulos = []
        lineaFragmentada = ()
        nombreFicherosTitulosLibros = {}
        
        for titulo in contenido:
            lineaFragmentada = titulo.split(" ")
            contador = 0
            claveNombreFicheroDiccionario = lineaFragmentada[len(lineaFragmentada)-1] # Esta variable almacena el nombre del fichero correspondiente al libro y la misma se utilizará como clave de un diccionario
            valorTituloLibroDiccionario = ""   # Esta variable almacena el Título correspondiente al libro y la misma se utilizará como valor de un diccionario
            while contador< (len(lineaFragmentada)-1):
                valorTituloLibroDiccionario += (lineaFragmentada[contador]+" ")
                contador +=1
            nombreFicherosTitulosLibros[claveNombreFicheroDiccionario] = valorTituloLibroDiccionario
        archivo.close()
        return nombreFicherosTitulosLibros
    
   # def gestionarHiperviculosTitulosLibroBiblia:
   
    def gestionarContenidoLibroCompletoTxt(self, rutaLibroTxt):
        archivo = open(rutaLibroTxt, encoding='windows-1252')
        contenidoSinOrganizar = archivo.readlines()
        contenido = ""
        for linea in contenidoSinOrganizar:
            contenido += linea + "</br>"
        archivo.close()
        return contenido
        