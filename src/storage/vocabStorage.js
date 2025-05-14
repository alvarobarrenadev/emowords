const STORAGE_KEY = 'emowords_vocab';

export function getAllWords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveWord(wordObj) {
  const words = getAllWords();
  words.push(wordObj);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

export function updateWord(updatedWord) {
  const words = getAllWords().map(w => (w.id === updatedWord.id ? updatedWord : w));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

export function deleteWord(id) {
  const words = getAllWords().filter(w => w.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

export function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
}