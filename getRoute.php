<?php

$url = "http://www.api.railwayapi.com/route/train/";
$key = "/apikey/plbss7025/";


if(isset($_GET['trn'])){
	$url .= $_GET['trn'].$key;

	$route = file_get_contents($url);

	print_r($route);
}

?>
