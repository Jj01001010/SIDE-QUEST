const form = document.querySelector('.transaction-form')
const amountEl = document.querySelector(".amount")
const categoryEl = document.querySelector(".category")
const select = document.querySelector(".type")
const expenseBalance = document.querySelector(".expense-balance")
const incomeBalance = document.querySelector(".income-balance")
const total = document.querySelector(".total")

let transaction = []

loadData()
renderedData()

function renderedData(){
    const list = document.querySelector(".container")

        const totalExpense = transaction
        .filter(item => item.tag === "Expense")
        .reduce((sum, item) => sum + item.amount, 0)

        const totalIncome = transaction
        .filter(item => item.tag === "Income")
        .reduce((sum, item) => sum + item.amount, 0)

        const balance = totalIncome - totalExpense

        if(transaction.length === 0){
            list.innerHTML = "<p>No expenses yet</p>"
            expenseBalance.textContent = `Expense Balance: ₱0`
            incomeBalance.textContent = `Income Balance: ₱0`
            total.textContent = `Total: ₱0`
            return;
        }

        list.innerHTML = transaction.map(item => {
        return `
            <div class="transact-container">
                <p>${item.category}</p>
                <p>₱${item.amount}</p>
                <p>${item.tag}</p>
                <button class="remove-btn" data-action="remove" data-id="${item.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `   
    }).join("")
    
    expenseBalance.textContent = `Expenses: ₱${totalExpense}`
    incomeBalance.textContent = `Income: ₱${totalIncome}`
    total.textContent = `Balance: ₱${balance}`
}

document.querySelector(".container").addEventListener('click', (e) => {

    const action = e.target.dataset.action
    const id = Number(e.target.dataset.id)
    if(action === 'remove'){
        removeFromList(id)
        console.log(transaction)
    }
})  

function removeFromList(id){
    transaction = transaction.filter(item => item.id !== id)
    commitData()
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const amount = Number(amountEl.value)
    const category = categoryEl.value
    const id = Date.now()
    const tag = select.value
    
    if(!category.trim()) return;

    if(amount > 0 ){
        transaction.push({amount, category, id, tag})  
        amountEl.value = ""
        categoryEl.value = ""
        console.log(transaction)
        commitData()
    }
})

function savedData(){
    localStorage.setItem('transactions', JSON.stringify(transaction))
}

function loadData(){
    const getData = JSON.parse(localStorage.getItem('transactions')) || []
    transaction = getData 
}

function commitData(){
    renderedData()
    savedData()
}

renderedData()




