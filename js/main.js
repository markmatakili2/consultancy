(function ($) {
    "use strict";

    // ===================================
    // LOADING SCREEN
    // ===================================
    $(window).on('load', function() {
        setTimeout(function() {
            $('#loading-screen').addClass('hidden');
        }, 1500);
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
    setInterval(nextSlide, 6000);

    // Manual slide change
    window.changeSlide = function(direction) {
        if (direction === 1) {
            nextSlide();
        } else {
            prevSlide();
        }
    };

    // ===================================
    // COUNTER ANIMATION
    // ===================================
    function animateCounters() {
        $('.stat-number[data-count]').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.attr('data-count'));
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(countTo + ($this.attr('data-count').includes('%') ? '%' : 
                              $this.attr('data-count').includes('+') ? '+' : ''));
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
                
                // Animate counters when stats come into view
                if (target.classList.contains('hero-stats-container') || 
                    target.classList.contains('stats-grid')) {
                    animateCounters();
                }
                
                // Animate progress bars
                if (target.classList.contains('features-stats')) {
                    $('.progress-bar').each(function() {
                        const width = $(this).css('width');
                        $(this).css('width', '0').animate({ width: width }, 1500);
                    });
                }
                
                // Add animation classes
                target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    $('.hero-stats-container, .stats-grid, .service-card, .about-card, .feature-item, .stat-card, .features-stats').each(function() {
        observer.observe(this);
    });

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
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav: false,
        margin: 0,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        responsive: {
            0: { items: 1 },
            768: { items: 1 },
            992: { items: 1 }
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
            phone: $('#phone').val(),
            subject: $('#subject').val(),
            service: $('#service').val(),
            message: $('#message').val()
        };

        // Simple validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.service) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        
        submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');
        submitBtn.prop('disabled', true);

        setTimeout(function() {
            submitBtn.html('<i class="fas fa-check me-2"></i>Message Sent!');
            showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
            
            setTimeout(function() {
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
                $('.contact-form')[0].reset();
            }, 3000);
        }, 2000);
    });

    // Newsletter form
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        
        const email = $(this).find('input[type="email"]').val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email || !emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        
        submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Subscribing...');
        submitBtn.prop('disabled', true);

        setTimeout(function() {
            submitBtn.html('<i class="fas fa-check me-2"></i>Subscribed!');
            showNotification('Successfully subscribed to our newsletter! Welcome aboard.', 'success');
            
            setTimeout(function() {
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
                $('.newsletter-form')[0].reset();
            }, 3000);
        }, 1500);
    });

    // ===================================
    // NOTIFICATION SYSTEM
    // ===================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        $('.notification').remove();
        
        const iconMap = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };
        
        const notification = $(`
            <div class="notification notification-${type}">
                <div class="notification-content">
                    <div class="notification-icon">
                        <i class="fas fa-${iconMap[type]}"></i>
                    </div>
                    <div class="notification-text">
                        <span>${message}</span>
                    </div>
                </div>
                <button class="notification-close" aria-label="Close notification">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `);
        
        $('body').append(notification);
        
        // Show notification
        setTimeout(() => notification.addClass('show'), 100);
        
        // Auto hide after 6 seconds
        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        }, 6000);
        
        // Manual close
        notification.find('.notification-close').on('click', function() {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        });
    }

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
            $this.addClass('focused');
        } else {
            label.removeClass('active');
            $this.removeClass('focused');
        }
    });

    // Real-time validation
    $('.form-control[required]').on('blur', function() {
        const $this = $(this);
        const value = $this.val().trim();
        
        if (value === '') {
            $this.addClass('is-invalid').removeClass('is-valid');
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
            $this.addClass('is-invalid').removeClass('is-valid');
        } else {
            $this.removeClass('is-invalid').addClass('is-valid');
        }
    });

    // Phone validation
    $('input[type="tel"]').on('blur', function() {
        const $this = $(this);
        const phone = $this.val().trim();
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        
        if (phone !== '' && !phoneRegex.test(phone)) {
            $this.addClass('is-invalid').removeClass('is-valid');
        } else if (phone !== '') {
            $this.removeClass('is-invalid').addClass('is-valid');
        }
    });

    // ===================================
    // INITIALIZE AOS (Animate On Scroll)
    // ===================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out-cubic',
            once: true,
            mirror: false,
            offset: 100,
            delay: 0
        });
    }

    // ===================================
    // PRELOADER FOR IMAGES
    // ===================================
    function preloadImages() {
        const images = [
            'img/her03.jpg',
            'img/hero2.jpeg',
            'img/carousel-1.jpg',
            'img/handshake.jpg',
            'img/client2.png',
            'img/feature.jpg',
            'img/testimonial-1.jpg',
            'img/testimonial-2.jpg'
        ];
        
        let loadedImages = 0;
        const totalImages = images.length;
        
        images.forEach(src => {
            const img = new Image();
            img.onload = function() {
                loadedImages++;
                if (loadedImages === totalImages) {
                    console.log('All images preloaded successfully');
                }
            };
            img.onerror = function() {
                console.warn(`Failed to load image: ${src}`);
                loadedImages++;
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
        const scrollTop = $(window).scrollTop();
        
        // Update navbar
        if (scrollTop > 100) {
            $('.navbar').addClass('scrolled');
            $('#backToTop').addClass('show');
        } else {
            $('.navbar').removeClass('scrolled');
            $('#backToTop').removeClass('show');
        }
        
        // Update progress bars if visible
        $('.progress-bar').each(function() {
            const $bar = $(this);
            const $section = $bar.closest('section');
            const sectionTop = $section.offset().top;
            const sectionHeight = $section.outerHeight();
            const windowHeight = $(window).height();
            
            if (scrollTop + windowHeight > sectionTop + 100) {
                const targetWidth = $bar.data('width') || $bar.css('width');
                $bar.css('width', targetWidth);
            }
        });
        
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
    $('.hero-nav-btn, .back-to-top, .play-button').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });

    // Focus management for modals
    $('#videoModal').on('shown.bs.modal', function() {
        $(this).find('.btn-close').focus();
    });

    // Escape key to close modals
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('.modal.show').modal('hide');
        }
    });

    // ===================================
    // ADVANCED INTERACTIONS
    // ===================================
    
    // Service card hover effects
    $('.service-card').on('mouseenter', function() {
        $(this).find('.service-icon').addClass('animate-bounce');
    }).on('mouseleave', function() {
        $(this).find('.service-icon').removeClass('animate-bounce');
    });

    // Testimonial carousel custom controls
    $('.testimonials-carousel').on('initialized.owl.carousel', function() {
        $('.testimonial-item').addClass('fade-in');
    });

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    $('.copyright').html($('.copyright').html().replace('2025', currentYear));

    // ===================================
    // TOUCH GESTURES FOR MOBILE
    // ===================================
    let touchStartX = 0;
    let touchEndX = 0;

    $('.hero-section').on('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    $('.hero-section').on('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }

    // ===================================
    // ERROR HANDLING
    // ===================================
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });

    // Handle image loading errors
    $('img').on('error', function() {
        console.warn('Failed to load image:', $(this).attr('src'));
        $(this).hide();
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
        
        // Add loaded class to body
        $('body').addClass('loaded');
        
        console.log('ClinChem Solutions website initialized successfully');
    });

    // ===================================
    // CUSTOM CURSOR (Optional Enhancement)
    // ===================================
    if ($(window).width() > 768) {
        const cursor = $('<div class="custom-cursor"></div>');
        $('body').append(cursor);
        
        $(document).on('mousemove', function(e) {
            cursor.css({
                left: e.clientX,
                top: e.clientY
            });
        });
        
        $('a, button, .service-card, .about-card').on('mouseenter', function() {
            cursor.addClass('cursor-hover');
        }).on('mouseleave', function() {
            cursor.removeClass('cursor-hover');
        });
    }

})(jQuery);

