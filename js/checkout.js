// ============================================
// PAYSTACK CHECKOUT INTEGRATION
// ============================================

// IMPORTANT: Replace with your actual Paystack public key
// Get your keys from: https://dashboard.paystack.com/#/settings/developer
const PAYSTACK_PUBLIC_KEY = 'pk_test_4040c16eb3c35c3f61dde08f3eed53dd854d919f'; // Replace with your test key

// Load order summary from cart
function loadOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const orderSubtotal = document.getElementById('order-subtotal');
    const orderTotal = document.getElementById('order-total');
    
    if (!orderItemsContainer) return;
    
    // Load cart from localStorage
    let cart = [];
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (error) {
        console.error('Error loading cart:', error);
    }
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<div class="loading">Your cart is empty. <a href="index.html">Continue shopping</a></div>';
        if (orderSubtotal) orderSubtotal.textContent = '$0.00';
        if (orderTotal) orderTotal.textContent = '$0.00';
        return;
    }
    
    // Render order items
    orderItemsContainer.innerHTML = cart.map((item) => {
        const priceValue = parseFloat(item.price.replace('$', '').replace(',', '')) || 0;
        const itemTotalUSD = priceValue * (item.quantity || 1);
        const itemTotalFormatted = typeof convertCartPrice === 'function' 
            ? convertCartPrice(`$${itemTotalUSD.toFixed(2)}`)
            : `$${itemTotalUSD.toFixed(2)}`;
        
        return `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="order-item-image">
                <div class="order-item-details">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-size">Size: ${(item.size || 'S').toUpperCase()} × ${item.quantity || 1}</div>
                    <div class="order-item-price">${itemTotalFormatted}</div>
                </div>
            </div>
        `;
    }).join('');
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', '').replace(',', '')) || 0;
        return sum + (price * (item.quantity || 1));
    }, 0);
    
    const subtotalFormatted = typeof convertCartPrice === 'function'
        ? convertCartPrice(`$${subtotal.toFixed(2)}`)
        : `$${subtotal.toFixed(2)}`;
    
    const totalFormatted = typeof convertCartPrice === 'function'
        ? convertCartPrice(`$${subtotal.toFixed(2)}`)
        : `$${subtotal.toFixed(2)}`;
    
    if (orderSubtotal) orderSubtotal.textContent = subtotalFormatted;
    if (orderTotal) orderTotal.textContent = totalFormatted;
}

// Handle checkout form submission
function handleCheckout(e) {
    e.preventDefault();
    
    if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY === 'pk_test_YOUR_PUBLIC_KEY_HERE') {
        alert('Paystack is not configured. Please add your Paystack public key in js/checkout.js');
        return;
    }
    
    // Get form data
    const formData = {
        email: document.getElementById('email').value,
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postal: document.getElementById('postal').value,
        country: document.getElementById('country').value
    };
    
    // Get cart
    let cart = [];
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (error) {
        console.error('Error loading cart:', error);
        alert('Error loading cart. Please try again.');
        return;
    }
    
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    
    // Disable submit button
    const submitBtn = document.getElementById('checkout-submit-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
    }
    
    // Calculate total amount (in kobo/cents - smallest currency unit)
    // Paystack uses amounts in the smallest currency unit (kobo for NGN, cents for USD, etc.)
    const totalAmount = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', '').replace(',', '')) || 0;
        return sum + (price * (item.quantity || 1));
    }, 0);
    
    // Get current currency from localStorage or default to USD
    const currentCurrency = localStorage.getItem('selectedCurrency') || 'USD';
    
    // Convert to smallest currency unit
    // For NGN: multiply by 100 to get kobo
    // For USD: multiply by 100 to get cents
    // For ZAR: multiply by 100 to get cents
    const amountInSmallestUnit = Math.round(totalAmount * 100);
    
    // Create order reference
    const orderRef = 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Create order data for backend
    const orderData = {
        email: formData.email,
        amount: amountInSmallestUnit,
        currency: currentCurrency, // Uses selected currency from site
        reference: orderRef,
        metadata: {
            customer_name: formData.name,
            customer_phone: formData.phone,
            customer_address: formData.address,
            customer_city: formData.city,
            customer_postal: formData.postal,
            customer_country: formData.country,
            cart_items: JSON.stringify(cart)
        },
        callback_url: window.location.origin + '/success.html?reference=' + orderRef,
    };
    
    // Initialize Paystack payment
    // Vercel automatically serves API routes from /api folder
    // For local development, use relative path
    // For production, Vercel will handle it automatically
    const apiEndpoint = '/api/initialize-payment';
    
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    })
    .then(async response => {
        // Check if response is ok
        if (!response.ok) {
            // Try to get error message from response
            let errorMessage = 'Network response was not ok';
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorData.message || errorMessage;
            } catch (e) {
                // If response is not JSON, use status text
                errorMessage = response.statusText || errorMessage;
            }
            throw new Error(errorMessage);
        }
        
        // Get response text first to check if it's empty
        const responseText = await response.text();
        if (!responseText || responseText.trim() === '') {
            throw new Error('Empty response from server. Please check server logs.');
        }
        
        // Parse JSON
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('Response text:', responseText);
            throw new Error('Invalid JSON response from server: ' + e.message);
        }
        
        // Check for error in response
        if (data.status === false || data.error) {
            throw new Error(data.error || data.message || 'Payment initialization failed');
        }
        
        // Extract authorization URL
        let authorizationUrl = null;
        if (data.authorization_url) {
            authorizationUrl = data.authorization_url;
        } else if (data.data && data.data.authorization_url) {
            authorizationUrl = data.data.authorization_url;
        }
        
        if (!authorizationUrl) {
            console.error('Response data:', data);
            throw new Error('No authorization URL received from server. Response: ' + JSON.stringify(data));
        }
        
        // Redirect to Paystack payment page
        window.location.href = authorizationUrl;
    })
    .catch(error => {
        console.error('Error:', error);
        
        // Show user-friendly error message
        let errorMessage = error.message || 'An unknown error occurred';
        
        if (error.message.includes('Network') || error.message.includes('Failed to fetch')) {
            errorMessage = 'Unable to connect to payment server. Please check your internet connection and ensure the backend server is running.';
        } else if (error.message.includes('PAYSTACK_SECRET_KEY')) {
            errorMessage = 'Server configuration error: Payment keys are not properly configured. Please contact support.';
        } else if (error.message.includes('Empty response') || error.message.includes('Invalid JSON')) {
            errorMessage = 'Server error: The payment server returned an invalid response. Please try again or contact support.';
        }
        
        alert('An error occurred during checkout. Please try again.\n\nError: ' + errorMessage);
        
        // Re-enable button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Proceed to Payment';
        }
    });
}

// Initialize checkout page
function initCheckout() {
    // Load order summary
    loadOrderSummary();
    
    // Handle form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCheckout);
} else {
    initCheckout();
}
