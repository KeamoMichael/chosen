# Manual Backend Setup Guide for Paystack

This guide will walk you through setting up the backend server step-by-step.

## Prerequisites

Before starting, make sure you have:
- ✅ Node.js installed (version 14 or higher)
- ✅ Your Paystack Secret Key (starts with `sk_test_` for test mode)
- ✅ A code editor (VS Code, etc.)

## Step 1: Verify Node.js Installation

Open your terminal/command prompt and check if Node.js is installed:

```bash
node --version
npm --version
```

If you see version numbers, you're good! If not, download Node.js from [nodejs.org](https://nodejs.org/)

## Step 2: Navigate to Project Directory

Open terminal and navigate to your project folder:

```bash
cd "/Home/Documents/Web Development/commerce-website-01"
```

Or on Windows:
```bash
cd "C:\Users\YourName\Documents\Web Development\commerce-website-01"
```

## Step 3: Install Dependencies

Install all required packages:

```bash
npm install
```

This will install:
- `express` - Web server
- `paystack` - Paystack SDK
- `cors` - Enable CORS
- `dotenv` - Environment variables

**Expected output:**
```
added 50 packages in 5s
```

## Step 4: Create Environment File

Create a file named `.env` in the root directory (same folder as `package.json`).

**On Windows:**
1. Right-click in the folder
2. New > Text Document
3. Name it `.env` (make sure to remove `.txt` extension)
4. If Windows asks about changing the extension, click "Yes"

**On Mac/Linux:**
```bash
touch .env
```

## Step 5: Add Your Paystack Secret Key

Open the `.env` file and add your keys:

```env
PAYSTACK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
PAYSTACK_PUBLIC_KEY=pk_test_YOUR_PUBLIC_KEY_HERE
PORT=3000
```

**Important:**
- Replace `sk_test_YOUR_SECRET_KEY_HERE` with your actual secret key from Paystack dashboard
- Replace `pk_test_YOUR_PUBLIC_KEY_HERE` with your actual public key
- Never share or commit this file to GitHub (it's already in `.gitignore`)

## Step 6: Rename Server File (Optional)

The server file is named `server-example.js`. You can either:

**Option A: Use it as-is**
- Just run: `node server-example.js`

**Option B: Rename it (recommended)**
```bash
# On Mac/Linux
mv server-example.js server.js

# On Windows (PowerShell)
Rename-Item server-example.js server.js
```

Then update `package.json`:
- Change `"main": "server-example.js"` to `"main": "server.js"`
- Change `"start": "node server-example.js"` to `"start": "node server.js"`

## Step 7: Start the Server

Run the server:

```bash
npm start
```

**Expected output:**
```
Server running on http://localhost:3000
Make sure to set PAYSTACK_SECRET_KEY in your .env file
```

## Step 8: Test the Server

Open your browser and visit:
- http://localhost:3000 - Should show your website
- http://localhost:3000/api/health - Should show `{"status":"ok","timestamp":"..."}`

## Step 9: Test Payment Flow

1. Open your website: http://localhost:3000
2. Add items to cart
3. Click "CHECK OUT"
4. Fill in the checkout form
5. Click "Proceed to Payment"
6. You should be redirected to Paystack payment page

## Troubleshooting

### Problem: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

### Problem: "Port 3000 is already in use"
**Solution:**
1. Change PORT in `.env` file to another number (e.g., `PORT=3001`)
2. Or stop the other application using port 3000

### Problem: "PAYSTACK_SECRET_KEY is not defined"
**Solution:**
1. Make sure `.env` file exists in the root directory
2. Check that the file is named exactly `.env` (not `.env.txt`)
3. Verify your secret key is correct in the `.env` file
4. Restart the server after making changes

### Problem: "Error: Invalid API Key"
**Solution:**
1. Double-check your secret key in `.env` file
2. Make sure there are no extra spaces
3. Verify the key starts with `sk_test_` (for test mode)
4. Get a fresh key from Paystack dashboard if needed

### Problem: Server starts but payment doesn't work
**Solution:**
1. Check browser console for errors (F12)
2. Verify backend is running: http://localhost:3000/api/health
3. Check server terminal for error messages
4. Verify your public key in `js/checkout.js` matches your Paystack account

## Development Mode (Auto-reload)

For development, use nodemon to auto-restart on file changes:

```bash
npm run dev
```

If you get an error, install nodemon globally:
```bash
npm install -g nodemon
```

## Production Deployment

When ready for production:

1. **Switch to Live Keys:**
   - Get live keys from Paystack dashboard
   - Update `.env` with `sk_live_...` and `pk_live_...`
   - Update `js/checkout.js` with live public key

2. **Deploy Options:**
   - **Heroku**: Push to Heroku, set environment variables
   - **DigitalOcean**: Deploy Node.js app
   - **AWS**: Use Elastic Beanstalk or EC2
   - **Vercel/Netlify**: Use serverless functions

## File Structure After Setup

```
commerce-website-01/
├── .env                    ← Your secret keys (DO NOT COMMIT)
├── server-example.js       ← Backend server
├── package.json            ← Dependencies
├── node_modules/           ← Installed packages (auto-generated)
├── js/
│   └── checkout.js        ← Frontend (already configured)
└── ...
```

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Start server
npm start

# Start in development mode (auto-reload)
npm run dev

# Check if server is running
curl http://localhost:3000/api/health
```

## Next Steps

1. ✅ Server is running
2. ✅ Test a payment with test card: `4084084084084081`
3. ✅ Verify payment in Paystack dashboard
4. ✅ Check success page works
5. ✅ Test webhook (optional)

## Need Help?

- Check server terminal for error messages
- Check browser console (F12) for frontend errors
- Paystack Docs: https://paystack.com/docs
- Paystack Dashboard: https://dashboard.paystack.com

