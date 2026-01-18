import { renderStats } from './stats.js';
import { getTTSSettings, saveTTSSettings, speak, getAccentLabel, getSpeedLabel } from '../utils/tts.js';
import { showToast } from '../utils/ui.js';

export function renderSettings(container) {
  // Clear container
  container.innerHTML = '';
  
  // Create Main Layout
  const settingsContainer = document.createElement('div');
  settingsContainer.className = 'settings-view animate__animated animate__fadeIn';
  
  settingsContainer.innerHTML = `
    <!-- Settings Header with Tabs -->
    <header class="settings-header">
      <div class="header-title">
        <h1><i class="fa-solid fa-gear"></i> Ajustes</h1>
        <p class="subtitle">Gestiona tu experiencia y visualiza tu progreso</p>
      </div>
      
      <div class="settings-tabs">
        <button class="tab-btn active" data-tab="stats">
          <i class="fa-solid fa-chart-pie"></i> Estadísticas
        </button>
        <button class="tab-btn" data-tab="audio">
          <i class="fa-solid fa-sliders"></i> Configuración
        </button>
      </div>
    </header>

    <div class="settings-content-wrapper">
      
      <!-- TAB: STATS (Default) -->
      <div id="tab-stats" class="tab-content active">
        <!-- Stats will be rendered here -->
      </div>

      <!-- TAB: AUDIO & CONFIG -->
      <div id="tab-audio" class="tab-content">
        <div class="config-grid">
          
          <!-- Audio Card -->
          <section class="settings-card">
            <div class="card-header">
              <h3><i class="fa-solid fa-volume-high"></i> Audio</h3>
              <span class="card-badge">TTS</span>
            </div>
            <div class="settings-body">
              <p class="settings-desc">Personaliza la voz y velocidad de pronunciación.</p>
              
              <!-- Accent -->
              <div class="settings-control-group">
                <label class="control-label">Acento</label>
                <div class="accent-selector">
                  <button class="selector-btn" data-accent="en-US">
                    <span class="flag">🇺🇸</span> US
                  </button>
                  <button class="selector-btn" data-accent="en-GB">
                    <span class="flag">🇬🇧</span> UK
                  </button>
                </div>
              </div>

              <!-- Speed -->
              <div class="settings-control-group">
                <label class="control-label">Velocidad</label>
                <div class="speed-selector">
                  <button class="selector-btn" data-speed="0.7">
                    🐢 Lento
                  </button>
                  <button class="selector-btn" data-speed="1">
                    🎯 Normal
                  </button>
                  <button class="selector-btn" data-speed="1.3">
                    🐇 Rápido
                  </button>
                </div>
              </div>

              <!-- Preview -->
              <div class="settings-action">
                <button class="btn-primary-outline w-full" id="preview-audio-page">
                  <i class="fa-solid fa-play"></i> Probar Voz
                </button>
              </div>
            </div>
          </section>

          <!-- App Settings Card (Future proofing) -->
          <section class="settings-card">
            <div class="card-header">
              <h3><i class="fa-solid fa-mobile-screen"></i> Aplicación</h3>
            </div>
            <div class="settings-body">
              <div class="settings-item-row icon-only">
                <div class="item-info">
                  <span class="item-title">Modo Oscuro</span>
                  <span class="item-desc">Cambiar apariencia</span>
                </div>
                <button id="settings-theme-toggle" class="icon-btn">
                  <i class="fa-solid fa-moon"></i>
                </button>
              </div>
              
              <div class="divider"></div>

              <div class="settings-item-row">
                <div class="item-info">
                  <span class="item-title">Notificaciones</span>
                  <span class="item-desc">Gestionar alertas</span>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked disabled>
                  <span class="slider"></span>
                </label>
              </div>
              
              <div class="divider"></div>
              
              <div class="app-version">
                <span>EmoWords v1.2.0</span>
              </div>
            </div>
          </section>

        </div>
      </div>
      
    </div>
  `;

  container.appendChild(settingsContainer);

  // Initialize Tabs
  initTabs(settingsContainer);

  // Initialize Audio Logic
  initAudioControls(settingsContainer);
  
  // Initialize Theme Toggle Logic
  initThemeControl(settingsContainer);

  // Initialize Stats
  const statsContainer = settingsContainer.querySelector('#tab-stats');
  renderStats(statsContainer);
}

function initTabs(container) {
  const tabs = container.querySelectorAll('.tab-btn');
  const contents = container.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Add to current
      tab.classList.add('active');
      const targetId = `tab-${tab.dataset.tab}`;
      const targetContent = container.querySelector(`#${targetId}`);
      if (targetContent) {
        targetContent.classList.add('active');
        // If switching to stats, maybe trigger a refresh layout if needed? 
        // usually not needed with simple toggle
      }
    });
  });
}

function initThemeControl(container) {
  const themeBtn = container.querySelector('#settings-theme-toggle');
  if (themeBtn) {
    // Sync initial state
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    updateThemeIcon(themeBtn, isDark);

    themeBtn.addEventListener('click', () => {
      // Trigger the global theme toggle click
      const globalToggle = document.getElementById('theme-toggle');
      if (globalToggle) globalToggle.click();
      
      // Update local icon after short delay to allow transition
      setTimeout(() => {
        const newIsDark = document.documentElement.getAttribute('data-theme') === 'dark';
        updateThemeIcon(themeBtn, newIsDark);
      }, 50);
    });
  }
}

function updateThemeIcon(btn, isDark) {
  const icon = btn.querySelector('i');
  if (isDark) {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
}

function initAudioControls(container) {
  const currentSettings = getTTSSettings();
  // Highlight active speed & accent
  container.querySelectorAll(`.speed-selector .selector-btn[data-speed="${currentSettings.speed}"]`).forEach(btn => btn.classList.add('active'));
  container.querySelectorAll(`.accent-selector .selector-btn[data-accent="${currentSettings.accent}"]`).forEach(btn => btn.classList.add('active'));

  // Speed click
  container.querySelectorAll('.speed-selector .selector-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.speed-selector .selector-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const speed = parseFloat(btn.dataset.speed);
      saveTTSSettings({ speed });
      showToast('Velocidad actualizada', getSpeedLabel(speed), 'success');
    });
  });

  // Accent click
  container.querySelectorAll('.accent-selector .selector-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.accent-selector .selector-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      saveTTSSettings({ accent: btn.dataset.accent });
      showToast('Acento actualizado', getAccentLabel(btn.dataset.accent), 'success');
    });
  });

  // Preview click
  const previewBtn = container.querySelector('#preview-audio-page');
  if (previewBtn) {
    previewBtn.addEventListener('click', () => {
      speak('Hello! Learning English is amazing with EmoWords.');
    });
  }
}
