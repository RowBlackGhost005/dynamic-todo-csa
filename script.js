let addTaskButton = document.getElementById("addTaskButton");

let taskList = document.getElementById("taskList");

let taskNameInput = document.getElementById("taskInput");

let taskCount = document.getElementById("taskCount");

let completedTaskCount = document.getElementById("completedTaskCount");

let taskQueryButton = document.getElementById("taskQueryButton");

let taskQueryBox = document.getElementById("taskQuery");

/* Counter of current task ID*/
let taskId = 1;

/* Counter of current task checked ID*/
let taskCompleted = 0;

/* In memory holder of Task Titles and ID*/
let tasks = [];

/* Removes a task from the tasks array based on its ID*/
function removeTask(taskId){
    let index = tasks.findIndex(task => task.id === taskId);

    if(index !== -1){
        tasks.splice(index, 1);
    }
}

/* Adds 1 to the completed task counter in the web page*/
function taskCompletedUp(){
    let completed = Number(completedTaskCount.innerText);

    completedTaskCount.innerText = completed + 1;
}

/* Removes 1 to the completed task counter in the web page*/
function taskCompletedDown(){
    let completed = Number(completedTaskCount.innerText);

    completedTaskCount.innerText = completed - 1;
}

/* Adds 1 to the task counter in the web page*/
function taskCountUp(){
    let taskAmmount = Number(taskCount.innerText);

    taskCount.innerText = taskAmmount + 1;
}

/* Removes 1 to the task counter in the web page*/
function taskCountDown(){
    let taskAmmount = Number(taskCount.innerText);

    taskCount.innerText = taskAmmount - 1;
}

/* Deletes an element using its ID*/
function deleteElement(elementId){
    document.getElementById(elementId).remove();
}

/* Registers a task*/
function createTask(taskName , taskId){

    let task = {
        name: taskName,
        id: taskId
    }

    tasks.push(task);
}

/* Filters tasks that match the filter*/
function filterTasks(filter){
    tasks.forEach( task => {
        if(!task.name.toLowerCase().includes(filter.toLowerCase())){
            hideTaskCard(task.id);
        }
    });
}

/* Hides a task card using its ID*/
function hideTaskCard(elementId){
    let element = document.getElementById(elementId);

    element.classList.add("task-card-hidden");
}

/* Shows a task card using its ID*/
function showTaskCard(elementId){
    let element = document.getElementById(elementId);

    element.classList.remove("task-card-hidden");
}

/* Shows all task cards*/
function showAllTasks(){
    tasks.forEach( task => {
        showTaskCard(task.id);
    })
}



/* Event Listener for the button for adding a task*/
addTaskButton.addEventListener("click" , function () {
    
    let taskName = taskNameInput.value;
    let newTaskId = "card" + taskId;

    if(taskName === ""){
        alert("Add a name to the task!");
        return;
    }

    createTask(taskName , newTaskId);

    taskNameInput.value = "";

    let taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    taskCard.id = newTaskId;

    let taskButton = document.createElement("div");
    taskButton.classList.add("task-button")

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.name = taskId;
    checkBox.id = taskId;
    checkBox.classList.add("task-check");

    let taskHeader = document.createElement("div");
    taskHeader.classList.add("task-title");

    let taskTitle = document.createElement("p");
    taskTitle.innerText = taskName;
    taskTitle.id = "task-" + taskId;

    let taskDelete = document.createElement("div");
    taskDelete.classList.add("task-delete");

    let taskDeleteButton = document.createElement("button");
    taskDeleteButton.classList.add("btn-trash");

    taskHeader.appendChild(taskTitle);

    taskButton.appendChild(checkBox);

    taskDelete.appendChild(taskDeleteButton);

    taskCard.appendChild(taskButton);

    taskCard.appendChild(taskHeader);

    taskCard.appendChild(taskDelete);

    taskList.appendChild(taskCard);

    taskCountUp();

    taskId++;
});

/* Bubbling Up the checkbox event */
/* Determines which task checkbox was checked and applies all styles*/
taskList.addEventListener("change" , function(event) {
    if(event.target.type === "checkbox"){

        if(event.target.checked){
            let checkedTaskId = "task-" + event.target.id;

            let taskTitle = document.getElementById(checkedTaskId);

            taskTitle.style.textDecoration = "line-through"
            taskTitle.style.fontStyle =  "italic";

            taskCompletedUp();
        }

        if(!event.target.checked){
            let checkedTaskId = "task-" + event.target.id;

            let taskTitle = document.getElementById(checkedTaskId);

            taskTitle.style.textDecoration = "none"
            taskTitle.style.fontStyle =  "normal";

            taskCompletedDown();
        }

    }
});

/* Bubbling up the trash button event */
/* Determines which task trash button was clicked for removing it from the webpage and this task tracker*/
taskList.addEventListener("click" , function(event) {
    if(event.target.classList.contains("btn-trash")) {
        let parentContainer = event.target.closest(".task-card");

        let checkBox = document.getElementById(parentContainer.id.slice(4));

        removeTask(parentContainer.id);

        //Removes one from the task completed counter IF the checkbox is checked
        if(checkBox.checked){
            taskCompletedDown();
        }

        taskCountDown();

        deleteElement(parentContainer.id);
    }
});

/* Checks for clicks inside the search button*/
taskQueryButton.addEventListener("click" , function () {
    if(taskQueryBox.value === ""){
        showAllTasks();
        return;
    }

    showAllTasks();
    filterTasks(taskQueryBox.value);
});