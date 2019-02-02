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
                <button id="addBtn">Adicionar</button>
            </form>
        </div>

        <div class="list-container">
            <ul id="todo-list">
                <li id="t1" draggable="true"><span class="number-task">1.</span> <span class="text-task">Lavar cachorro </span> <span class="time-task">9:00</span><span class="delete-btn">x</span> <span class="read-btn">v</span></li>
                <li id="t2" draggable="true"><span class="number-task">2.</span> <span class="text-task">Cozinhar feijão </span> <span class="time-task">14:00</span><span class="delete-btn">x</span> <span class="read-btn">v</span></li>
                <li id="t3" draggable="true"><span class="number-task">3.</span> <span class="text-task">Assistir TV </span> <span class="time-task">12:00</span><span class="delete-btn">x</span> <span class="read-btn">v</span></li>
            </ul>
        </div>
    </div>

    <script src="js/main.js"></script>
</body>
</html>