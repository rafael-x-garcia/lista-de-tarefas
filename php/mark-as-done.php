<?php

require_once('connect.php');

$id = $_POST['id'];
$done = 1;

$sql = "UPDATE list SET done = ? WHERE id = ?";

$stmt = $pdo->prepare($sql);
$stmt->execute([$done, $id]);
