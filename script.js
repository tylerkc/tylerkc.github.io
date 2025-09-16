// Smooth scrolling for navigation links
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

// Navbar background on scroll with premium effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
    }
});

// Intersection Observer for animations
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

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Animate project cards on scroll
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});

// Animate skill badges
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const badges = entry.target.querySelectorAll('.skill-badge');
            badges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.opacity = '1';
                    badge.style.transform = 'scale(1)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    const badges = category.querySelectorAll('.skill-badge');
    badges.forEach(badge => {
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.8)';
        badge.style.transition = 'all 0.4s ease';
    });
    skillObserver.observe(category);
});

// Typing animation for hero tagline
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize premium animations when page loads
window.addEventListener('load', () => {
    const tagline = document.querySelector('.hero-tagline');
    const originalText = tagline.textContent;
    
    // Stagger hero content animations
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(40px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        typeWriter(tagline, originalText, 25);
    }, 1800);
});

// Add hover effect to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Parallax effect for tech grid
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        const speed = scrolled * 0.2;
        heroVisual.style.transform = `translateY(${speed}px)`;
        heroVisual.style.opacity = Math.max(0.4 - scrolled * 0.0005, 0);
    }
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
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

// Add click animation to buttons
document.querySelectorAll('.btn, .contact-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn, .contact-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);// 
Enhanced scroll snap functionality
let isScrolling = false;

// Smooth scroll with snap for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            isScrolling = true;
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Reset scrolling flag after animation
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    });
});

// Disable snap during programmatic scrolling to prevent conflicts
window.addEventListener('scroll', () => {
    if (isScrolling) {
        document.documentElement.style.scrollSnapType = 'none';
    } else {
        document.documentElement.style.scrollSnapType = 'y mandatory';
    }
});

// Optional: Add keyboard navigation for sections
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToNextSection();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToPrevSection();
    }
});

function scrollToNextSection() {
    const sections = document.querySelectorAll('section');
    const currentScroll = window.pageYOffset;
    
    for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop;
        if (sectionTop > currentScroll + 100) {
            sections[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
    }
}

function scrollToPrevSection() {
    const sections = document.querySelectorAll('section');
    const currentScroll = window.pageYOffset;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const sectionTop = sections[i].offsetTop;
        if (sectionTop < currentScroll - 100) {
            sections[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
    }
}// Cus
tom sticky image effect for About section
function handleStickyImage() {
    const aboutSection = document.querySelector('.about');
    const aboutImage = document.querySelector('.about-image');
    
    if (!aboutSection || !aboutImage) return;
    
    const sectionRect = aboutSection.getBoundingClientRect();
    const sectionTop = sectionRect.top;
    const sectionBottom = sectionRect.bottom;
    const navbarHeight = 100;
    
    // Check if section is in viewport
    if (sectionTop <= navbarHeight && sectionBottom > navbarHeight + 400) {
        // Make image fixed when section is scrolling
        aboutImage.style.position = 'fixed';
        aboutImage.style.top = navbarHeight + 'px';
        aboutImage.style.left = '50%';
        aboutImage.style.transform = 'translateX(-50%)';
        aboutImage.style.zIndex = '10';
    } else {
        // Reset to normal positioning
        aboutImage.style.position = 'relative';
        aboutImage.style.top = 'auto';
        aboutImage.style.left = 'auto';
        aboutImage.style.transform = 'none';
        aboutImage.style.zIndex = '1';
    }
}

// Run on scroll
window.addEventListener('scroll', handleStickyImage);
window.addEventListener('resize', handleStickyImage);

// Run on page load
window.addEventListener('load', handleStickyImage);// Adv
anced Interactive Effects

// 1. Enhanced Parallax scrolling
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const bgElements = document.querySelectorAll('.bg-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Tech grid parallax
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.3;
            element.style.transform = `translateY(${rate}px)`;
        });
        
        // Background elements parallax
        bgElements.forEach((element, index) => {
            const rate = scrolled * (0.1 + index * 0.05);
            element.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.02}deg)`;
        });
        
        // Hero content parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const rate = scrolled * 0.1;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
}

// 2. Interactive cursor effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-badge');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });
}

// 3. Magnetic effect for buttons
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn, .contact-btn, .project-link');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });
}

// 4. Scroll-triggered animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat').forEach(el => {
        observer.observe(el);
    });
}

// 5. Enhanced floating elements animation
function initFloatingElements() {
    const hero = document.querySelector('.hero');
    
    // Create floating particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 8 + 12) + 's';
        hero.appendChild(particle);
    }
    
    // Add mouse movement effect to hero
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const moveX = (x - 0.5) * 20;
            const moveY = (y - 0.5) * 20;
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    hero.addEventListener('mouseleave', () => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'translate(0px, 0px)';
        }
    });
}

// 6. Text reveal animation
function initTextReveal() {
    const textElements = document.querySelectorAll('.hero-name, .hero-title, .section-title');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = i * 0.05 + 's';
            span.classList.add('char-reveal');
            element.appendChild(span);
        });
    });
}

// 7. Smooth section transitions
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-active');
                
                // Update navbar active state
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Initialize all effects with error handling
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing interactive effects...');
    
    try {
        initParallax();
        console.log('Parallax initialized');
    } catch (e) {
        console.error('Parallax error:', e);
    }
    
    try {
        initCustomCursor();
        console.log('Custom cursor initialized');
    } catch (e) {
        console.error('Cursor error:', e);
    }
    
    try {
        initMagneticEffect();
        console.log('Magnetic effect initialized');
    } catch (e) {
        console.error('Magnetic error:', e);
    }
    
    try {
        initScrollAnimations();
        console.log('Scroll animations initialized');
    } catch (e) {
        console.error('Scroll animations error:', e);
    }
    
    try {
        initFloatingElements();
        console.log('Floating elements initialized');
    } catch (e) {
        console.error('Floating elements error:', e);
    }
    
    try {
        initTextReveal();
        console.log('Text reveal initialized');
    } catch (e) {
        console.error('Text reveal error:', e);
    }
    
    try {
        initSectionTransitions();
        console.log('Section transitions initialized');
    } catch (e) {
        console.error('Section transitions error:', e);
    }
    
    console.log('All effects initialized!');
});// 
Simple test animation to verify JavaScript is working
function testAnimation() {
    console.log('Testing animations...');
    
    // Add a simple pulsing effect to the hero title
    const heroTitle = document.querySelector('.hero-name');
    if (heroTitle) {
        heroTitle.style.animation = 'pulse 2s ease-in-out infinite';
        console.log('Hero title animation added');
    }
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transition = 'all 0.3s ease';
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.boxShadow = '0 20px 40px rgba(0, 122, 255, 0.3)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
        console.log(`Project card ${index + 1} hover effect added`);
    });
}

// Run test animation immediately
document.addEventListener('DOMContentLoaded', () => {
    testAnimation();
});