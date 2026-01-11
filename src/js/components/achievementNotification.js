import { showToast } from '../utils/ui.js';
import { getAchievement, checkTimeBasedAchievements } from '../storage/achievements.js';

/**
 * Show achievement unlock notification with animation
 */
export function showAchievementUnlock(achievement) {
  // Remove any existing notification
  document.querySelector('.achievement-notification')?.remove();

  const notification = document.createElement('div');
  notification.className = 'achievement-notification animate__animated animate__fadeInUp';
  notification.innerHTML = `
    <div class="achievement-glow"></div>
    <div class="achievement-content">
      <div class="achievement-icon-wrapper">
        <i class="fa-solid ${achievement.icon}"></i>
      </div>
      <div class="achievement-info">
        <span class="achievement-label">🏆 ¡Logro Desbloqueado!</span>
        <span class="achievement-name">${achievement.name}</span>
        <span class="achievement-desc">${achievement.description}</span>
      </div>
      <div class="achievement-xp">+${achievement.xpReward} XP</div>
    </div>
  `;

  document.body.appendChild(notification);

  // Play sound effect (optional, browser dependent)
  try {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp+fl5OQioR7d3d9hY+YoaWloJuVjIN4cHBzfoqWoKWmoZqUiXxxamp0f4yYoaSnop2XjIN4bWxzfouXn6OkoJqUiX5zamxxfIiUnKGjop6Zkoh+c21wd4OOl52hoZ6Zk4h9cWxveYOPmJ6hoZ2YkoZ7bmtvd4SPmZ6hoJ6YkYV4bWtvdoKNl52fn5yXkIR3a2pvdYGMl52fn5yXj4N2amluc4CLlpyenZuWjoJ1Zmhsb36Kk5qbnJqVjIBzZGZqa3yHkJaZmZeUi35wYmRnanyGj5WWlpSRiXxuX2JkanyEjZKVlJKPhnluXl9ibHqCi5GTk5GNhHZqXF1fanyBiY+RkZCLgXNmWlxdaHmAh4yPj46Kg3JlWVpbZ3d/hYqNjYyIf29iV1hZZXR9goiLi4qHfWxfVFVXY3J6gIWJiYeEe2pbUlNVYXB4foSHhoWCeGdYUFBTX21zeoCDg4KAdmVWTk5QXGpxdnyAf358b2NUT01UXGZ0eH17fHt5bWJUR01TV2RvdHp9fHt5cGVYUE1TV2Jwdnp7e3p4cGZaU09UWGRvdXp7e3l3cGdcVlNXXGZwd3t8e3l2b2heWVdaX2lzent7enl0bmVfW1lfZG50e3t6eHVvZ2JeXGBla3R6e3t4dXBpY19eY2dsc3l7enh1cWpkYWFkaW90eXt5d3RvamVjY2drcnl6eXd0cGtmZGVobnN4enl3dHFsZ2ZnaWx0eHp4dnRwbGhnZ2ltd3l5d3Vybmtnamp0d3h4dnVxbWppcHN2eHd2dHFtamxvc3Z4dnVzb2xsbW5zdnd1dHNvbW1ucnV3dnV0cm9ubm9xc3V1dHNxb25ub3Bxc3NycXBub25vb3ByMDEwMC8wLy8vLy8vLy4uLi4uLi4uLi4tLS0tLS0tLSwsKyssKysrKysrKioqKioqKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSg=');
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Ignore errors if autoplay blocked
  } catch (e) {}

  // Remove after animation
  setTimeout(() => {
    notification.classList.remove('animate__fadeInUp');
    notification.classList.add('animate__fadeOutUp');
    setTimeout(() => notification.remove(), 500);
  }, 4000);
}

/**
 * Show multiple achievements in sequence
 */
export function showAchievementsUnlocked(achievements) {
  if (!achievements || achievements.length === 0) return;

  let delay = 0;
  achievements.forEach((achievement) => {
    setTimeout(() => {
      showAchievementUnlock(achievement);
    }, delay);
    delay += 4500; // Stagger notifications
  });
}

/**
 * Show level up celebration
 */
export function showLevelUp(newLevel) {
  // Remove any existing celebration
  document.querySelector('.level-up-celebration')?.remove();

  const celebration = document.createElement('div');
  celebration.className = 'level-up-celebration';
  celebration.innerHTML = `
    <div class="level-up-overlay"></div>
    <div class="level-up-content animate__animated animate__zoomIn">
      <div class="level-up-stars">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star big"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <h2>¡Subiste de Nivel!</h2>
      <div class="level-number">
        <span class="level-badge">Nivel ${newLevel}</span>
      </div>
      <p>Sigue así, ¡vas increíble!</p>
      <button class="level-up-close">¡Genial!</button>
    </div>
  `;

  document.body.appendChild(celebration);

  // Create confetti effect
  createConfetti();

  // Close handlers
  const close = () => {
    celebration.classList.add('fade-out');
    setTimeout(() => celebration.remove(), 300);
  };

  celebration.querySelector('.level-up-close').addEventListener('click', close);
  celebration.querySelector('.level-up-overlay').addEventListener('click', close);

  // Auto-close after 5 seconds
  setTimeout(close, 5000);
}

/**
 * Create confetti animation
 */
function createConfetti() {
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    
    document.body.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => confetti.remove(), 4000);
  }
}

/**
 * Check for time-based achievements and show notifications
 */
export function checkAndShowTimeAchievements() {
  const newAchievements = checkTimeBasedAchievements();
  if (newAchievements.length > 0) {
    showAchievementsUnlocked(newAchievements);
  }
}
