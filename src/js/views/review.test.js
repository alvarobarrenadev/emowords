import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearAll, getAllWords, saveWord } from '../storage/vocabStorage.js';
import { renderReview } from './review.js';

describe('Listening review flow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    clearAll();
    localStorage.removeItem('emowords_gamification');
    localStorage.removeItem('emowords_achievements');
    document.body.innerHTML = '<main id="app"></main>';

    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        cancel: vi.fn(),
        getVoices: vi.fn(() => []),
        speak: vi.fn()
      }
    });
  });

  afterEach(() => {
    if (window._reviewCleanup) {
      window._reviewCleanup();
      window._reviewCleanup = null;
    }
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('reveals the English expression and waits for the learner to continue', () => {
    saveWord({
      id: 1,
      word: 'Schedule a call',
      meaning: 'Agendar una llamada',
      example: 'Can we schedule a call?',
      type: 'expression'
    });

    const app = document.getElementById('app');
    renderReview(app);
    app.querySelector('[data-mode="listening"]').click();

    const correctOption = app.querySelector('.quiz-option[data-id="1"]');
    correctOption.click();

    const feedback = app.querySelector('#listening-feedback');
    expect(app.querySelector('#listening-prompt').hidden).toBe(true);
    expect(app.querySelector('.quiz-question #listening-feedback')).toBe(feedback);
    expect(feedback.hidden).toBe(false);
    expect(feedback.textContent).toContain('¡Correcto!');
    expect(feedback.textContent).toContain('Schedule a call');
    expect(feedback.textContent).toContain('Agendar una llamada');
    expect(feedback.textContent).toContain('Can we schedule a call?');
    expect(feedback.textContent).toContain('Escuchar de nuevo');
    expect(app.querySelector('.quiz-container')).not.toBeNull();

    const [savedWord] = getAllWords();
    expect(savedWord.reviewCount).toBe(1);
    expect(savedWord.correctCount).toBe(1);

    app.querySelector('#listening-next-btn').click();
    expect(app.textContent).toContain('¡Sesión completada!');
  });
});
