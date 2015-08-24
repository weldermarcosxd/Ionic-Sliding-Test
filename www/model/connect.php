<?php

  $user = "root";
  $pass = "rock";
  $host = "localhost";
  $port = "5432";
  $db = "biblivre3";

  $connection = pg_pconnect("host=localhost port=5432 dbname=biblivre3 user=root password=rock");

  if($connection){

  }else{

      echo "Not connected";

  }

?>
