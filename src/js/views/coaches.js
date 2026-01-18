/**
 * Coaches View - Speaking Practice with AI Coaches
 * GPT-powered coaches unlockable as rewards
 */

import { getStatistics } from '../storage/vocabStorage.js';
import { getGamificationStats } from '../storage/gamification.js';

// Coach definitions with unlock requirements
const COACHES = [
  {
    id: 'speaking_buddy',
    name: 'Speaking Buddy',
    tagline: 'Tu compañero para empezar a hablar',
    description: 'Entrena tu inglés con confianza, práctica real, correcciones útiles y mucha motivación. Perfecto para principiantes.',
    level: 'Principiante',
    levelClass: 'beginner',
    icon: 'fa-comments',
    url: 'https://chatgpt.com/g/g-685c08c9f38c8191bafd1c21261c8d56-speaking-buddy',
    features: ['Correcciones amables', 'Práctica básica', 'Mucha motivación'],
    unlockRequirements: {
      masteredWords: 10,
      description: 'Domina 10 palabras'
    },
    checkUnlocked: (stats) => stats.masteredWords >= 10
  },
  {
    id: 'fluency_coach',
    name: 'Fluency Coach',
    tagline: 'Habla con fluidez natural',
    description: 'Coach de idiomas IA que se adapta a tu nivel de inglés, te corrige en vivo y te ayuda a hablar con fluidez y naturalidad.',
    level: 'Intermedio',
    levelClass: 'intermediate',
    icon: 'fa-graduation-cap',
    url: 'https://chatgpt.com/g/g-6813540fc2408191bc3fe94ae2b3251f-fluency-coach',
    features: ['Adaptación a tu nivel', 'Corrección en vivo', 'Fluidez natural'],
    unlockRequirements: {
      masteredWords: 25,
      streak: 7,
      description: 'Domina 25 palabras y mantén 7 días de racha'
    },
    checkUnlocked: (stats) => stats.masteredWords >= 25 && stats.maxStreak >= 7
  },
  {
    id: 'speak_up',
    name: 'Speak Up',
    tagline: 'El coach exigente que necesitas',
    description: 'Coach estricto pero motivador: corrige tus errores, mejora tus frases, permite palabras en español y construye fluidez a través de conversación natural.',
    level: 'Avanzado',
    levelClass: 'advanced',
    icon: 'fa-rocket',
    url: 'https://chatgpt.com/g/g-68b46f21b45c8191a7eb9349328c8a98-speak-up',
    features: ['Corrección estricta', 'Mejora de frases', 'Conversación natural'],
    unlockRequirements: {
      masteredWords: 50,
      level: 10,
      description: 'Domina 50 palabras y alcanza nivel 10'
    },
    checkUnlocked: (stats) => stats.masteredWords >= 50 && stats.level >= 10
  }
];

/**
 * Get current user stats for checking unlock status
 */
function getUserStats() {
  const vocabStats = getStatistics();
  const gameStats = getGamificationStats();
  
  return {
    totalWords: vocabStats.total || 0,
    masteredWords: vocabStats.mastered || 0,
    maxStreak: gameStats.maxStreak || 0,
    streak: gameStats.streak || 0,
    level: gameStats.level || 1,
    totalXp: gameStats.totalXp || 0
  };
}

/**
 * Calculate progress percentage towards unlocking a coach
 */
function calculateProgress(coach, stats) {
  const requirements = coach.unlockRequirements;
  let progress = 0;
  let totalRequirements = 0;
  
  if (requirements.masteredWords) {
    totalRequirements++;
    progress += Math.min(1, stats.masteredWords / requirements.masteredWords);
  }
  
  if (requirements.streak) {
    totalRequirements++;
    progress += Math.min(1, stats.maxStreak / requirements.streak);
  }
  
  if (requirements.level) {
    totalRequirements++;
    progress += Math.min(1, stats.level / requirements.level);
  }
  
  return totalRequirements > 0 ? Math.round((progress / totalRequirements) * 100) : 0;
}

