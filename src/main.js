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
  setActive(view);
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
}

// Enlazar clicks
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const view = link.dataset.view;
    render(view);
  });
});

// Carga inicial
render('home');