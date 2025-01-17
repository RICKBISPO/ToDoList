import { getLocalStorageList, 
    setLocalStorageList, 
    getLocalStorageListID,
    incrementLocalStorageListID,
    verifyActiveList,
    verifyModalFields,
    getDate
} from "./utils.js";

import { addTaskInHTML,
    addAllTasksInHTML
} from "./pageBuilder.js";

export function createTask() {
    let tittleCreateTask = document.querySelector("#create-task-tittle");
    let descriptionCreateTask = document.querySelector("#create-task-description");
    let statusCreateTask = document.querySelector("#create-task-status");

    if (verifyModalFields(tittleCreateTask, descriptionCreateTask)) {
        let toDoList = getLocalStorageList();

        let task = {
            id: getLocalStorageListID(),
            tittle: tittleCreateTask.value,
            description: descriptionCreateTask.value,
            status: statusCreateTask.value,
            date: getDate(),
            active: true,
            removed: false,
            history: []
        };

        task.history.push(`<p class="text-primary"><i class="bi bi-plus-lg"></i> Tarefa Criada - ${task.date}</p>`);
        toDoList.push(task);
        addTaskInHTML(task);
        incrementLocalStorageListID();

        verifyActiveList(toDoList);
        setLocalStorageList(toDoList);
    }

    tittleCreateTask.value = "";
    descriptionCreateTask.value = "";
}

export function finishTask(taskElement) {
    let toDoList = getLocalStorageList();

    toDoList.forEach((task) => {
        if (task.id === parseInt(taskElement.dataset.id) && task.status === "Em Andamento") {
            task.status = "Finalizada";
            const date = getDate();
            task.history.push(`<p class="text-success"><i class="bi bi-check2-circle"></i> Tarefa Finalizada - ${date}</p>`);
            taskElement.querySelector("td.status").textContent = "Finalizada";
        }
    });

    setLocalStorageList(toDoList);
}

export function removeTask(taskElement) {
    let toDoList = getLocalStorageList();

    toDoList.forEach((task) => {
        if (task.id === parseInt(taskElement.dataset.id)) {
            task.removed = true;
            task.active = false;
            const date = getDate();
            task.history.push(`<p class="text-danger"><i class="bi bi-trash"></i> Tarefa Removida - ${date}</p>`);
            document.querySelector("tbody").removeChild(taskElement);
        }
    })
    
    verifyActiveList(toDoList);
    setLocalStorageList(toDoList);
}

export function retrieveTask() {
    let IDRetrieveTask = document.querySelector("#retrieve-task-id");

    let toDoList = getLocalStorageList();

    toDoList.forEach((task) => {
        if (task.active === false && task.id === parseInt(IDRetrieveTask.value)) {
            task.active = true;
            const date = getDate();
            task.history.push(`<p class="text-black"><i class="bi bi-arrow-clockwise"></i> Tarefa Recuperada - ${date}</p>`);
            addAllTasksInHTML(toDoList);
        }
    });

    verifyActiveList(toDoList);
    setLocalStorageList(toDoList);

    IDRetrieveTask.value = "";
}

export function updateTask(taskElement) {
    let tittleUpdateTask = document.querySelector("#update-task-tittle");
    let descriptionUpdateTask = document.querySelector("#update-task-description");

    if (verifyModalFields(tittleUpdateTask, descriptionUpdateTask)) {
        let toDoList = getLocalStorageList();

        let taskUpdated;

        toDoList.forEach((task) => {
            if (task.id === parseInt(taskElement.dataset.id)) {
                task.tittle = tittleUpdateTask.value;
                task.description = descriptionUpdateTask.value;
                task.date = getDate();
                task.history.push(`<p class="text-warning"><i class="bi bi-pencil-square"></i> Tarefa Editada - ${task.date}</p>`);
                taskUpdated = task;
            } 
        });
        
        if (taskUpdated) {
            taskElement.querySelector(".tittle").textContent = taskUpdated.tittle;
            taskElement.querySelector(".description").textContent = taskUpdated.description;
            taskElement.querySelector(".date").textContent = taskUpdated.date;
        }
        
        setLocalStorageList(toDoList);
    }

    tittleUpdateTask.value = "";
    descriptionUpdateTask.value = "";
}

export function getTaskHistory(taskElement) {
    let toDoList = getLocalStorageList();

    toDoList.forEach((task) => {
        if (task.id === parseInt(taskElement.dataset.id)) {
            const modalBody = document.querySelector(".modal-body-history-task");
            modalBody.innerHTML = '';
            task.history.forEach((item) => {
                modalBody.innerHTML += item;
            });
        } 
    });
}

