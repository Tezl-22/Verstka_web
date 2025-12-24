document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

function animateCounter() {
    const counterSegments = document.querySelectorAll('.counter-segment span');
    const targetValue = 230025;

    let currentValue = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 16);

    function updateCounter() {
        currentValue += increment;

        if (currentValue >= targetValue) {
            currentValue = targetValue;
        }

        const valueStr = Math.floor(currentValue).toString().padStart(6, '0');

        if (counterSegments.length >= 3) {
            counterSegments[0].textContent = valueStr.substring(0, 2);
            counterSegments[1].textContent = valueStr.substring(2, 5);
            counterSegments[2].textContent = valueStr.substring(5, 8);
        }

        if (currentValue < targetValue) {
            requestAnimationFrame(updateCounter);
        }
    }

    updateCounter();
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const counterElement = document.querySelector('.counter');
if (counterElement) {
    counterObserver.observe(counterElement);
}

const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');

        if (nameInput.value && emailInput.value) {
            alert('Дякуємо за підписку! Ви отримаєте наші новини на ' + emailInput.value);
            nameInput.value = '';
            emailInput.value = '';
        }
    });
}

const fadeElements = document.querySelectorAll('.content-block, .message-content, .newsletter-content');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

const createMobileMenu = () => {
    const header = document.querySelector('.header .container');
    const nav = document.querySelector('.nav');

    if (window.innerWidth <= 968) {
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        `;

        menuButton.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '70px';
            nav.style.right = '20px';
            nav.style.background = 'white';
            nav.style.padding = '20px';
            nav.style.borderRadius = '10px';
            nav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });

        if (!header.querySelector('.mobile-menu-toggle')) {
            header.appendChild(menuButton);
        }
    }
};

window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroDecoration = document.querySelector('.hero-decoration');

    if (heroDecoration) {
        heroDecoration.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
