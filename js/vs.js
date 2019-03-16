//Array para guardar los recursos del sistema
var arrayRecursos = new Array();
//Array para guardar las temporadas del sistema
var arraySeason = new Array();
//Estas variables controlan las bases de datos
var version = 1;
nombreDB = "GUIROMO_CHANNEL";
//Funcion que crea las bases de datos del sistema
function crearTablas(){
	if(!window.indexedDB){
		window.alert("El navegador no soporta la base de datos IndexedDB. El contenido que añadas, elimines o modifiques no es permanente");
	}
	//nombre de la base de datos y versión
	var dataBase = indexedDB.open(nombreDB, version);

	dataBase.onupgradeneeded = function (e) {  
		var active = dataBase.result;
		/* TABLAS DE OBJETOS */
		//Creacion de la tabla Categorias
		active.createObjectStore("categorias", { keyPath: 'name' });	
		//Creacion de la tabla Producciones
		active.createObjectStore("producciones", { keyPath: 'title'	});
		//Creacion de la tabla actores
		active.createObjectStore("actores", { keyPath: 'completo' });
		//Creacion de la tabla directores
		active.createObjectStore("directores", { keyPath: 'completo' });
		//Creacion de la tabla usuarios
		active.createObjectStore("usuarios", { keyPath: 'email' });
		//Creacion de la tabla usuarios
		active.createObjectStore("recursos", { keyPath: 'link' });

		/* TABLAS DE RELACIONES ENTRE OBJETOS */
		//Creacion de la tabla de producciones de una categoria
		active.createObjectStore("categoryPro", { keyPath: 'category' });
		//Creacion de la tabla de producciones de un director
		active.createObjectStore("directorPro", { keyPath: 'completo' });
		//Creacion de la tabla de reaprto de una produccion
		active.createObjectStore("repartoPro", { keyPath: 'completo' });
	};//FIn del dataBase.onupgradeneeded
}//FIn de baseIndexed

//añade los valores iniciales a la base de datos
function addValues(tabla,array) {
	//Abre la conexion con la base de datos 
	var request = indexedDB.open(nombreDB);
	//Si ha salido bien
	request.onsuccess = function(event) {
		//Asigna el resultado a la variable db, que tiene la base de datos 
		var db = event.target.result;         
		var objectStore = db.transaction([tabla],"readwrite").objectStore(tabla);
		// Se usa transaction.oncomplete para asegurarse que la creación del almacén 
		// haya finalizado antes de añadir los datos en el.
		objectStore.transaction.oncomplete = function(event) {
			// Guarda los datos en el almacén recién creado.
			var addObjectStore = db.transaction([tabla],"readwrite").objectStore(tabla);
			for (var i in array) {
				//Se parsea el objeto recibido del JSON
				addObjectStore.add(array[i]);
			}
		};//Fin de tablaCategorias.transaction.oncomplete
	};//Fin de request.onsuccess
}//Fin de addvalues

//Funcion que inicializa todos los objetos y la relacion entre ellos
function initPopulate(){	
	var arrayCat = new Array();
	var arrayPro = new Array();
	var arrayAct = new Array();
	var arrayDir = new Array();
	var arrayUser = new Array();
	var arrayResources = new Array();
	var arraycatPro = new Array();
	var arrayRePro = new Array();
	var arrayDirPro = new Array();
	//SE leen los datos iniciales del fichero JSON
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			//Para cada array del videosystem
			for(i in myObj.categorias){
				//Se guardan los valores en el array 
				arrayCat.push(myObj.categorias[i]);
			}//Fin del for 
			for(i in myObj.producciones){
				//Se guardan los valores en el array
				arrayPro.push(myObj.producciones[i]);
			}//Fin del for 
			for(i in myObj.actores){
				//Se guardan los valores en el array
				arrayAct.push(myObj.actores[i]);
			}//Fin del for
			for(i in myObj.directores){
				//Se guardan los valores en el array
				arrayDir.push(myObj.directores[i]);
			}//Fin del for
			for(i in myObj.usuarios){
				//Se guardan los valores en el array
				arrayUser.push(myObj.usuarios[i]);
			}//Fin del for 
			for(i in myObj.resources){
				//Se guardan los valores en el array
				arrayResources.push(myObj.resources[i]);
			}//Fin del for 
			//RELACIONES ENTRE LOS OBJETOS
			for(i in myObj.categoryPro){
				//Se guardan los valores en el array
				arraycatPro.push(myObj.categoryPro[i]);
			}//Fin del for 
			for(i in myObj.repartoPro){
				//Se guardan los valores en el array
				arrayRePro.push(myObj.repartoPro[i]);
			}//Fin del for 
			for(i in myObj.directorPro){
				//Se guardan los valores en el array
				arrayDirPro.push(myObj.directorPro[i]);
			}//Fin del for 
			//Se añaden los valores a la base de datos
			addValues("categorias",arrayCat);
			addValues("producciones",arrayPro);
			addValues("actores",arrayAct);
			addValues("directores",arrayDir);
			addValues("usuarios",arrayUser);
			addValues("recursos",arrayResources);
			//RELACIONES ENTRE LOS OBJETOS
			addValues("categoryPro",arraycatPro);
			addValues("repartoPro",arrayRePro);
			addValues("directorPro",arrayDirPro);
		}//FIn del if
	};// fin de xmlhttp.onreadystatechange
	xmlhttp.open("GET", "js/datos.json", true);
	xmlhttp.send();

	//Se crea el objeto VideoSystem y se le añade el nombre 
	try {
		video = VideoSystem.getInstance();
		video.name = "GUIROMO CHANNEL";
	} catch (error) {
		console.log("" + error);
	}
	
}//Fin de initPopulate

