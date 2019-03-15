/* FUNCIONES AÑADIDAS EN LA PRACTICA 7 */
//Recoge los campos del formulario del boton de iniciar sesion y los compara
//con los del iterador de usuario, si coinciden crea la cookie
function validarUsuario(){
	//S recogen los valores del formulario
	var nombre = document.forms["inicioSesion"]["usuarioForm"].value;
	var pass = document.forms["inicioSesion"]["passForm"].value;
	var error = document.getElementById("usuarioForm").nextSibling.nextSibling;
	var menuExtra = document.getElementById("menuEdicion");
	var encontrado = false;

	//Si ha introducido algo en los campos
	if (nombre != "" && pass != "") {
		//Abre la conexion con la base de datos categorias
		var request = indexedDB.open(nombreDB);
		//Si ha salido bien
		request.onsuccess = function(event) {
			//Asigna el resultado a la variable db, que tiene la base de datos 
			var db = event.target.result;         
			var objectStore = db.transaction(["usuarios"],"readonly").objectStore("usuarios");
			//Abre un cursor para recorrer todos los objetos de la base de datos 
			objectStore.openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor && !encontrado){
					var usuario = new User (cursor.value.userName, cursor.value.email, cursor.value.password);
					if(usuario.userName == nombre.trim() && usuario.password == pass.trim()){
						setCookie("userMail", usuario.email, 1);
						encontrado = true;
						menuExtra.style.display = "flex";
						error.style.display = "none";
						checkCookie();
					}//Fin del if
					//Pasa a la siguiente categoria
					cursor.continue();
				}//Fin del if del cursor
			};//FIn de objectStore.openCursor().onsuccess
		};//Fin de request.onsuccess		
	}else{
		encontrado = false;
	}
	 if(!encontrado){
		error.style.display = "inline";
		error.textContent = "EL usuario o contraseña son erroneos";
	}
}//Fin de validarUsuario

