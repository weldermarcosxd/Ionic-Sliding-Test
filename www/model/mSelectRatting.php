<?php
	
	require_once("mConnect.php");

	$comment = json_decode(file_get_contents("php://input"));

////	$livro = ($comment->livro);
////	$user = ($comment->nome);
//
//	$livro = 3;
//	$user = 2;
//
//	$col = $db->ratting;
//	$rows = $col->findOne(array("livro" => $livro, "user" => $user));
//
//	$arr = $rows["estrelas"];
//
//	if(null == $arr){
//		$arr = 0;
//	}

	$col = $db->ratting;
	$rows = $col->find();

	$i = 0;

	foreach($rows as $row){
		$arr[$i]["user"] = $row["user"];
		$arr[$i]["estrelas"] = $row["estrelas"];
		$arr[$i]["livro"] = $row["livro"];
		$i++;
	}

	echo json_encode($arr);

?>