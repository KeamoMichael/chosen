# GitHub Deployment & Payment Integration Guide

## ✅ What WILL Work After Committing to GitHub

1. **Frontend Code** ✅
   - All HTML, CSS, JavaScript files
   - Product catalog
   - Shopping cart
   - Currency conversion
   - Checkout form

2. **Public Key** ✅
   - Your Paystack public key in `js/checkout.js` is **safe to commit**
   - Public keys are meant to be public (that's why they're called "public")

3. **Server Code** ✅
   - `server-example.js` is safe to commit
   - It uses environment variables for secret keys

## ❌ What WON'T Work After Committing to GitHub

1. **Payment Processing** ❌
   - **GitHub Pages only serves static files** (HTML, CSS, JS)
   - **Backend server won't run on GitHub Pages**
   - Payments require a running backend server

2. **API Endpoints** ❌
   - `/api/initialize-payment` won't work
   - `/api/verify-payment` won't work
   - These need a server running

## 🔒 Security: What's Protected

✅ **Safe to Commit:**
- `js/checkout.js` (contains public key - that's okay)
- `server-example.js` (uses environment variables)
- All frontend files
- `package.json`

❌ **NEVER Commit:**
- `.env` file (already in `.gitignore` ✅)
- Secret keys (starts with `sk_test_` or `sk_live_`)

## 🚀 How to Make Payments Work After Deployment

You need to deploy **TWO parts**:

### Part 1: Frontend (Static Files)
**Options:**
- GitHub Pages (free)
- Netlify (free)
- Vercel (free)
- Any static hosting

**What it does:**
- Serves your website
- Shows products, cart, checkout form

**Limitation:**
- Can't run backend server
- Payments won't work without backend

### Part 2: Backend Server (Required for Payments)
**Options:**

#### Option A: Heroku (Easiest)
1. Create account at [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Deploy:
   ```bash
   heroku create your-app-name
   heroku config:set PAYSTACK_SECRET_KEY=sk_test_YOUR_KEY
   git push heroku main
   ```
4. Update frontend API endpoint to your Heroku URL

#### Option B: Vercel (Serverless Functions)
1. Create `api/initialize-payment.js` (serverless function)
2. Deploy to Vercel
3. Set environment variables in Vercel dashboard
4. Frontend automatically uses Vercel API routes

#### Option C: Netlify Functions
1. Create `netlify/functions/initialize-payment.js`
2. Deploy to Netlify
3. Set environment variables in Netlify dashboard

#### Option D: DigitalOcean / AWS / Azure
- Deploy Node.js app
- Set environment variables
- Update frontend API endpoint

#### Option E: Railway / Render
- Similar to Heroku
- Easy deployment
- Set environment variables

## 📋 Deployment Checklist

### Before Committing:
- [ ] Verify `.env` is in `.gitignore` ✅ (already done)
- [ ] Remove any hardcoded secret keys from code ✅ (already done)
- [ ] Test locally with `npm start`

### After Committing:
- [ ] Push to GitHub
- [ ] Deploy frontend to GitHub Pages/Netlify/Vercel
- [ ] Deploy backend to Heroku/Vercel/Netlify Functions
- [ ] Set environment variables on hosting platform
- [ ] Update frontend API endpoint if needed
- [ ] Test payment flow

## 🔧 Updating API Endpoint for Production

If your backend is on a different domain, update `js/checkout.js`:

```javascript
// For local development
const apiEndpoint = '/api/initialize-payment';

// For production (if backend is on different domain)
const apiEndpoint = 'https://your-backend.herokuapp.com/api/initialize-payment';
```

Or use environment detection:
```javascript
const apiEndpoint = process.env.NODE_ENV === 'production' 
    ? 'https://your-backend.herokuapp.com/api/initialize-payment'
    : '/api/initialize-payment';
```

## 🎯 Recommended Setup

### Development:
- Frontend: `http://localhost:3000` (served by backend)
- Backend: `http://localhost:3000` (same server)

### Production:
- Frontend: GitHub Pages / Netlify (e.g., `https://your-site.github.io`)
- Backend: Heroku / Vercel (e.g., `https://your-api.herokuapp.com`)

### Update Frontend:
Change API endpoint in `js/checkout.js` to point to your backend URL.

## ⚠️ Important Notes

1. **GitHub Pages is static only** - Backend won't work there
2. **You need a separate backend deployment** for payments
3. **Environment variables** must be set on your hosting platform
4. **Never commit secret keys** - Always use environment variables
5. **Test in production** before going live

## 📚 Quick Reference

**What works on GitHub Pages:**
- ✅ Website display
- ✅ Product catalog
- ✅ Shopping cart
- ❌ Payment processing (needs backend)

**What you need for payments:**
- ✅ Backend server deployed somewhere
- ✅ Environment variables configured
- ✅ Frontend pointing to backend API

## 🆘 Need Help?

- **Heroku Guide:** https://devcenter.heroku.com/articles/getting-started-with-nodejs
- **Vercel Guide:** https://vercel.com/docs
- **Netlify Guide:** https://docs.netlify.com/functions/overview/

