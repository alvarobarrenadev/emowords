import { updateWord, deleteWord } from '../storage/vocabStorage.js';

export function createWordCard(word, onUpdate) {
  const card = document.createElement('div');
  card.className = 'word-card';

  card.innerHTML = `
    ${word.image ? `<img src="${word.image}" alt="${word.word}" class="word-image" />` : ''}

    <div class="tags">
      <span class="tag">${getTypeLabel(word.type)}</span>
      <span class="tag ${word.remembered ? 'remembered' : 'forgotten'}">
        ${word.remembered ? 'Recordada' : 'Olvidada'}
      </span>
    </div>

    <div class="word-info">
      <h3>${word.word}</h3>
      <p>${word.meaning}</p>

      ${word.emotion ? `
        <p class="section-label">ASOCIACIÓN EMOCIONAL</p>
        <p>${word.emotion}</p>` : ''}

      ${word.example ? `
        <p class="section-label">EJEMPLO</p>
        <p class="example">${word.example}</p>` : ''}
    </div>

    <div class="actions">
      <button class="toggle">${word.remembered ? 'Marcar como olvidada' : 'Marcar como recordada'}</button>
      <button class="delete">Eliminar</button>
    </div>
  `;

  card.querySelector('.toggle').addEventListener('click', () => {
    word.remembered = !word.remembered;
    updateWord(word);
    onUpdate();
  });

  card.querySelector('.delete').addEventListener('click', () => {
    if (confirm(`¿Eliminar "${word.word}"?`)) {
      deleteWord(word.id);
      onUpdate();
    }
  });

  return card;
}

function getTypeLabel(type) {
  switch (type) {
    case 'word': return 'Palabra';
    case 'phrasal': return 'Phrasal Verb';
    case 'expression': return 'Expresión';
    default: return 'Otro';
  }
}