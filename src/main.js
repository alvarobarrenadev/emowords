import './styles.css'
import { renderHome } from './views/home.js';
import { renderAdd } from './views/add.js';
import { renderReview } from './views/review.js';

const app = document.getElementById('app');
const navLinks = document.querySelectorAll('.nav-link');

function setActive(view) {
  navLinks.forEach(link => {
    if (link.dataset.view === view) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function render(view) {
  // Cleanup previous view if needed
  if (window._reviewCleanup) {
    window._reviewCleanup();
    window._reviewCleanup = null;
  }
  
  setActive(view);
  
  // Add fade transition
  app.style.opacity = '0';
  app.style.transform = 'translateY(10px)';
  
  setTimeout(() => {
    switch (view) {
      case 'home':
        renderHome(app);
        break;
      case 'add':
        renderAdd(app);
        break;
      case 'review':
        renderReview(app);
        break;
      default:
        app.innerHTML = '<p>Vista no encontrada</p>';
    }
    
    // Fade in
    requestAnimationFrame(() => {
      app.style.opacity = '1';
      app.style.transform = 'translateY(0)';
    });
  }, 150);
}

// Add transition styles to #app
app.style.transition = 'opacity 0.15s ease, transform 0.15s ease';

// Navigation click handler
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const view = link.dataset.view;
    render(view);
  });
});

// Initial load
render('home');