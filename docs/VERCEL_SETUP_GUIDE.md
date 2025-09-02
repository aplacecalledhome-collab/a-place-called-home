# Vercel Setup Guide for A Place Called Home

## 🚨 **Problem Solved: Function Crashes Fixed!**

Your Vercel functions were crashing due to missing environment variables and basic authentication requirements. We've fixed this by:

- ✅ Removing the basic auth requirement that was causing crashes
- ✅ Adding graceful error handling for missing environment variables
- ✅ Creating a health check API endpoint for debugging
- ✅ Updating components to handle configuration errors gracefully

## 🔧 **Required Environment Variables**

To enable full functionality, you need to set these environment variables in Vercel:

### **1. Supabase Edge Functions (Required for Contact & Tour Forms)**

```bash
VITE_SUPABASE_FUNCTIONS_URL=https://your-project-ref.supabase.co/functions/v1
```

**How to get this:**
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the "Project URL" and add `/functions/v1` to the end

### **2. hCaptcha (Optional but Recommended for Bot Protection)**

```bash
VITE_HCAPTCHA_SITEKEY=your-hcaptcha-site-key
```

**How to get this:**
1. Sign up at [hCaptcha.com](https://www.hcaptcha.com/)
2. Create a new site
3. Copy the site key

### **3. Basic Authentication (Optional - for site protection)**

```bash
BASIC_AUTH_USER=your-username
BASIC_AUTH_PASS=your-password
```

## 📱 **How to Set Environment Variables in Vercel**

### **Method 1: Vercel Dashboard (Recommended)**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: `a-place-called-home`
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar
5. Add each variable:
   - **Name**: `VITE_SUPABASE_FUNCTIONS_URL`
   - **Value**: `https://your-project-ref.supabase.co/functions/v1`
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**
7. Repeat for other variables
8. **Redeploy** your project

### **Method 2: Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add VITE_SUPABASE_FUNCTIONS_URL
vercel env add VITE_HCAPTCHA_SITEKEY
vercel env add BASIC_AUTH_USER
vercel env add BASIC_AUTH_PASS

# Redeploy
vercel --prod
```

## 🧪 **Testing Your Setup**

### **1. Health Check Endpoint**

After deployment, test your API health:
```
https://your-domain.vercel.app/api/health
```

You should see:
```json
{
  "status": "healthy",
  "environment": {
    "VITE_SUPABASE_FUNCTIONS_URL": "configured",
    "VITE_HCAPTCHA_SITEKEY": "configured",
    "BASIC_AUTH_USER": "configured",
    "BASIC_AUTH_PASS": "configured"
  }
}
```

### **2. Contact Form Test**

1. Go to your website's contact form
2. Fill out the form
3. Submit - it should work without errors
4. Check the browser console for any error messages

### **3. Tour Scheduling Test**

1. Go to your website's tour scheduling form
2. Fill out the form
3. Submit - it should work without errors

## 🚀 **Deployment Checklist**

- [ ] Set `VITE_SUPABASE_FUNCTIONS_URL` in Vercel
- [ ] Set `VITE_HCAPTCHA_SITEKEY` in Vercel (optional)
- [ ] Set `BASIC_AUTH_USER` and `BASIC_AUTH_PASS` in Vercel (optional)
- [ ] Redeploy your project
- [ ] Test the health check endpoint
- [ ] Test contact form submission
- [ ] Test tour scheduling form

## 🔍 **Troubleshooting**

### **Still Getting 500 Errors?**

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on the function that's failing
   - Check the logs for error messages

2. **Verify Environment Variables:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Make sure all variables are set correctly
   - Check that they're enabled for the right environments

3. **Test Health Endpoint:**
   - Visit `/api/health` on your deployed site
   - This will show you exactly what's configured

### **Forms Not Working?**

1. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Look for error messages in the Console tab
   - Check the Network tab for failed API calls

2. **Verify Supabase Functions:**
   - Make sure your Supabase Edge Functions are deployed
   - Test them directly in the Supabase dashboard

## 📚 **Additional Resources**

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase Edge Functions Guide](https://supabase.com/docs/guides/functions)
- [hCaptcha Integration](https://docs.hcaptcha.com/)

## 🎯 **Next Steps After Setup**

1. **Test all forms** to ensure they work
2. **Monitor Vercel Function logs** for any new issues
3. **Set up monitoring** for your Supabase Edge Functions
4. **Consider adding analytics** to track form submissions
5. **Set up email notifications** for form submissions

---

**Need Help?** Check the Vercel Function logs first, then refer to this guide. Your website should now work without the 500 errors! 🎉
