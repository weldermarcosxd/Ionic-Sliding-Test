<?php

  require_once "connect.php";

  $sql = "select cataloging_holdings.record_serial as labelregistro,labels.author as autor, labels.title as titulo, cataloging_holdings.availability as disponibilidade
			from labels , cataloging_holdings
			where cataloging_holdings.holding_serial = labels.holding_serial" ;

  $result = pg_query($connection, $sql);

  if(!$result){
    echo "Ocorreu um erro <br />";
    exit;
  }

  $arr = pg_fetch_all($result);

  echo json_encode($arr);

?>