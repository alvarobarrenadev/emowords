/**
 * Achievements System for EmoWords
 * Tracks user milestones and unlocks badges
 */

const ACHIEVEMENTS_KEY = 'emowords_achievements';

// Achievement definitions
export const ACHIEVEMENTS = {
  // Word count milestones
  first_word: {
    id: 'first_word',
    name: 'Primera Palabra',
    description: 'Añade tu primera palabra',
    icon: 'fa-seedling',
    category: 'vocabulary',
    xpReward: 10,
    condition: (stats) => stats.totalWords >= 1
  },
  collector_10: {
    id: 'collector_10',
    name: 'Coleccionista',
    description: 'Alcanza 10 palabras en tu vocabulario',
    icon: 'fa-layer-group',
    category: 'vocabulary',
    xpReward: 25,
    condition: (stats) => stats.totalWords >= 10
  },
  collector_50: {
    id: 'collector_50',
    name: 'Bibliotecario',
    description: 'Alcanza 50 palabras en tu vocabulario',
    icon: 'fa-book',
    category: 'vocabulary',
    xpReward: 50,
    condition: (stats) => stats.totalWords >= 50
  },
  collector_100: {
    id: 'collector_100',
    name: 'Erudito',
    description: 'Alcanza 100 palabras en tu vocabulario',
    icon: 'fa-graduation-cap',
    category: 'vocabulary',
    xpReward: 100,
    condition: (stats) => stats.totalWords >= 100
  },
  collector_500: {
    id: 'collector_500',
    name: 'Maestro del Léxico',
    description: 'Alcanza 500 palabras en tu vocabulario',
    icon: 'fa-crown',
    category: 'vocabulary',
    xpReward: 250,
    condition: (stats) => stats.totalWords >= 500
  },

  // Streak achievements
  streak_3: {
    id: 'streak_3',
    name: 'En Racha',
    description: 'Mantén una racha de 3 días',
    icon: 'fa-fire',
    category: 'streak',
    xpReward: 30,
    condition: (stats) => stats.maxStreak >= 3
  },
  streak_7: {
    id: 'streak_7',
    name: 'Semana Perfecta',
    description: 'Mantén una racha de 7 días',
    icon: 'fa-fire-flame-curved',
    category: 'streak',
    xpReward: 70,
    condition: (stats) => stats.maxStreak >= 7
  },
  streak_30: {
    id: 'streak_30',
    name: 'Mes de Fuego',
    description: 'Mantén una racha de 30 días',
    icon: 'fa-meteor',
    category: 'streak',
    xpReward: 200,
    condition: (stats) => stats.maxStreak >= 30
  },
  streak_100: {
    id: 'streak_100',
    name: 'Imparable',
    description: 'Mantén una racha de 100 días',
    icon: 'fa-dragon',
    category: 'streak',
    xpReward: 500,
    condition: (stats) => stats.maxStreak >= 100
  },

  // Review achievements
  first_review: {
    id: 'first_review',
    name: 'Primer Repaso',
    description: 'Completa tu primera sesión de repaso',
    icon: 'fa-play',
    category: 'review',
    xpReward: 15,
    condition: (stats) => stats.totalReviews >= 1
  },
  reviewer_50: {
    id: 'reviewer_50',
    name: 'Repasador',
    description: 'Completa 50 repasos',
    icon: 'fa-rotate',
    category: 'review',
    xpReward: 50,
    condition: (stats) => stats.totalReviews >= 50
  },
  reviewer_200: {
    id: 'reviewer_200',
    name: 'Experto en Repasos',
    description: 'Completa 200 repasos',
    icon: 'fa-brain',
    category: 'review',
    xpReward: 100,
    condition: (stats) => stats.totalReviews >= 200
  },
  perfect_session: {
    id: 'perfect_session',
    name: 'Sesión Perfecta',
    description: 'Completa una sesión sin errores (mín. 5 palabras)',
    icon: 'fa-star',
    category: 'review',
    xpReward: 40,
    condition: (stats) => stats.perfectSessions >= 1
  },

  // Mastery achievements
  first_master: {
    id: 'first_master',
    name: 'Primera Maestría',
    description: 'Domina completamente tu primera palabra',
    icon: 'fa-gem',
    category: 'mastery',
    xpReward: 30,
    condition: (stats) => stats.masteredWords >= 1
  },
  master_10: {
    id: 'master_10',
    name: 'Dominador',
    description: 'Domina 10 palabras',
    icon: 'fa-trophy',
    category: 'mastery',
    xpReward: 75,
    condition: (stats) => stats.masteredWords >= 10
  },
  master_50: {
    id: 'master_50',
    name: 'Gran Maestro',
    description: 'Domina 50 palabras',
    icon: 'fa-medal',
    category: 'mastery',
    xpReward: 200,
    condition: (stats) => stats.masteredWords >= 50
  },

  // Level achievements
  level_5: {
    id: 'level_5',
    name: 'Aprendiz Dedicado',
    description: 'Alcanza el nivel 5',
    icon: 'fa-arrow-up',
    category: 'level',
    xpReward: 50,
    condition: (stats) => stats.level >= 5
  },
  level_10: {
    id: 'level_10',
    name: 'Estudiante Avanzado',
    description: 'Alcanza el nivel 10',
    icon: 'fa-ranking-star',
    category: 'level',
    xpReward: 100,
    condition: (stats) => stats.level >= 10
  },
  level_25: {
    id: 'level_25',
    name: 'Leyenda del Vocabulario',
    description: 'Alcanza el nivel 25',
    icon: 'fa-chess-king',
    category: 'level',
    xpReward: 300,
    condition: (stats) => stats.level >= 25
  },

  // Special achievements
  variety_master: {
    id: 'variety_master',
    name: 'Variedad',
    description: 'Tiene al menos 5 de cada tipo (palabra, phrasal, expresión, conector)',
    icon: 'fa-shapes',
    category: 'special',
    xpReward: 60,
    condition: (stats) => 
      stats.wordsByType.word >= 5 && 
      stats.wordsByType.phrasal >= 5 && 
      stats.wordsByType.expression >= 5 && 
      stats.wordsByType.connector >= 5
  },
  night_owl: {
    id: 'night_owl',
    name: 'Búho Nocturno',
    description: 'Estudia después de medianoche',
    icon: 'fa-moon',
    category: 'special',
    xpReward: 20,
    condition: (stats) => stats.studiedAtNight
  },
  early_bird: {
    id: 'early_bird',
    name: 'Madrugador',
    description: 'Estudia antes de las 7am',
    icon: 'fa-sun',
    category: 'special',
    xpReward: 20,
    condition: (stats) => stats.studiedEarly
  }
};

