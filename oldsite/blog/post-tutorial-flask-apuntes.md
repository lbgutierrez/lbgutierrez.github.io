#Tutorial Flask - Apuntes

Los siguientes apuntes tienen como objetivo explicar conceptos relacionados con el Framework Flask, donde podrás acudir de forma inmediata si necesitas aclarar alguna duda. 

Cabe señalar que estos apuntes no son equivalentes a la documentación oficial de Flask, por lo que siempre podrás acudir a ella desde su sitio oficial.

##Rutas

```
Permiten asociar una URL con la lógica de presentación de la página solicitada.

la forma más clásica de definir una ruta, es por medio del decorador app.route, donde app corresponde a la instancia de la aplicación.
	
	Ej: 
		@app.route( '/' )
		def index():
			return '<h1>Hello World!</h1>'
			
Otra forma de definir una ruta es por medio del método app.add_url_rule, que en su forma básica requiere tres argumentos: la URL, el endpoint de la ruta y el nombre de la función.
	
	Ej:
		def index():
			return '<h1>Hello World!</h1>'
			
		app.add_url_rule( '/', 'index', index )
```

##Rutas dinámicas

```
Tienen el mismo propósito que una ruta convencional, sin embargo se diferencia de esta debido a que cuenta con secciones variables que pueden ser recibidas como parámetros en la función de la vista, por ejemplo la página de facebook https://www.facebook.com/<user-name>, donde <user-name> corresponde al nombre de usuario del perfil que se quiere ver.
	
	Ej:
		@app.route('/user/<name>')
		def user(name):
			return '<h1>Hello, {}!</h1>'.format(name)
			
Por defecto las variables de la URL dinámica son de tipo string, pero también podemos cambiar el tipo, definiendo en la ruta la siguiente url /user/<int:id>
```

##Servidor de desarrollo

```
Por defecto, Flask incorpora un servidor de desarrollo para arrancar nuestra aplicación, para ello, el framework provee el comando <b>flask run</b> para su ejecución. Este comando buscará el script de python que contiene la aplicación y para poder encontrarlo, utiliza la variable de entorno FLASK_APP para encontrarla.

	Ej:
		> set FLASK_APP = hello.py
		> flask run

Para ver la aplicación en funcionamiento, debes ingresar a la URL http://localhost:5000/ y para detener el servidor, basta con presionar CTRL + C en la consola.
```

##Modo depuración

```
Cuando activamos el modo de depuración, se activan dos factores útiles para el desarrollador, el primero consiste en el Reloader, encargado de monitorear si ocurren cambios en los archivos, de esta manera reinicia el servidor de forma automática. Por otra parte, el Debug permite visualizar una excepción no controlada a través del navegador web.

Como por defecto, el Debug se encuentra desactivado, para activarlo debes setear la variable de entorno FLASK_DEBUG en 1 antes de ejecutar el comando flask run.

Ej:
	> set FLASK_APP = hello.py
	> set FLASK_DEBUG = 1
	> flask run
```

##Contextos de aplicación y solicitud

```
1. Contexto de aplicación

	- current_app: Instancia de aplicación para la aplicación activa
	- g: Objeto que la aplicación puede utilizar para almacenar datos temporales durante un Request, esta variable se reestablece por cada solicitud
	
2. Contexto de solicitud
	
	- request: Objeto de solicitud, que almacena una petición HTTP enviada por el cliente
	- session: Corresponde a un diccionario que almacena valores que persisten en cada request.
```

##Revisar rutas de la aplicación
```
Si queremos ver el mapa de rutas que se elabora en la aplicación, debemos ingresar a la consola de Python y ejecutar la siguiente:

	(venv) > python
	>>> from hello import app
	>>> app.url_map
```

##Atributos del objeto request

