const GAME_KEY = 'emowords_gamification';

function getGameData() {
  const raw = localStorage.getItem(GAME_KEY);
  return raw ? JSON.parse(raw) : {
    streak: 0,
    lastStudyDate: null,
    maxStreak: 0,
    dailyGoal: {
      date: new Date().toLocaleDateString(),
      count: 0,
      target: 20
    },
    totalXp: 0,
    level: 1,
    perfectSessions: 0,
    totalReviews: 0
  };
}

function saveGameData(data) {
  localStorage.setItem(GAME_KEY, JSON.stringify(data));
}

export function getGamificationStats() {
  // Check streak validity on load
  const data = getGameData();
  const today = new Date().toLocaleDateString();
  
  // Migration: Ensure unlockedCoaches exists
  if (!data.unlockedCoaches) {
    data.unlockedCoaches = [];
  }
  
  if (data.dailyGoal.date !== today) {
    // Reset daily goal
    data.dailyGoal = {
      date: today,
      count: 0,
      target: data.dailyGoal.target || 20
    };
    
    // Check broken streak (if last study date was not yesterday)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (data.lastStudyDate !== yesterday.toLocaleDateString() && data.lastStudyDate !== today) {
      if (data.streak > 0) {
        // Streak broken
        // Optional: Add logic here to notify user
      }
      data.streak = 0;
    }
    
    saveGameData(data);
  }
  
  return data;
}

export function updateProgress(count = 1, options = {}) {
  const data = getGameData();
  const today = new Date().toLocaleDateString();
  const previousLevel = data.level;
  
  // Initialize today if needed
  if (data.dailyGoal.date !== today) {
    data.dailyGoal = { date: today, count: 0, target: data.dailyGoal.target || 20 };
  }
  
  // Update daily count
  data.dailyGoal.count += count;
  
  // Update total reviews
  data.totalReviews = (data.totalReviews || 0) + count;
  
  // Track perfect sessions
  if (options.perfectSession) {
    data.perfectSessions = (data.perfectSessions || 0) + 1;
  }
  
  // Update streak if this is the first activity of the day
  if (data.lastStudyDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString();
    
    if (data.lastStudyDate === yesterdayStr) {
      data.streak += 1;
    } else {
      data.streak = 1; // Reset or start new
    }
    
    if (data.streak > data.maxStreak) {
      data.maxStreak = data.streak;
    }
    
    data.lastStudyDate = today;
  }
  
  // XP Calculation (Example: 10 XP per word)
  data.totalXp += (count * 10);
  data.level = Math.floor(Math.sqrt(data.totalXp / 100)) + 1;
  
  saveGameData(data);
  
  // Return level up info if applicable
  const leveledUp = data.level > previousLevel;
  
  return {
    ...data,
    leveledUp,
    newLevel: leveledUp ? data.level : null
  };
}

export function setDailyTarget(target) {
  const data = getGameData();
  data.dailyGoal.target = target;
  saveGameData(data);
}

export function unlockCoach(coachId) {
  const data = getGameData();
  if (!data.unlockedCoaches) data.unlockedCoaches = [];
  
  if (!data.unlockedCoaches.includes(coachId)) {
    data.unlockedCoaches.push(coachId);
    saveGameData(data);
    return true; // Newly unlocked
  }
  return false; // Already unlocked
}

/**
 * Get stats for achievement checking
 */
export function getStatsForAchievements(vocabStats) {
  const gameData = getGameData();
  
  return {
    totalWords: vocabStats?.total || 0,
    masteredWords: vocabStats?.mastered || 0,
    wordsByType: vocabStats?.byType || { word: 0, phrasal: 0, expression: 0, connector: 0 },
    maxStreak: gameData.maxStreak || 0,
    streak: gameData.streak || 0,
    totalReviews: gameData.totalReviews || 0,
    perfectSessions: gameData.perfectSessions || 0,
    level: gameData.level || 1,
    studiedAtNight: false,
    studiedEarly: false
  };
}

