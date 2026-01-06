import { saveWord, getAllCategories } from '../storage/vocabStorage.js';

export function renderAdd(container) {
  const existingCategories = getAllCategories();
  
  container.innerHTML = `
    <form id="add-word-form" class="form-grid">
      <div class="form-header">
        <h2 class="form-title-add"><i class="fa-solid fa-sparkles"></i> Añadir nueva palabra</h2>
        <p class="form-subtitle">Crea conexiones emocionales para recordar mejor</p>
      </div>
      
      <div class="row two-columns">
        <div class="form-field">
          <label for="word">
            <i class="fa-solid fa-font"></i> Palabra o Phrasal Verb
            <span class="required">*</span>
          </label>
          <input type="text" id="word" placeholder="Ej. Break down, Serendipity" required autocomplete="off" />
        </div>
        <div class="form-field">
          <label for="meaning">
            <i class="fa-solid fa-language"></i> Traducción o Significado
            <span class="required">*</span>
          </label>
          <input type="text" id="meaning" placeholder="Ej. Averiarse, hallazgo afortunado" required autocomplete="off" />
        </div>
      </div>
      
      <div class="row two-columns">
        <div class="form-field">
          <label for="type">
            <i class="fa-solid fa-tag"></i> Tipo
          </label>
          <select id="type">
            <option value="word">Palabra</option>
            <option value="phrasal">Phrasal verb</option>
            <option value="expression">Expresión</option>
          </select>
        </div>
        <div class="form-field">
          <label for="category">
            <i class="fa-solid fa-folder"></i> Categoría
          </label>
          <div class="category-input-wrapper">
            <input type="text" id="category" list="category-list" placeholder="Ej. Trabajo, Viajes, Emociones..." autocomplete="off" />
            <datalist id="category-list">
              ${existingCategories.map(cat => `<option value="${cat}">`).join('')}
            </datalist>
          </div>
          <small>Agrupa palabras por tema para organizarlas mejor</small>
        </div>
      </div>
      
      <div class="form-field emotion-field">
        <label for="emotion">
          <i class="fa-solid fa-heart"></i> Asociación Emocional o Escena Personal
        </label>
        <textarea id="emotion" rows="4" placeholder="Describe una situación, imagen o recuerdo personal que te ayude a recordar...

Ejemplo: Mi coche se averió en la autopista y tuve que esperar 2 horas bajo la lluvia..."></textarea>
        <div class="field-tip">
          <i class="fa-solid fa-lightbulb"></i>
          <span>Cuanto más personal y vívida sea la conexión, mejor recordarás la palabra</span>
        </div>
      </div>
      
      <div class="form-field">
        <label for="example">
          <i class="fa-solid fa-quote-left"></i> Ejemplo de uso
        </label>
        <input type="text" id="example" placeholder="Ej. My car broke down on the highway." autocomplete="off" />
        <small>Una frase en contexto para entender mejor el uso</small>
      </div>
      
      <div class="form-field">
        <label for="image">
          <i class="fa-solid fa-image"></i> Imagen asociativa
          <span class="optional">(opcional)</span>
        </label>
        <div class="image-input-wrapper">
          <input type="url" id="image" placeholder="https://..." />
          <button type="button" id="preview-image-btn" class="preview-btn" title="Vista previa">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>
        <small>Una imagen relacionada para reforzar la asociación visual</small>
        <div id="image-preview" class="image-preview" style="display: none;">
          <img id="preview-img" src="" alt="Preview" />
          <button type="button" id="remove-preview" class="remove-preview-btn">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      
      <div class="form-actions">
        <button type="button" id="clear-form" class="secondary-btn">
          <i class="fa-solid fa-rotate-left"></i> Limpiar
        </button>
        <button type="submit" class="primary-btn">
          <i class="fa-solid fa-floppy-disk"></i> Guardar palabra
        </button>
      </div>
    </form>
    
    <div id="feedback" class="feedback-message"></div>
    
    <!-- Quick add section -->
    <div class="quick-tips">
      <h3><i class="fa-solid fa-lightbulb"></i> Consejos para recordar mejor</h3>
      <ul>
        <li><strong>Usa emociones fuertes:</strong> Alegría, sorpresa, frustración... las emociones graban recuerdos</li>
        <li><strong>Crea escenas mentales:</strong> Visualiza la palabra en una situación específica</li>
        <li><strong>Conecta con experiencias:</strong> Relaciona con algo que ya conoces</li>
        <li><strong>Sé específico:</strong> "Mi perro Max corriendo en el parque" es mejor que "un perro"</li>
      </ul>
    </div>
  `;

  const form = document.getElementById('add-word-form');
  const feedback = document.getElementById('feedback');
  const imageInput = document.getElementById('image');
  const previewBtn = document.getElementById('preview-image-btn');
  const imagePreview = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-img');
  const removePreviewBtn = document.getElementById('remove-preview');
  const clearFormBtn = document.getElementById('clear-form');

  // Image preview functionality
  previewBtn.addEventListener('click', () => {
    const url = imageInput.value.trim();
    if (url) {
      previewImg.src = url;
      imagePreview.style.display = 'block';
      previewImg.onerror = () => {
        imagePreview.style.display = 'none';
        showFeedback('No se pudo cargar la imagen. Verifica la URL.', 'warning');
      };
    }
  });
  
  removePreviewBtn.addEventListener('click', () => {
    imageInput.value = '';
    imagePreview.style.display = 'none';
    previewImg.src = '';
  });
  
  // Clear form
  clearFormBtn.addEventListener('click', () => {
    form.reset();
    imagePreview.style.display = 'none';
    previewImg.src = '';
    feedback.className = 'feedback-message';
    feedback.textContent = '';
  });

  function showFeedback(message, type = 'success') {
    feedback.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-xmark' : 'fa-triangle-exclamation'}"></i> ${message}`;
    feedback.className = `feedback-message ${type}`;
    feedback.style.display = 'flex';
    
    if (type === 'success') {
      setTimeout(() => {
        feedback.style.display = 'none';
      }, 4000);
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const word = document.getElementById('word').value.trim();
    const meaning = document.getElementById('meaning').value.trim();
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value.trim();
    const emotion = document.getElementById('emotion').value.trim();
    const example = document.getElementById('example').value.trim();
    const image = document.getElementById('image').value.trim();

    // Validation
    if (!word || !meaning) {
      showFeedback('Por favor completa al menos la palabra y su significado.', 'error');
      return;
    }

    const entry = {
      id: Date.now(),
      word,
      meaning,
      type,
      category: category || null,
      emotion,
      example,
      image,
      remembered: false
    };

    saveWord(entry);
    form.reset();
    imagePreview.style.display = 'none';
    previewImg.src = '';
    
    showFeedback(`"${word}" guardada correctamente. ¡Sigue añadiendo palabras!`, 'success');
    
    // Focus back on word input for quick adding
    document.getElementById('word').focus();
  });
}