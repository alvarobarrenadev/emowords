const STORAGE_KEY = 'emowords_vocab';
const SETTINGS_KEY = 'emowords_settings';

// ==================== WORD STORAGE ====================

export function getAllWords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveWord(wordObj) {
  const words = getAllWords();
  // Add metadata for spaced repetition
  const enrichedWord = {
    ...wordObj,
    createdAt: Date.now(),
    lastReviewedAt: null,
    reviewCount: 0,
    correctCount: 0,
    incorrectCount: 0,
    nextReviewAt: Date.now(), // Available for review immediately
    difficulty: 0 // 0 = normal, negative = easier, positive = harder
  };
  words.push(enrichedWord);
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

export function getWordById(id) {
  return getAllWords().find(w => w.id === id);
}

// ==================== SEARCH & FILTER ====================

export function searchWords(query) {
  const words = getAllWords();
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return words;
  
  return words.filter(word => 
    word.word.toLowerCase().includes(lowerQuery) ||
    word.meaning.toLowerCase().includes(lowerQuery) ||
    (word.example && word.example.toLowerCase().includes(lowerQuery)) ||
    (word.emotion && word.emotion.toLowerCase().includes(lowerQuery)) ||
    (word.category && word.category.toLowerCase().includes(lowerQuery))
  );
}

export function getWordsByCategory(category) {
  const words = getAllWords();
  if (!category || category === 'all') return words;
  return words.filter(w => w.category === category);
}

export function getAllCategories() {
  const words = getAllWords();
  const categories = new Set();
  words.forEach(w => {
    if (w.category) categories.add(w.category);
  });
  return Array.from(categories).sort();
}

// ==================== SORTING ====================

export function sortWords(words, sortBy = 'date-desc') {
  const sorted = [...words];
  
  switch (sortBy) {
    case 'date-asc':
      return sorted.sort((a, b) => (a.createdAt || a.id) - (b.createdAt || b.id));
    case 'date-desc':
      return sorted.sort((a, b) => (b.createdAt || b.id) - (a.createdAt || a.id));
    case 'alpha-asc':
      return sorted.sort((a, b) => a.word.localeCompare(b.word));
    case 'alpha-desc':
      return sorted.sort((a, b) => b.word.localeCompare(a.word));
    case 'review-count':
      return sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    case 'difficulty':
      return sorted.sort((a, b) => (b.difficulty || 0) - (a.difficulty || 0));
    default:
      return sorted;
  }
}

// ==================== STATISTICS ====================

export function getStatistics() {
  const words = getAllWords();
  const total = words.length;
  const remembered = words.filter(w => w.remembered).length;
  const forgotten = total - remembered;
  const totalReviews = words.reduce((sum, w) => sum + (w.reviewCount || 0), 0);
  const averageReviews = total > 0 ? (totalReviews / total).toFixed(1) : 0;
  
  const byType = {
    word: words.filter(w => w.type === 'word').length,
    phrasal: words.filter(w => w.type === 'phrasal').length,
    expression: words.filter(w => w.type === 'expression').length,
    connector: words.filter(w => w.type === 'connector').length
  };
  
  // Calculate retention rate
  const totalCorrect = words.reduce((sum, w) => sum + (w.correctCount || 0), 0);
  const totalIncorrect = words.reduce((sum, w) => sum + (w.incorrectCount || 0), 0);
  const retentionRate = (totalCorrect + totalIncorrect) > 0 
    ? ((totalCorrect / (totalCorrect + totalIncorrect)) * 100).toFixed(1)
    : 0;
  
  // Words due for review
  const now = Date.now();
  const dueForReview = words.filter(w => !w.nextReviewAt || w.nextReviewAt <= now).length;
  
  return {
    total,
    remembered,
    forgotten,
    totalReviews,
    averageReviews,
    byType,
    retentionRate,
    dueForReview
  };
}

// ==================== SPACED REPETITION ====================

export function getWordsForReview() {
  const words = getAllWords();
  const now = Date.now();
  
  // Prioritize: 1) Forgotten words, 2) Due for review, 3) Never reviewed
  const forgotten = words.filter(w => !w.remembered);
  const dueForReview = words.filter(w => w.remembered && (!w.nextReviewAt || w.nextReviewAt <= now));
  const neverReviewed = words.filter(w => !w.lastReviewedAt);
  
  // Combine and remove duplicates
  const prioritized = [...forgotten, ...neverReviewed, ...dueForReview];
  const seen = new Set();
  const unique = prioritized.filter(w => {
    if (seen.has(w.id)) return false;
    seen.add(w.id);
    return true;
  });
  
  // If all words are mastered, return all for review
  return unique.length > 0 ? unique : words;
}

export function recordReview(wordId, remembered) {
  const word = getWordById(wordId);
  if (!word) return;
  
  word.remembered = remembered;
  word.lastReviewedAt = Date.now();
  word.reviewCount = (word.reviewCount || 0) + 1;
  
  if (remembered) {
    word.correctCount = (word.correctCount || 0) + 1;
    word.difficulty = Math.max(-3, (word.difficulty || 0) - 1);
    // Schedule next review based on success streak
    const baseInterval = 24 * 60 * 60 * 1000; // 1 day in ms
    const multiplier = Math.pow(2, Math.min(word.correctCount, 5)); // 1, 2, 4, 8, 16, 32 days
    word.nextReviewAt = Date.now() + (baseInterval * multiplier);
  } else {
    word.incorrectCount = (word.incorrectCount || 0) + 1;
    word.difficulty = Math.min(3, (word.difficulty || 0) + 1);
    word.nextReviewAt = Date.now(); // Review again soon
  }
  
  updateWord(word);
  return word;
}

// ==================== IMPORT / EXPORT ====================

export function exportData() {
  const words = getAllWords();
  const data = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    wordCount: words.length,
    words: words
  };
  return JSON.stringify(data, null, 2);
}

export function importData(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    
    // Validate structure
    if (!data.words || !Array.isArray(data.words)) {
      throw new Error('Invalid data format: missing words array');
    }
    
    const existingWords = getAllWords();
    const existingIds = new Set(existingWords.map(w => w.id));
    
    let imported = 0;
    let skipped = 0;
    
    data.words.forEach(word => {
      if (!word.word || !word.meaning) {
        skipped++;
        return;
      }
      
      // Generate new ID if duplicate or missing
      if (!word.id || existingIds.has(word.id)) {
        word.id = Date.now() + Math.random();
      }
      
      // Ensure required fields
      word.type = word.type || 'word';
      word.remembered = word.remembered || false;
      word.createdAt = word.createdAt || Date.now();
      
      existingWords.push(word);
      existingIds.add(word.id);
      imported++;
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingWords));
    
    return { success: true, imported, skipped };
  } catch (error) {
    return { success: false, error: error.message };
  }
}



// ==================== HELPER ====================

export function checkDuplicateWord(wordText, excludeId = null) {
  const words = getAllWords();
  const lowerWord = wordText.toLowerCase().trim();
  return words.some(w => w.word.toLowerCase().trim() === lowerWord && w.id !== excludeId);
}

// ==================== SETTINGS ====================

export function getSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  return raw ? JSON.parse(raw) : {
    theme: 'dark',
    language: 'es',
    showExampleInReview: true,
    autoPlayAudio: false
  };
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}