//Funcion que actualiza las migas de pan
function breadcrumb(lugar, anterior, valor){
	var nav = document.getElementById("navMigas");
	//Selecciona la zona de las migas de pan y quita el contenido para añadir el nuevo
	var migas = document.getElementById("breadcrumb");
	while (migas.firstChild) {
		migas.removeChild(migas.firstChild);
	}
	//Añade el boton de cerrar ventanas
	var liVentanas = document.createElement("li");
	liVentanas.setAttribute("class","nav-item ml-auto");
	liVentanas.setAttribute("style","display: none");
	liVentanas.setAttribute("id","btnVentanas");
	var btnVentanas = document.createElement("button");
	btnVentanas.setAttribute("type","button");
	btnVentanas.setAttribute("class","btn btn-outline-secondary btn-sm cerrarVentana");
	btnVentanas.addEventListener("click",cerrarVentanas);
	btnVentanas.appendChild(document.createTextNode("Cerrar ventanas"));
	liVentanas.appendChild(btnVentanas);
	
	if (lugar == "Inicio") {
		var inicio = document.createElement("li");
		inicio.setAttribute("class","breadcrumb-item btn btn-sm active");
		inicio.appendChild(document.createTextNode(valor));
		inicio.addEventListener("click",function(){
					//Selecciona la zona debajo del menu horizontal de edicion y la muestra
					var contenidoCentral = document.getElementById("contenidoCentral");
					contenidoCentral.setAttribute("class","d-block");
					//Selecciona la zona para poner los formularios
					var contenidoFormularios = document.getElementById("contenidoFormularios");
					contenidoFormularios.setAttribute("class","d-none");
					showHomePage();
				});
		migas.appendChild(inicio);
		nav.appendChild(liVentanas);
	}else if ((lugar == "Actores") || (lugar == "Directores") || (lugar == "Producciones")) {
		var inicio = document.createElement("li");
		var enlaceInicio = document.createElement("button");
		inicio.setAttribute("class","breadcrumb-item ");
		enlaceInicio.appendChild(document.createTextNode("Inicio"));
		enlaceInicio.setAttribute("class","btn btn-link btn-sm");
		enlaceInicio.addEventListener("click",showHomePage);
		inicio.appendChild(enlaceInicio);
		migas.appendChild(inicio);
		var actual = document.createElement("li");
		actual.setAttribute("class","breadcrumb-item btn btn-sm active");
		actual.appendChild(document.createTextNode(valor));
		migas.appendChild(actual);
		nav.appendChild(liVentanas);
	}else {
		var inicio = document.createElement("li");
		var enlaceInicio = document.createElement("button");
		inicio.setAttribute("class","breadcrumb-item ");
		enlaceInicio.appendChild(document.createTextNode("Inicio"));
		enlaceInicio.setAttribute("class","btn btn-link btn-sm");
		enlaceInicio.addEventListener("click",showHomePage);
		inicio.appendChild(enlaceInicio);
		migas.appendChild(inicio);
		var ultimo = document.createElement("li");
		var enlaceUltimo = document.createElement("button");
		ultimo.setAttribute("class","breadcrumb-item ");
		enlaceUltimo.appendChild(document.createTextNode(anterior));
		enlaceUltimo.setAttribute("class","btn btn-link btn-sm");
		enlaceUltimo.setAttribute("value",anterior);
		if (lugar == "Produccion") {
			enlaceUltimo.addEventListener("click",showProductions);
		}else if(lugar == "Actor"){
			enlaceUltimo.addEventListener("click",showActors);
		}else{
			enlaceUltimo.addEventListener("click",showDirectors);
		}
		ultimo.appendChild(enlaceUltimo);
		migas.appendChild(ultimo);
		var actual = document.createElement("li");
		actual.setAttribute("class","breadcrumb-item btn btn-sm active");
		actual.setAttribute("aria-current","page");
		actual.appendChild(document.createTextNode(valor));
		migas.appendChild(actual);
		nav.appendChild(liVentanas);
	}
}//Fin de breadcrumb

//Carga las tarjetas de la pagina de inicio con las categorias
function showHomePage(){
	//Selecciona el titulo central y le cambia el nombre
	var tituloContenido = document.getElementById("tituloZona");
	tituloContenido.innerHTML = "Categorias del sistema";
	tituloContenido.style.display = "block";

	//Selecciona la zona debajo del menu horizontal de edicion y la muestra
	var contenidoCentral = document.getElementById("contenidoCentral");
	contenidoCentral.setAttribute("class","d-block");
	//oculta la zona para poner los formularios
	var contenidoFormularios = document.getElementById("contenidoFormularios");
	contenidoFormularios.setAttribute("class","d-none");

	//Actualiza las migas de pan
	breadcrumb("Inicio",null,"Inicio");

	//Selecciona la zona central donde van las tarjetas de las categorias
	var tarjetas = document.getElementById("tarjetasZona");
	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE TARJETAS
	while (tarjetas.firstChild) {
		tarjetas.removeChild(tarjetas.firstChild);
	}
	//Abre la conexion con la base de datos categorias
	var request = indexedDB.open(nombreDB);
	//Si ha salido bien
	request.onsuccess = function(event) {
		//Asigna el resultado a la variable db, que tiene la base de datos 
		var db = event.target.result;         
		var objectStore = db.transaction(["categorias"],"readonly").objectStore("categorias");
		//Abre un cursor para recorrer todos los objetos de la base de datos 
		objectStore.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			//Si el cursor devuelve un valor pinta las tarjetas
			if (cursor) {
				var categoria = new Category (cursor.value.name, cursor.value.description);
				//Crea las card de la zona central
				var tarjeta = document.createElement("div");
				tarjeta.setAttribute("class","col-lg-4 col-md-6 mb-4 zoom");
				tarjeta.setAttribute("id",categoria.name);	
				tarjeta.addEventListener("click", showProductions);
				var borde = document.createElement("div");
				borde.setAttribute("class","card h-100");
				var cuerpo = document.createElement("div");
				cuerpo.setAttribute("class","card-body");
				var imagen = document.createElement("img");
				imagen.setAttribute("class","card-img-top");
				/* ESTA LINEA CAMBIA EL ENLACE DE LA FOTO DE LAS TARJETAS*/ 
				imagen.setAttribute("src","img/"+categoria.name+".jpg");
				imagen.setAttribute("alt",categoria.name);
				var buttonTitle = document.createElement("button");
				//id que sirve para recoger la categoria pulsada en el evento
				buttonTitle.setAttribute("id","boton"+categoria.name);
				buttonTitle.setAttribute("type","button");
				buttonTitle.setAttribute("value",categoria.name);
				buttonTitle.setAttribute("class","btn btn-link btn-block");
				buttonTitle.appendChild(document.createTextNode(categoria.name));	
				var descripCategory = document.createElement("p");
				descripCategory.setAttribute("class","card-text");
				/* ESTA LINEA CAMBIA LA DESCRIPCION DE LAS TARJETAS */ 
				descripCategory.appendChild(document.createTextNode(categoria.description));
				var valoracion = document.createElement("div");
				valoracion.setAttribute("class","card-footer");
				var estrellas = document.createElement("small");
				estrellas.setAttribute("class","text-muted");
				/* ESTA LINEA CAMBIA LAS ESTRELLAS QUE SE MUESTRAN EN LAS TARJETAS (PROXIMA VERSION)?*/ 
				estrellas.appendChild(document.createTextNode('Valoracion'));
				
				//Se crea la estructura de las tarjetas con appendChild
				tarjetas.appendChild(tarjeta);
				tarjeta.appendChild(borde);
				borde.appendChild(cuerpo);
				cuerpo.appendChild(imagen);
				cuerpo.appendChild(buttonTitle);
				cuerpo.appendChild(descripCategory);
				cuerpo.appendChild(valoracion);
				valoracion.appendChild(estrellas);
			
				//Pasa a la siguiente categoria
				cursor.continue();
			}//Fin del if
		};//Fin de objectStore.openCursor().onsuccess
	};//Fin de request.onsuccess
}//Fin de categoriesMenuPopulate