/**
 * Inject critical styles as a fallback for SCSS issues
 */
function injectCoachesStyles() {
  if (document.getElementById('coaches-critical-styles')) return;
  
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const bgCard = isDark ? '#1e293b' : '#ffffff';
  const borderColor = isDark ? '#334155' : '#e2e8f0';
  const textPrimary = isDark ? '#f1f5f9' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const bgFooter = isDark ? '#0f172a' : '#f8fafc';
  
  const style = document.createElement('style');
  style.id = 'coaches-critical-styles';
  style.textContent = `
    .coaches-view { max-width: 1200px; margin: 0 auto; padding: 1rem; }
    
    .coaches-hero {
      background: linear-gradient(135deg, #3b82f6, #2563eb, #8b5cf6);
      border-radius: 1.5rem;
      padding: 3rem 2rem;
      margin-bottom: 2rem;
      color: white;
      text-align: center;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
    }
    .coaches-hero h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.75rem; }
    .coaches-hero p { opacity: 0.95; max-width: 500px; margin: 0 auto 1.5rem; }
    .coaches-hero .hero-icon {
      width: 80px; height: 80px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 1.5rem;
      border: 2px solid rgba(255,255,255,0.3);
    }
    .coaches-hero .hero-icon i { font-size: 2.5rem; }
    .coaches-hero .hero-progress { max-width: 300px; margin: 0 auto; }
    .coaches-hero .progress-label { 
      display: block; 
      margin-bottom: 0.5rem; 
      font-weight: 700; 
      color: #ffffff; 
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
      font-size: 0.95rem;
    }
    .coaches-hero .progress-bar { height: 8px; background: rgba(255,255,255,0.3); border-radius: 4px; overflow: hidden; }
    .coaches-hero .progress-fill { height: 100%; background: white; border-radius: 4px; }
    .hero-decoration { display: none; }
    
    .coaches-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }
    
    .coach-card {
      background: ${bgCard};
      border: 2px solid ${borderColor};
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      transition: all 0.3s;
      position: relative;
    }
    .coach-card:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
    
    .coach-card.beginner .coach-header { background: linear-gradient(135deg, #10b981, #059669); }
    .coach-card.intermediate .coach-header { background: linear-gradient(135deg, #3b82f6, #2563eb); }
    .coach-card.advanced .coach-header { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
    
    .coach-header {
      padding: 2rem 1.5rem 1.5rem;
      display: flex; flex-direction: column; align-items: center;
      gap: 0.75rem; color: white; text-align: center;
    }
    .coach-avatar {
      width: 72px; height: 72px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      border: 3px solid rgba(255,255,255,0.4);
    }
    .coach-avatar i { font-size: 1.75rem; color: white; }
    .coach-level-tag {
      padding: 0.35rem 0.9rem; border-radius: 1rem;
      font-size: 0.7rem; font-weight: 700; color: white;
      text-transform: uppercase;
    }
    .coach-card.beginner .coach-level-tag { background: #10b981; }
    .coach-card.intermediate .coach-level-tag { background: #3b82f6; }
    .coach-card.advanced .coach-level-tag { background: #8b5cf6; }
    
    .coach-body {
      padding: 1.25rem 1.5rem 1rem;
      text-align: center;
      background: ${bgCard};
    }
    .coach-name { font-size: 1.35rem; font-weight: 700; color: ${textPrimary}; margin-bottom: 0.25rem; }
    .coach-tagline { font-size: 0.9rem; color: #3b82f6; font-weight: 600; margin-bottom: 0.75rem; }
    .coach-description { font-size: 0.85rem; color: ${textSecondary}; line-height: 1.6; margin-bottom: 1rem; }
    .coach-features { list-style: none; padding: 0; margin: 0; text-align: left; }
    .coach-features li { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: ${textSecondary}; margin-bottom: 0.5rem; }
    .coach-features li i { color: #10b981; font-size: 0.75rem; }
    
    .coach-footer {
      padding: 1.25rem 1.5rem;
      background: ${bgFooter};
      border-top: 1px solid ${borderColor};
    }
    
    .status-badge {
      position: absolute; top: 1rem; right: 1rem;
      padding: 0.4rem 0.85rem; border-radius: 2rem;
      font-size: 0.75rem; font-weight: 600;
      display: flex; align-items: center; gap: 0.4rem; z-index: 10;
    }
    .status-badge.unlocked { background: linear-gradient(135deg, #10b981, #059669); color: white; }
    .status-badge.locked { background: rgba(0,0,0,0.5); color: white; }
    
    .btn-coach-start {
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      width: 100%; padding: 0.85rem 1.5rem;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white; font-weight: 600; font-size: 0.9rem;
      border: none; border-radius: 0.75rem; cursor: pointer;
      text-decoration: none; transition: all 0.2s;
    }
    .btn-coach-start:hover { transform: translateY(-2px); }
    .coach-card.beginner .btn-coach-start { background: linear-gradient(135deg, #10b981, #059669); }
    .coach-card.advanced .btn-coach-start { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
    
    .unlock-progress .progress-text { font-size: 0.85rem; font-weight: 600; color: ${textPrimary}; }
    .unlock-progress .progress-bar { height: 10px; background: ${borderColor}; border-radius: 5px; margin: 0.5rem 0 0.75rem; overflow: hidden; }
    .unlock-progress .progress-fill { height: 100%; border-radius: 5px; }
    .coach-card.beginner .unlock-progress .progress-fill { background: linear-gradient(90deg, #10b981, #34d399); }
    .coach-card.intermediate .unlock-progress .progress-fill { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
    .coach-card.advanced .unlock-progress .progress-fill { background: linear-gradient(90deg, #8b5cf6, #a78bfa); }
    .unlock-requirement { font-size: 0.8rem; color: ${textSecondary}; margin: 0; display: flex; align-items: center; gap: 0.5rem; }
    .unlock-requirement i { color: #f59e0b; }
    
    .locked-overlay, .card-glow { display: none; }
    
    .how-it-works { margin-bottom: 2.5rem; }
    .how-it-works h2 { font-size: 1.5rem; font-weight: 700; color: ${textPrimary}; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
    .how-it-works h2 i { color: #3b82f6; }
    
    .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; }
    .step-card {
      position: relative;
      background: ${bgCard};
      border: 2px solid ${borderColor};
      border-radius: 1rem;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .step-number {
      position: absolute; top: -0.6rem; left: -0.6rem;
      width: 32px; height: 32px;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white; font-weight: 700; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
    }
    .step-icon {
      width: 60px; height: 60px;
      background: ${isDark ? 'rgba(59,130,246,0.15)' : 'linear-gradient(135deg, #dbeafe, #eff6ff)'};
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      margin: 0 auto 1rem;
    }
    .step-icon i { font-size: 1.5rem; color: #3b82f6; }
    .step-card h3 { font-size: 1rem; font-weight: 600; color: ${textPrimary}; margin-bottom: 0.5rem; }
    .step-card p { font-size: 0.85rem; color: ${textSecondary}; margin: 0; }
    
    .your-progress { margin-bottom: 2rem; }
    .progress-card {
      background: ${bgCard};
      border: 2px solid ${borderColor};
      border-radius: 1rem;
      overflow: hidden;
    }
    .progress-card .progress-header {
      padding: 1rem 1.5rem;
      background: ${bgFooter};
      border-bottom: 1px solid ${borderColor};
    }
    .progress-card .progress-header h3 { font-size: 1rem; font-weight: 600; color: ${textPrimary}; margin: 0; display: flex; align-items: center; gap: 0.5rem; }
    .progress-card .progress-header h3 i { color: #3b82f6; }
    .progress-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding: 1.5rem; }
    .stat-item { text-align: center; }
    .stat-item .stat-value { display: block; font-size: 2.25rem; font-weight: 700; color: #3b82f6; }
    .stat-item .stat-label { font-size: 0.8rem; color: ${textSecondary}; }
    
    .coach-locked-modal {
      position: fixed; inset: 0; z-index: 1000;
      display: flex; align-items: center; justify-content: center; padding: 1rem;
    }
    .coach-locked-modal .modal-backdrop {
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.7); backdrop-filter: blur(6px);
    }
    .coach-locked-modal .modal-content {
      position: relative;
      background: ${bgCard};
      border: 2px solid ${borderColor};
      border-radius: 1.5rem;
      padding: 2rem;
      max-width: 400px; width: 100%;
      text-align: center;
      box-shadow: 0 24px 64px rgba(0,0,0,0.4);
    }
    .coach-locked-modal .modal-icon {
      width: 72px; height: 72px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 1rem;
    }
    .coach-locked-modal .modal-icon.locked {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4);
    }
    .coach-locked-modal .modal-icon i { font-size: 2rem; color: white; }
    .coach-locked-modal h2 { font-size: 1.5rem; font-weight: 700; color: ${textPrimary}; margin-bottom: 0.25rem; }
    .coach-locked-modal .coach-name-modal { color: #3b82f6; font-weight: 600; margin-bottom: 1.5rem; }
    .coach-locked-modal .progress-circular { position: relative; width: 100px; height: 100px; margin: 0 auto; }
    .coach-locked-modal .progress-circular svg { transform: rotate(-90deg); width: 100%; height: 100%; }
    .coach-locked-modal .progress-circular circle { fill: none; stroke-width: 8; stroke-linecap: round; }
    .coach-locked-modal .progress-circular circle.bg { stroke: ${borderColor}; }
    .coach-locked-modal .progress-circular circle.fill { stroke: #3b82f6; }
    .coach-locked-modal .progress-circular .progress-value {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; font-weight: 700; color: ${textPrimary};
    }
    .coach-locked-modal .requirements {
      background: ${bgFooter};
      border: 1px solid ${borderColor};
      border-radius: 0.75rem;
      padding: 1rem;
      margin-bottom: 1.5rem;
      text-align: left;
    }
    .coach-locked-modal .requirements h4 { font-size: 0.9rem; font-weight: 600; color: ${textPrimary}; margin-bottom: 0.5rem; }
    .coach-locked-modal .requirements > p { font-size: 0.85rem; color: ${textSecondary}; margin-bottom: 1rem; }
    .coach-locked-modal .req-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: ${textSecondary}; margin-bottom: 0.5rem; }
    .coach-locked-modal .req-item i { font-size: 0.75rem; }
    .coach-locked-modal .req-item.completed { color: #10b981; }
    .coach-locked-modal .req-item.completed i { color: #10b981; }
    .coach-locked-modal .btn-continue {
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      width: 100%; padding: 0.9rem 1.5rem;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white; font-weight: 600; font-size: 0.95rem;
      border: none; border-radius: 0.75rem; cursor: pointer;
    }
    .coach-locked-modal .btn-continue:hover { transform: translateY(-2px); }
  `;
  document.head.appendChild(style);
}

