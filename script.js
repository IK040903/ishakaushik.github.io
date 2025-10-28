// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
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

// ===== BACK TO TOP BUTTON =====
// Create button element
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

// Scroll to top when clicked
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== HIGHLIGHT CURRENT SECTION IN VIEW =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('a[href^="#"]');

function highlightNavigation() {
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// ===== ANIMATE ELEMENTS ON SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe all major sections and items
document.querySelectorAll('.section-list li, .news-item, .miscs-item').forEach(el => {
  observer.observe(el);
});

// ===== COPY EMAIL ON CLICK =====
const emailLinks = document.querySelectorAll('a[href*="@"]');
emailLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.href.startsWith('mailto:')) {
      return; // Let mailto links work normally
    }
    e.preventDefault();
    const email = link.href || link.textContent;
    navigator.clipboard.writeText(email).then(() => {
      // Show temporary feedback
      const originalText = link.textContent;
      link.textContent = 'Copied!';
      setTimeout(() => {
        link.textContent = originalText;
      }, 1500);
    });
  });
});

// ===== EXTERNAL LINKS OPEN IN NEW TAB =====
document.querySelectorAll('a[href^="http"]').forEach(link => {
  if (!link.hasAttribute('target')) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  }
});

console.log('🎉 Site loaded successfully!');
