document.addEventListener('DOMContentLoaded', () => {
    // Schedule Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sessionCards = document.querySelectorAll('.session-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                sessionCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Quiz Logic
    const submitQuizBtn = document.getElementById('submit-quiz');
    const quizResult = document.getElementById('quiz-result');

    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', () => {
            const selectedOption = document.querySelector('input[name="quiz"]:checked');

            if (!selectedOption) {
                quizResult.textContent = 'Please select an answer.';
                quizResult.className = 'quiz-result incorrect';
                return;
            }

            if (selectedOption.value === 'style') {
                quizResult.textContent = 'Correct! The <style> tag is used for internal CSS.';
                quizResult.className = 'quiz-result correct';
                // Trigger confetti or celebration (mock)
            } else {
                quizResult.textContent = 'Incorrect. Try again!';
                quizResult.className = 'quiz-result incorrect';
            }
        });
    }

    // Enhance Dashboard (simple animation for progress bars on load)
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 1s ease-in-out';
        }, 100);
    });
});
