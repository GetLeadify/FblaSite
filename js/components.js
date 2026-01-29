document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
});

function loadHeader() {
    const headerHTML = `
        <div class="container">
            <nav>
                <a href="index.html" class="logo">DevHub</a>
                <div class="menu-toggle" id="mobile-menu" aria-label="Toggle navigation">
                    <span class="bar">☰</span>
                </div>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="dashboard.html">Dashboard</a></li>
                    <li><a href="schedule.html">Schedule</a></li>
                    <li><a href="resources.html">Resources</a></li>
                </ul>
            </nav>
        </div>
    `;
    const headerElement = document.querySelector('header');
    if (headerElement) {
        headerElement.innerHTML = headerHTML;

        // Initialize mobile menu listener after injecting HTML
        initMobileMenu();
    }
}

function loadFooter() {
    const footerHTML = `
        <div class="container">
            <p>&copy; 2025 DevHub. Created by Students, for Students.</p>
        </div>
    `;
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
    }
}

function initMobileMenu() {
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}
