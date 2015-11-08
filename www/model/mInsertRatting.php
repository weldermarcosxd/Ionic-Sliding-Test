<?php

	require_once "mConnect.php";

	$ratting = json_decode(file_get_contents("php://input"));

	$user = ($ratting->user);
	$estrelas = ($ratting->estrelas);
	$livro = ($ratting->livro);

	$col = $db->ratting;
	$col->insert(array("user" => $user,"estrelas" => $estrelas, "livro" => $livro));

	$col = $db->livroRatting;
	$row = $col->findOne(array("livro" => $livro));
	
	if(sizeOf($row) == 0){
		$media = $estrelas;
	}else{
		$media = ($row["estrelas"] + $estrelas) / 2 ;
	}

	echo $media;	

	$col->update(
		array("livro" => $livro),
		array("estrelas" => $media,"livro" => $livro ), 
		array("upsert" => true)
	);

?>