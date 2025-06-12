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

    // Chatbot functionality
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotPopup = document.getElementById('chatbot-popup');
    const chatbotMessage = document.getElementById('chatbot-message');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    
    let isChatbotOpen = false;
    
    // Hiển thị cửa sổ chat khi nhấn vào nút chatbot
    chatbotButton.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isChatbotOpen) {
            closeChatbot();
        } else {
            openChatbot();
        }
    });
    
    // Đóng chatbot khi nhấn nút đóng
    chatbotClose.addEventListener('click', function() {
        closeChatbot();
    });
    
    // Xử lý các câu hỏi có sẵn
    const questionButtons = document.querySelectorAll('.cyber-question-btn');
    
    questionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const questionId = this.getAttribute('data-question');
            const answerElement = document.getElementById('answer-' + questionId);
            
            // Ẩn tất cả các câu trả lời khác
            document.querySelectorAll('.cyber-answer').forEach(answer => {
                if (answer !== answerElement) {
                    answer.style.display = 'none';
                }
            });
            
            // Hiển thị/ẩn câu trả lời được chọn
            if (answerElement.style.display === 'block') {
                answerElement.style.display = 'none';
            } else {
                // Hiệu ứng typing trước khi hiển thị câu trả lời
                setTimeout(() => {
                    answerElement.style.display = 'block';
                }, 300);
                
                // Thêm hiệu ứng highlight cho nút được chọn
                questionButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    function openChatbot() {
        isChatbotOpen = true;
        chatbotWindow.style.display = 'flex';
        setTimeout(() => {
            chatbotWindow.style.opacity = '1';
            chatbotWindow.style.transform = 'translateY(0) rotateX(0)';
        }, 10);
    }
    
    function closeChatbot() {
        isChatbotOpen = false;
        chatbotWindow.style.opacity = '0';
        chatbotWindow.style.transform = 'translateY(20px) rotateX(-10deg)';
        setTimeout(() => {
            chatbotWindow.style.display = 'none';
        }, 300);
        
        // Reset trạng thái các câu hỏi
        document.querySelectorAll('.cyber-answer').forEach(answer => {
            answer.style.display = 'none';
        });
        document.querySelectorAll('.cyber-question-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }
    
    // Cho phép kéo/thả nút chatbot
    let isDragging = false;
    let dragOffsetX, dragOffsetY;
    
    chatbotButton.addEventListener('mousedown', function(e) {
        isDragging = true;
        dragOffsetX = e.clientX - chatbotButton.getBoundingClientRect().left;
        dragOffsetY = e.clientY - chatbotButton.getBoundingClientRect().top;
        chatbotButton.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const x = e.clientX - dragOffsetX;
            const y = e.clientY - dragOffsetY;
            
            // Giới hạn trong viewport
            const maxX = window.innerWidth - chatbotButton.offsetWidth;
            const maxY = window.innerHeight - chatbotButton.offsetHeight;
            
            const boundedX = Math.min(Math.max(0, x), maxX);
            const boundedY = Math.min(Math.max(0, y), maxY);
            
            chatbotButton.style.left = boundedX + 'px';
            chatbotButton.style.top = boundedY + 'px';
            chatbotButton.style.right = 'auto';
            chatbotButton.style.bottom = 'auto';
        }
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            chatbotButton.style.cursor = 'pointer';
        }
    });
    
    // Đóng chatbot khi nhấn nút Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isChatbotOpen) {
            closeChatbot();
        }
    });
    
    // Đóng chatbot khi nhấn vào bên ngoài
    document.addEventListener('click', function(e) {
        if (isChatbotOpen && 
            !chatbotWindow.contains(e.target) && 
            e.target !== chatbotButton) {
            closeChatbot();
        }
    });

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