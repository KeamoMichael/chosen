# Fix: Vercel Environment Variables Error

## Problem
You're seeing this error:
```
Environment Variable "PAYSTACK_SECRET_KEY" references Secret "paystack_secret_key", which does not exist.
```

## Solution

The `vercel.json` file was trying to use Vercel Secrets (advanced feature), but you just need regular environment variables.

### Step 1: I've Fixed vercel.json

The `vercel.json` file has been updated to remove the secret references. You don't need to set environment variables in `vercel.json` - you'll set them directly in the Vercel dashboard.

### Step 2: Set Environment Variables in Vercel Dashboard

1. **Go to your Vercel project dashboard**
2. **Click on "Settings"** (top menu)
3. **Click on "Environment Variables"** (left sidebar)
4. **Add these two variables:**

   **Variable 1:**
   - **Name:** `PAYSTACK_SECRET_KEY`
   - **Value:** `sk_test_8394b3d8c1394d03b6f7f6184f9fe511a6db15d6`
   - **Environments:** Check all three:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
   - Click **"Add"**

   **Variable 2:**
   - **Name:** `PAYSTACK_PUBLIC_KEY`
   - **Value:** `pk_test_4040c16eb3c35c3f61dde08f3eed53dd854d919f`
   - **Environments:** Check all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **"Add"**

### Step 3: Redeploy

After adding environment variables:

1. Go to **"Deployments"** tab
2. Find your latest deployment
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Select **"Use existing Build Cache"** (optional)
6. Click **"Redeploy"**

### Step 4: Verify

After redeployment:
1. Check the deployment logs for any errors
2. Test your API endpoint: `https://your-app.vercel.app/api/initialize-payment`
   - Should return: `{"status":false,"error":"Method not allowed"}` (because it's GET, not POST - this is correct!)
3. Test the full payment flow on your site

## Alternative: Using Vercel CLI

If you prefer using CLI:

```bash
vercel env add PAYSTACK_SECRET_KEY
# When prompted, paste: sk_test_8394b3d8c1394d03b6f7f6184f9fe511a6db15d6
# Select: Production, Preview, Development

vercel env add PAYSTACK_PUBLIC_KEY
# When prompted, paste: pk_test_4040c16eb3c35c3f61dde08f3eed53dd854d919f
# Select: Production, Preview, Development

vercel --prod
```

## Important Notes

- ✅ Environment variables are set in Vercel Dashboard, NOT in `vercel.json`
- ✅ The updated `vercel.json` no longer references secrets
- ✅ After setting variables, you MUST redeploy for them to take effect
- ✅ Environment variables are encrypted and secure in Vercel

## Still Having Issues?

1. **Check variable names:** Must be exactly `PAYSTACK_SECRET_KEY` and `PAYSTACK_PUBLIC_KEY` (case-sensitive)
2. **Check all environments are selected:** Production, Preview, Development
3. **Redeploy after adding variables:** Changes only apply to new deployments
4. **Check function logs:** Vercel Dashboard → Your Project → Functions → Logs

