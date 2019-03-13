//Recoge el valor del localStorage
var tiempo = localStorage.getItem("cronometro");
var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
var control = null;
//Si encuentra valor hace el split a : y muestra los valores
if (tiempo != null){
    var cadena = tiempo.split(":");
    centesimas = cadena[3];
    segundos = cadena[2];
    minutos = cadena[1];
    horas = cadena[0];
    Centesimas.innerHTML = ":"+centesimas;
	Segundos.innerHTML = ":"+segundos;
	Minutos.innerHTML = ":"+minutos;
	Horas.innerHTML = horas;
}else{
	Centesimas.innerHTML = ":00";
	Segundos.innerHTML = ":00";
	Minutos.innerHTML = ":00";
	Horas.innerHTML = "00";
}//FIn del ifelse

function inicio () {
	control = setInterval(cronometro,10);
	document.getElementById("inicio").disabled = true;
	document.getElementById("parar").disabled = false;
}

function parar () {
	clearInterval(control);
	document.getElementById("parar").disabled = true;
    document.getElementById("inicio").disabled = false;
    localStorage.setItem("cronometro",horas+":"+minutos+":"+segundos+":"+centesimas);
}

function reinicio () {
	clearInterval(control);
	centesimas = 0;
	segundos = 0;
	minutos = 0;
	horas = 0;
	Centesimas.innerHTML = ":00";
	Segundos.innerHTML = ":00";
	Minutos.innerHTML = ":00";
	Horas.innerHTML = "00";
	document.getElementById("inicio").disabled = false;
	document.getElementById("parar").disabled = true;
    localStorage.setItem("cronometro",horas+":"+minutos+":"+segundos+":"+centesimas);
}

function cronometro () {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
		Centesimas.innerHTML = ":"+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
		Segundos.innerHTML = ":"+segundos;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
		Minutos.innerHTML = ":"+minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
		horas ++;
		if (horas < 10) { horas = "0"+horas }
		Horas.innerHTML = horas;
	}
}