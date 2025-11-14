# Complete Backend Setup Instructions

## ✅ What's Already Done

1. ✅ Dependencies installed (`npm install` completed)
2. ✅ `.env` file created
3. ✅ Server file ready (`server-example.js`)

## 🔧 What You Need to Do

### Step 1: Add Your Paystack Secret Key

1. Open the `.env` file in your code editor
2. Find this line:
   ```
   PAYSTACK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
   ```
3. Replace `sk_test_YOUR_SECRET_KEY_HERE` with your actual secret key from Paystack
4. Save the file

**Get your secret key:**
- Go to: https://dashboard.paystack.com/#/settings/developer
- Copy your **Secret Key** (starts with `sk_test_`)

**Example of what it should look like:**
```env
PAYSTACK_SECRET_KEY=sk_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
PAYSTACK_PUBLIC_KEY=pk_test_4040c16eb3c35c3f61dde08f3eed53dd854d919f
PORT=3000
```

### Step 2: Start the Server

Open a **new terminal window** (keep it open) and run:

```bash
npm start
```

**Expected output:**
```
Server running on http://localhost:3000
Make sure to set PAYSTACK_SECRET_KEY in your .env file
```

**Important:** Keep this terminal window open while testing!

### Step 3: Test the Server

1. Open your browser
2. Visit: http://localhost:3000
3. You should see your website
4. Visit: http://localhost:3000/api/health
5. You should see: `{"status":"ok","timestamp":"..."}`

### Step 4: Test Payment Flow

1. Go to: http://localhost:3000
2. Add items to your cart
3. Click "CHECK OUT" button
4. Fill in the checkout form
5. Click "Proceed to Payment"
6. You should be redirected to Paystack payment page

### Step 5: Test Payment

Use Paystack test card:
- **Card Number:** `4084084084084081`
- **Expiry:** Any future date (e.g., 12/25)
- **CVV:** Any 3 digits (e.g., 123)
- **Email:** Any email address

## 🛠️ Troubleshooting

### Server won't start

**Error: "Cannot find module 'express'"**
```bash
npm install
```

**Error: "Port 3000 is already in use"**
1. Change `PORT=3001` in `.env` file
2. Restart server
3. Access site at: http://localhost:3001

**Error: "PAYSTACK_SECRET_KEY is not defined"**
1. Check `.env` file exists in root directory
2. Verify secret key is correct (no extra spaces)
3. Restart server after editing `.env`

### Payment doesn't work

**Error: "Unable to connect to payment server"**
- Make sure server is running (`npm start`)
- Check server terminal for errors
- Verify backend is accessible: http://localhost:3000/api/health

**Error: "Invalid API Key"**
- Double-check your secret key in `.env` file
- Make sure key starts with `sk_test_`
- Get fresh key from Paystack dashboard if needed

## 📝 Quick Commands Reference

```bash
# Start server
npm start

# Start in development mode (auto-reload)
npm run dev

# Stop server
# Press Ctrl+C in the terminal where server is running

# Check if server is running
curl http://localhost:3000/api/health
```

## 🎯 Next Steps After Setup

1. ✅ Server running on http://localhost:3000
2. ✅ Test payment with test card
3. ✅ Verify payment in Paystack dashboard
4. ✅ Check success page works
5. ✅ Ready for production (switch to live keys)

## 📚 Additional Resources

- **Paystack Dashboard:** https://dashboard.paystack.com
- **Paystack Docs:** https://paystack.com/docs
- **Test Cards:** https://paystack.com/docs/payments/test-payments

## ⚠️ Important Notes

- **Never commit `.env` file** - It's already in `.gitignore`
- **Keep server running** while testing payments
- **Use test keys** until ready for production
- **Switch to live keys** (`sk_live_` and `pk_live_`) for production

