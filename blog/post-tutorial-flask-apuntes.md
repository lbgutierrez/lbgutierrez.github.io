#Tutorial Flask - Apuntes

Los siguientes apuntes tienen como objetivo explicar conceptos relacionados con el Framework Flask, donde podrás acudir de forma inmediata si necesitas aclarar alguna duda. 

Cabe señalar que estos apuntes no son equivalentes a la documentacion oficial de flask, por lo que siempre podras acudir a ella desde su sitio oficial.

##Rutas

```
Permiten asociar una URL con la logica de presentacion de la pagina solicitada.

la forma mas clasica de definir una ruta, es por medio del decorador app.route, donde app corresponde a la instancia de la aplicacion.
	Ej: 
		@app.route( '/' )
		def index():
			return '<h1>Hello World!</h1>'
			
Otra forma de definir una ruta es por medio del metodo app.add_url_rule, que en su forma basica requiere tres argumentos: la URL, el endpoint de la ruta y el nombre de la funcion.
	Ej:
		def index():
			return '<h1>Hello World!</h1>'
			
		app.add_url_rule( '/', 'index', index )
		
Las URL pueden tener secciones variables que pueden ser recibidas como parametros en la funcion de la vista, por ejemplo la pagina de facebook https://www.facebook.com/<user-name>, donde <user-name> corresponde al nombre de usuario del perfil que se quiere ver.
	Ej:
		@app.route('/user/<name>')
		def user(name):
			return '<h1>Hello, {}!</h1>'.format(name)
			
Por defecto las variables de la url dinamica son de tipo string, pero tambien podemos cambiar el tipo, definiendo en la ruta la siguiente url /user/<int:id>

```