//Carga el menu lateral con las categorias
function categoriesMenuPopulate(){
	//Selecciona el menu lateral donde van a ir las categorias del sistema
	var menu = document.getElementById("menuCategorias").getElementsByClassName("nav flex-column mx-2")[0];
	//QUITA TODO EL CONTENIDO QUE HAYA EN EL MENU 
	while (menu.firstChild) {
		menu.removeChild(menu.firstChild);
	}
	//Abre la conexion con la base de datos categorias
	var request = indexedDB.open(nombreDB);
	//Si ha salido bien
	request.onsuccess = function(event) {
		//Asigna el resultado a la variable db, que tiene la base de datos 
		var db = event.target.result;         
		var objectStore = db.transaction(["categorias"],"readonly").objectStore("categorias");
		//Abre un cursor para recorrer todos los objetos de la base de datos 
		objectStore.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			//Si el cursor devuelve un valor pinta las tarjetas
			if (cursor) {
				var categoria = new Category (cursor.value.name, cursor.value.description);
				//Crea las opciones del menu lateral
				var li = document.createElement("li");
				li.setAttribute("class","nav-item");
				var botonEnlace = document.createElement("button");
				botonEnlace.setAttribute("class","nav-link btn btn-outline-secondary btn-lg btn-block");
				botonEnlace.setAttribute("value",categoria.name);
				botonEnlace.appendChild(document.createTextNode(categoria.name));
				botonEnlace.addEventListener("click", showProductions);
				li.appendChild(botonEnlace);
				menu.appendChild(li);
				//Pasa a la siguiente categoria
				cursor.continue();
			}//Fin del if
		};//Fin de objectStore.openCursor().onsuccess
	};//Fin de request.onsuccess
	
	//Añade funciones a los bntones de actores y directores
	var btnAct = document.getElementById("btnActores");
	var btnDir = document.getElementById("btnDirectores");
	btnAct.addEventListener("click", showActors);
	btnDir.addEventListener("click", showDirectors);

}//Fin de showHomePage

//Muestra un listado con los actores del sistema.
function showActors(){
	//Cambia el titulo de la pagina principal
	var tituloContenido = document.getElementById("tituloZona");
	tituloContenido.style.display = "block";
	//El valor this.value lo recoge del valor del boton que hayamos pulsado
	tituloContenido.innerHTML = "Actores del sistema";

	//Actualiza las migas de pan
	breadcrumb("Actores",null,"Actores");

	//Se selecciona la zona donde va a ir el nuevo contenido
	var contenido = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (contenido.firstChild) {
		contenido.removeChild(contenido.firstChild);
	}

	//Abre la conexion con la base de datos actores
	var request = indexedDB.open(nombreDB);
	//Si ha salido bien
	request.onsuccess = function(event) {
		//Asigna el resultado a la variable db, que tiene la base de datos 
		var db = event.target.result;         
		var objectStore = db.transaction(["actores"],"readonly").objectStore("actores");
		//Abre un cursor para recorrer todos los objetos de la base de datos 
		objectStore.openCursor().onsuccess = function(event) {
			var actor = event.target.result;
			//Si el cursor devuelve un valor pinta las tarjetas
			if (actor) {
				//Crea las tarjetas de las producciones en la zona central
				var tarjeta = document.createElement("div");
				tarjeta.setAttribute("class","col-lg-12 col-md-12 mb-4");
				var nombre = actor.value.name+" "+actor.value.lastName1+" "+actor.value.lastName2;
				tarjeta.setAttribute("id",nombre);	
				tarjeta.addEventListener("click", showActor);
				var borde = document.createElement("div");
				borde.setAttribute("class","card h-100");
				var cuerpo = document.createElement("div");
				cuerpo.setAttribute("class","card-body");
				var imagen = document.createElement("img");
				imagen.setAttribute("class","card-img");
				imagen.setAttribute("width","750");
				imagen.setAttribute("heigh","200");
				/* ESTA LINEA CAMBIA EL ENLACE DE LA FOTO DE LAS TARJETAS*/ 
				//imagen.setAttribute("src","img/"+actor.value.name+".jpg");
				imagen.setAttribute("src","img/Portada.jpg");
				imagen.setAttribute("alt",actor.value.name);
				var buttonTitle = document.createElement("button");
				//id que sirve para recoger la produccion pulsada en el evento
				buttonTitle.setAttribute("id","botonActor");
				buttonTitle.setAttribute("type","button");
				buttonTitle.setAttribute("value",nombre);
				buttonTitle.setAttribute("class","btn btn-link btn-lg btn-block");
				buttonTitle.appendChild(document.createTextNode(nombre));	
				var valoracion = document.createElement("div");
				valoracion.setAttribute("class","card-footer");
				var estrellas = document.createElement("small");
				estrellas.setAttribute("class","text-muted");
				/* ESTA LINEA CAMBIA LAS ESTRELLAS QUE SE MUESTRAN EN LAS TARJETAS (PROXIMA VERSION)?*/ 
				estrellas.appendChild(document.createTextNode('Valoracion'));
				
				//Se crea la estructura de las tarjetas con appendChild
				contenido.appendChild(tarjeta);
				tarjeta.appendChild(borde);
				borde.appendChild(cuerpo);
				cuerpo.appendChild(imagen);
				cuerpo.appendChild(buttonTitle);
				cuerpo.appendChild(valoracion);
				valoracion.appendChild(estrellas);
			
				//Pasa al siguiente actor
				actor.continue();
			}//Fin del if
		};//Fin de objectStore.openCursor().onsuccess
	};//Fin de request.onsuccess
}//Fin de showActors

