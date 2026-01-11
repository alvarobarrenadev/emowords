import { saveWord, getAllCategories, checkDuplicateWord } from '../storage/vocabStorage.js';
import { showToast } from '../utils/ui.js';

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
            <option value="connector">Conector</option>
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
        <label>
          <i class="fa-solid fa-image"></i> Imagen asociativa
          <span class="optional">(opcional)</span>
        </label>
        
        <!-- Image source tabs -->
        <div class="image-source-tabs">
          <button type="button" class="image-tab active" data-tab="upload">
            <i class="fa-solid fa-upload"></i> Subir imagen
          </button>
          <button type="button" class="image-tab" data-tab="url">
            <i class="fa-solid fa-link"></i> URL de internet
          </button>
        </div>
        
        <!-- Upload tab content -->
        <div class="image-tab-content active" id="upload-content">
          <div class="upload-area" id="upload-area">
            <input type="file" id="image-file" accept="image/*" />
            <div class="upload-placeholder">
              <i class="fa-solid fa-cloud-arrow-up"></i>
              <span>Arrastra una imagen aquí</span>
              <span class="upload-hint">o haz clic para seleccionar</span>
            </div>
          </div>
          <small>Formatos: JPG, PNG, GIF, WebP (máx. 2MB)</small>
        </div>
        
        <!-- URL tab content -->
        <div class="image-tab-content" id="url-content">
          <div class="image-input-wrapper">
            <input type="url" id="image-url" placeholder="https://ejemplo.com/imagen.jpg" />
            <button type="button" id="preview-url-btn" class="preview-btn" title="Vista previa">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
          <small>Pega la URL de cualquier imagen de internet</small>
        </div>
        
        <!-- Image preview (shared) -->
        <div id="image-preview" class="image-preview" style="display: none;">
          <img id="preview-img" src="" alt="Preview" />
          <button type="button" id="remove-preview" class="remove-preview-btn" title="Eliminar imagen">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <!-- Hidden input to store final image data -->
        <input type="hidden" id="image-data" />
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
  const imagePreview = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-img');
  const removePreviewBtn = document.getElementById('remove-preview');
  const clearFormBtn = document.getElementById('clear-form');
  const imageDataInput = document.getElementById('image-data');
  
  // Tab elements
  const tabs = document.querySelectorAll('.image-tab');
  const tabContents = document.querySelectorAll('.image-tab-content');
  
  // Upload elements
  const uploadArea = document.getElementById('upload-area');
  const imageFileInput = document.getElementById('image-file');
  
  // URL elements
  const imageUrlInput = document.getElementById('image-url');
  const previewUrlBtn = document.getElementById('preview-url-btn');

  // ===== TAB SWITCHING =====
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active content
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `${targetTab}-content`) {
          content.classList.add('active');
        }
      });
    });
  });

  // ===== FILE UPLOAD FUNCTIONALITY =====
  
  // Click to upload
  uploadArea.addEventListener('click', () => {
    imageFileInput.click();
  });
  
  // Drag and drop
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });
  
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });
  
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  });
  
  // File input change
  imageFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  });
  
  function handleFileUpload(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Archivo inválido', 'Por favor selecciona un archivo de imagen.', 'error');
      return;
    }
    
    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      showToast('Imagen muy grande', 'La imagen debe ser menor a 2MB.', 'error');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      
      // Show preview
      previewImg.src = base64;
      imagePreview.style.display = 'block';
      
      // Store base64 data
      imageDataInput.value = base64;
      
      // Update upload area to show success
      uploadArea.classList.add('has-file');
      
      showToast('Imagen cargada', 'La imagen se ha cargado correctamente.', 'success');
    };
    
    reader.onerror = () => {
      showToast('Error', 'No se pudo leer la imagen.', 'error');
    };
    
    reader.readAsDataURL(file);
  }

  // ===== URL PREVIEW FUNCTIONALITY =====
  previewUrlBtn.addEventListener('click', () => {
    const url = imageUrlInput.value.trim();
    if (url) {
      previewImg.src = url;
      imagePreview.style.display = 'block';
      imageDataInput.value = url;
      
      previewImg.onerror = () => {
        imagePreview.style.display = 'none';
        imageDataInput.value = '';
        showToast('Error de imagen', 'No se pudo cargar la imagen. Verifica la URL.', 'warning');
      };
    }
  });
  
  // Auto-preview on paste/enter for URL
  imageUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      previewUrlBtn.click();
    }
  });

  // ===== REMOVE PREVIEW =====
  removePreviewBtn.addEventListener('click', () => {
    // Clear all image-related inputs
    imageUrlInput.value = '';
    imageFileInput.value = '';
    imageDataInput.value = '';
    imagePreview.style.display = 'none';
    previewImg.src = '';
    uploadArea.classList.remove('has-file');
  });
  
  // ===== CLEAR FORM =====
  clearFormBtn.addEventListener('click', () => {
    form.reset();
    imagePreview.style.display = 'none';
    previewImg.src = '';
    imageDataInput.value = '';
    uploadArea.classList.remove('has-file');
  });

  // ===== FORM SUBMIT =====
  form.addEventListener('submit', e => {
    e.preventDefault();

    const word = document.getElementById('word').value.trim();
    const meaning = document.getElementById('meaning').value.trim();
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value.trim();
    const emotion = document.getElementById('emotion').value.trim();
    const example = document.getElementById('example').value.trim();
    const image = imageDataInput.value.trim(); // Use the hidden input with final image data

    // Validation
    if (!word || !meaning) {
      showToast('Faltan datos', 'Por favor completa al menos la palabra y su significado.', 'error');
      return;
    }

    if (checkDuplicateWord(word)) {
      showToast('Palabra duplicada', `La palabra "${word}" ya existe en tu vocabulario.`, 'error');
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
    imageDataInput.value = '';
    uploadArea.classList.remove('has-file');
    
    showToast('¡Guardado!', `"${word}" se ha añadido correctamente.`, 'success');
    
    // Focus back on word input for quick adding
    document.getElementById('word').focus();
  });
}