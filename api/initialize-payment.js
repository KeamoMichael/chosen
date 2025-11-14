// Vercel Serverless Function for Paystack Payment Initialization
// This file should be in the /api folder for Vercel

const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

module.exports = async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            status: false,
            error: 'Method not allowed' 
        });
    }

    try {
        const { email, amount, currency, reference, metadata, callback_url } = req.body;
        
        // Validate required fields
        if (!email || !amount || !reference) {
            return res.status(400).json({ 
                status: false,
                error: 'Email, amount, and reference are required' 
            });
        }

        // Validate Paystack secret key is set
        if (!process.env.PAYSTACK_SECRET_KEY) {
            console.error('PAYSTACK_SECRET_KEY is not set');
            return res.status(500).json({ 
                status: false,
                error: 'Server configuration error' 
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
            return res.status(200).json({
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
        return res.status(500).json({ 
            status: false,
            error: error.message || 'An error occurred while initializing the payment' 
        });
    }
}

