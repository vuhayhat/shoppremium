# Shop Premium - Profile Page

A personal profile page with product showcase functionality.

## Features

- Responsive design that works on all devices
- Animated elements and modern UI
- Product showcase with image gallery
- Social media links and contact information

## How to Use Product Images with Vercel Free Tier

This project uses [ImgBB](https://imgbb.com/) as a free image hosting service to display product images. This approach works well with Vercel's free tier because:

1. Images are hosted externally, reducing bandwidth usage on your Vercel deployment
2. ImgBB provides direct image links that can be used in your website
3. Images load efficiently with lazy loading enabled

### Steps to Add Your Own Product Images:

1. **Upload Images to ImgBB**:
   - Go to [ImgBB.com](https://imgbb.com/)
   - Click "Start Uploading" (no account required)
   - Upload your product images
   - After upload, click on "Get share links"
   - Copy the "Direct link" URL

2. **Update the Product Data in script.js**:
   - Open `script.js`
   - Find the `products` array in the `loadProducts()` function
   - Replace the image URLs with your ImgBB direct links
   - Update product names and descriptions

Example:
```javascript
const products = [
    {
        name: "Your Product Name",
        description: "Your product description",
        image: "YOUR_IMGBB_DIRECT_LINK_HERE"
    },
    // Add more products as needed
];
```

3. **Customize Image Appearance** (optional):
   - You can adjust the image appearance in `styles.css`
   - Look for the `.product-image` and `.product-image img` selectors
   - Modify height, width, or other properties as needed

## Performance Optimizations

This project includes several optimizations to ensure good performance on Vercel's free tier:

1. **Lazy Loading**: Images use the `loading="lazy"` attribute to load only when they come into view
2. **CSS Optimizations**: CSS properties like `will-change` and `backface-visibility` improve rendering performance
3. **External Image Hosting**: Using ImgBB reduces bandwidth usage on your Vercel deployment
4. **Optimized Image Loading**: The product grid loads dynamically only when needed

## Deployment

To deploy this site on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Deploy with default settings

## Customization

You can customize this template by:

1. Changing the color scheme in `styles.css`
2. Updating your profile information in `index.html`
3. Adding more products in the `products` array in `script.js`
4. Modifying animations and transitions in `styles.css`

## License

This project is free to use for personal and commercial purposes.

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