// =====================================================
// Muhammad Mutahhar Baig - Portfolio Interactions
// =====================================================

// ---------- Typed text effect in hero ----------
const roles = [
    'Electronics Engineer',
    'AI / ML Engineer',
    'Embedded Systems Developer',
    'Deep Learning Practitioner',
    'Edge AI Specialist'
];

const typedEl = document.getElementById('typedText');
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIdx];

    if (!isDeleting) {
        typedEl.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
    } else {
        typedEl.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
    }

    setTimeout(typeLoop, isDeleting ? 40 : 90);
}

typeLoop();

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('open');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});

// ---------- Navbar scroll effect ----------
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    let currentSection = '';

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// ---------- Counter animation for stats ----------
const counters = document.querySelectorAll('.stat-num');

function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const start = performance.now();

    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    }

    requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => statsObserver.observe(c));

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll('.section, .timeline-item, .project-card, .skill-category, .stat-card, .edu-card, .achievements, .contact-card');
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ---------- Contact form (mailto fallback) ----------
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(contactForm);
        const name = data.get('name');
        const email = data.get('email');
        const subject = data.get('subject');
        const message = data.get('message');

        const body = `Hi Mutahhar,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A— ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
        const mailto = `mailto:mutahharbaig215@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

        window.location.href = mailto;
        formNote.textContent = 'Opening your email client...';
        formNote.className = 'form-note success';

        setTimeout(() => {
            contactForm.reset();
            formNote.textContent = '';
        }, 4000);
    });
}

// ---------- Footer year ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
