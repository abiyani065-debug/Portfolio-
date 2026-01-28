// Student Portfolio JavaScript
// Neon Blue Futuristic Theme Implementation

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const fadeElements = document.querySelectorAll('.fade-in');

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded - Neon Blue Theme');
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize contact form
    initContactForm();
    
    // Check for animations on page load
    checkScroll();
});

// Mobile Navigation Toggle
function initMobileNav() {
    hamburger.addEventListener('click', function() {
        // Toggle hamburger animation
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = document.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger bars
            const bars = document.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate position with offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Smooth scroll for "View Projects" button
    const viewProjectsBtn = document.querySelector('.neon-btn[href="#projects"]');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetElement = document.querySelector('#projects');
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Animate Skill Bars on Scroll
function initSkillBars() {
    // Create observer for skill bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                // Animate progress bar
                setTimeout(() => {
                    progressBar.style.width = `${width}%`;
                }, 300);
                
                // Stop observing after animation
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe each skill bar
    skillProgressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Scroll Animations for Fade-in Elements
function initScrollAnimations() {
    // Create observer for fade-in elements
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all elements with fade-in class
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Check scroll position for animations
function checkScroll() {
    // Add fade-in class to elements on page load if they're in viewport
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Contact Form Submission (Frontend Only)
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show success message (in a real app, this would send to a server)
        showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Log form data (in a real app, you would send this to a server)
        console.log('Contact Form Submission:', { name, email, subject, message });
    });
}

// Show Form Message
function showFormMessage(text, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = text;
    
    // Style the message
    messageElement.style.padding = '15px';
    messageElement.style.borderRadius = '8px';
    messageElement.style.marginTop = '20px';
    messageElement.style.fontWeight = '600';
    messageElement.style.textAlign = 'center';
    messageElement.style.transition = 'all 0.3s ease';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = 'rgba(15, 240, 252, 0.1)';
        messageElement.style.border = '1px solid var(--neon-blue)';
        messageElement.style.color = 'var(--neon-blue)';
    } else {
        messageElement.style.backgroundColor = 'rgba(255, 50, 50, 0.1)';
        messageElement.style.border = '1px solid #ff4d4d';
        messageElement.style.color = '#ff4d4d';
    }
    
    // Insert message after the form
    contactForm.appendChild(messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 300);
    }, 5000);
}

// Add fade-in class to elements that should animate on scroll
window.addEventListener('load', function() {
    // Add fade-in class to sections for scroll animation
    const sections = document.querySelectorAll('.about-content, .projects-grid, .skills-container, .contact-container');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Add fade-in to individual project cards for staggered animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Initial check for elements in viewport
    checkScroll();
});

// Add scroll event listener for animations
window.addEventListener('scroll', checkScroll);

// Neon Button Hover Effects Enhancement
document.querySelectorAll('.neon-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        // Add a more intense glow on hover
        this.style.boxShadow = '0 0 25px var(--neon-blue)';
    });
    
    button.addEventListener('mouseleave', function() {
        // Return to normal glow
        this.style.boxShadow = '0 0 10px var(--neon-blue)';
    });
});

// Project Card Hover Effect Enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Increase glow intensity on hover
        const glow = this.querySelector('.card-glow');
        if (glow) {
            glow.style.opacity = '0.15';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        // Return glow to normal
        const glow = this.querySelector('.card-glow');
        if (glow) {
            glow.style.opacity = '0';
        }
    });
});

// Add interactive effect to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
