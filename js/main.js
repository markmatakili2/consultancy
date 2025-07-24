(function ($) {
    "use strict";

    // ===================================
    // LOADING SCREEN
    // ===================================
    $(window).on('load', function() {
        setTimeout(function() {
            $('#loading-screen').addClass('hidden');
        }, 1000);
    });

    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    $(window).scroll(function () {
        const navbar = $('.navbar');
        if ($(this).scrollTop() > 100) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });

    // ===================================
    // SMOOTH SCROLLING
    // ===================================
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 1000, 'easeInOutExpo');
        }
    });

    // ===================================
    // ACTIVE NAVIGATION
    // ===================================
    $(window).scroll(function() {
        const scrollPos = $(document).scrollTop() + 100;
        
        $('.nav-link[href^="#"]').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));
            
            if (refElement.length && 
                refElement.position().top <= scrollPos && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-link').removeClass('active');
                currLink.addClass('active');
            }
        });
    });

    // ===================================
    // HERO SLIDER
    // ===================================
    let currentSlide = 0;
    const slides = $('.hero-slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.removeClass('active');
        slides.eq(index).addClass('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Auto slide change
    setInterval(nextSlide, 5000);

    // Manual slide change
    window.changeSlide = function(direction) {
        if (direction === 1) {
            nextSlide();
        } else {
            prevSlide();
        }
    };

    // ===================================
    // BACK TO TOP BUTTON
    // ===================================
    $(window).scroll(function () {
        const backToTop = $('#backToTop');
        if ($(this).scrollTop() > 300) {
            backToTop.addClass('show');
        } else {
            backToTop.removeClass('show');
        }
    });

    $('#backToTop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000, 'easeInOutExpo');
        return false;
    });

    // ===================================
    // TESTIMONIALS CAROUSEL
    // ===================================
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav: false,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    });

    // ===================================
    // FORM HANDLING
    // ===================================
    $('.contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: $('#fullName').val(),
            email: $('#email').val(),
            subject: $('#subject').val(),
            service: $('#service').val(),
            message: $('#message').val()
        };

        // Simple validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        
        submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');
        submitBtn.prop('disabled', true);

        setTimeout(function() {
            submitBtn.html('<i class="fas fa-check me-2"></i>Message Sent!');
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            
            setTimeout(function() {
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
                $('.contact-form')[0].reset();
            }, 2000);
        }, 2000);
    });

    // Newsletter form
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        
        const email = $(this).find('input[type="email"]').val();
        if (!email) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        
        submitBtn.html('<i class="fas fa-spinner fa-spin"></i>');
        submitBtn.prop('disabled', true);

        setTimeout(function() {
            submitBtn.html('<i class="fas fa-check"></i>');
            showNotification('Successfully subscribed to our newsletter!', 'success');
            
            setTimeout(function() {
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
                $('.newsletter-form')[0].reset();
            }, 2000);
        }, 1500);
    });

    // ===================================
    // NOTIFICATION SYSTEM
    // ===================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        $('.notification').remove();
        
        const notification = $(`
            <div class="notification notification-${type}">
                <div class="notification-content">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                    <span>${message}</span>
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `);
        
        $('body').append(notification);
        
        // Show notification
        setTimeout(() => notification.addClass('show'), 100);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Manual close
        notification.find('.notification-close').on('click', function() {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        });
    }

    // ===================================
    // COUNTER ANIMATION
    // ===================================
    function animateCounters() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = $this.text();
            const isPercentage = countTo.includes('%');
            const isPlus = countTo.includes('+');
            const numericValue = parseInt(countTo.replace(/[^\d]/g, ''));
            
            $({ countNum: 0 }).animate({
                countNum: numericValue
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    let displayValue = Math.floor(this.countNum);
                    if (isPercentage) displayValue += '%';
                    if (isPlus) displayValue += '+';
                    $this.text(displayValue);
                },
                complete: function() {
                    $this.text(countTo);
                }
            });
        });
    }

    // ===================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Animate counters when hero stats come into view
                if (target.classList.contains('hero-stats')) {
                    animateCounters();
                }
                
                // Add animation classes
                target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    $('.hero-stats, .service-card, .about-card, .feature-item, .stat-card').each(function() {
        observer.observe(this);
    });

    // ===================================
    // MOBILE MENU HANDLING
    // ===================================
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking on a link
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
            $('.navbar-toggler').removeClass('active');
        }
    });

    // ===================================
    // PARALLAX EFFECT
    // ===================================
    $(window).scroll(function() {
        const scrolled = $(this).scrollTop();
        const parallaxElements = $('.hero-background');
        
        parallaxElements.each(function() {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            $(this).css('transform', `translateY(${yPos}px)`);
        });
    });

    // ===================================
    // FORM ENHANCEMENTS
    // ===================================
    
    // Floating labels effect
    $('.form-control').on('focus blur', function(e) {
        const $this = $(this);
        const label = $this.siblings('label');
        
        if (e.type === 'focus' || $this.val().length > 0) {
            label.addClass('active');
        } else {
            label.removeClass('active');
        }
    });

    // Real-time validation
    $('.form-control[required]').on('blur', function() {
        const $this = $(this);
        const value = $this.val().trim();
        
        if (value === '') {
            $this.addClass('is-invalid');
        } else {
            $this.removeClass('is-invalid').addClass('is-valid');
        }
    });

    // Email validation
    $('input[type="email"]').on('blur', function() {
        const $this = $(this);
        const email = $this.val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '' || !emailRegex.test(email)) {
            $this.addClass('is-invalid');
        } else {
            $this.removeClass('is-invalid').addClass('is-valid');
        }
    });

    // ===================================
    // INITIALIZE AOS (Animate On Scroll)
    // ===================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // ===================================
    // PRELOADER FOR IMAGES
    // ===================================
    function preloadImages() {
        const images = [
            'img/her03.jpg',
            'img/hero2.jpeg',
            'img/handshake.jpg',
            'img/client2.png',
            'img/feature.jpg'
        ];
        
        let loadedImages = 0;
        const totalImages = images.length;
        
        images.forEach(src => {
            const img = new Image();
            img.onload = function() {
                loadedImages++;
                if (loadedImages === totalImages) {
                    // All images loaded
                    console.log('All images preloaded');
                }
            };
            img.src = src;
        });
    }

    // Start preloading images
    preloadImages();

    // ===================================
    // PERFORMANCE OPTIMIZATIONS
    // ===================================
    
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Update navbar
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop > 100) {
            $('.navbar').addClass('scrolled');
            $('#backToTop').addClass('show');
        } else {
            $('.navbar').removeClass('scrolled');
            $('#backToTop').removeClass('show');
        }
        
        ticking = false;
    }
    
    $(window).on('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // ===================================
    // ACCESSIBILITY ENHANCEMENTS
    // ===================================
    
    // Keyboard navigation for custom elements
    $('.hero-nav-btn, .back-to-top').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });

    // Focus management for modals
    $('#videoModal').on('shown.bs.modal', function() {
        $(this).find('.btn-close').focus();
    });

    // ===================================
    // ERROR HANDLING
    // ===================================
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });

    // ===================================
    // INITIALIZATION
    // ===================================
    $(document).ready(function() {
        // Initialize tooltips if Bootstrap is available
        if (typeof bootstrap !== 'undefined') {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
        
        // Set initial active nav item
        $('.nav-link[href="#home"]').addClass('active');
        
        console.log('ClinChem Solutions website initialized successfully');
    });

})(jQuery);

// ===================================
// NOTIFICATION STYLES (Injected CSS)
// ===================================
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    padding: 20px;
    min-width: 300px;
    max-width: 400px;
    z-index: 10000;
    transform: translateX(400px);
    transition: all 0.3s ease;
    border-left: 4px solid #007bff;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left-color: #28a745;
}

.notification-error {
    border-left-color: #dc3545;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.notification-content i {
    font-size: 20px;
}

.notification-success .notification-content i {
    color: #28a745;
}

.notification-error .notification-content i {
    color: #dc3545;
}

.notification-content span {
    flex: 1;
    font-weight: 500;
    color: #333;
}

.notification-close {
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.notification-close:hover {
    background: #f5f5f5;
    color: #333;
}

@media (max-width: 480px) {
    .notification {
        right: 10px;
        left: 10px;
        min-width: auto;
        transform: translateY(-100px);
    }
    
    .notification.show {
        transform: translateY(0);
    }
}
</style>
`;

// Inject notification styles
document.head.insertAdjacentHTML('beforeend', notificationStyles);

// ===================================
// AOS LIBRARY INTEGRATION
// ===================================
const aosStyles = `
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
`;

document.head.insertAdjacentHTML('beforeend', aosStyles);