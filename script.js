let wheat = [
{name:"Durum",price:70},
{name:"Sharbati",price:60},
{name:"Lokwan",price:55},
{name:"Khapli",price:80},
{name:"Kalyan Sona",price:50}
];

let cart = [];

/* LOAD PRODUCTS */
function loadProducts(){
let container = document.getElementById("productContainer");

wheat.forEach((w,i)=>{
container.innerHTML += `
<div class="card" onclick="selectCard(this)">
<h3>${w.name}</h3>
<img src="images/${w.name.toLowerCase().replace(' ','')}.jpg">

<p>₹${w.price}/kg</p>

<label>Texture</label>
<select id="texture${i}">
<option>Fine</option>
<option>Medium</option>
<option>Coarse</option>
</select>

<label>Quantity (kg)</label>
<input type="number" id="qty${i}" value="1">

<img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${w.name}Quality">

<button onclick="addToCart(event,${i})">Add</button>
</div>
`;
});
}

/* SELECT */
function selectCard(card){
card.classList.toggle("selected");
}

/* ADD TO CART */
function addToCart(e,i){
e.stopPropagation();

let qty = document.getElementById("qty"+i).value;
let texture = document.getElementById("texture"+i).value;

let item = wheat[i];

cart.push({
name:item.name,
qty:qty,
texture:texture,
price:item.price,
total:item.price*qty
});

renderCart();
}

/* RENDER CART */
function renderCart(){
let cartDiv = document.getElementById("cart");
let total = 0;

cartDiv.innerHTML="";

cart.forEach(item=>{
cartDiv.innerHTML += `
<p>${item.name} (${item.qty}kg - ${item.texture}) = ₹${item.total}</p>
`;
total += item.total;
});

document.getElementById("total").innerText = total;
}

/* PAYMENT */
function showPayment(){
document.getElementById("paymentBox").style.display="block";
}

/* CONFIRM ORDER */
function confirmOrder(){
let id = "ORD" + Math.floor(Math.random()*100000);

localStorage.setItem("orderId",id);
localStorage.setItem("status","Order Placed");

alert("Order Confirmed! ID: "+id);
}

/* TRACK */
function trackOrder(){
let input = document.getElementById("trackInput").value;
let id = localStorage.getItem("orderId");

if(input === id){
document.getElementById("status").innerText =
localStorage.getItem("status");
}else{
document.getElementById("status").innerText="Invalid ID";
}
}

window.onload = loadProducts;