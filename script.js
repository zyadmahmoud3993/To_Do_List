const Tasks_List = document.querySelector('.Tasks_List');
const btnAdd = document.querySelector('.btnAdd');
const taskInput = document.getElementById('taskInput');
const alert_danger = document.querySelector('.alert-danger');
const lottie_player = document.getElementById('lottie-player');
const search = document.querySelector('.search');
const voice_effect = new Audio('voice_effect.mp3');
let bool = false;

lottie_player.addEventListener('click', function () {
    lottie_player.classList.add('zoom');
    voice_effect.play();
    lottie_player.play();
});

search.addEventListener('click', searched);

btnAdd.onclick = () => {
    bool = true
    addTask(true) };
function addTask(loadTask = '', save = true) {
    if (loadTask == true && taskInput.value.trim() === '') {
        alert_danger.style.display = 'flex';
        return;
    }
    alert_danger.style.display = 'none';
    const createdTask = document.createElement('div');
    createdTask.classList.add('task', 'd-flex', 'justify-content-between', 'mt-3');
    createdTask.innerHTML = `
                        <span ${loadTask[1] ? 'class="done"' : ''}>${bool ? taskInput.value.trim() : loadTask[0]}</span>
                        <div>
                            <button class="btn btn-warning  ${loadTask[1] ? 'disabled' : ''}">تعديل</button>
                            <button class="btn btn-danger">حذف</button>
                        </div>
                        `
    createdTask.querySelector('.btn-danger').addEventListener('click', function () {
        createdTask.remove()
        saveTasks()
    })
    createdTask.querySelector('.btn-warning').addEventListener('click', function () {
        if (taskInput.value.trim() === '') {
            taskInput.value = createdTask.querySelector('span').textContent;
            return;
        }

        createdTask.querySelector('span').textContent = taskInput.value.trim();
        taskInput.value = '';
        saveTasks()
    });
    createdTask.querySelector('span').addEventListener('click', function () {
        this.classList.toggle('done');
        createdTask.querySelector('.btn-warning').classList.toggle('disabled');
        saveTasks()
    });


    Tasks_List.appendChild(createdTask);
    taskInput.value = '';
    if (save) {
        console.log('save ' + save)
        saveTasks()
    }
}

function saveTasks() {
    const Tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        Tasks.push([task.querySelector('span').textContent, task.querySelector('span').classList.contains('done')]);
    })
    localStorage.setItem('Tasks', JSON.stringify(Tasks));
}
function loadTasks() {
    try {
        const Tasks = JSON.parse(localStorage.getItem('Tasks'));
        console.log(Tasks)
        bool = false
        Tasks.forEach((task) => {
            addTask(task , false)
        })
    } catch (e) {
        //
    }

}
loadTasks();

function searched() {
    const taskedinput = taskInput.value.trim().toUpperCase();
    Tasks_List.innerHTML = '';
    bool = false;
    const Tasks = JSON.parse(localStorage.getItem('Tasks'));

    Tasks.forEach((task) => {
        if (task[0].toUpperCase().includes(taskedinput)) {
            addTask(task, false);
        }
    })
}