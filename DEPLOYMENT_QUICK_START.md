# Quick Deployment Guide

## TL;DR: Will Payments Work After GitHub Commit?

**Short Answer:** ❌ **No, not automatically.**

**Why:** GitHub Pages only serves static files. Your backend server needs to run somewhere else.

**Solution:** Deploy backend separately (Heroku, Vercel, etc.)

## 🚀 Quickest Solution: Heroku

### Step 1: Install Heroku CLI
Download from: https://devcenter.heroku.com/articles/heroku-cli

### Step 2: Login
```bash
heroku login
```

### Step 3: Create App
```bash
cd "\\Mac\Home\Documents\Web Development\commerce-website-01"
heroku create your-app-name
```

### Step 4: Set Environment Variables
```bash
heroku config:set PAYSTACK_SECRET_KEY=sk_test_8394b3d8c1394d03b6f7f6184f9fe511a6db15d6
heroku config:set PAYSTACK_PUBLIC_KEY=pk_test_4040c16eb3c35c3f61dde08f3eed53dd854d919f
```

### Step 5: Deploy
```bash
git push heroku main
```

### Step 6: Update Frontend
In `js/checkout.js`, change:
```javascript
const apiEndpoint = '/api/initialize-payment';
```
To:
```javascript
const apiEndpoint = 'https://your-app-name.herokuapp.com/api/initialize-payment';
```

### Step 7: Deploy Frontend
- Push to GitHub
- Enable GitHub Pages
- Or deploy to Netlify/Vercel

## ✅ What's Safe to Commit

- ✅ All code files
- ✅ Public key in `js/checkout.js`
- ✅ `server-example.js`
- ✅ `package.json`

## ❌ Never Commit

- ❌ `.env` file (already protected by `.gitignore`)
- ❌ Secret keys

## 🎯 Summary

1. **Commit to GitHub** ✅ - Safe, no secrets exposed
2. **Deploy Frontend** ✅ - GitHub Pages/Netlify/Vercel
3. **Deploy Backend** ✅ - Heroku/Vercel/Netlify Functions
4. **Set Environment Variables** ✅ - On hosting platform
5. **Update API Endpoint** ✅ - Point to your backend URL

**Result:** Payments will work! 🎉