//Muestra un listado con los directores del sistema.
function showDirectors(){
	//Cambia el titulo de la pagina principal
	var tituloContenido = document.getElementById("tituloZona");
	//El valor this.value lo recoge del valor del boton que hayamos pulsado
	tituloContenido.innerHTML = "Directores del sistema";
	tituloContenido.style.display = "block";
	//Actualiza las migas de pan
	breadcrumb("Directores",null,"Directores");

	//Se selecciona la zona donde va a ir el nuevo contenido
	var contenido = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (contenido.firstChild) {
		contenido.removeChild(contenido.firstChild);
	}
	//Abre la conexion con la base de datos directores
	var request = indexedDB.open(nombreDB);
	//Si ha salido bien
	request.onsuccess = function(event) {
		//Asigna el resultado a la variable db, que tiene la base de datos 
		var db = event.target.result;         
		var objectStore = db.transaction(["directores"],"readonly").objectStore("directores");
		//Abre un cursor para recorrer todos los objetos de la base de datos 
		objectStore.openCursor().onsuccess = function(event) {
			var director = event.target.result;
			//Si el cursor devuelve un valor pinta las tarjetas
			if (director) {
				//Crea las tarjetas de las producciones en la zona central
				var tarjeta = document.createElement("div");
				tarjeta.setAttribute("class","col-lg-12 col-md-12 mb-4");
				var nombre = director.value.name+" "+director.value.lastName1;
				if (director.value.lastName2 != null) {
					nombre += " " + director.value.lastName2
				}
				tarjeta.setAttribute("id",nombre);	
				tarjeta.addEventListener("click", showDirector);
				var borde = document.createElement("div");
				borde.setAttribute("class","card h-100");
				var cuerpo = document.createElement("div");
				cuerpo.setAttribute("class","card-body");
				var imagen = document.createElement("img");
				imagen.setAttribute("class","card-img");
				imagen.setAttribute("width","750");
				imagen.setAttribute("heigh","200");
				/* ESTA LINEA CAMBIA EL ENLACE DE LA FOTO DE LAS TARJETAS*/ 
				//imagen.setAttribute("src","img/"+director.value.name+".jpg");
				imagen.setAttribute("src","img/Portada.jpg");
				imagen.setAttribute("alt",director.value.name);
				var buttonTitle = document.createElement("button");
				//id que sirve para recoger la produccion pulsada en el evento
				buttonTitle.setAttribute("id","botonDirector");
				buttonTitle.setAttribute("type","button");
				buttonTitle.setAttribute("value",nombre);
				buttonTitle.setAttribute("class","btn btn-link btn-lg btn-block");
				buttonTitle.appendChild(document.createTextNode(nombre));	
				var valoracion = document.createElement("div");
				valoracion.setAttribute("class","card-footer");
				var estrellas = document.createElement("small");
				estrellas.setAttribute("class","text-muted");
				/* ESTA LINEA CAMBIA LAS ESTRELLAS QUE SE MUESTRAN EN LAS TARJETAS (PROXIMA VERSION)?*/ 
				estrellas.appendChild(document.createTextNode('Valoracion'));

				//Se crea la estructura de las tarjetas con appendChild
				contenido.appendChild(tarjeta);
				tarjeta.appendChild(borde);
				borde.appendChild(cuerpo);
				cuerpo.appendChild(imagen);
				cuerpo.appendChild(buttonTitle);
				cuerpo.appendChild(valoracion);
				valoracion.appendChild(estrellas);

				//Pasa al siguiente director
				director.continue();
			}//Fin del if
		};//Fin de objectStore.openCursor().onsuccess
	};//Fin de request.onsuccess
} //Fin de showDirectors

//Dado un actor muestra toda su información relacionada, incluida sus producciones.
function showActor(){
	//Segun donde hayas pinchado, si en la tarjeta o en el boton recoge el valor
	var nombreActor = this.value || this.id;
	//Quita el titulo de la zona
	var tituloContenido = document.getElementById("tituloZona");
	tituloContenido.innerHTML = nombreActor;
	tituloContenido.style.display = "block";
	//Actualiza las migas de pan
	breadcrumb("Actor","Actores",nombreActor);

	//Se selecciona la zona donde va a ir el nuevo contenido
	var contenido = document.getElementById("tarjetasZona");
	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (contenido.firstChild) {
		contenido.removeChild(contenido.firstChild);
	}

	//SE PONE EL NUEVO CONTENIDO QUE TIENE QUE SER EL ACTOR SELECCIONADO
	/* LINEAS AÑADIDAS EN LA PRACTICA 8 */
	//Abre la conexion con la base de datos actores
	var request = indexedDB.open(nombreDB);
	//Si ha salido bien
	request.onsuccess = function(event) {
		//Asigna el resultado a la variable db, que tiene la base de datos 
		var db = event.target.result;         
		var objectStore = db.transaction(["actores"],"readonly").objectStore("actores");
		//Obtiene el objeto de la base de datos
		var objeto = objectStore.get(nombreActor);
		objeto.onsuccess = function(event) {
			var actor = objeto.result;
			//Crea la tarjeta del actor en la zona central
			var tarjeta = document.createElement("div");
			tarjeta.setAttribute("class","col-lg-12 col-md-12 mb-4");
			var borde = document.createElement("div");
			borde.setAttribute("class","card h-100");
			var cuerpo = document.createElement("div");
			cuerpo.setAttribute("class","card-body");
			var imagen = document.createElement("img");
			imagen.setAttribute("class","card-img");
			imagen.setAttribute("width","750");
			imagen.setAttribute("heigh","200");
			/* ESTA LINEA CAMBIA EL ENLACE DE LA FOTO DE LAS TARJETAS*/ 
			//imagen.setAttribute("src","img/"+production.value.title+".jpg");
			imagen.setAttribute("src","img/Portada.jpg");
			imagen.setAttribute("alt",actor.name);
			/* ESTAS LINEAS SON PARA EL NOMBRE DEL ACTOR */
			var nombre = document.createElement("p");
			nombre.setAttribute("class","card-text cajaTitulo");
			nombre.appendChild(document.createTextNode("Nombre:"));
			var nombreDescript = document.createElement("p");
			nombreDescript.setAttribute("class","card-text cajaDescripcion");
			nombreDescript.appendChild(document.createTextNode(actor.name+" "+actor.lastName1+" "+actor.lastName2));
			/* ESTAS LINEAS SON PARA LA FECHA DE NACIMIENTO DEL ACTOR */
			var nacimiento = document.createElement("p");
			nacimiento.setAttribute("class","card-text cajaTitulo");
			nacimiento.appendChild(document.createTextNode("Fecha de nacimiento:"));
			var nacimientoDescript = document.createElement("p");
			nacimientoDescript.setAttribute("class","card-text cajaDescripcion");
			nacimientoDescript.appendChild(document.createTextNode(new Date(actor.born).toLocaleDateString()));		
			//Se crea la estructura de las tarjetas con appendChild
			contenido.appendChild(tarjeta);
			tarjeta.appendChild(borde);
			borde.appendChild(cuerpo);
			cuerpo.appendChild(imagen);	
			cuerpo.appendChild(nombre);
			cuerpo.appendChild(nombreDescript);
			cuerpo.appendChild(nacimiento);
			cuerpo.appendChild(nacimientoDescript);
			var film = document.createElement("p");
			film.setAttribute("class","card-text cajaTitulo");
			film.appendChild(document.createTextNode("Producciones en las que ha participado:"));
			cuerpo.appendChild(film);

			//Abre la conexion con la base de datos
			var request = indexedDB.open(nombreDB);
			//Si ha salido bien
			request.onsuccess = function(event) {
				//Asigna el resultado a la variable db, que tiene la base de datos 
				var db = event.target.result;         
				var objectStore = db.transaction(["repartoPro"],"readonly").objectStore("repartoPro");
				//Obtiene el objeto de la base de datos
				var objeto = objectStore.get(nombreActor);
				objeto.onsuccess = function(event) {
					//Crea un array con las producciones de esa categoria
					var producciones = event.target.result.productions;
					for (var i = 0; i < producciones.length; i++) {
						var filmDescript = document.createElement("p");
						filmDescript.setAttribute("class","card-text cajaDescripcion");
						filmDescript.appendChild(document.createTextNode("Titulo: "));
						var proBtn = document.createElement("button");
						proBtn.setAttribute("class","card-text btn btn-link ");
						proBtn.setAttribute("value",producciones[i].produccion.title);
						proBtn.appendChild(document.createTextNode(producciones[i].produccion.title));
						proBtn.addEventListener("click", showProduction); 
						filmDescript.appendChild(proBtn);
						filmDescript.appendChild(document.createTextNode(". Papel: "+producciones[i].papel));
						cuerpo.appendChild(filmDescript);
					}//Fin del for
				};//Fin de objeto.onsuccess
			};//Fin de request.onsuccess
		};//Fin de objeto.onsuccess
	};//FIn de request.onsuccess	
}//Fin de showActor

