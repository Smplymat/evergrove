# Firebase Authentication Troubleshooting Guide

## Error: auth/invalid-credential

This error occurs when Firebase cannot verify the provided authentication credentials. Here are the most common causes and solutions:

### 1. **Incorrect Email/Password Combination**
- **Cause**: User entered wrong email or password
- **Solution**: Double-check the email and password, ensure caps lock is off
- **Fixed**: Enhanced error handling now shows "Invalid email or password"

### 2. **Firebase Configuration Issues**
- **Cause**: Firebase project configuration is incorrect or outdated
- **Solution**: 
  1. Go to Firebase Console → Project Settings → General
  2. Check that authDomain matches your project
  3. Verify API key is correct and not restricted
  4. Ensure Email/Password authentication is enabled

### 3. **Authentication Method Not Enabled**
- **Cause**: Email/Password authentication is disabled in Firebase Console
- **Solution**: 
  1. Go to Firebase Console → Authentication → Sign-in method
  2. Enable "Email/Password" provider
  3. For social login, enable Google/Facebook providers

### 4. **User Account Issues**
- **Cause**: User account doesn't exist, is disabled, or deleted
- **Solution**: 
  1. Check if user exists in Firebase Console → Authentication → Users
  2. Verify user account is enabled
  3. If needed, create a new test account

### 5. **API Key Restrictions**
- **Cause**: Firebase API key has IP or referer restrictions
- **Solution**: 
  1. Go to Firebase Console → Project Settings → API keys
  2. Check if API key has restrictions
  3. Remove restrictions for development, or add your domain

### 6. **Network/Firewall Issues**
- **Cause**: Network is blocking Firebase authentication endpoints
- **Solution**: 
  1. Check if firewall blocks Firebase domains
  2. Try different network
  3. Check browser console for network errors

## Debug Steps

1. **Open Browser Developer Tools** (F12)
2. **Check Console Tab** for detailed error messages
3. **Look for Network Errors** in Network tab
4. **Verify Firebase Config** in `src/firebase.ts`

## Testing with Known Credentials

To test if the issue is with credentials vs configuration:

1. **Create a test account** in Firebase Console
2. **Use simple credentials** (test@example.com / Test123456)
3. **Try signing in** with these credentials

## Current Firebase Configuration Check

Your current configuration:
- Project ID: ptproject-83533
- Auth Domain: ptproject-83533.firebaseapp.com
- API Key: AIzaSyAW-ZhZu96Z-Z26up1qcaTFWS-S53w4NF8

## Enhanced Error Handling

The sign-in page now provides specific error messages:
- `auth/invalid-credential` → "Invalid email or password"
- `auth/user-not-found` → "No account found with this email"
- `auth/wrong-password` → "Incorrect password"
- `auth/too-many-requests` → "Too many failed attempts"
- `auth/user-disabled` → "Account has been disabled"

## Next Steps

1. Try signing in with the enhanced error messages
2. Check browser console for detailed error information
3. Verify Firebase authentication settings
4. Test with a known working account
5. Contact support if issue persists
