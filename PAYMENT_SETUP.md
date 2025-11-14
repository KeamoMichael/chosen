# Quick Paystack Payment Gateway Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Get Paystack API Keys
1. Go to https://paystack.com and sign up (free)
2. Navigate to https://dashboard.paystack.com/#/settings/developer
3. Copy your **Public Key** (starts with `pk_test_`)
4. Copy your **Secret Key** (starts with `sk_test_`) - Keep this secret!

### Step 2: Configure Frontend
Edit `js/checkout.js` line 7:
```javascript
const PAYSTACK_PUBLIC_KEY = 'pk_test_YOUR_ACTUAL_KEY_HERE';
```

### Step 3: Set Up Backend
1. Create `.env` file in root directory:
```env
PAYSTACK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
PAYSTACK_PUBLIC_KEY=pk_test_YOUR_PUBLIC_KEY_HERE
PORT=3000
```

2. Install dependencies:
```bash
npm install
```

3. Start server:
```bash
npm start
```

### Step 4: Test
1. Add items to cart
2. Click "CHECK OUT"
3. Fill in checkout form
4. Use test card: `4084084084084081`
5. Any future expiry date, any CVV
6. Use any email address

## ✅ You're Done!

Your payment gateway is now set up. The checkout flow will:
1. Collect customer information
2. Initialize Paystack payment via backend
3. Redirect to Paystack's secure payment page
4. Process the payment
5. Redirect back to success page
6. Verify payment and clear cart

## 💰 Supported Currencies

Paystack supports:
- NGN (Nigerian Naira) - Default
- USD (US Dollar)
- ZAR (South African Rand)
- GHS (Ghanaian Cedi)
- KES (Kenyan Shilling)
- And more...

Update the `currency` field in `js/checkout.js` based on your needs.

## 🔒 Security Reminders

- ✅ Never commit `.env` file (already in `.gitignore`)
- ✅ Never use secret keys in frontend code
- ✅ Always use HTTPS in production
- ✅ Verify webhook signatures
- ✅ Test with test keys before going live

## 📚 Need Help?

- Paystack Docs: https://paystack.com/docs
- Paystack Dashboard: https://dashboard.paystack.com
- Test Cards: https://paystack.com/docs/payments/test-payments
- API Reference: https://paystack.com/docs/api

## 🧪 Test Cards

- **Success**: `4084084084084081`
- **Decline**: `5060666666666666666`
- **3D Secure**: `5060666666666666666`
- Any future expiry date
- Any CVV
- Any email address