//Dado un director, muestra toda su información relacionada, incluida sus producciones
function showDirector(){
	//Segun donde hayas pinchado, si en la tarjeta o en el boton recoge el valor
	var nombreDirector = this.value || this.id;
	//Quita el titulo de la zona
	var tituloContenido = document.getElementById("tituloZona");
	tituloContenido.innerHTML = nombreDirector;
	tituloContenido.style.display = "block";
	//Actualiza las migas de pan
	breadcrumb("Director","Directores",nombreDirector);

	//Se selecciona la zona donde va a ir el nuevo contenido
	var contenido = document.getElementById("tarjetasZona");
	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (contenido.firstChild) {
		contenido.removeChild(contenido.firstChild);
	}

	//SE PONE EL NUEVO CONTENIDO QUE TIENE QUE SER EL DIRECTOR SELECCIONADO
	/* LINEAS AÑADIDAS EN LA PRACTICA 8 */
	//Abre la conexion con la base de datos directores
	var request = indexedDB.open(nombreDB);
	//Si ha salido bien
	request.onsuccess = function(event) {
		//Asigna el resultado a la variable db, que tiene la base de datos 
		var db = event.target.result;         
		var objectStore = db.transaction(["directores"],"readonly").objectStore("directores");
		//Obtiene el objeto de la base de datos
		var objeto = objectStore.get(nombreDirector);
		objeto.onsuccess = function(event) {
			var director = objeto.result;
			//Crea la tarjeta del director en la zona central
			var tarjeta = document.createElement("div");
			tarjeta.setAttribute("class","col-lg-12 col-md-12 mb-4");
			var borde = document.createElement("div");
			borde.setAttribute("class","card h-100");
			var cuerpo = document.createElement("div");
			cuerpo.setAttribute("class","card-body");
			var imagen = document.createElement("img");
			imagen.setAttribute("class","card-img");
			imagen.setAttribute("width","750");
			imagen.setAttribute("heigh","200");
			/* ESTA LINEA CAMBIA EL ENLACE DE LA FOTO DE LAS TARJETAS*/ 
			//imagen.setAttribute("src","img/"+director.value.title+".jpg");
			imagen.setAttribute("src","img/Portada.jpg");
			imagen.setAttribute("alt",director.name);
			/* ESTAS LINEAS SON PARA LA NACIONALIDAD DEL ACTOR */
			var nombre = document.createElement("p");
			nombre.setAttribute("class","card-text cajaTitulo");
			nombre.appendChild(document.createTextNode("Nombre:"));
			var nombreDescript = document.createElement("p");
			nombreDescript.setAttribute("class","card-text cajaDescripcion");
			nombreDescript.appendChild(document.createTextNode(director.name+" "+director.lastName1+" "+director.lastName2));
			/* ESTAS LINEAS SON PARA LA FECHA DE NACIMIENTO DEL DIRECTOR */
			var nacimiento = document.createElement("p");
			nacimiento.setAttribute("class","card-text cajaTitulo");
			nacimiento.appendChild(document.createTextNode("Fecha de nacimiento:"));
			var nacimientoDescript = document.createElement("p");
			nacimientoDescript.setAttribute("class","card-text cajaDescripcion");
			nacimientoDescript.appendChild(document.createTextNode(new Date(director.born).toLocaleDateString()));			
			
			//Se crea la estructura de las tarjetas con appendChild
			contenido.appendChild(tarjeta);
			tarjeta.appendChild(borde);
			borde.appendChild(cuerpo);
			cuerpo.appendChild(imagen);	
			cuerpo.appendChild(nombre);
			cuerpo.appendChild(nombreDescript);
			cuerpo.appendChild(nacimiento);
			cuerpo.appendChild(nacimientoDescript);

			var film = document.createElement("p");
			film.setAttribute("class","card-text cajaTitulo");
			film.appendChild(document.createTextNode("Producciones que ha dirigido:"));
			cuerpo.appendChild(film);
			//Abre la conexion con la base de datos
			var request = indexedDB.open(nombreDB);
			//Si ha salido bien
			request.onsuccess = function(event) {
				//Asigna el resultado a la variable db, que tiene la base de datos 
				var db = event.target.result;         
				var objectStore = db.transaction(["directorPro"],"readonly").objectStore("directorPro");
				//Obtiene el objeto de la base de datos
				var objeto = objectStore.get(nombreDirector);
				objeto.onsuccess = function(event) {
					//Crea un array con las producciones de esa categoria
					var producciones = event.target.result.productions;
					for (var i = 0; i < producciones.length; i++) {
						var filmDescript = document.createElement("p");
						filmDescript.setAttribute("class","card-text cajaDescripcion");
						filmDescript.appendChild(document.createTextNode("Titulo: "));
						var proBtn = document.createElement("button");
						proBtn.setAttribute("class","card-text btn btn-link ");
						proBtn.setAttribute("value",producciones[i].title);
						proBtn.appendChild(document.createTextNode(producciones[i].title));
						proBtn.addEventListener("click", showProduction); 
						filmDescript.appendChild(proBtn);
						cuerpo.appendChild(filmDescript);
					}//Fin del for
				};//Fin de objeto.onsuccess
			};//Fin de request.onsuccess
		};//Fin de objeto.onsuccess
	};//FIn de request.onsuccess	
}//Fin de showDirector

