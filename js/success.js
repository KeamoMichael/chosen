// ============================================
// PAYMENT SUCCESS PAGE
// Verify payment and clear cart
// ============================================

// Verify payment on success page
function verifyPayment() {
    // Get reference from URL
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference') || urlParams.get('trxref');
    
    if (reference) {
        // Verify payment with backend
        // Vercel automatically serves API routes from /api folder
        fetch(`/api/verify-payment?reference=${encodeURIComponent(reference)}`)
            .then(response => response.json())
            .then(data => {
                if (data.status && data.data.status === 'success') {
                    // Payment verified successfully
                    console.log('Payment verified:', data);
                    
                    // Clear cart after successful payment
                    if (typeof cart !== 'undefined') {
                        cart = [];
                        if (typeof saveCart === 'function') {
                            saveCart();
                        }
                    }
                } else {
                    console.warn('Payment verification failed or pending');
                }
            })
            .catch(error => {
                console.error('Error verifying payment:', error);
                // Still clear cart if user reached success page
                if (typeof cart !== 'undefined') {
                    cart = [];
                    if (typeof saveCart === 'function') {
                        saveCart();
                    }
                }
            });
    } else {
        // No reference, just clear cart
        if (typeof cart !== 'undefined') {
            cart = [];
            if (typeof saveCart === 'function') {
                saveCart();
            }
        }
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verifyPayment);
} else {
    verifyPayment();
}

