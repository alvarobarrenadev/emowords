import { getStatistics, getAllWords } from '../storage/vocabStorage.js';
import { getAchievementsSummary, getAllAchievementsWithStatus, checkAchievements } from '../storage/achievements.js';
import { getStatsForAchievements } from '../storage/gamification.js';

export function renderStats(container) {
  const allWords = getAllWords();
  const stats = getStatistics();
  
  // Clean up container
  container.innerHTML = '';
  container.className = 'stats-view animate__animated animate__fadeIn';

  if (stats.total === 0) {
    renderEmptyState(container);
    return;
  }

  // --- Calculations ---

  // 1. Mastery Score (Weighted Average)
  let totalMasteryPoints = 0;
  let masteryBreakdown = { master: 0, guru: 0, apprentice: 0, new: 0 };

  allWords.forEach(w => {
    const wins = w.correctCount || 0;
    if (wins >= 10) { totalMasteryPoints += 100; masteryBreakdown.master++; }
    else if (wins >= 5) { totalMasteryPoints += 75; masteryBreakdown.guru++; }
    else if (wins >= 2) { totalMasteryPoints += 40; masteryBreakdown.apprentice++; }
    else { totalMasteryPoints += 10; masteryBreakdown.new++; }
  });
  
  const masteryScore = stats.total > 0 ? Math.round(totalMasteryPoints / stats.total) : 0;

  // 2. Growth Chart Data
  const growthData = calculateGrowthData(allWords);

  // 3. Struggling Words
  const strugglingWords = getStrugglingWords(allWords);

  // 4. Achievements (Sync Check first)
  checkAchievements(getStatsForAchievements(stats)); // Force update unlocked list based on current stats
  const achievementsSummary = getAchievementsSummary();
  const allAchievements = getAllAchievementsWithStatus();
  const recentAchievements = allAchievements.slice(0, 8);

  // 5. Prediction
  const prediction = calculatePrediction(allWords, growthData);

  // --- NEW HTML Template ---
  
  const html = `
    <!-- Hero Section: Grade + 3 KPIs -->
    <section class="stats-hero">
      <div class="hero-grade ${getGradeColorClass(masteryScore)}">
        <span class="grade-letter">${getGradeLetter(masteryScore)}</span>
      </div>
      <div class="hero-kpis">
        <div class="kpi-item">
          <div class="kpi-icon words"><i class="fa-solid fa-book-open"></i></div>
          <div class="kpi-data">
            <span class="kpi-value">${stats.total}</span>
            <span class="kpi-label">Palabras</span>
          </div>
          <div class="kpi-mini-chart">${renderMiniSparkline(growthData)}</div>
        </div>
        <div class="kpi-item">
          <div class="kpi-icon mastery"><i class="fa-solid fa-brain"></i></div>
          <div class="kpi-data">
            <span class="kpi-value">${masteryScore}%</span>
            <span class="kpi-label">Dominio</span>
          </div>
          <div class="kpi-ring" style="--percent: ${masteryScore}">
            <svg viewBox="0 0 36 36">
              <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path class="ring-fill" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
          </div>
        </div>
        <div class="kpi-item">
          <div class="kpi-icon accuracy"><i class="fa-solid fa-bullseye"></i></div>
          <div class="kpi-data">
            <span class="kpi-value">${stats.retentionRate}%</span>
            <span class="kpi-label">Precisión</span>
          </div>
          <div class="kpi-progress">
            <div class="progress-fill" style="width: ${stats.retentionRate}%"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Dashboard Grid -->
    <div class="stats-grid">
      <!-- Left Column -->
      <div class="stats-column-main">
        <!-- Learning Curve Chart -->
        <div class="stats-card chart-card">
          <div class="card-header">
            <h3><i class="fa-solid fa-chart-line"></i> Curva de Aprendizaje</h3>
            <span class="card-badge">Histórico</span>
          </div>
          <div class="chart-container">
            ${renderGrowthChart(growthData)}
          </div>
        </div>

        <!-- Activity Heatmap -->
        <div class="stats-card heatmap-card">
          <div class="card-header">
            <h3><i class="fa-solid fa-calendar-days"></i> Actividad de Estudio</h3>
            <span class="card-badge">3 meses</span>
          </div>
          <div class="heatmap-wrapper">
            ${renderActivityHeatmap(allWords)}
          </div>
          <div class="heatmap-legend">
            <span>Menos</span>
            <div class="legend-squares">
              <div class="sq level-0"></div>
              <div class="sq level-1"></div>
              <div class="sq level-2"></div>
              <div class="sq level-3"></div>
              <div class="sq level-4"></div>
            </div>
            <span>Más</span>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="stats-column-side">
        <!-- Mastery Levels -->
        <div class="stats-card levels-card">
          <div class="card-header">
            <h3><i class="fa-solid fa-layer-group"></i> Progreso por Nivel</h3>
          </div>
          <div class="levels-list">
            <div class="level-row master">
              <span class="level-name">Maestro</span>
              <div class="level-bar"><div class="bar-fill" style="width: ${getPercent(masteryBreakdown.master, stats.total)}%"></div></div>
              <span class="level-count">${masteryBreakdown.master}</span>
            </div>
            <div class="level-row guru">
              <span class="level-name">Experto</span>
              <div class="level-bar"><div class="bar-fill" style="width: ${getPercent(masteryBreakdown.guru, stats.total)}%"></div></div>
              <span class="level-count">${masteryBreakdown.guru}</span>
            </div>
            <div class="level-row apprentice">
              <span class="level-name">Aprendiz</span>
              <div class="level-bar"><div class="bar-fill" style="width: ${getPercent(masteryBreakdown.apprentice, stats.total)}%"></div></div>
              <span class="level-count">${masteryBreakdown.apprentice}</span>
            </div>
            <div class="level-row new">
              <span class="level-name">Nuevo</span>
              <div class="level-bar"><div class="bar-fill" style="width: ${getPercent(masteryBreakdown.new, stats.total)}%"></div></div>
              <span class="level-count">${masteryBreakdown.new}</span>
            </div>
          </div>
        </div>

        <!-- Struggling Words (Collapsible) -->
        ${strugglingWords.length > 0 ? `
        <div class="stats-card struggling-card">
          <div class="card-header">
            <h3><i class="fa-solid fa-triangle-exclamation"></i> Palabras Difíciles</h3>
            <button class="collapse-btn" aria-label="Expandir/Colapsar">
              <i class="fa-solid fa-chevron-up"></i>
            </button>
          </div>
          <div class="struggling-list">
            ${strugglingWords.slice(0, 4).map(w => `
              <div class="struggling-item">
                <span class="word">${w.word}</span>
                <span class="error-count">${w.incorrectCount} errores</span>
              </div>
            `).join('')}
            ${strugglingWords.length > 4 ? `<a href="#" class="see-more">Ver más</a>` : ''}
          </div>
        </div>
        ` : ''}

        <!-- Achievements Mini -->
        <div class="stats-card achievements-card">
          <div class="card-header">
            <h3><i class="fa-solid fa-trophy"></i> Logros</h3>
            <span class="achievements-count">${achievementsSummary.unlocked}/${achievementsSummary.total}</span>
          </div>
          <div class="achievements-grid-mini">
            ${recentAchievements.map(a => `
              <div class="achievement-icon ${a.unlocked ? 'unlocked' : 'locked'}" title="${a.name}: ${a.description}">
                <i class="fa-solid ${a.icon}"></i>
              </div>
            `).join('')}
          </div>
          <button class="btn-link" id="view-all-achievements">Ver todos los logros →</button>
        </div>
      </div>
    </div>

    <!-- Projection Banner -->
    ${prediction ? `
    <div class="projection-banner">
      <i class="fa-solid fa-rocket"></i>
      <span>${prediction}</span>
    </div>
    ` : ''}
  `;

  container.innerHTML = html;

  // Event listeners
  setupEventListeners(container);
}

