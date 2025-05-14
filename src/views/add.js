import { saveWord } from '../storage/vocabStorage.js';

export function renderAdd(container) {
  container.innerHTML = `
    <form id="add-word-form" class="form-grid">
    <h2 class="form-title-add">Añadir nueva palabra</h2>
      <div class="row two-columns">
        <div>
          <label>Palabra o Phrasal Verb:</label>
          <input type="text" id="word" placeholder="Ej. Break down, Serendipity" required />
        </div>
        <div>
          <label>Traducción o Significado:</label>
          <input type="text" id="meaning" placeholder="Ej. Averiarse, hallazgo afortunado" required />
        </div>
      </div>
      <div>
        <label>Tipo:</label>
        <select id="type">
          <option value="word">Palabra</option>
          <option value="phrasal">Phrasal verb</option>
          <option value="expression">Expresión</option>
        </select>
      </div>
      <div>
        <label>Asociación Emocional o Escena Personal</label>
        <textarea id="emotion" rows="3" placeholder="Describe una situación, imagen o recuerdo personal que te ayude a recordar..."></textarea>
        <small>Crea una conexión emocional fuerte. Cuanto más personal o vívida, mejor recordarás la palabra.</small>
      </div>
      <div>
        <label>Ejemplo de uso:</label>
        <input type="text" id="example" placeholder="Ej. My car broke down on the highway." />
      </div>
      <div>
        <label>Imagen asociativa (opcional)</label>
        <input type="url" id="image" placeholder="https://..." />
        <small>Una imagen relacionada para reforzar la asociación visual.</small>
      </div>
      <div class="right-align">
        <button type="submit">Guardar palabra</button>
      </div>
    </form>
    <p id="feedback" style="color: green; margin-top: 10px;"></p>
  `;

  const form = document.getElementById('add-word-form');
  const feedback = document.getElementById('feedback');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const word = document.getElementById('word').value.trim();
    const meaning = document.getElementById('meaning').value.trim();
    const type = document.getElementById('type').value;
    const emotion = document.getElementById('emotion').value.trim();
    const example = document.getElementById('example').value.trim();
    const image = document.getElementById('image').value.trim();

    const entry = {
      id: Date.now(),
      word,
      meaning,
      type,
      emotion,
      example,
      image,
      remembered: false
    };

    saveWord(entry);
    form.reset();
    feedback.textContent = '✅ Palabra guardada correctamente.';
  });
}