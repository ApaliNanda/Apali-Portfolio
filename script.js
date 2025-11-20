// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Update navbar background on scroll based on theme
const updateNavbarOnScroll = () => {
    const navbar = document.querySelector('.navbar');
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';
    
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = isDark 
            ? 'rgba(17, 24, 39, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = isDark ? '#111827' : '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
};

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update navbar background immediately
    updateNavbarOnScroll();
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Button Click Event
const contactBtn = document.getElementById('contactBtn');
contactBtn.addEventListener('click', () => {
    const contactSection = document.querySelector('#contact');
    contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Add visual feedback
    contactBtn.textContent = 'Scrolling...';
    setTimeout(() => {
        contactBtn.textContent = 'Get In Touch';
    }, 1000);
});

// Project Button Click Events
const projectButtons = document.querySelectorAll('.project-button');
projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectNumber = button.getAttribute('data-project');
        const projectTitle = button.closest('.project-card').querySelector('.project-title').textContent;
        
        // Show alert with project details
        alert(`Project ${projectNumber}: ${projectTitle}\n\nThis is a featured project. More details coming soon!`);
        
        // Add visual feedback
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.style.opacity = '0.7';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.opacity = '1';
        }, 1000);
    });
});

// Copy Email Button
const copyEmailBtn = document.getElementById('copyEmailBtn');
const emailDisplay = document.getElementById('emailDisplay');

copyEmailBtn.addEventListener('click', () => {
    const email = emailDisplay.textContent;
    
    // Copy to clipboard
    navigator.clipboard.writeText(email).then(() => {
        // Visual feedback
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Email Copied!';
        copyEmailBtn.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            copyEmailBtn.textContent = originalText;
            copyEmailBtn.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email:', err);
        alert('Failed to copy email. Please copy manually: ' + email);
    });
});

// Navbar background on scroll (updated to work with dark mode)
window.addEventListener('scroll', () => {
    updateNavbarOnScroll();
});

// Initialize navbar background on page load
updateNavbarOnScroll();

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const sections = document.querySelectorAll('section');
const cards = document.querySelectorAll('.skill-card, .project-card');

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add active state to navigation links on scroll
const sectionsForNav = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sectionsForNav.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

