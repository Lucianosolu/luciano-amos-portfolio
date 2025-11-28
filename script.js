// Theme Switch Logic
document.addEventListener('DOMContentLoaded', () => {
    // Theme Switch
    const themeSwitch = document.getElementById('themeSwitch');
    const html = document.documentElement;

    if (themeSwitch) {
        const icon = themeSwitch.querySelector('i');

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            html.className = savedTheme;
            updateThemeIcon(savedTheme === 'dark');
        }

        themeSwitch.addEventListener('click', () => {
            const isDark = html.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcon(isDark);
        });
    }

    // Mobile Menu
    const btn = document.querySelector("button.mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");

    if (btn && menu) {
        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Initialize ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.reveal', {
            distance: '50px',
            duration: 1000,
            easing: 'ease-out',
            interval: 200
        });
    }

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // Scroll Indicator
    const sections = document.querySelectorAll('section');
    const scrollDots = document.querySelectorAll('.scroll-dot');

    if (sections.length > 0 && scrollDots.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            scrollDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.dataset.section === current) {
                    dot.classList.add('active');
                }
            });
        });
    }

    // Tooltips
    if (typeof tippy !== 'undefined') {
        tippy('[data-tippy-content]', {
            placement: 'top',
            animation: 'scale',
            duration: 200
        });
    }

    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    const pageContent = document.querySelector('.page-content');
    const progressBar = document.querySelector('.progress-bar');

    if (loadingScreen && progressBar) {
        let progress = 0;

        const updateProgress = () => {
            const increment = (100 - progress) / 10;
            progress += increment;
            progressBar.style.width = `${Math.min(progress, 100)}%`;

            if (progress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    if (pageContent) pageContent.classList.add('visible');
                    if (typeof AOS !== 'undefined') AOS.refresh();
                }, 500);
            }
        };

        requestAnimationFrame(updateProgress);

        // Preload images
        const images = document.querySelectorAll('img');
        let loadedImages = 0;

        const imageLoaded = () => {
            loadedImages++;
            progress = (loadedImages / images.length) * 100;
        };

        images.forEach(img => {
            if (img.complete) imageLoaded();
            else img.addEventListener('load', imageLoaded);
        });
    }



    // Tab Navigation Support
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });

    document.addEventListener('mousedown', function () {
        document.body.classList.remove('user-is-tabbing');
    });

    // Skill Progress Bars Animation
    const progressBars = document.querySelectorAll('.skill-progress-bar-fill');
    if (progressBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.getAttribute('data-width');
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            // Store the width in data attribute and set initial width to 0
            if (!bar.hasAttribute('data-width')) {
                bar.setAttribute('data-width', bar.style.width || '0%');
                bar.style.width = '0';
            }
            observer.observe(bar);
        });
    }

    // Certification Modal Logic
    const modal = document.getElementById('certModal');
    if (modal) {
        const modalImg = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.close-modal');

        // Function to open modal - attached to window so it can be called from HTML
        window.openModal = function (imgSrc) {
            modal.style.display = 'block';
            modalImg.src = imgSrc;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }

        // Close modal actions
        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        };

        if (closeBtn) {
            closeBtn.onclick = closeModal;
        }

        modal.onclick = function (event) {
            if (event.target === modal) {
                closeModal();
            }
        }

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }

    // Certification Card Hover Animation
    const certCards = document.querySelectorAll('.cert-card');
    if (certCards.length > 0) {
        certCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
});

function updateThemeIcon(isDark) {
    const icon = document.querySelector('.theme-switch i');
    if (icon) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}
