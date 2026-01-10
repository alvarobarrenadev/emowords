import '../sass/main.scss'
import { renderHome } from './views/home.js';
import { renderAdd } from './views/add.js';
import { renderReview } from './views/review.js';
import { getSettings, saveSettings } from './storage/vocabStorage.js';
import { showToast } from './utils/ui.js';

const app = document.getElementById('app');

// ==================== NOTIFICATIONS & ERROR HANDLING ====================

// Network Status
window.addEventListener('offline', () => {
  showToast('Sin conexión', 'Estás trabajando en modo offline.', 'warning', 5000);
  document.body.classList.add('offline-mode');
});

window.addEventListener('online', () => {
  showToast('Conexión restaurada', 'Tus cambios se guardarán correctamente.', 'success', 3000);
  document.body.classList.remove('offline-mode');
});

// Global Errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  showToast('Error inesperado', 'Ha ocurrido un error. Intenta recargar la página.', 'error', 0);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');

// ==================== THEME MANAGEMENT ====================

function initTheme() {
  const settings = getSettings();
  // Default to dark mode if no preference is set
  const theme = settings.theme || 'dark';
  
  setTheme(theme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update toggle icon
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-sun';
    themeToggle.title = 'Cambiar a modo claro';
  } else {
    icon.className = 'fa-solid fa-moon';
    themeToggle.title = 'Cambiar a modo oscuro';
  }
  
  // Save preference
  const settings = getSettings();
  settings.theme = theme;
  saveSettings(settings);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Add transition class for smooth theme change
  document.body.classList.add('theme-transitioning');
  setTheme(newTheme);
  
  setTimeout(() => {
    document.body.classList.remove('theme-transitioning');
  }, 300);
}

themeToggle.addEventListener('click', toggleTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const settings = getSettings();
  // Only auto-switch if user hasn't set a preference
  if (!settings.theme) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// ==================== NAVIGATION ====================

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
    
    // Scroll to top INSTANTLY avoiding smooth scroll conflicts
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    
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

// ==================== INITIALIZATION ====================

initTheme();
render('home');



// ==================== SERVICE WORKER ====================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Use Vite's base URL to construct the correct SW path
    const basePath = import.meta.env.BASE_URL || '/';
    const swPath = basePath + 'sw.js';
    
    navigator.serviceWorker.register(swPath)
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
