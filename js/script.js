// Portfolio Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeLoading();
    initializeCursor();
    initializeSectionNavigation();
    initializeAnimations();
    initializeThemeToggle();
    initializeTypingEffect();
    initializeSkillBars();
    initializeStatsCounter();
    initializeProjectSlider();
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
    const hoverElements = document.querySelectorAll('button, .about-card, .skill-card, .project-link, .social-link');
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

// Section Navigation
function initializeSectionNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    const heroButtons = document.querySelectorAll('[data-section]');
    
    function showSection(targetSection) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const target = document.getElementById(targetSection);
        if (target) {
            target.classList.add('active');
        }
        
        // Update navigation
        navBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-section="${targetSection}"]`);
        if (activeBtn && activeBtn.classList.contains('nav-btn')) {
            activeBtn.classList.add('active');
        }
        
        // Trigger section-specific animations
        triggerSectionAnimations(targetSection);
    }
    
    // Navigation button clicks
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.getAttribute('data-section');
            showSection(targetSection);
        });
    });
    
    // Hero button clicks
    heroButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.getAttribute('data-section');
            if (targetSection) {
                showSection(targetSection);
            }
        });
    });
}

// Trigger section-specific animations
function triggerSectionAnimations(section) {
    switch(section) {
        case 'skills':
            setTimeout(() => {
                animateSkillLevels();
            }, 300);
            break;
        case 'about':
            setTimeout(() => {
                animateStats();
            }, 300);
            break;
    }
}

// Animations on Section Change
function initializeAnimations() {
    // Add entrance animations to cards
    const cards = document.querySelectorAll('.about-card, .skill-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
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
            // Keep a space character to maintain layout
            typingText.textContent = '\u00A0';
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Start typing effect after loading
    setTimeout(typeText, 1000);
}

// Skill Bars Animation
function initializeSkillBars() {
    // This will be triggered when skills section is shown
}

function animateSkillLevels() {
    const skillBars = document.querySelectorAll('.level-fill');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        }, index * 200);
    });
}

// Stats Counter Animation
function initializeStatsCounter() {
    // This will be triggered when about section is shown
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((counter, index) => {
        setTimeout(() => {
            animateCounter(counter);
        }, index * 200);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    
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

// Project Slider
function initializeProjectSlider() {
    const slides = document.querySelectorAll('.project-slide');
    const navBtns = document.querySelectorAll('.project-nav-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        navBtns.forEach(btn => btn.classList.remove('active'));
        
        // Show target slide
        slides[index].classList.add('active');
        navBtns[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Navigation button clicks
    navBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-advance slides (optional)
    setInterval(() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 5000); // Change slide every 5 seconds
}

// Form Submission
function initializeFormSubmission() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = form.querySelector('.form-submit');
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
    const navBtns = document.querySelectorAll('.nav-btn');
    
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
    
    // Close menu when button is clicked
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
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
    
    // Animate section cards when they become visible
    const aboutSection = document.getElementById('about');
    const skillsSection = document.getElementById('skills');
    
    // Set up intersection observer for section animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId === 'about') {
                    animateAboutCards();
                } else if (sectionId === 'skills') {
                    animateSkillCards();
                }
            }
        });
    });
    
    if (aboutSection) sectionObserver.observe(aboutSection);
    if (skillsSection) sectionObserver.observe(skillsSection);
}

// Animate About Cards
function animateAboutCards() {
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Animate Skill Cards
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
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
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeNotification);
    
    // Auto close after 5 seconds
    setTimeout(closeNotification, 5000);
}

// Parallax Effect for Floating Shapes
function initializeParallax() {
    const shapes = document.querySelectorAll('.shape');
    
    // Only apply parallax on home section
    const homeSection = document.getElementById('home');
    
    function updateParallax() {
        if (homeSection && homeSection.classList.contains('active')) {
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                const rotation = Date.now() * 0.001 * (index + 1);
                shape.style.transform = `translateY(${Math.sin(rotation) * 20}px) rotate(${rotation * 10}deg)`;
            });
        }
        requestAnimationFrame(updateParallax);
    }
    
    updateParallax();
}

// Initialize parallax after loading
window.addEventListener('load', initializeParallax);

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

// Keyboard Navigation
function initializeKeyboardNavigation() {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    let currentSectionIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        // Navigate with arrow keys
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            currentSectionIndex = (currentSectionIndex + 1) % sections.length;
            showSectionByIndex(currentSectionIndex);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            currentSectionIndex = currentSectionIndex === 0 ? sections.length - 1 : currentSectionIndex - 1;
            showSectionByIndex(currentSectionIndex);
        }
        
        // Navigate with number keys
        if (e.key >= '1' && e.key <= '5') {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            currentSectionIndex = index;
            showSectionByIndex(currentSectionIndex);
        }
    });
    
    function showSectionByIndex(index) {
        const sectionName = sections[index];
        const navBtn = document.querySelector(`[data-section="${sectionName}"]`);
        if (navBtn && navBtn.classList.contains('nav-btn')) {
            navBtn.click();
        }
    }
}

// Initialize keyboard navigation
initializeKeyboardNavigation();

// Console Art
console.log(`
    ╔═══════════════════════════════════╗
    ║     Welcome to Charlie's Site!    ║
    ║                                   ║
    ║   Navigation Tips:                ║
    ║   • Use arrow keys to navigate    ║
    ║   • Press 1-5 for quick sections  ║
    ║   • Try the Konami code! 🎮       ║
    ║                                   ║
    ║   Want to work together? 🚀       ║
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

// Performance tip
console.log('%cPro tip: This site uses single-page navigation for lightning-fast transitions! ⚡', 
    'color: #8b5cf6; font-weight: bold;');