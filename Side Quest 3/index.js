let cart = []
let products= []
let isLoading = false

async function loadProduct(){
    try{
        isLoading = true;
        renderedProducts()
        renderedCart()

        const response = await fetch("products.json")
        if (!response) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        products = await response.json()
    }
    catch(error){
        console.log("Error occured", error)
        const errorEl = document.querySelector('.error-handler')
        if(errorEl) errorEl.innerHTML = "Error Occured, fetching failed"
    }
    finally{
        isLoading = false;
        renderedProducts()
        renderedCart()
    }
}

loadProduct()
loadCartData()
renderedCart()
renderedProducts()

function commitCart(){
    saveCartData()
    renderedCart()
}

function saveCartData(){
    localStorage.setItem('myCart', JSON.stringify(cart))
}

function renderedProducts(){
    const productContainer = document.querySelector(".products-container");
    productContainer.innerHTML = products.map(product => {
        return `
            <div class="products">
                <img class="rendered-img" src="${product.img}" alt="${product.name}" >
                <p>${product.name}</p>
                <p>₱ ${product.price}</p>
                <button data-action="add" data-id="${product.id}">Add to cart</button>
            </div>
            `;
        })
    .join("")
}

document.querySelector(".products-container").addEventListener('click', (e) =>{
        const action = e.target.dataset.action
        const id = Number(e.target.dataset.id)
        if(!action) return;
        if(action === 'add') addToCart(id)
    }
)

function addToCart(id){
    const currentItem = cart.find(item => item.id === id);
    
    if(currentItem) currentItem.qty++;
    else {cart.push({id: id, qty: 1})}
    commitCart()
}

function increaseQty(id){
    const item = cart.find(items => items.id === id)
    if(!item) return;

    item.qty++;
    commitCart()
}

function decreaseQty(id){
    const findItems = cart.find(item => item.id === id)
    
    if(!findItems) return;
    findItems.qty--

    if(findItems.qty <= 0){
        cart = cart.filter((item) => item.id !== id)
    }
    commitCart()
}

function renderedCart(){
    const cartContainer = document.querySelector(".myCart")

    let totalValue = totalSumProduct()

    cartContainer.innerHTML = cart.map((cartItem) => {
        const product = products.find(items => items.id === cartItem.id)
        if(!product) return;
        
        let subTotal = subTotalValue(cartItem.id)
        return `
            <div class="renderedCart">
                <p>${product.name}</p>
                <p>Qty: ${cartItem.qty}</p>
                <p>Subtotal: ${Number(subTotal)}</p>
                <button data-action="inc" data-id="${cartItem.id}">+</button>
                <button data-action="dec" data-id="${cartItem.id}">-</button>
                <button data-action="clear" data-id="${cartItem.id}">Remove</button>
            </div>
        `
    }).join("")

    const totalEl = document.querySelector(".total");
    totalEl.innerHTML = `Total: ${totalValue}`
}

document.querySelector(".myCart").addEventListener("click", (e) => {
    const action = e.target.dataset.action
    const id = Number(e.target.dataset.id) 

    if(action === 'inc') increaseQty(id)
    if(action === "dec") decreaseQty(id)      
    if(action === "clear") removeOneItem(id)    
})

function removeOneItem(id){
    cart = cart.filter((item)=> item.id !== id)
    commitCart()
}

function loadCartData(){
    const getData = JSON.parse(localStorage.getItem('myCart'))
    cart = getData || [];
}

function subTotalValue(id){
    const cartItem = cart.find(item => item.id === id)
    if(!cartItem) return;

    const product = products.find(p => p.id === id)
    if(!product) return;

    return product.price * cartItem.qty
    
}

function totalSumProduct(){
    let total = 0;
    for(const cartItem of cart){
        const product = products.find(p => p.id === cartItem.id)
        if(!product) continue;
        total += product.price * cartItem.qty
    }
    return total
}