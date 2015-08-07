<?php

  require_once "connect.php";

  $sql = "insert into reservation (record_serial, userid, created, expires) values (1, 2, '1999-01-08', '1999-01-09')";

  $result = pg_query($connection, $sql);


  if(!$result){

    echo pg_last_error($connection);

  }else {
    echo "Updated sucessufully";
  }

  //Close connection
  pg_close($connection);


?>
