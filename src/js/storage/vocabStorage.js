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
  
  // Calculate specific mastery counts for achievements
  const mastered = words.filter(w => (w.correctCount || 0) >= 10).length;

  return {
    total,
    remembered,
    forgotten,
    totalReviews,
    averageReviews,
    byType,
    retentionRate,
    dueForReview,
    mastered
  };
}

// ==================== SPACED REPETITION (SM-2 Algorithm) ====================

// SM-2 Intervals in days: [1, 3, 7, 14, 30, 60, 120, 240]
const SM2_INTERVALS = [1, 3, 7, 14, 30, 60, 120, 240];

/**
 * Get mastery level based on correct count
 * @returns 'new' | 'apprentice' | 'guru' | 'master'
 */
export function getMasteryLevel(word) {
  const wins = word.correctCount || 0;
  if (wins >= 10) return 'master';
  if (wins >= 5) return 'guru';
  if (wins >= 2) return 'apprentice';
  return 'new';
}

/**
 * Get mastery info with label and color class
 */
export function getMasteryInfo(word) {
  const level = getMasteryLevel(word);
  const info = {
    new: { label: 'Nuevo', class: 'mastery-new', icon: 'fa-seedling', percent: 10 },
    apprentice: { label: 'Aprendiz', class: 'mastery-apprentice', icon: 'fa-leaf', percent: 40 },
    guru: { label: 'Experto', class: 'mastery-guru', icon: 'fa-tree', percent: 75 },
    master: { label: 'Maestro', class: 'mastery-master', icon: 'fa-crown', percent: 100 }
  };
  return { level, ...info[level] };
}

/**
 * Check if a word is due for review today
 */
export function isDueToday(word) {
  if (!word.nextReviewAt) return true;
  const now = Date.now();
  const endOfToday = new Date().setHours(23, 59, 59, 999);
  return word.nextReviewAt <= endOfToday;
}

/**
 * Get count of words due for review
 */
export function getWordsDueCount() {
  const words = getAllWords();
  const now = Date.now();
  return words.filter(w => !w.nextReviewAt || w.nextReviewAt <= now).length;
}

/**
 * Get words due today (for dashboard)
 */
export function getWordsDueToday() {
  const words = getAllWords();
  const endOfToday = new Date().setHours(23, 59, 59, 999);
  return words.filter(w => !w.nextReviewAt || w.nextReviewAt <= endOfToday);
}

/**
 * Calculate next review date using SM-2 algorithm
 */
function calculateNextReviewDate(word, remembered) {
  const now = Date.now();
  const DAY_MS = 24 * 60 * 60 * 1000;
  
  if (!remembered) {
    // Failed: Reset to review again in 10 minutes (for immediate retry) or next session
    return now + (10 * 60 * 1000); // 10 minutes
  }
  
  // Success: Calculate interval based on consecutive successes
  const consecutiveWins = word.correctCount || 0;
  const intervalIndex = Math.min(consecutiveWins, SM2_INTERVALS.length - 1);
  const baseDays = SM2_INTERVALS[intervalIndex];
  
  // Adjust by difficulty factor (-3 to +3)
  const difficulty = word.difficulty || 0;
  const difficultyMultiplier = 1 - (difficulty * 0.1); // Range: 0.7 to 1.3
  const adjustedDays = Math.max(1, Math.round(baseDays * difficultyMultiplier));
  
  return now + (adjustedDays * DAY_MS);
}

/**
 * Format next review date for display
 */