// ===================================
// NOTIFICATION STYLES (Injected CSS)
// ===================================
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 24px;
    right: 24px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    padding: 0;
    min-width: 320px;
    max-width: 420px;
    z-index: 10000;
    transform: translateX(450px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid #e5e5e5;
    overflow: hidden;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left: 4px solid #10b981;
}

.notification-error {
    border-left: 4px solid #ef4444;
}

.notification-info {
    border-left: 4px solid #3b82f6;
}

.notification-warning {
    border-left: 4px solid #f59e0b;
}

.notification-content {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
}

.notification-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 18px;
}

.notification-success .notification-icon {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
}

.notification-error .notification-icon {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}

.notification-info .notification-icon {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
}

.notification-warning .notification-icon {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
}

.notification-text {
    flex: 1;
    padding-top: 8px;
}

.notification-text span {
    font-weight: 500;
    color: #374151;
    line-height: 1.5;
    font-size: 14px;
}

.notification-close {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.2s ease;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-close:hover {
    background: #f3f4f6;
    color: #374151;
}

.custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    background: #F3525A;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: difference;
}

.custom-cursor.cursor-hover {
    transform: scale(1.5);
}

@media (max-width: 768px) {
    .notification {
        right: 16px;
        left: 16px;
        min-width: auto;
        transform: translateY(-100px);
        top: 16px;
    }
    
    .notification.show {
        transform: translateY(0);
    }
    
    .custom-cursor {
        display: none;
    }
}

@keyframes animate-bounce {
    0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0,0,0);
    }
    40%, 43% {
        transform: translate3d(0, -8px, 0);
    }
    70% {
        transform: translate3d(0, -4px, 0);
    }
    90% {
        transform: translate3d(0, -2px, 0);
    }
}

.animate-bounce {
    animation: animate-bounce 1s ease-in-out;
}

.fade-in {
    animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
`;

// Inject notification styles
document.head.insertAdjacentHTML('beforeend', notificationStyles);