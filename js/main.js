// Landing Screen Curtain Animation ("Hello, I am Sasindi Maneesha")
window.addEventListener('DOMContentLoaded', () => {
  const curtain = document.getElementById('landingCurtain');
  if (curtain) {
    // Wait for greeting sequence and progress bar to finish (approx 2.2s)
    setTimeout(() => {
      curtain.classList.add('hide');
      // Remove from layout after slide-up transition finishes
      setTimeout(() => {
        curtain.style.display = 'none';
      }, 900);
    }, 2200);
  }
});

// Sticky navigation state
const headerNav = document.getElementById('headerNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    headerNav.classList.add('scrolled');
  } else {
    headerNav.classList.remove('scrolled');
  }
}, { passive: true });

// Mobile toggle menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// Animate numbers counting up
function runCounter(el) {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out cubic calculation
    const easeOutVal = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.round(target * easeOutVal);

    el.textContent = currentVal + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    }
  }

  requestAnimationFrame(updateCount);
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Check for counters inside this section
      const counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(counter => runCounter(counter));

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
  revealObserver.observe(el);
});
