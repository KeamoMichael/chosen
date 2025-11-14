# Chosen - E-commerce Website

A modern, responsive e-commerce website built with HTML, CSS, and JavaScript.

## Features

- 🛍️ Product catalog with category filtering
- 🛒 Shopping cart with sidebar
- 💱 Multi-currency support (18 currencies)
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 💳 Paystack payment integration (setup required)

## Payment Gateway Setup

### Paystack Integration

This project uses Paystack for payment processing. To set up payments:

#### 1. Get Your Paystack API Keys

1. Sign up for a Paystack account at [https://paystack.com](https://paystack.com)
2. Go to [Paystack Dashboard > Settings > API Keys & Webhooks](https://dashboard.paystack.com/#/settings/developer)
3. Copy your **Public Key** (starts with `pk_test_` for test mode)
4. Copy your **Secret Key** (starts with `sk_test_` for test mode) - Keep this secret!

#### 2. Configure Client-Side (Frontend)

Edit `js/checkout.js` and replace:
```javascript
const PAYSTACK_PUBLIC_KEY = 'pk_test_YOUR_PUBLIC_KEY_HERE';
```

With your actual public key:
```javascript
const PAYSTACK_PUBLIC_KEY = 'pk_test_51AbCdEf...'; // Your actual key
```

#### 3. Set Up Backend Server (Required for Production)

**IMPORTANT:** For security, you MUST initialize payments on your backend server. Never use your secret key in client-side code.

A complete backend server example is already provided in `server-example.js`. Follow these steps:

##### Step 1: Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web server framework
- `paystack` - Paystack SDK
- `cors` - Enable CORS for API
- `dotenv` - Environment variable management

##### Step 2: Create Environment File

Create a `.env` file in the root directory:

```env
PAYSTACK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
PAYSTACK_PUBLIC_KEY=pk_test_YOUR_PUBLIC_KEY_HERE
PORT=3000
```

**Important:** Never commit the `.env` file. It's already in `.gitignore`.

##### Step 3: Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3000` and serve both your frontend files and the payment API.

**Note:** The `server-example.js` file contains a complete, production-ready server with error handling and webhook support.

##### Alternative: Serverless Function (Vercel/Netlify)

For serverless deployment, create `api/initialize-payment.js`:

```javascript
const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { email, amount, currency, reference, metadata, callback_url } = req.body;
        
        const response = await paystack.transaction.initialize({
            email,
            amount,
            currency: currency || 'USD',
            reference,
            metadata: metadata || {},
            callback_url: callback_url || `${req.headers.origin}/success.html`,
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
        res.status(500).json({ 
            status: false,
            error: error.message 
        });
    }
}
```

#### 4. Frontend is Already Configured

The frontend (`js/checkout.js`) is already set up to communicate with the backend API. It will automatically:
- Send order data to the backend
- Initialize Paystack payment
- Redirect users to Paystack's secure payment page
- Handle success and error cases

**Note:** The `checkout.html` and `success.html` pages are already created and ready to use.

### Testing

1. Use Paystack test cards:
   - Success: `4084084084084081`
   - Decline: `5060666666666666666`
   - Any future expiry date and any CVV

2. Test mode keys start with `pk_test_` and `sk_test_`

3. Switch to live keys (`pk_live_` and `sk_live_`) when ready for production

4. Test email: Use any email address for testing

### Supported Currencies

Paystack supports multiple currencies. Update the `currency` field in `js/checkout.js` based on your needs:
- NGN (Nigerian Naira) - Default for Paystack
- USD (US Dollar)
- ZAR (South African Rand)
- GHS (Ghanaian Cedi)
- KES (Kenyan Shilling)
- And more...

## Project Structure

```
commerce-website-01/
├── index.html          # Main shop page
├── product.html        # Product detail page
├── checkout.html       # Checkout page
├── success.html        # Payment success page
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   ├── main.js        # Product catalog logic
│   ├── cart.js        # Shopping cart functionality
│   ├── currency.js    # Currency conversion
│   ├── product.js     # Product page logic
│   ├── checkout.js    # Checkout & payment
│   └── success.js     # Success page logic
├── server-example.js  # Backend server example
├── package.json       # Node.js dependencies
├── fonts/             # ClashGrotesk font family
└── reference/         # Reference images
```

## Local Development

1. Clone the repository
2. For frontend only, open `index.html` in a browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
3. For full payment functionality, start the backend server:
   ```bash
   npm install
   npm start
   ```
4. Navigate to `http://localhost:3000`

## Deployment

### Static Hosting (Frontend Only)

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repo
- **GitHub Pages**: Push to `gh-pages` branch

### Full Stack (With Payment Processing)

- **Vercel**: Deploy frontend + serverless functions
- **Netlify**: Deploy frontend + Netlify Functions
- **Heroku**: Deploy Node.js backend + static frontend
- **AWS**: Use S3 for frontend + Lambda for API
- **DigitalOcean**: Deploy Node.js app

## Security Notes

⚠️ **IMPORTANT:**
- Never commit API keys to version control
- Use environment variables for secret keys
- Always use HTTPS in production
- Validate all payment data on the server
- Implement rate limiting for API endpoints
- Verify webhook signatures

## Support

For Paystack support, visit:
- [Paystack Documentation](https://paystack.com/docs)
- [Paystack Dashboard](https://dashboard.paystack.com)
- [Paystack API Reference](https://paystack.com/docs/api)

## License

© 2025 By Flowit Supply
