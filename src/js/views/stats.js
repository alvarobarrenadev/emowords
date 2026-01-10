import { getStatistics, getAllWords } from '../storage/vocabStorage.js';

export function renderStats(container) {
  const allWords = getAllWords();
  const stats = getStatistics();
  
  // Clean up container
  container.innerHTML = '';
  container.className = 'stats-view animate__animated animate__fadeIn';

  if (stats.total === 0) {
    renderEmptyState(container);
    return;
  }

  // --- Calculations ---

  // 1. Mastery Score (Weighted Average)
  // Mastered (10+) = 100%, Guru (5-9) = 75%, Apprentice (2-4) = 40%, New (<2) = 10%
  let totalMasteryPoints = 0;
  let masteryBreakdown = { master: 0, guru: 0, apprentice: 0, new: 0 };

  allWords.forEach(w => {
    const wins = w.correctCount || 0;
    if (wins >= 10) { totalMasteryPoints += 100; masteryBreakdown.master++; }
    else if (wins >= 5) { totalMasteryPoints += 75; masteryBreakdown.guru++; }
    else if (wins >= 2) { totalMasteryPoints += 40; masteryBreakdown.apprentice++; }
    else { totalMasteryPoints += 10; masteryBreakdown.new++; }
  });
  
  const masteryScore = stats.total > 0 ? Math.round(totalMasteryPoints / stats.total) : 0;

  // 2. Growth Chart Data (Cumulative Words over Time)
  const growthData = calculateGrowthData(allWords);

  // 3. Accuracy by Type
  const typeStats = calculateTypeStats(allWords);

  // 4. Struggling Words
  const strugglingWords = getStrugglingWords(allWords);

  // --- HTML Template ---
  
  const html = `
    <header class="dashboard-header" style="text-align: center;">
        <div class="header-content" style="display: flex; flex-direction: column; align-items: center;">
            <h2 class="title">Centro de Estadísticas</h2>
            <p class="subtitle">Visualiza tu evolución y optimiza tu aprendizaje</p>
        </div>
        <div class="global-grade">
            <span class="grade-label">Nivel General</span>
            <span class="grade-value ${getGradeColorClass(masteryScore)}">${getGradeLetter(masteryScore)}</span>
        </div>
    </header>

    <!-- KPI Grid -->
    <div class="kpi-grid">
        <!-- Total Words -->
        <div class="kpi-card total-words">
            <div class="kpi-top">
                <div class="kpi-icon"><i class="fa-solid fa-book-open"></i></div>
                <div class="kpi-content">
                    <span class="value">${stats.total}</span>
                    <span class="label">Palabras Totales</span>
                </div>
            </div>
            <div class="kpi-chart-mini">
                ${renderMiniSparkline(growthData)}
            </div>
        </div>

        <!-- Mastery Gauge -->
        <div class="kpi-card mastery">
            <div class="kpi-top">
                <div class="kpi-icon"><i class="fa-solid fa-brain"></i></div>
                <div class="kpi-content">
                    <span class="value">${masteryScore}%</span>
                    <span class="label">Dominio del Vocabulario</span>
                </div>
            </div>
            <div class="circular-progress" style="--percent: ${masteryScore}">
                <svg viewBox="0 0 36 36">
                    <path class="bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path class="meter" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
            </div>
        </div>

        <!-- Retention Rate -->
        <div class="kpi-card retention">
            <div class="kpi-top">
                <div class="kpi-icon"><i class="fa-solid fa-bullseye"></i></div>
                <div class="kpi-content">
                    <span class="value">${stats.retentionRate}%</span>
                    <span class="label">Precisión de Repaso</span>
                </div>
            </div>
             <div class="progress-bar-mini">
                <div class="fill" style="width: ${stats.retentionRate}%"></div>
            </div>
        </div>
    </div>

    <!-- Main Content Layout -->
    <div class="dashboard-main">
        
        <!-- Left Column: Charts -->
        <div class="main-column">
            
            <!-- Growth Chart -->
            <div class="dashboard-card growth-chart-card">
                <div class="card-header">
                    <h3><i class="fa-solid fa-arrow-trend-up"></i> Curva de Aprendizaje</h3>
                    <span class="period-badge">Histórico Completo</span>
                </div>
                <div class="chart-area" id="growth-chart-container">
                    ${renderGrowthChart(growthData)}
                </div>
            </div>

            <!-- Distribution & Mastery Breakdown -->
            <div class="two-col-grid">
                <!-- Type Distribution -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3><i class="fa-solid fa-layer-group"></i> Por Categoría</h3>
                    </div>
                    <div class="types-list">
                        ${renderTypeBars(typeStats)}
                    </div>
                </div>

                <!-- Mastery Pyramid -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3><i class="fa-solid fa-trophy"></i> Niveles de Maestría</h3>
                    </div>
                    <div class="mastery-levels">
                        <div class="level-item master">
                            <span class="lvl-name">Maestro (10+)</span>
                            <div class="lvl-bar"><div class="fill" style="width: ${getPercent(masteryBreakdown.master, stats.total)}%"></div></div>
                            <span class="lvl-count">${masteryBreakdown.master}</span>
                        </div>
                        <div class="level-item guru">
                            <span class="lvl-name">Experto (5-9)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${getPercent(masteryBreakdown.guru, stats.total)}%"></div></div>
                            <span class="lvl-count">${masteryBreakdown.guru}</span>
                        </div>
                        <div class="level-item apprentice">
                            <span class="lvl-name">Aprendiz (2-4)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${getPercent(masteryBreakdown.apprentice, stats.total)}%"></div></div>
                            <span class="lvl-count">${masteryBreakdown.apprentice}</span>
                        </div>
                        <div class="level-item new">
                            <span class="lvl-name">Nuevo (0-1)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${getPercent(masteryBreakdown.new, stats.total)}%"></div></div>
                            <span class="lvl-count">${masteryBreakdown.new}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Column: Actions & Lists -->
        <div class="side-column">
            
            <!-- Struggling Words -->
            <div class="dashboard-card struggling-card">
                <div class="card-header">
                    <h3><i class="fa-solid fa-triangle-exclamation"></i> Necesitan Atención</h3>
                </div>
                <div class="struggling-list">
                    ${strugglingWords.length > 0 ? strugglingWords.map(w => `
                        <div class="struggling-item">
                            <div class="s-info">
                                <span class="s-word">${w.word}</span>
                                <span class="s-meaning">${w.meaning}</span>
                            </div>
                            <div class="s-metric">
                                <span class="error-badge">${w.incorrectCount} fallos</span>
                            </div>
                        </div>
                    `).join('') : '<div class="empty-state-mini">¡Todo va genial! No tienes palabras críticas.</div>'}
                </div>
                ${strugglingWords.length > 0 ? `
                   <!-- Potential future Feature: <button class="btn-secondary full-width-btn">Practicar Errores</button> -->
                ` : ''}
            </div>

            <!-- Motivation / Fun Fact -->
            <div class="dashboard-card tip-card">
                <div class="tip-icon"><i class="fa-regular fa-lightbulb"></i></div>
                <div class="tip-content">
                    <h4>La Consistencia es Clave</h4>
                    <p>Pequeños repasos diarios son más efectivos que largas sesiones semanales.</p>
                </div>
            </div>

        </div>
    </div>
  `;

  container.innerHTML = html;
}

