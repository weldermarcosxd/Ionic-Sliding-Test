<?php

  require_once "connect.php";
  
  $user = json_decode(file_get_contents("php://input")); 

  $sql = "delete from reservation where userid =  '$user' and expires > 'time()'";

  $result = pg_query($connection, $sql);

  if(!$result){
    echo "Algo de errado não está certo";
  }else{
    print "success";
  }

  pg_close($connection);

?>
