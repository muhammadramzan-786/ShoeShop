const hamburger=document.querySelector('.hamburger')
const navLinks=document.querySelector('.navLinks')

const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items-container');


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

  const totalQuantityElement = document.getElementById('total-quantity');
  const totalPriceElement = document.getElementById('total-price');
  let cart=[]
// Add event listener for 'Add to Cart' buttons
document.querySelectorAll('.car-btn').forEach(function(button) {
  console.log(button)
  button.addEventListener('click', function() {
    // Retrieve product details from data attributes
    let productId = this.getAttribute('data-id');
    let productName = this.getAttribute('data-name');
    let productPrice = parseFloat(this.getAttribute('data-price')); // Convert price to float
    let productPicture = this.getAttribute('data-image');
    // Log the product details or handle adding to cart logic
    console.log(`Product added to cart: ${productName} (ID: ${productId}, Price: $${productPrice})`);

    let existingProduct=cart.find(product=>product.id===productId)
    if(existingProduct){
      // If product exists, increase quantity
      existingProduct.quantity++
      document.querySelector(`[data-product-id="${productId}"] .quantity`).innerText = existingProduct.quantity;
    }else{
      let newProduct={
        id:productId,
        name:productName,
        price:productPrice,
        quantity:1,
        image:productPicture
      }
      cart.push(newProduct)

    const div=document.createElement('div')
    div.classList.add('row')
    div.setAttribute('data-product-id', productId);

    div.innerHTML = `
    <h4 class="removeProduct"><i class="fa fa-trash" aria-hidden="true"></i></h4>
    <img class="cartImage" src="${productPicture}">
    <h6 class="itemName">${productName}</h6>
    <h6 class="itemPrice">${productPrice}</h6>
    <div class="quantity-controls">
      <button class="decrement">-</button>
      <span class="quantity">1</span>
      <button class="increment">+</button>
    </div>
  `;
   // Increment and Decrement Buttons
   const incButton = div.querySelector('.increment');
   const decButton = div.querySelector('.decrement');
   const quantitySpan = div.querySelector('.quantity');
   const removeBtn = div.querySelector('.removeProduct');
   cartItems.appendChild(div)

incButton.addEventListener('click', () => {
  newProduct.quantity++;
  quantitySpan.innerText = newProduct.quantity;
  updateCartSummary()
});


decButton.addEventListener('click', () => {
    if (newProduct.quantity > 1) {
      newProduct.quantity--;
      quantitySpan.innerText = newProduct.quantity;
      updateCartSummary()
    }
});


removeBtn.addEventListener('click',()=>{
  div.remove();
  cart=cart.filter(product=>product.id!==productId)
  updateCartSummary()
})
}
updateCartSummary()
});
});

function updateCartSummary(){
  let totalQuantity=cart.reduce((acc,product)=>acc+product.quantity,0)
  let totalPrice=cart.reduce((acc,product)=>acc+(product.price*product.quantity),0)
  totalQuantityElement.innerText = `Total Items: ${totalQuantity}`;
  totalPriceElement.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Get modal elements
const modal = document.getElementById("productDetailModal");
const modalImage = document.getElementById("modalProductImage");
const modalName = document.getElementById("modalProductName");
const modalDescription = document.getElementById("modalProductDescription");
const modalPrice = document.getElementById("modalProductPrice");
const closeModal = document.querySelector(".closeModal");

// Add event listeners to all 'info' buttons
document.querySelectorAll('.info-btn').forEach(function(button) {
  button.addEventListener('click', function() {
    const card = button.closest('.card'); // Get the card element

    // Retrieve product data from the card
    const productName = card.querySelector('.card-title').innerText;
    const productDescription = card.querySelector('.card-text').innerText;
    const productPrice = card.querySelector('.card-price').innerText;
    const productImage = card.querySelector('.card-img-top').src;

    // Update the modal content with the product details
    modalImage.src = productImage;
    modalName.innerText = productName;
    modalDescription.innerText = productDescription;
    modalPrice.innerText = productPrice;

    // Show the modal
    modal.style.display = 'block';
  });
});

// Close the modal when the close button is clicked
closeModal.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
