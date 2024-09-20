const hamburger=document.querySelector('.hamburger')
const navLinks=document.querySelector('.navLinks')

const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');

hamburger.addEventListener('click',()=>{
    navLinks.classList.toggle('active')
})

cartBtn.addEventListener('click',()=>{
    cartSidebar.classList.add('open')
})
closeCartBtn.addEventListener('click',()=>{
    cartSidebar.classList.remove('open')
})
  // Sabhi quantity-control sections ko dhoondho
const allQuantityControls = document.querySelectorAll('.quantity-controls');

// Har section ke liye event listener lagao
allQuantityControls.forEach(function(control) {
  const incrementBtn = control.querySelector('.increment');  // Increment button
  const decrementBtn = control.querySelector('.decrement');  // Decrement button
  const quantityDisplay = control.querySelector('.quantity');  // Quantity display
  
  let quantity = 1;  // Har item ki initial quantity
  
  // Increment button ke liye
  incrementBtn.addEventListener('click', function() {
    quantity++;  // Quantity ko badhao
    quantityDisplay.textContent = quantity;  // Quantity display update karo
  });

  // Decrement button ke liye
  decrementBtn.addEventListener('click', function() {
    if (quantity > 1) {  // Quantity ko 1 se kam na hone do
      quantity--;  // Quantity ko ghatao
      quantityDisplay.textContent = quantity;  // Quantity display update karo
    }
  });
});