//Crea la cookie
function setCookie(clave, valor, diasexpiracion) {
	var d = new Date();
	d.setTime(d.getTime() + (diasexpiracion*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = clave + "=" + valor + "; " + expires + "; path=/;";
}//Fin de setCookie
	
//Recoge el valor de una cookie
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i < ca.length; i++) {
	  var c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
}//Fin de getCookie
	
//Comprueba si hay cookies en el sistema para mostrar datos u ocultar
function checkCookie() {
	var btnCuenta = document.getElementById("btnCuenta");
	var formInicio = document.getElementById("formInicio");
	var menuExtra = document.getElementById("menuEdicion");
	var saludo = document.getElementById("saludo");
	var user = getCookie("userMail");

	if (user != "") {
		//Si ha iniciado sesion y existe la cookie
		saludo.style.display = "block";
		saludo.lastChild.textContent = "Bienvenido, " + user;
		btnCuenta.style.display = "block";
		formInicio.style.display = "none";
		menuExtra.style.display = "flex";
	} else {
		//Pone todo oculto y resetea los campos de inicio de sesion, por si se ha cerrado sesion
		saludo.style.display = "none";
		menuExtra.style.display = "none";
		btnCuenta.style.display = "none";
		formInicio.style.display = "block";
		document.forms["inicioSesion"]["usuarioForm"].value = "";
		document.forms["inicioSesion"]["passForm"].value = "";
	}
}//Fin de checkCookie

/* FUNCIONES PARA LAS VALIDACIONES DE CAMPOS */
//Funcion que se usa para los campos de textos que no pueden quedarse vacios
function validarCampoTexto(input){
	if(input.value == ""){
		input.setAttribute("class","form-control border border-danger");
		input.nextSibling.style.display = "block";
		return false;
	}else{
		input.setAttribute("class","form-control border border-success");
		input.nextSibling.style.display = "none";
		return true;
	}
}//FIn de validarCampoTexto

//Funcion que se usa para los campos de ruta 
function validarCampoRuta(input){
	var expresion = /^[a-z]\:\/\/(([a-z0-9]+)\/)+([a-z0-9]+)([a-z0-9_\.]+)*(\.[a-z]{1,4})/i;
	if(expresion.test(input.value) || input.value == ""){
		input.setAttribute("class","form-control border border-success");
		input.nextSibling.style.display = "none";
		return true;
	}else{
		input.setAttribute("class","form-control border border-danger");
		input.nextSibling.style.display = "block";
		return false;
	}
}//FIn de validarCampoRuta

//Funcion que se usa para los campos de ruta obligatorios
function validarCampoRutaObligatorio(input){
	var expresion = /^[a-z]\:\/\/(([a-z0-9]+)\/)+([a-z0-9]+)([a-z0-9_\.]+)*(\.[a-z]{1,4})/i;
	if(expresion.test(input.value)){
		input.setAttribute("class","form-control border border-success");
		input.nextSibling.style.display = "none";
		return true;
	}else{
		input.setAttribute("class","form-control border border-danger");
		input.nextSibling.style.display = "block";
		return false;
	}
}//FIn de validarCampoRuta

//Funcion que se usa para los campos de URL
function validarCampoURL(input){
	var expresion = /^(http|ftp)\:\/\/([\d\w]+\.)?[\d\w]+\.(com|net|es)(\:(\d){1,4})?$/i;
	if(expresion.test(input.value)){
		input.setAttribute("class","form-control border border-success");
		input.nextSibling.style.display = "none";
		return true;
	}else{
		input.setAttribute("class","form-control border border-danger");
		input.nextSibling.style.display = "block";
		return false;
	}
}//FIn de validarCampoRuta

//Funcion que se usa para los campos de numero
function validarCampoNumero(input){
	var expresion = /^[+-]?\d+$/;
	if(expresion.test(input.value)){
		input.setAttribute("class","form-control border border-success");
		input.nextSibling.style.display = "none";
		return true;
	}else{
		input.setAttribute("class","form-control border border-danger");
		input.nextSibling.style.display = "block";
		return false;
	}
}//FIn de validarCampoNumero

//Funcion que se usa para los campos de numeros opcionales 
function validarCampoNumeroOpcional(input){
	var expresion = /^[+-]?\d+$/;
	if(expresion.test(input.value) || input.value == ""){
		input.setAttribute("class","form-control border border-success");
		input.nextSibling.style.display = "none";
		return true;
	}else{
		input.setAttribute("class","form-control border border-danger");
		input.nextSibling.style.display = "block";
		return false;
	}
}//FIn de validarCampoNumeroOpcional

//Funcion que se usa para los campos array
function validarCampoArray(input){
	var expresion = /^[A-z]*,*[A-z].*$/;
	//Puede quedarse vacio por que es un parametro opcional
	if(expresion.test(input.value) || input.value == ""){
		//Separa los campos por , y crea el array
		var array = input.value.split(',');
		input.setAttribute("class","form-control border border-success");
		input.nextSibling.style.display = "none";
		return array;
	}else{
		input.setAttribute("class","form-control border border-danger");
		input.nextSibling.style.display = "block";
		return null;
	}
}//FIn de validarCampoRuta

//Funcion que se usa para los campos de fecha
function validarCampoFecha(input){
	var expresion = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
	if(!expresion.test(input.value)){
		input.setAttribute("class","form-control border border-danger");
		input.nextSibling.style.display = "block";
		return false;
	}else{
		input.setAttribute("class","form-control border border-success");
		input.nextSibling.style.display = "none";
		return true;
	}
}//Fin de validarCampoFecha

//Comprueba que el valor del select no sea 0
function validarCampoSelect(input){
	if(input.value == "0"){
		input.setAttribute("class","form-control border border-danger");
		return false;
	}else{
		input.setAttribute("class","form-control border border-success");
		return true;
	}
}//Fin del validarCampoSelect