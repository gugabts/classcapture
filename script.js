// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    console.log('Uploaded video:', fileInput.files[0]);
}

function handleRecord() {
    console.log('Recording lecture...');
}

function scrollToSection(event, sectionId) {
    event.preventDefault(); // Prevent default anchor click behavior
    const section = document.getElementById(sectionId);
    
    if (section) {
        // Smooth scroll to the section
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function addTask() {
    const taskInput = document.getElementById('newTaskInput');
    const dueDateInput = document.getElementById('taskDueDate');
    const priorityInput = document.getElementById('taskPriority');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput.value,
        dueDate: dueDateInput.value,
        priority: priorityInput.value,
        completed: false
    };

    taskInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = 'low';

    saveTask(task);
    renderTasks();
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
}

function renderTasks() {
    const filterStatus = document.getElementById('filterStatus').value;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    tasks.filter(task => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'completed') return task.completed;
        if (filterStatus === 'pending') return !task.completed;
    }).forEach(task => addTaskToList(task));
}

function addTaskToList(task) {
    const todoList = document.getElementById('todoList');
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task.text}</span>
        <span>Due: ${task.dueDate}</span>
        <span>Priority: ${task.priority}</span>
        <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    todoList.appendChild(li);
}

function toggleTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function filterTasks() {
    renderTasks();
}
