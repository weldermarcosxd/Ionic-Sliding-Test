<?php
	
	require_once("mConnect.php");

	$col = $db->livroRatting;
	$rows = $col->find();

	$i = 0;

	foreach($rows as $row){
		$arr["estrelas"] = $row["estrelas"];
		$arr["livro"] = $row["livro"];
		$i++;
	}

	echo json_encode($arr);

?>