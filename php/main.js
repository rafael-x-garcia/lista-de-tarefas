document.addEventListener("click", insertTask);

function insertTask(e) {
    e.preventDefault();

    let task = "task=" + document.getElementById("taskInput").value;

    let xhr = new XMLHttpRequest();
    

    xhr.onreadystatechange = function() {
        console.log(this.readyState);
        if (this.readyState == 4 && this.status == 200) {
            let response = document.getElementById("taskHere").innerText = this.responseText;
            console.log(response);
            console.log("Works");
        }
    }
    xhr.open("POST", "insert-task.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(task);


}