//Dado una categoría, director o actor, muestra el listado de sus producciones.
function showProductions(){
	//Segun donde hayas pinchado, si en la tarjeta o en el boton recoge el valor
	var nomCat = this.value || this.id;
	//Cambia el titulo de la pagina principal
	var tituloContenido = document.getElementById("tituloZona");
	tituloContenido.style.display = "block";
	//El valor this.value lo recoge del valor del boton que hayamos pulsado
	tituloContenido.innerHTML = nomCat;

	//Actualiza las migas de pan
	breadcrumb("Producciones",null,nomCat);

	//Se selecciona la zona donde va a ir el nuevo contenido
	var contenido = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (contenido.firstChild) {
		contenido.removeChild(contenido.firstChild);
	}
	
	//SE PONE EL NUEVO CONTENIDO QUE TIENE QUE SER LAS PRODUCCIONES DE UNA CATEGORIA
	//Abre la conexion con la base de datos categorias
	var request = indexedDB.open(nombreDB);
	//Si ha salido bien
	request.onsuccess = function(event) {
		//Asigna el resultado a la variable db, que tiene la base de datos 
		var db = event.target.result;         
		var objectStore = db.transaction(["categoryPro"],"readonly").objectStore("categoryPro");
		var objeto = objectStore.get(nomCat);
		//Abre un cursor para recorrer todos los objetos de la base de datos 
		objeto.onsuccess = function(event) {
			//Crea un array con las producciones de esa categoria
			var producciones = event.target.result.productions;
			for (var i = 0; i < producciones.length; i++) {
				//Crea las tarjetas de las producciones en la zona central
				var tarjeta = document.createElement("div");
				tarjeta.setAttribute("class","col-lg-12 col-md-12 mb-4");
				tarjeta.setAttribute("id",producciones[i].title);	
				tarjeta.addEventListener("click", showProduction);
				var borde = document.createElement("div");
				borde.setAttribute("class","card h-100");
				var cuerpo = document.createElement("div");
				cuerpo.setAttribute("class","card-body");
				var imagen = document.createElement("img");
				imagen.setAttribute("class","card-img");
				var tipo = document.createElement("span");
				tipo.setAttribute("class","card-text");
				if(producciones[i].tipo = "Movie"){
					tipo.appendChild(document.createTextNode("Pelicula"));
				}else{
					tipo.appendChild(document.createTextNode("Serie"));
				}
				imagen.setAttribute("width","750");
				imagen.setAttribute("heigh","200");
				/* ESTA LINEA CAMBIA EL ENLACE DE LA FOTO DE LAS TARJETAS*/ 
				//imagen.setAttribute("src","img/"+production.value.title+".jpg");
				imagen.setAttribute("src","img/Portada.jpg");
				imagen.setAttribute("alt",producciones[i].title);
				var buttonTitle = document.createElement("button");
				//id que sirve para recoger la produccion pulsada en el evento
				buttonTitle.setAttribute("id","botonProduccion");
				buttonTitle.setAttribute("type","button");
				buttonTitle.setAttribute("value",producciones[i].title);
				buttonTitle.setAttribute("class","btn btn-link btn-lg btn-block");
				buttonTitle.appendChild(document.createTextNode(producciones[i].title));	
				var descripProduction = document.createElement("p");
				descripProduction.setAttribute("class","card-text");
				/* ESTA LINEA CAMBIA LA DESCRIPCION DE LAS TARJETAS */ 
				descripProduction.appendChild(document.createTextNode(producciones[i].synopsis));
				var valoracion = document.createElement("div");
				valoracion.setAttribute("class","card-footer");
				var estrellas = document.createElement("small");
				estrellas.setAttribute("class","text-muted");
				/* ESTA LINEA CAMBIA LAS ESTRELLAS QUE SE MUESTRAN EN LAS TARJETAS (PROXIMA VERSION)?*/ 
				estrellas.appendChild(document.createTextNode('Valoracion'));
				
				//Se crea la estructura de las tarjetas con appendChild
				contenido.appendChild(tarjeta);
				tarjeta.appendChild(borde);
				borde.appendChild(cuerpo);
				cuerpo.appendChild(imagen);
				cuerpo.appendChild(tipo);
				cuerpo.appendChild(buttonTitle);
				cuerpo.appendChild(descripProduction);
				cuerpo.appendChild(valoracion);
				valoracion.appendChild(estrellas);
			}//Fin del for
		};//Fin de objeto.onsuccess
	};//Fin de request.onsuccess
}//Fin de showProductions

