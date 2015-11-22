<?php

$url = "http://api.railwayapi.com/between/";
$key = "/apikey/plbss7025/";


if(isset($_GET['src']) && isset($_GET['dest'])){

	$src = "/source/".$_GET['src'];
	$dest = "/dest/".$_GET['dest'];


	$url .= $src.$dest.$key;

	$route = file_get_contents($url);

	print_r($route);
}

?>
