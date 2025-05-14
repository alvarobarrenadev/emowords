import { getAllWords } from '../storage/vocabStorage.js';
import { createWordCard } from '../components/wordCard.js';

export function renderHome(container) {
  const words = getAllWords();

  container.innerHTML = `
    <h2>Tu vocabulario</h2>
    <div class="filters">
      <select id="filter-status">
        <option value="all">Todas</option>
        <option value="remembered">Recordadas</option>
        <option value="forgotten">Olvidadas</option>
      </select>
      <select id="filter-type">
        <option value="all">Todos los tipos</option>
        <option value="word">Palabras</option>
        <option value="phrasal">Phrasal verbs</option>
        <option value="expression">Expresiones</option>
      </select>
    </div>
    <div id="word-list" class="word-list"></div>
  `;

  const list = document.getElementById('word-list');
  const filterStatus = document.getElementById('filter-status');
  const filterType = document.getElementById('filter-type');

  function renderList() {
    list.innerHTML = '';
    const filtered = getAllWords().filter(word => {
      const statusMatch =
        filterStatus.value === 'all' ||
        (filterStatus.value === 'remembered' && word.remembered) ||
        (filterStatus.value === 'forgotten' && !word.remembered);
      const typeMatch =
        filterType.value === 'all' || word.type === filterType.value;
      return statusMatch && typeMatch;
    });

    if (filtered.length === 0) {
      list.innerHTML = `<p>No tienes vocabulario guardado. Empieza a añadir palabras.</p>`;
    } else {
      filtered.forEach(word => {
        list.appendChild(createWordCard(word, renderList));
      });
    }
  }

  filterStatus.addEventListener('change', renderList);
  filterType.addEventListener('change', renderList);

  renderList();
}