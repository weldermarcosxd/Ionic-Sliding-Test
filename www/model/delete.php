<?php

  require_once "connect.php";

  $sql = "delete from reservation where userid =  1";

  $result = pg_query($connection, $sql);

  if(!$result){
    echo "Algo de errado não está certo";
  }else{
    echo "Deletado com sucesso";
  }

  pg_close($connection);

?>
