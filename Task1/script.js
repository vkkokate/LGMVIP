Sign up
amanbhandekar
/
LGMVIP-WEB
Public
Code
Issues
Pull requests
Actions
Projects
Security
Insights
LGMVIP-WEB/Task1/script.js
@amanbhandekar
amanbhandekar Add files via upload
 1 contributor
191 lines (161 sloc)  6.79 KB
window.onload = () => {
    tasks.forEach(item => item.state = "show");
    Task.display();
}

let tasks = [];
const getTasks = localStorage.getItem('tasks');

if (getTasks) tasks = JSON.parse(getTasks);

const input = document.getElementById('task'),
    createBtn = document.getElementById('create-task'),
    search_btn = document.getElementById('search-task'),
    refresh = document.getElementById('refresh'),
    clear_all = document.querySelector('.clear_all');

class Task {
    // display tasks
    static display() {
        const tasks_container = document.getElementById('tasks');
        let _tasks = '';
        tasks.forEach((task, index) => {
            _tasks += `                                         
                <div class="task-item ${task.state === "show" ? 'mt-2 d-flex justify-content-between align-items-center' : 'd-none'}">
                    <div class="task-name">
                        <p class="${task.completed === 'true' ? 'text-decoration-line-through' : 'text-dark'}" id="task__name">${task.name}</p>
                    </div>
                    <div class="action btns">
                        <button type="button" class="btn btn-sm btn-success is__completed" onclick="Task.todoCompleted('${task.id}')"><i class="fa-solid fa-circle-check"></i></button>
                        <button type="button" class="btn btn-sm btn-primary edit" onclick="Task.update('${task.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" class="btn btn-sm btn-danger ms-1 delete" onclick="Task.delete('${task.id}')"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            `;
        });
        (tasks.length === 0 || tasks === '') ? clearall.classList.add('d-none') : clear_all.classList.remove('d-none');
        tasks_container.innerHTML = _tasks;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // create task
    static create(task) {
        const generateRandomId = Math.floor(Math.random() * 99999);
        tasks.push({ id: generateRandomId, name: task, completed: 'false', state: 'show' });
        this.display();
    }

    // completed
    static todoCompleted(task) {
        tasks.forEach(item => {
            if (`${item.id}` === task) {
                if (item.completed === 'false')
                    item.completed = 'true';
                else
                    item.completed = 'false';
            }
        });

        this.display();
    }

    // update/edit task
    static update(task) {
        const taskItems = document.querySelectorAll('.task-item');
        const taskInput = document.getElementById('task-input');
        const edit = document.querySelectorAll('.task-name');

        tasks.forEach((item, index) => {
            if (`${item.id}` === task) {
                taskItems[index].classList.add('task-editing');
                edit[index].innerHTML = `
                    <input type="text" id="task-input" class="form-control" value="${item.name}" placeholder="Edit this Todo and Hit Enter!" title="Edit this Todo and Hit Enter!" />
                    <button type="button" class="btn btn-primary save-edited-todo">Edit This</button>
                `;

                const taskInputs = document.querySelectorAll('#task-input');
                const saveEditTodo = document.querySelector('.save-edited-todo');
                if (taskInputs) {
                    taskInputs.forEach(input => {
                        input.addEventListener('keydown', e => {
                            if (e.key === 'Enter') {
                                if (input.value === '') showError('.error', 'Edit Field Cannot be Empty!');

                                saveEditTodo.addEventListener('click', e => {
                                    let input_v