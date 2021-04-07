const button = document.querySelector("#button-js");
const input = document.querySelector("#input-js");
const errorInput = document.querySelector("#error-input-js");
const list = document.querySelector("#list");


/**
 * 
 * @returns int
 */
let uniqId = () => {
    return Date.now();
}

/**
 * function for display or create div value todo and button
 * @param {string} text value input
 * @param {int} id id div and button
 */
function divTodo(text, id = uniqId()) {
    let div = document.createElement("div");
    div.classList.add("list-todo");
    div.id = "todo-" + id;
    div.innerText = text;
    list.appendChild(div)

    let btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-delete");
    btnDelete.id = "todoDelete-" + id;
    btnDelete.innerHTML = "X";
    div.appendChild(btnDelete);
}

/**
 * Function for create localStorage
 * @param {int} id 
 * @param {string} text 
 */
function creatLocalStorage(id, text) {
    localStorage.setItem(id, text);
}

if (localStorage) {
    let todos = [];
    for(let i = 0; i < localStorage.length; i++) {
        values = {
            "id": localStorage.key(i),
            "text": localStorage[localStorage.key(i)]
        };
        
        todos.push(values);
    }
    /**
     * For each todos display divtodo()
     */
    todos.forEach((todo) => {
        divTodo(todo.text, todo.id);

        let btnDelete = document.getElementById("todoDelete-" + todo.id);
        
        btnDelete.addEventListener("click", () => {
            if (confirm("Voulez vous vraiment supprimer cette tâche ?")) {
                localStorage.removeItem(todo.id);
                btnDelete.parentElement.remove();
            }
        })
    })

}

const create = (e) => {
    
    if (input.value === "") {
        e.preventDefault();
        errorInput.style.display = "block";
        input.style.border = "2px solid red";
    } else {
        divTodo(input.value);
        creatLocalStorage(uniqId(), input.value);
        errorInput.style.display = "none";
        input.style.border = "none";
        document.location.reload()
    }
}

button.addEventListener("click", (e) => {
    create(e);
    input.value = ""
})

input.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        create(e)
    }
})