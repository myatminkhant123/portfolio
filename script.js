// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== MOBILE MENU TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Smooth scroll to section
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== CLOSE MOBILE MENU ON OUTSIDE CLICK =====
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbar.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });

    // ===== ACTIVE SECTION HIGHLIGHTING (OPTIONAL) =====
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
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
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ===== SCROLL REVEAL ANIMATION (ENHANCED) =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    // Use an IntersectionObserver that adds/removes an "in-view" class
    // so animations run every time an element enters the viewport.
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                el.classList.add('in-view');
            } else {
                el.classList.remove('in-view');
            }
        });
    }, observerOptions);

    // Observe elements and set staggered animation delays via inline style
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .about-content, .section, .highlight-box, .contact-link, .section-title, .skill-tag'
    );

    animatedElements.forEach((el, index) => {
        // remove any previously-set inline transforms so CSS controls initial state
        el.style.opacity = '';
        el.style.transform = '';
        // apply a shorter staggered animation-delay so elements animate in sequence faster
        el.style.animationDelay = `${index * 0.04}s`;
        observer.observe(el);
    });

    // Animation styles are moved into `style.css` for better caching and easier editing.

    // Manual motion and theme toggles removed per request.

    // ===== FORM SUBMISSION (IF YOU ADD A CONTACT FORM LATER) =====
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         // Handle form submission
    //         alert('Message sent! (This is a demo)');
    //     });
    // }

    // ===== LOG CONFIRMATION =====
    console.log('Portfolio website loaded successfully! 🚀');
});