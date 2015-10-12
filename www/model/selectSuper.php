<?php
	
  require_once "connect.php";

  $sql = "select users.username as nome, lending_history.user_serial registro, count(lending_history.user_serial) as emprestimos
			from lending_history, users
			where users.userId = lending_history.user_serial
			group by users.username, lending_history.user_serial
			order by count(lending_history.user_serial) desc" ;

  $result = pg_query($connection, $sql);

  if(!$result){
    echo "Ocorreu um erro <br />";
    exit;
  }

  $arr = pg_fetch_all($result);

  echo json_encode($arr);

?>