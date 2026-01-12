/**
 * Lightweight Onboarding System
 * Shows tooltips to guide new users through the app
 * Fixed: proper positioning, spotlight effect, reliable navigation
 */

const ONBOARDING_KEY = 'emowords_onboarding_completed';
const USER_LEVEL_KEY = 'emowords_user_level';

// Simplified onboarding steps - fewer steps, more focused
const onboardingSteps = [
  {
    id: 'welcome',
    target: null,
    title: '¡Bienvenido a EmoWords! 👋',
    content: 'Aprende vocabulario conectando cada palabra con tus recuerdos personales. Te guiaremos en 30 segundos.',
    position: 'center',
    icon: 'fa-solid fa-rocket'
  },
  {
    id: 'level-select',
    target: null,
    title: '¿Cuál es tu nivel de inglés?',
    content: 'Esto nos ayudará a sugerirte los packs más adecuados para ti.',
    position: 'center',
    icon: 'fa-solid fa-graduation-cap',
    type: 'level-selection'
  },
  {
    id: 'nav-add',
    target: '[data-view="add"]',
    title: '1. Añadir Vocabulario',
    content: 'Aquí añades palabras, phrasal verbs o expresiones con su significado.',
    position: 'bottom',
    icon: 'fa-solid fa-plus'
  },
  {
    id: 'nav-review',
    target: '[data-view="review"]',
    title: '2. Repasar',
    content: '5 modos de práctica: Flashcards, Quiz, Escritura, Listening y Mixto.',
    position: 'bottom',
    icon: 'fa-solid fa-graduation-cap'
  },
  {
    id: 'nav-stats',
    target: '[data-view="stats"]',
    title: '3. Tu Progreso',
    content: 'Visualiza tu evolución, logros y palabras que necesitan más atención.',
    position: 'bottom',
    icon: 'fa-solid fa-chart-line'
  },
  {
    id: 'secret',
    target: null,
    title: '🧠 El Secreto de EmoWords',
    content: 'Al añadir palabras, conecta cada una con un recuerdo personal o emoción. ¡Tu memoria será 10 veces más fuerte!',
    position: 'center',
    icon: 'fa-solid fa-heart'
  },
  {
    id: 'ready',
    target: null,
    title: '¡Listo para aprender! 🚀',
    content: 'Empieza añadiendo tu primera palabra o explora los packs predefinidos. ¡Las emociones graban, la repetición se olvida!',
    position: 'center',
    icon: 'fa-solid fa-check-circle'
  }
];

// Level options
const levelOptions = [
  { code: 'A1-A2', label: 'Básico', description: 'Principiante' },
  { code: 'B1', label: 'Intermedio bajo', description: 'Pre-intermedio' },
  { code: 'B2', label: 'Intermedio alto', description: 'Intermedio' },
  { code: 'C1-C2', label: 'Avanzado', description: 'Avanzado/Nativo' }
];

let selectedLevel = null;

let currentStep = 0;
let tooltipElement = null;
let overlayElement = null;
let spotlightElement = null;

/**
 * Check if onboarding should be shown
 */
export function shouldShowOnboarding() {
  return !localStorage.getItem(ONBOARDING_KEY);
}

/**
 * Mark onboarding as completed
 */
export function completeOnboarding() {
  localStorage.setItem(ONBOARDING_KEY, 'true');
}

/**
 * Get user's English level
 */
export function getUserLevel() {
  return localStorage.getItem(USER_LEVEL_KEY) || null;
}

/**
 * Start the onboarding flow
 */
export function startOnboarding() {
  if (!shouldShowOnboarding()) return;
  
  currentStep = 0;
  createOverlay();
  showStep(currentStep);
}

/**
 * Create overlay element
 */
function createOverlay() {
  // Remove existing if any
  document.querySelector('.onboarding-overlay')?.remove();
  
  overlayElement = document.createElement('div');
  overlayElement.className = 'onboarding-overlay';
  overlayElement.innerHTML = `
    <div class="onboarding-backdrop"></div>
    <div class="onboarding-spotlight"></div>
  `;
  document.body.appendChild(overlayElement);
  
  spotlightElement = overlayElement.querySelector('.onboarding-spotlight');
}

/**
 * Show a specific step
 */