// --- Event Listeners ---
function setupEventListeners(container) {
  // Collapse buttons
  container.querySelectorAll('.collapse-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.stats-card');
      card.classList.toggle('collapsed');
      const icon = btn.querySelector('i');
      icon.classList.toggle('fa-chevron-up');
      icon.classList.toggle('fa-chevron-down');
    });
  });

  // View all achievements button
  const viewAllBtn = container.querySelector('#view-all-achievements');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      openAchievementsModal();
    });
  }
}

// --- Achievements Modal ---
function openAchievementsModal() {
  const allAchievements = getAllAchievementsWithStatus();
  const summary = getAchievementsSummary();
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'achievements-modal animate__animated animate__fadeIn';
  modal.innerHTML = `
    <div class="achievements-modal-backdrop"></div>
    <div class="achievements-modal-content animate__animated animate__zoomIn">
      <div class="modal-header">
        <h2><i class="fa-solid fa-trophy"></i> Todos los Logros</h2>
        <button class="modal-close" aria-label="Cerrar">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      <div class="modal-summary">
        <div class="summary-progress">
          <div class="summary-fill" style="width: ${summary.percent}%"></div>
        </div>
        <span class="summary-text">${summary.unlocked} de ${summary.total} desbloqueados</span>
      </div>
      <div class="achievements-grid">
        ${allAchievements.map(a => `
          <div class="achievement-card ${a.unlocked ? 'unlocked' : 'locked'}">
            <div class="achievement-icon">
              <i class="fa-solid ${a.icon}"></i>
            </div>
            <div class="achievement-details">
              <h4>${a.name}</h4>
              <p>${a.description}</p>
            </div>
            ${a.unlocked ? `<span class="achievement-reward">+${a.xpReward} XP</span>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Close handlers
  const closeModal = () => {
    modal.classList.remove('animate__fadeIn');
    modal.classList.add('animate__fadeOut');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 200);
  };
  
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.querySelector('.achievements-modal-backdrop').addEventListener('click', closeModal);
  
  // ESC key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

// --- Helpers ---

function renderEmptyState(container) {
  container.innerHTML = `
    <div class="stats-empty">
      <div class="empty-icon">
        <i class="fa-solid fa-chart-pie"></i>
      </div>
      <h2>Tu historia empieza aquí</h2>
      <p>Añade palabras para ver tus estadísticas de aprendizaje</p>
      <div class="empty-actions">
        <button class="btn-primary" onclick="document.querySelector('[data-view=add]').click()">
          <i class="fa-solid fa-plus"></i> Añadir palabra
        </button>
        <button class="btn-secondary" id="explore-packs-stats-btn">
          <i class="fa-solid fa-box-open"></i> Explorar packs
        </button>
      </div>
    </div>
  `;
  
  const exploreBtn = container.querySelector('#explore-packs-stats-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      document.querySelector('[data-view=home]').click();
      setTimeout(() => {
        const packBtn = document.getElementById('explore-packs-btn');
        if (packBtn) packBtn.click();
      }, 100);
    });
  }
}

function calculateGrowthData(words) {
  const sorted = [...words].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  const map = new Map();
  let cumulative = 0;
  
  sorted.forEach(w => {
    cumulative++;
    const date = new Date(w.createdAt || Date.now()).toISOString().split('T')[0];
    map.set(date, cumulative);
  });

  const data = Array.from(map.entries()).map(([date, count]) => ({ date, count }));
  
  if (data.length > 0 && data.length < 2) {
    const firstDate = new Date(data[0].date);
    firstDate.setDate(firstDate.getDate() - 1);
    data.unshift({ date: firstDate.toISOString().split('T')[0], count: 0 });
  }

  return data;
}

function getStrugglingWords(words) {
  return [...words]
    .filter(w => (w.incorrectCount || 0) > 0)
    .sort((a, b) => (b.incorrectCount || 0) - (a.incorrectCount || 0))
    .slice(0, 5);
}

function getPercent(val, total) {
  if (!total) return 0;
  return Math.round((val / total) * 100);
}

function getGradeLetter(score) {
  if (score >= 90) return 'S';
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  return 'D';
}

function getGradeColorClass(score) {
  if (score >= 90) return 'grade-s';
  if (score >= 80) return 'grade-a';
  if (score >= 60) return 'grade-b';
  if (score >= 40) return 'grade-c';
  return 'grade-d';
}

function calculatePrediction(words, growthData) {
  const total = words.length;
  if (total < 2 || growthData.length < 2) return null;
  
  const firstDate = new Date(growthData[0].date);
  const lastDate = new Date(growthData[growthData.length - 1].date);
  const daysDiff = Math.max(1, Math.ceil((lastDate - firstDate) / (24 * 60 * 60 * 1000)));
  const avgPerDay = total / daysDiff;
  
  if (total < 500) {
    const daysTo500 = Math.ceil((500 - total) / avgPerDay);
    return `A este ritmo alcanzarás <strong>500 palabras</strong> en ~${daysTo500} días`;
  } else if (total < 1000) {
    const daysTo1000 = Math.ceil((1000 - total) / avgPerDay);
    return `A este ritmo alcanzarás <strong>1000 palabras</strong> en ~${daysTo1000} días`;
  } else {
    return `¡Increíble! Ya dominas <strong>${total}</strong> palabras 🎉`;
  }
}

// --- SVG Renderers ---

function renderGrowthChart(data) {
  if (!data || data.length === 0) return '<div class="chart-placeholder">Sin datos suficientes</div>';
  
  const width = 600;
  const height = 200;
  const padding = 30;
  
  const maxCount = data[data.length - 1].count;
  if (maxCount === 0) return '';

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
    const y = height - ((d.count / maxCount) * (height - 2 * padding) + padding);
    return `${x},${y}`;
  }).join(' ');

  const firstX = padding;
  const lastX = width - padding;
  const fillPath = `${firstX},${height - padding} ${points} ${lastX},${height - padding}`;

  return `
    <svg viewBox="0 0 ${width} ${height}" class="growth-svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="var(--primary-500)" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="var(--primary-500)" stop-opacity="0.05"/>
        </linearGradient>
      </defs>
      <polygon points="${fillPath}" fill="url(#areaGradient)" />
      <polyline points="${points}" fill="none" stroke="var(--primary-400)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="${width - padding}" cy="${height - ((maxCount / maxCount) * (height - 2 * padding) + padding)}" r="4" fill="var(--primary-400)" />
    </svg>
    <div class="chart-label">${maxCount} palabras</div>
  `;
}

function renderMiniSparkline(data) {
  if (!data || data.length < 2) return '';
  const width = 50;
  const height = 24;
  const max = data[data.length - 1].count;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (d.count / max) * height;
    return `${x},${y}`;
  }).join(' ');
  
  return `
    <svg viewBox="0 0 ${width} ${height}" class="sparkline">
      <polyline points="${points}" fill="none" stroke="currentColor" stroke-width="1.5" />
    </svg>
  `;
}

function renderActivityHeatmap(words) {
  const today = new Date();
  today.setHours(23, 59, 59, 999); // End of today
  const WEEKS = 18; // ~4 months for better visual
  
  const activityMap = new Map();
  
  words.forEach(word => {
    if (word.lastReviewedAt) {
      const date = new Date(word.lastReviewedAt).toISOString().split('T')[0];
      activityMap.set(date, (activityMap.get(date) || 0) + 1);
    }
    if (word.createdAt) {
      const date = new Date(word.createdAt).toISOString().split('T')[0];
      activityMap.set(date, (activityMap.get(date) || 0) + 1);
    }
  });
  
  const maxActivity = Math.max(...Array.from(activityMap.values()), 1);
  
  let html = '<div class="heatmap-grid">';
  
  // Calculate start date: go back WEEKS weeks from today
  // Then adjust to start from Monday
  const totalDays = WEEKS * 7;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - totalDays);
  
  // Adjust to previous Monday
  const dayOfWeek = startDate.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startDate.setDate(startDate.getDate() - daysToMonday);
  
  // Generate weeks from start to today
  for (let week = 0; week < WEEKS; week++) {
    html += '<div class="heatmap-week">';
    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + (week * 7) + day);
      const dateStr = currentDate.toISOString().split('T')[0];
      const activity = activityMap.get(dateStr) || 0;
      const level = activity === 0 ? 0 : Math.min(4, Math.ceil((activity / maxActivity) * 4));
      const isFuture = currentDate > today;
      
      html += `<div class="heatmap-day level-${isFuture ? 'future' : level}" title="${dateStr}: ${activity} actividades"></div>`;
    }
    html += '</div>';
  }
  
  html += '</div>';
  return html;
}
