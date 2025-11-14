# Vercel Deployment Guide for Paystack Payment API

## 🚀 Complete Setup Guide

This guide will help you deploy your payment API to Vercel and connect it to your frontend.

## Prerequisites

- ✅ Vercel account (free at [vercel.com](https://vercel.com))
- ✅ Vercel CLI installed (optional, for CLI deployment)
- ✅ Your Paystack API keys ready

## Step 1: Install Vercel CLI (Optional but Recommended)

```bash
npm install -g vercel
```

Or use the web interface (no CLI needed).

## Step 2: Prepare Your Project

Your project structure should look like this:
```
commerce-website-01/
├── api/
│   ├── initialize-payment.js  ✅ (created)
│   └── verify-payment.js      ✅ (created)
├── js/
│   └── checkout.js            ✅ (updated)
├── vercel.json                ✅ (created)
└── ... (other files)
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "Add New Project"**
3. **Import your GitHub repository:**
   - Connect GitHub if not already connected
   - Select `commerce-website-01` repository
   - Click "Import"

4. **Configure Project:**
   - Framework Preset: **Other** (or leave default)
   - Root Directory: `./` (root)
   - Build Command: Leave empty (no build needed)
   - Output Directory: Leave empty

5. **Set Environment Variables:**
   - Click "Environment Variables"
   - Add these variables:
     ```
     PAYSTACK_SECRET_KEY = sk_test_8394b3d8c1394d03b6f7f6184f9fe511a6db15d6
     PAYSTACK_PUBLIC_KEY = pk_test_4040c16eb3c35c3f61dde08f3eed53dd854d919f
     ```
   - Select "Production", "Preview", and "Development" for both
   - Click "Add" for each

6. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (1-2 minutes)

### Option B: Using Vercel CLI

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Navigate to project:**
   ```bash
   cd "\\Mac\Home\Documents\Web Development\commerce-website-01"
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow prompts:
     - Set up and deploy? **Yes**
     - Which scope? (Select your account)
     - Link to existing project? **No**
     - Project name? (Press Enter for default)
     - Directory? (Press Enter for `./`)
     - Override settings? **No**

4. **Set Environment Variables:**
   ```bash
   vercel env add PAYSTACK_SECRET_KEY
   # Paste: sk_test_8394b3d8c1394d03b6f7f6184f9fe511a6db15d6
   # Select: Production, Preview, Development
   
   vercel env add PAYSTACK_PUBLIC_KEY
   # Paste: pk_test_4040c16eb3c35c3f61dde08f3eed53dd854d919f
   # Select: Production, Preview, Development
   ```

5. **Redeploy with environment variables:**
   ```bash
   vercel --prod
   ```

## Step 4: Get Your Vercel URL

After deployment, Vercel will give you a URL like:
- `https://commerce-website-01.vercel.app`

**This is your production URL!**

## Step 5: Test the API

1. **Test Health Check:**
   Visit: `https://your-app.vercel.app/api/initialize-payment`
   - Should return: `{"status":false,"error":"Method not allowed"}` (because it's GET, not POST)
   - This confirms the API is deployed!

2. **Test Payment Flow:**
   - Go to: `https://your-app.vercel.app`
   - Add items to cart
   - Click "CHECK OUT"
   - Fill form and proceed to payment
   - Should redirect to Paystack

## Step 6: Update Frontend (If Needed)

The frontend is already configured to use `/api/initialize-payment`, which works automatically on Vercel!

**No changes needed** - Vercel automatically serves:
- `/api/initialize-payment` → `api/initialize-payment.js`
- `/api/verify-payment` → `api/verify-payment.js`

## Step 7: Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## 🔧 Troubleshooting

### API Returns 500 Error

**Check:**
1. Environment variables are set correctly in Vercel dashboard
2. Secret key starts with `sk_test_` (for test mode)
3. Check Vercel function logs:
   - Dashboard → Your Project → Functions → View Logs

### Payment Initialization Fails

**Check:**
1. Browser console (F12) for errors
2. Vercel function logs
3. Paystack dashboard for API errors

### CORS Errors

**Solution:** Already handled in the API functions with proper headers.

### Function Not Found (404)

**Check:**
1. Files are in `/api` folder (not `/api` subdirectory)
2. File names match exactly: `initialize-payment.js`
3. Redeploy after file changes

## 📋 Deployment Checklist

- [ ] API files created in `/api` folder
- [ ] `vercel.json` created
- [ ] Environment variables set in Vercel
- [ ] Project deployed to Vercel
- [ ] Tested API endpoints
- [ ] Tested payment flow
- [ ] Custom domain configured (optional)

## 🎯 How It Works

1. **User clicks "Proceed to Payment"**
   - Frontend sends POST to `/api/initialize-payment`
   - Vercel routes to `api/initialize-payment.js`

2. **Serverless Function Runs:**
   - Creates Paystack payment session
   - Returns authorization URL

3. **User Redirected:**
   - Frontend redirects to Paystack payment page
   - User completes payment

4. **Payment Verified:**
   - Paystack redirects to `/success.html?reference=...`
   - Frontend calls `/api/verify-payment?reference=...`
   - Vercel routes to `api/verify-payment.js`
   - Payment is verified

## 🔒 Security Notes

✅ **Safe:**
- Public key in frontend code (it's public by design)
- Secret key in Vercel environment variables (never exposed)

❌ **Never:**
- Commit `.env` file (already in `.gitignore`)
- Put secret keys in code
- Expose secret keys in frontend

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Functions:** https://vercel.com/docs/concepts/functions
- **Paystack Docs:** https://paystack.com/docs

## 🎉 You're Done!

Your payment API is now live on Vercel! Payments will work on your deployed site.

