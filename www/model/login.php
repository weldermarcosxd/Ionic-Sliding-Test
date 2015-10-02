<?php
	
	header('Access-Control-Allow-Origin: *'); 
	header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS'); 
	header('Access-Control-Allow-Headers: X-Requested-With, content-type, X-Token, x-token');

	require_once "connect.php";

	$login = json_decode(file_get_contents("php://input"));
	$userName = ($login->name);
	$pass = ($login->pass);
	
	$loginQuery = "SELECT 1 FROM users WHERE userid ='$pass' AND username='$userName' LIMIT 1";

	if (pg_num_rows(pg_query($connection,$loginQuery))!= 1) {
		print "falha";
	} else{
		print "success";		
	}

	//Close connection
  	pg_close($connection);

?>