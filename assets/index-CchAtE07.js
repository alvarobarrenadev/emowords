(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const A="emowords_vocab",H="emowords_settings";function g(){const e=localStorage.getItem(A);return e?JSON.parse(e):[]}function K(e){const t=g(),a={...e,createdAt:Date.now(),lastReviewedAt:null,reviewCount:0,correctCount:0,incorrectCount:0,nextReviewAt:Date.now(),difficulty:0};t.push(a),localStorage.setItem(A,JSON.stringify(t))}function M(e){const t=g().map(a=>a.id===e.id?e:a);localStorage.setItem(A,JSON.stringify(t))}function Q(e){const t=g().filter(a=>a.id!==e);localStorage.setItem(A,JSON.stringify(t))}function Y(e){return g().find(t=>t.id===e)}function Z(e){const t=g(),a=e.toLowerCase().trim();return a?t.filter(i=>i.word.toLowerCase().includes(a)||i.meaning.toLowerCase().includes(a)||i.example&&i.example.toLowerCase().includes(a)||i.emotion&&i.emotion.toLowerCase().includes(a)||i.category&&i.category.toLowerCase().includes(a)):t}function F(){const e=g(),t=new Set;return e.forEach(a=>{a.category&&t.add(a.category)}),Array.from(t).sort()}function X(e,t="date-desc"){const a=[...e];switch(t){case"date-asc":return a.sort((i,s)=>(i.createdAt||i.id)-(s.createdAt||s.id));case"date-desc":return a.sort((i,s)=>(s.createdAt||s.id)-(i.createdAt||i.id));case"alpha-asc":return a.sort((i,s)=>i.word.localeCompare(s.word));case"alpha-desc":return a.sort((i,s)=>s.word.localeCompare(i.word));case"review-count":return a.sort((i,s)=>(s.reviewCount||0)-(i.reviewCount||0));case"difficulty":return a.sort((i,s)=>(s.difficulty||0)-(i.difficulty||0));default:return a}}function z(){const e=g(),t=e.length,a=e.filter(c=>c.remembered).length,i=t-a,s=e.reduce((c,b)=>c+(b.reviewCount||0),0),o=t>0?(s/t).toFixed(1):0,n={word:e.filter(c=>c.type==="word").length,phrasal:e.filter(c=>c.type==="phrasal").length,expression:e.filter(c=>c.type==="expression").length},u=e.reduce((c,b)=>c+(b.correctCount||0),0),l=e.reduce((c,b)=>c+(b.incorrectCount||0),0),f=u+l>0?(u/(u+l)*100).toFixed(1):0,m=Date.now(),x=e.filter(c=>!c.nextReviewAt||c.nextReviewAt<=m).length;return{total:t,remembered:a,forgotten:i,totalReviews:s,averageReviews:o,byType:n,retentionRate:f,dueForReview:x}}function ee(){const e=g(),t=Date.now(),a=e.filter(l=>!l.remembered),i=e.filter(l=>l.remembered&&(!l.nextReviewAt||l.nextReviewAt<=t)),s=e.filter(l=>!l.lastReviewedAt),o=[...a,...s,...i],n=new Set,u=o.filter(l=>n.has(l.id)?!1:(n.add(l.id),!0));return u.length>0?u:e}function te(e,t){const a=Y(e);if(a){if(a.remembered=t,a.lastReviewedAt=Date.now(),a.reviewCount=(a.reviewCount||0)+1,t){a.correctCount=(a.correctCount||0)+1,a.difficulty=Math.max(-3,(a.difficulty||0)-1);const i=1440*60*1e3,s=Math.pow(2,Math.min(a.correctCount,5));a.nextReviewAt=Date.now()+i*s}else a.incorrectCount=(a.incorrectCount||0)+1,a.difficulty=Math.min(3,(a.difficulty||0)+1),a.nextReviewAt=Date.now();return M(a),a}}function ae(){const e=g(),t={version:"1.0",exportedAt:new Date().toISOString(),wordCount:e.length,words:e};return JSON.stringify(t,null,2)}function se(e){try{const t=JSON.parse(e);if(!t.words||!Array.isArray(t.words))throw new Error("Invalid data format: missing words array");const a=g(),i=new Set(a.map(n=>n.id));let s=0,o=0;return t.words.forEach(n=>{if(!n.word||!n.meaning){o++;return}(!n.id||i.has(n.id))&&(n.id=Date.now()+Math.random()),n.type=n.type||"word",n.remembered=n.remembered||!1,n.createdAt=n.createdAt||Date.now(),a.push(n),i.add(n.id),s++}),localStorage.setItem(A,JSON.stringify(a)),{success:!0,imported:s,skipped:o}}catch(t){return{success:!1,error:t.message}}}function _(e,t=null){const a=g(),i=e.toLowerCase().trim();return a.some(s=>s.word.toLowerCase().trim()===i&&s.id!==t)}function q(){const e=localStorage.getItem(H);return e?JSON.parse(e):{theme:"dark",language:"es",showExampleInReview:!0,autoPlayAudio:!1}}function ie(e){localStorage.setItem(H,JSON.stringify(e))}function ne(e,t){const a=document.createElement("div");a.className="word-card",a.dataset.wordId=e.id;const i=e.reviewCount||0,s=e.createdAt?new Date(e.createdAt).toLocaleDateString():"";return a.innerHTML=`
    ${e.image?`<img src="${e.image}" alt="${e.word}" class="word-image" />`:""}

    <div class="tags">
      <span class="tag type-tag">${re(e.type)}</span>
      <span class="tag ${e.remembered?"remembered":"forgotten"}">
        <i class="fa-solid ${e.remembered?"fa-check":"fa-rotate"}"></i>
        ${e.remembered?"Recordada":"Olvidada"}
      </span>
      ${e.category?`<span class="tag category-tag"><i class="fa-solid fa-folder"></i> ${e.category}</span>`:""}
    </div>

    <div class="word-info">
      <h3>${e.word}</h3>
      <p class="meaning-text">${e.meaning}</p>

      ${e.emotion?`
        <p class="section-label"><i class="fa-solid fa-heart"></i> Asociación emocional</p>
        <p class="emotion-text">${e.emotion}</p>`:""}

      ${e.example?`
        <p class="section-label"><i class="fa-solid fa-quote-left"></i> Ejemplo</p>
        <p class="example">${e.example}</p>`:""}
      
      <div class="word-meta">
        ${i>0?`<span class="meta-item"><i class="fa-solid fa-chart-simple"></i> ${i} repasos</span>`:""}
        ${s?`<span class="meta-item"><i class="fa-regular fa-calendar"></i> ${s}</span>`:""}
      </div>
    </div>

    <div class="actions">
      <button class="action-btn edit-btn" title="Editar">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button class="action-btn toggle ${e.remembered?"unmark":"mark"}">
        <i class="fa-solid ${e.remembered?"fa-rotate-left":"fa-check"}"></i>
        ${e.remembered?"Desmarcar":"Marcar"}
      </button>
      <button class="action-btn delete" title="Eliminar">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `,a.querySelector(".toggle").addEventListener("click",()=>{e.remembered=!e.remembered,M(e),t()}),a.querySelector(".delete").addEventListener("click",()=>{confirm(`¿Eliminar "${e.word}"?`)&&(Q(e.id),t())}),a.querySelector(".edit-btn").addEventListener("click",()=>{oe(e,t)}),a}function oe(e,t){document.querySelector(".edit-modal")?.remove();const a=document.createElement("div");a.className="edit-modal",a.innerHTML=`
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3><i class="fa-solid fa-pen-to-square"></i> Editar palabra</h3>
        <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <form class="edit-form">
        <div class="form-row">
          <div class="form-field">
            <label><i class="fa-solid fa-font"></i> Palabra</label>
            <input type="text" id="edit-word" value="${C(e.word)}" required />
          </div>
          <div class="form-field">
            <label><i class="fa-solid fa-language"></i> Significado</label>
            <input type="text" id="edit-meaning" value="${C(e.meaning)}" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label><i class="fa-solid fa-tag"></i> Tipo</label>
            <select id="edit-type">
              <option value="word" ${e.type==="word"?"selected":""}>Palabra</option>
              <option value="phrasal" ${e.type==="phrasal"?"selected":""}>Phrasal verb</option>
              <option value="expression" ${e.type==="expression"?"selected":""}>Expresión</option>
            </select>
          </div>
          <div class="form-field">
            <label><i class="fa-solid fa-folder"></i> Categoría</label>
            <input type="text" id="edit-category" value="${C(e.category||"")}" />
          </div>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-heart"></i> Asociación emocional</label>
          <textarea id="edit-emotion" rows="3">${C(e.emotion||"")}</textarea>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-quote-left"></i> Ejemplo</label>
          <input type="text" id="edit-example" value="${C(e.example||"")}" />
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-image"></i> URL de imagen</label>
          <input type="url" id="edit-image" value="${C(e.image||"")}" />
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-cancel">Cancelar</button>
          <button type="submit" class="btn-save"><i class="fa-solid fa-check"></i> Guardar cambios</button>
        </div>
        <div class="edit-feedback" style="display: none; color: var(--danger); font-size: 0.9rem; margin-top: 1rem; text-align: center;"></div>
      </form>
    </div>
  `,document.body.appendChild(a),requestAnimationFrame(()=>{a.classList.add("active")});const i=()=>{a.classList.remove("active"),setTimeout(()=>a.remove(),300)};a.querySelector(".modal-overlay").addEventListener("click",i),a.querySelector(".modal-close").addEventListener("click",i),a.querySelector(".btn-cancel").addEventListener("click",i),a.querySelector(".edit-form").addEventListener("submit",s=>{s.preventDefault();const o=document.getElementById("edit-word").value.trim(),n=a.querySelector(".edit-feedback");if(_(o,e.id)){n.textContent=`La palabra "${o}" ya existe.`,n.style.display="block";return}e.word=o,e.meaning=document.getElementById("edit-meaning").value.trim(),e.type=document.getElementById("edit-type").value,e.category=document.getElementById("edit-category").value.trim()||null,e.emotion=document.getElementById("edit-emotion").value.trim(),e.example=document.getElementById("edit-example").value.trim(),e.image=document.getElementById("edit-image").value.trim(),M(e),i(),t()}),document.addEventListener("keydown",function s(o){o.key==="Escape"&&(i(),document.removeEventListener("keydown",s))})}function C(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function re(e){switch(e){case"word":return'<i class="fa-solid fa-font"></i> Palabra';case"phrasal":return'<i class="fa-solid fa-link"></i> Phrasal Verb';case"expression":return'<i class="fa-solid fa-comment"></i> Expresión';default:return'<i class="fa-solid fa-file"></i> Otro'}}const N="toast-container";function le(){let e=document.getElementById(N);return e||(e=document.createElement("div"),e.id=N,e.className="toast-container",document.body.appendChild(e)),e}function E(e,t,a="info",i=4e3){const s=le(),o=document.createElement("div"),n={info:"fa-circle-info",success:"fa-circle-check",warning:"fa-triangle-exclamation",error:"fa-circle-xmark"};o.className=`toast ${a}`,o.innerHTML=`
    <i class="fa-solid ${n[a]||"fa-bell"}"></i>
    <div class="toast-content">
      <span class="toast-title">${e}</span>
      <span class="toast-message">${t}</span>
    </div>
  `,s.appendChild(o),i>0&&setTimeout(()=>{o.classList.add("removing"),o.addEventListener("animationend",()=>{o.remove(),s.children.length===0&&s.remove()})},i)}function ce(e){const t=z(),a=F();e.innerHTML=`
    <!-- Dynamic Dashboard -->
    <div class="dashboard-grid">
      <!-- Summary Card -->
      <div class="chart-card">
        <div class="chart-header">
          <span class="chart-title"><i class="fa-solid fa-chart-pie"></i> Resumen</span>
        </div>
        <div class="stats-dashboard" style="grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0;">
          <div class="stat-card stat-total" style="padding: 0.8rem;">
            <div class="stat-content">
              <span class="stat-value" style="font-size: 1.5rem;">${t.total}</span>
              <span class="stat-label" style="font-size: 0.8rem;">Total</span>
            </div>
          </div>
          <div class="stat-card stat-remembered" style="padding: 0.8rem;">
            <div class="stat-content">
              <span class="stat-value" style="font-size: 1.5rem;">${t.remembered}</span>
              <span class="stat-label" style="font-size: 0.8rem;">Recordadas</span>
            </div>
          </div>
        </div>
        <div style="margin-top: 1rem;">
          <div class="progress-label">
            <span>Tasa de Retención</span>
            <span>${t.retentionRate}%</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill success" style="width: ${t.retentionRate}%"></div>
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
            <span>${t.remembered}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill primary" style="width: ${t.total>0?t.remembered/t.total*100:0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Por Repasar / Olvidadas</span>
            <span>${t.forgotten}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill warning" style="width: ${t.total>0?t.forgotten/t.total*100:0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Repasos Totales</span>
            <span>${t.totalReviews}</span>
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
            <span>${t.byType.word}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill primary" style="width: ${t.total>0?t.byType.word/t.total*100:0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Phrasal Verbs</span>
            <span>${t.byType.phrasal}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill success" style="width: ${t.total>0?t.byType.phrasal/t.total*100:0}%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">
            <span>Expresiones</span>
            <span>${t.byType.expression}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill warning" style="width: ${t.total>0?t.byType.expression/t.total*100:0}%"></div>
          </div>
        </div>
      </div>
    </div>

    <h2>Tu vocabulario</h2>
    
    <!-- Search and Controls Bar -->
    <div class="controls-bar">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input type="text" id="search-input" placeholder="Buscar palabra, significado, ejemplo..." />
        <button id="clear-search" class="clear-btn" style="display: none;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      
      <div class="action-buttons">
        <button id="export-btn" class="action-btn" title="Exportar datos">
          <i class="fa-solid fa-file-export"></i>
          <span>Exportar</span>
        </button>
        <button id="import-btn" class="action-btn" title="Importar datos">
          <i class="fa-solid fa-file-import"></i>
          <span>Importar</span>
        </button>
      </div>
    </div>
    
    <!-- Filters -->
    <div class="filters">
      <div class="filter-group">
        <i class="fa-solid fa-filter filter-icon"></i>
        <select id="filter-status">
          <option value="all">Todas</option>
          <option value="remembered">Recordadas</option>
          <option value="forgotten">Olvidadas</option>
        </select>
      </div>
      <div class="filter-group">
        <i class="fa-solid fa-tag filter-icon"></i>
        <select id="filter-type">
          <option value="all">Todos los tipos</option>
          <option value="word">Palabras</option>
          <option value="phrasal">Phrasal verbs</option>
          <option value="expression">Expresiones</option>
        </select>
      </div>
      <div class="filter-group">
        <i class="fa-solid fa-folder filter-icon"></i>
        <select id="filter-category">
          <option value="all">Todas las categorías</option>
          ${a.map(d=>`<option value="${d}">${d}</option>`).join("")}
        </select>
      </div>
      <div class="filter-group">
        <i class="fa-solid fa-arrow-down-wide-short filter-icon"></i>
        <select id="sort-by">
          <option value="date-desc">Más recientes</option>
          <option value="date-asc">Más antiguas</option>
          <option value="alpha-asc">A-Z</option>
          <option value="alpha-desc">Z-A</option>
          <option value="review-count">Más repasadas</option>
          <option value="difficulty">Más difíciles</option>
        </select>
      </div>
    </div>
    
    <!-- Results info -->
    <div id="results-info" class="results-info"></div>
    
    <!-- Word list -->
    <div id="word-list" class="word-list"></div>
    
    <!-- Hidden file input for import -->
    <input type="file" id="import-file" accept=".json" style="display: none;" />
  `;const i=document.getElementById("word-list"),s=document.getElementById("filter-status"),o=document.getElementById("filter-type"),n=document.getElementById("filter-category"),u=document.getElementById("sort-by"),l=document.getElementById("search-input"),f=document.getElementById("clear-search"),m=document.getElementById("results-info"),x=document.getElementById("export-btn"),c=document.getElementById("import-btn"),b=document.getElementById("import-file");function y(){i.innerHTML="";let d=l.value.trim()?Z(l.value.trim()):g();d=d.filter(p=>{const v=s.value==="all"||s.value==="remembered"&&p.remembered||s.value==="forgotten"&&!p.remembered,k=o.value==="all"||p.type===o.value,I=n.value==="all"||p.category===n.value;return v&&k&&I}),d=X(d,u.value);const h=g().length;l.value.trim()?(m.innerHTML=`<span class="results-count">${d.length} resultados</span> para "<strong>${l.value}</strong>"`,m.style.display="block"):d.length!==h?(m.innerHTML=`<span class="results-count">${d.length} de ${h}</span> palabras`,m.style.display="block"):m.style.display="none",d.length===0?i.innerHTML=`
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-book-open"></i></div>
          <h3>No hay vocabulario</h3>
          <p>${l.value.trim()?"No se encontraron resultados para tu búsqueda.":"Empieza a añadir palabras para construir tu vocabulario personal."}</p>
          ${l.value.trim()?"":`<button class="add-word-btn" onclick="document.querySelector('[data-view=add]').click()"><i class="fa-solid fa-plus"></i> Añadir primera palabra</button>`}
        </div>
      `:d.forEach(p=>{i.appendChild(ne(p,y))})}s.addEventListener("change",y),o.addEventListener("change",y),n.addEventListener("change",y),u.addEventListener("change",y);let L;l.addEventListener("input",()=>{f.style.display=l.value?"flex":"none",clearTimeout(L),L=setTimeout(y,300)}),f.addEventListener("click",()=>{l.value="",f.style.display="none",y()}),x.addEventListener("click",()=>{const d=ae(),h=new Blob([d],{type:"application/json"}),p=URL.createObjectURL(h),v=document.createElement("a");v.href=p,v.download=`emowords-backup-${new Date().toISOString().split("T")[0]}.json`,v.click(),URL.revokeObjectURL(p)}),c.addEventListener("click",()=>{b.click()}),b.addEventListener("change",d=>{const h=d.target.files[0];if(!h)return;const p=new FileReader;p.onload=v=>{const k=se(v.target.result);k.success?(E("Importación completada",`${k.imported} palabras importadas correctamente.`,"success"),setTimeout(()=>location.reload(),1500)):E("Error de importación",k.error,"error")},p.readAsText(h)}),y()}function de(e){const t=F();e.innerHTML=`
    <form id="add-word-form" class="form-grid">
      <div class="form-header">
        <h2 class="form-title-add"><i class="fa-solid fa-sparkles"></i> Añadir nueva palabra</h2>
        <p class="form-subtitle">Crea conexiones emocionales para recordar mejor</p>
      </div>
      
      <div class="row two-columns">
        <div class="form-field">
          <label for="word">
            <i class="fa-solid fa-font"></i> Palabra o Phrasal Verb
            <span class="required">*</span>
          </label>
          <input type="text" id="word" placeholder="Ej. Break down, Serendipity" required autocomplete="off" />
        </div>
        <div class="form-field">
          <label for="meaning">
            <i class="fa-solid fa-language"></i> Traducción o Significado
            <span class="required">*</span>
          </label>
          <input type="text" id="meaning" placeholder="Ej. Averiarse, hallazgo afortunado" required autocomplete="off" />
        </div>
      </div>
      
      <div class="row two-columns">
        <div class="form-field">
          <label for="type">
            <i class="fa-solid fa-tag"></i> Tipo
          </label>
          <select id="type">
            <option value="word">Palabra</option>
            <option value="phrasal">Phrasal verb</option>
            <option value="expression">Expresión</option>
          </select>
        </div>
        <div class="form-field">
          <label for="category">
            <i class="fa-solid fa-folder"></i> Categoría
          </label>
          <div class="category-input-wrapper">
            <input type="text" id="category" list="category-list" placeholder="Ej. Trabajo, Viajes, Emociones..." autocomplete="off" />
            <datalist id="category-list">
              ${t.map(f=>`<option value="${f}">`).join("")}
            </datalist>
          </div>
          <small>Agrupa palabras por tema para organizarlas mejor</small>
        </div>
      </div>
      
      <div class="form-field emotion-field">
        <label for="emotion">
          <i class="fa-solid fa-heart"></i> Asociación Emocional o Escena Personal
        </label>
        <textarea id="emotion" rows="4" placeholder="Describe una situación, imagen o recuerdo personal que te ayude a recordar...

Ejemplo: Mi coche se averió en la autopista y tuve que esperar 2 horas bajo la lluvia..."></textarea>
        <div class="field-tip">
          <i class="fa-solid fa-lightbulb"></i>
          <span>Cuanto más personal y vívida sea la conexión, mejor recordarás la palabra</span>
        </div>
      </div>
      
      <div class="form-field">
        <label for="example">
          <i class="fa-solid fa-quote-left"></i> Ejemplo de uso
        </label>
        <input type="text" id="example" placeholder="Ej. My car broke down on the highway." autocomplete="off" />
        <small>Una frase en contexto para entender mejor el uso</small>
      </div>
      
      <div class="form-field">
        <label for="image">
          <i class="fa-solid fa-image"></i> Imagen asociativa
          <span class="optional">(opcional)</span>
        </label>
        <div class="image-input-wrapper">
          <input type="url" id="image" placeholder="https://..." />
          <button type="button" id="preview-image-btn" class="preview-btn" title="Vista previa">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>
        <small>Una imagen relacionada para reforzar la asociación visual</small>
        <div id="image-preview" class="image-preview" style="display: none;">
          <img id="preview-img" src="" alt="Preview" />
          <button type="button" id="remove-preview" class="remove-preview-btn">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      
      <div class="form-actions">
        <button type="button" id="clear-form" class="secondary-btn">
          <i class="fa-solid fa-rotate-left"></i> Limpiar
        </button>
        <button type="submit" class="primary-btn">
          <i class="fa-solid fa-floppy-disk"></i> Guardar palabra
        </button>
      </div>
    </form>
    

    
    <!-- Quick add section -->
    <div class="quick-tips">
      <h3><i class="fa-solid fa-lightbulb"></i> Consejos para recordar mejor</h3>
      <ul>
        <li><strong>Usa emociones fuertes:</strong> Alegría, sorpresa, frustración... las emociones graban recuerdos</li>
        <li><strong>Crea escenas mentales:</strong> Visualiza la palabra en una situación específica</li>
        <li><strong>Conecta con experiencias:</strong> Relaciona con algo que ya conoces</li>
        <li><strong>Sé específico:</strong> "Mi perro Max corriendo en el parque" es mejor que "un perro"</li>
      </ul>
    </div>
  `;const a=document.getElementById("add-word-form"),i=document.getElementById("image"),s=document.getElementById("preview-image-btn"),o=document.getElementById("image-preview"),n=document.getElementById("preview-img"),u=document.getElementById("remove-preview"),l=document.getElementById("clear-form");s.addEventListener("click",()=>{const f=i.value.trim();f&&(n.src=f,o.style.display="block",n.onerror=()=>{o.style.display="none",E("Error de imagen","No se pudo cargar la imagen. Verifica la URL.","warning")})}),u.addEventListener("click",()=>{i.value="",o.style.display="none",n.src=""}),l.addEventListener("click",()=>{a.reset(),o.style.display="none",n.src=""}),a.addEventListener("submit",f=>{f.preventDefault();const m=document.getElementById("word").value.trim(),x=document.getElementById("meaning").value.trim(),c=document.getElementById("type").value,b=document.getElementById("category").value.trim(),y=document.getElementById("emotion").value.trim(),L=document.getElementById("example").value.trim(),d=document.getElementById("image").value.trim();if(!m||!x){E("Faltan datos","Por favor completa al menos la palabra y su significado.","error");return}if(_(m)){E("Palabra duplicada",`La palabra "${m}" ya existe en tu vocabulario.`,"error");return}const h={id:Date.now(),word:m,meaning:x,type:c,category:b||null,emotion:y,example:L,image:d,remembered:!1};K(h),a.reset(),o.style.display="none",n.src="",E("¡Guardado!",`"${m}" se ha añadido correctamente.`,"success"),document.getElementById("word").focus()})}function pe(e){let t=null,a=!1,i=[],s={correct:0,incorrect:0};const o=z();e.innerHTML=`
    <div class="review-header">
      <h2><i class="fa-solid fa-brain"></i> Modo Repaso</h2>
      <div class="review-progress">
        <div class="progress-stat">
          <i class="fa-solid fa-book progress-icon"></i>
          <span id="words-pending">${o.dueForReview}</span>
          <span class="progress-label">pendientes</span>
        </div>
        <div class="progress-stat session-correct">
          <i class="fa-solid fa-circle-check progress-icon"></i>
          <span id="session-correct">0</span>
          <span class="progress-label">correctas</span>
        </div>
        <div class="progress-stat session-incorrect">
          <i class="fa-solid fa-circle-xmark progress-icon"></i>
          <span id="session-incorrect">0</span>
          <span class="progress-label">incorrectas</span>
        </div>
      </div>
    </div>
    
    <div class="review-container">
      <div id="review-card" class="review-card"></div>
      
      <div class="review-actions" id="review-actions">
        <button id="remembered-btn" class="review-btn success-btn" disabled>
          <i class="fa-solid fa-check btn-icon"></i>
          <span class="btn-text">Recordada</span>
          <span class="btn-shortcut">Tecla: <i class="fa-solid fa-arrow-right"></i></span>
        </button>
        <button id="forgotten-btn" class="review-btn danger-btn" disabled>
          <i class="fa-solid fa-xmark btn-icon"></i>
          <span class="btn-text">Olvidada</span>
          <span class="btn-shortcut">Tecla: <i class="fa-solid fa-arrow-left"></i></span>
        </button>
      </div>
      
      <div class="review-options">
        <button id="skip-btn" class="skip-btn">
          <i class="fa-solid fa-forward"></i> Saltar (Espacio)
        </button>
        <button id="shuffle-btn" class="shuffle-btn">
          <i class="fa-solid fa-shuffle"></i> Mezclar
        </button>
      </div>
    </div>
    
    <!-- Keyboard shortcut hint -->
    <div class="keyboard-hints">
      <span class="hint"><i class="fa-regular fa-keyboard"></i> Atajos:</span>
      <span class="key">Espacio</span> = Revelar/Siguiente
      <span class="key"><i class="fa-solid fa-arrow-right"></i></span> = Recordada
      <span class="key"><i class="fa-solid fa-arrow-left"></i></span> = Olvidada
    </div>
  `;const n=document.getElementById("review-card"),u=document.getElementById("remembered-btn"),l=document.getElementById("forgotten-btn"),f=document.getElementById("skip-btn"),m=document.getElementById("shuffle-btn"),x=document.getElementById("session-correct"),c=document.getElementById("session-incorrect"),b=document.getElementById("words-pending");function y(){i=ee(),L(i),h()}function L(r){for(let $=r.length-1;$>0;$--){const S=Math.floor(Math.random()*($+1));[r[$],r[S]]=[r[S],r[$]]}return r}function d(){x.textContent=s.correct,c.textContent=s.incorrect}function h(){b.textContent=i.length}function p(){return i.length===0&&y(),i.shift()||null}function v(r){if(!r){n.innerHTML=`
        <div class="empty-review-state">
          <div class="empty-icon"><i class="fa-solid fa-party-horn"></i></div>
          <h3>¡Excelente trabajo!</h3>
          <p>No hay palabras pendientes de repaso.</p>
          <div class="session-summary">
            <p>Esta sesión:</p>
            <div class="summary-stats">
              <span class="stat correct"><i class="fa-solid fa-circle-check"></i> ${s.correct} correctas</span>
              <span class="stat incorrect"><i class="fa-solid fa-circle-xmark"></i> ${s.incorrect} incorrectas</span>
            </div>
          </div>
          <button class="restart-btn" id="restart-review"><i class="fa-solid fa-rotate"></i> Repasar todo de nuevo</button>
        </div>
      `,u.disabled=!0,l.disabled=!0,document.getElementById("restart-review")?.addEventListener("click",()=>{i=g(),L(i),s={correct:0,incorrect:0},d(),v(p())});return}t=r,a=!1,u.disabled=!0,l.disabled=!0;const $=r.reviewCount||0,S=k(r.difficulty||0);n.innerHTML=`
      <div class="review-card-inner">
        <div class="review-meta">
          <span class="tag type-tag">${ue(r.type)}</span>
          ${r.category?`<span class="tag category-tag"><i class="fa-solid fa-folder"></i> ${r.category}</span>`:""}
          <span class="tag review-count-tag"><i class="fa-solid fa-chart-simple"></i> ${$} repasos</span>
          ${r.difficulty!==0?`<span class="tag difficulty-tag ${S.class}">${S.label}</span>`:""}
        </div>
        
        ${r.image?`
          <div class="review-image-wrapper">
            <img src="${r.image}" alt="${r.word}" class="review-image" />
          </div>
        `:""}
        
        <h3 class="review-word">${r.word}</h3>
        
        <button id="show-answer" class="reveal-btn">
          <i class="fa-solid fa-eye"></i>
          <span>Mostrar respuesta</span>
        </button>
        
        <div id="review-answer" class="review-answer" style="display: none;">
          <div class="answer-content">
            <p class="meaning">${r.meaning}</p>
            
            ${r.emotion?`
              <div class="answer-section">
                <p class="section-label"><i class="fa-solid fa-heart"></i> Asociación emocional</p>
                <p class="section-content">${r.emotion}</p>
              </div>
            `:""}
            
            ${r.example?`
              <div class="answer-section">
                <p class="section-label"><i class="fa-solid fa-quote-left"></i> Ejemplo</p>
                <p class="section-content example">"${r.example}"</p>
              </div>
            `:""}
          </div>
        </div>
      </div>
    `;const D=document.getElementById("show-answer"),O=document.getElementById("review-answer");D.addEventListener("click",G);function G(){a||(a=!0,O.style.display="block",D.style.display="none",u.disabled=!1,l.disabled=!1,O.classList.add("fade-in"))}}function k(r){return r<=-2?{label:'<i class="fa-solid fa-star"></i> Fácil',class:"easy"}:r>=2?{label:'<i class="fa-solid fa-fire"></i> Difícil',class:"hard"}:{label:"",class:""}}function I(r){t&&(te(t.id,r),r?(s.correct++,n.classList.add("correct-flash")):(s.incorrect++,n.classList.add("incorrect-flash"),i.push({...t,remembered:!1})),d(),h(),setTimeout(()=>{n.classList.remove("correct-flash","incorrect-flash"),v(p())},300))}u.addEventListener("click",()=>I(!0)),l.addEventListener("click",()=>I(!1)),f.addEventListener("click",()=>{t&&i.push(t),v(p())}),m.addEventListener("click",()=>{t&&i.unshift(t),L(i),v(p())}),document.addEventListener("keydown",P);function P(r){if(document.getElementById("review-card"))switch(r.code){case"Space":r.preventDefault(),a?v(p()):document.getElementById("show-answer")?.click();break;case"ArrowRight":a&&!u.disabled&&I(!0);break;case"ArrowLeft":a&&!l.disabled&&I(!1);break}}y(),v(p());const V=()=>{document.removeEventListener("keydown",P)};window._reviewCleanup=V}function ue(e){switch(e){case"word":return'<i class="fa-solid fa-font"></i> Palabra';case"phrasal":return'<i class="fa-solid fa-link"></i> Phrasal Verb';case"expression":return'<i class="fa-solid fa-comment"></i> Expresión';default:return'<i class="fa-solid fa-file"></i> Otro'}}const w=document.getElementById("app");window.addEventListener("offline",()=>{E("Sin conexión","Estás trabajando en modo offline.","warning",5e3),document.body.classList.add("offline-mode")});window.addEventListener("online",()=>{E("Conexión restaurada","Tus cambios se guardarán correctamente.","success",3e3),document.body.classList.remove("offline-mode")});window.addEventListener("error",e=>{console.error("Global error:",e.error),E("Error inesperado","Ha ocurrido un error. Intenta recargar la página.","error",0)});window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason)});const J=document.querySelectorAll(".nav-link"),R=document.getElementById("theme-toggle");function me(){const t=q().theme||"dark";j(t)}function j(e){document.documentElement.setAttribute("data-theme",e);const t=R.querySelector("i");e==="dark"?(t.className="fa-solid fa-sun",R.title="Cambiar a modo claro"):(t.className="fa-solid fa-moon",R.title="Cambiar a modo oscuro");const a=q();a.theme=e,ie(a)}function fe(){const t=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.body.classList.add("theme-transitioning"),j(t),setTimeout(()=>{document.body.classList.remove("theme-transitioning")},300)}R.addEventListener("click",fe);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{q().theme||j(e.matches?"dark":"light")});function ve(e){J.forEach(t=>{t.dataset.view===e?t.classList.add("active"):t.classList.remove("active")})}function U(e){window._reviewCleanup&&(window._reviewCleanup(),window._reviewCleanup=null),ve(e),w.style.opacity="0",w.style.transform="translateY(10px)",setTimeout(()=>{switch(e){case"home":ce(w);break;case"add":de(w);break;case"review":pe(w);break;default:w.innerHTML="<p>Vista no encontrada</p>"}requestAnimationFrame(()=>{w.style.opacity="1",w.style.transform="translateY(0)"})},150)}w.style.transition="opacity 0.15s ease, transform 0.15s ease";J.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.view;U(a)})});me();U("home");let B;const T=document.getElementById("install-item"),W=document.getElementById("install-pwa");window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),B=e,T&&(T.style.display="block")});W&&W.addEventListener("click",async()=>{if(!B)return;B.prompt();const{outcome:e}=await B.userChoice;console.log(`User response to the install prompt: ${e}`),B=null,T&&(T.style.display="none")});window.addEventListener("appinstalled",()=>{T&&(T.style.display="none"),B=null,console.log("PWA was installed")});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").then(t=>{console.log("SW registered: ",t)}).catch(t=>{console.log("SW registration failed: ",t)})});
