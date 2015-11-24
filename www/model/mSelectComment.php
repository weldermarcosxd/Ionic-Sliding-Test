<?php
	
	require_once("mConnect.php");

	$col = $db->comments;
	$rows = $col->find();
	
	$i = 0;

  	foreach($rows as $row){
		$arr[$i]["comment"] = $row["comment"];
		$arr[$i]["livro"] = $row["livro"];
		$arr[$i]["user"] = $row["user"];
		$i++;
	}

	echo json_encode($arr);

?>