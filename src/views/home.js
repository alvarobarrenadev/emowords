import { getAllWords, searchWords, sortWords, getStatistics, getAllCategories, exportData, importData } from '../storage/vocabStorage.js';
import { createWordCard } from '../components/wordCard.js';

export function renderHome(container) {
  const stats = getStatistics();
  const categories = getAllCategories();

  container.innerHTML = `
    <!-- Statistics Dashboard -->
    <div class="stats-dashboard">
      <div class="stat-card stat-total">
        <div class="stat-icon"><i class="fa-solid fa-book"></i></div>
        <div class="stat-content">
          <span class="stat-value">${stats.total}</span>
          <span class="stat-label">Total palabras</span>
        </div>
      </div>
      <div class="stat-card stat-remembered">
        <div class="stat-icon"><i class="fa-solid fa-circle-check"></i></div>
        <div class="stat-content">
          <span class="stat-value">${stats.remembered}</span>
          <span class="stat-label">Recordadas</span>
        </div>
      </div>
      <div class="stat-card stat-forgotten">
        <div class="stat-icon"><i class="fa-solid fa-rotate"></i></div>
        <div class="stat-content">
          <span class="stat-value">${stats.forgotten}</span>
          <span class="stat-label">Por repasar</span>
        </div>
      </div>
      <div class="stat-card stat-retention">
        <div class="stat-icon"><i class="fa-solid fa-chart-line"></i></div>
        <div class="stat-content">
          <span class="stat-value">${stats.retentionRate}%</span>
          <span class="stat-label">Retención</span>
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
          <i class="fa-solid fa-file-export"></i>
          <span>Exportar</span>
        </button>
        <button id="import-btn" class="action-btn" title="Importar datos">
          <i class="fa-solid fa-file-import"></i>
          <span>Importar</span>
        </button>
      </div>
    </div>
    
    <!-- Filters -->
    <div class="filters">
      <div class="filter-group">
        <i class="fa-solid fa-filter filter-icon"></i>
        <select id="filter-status">
          <option value="all">Todas</option>
          <option value="remembered">Recordadas</option>
          <option value="forgotten">Olvidadas</option>
        </select>
      </div>
      <div class="filter-group">
        <i class="fa-solid fa-tag filter-icon"></i>
        <select id="filter-type">
          <option value="all">Todos los tipos</option>
          <option value="word">Palabras</option>
          <option value="phrasal">Phrasal verbs</option>
          <option value="expression">Expresiones</option>
        </select>
      </div>
      <div class="filter-group">
        <i class="fa-solid fa-folder filter-icon"></i>
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
          <h3>No hay vocabulario</h3>
          <p>${searchInput.value.trim() 
            ? 'No se encontraron resultados para tu búsqueda.' 
            : 'Empieza a añadir palabras para construir tu vocabulario personal.'}</p>
          ${!searchInput.value.trim() 
            ? '<button class="add-word-btn" onclick="document.querySelector(\'[data-view=add]\').click()"><i class="fa-solid fa-plus"></i> Añadir primera palabra</button>' 
            : ''}
        </div>
      `;
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
        alert(`Importación exitosa: ${result.imported} palabras importadas, ${result.skipped} omitidas.`);
        // Refresh the page to update categories and stats
        location.reload();
      } else {
        alert(`Error al importar: ${result.error}`);
      }
    };
    reader.readAsText(file);
  });

  renderList();
}