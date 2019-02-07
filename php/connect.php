<?php

$user = 'root';
$pass = '';
$servername = 'localhost';
$dbname = 'todo_db';
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];

try {

    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass, $options);

// Create database if it doesn't exist
} catch(PDOException $e) {

    // Check if error code === database doesn't exist
    if ($e->getCode() === 1049) {

        $pdo = new PDO("mysql:host=$servername", $user, $pass, $options);

        // Create database;
        try {
            $sql = "CREATE DATABASE todo_db";
            $pdo->exec($sql);
            $pdo = null;

            $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass, $options);
    
            // Create table
            $sql = "CREATE TABLE list (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                task VARCHAR(30) NOT NULL,
                done BOOLEAN
            )";
            $pdo->exec($sql);

        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}
