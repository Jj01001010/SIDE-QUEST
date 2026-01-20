const input = document.querySelector(".input-el")
const addButton = document.querySelector(".add-btn")
const resetButton = document.querySelector(".reset-btn")
const output = document.querySelector(".output-el")

let tasks = []

let parseData = JSON.parse(localStorage.getItem("task")) 
tasks = parseData || []
renderedTask()


function savedData(){
    localStorage.setItem('task',JSON.stringify(tasks))
}

function renderedTask(){
    output.innerHTML = tasks.map((task, index) => 
        `<div>${task}</div>
        <button class="remove-btn" data-action="remove" data-index="${index}">
            <span class="remove-icon">🗑️</span>
        </button>
        <button class="edit-btn" data-action="edit" data-index="${index}">
            <span class="edit-icon">✏️</span>
        </button>
        `)
        .join("")

}

function addTask(){
    const inputValue = input.value.trim()

    if(!inputValue || tasks.length >= 5){
        input.value = ""
        alert("Max tasks, Finish some task to add more")
        return;
    }

    tasks.push(inputValue);
    renderedTask()
    input.value = ""
    savedData()
}

function removeTask(index){
    tasks.splice(index, 1)
    renderedTask()
    savedData()
}

function editTask(index){
   const newValue = prompt("Enter a new Value", tasks[index])

    if (!newValue || !newValue.trim()){
        return;
    }

    tasks[index] = newValue
    renderedTask()
    savedData()
}

function resetAll(){
     tasks = []
     renderedTask()
     savedData()
}

output.addEventListener('click', (e) =>{
    const button = e.target.closest("button[data-action]")
    
    if(!button) return;

    const action = button.dataset.action;
    const index = Number(button.dataset.index);

    if(action === "remove") removeTask(index)
    if(action === "edit") editTask(index)
})


addButton.addEventListener("click", addTask)
resetButton.addEventListener('click', resetAll)