//Muestra la información de una producción, incluida su director y sus actores participantes.
function showProduction(){
	var titulo = this.value || this.id;
	//Oculta el  el titulo de la zona
	var tituloContenido = document.getElementById("tituloZona");
	tituloContenido.style.display = "none";
	
	//Se actualizan las migas de pan
	breadcrumb("Produccion",tituloContenido.textContent, titulo);

	//Se selecciona la zona donde va a ir el nuevo contenido
	var contenido = document.getElementById("tarjetasZona");
	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (contenido.firstChild) {
		contenido.removeChild(contenido.firstChild);
	}

	//SE PONE EL NUEVO CONTENIDO QUE TIENE QUE SER LA PRODUCCION SELECCIONADA
	/* LINEAS AÑADIDAS EN LA PRACTICA 8 */
	//Abre la conexion con la base de datos producciones
	var request = indexedDB.open(nombreDB);
	//Si ha salido bien
	request.onsuccess = function(event) {
		//Asigna el resultado a la variable db, que tiene la base de datos 
		var db = event.target.result;         
		var objectStore = db.transaction(["producciones"],"readonly").objectStore("producciones");
		//Obtiene el objeto de la base de datos
		var objeto = objectStore.get(titulo);
		objeto.onsuccess = function(event) {
			var produccion = objeto.result;
			//Crea las tarjetas de las producciones en la zona central
			var tarjeta = document.createElement("div");
			tarjeta.setAttribute("class","col-lg-12 col-md-12 my-4");
			var borde = document.createElement("div");
			borde.setAttribute("class","card h-100");
			var cuerpo = document.createElement("div");
			cuerpo.setAttribute("class","card-body");
			var titulo = document.createElement("h1");
			titulo.setAttribute("class","card-title");
			titulo.setAttribute("id","titulo");
			titulo.setAttribute("value",produccion.title);
			titulo.appendChild(document.createTextNode(produccion.title));
			var imagen = document.createElement("img");
			imagen.setAttribute("class","card-img");
			imagen.setAttribute("width","750");
			imagen.setAttribute("heigh","200");
			/* ESTA LINEA CAMBIA EL ENLACE DE LA FOTO DE LAS TARJETAS*/ 
			//imagen.setAttribute("src","img/"+production.value.title+".jpg");
			imagen.setAttribute("src","img/Portada.jpg");
			//imagen.setAttribute("alt",produccion.value.title);
			/* ESTAS LINEAS SON PARA LA NACIONALIDAD DE LA PRODUCCION */
			var nationality = document.createElement("p");
			nationality.setAttribute("class","card-text cajaTitulo");
			nationality.appendChild(document.createTextNode("Nacionalidad:"));
			var nationalityDescript = document.createElement("p");
			nationalityDescript.setAttribute("class","card-text cajaDescripcion");
			nationalityDescript.appendChild(document.createTextNode(produccion.nationality));
			/* ESTAS LINEAS SON PARA LA FECHA DE LA PRODUCCION */
			var publication = document.createElement("p");
			publication.setAttribute("class","card-text cajaTitulo");
			publication.appendChild(document.createTextNode("Fecha de publicacion:"));
			var publicationDescript = document.createElement("p");
			publicationDescript.setAttribute("class","card-text cajaDescripcion");
			publicationDescript.appendChild(document.createTextNode(new Date(produccion.publication).toLocaleDateString()));
			/* ESTAS LINEAS SON PARA LA SIPNOSIS DE LA PRODUCCION */
			var synopsis = document.createElement("p");
			synopsis.setAttribute("class","card-text cajaTitulo");
			synopsis.appendChild(document.createTextNode("Sipnosis:"));
			var synopsisDescript = document.createElement("p");
			synopsisDescript.setAttribute("class","card-text cajaDescripcion");
			synopsisDescript.appendChild(document.createTextNode(produccion.synopsis));

			//Se crea la estructura de las tarjetas con appendChild
			tarjeta.appendChild(borde);
			borde.appendChild(cuerpo);
			cuerpo.appendChild(imagen);
			cuerpo.appendChild(titulo);		
			cuerpo.appendChild(nationality);
			cuerpo.appendChild(nationalityDescript);
			cuerpo.appendChild(publication);
			cuerpo.appendChild(publicationDescript);
			cuerpo.appendChild(synopsis);
			cuerpo.appendChild(synopsisDescript);

			//MUESTRA EL DIRECTOR DE LA PRODUCCION
			var encontrado = false;
			var request = indexedDB.open(nombreDB);
			//Si ha salido bien
			request.onsuccess = function(event) {
				//Asigna el resultado a la variable db, que tiene la base de datos 
				var db = event.target.result;         
				var objectStore = db.transaction(["directorPro"],"readwrite").objectStore("directorPro");
				//Abre un cursor para recorrer todos los objetos de la base de datos 
				objectStore.openCursor().onsuccess = function(event) {
					var cursor = event.target.result;
					if((cursor) && (!encontrado)){
						for (let i = 0; i < cursor.value.productions.length; i++) {
							if(cursor.value.productions[i].title == titulo){
								var dir = document.createElement("p");
								dir.setAttribute("class","card-text cajaTitulo");
								dir.appendChild(document.createTextNode("Dirigida por:"));
								cuerpo.appendChild(dir);
								var dirDescript = document.createElement("p");
								dirDescript.setAttribute("class","card-text cajaDescripcion");
								var dirBtn = document.createElement("button");
								dirBtn.setAttribute("class","card-text btn btn-link ");
								var nombre = director.value.name+" "+ director.value.lastName1;
								if (director.value.lastName2 != null) {
									nombre += " " + director.value.lastName2
								}
								dirBtn.setAttribute("value",nombre);
								dirBtn.appendChild(document.createTextNode(nombre)); 
								dirBtn.addEventListener("click", showDirector);
								dirDescript.appendChild(dirBtn);
								cuerpo.appendChild(dirDescript);
			
								encontrado = true;
							}
						}
						//Pasa al siguiente director
						cursor.continue();
					}//Fin del if
				};		
			};
			
			//MUESTRA EL REPARTO DE LA PRODUCCION
			var request = indexedDB.open(nombreDB);
			//Si ha salido bien
			request.onsuccess = function(event) {
				//Asigna el resultado a la variable db, que tiene la base de datos 
				var db = event.target.result;         
				var objectStore = db.transaction(["repartoPro"],"readwrite").objectStore("repartoPro");
				//Abre un cursor para recorrer todos los objetos de la base de datos 
				objectStore.openCursor().onsuccess = function(event) {
					var cursor = event.target.result;
					if(cursor){
						for (let i = 0; i < cursor.value.productions.length; i++) {
							if(cursor.value.productions[i].produccion.title == titulo){
								var actDescript = document.createElement("p");
								actDescript.setAttribute("class","card-text cajaDescripcion");
								var actBtn = document.createElement("button");
								actBtn.setAttribute("class","card-text btn btn-link ");
								var nombre = actor.value.name+" "+ actor.value.lastName1;
								if (actor.value.lastName2 != null) {
									nombre += " " + actor.value.lastName2
								}
								actBtn.setAttribute("value",nombre);
								actBtn.appendChild(document.createTextNode(nombre)); 
								actBtn.addEventListener("click", showActor);
								actDescript.appendChild(actBtn);
								actDescript.appendChild(document.createTextNode(". Papel: "+ actor.papel + ". Principal: " + actor.principal));
								cuerpo.appendChild(actDescript);		
								actor = elenco.next();
							}
						}
						//Pasa al siguiente director
						cursor.continue();
					}//Fin del if
				};		
			};

			//Muestra el boton que abre una ventana nueva para mostrar los recursos
			var resourceBtn = document.createElement("button");
			//Pone el value al boton con el titulo de la produccion para poder identificar la ventana que crea el boton
			resourceBtn.setAttribute("value",titulo.textContent);
			resourceBtn.setAttribute("class","card-text btn btn-primary btn-lg btn-block");
			resourceBtn.appendChild(document.createTextNode("Mostrar recursos")); 
			resourceBtn.addEventListener("click", abrirVentana);
			cuerpo.appendChild(resourceBtn);
			contenido.appendChild(tarjeta);
		};//Fin de objeto.onsuccess
	};//FIn de request.onsuccess
}//Fin de showProduction

/* FUNCIONES AÑADIDAS EN LA PRACTICA 6 */
var arrayVentanas = new Array();
//Abre una nueva ventana
function abrirVentana(){
	var index = 0;
	var encontrada = false;
	
	//Activa el boton de cerrar ventanas
	document.getElementById("btnVentanas").style.display = "block";
	//Si es la primera vez que se ejecuta la funcion crea directamente la ventana
	if((arrayVentanas[0] == undefined) || (arrayVentanas[0].name == "")){
		crearVentana(this.value);
	}else{
		while ((index < arrayVentanas.length) && !encontrada) {
			if ((arrayVentanas[index] && !arrayVentanas[index].closed && arrayVentanas[index].name == this.value)){
				//Si la ventana no esta cerrada, esta creada y ya tiene ese nombre pone la variable a true
				encontrada = true;
			}
			index++;
		}//Fin del while
		if (encontrada) {
			arrayVentanas[index-1].focus();
		}else{
			crearVentana(this.value);
		}
	}//Fin del if
	
}//FIn de abrir ventana

