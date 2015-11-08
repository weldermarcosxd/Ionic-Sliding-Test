<?php

	$mongo = new Mongo( 'mongodb://root:rock@ds039504.mongolab.com:39504/biblio_app' );
	
	$db = $mongo->biblio_app;


	$mongo->close();
?>
