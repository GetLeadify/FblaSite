document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initScheduleFilters();
    initQuiz();
    initDashboardAnimations();
});

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