function showStep(stepIndex) {
  const step = onboardingSteps[stepIndex];
  if (!step) {
    endOnboarding();
    return;
  }

  // Remove previous tooltip
  if (tooltipElement) {
    tooltipElement.remove();
  }

  // Hide spotlight for centered modals
  if (step.position === 'center' || !step.target) {
    spotlightElement.style.display = 'none';
  } else {
    spotlightElement.style.display = 'block';
  }

  // Create tooltip
  tooltipElement = document.createElement('div');
  tooltipElement.className = 'onboarding-tooltip';
  
  const isLastStep = stepIndex === onboardingSteps.length - 1;
  const isFirstStep = stepIndex === 0;
  const isLevelSelect = step.type === 'level-selection';
  const progress = ((stepIndex + 1) / onboardingSteps.length) * 100;

  // Special rendering for level selection
  const levelSelectHTML = isLevelSelect ? `
    <div class="level-grid">
      ${levelOptions.map(level => `
        <button class="level-btn" data-level="${level.code}">
          <span class="level-code">${level.code}</span>
          <span class="level-label">${level.label}</span>
        </button>
      `).join('')}
    </div>
  ` : '';

  tooltipElement.innerHTML = `
    <div class="tooltip-progress-bar">
      <div class="tooltip-progress-fill" style="width: ${progress}%"></div>
    </div>
    <div class="tooltip-header-row">
      <span class="tooltip-step">${stepIndex + 1} de ${onboardingSteps.length}</span>
      <button class="tooltip-skip" title="Saltar tutorial">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="tooltip-body">
      ${step.icon ? `<div class="tooltip-icon"><i class="${step.icon}"></i></div>` : ''}
      <h4 class="tooltip-title">${step.title}</h4>
      <p class="tooltip-content">${step.content}</p>
      ${levelSelectHTML}
    </div>
    <div class="tooltip-actions">
      ${!isFirstStep ? '<button class="tooltip-prev"><i class="fa-solid fa-arrow-left"></i></button>' : '<div></div>'}
      <button class="tooltip-next ${isLastStep ? 'finish' : ''}" ${isLevelSelect && !selectedLevel ? 'disabled' : ''}>
        ${isLastStep ? '¡Empezar!' : 'Siguiente'} 
        ${!isLastStep ? '<i class="fa-solid fa-arrow-right"></i>' : '<i class="fa-solid fa-rocket"></i>'}
      </button>
    </div>
  `;

  // Add tooltip to overlay
  overlayElement.appendChild(tooltipElement);

  // Position tooltip
  if (step.position === 'center' || !step.target) {
    tooltipElement.classList.add('centered');
    removeHighlights();
  } else {
    tooltipElement.classList.remove('centered');
    const targetEl = document.querySelector(step.target);
    if (targetEl) {
      positionTooltipAndSpotlight(targetEl, step.position);
    } else {
      // Fallback to centered if target not found
      tooltipElement.classList.add('centered');
      spotlightElement.style.display = 'none';
    }
  }

  // Add event listeners
  const skipBtn = tooltipElement.querySelector('.tooltip-skip');
  const nextBtn = tooltipElement.querySelector('.tooltip-next');
  const prevBtn = tooltipElement.querySelector('.tooltip-prev');
  
  skipBtn.addEventListener('click', skipOnboarding);
  nextBtn.addEventListener('click', nextStep);
  if (prevBtn) {
    prevBtn.addEventListener('click', prevStep);
  }

  // Level selection event listeners
  if (isLevelSelect) {
    const levelBtns = tooltipElement.querySelectorAll('.level-btn');
    levelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active from all
        levelBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
        // Store selected level
        selectedLevel = btn.dataset.level;
        localStorage.setItem(USER_LEVEL_KEY, selectedLevel);
        // Enable next button
        nextBtn.removeAttribute('disabled');
      });
    });
  }

  // Animate in
  requestAnimationFrame(() => {
    tooltipElement.classList.add('visible');
  });
}

/**
 * Position tooltip and spotlight relative to target
 */
function positionTooltipAndSpotlight(target, position) {
  const rect = target.getBoundingClientRect();
  const padding = 8;
  const tooltipMargin = 16;
  
  // Position spotlight around target
  spotlightElement.style.top = `${rect.top - padding}px`;
  spotlightElement.style.left = `${rect.left - padding}px`;
  spotlightElement.style.width = `${rect.width + padding * 2}px`;
  spotlightElement.style.height = `${rect.height + padding * 2}px`;
  
  // Get tooltip dimensions
  const tooltipRect = tooltipElement.getBoundingClientRect();
  
  // Position tooltip based on position parameter
  let top, left;
  
  switch (position) {
    case 'bottom':
      top = rect.bottom + tooltipMargin;
      left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      break;
    case 'top':
      top = rect.top - tooltipMargin - tooltipRect.height;
      left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      break;
    case 'left':
      top = rect.top + rect.height / 2 - tooltipRect.height / 2;
      left = rect.left - tooltipMargin - tooltipRect.width;
      break;
    case 'right':
      top = rect.top + rect.height / 2 - tooltipRect.height / 2;
      left = rect.right + tooltipMargin;
      break;
    default:
      top = rect.bottom + tooltipMargin;
      left = rect.left + rect.width / 2 - tooltipRect.width / 2;
  }
  
  // Keep tooltip within viewport bounds
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  if (left < 16) left = 16;
  if (left + tooltipRect.width > viewportWidth - 16) {
    left = viewportWidth - tooltipRect.width - 16;
  }
  if (top < 16) top = 16;
  if (top + tooltipRect.height > viewportHeight - 16) {
    top = viewportHeight - tooltipRect.height - 16;
  }
  
  tooltipElement.style.position = 'fixed';
  tooltipElement.style.top = `${top}px`;
  tooltipElement.style.left = `${left}px`;
}

/**
 * Remove all highlights
 */
function removeHighlights() {
  document.querySelectorAll('.onboarding-highlight').forEach(el => {
    el.classList.remove('onboarding-highlight');
  });
}

/**
 * Go to next step
 */
function nextStep() {
  currentStep++;
  showStep(currentStep);
}

/**
 * Go to previous step
 */
function prevStep() {
  currentStep--;
  if (currentStep < 0) currentStep = 0;
  showStep(currentStep);
}

/**
 * Skip onboarding
 */
function skipOnboarding() {
  endOnboarding();
}

/**
 * End onboarding
 */
function endOnboarding() {
  completeOnboarding();
  
  // Clean up
  if (tooltipElement) {
    tooltipElement.classList.remove('visible');
    setTimeout(() => tooltipElement?.remove(), 200);
  }
  
  if (overlayElement) {
    overlayElement.classList.add('fade-out');
    setTimeout(() => overlayElement?.remove(), 300);
  }
  
  removeHighlights();
}

/**
 * Reset onboarding (for testing)
 */
export function resetOnboarding() {
  localStorage.removeItem(ONBOARDING_KEY);
}
