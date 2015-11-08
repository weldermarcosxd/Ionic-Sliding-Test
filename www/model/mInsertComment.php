<?php

	require_once "mConnect.php";

	$comments = json_decode(file_get_contents("php://input"));

	$user = ($comments->user);
	$comment = ($comments->comment);
	$livro = ($comments->labelregistro);

	$col = $db->comments;
	$rows = $col->insert(array("user" => $user,"comment" => $comment,"livro" => $livro ));

?>