<?php

$url = "http://api.railwayapi.com/name_to_code/station/";
$key = "/apikey/plbss7025/";


if(isset($_GET['stnName'])){
	$url .= $_GET['stnName'].$key;

	$route = file_get_contents($url);

	print_r($route);
}

?>
