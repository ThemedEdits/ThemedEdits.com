document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Toggle body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Dropdown functionality for mobile
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');

        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');

                // Close other dropdowns when opening a new one
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });

    // Close mobile menu when clicking outside or on a link
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 992) {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.menu-toggle')) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }

            if (e.target.closest('.nav-link') && !e.target.closest('.dropdown')) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Sticky navbar on scroll
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    const scrollOffset = 100;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > scrollOffset) {
            navbar.classList.add('scrolled');
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.classList.remove('scrolled');
            header.style.backgroundColor = 'transparent';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            // Reset mobile menu if window is resized to desktop size
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';

            // Reset dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});


// Animated counter for stats
const statNumbers = document.querySelectorAll('.stat-number');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-count');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCount = () => {
                    current += step;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target;
                    }
                };

                updateCount();
            });
            observer.disconnect();
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.hero-stats'));


// Hero Slider Functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Reset timer when manually navigating
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Start auto-sliding
    slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    const slider = document.querySelector('.hero-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initHeroSlider);


// Animated Counter for Stats
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stats-grid .stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = +stat.getAttribute('data-count');
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCount = () => {
                        current += step;
                        if (current < target) {
                            stat.textContent = Math.floor(current);
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = target;
                        }
                    };

                    updateCount();
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    if (statNumbers.length > 0) {
        observer.observe(document.querySelector('.stats-grid'));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initStatsCounter();
});


new Swiper(".wrapper", {
    loop: true,
    spaceBetween: 30,

    // Autoplay
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    // Pagination bullets
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    // Responsive breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 2,
        },
    },
});

// back to top button goes here //
document.addEventListener('DOMContentLoaded', function () {
    const backToTop = document.getElementById('backToTop');
    const progressCircle = document.querySelector('.progress-ring-circle');
    const circumferenceDesktop = 2 * Math.PI * 22;  // Desktop circle radius
    const circumferenceMobile = 2 * Math.PI * 20;   // Mobile circle radius

    function updateProgress() {
        const isMobile = window.innerWidth <= 768;
        const radius = isMobile ? 20 : 22; // Mobile vs Desktop radius
        const circumference = isMobile ? circumferenceMobile : circumferenceDesktop;

        // Set circle stroke values
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;

        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = scrollTop / scrollHeight;
        const offset = circumference * (1 - Math.min(scrollProgress, 1));

        progressCircle.style.strokeDashoffset = offset;

        // Show or hide the button
        if (scrollTop > 50) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Update progress on scroll
    window.addEventListener('scroll', updateProgress);

    // Update progress on window resize (for responsive adjustments)
    window.addEventListener('resize', updateProgress);

    // Initial call to set progress
    updateProgress();

    // Smooth scroll to top when clicked
    backToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


// FadeInUp animations goes here //
document.addEventListener('DOMContentLoaded', function () {
    const divs = document.querySelectorAll('.profile-display, .value-item, .availability, .social-links, .info-item, .form-row, .form-group, .submit-btn, .about-card, .profile-social, .profile-header, h2, .section-subtitle, .container.swiper, .card-icon, .footer-grid, .skills-category, .client-logo');

    divs.forEach(div => {
        div.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the element is a value-item, apply staggered delays to all its siblings
                if (entry.target.classList.contains('value-item')) {
                    const siblings = entry.target.parentElement.querySelectorAll('.value-item');
                    siblings.forEach((sibling, index) => {
                        sibling.style.transitionDelay = `${index * 0.3}s`; // Animation delay
                        sibling.classList.add('active');
                    });
                } else {
                    // Normal behavior for other divs
                    entry.target.classList.add('active');
                }
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.3 // 10% of element visible triggers animation
    });

    divs.forEach(div => {
        observer.observe(div);
    });
});


// Skills Animation
document.addEventListener('DOMContentLoaded', function () {
    const skillItems = document.querySelectorAll('.skill-item');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const percentElement = entry.target.querySelector('.skill-percent');
                const targetWidth = progressBar.getAttribute('data-width');

                // Animate progress bar
                progressBar.style.width = targetWidth + '%';

                // Animate counter
                let currentPercent = 0;
                const targetPercent = parseInt(targetWidth);
                const increment = targetPercent / 50;

                const timer = setInterval(() => {
                    currentPercent += increment;
                    if (currentPercent >= targetPercent) {
                        currentPercent = targetPercent;
                        clearInterval(timer);
                    }
                    percentElement.textContent = Math.round(currentPercent) + '%';
                }, 20);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        observer.observe(item);
    });
});



// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Animation on scroll
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    portfolioCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        portfolioObserver.observe(card);
    });
});




    document.getElementById("hireForm").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent actual form submission

        // Get form values
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const company = document.getElementById("company").value;
        const phone = document.getElementById("phone").value;
        const category = document.querySelectorAll("#projectType")[0].value;
        const plan = document.querySelectorAll("#projectType")[1].value;
        const projectName = document.getElementById("projectName").value;
        const projectDetails = document.getElementById("projectDetails").value;

        // Create subject & body
        const subject = encodeURIComponent(`New Project Inquiry: ${projectName}`);
        const body = encodeURIComponent(
            `Name: ${firstName} ${lastName}\n` +
            `Email: ${email}\n` +
            `Company: ${company}\n` +
            `Phone: ${phone}\n` +
            `Project Category: ${category}\n` +
            `Plan Selected: ${plan}\n\n` +
            `Project Name: ${projectName}\n` +
            `Details:\n${projectDetails}`
        );

        // Construct mailto link
        const mailtoLink = `mailto:themed.edits.co@gmail.com?subject=${subject}&body=${body}`;

        // Open mail client
        window.location.href = mailtoLink;
    });
