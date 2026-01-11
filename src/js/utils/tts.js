import { showToast } from './ui.js';
import { getSettings, saveSettings } from '../storage/vocabStorage.js';

// TTS Settings with defaults
const DEFAULT_TTS_SETTINGS = {
  accent: 'en-US', // 'en-US' or 'en-GB'
  speed: 1 // 0.5 = slow, 1 = normal, 1.5 = fast
};

/**
 * Get TTS settings from localStorage
 */
export function getTTSSettings() {
  const settings = getSettings();
  return settings.tts || DEFAULT_TTS_SETTINGS;
}

/**
 * Save TTS settings
 */
export function saveTTSSettings(ttsSettings) {
  const settings = getSettings();
  settings.tts = { ...getTTSSettings(), ...ttsSettings };
  saveSettings(settings);
}

/**
 * Get available voices
 */
export function getAvailableVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
}

/**
 * Speak text with current settings
 */
export function speak(text, overrideSettings = {}) {
  if (!('speechSynthesis' in window)) {
    showToast('Error', 'Tu navegador no soporta síntesis de voz.', 'error');
    return;
  }

  // Cancel any current speech
  window.speechSynthesis.cancel();

  const ttsSettings = getTTSSettings();
  const lang = overrideSettings.accent || ttsSettings.accent;
  const rate = overrideSettings.speed || ttsSettings.speed;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  
  // Select best voice for the chosen accent
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => 
    v.lang.startsWith(lang.substring(0, 2)) && 
    v.lang === lang &&
    (v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Microsoft'))
  ) || voices.find(v => v.lang === lang);
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onerror = (e) => {
    console.error('TTS Error:', e);
    showToast('Error', 'No se pudo reproducir el audio.', 'error');
  };

  window.speechSynthesis.speak(utterance);
}

/**
 * Speak with slow speed (for learning)
 */
export function speakSlow(text) {
  speak(text, { speed: 0.7 });
}

/**
 * Get accent label
 */
export function getAccentLabel(accent) {
  const labels = {
    'en-US': '🇺🇸 Americano',
    'en-GB': '🇬🇧 Británico'
  };
  return labels[accent] || accent;
}

/**
 * Get speed label
 */
export function getSpeedLabel(speed) {
  if (speed <= 0.6) return '🐢 Muy lento';
  if (speed <= 0.8) return '🐌 Lento';
  if (speed <= 1.1) return '🎯 Normal';
  if (speed <= 1.3) return '🐇 Rápido';
  return '⚡ Muy rápido';
}
