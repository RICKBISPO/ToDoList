import { verifyActiveList } from "./utils.js";

export function addTaskInHTML(task) {
    document.querySelector("tbody").innerHTML += buildTaskRowTemplate(task);
}

export function addAllTasksInHTML(toDoList) {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    
    toDoList.forEach(task => {
        if (task.active) {
            tbody.innerHTML += buildTaskRowTemplate(task);
        }
    });
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
                    <a data-bs-toggle="modal" data-bs-target="#modalHistoryTask"><i class="bi bi-clock-history text-primary"></i></i></a>
                </td>
            </tr>`;
}

export function loadToDoList() {
    let toDoList = localStorage.getItem("toDoList");
    if (toDoList !== null && verifyActiveList(JSON.parse(toDoList))) {
        addAllTasksInHTML(JSON.parse(toDoList));
    }

}