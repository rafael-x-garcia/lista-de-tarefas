document.getElementById("addBtn").addEventListener("click", insertTask);

function insertTask(e) {
    e.preventDefault();

    let response;

    let task = document.getElementById("taskInput").value;

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = document.getElementById("taskHere").innerText = this.responseText;
        }

        
    }
    xhr.open("POST", "../todo-list/php/insert-task.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("task=" + task);


}

function makeTaskEntry(task) {

}