document.addEventListener("DOMContentLoaded", loadTasks);
document.addEventListener("click", checkButton);
document.getElementById("taskInput").addEventListener("keypress", checkKey);

// Check if any button was clicked
function checkButton(e) {
    e.preventDefault();

    // Check is "Adicionar" button was clicked
    if (e.target.id == 'addBtn') {
        let task = document.getElementById("taskInput").value;

        // Prevent user from inserting an empty task
        if (task) {
            insertTask(task);
        }

    // Check if "done" button was clicked
    } else if (e.target.classList[0] == 'done-btn') {

        // Check state of task. If it is done, unmark it,
        // else the task is marked as done with a strikethrough
        if (e.target.parentNode.childNodes[1].classList[1] === 'markedAsDone') {
            unmarkTaskAsDone(e.target.parentNode);
        } else {
            markTaskAsDone(e.target.parentNode);
        }

    // Check if "delete" button was clicked
    } else if (e.target.classList[0] == 'delete-btn') {
        deleteTask(e.target.parentNode);
    } 
}

// Check if the "ENTER" key was pressed when
// the input form was in focus
function checkKey(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        let task = document.getElementById("taskInput").value;
        if (task) {
            insertTask(task);
        }
    }
}


// Insert user task into the database
function insertTask(task) {

    let taskEntryRaw = makeTaskEntryText(task);
    let taskEntryText = taskEntryRaw.childNodes[1].innerText;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "../todo-list/php/insert-task.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("task=" + taskEntryText);
}

// Create new a list element and attach
// it to the todo-list
function makeTaskEntryText(task) {

    let newEntry = document.createElement("li");
    
    let spanNumber = document.createElement('span');
    spanNumber.setAttribute('class', 'number-task');
    let number = document.createTextNode('#');
    spanNumber.appendChild(number);

    let spanText = document.createElement('span');
    spanText.setAttribute('class', 'text-task');
    let text = document.createTextNode(task);
    spanText.appendChild(text);

    let spanDelete = document.createElement('span');
    spanDelete.setAttribute('class', 'delete-btn');
    let deleteX = document.createTextNode('x');
    spanDelete.appendChild(deleteX);

    let spanDone = document.createElement('span');
    spanDone.setAttribute('class', 'done-btn');
    let doneV = document.createTextNode('v');
    spanDone.appendChild(doneV);

    newEntry.appendChild(spanNumber);
    newEntry.appendChild(spanText);
    newEntry.appendChild(spanDelete);
    newEntry.appendChild(spanDone);

    let todoList = document.getElementById("todo-list");
    todoList.appendChild(newEntry);

    return newEntry;
}

// Recreate the task list receiving
// stored tasks in the database 
function makeTaskEntryObj(taskObj) {

    let newEntry = document.createElement("li");

    let spanNumber = document.createElement('span');
    spanNumber.setAttribute('class', 'number-task');
    let number = document.createTextNode(taskObj.id);
    spanNumber.appendChild(number);

    let spanText = document.createElement('span');
    spanText.setAttribute('class', 'text-task');
    let text = document.createTextNode(taskObj.task);
    spanText.appendChild(text);

    let spanDelete = document.createElement('span');
    spanDelete.setAttribute('class', 'delete-btn');
    let deleteX = document.createTextNode('x');
    spanDelete.appendChild(deleteX);

    let spanDone = document.createElement('span');
    spanDone.setAttribute('class', 'done-btn');
    let doneV = document.createTextNode('v');
    spanDone.appendChild(doneV);

    if (taskObj.done == 1) {
        spanText.classList.add('markedAsDone');
    }

    newEntry.appendChild(spanNumber);
    newEntry.appendChild(spanText);
    newEntry.appendChild(spanDelete);
    newEntry.appendChild(spanDone);

    let todoList = document.getElementById("todo-list");
    todoList.appendChild(newEntry);

    return newEntry;
}

// Load tasks from the database
// and calls iterator function
function loadTasks() {
    let xhr = new XMLHttpRequest();
    let response;

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Convert data in JSON format to object type
            response = JSON.parse(this.responseText);
            recreateTaskList(response);
        }
    }

    xhr.open("GET", "../todo-list/php/load-tasks.php", true);
    xhr.send();
}

// Iterate every task object and calls makeTaskEntryObj
function recreateTaskList(tasksArray) {
    tasksArray.forEach(function(element) {
        makeTaskEntryObj(element);
    });
}

// Delete task from the list and from the database
function deleteTask(element) {
    element.parentNode.removeChild(element);

    let id = element.childNodes[0].innerText;

    let xhr = new XMLHttpRequest();

    xhr.open('POST', '../todo-list/php/delete-task.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('id=' + id);
}

// Mark task as done in the list and the database
function markTaskAsDone(element) {
    element.childNodes[1].classList.add('markedAsDone');

    // Grab task hidden id to help search
    // the task in the database
    let id = element.childNodes[0].innerText;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "../todo-list/php/mark-as-done.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('id=' + id);
}

// Unmark task as done in the list and the database 
function unmarkTaskAsDone(element) {
    element.childNodes[1].classList.remove('markedAsDone');

    // Grab task hidden id to help search
    // the task in the database
    let id = element.childNodes[0].innerText;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "../todo-list/php/unmark-as-done.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('id=' + id);
}