// --- Helpers ---

function renderEmptyState(container) {
    container.innerHTML = `
        <div class="empty-stats">
            <i class="fa-solid fa-chart-simple"></i>
            <h2>Sin datos suficientes</h2>
            <p>Añade algunas palabras para empezar a ver tus estadísticas.</p>
        </div>
    `;
}

function calculateGrowthData(words) {
    // Sort by created date
    const sorted = [...words].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    
    // Group by date (YYYY-MM-DD)
    const map = new Map();
    let cumulative = 0;
    
    sorted.forEach(w => {
        cumulative++;
        const date = new Date(w.createdAt || Date.now()).toISOString().split('T')[0];
        map.set(date, cumulative);
    });

    // Convert to array
    const data = Array.from(map.entries()).map(([date, count]) => ({ date, count }));
    
    // If we have very few points, add a start point at 0
    if (data.length > 0 && data.length < 2) {
        const firstDate = new Date(data[0].date);
        firstDate.setDate(firstDate.getDate() - 1);
        data.unshift({ date: firstDate.toISOString().split('T')[0], count: 0 });
    }

    return data;
}

function calculateTypeStats(words) {
    const types = ['word', 'phrasal', 'expression', 'connector'];
    const stats = {};
    
    types.forEach(type => {
        const subset = words.filter(w => w.type === type);
        const count = subset.length;
        if (count === 0) return;
        
        let correct = 0;
        let incorrect = 0;
        subset.forEach(w => {
            correct += w.correctCount || 0;
            incorrect += w.incorrectCount || 0;
        });
        
        const total = correct + incorrect;
        const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
        
        stats[type] = { count, accuracy };
    });
    
    return stats;
}