/**
 * Render the coaches view
 */
export function renderCoaches(container) {
  container.innerHTML = '';
  container.className = 'coaches-view animate__animated animate__fadeIn';
  
  // Inject critical styles as a fallback
  injectCoachesStyles();
  
  const stats = getUserStats();
  const unlockedCount = COACHES.filter(c => c.checkUnlocked(stats)).length;
  
  const html = `
    <!-- Hero Section -->
    <section class="coaches-hero">
      <div class="hero-content">
        <div class="hero-icon">
          <i class="fa-solid fa-headset"></i>
        </div>
        <h1>Coaches de Speaking</h1>
        <p>Practica conversación real con coaches de IA. Desbloquéalos completando objetivos en EmoWords.</p>
        <div class="hero-progress">
          <span class="progress-label">${unlockedCount} de ${COACHES.length} desbloqueados</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${(unlockedCount / COACHES.length) * 100}%"></div>
          </div>
        </div>
      </div>
      <div class="hero-decoration">
        <div class="floating-icon icon-1"><i class="fa-solid fa-microphone"></i></div>
        <div class="floating-icon icon-2"><i class="fa-solid fa-comment-dots"></i></div>
        <div class="floating-icon icon-3"><i class="fa-solid fa-language"></i></div>
      </div>
    </section>
    
    <!-- Coaches Grid -->
    <section class="coaches-grid">
      ${COACHES.map(coach => renderCoachCard(coach, stats)).join('')}
    </section>
    
    <!-- How it works section -->
    <section class="how-it-works">
      <h2><i class="fa-solid fa-circle-question"></i> ¿Cómo funciona?</h2>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-number">1</div>
          <div class="step-icon"><i class="fa-solid fa-book"></i></div>
          <h3>Aprende vocabulario</h3>
          <p>Añade palabras y domínalas con repasos</p>
        </div>
        <div class="step-card">
          <div class="step-number">2</div>
          <div class="step-icon"><i class="fa-solid fa-unlock"></i></div>
          <h3>Desbloquea coaches</h3>
          <p>Cumple objetivos para acceder a cada coach</p>
        </div>
        <div class="step-card">
          <div class="step-number">3</div>
          <div class="step-icon"><i class="fa-solid fa-comments"></i></div>
          <h3>Practica speaking</h3>
          <p>Conversa con IA y mejora tu fluidez</p>
        </div>
      </div>
    </section>
    
    <!-- Stats reminder -->
    <section class="your-progress">
      <div class="progress-card">
        <div class="progress-header">
          <h3><i class="fa-solid fa-chart-line"></i> Tu progreso actual</h3>
        </div>
        <div class="progress-stats">
          <div class="stat-item">
            <span class="stat-value">${stats.masteredWords}</span>
            <span class="stat-label">Palabras dominadas</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${stats.maxStreak}</span>
            <span class="stat-label">Mejor racha</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${stats.level}</span>
            <span class="stat-label">Nivel</span>
          </div>
        </div>
      </div>
    </section>
  `;
  
  container.innerHTML = html;
  setupEventListeners(container, stats);
}

