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
}); 