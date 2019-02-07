<?php
    require_once('php/connect.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Lista de Tarefas</h1>
            <form>
                <input id="taskInput" type="text" name="task" required>
                <button type="button" id="addBtn">Adicionar</button>
            </form>
        </div>

        <div class="list-container">
            <ul id="todo-list">
            </ul>
        </div>
    </div>

    <script src="js/main.js"></script>
</body>
</html>