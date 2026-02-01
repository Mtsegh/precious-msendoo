// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initScrollEffects();
    initFormValidation();
    initAnimations();
});

/**
 * Mobile Menu Toggle Functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('show');
                // Change icon to X
                mobileMenuBtn.innerHTML = '<i class="fas fa-times text-2xl"></i>';
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                // Change icon back to bars
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            });
        });
    }
}

/**
 * Scroll Effects - Navbar background change on scroll
 */
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/**
 * Form Validation and Submission
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');
    
    const formSuccess = document.getElementById('form-success');

    // Real-time validation
    nameInput.addEventListener('blur', function() {
        validateName();
    });

    emailInput.addEventListener('blur', function() {
        validateEmail();
    });

    subjectInput.addEventListener('blur', function() {
        validateSubject();
    });

    messageInput.addEventListener('blur', function() {
        validateMessage();
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // Hide loading state
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Show success message
                formSuccess.classList.remove('hidden');
                
                // Reset form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(function() {
                    formSuccess.classList.add('hidden');
                }, 5000);

                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1500);
        }
    });

    /**
     * Validation Functions
     */
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            showError(nameInput, nameError, 'Please enter your name');
            return false;
        } else if (name.length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            return false;
        } else {
            hideError(nameInput, nameError);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailInput, emailError, 'Please enter your email address');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        } else {
            hideError(emailInput, emailError);
            return true;
        }
    }

    function validateSubject() {
        const subject = subjectInput.value.trim();
        
        if (subject === '') {
            showError(subjectInput, subjectError, 'Please enter a subject');
            return false;
        } else if (subject.length < 5) {
            showError(subjectInput, subjectError, 'Subject must be at least 5 characters');
            return false;
        } else {
            hideError(subjectInput, subjectError);
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (message === '') {
            showError(messageInput, messageError, 'Please enter your message');
            return false;
        } else if (message.length < 20) {
            showError(messageInput, messageError, 'Message must be at least 20 characters');
            return false;
        } else {
            hideError(messageInput, messageError);
            return true;
        }
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        input.classList.add('border-red-500');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    function hideError(input, errorElement) {
        input.classList.remove('error');
        input.classList.remove('border-red-500');
        errorElement.textContent = '';
        errorElement.classList.add('hidden');
    }
}

/**
 * Intersection Observer for Animations
 */
function initAnimations() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with specific classes
        const elementsToAnimate = document.querySelectorAll(
            '.competency-card, .service-card, .skill-card, .portfolio-item'
        );

        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
}

/**
 * Active Page Highlighting in Navigation
 */
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call on page load
highlightActivePage();

/**
 * Statistics Counter Animation (if stats are visible)
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card div:first-child');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize counter animation if stats exist
if (document.querySelector('.stat-card')) {
    animateCounters();
}

/**
 * Utility function to add smooth reveal animations
 */
function addScrollReveal() {
    const reveals = document.querySelectorAll('.fade-in, .fade-in-delay');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.15
    });
    
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

// Initialize scroll reveal
addScrollReveal();

/**
 * Prevent form resubmission on page reload
 */
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
