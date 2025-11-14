# Vercel Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Vercel API functions"
git push
```

### Step 2: Deploy to Vercel

**Option A: Via Web (Easiest)**
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Deploy" (no configuration needed!)

**Option B: Via CLI**
```bash
npm install -g vercel
vercel login
vercel
```

### Step 3: Set Environment Variables

In Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add:
   - **Name:** `PAYSTACK_SECRET_KEY`
   - **Value:** `sk_test_8394b3d8c1394d03b6f7f6184f9fe511a6db15d6`
   - **Environments:** Production, Preview, Development ✅
3. Add:
   - **Name:** `PAYSTACK_PUBLIC_KEY`
   - **Value:** `pk_test_4040c16eb3c35c3f61dde08f3eed53dd854d919f`
   - **Environments:** Production, Preview, Development ✅

### Step 4: Redeploy

After adding environment variables:
- Go to Deployments tab
- Click "..." on latest deployment
- Click "Redeploy"

### Step 5: Test

Visit your Vercel URL (e.g., `https://commerce-website-01.vercel.app`):
1. Add items to cart
2. Click "CHECK OUT"
3. Fill form
4. Click "Proceed to Payment"
5. Should redirect to Paystack! ✅

## ✅ That's It!

Your payment API is now live on Vercel!

## 📁 Files Created

- ✅ `api/initialize-payment.js` - Payment initialization
- ✅ `api/verify-payment.js` - Payment verification
- ✅ `vercel.json` - Vercel configuration
- ✅ Frontend already configured!

## 🔍 Troubleshooting

**API not working?**
- Check environment variables are set
- Check Vercel function logs (Dashboard → Functions → Logs)

**Payment fails?**
- Check browser console (F12)
- Verify Paystack keys are correct

