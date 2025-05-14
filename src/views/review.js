import { getAllWords, updateWord } from '../storage/vocabStorage.js';

export function renderReview(container) {
  let current = null;

  container.innerHTML = `
    <h2>Modo Repaso</h2>
    <div id="review-card" class="review-card">
      <p>No hay palabras para repasar.</p>
    </div>
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
    const random = selection[Math.floor(Math.random() * selection.length)];
    return random;
  }

  function renderWord(word) {
    if (!word) {
      card.innerHTML = `<p>No hay palabras para repasar.</p>`;
      return;
    }

    current = word;
    card.innerHTML = `
      ${word.image ? `<img src="${word.image}" class="review-image" alt="${word.word}">` : ''}
      <h3>${word.word}</h3>
      <p><strong>${word.meaning}</strong></p>
      ${word.emotion ? `<p><em>${word.emotion}</em></p>` : ''}
      ${word.example ? `<p>${word.example}</p>` : ''}
    `;
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