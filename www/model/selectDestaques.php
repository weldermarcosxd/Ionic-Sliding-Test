<?php
	
  header("Content-type: application/json");
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");

  require_once "connect.php";

  $sql = "select l.holding_serial as registro, c.asset_holding as Autor, c.record as Titulo
  		  from lending_history l, cataloging_holdings c
		  where l.holding_serial = c.holding_serial
		  group by l.holding_serial,c.record, c.asset_holding
		  order by l.holding_serial, c.asset_holding" ;

  $result = pg_query($connection, $sql);

  if(!$result){
    echo "Ocorreu um erro <br />";
    exit;
  }

  $arr = pg_fetch_all($result);

  echo json_encode($arr);

?>