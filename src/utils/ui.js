export const TOAST_CONTAINER_ID = 'toast-container';

function getToastContainer() {
  let container = document.getElementById(TOAST_CONTAINER_ID);
  if (!container) {
    container = document.createElement('div');
    container.id = TOAST_CONTAINER_ID;
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
}

export function showToast(title, message, type = 'info', duration = 4000) {
  const container = getToastContainer();
  const toast = document.createElement('div');
  const iconMap = {
    info: 'fa-circle-info',
    success: 'fa-circle-check',
    warning: 'fa-triangle-exclamation',
    error: 'fa-circle-xmark'
  };
  
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${iconMap[type] || 'fa-bell'}"></i>
    <div class="toast-content">
      <span class="toast-title">${title}</span>
      <span class="toast-message">${message}</span>
    </div>
  `;
  
  container.appendChild(toast);
  
  // Auto remove
  if (duration > 0) {
    setTimeout(() => {
      toast.classList.add('removing');
      toast.addEventListener('animationend', () => {
        toast.remove();
        if (container.children.length === 0) {
          container.remove();
        }
      });
    }, duration);
  }
}