//Crea una ventana
function crearVentana(nombre){
	var ventanaNueva = window.open("pages/Resource.html",nombre,"toolbar=yes,scrollbars=yes,resizable=yes,width=640,height=670");
	arrayVentanas.push(ventanaNueva);
}//FIn de crearVentana

//Cierra las ventanas abiertas
function cerrarVentanas(){
	var boton = document.getElementById("btnVentanas");
	for (let index = 0; index < arrayVentanas.length; index++) {
		//Si la ventana no esta cerrada la cierra
		if (!arrayVentanas[index].closed) {
			arrayVentanas[index].close();	
		}
	}
	//Elimina los elementos del array
	while(arrayVentanas.length != 0){
		arrayVentanas.shift();
	}
	boton.style.display = "none";
}//FIn de cerrarVentanas

//Muestra los recursos relacionados con una producción en una nueva ventana
//Esta funcion se ejecuta al cargar la ventana
function showResource(){
	//Se recoge el titulo de la produccion
	var tituloProduccion = document.getElementById("titulo");

	//Se recorre el array de ventanas 
	for (let index = 0; index < arrayVentanas.length; index++) {
		//Si el titulo es igual a la ventana que haya en el array
		if (arrayVentanas[index].name == tituloProduccion.textContent) {
			//Selecciona la zona de la ventana nueva
			var ventana = arrayVentanas[index];
		}
	}

	var contenidoVentana = ventana.document.getElementById("contenidoZona");
	//Cambia el titulo de la ventana
	ventana.document.title = "Recursos de " + tituloProduccion.textContent;

	var encontrado = false;
	var request = indexedDB.open(nombreDB);
	//Si ha salido bien
	request.onsuccess = function(event) {
		//Asigna el resultado a la variable db, que tiene la base de datos 
		var db = event.target.result;         
		var objectStore = db.transaction(["producciones"],"readwrite").objectStore("producciones");
		//Abre un cursor para recorrer todos los objetos de la base de datos 
		objectStore.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			if((cursor) && (!encontrado)){
				//Compara el titulo de la produccion del iterador con el titulo que hay en el h2 de la tarjeta
				if (cursor.value.title == tituloProduccion.textContent) {
					//Si la produccion es una movie tendra unos parametros distintos a las series
					if(cursor.value.tipo == "Movie"){
						//Si es distinto de null pone el recurso de la produccion
						if(cursor.value.resource != null){
							
							var duration = document.createElement("p");
							duration.setAttribute("class","cajaTitulo");
							duration.appendChild(document.createTextNode("Duracion: "));
							var durationDescript = document.createElement("p");
							durationDescript.setAttribute("class","cajaDescripcion");
							durationDescript.appendChild(document.createTextNode(cursor.value.resource.duration+" minutos"));
							var audio = document.createElement("p");
							audio.setAttribute("class","cajaTitulo");
							audio.appendChild(document.createTextNode("Audio: "));
							var audioDescript = document.createElement("p");
							audioDescript.setAttribute("class","cajaDescripcion");
							audioDescript.appendChild(document.createTextNode(cursor.value.resource.audios));
							var subtitles = document.createElement("p");
							subtitles.setAttribute("class","cajaTitulo");
							subtitles.appendChild(document.createTextNode("Subtitulos: "));
							var subtitlesDescript = document.createElement("p");
							subtitlesDescript.setAttribute("class","cajaDescripcion");
							subtitlesDescript.appendChild(document.createTextNode(cursor.value.resource.subtitles));
							var link = document.createElement("p");
							link.setAttribute("class","cajaTitulo");
							link.appendChild(document.createTextNode("Enlaces: "));
							var linkDescript = document.createElement("p");
							linkDescript.setAttribute("class","cajaDescripcion");
							var linkHref = document.createElement("a");
							linkHref.setAttribute("href",cursor.value.resource.link);
							linkHref.appendChild(document.createTextNode(cursor.value.resource.link));
							linkDescript.appendChild(linkHref);
						}
						//Si es distinto de null pone la localizacion de la produccion
						if(cursor.value.locations != null){
							var locations = document.createElement("p");
							locations.setAttribute("class","cajaTitulo");
							locations.appendChild(document.createTextNode("Localizacion:"));
							var locationsDescript = document.createElement("p");
							locationsDescript.setAttribute("class","cajaDescripcion");
							locationsDescript.appendChild(document.createTextNode("Longitud: "+cursor.value.locations.longitude+". Latitud: "+cursor.value.locations.latitude));
						}
					}//Fin del if del instanceof

					//Pinta todo en la nueva ventana
					var tituloProdu = ventana.document.getElementById("tituloZona");
					tituloProdu.innerHTML = tituloProduccion.textContent;
					if(cursor.value.resource != null){
						contenidoVentana.appendChild(duration);
						contenidoVentana.appendChild(durationDescript);
						contenidoVentana.appendChild(audio);
						contenidoVentana.appendChild(audioDescript);
						contenidoVentana.appendChild(subtitles);
						contenidoVentana.appendChild(subtitlesDescript);
						contenidoVentana.appendChild(link);
						contenidoVentana.appendChild(linkDescript);
					}
					if(cursor.value.locations != null){
						contenidoVentana.appendChild(locations);
						contenidoVentana.appendChild(locationsDescript);
					}
					if(cursor.value.season != null){
						//Si tiene temporadas las muestra
						for (let index = 0; index < cursor.value.season.length; index++) {
							var season = document.createElement("p");
							season.setAttribute("class","cajaTitulo");
							season.appendChild(document.createTextNode("Temporada "+(index+1)+":"));
							var seasonDescrip = document.createElement("p");
							seasonDescrip.setAttribute("class","cajaDescripcion");
							seasonDescrip.appendChild(document.createTextNode(cursor.value.season[index].episodes));
							contenidoVentana.appendChild(season);
							contenidoVentana.appendChild(seasonDescrip);	
						}//Fin del for
					}//Fin del if de season	
					encontrado = true;
				}//Fin del if
				//Pasa a la siguiente categoria
				cursor.continue();
			}//Fin del if
		};		
	};
}//Fin de showResource

//Funcion que llama a todas las funciones que necesita el sistema
function init(){
	//Llama a la funcion para crear la base de datos
	crearTablas();
	//Instancia los objetos y los mete en la tabla
	initPopulate();
	//Muestra el contenido de la pagina con retardo para 
	//darle tiempo a la base de datos
	window.setTimeout(InitialPage,100);
	//Esta funcion esta en el archivo formularios.js
	checkCookie();
}//Fin de init

function InitialPage(){
	showHomePage();
	categoriesMenuPopulate();
}

window.onload = init;