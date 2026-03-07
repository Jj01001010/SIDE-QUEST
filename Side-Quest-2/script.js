const input = document.querySelector(".input-el")
const addButton = document.querySelector(".add-btn")
const resetButton = document.querySelector(".reset-btn")
const output = document.querySelector(".output-el")

let tasks = []
let editingIndex = null;

let parseData = JSON.parse(localStorage.getItem("task")) 
tasks = parseData || []
renderedTask()

function savedData(){
    localStorage.setItem('task',JSON.stringify(tasks))
}

function renderedTask(){
    output.innerHTML = tasks.map((task, index) => {

        const isEditing = editingIndex === index;
        return `
            <div class="todo-grid">
                ${
                    isEditing ? 
                    `<input data-index="${index}" value="" input> `
                    : `<span>${task}</span>`
                }
                ${
                    isEditing ? 
                    `
                    <button class="save-btn" data-action="save" data-index="${index}">SAVE</button>
                    <button class="cancel-btn" data-action="cancel">CANCEL</button>
                    `
                    : `<button class="edit-btn" data-action="edit" data-index="${index}">EDIT</button>
                       <button class="remove-btn" data-action="remove" data-index="${index}">REMOVE</button>`
                }
            </div>
        `;
    }).join("");

}

function addTask(){
    const inputValue = input.value.trim()

    if(!inputValue){
        
        return Swal.fire ({
            title: "warning",
            text: "Invalid task!",
            icon: "error",
            confirmButtonText: 'Continue'
        });
    }

    if(tasks.length >= 5){
        return Swal.fire ({
            title: "warning",
            text: "Limit reached",
            icon: "error",
            confirmButtonText: 'Continue'
        });
    }

    tasks.push(inputValue);
    renderedTask()
    input.value = ""
    savedData()
}

function resetAll(){
     tasks = []
     renderedTask()
     savedData()
}

output.addEventListener('click', (e) =>{
    const btn = e.target.closest("[data-action]")

    if(!btn) return;

    const action = btn.dataset.action
    const index = Number(btn.dataset.index)

    if(action === "edit"){
        editingIndex = index;
        renderedTask()
    }
           
    if(action === "cancel"){
        editingIndex = null;
        renderedTask()
    }

    if(action === "save"){

        const inputEl = output.querySelector(`input[data-index="${index}"]`)
        const newValue = inputEl.value.trim();

        if(!newValue) return;

        tasks[index] = newValue;
        editingIndex = null;
        renderedTask()
        savedData()
    }

    if(action === "remove"){
        tasks.splice(index, 1)
        editingIndex = null
        renderedTask()
        savedData()
    }
})


addButton.addEventListener("click", addTask)
resetButton.addEventListener('click', resetAll) 

