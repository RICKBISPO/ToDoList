/**
 *  LOCAL STORAGE
 */

export function getLocalStorageList() {
    let toDoList = localStorage.getItem("toDoList");
    if (toDoList === null) {
        return new Array();
    }
    else {
        return JSON.parse(toDoList);
    }
}

export function setLocalStorageList(toDoList) {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

export function getLocalStorageListID() {
    let id = localStorage.getItem("toDoListID");
    if (id === null) {
        return 0;
    }
    else {
        return parseInt(id);
    }
}

export function incrementLocalStorageListID() {
    let id = getLocalStorageListID();
    id += 1;
    localStorage.setItem("toDoListID", id);
}

/**
 *  VERIFY
 */

export function verifyActiveList(toDoList) {
    let flag = false;

    toDoList.forEach((task) => {
        if (task.active === true) {
            flag = true;
        }
    });
    
    let tbody = document.querySelector("tbody");
    if (!flag) {
        document.querySelector("tbody").innerHTML = `
        <tr class="empty-list-message">
            <td colspan="6" class="text-center my-2">
                <h3>Lista Vazia</h3>
            </td>
        </tr>`;
    } 
    else {
        let emptyListMessage = document.querySelector(".empty-list-message"); 
        if (emptyListMessage !== null) {
            tbody.removeChild(emptyListMessage);
        }
    }

    return flag;
}

export function verifyModalFields(...fields) {
    let flag = true;

    fields.forEach((field) => {
        let parentNode = field.closest(".modal-body");
        let modal = parentNode.closest(".modal");
    
        if(!field.value) {
            field.insertAdjacentHTML("afterend",`
                <span class="text-danger span-empty-input mb-1 d-block">
                    Preencha o campo acima!
                </span>
                `);

            flag = false;
            modal.querySelector(".btn-submit").disabled = true;

            setTimeout(() => {
                parentNode.removeChild(parentNode.querySelector("span"));
                modal.querySelector(".btn-submit").disabled = false;
              }, 1500);
        }
    });

    return flag;
}

/**
 *  DATE
 */

export function getDate() {
    let today = new Date();

    let calendar = today.toLocaleDateString("pt-BR");
    let clock = ("0" + today.getHours()).slice(-2)
                + ":" 
                + ("0" + today.getMinutes()).slice(-2)
                + ":"
                + ("0" + today.getSeconds()).slice(-2); 

    return calendar + " " + clock;
}