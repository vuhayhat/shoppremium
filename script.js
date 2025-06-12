document.addEventListener('DOMContentLoaded', function() {
    // Add a subtle animation to the profile card when the page loads
    const profileCard = document.querySelector('.profile-card');
    setTimeout(() => {
        profileCard.style.opacity = '1';
    }, 300);

    // Toggle product showcase when button is clicked
    const viewProductsBtn = document.getElementById('viewProductsBtn');
    const productShowcase = document.getElementById('productShowcase');
    
    viewProductsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (productShowcase.style.display === 'block') {
            // Hide the showcase with animation
            productShowcase.style.opacity = '0';
            setTimeout(() => {
                productShowcase.style.display = 'none';
                viewProductsBtn.innerHTML = '<i class="fas fa-shopping-cart"></i><span>Xem Sản Phẩm</span>';
            }, 300);
        } else {
            // Show the showcase with animation
            productShowcase.style.display = 'block';
            setTimeout(() => {
                productShowcase.style.opacity = '1';
                viewProductsBtn.innerHTML = '<i class="fas fa-times"></i><span>Đóng</span>';
            }, 10);
        }
    });

    // Example: Track clicks on social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // You can add analytics tracking here if needed
            console.log(`Clicked on ${this.classList.contains('facebook') ? 'Facebook' : 'Zalo'} link`);
        });
    });
    
    // Load product data
    loadProducts();
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('purchaseModal');
        if (e.target === modal) {
            closeModal();
        }
    });
});

// Function to load products
function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    
    // Product data with images from ImgBB (free image hosting)
    const products = [
        {
            name: "Canva Pro",
            description: "Mô tả chi tiết về sản phẩm 1",
            image: "https://i.ibb.co/xKTGz77j/image.png"
        },
        {
            name: "YouTube Premium",
            description: "Mô tả chi tiết về sản phẩm 2",
            image: "https://i.ibb.co/C38FzJFm/z6665028981439-b4fa1804fb89586f8370ef06b174c164.jpg"
        },
        {
            name: "Capcut Pro",
            description: "Mô tả chi tiết về sản phẩm 3",
            image: "https://i.ibb.co/39xBKJTn/capcut.jpg"
        },
        {
            name: "Microsoft 365 , Key bản quyền win và Office",
            description: "Mô tả chi tiết về sản phẩm 4",
            image: "https://i.ibb.co/1fHqFgyr/microsoft-365.jpg"
        },
    ];
    
    // Clear existing products
    productGrid.innerHTML = '';
    
    // Add products to the grid
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        
        productItem.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
            </div>
        `;
        
        // Add click event to open purchase modal
        productItem.addEventListener('click', () => {
            openPurchaseModal(product.name);
        });
        
        productGrid.appendChild(productItem);
    });
}

// Open purchase modal
function openPurchaseModal(productName) {
    const modal = document.getElementById('purchaseModal');
    const productNameInput = document.getElementById('productNameInput');
    
    if (modal) {
        modal.style.display = 'flex';
        productNameInput.value = productName;
    }
}

// Close purchase modal
function closeModal() {
    const modal = document.getElementById('purchaseModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Send purchase information to Zalo and Telegram
function sendPurchaseInfo() {
    const productName = document.getElementById('productNameInput').value;
    const customerName = document.getElementById('customerNameInput').value;
    const customerContact = document.getElementById('customerContactInput').value;
    
    if (!customerName || !customerContact) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
    }
    
    // Format message
    const message = `Đơn hàng mới:\nSản phẩm: ${productName}\nKhách hàng: ${customerName}\nLiên hệ: ${customerContact}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open Zalo chat with pre-filled message
    window.open(`https://zalo.me/0825280204?text=${encodedMessage}`, '_blank');
    
    // You can replace YOUR_TELEGRAM_USERNAME with your actual Telegram username
    // For example: window.open(`https://t.me/your_username?text=${encodedMessage}`, '_blank');
    window.open(`https://t.me/share/url?url=&text=${encodedMessage}`, '_blank');
    
    // Close modal after sending
    closeModal();
} 