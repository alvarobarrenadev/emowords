import { updateWord, deleteWord, checkDuplicateWord, getMasteryInfo, getNextReviewLabel, isDueToday } from '../storage/vocabStorage.js';

import { speak } from '../utils/tts.js';

export function createWordCard(word, onUpdate) {
  const card = document.createElement('div');
  card.className = 'word-card';
  card.dataset.wordId = word.id;

  const reviewCount = word.reviewCount || 0;
  const createdDate = word.createdAt ? new Date(word.createdAt).toLocaleDateString() : '';
  const mastery = getMasteryInfo(word);
  const nextReview = getNextReviewLabel(word);
  const dueNow = isDueToday(word);

  card.innerHTML = `
    ${word.image ? `<img src="${word.image}" alt="${word.word}" class="word-image" />` : ''}

    <div class="tags">
      <span class="tag type-tag type-${word.type}">${getTypeLabel(word.type)}</span>
      <span class="tag mastery-tag ${mastery.class}" title="${mastery.label}">
        <i class="fa-solid ${mastery.icon}"></i>
        ${mastery.label}
      </span>
      ${dueNow ? `<span class="tag due-tag"><i class="fa-solid fa-clock"></i> ${nextReview}</span>` : ''}
      ${word.category ? `<span class="tag category-tag"><i class="fa-solid fa-folder"></i> ${word.category}</span>` : ''}
    </div>

    <div class="mastery-progress-bar ${mastery.class}">
      <div class="mastery-progress-fill" style="width: ${mastery.percent}%"></div>
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
        <div class="card-section emotion-section">
          <p class="section-label"><i class="fa-solid fa-heart"></i> Asociación emocional</p>
          <p class="emotion-text">${word.emotion}</p>
        </div>` : ''}

      ${word.example ? `
        <div class="card-section example-section">
          <p class="section-label"><i class="fa-solid fa-quote-left"></i> Ejemplo</p>
          <p class="example">${word.example}</p>
        </div>` : ''}
      
      <div class="word-meta">
        ${reviewCount > 0 ? `<span class="meta-item"><i class="fa-solid fa-chart-simple"></i> ${reviewCount} repasos</span>` : ''}
        ${!dueNow && word.nextReviewAt ? `<span class="meta-item next-review"><i class="fa-solid fa-calendar-check"></i> Próximo: ${nextReview}</span>` : ''}
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
          <label><i class="fa-solid fa-image"></i> Imagen</label>
          <div class="image-tabs">
            <button type="button" class="image-tab active" data-tab="url"><i class="fa-solid fa-link"></i> URL</button>
            <button type="button" class="image-tab" data-tab="upload"><i class="fa-solid fa-upload"></i> Subir</button>
          </div>
          <div class="image-tab-content" id="tab-url">
            <input type="url" id="edit-image" value="${escapeHtml(word.image || '')}" placeholder="https://ejemplo.com/imagen.jpg" />
          </div>
          <div class="image-tab-content" id="tab-upload" style="display: none;">
            <div class="file-dropzone" id="edit-dropzone">
              <input type="file" id="edit-image-file" accept="image/*" />
              <div class="dropzone-content">
                <i class="fa-solid fa-cloud-arrow-up"></i>
                <span class="dropzone-text">Arrastra una imagen aquí</span>
                <span class="dropzone-subtext">o haz clic para seleccionar</span>
              </div>
            </div>
          </div>
          ${word.image ? `<div class="image-preview-mini"><img src="${escapeHtml(word.image)}" alt="Preview" /></div>` : ''}
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
  
  // Image tabs logic
  let uploadedImageData = null;
  
  modal.querySelectorAll('.image-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      modal.querySelectorAll('.image-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const tabId = tab.dataset.tab;
      modal.querySelector('#tab-url').style.display = tabId === 'url' ? 'block' : 'none';
      modal.querySelector('#tab-upload').style.display = tabId === 'upload' ? 'block' : 'none';
    });
  });
  
  // Handle file upload
  const fileInput = modal.querySelector('#edit-image-file');
  const dropzone = modal.querySelector('#edit-dropzone');
  
  if (fileInput && dropzone) {
    // Drag and drop events
    ['dragenter', 'dragover'].forEach(event => {
      dropzone.addEventListener(event, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });
    
    ['dragleave', 'drop'].forEach(event => {
      dropzone.addEventListener(event, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });
    
    dropzone.addEventListener('drop', (e) => {
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        processFile(file);
      }
    });
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) processFile(file);
    });
    
    function processFile(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        uploadedImageData = event.target.result;
        
        // Update dropzone appearance
        dropzone.classList.add('has-file');
        const dropzoneText = dropzone.querySelector('.dropzone-text');
        const dropzoneSubtext = dropzone.querySelector('.dropzone-subtext');
        if (dropzoneText) dropzoneText.textContent = file.name;
        if (dropzoneSubtext) dropzoneSubtext.textContent = `${(file.size / 1024).toFixed(1)} KB`;
        
        // Show preview
        let previewContainer = modal.querySelector('.image-preview-mini');
        if (!previewContainer) {
          previewContainer = document.createElement('div');
          previewContainer.className = 'image-preview-mini';
          dropzone.parentElement.after(previewContainer);
        }
        previewContainer.innerHTML = `<img src="${uploadedImageData}" alt="Preview" />`;
      };
      reader.readAsDataURL(file);
    }
  }
  
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
    
    // Use uploaded image if available, otherwise use URL
    if (uploadedImageData) {
      word.image = uploadedImageData;
    } else {
      word.image = document.getElementById('edit-image').value.trim();
    }
    
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

