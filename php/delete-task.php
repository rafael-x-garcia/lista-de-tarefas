<?php

require_once("connect.php");

$id = $_POST['id'];

$sql = "DELETE FROM list WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);
