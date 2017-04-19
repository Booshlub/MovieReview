<?php
	include 'config.php';

	$mysqli = new mysqli($config['mysql_server'], $config['mysql_user'], $config['mysql_password'], $config['mysql_db']);
	if ($mysqli->connect_errno) {
		printf("Connection failed: %s \n", $mysqli->connect_error);
		exit();
	}
	
	$mysqli->set_charset("utf8");
	
	$movId = $_GET["movieID"];
	$comment = $_GET["comment"];	
		
	$myQuery = "UPDATE comments SET comments = '$comment' WHERE movie_id = $movId";
	$result = mysqli_query($mysqli, $myQuery);			
?>