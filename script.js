/**
 * Nails by Parmeet - Main JavaScript
 * Handles all interactive behaviors for the website
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle - Improved functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeMenuBtn = document.querySelector('.close-mobile-menu');
    const body = document.body;
    
    // Create menu overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    body.appendChild(menuOverlay);
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
            menuOverlay.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            closeMenu();
        });
    }
    
    // Close menu when clicking on overlay
    menuOverlay.addEventListener('click', function() {
        closeMenu();
    });
    
    // Close menu when clicking on a menu item
    const mobileNavLinks = document.querySelectorAll('.mobile-nav ul li a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    function closeMenu() {
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = ''; // Restore scrolling
    }
    
    // Service Card Booking Buttons
    const bookNowBtns = document.querySelectorAll('.book-now-btn');
    const appointmentModal = document.getElementById('appointment-modal');
    const modalService = document.getElementById('modal-service');
    
    bookNowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            if (modalService) {
                modalService.value = serviceName;
            }
            openModal(appointmentModal);
        });
    });
    
    // View More Services Button
    const viewMoreBtn = document.getElementById('view-more-services');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (viewMoreBtn) {
        // Initially show only first 8 services
        for (let i = 8; i < serviceCards.length; i++) {
            serviceCards[i].style.display = 'none';
        }
        
        viewMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle visibility of remaining services
            for (let i = 8; i < serviceCards.length; i++) {
                if (serviceCards[i].style.display === 'none') {
                    serviceCards[i].style.display = 'block';
                    viewMoreBtn.textContent = 'Show Less';
                } else {
                    serviceCards[i].style.display = 'none';
                    viewMoreBtn.textContent = 'View More Services';
                }
            }
        });
    }
    
    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            if (lightboxImg) {
                lightboxImg.src = imgSrc;
            }
            openModal(lightbox);
        });
    });
    
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            closeModal(lightbox);
        });
    }
    
    // Gallery Category Filtering (for gallery.html)
    const categoryBtns = document.querySelectorAll('.category-btn');
    const galleryItemsFilter = document.querySelectorAll('.main-gallery .gallery-item');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItemsFilter.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Appointment Form Submission
    const appointmentForm = document.getElementById('appointment-form');
    const modalAppointmentForm = document.getElementById('modal-appointment-form');
    const paymentModal = document.getElementById('payment-modal');
    const confirmationModal = document.getElementById('confirmation-modal');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            openModal(paymentModal);
        });
    }
    
    if (modalAppointmentForm) {
        modalAppointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            closeModal(appointmentModal);
            openModal(paymentModal);
        });
    }
    
    // Payment Options
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            const paymentType = this.getAttribute('data-payment');
            
            if (paymentType === 'gpay') {
                // Redirect to Google Pay (in a real scenario)
                alert('Redirecting to Google Pay...');
            } else if (paymentType === 'paytm') {
                // Redirect to Paytm (in a real scenario)
                alert('Redirecting to Paytm...');
            } else if (paymentType === 'cash') {
                closeModal(paymentModal);
                openModal(confirmationModal);
            }
        });
    });
    
    // Close Modals
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modals = document.querySelectorAll('.modal');
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal(confirmationModal);
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if it's a modal close button
            if (this.classList.contains('close-modal')) {
                return;
            }
            
            const targetId = this.getAttribute('href');
            
            // Skip empty links or javascript:void(0)
            if (targetId === '#' || targetId === '#!') {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to the element
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Helper Functions
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
    }
    
    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .story-content, .contact-form, .contact-info');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on page load
    animateOnScroll();
});
