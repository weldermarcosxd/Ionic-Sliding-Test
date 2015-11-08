<?php
	
	require_once("mConnect.php");

	$livro = json_decode(file_get_contents("php://input"));

	$coment = $livro->comment;

	$col = $db->comments;
	$rows = $col->find(array("livro" => $coment));

  	foreach($rows as $row){
	
		echo $row["_id"];
		echo $row["user"];
		echo $row["comment"];
		
	}


?>