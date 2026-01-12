/**
 * Lightweight Onboarding System
 * Shows tooltips to guide new users through the app
 */

const ONBOARDING_KEY = 'emowords_onboarding_completed';

// Onboarding steps configuration
const onboardingSteps = [
  {
    id: 'welcome',
    target: null, // Modal, no target
    title: '¡Bienvenido a EmoWords!',
    content: 'Aprende vocabulario conectando palabras con tus recuerdos personales. Te guiaremos en tus primeros pasos.',
    position: 'center'
  },
  {
    id: 'add-word',
    target: '[data-view="add"]',
    title: 'Añadir palabras',
    content: 'Aquí puedes añadir nuevas palabras con su significado y una conexión emocional.',
    position: 'bottom'
  },
  {
    id: 'emotion-field',
    target: null, // Will be set dynamically
    title: '🧠 El secreto está aquí',
    content: 'Conecta cada palabra con un recuerdo personal. Las emociones hacen que tu memoria sea 10x más fuerte.',
    position: 'top',
    highlight: true
  }
];

let currentStep = 0;
let tooltipElement = null;
let overlayElement = null;

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
  overlayElement = document.createElement('div');
  overlayElement.className = 'onboarding-overlay';
  overlayElement.innerHTML = `<div class="onboarding-backdrop"></div>`;
  document.body.appendChild(overlayElement);
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

  // Create tooltip
  tooltipElement = document.createElement('div');
  tooltipElement.className = `onboarding-tooltip ${step.position || 'bottom'}`;
  
  const isLastStep = stepIndex === onboardingSteps.length - 1;
  const isFirstStep = stepIndex === 0;

  tooltipElement.innerHTML = `
    <div class="tooltip-header">
      <span class="tooltip-step">${stepIndex + 1}/${onboardingSteps.length}</span>
      <button class="tooltip-skip" title="Saltar tutorial">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <h4 class="tooltip-title">${step.title}</h4>
    <p class="tooltip-content">${step.content}</p>
    <div class="tooltip-actions">
      ${!isFirstStep ? '<button class="tooltip-prev"><i class="fa-solid fa-arrow-left"></i> Anterior</button>' : ''}
      <button class="tooltip-next ${isLastStep ? 'finish' : ''}">
        ${isLastStep ? '¡Empezar!' : 'Siguiente'} 
        ${!isLastStep ? '<i class="fa-solid fa-arrow-right"></i>' : '<i class="fa-solid fa-rocket"></i>'}
      </button>
    </div>
  `;

  // Position tooltip
  if (step.position === 'center' || !step.target) {
    tooltipElement.classList.add('centered');
    overlayElement.appendChild(tooltipElement);
  } else {
    const targetEl = document.querySelector(step.target);
    if (targetEl) {
      positionTooltip(tooltipElement, targetEl, step.position);
      highlightElement(targetEl);
    } else {
      tooltipElement.classList.add('centered');
    }
    overlayElement.appendChild(tooltipElement);
  }

  // Add event listeners
  tooltipElement.querySelector('.tooltip-skip').addEventListener('click', skipOnboarding);
  tooltipElement.querySelector('.tooltip-next').addEventListener('click', nextStep);
  
  const prevBtn = tooltipElement.querySelector('.tooltip-prev');
  if (prevBtn) {
    prevBtn.addEventListener('click', prevStep);
  }

  // Animate in
  requestAnimationFrame(() => {
    tooltipElement.classList.add('visible');
  });
}

/**
 * Position tooltip relative to target
 */
function positionTooltip(tooltip, target, position) {
  const rect = target.getBoundingClientRect();
  const margin = 12;

  switch (position) {
    case 'bottom':
      tooltip.style.top = `${rect.bottom + margin + window.scrollY}px`;
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.transform = 'translateX(-50%)';
      break;
    case 'top':
      tooltip.style.bottom = `${window.innerHeight - rect.top + margin}px`;
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.transform = 'translateX(-50%)';
      break;
    case 'left':
      tooltip.style.top = `${rect.top + rect.height / 2 + window.scrollY}px`;
      tooltip.style.right = `${window.innerWidth - rect.left + margin}px`;
      tooltip.style.transform = 'translateY(-50%)';
      break;
    case 'right':
      tooltip.style.top = `${rect.top + rect.height / 2 + window.scrollY}px`;
      tooltip.style.left = `${rect.right + margin}px`;
      tooltip.style.transform = 'translateY(-50%)';
      break;
  }
}

/**
 * Highlight target element
 */
function highlightElement(target) {
  // Remove previous highlight
  document.querySelectorAll('.onboarding-highlight').forEach(el => {
    el.classList.remove('onboarding-highlight');
  });
  
  if (target) {
    target.classList.add('onboarding-highlight');
  }
}

/**
 * Go to next step
 */
function nextStep() {
  currentStep++;
  
  // If step requires navigation, handle it
  const step = onboardingSteps[currentStep];
  if (step && step.id === 'emotion-field') {
    // Navigate to add view first
    document.querySelector('[data-view="add"]').click();
    setTimeout(() => {
      // Update target to the actual emotion field
      step.target = '.emotion-field';
      showStep(currentStep);
    }, 300);
  } else {
    showStep(currentStep);
  }
}

/**
 * Go to previous step
 */
function prevStep() {
  currentStep--;
  if (currentStep < 0) currentStep = 0;
  
  // Navigate back if needed
  const step = onboardingSteps[currentStep];
  if (step && step.id === 'add-word') {
    document.querySelector('[data-view="home"]').click();
    setTimeout(() => showStep(currentStep), 100);
  } else {
    showStep(currentStep);
  }
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
    setTimeout(() => tooltipElement.remove(), 200);
  }
  
  if (overlayElement) {
    overlayElement.classList.add('fade-out');
    setTimeout(() => overlayElement.remove(), 300);
  }
  
  document.querySelectorAll('.onboarding-highlight').forEach(el => {
    el.classList.remove('onboarding-highlight');
  });
}

/**
 * Reset onboarding (for testing)
 */
export function resetOnboarding() {
  localStorage.removeItem(ONBOARDING_KEY);
}
