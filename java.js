function openViewCart(){
    document.getElementById("viewcart").style.display = "block";
}
function closeViewCart(){
    document.getElementById("viewcart").style.display = "none";
}
function notification() {
  document.getElementById("notification").style.display = "block";
  setTimeout(() => {
        document.getElementById("notification").style.display = "none";
    }, 2000);
}
function opencart() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("cart").style.display = "block";
}
function closecart() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("cart").style.display = "none";
}
function openorder() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("order").style.display = "block";
  document.getElementById("cart").style.display = "none";
  showOrder();
}
function closeorder() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("order").style.display = "none";
}
function openend() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("end").style.display = "block";
    document.getElementById("order").style.display = "none";
}
function closeend() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("end").style.display = "none";
}
document.querySelector("#order form").addEventListener("submit", function(e){
    if (!this.checkValidity()) {
        e.preventDefault();
        this.reportValidity();
        return;
    }
    e.preventDefault();
    openend();
    this.reset();
});
let cart = [];
function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.qty += 1; 
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }
    openViewCart();
    showCart();
}
function removeFromCart(index) {
    cart[index].qty -= 1;
    cart = cart.filter(item => item.qty > 0);
    showCart();
}
function showCart() {
    const cartDiv = document.getElementById("cartItems");
    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        closeViewCart();
        closecart();
        return;
    }
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let div = document.createElement("div");
        div.innerHTML =`
        <span id="items">${item.name}</span> <span id="price">Rs.${item.price}</span>
        <button id="remove" onclick="removeFromCart(${i})">➖</button>
        <button id="qnty">${item.qty}</button>
        <button id="add" onclick="addToCart('${item.name}', ${item.price})">➕</button>`;
        cartDiv.appendChild(div);
    }
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price* cart[i].qty;
    }
    let totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong id="total">Total: Rs.${total}</strong>`;
    cartDiv.appendChild(totalDiv);
}
function showOrder() {
    const orderDiv = document.getElementById("orderedItems");
    orderDiv.innerHTML = "";
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let div = document.createElement("div");
        div.innerHTML =`
        <span id="items">${item.qty} x ${item.name}  - Rs.${item.price}</span>`
        orderDiv.appendChild(div);
    }
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price;
    }
    let totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong id="total">Total: Rs.${total}</strong>`;
    orderDiv.appendChild(totalDiv);
}
