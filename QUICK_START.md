# Quick Start Guide - Backend Server

## ✅ Your Setup is Complete!

Your `.env` file has been configured with your Paystack keys. Here's how to use it:

## 🚀 Start the Server

Open a terminal in your project folder and run:

```bash
npm start
```

**Expected output:**
```
Server running on http://localhost:3000
Make sure to set PAYSTACK_SECRET_KEY in your .env file
```

**Keep this terminal window open!** The server needs to keep running.

## 🧪 Test the Server

1. Open your browser
2. Visit: **http://localhost:3000**
3. You should see your website
4. Visit: **http://localhost:3000/api/health**
5. Should show: `{"status":"ok","timestamp":"..."}`

## 💳 Test Payment

1. Go to: http://localhost:3000
2. Add items to cart
3. Click "CHECK OUT"
4. Fill in the checkout form
5. Click "Proceed to Payment"
6. Use Paystack test card:
   - Card: `4084084084084081`
   - Expiry: Any future date (e.g., 12/25)
   - CVV: Any 3 digits (e.g., 123)
   - Email: Any email

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal where the server is running.

## 🔄 Restart the Server

If you make changes to the server code:
1. Stop the server (Ctrl + C)
2. Run `npm start` again

## 📝 Important Notes

- **Keep the server running** while testing payments
- The server serves your website AND handles payments
- If you close the terminal, the server stops
- For production, deploy the server to a hosting service

## ❌ Common Issues

**"Port 3000 is already in use"**
- Another program is using port 3000
- Change `PORT=3001` in `.env` file
- Restart server
- Access site at: http://localhost:3001

**"Cannot find module"**
- Run: `npm install`

**Payment doesn't work**
- Make sure server is running
- Check browser console (F12) for errors
- Verify `.env` file has correct secret key

