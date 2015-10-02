<?php
	
	header('Access-Control-Allow-Origin: *'); 
	header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS'); 
	header('Access-Control-Allow-Headers: X-Requested-With, content-type, X-Token, x-token');

	require_once "connect.php";

	$reserva = json_decode(file_get_contents("php://input"));
	$userId = ($reserva->userRegistro);
	$record_serial = ($reserva->labelRegistro);

	$suspensoQuery = "SELECT 1 FROM reservation WHERE userid ='$userId' AND record_serial='$record_serial' LIMIT 1";

  if (pg_num_rows(pg_query($connection,$suspensoQuery))!= 1) {
		
		$sqlInsert = "insert into reservation (record_serial, userid, created, expires) values ('$userId', '$record_serial', current_timestamp, current_timestamp + interval '24 hours')";

		$result = pg_query($connection, $sqlInsert);

		if(!$result){

			echo pg_last_error($connection);

		}else {
			print "sucesso";
		}
	}else{
			print "falha";
	}

	//Close connection
  	pg_close($connection);
?>
