<?php

  require_once "connect.php";

  $sql = "delete from reservation where userid =  3 and record_serial < 5";

  $result = pg_query($connection, $sql);

  if(!$result){
    echo "Algo de errado não está certo";
  }else{
    echo "Deletado com sucesso";
  }

  pg_close($connection);

?>
