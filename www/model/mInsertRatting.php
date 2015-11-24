<?php

	require_once "mConnect.php";

	$ratting = json_decode(file_get_contents("php://input"));

	$user = ($ratting->user);
	$estrelas = ($ratting->nota);
	$livro = ($ratting->livro);
	$comment = ($ratting->comment);

	$col = $db->ratting;
	$col->update(
		array("livro" => $livro, "user" => $user),
		array("estrelas" => $estrelas,"livro" => $livro, "user" => $user), 
		array("upsert" => true)
	);

	$col = $db->livroRatting;
	$row = $col->findOne(array("livro" => $livro));
	
	if(sizeOf($row) == 0){
		$media = $estrelas;
	}else{
		$media = ($row["estrelas"] + $estrelas) / 2 ;
	}

	$col->update(
		array("livro" => $livro),
		array("estrelas" => $media,"livro" => $livro ), 
		array("upsert" => true)
	);

	$col = $db->comments;
	$col->update(
		array("livro" => $livro, "user" => $user),
		array("comment" => $comment,"livro" => $livro, "user" => $user), 
		array("upsert" => true)
	);

	print "success";

?>