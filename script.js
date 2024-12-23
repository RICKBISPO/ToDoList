const todolist = [{
    id: 0,
    tittle: "Tarefa 01",
    description: "tarefa teste",
    status: "Em Andamento",
    date: new Date(),
    active: true,
    removed: false
},
{
    id: 1,
    tittle: "Tarefa 02",
    description: "tarefa teste",
    status: "Em Andamento",
    date: new Date(),
    active: true,
    removed: false
}];

addAllTasksInHTML(todolist);

let IDCount = 2;

const btnCreateTask = document.querySelector("#create-task-btn");
const btnRetrieveTask = document.querySelector("#retrieve-task-btn");


btnCreateTask.addEventListener("click", () => {
    createTask();
});

btnRetrieveTask.addEventListener("click", () => {
    retrieveTask();
});


let modals = document.querySelectorAll(".modal.action-modal");

modals.forEach((modal) => {
    modal.addEventListener("show.bs.modal", (eventModal) => {
        let btn = eventModal.target.querySelector(".action-button");

        let callbackFunction = btn.dataset.callbackFunction;
        btn.onclick = () => {
            window[callbackFunction](eventModal.relatedTarget.closest("tr"));
        };
    });
});


function createTask() {
    let tittleCreateTask = document.querySelector("#create-task-tittle");
    let descriptionCreateTask = document.querySelector("#create-task-description");

    if (tittleCreateTask.value && descriptionCreateTask.value) {
        let task = {
            id: IDCount,
            tittle: tittleCreateTask.value,
            description: descriptionCreateTask.value,
            status: "Em Andamento",
            date: new Date(),
            active: true,
            removed: false
        };
    
        todolist.push(task);
        addTaskInHTML(task);
        IDCount += 1;

    }
    else {
        getAlertForEmptyField();
    }

    tittleCreateTask.value = "";
    descriptionCreateTask.value = "";
}

function retrieveTask() {
    let IDRetrieveTask = document.querySelector("#retrieve-task-id");
    let activeIDs = document.querySelectorAll(".id");
    let activeIDsList = [];

    activeIDs.forEach(activeID => {
        activeIDsList.push(activeID.textContent);
    });

    if (!activeIDsList.includes(IDRetrieveTask.value)) {
        todolist[IDRetrieveTask.value].active = true;
        addAllTasksInHTML(todolist);
    }

    IDRetrieveTask.value = "";
}

function addTaskInHTML(task) {
    document.querySelector("tbody").innerHTML += buildTaskRowTemplate(task);
}

function addAllTasksInHTML(todolist) {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    
    todolist.forEach(task => {
        if (task.active) {
            tbody.innerHTML += buildTaskRowTemplate(task);
        }
    });
}

function finishTask(task) {
    todolist[task.dataset.id].status = "Finalizada";
    task.querySelector("td.status").textContent = "Finalizada";
}

function updateTask(task) {
    let tittleUpdateTask = document.querySelector("#update-task-tittle");
    let descriptionUpdateTask = document.querySelector("#update-task-description");

    if (tittleUpdateTask.value && descriptionUpdateTask.value) {
        let updatedTask = {
            id: todolist[task.dataset.id].id,
            tittle: tittleUpdateTask.value,
            description: descriptionUpdateTask.value,
            status: todolist[task.dataset.id].status,
            date: new Date(),
            active: true,
            removed: false
        };
    
        todolist[task.dataset.id] = updatedTask;
        
        task.querySelector(".tittle").textContent = todolist[task.dataset.id].tittle;
        task.querySelector(".description").textContent = todolist[task.dataset.id].description;
        task.querySelector(".date").textContent = todolist[task.dataset.id].date;
    }

    tittleUpdateTask.value = "";
    descriptionUpdateTask.value = "";
}

function removeTask(task) {
    todolist[task.dataset.id].removed = true;
    todolist[task.dataset.id].active = false;
    document.querySelector("tbody").removeChild(task);
}


function getAlertForEmptyField() {
    let modalBody = document.querySelector(".modal-body");
    let button = document.querySelector(".check-data");

    modalBody.insertAdjacentHTML('afterbegin', 
        `<div class="alert alert-danger" role="alert">
            Preencha todos os campos!!
        </div>`);
    
    button.disabled = true;

    setTimeout(() => {
        let alert = document.querySelector(".modal-body > div.alert");

        modalBody.removeChild(alert);
        button.disabled = false;
    }, 2000);
}

function buildTaskRowTemplate(task) {
    return `
            <tr data-id="${task.id}">
                <td class="id">${task.id}</td>
                <td class="tittle">${task.tittle}</td>
                <td class="description">${task.description}</td>
                <td class="status">${task.status}</td>
                <td class="date">${task.date}</td>
                <td class="action-btns">
                    <a data-bs-toggle="modal" data-bs-target="#modalFinishTask"><i class="bi bi-check2-circle text-success"></i></a>
                    <a data-bs-toggle="modal" data-bs-target="#modalUpdateTask"><i class="bi bi-pencil-square text-warning"></i></i></a>
                    <a data-bs-toggle="modal" data-bs-target="#modalRemoveTask"><i class="bi bi-trash text-danger"></i></a>
                </td>
            </tr>`;
}