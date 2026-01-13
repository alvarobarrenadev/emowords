import '../sass/main.scss'
import { renderHome } from './views/home.js';
import { renderAdd } from './views/add.js';
import { renderReview } from './views/review.js';
import { renderStats } from './views/stats.js';
import { getSettings, saveSettings, getWordsDueCount } from './storage/vocabStorage.js';
import { showToast } from './utils/ui.js';
import { getTTSSettings, saveTTSSettings, speak, getAccentLabel, getSpeedLabel } from './utils/tts.js';
import { startOnboarding, shouldShowOnboarding } from './components/onboarding.js';

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
const audioSettingsBtn = document.getElementById('audio-settings-btn');

// ==================== THEME MANAGEMENT ====================

function initTheme() {
  const settings = getSettings();
  // Check if user has a saved preference, otherwise use system preference
  if (settings.theme) {
    applyTheme(settings.theme);
  } else {
    // Detect system preference
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(systemTheme);
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update toggle icon
  // Note: themeToggle might be null if script runs before DOM (though here it's deferred/module)
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
        themeToggle.title = 'Cambiar a modo claro';
      } else {
        icon.className = 'fa-solid fa-moon';
        themeToggle.title = 'Cambiar a modo oscuro';
      }
    }
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Add transition class for smooth theme change
  document.body.classList.add('theme-transitioning');
  applyTheme(newTheme);
  
  // Save user preference explicitly when they toggle
  const settings = getSettings();
  settings.theme = newTheme;
  saveSettings(settings);
  
  setTimeout(() => {
    document.body.classList.remove('theme-transitioning');
  }, 300);
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const settings = getSettings();
  // Only auto-switch if user hasn't manually set a preference
  if (!settings.theme) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// ==================== NAVIGATION ====================

// Update review badge with pending words count
function updateReviewBadge() {
  const badge = document.getElementById('review-badge');
  if (!badge) return;
  
  const count = getWordsDueCount();
  if (count > 0) {
    badge.textContent = count > 99 ? '99+' : count;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

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
      case 'stats':
        renderStats(app);
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
    
    // Update badge after view renders
    updateReviewBadge();
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

// Logo click handler (navigate to home)
const logo = document.querySelector('.logo');
if (logo && logo.dataset.view) {
  logo.addEventListener('click', e => {
    e.preventDefault();
    render(logo.dataset.view);
  });
}

// ==================== INITIALIZATION ====================

initTheme();
initAudioSettings();
updateReviewBadge();
render('home');

// Start onboarding for new users (delay to ensure DOM is ready)
setTimeout(() => {
  if (shouldShowOnboarding()) {
    startOnboarding();
  }
}, 500);

// ==================== AUDIO SETTINGS ====================

function initAudioSettings() {
  if (audioSettingsBtn) {
    audioSettingsBtn.addEventListener('click', openAudioSettingsModal);
  }
}

function openAudioSettingsModal() {
  // Remove existing modal
  document.querySelector('.audio-settings-modal')?.remove();
  
  const currentSettings = getTTSSettings();
  
  const modal = document.createElement('div');
  modal.className = 'audio-settings-modal edit-modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content" style="max-width: 420px;">
      <div class="modal-header">
        <h3><i class="fa-solid fa-volume-high"></i> Configuración de Audio</h3>
        <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
      </div>
      
      <div class="audio-settings-body">
        <!-- Accent Selection -->
        <div class="settings-section">
          <label class="settings-label"><i class="fa-solid fa-globe"></i> Acento</label>
          <div class="accent-options">
            <button class="accent-option ${currentSettings.accent === 'en-US' ? 'active' : ''}" data-accent="en-US">
              <span class="flag">🇺🇸</span>
              <span class="label">Americano</span>
            </button>
            <button class="accent-option ${currentSettings.accent === 'en-GB' ? 'active' : ''}" data-accent="en-GB">
              <span class="flag">🇬🇧</span>
              <span class="label">Británico</span>
            </button>
          </div>
        </div>
        
        <!-- Speed Selection -->
        <div class="settings-section">
          <label class="settings-label"><i class="fa-solid fa-gauge"></i> Velocidad</label>
          <div class="speed-options">
            <button class="speed-option ${currentSettings.speed <= 0.7 ? 'active' : ''}" data-speed="0.6">
              <i class="fa-solid fa-hourglass-start"></i>
              <span>Lento</span>
            </button>
            <button class="speed-option ${currentSettings.speed > 0.7 && currentSettings.speed <= 1.1 ? 'active' : ''}" data-speed="1">
              <i class="fa-solid fa-person-walking"></i>
              <span>Normal</span>
            </button>
            <button class="speed-option ${currentSettings.speed > 1.1 ? 'active' : ''}" data-speed="1.3">
              <i class="fa-solid fa-person-running"></i>
              <span>Rápido</span>
            </button>
          </div>
        </div>
        
        <!-- Preview -->
        <div class="settings-section preview-section">
          <button class="preview-btn" id="preview-audio">
            <i class="fa-solid fa-play"></i> Probar pronunciación
          </button>
        </div>
      </div>
      
      <div class="modal-actions">
        <button type="button" class="btn-cancel">Cerrar</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Animate in
  requestAnimationFrame(() => {
    modal.classList.add('active');
  });
  
  // Close handlers
  const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  };
  
  modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.querySelector('.btn-cancel').addEventListener('click', closeModal);
  
  // Accent selection
  modal.querySelectorAll('.accent-option').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.querySelectorAll('.accent-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      saveTTSSettings({ accent: btn.dataset.accent });
      showToast('Acento actualizado', getAccentLabel(btn.dataset.accent), 'success');
    });
  });
  
  // Speed selection
  modal.querySelectorAll('.speed-option').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.querySelectorAll('.speed-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const speed = parseFloat(btn.dataset.speed);
      saveTTSSettings({ speed });
      showToast('Velocidad actualizada', getSpeedLabel(speed), 'success');
    });
  });
  
  // Preview button
  modal.querySelector('#preview-audio').addEventListener('click', () => {
    speak('Hello, how are you today?');
  });
  
  // Escape key
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  });
}



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
