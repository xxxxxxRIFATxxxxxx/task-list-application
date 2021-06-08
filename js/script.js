// Define UI
let addTaskForm = document.querySelector("#add-task-form");
let newTask = document.querySelector("#new-task");
let searchTaskInput = document.querySelector("#search-task-input");
let taskList = document.querySelector("#task-list");
let clearTaskBtn = document.querySelector("#clear-task-btn");

// Define Functions

// Add Task Function
let addTask = (e) => {
    let li = document.createElement("li");
    li.innerText = `${newTask.value} `;
    let a = document.createElement("a");
    a.setAttribute("href", "#");
    a.innerText = "x";
    li.appendChild(a);
    taskList.appendChild(li);

    storeTaskInLocalStorage(newTask.value);

    newTask.value = "";
    e.preventDefault();
};

// Remove Task Function
let removeTask = (e) => {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure?")) {
            let task = e.target.parentElement;
            task.remove();
            removeTaskFromLocalStorage(task);
        };
    };
};

// Clear Task Function
let clearTask = (e) => {
    taskList.innerText = "";
    localStorage.clear();
};

// Search Task Function
let searchTask = (e) => {
    let searchText = e.target.value.toLowerCase();
    let allTask = document.querySelectorAll("li");

    allTask.forEach((item) => {
        let taskItem = item.firstChild.textContent.toLowerCase();
        if (taskItem.indexOf(searchText) != -1) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        };
    });
};

// Store Task In Local Storage Function
let storeTaskInLocalStorage = (task) => {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Get Task From Local Storage Function
let getTasks = () => {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    };

    tasks.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = `${item} `;
        let a = document.createElement("a");
        a.setAttribute("href", "#");
        a.innerText = "x";
        li.appendChild(a);
        taskList.appendChild(li);
    })
};

// Remove Task From Local Storage Function
let removeTaskFromLocalStorage = (taskItem) => {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    };

    let li = taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        };
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Define Event Listeners
addTaskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearTaskBtn.addEventListener("click", clearTask);
searchTaskInput.addEventListener("keyup", searchTask);
document.addEventListener("DOMContentLoaded", getTasks);
