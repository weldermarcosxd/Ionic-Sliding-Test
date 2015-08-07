<?php

  require_once "connect.php";

  $sql = "select r.userid as Usuario, r.created as Reservado, r.expires as Expira from reservation r";

  $result = pg_query($connection, $sql);

  if(!$result){
    echo "Ocorreu um erro <br />";
    exit;
  }

  $arr = pg_fetch_array($result);

  echo json_encode($arr);

?>
