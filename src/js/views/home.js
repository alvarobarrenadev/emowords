import { getAllWords, searchWords, sortWords, getStatistics, getAllCategories, exportData, importData } from '../storage/vocabStorage.js';
import { getGamificationStats } from '../storage/gamification.js';
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

  container.innerHTML = `
    <!-- Gamification Hub -->
    <div class="gamification-hub">
      <div class="stat-card streak-card">
        <div class="stat-icon streak-flame"><i class="fa-solid fa-fire"></i></div>
        <div class="stat-content">
          <span class="streak-count">${gameStats.streak} <span style="font-size: 1rem; color: #b45309;">días</span></span>
          <span class="stat-label">Racha actual</span>
        </div>
      </div>
      
      <div class="stat-card daily-goal-card">
        <div class="stat-content">
          <span class="stat-value">${gameStats.dailyGoal.count} / ${gameStats.dailyGoal.target}</span>
          <span class="stat-label">Meta diaria</span>
        </div>
        <div class="progress-ring">
          <svg width="60" height="60">
            <circle stroke="#e5e7eb" stroke-width="4" fill="transparent" r="${radius}" cx="30" cy="30" />
            <circle stroke="#3b82f6" stroke-width="4" fill="transparent" r="${radius}" cx="30" cy="30" 
              style="stroke-dasharray: ${circumference} ${circumference}; stroke-dashoffset: ${offset};" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Dynamic Dashboard -->
    <div class="dashboard-grid">
      <!-- Summary Card -->
      <div class="chart-card">
        <div class="chart-header">
          <span class="chart-title"><i class="fa-solid fa-chart-pie"></i> Resumen</span>
        </div>
        <div class="stats-dashboard" style="grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0;">
          <div class="stat-card stat-total" style="padding: 0.8rem;">
            <div class="stat-content">
              <span class="stat-value" style="font-size: 1.5rem;">${stats.total}</span>
              <span class="stat-label" style="font-size: 0.8rem;">Total</span>
            </div>
          </div>
          <div class="stat-card stat-remembered" style="padding: 0.8rem;">
            <div class="stat-content">
              <span class="stat-value" style="font-size: 1.5rem;">${stats.remembered}</span>
              <span class="stat-label" style="font-size: 0.8rem;">Recordadas</span>
            </div>
          </div>
        </div>
        <div style="margin-top: 1rem;">
          <div class="progress-label">
            <span>Tasa de Retención</span>
            <span>${stats.retentionRate}%</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill success" style="width: ${stats.retentionRate}%"></div>
          </div>
        </div>
      </div>

      <!-- Review Status Card -->
      <div class="chart-card">
        <div class="chart-header">
          <span class="chart-title"><i class="fa-solid fa-brain"></i> Estado del Conocimiento</span>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Memorizadas</span>
            <span>${stats.remembered}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill primary" style="width: ${stats.total > 0 ? (stats.remembered / stats.total * 100) : 0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Por Repasar / Olvidadas</span>
            <span>${stats.forgotten}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill warning" style="width: ${stats.total > 0 ? (stats.forgotten / stats.total * 100) : 0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Repasos Totales</span>
            <span>${stats.totalReviews}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill info" style="width: 100%; background: var(--primary-100);"></div>
          </div>
        </div>
      </div>

      <!-- Types Card -->
      <div class="chart-card">
        <div class="chart-header">
          <span class="chart-title"><i class="fa-solid fa-layer-group"></i> Por Tipo</span>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Palabras</span>
            <span>${stats.byType.word}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill primary" style="width: ${stats.total > 0 ? (stats.byType.word / stats.total * 100) : 0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Phrasal Verbs</span>
            <span>${stats.byType.phrasal}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill success" style="width: ${stats.total > 0 ? (stats.byType.phrasal / stats.total * 100) : 0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Expresiones</span>
            <span>${stats.byType.expression}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill warning" style="width: ${stats.total > 0 ? (stats.byType.expression / stats.total * 100) : 0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Conectores</span>
            <span>${stats.byType.connector}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill info" style="width: ${stats.total > 0 ? (stats.byType.connector / stats.total * 100) : 0}%"></div>
          </div>
        </div>
      </div>
    </div>

    <h2>Tu vocabulario</h2>
    
    <!-- Search and Controls Bar -->
    <div class="controls-bar">
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
    
    <!-- Filters -->
    <div class="filters">
      <div class="filter-group">
        <i class="fa-solid fa-sliders filter-icon"></i>
        <select id="filter-status">
          <option value="all">Todas</option>
          <option value="remembered">Recordadas</option>
          <option value="forgotten">Olvidadas</option>
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
  const filterStatus = document.getElementById('filter-status');
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
    words = words.filter(word => {
      const statusMatch =
        filterStatus.value === 'all' ||
        (filterStatus.value === 'remembered' && word.remembered) ||
        (filterStatus.value === 'forgotten' && !word.remembered);
      const typeMatch =
        filterType.value === 'all' || word.type === filterType.value;
      const categoryMatch =
        filterCategory.value === 'all' || word.category === filterCategory.value;
      return statusMatch && typeMatch && categoryMatch;
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
  filterStatus.addEventListener('change', renderList);
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

  renderList();
}