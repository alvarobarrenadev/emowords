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
    level: 1
  };
}

function saveGameData(data) {
  localStorage.setItem(GAME_KEY, JSON.stringify(data));
}

export function getGamificationStats() {
  // Check streak validity on load
  const data = getGameData();
  const today = new Date().toLocaleDateString();
  
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

export function updateProgress(count = 1) {
  const data = getGameData();
  const today = new Date().toLocaleDateString();
  
  // Initialize today if needed
  if (data.dailyGoal.date !== today) {
    data.dailyGoal = { date: today, count: 0, target: 20 };
  }
  
  // Update daily count
  data.dailyGoal.count += count;
  
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
  return data;
}

export function setDailyTarget(target) {
  const data = getGameData();
  data.dailyGoal.target = target;
  saveGameData(data);
}
