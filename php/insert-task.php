<?php

require_once("connect.php");


// Insert task into database
if (isset($_POST['task'])) {
    $data = trim($_POST['task']);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    
    $sql = "INSERT INTO list (task) VALUES ('$data')";
    $pdo->exec($sql);
}

echo $_POST['task'];