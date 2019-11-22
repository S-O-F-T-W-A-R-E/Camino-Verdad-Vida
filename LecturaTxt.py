class frag:
    archivo = open("Genesis.txt", "r")
    contenido = archivo.readlines()
fichero = frag()
for linea in fichero.contenido:
    print(linea)
fichero.archivo.close()