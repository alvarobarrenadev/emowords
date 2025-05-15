(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const v="emowords_vocab";function m(){const e=localStorage.getItem(v);return e?JSON.parse(e):[]}function h(e){const t=m();t.push(e),localStorage.setItem(v,JSON.stringify(t))}function f(e){const t=m().map(a=>a.id===e.id?e:a);localStorage.setItem(v,JSON.stringify(t))}function E(e){const t=m().filter(a=>a.id!==e);localStorage.setItem(v,JSON.stringify(t))}function L(e,t){const a=document.createElement("div");return a.className="word-card",a.innerHTML=`
    ${e.image?`<img src="${e.image}" alt="${e.word}" class="word-image" />`:""}

    <div class="tags">
      <span class="tag">${x(e.type)}</span>
      <span class="tag ${e.remembered?"remembered":"forgotten"}">
        ${e.remembered?"Recordada":"Olvidada"}
      </span>
    </div>

    <div class="word-info">
      <h3>${e.word}</h3>
      <p>${e.meaning}</p>

      ${e.emotion?`
        <p class="section-label">ASOCIACIÓN EMOCIONAL</p>
        <p>${e.emotion}</p>`:""}

      ${e.example?`
        <p class="section-label">EJEMPLO</p>
        <p class="example">${e.example}</p>`:""}
    </div>

    <div class="actions">
      <button class="toggle">${e.remembered?"Marcar como olvidada":"Marcar como recordada"}</button>
      <button class="delete">Eliminar</button>
    </div>
  `,a.querySelector(".toggle").addEventListener("click",()=>{e.remembered=!e.remembered,f(e),t()}),a.querySelector(".delete").addEventListener("click",()=>{confirm(`¿Eliminar "${e.word}"?`)&&(E(e.id),t())}),a}function x(e){switch(e){case"word":return"Palabra";case"phrasal":return"Phrasal Verb";case"expression":return"Expresión";default:return"Otro"}}function I(e){m(),e.innerHTML=`
    <h2>Tu vocabulario</h2>
    <div class="filters">
      <select id="filter-status">
        <option value="all">Todas</option>
        <option value="remembered">Recordadas</option>
        <option value="forgotten">Olvidadas</option>
      </select>
      <select id="filter-type">
        <option value="all">Todos los tipos</option>
        <option value="word">Palabras</option>
        <option value="phrasal">Phrasal verbs</option>
        <option value="expression">Expresiones</option>
      </select>
    </div>
    <div id="word-list" class="word-list"></div>
  `;const t=document.getElementById("word-list"),a=document.getElementById("filter-status"),l=document.getElementById("filter-type");function n(){t.innerHTML="";const o=m().filter(i=>{const s=a.value==="all"||a.value==="remembered"&&i.remembered||a.value==="forgotten"&&!i.remembered,d=l.value==="all"||i.type===l.value;return s&&d});o.length===0?t.innerHTML="<p>No tienes vocabulario guardado. Empieza a añadir palabras.</p>":o.forEach(i=>{t.appendChild(L(i,n))})}a.addEventListener("change",n),l.addEventListener("change",n),n()}function w(e){e.innerHTML=`
    <form id="add-word-form" class="form-grid">
    <h2 class="form-title-add">Añadir nueva palabra</h2>
      <div class="row two-columns">
        <div>
          <label>Palabra o Phrasal Verb:</label>
          <input type="text" id="word" placeholder="Ej. Break down, Serendipity" required />
        </div>
        <div>
          <label>Traducción o Significado:</label>
          <input type="text" id="meaning" placeholder="Ej. Averiarse, hallazgo afortunado" required />
        </div>
      </div>
      <div>
        <label>Tipo:</label>
        <select id="type">
          <option value="word">Palabra</option>
          <option value="phrasal">Phrasal verb</option>
          <option value="expression">Expresión</option>
        </select>
      </div>
      <div>
        <label>Asociación Emocional o Escena Personal</label>
        <textarea id="emotion" rows="3" placeholder="Describe una situación, imagen o recuerdo personal que te ayude a recordar..."></textarea>
        <small>Crea una conexión emocional fuerte. Cuanto más personal o vívida, mejor recordarás la palabra.</small>
      </div>
      <div>
        <label>Ejemplo de uso:</label>
        <input type="text" id="example" placeholder="Ej. My car broke down on the highway." />
      </div>
      <div>
        <label>Imagen asociativa (opcional)</label>
        <input type="url" id="image" placeholder="https://..." />
        <small>Una imagen relacionada para reforzar la asociación visual.</small>
      </div>
      <div class="right-align">
        <button type="submit">Guardar palabra</button>
      </div>
    </form>
    <p id="feedback" style="color: green; margin-top: 10px;"></p>
  `;const t=document.getElementById("add-word-form"),a=document.getElementById("feedback");t.addEventListener("submit",l=>{l.preventDefault();const n=document.getElementById("word").value.trim(),o=document.getElementById("meaning").value.trim(),i=document.getElementById("type").value,s=document.getElementById("emotion").value.trim(),d=document.getElementById("example").value.trim(),r=document.getElementById("image").value.trim(),c={id:Date.now(),word:n,meaning:o,type:i,emotion:s,example:d,image:r,remembered:!1};h(c),t.reset(),a.textContent="✅ Palabra guardada correctamente."})}function O(e){let t=null;e.innerHTML=`
    <h2>Modo Repaso</h2>
    <div id="review-card" class="review-card"></div>
    <div class="review-actions">
      <button id="remembered-btn">✅ Recordada</button>
      <button id="forgotten-btn">❌ Olvidada</button>
      <button id="next-btn">➡️ Siguiente</button>
    </div>
  `;const a=document.getElementById("review-card"),l=document.getElementById("remembered-btn"),n=document.getElementById("forgotten-btn"),o=document.getElementById("next-btn");function i(){const r=m();if(r.length===0)return null;const c=r.filter(y=>!y.remembered),u=c.length>0?c:r;return u[Math.floor(Math.random()*u.length)]}function s(r){if(!r){a.innerHTML="<p>No hay palabras para repasar.</p>";return}t=r,a.innerHTML=`
      <div class="review-type"><span class="tag">${$(r.type)}</span></div>
      <h3 class="review-word">${r.word}</h3>
      ${r.example?`<p class="example">${r.example}</p>`:""}
      <button id="show-answer" class="reveal-btn">Mostrar respuesta</button>
      <div id="review-answer" class="review-answer" style="display: none;">
        <p class="meaning">${r.meaning}</p>
        ${r.emotion?`<p class="section-label">ASOCIACIÓN EMOCIONAL</p><p>${r.emotion}</p>`:""}
        ${r.example?`<p class="section-label">EJEMPLO</p><p class="example">${r.example}</p>`:""}
      </div>
    `;const c=document.getElementById("show-answer"),u=document.getElementById("review-answer");c.addEventListener("click",()=>{u.style.display="block",c.style.display="none"})}function d(r){t&&(t.remembered=r,f(t),s(i()))}l.addEventListener("click",()=>d(!0)),n.addEventListener("click",()=>d(!1)),o.addEventListener("click",()=>s(i())),s(i())}function $(e){switch(e){case"word":return"Palabra";case"phrasal":return"Phrasal Verb";case"expression":return"Expresión";default:return"Otro"}}const p=document.getElementById("app"),b=document.querySelectorAll(".nav-link");function M(e){b.forEach(t=>{t.dataset.view===e?t.classList.add("active"):t.classList.remove("active")})}function g(e){switch(M(e),e){case"home":I(p);break;case"add":w(p);break;case"review":O(p);break;default:p.innerHTML="<p>Vista no encontrada</p>"}}b.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.view;g(a)})});g("home");