/**
 * Render individual coach card
 */
function renderCoachCard(coach, stats) {
  const isUnlocked = coach.checkUnlocked(stats);
  const progress = calculateProgress(coach, stats);
  
  return `
    <article class="coach-card ${coach.levelClass} ${isUnlocked ? 'unlocked' : 'locked'}" data-coach-id="${coach.id}">
      <div class="card-glow"></div>
      
      <!-- Status Badge -->
      <div class="status-badge ${isUnlocked ? 'unlocked' : 'locked'}">
        ${isUnlocked 
          ? '<i class="fa-solid fa-check"></i> Desbloqueado' 
          : '<i class="fa-solid fa-lock"></i> Bloqueado'}
      </div>
      
      <!-- Coach Header -->
      <div class="coach-header">
        <div class="coach-avatar">
          <i class="fa-solid ${coach.icon}"></i>
        </div>
        <div class="coach-level-tag">${coach.level}</div>
      </div>
      
      <!-- Coach Info -->
      <div class="coach-body">
        <h3 class="coach-name">${coach.name}</h3>
        <p class="coach-tagline">${coach.tagline}</p>
        <p class="coach-description">${coach.description}</p>
        
        <!-- Features -->
        <ul class="coach-features">
          ${coach.features.map(f => `
            <li><i class="fa-solid fa-check-circle"></i> ${f}</li>
          `).join('')}
        </ul>
      </div>
      
      <!-- Unlock/Action Section -->
      <div class="coach-footer">
        ${isUnlocked ? `
          <a href="${coach.url}" target="_blank" rel="noopener noreferrer" class="btn-coach-start">
            <i class="fa-solid fa-external-link-alt"></i>
            Iniciar conversación
          </a>
        ` : `
          <div class="unlock-progress">
            <div class="progress-header">
              <span class="progress-text">Progreso: ${progress}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <p class="unlock-requirement">
              <i class="fa-solid fa-lock"></i>
              ${coach.unlockRequirements.description}
            </p>
          </div>
        `}
      </div>
      
      ${!isUnlocked ? '<div class="locked-overlay"></div>' : ''}
    </article>
  `;
}

