// Declaring variables
const taskInput = document.getElementById('task');
const taskList = document.querySelector('#tasklist');
const form = document.getElementById('task-form');
const clearBtn = document.querySelector('.clear');
const filter = document.querySelector('#filter');
const header = document.querySelector('#header');


// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', createNewTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
    header.addEventListener('click', changeTheme);
}

// Get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'listitem';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        const deleteIcon = document.createElement('span');
        deleteIcon.appendChild(document.createTextNode('clear'));
        deleteIcon.className = 'material-icons redicon';
        li.appendChild(deleteIcon);
        taskList.appendChild(li);
    })
}

// Add new task
function createNewTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    } else {
        const li = document.createElement('li');
        li.className = 'listitem';
        li.appendChild(document.createTextNode(taskInput.value));
        const deleteIcon = document.createElement('span');
        deleteIcon.appendChild(document.createTextNode('clear'));
        deleteIcon.className = 'material-icons redicon';
        li.appendChild(deleteIcon);
        taskList.appendChild(li);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = '';

        e.preventDefault();
    }
}

// Store in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if (e.target.classList.contains('material-icons')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.remove();
            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement);
        }
    }
}

// Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    console.log(tasks);
    console.log(taskItem.textContent);
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task + 'clear') {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // Clear from LS
    clearTasksFromLocalStorage();
}

//Clear all tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.listitem').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    })
}

// Changes theme of the app and logo.
function changeTheme() {
    const logoPurple = document.getElementById('logoPurple');
    const logoBlue = document.getElementById('logoBlue');
    const logoYellow = document.getElementById('logoYellow');
    const logoOrange = document.getElementById('logoOrange');
    const addBtn = document.getElementById('submitBtn');
    const inputs = document.getElementsByClassName('taski-input')

    function changeToBlue() {
        logoPurple.classList.toggle('hide');
        logoPurple.classList.toggle('show');
        logoBlue.classList.toggle('hide');
        logoBlue.classList.toggle('show');
        addBtn.style.backgroundColor = "#47A8FF";
        clearBtn.style.backgroundColor = "#47A8FF";
        inputs[0].classList.toggle('blueborder');
        inputs[1].classList.toggle('blueborder');
    }

    function changeToYellow() {
        logoBlue.classList.toggle('hide');
        logoBlue.classList.toggle('show');
        logoYellow.classList.toggle('hide');
        logoYellow.classList.toggle('show');
        addBtn.style.backgroundColor = "#DDCC17";
        clearBtn.style.backgroundColor = "#DDCC17";
        inputs[0].classList.toggle('blueborder');
        inputs[1].classList.toggle('blueborder');
        inputs[0].classList.toggle('yellowborder');
        inputs[1].classList.toggle('yellowborder');
    }

    function changeToOrange() {
        logoYellow.classList.toggle('hide');
        logoYellow.classList.toggle('show');
        logoOrange.classList.toggle('hide');
        logoOrange.classList.toggle('show');
        addBtn.style.backgroundColor = "#FF7C44";
        clearBtn.style.backgroundColor = "#FF7C44";
        inputs[0].classList.toggle('yellowborder');
        inputs[1].classList.toggle('yellowborder');
        inputs[0].classList.toggle('orangeborder');
        inputs[1].classList.toggle('orangeborder');
    }

    function changeToPurple() {
        logoOrange.classList.toggle('hide');
        logoOrange.classList.toggle('show');
        logoPurple.classList.toggle('hide');
        logoPurple.classList.toggle('show');
        addBtn.style.backgroundColor = "#DDA8FF";
        clearBtn.style.backgroundColor = "#DDA8FF";
        inputs[0].classList.toggle('orangeborder');
        inputs[1].classList.toggle('orangeborder');
    }


    if (logoPurple.classList.contains('show')) {
        changeToBlue();
    } else if (logoBlue.classList.contains('show')) {
        changeToYellow();
    } else if (logoYellow.classList.contains('show')) {
        changeToOrange();
    } else if (logoOrange.classList.contains('show')) {
        changeToPurple();
    }

}