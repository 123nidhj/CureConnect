# 🚀 Deployment Guide for CureConnect

## 📋 **Prerequisites**
- GitHub account
- Git installed on your machine

## 🔧 **Step 1: Upload to GitHub**

### **Initialize Git Repository**
```bash
# Navigate to your project directory
cd /Users/nidhisshetty/Health_management

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: CureConnect Hospital Booking System"
```

### **Create GitHub Repository**
1. Go to [GitHub.com](https://github.com)
2. Click "New Repository" (green button)
3. Repository name: `cureconnect`
4. Description: `🏥 CureConnect - Hospital Appointment Booking System for Udupi & Mangalore`
5. Make it **Public** (for GitHub Pages)
6. Don't initialize with README (we already have one)
7. Click "Create Repository"

### **Connect Local to GitHub**
```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/cureconnect.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 **Step 2: Deploy Frontend (GitHub Pages)**

### **Enable GitHub Pages**
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select branch: `main`
6. Select folder: `/ (root)`
7. Click "Save"

### **Update Frontend for Production**
Create a production version of the frontend:

```bash
# Create a new branch for deployment
git checkout -b gh-pages

# Copy frontend files to root
cp frontend/* .

# Update script.js to use production API URL
# Edit script.js and change:
# const API_BASE_URL = 'http://localhost:8080/api';
# to:
# const API_BASE_URL = 'https://cureconnect-backend.railway.app/api';

# Commit changes
git add .
git commit -m "Deploy frontend to GitHub Pages"
git push origin gh-pages
```

### **Configure GitHub Pages**
1. Go back to repository Settings → Pages
2. Change source branch to `gh-pages`
3. Your site will be available at: `https://YOUR_USERNAME.github.io/cureconnect`

## ☁️ **Step 3: Deploy Backend (Railway)**

### **Deploy to Railway**
1. Go to [Railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `cureconnect` repository
6. Railway will auto-detect it's a Java project

### **Configure Railway Deployment**
1. In Railway dashboard, click on your project
2. Go to "Settings" tab
3. Add environment variables:
   ```
   MAVEN_OPTS=-Xmx512m
   PORT=8080
   ```
4. In "Deploy" section, set:
   - **Root Directory**: `backend`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -Dserver.port=$PORT -jar target/appointment-booking-1.0.0.jar`

### **Get Your Backend URL**
1. After deployment, Railway will provide a URL like:
   `https://cureconnect-backend-production.up.railway.app`
2. Copy this URL

## 🔗 **Step 4: Connect Frontend to Deployed Backend**

### **Update Frontend API URL**
```bash
# Go back to main branch
git checkout main

# Edit frontend/script.js
# Change the API_BASE_URL to your Railway URL:
const API_BASE_URL = 'https://your-railway-url.railway.app/api';

# Commit and push
git add .
git commit -m "Update API URL for production"
git push origin main

# Update gh-pages branch
git checkout gh-pages
git merge main
git push origin gh-pages
```

## 🎉 **Step 5: Your Live Demo Links**

After successful deployment, you'll have:

### **🌐 Frontend (GitHub Pages)**
```
https://YOUR_USERNAME.github.io/cureconnect
```

### **🔧 Backend API (Railway)**
```
https://your-app-name.railway.app/api
```

### **📋 Test Your Deployment**
1. Visit your frontend URL
2. Try booking an appointment
3. Check if data persists
4. Test all features

## 🔧 **Alternative Deployment Options**

### **Frontend Alternatives**
- **Netlify**: Drag & drop deployment
- **Vercel**: GitHub integration
- **Surge.sh**: Command-line deployment

### **Backend Alternatives**
- **Render**: Free tier available
- **Heroku**: Popular platform (paid)
- **Google Cloud Run**: Serverless deployment

## 📝 **Update Your README**

After deployment, update your README.md with actual URLs:

```markdown
## 🌟 **Live Demo**
- **Frontend**: https://YOUR_USERNAME.github.io/cureconnect
- **Backend API**: https://your-app-name.railway.app/api
```

## 🎯 **Pro Tips**

1. **Custom Domain**: You can add a custom domain in GitHub Pages settings
2. **HTTPS**: Both GitHub Pages and Railway provide HTTPS by default
3. **Monitoring**: Railway provides logs and metrics
4. **Database**: For production, consider PostgreSQL instead of H2
5. **Environment Variables**: Use Railway's environment variables for sensitive data

## 🚨 **Troubleshooting**

### **Common Issues**
- **CORS Errors**: Make sure backend has `@CrossOrigin(origins = "*")`
- **API Not Found**: Check if Railway deployment is successful
- **GitHub Pages Not Updating**: Wait 5-10 minutes for changes to reflect
- **Build Failures**: Check Railway logs for detailed error messages

### **Debugging Steps**
1. Check Railway deployment logs
2. Test API endpoints directly: `https://your-app.railway.app/api/doctors`
3. Check browser console for JavaScript errors
4. Verify API URL in frontend code

---

🎉 **Congratulations! Your CureConnect system is now live and shareable!**