import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveWord, getAllWords, checkDuplicateWord, clearAll, deleteWord } from './vocabStorage';

describe('Storage Logic', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    clearAll();
  });

  it('should save a word correctly', () => {
    const word = {
      id: 1,
      word: 'Test',
      meaning: 'Prueba',
      type: 'word'
    };
    saveWord(word);
    
    const words = getAllWords();
    expect(words).toHaveLength(1);
    expect(words[0].word).toBe('Test');
    expect(words[0].createdAt).toBeDefined(); // Se añade automáticamente
  });

  it('should detect duplicate words (case insensitive)', () => {
    saveWord({ id: 1, word: 'Hello', meaning: 'Hola' });

    expect(checkDuplicateWord('Hello')).toBe(true);
    expect(checkDuplicateWord('hello')).toBe(true);
    expect(checkDuplicateWord('HELLO')).toBe(true);
    expect(checkDuplicateWord('Bye')).toBe(false);
  });

  it('should allow editing correctly (ignore self in duplicate check)', () => {
    saveWord({ id: 1, word: 'Hello', meaning: 'Hola' });
    
    // Si estoy editando la palabra con id 1, y el texto sigue siendo "Hello", no debería marcarse como duplicado de OTRA palabra
    expect(checkDuplicateWord('Hello', 1)).toBe(false);
  });

  it('should delete a word', () => {
    const word = { id: 123, word: 'DeleteMe', meaning: '...' };
    saveWord(word);
    expect(getAllWords()).toHaveLength(1);

    deleteWord(123);
    expect(getAllWords()).toHaveLength(0);
  });
});
