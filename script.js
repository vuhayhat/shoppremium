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
            productShowcase.style.opacity = '0';
            setTimeout(() => {
                productShowcase.style.display = 'none';
                viewProductsBtn.innerHTML = '<i class="fas fa-shopping-cart"></i><span>Xem Sản Phẩm</span>';
            }, 300);
        } else {
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

    // Cyberpunk Chatbot Logic
    const chatbotPopup = document.getElementById('chatbot-popup');
    const chatbotMessage = document.getElementById('chatbot-message');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    let chatbotVisible = true;
    let chatbotShowing = false;
    
    // Cyberpunk hologram effect - hiển thị thông báo mỗi 3 giây
    let chatbotInterval = setInterval(() => {
        if (chatbotVisible) {
            if (chatbotShowing) {
                // Ẩn đi với hiệu ứng 3D
                chatbotMessage.style.transform = 'perspective(500px) rotateX(45deg) scale(0.9)';
                chatbotMessage.style.opacity = '0';
                
                setTimeout(() => {
                    chatbotMessage.style.display = 'none';
                    chatbotShowing = false;
                    chatbotMessage.classList.remove('active');
                }, 500);
            } else {
                // Hiện lên với hiệu ứng 3D
                chatbotMessage.style.display = 'block';
                chatbotMessage.style.transform = 'perspective(500px) rotateX(-45deg) scale(0.8)';
                chatbotMessage.style.opacity = '0';
                
                setTimeout(() => {
                    chatbotMessage.style.transform = 'perspective(500px) rotateX(0deg) scale(1)';
                    chatbotMessage.style.opacity = '1';
                    chatbotShowing = true;
                    chatbotMessage.classList.add('active');
                    
                    // Phát âm thanh futuristic (nếu muốn)
                    // playFuturisticSound();
                    
                    // Tự động ẩn sau 2 giây
                    setTimeout(() => {
                        if (chatbotShowing) {
                            chatbotMessage.style.transform = 'perspective(500px) rotateX(45deg) scale(0.9)';
                            chatbotMessage.style.opacity = '0';
                            
                            setTimeout(() => {
                                chatbotMessage.style.display = 'none';
                                chatbotShowing = false;
                                chatbotMessage.classList.remove('active');
                            }, 500);
                        }
                    }, 2000);
                }, 10);
            }
        }
    }, 3000);
    
    // Hiệu ứng 3D khi hover
    chatbotMessage.addEventListener('mousemove', function(e) {
        if (!chatbotShowing) return;
        
        const x = e.offsetX;
        const y = e.offsetY;
        const width = this.offsetWidth;
        const height = this.offsetHeight;
        
        const rotateY = (x - width/2) / 20;
        const rotateX = (height/2 - y) / 20;
        
        this.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    chatbotMessage.addEventListener('mouseleave', function() {
        if (!chatbotShowing) return;
        this.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
    });
    
    // Click event với hiệu ứng 3D
    chatbotMessage.addEventListener('click', function() {
        this.style.transform = 'perspective(500px) rotateX(90deg) scale(0.8)';
        this.style.opacity = '0';
        
        setTimeout(() => {
            this.style.display = 'none';
            chatbotWindow.style.display = 'block';
            chatbotWindow.style.transform = 'perspective(500px) rotateX(-30deg) scale(0.8)';
            chatbotWindow.style.opacity = '0';
            
            setTimeout(() => {
                chatbotWindow.style.transform = 'perspective(500px) rotateX(0deg) scale(1)';
                chatbotWindow.style.opacity = '1';
            }, 10);
            
            chatbotVisible = false;
            chatbotShowing = false;
            this.classList.remove('active');
        }, 300);
    });
    
    // Close button với hiệu ứng 3D
    chatbotClose.addEventListener('click', function() {
        chatbotWindow.style.transform = 'perspective(500px) rotateX(30deg) scale(0.8)';
        chatbotWindow.style.opacity = '0';
        
        setTimeout(() => {
            chatbotWindow.style.display = 'none';
            chatbotVisible = true;
        }, 300);
    });
    
    // Thêm hiệu ứng glitch ngẫu nhiên
    setInterval(() => {
        if (chatbotShowing || chatbotWindow.style.display === 'block') {
            const glitchElement = chatbotShowing ? chatbotMessage : chatbotWindow;
            glitchElement.style.clipPath = 'inset(0 0 0 0)';
            
            setTimeout(() => {
                const glitchY = Math.random() * 10;
                const glitchX = Math.random() * 10;
                glitchElement.style.clipPath = `inset(${glitchY}px ${glitchX}px ${glitchY}px ${glitchX}px)`;
                
                setTimeout(() => {
                    glitchElement.style.clipPath = 'inset(0 0 0 0)';
                }, 100);
            }, 2000);
        }
    }, 5000);

    // Update social links
    const fbLink = document.querySelector('.social-link.facebook');
    if (fbLink) {
        fbLink.href = 'https://facebook.com/'; // Thay link Facebook mới nếu có
    }
    const zaloLink = document.querySelector('.social-link.zalo');
    if (zaloLink) {
        zaloLink.href = 'https://zalo.me/0825280204';
        zaloLink.querySelector('span').textContent = 'Zalo: 0825280204';
    }
});

// Function to load products
function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    
    // Product data with images from ImgBB (free image hosting)
    const regularProducts = [
        {
            name: "Canva Pro",
            description: "Thiết kế đồ họa chuyên nghiệp, không giới hạn",
            image: "https://i.ibb.co/xKTGz77j/image.png"
        },
        {
            name: "YouTube Premium",
            description: "Xem video không quảng cáo, nghe nhạc nền, tải video",
            image: "https://i.ibb.co/WnzmSQR/youtube.jpg"
        },
        {
            name: "Capcut Pro",
            description: "Chỉnh sửa video chuyên nghiệp với nhiều hiệu ứng",
            image: "https://i.ibb.co/39xBKJTn/capcut.jpg"
        },
        {
            name: "Microsoft 365",
            description: "Office, OneDrive, Windows bản quyền chính hãng",
            image: "https://i.ibb.co/0qXZkdT/microsoft.jpg"
        }
    ];
    
    const specialProduct = {
        name: "Xem tất cả sản phẩm",
        description: "Danh sách đầy đủ các mặt hàng hiện có",
        image: "https://i.ibb.co/N9zfQXD/all-products.png",
        isSpecial: true,
        link: "https://docs.google.com/spreadsheets/d/your-sheet-id/edit"  // Thay thế bằng link Google Sheet thực tế
    };
    
    // Clear existing products
    productGrid.innerHTML = '';
    
    // Add special product at the top
    addProductToGrid(specialProduct, productGrid, true);
    
    // Add regular products
    regularProducts.forEach(product => {
        addProductToGrid(product, productGrid, false);
    });
    
    // Add special product at the bottom too
    addProductToGrid(specialProduct, productGrid, true);
}

// Function to add a product to the grid
function addProductToGrid(product, grid, isSpecial) {
    const productItem = document.createElement('div');
    productItem.className = 'product-item' + (isSpecial ? ' special-product' : '');
    
    productItem.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
        </div>
    `;
    
    // Add click event to open purchase modal or special link
    productItem.addEventListener('click', () => {
        if (product.isSpecial && product.link) {
            window.open(product.link, '_blank');
        } else {
            openPurchaseModal(product.name);
        }
    });
    
    // Xử lý ảnh lỗi
    const img = productItem.querySelector('img');
    img.onerror = function() {
        this.style.display = 'none';
        this.parentElement.classList.add('img-error');
    };
    
    grid.appendChild(productItem);
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