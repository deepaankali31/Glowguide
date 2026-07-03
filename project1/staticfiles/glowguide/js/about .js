// About Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    initAboutPage();
});

function initAboutPage() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Initialize background animations
    initBackgroundAnimations();
}

function initLoadingScreen() {
    const loadingScreen = document.getElementById('pageLoader');
    
    // Simulate loading process
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Trigger initial animations after loading
            triggerInitialAnimations();
        }, 500);
    }, 2000);
}

function initScrollAnimations() {
    // Create intersection observer for scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Add stagger effect for multiple elements
                if (entry.target.classList.contains('value-item')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animatable elements
    document.querySelectorAll('.content-card, .value-item, .cta-section').forEach(el => {
        observer.observe(el);
    });
}

function initInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.content-card, .value-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });
}

function initBackgroundAnimations() {
    // Create floating background elements
    createFloatingElements();
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.about-hero');
        const decorationCircles = document.querySelectorAll('.decoration-circle');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Animate decoration circles with parallax
        decorationCircles.forEach((circle, index) => {
            const speed = 0.3 + (index * 0.1);
            circle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

function createFloatingElements() {
    const container = document.querySelector('.background-elements');
    if (!container) return;
    
    // Clear existing elements
    container.innerHTML = '';
    
    // Create multiple floating shapes
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        
        // Random properties
        const size = Math.random() * 100 + 50;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 10;
        
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${left}%`;
        shape.style.top = `${top}%`;
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `${delay}s`;
        shape.style.opacity = Math.random() * 0.1 + 0.05;
        
        // Random shape type
        if (Math.random() > 0.5) {
            shape.style.borderRadius = '50%';
        } else {
            shape.style.borderRadius = '30%';
        }
        
        // Random color variation
        const colors = ['var(--primary-light)', 'var(--secondary-color)', 'var(--accent-color)'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        shape.style.background = randomColor;
        
        container.appendChild(shape);
    }
}

function triggerInitialAnimations() {
    // Animate hero content
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease-out forwards';
    }
    
    // Animate content cards with stagger
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
        card.style.animation = 'fadeInUp 0.8s ease forwards';
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar && window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else if (navbar) {
        navbar.classList.remove('scrolled');
    }
});