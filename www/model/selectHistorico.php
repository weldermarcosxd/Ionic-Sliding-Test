<?php

  require_once "connect.php";
	
	$user = json_decode(file_get_contents("php://input"));
	//$user = 2;

  $sql = "select u.username as Nome, l.title as titulo, l.author as autor, h.lending_date as emprestimo, h.return_date as devolvido
					from lending_history h, users u, cataloging_holdings c,labels l
					where u.userid = h.user_serial and u.userid = '$user' and h.holding_serial = c.holding_serial and l.holding_serial = 							c.holding_serial" ;

  $result = pg_query($connection, $sql);

  if(!$result){
    echo "Ocorreu um erro <br />";
    exit;
  }

  $arr = pg_fetch_all($result);

  echo json_encode($arr);

?>