import { getStatistics } from '../storage/vocabStorage.js';

export function renderStats(container) {
  const stats = getStatistics();

  container.innerHTML = `
    <h2 style="margin-bottom: 2rem;"><i class="fa-solid fa-chart-line"></i> Estadísticas</h2>
    
    <div class="dashboard-grid">
      <!-- Summary Card -->
      <div class="chart-card">
        <div class="chart-header">
          <span class="chart-title"><i class="fa-solid fa-chart-pie"></i> Resumen</span>
        </div>
        <div class="stats-dashboard" style="grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0;">
          <div class="stat-card stat-total" style="padding: 0.8rem;">
            <div class="stat-content">
              <span class="stat-value" style="font-size: 1.5rem;">${stats.total}</span>
              <span class="stat-label" style="font-size: 0.8rem;">Total</span>
            </div>
          </div>
          <div class="stat-card stat-remembered" style="padding: 0.8rem;">
            <div class="stat-content">
              <span class="stat-value" style="font-size: 1.5rem;">${stats.remembered}</span>
              <span class="stat-label" style="font-size: 0.8rem;">Recordadas</span>
            </div>
          </div>
        </div>
        <div style="margin-top: 1rem;">
          <div class="progress-label">
            <span>Tasa de Retención</span>
            <span>${stats.retentionRate}%</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill success" style="width: ${stats.retentionRate}%"></div>
          </div>
        </div>
      </div>

      <!-- Review Status Card -->
      <div class="chart-card">
        <div class="chart-header">
          <span class="chart-title"><i class="fa-solid fa-brain"></i> Estado del Conocimiento</span>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Memorizadas</span>
            <span>${stats.remembered}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill primary" style="width: ${stats.total > 0 ? (stats.remembered / stats.total * 100) : 0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Por Repasar / Olvidadas</span>
            <span>${stats.forgotten}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill warning" style="width: ${stats.total > 0 ? (stats.forgotten / stats.total * 100) : 0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Repasos Totales</span>
            <span>${stats.totalReviews}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill info" style="width: 100%; background: var(--primary-100);"></div>
          </div>
        </div>
      </div>

      <!-- Types Card -->
      <div class="chart-card">
        <div class="chart-header">
          <span class="chart-title"><i class="fa-solid fa-layer-group"></i> Por Tipo</span>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Palabras</span>
            <span>${stats.byType.word}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill primary" style="width: ${stats.total > 0 ? (stats.byType.word / stats.total * 100) : 0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Phrasal Verbs</span>
            <span>${stats.byType.phrasal}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill success" style="width: ${stats.total > 0 ? (stats.byType.phrasal / stats.total * 100) : 0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Expresiones</span>
            <span>${stats.byType.expression}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill warning" style="width: ${stats.total > 0 ? (stats.byType.expression / stats.total * 100) : 0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Conectores</span>
            <span>${stats.byType.connector}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill info" style="width: ${stats.total > 0 ? (stats.byType.connector / stats.total * 100) : 0}%"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}