```
	- form: Un diccionario con todos los campos de formulario enviados con la solicitud.

	- args: Un diccionario con todos los argumentos pasados en la cadena de consulta de la URL.

	- values: Un diccionario que combina los valores en formy args.

	- cookies: Un diccionario con todas las cookies incluidas en la solicitud.

	- headers: Un diccionario con todos los encabezados HTTP incluidos en la solicitud.

	- files: Un diccionario con todas las cargas de archivos incluidas con la solicitud.

	- get_data(): Devuelve los datos almacenados en el búfer del cuerpo de la solicitud.

	- get_json(): Devuelve un diccionario de Python con el JSON analizado incluido en el cuerpo de la solicitud.

	- blueprint: El nombre del plano del Frasco que maneja la solicitud.

	- endpoint: El nombre del punto final de Flask que maneja la solicitud. Flask usa el nombre de la función de vista como el nombre del punto final para una ruta.

	- method: El método de solicitud HTTP, como GET o POST.

	- scheme: El esquema de URL (http o https).

	- is_secure(): Devuelve True si la solicitud se realizó a través de una conexión segura (HTTPS).

	- host: El host definido en la solicitud, incluido el número de puerto si lo proporciona el cliente.

	- path: La porción de ruta de la URL.

	- query_string: La parte de la cadena de consulta de la URL, como un valor binario sin procesar.

	- full_path: La ruta y las porciones de cadena de consulta de la URL.

	- url: La URL completa solicitada por el cliente.

	- base_url: Igual que URL, pero sin el componente de cadena de consulta.

	- remote_addr: La dirección IP del cliente.

	- environ: El diccionario de entorno WSGI sin procesar para la solicitud.
```

##Request Hooks

```
Los hooks permiten ejecutar codigo antes y despues de que se realiza una peticion, esto es util cuando queremos registrar informacion en un log, abrir y cerrar una conexion de base de datos, etc.

Flask provee cuatro hooks compatibles:

	- before_request: Registra una función para ejecutar antes de cada solicitud.

	- before_first_request: Registra una función para ejecutarse solo antes de que se maneje la primera solicitud. Esta puede ser una forma conveniente de agregar tareas de inicialización del servidor.

	- after_request: Registra una función para ejecutar después de cada solicitud, pero solo si no se produjeron excepciones no controladas.

	- teardown_request: Registra una función para ejecutar después de cada solicitud, incluso si se produjeron excepciones no controladas.
```

##Response

```
Como se ha visto en ejemplos anteriores, las respuestas se han basado en cadenas de texto (String), sin embargo, podemos devolver tuplas en la cual devolvamos un codigo de respuesta distinto al estado 200 (estado ok).
	
	Ej:
		@app.route('/')
		def index():
			return '<h1>Bad Request</h1>', 400
			
Sin embargo, Flask proporciona la funcion make_response() que puede recibir hasta 3 argumentos y devuelve un objeto response. Este metodo es util si queremos customizar la respuesta para modificar cookie por ejemplo.

	Ej:
		from flask import make_response

		@app.route('/')
		def index():
			response = make_response('<h1>This document carries a cookie!</h1>')
			response.set_cookie('answer', '42')
			return response
			
Los atributos del objeto response, son los siguientes:

	- status_code: El código numérico de estado HTTP

	- headers: Un objeto tipo diccionario con todos los encabezados que se enviarán con la respuesta.

	- set_cookie(): Agrega una cookie a la respuesta.

	- delete_cookie(): Elimina una cookie

	- content_length: La longitud del cuerpo de respuesta.

	- content_type: El tipo de medio del cuerpo de respuesta

	- set_data(): Establece el cuerpo de la respuesta como un valor de cadena o bytes

	- get_data(): Obtiene el cuerpo de respuesta
```

##Redirect

```
Un redirect es un tipo especial de respuesta, que se utiliza por lo general al recibir peticiones de formulario. El código de estado de respuesta es el 302, sin embargo el Framework Flask proporciona una función redirect() para este propósito.

	Ej:
		from flask import redirect

		@app.route('/')
		def index():
			return redirect('http://www.example.com')
```
		
##Abort

```
Es otra respuesta especial es la generada por la función abort(), que se utiliza para el manejo de errores.
	
	Ej:
		from flask import abort

		@app.route('/user/<id>')
		def get_user(id):
			user = load_user(id)
			if not user:
				abort(404)
			return '<h1>Hello, {}</h1>'.format(user.name)

Ten en cuenta que abort()no devuelve el control a la función porque genera una excepción.
```