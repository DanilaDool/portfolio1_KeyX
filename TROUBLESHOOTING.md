# Troubleshooting Guide

## If you see a black screen:

1. **Open Browser Console** (F12 or Cmd+Option+I)
   - Look for red error messages
   - Common issues:
     - Module not found errors
     - React errors
     - Three.js/WebGL errors

2. **Check Network Tab**
   - Are files loading?
   - Any 404 errors?

3. **Try these steps:**

```bash
# Stop any running servers
# Then restart:
npm run dev
```

4. **If still black screen, try simple version:**
   - Replace src/App.jsx with src/App-simple.jsx
   - This will show if React is working

5. **Common fixes:**
   - Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
   - Try different browser
   - Check if port 5173 is accessible

## Dev Server Commands

Start dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```
