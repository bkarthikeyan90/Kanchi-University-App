# 🔧 Vercel Deployment Fix

## Issue
The error at `/api/auth/login` is likely because:
1. Prisma Client is not being generated during build
2. Missing environment variables
3. Database connection issues

## ✅ Fix Applied

I've updated the build configuration to automatically generate Prisma Client:

**Updated `backend/package.json`:**
- Added `postinstall` script to generate Prisma Client after npm install
- Updated `build` script to generate Prisma Client before building

## 🔄 Next Steps

### 1. Commit and Push Changes

```bash
git add backend/package.json backend/vercel.json
git commit -m "Fix: Add Prisma generate to build process"
git push origin main
```

Vercel will automatically redeploy!

### 2. Verify Environment Variables in Vercel

Make sure these are set in **Vercel Dashboard → Settings → Environment Variables**:

**Required:**
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `DATABASE_URL`
- ✅ `JWT_SECRET`
- ✅ `NODE_ENV` = `production`

**Optional (for push notifications):**
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`

### 3. Check Build Logs

After pushing, check Vercel build logs:
1. Go to Vercel Dashboard
2. Click on your project
3. Go to "Deployments"
4. Click on the latest deployment
5. Check "Build Logs"

Look for:
- ✅ `prisma generate` running successfully
- ✅ `next build` completing
- ❌ Any error messages

### 4. Common Issues & Solutions

**Issue: "Prisma Client not found"**
- ✅ Fixed by adding `postinstall` script
- Make sure `DATABASE_URL` is set (even if not used during build)

**Issue: "Environment variable not found"**
- Check all required variables are set in Vercel
- Make sure variable names match exactly (case-sensitive)

**Issue: "Database connection error"**
- Verify `DATABASE_URL` is correct
- Check Supabase project is active
- Verify connection string format

**Issue: "Module not found"**
- Check `package.json` has all dependencies
- Verify `node_modules` is not in `.gitignore` (it shouldn't be)

### 5. Test After Deployment

Once redeployed, test:
- Homepage: `https://your-project.vercel.app`
- API: `https://your-project.vercel.app/api/homepage`
- Admin Login: `https://your-project.vercel.app/admin/login`

## 📋 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project configured
- [ ] Root Directory set to `backend`
- [ ] All environment variables added
- [ ] Build completes successfully
- [ ] Prisma Client generated (check logs)
- [ ] API endpoints working
- [ ] Database migrations run
- [ ] Admin user created

## 🐛 Still Having Issues?

**Check Vercel Function Logs:**
1. Go to Vercel Dashboard → Your Project
2. Click "Functions" tab
3. Check runtime logs for errors

**Common Error Messages:**

1. **"PrismaClient is not configured"**
   - Solution: Make sure `DATABASE_URL` is set

2. **"Cannot find module '@prisma/client'"**
   - Solution: Prisma Client not generated - check build logs

3. **"Environment variable not found"**
   - Solution: Add missing variable in Vercel settings

4. **"Database connection timeout"**
   - Solution: Check `DATABASE_URL` and Supabase project status

---

**After pushing the fix, Vercel will automatically redeploy!** 🚀

