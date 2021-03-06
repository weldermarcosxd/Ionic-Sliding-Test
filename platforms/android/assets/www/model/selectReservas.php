<?php
	
  header("Content-type: application/json");
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");

  require_once "connect.php";

  $sql = "select u.userName as Leitor, r.created as Reservado, r.expires as Expira , l.title as Titulo
          from reservation r, users u, labels l
          where r.userId = u.userId and l.holding_serial = r.record_serial
          order by r.expires desc" ;

  $result = pg_query($connection, $sql);

  if(!$result){
    echo "Ocorreu um erro <br />";
    exit;
  }

  $arr = pg_fetch_all($result);

  echo json_encode($arr);

?>