export function getNextReviewLabel(word) {
  if (!word.nextReviewAt) return 'Ahora';
  
  const now = Date.now();
  const diff = word.nextReviewAt - now;
  
  if (diff <= 0) return 'Ahora';
  
  const minutes = Math.floor(diff / (60 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  
  if (minutes < 60) return `${minutes}min`;
  if (hours < 24) return `${hours}h`;
  if (days === 1) return 'Mañana';
  if (days < 7) return `${days} días`;
  if (days < 30) return `${Math.floor(days / 7)} sem`;
  return `${Math.floor(days / 30)} mes${Math.floor(days / 30) > 1 ? 'es' : ''}`;
}

export function getWordsForReview() {
  const words = getAllWords();
  const now = Date.now();
  
  // Get words due for review (nextReviewAt <= now)
  const dueWords = words.filter(w => !w.nextReviewAt || w.nextReviewAt <= now);
  
  // Sort by priority: 1) Most overdue, 2) Highest difficulty, 3) Least reviewed
  return dueWords.sort((a, b) => {
    // First by how overdue they are
    const overdueA = now - (a.nextReviewAt || 0);
    const overdueB = now - (b.nextReviewAt || 0);
    if (overdueA !== overdueB) return overdueB - overdueA;
    
    // Then by difficulty (harder first)
    const diffA = a.difficulty || 0;
    const diffB = b.difficulty || 0;
    if (diffA !== diffB) return diffB - diffA;
    
    // Then by review count (less reviewed first)
    return (a.reviewCount || 0) - (b.reviewCount || 0);
  });
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
    // SM-2: Increase interval on success
    word.nextReviewAt = calculateNextReviewDate(word, true);
  } else {
    word.incorrectCount = (word.incorrectCount || 0) + 1;
    word.difficulty = Math.min(3, (word.difficulty || 0) + 1);
    // Reset streak on failure
    word.correctCount = Math.max(0, (word.correctCount || 0) - 2);
    word.nextReviewAt = calculateNextReviewDate(word, false);
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
      
      // Map emotionalTip to emotion (for starter packs compatibility)
      if (word.emotionalTip && !word.emotion) {
        word.emotion = word.emotionalTip;
        delete word.emotionalTip;
      }
      
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

/**
 * Import words from CSV format
 * Expected columns: word, meaning, type, category, example, emotion
 * First row should be headers
 */
export function importCSV(csvString) {
  try {
    const lines = csvString.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('El archivo CSV debe tener al menos una fila de encabezados y una de datos');
    }

    // Parse headers
    const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
    
    // Find column indices
    const wordIndex = headers.findIndex(h => h === 'word' || h === 'palabra' || h === 'english');
    const meaningIndex = headers.findIndex(h => h === 'meaning' || h === 'significado' || h === 'spanish' || h === 'traduccion' || h === 'traducción');
    
    if (wordIndex === -1 || meaningIndex === -1) {
      throw new Error('El CSV debe tener columnas "word" y "meaning" (o "palabra" y "significado")');
    }

    const typeIndex = headers.findIndex(h => h === 'type' || h === 'tipo');
    const categoryIndex = headers.findIndex(h => h === 'category' || h === 'categoria' || h === 'categoría');
    const exampleIndex = headers.findIndex(h => h === 'example' || h === 'ejemplo');
    const emotionIndex = headers.findIndex(h => h === 'emotion' || h === 'emocion' || h === 'emoción' || h === 'association' || h === 'asociacion');

    const existingWords = getAllWords();
    const existingLowerWords = new Set(existingWords.map(w => w.word.toLowerCase().trim()));
    
    let imported = 0;
    let skipped = 0;
    let duplicates = 0;

    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = parseCSVLine(line);
      const word = values[wordIndex]?.trim();
      const meaning = values[meaningIndex]?.trim();

      if (!word || !meaning) {
        skipped++;
        continue;
      }

      // Check for duplicates
      if (existingLowerWords.has(word.toLowerCase())) {
        duplicates++;
        continue;
      }

      // Determine type
      let type = 'word';
      if (typeIndex !== -1 && values[typeIndex]) {
        const typeValue = values[typeIndex].toLowerCase().trim();
        if (['phrasal', 'phrasal verb', 'phrasal-verb'].includes(typeValue)) type = 'phrasal';
        else if (['expression', 'expresion', 'expresión'].includes(typeValue)) type = 'expression';
        else if (['connector', 'conector'].includes(typeValue)) type = 'connector';
        else if (['word', 'palabra'].includes(typeValue)) type = 'word';
      }

      const newWord = {
        id: Date.now() + Math.random(),
        word,
        meaning,
        type,
        category: categoryIndex !== -1 ? values[categoryIndex]?.trim() || null : null,
        example: exampleIndex !== -1 ? values[exampleIndex]?.trim() || '' : '',
        emotion: emotionIndex !== -1 ? values[emotionIndex]?.trim() || '' : '',
        image: '',
        remembered: false,
        createdAt: Date.now(),
        lastReviewedAt: null,
        reviewCount: 0,
        correctCount: 0,
        incorrectCount: 0,
        nextReviewAt: Date.now(),
        difficulty: 0
      };

      existingWords.push(newWord);
      existingLowerWords.add(word.toLowerCase());
      imported++;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingWords));

    return { success: true, imported, skipped, duplicates };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Parse a CSV line handling quoted values
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if ((char === ',' || char === ';') && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

/**
 * Export data as CSV
 */
export function exportCSV() {
  const words = getAllWords();
  const headers = ['word', 'meaning', 'type', 'category', 'example', 'emotion'];
  
  const rows = words.map(w => {
    return [
      escapeCSV(w.word),
      escapeCSV(w.meaning),
      w.type || 'word',
      escapeCSV(w.category || ''),
      escapeCSV(w.example || ''),
      escapeCSV(w.emotion || '')
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

function escapeCSV(value) {
  if (!value) return '';
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return '"' + value.replace(/"/g, '""') + '"';
  }
  return value;
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
    theme: null, // null = auto-detect from system preference
    language: 'es',
    showExampleInReview: true,
    autoPlayAudio: false
  };
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}