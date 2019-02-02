<?php

require_once("connect.php");

$sql = "SELECT * FROM list";

$result = $pdo->query($sql);
$tasks = $result->fetchAll();
$tasks = json_encode($tasks);


echo $tasks;