/**
 * Setup event listeners
 */
function setupEventListeners(container, stats) {
  // Locked cards show a message when clicked
  container.querySelectorAll('.coach-card.locked').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking on something else interactive
      if (e.target.closest('a, button')) return;
      
      const coachId = card.dataset.coachId;
      const coach = COACHES.find(c => c.id === coachId);
      
      if (coach) {
        showLockedMessage(coach, stats);
      }
    });
  });
}

/**
 * Show message for locked coach
 */
function showLockedMessage(coach, stats) {
  const progress = calculateProgress(coach, stats);
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'coach-locked-modal animate__animated animate__fadeIn';
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content animate__animated animate__zoomIn">
      <div class="modal-icon locked">
        <i class="fa-solid fa-lock"></i>
      </div>
      <h2>Coach Bloqueado</h2>
      <p class="coach-name-modal">${coach.name}</p>
      
      <div class="progress-section">
        <div class="progress-circular">
          <svg viewBox="0 0 100 100">
            <circle class="bg" cx="50" cy="50" r="45"/>
            <circle class="fill" cx="50" cy="50" r="45" 
              stroke-dasharray="${2 * Math.PI * 45}" 
              stroke-dashoffset="${2 * Math.PI * 45 * (1 - progress / 100)}"/>
          </svg>
          <span class="progress-value">${progress}%</span>
        </div>
      </div>
      
      <div class="requirements">
        <h4>Requisitos:</h4>
        <p>${coach.unlockRequirements.description}</p>
        
        <div class="current-stats">
          ${coach.unlockRequirements.masteredWords ? `
            <div class="req-item ${stats.masteredWords >= coach.unlockRequirements.masteredWords ? 'completed' : ''}">
              <i class="fa-solid ${stats.masteredWords >= coach.unlockRequirements.masteredWords ? 'fa-check-circle' : 'fa-circle'}"></i>
              <span>Palabras dominadas: ${stats.masteredWords}/${coach.unlockRequirements.masteredWords}</span>
            </div>
          ` : ''}
          ${coach.unlockRequirements.streak ? `
            <div class="req-item ${stats.maxStreak >= coach.unlockRequirements.streak ? 'completed' : ''}">
              <i class="fa-solid ${stats.maxStreak >= coach.unlockRequirements.streak ? 'fa-check-circle' : 'fa-circle'}"></i>
              <span>Mejor racha: ${stats.maxStreak}/${coach.unlockRequirements.streak} días</span>
            </div>
          ` : ''}
          ${coach.unlockRequirements.level ? `
            <div class="req-item ${stats.level >= coach.unlockRequirements.level ? 'completed' : ''}">
              <i class="fa-solid ${stats.level >= coach.unlockRequirements.level ? 'fa-check-circle' : 'fa-circle'}"></i>
              <span>Nivel: ${stats.level}/${coach.unlockRequirements.level}</span>
            </div>
          ` : ''}
        </div>
      </div>
      
      <button class="btn-continue">
        <i class="fa-solid fa-arrow-right"></i>
        Seguir aprendiendo
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close handlers
  const closeModal = () => {
    modal.classList.remove('animate__fadeIn');
    modal.classList.add('animate__fadeOut');
    setTimeout(() => modal.remove(), 200);
  };
  
  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
  modal.querySelector('.btn-continue').addEventListener('click', closeModal);
  
  // ESC key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}
