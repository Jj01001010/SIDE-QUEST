let cart = []
let products= []

async function loadProduct(){
    const data = await fetch("./products.json")
    if (!data.ok) throw new Error("Error kumag kaba")
    
    products = await data.json()
    renderedProducts()
    renderedCart()
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
                <p>${product.name}</p>
                <p>${product.price}</p>
                <img class="rendered-img" src="${product.img}" alt="${product.name}" >
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

    let totalValue = 0;

    for(const cartItem of cart){
        const product = products.find(p => p.id === cartItem.id)
        if(!product) continue;
        totalValue += product.price * cartItem.qty
    }

    cartContainer.innerHTML = cart.map((cartItem) => {
        
        const product = products.find(items => items.id === cartItem.id)
        if(!product) return;

        const subTotal = product.price * cartItem.qty;
        return `
            <div class="renderedCart">
                <p>${product.name}</p>
                <p>Qty: ${cartItem.qty}</p>
                <p>Subtotal: ${subTotal}</p>
                <button data-action="inc" data-id="${cartItem.id}">+</button>
                <button data-action="dec" data-id="${cartItem.id}">-</button>
                <button data-action="clear" data-id="${cartItem.id}">Remove</button>
            </div>
        `
    }).join("")

    const totalEl = document.querySelector(".total");
    totalEl.innerHTML = `Total: ${Number(totalValue)}`
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