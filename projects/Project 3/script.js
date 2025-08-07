
document.querySelector('.hamburger').addEventListener('click', function() {
    const nav = document.querySelector('nav ul');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        
        this.classList.add('active');
        
        const newImage = this.getAttribute('data-image');
        document.getElementById('main-product-image').src = newImage;
    });
});

let currentReview = 0;
const reviews = document.querySelectorAll('.review');
const totalReviews = reviews.length;

function showReview(index) {
    reviews.forEach(review => review.classList.remove('active'));
    reviews[index].classList.add('active');
    currentReview = index;
}

document.getElementById('next-review').addEventListener('click', function() {
    currentReview = (currentReview + 1) % totalReviews;
    showReview(currentReview);
});

document.getElementById('prev-review').addEventListener('click', function() {
    currentReview = (currentReview - 1 + totalReviews) % totalReviews;
    showReview(currentReview);
});

// Newsletter Form Submission
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input');
    const messageDiv = document.getElementById('form-message');
    
    // Simple validation
    if (emailInput.value.includes('@')) {
        messageDiv.textContent = 'Thank you for subscribing!';
        messageDiv.style.backgroundColor = '#2ed573';
        messageDiv.style.display = 'block';
        emailInput.value = '';
    } else {
        messageDiv.textContent = 'Please enter a valid email address.';
        messageDiv.style.backgroundColor = '#ff4757';
        messageDiv.style.display = 'block';
    }
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
});

// Add to Cart Button
document.getElementById('add-to-cart').addEventListener('click', function() {
    const color = document.getElementById('color-select').value;
    const size = document.getElementById('size-select').value;
    
    alert(`Added to cart: ${color} color, size ${size}`);
    
    // In a real app, you would add the item to a shopping cart
});