import { createTask,
    finishTask,
    removeTask,
    retrieveTask,
    updateTask,
    getTaskHistory
} from "./task.js";

import { loadToDoList } from "./pageBuilder.js";

loadToDoList();

const btnCreateTask = document.querySelector("#create-task-btn");
const btnRetrieveTask = document.querySelector("#retrieve-task-btn");

btnCreateTask.addEventListener("click", () => {
    createTask();
});

btnRetrieveTask.addEventListener("click", () => {
    retrieveTask();
});

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
    modal.addEventListener("shown.bs.modal", (eventModal) => {
        if (modal.classList.contains("form-modal")) {
            modal.querySelector(".focus-element").focus();
        }
        
        if (modal.classList.contains("action-modal")) {
            let btn = eventModal.target.querySelector(".action-button");

            window.finishTask = finishTask;
            window.removeTask = removeTask;
            window.updateTask = updateTask;

            let callbackFunction = btn.dataset.callbackFunction;
            btn.onclick = () => {
                window[callbackFunction](eventModal.relatedTarget.closest("tr"));
            };
        }

        if (modal.classList.contains("modal-history-task")) {
            getTaskHistory(eventModal.relatedTarget.closest("tr"));
        }
    });

    modal.addEventListener("keypress", (eventKey) => {
        if (eventKey.key === "Enter") {
            modal.querySelector(".btn-submit").click();
        }
    })
});