/**
 * Get unlocked achievements
 */
export function getUnlockedAchievements() {
  const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

/**
 * Save unlocked achievements
 */
function saveUnlockedAchievements(achievements) {
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
}

/**
 * Check and unlock new achievements based on current stats
 * Returns newly unlocked achievements
 */
export function checkAchievements(stats) {
  const unlocked = getUnlockedAchievements();
  const newlyUnlocked = [];

  Object.values(ACHIEVEMENTS).forEach(achievement => {
    // Skip if already unlocked
    if (unlocked.includes(achievement.id)) return;

    // Check condition
    if (achievement.condition(stats)) {
      unlocked.push(achievement.id);
      newlyUnlocked.push(achievement);
    }
  });

  if (newlyUnlocked.length > 0) {
    saveUnlockedAchievements(unlocked);
  }

  return newlyUnlocked;
}

/**
 * Get achievement by ID
 */
export function getAchievement(id) {
  return ACHIEVEMENTS[id] || null;
}

/**
 * Get all achievements with unlock status
 */
export function getAllAchievementsWithStatus() {
  const unlocked = getUnlockedAchievements();
  
  return Object.values(ACHIEVEMENTS).map(achievement => ({
    ...achievement,
    unlocked: unlocked.includes(achievement.id)
  }));
}

/**
 * Get achievements by category
 */
export function getAchievementsByCategory() {
  const all = getAllAchievementsWithStatus();
  const categories = {
    vocabulary: { name: 'Vocabulario', icon: 'fa-book', achievements: [] },
    streak: { name: 'Rachas', icon: 'fa-fire', achievements: [] },
    review: { name: 'Repasos', icon: 'fa-rotate', achievements: [] },
    mastery: { name: 'Maestría', icon: 'fa-gem', achievements: [] },
    level: { name: 'Niveles', icon: 'fa-arrow-trend-up', achievements: [] },
    special: { name: 'Especiales', icon: 'fa-star', achievements: [] }
  };

  all.forEach(achievement => {
    if (categories[achievement.category]) {
      categories[achievement.category].achievements.push(achievement);
    }
  });

  return categories;
}

/**
 * Get achievement progress summary
 */
export function getAchievementsSummary() {
  const all = Object.keys(ACHIEVEMENTS).length;
  const unlocked = getUnlockedAchievements().length;
  return {
    total: all,
    unlocked,
    percent: Math.round((unlocked / all) * 100)
  };
}

/**
 * Mark special time-based achievements
 */
export function checkTimeBasedAchievements() {
  const hour = new Date().getHours();
  const stats = {
    studiedAtNight: hour >= 0 && hour < 5,
    studiedEarly: hour >= 5 && hour < 7
  };
  
  // Only check these specific ones
  const unlocked = getUnlockedAchievements();
  const newlyUnlocked = [];

  if (stats.studiedAtNight && !unlocked.includes('night_owl')) {
    unlocked.push('night_owl');
    newlyUnlocked.push(ACHIEVEMENTS.night_owl);
  }
  
  if (stats.studiedEarly && !unlocked.includes('early_bird')) {
    unlocked.push('early_bird');
    newlyUnlocked.push(ACHIEVEMENTS.early_bird);
  }

  if (newlyUnlocked.length > 0) {
    saveUnlockedAchievements(unlocked);
  }

  return newlyUnlocked;
}
