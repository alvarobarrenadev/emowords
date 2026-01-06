import { getAllWords, getWordsForReview, recordReview, getStatistics } from '../storage/vocabStorage.js';

export function renderReview(container) {
  let current = null;
  let revealed = false;
  let reviewQueue = [];
  let sessionStats = { correct: 0, incorrect: 0 };

  const stats = getStatistics();
  
  container.innerHTML = `
    <div class="review-header">
      <h2><i class="fa-solid fa-brain"></i> Modo Repaso</h2>
      <div class="review-progress">
        <div class="progress-stat">
          <i class="fa-solid fa-book progress-icon"></i>
          <span id="words-pending">${stats.dueForReview}</span>
          <span class="progress-label">pendientes</span>
        </div>
        <div class="progress-stat session-correct">
          <i class="fa-solid fa-circle-check progress-icon"></i>
          <span id="session-correct">0</span>
          <span class="progress-label">correctas</span>
        </div>
        <div class="progress-stat session-incorrect">
          <i class="fa-solid fa-circle-xmark progress-icon"></i>
          <span id="session-incorrect">0</span>
          <span class="progress-label">incorrectas</span>
        </div>
      </div>
    </div>
    
    <div class="review-container">
      <div id="review-card" class="review-card"></div>
      
      <div class="review-actions" id="review-actions">
        <button id="remembered-btn" class="review-btn success-btn" disabled>
          <i class="fa-solid fa-check btn-icon"></i>
          <span class="btn-text">Recordada</span>
          <span class="btn-shortcut">Tecla: <i class="fa-solid fa-arrow-right"></i></span>
        </button>
        <button id="forgotten-btn" class="review-btn danger-btn" disabled>
          <i class="fa-solid fa-xmark btn-icon"></i>
          <span class="btn-text">Olvidada</span>
          <span class="btn-shortcut">Tecla: <i class="fa-solid fa-arrow-left"></i></span>
        </button>
      </div>
      
      <div class="review-options">
        <button id="skip-btn" class="skip-btn">
          <i class="fa-solid fa-forward"></i> Saltar (Espacio)
        </button>
        <button id="shuffle-btn" class="shuffle-btn">
          <i class="fa-solid fa-shuffle"></i> Mezclar
        </button>
      </div>
    </div>
    
    <!-- Keyboard shortcut hint -->
    <div class="keyboard-hints">
      <span class="hint"><i class="fa-regular fa-keyboard"></i> Atajos:</span>
      <span class="key">Espacio</span> = Revelar/Siguiente
      <span class="key"><i class="fa-solid fa-arrow-right"></i></span> = Recordada
      <span class="key"><i class="fa-solid fa-arrow-left"></i></span> = Olvidada
    </div>
  `;

  const card = document.getElementById('review-card');
  const btnRemembered = document.getElementById('remembered-btn');
  const btnForgotten = document.getElementById('forgotten-btn');
  const btnSkip = document.getElementById('skip-btn');
  const btnShuffle = document.getElementById('shuffle-btn');
  const sessionCorrectEl = document.getElementById('session-correct');
  const sessionIncorrectEl = document.getElementById('session-incorrect');
  const wordsPendingEl = document.getElementById('words-pending');

  function loadReviewQueue() {
    reviewQueue = getWordsForReview();
    shuffleArray(reviewQueue);
    updatePendingCount();
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function updateSessionStats() {
    sessionCorrectEl.textContent = sessionStats.correct;
    sessionIncorrectEl.textContent = sessionStats.incorrect;
  }
  
  function updatePendingCount() {
    wordsPendingEl.textContent = reviewQueue.length;
  }

  function getNextWord() {
    if (reviewQueue.length === 0) {
      loadReviewQueue();
    }
    return reviewQueue.shift() || null;
  }

  function renderWord(word) {
    if (!word) {
      card.innerHTML = `
        <div class="empty-review-state">
          <div class="empty-icon"><i class="fa-solid fa-party-horn"></i></div>
          <h3>¡Excelente trabajo!</h3>
          <p>No hay palabras pendientes de repaso.</p>
          <div class="session-summary">
            <p>Esta sesión:</p>
            <div class="summary-stats">
              <span class="stat correct"><i class="fa-solid fa-circle-check"></i> ${sessionStats.correct} correctas</span>
              <span class="stat incorrect"><i class="fa-solid fa-circle-xmark"></i> ${sessionStats.incorrect} incorrectas</span>
            </div>
          </div>
          <button class="restart-btn" id="restart-review"><i class="fa-solid fa-rotate"></i> Repasar todo de nuevo</button>
        </div>
      `;
      
      btnRemembered.disabled = true;
      btnForgotten.disabled = true;
      
      document.getElementById('restart-review')?.addEventListener('click', () => {
        reviewQueue = getAllWords();
        shuffleArray(reviewQueue);
        sessionStats = { correct: 0, incorrect: 0 };
        updateSessionStats();
        renderWord(getNextWord());
      });
      
      return;
    }

    current = word;
    revealed = false;
    btnRemembered.disabled = true;
    btnForgotten.disabled = true;

    const reviewCount = word.reviewCount || 0;
    const difficulty = getDifficultyLabel(word.difficulty || 0);

    card.innerHTML = `
      <div class="review-card-inner">
        <div class="review-meta">
          <span class="tag type-tag">${getTypeLabel(word.type)}</span>
          ${word.category ? `<span class="tag category-tag"><i class="fa-solid fa-folder"></i> ${word.category}</span>` : ''}
          <span class="tag review-count-tag"><i class="fa-solid fa-chart-simple"></i> ${reviewCount} repasos</span>
          ${word.difficulty !== 0 ? `<span class="tag difficulty-tag ${difficulty.class}">${difficulty.label}</span>` : ''}
        </div>
        
        ${word.image ? `
          <div class="review-image-wrapper">
            <img src="${word.image}" alt="${word.word}" class="review-image" />
          </div>
        ` : ''}
        
        <h3 class="review-word">${word.word}</h3>
        
        <button id="show-answer" class="reveal-btn">
          <i class="fa-solid fa-eye"></i>
          <span>Mostrar respuesta</span>
        </button>
        
        <div id="review-answer" class="review-answer" style="display: none;">
          <div class="answer-content">
            <p class="meaning">${word.meaning}</p>
            
            ${word.emotion ? `
              <div class="answer-section">
                <p class="section-label"><i class="fa-solid fa-heart"></i> Asociación emocional</p>
                <p class="section-content">${word.emotion}</p>
              </div>
            ` : ''}
            
            ${word.example ? `
              <div class="answer-section">
                <p class="section-label"><i class="fa-solid fa-quote-left"></i> Ejemplo</p>
                <p class="section-content example">"${word.example}"</p>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    const showBtn = document.getElementById('show-answer');
    const answerDiv = document.getElementById('review-answer');

    showBtn.addEventListener('click', revealAnswer);
    
    function revealAnswer() {
      if (revealed) return;
      revealed = true;
      answerDiv.style.display = 'block';
      showBtn.style.display = 'none';
      btnRemembered.disabled = false;
      btnForgotten.disabled = false;
      
      // Add animation
      answerDiv.classList.add('fade-in');
    }
  }
  
  function getDifficultyLabel(difficulty) {
    if (difficulty <= -2) return { label: '<i class="fa-solid fa-star"></i> Fácil', class: 'easy' };
    if (difficulty >= 2) return { label: '<i class="fa-solid fa-fire"></i> Difícil', class: 'hard' };
    return { label: '', class: '' };
  }

  function mark(remembered) {
    if (!current) return;
    
    recordReview(current.id, remembered);
    
    if (remembered) {
      sessionStats.correct++;
      card.classList.add('correct-flash');
    } else {
      sessionStats.incorrect++;
      card.classList.add('incorrect-flash');
      // Add word back to queue for re-review
      reviewQueue.push({ ...current, remembered: false });
    }
    
    updateSessionStats();
    updatePendingCount();
    
    setTimeout(() => {
      card.classList.remove('correct-flash', 'incorrect-flash');
      renderWord(getNextWord());
    }, 300);
  }

  // Event listeners
  btnRemembered.addEventListener('click', () => mark(true));
  btnForgotten.addEventListener('click', () => mark(false));
  
  btnSkip.addEventListener('click', () => {
    if (current) {
      reviewQueue.push(current);
    }
    renderWord(getNextWord());
  });
  
  btnShuffle.addEventListener('click', () => {
    if (current) {
      reviewQueue.unshift(current);
    }
    shuffleArray(reviewQueue);
    renderWord(getNextWord());
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboard);
  
  function handleKeyboard(e) {
    // Only handle if we're on review page
    if (!document.getElementById('review-card')) return;
    
    switch (e.code) {
      case 'Space':
        e.preventDefault();
        if (!revealed) {
          document.getElementById('show-answer')?.click();
        } else {
          renderWord(getNextWord());
        }
        break;
      case 'ArrowRight':
        if (revealed && !btnRemembered.disabled) {
          mark(true);
        }
        break;
      case 'ArrowLeft':
        if (revealed && !btnForgotten.disabled) {
          mark(false);
        }
        break;
    }
  }
  
  // Initial load
  loadReviewQueue();
  renderWord(getNextWord());
  
  // Cleanup keyboard listener when leaving the page
  const cleanup = () => {
    document.removeEventListener('keydown', handleKeyboard);
  };
  
  // Store cleanup function for potential use
  window._reviewCleanup = cleanup;
}

function getTypeLabel(type) {
  switch (type) {
    case 'word': return '<i class="fa-solid fa-font"></i> Palabra';
    case 'phrasal': return '<i class="fa-solid fa-link"></i> Phrasal Verb';
    case 'expression': return '<i class="fa-solid fa-comment"></i> Expresión';
    default: return '<i class="fa-solid fa-file"></i> Otro';
  }
}