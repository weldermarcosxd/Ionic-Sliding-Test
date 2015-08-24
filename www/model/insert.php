<?php
	
  //header("Content-type: application/json");
  header("Access-Control-Allow-Headers: accept, content-type
Access-Control-Allow-Methods: POST
Access-Control-Allow-Origin: *");
	
	require_once "connect.php";

  $sql = "insert into reservation (record_serial, userid, created, expires) values (1, 1, '1999-01-08', '1999-01-09')";

  $result = pg_query($connection, $sql);

  if(!$result){

    echo pg_last_error($connection);

  }else {
    echo "Sucessufully Inserted";
  }

  //Close connection
  pg_close($connection);


?>
