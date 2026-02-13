document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initScheduleFilters();
    initQuiz();
    initDashboardAnimations();
    initTheme();
    initTilt();
});

function initTilt() {
    const cards = document.querySelectorAll('.card, .feature-card, .testimonial-card, .resource-card, .session-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Speed up transform for responsiveness, keep others slow
            card.style.transition = 'transform 0.1s ease-out, box-shadow 0.4s ease-out';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Subtle tilt: max 3 degrees
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            // Apply transform with lift
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            // Revert transition to smooth out the return
            card.style.transition = 'all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)';
            card.style.transform = ''; // Revert to CSS hover state or default
        });
    });
}

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme');

    // Default to dark if no preference and system is dark, or if stored is dark
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeIcon(false);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateThemeIcon(false);
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcon(true);
            }
        });
    }
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    if (isDark) {
        // Show Sun icon (to switch to light)
        themeToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    } else {
        // Show Moon icon (to switch to dark)
        themeToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }
}

function initScrollAnimations() {
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.hero, .feature-card, .testimonial-card, .card, .session-card, .resource-card, .quiz-section, .profile-card, .dashboard-grid section'
    );

    // Add reveal class to all targeted elements
    animatedElements.forEach(el => el.classList.add('reveal'));

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

function initScheduleFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sessionCards = document.querySelectorAll('.session-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                sessionCards.forEach(card => {
                    // Reset animation for re-filtering
                    card.classList.remove('active');
                    card.style.display = 'none'; // Hide first to allow reflow

                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'flex';
                        // Small delay to allow display change before adding active for transition
                        setTimeout(() => card.classList.add('active'), 50);
                    }
                });
            });
        });
    }
}

function initQuiz() {
    const submitQuizBtn = document.getElementById('submit-quiz');
    const quizResult = document.getElementById('quiz-result');

    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', () => {
            const selectedOption = document.querySelector('input[name="quiz"]:checked');
            const options = document.querySelectorAll('.option');

            // Reset previous styles
            options.forEach(opt => opt.style.borderColor = '');

            if (!selectedOption) {
                quizResult.textContent = 'Please select an answer.';
                quizResult.className = 'quiz-result incorrect';
                return;
            }

            const parentOption = selectedOption.closest('.option');

            if (selectedOption.value === 'style') {
                quizResult.textContent = 'Correct! The <style> tag is used for internal CSS.';
                quizResult.className = 'quiz-result correct';
                parentOption.style.borderColor = 'var(--success)';
            } else {
                quizResult.textContent = 'Incorrect. Try again!';
                quizResult.className = 'quiz-result incorrect';
                parentOption.style.borderColor = 'var(--danger)';
            }
        });
    }
}

function initDashboardAnimations() {
    const progressBars = document.querySelectorAll('.progress-bar');
    if (progressBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('style').match(/width:\s*(\d+%)/)[1];
                    // Reset width to 0 to trigger transition
                    entry.target.style.width = '0%';
                    // Force reflow
                    entry.target.offsetHeight;
                    // Set actual width
                    entry.target.style.width = width;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));
    }
}
