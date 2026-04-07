# Admin Account Setup Instructions

## Problem
You're getting `Firebase: Error (auth/invalid-credential)` when trying to sign in with `healerbld@gmail.com` because this admin account doesn't exist in your Firebase Authentication yet.

## Solution

### Step 1: Create the Admin Account
1. **Navigate to**: `http://localhost:3000/admin-setup`
2. **Email**: Pre-filled as `healerbld@gmail.com`
3. **Password**: Choose a secure password (minimum 6 characters)
4. **Confirm Password**: Re-enter the password
5. **Click**: "Create Admin Account"

### Step 2: Verify Admin Access
1. After creation, you'll be redirected to sign in
2. **Enter**: `healerbld@gmail.com` and your chosen password
3. **Click**: "Sign In as Admin"
4. **Should redirect to**: `/admin` page automatically

### Step 3: Test Admin Functionality
1. **Verify**: You can access `/admin` and `/admin-accounts`
2. **Test**: Navigation between admin pages works
3. **Confirm**: Sign out functionality works

### Step 4: Clean Up (IMPORTANT!)
After the admin account is created and working:
1. **Delete**: `AdminSetupPage.tsx`
2. **Delete**: `AdminSetupPage.css`
3. **Remove**: The `/admin-setup` route from `App.tsx`
4. **Delete**: This setup guide

## Why This Happened

The `auth/invalid-credential` error occurs because:
- The email `healerbld@gmail.com` doesn't exist in Firebase Authentication
- Your code checks if `user.email === 'healerbld@gmail.com'` for admin access
- But there's no user with that email in your Firebase project

## Alternative: Manual Firebase Setup

If you prefer using the Firebase Console:
1. **Go to**: Firebase Console → Authentication → Users
2. **Click**: "Add user"
3. **Email**: `healerbld@gmail.com`
4. **Password**: Choose a secure password
5. **Click**: "Add user"
6. **Test**: Sign in with these credentials

## Security Notes

- **Keep the admin password secure and private**
- **Use a strong password** (minimum 6 characters, recommended 12+)
- **Don't share admin credentials**
- **Remove the setup page** after creating the account

## Troubleshooting

If you still get errors:
1. **Check browser console** (F12) for detailed error messages
2. **Verify Firebase configuration** in `src/firebase.ts`
3. **Ensure Email/Password auth is enabled** in Firebase Console
4. **Try a different password** if getting "weak password" error

## Next Steps

Once the admin account is working:
1. ✅ Admin can access `/admin` automatically
2. ✅ Admin can access `/admin-accounts`
3. ✅ Regular users cannot access admin pages
4. ✅ Admin gets redirected to admin dashboard on login
5. ✅ Remove temporary setup files
