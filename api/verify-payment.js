// Vercel Serverless Function for Paystack Payment Verification
// This file should be in the /api folder for Vercel

const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

module.exports = async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ 
            status: false,
            error: 'Method not allowed' 
        });
    }

    try {
        // Get reference from query parameter
        const { reference } = req.query;
        
        if (!reference) {
            return res.status(400).json({ 
                status: false,
                error: 'Reference is required' 
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

        // Verify payment with Paystack
        const response = await paystack.transaction.verify(reference);
        
        if (response.status && response.data) {
            return res.status(200).json({
                status: true,
                message: response.message,
                data: response.data
            });
        } else {
            return res.status(400).json({
                status: false,
                message: response.message || 'Payment verification failed'
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        return res.status(500).json({ 
            status: false,
            error: error.message || 'An error occurred while verifying the payment' 
        });
    }
}

