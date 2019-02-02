// document.getElementById("addBtn").addEventListener("click", insertTask);
document.addEventListener("DOMContentLoaded", loadTasks);
document.addEventListener("click", checkButton);

function checkButton(e) {
    e.preventDefault;

    if (e.target.id == 'addBtn') {
        let task = document.getElementById("taskInput").value;
        if (task) {
            insertTask(task);
        }
    } else if (e.target.classList[0] == 'done-btn') {
        markTaskAsDone(e.target.parentNode.childNodes[1]);
    } else if (e.target.classList[0] == 'delete-btn') {
        deleteTask(e.target.parentNode);
    }
}

function insertTask(task) {

    let taskEntryRaw = makeTaskEntryText(task);
    let taskEntryText = taskEntryRaw.childNodes[1].innerText;

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

        }
    }
    xhr.open("POST", "../todo-list/php/insert-task.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("task=" + taskEntryText);


}

// Create new list element and attach it to 
// the todo-list
function makeTaskEntryText(task) {

    let newEntry = document.createElement("li");
    
    // let attribute = newEntry.createAttribute = "draggable";
    // attribute.value = 'true';
    newEntry.setAttribute('draggable', 'true');
    

    let spanNumber = document.createElement('span');
    spanNumber.setAttribute('class', 'number-task');
    let number = document.createTextNode('#');
    spanNumber.appendChild(number);

    let spanText = document.createElement('span');
    spanText.setAttribute('class', 'text-task');
    let text = document.createTextNode(task);
    spanText.appendChild(text);

    // let spanTime = document.createElement('span');
    // spanTime.setAttribute('class', 'time-task');
    // let time = document.createTextNode('9:00');
    // spanTime.appendChild(time);

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
    // newEntry.appendChild(spanTime);
    newEntry.appendChild(spanDelete);
    newEntry.appendChild(spanDone);


    let todoList = document.getElementById("todo-list");
    todoList.appendChild(newEntry);

    return newEntry;
}

function makeTaskEntryObj(taskObj) {

    let newEntry = document.createElement("li");
    
    // let attribute = newEntry.createAttribute = "draggable";
    // attribute.value = 'true';
    newEntry.setAttribute('draggable', 'true');
    

    let spanNumber = document.createElement('span');
    spanNumber.setAttribute('class', 'number-task');
    let number = document.createTextNode(taskObj.id);
    spanNumber.appendChild(number);

    let spanText = document.createElement('span');
    spanText.setAttribute('class', 'text-task');
    let text = document.createTextNode(taskObj.task);
    spanText.appendChild(text);

    // let spanTime = document.createElement('span');
    // spanTime.setAttribute('class', 'time-task');
    // let time = document.createTextNode('9:00');
    // spanTime.appendChild(time);

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
    // newEntry.appendChild(spanTime);
    newEntry.appendChild(spanDelete);
    newEntry.appendChild(spanDone);


    let todoList = document.getElementById("todo-list");
    todoList.appendChild(newEntry);

    return newEntry;
}

function loadTasks() {
    let xhr = new XMLHttpRequest();
    let response;

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            recreateTaskList(response);
        }
    }

    xhr.open("GET", "../todo-list/php/load-tasks.php", true);
    xhr.send();
}

function recreateTaskList(tasksArray) {
    tasksArray.forEach(function(element) {
        makeTaskEntryObj(element);
    });
}

function deleteTask(element) {
    // console.log(element.parentNode);
    element.parentNode.removeChild(element);

    let id = element.childNodes[0].innerText;

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }

    xhr.open('POST', '../todo-list/php/delete-task.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('id=' + id);
}

function markTaskAsDone(element) {
    element.classList.add('markedAsDone');

    let id = element.parentNode.childNodes[0].innerText;

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }

    xhr.open("POST", "../todo-list/php/mark-as-done.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('id=' + id);
}
