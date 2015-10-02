<?php

	require_once "connect.php";

	$userId = 3;
	$record_serial = 2;

	$suspensoQuery = "SELECT 1 FROM reservation WHERE userid = '$userId' AND record_serial = '$record_serial' LIMIT 1";
	
	$result = pg_query($connection,$suspensoQuery);

	echo $result;

  $number = pg_num_rows($result);
	
	if($number != 1){
		echo "pode inserir esta bagaça";
	}else{
		echo "esse viadao ja reservou sá poha essa semana";
	}

  //Close connection
  pg_close($connection);


?>
