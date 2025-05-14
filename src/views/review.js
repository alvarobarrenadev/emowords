import { getAllWords, updateWord } from '../storage/vocabStorage.js';

export function renderReview(container) {
  let current = null;
  let revealed = false;

  container.innerHTML = `
    <h2>Modo Repaso</h2>
    <div id="review-card" class="review-card"></div>
    <div class="review-actions">
      <button id="remembered-btn">✅ Recordada</button>
      <button id="forgotten-btn">❌ Olvidada</button>
      <button id="next-btn">➡️ Siguiente</button>
    </div>
  `;

  const card = document.getElementById('review-card');
  const btnRemembered = document.getElementById('remembered-btn');
  const btnForgotten = document.getElementById('forgotten-btn');
  const btnNext = document.getElementById('next-btn');

  function getNextWord() {
    const words = getAllWords();
    if (words.length === 0) return null;

    const pool = words.filter(w => !w.remembered);
    const selection = pool.length > 0 ? pool : words;
    return selection[Math.floor(Math.random() * selection.length)];
  }

  function renderWord(word) {
    if (!word) {
      card.innerHTML = `<p>No hay palabras para repasar.</p>`;
      return;
    }

    current = word;
    revealed = false;

    card.innerHTML = `
      <div class="review-type"><span class="tag">${getTypeLabel(word.type)}</span></div>
      <h3 class="review-word">${word.word}</h3>
      ${word.example ? `<p class="example">${word.example}</p>` : ''}
      <button id="show-answer" class="reveal-btn">Mostrar respuesta</button>
      <div id="review-answer" class="review-answer" style="display: none;">
        <p class="meaning">${word.meaning}</p>
        ${word.emotion ? `<p class="section-label">ASOCIACIÓN EMOCIONAL</p><p>${word.emotion}</p>` : ''}
        ${word.example ? `<p class="section-label">EJEMPLO</p><p class="example">${word.example}</p>` : ''}
      </div>
    `;

    const showBtn = document.getElementById('show-answer');
    const answerDiv = document.getElementById('review-answer');

    showBtn.addEventListener('click', () => {
      revealed = true;
      answerDiv.style.display = 'block';
      showBtn.style.display = 'none';
    });
  }

  function mark(status) {
    if (!current) return;
    current.remembered = status;
    updateWord(current);
    renderWord(getNextWord());
  }

  btnRemembered.addEventListener('click', () => mark(true));
  btnForgotten.addEventListener('click', () => mark(false));
  btnNext.addEventListener('click', () => renderWord(getNextWord()));

  renderWord(getNextWord());
}

function getTypeLabel(type) {
  switch (type) {
    case 'word': return 'Palabra';
    case 'phrasal': return 'Phrasal Verb';
    case 'expression': return 'Expresión';
    default: return 'Otro';
  }
}