import { showToast } from './ui.js';

export function speak(text, lang = 'en-US', rate = 1) {
  if (!('speechSynthesis' in window)) {
    showToast('Error', 'Tu navegador no soporta síntesis de voz.', 'error');
    return;
  }

  // Cancel any current speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  
  // Select best voice (preferably Google US English or Microsoft David/Zira)
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => 
    v.lang === lang && (v.name.includes('Google') || v.name.includes('Premium'))
  );
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onerror = (e) => {
    console.error('TTS Error:', e);
    showToast('Error', 'No se pudo reproducir el audio.', 'error');
  };

  window.speechSynthesis.speak(utterance);
}