function getStrugglingWords(words) {
    return [...words]
        .filter(w => (w.incorrectCount || 0) > 0)
        .sort((a, b) => {
             // Ratio of incorrect/reviews, weighted by total incorrect
             const rateA = (a.incorrectCount / (a.reviewCount || 1));
             const rateB = (b.incorrectCount / (b.reviewCount || 1));
             return rateB - rateA; 
        })
        .slice(0, 5);
}

function getPercent(val, total) {
    if (!total) return 0;
    return Math.round((val / total) * 100);
}

function getGradeLetter(score) {
    if (score >= 90) return 'S';
    if (score >= 80) return 'A';
    if (score >= 60) return 'B';
    if (score >= 40) return 'C';
    return 'D';
}

function getGradeColorClass(score) {
    if (score >= 90) return 'text-legendary'; // S
    if (score >= 80) return 'text-success';   // A
    if (score >= 60) return 'text-primary';   // B
    if (score >= 40) return 'text-warning';   // C
    return 'text-danger';                     // D
}

// --- SVG Chart Renderers ---

function renderGrowthChart(data) {
    if (!data || data.length === 0) return '';
    
    // Dimensions
    const width = 800;
    const height = 300;
    const padding = 20;
    
    const maxCount = data[data.length - 1].count;
    if (maxCount === 0) return '';

    // Generate Points
    // X axis: spread evenly
    // Y axis: count / maxCount
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
        const y = height - ((d.count / maxCount) * (height - 2 * padding) + padding);
        return `${x},${y}`;
    }).join(' ');

    // Gradient definition for area under curve
    // Close the path for fill
    const firstX = padding;
    const lastX = width - padding;
    const fillPath = `${firstX},${height} ${points} ${lastX},${height}`;

    return `
        <svg viewBox="0 0 ${width} ${height}" class="svg-chart" preserveAspectRatio="none">
            <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="var(--primary-500)" stop-opacity="0.4"/>
                    <stop offset="100%" stop-color="var(--primary-500)" stop-opacity="0"/>
                </linearGradient>
            </defs>
            <!-- Grid Lines (Horizontal) -->
            <line x1="0" y1="${height - padding}" x2="${width}" y2="${height - padding}" stroke="var(--gray-800)" stroke-width="1" />
            <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" stroke="var(--gray-800)" stroke-width="1" stroke-dasharray="5,5" />
            
            <!-- Area Fill -->
            <polygon points="${fillPath}" fill="url(#chartGradient)" />
            
            <!-- Line -->
            <polyline points="${points}" fill="none" stroke="var(--primary-400)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `;
}

function renderMiniSparkline(data) {
    if (!data || data.length < 2) return '';
    const width = 100;
    const height = 40;
    const max = data[data.length - 1].count;
    
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - (d.count / max) * height;
        return `${x},${y}`;
    }).join(' ');
    
    return `
        <svg viewBox="0 0 ${width} ${height}" class="sparkline" preserveAspectRatio="none">
             <polyline points="${points}" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
    `;
}

function renderTypeBars(stats) {
    const typeLabels = {
        word: 'Palabras',
        phrasal: 'Phrasal Verbs',
        expression: 'Expresiones',
        connector: 'Conectores'
    };
    
    return Object.entries(stats).map(([type, data]) => `
        <div class="type-stat-row">
            <div class="row-header">
                <span class="t-name">${typeLabels[type]}</span>
                <span class="t-val">${data.count}</span>
            </div>
            <div class="row-bar-bg">
                <div class="row-bar-fill ${type}" style="width: ${data.accuracy}%"></div>
            </div>
            <div class="row-meta">Precisión: ${data.accuracy}%</div>
        </div>
    `).join('');
}
