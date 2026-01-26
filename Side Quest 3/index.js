const products = [
    { id: 1, name: "Basketball", price: 799 },
    { id: 2, name: "T-Shirt", price: 449 },
    { id: 3, name: "Loafer Shoe", price: 799 }
];

let cart = []

function renderedProducts(){
    const productContainer = document.querySelector(".products-container");
    productContainer.innerHTML = products.map(product => {
        return `
            <div class="products">
                <p>${product.name}</p>
                <p>${product.price}</p>
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
        renderedCart()
    }
)

function addToCart(id){
    const currentItem = cart.find(item => item.id === id);
    
    if(currentItem){
        currentItem.qty++;
    }else{
        cart.push({id: id, qty: 1})
    }
}

function increaseQty(id){
    const item = cart.find(items => items.id === id)
    if(item)item.qty++;
}

function decreaseQty(id){
    const findItems = cart.find(item => item.id === id)
    
    if(!findItems) return;
    if(findItems) findItems.qty--
    if(findItems.qty === 0){
        const newCart = cart.filter((item) => item.id !== id)
        cart = newCart
    }
}

function renderedCart(){
    const cartContainer = document.querySelector(".myCart")
    cartContainer.innerHTML = cart.map((cartItem) => {
        const product = products.find(items => items.id === cartItem.id)
        return `
            <div class="renderedCart">
                <p>${product.name}</p>
                <p>Qty: ${cartItem.qty}</p>
                <p>Subtotal: ${product.price * cartItem.qty}</p>
                <button data-action="inc" data-id="${cartItem.id}">+</button>
                <button data-action="dec" data-id="${cartItem.id}">-</button>
                <button data-action="clear" data-id="${cartItem.id}">Remove</button>
                
            </div>
        `
    }).join("")
}

document.querySelector(".myCart").addEventListener("click", (e) => {
    const action = e.target.dataset.action
    const id = Number(e.target.dataset.id) 

    if(action === 'inc') increaseQty(id)
    if(action === "dec") decreaseQty(id)      
    if(action === "clear") removeOneItem(id)
    renderedCart()
})

function removeOneItem(id){
    const remainItems = cart.filter((item)=> item.id !== id)
    cart = remainItems
}

renderedCart()
renderedProducts()
