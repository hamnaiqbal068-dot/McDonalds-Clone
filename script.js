document.addEventListener("DOMContentLoaded", function () {

    // ===============================
// PROFILE
// ===============================

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click",function(){

        showToast("👋 Logged out!");

        setTimeout(function(){

            window.location.href="login.html";

        },1000);

    });

}

    // ===============================
// SIGN UP
// ===============================

const signupBtn = document.getElementById("signupBtn");

if(signupBtn){

    signupBtn.addEventListener("click",function(){

        const name = document.getElementById("signupName").value.trim();

        const email = document.getElementById("signupEmail").value.trim();

        const password = document.getElementById("signupPassword").value.trim();

        if(name==="" || email==="" || password===""){

            showToast("❌ Please fill all fields.");

            return;

        }

        showToast("🎉 Account created!");

    });

}

    // ===============================
// NEWSLETTER
// ===============================

const subscribeBtn = document.getElementById("subscribeBtn");
const newsletterEmail = document.getElementById("newsletterEmail");

if(subscribeBtn){

    subscribeBtn.addEventListener("click",function(){

        const email = newsletterEmail.value.trim();

        if(email === ""){

            showToast("❌ Please enter your email.");

            return;

        }

        if(!email.includes("@") || !email.includes(".")){

            showToast("❌ Please enter a valid email.");

            return;

        }

        showToast("🎉 Thanks for subscribing!");

        newsletterEmail.value = "";

    });

}


    // ===============================
// STAR RATINGS
// ===============================

const ratingBoxes = document.querySelectorAll(".user-rating");

ratingBoxes.forEach(box => {

    const stars = box.querySelectorAll(".star");

    const id = box.dataset.id;

    const saved = localStorage.getItem("rating-" + id);

    if(saved){

        stars.forEach((star,index)=>{

            if(index < saved){

                star.classList.add("active");

                star.textContent="★";

            }

        });

    }

    stars.forEach((star,index)=>{

        star.addEventListener("click",function(){

            localStorage.setItem("rating-" + id,index+1);

            stars.forEach(s=>{

                s.classList.remove("active");

                s.textContent="☆";

            });

            for(let i=0;i<=index;i++){

                stars[i].classList.add("active");

                stars[i].textContent="★";

            }

            showToast("⭐ Thanks for rating!");

        });

    });

});
    const loader = document.getElementById("loader");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function (e) {

    e.stopPropagation();

    navLinks.classList.toggle("active");

});

// Close menu when clicking anywhere else
document.addEventListener("click", function () {

    navLinks.classList.remove("active");

});

// Prevent menu from closing when clicking inside it
navLinks.addEventListener("click", function (e) {

    e.stopPropagation();

});


    const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".card");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        const category = this.dataset.category;

        menuCards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});
const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

hiddenElements.forEach(function(el){

    observer.observe(el);

});

   const favorites = document.querySelectorAll(".favorite");

favorites.forEach(function (heart) {

    const id = heart.dataset.id;

    if (localStorage.getItem(id) === "true") {

        heart.textContent = "❤️";

    }

    heart.addEventListener("click", function () {

        if (heart.textContent === "🤍") {

            heart.textContent = "❤️";

            localStorage.setItem(id, "true");

        } else {

            heart.textContent = "🤍";

            localStorage.removeItem(id);

        }

    });

});
    const search = document.getElementById("search");

if (search) {

    search.addEventListener("keyup", function () {

        const value = search.value.toLowerCase();

        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            if (title.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}
const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(e){

        e.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;

        const payment = document.querySelector(
            "input[name='payment']:checked"
        ).value;

        alert(
            "🎉 Thank you, " +
            name +
            "!\n\nYour McDonald's order has been placed successfully.\n\nPayment: " +
            payment
        );

        checkoutForm.reset();

    });

}
 
    
    const cartIcon = document.querySelector(".cart-icon");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");

cartIcon.addEventListener("click", function () {
    cartPanel.classList.add("open");
});

closeCart.addEventListener("click", function () {
    cartPanel.classList.remove("open");
});

    const topBtn = document.getElementById("topBtn");

    if (topBtn) {
        topBtn.onclick = function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
    }

   

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartButtons = document.querySelectorAll(".add-cart");
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const subtotalElement = document.getElementById("subtotal");
const deliveryElement = document.getElementById("delivery");
const discountElement = document.getElementById("discount");
const promoInput = document.getElementById("promo-code");
const applyPromo = document.getElementById("applyPromo");

let discount = 0;
const deliveryFee = 2.99;
const toast = document.getElementById("toast");

function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function(){

        toast.classList.remove("show");

    },2500);

}
function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        cart.forEach((product, index) => {

            total += product.price * product.quantity;

           cartItems.innerHTML += `

<div class="cart-item">

    <img src="${product.image}" class="cart-image">

    <div class="cart-info">

        <h4>${product.name}</h4>

        <p>$${product.price.toFixed(2)}</p>

        <div class="quantity">

            <button onclick="decreaseQuantity(${index})">-</button>

            <span>${product.quantity}</span>

            <button onclick="increaseQuantity(${index})">+</button>

        </div>

        <button class="remove-btn" onclick="removeItem(${index})">

            🗑 Remove

        </button>

    </div>

</div>

`;

        });

    }

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    subtotalElement.textContent = total.toFixed(2);

deliveryElement.textContent = deliveryFee.toFixed(2);

discountElement.textContent = discount.toFixed(2);

const finalTotal = total + deliveryFee - discount;

cartTotal.textContent = finalTotal.toFixed(2);
localStorage.setItem("cart", JSON.stringify(cart));

}
window.increaseQuantity = function(index){

    cart[index].quantity++;

    updateCart();

};

window.decreaseQuantity = function(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    updateCart();

};

window.removeItem = function(index){

    cart.splice(index,1);

    updateCart();

};

   

    cartButtons.forEach(button => {

        button.addEventListener("click", function () {

            const product = {
    name: button.dataset.name,
    price: Number(button.dataset.price),
    image: button.dataset.image
};

           const existingProduct = cart.find(item => item.name === product.name);

if (existingProduct) {

    existingProduct.quantity++;

} else {

    product.quantity = 1;

    cart.push(product);

}

updateCart();

alert(product.name + " added to cart!");

        });

    });
if (applyPromo) {

    applyPromo.addEventListener("click", function () {

        const code = promoInput.value.trim().toUpperCase();

        let subtotal = cart.reduce(
            (sum, item) => sum + (item.price * item.quantity),
            0
        );

        if (code === "WELCOME10") {

            discount = subtotal * 0.10;

            alert("Promo code applied!");

        } else {

            discount = 0;

            alert("Invalid promo code!");

        }

        updateCart();

    });

}

updateCart();
setTimeout(function(){

    loader.style.opacity = "0";

    setTimeout(function(){

        loader.style.display = "none";

    },500);

},2000);
});

const clearCart = document.getElementById("clearCart");

if (clearCart) {

    clearCart.addEventListener("click", function () {

        cart = [];

        localStorage.removeItem("cart");

        updateCart();

    });

}