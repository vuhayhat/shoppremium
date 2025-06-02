# My Profile Page

A simple profile page displaying Facebook and Zalo contact information.

## How to Deploy to Vercel with GitHub

### Step 1: Create a GitHub Repository
1. Go to [GitHub](https://github.com) and sign in to your account
2. Click on the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "my-profile")
4. Choose public or private visibility
5. Click "Create repository"

### Step 2: Upload Your Files to GitHub
```bash
# Initialize Git in this folder
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit"

# Connect to your GitHub repository (replace with your GitHub username and repository name)
git remote add origin https://github.com/your-username/my-profile.git

# Push the files to GitHub
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to [Vercel](https://vercel.com) and sign in (you can sign in with your GitHub account)
2. Click "Add New..." and select "Project"
3. Import your GitHub repository
4. Vercel will automatically detect that it's a static HTML site
5. Click "Deploy"
6. Once deployed, Vercel will provide you with a URL to access your profile page

## Customizing Your Profile
- Edit the `index.html` file to update your name, title, bio, and social media links
- Replace the placeholder image with your own profile picture
- Modify the `styles.css` file to change colors, layout, or other visual elements

## Features
- Responsive design that works on mobile and desktop
- Social media links to Facebook and Zalo
- Modern UI with hover effects 