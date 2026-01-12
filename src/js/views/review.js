import { getAllWords, getWordsForReview, recordReview, getStatistics, getMasteryLevel } from '../storage/vocabStorage.js';
import { updateProgress, getGamificationStats, getStatsForAchievements } from '../storage/gamification.js';
import { checkAchievements } from '../storage/achievements.js';
import { showAchievementsUnlocked, showLevelUp, checkAndShowTimeAchievements } from '../components/achievementNotification.js';
import { speak } from '../utils/tts.js';
import { showToast } from '../utils/ui.js';

export function renderReview(container) {
  let currentMode = null; // 'flashcard', 'quiz', 'typing', 'listening'
  let current = null;
  let revealed = false;
  let reviewQueue = [];
  let sessionStats = { correct: 0, incorrect: 0, xp: 0 };
  let failedAttempts = new Map(); // Track retry attempts per word
  const MAX_RETRIES = 2; // Maximum times a failed word can be re-queued
  
  // Initialize queue once
  reviewQueue = getWordsForReview();
  shuffleArray(reviewQueue);

  // Main Render Router
  function render() {
    container.innerHTML = '';
    
    if (!currentMode) {
      renderModeSelection();
    } 
    // If currentMode exists, the specific mode handler (mountSessionUI) takes over control of the container
    // or we can implement a resume logic here if needed.
    // For now, simple router:
  }

  // ==================== MODE SELECTION ====================
  function renderModeSelection() {
    const todoCount = reviewQueue.length;
    
    container.innerHTML = `
      <h2 style="text-align: center; justify-content: center; margin-bottom: 0.5rem;">Modo de Repaso</h2>
      <p style="text-align: center; color: var(--gray-500); margin-bottom: 2rem;">
        Tienes <strong style="color: var(--primary-600);">${todoCount}</strong> palabras pendientes
      </p>
      
      ${todoCount === 0 ? `
        <div class="empty-review-state">
          <div class="empty-review-icon">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <h3>¡Todo al día!</h3>
          <p>No tienes palabras pendientes para repasar. Añade más vocabulario para seguir aprendiendo.</p>
          <div class="empty-review-actions">
            <button class="primary-btn" onclick="document.querySelector('[data-view=add]').click()">
              <i class="fa-solid fa-plus"></i> Añadir palabras
            </button>
            <button class="secondary-btn" id="explore-packs-review-btn">
              <i class="fa-solid fa-download"></i> Explorar packs
            </button>
          </div>
        </div>
      ` : ''}
      
      <div class="mode-grid">
        <div class="mode-card featured" data-mode="mixed">
          <div class="mode-badge">⭐ Recomendado</div>
          <div class="mode-icon"><i class="fa-solid fa-shuffle"></i></div>
          <div class="mode-title">Mixto</div>
          <div class="mode-desc">Combina todos los modos aleatoriamente. ¡La forma más completa de repasar!</div>
        </div>
        
        <div class="mode-card" data-mode="flashcard">
          <div class="mode-icon"><i class="fa-solid fa-layer-group"></i></div>
          <div class="mode-title">Flashcards</div>
          <div class="mode-desc">El método clásico. Voltea la tarjeta para ver la respuesta.</div>
        </div>
        
        <div class="mode-card" data-mode="quiz">
          <div class="mode-icon"><i class="fa-solid fa-list-check"></i></div>
          <div class="mode-title">Quiz</div>
          <div class="mode-desc">Selecciona la respuesta correcta entre 4 opciones.</div>
        </div>
        
        <div class="mode-card" data-mode="typing">
          <div class="mode-icon"><i class="fa-solid fa-keyboard"></i></div>
          <div class="mode-title">Escritura</div>
          <div class="mode-desc">Escribe la palabra correctamente. Mejora tu spelling.</div>
        </div>
        
        <div class="mode-card" data-mode="listening">
          <div class="mode-icon"><i class="fa-solid fa-headphones"></i></div>
          <div class="mode-title">Listening</div>
          <div class="mode-desc">Escucha la palabra y selecciona el significado correcto.</div>
        </div>
      </div>
    `;
    
    container.querySelectorAll('.mode-card').forEach(card => {
      card.addEventListener('click', () => {
        currentMode = card.dataset.mode;
        console.log(`Starting mode: ${currentMode} with queue size: ${reviewQueue.length}`);
        
        if (reviewQueue.length === 0) {
           showToast('Sin palabras', 'No hay palabras pendientes para repasar ahora.', 'info');
           renderSummary(container);
           return;
        }
        
        // Force full re-render to switch to Session UI
        render(); 
        
        // Initialize Session
        mountSessionUI();
        renderWord();
      });
    });
    
    // Event listener for explore packs button in empty state
    const exploreBtn = container.querySelector('#explore-packs-review-btn');
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

  // ==================== SESSION UI ====================
  function mountSessionUI() {
     // Only create if it doesn't exist to avoid duplicates
     if (container.querySelector('.review-header')) return;
     
     const div = document.createElement('div');
     div.className = 'review-header';
     div.innerHTML = `
       <button class="back-btn" id="exit-mode" title="Salir"><i class="fa-solid fa-arrow-left"></i></button>
       <div class="review-progress">
         <div class="progress-stat" id="stat-queue">
           <i class="fa-solid fa-book progress-icon"></i>
           <span class="val">${reviewQueue.length}</span>
         </div>
         <div class="progress-stat session-correct" id="stat-correct">
           <i class="fa-solid fa-check progress-icon"></i>
           <span class="val">${sessionStats.correct}</span>
         </div>
         <div class="progress-stat" style="color: var(--warning-600); background: var(--warning-50);" id="stat-xp">
           <i class="fa-solid fa-bolt progress-icon"></i>
           <span class="val">${sessionStats.xp} XP</span>
         </div>
       </div>
     `;
     container.insertBefore(div, container.firstChild); // Insert at top
     
     const exitBtn = document.getElementById('exit-mode');
     exitBtn.addEventListener('click', (e) => {
       e.preventDefault();
       if (sessionStats.correct > 0 || sessionStats.incorrect > 0) {
         if (confirm('¿Salir del modo repaso? Tu progreso se perderá.')) {
            finishSession();
         }
       } else {
          finishSession();
       }
     });
 
     // Container for Active Content
     const content = document.createElement('div');
     content.id = 'active-content';
     content.className = 'review-container';
     container.appendChild(content);
  }
  
  function updateSessionStats() {
     const qVal = document.querySelector('#stat-queue .val');
     const cVal = document.querySelector('#stat-correct .val');
     const xVal = document.querySelector('#stat-xp .val');
     
     // Show remaining words (queue only, current is being processed)
     if (qVal) qVal.textContent = reviewQueue.length;
     if (cVal) cVal.textContent = sessionStats.correct;
     if (xVal) xVal.textContent = `${sessionStats.xp} XP`;
  }
 
  function finishSession() {
      currentMode = null;
      render(); // Back to selection
  }

  // Removed old renderSessionHeader and renderActiveMode as they are now merged/refactored logic
  // The 'render' function handles the top-level switching. 
  // mountSessionUI is called explicitly when entering a mode.

  // ==================== LOGIC LOOP ====================


  // ==================== LOGIC LOOP ====================
  function getNextWord() {
    return reviewQueue.shift() || null;
  }

  function renderWord() {
    if (!currentMode) { render(); return; }
    
    // Clear previous view
    const content = document.getElementById('active-content');
    if (!content) { render(); return; } // Safety
    
    current = getNextWord();
    
    if (!current) {
        renderSummary(content);
        return;
    }
    
    // Determine which renderer to use
    let activeMode = currentMode;
    
    // Mixed mode: randomly select a mode for each word
    if (currentMode === 'mixed') {
      const modes = ['flashcard', 'quiz', 'typing', 'listening'];
      activeMode = modes[Math.floor(Math.random() * modes.length)];
    }
    
    // Dispatch to specific renderer
    switch (activeMode) {
      case 'flashcard': renderFlashcard(content); break;
      case 'quiz': renderQuiz(content); break;
      case 'typing': renderTyping(content); break;
      case 'listening': renderListening(content); break;
    }
  }

  // ==================== RENDERERS ====================
  
  // --- FLASHCARD ---
  function renderFlashcard(container) {
    revealed = false;
    const reviewCount = current.reviewCount || 0;
    
    container.innerHTML = `
      <div class="review-card" id="review-card">
        <div class="review-card-inner">
           <div class="review-meta">
              <span class="tag type-tag">${getTypeLabel(current.type)}</span>
              ${current.category ? `<span class="tag category-tag"><i class="fa-solid fa-folder"></i> ${current.category}</span>` : ''}
           </div>

           <div class="review-header-row" style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 1rem;">
              <h3 class="review-word" style="margin-bottom: 0;">${current.word}</h3>
              <button class="speak-btn" id="review-speak-btn" title="Escuchar">
                <i class="fa-solid fa-volume-high"></i>
              </button>
           </div>
           
           ${current.image ? `<img src="${current.image}" class="review-image" style="max-height: 200px; object-fit: contain; margin: 0 auto 1rem; display: block;" />` : ''}

           <button id="show-answer" class="reveal-btn">
              <i class="fa-solid fa-eye"></i>
              <span>Mostrar respuesta</span>
           </button>
           
           <div id="review-answer" class="review-answer" style="display: none;">
              <div class="answer-content">
                <p class="meaning">${current.meaning}</p>
                ${current.example ? `<p class="example">"${current.example}"</p>` : ''}
              </div>
           </div>
        </div>
        
        <div class="review-actions" id="review-actions" style="margin-top: 1rem;">
           <button id="remembered-btn" class="review-btn success-btn" disabled><i class="fa-solid fa-circle-check"></i> Recordada</button>
           <button id="forgotten-btn" class="review-btn danger-btn" disabled><i class="fa-solid fa-circle-xmark"></i> Olvidada</button>
        </div>
      </div>
    `;
    
    // Events
    document.getElementById('review-speak-btn').addEventListener('click', (e) => { e.stopPropagation(); speak(current.word); });
    
    const showBtn = document.getElementById('show-answer');
    const answerDiv = document.getElementById('review-answer');
    const btnRem = document.getElementById('remembered-btn');
    const btnFor = document.getElementById('forgotten-btn');
    
    // Auto-play TTS?
    // checkSettingsAndSpeak(current.word);

    showBtn.addEventListener('click', () => {
        revealed = true;
        answerDiv.style.display = 'block';
        showBtn.style.display = 'none';
        btnRem.disabled = false;
        btnFor.disabled = false;
        answerDiv.classList.add('fade-in');
    });
    
    btnRem.addEventListener('click', () => handleResult(true));
    btnFor.addEventListener('click', () => handleResult(false));

    // Keyboard
    registerKeyboard((key) => {
        if (key === 'Space' && !revealed) showBtn.click();
        if (key === 'ArrowRight' && revealed) handleResult(true);
        if (key === 'ArrowLeft' && revealed) handleResult(false);
    });
  }
  
  // --- QUIZ ---
  function renderQuiz(container) {
    // Generate options: 1 correct, 3 distractors
    const allWords = getAllWords();
    const distractors = allWords
        .filter(w => w.id !== current.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    
    const options = [current, ...distractors];
    shuffleArray(options);
    
    container.innerHTML = `
      <div class="quiz-container">
         <div class="quiz-question">
            <h3 class="quiz-word">${current.word}</h3>
            <button class="speak-btn" id="quiz-speak-btn" style="margin: 0 auto; width: 40px; height: 40px; font-size: 1.2rem;">
                <i class="fa-solid fa-volume-high"></i>
            </button>
         </div>

         <div class="quiz-options">
            ${options.map(opt => `
                <button class="quiz-option" data-id="${opt.id}">
                    ${opt.meaning}
                </button>
            `).join('')}
         </div>
      </div>
    `;

    document.getElementById('quiz-speak-btn').addEventListener('click', () => speak(current.word));
    // checkSettingsAndSpeak(current.word);

    const optionBtns = container.querySelectorAll('.quiz-option');
    let answered = false;

    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (answered) return;
            answered = true;
            
            // Use string comparison to handle decimal IDs correctly
            const selectedId = String(btn.dataset.id);
            const isCorrect = selectedId === String(current.id);
            
            if (isCorrect) {
                 btn.classList.add('correct');
                 setTimeout(() => handleResult(true), 800);
            } else {
                 btn.classList.add('wrong');
                 // Highlight correct
                 optionBtns.forEach(b => {
                     if (String(b.dataset.id) === String(current.id)) b.classList.add('correct');
                 });
                 setTimeout(() => handleResult(false), 1500);
            }
        });
    });
  }

  // --- TYPING ---
  function renderTyping(container) {
    container.innerHTML = `
      <div class="typing-container">
         <div class="review-card-inner" style="margin-bottom: 2rem;">
             <p style="font-size: 1.5rem; margin-bottom: 0.5rem; font-weight:700; color:var(--primary-600);">${current.meaning}</p>
             ${current.example ? `<p style="font-style:italic; color:var(--gray-500)">"${current.example.replace(new RegExp(current.word, 'gi'), '___')}"</p>` : ''}
         </div>
         
         <input type="text" class="typing-input" id="type-input" placeholder="Escribe la palabra en inglés..." autocomplete="off">
         
         <button id="check-btn" class="add-word-btn" style="width: 100%;">Comprobar</button>
         <button id="give-up-btn" style="background:none; border:none; color:var(--gray-500); margin-top:1rem; cursor:pointer;">No lo sé</button>
      </div>
    `;
    
    // Auto-focus input
    setTimeout(() => document.getElementById('type-input').focus(), 100);

    const input = document.getElementById('type-input');
    const checkBtn = document.getElementById('check-btn');
    const giveUpBtn = document.getElementById('give-up-btn');
    
    function check() {
        const val = input.value.trim().toLowerCase();
        if (val === current.word.toLowerCase()) {
            input.classList.add('correct');
            checkBtn.innerHTML = '<i class="fa-solid fa-check"></i> Correcto';
            speak(current.word);
            setTimeout(() => handleResult(true), 1000);
        } else {
            input.classList.add('wrong');
            speak('Incorrect', 'en-US'); 
            setTimeout(() => input.classList.remove('wrong'), 500);
        }
    }
    
    checkBtn.addEventListener('click', check);
    input.addEventListener('keydown', e => { if(e.key === 'Enter') check(); });
    
    giveUpBtn.addEventListener('click', () => {
         input.value = current.word;
         input.classList.add('wrong'); // Visual feedback red but showing word
         speak(current.word);
         setTimeout(() => handleResult(false), 2000);
    });
  }

  // --- LISTENING ---
  function renderListening(container) {
     // Similar to Quiz but hides word initially
     const allWords = getAllWords();
     const distractors = allWords
        .filter(w => w.id !== current.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    
    const options = [current, ...distractors];
    shuffleArray(options);

    container.innerHTML = `
      <div class="quiz-container">
         <div class="quiz-question">
            <div style="font-size: 4rem; color: var(--primary-500); cursor: pointer; margin-bottom: 1rem;" id="listen-icon">
                <i class="fa-solid fa-circle-play"></i>
            </div>
            <p style="color: var(--gray-500);">Escucha y selecciona el significado</p>
         </div>

         <div class="quiz-options">
            ${options.map(opt => `
                <button class="quiz-option" data-id="${opt.id}">
                    ${opt.meaning}
                </button>
            `).join('')}
         </div>
      </div>
    `;
    
    const playIcon = document.getElementById('listen-icon');
    const play = () => {
        playIcon.style.transform = 'scale(0.9)';
        setTimeout(() => playIcon.style.transform = 'scale(1)', 150);
        speak(current.word);
    };
    
    playIcon.addEventListener('click', play);
    setTimeout(play, 500); // Auto-play

    const optionBtns = container.querySelectorAll('.quiz-option');
    let answered = false;

    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (answered) return;
            answered = true;
            
            // Use string comparison to handle decimal IDs correctly
            const selectedId = String(btn.dataset.id);
            const isCorrect = selectedId === String(current.id);
            
            if (isCorrect) {
                 btn.classList.add('correct');
                 setTimeout(() => handleResult(true), 800);
            } else {
                 btn.classList.add('wrong');
                 optionBtns.forEach(b => {
                     if (String(b.dataset.id) === String(current.id)) b.classList.add('correct');
                 });
                 setTimeout(() => handleResult(false), 1500);
            }
        });
    });
  }

  // ==================== RESULT HANDLER ====================
  function handleResult(success) {
    try {
        if (!current) return;
        
        // Update SRS
        recordReview(current.id, success);
        
        // Update Session Stats
        if (success) {
            sessionStats.correct++;
            sessionStats.xp += 10;
            // Gamification
            try { updateProgress(1); } catch (e) { console.error(e); }
            // Clear retry count on success
            failedAttempts.delete(current.id);
        } else {
            sessionStats.incorrect++;
            
            // Check retry limit before re-queuing
            const attempts = failedAttempts.get(current.id) || 0;
            if (attempts < MAX_RETRIES) {
                failedAttempts.set(current.id, attempts + 1);
                // Re-queue the word for another attempt
                reviewQueue.push(current);
            }
            // If max retries reached, word is dropped from session
        }
        
        // Clear current before getting next
        current = null;
        
        // Next
        updateSessionStats();
        renderWord();
    } catch (e) {
        console.error('Error in handleResult:', e);
    }
  }

  function renderSummary(container) {
    try {
        // Check if it was a perfect session (no mistakes, at least 5 words)
        const isPerfect = sessionStats.incorrect === 0 && sessionStats.correct >= 5;
        
        // Update progress and check for level up
        const progressResult = updateProgress(0, { perfectSession: isPerfect });
        
        // Hide session header for cleaner summary view
        const sessionHeader = document.querySelector('.review-header');
        if (sessionHeader) sessionHeader.style.display = 'none';
        
        // Safe get stats
        let game;
        try {
            game = getGamificationStats();
        } catch (e) {
            game = { streak: 0, dailyGoal: { count: 0, target: 20 } };
        }
        
        // Check for new achievements
        const vocabStats = getStatistics();
        const statsForAchievements = getStatsForAchievements(vocabStats);
        const newAchievements = checkAchievements(statsForAchievements);
        
        // Check time-based achievements
        checkAndShowTimeAchievements();
        
        container.innerHTML = `
          <div class="empty-review-state">
            <div class="empty-icon" style="color: var(--success-500); animation: bounce 1s infinite;"><i class="fa-solid fa-trophy"></i></div>
            <h3>¡Sesión completada!</h3>
            <p>Has ganado <strong style="color:var(--warning-500)">${sessionStats.xp} XP</strong></p>
            
            ${isPerfect ? `
              <div class="perfect-session-badge" style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; padding: 0.5rem 1rem; border-radius: 999px; font-weight: 600; margin: 0.5rem 0;">
                <i class="fa-solid fa-star"></i> ¡Sesión Perfecta!
              </div>
            ` : ''}
            
            <div class="session-summary">
                <div class="summary-stats">
                  <span class="stat correct"><i class="fa-solid fa-circle-check"></i> ${sessionStats.correct}</span>
                  <span class="stat incorrect"><i class="fa-solid fa-circle-xmark"></i> ${sessionStats.incorrect}</span>
                </div>
            </div>
            
            <div class="streak-mini" style="margin: 1.5rem 0; padding: 1rem; background: #fffbeb; border-radius: 8px; border: 1px solid #fcd34d;">
                <p style="color: #b45309; font-weight: bold;"><i class="fa-solid fa-fire"></i> Racha: ${game.streak} días</p>
                <p style="font-size: 0.9rem; color: #92400e;">Meta diaria: ${game.dailyGoal.count} / ${game.dailyGoal.target}</p>
            </div>
    
            <button class="add-word-btn" id="finish-btn">Volver al inicio</button>
          </div>
        `;
        
        // Show level up celebration if applicable
        if (progressResult.leveledUp) {
          setTimeout(() => {
            showLevelUp(progressResult.newLevel);
          }, 500);
        }
        
        // Show achievement notifications
        if (newAchievements.length > 0) {
          setTimeout(() => {
            showAchievementsUnlocked(newAchievements);
          }, progressResult.leveledUp ? 5500 : 1000);
        }
        
        // Fire confetti!
        if (window.confetti || window.canvasConfetti) {
             const c = window.confetti || window.canvasConfetti;
             c({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } else {
            import('canvas-confetti').then(module => {
                const confetti = module.default;
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }).catch(e => console.log('Confetti not found', e));
        }
    
        const btn = document.getElementById('finish-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                currentMode = null;
                // Navigate home properly
                const homeBtn = document.querySelector('[data-view="home"]');
                if (homeBtn) homeBtn.click();
                else render(); 
            });
        }
    } catch (e) {
        console.error('Error in renderSummary:', e);
        container.innerHTML = '<p class="error">Error al mostrar resumen. <button onclick="location.reload()">Recargar</button></p>';
    }
  }

  
  // ==================== UTILS ====================
  let cleanupKeyboard = null;
  function registerKeyboard(callback) {
      if (cleanupKeyboard) cleanupKeyboard();
      
      const handler = (e) => {
          if (!document.getElementById('active-content')) return;
          if (document.activeElement.tagName === 'INPUT') return; // Don't trigger if typing
          callback(e.code);
      };
      document.addEventListener('keydown', handler);
      cleanupKeyboard = () => document.removeEventListener('keydown', handler);
      // Hook into global cleanup if needed
      window._reviewCleanup = cleanupKeyboard;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function getTypeLabel(type) {
     const types = { word: 'Palabra', phrasal: 'Phrasal Verb', expression: 'Expresión', connector: 'Conector' };
     return types[type] || 'Otro';
  }

  // Initial Render
  render();
}