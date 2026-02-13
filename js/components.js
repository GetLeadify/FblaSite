document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    setActiveNavLink();
});

function loadHeader() {
    // SVG Icons for modern look
    const menuIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;

    const headerHTML = `
        <div class="container">
            <nav>
                <a href="index.html" class="logo">DevHub.</a>
                <div class="menu-toggle" id="mobile-menu" aria-label="Toggle navigation">
                    ${menuIcon}
                </div>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="dashboard.html">Dashboard</a></li>
                    <li><a href="schedule.html">Schedule</a></li>
                    <li><a href="resources.html">Resources</a></li>
                    <li>
                        <button id="theme-toggle" class="theme-btn" aria-label="Toggle Dark Mode">
                            <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    `;
    const headerElement = document.querySelector('header');
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
        initMobileMenu();
    }
}

function loadFooter() {
    const year = new Date().getFullYear();
    const footerHTML = `
        <div class="container">
            <p>&copy; ${year} DevHub. Designed for the Future of Learning.</p>
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

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    // Wait a brief moment for header to be injected if needed, though usually sequential
    // Since loadHeader is synchronous, we can just run this.
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}
