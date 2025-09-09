// Portfolio Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeLoading();
    initializeCursor();
    initializeNavigation();
    initializeScrollProgress();
    initializeAnimations();
    initializeThemeToggle();
    initializeTypingEffect();
    initializeSkillBars();
    initializeStatsCounter();
    initializeFormSubmission();
    initializeMobileMenu();
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Start other animations after loading
                    startInitialAnimations();
                }, 500);
            }, 500);
        }
    }, 100);
}

// Custom Cursor
function initializeCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth trail animation
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorTrail.style.transform = 'scale(1.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorTrail.style.transform = 'scale(1)';
        });
    });
}

// Navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active section highlighting
    const sections = document.querySelectorAll('section');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveSection);
}

// Scroll Progress Indicator
function initializeScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Animations on Scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for specific elements
                if (entry.target.classList.contains('skill-progress')) {
                    animateSkillBar(entry.target);
                }
                
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-title, .text-reveal p, .skill-item, .project-card, .contact-method');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add smooth transition effect
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// Typing Effect for Hero
function initializeTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const texts = ['Charlie Old', 'Full Stack Developer', 'Problem Solver', 'Code Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before starting new text
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Start typing effect after loading
    setTimeout(typeText, 1000);
}

// Skill Bars Animation
function initializeSkillBars() {
    function animateSkillBar(skillBar) {
        const progress = skillBar.getAttribute('data-progress');
        let currentProgress = 0;
        
        const animation = setInterval(() => {
            currentProgress += 2;
            skillBar.style.width = currentProgress + '%';
            
            if (currentProgress >= progress) {
                skillBar.style.width = progress + '%';
                clearInterval(animation);
            }
        }, 30);
    }
    
    // Observe skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                observer.unobserve(entry.target); // Only animate once
            }
        });
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Stats Counter Animation
function initializeStatsCounter() {
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            current += increment;
            counter.textContent = Math.ceil(current);
            
            if (current < target) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    // Observe stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Only animate once
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Form Submission
function initializeFormSubmission() {
    const form = document.querySelector('.form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Success state
            button.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            button.style.background = 'var(--gradient-accent)';
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = 'var(--gradient-primary)';
            }, 3000);
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 2000);
    });
    
    // Form validation and styling
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--primary-color)';
            input.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = 'var(--border-color)';
                input.style.boxShadow = 'none';
            }
        });
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Start Initial Animations
function startInitialAnimations() {
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate code window
    setTimeout(() => {
        const codeWindow = document.querySelector('.code-window');
        if (codeWindow) {
            codeWindow.style.opacity = '1';
            codeWindow.style.transform = 'translateY(0) scale(1)';
        }
    }, 1000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent-color)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
    `;
    
    const closeNotification = () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeNotification);
    
    // Auto close after 5 seconds
    setTimeout(closeNotification, 5000);
}

// Parallax Effect for Floating Shapes
function initializeParallax() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = scrollY * speed;
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize parallax after loading
window.addEventListener('load', initializeParallax);

// Glitch Effect on Logo
function initializeGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch-1 0.3s linear';
            setTimeout(() => {
                element.style.animation = '';
            }, 300);
        });
    });
}

// Initialize glitch effect
setTimeout(initializeGlitchEffect, 1000);

// Smooth Page Transitions (for future navigation)
function initializePageTransitions() {
    // Add page transition effects when navigating
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.length > 1) { // Not just "#"
                // Add transition effect
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '0.8';
                
                setTimeout(() => {
                    document.body.style.opacity = '1';
                }, 300);
            }
        });
    });
}

// Initialize page transitions
initializePageTransitions();

// Easter Egg: Konami Code
function initializeEasterEgg() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function showEasterEgg() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        let colorIndex = 0;
        
        const interval = setInterval(() => {
            document.body.style.background = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
        }, 100);
        
        showNotification('🎉 Easter egg activated! You found the secret!', 'success');
        
        setTimeout(() => {
            clearInterval(interval);
            document.body.style.background = '';
        }, 2000);
    }
}

// Initialize easter egg
initializeEasterEgg();

// Performance Optimization: Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initializeLazyLoading();

// Console Art
console.log(`
    ╔═══════════════════════════════════╗
    ║     Welcome to Charlie's Site!    ║
    ║                                   ║
    ║   Thanks for checking the console ║
    ║   Want to work together?          ║
    ║   Let's connect! 🚀               ║
    ╚═══════════════════════════════════╝
`);

console.log('%cHiring me would be a great decision! 💼', 
    'color: #6366f1; font-size: 16px; font-weight: bold;');

// Add some developer humor
const developerJokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
    "Why don't programmers like nature? It has too many bugs! 🌿",
    "What's a programmer's favorite hangout place? Foo Bar! 🍺"
];

setTimeout(() => {
    const randomJoke = developerJokes[Math.floor(Math.random() * developerJokes.length)];
    console.log(`%c${randomJoke}`, 'color: #06d6a0; font-style: italic;');
}, 3000);