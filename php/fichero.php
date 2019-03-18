<?php
	$data = json_decode($_POST['data']);
	//echo json_encode($data);
	$fichero = $data -> user . ".json";
	//Si existe el fichero lo borra con ese usuario lo borra
	if(file_exists($fichero)){ 
		unlink($fichero);
	}
	//Crea dicho fichero
	$fd = fopen($fichero,"a+"); 
	fputs($fd,json_encode($data));
	fclose($fd);   
?>