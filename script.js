document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra thiết bị và điều chỉnh giao diện
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
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
                // Cuộn đến vị trí của productShowcase nếu ở mobile
                if (isMobile) {
                    productShowcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 10);
        }
    });

    // Support button click handler
    const supportBtn = document.getElementById('supportBtn');
    supportBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Mở chatbot khi nhấn vào nút hỗ trợ
        if (!isChatbotOpen) {
            openChatbot();
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
    const chatbotWindow = document.getElementById('chatbot-window');
    
    let isChatbotOpen = false;
    let isDragging = false;
    let wasDragging = false;
    let dragOffsetX, dragOffsetY;
    
    // Đặt vị trí ban đầu cho chatbot button dựa vào kích thước màn hình
    if (isMobile) {
        chatbotButton.style.bottom = '80px';
        chatbotButton.style.left = '20px';
        chatbotButton.style.width = isSmallMobile ? '55px' : '60px';
        chatbotButton.style.height = isSmallMobile ? '55px' : '60px';
    }
    
    // Hiển thị cửa sổ chat khi nhấn vào nút chatbot
    chatbotButton.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!wasDragging) {
            if (isChatbotOpen) {
                closeChatbot();
            } else {
                openChatbot();
            }
        }
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
                this.classList.remove('active');
            } else {
                // Hiệu ứng typing trước khi hiển thị câu trả lời
                setTimeout(() => {
                    answerElement.style.display = 'block';
                    // Cuộn xuống để hiển thị câu trả lời nếu ở mobile
                    if (isMobile) {
                        setTimeout(() => {
                            answerElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }, 100);
                    }
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
        chatbotPopup.style.display = 'flex';
        
        setTimeout(() => {
            chatbotWindow.style.opacity = '1';
            
            // Điều chỉnh kích thước và vị trí của cửa sổ chat trên mobile
            if (isMobile) {
                chatbotWindow.style.maxHeight = '80vh';
                chatbotWindow.style.width = isSmallMobile ? '90%' : '85%';
            }
        }, 10);
        
        // Thêm lớp để ngăn cuộn trang khi chatbot đang mở trên mobile
        if (isMobile) {
            document.body.classList.add('chatbot-open');
        }
        
        // Thêm hiệu ứng nhấp nháy cho nút hỗ trợ khi chatbot mở
        if (supportBtn) {
            supportBtn.classList.add('active');
        }
    }
    
    function closeChatbot() {
        isChatbotOpen = false;
        chatbotWindow.style.opacity = '0';
        
        setTimeout(() => {
            chatbotPopup.style.display = 'none';
        }, 300);
        
        // Reset trạng thái các câu hỏi
        document.querySelectorAll('.cyber-answer').forEach(answer => {
            answer.style.display = 'none';
        });
        document.querySelectorAll('.cyber-question-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Xóa lớp ngăn cuộn
        document.body.classList.remove('chatbot-open');
        
        // Xóa hiệu ứng active cho nút hỗ trợ
        if (supportBtn) {
            supportBtn.classList.remove('active');
        }
    }
    
    // Đóng chatbot khi click bên ngoài
    chatbotPopup.addEventListener('click', function(e) {
        if (e.target === chatbotPopup) {
            closeChatbot();
        }
    });
    
    // Cho phép kéo/thả nút chatbot
    chatbotButton.addEventListener('mousedown', function(e) {
        isDragging = false;
        wasDragging = false;
        dragOffsetX = e.clientX - chatbotButton.getBoundingClientRect().left;
        dragOffsetY = e.clientY - chatbotButton.getBoundingClientRect().top;
        chatbotButton.style.cursor = 'grabbing';
    });
    
    chatbotButton.addEventListener('touchstart', function(e) {
        isDragging = false;
        wasDragging = false;
        const touch = e.touches[0];
        dragOffsetX = touch.clientX - chatbotButton.getBoundingClientRect().left;
        dragOffsetY = touch.clientY - chatbotButton.getBoundingClientRect().top;
        chatbotButton.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging === false && dragOffsetX !== undefined) {
            // Chỉ bắt đầu kéo khi di chuyển một khoảng nhất định
            const moveX = Math.abs(e.clientX - chatbotButton.getBoundingClientRect().left - dragOffsetX);
            const moveY = Math.abs(e.clientY - chatbotButton.getBoundingClientRect().top - dragOffsetY);
            if (moveX > 5 || moveY > 5) {
                isDragging = true;
            }
        }
        
        if (isDragging) {
            wasDragging = true;
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
    
    document.addEventListener('touchmove', function(e) {
        if (isDragging === false && dragOffsetX !== undefined) {
            const touch = e.touches[0];
            // Chỉ bắt đầu kéo khi di chuyển một khoảng nhất định
            const moveX = Math.abs(touch.clientX - chatbotButton.getBoundingClientRect().left - dragOffsetX);
            const moveY = Math.abs(touch.clientY - chatbotButton.getBoundingClientRect().top - dragOffsetY);
            if (moveX > 5 || moveY > 5) {
                isDragging = true;
                e.preventDefault(); // Ngăn chặn hành vi mặc định khi kéo
            }
        }
        
        if (isDragging) {
            wasDragging = true;
            const touch = e.touches[0];
            const x = touch.clientX - dragOffsetX;
            const y = touch.clientY - dragOffsetY;
            
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
        isDragging = false;
        dragOffsetX = undefined;
        dragOffsetY = undefined;
        chatbotButton.style.cursor = 'pointer';
        
        // Reset wasDragging sau một khoảng thời gian ngắn
        setTimeout(() => {
            wasDragging = false;
        }, 100);
    });
    
    document.addEventListener('touchend', function() {
        isDragging = false;
        dragOffsetX = undefined;
        dragOffsetY = undefined;
        chatbotButton.style.cursor = 'pointer';
        
        // Reset wasDragging sau một khoảng thời gian ngắn
        setTimeout(() => {
            wasDragging = false;
        }, 100);
    });
    
    // Xử lý sự kiện resize để điều chỉnh giao diện khi thay đổi kích thước màn hình
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 768;
        const newIsSmallMobile = window.innerWidth <= 480;
        
        // Chỉ cập nhật nếu trạng thái thiết bị thay đổi
        if (newIsMobile !== isMobile || newIsSmallMobile !== isSmallMobile) {
            // Cập nhật kích thước chatbot button
            if (newIsMobile) {
                chatbotButton.style.width = newIsSmallMobile ? '55px' : '60px';
                chatbotButton.style.height = newIsSmallMobile ? '55px' : '60px';
                
                // Đặt lại vị trí mặc định nếu chuyển từ desktop sang mobile
                if (!isMobile) {
                    chatbotButton.style.bottom = '80px';
                    chatbotButton.style.left = '20px';
                    chatbotButton.style.top = 'auto';
                    chatbotButton.style.right = 'auto';
                }
            } else {
                // Trở lại kích thước desktop
                chatbotButton.style.width = '65px';
                chatbotButton.style.height = '65px';
            }
            
            // Cập nhật kích thước cửa sổ chat nếu đang mở
            if (isChatbotOpen) {
                if (newIsMobile) {
                    chatbotWindow.style.maxHeight = '80vh';
                    chatbotWindow.style.width = newIsSmallMobile ? '90%' : '85%';
                } else {
                    chatbotWindow.style.maxHeight = '500px';
                    chatbotWindow.style.width = '320px';
                }
            }
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

function loadProducts() {
    // Mảng chứa thông tin sản phẩm
    const products = [
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
            name: "Microsoft 365",
            description: "Office, OneDrive, Windows bản quyền chính hãng",
            image: "https://i.ibb.co/0qXZkdT/microsoft.jpg"
        },
        {
            name: "CapCut Pro",
            description: "Chỉnh sửa video chuyên nghiệp với nhiều hiệu ứng",
            image: "https://i.ibb.co/39xBKJTn/capcut.jpg",
            special: true
        }
    ];

    // Lấy phần tử grid để thêm sản phẩm
    const productGrid = document.getElementById('productGrid');
    
    // Kiểm tra xem productGrid có tồn tại không
    if (!productGrid) return;
    
    // Xóa nội dung hiện tại của grid
    productGrid.innerHTML = '';
    
    // Thêm từng sản phẩm vào grid
    products.forEach(product => {
        addProductToGrid(product, productGrid, product.special);
    });
}

function addProductToGrid(product, grid, isSpecial = false) {
    // Tạo phần tử sản phẩm
    const productItem = document.createElement('div');
    productItem.className = 'product-item' + (isSpecial ? ' special-product' : '');
    productItem.onclick = function() {
        openPurchaseModal(product.name);
    };
    
    // Tạo phần hình ảnh
    const productImage = document.createElement('div');
    productImage.className = 'product-image';
    
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.loading = 'lazy'; // Lazy loading cho hình ảnh
    img.onerror = function() {
        productImage.classList.add('img-error');
    };
    
    productImage.appendChild(img);
    
    // Tạo phần thông tin
    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';
    
    const productName = document.createElement('h4');
    productName.textContent = product.name;
    
    const productDesc = document.createElement('p');
    productDesc.textContent = product.description;
    
    productInfo.appendChild(productName);
    productInfo.appendChild(productDesc);
    
    // Ghép các phần lại với nhau
    productItem.appendChild(productImage);
    productItem.appendChild(productInfo);
    
    // Thêm vào grid
    grid.appendChild(productItem);
}

function openPurchaseModal(productName) {
    const modal = document.getElementById('purchaseModal');
    const productNameInput = document.getElementById('productNameInput');
    
    productNameInput.value = productName;
    modal.style.display = 'flex';
    
    // Focus vào trường nhập liệu đầu tiên
    setTimeout(() => {
        document.getElementById('customerNameInput').focus();
    }, 300);
}

function closeModal() {
    const modal = document.getElementById('purchaseModal');
    modal.style.display = 'none';
    
    // Reset form
    document.getElementById('customerNameInput').value = '';
    document.getElementById('customerContactInput').value = '';
}

function sendPurchaseInfo() {
    const productName = document.getElementById('productNameInput').value;
    const customerName = document.getElementById('customerNameInput').value;
    const customerContact = document.getElementById('customerContactInput').value;
    
    // Kiểm tra dữ liệu
    if (!customerName || !customerContact) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    
    // Mở Zalo với thông tin đặt hàng
    const message = `Xin chào, tôi muốn đặt mua sản phẩm: ${productName}. Tên tôi là: ${customerName}. Thông tin liên hệ: ${customerContact}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://zalo.me/0825280204?text=${encodedMessage}`, '_blank');
    
    // Đóng modal
    closeModal();
} 