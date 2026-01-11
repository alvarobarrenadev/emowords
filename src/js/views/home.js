import { getAllWords, searchWords, sortWords, getStatistics, getAllCategories, exportData, importData, getMasteryLevel, getWordsDueCount } from '../storage/vocabStorage.js';
import { getGamificationStats, setDailyTarget } from '../storage/gamification.js';
import { starterPacks } from '../data/starterPacks.js';
import { createWordCard } from '../components/wordCard.js';
import { showToast } from '../utils/ui.js';

export function renderHome(container) {
  const stats = getStatistics();
  const categories = getAllCategories();

  const gameStats = getGamificationStats();

  // Calculate progress circle stroke
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(gameStats.dailyGoal.count / gameStats.dailyGoal.target, 1);
  const offset = circumference - (progress * circumference);

  const hasWords = stats.total > 0;
  
  container.innerHTML = `
    <!-- Dynamic Content: Hero or Dashboard -->
    ${!hasWords ? `
      <div class="welcome-hero">
        <div class="hero-content">
          <div class="hero-icon">
            <i class="fa-solid fa-layer-group"></i>
          </div>
          <h1>Tu vocabulario, <br/>conectado con tus emociones.</h1>
          <p>Olvida las listas interminables. EmoWords utiliza tus recuerdos y sensaciones para que cada palabra se quede contigo para siempre.</p>
          
          <div class="hero-actions">
            <button class="primary-hero-btn" onclick="document.querySelector('[data-view=add]').click()">
              <i class="fa-solid fa-plus"></i> Añadir mi primera palabra
            </button>
            <button class="secondary-hero-btn" onclick="document.getElementById('import-packs-btn').click()">
              <i class="fa-solid fa-download"></i> Explorar packs
            </button>
          </div>
        </div>
      </div>
    ` : `
      <!-- Gamification Hub -->
      <div class="gamification-hub animate__animated animate__fadeIn">
        
        <!-- Level Card -->
        <div class="stat-card level-card">
           <div class="icon-bg level"><i class="fa-solid fa-trophy"></i></div>
           <div class="stat-content full">
              <div class="stat-header-row">
                 <span class="stat-label">Nivel Actual</span>
                 <span class="stat-value-sm">Lvl ${gameStats.level}</span>
              </div>
              
              <div class="xp-progress-container">
                 <div class="xp-bar" style="width: ${calculateXpProgress(gameStats.totalXp, gameStats.level)}%"></div>
              </div>
              <div class="xp-meta">
                 <span>${gameStats.totalXp} XP Totales</span>
                 <span>Siguiente: ${calculateNextLevelXp(gameStats.level)} XP</span>
              </div>
           </div>
        </div>

        <!-- Streak Card -->
        <div class="stat-card streak-card">
          <div class="icon-bg flame"><i class="fa-solid fa-fire"></i></div>
          <div class="stat-content">
            <span class="stat-value">${gameStats.streak} <small>días</small></span>
            <span class="stat-label">Racha Actual</span>
            ${gameStats.streak > 0 
                ? '<div class="streak-badge active">¡En llamas! <i class="fa-solid fa-fire-flame-curved"></i></div>' 
                : '<div class="streak-badge">¡Empieza hoy!</div>'}
          </div>
        </div>
        
        <!-- Daily Goal Card -->
        <div class="stat-card daily-goal-card">
          <button class="goal-settings-btn" id="goal-settings-btn" title="Cambiar meta diaria">
            <i class="fa-solid fa-gear"></i>
          </button>
          <div class="stat-content">
             <span class="stat-value">${gameStats.dailyGoal.count}<span class="separator">/</span>${gameStats.dailyGoal.target}</span>
             <span class="stat-label">Meta Diaria</span>
             <span class="goal-msg-sm">${getGoalMessage(gameStats.dailyGoal.count, gameStats.dailyGoal.target)}</span>
          </div>
          <div class="progress-ring-mini">
             <svg width="60" height="60">
              <circle class="bg" stroke-width="4" fill="transparent" r="${radius}" cx="30" cy="30" />
              <circle class="fg" stroke-width="4" fill="transparent" r="${radius}" cx="30" cy="30" 
                style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};" />
            </svg>
             ${gameStats.dailyGoal.count >= gameStats.dailyGoal.target ? '<div class="check-mark"><i class="fa-solid fa-check"></i></div>' : ''}
          </div>
        </div>
      </div>


    `}

    <h2 class="${!hasWords ? 'hidden' : ''}" style="margin-bottom: 1.5rem;">Tu vocabulario</h2>
    
    <!-- Search and Controls Bar (Hidden if empty) -->
    <div class="controls-bar ${!hasWords ? 'hidden' : ''}">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input type="text" id="search-input" placeholder="Buscar palabra, significado, ejemplo..." />
        <button id="clear-search" class="clear-btn" style="display: none;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      
      <div class="action-buttons">
        <button id="export-btn" class="action-btn" title="Exportar datos">
          <i class="fa-solid fa-download"></i>
          <span>Exportar</span>
        </button>
        <button id="import-btn" class="action-btn" title="Importar datos">
          <i class="fa-solid fa-upload"></i>
          <span>Importar</span>
        </button>
      </div>
    </div>
    
    <!-- Filters (Hidden if empty) -->
    <div class="filters ${!hasWords ? 'hidden' : ''}">
      <div class="filter-group">
        <i class="fa-solid fa-trophy filter-icon"></i>
        <select id="filter-mastery">
          <option value="all">Todos los niveles</option>
          <option value="due">🔔 Pendientes (${stats.dueForReview})</option>
          <option value="new">🌱 Nuevo</option>
          <option value="apprentice">🌿 Aprendiz</option>
          <option value="guru">🌳 Experto</option>
          <option value="master">👑 Maestro</option>
        </select>
      </div>
      <div class="filter-group">
        <i class="fa-solid fa-shapes filter-icon"></i>
        <select id="filter-type">
          <option value="all">Todos los tipos</option>
          <option value="word">Palabras</option>
          <option value="phrasal">Phrasal verbs</option>
          <option value="expression">Expresiones</option>
          <option value="connector">Conectores</option>
        </select>
      </div>
      <div class="filter-group">
        <i class="fa-solid fa-folder-tree filter-icon"></i>
        <select id="filter-category">
          <option value="all">Todas las categorías</option>
          ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
        </select>
      </div>
      <div class="filter-group">
        <i class="fa-solid fa-arrow-down-wide-short filter-icon"></i>
        <select id="sort-by">
          <option value="date-desc">Más recientes</option>
          <option value="date-asc">Más antiguas</option>
          <option value="alpha-asc">A-Z</option>
          <option value="alpha-desc">Z-A</option>
          <option value="review-count">Más repasadas</option>
          <option value="difficulty">Más difíciles</option>
        </select>
      </div>
    </div>
    
    <!-- Results info -->
    <div id="results-info" class="results-info"></div>
    
    <!-- Word list -->
    <div id="word-list" class="word-list"></div>
    
    <!-- Hidden file input for import -->
    <input type="file" id="import-file" accept=".json" style="display: none;" />
  `;

  const list = document.getElementById('word-list');
  const filterMastery = document.getElementById('filter-mastery');
  const filterType = document.getElementById('filter-type');
  const filterCategory = document.getElementById('filter-category');
  const sortBy = document.getElementById('sort-by');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  const resultsInfo = document.getElementById('results-info');
  const exportBtn = document.getElementById('export-btn');
  const importBtn = document.getElementById('import-btn');
  const importFile = document.getElementById('import-file');

  function renderList() {
    list.innerHTML = '';
    
    // Get words based on search or all
    let words = searchInput.value.trim() 
      ? searchWords(searchInput.value.trim())
      : getAllWords();
    
    // Apply filters
    const now = Date.now();
    words = words.filter(word => {
      // Mastery filter
      let masteryMatch = true;
      if (filterMastery.value !== 'all') {
        if (filterMastery.value === 'due') {
          // Due for review (nextReviewAt <= now or never set)
          masteryMatch = !word.nextReviewAt || word.nextReviewAt <= now;
        } else {
          masteryMatch = getMasteryLevel(word) === filterMastery.value;
        }
      }
      
      const typeMatch =
        filterType.value === 'all' || word.type === filterType.value;
      const categoryMatch =
        filterCategory.value === 'all' || word.category === filterCategory.value;
      return masteryMatch && typeMatch && categoryMatch;
    });
    
    // Apply sorting
    words = sortWords(words, sortBy.value);
    
    // Update results info
    const totalWords = getAllWords().length;
    if (searchInput.value.trim()) {
      resultsInfo.innerHTML = `<span class="results-count">${words.length} resultados</span> para "<strong>${searchInput.value}</strong>"`;
      resultsInfo.style.display = 'block';
    } else if (words.length !== totalWords) {
      resultsInfo.innerHTML = `<span class="results-count">${words.length} de ${totalWords}</span> palabras`;
      resultsInfo.style.display = 'block';
    } else {
      resultsInfo.style.display = 'none';
    }

    if (words.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-book-open"></i></div>
          <h3>${searchInput.value.trim() ? 'No se encontraron resultados' : 'Tu vocabulario está vacío'}</h3>
          <p>${searchInput.value.trim() 
            ? 'Intenta con otra búsqueda.' 
            : 'Empieza añadiendo tu primera palabra o carga un pack de inicio para arrancar.'}</p>
          
          ${!searchInput.value.trim() ? `
            <div class="empty-actions">
              <button class="add-word-btn" onclick="document.querySelector('[data-view=add]').click()">
                <i class="fa-solid fa-plus"></i> Añadir mi primera palabra
              </button>
            </div>
            
            <div class="starter-packs-section">
              <div class="packs-header">
                <h4>O elige packs para empezar:</h4>
                <button id="import-packs-btn" class="import-packs-btn" disabled>
                  Selecciona packs
                </button>
              </div>
              <div class="starter-packs-grid">
                ${starterPacks.map(pack => `
                  <div class="pack-card" data-pack-id="${pack.id}">
                    <div class="pack-check"><i class="fa-solid fa-circle-check"></i></div>
                    <div class="pack-icon"><i class="fa-solid ${pack.icon}"></i></div>
                    <div class="pack-info">
                      <h4>${pack.name}</h4>
                      <p>${pack.description}</p>
                      <div class="pack-count"><i class="fa-solid fa-layer-group"></i> ${pack.words.length} palabras</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;
      
      // Multi-select logic
      const importBtn = list.querySelector('#import-packs-btn');
      if (importBtn) {
        let selectedPacks = new Set();
        
        const updateButton = () => {
          const count = selectedPacks.size;
          importBtn.disabled = count === 0;
          if (count === 0) {
            importBtn.textContent = 'Selecciona packs';
            importBtn.classList.remove('active');
          } else {
            // Calculate total words
            let totalWords = 0;
            selectedPacks.forEach(id => {
              const p = starterPacks.find(pack => pack.id === id);
              if (p) totalWords += p.words.length;
            });
            importBtn.innerHTML = `<i class="fa-solid fa-download"></i> Añadir ${count} pack${count > 1 ? 's' : ''} (${totalWords} palabras)`;
            importBtn.classList.add('active');
          }
        };

        list.querySelectorAll('.pack-card').forEach(card => {
          card.addEventListener('click', () => {
             const packId = card.dataset.packId;
             if (selectedPacks.has(packId)) {
               selectedPacks.delete(packId);
               card.classList.remove('selected');
             } else {
               selectedPacks.add(packId);
               card.classList.add('selected');
             }
             updateButton();
          });
        });
        
        importBtn.addEventListener('click', () => {
          if (selectedPacks.size === 0) return;
          
          if (confirm(`¿Añadir ${selectedPacks.size} packs a tu vocabulario?`)) {
            let allWords = [];
            selectedPacks.forEach(id => {
              const pack = starterPacks.find(p => p.id === id);
              if (pack) allWords = allWords.concat(pack.words);
            });
            
            const importPayload = JSON.stringify({ words: allWords });
            const result = importData(importPayload);
            
            if (result.success) {
               showToast('Packs añadidos', `¡Genial! Se han añadido ${result.imported} palabras nuevas.`, 'success');
               renderHome(container);
            } else {
               showToast('Error', 'Hubo un problema al cargar los packs.', 'error');
            }
          }
        });
      }
      
    } else {
      words.forEach(word => {
        list.appendChild(createWordCard(word, renderList));
      });
    }
  }

  // Event listeners
  filterMastery.addEventListener('change', renderList);
  filterType.addEventListener('change', renderList);
  filterCategory.addEventListener('change', renderList);
  sortBy.addEventListener('change', renderList);
  
  // Search with debounce
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearSearchBtn.style.display = searchInput.value ? 'flex' : 'none';
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(renderList, 300);
  });
  
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    renderList();
  });
  
  // Export functionality
  exportBtn.addEventListener('click', () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emowords-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
  
  // Import functionality
  importBtn.addEventListener('click', () => {
    importFile.click();
  });
  
  importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = importData(event.target.result);

      if (result.success) {
        showToast('Importación completada', `${result.imported} palabras importadas correctamente.`, 'success');
        setTimeout(() => location.reload(), 1500);
      } else {
        showToast('Error de importación', result.error, 'error');
      }
    };
    reader.readAsText(file);
  });

  // Daily Goal Settings Modal
  const goalSettingsBtn = document.getElementById('goal-settings-btn');
  if (goalSettingsBtn) {
    goalSettingsBtn.addEventListener('click', () => {
      openGoalSettingsModal();
    });
  }

  function openGoalSettingsModal() {
    // Remove existing modal if any
    document.querySelector('.goal-settings-modal')?.remove();
    
    const currentTarget = getGamificationStats().dailyGoal.target;
    const options = [5, 10, 15, 20, 30, 50];
    
    const modal = document.createElement('div');
    modal.className = 'goal-settings-modal edit-modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content" style="max-width: 400px;">
        <div class="modal-header">
          <h3><i class="fa-solid fa-bullseye"></i> Meta Diaria</h3>
          <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="goal-options-grid">
          ${options.map(opt => `
            <button class="goal-option ${opt === currentTarget ? 'active' : ''}" data-value="${opt}">
              <span class="goal-number">${opt}</span>
              <span class="goal-label">palabras</span>
            </button>
          `).join('')}
        </div>
        <div class="modal-actions" style="margin-top: 1.5rem;">
          <button type="button" class="btn-cancel">Cancelar</button>
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
    
    // Goal option selection
    modal.querySelectorAll('.goal-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const value = parseInt(btn.dataset.value);
        setDailyTarget(value);
        showToast('Meta actualizada', `Tu nueva meta diaria es ${value} palabras.`, 'success');
        closeModal();
        // Re-render home to update the display
        renderHome(container);
      });
    });
    
    // Close on Escape
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    });
  }

  renderList();
}

function calculateNextLevelXp(level) {
    return 100 * Math.pow(level, 2);
}

function calculateXpProgress(currentXp, currentLevel) {
    const currentLevelBaseXp = 100 * Math.pow(currentLevel - 1, 2);
    const nextLevelXp = 100 * Math.pow(currentLevel, 2);
    const range = nextLevelXp - currentLevelBaseXp;
    const progress = currentXp - currentLevelBaseXp;
    return Math.min(100, Math.max(0, (progress / range) * 100));
}

function getGoalMessage(count, target) {
    if (count >= target) return "¡Objetivo completado!";
    if (count >= target * 0.75) return "¡Casi lo tienes!";
    if (count >= target * 0.5) return "¡Ya vas por la mitad!";
    return "¡Vamos a por ello!";
}