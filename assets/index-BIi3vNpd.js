(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const n of c.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(i){if(i.ep)return;i.ep=!0;const c=t(i);fetch(i.href,c)}})();const A="emowords_vocab",N="emowords_settings";function y(){const e=localStorage.getItem(A);return e?JSON.parse(e):[]}function _(e){const a=y(),t={...e,createdAt:Date.now(),lastReviewedAt:null,reviewCount:0,correctCount:0,incorrectCount:0,nextReviewAt:Date.now(),difficulty:0};a.push(t),localStorage.setItem(A,JSON.stringify(a))}function R(e){const a=y().map(t=>t.id===e.id?e:t);localStorage.setItem(A,JSON.stringify(a))}function z(e){const a=y().filter(t=>t.id!==e);localStorage.setItem(A,JSON.stringify(a))}function K(e){return y().find(a=>a.id===e)}function G(e){const a=y(),t=e.toLowerCase().trim();return t?a.filter(s=>s.word.toLowerCase().includes(t)||s.meaning.toLowerCase().includes(t)||s.example&&s.example.toLowerCase().includes(t)||s.emotion&&s.emotion.toLowerCase().includes(t)||s.category&&s.category.toLowerCase().includes(t)):a}function W(){const e=y(),a=new Set;return e.forEach(t=>{t.category&&a.add(t.category)}),Array.from(a).sort()}function Q(e,a="date-desc"){const t=[...e];switch(a){case"date-asc":return t.sort((s,i)=>(s.createdAt||s.id)-(i.createdAt||i.id));case"date-desc":return t.sort((s,i)=>(i.createdAt||i.id)-(s.createdAt||s.id));case"alpha-asc":return t.sort((s,i)=>s.word.localeCompare(i.word));case"alpha-desc":return t.sort((s,i)=>i.word.localeCompare(s.word));case"review-count":return t.sort((s,i)=>(i.reviewCount||0)-(s.reviewCount||0));case"difficulty":return t.sort((s,i)=>(i.difficulty||0)-(s.difficulty||0));default:return t}}function H(){const e=y(),a=e.length,t=e.filter(r=>r.remembered).length,s=a-t,i=e.reduce((r,g)=>r+(g.reviewCount||0),0),c=a>0?(i/a).toFixed(1):0,n={word:e.filter(r=>r.type==="word").length,phrasal:e.filter(r=>r.type==="phrasal").length,expression:e.filter(r=>r.type==="expression").length},d=e.reduce((r,g)=>r+(g.correctCount||0),0),l=e.reduce((r,g)=>r+(g.incorrectCount||0),0),w=d+l>0?(d/(d+l)*100).toFixed(1):0,v=Date.now(),p=e.filter(r=>!r.nextReviewAt||r.nextReviewAt<=v).length;return{total:a,remembered:t,forgotten:s,totalReviews:i,averageReviews:c,byType:n,retentionRate:w,dueForReview:p}}function Y(){const e=y(),a=Date.now(),t=e.filter(l=>!l.remembered),s=e.filter(l=>l.remembered&&(!l.nextReviewAt||l.nextReviewAt<=a)),i=e.filter(l=>!l.lastReviewedAt),c=[...t,...i,...s],n=new Set,d=c.filter(l=>n.has(l.id)?!1:(n.add(l.id),!0));return d.length>0?d:e}function Z(e,a){const t=K(e);if(t){if(t.remembered=a,t.lastReviewedAt=Date.now(),t.reviewCount=(t.reviewCount||0)+1,a){t.correctCount=(t.correctCount||0)+1,t.difficulty=Math.max(-3,(t.difficulty||0)-1);const s=1440*60*1e3,i=Math.pow(2,Math.min(t.correctCount,5));t.nextReviewAt=Date.now()+s*i}else t.incorrectCount=(t.incorrectCount||0)+1,t.difficulty=Math.min(3,(t.difficulty||0)+1),t.nextReviewAt=Date.now();return R(t),t}}function X(){const e=y(),a={version:"1.0",exportedAt:new Date().toISOString(),wordCount:e.length,words:e};return JSON.stringify(a,null,2)}function ee(e){try{const a=JSON.parse(e);if(!a.words||!Array.isArray(a.words))throw new Error("Invalid data format: missing words array");const t=y(),s=new Set(t.map(n=>n.id));let i=0,c=0;return a.words.forEach(n=>{if(!n.word||!n.meaning){c++;return}(!n.id||s.has(n.id))&&(n.id=Date.now()+Math.random()),n.type=n.type||"word",n.remembered=n.remembered||!1,n.createdAt=n.createdAt||Date.now(),t.push(n),s.add(n.id),i++}),localStorage.setItem(A,JSON.stringify(t)),{success:!0,imported:i,skipped:c}}catch(a){return{success:!1,error:a.message}}}function M(){const e=localStorage.getItem(N);return e?JSON.parse(e):{theme:"light",language:"es",showExampleInReview:!0,autoPlayAudio:!1}}function te(e){localStorage.setItem(N,JSON.stringify(e))}function ae(e,a){const t=document.createElement("div");t.className="word-card",t.dataset.wordId=e.id;const s=e.reviewCount||0,i=e.createdAt?new Date(e.createdAt).toLocaleDateString():"";return t.innerHTML=`
    ${e.image?`<img src="${e.image}" alt="${e.word}" class="word-image" />`:""}

    <div class="tags">
      <span class="tag type-tag">${ie(e.type)}</span>
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
        ${s>0?`<span class="meta-item"><i class="fa-solid fa-chart-simple"></i> ${s} repasos</span>`:""}
        ${i?`<span class="meta-item"><i class="fa-regular fa-calendar"></i> ${i}</span>`:""}
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
  `,t.querySelector(".toggle").addEventListener("click",()=>{e.remembered=!e.remembered,R(e),a()}),t.querySelector(".delete").addEventListener("click",()=>{confirm(`¿Eliminar "${e.word}"?`)&&(z(e.id),a())}),t.querySelector(".edit-btn").addEventListener("click",()=>{se(e,a)}),t}function se(e,a){document.querySelector(".edit-modal")?.remove();const t=document.createElement("div");t.className="edit-modal",t.innerHTML=`
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
            <input type="text" id="edit-word" value="${$(e.word)}" required />
          </div>
          <div class="form-field">
            <label><i class="fa-solid fa-language"></i> Significado</label>
            <input type="text" id="edit-meaning" value="${$(e.meaning)}" required />
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
            <input type="text" id="edit-category" value="${$(e.category||"")}" />
          </div>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-heart"></i> Asociación emocional</label>
          <textarea id="edit-emotion" rows="3">${$(e.emotion||"")}</textarea>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-quote-left"></i> Ejemplo</label>
          <input type="text" id="edit-example" value="${$(e.example||"")}" />
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-image"></i> URL de imagen</label>
          <input type="url" id="edit-image" value="${$(e.image||"")}" />
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-cancel">Cancelar</button>
          <button type="submit" class="btn-save"><i class="fa-solid fa-check"></i> Guardar cambios</button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(t),requestAnimationFrame(()=>{t.classList.add("active")});const s=()=>{t.classList.remove("active"),setTimeout(()=>t.remove(),300)};t.querySelector(".modal-overlay").addEventListener("click",s),t.querySelector(".modal-close").addEventListener("click",s),t.querySelector(".btn-cancel").addEventListener("click",s),t.querySelector(".edit-form").addEventListener("submit",i=>{i.preventDefault(),e.word=document.getElementById("edit-word").value.trim(),e.meaning=document.getElementById("edit-meaning").value.trim(),e.type=document.getElementById("edit-type").value,e.category=document.getElementById("edit-category").value.trim()||null,e.emotion=document.getElementById("edit-emotion").value.trim(),e.example=document.getElementById("edit-example").value.trim(),e.image=document.getElementById("edit-image").value.trim(),R(e),s(),a()}),document.addEventListener("keydown",function i(c){c.key==="Escape"&&(s(),document.removeEventListener("keydown",i))})}function $(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function ie(e){switch(e){case"word":return'<i class="fa-solid fa-font"></i> Palabra';case"phrasal":return'<i class="fa-solid fa-link"></i> Phrasal Verb';case"expression":return'<i class="fa-solid fa-comment"></i> Expresión';default:return'<i class="fa-solid fa-file"></i> Otro'}}function ne(e){const a=H(),t=W();e.innerHTML=`
    <!-- Statistics Dashboard -->
    <div class="stats-dashboard">
      <div class="stat-card stat-total">
        <div class="stat-icon"><i class="fa-solid fa-book"></i></div>
        <div class="stat-content">
          <span class="stat-value">${a.total}</span>
          <span class="stat-label">Total palabras</span>
        </div>
      </div>
      <div class="stat-card stat-remembered">
        <div class="stat-icon"><i class="fa-solid fa-circle-check"></i></div>
        <div class="stat-content">
          <span class="stat-value">${a.remembered}</span>
          <span class="stat-label">Recordadas</span>
        </div>
      </div>
      <div class="stat-card stat-forgotten">
        <div class="stat-icon"><i class="fa-solid fa-rotate"></i></div>
        <div class="stat-content">
          <span class="stat-value">${a.forgotten}</span>
          <span class="stat-label">Por repasar</span>
        </div>
      </div>
      <div class="stat-card stat-retention">
        <div class="stat-icon"><i class="fa-solid fa-chart-line"></i></div>
        <div class="stat-content">
          <span class="stat-value">${a.retentionRate}%</span>
          <span class="stat-label">Retención</span>
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
          ${t.map(u=>`<option value="${u}">${u}</option>`).join("")}
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
  `;const s=document.getElementById("word-list"),i=document.getElementById("filter-status"),c=document.getElementById("filter-type"),n=document.getElementById("filter-category"),d=document.getElementById("sort-by"),l=document.getElementById("search-input"),w=document.getElementById("clear-search"),v=document.getElementById("results-info"),p=document.getElementById("export-btn"),r=document.getElementById("import-btn"),g=document.getElementById("import-file");function b(){s.innerHTML="";let u=l.value.trim()?G(l.value.trim()):y();u=u.filter(f=>{const m=i.value==="all"||i.value==="remembered"&&f.remembered||i.value==="forgotten"&&!f.remembered,x=c.value==="all"||f.type===c.value,I=n.value==="all"||f.category===n.value;return m&&x&&I}),u=Q(u,d.value);const h=y().length;l.value.trim()?(v.innerHTML=`<span class="results-count">${u.length} resultados</span> para "<strong>${l.value}</strong>"`,v.style.display="block"):u.length!==h?(v.innerHTML=`<span class="results-count">${u.length} de ${h}</span> palabras`,v.style.display="block"):v.style.display="none",u.length===0?s.innerHTML=`
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-book-open"></i></div>
          <h3>No hay vocabulario</h3>
          <p>${l.value.trim()?"No se encontraron resultados para tu búsqueda.":"Empieza a añadir palabras para construir tu vocabulario personal."}</p>
          ${l.value.trim()?"":`<button class="add-word-btn" onclick="document.querySelector('[data-view=add]').click()"><i class="fa-solid fa-plus"></i> Añadir primera palabra</button>`}
        </div>
      `:u.forEach(f=>{s.appendChild(ae(f,b))})}i.addEventListener("change",b),c.addEventListener("change",b),n.addEventListener("change",b),d.addEventListener("change",b);let k;l.addEventListener("input",()=>{w.style.display=l.value?"flex":"none",clearTimeout(k),k=setTimeout(b,300)}),w.addEventListener("click",()=>{l.value="",w.style.display="none",b()}),p.addEventListener("click",()=>{const u=X(),h=new Blob([u],{type:"application/json"}),f=URL.createObjectURL(h),m=document.createElement("a");m.href=f,m.download=`emowords-backup-${new Date().toISOString().split("T")[0]}.json`,m.click(),URL.revokeObjectURL(f)}),r.addEventListener("click",()=>{g.click()}),g.addEventListener("change",u=>{const h=u.target.files[0];if(!h)return;const f=new FileReader;f.onload=m=>{const x=ee(m.target.result);x.success?(alert(`Importación exitosa: ${x.imported} palabras importadas, ${x.skipped} omitidas.`),location.reload()):alert(`Error al importar: ${x.error}`)},f.readAsText(h)}),b()}function oe(e){const a=W();e.innerHTML=`
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
              ${a.map(p=>`<option value="${p}">`).join("")}
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
    
    <div id="feedback" class="feedback-message"></div>
    
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
  `;const t=document.getElementById("add-word-form"),s=document.getElementById("feedback"),i=document.getElementById("image"),c=document.getElementById("preview-image-btn"),n=document.getElementById("image-preview"),d=document.getElementById("preview-img"),l=document.getElementById("remove-preview"),w=document.getElementById("clear-form");c.addEventListener("click",()=>{const p=i.value.trim();p&&(d.src=p,n.style.display="block",d.onerror=()=>{n.style.display="none",v("No se pudo cargar la imagen. Verifica la URL.","warning")})}),l.addEventListener("click",()=>{i.value="",n.style.display="none",d.src=""}),w.addEventListener("click",()=>{t.reset(),n.style.display="none",d.src="",s.className="feedback-message",s.textContent=""});function v(p,r="success"){s.innerHTML=`<i class="fa-solid ${r==="success"?"fa-circle-check":r==="error"?"fa-circle-xmark":"fa-triangle-exclamation"}"></i> ${p}`,s.className=`feedback-message ${r}`,s.style.display="flex",r==="success"&&setTimeout(()=>{s.style.display="none"},4e3)}t.addEventListener("submit",p=>{p.preventDefault();const r=document.getElementById("word").value.trim(),g=document.getElementById("meaning").value.trim(),b=document.getElementById("type").value,k=document.getElementById("category").value.trim(),u=document.getElementById("emotion").value.trim(),h=document.getElementById("example").value.trim(),f=document.getElementById("image").value.trim();if(!r||!g){v("Por favor completa al menos la palabra y su significado.","error");return}const m={id:Date.now(),word:r,meaning:g,type:b,category:k||null,emotion:u,example:h,image:f,remembered:!1};_(m),t.reset(),n.style.display="none",d.src="",v(`"${r}" guardada correctamente. ¡Sigue añadiendo palabras!`,"success"),document.getElementById("word").focus()})}function le(e){let a=null,t=!1,s=[],i={correct:0,incorrect:0};const c=H();e.innerHTML=`
    <div class="review-header">
      <h2><i class="fa-solid fa-brain"></i> Modo Repaso</h2>
      <div class="review-progress">
        <div class="progress-stat">
          <i class="fa-solid fa-book progress-icon"></i>
          <span id="words-pending">${c.dueForReview}</span>
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
  `;const n=document.getElementById("review-card"),d=document.getElementById("remembered-btn"),l=document.getElementById("forgotten-btn"),w=document.getElementById("skip-btn"),v=document.getElementById("shuffle-btn"),p=document.getElementById("session-correct"),r=document.getElementById("session-incorrect"),g=document.getElementById("words-pending");function b(){s=Y(),k(s),h()}function k(o){for(let L=o.length-1;L>0;L--){const C=Math.floor(Math.random()*(L+1));[o[L],o[C]]=[o[C],o[L]]}return o}function u(){p.textContent=i.correct,r.textContent=i.incorrect}function h(){g.textContent=s.length}function f(){return s.length===0&&b(),s.shift()||null}function m(o){if(!o){n.innerHTML=`
        <div class="empty-review-state">
          <div class="empty-icon"><i class="fa-solid fa-party-horn"></i></div>
          <h3>¡Excelente trabajo!</h3>
          <p>No hay palabras pendientes de repaso.</p>
          <div class="session-summary">
            <p>Esta sesión:</p>
            <div class="summary-stats">
              <span class="stat correct"><i class="fa-solid fa-circle-check"></i> ${i.correct} correctas</span>
              <span class="stat incorrect"><i class="fa-solid fa-circle-xmark"></i> ${i.incorrect} incorrectas</span>
            </div>
          </div>
          <button class="restart-btn" id="restart-review"><i class="fa-solid fa-rotate"></i> Repasar todo de nuevo</button>
        </div>
      `,d.disabled=!0,l.disabled=!0,document.getElementById("restart-review")?.addEventListener("click",()=>{s=y(),k(s),i={correct:0,incorrect:0},u(),m(f())});return}a=o,t=!1,d.disabled=!0,l.disabled=!0;const L=o.reviewCount||0,C=x(o.difficulty||0);n.innerHTML=`
      <div class="review-card-inner">
        <div class="review-meta">
          <span class="tag type-tag">${re(o.type)}</span>
          ${o.category?`<span class="tag category-tag"><i class="fa-solid fa-folder"></i> ${o.category}</span>`:""}
          <span class="tag review-count-tag"><i class="fa-solid fa-chart-simple"></i> ${L} repasos</span>
          ${o.difficulty!==0?`<span class="tag difficulty-tag ${C.class}">${C.label}</span>`:""}
        </div>
        
        ${o.image?`
          <div class="review-image-wrapper">
            <img src="${o.image}" alt="${o.word}" class="review-image" />
          </div>
        `:""}
        
        <h3 class="review-word">${o.word}</h3>
        
        <button id="show-answer" class="reveal-btn">
          <i class="fa-solid fa-eye"></i>
          <span>Mostrar respuesta</span>
        </button>
        
        <div id="review-answer" class="review-answer" style="display: none;">
          <div class="answer-content">
            <p class="meaning">${o.meaning}</p>
            
            ${o.emotion?`
              <div class="answer-section">
                <p class="section-label"><i class="fa-solid fa-heart"></i> Asociación emocional</p>
                <p class="section-content">${o.emotion}</p>
              </div>
            `:""}
            
            ${o.example?`
              <div class="answer-section">
                <p class="section-label"><i class="fa-solid fa-quote-left"></i> Ejemplo</p>
                <p class="section-content example">"${o.example}"</p>
              </div>
            `:""}
          </div>
        </div>
      </div>
    `;const P=document.getElementById("show-answer"),D=document.getElementById("review-answer");P.addEventListener("click",V);function V(){t||(t=!0,D.style.display="block",P.style.display="none",d.disabled=!1,l.disabled=!1,D.classList.add("fade-in"))}}function x(o){return o<=-2?{label:'<i class="fa-solid fa-star"></i> Fácil',class:"easy"}:o>=2?{label:'<i class="fa-solid fa-fire"></i> Difícil',class:"hard"}:{label:"",class:""}}function I(o){a&&(Z(a.id,o),o?(i.correct++,n.classList.add("correct-flash")):(i.incorrect++,n.classList.add("incorrect-flash"),s.push({...a,remembered:!1})),u(),h(),setTimeout(()=>{n.classList.remove("correct-flash","incorrect-flash"),m(f())},300))}d.addEventListener("click",()=>I(!0)),l.addEventListener("click",()=>I(!1)),w.addEventListener("click",()=>{a&&s.push(a),m(f())}),v.addEventListener("click",()=>{a&&s.unshift(a),k(s),m(f())}),document.addEventListener("keydown",j);function j(o){if(document.getElementById("review-card"))switch(o.code){case"Space":o.preventDefault(),t?m(f()):document.getElementById("show-answer")?.click();break;case"ArrowRight":t&&!d.disabled&&I(!0);break;case"ArrowLeft":t&&!l.disabled&&I(!1);break}}b(),m(f());const U=()=>{document.removeEventListener("keydown",j)};window._reviewCleanup=U}function re(e){switch(e){case"word":return'<i class="fa-solid fa-font"></i> Palabra';case"phrasal":return'<i class="fa-solid fa-link"></i> Phrasal Verb';case"expression":return'<i class="fa-solid fa-comment"></i> Expresión';default:return'<i class="fa-solid fa-file"></i> Otro'}}const E=document.getElementById("app"),F=document.querySelectorAll(".nav-link"),T=document.getElementById("theme-toggle");function ce(){const a=M().theme||"dark";q(a)}function q(e){document.documentElement.setAttribute("data-theme",e);const a=T.querySelector("i");e==="dark"?(a.className="fa-solid fa-sun",T.title="Cambiar a modo claro"):(a.className="fa-solid fa-moon",T.title="Cambiar a modo oscuro");const t=M();t.theme=e,te(t)}function de(){const a=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.body.classList.add("theme-transitioning"),q(a),setTimeout(()=>{document.body.classList.remove("theme-transitioning")},300)}T.addEventListener("click",de);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{M().theme||q(e.matches?"dark":"light")});function ue(e){F.forEach(a=>{a.dataset.view===e?a.classList.add("active"):a.classList.remove("active")})}function J(e){window._reviewCleanup&&(window._reviewCleanup(),window._reviewCleanup=null),ue(e),E.style.opacity="0",E.style.transform="translateY(10px)",setTimeout(()=>{switch(e){case"home":ne(E);break;case"add":oe(E);break;case"review":le(E);break;default:E.innerHTML="<p>Vista no encontrada</p>"}requestAnimationFrame(()=>{E.style.opacity="1",E.style.transform="translateY(0)"})},150)}E.style.transition="opacity 0.15s ease, transform 0.15s ease";F.forEach(e=>{e.addEventListener("click",a=>{a.preventDefault();const t=e.dataset.view;J(t)})});ce();J("home");let B;const S=document.getElementById("install-item"),O=document.getElementById("install-pwa");window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),B=e,S&&(S.style.display="block")});O&&O.addEventListener("click",async()=>{if(!B)return;B.prompt();const{outcome:e}=await B.userChoice;console.log(`User response to the install prompt: ${e}`),B=null,S&&(S.style.display="none")});window.addEventListener("appinstalled",()=>{S&&(S.style.display="none"),B=null,console.log("PWA was installed")});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").then(a=>{console.log("SW registered: ",a)}).catch(a=>{console.log("SW registration failed: ",a)})});
