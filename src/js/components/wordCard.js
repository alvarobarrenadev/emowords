import { updateWord, deleteWord, checkDuplicateWord } from '../storage/vocabStorage.js';

import { speak } from '../utils/tts.js';

export function createWordCard(word, onUpdate) {
  const card = document.createElement('div');
  card.className = 'word-card';
  card.dataset.wordId = word.id;

  const reviewCount = word.reviewCount || 0;
  const createdDate = word.createdAt ? new Date(word.createdAt).toLocaleDateString() : '';

  card.innerHTML = `
    ${word.image ? `<img src="${word.image}" alt="${word.word}" class="word-image" />` : ''}

    <div class="tags">
      <span class="tag type-tag">${getTypeLabel(word.type)}</span>
      <span class="tag ${word.remembered ? 'remembered' : 'forgotten'}">
        <i class="fa-solid ${word.remembered ? 'fa-check' : 'fa-rotate'}"></i>
        ${word.remembered ? 'Recordada' : 'Olvidada'}
      </span>
      ${word.category ? `<span class="tag category-tag"><i class="fa-solid fa-folder"></i> ${word.category}</span>` : ''}
    </div>

    <div class="word-info">
      <div class="word-header-row">
        <h3>${word.word}</h3>
        <button class="speak-btn" title="Escuchar pronunciación">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>
      <p class="meaning-text">${word.meaning}</p>

      ${word.emotion ? `
        <p class="section-label"><i class="fa-solid fa-heart"></i> Asociación emocional</p>
        <p class="emotion-text">${word.emotion}</p>` : ''}

      ${word.example ? `
        <p class="section-label"><i class="fa-solid fa-quote-left"></i> Ejemplo</p>
        <p class="example">${word.example}</p>` : ''}
      
      <div class="word-meta">
        ${reviewCount > 0 ? `<span class="meta-item"><i class="fa-solid fa-chart-simple"></i> ${reviewCount} repasos</span>` : ''}
        ${createdDate ? `<span class="meta-item"><i class="fa-regular fa-calendar"></i> ${createdDate}</span>` : ''}
      </div>
    </div>

    <div class="actions">
      <button class="action-btn edit-btn" title="Editar">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button class="action-btn toggle ${word.remembered ? 'unmark' : 'mark'}">
        <i class="fa-solid ${word.remembered ? 'fa-rotate-left' : 'fa-check'}"></i>
        ${word.remembered ? 'Desmarcar' : 'Marcar'}
      </button>
      <button class="action-btn delete" title="Eliminar">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

  // Speak button
  card.querySelector('.speak-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    speak(word.word);
  });

  // Toggle remembered status
  card.querySelector('.toggle').addEventListener('click', () => {
    word.remembered = !word.remembered;
    updateWord(word);
    onUpdate();
  });

  // Delete word
  card.querySelector('.delete').addEventListener('click', () => {
    if (confirm(`¿Eliminar "${word.word}"?`)) {
      deleteWord(word.id);
      onUpdate();
    }
  });

  // Edit word
  card.querySelector('.edit-btn').addEventListener('click', () => {
    openEditModal(word, onUpdate);
  });

  return card;
}

function openEditModal(word, onUpdate) {
  // Remove existing modal if any
  document.querySelector('.edit-modal')?.remove();
  
  const modal = document.createElement('div');
  modal.className = 'edit-modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3><i class="fa-solid fa-pen-to-square"></i> Editar palabra</h3>
        <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <form class="edit-form">
        <div class="form-row">
          <div class="form-field">
            <label><i class="fa-solid fa-font"></i> Palabra</label>
            <input type="text" id="edit-word" value="${escapeHtml(word.word)}" required />
          </div>
          <div class="form-field">
            <label><i class="fa-solid fa-language"></i> Significado</label>
            <input type="text" id="edit-meaning" value="${escapeHtml(word.meaning)}" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label><i class="fa-solid fa-tag"></i> Tipo</label>
            <select id="edit-type">
              <option value="word" ${word.type === 'word' ? 'selected' : ''}>Palabra</option>
              <option value="phrasal" ${word.type === 'phrasal' ? 'selected' : ''}>Phrasal verb</option>
              <option value="expression" ${word.type === 'expression' ? 'selected' : ''}>Expresión</option>
              <option value="connector" ${word.type === 'connector' ? 'selected' : ''}>Conector</option>
            </select>
          </div>
          <div class="form-field">
            <label><i class="fa-solid fa-folder"></i> Categoría</label>
            <input type="text" id="edit-category" value="${escapeHtml(word.category || '')}" />
          </div>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-heart"></i> Asociación emocional</label>
          <textarea id="edit-emotion" rows="3">${escapeHtml(word.emotion || '')}</textarea>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-quote-left"></i> Ejemplo</label>
          <input type="text" id="edit-example" value="${escapeHtml(word.example || '')}" />
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-image"></i> URL de imagen</label>
          <input type="url" id="edit-image" value="${escapeHtml(word.image || '')}" />
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-cancel">Cancelar</button>
          <button type="submit" class="btn-save"><i class="fa-solid fa-check"></i> Guardar cambios</button>
        </div>
        <div class="edit-feedback" style="display: none; color: var(--danger); font-size: 0.9rem; margin-top: 1rem; text-align: center;"></div>
      </form>
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
  
  // Save handler
  modal.querySelector('.edit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newWord = document.getElementById('edit-word').value.trim();
    const feedbackEl = modal.querySelector('.edit-feedback');
    
    if (checkDuplicateWord(newWord, word.id)) {
      feedbackEl.textContent = `La palabra "${newWord}" ya existe.`;
      feedbackEl.style.display = 'block';
      return;
    }

    word.word = newWord;
    word.meaning = document.getElementById('edit-meaning').value.trim();
    word.type = document.getElementById('edit-type').value;
    word.category = document.getElementById('edit-category').value.trim() || null;
    word.emotion = document.getElementById('edit-emotion').value.trim();
    word.example = document.getElementById('edit-example').value.trim();
    word.image = document.getElementById('edit-image').value.trim();
    
    updateWord(word);
    closeModal();
    onUpdate();
  });
  
  // Close on Escape
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getTypeLabel(type) {
  switch (type) {
    case 'word': return '<i class="fa-solid fa-font"></i> Palabra';
    case 'phrasal': return '<i class="fa-solid fa-link"></i> Phrasal Verb';
    case 'expression': return '<i class="fa-solid fa-comment"></i> Expresión';
    case 'connector': return '<i class="fa-solid fa-arrows-left-right"></i> Conector';
    default: return '<i class="fa-solid fa-file"></i> Otro';
  }
}