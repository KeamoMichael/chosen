// ============================================
// PAYSTACK BACKEND SERVER EXAMPLE
// Node.js/Express server for initializing Paystack payments
// ============================================

// Install dependencies:
// npm install express paystack cors dotenv

const express = require('express');
const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY || 'sk_test_YOUR_SECRET_KEY_HERE');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files (HTML, CSS, JS)

// Initialize payment endpoint
app.post('/api/initialize-payment', async (req, res) => {
    try {
        // Check if Paystack secret key is configured
        if (!process.env.PAYSTACK_SECRET_KEY || process.env.PAYSTACK_SECRET_KEY === 'sk_test_YOUR_SECRET_KEY_HERE') {
            console.error('PAYSTACK_SECRET_KEY is not set or is using placeholder value');
            return res.status(500).json({ 
                status: false,
                error: 'Server configuration error: PAYSTACK_SECRET_KEY is not set. Please configure it in Render environment variables.' 
            });
        }

        const { email, amount, currency, reference, metadata, callback_url } = req.body;
        
        // Validate input
        if (!email || !amount || !reference) {
            return res.status(400).json({ 
                status: false,
                error: 'Email, amount, and reference are required' 
            });
        }
        
        // Initialize Paystack payment
        const response = await paystack.transaction.initialize({
            email: email,
            amount: amount, // Amount in kobo/cents (smallest currency unit)
            currency: currency || 'USD', // USD, NGN, ZAR, etc.
            reference: reference,
            metadata: metadata || {},
            callback_url: callback_url || `${req.headers.origin || req.headers.referer?.split('/').slice(0, 3).join('/')}/success.html`,
        });
        
        if (response.status && response.data) {
            res.json({
                status: true,
                message: response.message,
                data: {
                    authorization_url: response.data.authorization_url,
                    access_code: response.data.access_code,
                    reference: response.data.reference
                }
            });
        } else {
            throw new Error(response.message || 'Failed to initialize payment');
        }
    } catch (error) {
        console.error('Error initializing payment:', error);
        // Ensure we always send a JSON response
        res.status(500).json({ 
            status: false,
            error: error.message || 'An error occurred while initializing the payment' 
        });
    }
});

// Verify payment endpoint (called after payment)
app.get('/api/verify-payment/:reference', async (req, res) => {
    try {
        // Check if Paystack secret key is configured
        if (!process.env.PAYSTACK_SECRET_KEY || process.env.PAYSTACK_SECRET_KEY === 'sk_test_YOUR_SECRET_KEY_HERE') {
            console.error('PAYSTACK_SECRET_KEY is not set or is using placeholder value');
            return res.status(500).json({ 
                status: false,
                error: 'Server configuration error: PAYSTACK_SECRET_KEY is not set. Please configure it in Render environment variables.' 
            });
        }

        const { reference } = req.params;
        
        if (!reference) {
            return res.status(400).json({ 
                status: false,
                error: 'Reference is required' 
            });
        }
        
        // Verify payment with Paystack
        const response = await paystack.transaction.verify(reference);
        
        if (response.status && response.data) {
            res.json({
                status: true,
                message: response.message,
                data: response.data
            });
        } else {
            res.status(400).json({
                status: false,
                message: response.message || 'Payment verification failed'
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ 
            status: false,
            error: error.message || 'An error occurred while verifying the payment' 
        });
    }
});

// Webhook endpoint for handling payment events (optional but recommended)
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    
    // Verify webhook signature
    const hash = require('crypto')
        .createHmac('sha512', secret)
        .update(JSON.stringify(req.body))
        .digest('hex');
    
    if (hash !== req.headers['x-paystack-signature']) {
        console.error('Webhook signature verification failed');
        return res.status(400).send('Invalid signature');
    }
    
    const event = req.body;
    
    // Handle the event
    switch (event.event) {
        case 'charge.success':
            console.log('Payment successful for reference:', event.data.reference);
            // Here you can:
            // - Update your database
            // - Send confirmation emails
            // - Update inventory
            // - etc.
            break;
        case 'charge.failed':
            console.log('Payment failed for reference:', event.data.reference);
            break;
        default:
            console.log(`Unhandled event type ${event.event}`);
    }
    
    res.json({ received: true });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
    // Check if Paystack secret key is configured
    if (!process.env.PAYSTACK_SECRET_KEY || process.env.PAYSTACK_SECRET_KEY === 'sk_test_YOUR_SECRET_KEY_HERE') {
        console.warn('⚠️  WARNING: PAYSTACK_SECRET_KEY is not set or is using placeholder value');
        console.warn('⚠️  Payment endpoints will not work until PAYSTACK_SECRET_KEY is configured');
        console.warn('⚠️  Set PAYSTACK_SECRET_KEY in Render environment variables');
    } else {
        console.log('✅ PAYSTACK_SECRET_KEY is configured');
    }
});
