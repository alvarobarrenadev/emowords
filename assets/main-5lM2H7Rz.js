(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const U="emowords_vocab",ke="emowords_settings";function P(){const e=localStorage.getItem(U);return e?JSON.parse(e):[]}function je(e){const t=P(),a={...e,createdAt:Date.now(),lastReviewedAt:null,reviewCount:0,correctCount:0,incorrectCount:0,nextReviewAt:Date.now(),difficulty:0};t.push(a),localStorage.setItem(U,JSON.stringify(t))}function le(e){const t=P().map(a=>a.id===e.id?e:a);localStorage.setItem(U,JSON.stringify(t))}function He(e){const t=P().filter(a=>a.id!==e);localStorage.setItem(U,JSON.stringify(t))}function We(e){return P().find(t=>t.id===e)}function Ge(e){const t=P(),a=e.toLowerCase().trim();return a?t.filter(o=>o.word.toLowerCase().includes(a)||o.meaning.toLowerCase().includes(a)||o.example&&o.example.toLowerCase().includes(a)||o.emotion&&o.emotion.toLowerCase().includes(a)||o.category&&o.category.toLowerCase().includes(a)):t}function Te(){const e=P(),t=new Set;return e.forEach(a=>{a.category&&t.add(a.category)}),Array.from(t).sort()}function Oe(e,t="date-desc"){const a=[...e];switch(t){case"date-asc":return a.sort((o,n)=>(o.createdAt||o.id)-(n.createdAt||n.id));case"date-desc":return a.sort((o,n)=>(n.createdAt||n.id)-(o.createdAt||o.id));case"alpha-asc":return a.sort((o,n)=>o.word.localeCompare(n.word));case"alpha-desc":return a.sort((o,n)=>n.word.localeCompare(o.word));case"review-count":return a.sort((o,n)=>(n.reviewCount||0)-(o.reviewCount||0));case"difficulty":return a.sort((o,n)=>(n.difficulty||0)-(o.difficulty||0));default:return a}}function ce(){const e=P(),t=e.length,a=e.filter(g=>g.remembered).length,o=t-a,n=e.reduce((g,T)=>g+(T.reviewCount||0),0),i=t>0?(n/t).toFixed(1):0,s={word:e.filter(g=>g.type==="word").length,phrasal:e.filter(g=>g.type==="phrasal").length,expression:e.filter(g=>g.type==="expression").length,connector:e.filter(g=>g.type==="connector").length},d=e.reduce((g,T)=>g+(T.correctCount||0),0),l=e.reduce((g,T)=>g+(T.incorrectCount||0),0),p=d+l>0?(d/(d+l)*100).toFixed(1):0,r=Date.now(),b=e.filter(g=>!g.nextReviewAt||g.nextReviewAt<=r).length;return{total:t,remembered:a,forgotten:o,totalReviews:n,averageReviews:i,byType:s,retentionRate:p,dueForReview:b}}const ve=[1,3,7,14,30,60,120,240];function Le(e){const t=e.correctCount||0;return t>=10?"master":t>=5?"guru":t>=2?"apprentice":"new"}function _e(e){const t=Le(e);return{level:t,...{new:{label:"Nuevo",class:"mastery-new",icon:"fa-seedling",percent:10},apprentice:{label:"Aprendiz",class:"mastery-apprentice",icon:"fa-leaf",percent:40},guru:{label:"Experto",class:"mastery-guru",icon:"fa-tree",percent:75},master:{label:"Maestro",class:"mastery-master",icon:"fa-crown",percent:100}}[t]}}function Fe(e){if(!e.nextReviewAt)return!0;const t=new Date().setHours(23,59,59,999);return e.nextReviewAt<=t}function Ue(){const e=P(),t=Date.now();return e.filter(a=>!a.nextReviewAt||a.nextReviewAt<=t).length}function fe(e,t){const a=Date.now(),o=1440*60*1e3;if(!t)return a+600*1e3;const n=e.correctCount||0,i=Math.min(n,ve.length-1),s=ve[i],l=1-(e.difficulty||0)*.1,p=Math.max(1,Math.round(s*l));return a+p*o}function Ye(e){if(!e.nextReviewAt)return"Ahora";const t=Date.now(),a=e.nextReviewAt-t;if(a<=0)return"Ahora";const o=Math.floor(a/(60*1e3)),n=Math.floor(a/(3600*1e3)),i=Math.floor(a/(1440*60*1e3));return o<60?`${o}min`:n<24?`${n}h`:i===1?"Mañana":i<7?`${i} días`:i<30?`${Math.floor(i/7)} sem`:`${Math.floor(i/30)} mes${Math.floor(i/30)>1?"es":""}`}function Xe(){const e=P(),t=Date.now();return e.filter(o=>!o.nextReviewAt||o.nextReviewAt<=t).sort((o,n)=>{const i=t-(o.nextReviewAt||0),s=t-(n.nextReviewAt||0);if(i!==s)return s-i;const d=o.difficulty||0,l=n.difficulty||0;return d!==l?l-d:(o.reviewCount||0)-(n.reviewCount||0)})}function Ke(e,t){const a=We(e);if(a)return a.remembered=t,a.lastReviewedAt=Date.now(),a.reviewCount=(a.reviewCount||0)+1,t?(a.correctCount=(a.correctCount||0)+1,a.difficulty=Math.max(-3,(a.difficulty||0)-1),a.nextReviewAt=fe(a,!0)):(a.incorrectCount=(a.incorrectCount||0)+1,a.difficulty=Math.min(3,(a.difficulty||0)+1),a.correctCount=Math.max(0,(a.correctCount||0)-2),a.nextReviewAt=fe(a,!1)),le(a),a}function Je(){const e=P(),t={version:"1.0",exportedAt:new Date().toISOString(),wordCount:e.length,words:e};return JSON.stringify(t,null,2)}function ae(e){try{const t=JSON.parse(e);if(!t.words||!Array.isArray(t.words))throw new Error("Invalid data format: missing words array");const a=P(),o=new Set(a.map(s=>s.id));let n=0,i=0;return t.words.forEach(s=>{if(!s.word||!s.meaning){i++;return}(!s.id||o.has(s.id))&&(s.id=Date.now()+Math.random()),s.type=s.type||"word",s.remembered=s.remembered||!1,s.createdAt=s.createdAt||Date.now(),a.push(s),o.add(s.id),n++}),localStorage.setItem(U,JSON.stringify(a)),{success:!0,imported:n,skipped:i}}catch(t){return{success:!1,error:t.message}}}function Ze(e){try{const t=e.trim().split(`
`);if(t.length<2)throw new Error("El archivo CSV debe tener al menos una fila de encabezados y una de datos");const a=ye(t[0]).map(c=>c.toLowerCase().trim()),o=a.findIndex(c=>c==="word"||c==="palabra"||c==="english"),n=a.findIndex(c=>c==="meaning"||c==="significado"||c==="spanish"||c==="traduccion"||c==="traducción");if(o===-1||n===-1)throw new Error('El CSV debe tener columnas "word" y "meaning" (o "palabra" y "significado")');const i=a.findIndex(c=>c==="type"||c==="tipo"),s=a.findIndex(c=>c==="category"||c==="categoria"||c==="categoría"),d=a.findIndex(c=>c==="example"||c==="ejemplo"),l=a.findIndex(c=>c==="emotion"||c==="emocion"||c==="emoción"||c==="association"||c==="asociacion"),p=P(),r=new Set(p.map(c=>c.word.toLowerCase().trim()));let b=0,g=0,T=0;for(let c=1;c<t.length;c++){const w=t[c].trim();if(!w)continue;const L=ye(w),A=L[o]?.trim(),B=L[n]?.trim();if(!A||!B){g++;continue}if(r.has(A.toLowerCase())){T++;continue}let C="word";if(i!==-1&&L[i]){const $=L[i].toLowerCase().trim();["phrasal","phrasal verb","phrasal-verb"].includes($)?C="phrasal":["expression","expresion","expresión"].includes($)?C="expression":["connector","conector"].includes($)?C="connector":["word","palabra"].includes($)&&(C="word")}const z={id:Date.now()+Math.random(),word:A,meaning:B,type:C,category:s!==-1&&L[s]?.trim()||null,example:d!==-1&&L[d]?.trim()||"",emotion:l!==-1&&L[l]?.trim()||"",image:"",remembered:!1,createdAt:Date.now(),lastReviewedAt:null,reviewCount:0,correctCount:0,incorrectCount:0,nextReviewAt:Date.now(),difficulty:0};p.push(z),r.add(A.toLowerCase()),b++}return localStorage.setItem(U,JSON.stringify(p)),{success:!0,imported:b,skipped:g,duplicates:T}}catch(t){return{success:!1,error:t.message}}}function ye(e){const t=[];let a="",o=!1;for(let n=0;n<e.length;n++){const i=e[n];i==='"'?o=!o:(i===","||i===";")&&!o?(t.push(a.trim()),a=""):a+=i}return t.push(a.trim()),t}function Se(e,t=null){const a=P(),o=e.toLowerCase().trim();return a.some(n=>n.word.toLowerCase().trim()===o&&n.id!==t)}function X(){const e=localStorage.getItem(ke);return e?JSON.parse(e):{theme:"dark",language:"es",showExampleInReview:!0,autoPlayAudio:!1}}function qe(e){localStorage.setItem(ke,JSON.stringify(e))}const Ce="emowords_gamification";function oe(){const e=localStorage.getItem(Ce);return e?JSON.parse(e):{streak:0,lastStudyDate:null,maxStreak:0,dailyGoal:{date:new Date().toLocaleDateString(),count:0,target:20},totalXp:0,level:1,perfectSessions:0,totalReviews:0}}function de(e){localStorage.setItem(Ce,JSON.stringify(e))}function se(){const e=oe(),t=new Date().toLocaleDateString();if(e.dailyGoal.date!==t){e.dailyGoal={date:t,count:0,target:e.dailyGoal.target||20};const a=new Date;a.setDate(a.getDate()-1),e.lastStudyDate!==a.toLocaleDateString()&&e.lastStudyDate!==t&&(e.streak>0,e.streak=0),de(e)}return e}function he(e=1,t={}){const a=oe(),o=new Date().toLocaleDateString(),n=a.level;if(a.dailyGoal.date!==o&&(a.dailyGoal={date:o,count:0,target:a.dailyGoal.target||20}),a.dailyGoal.count+=e,a.totalReviews=(a.totalReviews||0)+e,t.perfectSession&&(a.perfectSessions=(a.perfectSessions||0)+1),a.lastStudyDate!==o){const s=new Date;s.setDate(s.getDate()-1);const d=s.toLocaleDateString();a.lastStudyDate===d?a.streak+=1:a.streak=1,a.streak>a.maxStreak&&(a.maxStreak=a.streak),a.lastStudyDate=o}a.totalXp+=e*10,a.level=Math.floor(Math.sqrt(a.totalXp/100))+1,de(a);const i=a.level>n;return{...a,leveledUp:i,newLevel:i?a.level:null}}function Qe(e){const t=oe();t.dailyGoal.target=e,de(t)}function ea(e){const t=oe();return{totalWords:e?.total||0,masteredWords:e?.mastered||0,wordsByType:e?.byType||{word:0,phrasal:0,expression:0,connector:0},maxStreak:t.maxStreak||0,streak:t.streak||0,totalReviews:t.totalReviews||0,perfectSessions:t.perfectSessions||0,level:t.level||1,studiedAtNight:!1,studiedEarly:!1}}const Ie="emowords_achievements",Y={first_word:{id:"first_word",name:"Primera Palabra",description:"Añade tu primera palabra",icon:"fa-seedling",category:"vocabulary",xpReward:10,condition:e=>e.totalWords>=1},collector_10:{id:"collector_10",name:"Coleccionista",description:"Alcanza 10 palabras en tu vocabulario",icon:"fa-layer-group",category:"vocabulary",xpReward:25,condition:e=>e.totalWords>=10},collector_50:{id:"collector_50",name:"Bibliotecario",description:"Alcanza 50 palabras en tu vocabulario",icon:"fa-book",category:"vocabulary",xpReward:50,condition:e=>e.totalWords>=50},collector_100:{id:"collector_100",name:"Erudito",description:"Alcanza 100 palabras en tu vocabulario",icon:"fa-graduation-cap",category:"vocabulary",xpReward:100,condition:e=>e.totalWords>=100},collector_500:{id:"collector_500",name:"Maestro del Léxico",description:"Alcanza 500 palabras en tu vocabulario",icon:"fa-crown",category:"vocabulary",xpReward:250,condition:e=>e.totalWords>=500},streak_3:{id:"streak_3",name:"En Racha",description:"Mantén una racha de 3 días",icon:"fa-fire",category:"streak",xpReward:30,condition:e=>e.maxStreak>=3},streak_7:{id:"streak_7",name:"Semana Perfecta",description:"Mantén una racha de 7 días",icon:"fa-fire-flame-curved",category:"streak",xpReward:70,condition:e=>e.maxStreak>=7},streak_30:{id:"streak_30",name:"Mes de Fuego",description:"Mantén una racha de 30 días",icon:"fa-meteor",category:"streak",xpReward:200,condition:e=>e.maxStreak>=30},streak_100:{id:"streak_100",name:"Imparable",description:"Mantén una racha de 100 días",icon:"fa-dragon",category:"streak",xpReward:500,condition:e=>e.maxStreak>=100},first_review:{id:"first_review",name:"Primer Repaso",description:"Completa tu primera sesión de repaso",icon:"fa-play",category:"review",xpReward:15,condition:e=>e.totalReviews>=1},reviewer_50:{id:"reviewer_50",name:"Repasador",description:"Completa 50 repasos",icon:"fa-rotate",category:"review",xpReward:50,condition:e=>e.totalReviews>=50},reviewer_200:{id:"reviewer_200",name:"Experto en Repasos",description:"Completa 200 repasos",icon:"fa-brain",category:"review",xpReward:100,condition:e=>e.totalReviews>=200},perfect_session:{id:"perfect_session",name:"Sesión Perfecta",description:"Completa una sesión sin errores (mín. 5 palabras)",icon:"fa-star",category:"review",xpReward:40,condition:e=>e.perfectSessions>=1},first_master:{id:"first_master",name:"Primera Maestría",description:"Domina completamente tu primera palabra",icon:"fa-gem",category:"mastery",xpReward:30,condition:e=>e.masteredWords>=1},master_10:{id:"master_10",name:"Dominador",description:"Domina 10 palabras",icon:"fa-trophy",category:"mastery",xpReward:75,condition:e=>e.masteredWords>=10},master_50:{id:"master_50",name:"Gran Maestro",description:"Domina 50 palabras",icon:"fa-medal",category:"mastery",xpReward:200,condition:e=>e.masteredWords>=50},level_5:{id:"level_5",name:"Aprendiz Dedicado",description:"Alcanza el nivel 5",icon:"fa-arrow-up",category:"level",xpReward:50,condition:e=>e.level>=5},level_10:{id:"level_10",name:"Estudiante Avanzado",description:"Alcanza el nivel 10",icon:"fa-ranking-star",category:"level",xpReward:100,condition:e=>e.level>=10},level_25:{id:"level_25",name:"Leyenda del Vocabulario",description:"Alcanza el nivel 25",icon:"fa-chess-king",category:"level",xpReward:300,condition:e=>e.level>=25},variety_master:{id:"variety_master",name:"Variedad",description:"Tiene al menos 5 de cada tipo (palabra, phrasal, expresión, conector)",icon:"fa-shapes",category:"special",xpReward:60,condition:e=>e.wordsByType.word>=5&&e.wordsByType.phrasal>=5&&e.wordsByType.expression>=5&&e.wordsByType.connector>=5},night_owl:{id:"night_owl",name:"Búho Nocturno",description:"Estudia después de medianoche",icon:"fa-moon",category:"special",xpReward:20,condition:e=>e.studiedAtNight},early_bird:{id:"early_bird",name:"Madrugador",description:"Estudia antes de las 7am",icon:"fa-sun",category:"special",xpReward:20,condition:e=>e.studiedEarly}};function ne(){const e=localStorage.getItem(Ie);return e?JSON.parse(e):[]}function Ae(e){localStorage.setItem(Ie,JSON.stringify(e))}function aa(e){const t=ne(),a=[];return Object.values(Y).forEach(o=>{t.includes(o.id)||o.condition(e)&&(t.push(o.id),a.push(o))}),a.length>0&&Ae(t),a}function ta(){const e=ne();return Object.values(Y).map(t=>({...t,unlocked:e.includes(t.id)}))}function ie(){const e=Object.keys(Y).length,t=ne().length;return{total:e,unlocked:t,percent:Math.round(t/e*100)}}function oa(){const e=new Date().getHours(),t={studiedAtNight:e>=0&&e<5,studiedEarly:e>=5&&e<7},a=ne(),o=[];return t.studiedAtNight&&!a.includes("night_owl")&&(a.push("night_owl"),o.push(Y.night_owl)),t.studiedEarly&&!a.includes("early_bird")&&(a.push("early_bird"),o.push(Y.early_bird)),o.length>0&&Ae(a),o}const be="toast-container";function na(){let e=document.getElementById(be);return e||(e=document.createElement("div"),e.id=be,e.className="toast-container",document.body.appendChild(e)),e}function q(e,t,a="info",o=4e3){const n=na(),i=document.createElement("div"),s={info:"fa-circle-info",success:"fa-circle-check",warning:"fa-triangle-exclamation",error:"fa-circle-xmark"};i.className=`toast ${a}`,i.innerHTML=`
    <i class="fa-solid ${s[a]||"fa-bell"}"></i>
    <div class="toast-content">
      <span class="toast-title">${e}</span>
      <span class="toast-message">${t}</span>
    </div>
  `,n.appendChild(i),o>0&&setTimeout(()=>{i.classList.add("removing"),i.addEventListener("animationend",()=>{i.remove(),n.children.length===0&&n.remove()})},o)}function ia(e){document.querySelector(".achievement-notification")?.remove();const t=document.createElement("div");t.className="achievement-notification animate__animated animate__fadeInUp",t.innerHTML=`
    <div class="achievement-glow"></div>
    <div class="achievement-content">
      <div class="achievement-icon-wrapper">
        <i class="fa-solid ${e.icon}"></i>
      </div>
      <div class="achievement-info">
        <span class="achievement-label">🏆 ¡Logro Desbloqueado!</span>
        <span class="achievement-name">${e.name}</span>
        <span class="achievement-desc">${e.description}</span>
      </div>
      <div class="achievement-xp">+${e.xpReward} XP</div>
    </div>
  `,document.body.appendChild(t);try{const a=new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp+fl5OQioR7d3d9hY+YoaWloJuVjIN4cHBzfoqWoKWmoZqUiXxxamp0f4yYoaSnop2XjIN4bWxzfouXn6OkoJqUiX5zamxxfIiUnKGjop6Zkoh+c21wd4OOl52hoZ6Zk4h9cWxveYOPmJ6hoZ2YkoZ7bmtvd4SPmZ6hoJ6YkYV4bWtvdoKNl52fn5yXkIR3a2pvdYGMl52fn5yXj4N2amluc4CLlpyenZuWjoJ1Zmhsb36Kk5qbnJqVjIBzZGZqa3yHkJaZmZeUi35wYmRnanyGj5WWlpSRiXxuX2JkanyEjZKVlJKPhnluXl9ibHqCi5GTk5GNhHZqXF1fanyBiY+RkZCLgXNmWlxdaHmAh4yPj46Kg3JlWVpbZ3d/hYqNjYyIf29iV1hZZXR9goiLi4qHfWxfVFVXY3J6gIWJiYeEe2pbUlNVYXB4foSHhoWCeGdYUFBTX21zeoCDg4KAdmVWTk5QXGpxdnyAf358b2NUT01UXGZ0eH17fHt5bWJUR01TV2RvdHp9fHt5cGVYUE1TV2Jwdnp7e3p4cGZaU09UWGRvdXp7e3l3cGdcVlNXXGZwd3t8e3l2b2heWVdaX2lzent7enl0bmVfW1lfZG50e3t6eHVvZ2JeXGBla3R6e3t4dXBpY19eY2dsc3l7enh1cWpkYWFkaW90eXt5d3RvamVjY2drcnl6eXd0cGtmZGVobnN4enl3dHFsZ2ZnaWx0eHp4dnRwbGhnZ2ltd3l5d3Vybmtnamp0d3h4dnVxbWppcHN2eHd2dHFtamxvc3Z4dnVzb2xsbW5zdnd1dHNvbW1ucnV3dnV0cm9ubm9xc3V1dHNxb25ub3Bxc3NycXBub25vb3ByMDEwMC8wLy8vLy8vLy4uLi4uLi4uLi4tLS0tLS0tLSwsKyssKysrKysrKioqKioqKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSg=");a.volume=.3,a.play().catch(()=>{})}catch{}setTimeout(()=>{t.classList.remove("animate__fadeInUp"),t.classList.add("animate__fadeOutUp"),setTimeout(()=>t.remove(),500)},4e3)}function $e(e){if(!e||e.length===0)return;let t=0;e.forEach(a=>{setTimeout(()=>{ia(a)},t),t+=4500})}function sa(e){document.querySelector(".level-up-celebration")?.remove();const t=document.createElement("div");t.className="level-up-celebration",t.innerHTML=`
    <div class="level-up-overlay"></div>
    <div class="level-up-content animate__animated animate__zoomIn">
      <div class="level-up-stars">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star big"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <h2>¡Subiste de Nivel!</h2>
      <div class="level-number">
        <span class="level-badge">Nivel ${e}</span>
      </div>
      <p>Sigue así, ¡vas increíble!</p>
      <button class="level-up-close">¡Genial!</button>
    </div>
  `,document.body.appendChild(t),ra();const a=()=>{t.classList.add("fade-out"),setTimeout(()=>t.remove(),300)};t.querySelector(".level-up-close").addEventListener("click",a),t.querySelector(".level-up-overlay").addEventListener("click",a),setTimeout(a,5e3)}function ra(){const e=["#6366f1","#8b5cf6","#ec4899","#f59e0b","#10b981","#3b82f6"];for(let a=0;a<50;a++){const o=document.createElement("div");o.className="confetti",o.style.left=Math.random()*100+"vw",o.style.backgroundColor=e[Math.floor(Math.random()*e.length)],o.style.animationDuration=Math.random()*2+2+"s",o.style.animationDelay=Math.random()*.5+"s",document.body.appendChild(o),setTimeout(()=>o.remove(),4e3)}}function la(){const e=oa();e.length>0&&$e(e)}const R=[{id:"a1-complete",name:"A1 - Beginner Pack",icon:"fa-seedling",description:"Lo esencial para sobrevivir: verbos del día a día, conectores básicos, tus primeros phrasal verbs y frases que usarás constantemente.",level:"A1",words:[{word:"Be",meaning:"Ser / Estar",type:"word",category:"Verbos",example:"I am tired. She is my friend.",emotionalTip:'Piensa en esa pregunta que te haces a las 3am cuando no puedes dormir: "¿Quién SOY yo realmente?" BE es existir, ser tú.'},{word:"Have",meaning:"Tener",type:"word",category:"Verbos",example:"I have a question.",emotionalTip:`Esa sensación cuando te das cuenta de que no tienes la cartera encima. "I don't HAVE it." El vacío en el estómago.`},{word:"Want",meaning:"Querer",type:"word",category:"Verbos",example:"I want coffee, please.",emotionalTip:'El deseo intenso de algo que no puedes tener. Ese "lo QUIERO" de niño pequeño. WANT es deseo puro, sin filtros.'},{word:"Need",meaning:"Necesitar",type:"word",category:"Verbos",example:"I need help.",emotionalTip:"Cuando estás perdido en una ciudad extranjera de noche y NECESITAS ayuda de verdad. No es capricho, es supervivencia."},{word:"Like",meaning:"Gustar",type:"word",category:"Verbos",example:"I like this song.",emotionalTip:"Esa canción que te transporta a un momento feliz de tu vida. I LIKE it. Te gusta, te hace sentir bien."},{word:"Go",meaning:"Ir",type:"word",category:"Verbos",example:"I go to work by metro.",emotionalTip:'El impulso de huir cuando una situación te supera. "I need to GO." Escapar, moverte, liberarte.'},{word:"Know",meaning:"Saber / Conocer",type:"word",category:"Verbos",example:"I don't know.",emotionalTip:`Esa impotencia cuando alguien te pregunta algo y no tienes ni idea. "I don't KNOW" con vergüenza en la voz.`},{word:"Think",meaning:"Pensar / Creer",type:"word",category:"Verbos",example:"I think so.",emotionalTip:'Cuando te preguntan tu opinión y todas las miradas están sobre ti. "I THINK that..." y tu corazón se acelera.'},{word:"See",meaning:"Ver",type:"word",category:"Verbos",example:"See you tomorrow!",emotionalTip:"El momento de reconocer a alguien querido entre la multitud del aeropuerto. I SEE you. Alivio y alegría."},{word:"Work",meaning:"Trabajar / Funcionar",type:"word",category:"Verbos",example:"It doesn't work.",emotionalTip:`La frustración cuando algo no funciona justo antes de una entrega importante. "It doesn't WORK!" Desesperación.`},{word:"And",meaning:"Y",type:"connector",category:"Conectores",example:"Coffee and a sandwich, please.",emotionalTip:"Cuando enumeras todo lo bueno que tienes: mi familia AND mis amigos AND mi salud. Gratitud acumulada."},{word:"But",meaning:"Pero",type:"connector",category:"Conectores",example:"I like it, but it's expensive.",emotionalTip:'El BUT que rompe ilusiones. "Te quiero, BUT..." Ese momento donde sabes que viene algo malo.'},{word:"Or",meaning:"O",type:"connector",category:"Conectores",example:"Tea or coffee?",emotionalTip:"Esa decisión difícil que te quita el sueño. ¿Esto OR aquello? La ansiedad de elegir mal."},{word:"Because",meaning:"Porque",type:"connector",category:"Conectores",example:"I'm late because of the traffic.",emotionalTip:'Cuando te pillan en una mentira y tienes que justificarte. "BECAUSE..." buscando excusas desesperadamente.'},{word:"So",meaning:"Así que / Entonces",type:"connector",category:"Conectores",example:"I was hungry, so I ordered food.",emotionalTip:"Las consecuencias de tus acciones. Bebí demasiado, SO ahora me duele la cabeza. Causa y efecto."},{word:"Then",meaning:"Luego / Entonces",type:"connector",category:"Conectores",example:"First we eat, then we go.",emotionalTip:"Cuando planeas algo con ilusión. Primero esto, THEN aquello. La anticipación de algo bueno."},{word:"Also",meaning:"También",type:"connector",category:"Conectores",example:"I also want dessert.",emotionalTip:'Cuando ya has pedido mucho pero aún quieres más. "ALSO..." con un poco de vergüenza.'},{word:"Maybe",meaning:"Quizás / A lo mejor",type:"connector",category:"Conectores",example:"Maybe tomorrow.",emotionalTip:"Esa respuesta que das cuando no quieres decir que no directamente. MAYBE = probablemente no, pero no quiero herirte."},{word:"Really",meaning:"De verdad / Muy",type:"connector",category:"Conectores",example:"I'm really tired.",emotionalTip:'Cuando necesitas que te crean. "REALLY, te lo juro, es verdad." Énfasis desesperado.'},{word:"Actually",meaning:"En realidad",type:"connector",category:"Conectores",example:"Actually, I changed my mind.",emotionalTip:'Cuando confiesas la verdad después de haber mentido. "ACTUALLY... no era así." El alivio de sincerarte.'},{word:"Wake up",meaning:"Despertarse",type:"phrasal",category:"Phrasal Verbs",example:"I wake up at 7.",emotionalTip:"Ese terror cuando miras el reloj y llegas tarde. O la paz de despertar sin alarma un domingo."},{word:"Get up",meaning:"Levantarse",type:"phrasal",category:"Phrasal Verbs",example:"Get up, we're late!",emotionalTip:"La lucha interna cada mañana fría de invierno. Tu cama caliente vs. tus responsabilidades."},{word:"Turn on",meaning:"Encender",type:"phrasal",category:"Phrasal Verbs",example:"Turn on the lights.",emotionalTip:"Entrar a casa de noche a oscuras, ese alivio cuando la luz revela que no hay nadie escondido."},{word:"Turn off",meaning:"Apagar",type:"phrasal",category:"Phrasal Verbs",example:"Turn off your phone.",emotionalTip:"Apagar el móvil para desconectar del mundo. Ese silencio liberador y un poco aterrador."},{word:"Come in",meaning:"Entrar / Pasa",type:"phrasal",category:"Phrasal Verbs",example:"Come in, sit down!",emotionalTip:"Cuando te invitan a pasar a una casa donde te sientes bienvenido. Calidez y pertenencia."},{word:"Go out",meaning:"Salir",type:"phrasal",category:"Phrasal Verbs",example:"Let's go out tonight.",emotionalTip:"Esa emoción del viernes noche cuando sales con amigos. Libertad, posibilidades, diversión."},{word:"Sit down",meaning:"Sentarse",type:"phrasal",category:"Phrasal Verbs",example:"Please sit down.",emotionalTip:'Cuando tu jefe dice "siéntate" con cara seria. El corazón se acelera, ¿qué he hecho?'},{word:"Put on",meaning:"Ponerse (ropa)",type:"phrasal",category:"Phrasal Verbs",example:"Put on your jacket, it's cold.",emotionalTip:"Ponerte esa ropa especial para una cita importante. Los nervios de querer causar buena impresión."},{word:"Take off",meaning:"Quitarse (ropa)",type:"phrasal",category:"Phrasal Verbs",example:"Take off your shoes.",emotionalTip:"Quitarte los zapatos después de un día larguísimo. Ese alivio físico de llegar a casa."},{word:"Look at",meaning:"Mirar",type:"phrasal",category:"Phrasal Verbs",example:"Look at this!",emotionalTip:"Cuando alguien te muestra algo increíble y quiere compartir su asombro contigo. Complicidad."},{word:"How are you?",meaning:"¿Cómo estás?",type:"expression",category:"Expresiones",example:"Hey! How are you?",emotionalTip:"Cuando alguien te lo pregunta de verdad y espera una respuesta honesta. Sentirte visto."},{word:"I'm fine, thanks",meaning:"Bien, gracias",type:"expression",category:"Expresiones",example:"I'm fine, thanks. And you?",emotionalTip:"La mentira social que todos decimos aunque estemos destrozados por dentro. La máscara."},{word:"Nice to meet you",meaning:"Encantado/a",type:"expression",category:"Expresiones",example:"Hi, I'm Ana. Nice to meet you.",emotionalTip:"Los nervios de conocer a alguien que podría ser importante en tu vida. Primera impresión."},{word:"See you later",meaning:"Hasta luego",type:"expression",category:"Expresiones",example:"Bye! See you later.",emotionalTip:"Despedirte de alguien sin saber si le volverás a ver. Esa incertidumbre suave."},{word:"No problem",meaning:"No hay problema / De nada",type:"expression",category:"Expresiones",example:"Thanks! - No problem.",emotionalTip:"Cuando ayudas a alguien y te sientes bien haciéndolo. Generosidad natural."},{word:"I don't understand",meaning:"No entiendo",type:"expression",category:"Expresiones",example:"Sorry, I don't understand.",emotionalTip:"La vergüenza de admitir que no entiendes algo que todos parecen entender. Vulnerabilidad."},{word:"Can you repeat?",meaning:"¿Puedes repetir?",type:"expression",category:"Expresiones",example:"Can you repeat, please?",emotionalTip:"Cuando no has pillado algo importante y temes parecer tonto al preguntar de nuevo."},{word:"Excuse me",meaning:"Disculpa / Perdona",type:"expression",category:"Expresiones",example:"Excuse me, where is the bathroom?",emotionalTip:"Interrumpir a un desconocido con el corazón un poco acelerado. Invadir su espacio."},{word:"I'm sorry",meaning:"Lo siento",type:"expression",category:"Expresiones",example:"I'm sorry, I'm late.",emotionalTip:"Cuando de verdad sientes haber hecho daño a alguien que te importa. Culpa genuina."},{word:"Of course",meaning:"Por supuesto / Claro",type:"expression",category:"Expresiones",example:"Can I sit here? - Of course!",emotionalTip:"Decir que sí con el corazón, no solo con la boca. Aceptación total, sin reservas."}]},{id:"a2-complete",name:"A2 - Elementary Pack",icon:"fa-leaf",description:"Para empezar a conversar: verbos de acción, conectores para contar cosas, phrasal verbs súper comunes y expresiones que oyes en todas partes.",level:"A2",words:[{word:"Try",meaning:"Intentar / Probar",type:"word",category:"Verbos",example:"Try this, it's delicious!",emotionalTip:"El miedo antes de lanzarte a hacer algo nuevo. TRY es ese segundo de valentía antes del salto."},{word:"Wait",meaning:"Esperar",type:"word",category:"Verbos",example:"Wait for me!",emotionalTip:"El nudo en el estómago mientras esperas los resultados del médico. WAIT es ansiedad contenida."},{word:"Tell",meaning:"Decir / Contar",type:"word",category:"Verbos",example:"Tell me more.",emotionalTip:'Cuando te mueres por saber un secreto. "TELL me!" Curiosidad que te consume.'},{word:"Ask",meaning:"Preguntar / Pedir",type:"word",category:"Verbos",example:"Can I ask you something?",emotionalTip:"El terror de pedir un aumento a tu jefe. ASK cuando tu voz tiembla un poco."},{word:"Feel",meaning:"Sentir / Sentirse",type:"word",category:"Verbos",example:"I feel tired today.",emotionalTip:"Cuando alguien pregunta cómo estás y no tienes palabras para explicarlo. I FEEL... todo y nada."},{word:"Remember",meaning:"Recordar",type:"word",category:"Verbos",example:"I don't remember his name.",emotionalTip:"Ese olor que te transporta a casa de tus abuelos. REMEMBER es nostalgia instantánea."},{word:"Forget",meaning:"Olvidar",type:"word",category:"Verbos",example:"I forgot my wallet.",emotionalTip:"El pánico de olvidar algo importante: un cumpleaños, una cita, la estufa encendida."},{word:"Leave",meaning:"Irse / Dejar",type:"word",category:"Verbos",example:"I'm leaving now.",emotionalTip:"Cerrar la puerta de casa de tus padres por última vez. LEAVE duele cuando es definitivo."},{word:"Stay",meaning:"Quedarse",type:"word",category:"Verbos",example:"Stay here, I'll be back.",emotionalTip:'Cuando alguien que amas se va pero tú no puedes acompañarle. "STAY with me." La súplica.'},{word:"Send",meaning:"Enviar",type:"word",category:"Verbos",example:"Send me the details.",emotionalTip:"Enviar ese mensaje arriesgado y quedarte mirando la pantalla esperando respuesta."},{word:"After",meaning:"Después de",type:"connector",category:"Conectores",example:"After work, I go to the gym.",emotionalTip:"El alivio que sientes después de superar algo duro. AFTER the storm, la calma."},{word:"Before",meaning:"Antes de",type:"connector",category:"Conectores",example:"Before I forget...",emotionalTip:"Los nervios la noche BEFORE de un examen importante. La anticipación nerviosa."},{word:"When",meaning:"Cuando",type:"connector",category:"Conectores",example:"When I was young...",emotionalTip:"Cuando recuerdas épocas mejores. WHEN I was happy... Nostalgia de lo que fue."},{word:"While",meaning:"Mientras",type:"connector",category:"Conectores",example:"I listen to music while I work.",emotionalTip:"Esos pequeños placeres que haces mientras trabajas. WHILE: robar momentos de felicidad."},{word:"If",meaning:"Si (condicional)",type:"connector",category:"Conectores",example:"If you want, we can go.",emotionalTip:'El condicional de los arrepentimientos. "IF I had..." Las decisiones que no tomaste.'},{word:"Anyway",meaning:"De todas formas / Bueno",type:"connector",category:"Conectores",example:"Anyway, let's go.",emotionalTip:"Cuando cambias de tema incómodo. ANYWAY... cortando una conversación difícil."},{word:"By the way",meaning:"Por cierto",type:"connector",category:"Conectores",example:"By the way, where is John?",emotionalTip:"Cuando quieres preguntar algo pero finges que es casual. Como si no te importara."},{word:"For example",meaning:"Por ejemplo",type:"connector",category:"Conectores",example:"I like fruits, for example, apples.",emotionalTip:"Cuando intentas explicarte y buscas algo concreto para que te entiendan."},{word:"I mean",meaning:"O sea / Quiero decir",type:"connector",category:"Conectores",example:"I mean, it's not bad.",emotionalTip:"Cuando metes la pata y tratas de arreglarlo. I MEAN... retrocediendo torpemente."},{word:"You know",meaning:"Ya sabes / Sabes",type:"connector",category:"Conectores",example:"It's like, you know, complicated.",emotionalTip:"Buscando complicidad cuando no sabes explicarte. YOU KNOW... esperando que te entiendan."},{word:"Look for",meaning:"Buscar",type:"phrasal",category:"Phrasal Verbs",example:"I'm looking for my keys.",emotionalTip:"La desesperación de buscar las llaves cuando llegas tarde. Frustración pura."},{word:"Pick up",meaning:"Recoger / Coger",type:"phrasal",category:"Phrasal Verbs",example:"I'll pick you up at 8.",emotionalTip:"Que alguien venga a recogerte. Sentirte cuidado, no tener que apañártelas solo."},{word:"Give up",meaning:"Rendirse / Dejar de",type:"phrasal",category:"Phrasal Verbs",example:"Don't give up!",emotionalTip:"El momento de rendirte después de intentarlo todo. La derrota que duele en el pecho."},{word:"Come back",meaning:"Volver",type:"phrasal",category:"Phrasal Verbs",example:"When are you coming back?",emotionalTip:"Esperar el regreso de alguien querido. La esperanza mezclada con añoranza."},{word:"Find out",meaning:"Descubrir / Enterarse",type:"phrasal",category:"Expresiones",example:"I found out he lied.",emotionalTip:"El golpe de descubrir una traición. Enterarte de algo que te rompe por dentro."},{word:"Hurry up",meaning:"Darse prisa",type:"phrasal",category:"Phrasal Verbs",example:"Hurry up, we're late!",emotionalTip:"La adrenalina del estrés cuando vas contra reloj. El corazón acelerado."},{word:"Grow up",meaning:"Crecer / Madurar",type:"phrasal",category:"Phrasal Verbs",example:"I grew up in Madrid.",emotionalTip:"Cuando alguien te dice que madures y te duele porque sabes que tiene razón."},{word:"Give back",meaning:"Devolver",type:"phrasal",category:"Phrasal Verbs",example:"Give me back my phone!",emotionalTip:"Que alguien tenga algo tuyo y se niegue a devolverlo. Impotencia y rabia."},{word:"Write down",meaning:"Apuntar / Anotar",type:"phrasal",category:"Phrasal Verbs",example:"Write down the address.",emotionalTip:"Apuntar algo importante con miedo de olvidarlo. La inseguridad de tu memoria."},{word:"Log in",meaning:"Iniciar sesión",type:"phrasal",category:"Phrasal Verbs",example:"Log in with your email.",emotionalTip:"No recordar la contraseña después de mil intentos. La frustración digital moderna."},{word:"What's up?",meaning:"¿Qué pasa? / ¿Qué tal?",type:"expression",category:"Expresiones",example:"Hey! What's up?",emotionalTip:"Ese amigo que te saluda como si no pasara el tiempo. Familiaridad instantánea."},{word:"Take care",meaning:"Cuídate",type:"expression",category:"Expresiones",example:"See you! Take care.",emotionalTip:"Decirle a alguien que se cuide porque de verdad te importa su bienestar."},{word:"Good luck",meaning:"Buena suerte",type:"expression",category:"Expresiones",example:"Good luck with your exam!",emotionalTip:"Cuando alguien te desea suerte y sientes que alguien cree en ti."},{word:"Never mind",meaning:"No importa / Déjalo",type:"expression",category:"Expresiones",example:"Never mind, forget it.",emotionalTip:"Cuando renuncias a explicar algo porque nadie te entiende. Resignación silenciosa."},{word:"It doesn't matter",meaning:"No importa / Da igual",type:"expression",category:"Expresiones",example:"It doesn't matter, really.",emotionalTip:"Decir que no importa cuando en realidad sí importa. La mentira piadosa."},{word:"I have no idea",meaning:"Ni idea / No tengo ni idea",type:"expression",category:"Expresiones",example:"I have no idea what happened.",emotionalTip:"Cuando estás completamente perdido y lo admites. Honestidad vulnerable."},{word:"Just a moment",meaning:"Un momento",type:"expression",category:"Expresiones",example:"Just a moment, please.",emotionalTip:"Pedir tiempo cuando te presionan. Necesitar un respiro antes de continuar."},{word:"That's fine",meaning:"Está bien / Vale",type:"expression",category:"Expresiones",example:"That's fine with me.",emotionalTip:"Conformarte con algo aunque preferirías otra cosa. Ceder para evitar conflicto."},{word:"I'm not sure",meaning:"No estoy seguro/a",type:"expression",category:"Expresiones",example:"I'm not sure if I can go.",emotionalTip:"La duda que te paraliza. No saber qué hacer y temer equivocarte."},{word:"Well done!",meaning:"¡Bien hecho!",type:"expression",category:"Expresiones",example:"You passed! Well done!",emotionalTip:"Cuando alguien reconoce tu esfuerzo. Sentir que has valido la pena."}]},{id:"b1-complete",name:"B1 - Intermediate Pack",icon:"fa-tree",description:"Para hablar con fluidez: verbos para opinar y expresarte, conectores para no quedarte callado, phrasal verbs esenciales y expresiones que usas cada día.",level:"B1",words:[{word:"Seem",meaning:"Parecer",type:"word",category:"Verbos",example:"It seems like a good idea.",emotionalTip:"Cuando algo PARECE perfecto pero tu intuición te dice que no. SEEM es la máscara que oculta la realidad."},{word:"Guess",meaning:"Suponer / Adivinar",type:"word",category:"Verbos",example:"I guess you're right.",emotionalTip:"Cuando no estás seguro pero tienes que responder igual. I GUESS... inseguridad disfrazada de respuesta."},{word:"Expect",meaning:"Esperar (expectativa)",type:"word",category:"Verbos",example:"I didn't expect that.",emotionalTip:"La decepción cuando la realidad no coincide con lo que esperabas. Expectativas rotas."},{word:"Realize",meaning:"Darse cuenta",type:"word",category:"Verbos",example:"I just realized I forgot my wallet.",emotionalTip:"Ese momento de horror cuando COMPRENDES lo que has hecho mal. La verdad que te golpea."},{word:"Agree",meaning:"Estar de acuerdo",type:"word",category:"Verbos",example:"I totally agree with you.",emotionalTip:"Cuando por fin alguien piensa como tú y no te sientes solo. Conexión de ideas."},{word:"Suggest",meaning:"Sugerir",type:"word",category:"Verbos",example:"I suggest we take a break.",emotionalTip:"Proponer algo con miedo a que lo rechacen. SUGGEST es la idea tímida que lanzas al aire."},{word:"Recommend",meaning:"Recomendar",type:"word",category:"Verbos",example:"I recommend this restaurant.",emotionalTip:"Cuando recomiendas algo personal y temes que no les guste. Tu gusto expuesto al juicio."},{word:"Manage",meaning:"Conseguir / Arreglárselas",type:"word",category:"Verbos",example:"I managed to finish on time.",emotionalTip:"El orgullo de lograrlo cuando todos pensaban que fallarías. Contra todo pronóstico, lo conseguiste."},{word:"Afford",meaning:"Permitirse (dinero)",type:"word",category:"Verbos",example:"I can't afford a new car.",emotionalTip:"Mirar el precio de algo y sentir que la vida es injusta. No poder permitírtelo duele."},{word:"Improve",meaning:"Mejorar",type:"word",category:"Verbos",example:"My English is improving.",emotionalTip:"Ver tu propio progreso después de mucho esfuerzo. Esa satisfacción de ser mejor que ayer."},{word:"Although",meaning:"Aunque",type:"connector",category:"Conectores",example:"Although it was late, I finished.",emotionalTip:"Cuando reconoces un problema pero sigues adelante. ALTHOUGH: sí, es difícil, pero no me rindo."},{word:"However",meaning:"Sin embargo",type:"connector",category:"Conectores",example:"It's cheap. However, it's bad quality.",emotionalTip:'El "pero" elegante que rompe las ilusiones. Te digo algo bueno... HOWEVER, viene lo malo.'},{word:"Instead",meaning:"En su lugar",type:"connector",category:"Conectores",example:"Let's do this instead.",emotionalTip:"Cambiar de plan cuando el original no funciona. Adaptarse o morir."},{word:"Besides",meaning:"Además",type:"connector",category:"Conectores",example:"It's late, and besides, I'm tired.",emotionalTip:"Acumular razones para justificarte. Y además... y ADEMÁS... la lista de excusas crece."},{word:"Otherwise",meaning:"Si no / De lo contrario",type:"connector",category:"Conectores",example:"Hurry up, otherwise we'll be late.",emotionalTip:"La amenaza que anticipa consecuencias. Hazlo... OTHERWISE la vas a liar."},{word:"Even though",meaning:"Aunque (enfático)",type:"connector",category:"Conectores",example:"Even though I studied, I failed.",emotionalTip:"La injusticia de esforzarte y fracasar igual. Hice TODO bien y aun así..."},{word:"Basically",meaning:"Básicamente",type:"connector",category:"Conectores",example:"Basically, it's done.",emotionalTip:"Cuando resumes porque la otra persona no pilla los detalles. Simplificando para tontos."},{word:"Apparently",meaning:"Por lo visto / Al parecer",type:"connector",category:"Conectores",example:"Apparently, he quit his job.",emotionalTip:"El cotilleo elegante. No lo sé de primera mano, pero APPARENTLY... el chismorreo educado."},{word:"Obviously",meaning:"Obviamente",type:"connector",category:"Conectores",example:"Obviously, I said yes.",emotionalTip:"Cuando algo es tan evidente que te sorprende tener que explicarlo. Puro duh."},{word:"Hopefully",meaning:"Ojalá / Con suerte",type:"connector",category:"Conectores",example:"Hopefully, it will work.",emotionalTip:"Esa esperanza frágil cuando no tienes el control. HOPEFULLY... cruzando los dedos."},{word:"Figure out",meaning:"Entender / Resolver",type:"phrasal",category:"Phrasal Verbs",example:"I can't figure out this problem.",emotionalTip:"La frustración de no entender algo que deberías entender. La solución que se te escapa."},{word:"Work out",meaning:"Hacer ejercicio / Funcionar",type:"phrasal",category:"Phrasal Verbs",example:"Things will work out, don't worry.",emotionalTip:"La fe de que todo se solucionará aunque no veas cómo. Optimismo en la incertidumbre."},{word:"Show up",meaning:"Aparecer / Presentarse",type:"phrasal",category:"Phrasal Verbs",example:"He didn't show up to the meeting.",emotionalTip:"Esperar a alguien que nunca llega. El plantón, la decepción de que no aparezca."},{word:"Run out of",meaning:"Quedarse sin",type:"phrasal",category:"Phrasal Verbs",example:"We ran out of milk.",emotionalTip:"Ese vacío cuando se acaba algo que necesitabas. No queda nada y lo descubres demasiado tarde."},{word:"Get along with",meaning:"Llevarse bien con",type:"phrasal",category:"Phrasal Verbs",example:"I get along with my boss.",emotionalTip:"La paz de trabajar con alguien que te cae bien. Cuando las relaciones fluyen sin esfuerzo."},{word:"Set up",meaning:"Organizar / Configurar",type:"phrasal",category:"Phrasal Verbs",example:"Let's set up a meeting.",emotionalTip:"Tomar las riendas y organizar algo. Sentirte capaz de crear orden del caos."},{word:"Catch up",meaning:"Ponerse al día",type:"phrasal",category:"Phrasal Verbs",example:"Let's catch up over coffee!",emotionalTip:"Reencontrarte con un viejo amigo y contaros todo. El calor de retomar una amistad."},{word:"Check out",meaning:"Echar un vistazo",type:"phrasal",category:"Phrasal Verbs",example:"Check out this video!",emotionalTip:"Compartir algo que te encanta esperando que al otro también le guste."},{word:"Look forward to",meaning:"Tener ganas de",type:"phrasal",category:"Phrasal Verbs",example:"I'm looking forward to the weekend!",emotionalTip:"La ilusión de algo bueno que está por venir. Anticipación feliz."},{word:"Put off",meaning:"Posponer",type:"phrasal",category:"Phrasal Verbs",example:"Stop putting it off, do it now!",emotionalTip:"El arte de dejar para mañana lo que deberías hacer hoy. La culpa del procrastinador."},{word:"It's up to you",meaning:"Tú decides / Depende de ti",type:"expression",category:"Expresiones",example:"Pizza or sushi? It's up to you.",emotionalTip:"Cuando te dan el poder de decidir y no sabes si es un regalo o una carga."},{word:"That makes sense",meaning:"Tiene sentido",type:"expression",category:"Expresiones",example:"Oh, that makes sense now!",emotionalTip:"El click mental cuando por fin entiendes algo. El alivio de que encaje."},{word:"It's not a big deal",meaning:"No es para tanto",type:"expression",category:"Expresiones",example:"Relax, it's not a big deal.",emotionalTip:"Calmar a alguien que exagera. O fingir que algo no te afecta cuando sí lo hace."},{word:"Let me know",meaning:"Avísame / Dime",type:"expression",category:"Expresiones",example:"Let me know if you need help.",emotionalTip:"Ofrecer ayuda genuina. Estar ahí para alguien sin imponerte."},{word:"To be honest",meaning:"Para ser sincero/a",type:"expression",category:"Expresiones",example:"To be honest, I don't like it.",emotionalTip:"Armarte de valor para decir la verdad incómoda. Honestidad que puede doler."},{word:"I'm not in the mood",meaning:"No me apetece",type:"expression",category:"Expresiones",example:"I'm not in the mood for a party.",emotionalTip:"Cuando tu cuerpo y tu mente dicen que no. Respetar tu propio estado emocional."},{word:"Fair enough",meaning:"Me parece bien / Vale",type:"expression",category:"Expresiones",example:"Fair enough, let's do it.",emotionalTip:"Aceptar el argumento del otro aunque no estés 100% convencido. Ceder con dignidad."},{word:"It depends",meaning:"Depende",type:"expression",category:"Expresiones",example:"Are you coming? It depends.",emotionalTip:"La respuesta cobarde cuando no quieres comprometerte. Dejando todas las puertas abiertas."},{word:"That's the thing",meaning:"Esa es la cuestión",type:"expression",category:"Expresiones",example:"That's the thing, I don't know.",emotionalTip:"Señalar el problema central. Ir al meollo del asunto, al quid de la cuestión."},{word:"I'll let you know",meaning:"Ya te diré / Te aviso",type:"expression",category:"Expresiones",example:"I'll let you know tomorrow.",emotionalTip:"Ganar tiempo para pensarlo. O una forma educada de no comprometerse."}]},{id:"b2-complete",name:"B2 - Upper-Intermediate Pack",icon:"fa-mountain",description:"Para sonar natural: verbos que usan los nativos, conectores para debatir, phrasal verbs del día a día y expresiones que escuchas en series y películas.",level:"B2",words:[{word:"Assume",meaning:"Suponer / Asumir",type:"word",category:"Verbos",example:"I assume you know about it.",emotionalTip:"Cuando das algo por hecho y luego descubres que estabas equivocado. La vergüenza de asumir."},{word:"Consider",meaning:"Considerar / Plantearse",type:"word",category:"Verbos",example:"Have you considered moving?",emotionalTip:"Esa pregunta que te hace replantearte toda tu vida. ¿Y si todo pudiera ser diferente?"},{word:"Tend to",meaning:"Tender a / Soler",type:"word",category:"Verbos",example:"I tend to wake up early.",emotionalTip:"Reconocer tus patrones, buenos o malos. Ser consciente de quién eres realmente."},{word:"Involve",meaning:"Implicar / Involucrar",type:"word",category:"Verbos",example:"What does the job involve?",emotionalTip:"Antes de meterte en algo, preguntar qué implica. El miedo a comprometerte sin saber."},{word:"Struggle",meaning:"Luchar / Costar (esfuerzo)",type:"word",category:"Verbos",example:"I struggle with mornings.",emotionalTip:"Esa batalla diaria contra algo que otros hacen fácilmente. Sentirte incapaz a veces."},{word:"Achieve",meaning:"Lograr / Conseguir",type:"word",category:"Verbos",example:"She achieved her goals.",emotionalTip:"Cruzar la meta después de sacrificarlo todo. El orgullo que te llena el pecho."},{word:"Avoid",meaning:"Evitar",type:"word",category:"Verbos",example:"I try to avoid sugar.",emotionalTip:"Los caminos largos que tomas para no enfrentar algo. Huir de lo que te asusta."},{word:"Convince",meaning:"Convencer",type:"word",category:"Verbos",example:"You convinced me!",emotionalTip:"Cuando alguien cambia tu mente con argumentos. Rendirte ante una verdad mejor."},{word:"Complain",meaning:"Quejarse",type:"word",category:"Verbos",example:"Stop complaining!",emotionalTip:"Ese alivio de desahogarte, aunque nadie pueda arreglarlo. Necesitar que te escuchen."},{word:"Appreciate",meaning:"Agradecer / Valorar",type:"word",category:"Verbos",example:"I really appreciate your help.",emotionalTip:"Gratitud genuina hacia alguien que estuvo ahí cuando lo necesitabas. Reconocer el valor."},{word:"Therefore",meaning:"Por lo tanto",type:"connector",category:"Conectores",example:"It was late, therefore we left.",emotionalTip:"La conclusión inevitable después de analizar todo. No hay más opción que..."},{word:"Nevertheless",meaning:"Sin embargo / Aun así",type:"connector",category:"Conectores",example:"It was hard. Nevertheless, I did it.",emotionalTip:"Cuando todo estaba en contra pero lo hiciste igual. La terquedad que te salvó."},{word:"On the other hand",meaning:"Por otro lado",type:"connector",category:"Conectores",example:"It's cheap, but on the other hand, it's slow.",emotionalTip:"Ver las dos caras de la moneda. Esa duda entre dos verdades que compiten."},{word:"In that case",meaning:"En ese caso",type:"connector",category:"Conectores",example:"In that case, count me in!",emotionalTip:"Cuando una nueva información cambia tu decisión completamente. Adaptarte sobre la marcha."},{word:"As long as",meaning:"Siempre que / Mientras",type:"connector",category:"Conectores",example:"You can go as long as you're back by 10.",emotionalTip:"La condición que pones para dar permiso. Control y confianza a partes iguales."},{word:"Unless",meaning:"A menos que",type:"connector",category:"Conectores",example:"I'll go unless it rains.",emotionalTip:"La excepción que podría arruinarlo todo. La puerta de escape que te dejas."},{word:"Despite",meaning:"A pesar de",type:"connector",category:"Conectores",example:"Despite the rain, we had fun.",emotionalTip:"Cuando las circunstancias eran malas pero tú eras más fuerte. Victoria sobre la adversidad."},{word:"Whereas",meaning:"Mientras que",type:"connector",category:"Conectores",example:"I like tea, whereas he prefers coffee.",emotionalTip:"Las diferencias que hacen única cada relación. Aceptar que no todos somos iguales."},{word:"On top of that",meaning:"Además de eso / Encima",type:"connector",category:"Conectores",example:"I'm tired and, on top of that, hungry.",emotionalTip:"Cuando los problemas se acumulan uno encima del otro. La gota que colma el vaso."},{word:"That being said",meaning:"Dicho esto",type:"connector",category:"Conectores",example:"That being said, I still think it's worth it.",emotionalTip:"Reconocer lo malo pero seguir adelante. Realismo optimista."},{word:"Come up with",meaning:"Idear / Se me ocurrió",type:"phrasal",category:"Phrasal Verbs",example:"She came up with a great idea.",emotionalTip:"Ese momento brillante cuando la solución aparece de la nada. La chispa creativa."},{word:"Turn out",meaning:"Resultar ser",type:"phrasal",category:"Phrasal Verbs",example:"It turned out to be a good decision.",emotionalTip:"Cuando la realidad supera o destroza tus expectativas. La sorpresa del final."},{word:"Bring up",meaning:"Sacar un tema",type:"phrasal",category:"Phrasal Verbs",example:"Why did you bring that up?",emotionalTip:"Mencionar algo incómodo que nadie quería tocar. El silencio tenso que sigue."},{word:"Get over",meaning:"Superar",type:"phrasal",category:"Phrasal Verbs",example:"I can't get over it.",emotionalTip:"Intentar dejar atrás algo que te destrozó. El dolor que se niega a irse."},{word:"Put up with",meaning:"Aguantar / Tolerar",type:"phrasal",category:"Phrasal Verbs",example:"I can't put up with this noise.",emotionalTip:"Soportar algo horrible porque no tienes otra opción. Paciencia que se agota."},{word:"Get away with",meaning:"Salirse con la suya",type:"phrasal",category:"Phrasal Verbs",example:"You won't get away with this!",emotionalTip:"La rabia de ver que alguien escapa sin consecuencias. La injusticia que quema."},{word:"Hold on",meaning:"Espera / Aguanta",type:"phrasal",category:"Phrasal Verbs",example:"Hold on, I'll be right back.",emotionalTip:"Pedir a alguien que espere cuando todo va demasiado rápido. Necesitar un segundo."},{word:"Mess up",meaning:"Cagarla / Estropear",type:"phrasal",category:"Phrasal Verbs",example:"I totally messed up.",emotionalTip:"Ese momento horrible cuando te das cuenta de que la has liado. Arrepentimiento instantáneo."},{word:"Freak out",meaning:"Flipar / Entrar en pánico",type:"phrasal",category:"Phrasal Verbs",example:"Don't freak out, it's fine.",emotionalTip:"Perder el control emocional completamente. El pánico que te consume."},{word:"End up",meaning:"Acabar / Terminar",type:"phrasal",category:"Phrasal Verbs",example:"We ended up staying until midnight.",emotionalTip:"Cuando las cosas no salen como planeabas pero no está mal. Destinos inesperados."},{word:"No way!",meaning:"¡Ni de broma! / ¡No me digas!",type:"expression",category:"Expresiones",example:"You quit your job? No way!",emotionalTip:"Incredulidad total ante algo que no puedes creer. La sorpresa que te deja sin palabras."},{word:"I'm done",meaning:"He terminado / Paso de esto",type:"expression",category:"Expresiones",example:"I'm done with this situation.",emotionalTip:"El hartazgo de decir basta. Cuando tu paciencia finalmente se agota."},{word:"That's insane",meaning:"Eso es una locura",type:"expression",category:"Expresiones",example:"You swam 5km? That's insane!",emotionalTip:"Asombro ante algo extraordinario. Cuando alguien hace lo que tú ni te atreverías."},{word:"Get the point",meaning:"Captar la idea / Entender",type:"expression",category:"Expresiones",example:"I get the point, you can stop.",emotionalTip:"Cuando ya entiendes pero el otro sigue explicando. Paciencia contada."},{word:"You're kidding",meaning:"Estás de broma",type:"expression",category:"Expresiones",example:"You won? You're kidding!",emotionalTip:"No poder creer lo que te cuentan. Esa mezcla de sorpresa y escepticismo."},{word:"I couldn't care less",meaning:"Me importa un bledo",type:"expression",category:"Expresiones",example:"I couldn't care less about what he thinks.",emotionalTip:"Indiferencia total hacia algo o alguien. La libertad de que te dé igual."},{word:"That's not the point",meaning:"Esa no es la cuestión",type:"expression",category:"Expresiones",example:"Yeah but that's not the point.",emotionalTip:"La frustración cuando alguien se va por la tangente. Querer volver al tema."},{word:"Keep it real",meaning:"Sé auténtico / Sin rollos",type:"expression",category:"Expresiones",example:"Forget the drama, keep it real.",emotionalTip:"Pedir honestidad en un mundo de mentiras. Valorar la autenticidad."},{word:"Been there, done that",meaning:"Ya pasé por eso",type:"expression",category:"Expresiones",example:"Drama at work? Been there, done that.",emotionalTip:"La experiencia que te da perspectiva. Haber sufrido algo similar antes."},{word:"It is what it is",meaning:"Es lo que hay",type:"expression",category:"Expresiones",example:"The deadline is tomorrow. It is what it is.",emotionalTip:"Aceptar una realidad que no puedes cambiar. Rendirse con paz, no con derrota."}]},{id:"c1-complete",name:"C1 - Advanced Pack",icon:"fa-rocket",description:"Para sonar sofisticado: verbos de trabajo y negocios, conectores elegantes pero naturales, phrasal verbs de nivel nativo y expresiones de persona culta.",level:"C1",words:[{word:"Address",meaning:"Abordar / Tratar (un tema)",type:"word",category:"Verbos",example:"We need to address this issue.",emotionalTip:"El momento de enfrentar un problema que todos evitaban. Tomar la iniciativa cuando nadie más lo hace."},{word:"Implement",meaning:"Implementar",type:"word",category:"Verbos",example:"We'll implement the changes next week.",emotionalTip:"Pasar de la idea al hecho. Ese nervio de poner en marcha algo que podría fallar o triunfar."},{word:"Ensure",meaning:"Asegurar(se)",type:"word",category:"Verbos",example:"Please ensure everyone is informed.",emotionalTip:"La responsabilidad de que todo salga bien. Cargar con las consecuencias si falla."},{word:"Clarify",meaning:"Aclarar",type:"word",category:"Verbos",example:"Let me clarify what I mean.",emotionalTip:"Cuando sientes que te han malinterpretado. La urgencia de ser entendido correctamente."},{word:"Prioritize",meaning:"Priorizar",type:"word",category:"Verbos",example:"We need to prioritize this task.",emotionalTip:"Decidir qué importa más cuando todo parece urgente. El peso de elegir."},{word:"Overcome",meaning:"Superar",type:"word",category:"Verbos",example:"She overcame many challenges.",emotionalTip:"Mirar atrás y ver todos los obstáculos que venciste. Orgullo de haber sobrevivido."},{word:"Acknowledge",meaning:"Reconocer / Admitir",type:"word",category:"Verbos",example:"I acknowledge my mistake.",emotionalTip:"Tragar tu orgullo y admitir que te equivocaste. La humildad que cuesta."},{word:"Pursue",meaning:"Perseguir (objetivo)",type:"word",category:"Verbos",example:"She decided to pursue her dreams.",emotionalTip:"Dejarlo todo por perseguir algo que te importa. El salto de fe."},{word:"Delegate",meaning:"Delegar",type:"word",category:"Verbos",example:"Learn to delegate tasks.",emotionalTip:"Confiar en que otros hagan lo que tú harías. Soltar el control es difícil."},{word:"Leverage",meaning:"Aprovechar / Sacar partido",type:"word",category:"Verbos",example:"Let's leverage our experience.",emotionalTip:"Usar todo lo que tienes a tu favor. Maximizar tus ventajas para ganar."},{word:"Having said that",meaning:"Dicho esto",type:"connector",category:"Conectores",example:"It's expensive. Having said that, it's worth it.",emotionalTip:"Reconocer un problema pero no dejar que te detenga. Equilibrio y madurez."},{word:"That said",meaning:"Dicho esto (más corto)",type:"connector",category:"Conectores",example:"He's difficult. That said, he's talented.",emotionalTip:"Admitir lo malo de alguien antes de defenderlo. Justicia en la crítica."},{word:"Either way",meaning:"De cualquier forma",type:"connector",category:"Conectores",example:"Either way, we need to decide.",emotionalTip:"Cuando ya no importa qué opción elijas. El alivio de aceptar cualquier resultado."},{word:"At the end of the day",meaning:"Al fin y al cabo",type:"connector",category:"Conectores",example:"At the end of the day, it's your choice.",emotionalTip:"Lo que realmente importa cuando quitas todo lo superficial. La esencia."},{word:"To be fair",meaning:"Para ser justos",type:"connector",category:"Conectores",example:"To be fair, he did apologize.",emotionalTip:"Defender a alguien aunque estés enfadado con él. Justicia por encima de emociones."},{word:"As a matter of fact",meaning:"De hecho",type:"connector",category:"Conectores",example:"As a matter of fact, I agree with you.",emotionalTip:"Sorprender a alguien diciendo que tiene razón. El giro inesperado."},{word:"For what it's worth",meaning:"Por lo que pueda valer",type:"connector",category:"Conectores",example:"For what it's worth, I think you're great.",emotionalTip:"Ofrecer tu opinión con humildad. No imponerla, solo compartirla."},{word:"Mind you",meaning:"Eso sí / Aunque",type:"connector",category:"Conectores",example:"Good restaurant. Mind you, it's pricey.",emotionalTip:"La advertencia justa después del halago. No engañar con expectativas falsas."},{word:"Not to mention",meaning:"Por no hablar de",type:"connector",category:"Conectores",example:"It's cold, not to mention raining.",emotionalTip:"Cuando los problemas se acumulan y ni siquiera has mencionado el peor."},{word:"In a nutshell",meaning:"En resumen / Resumiendo",type:"connector",category:"Conectores",example:"In a nutshell, we need more time.",emotionalTip:"Destilar todo en una frase. La claridad mental de quien entiende de verdad."},{word:"Play it down",meaning:"Quitarle importancia",type:"phrasal",category:"Phrasal Verbs",example:"Don't play it down, it's serious.",emotionalTip:"Minimizar algo para no preocupar a los demás. O para no enfrentar la verdad."},{word:"Rule out",meaning:"Descartar",type:"phrasal",category:"Phrasal Verbs",example:"We can't rule out that option.",emotionalTip:"Cerrar puertas definitivamente. Tomar decisiones que eliminan posibilidades."},{word:"Back out",meaning:"Echarse atrás",type:"phrasal",category:"Phrasal Verbs",example:"He backed out at the last minute.",emotionalTip:"El miedo que te hace abandonar justo antes. La decepción de quien contaba contigo."},{word:"Step up",meaning:"Dar un paso al frente",type:"phrasal",category:"Phrasal Verbs",example:"Someone needs to step up.",emotionalTip:"Cuando nadie actúa y tú decides hacerlo. Liderazgo en la incertidumbre."},{word:"Fall through",meaning:"Fracasar / No salir adelante",type:"phrasal",category:"Phrasal Verbs",example:"The deal fell through.",emotionalTip:"Cuando algo prometedor se desmorona. La decepción de lo que pudo ser."},{word:"Look into",meaning:"Investigar / Estudiar",type:"phrasal",category:"Phrasal Verbs",example:"I'll look into it.",emotionalTip:"Prometer que investigarás algo. A veces sincero, a veces solo para ganar tiempo."},{word:"Iron out",meaning:"Resolver / Limar",type:"phrasal",category:"Phrasal Verbs",example:"Let's iron out the details.",emotionalTip:"Pulir los últimos detalles antes de algo importante. Perfeccionismo en acción."},{word:"Pull off",meaning:"Lograr (algo difícil)",type:"phrasal",category:"Phrasal Verbs",example:"I can't believe we pulled it off!",emotionalTip:"La euforia de lograr lo imposible. El orgullo de haber demostrado que podías."},{word:"Get back to",meaning:"Volver a contactar",type:"phrasal",category:"Phrasal Verbs",example:"I'll get back to you on that.",emotionalTip:"Prometer una respuesta que a veces nunca llega. Esperanza o fantasía."},{word:"Follow through",meaning:"Cumplir / Llevar a cabo",type:"phrasal",category:"Phrasal Verbs",example:"Make sure you follow through.",emotionalTip:"Terminar lo que empezaste. La diferencia entre intención y acción."},{word:"The thing is",meaning:"El caso es / La cosa es que",type:"expression",category:"Expresiones",example:"The thing is, I need more time.",emotionalTip:"Cuando tienes que decir algo difícil. La preparación antes del golpe."},{word:"To cut a long story short",meaning:"Resumiendo / Yendo al grano",type:"expression",category:"Expresiones",example:"To cut a long story short, we won.",emotionalTip:"Saltarte el drama y llegar al final. Respetar el tiempo del otro."},{word:"Go the extra mile",meaning:"Hacer un esfuerzo extra",type:"expression",category:"Expresiones",example:"She always goes the extra mile.",emotionalTip:"Dar más de lo que te piden. El compromiso que te distingue de los demás."},{word:"Be on the same page",meaning:"Estar en la misma onda",type:"expression",category:"Expresiones",example:"Let's make sure we're on the same page.",emotionalTip:"Esa conexión cuando todos entienden lo mismo. Trabajo en equipo real."},{word:"Think outside the box",meaning:"Pensar de forma creativa",type:"expression",category:"Expresiones",example:"We need to think outside the box.",emotionalTip:"Cuando las soluciones normales no funcionan. Creatividad forzada por la necesidad."},{word:"Hit the ground running",meaning:"Empezar con buen pie",type:"expression",category:"Expresiones",example:"I want to hit the ground running.",emotionalTip:"Empezar fuerte desde el primer día. La presión de demostrar tu valía rápido."},{word:"A steep learning curve",meaning:"Una curva de aprendizaje",type:"expression",category:"Expresiones",example:"This job has a steep learning curve.",emotionalTip:"Cuando todo es nuevo y te sientes abrumado. El estrés del principiante."},{word:"Touch base",meaning:"Ponerse en contacto",type:"expression",category:"Expresiones",example:"Let's touch base next week.",emotionalTip:"Mantener la conexión sin comprometerse a mucho. Networking ligero."},{word:"Get the ball rolling",meaning:"Poner algo en marcha",type:"expression",category:"Expresiones",example:"Let's get the ball rolling.",emotionalTip:"El impulso inicial que cuesta más que el resto. Superar la inercia."},{word:"Keep me in the loop",meaning:"Mantenme informado",type:"expression",category:"Expresiones",example:"Keep me in the loop, please.",emotionalTip:"No querer quedarte fuera de las decisiones. El miedo a ser ignorado."}]},{id:"c2-complete",name:"C2 - Proficiency Pack",icon:"fa-crown",description:"Para impresionar: verbos precisos de alto nivel, conectores para argumentar con elegancia, phrasal verbs sutiles e idioms para sonar como un nativo educado.",level:"C2",words:[{word:"Anticipate",meaning:"Anticipar / Prever",type:"word",category:"Verbos",example:"We didn't anticipate this problem.",emotionalTip:"No ver venir algo que te golpea. La frustración de no haber preparado nada."},{word:"Undermine",meaning:"Socavar / Minar",type:"word",category:"Verbos",example:"Don't undermine my authority.",emotionalTip:"Cuando alguien destruye tu trabajo en silencio. La traición que no ves hasta que es tarde."},{word:"Advocate",meaning:"Defender / Abogar por",type:"word",category:"Verbos",example:"I advocate for change.",emotionalTip:"Luchar por algo en lo que crees aunque nadie te escuche. Convicción solitaria."},{word:"Tackle",meaning:"Abordar / Hacer frente a",type:"word",category:"Verbos",example:"Let's tackle this problem.",emotionalTip:"Lanzarte contra un problema con determinación. Sin miedo, a por todas."},{word:"Navigate",meaning:"Navegar / Manejarse en",type:"word",category:"Verbos",example:"It's hard to navigate office politics.",emotionalTip:"Moverte en situaciones complicadas sin hundirte. El arte de sobrevivir."},{word:"Thrive",meaning:"Prosperar / Florecer",type:"word",category:"Verbos",example:"She thrives under pressure.",emotionalTip:"No solo sobrevivir sino brillar. Cuando la adversidad te hace más fuerte."},{word:"Resonate",meaning:"Resonar / Conectar (con)",type:"word",category:"Verbos",example:"This message resonates with me.",emotionalTip:"Cuando algo te toca por dentro sin saber por qué. Conexión profunda e inexplicable."},{word:"Overlook",meaning:"Pasar por alto / Ignorar",type:"word",category:"Verbos",example:"Don't overlook the details.",emotionalTip:"No ver algo que estaba delante de ti. El error que pudiste evitar."},{word:"Embrace",meaning:"Abrazar / Aceptar",type:"word",category:"Verbos",example:"Embrace change.",emotionalTip:"Aceptar algo que te asusta en lugar de huir. La valentía de abrirse."},{word:"Streamline",meaning:"Simplificar / Optimizar",type:"word",category:"Verbos",example:"We need to streamline the process.",emotionalTip:"Eliminar lo innecesario para quedarte solo con lo esencial. Claridad mental."},{word:"Be that as it may",meaning:"Sea como sea",type:"connector",category:"Conectores",example:"Be that as it may, we still need to act.",emotionalTip:"Aceptar una realidad incómoda pero actuar igual. Pragmatismo maduro."},{word:"More often than not",meaning:"La mayoría de las veces",type:"connector",category:"Conectores",example:"More often than not, he's right.",emotionalTip:"Reconocer que alguien suele tener razón aunque te cueste admitirlo."},{word:"By and large",meaning:"En general",type:"connector",category:"Conectores",example:"By and large, people are kind.",emotionalTip:"Creer que el mundo es bueno a pesar de las excepciones. Optimismo informado."},{word:"All things considered",meaning:"Teniendo todo en cuenta",type:"connector",category:"Conectores",example:"All things considered, it was a success.",emotionalTip:"El balance final después de pesar lo bueno y lo malo. Perspectiva completa."},{word:"For the most part",meaning:"En su mayor parte",type:"connector",category:"Conectores",example:"For the most part, I agree.",emotionalTip:"Estar de acuerdo pero con matices. No todo es blanco o negro."},{word:"On balance",meaning:"Sopesándolo todo",type:"connector",category:"Conectores",example:"On balance, it was worth it.",emotionalTip:"Decidir que valió la pena a pesar del sufrimiento. Paz después de la tormenta."},{word:"As it turns out",meaning:"Resulta que",type:"connector",category:"Conectores",example:"As it turns out, I was wrong.",emotionalTip:"Descubrir que te equivocabas. La humildad de aceptar otro final."},{word:"Needless to say",meaning:"Ni que decir tiene",type:"connector",category:"Conectores",example:"Needless to say, I was shocked.",emotionalTip:"Algo tan obvio que no debería tener que decirlo. Pero lo dices igual."},{word:"Notwithstanding",meaning:"No obstante / A pesar de",type:"connector",category:"Conectores",example:"Notwithstanding the law, he did it.",emotionalTip:"Actuar a pesar de los obstáculos. Determinación que ignora las barreras."},{word:"With that in mind",meaning:"Teniendo eso en cuenta",type:"connector",category:"Conectores",example:"With that in mind, let's continue.",emotionalTip:"Considerar algo importante antes de seguir adelante. Prudencia estratégica."},{word:"Brush off",meaning:"Ignorar / No hacer caso",type:"phrasal",category:"Phrasal Verbs",example:"Don't brush off my concerns.",emotionalTip:"Que te ignoren cuando intentas expresar algo importante. El desprecio que duele."},{word:"Chime in",meaning:"Intervenir / Meter baza",type:"phrasal",category:"Phrasal Verbs",example:"Feel free to chime in.",emotionalTip:"Unirte a una conversación aportando tu perspectiva. El coraje de opinar."},{word:"Pan out",meaning:"Resultar / Salir",type:"phrasal",category:"Phrasal Verbs",example:"Let's see how things pan out.",emotionalTip:"Esperar a ver cómo termina algo. La incertidumbre del futuro."},{word:"Touch on",meaning:"Tocar / Mencionar brevemente",type:"phrasal",category:"Phrasal Verbs",example:"I'd like to touch on one point.",emotionalTip:"Mencionar algo sin profundizar. Dejar temas abiertos a propósito."},{word:"Zone out",meaning:"Desconectar / Quedarse en blanco",type:"phrasal",category:"Phrasal Verbs",example:"Sorry, I zoned out for a moment.",emotionalTip:"Cuando tu mente se va sin permiso. La desconexión involuntaria."},{word:"Play up",meaning:"Exagerar / Dar problemas",type:"phrasal",category:"Phrasal Verbs",example:"My back is playing up again.",emotionalTip:"Cuando algo te falla justo cuando menos lo necesitas. La traición del cuerpo."},{word:"Kick in",meaning:"Empezar a hacer efecto",type:"phrasal",category:"Phrasal Verbs",example:"The coffee is starting to kick in.",emotionalTip:"El momento en que empiezas a sentir el efecto. El alivio que llega."},{word:"Wind down",meaning:"Relajarse / Ir terminando",type:"phrasal",category:"Phrasal Verbs",example:"Time to wind down for the day.",emotionalTip:"El ritual de bajar revoluciones al final del día. Soltar la tensión."},{word:"Mull over",meaning:"Darle vueltas a",type:"phrasal",category:"Phrasal Verbs",example:"I need to mull it over.",emotionalTip:"Pensar algo una y otra vez antes de decidir. La mente que no descansa."},{word:"Stumble upon",meaning:"Encontrar por casualidad",type:"phrasal",category:"Phrasal Verbs",example:"I stumbled upon this article.",emotionalTip:"Descubrir algo valioso sin buscarlo. Los regalos del azar."},{word:"The elephant in the room",meaning:"El tema incómodo que nadie menciona",type:"expression",category:"Expresiones",example:"Let's address the elephant in the room.",emotionalTip:"Ese problema enorme que todos ven pero nadie quiere tocar. La tensión silenciosa."},{word:"A blessing in disguise",meaning:"Una bendición disfrazada",type:"expression",category:"Expresiones",example:"Losing that job was a blessing in disguise.",emotionalTip:"Algo terrible que acabó siendo lo mejor que te pasó. Gratitud inesperada."},{word:"Break the ice",meaning:"Romper el hielo",type:"expression",category:"Expresiones",example:"Let's play a game to break the ice.",emotionalTip:"El primer paso incómodo para conectar con desconocidos. Valentía social."},{word:"Hit the nail on the head",meaning:"Dar en el clavo",type:"expression",category:"Expresiones",example:"You hit the nail on the head.",emotionalTip:"Cuando alguien dice exactamente lo que pensabas. Sentirte comprendido."},{word:"Easier said than done",meaning:"Del dicho al hecho hay un trecho",type:"expression",category:"Expresiones",example:"Getting fit is easier said than done.",emotionalTip:"La distancia enorme entre la intención y la acción. Frustrarse con uno mismo."},{word:"The ball is in your court",meaning:"Te toca a ti",type:"expression",category:"Expresiones",example:"I made my offer, the ball is in your court.",emotionalTip:"Cuando la decisión depende de ti y no puedes evitarla. La presión de elegir."},{word:"Read the room",meaning:"Leer el ambiente",type:"expression",category:"Expresiones",example:"You need to learn to read the room.",emotionalTip:"Captar lo que los demás sienten sin que lo digan. Inteligencia emocional."},{word:"Miss the boat",meaning:"Perder la oportunidad",type:"expression",category:"Expresiones",example:"If you don't apply now, you'll miss the boat.",emotionalTip:"Ver cómo la oportunidad se aleja sin ti. El arrepentimiento de no actuar."},{word:"Put your foot in your mouth",meaning:"Meter la pata",type:"expression",category:"Expresiones",example:"I really put my foot in my mouth there.",emotionalTip:"Decir algo terrible sin darte cuenta. La vergüenza instantánea."},{word:"Under the weather",meaning:"Pachucho / Indispuesto",type:"expression",category:"Expresiones",example:"I'm feeling a bit under the weather.",emotionalTip:"No estar enfermo pero tampoco bien. Ese malestar vago que no puedes explicar."}]}],ca={accent:"en-US",speed:1};function pe(){return X().tts||ca}function we(e){const t=X();t.tts={...pe(),...e},qe(t)}function H(e,t={}){if(!("speechSynthesis"in window)){q("Error","Tu navegador no soporta síntesis de voz.","error");return}window.speechSynthesis.cancel();const a=pe(),o=t.accent||a.accent,n=t.speed||a.speed,i=new SpeechSynthesisUtterance(e);i.lang=o,i.rate=n;const s=window.speechSynthesis.getVoices(),d=s.find(l=>l.lang.startsWith(o.substring(0,2))&&l.lang===o&&(l.name.includes("Google")||l.name.includes("Premium")||l.name.includes("Microsoft")))||s.find(l=>l.lang===o);d&&(i.voice=d),i.onerror=l=>{console.error("TTS Error:",l),q("Error","No se pudo reproducir el audio.","error")},window.speechSynthesis.speak(i)}function da(e){return{"en-US":"🇺🇸 Americano","en-GB":"🇬🇧 Británico"}[e]||e}function pa(e){return e<=.6?"🐢 Muy lento":e<=.8?"🐌 Lento":e<=1.1?"🎯 Normal":e<=1.3?"🐇 Rápido":"⚡ Muy rápido"}function ua(e,t){const a=document.createElement("div");a.className="word-card",a.dataset.wordId=e.id;const o=e.reviewCount||0,n=e.createdAt?new Date(e.createdAt).toLocaleDateString():"",i=_e(e),s=Ye(e),d=Fe(e);return a.innerHTML=`
    ${e.image?`<img src="${e.image}" alt="${e.word}" class="word-image" />`:""}

    <div class="tags">
      <span class="tag type-tag type-${e.type}">${ga(e.type)}</span>
      <span class="tag mastery-tag ${i.class}" title="${i.label}">
        <i class="fa-solid ${i.icon}"></i>
        ${i.label}
      </span>
      ${d?`<span class="tag due-tag"><i class="fa-solid fa-clock"></i> ${s}</span>`:""}
      ${e.category?`<span class="tag category-tag"><i class="fa-solid fa-folder"></i> ${e.category}</span>`:""}
    </div>

    <div class="mastery-progress-bar ${i.class}">
      <div class="mastery-progress-fill" style="width: ${i.percent}%"></div>
    </div>

    <div class="word-info">
      <div class="word-header-row">
        <h3>${e.word}</h3>
        <button class="speak-btn" title="Escuchar pronunciación">
          <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>
      <p class="meaning-text">${e.meaning}</p>

      ${e.emotion?`
        <div class="card-section emotion-section">
          <p class="section-label"><i class="fa-solid fa-heart"></i> Asociación emocional</p>
          <p class="emotion-text">${e.emotion}</p>
        </div>`:""}

      ${e.example?`
        <div class="card-section example-section">
          <p class="section-label"><i class="fa-solid fa-quote-left"></i> Ejemplo</p>
          <p class="example">${e.example}</p>
        </div>`:""}
      
      <div class="word-meta">
        ${o>0?`<span class="meta-item"><i class="fa-solid fa-chart-simple"></i> ${o} repasos</span>`:""}
        ${!d&&e.nextReviewAt?`<span class="meta-item next-review"><i class="fa-solid fa-calendar-check"></i> Próximo: ${s}</span>`:""}
        ${n?`<span class="meta-item"><i class="fa-regular fa-calendar"></i> ${n}</span>`:""}
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
  `,a.querySelector(".speak-btn").addEventListener("click",l=>{l.stopPropagation(),H(e.word)}),a.querySelector(".toggle").addEventListener("click",()=>{e.remembered=!e.remembered,le(e),t()}),a.querySelector(".delete").addEventListener("click",()=>{confirm(`¿Eliminar "${e.word}"?`)&&(He(e.id),t())}),a.querySelector(".edit-btn").addEventListener("click",()=>{ma(e,t)}),a}function ma(e,t){document.querySelector(".edit-modal")?.remove();const a=document.createElement("div");a.className="edit-modal",a.innerHTML=`
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
            <input type="text" id="edit-word" value="${O(e.word)}" required />
          </div>
          <div class="form-field">
            <label><i class="fa-solid fa-language"></i> Significado</label>
            <input type="text" id="edit-meaning" value="${O(e.meaning)}" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label><i class="fa-solid fa-tag"></i> Tipo</label>
            <select id="edit-type">
              <option value="word" ${e.type==="word"?"selected":""}>Palabra</option>
              <option value="phrasal" ${e.type==="phrasal"?"selected":""}>Phrasal verb</option>
              <option value="expression" ${e.type==="expression"?"selected":""}>Expresión</option>
              <option value="connector" ${e.type==="connector"?"selected":""}>Conector</option>
            </select>
          </div>
          <div class="form-field">
            <label><i class="fa-solid fa-folder"></i> Categoría</label>
            <input type="text" id="edit-category" value="${O(e.category||"")}" />
          </div>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-heart"></i> Asociación emocional</label>
          <textarea id="edit-emotion" rows="3">${O(e.emotion||"")}</textarea>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-quote-left"></i> Ejemplo</label>
          <input type="text" id="edit-example" value="${O(e.example||"")}" />
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-image"></i> Imagen</label>
          <div class="image-tabs">
            <button type="button" class="image-tab active" data-tab="url"><i class="fa-solid fa-link"></i> URL</button>
            <button type="button" class="image-tab" data-tab="upload"><i class="fa-solid fa-upload"></i> Subir</button>
          </div>
          <div class="image-tab-content" id="tab-url">
            <input type="url" id="edit-image" value="${O(e.image||"")}" placeholder="https://ejemplo.com/imagen.jpg" />
          </div>
          <div class="image-tab-content" id="tab-upload" style="display: none;">
            <div class="file-dropzone" id="edit-dropzone">
              <input type="file" id="edit-image-file" accept="image/*" />
              <div class="dropzone-content">
                <i class="fa-solid fa-cloud-arrow-up"></i>
                <span class="dropzone-text">Arrastra una imagen aquí</span>
                <span class="dropzone-subtext">o haz clic para seleccionar</span>
              </div>
            </div>
          </div>
          ${e.image?`<div class="image-preview-mini"><img src="${O(e.image)}" alt="Preview" /></div>`:""}
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-cancel">Cancelar</button>
          <button type="submit" class="btn-save"><i class="fa-solid fa-check"></i> Guardar cambios</button>
        </div>
        <div class="edit-feedback" style="display: none; color: var(--danger); font-size: 0.9rem; margin-top: 1rem; text-align: center;"></div>
      </form>
    </div>
  `,document.body.appendChild(a),requestAnimationFrame(()=>{a.classList.add("active")});const o=()=>{a.classList.remove("active"),setTimeout(()=>a.remove(),300)};a.querySelector(".modal-overlay").addEventListener("click",o),a.querySelector(".modal-close").addEventListener("click",o),a.querySelector(".btn-cancel").addEventListener("click",o);let n=null;a.querySelectorAll(".image-tab").forEach(l=>{l.addEventListener("click",()=>{a.querySelectorAll(".image-tab").forEach(r=>r.classList.remove("active")),l.classList.add("active");const p=l.dataset.tab;a.querySelector("#tab-url").style.display=p==="url"?"block":"none",a.querySelector("#tab-upload").style.display=p==="upload"?"block":"none"})});const i=a.querySelector("#edit-image-file"),s=a.querySelector("#edit-dropzone");if(i&&s){let l=function(p){const r=new FileReader;r.onload=b=>{n=b.target.result,s.classList.add("has-file");const g=s.querySelector(".dropzone-text"),T=s.querySelector(".dropzone-subtext");g&&(g.textContent=p.name),T&&(T.textContent=`${(p.size/1024).toFixed(1)} KB`);let c=a.querySelector(".image-preview-mini");c||(c=document.createElement("div"),c.className="image-preview-mini",s.parentElement.after(c)),c.innerHTML=`<img src="${n}" alt="Preview" />`},r.readAsDataURL(p)};var d=l;["dragenter","dragover"].forEach(p=>{s.addEventListener(p,r=>{r.preventDefault(),s.classList.add("dragover")})}),["dragleave","drop"].forEach(p=>{s.addEventListener(p,r=>{r.preventDefault(),s.classList.remove("dragover")})}),s.addEventListener("drop",p=>{const r=p.dataTransfer.files[0];r&&r.type.startsWith("image/")&&l(r)}),i.addEventListener("change",p=>{const r=p.target.files[0];r&&l(r)})}a.querySelector(".edit-form").addEventListener("submit",l=>{l.preventDefault();const p=document.getElementById("edit-word").value.trim(),r=a.querySelector(".edit-feedback");if(Se(p,e.id)){r.textContent=`La palabra "${p}" ya existe.`,r.style.display="block";return}e.word=p,e.meaning=document.getElementById("edit-meaning").value.trim(),e.type=document.getElementById("edit-type").value,e.category=document.getElementById("edit-category").value.trim()||null,e.emotion=document.getElementById("edit-emotion").value.trim(),e.example=document.getElementById("edit-example").value.trim(),n?e.image=n:e.image=document.getElementById("edit-image").value.trim(),le(e),o(),t()}),document.addEventListener("keydown",function l(p){p.key==="Escape"&&(o(),document.removeEventListener("keydown",l))})}function O(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function ga(e){switch(e){case"word":return'<i class="fa-solid fa-font"></i> Palabra';case"phrasal":return'<i class="fa-solid fa-link"></i> Phrasal Verb';case"expression":return'<i class="fa-solid fa-comment"></i> Expresión';case"connector":return'<i class="fa-solid fa-arrows-left-right"></i> Conector';default:return'<i class="fa-solid fa-file"></i> Otro'}}function re(e){const t=ce(),a=Te(),o=se(),n=24,i=2*Math.PI*n,s=Math.min(o.dailyGoal.count/o.dailyGoal.target,1),d=i-s*i,l=t.total>0;e.innerHTML=`
    <!-- Dynamic Content: Hero or Dashboard -->
    ${l?`
      <!-- Gamification Hub -->
      <div class="gamification-hub animate__animated animate__fadeIn">
        
        <!-- Level Card -->
        <div class="stat-card level-card">
           <div class="icon-bg level"><i class="fa-solid fa-trophy"></i></div>
           <div class="stat-content full">
              <div class="stat-header-row">
                 <span class="stat-label">Nivel Actual</span>
                 <span class="stat-value-sm">Lvl ${o.level}</span>
              </div>
              
              <div class="xp-progress-container">
                 <div class="xp-bar" style="width: ${fa(o.totalXp,o.level)}%"></div>
              </div>
              <div class="xp-meta">
                 <span>${o.totalXp} XP Totales</span>
                 <span>Siguiente: ${va(o.level)} XP</span>
              </div>
           </div>
        </div>

        <!-- Streak Card -->
        <div class="stat-card streak-card">
          <div class="icon-bg flame"><i class="fa-solid fa-fire"></i></div>
          <div class="stat-content">
            <span class="stat-value">${o.streak} <small>días</small></span>
            <span class="stat-label">Racha Actual</span>
            ${o.streak>0?'<div class="streak-badge active">¡En llamas! <i class="fa-solid fa-fire-flame-curved"></i></div>':'<div class="streak-badge">¡Empieza hoy!</div>'}
          </div>
        </div>
        
        <!-- Daily Goal Card -->
        <div class="stat-card daily-goal-card">
          <button class="goal-settings-btn" id="goal-settings-btn" title="Cambiar meta diaria">
            <i class="fa-solid fa-gear"></i>
          </button>
          <div class="stat-content">
             <span class="stat-value">${o.dailyGoal.count}<span class="separator">/</span>${o.dailyGoal.target}</span>
             <span class="stat-label">Meta Diaria</span>
             <span class="goal-msg-sm">${ya(o.dailyGoal.count,o.dailyGoal.target)}</span>
          </div>
          <div class="progress-ring-mini">
             <svg width="60" height="60">
              <circle class="bg" stroke-width="4" fill="transparent" r="${n}" cx="30" cy="30" />
              <circle class="fg" stroke-width="4" fill="transparent" r="${n}" cx="30" cy="30" 
                style="stroke-dasharray: ${i}; stroke-dashoffset: ${d};" />
            </svg>
             ${o.dailyGoal.count>=o.dailyGoal.target?'<div class="check-mark"><i class="fa-solid fa-check"></i></div>':""}
          </div>
        </div>
      </div>


    `:`
      <div class="welcome-hero">
        <div class="hero-content">
          <div class="hero-icon">
            <i class="fa-solid fa-layer-group"></i>
          </div>
          <h1>Domina el inglés <br/>usando tus recuerdos.</h1>
          <p>Conecta cada palabra con un recuerdo personal. La ciencia demuestra que las emociones multiplican tu memoria por 10.</p>
          
          <div class="hero-actions">
            <button class="primary-hero-btn" onclick="document.querySelector('[data-view=add]').click()">
              <i class="fa-solid fa-plus"></i> Añadir mi primera palabra
            </button>
            <button class="secondary-hero-btn" id="explore-packs-btn">
              <i class="fa-solid fa-download"></i> Explorar packs
            </button>
          </div>
        </div>
      </div>
    `}

    <h2 class="${l?"":"hidden"}" style="margin-bottom: 1.5rem;">Tu vocabulario</h2>
    
    <!-- Search and Controls Bar (Hidden if empty) -->
    <div class="controls-bar ${l?"":"hidden"}">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input type="text" id="search-input" placeholder="Buscar palabra, significado, ejemplo..." />
        <button id="clear-search" class="clear-btn" style="display: none;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      
      <div class="action-buttons">
        <button id="add-packs-btn" class="action-btn" title="Añadir packs">
          <i class="fa-solid fa-gift"></i>
          <span>Packs</span>
        </button>
        <button id="export-btn" class="action-btn" title="Exportar datos">
          <i class="fa-solid fa-download"></i>
          <span>Exportar</span>
        </button>
        <button id="import-btn" class="action-btn" title="Importar datos">
          <i class="fa-solid fa-upload"></i>
          <span>Importar</span>
        </button>
      </div>
    </div>
    
    <!-- Filters (Hidden if empty) -->
    <div class="filters ${l?"":"hidden"}">
      <div class="filter-group">
        <i class="fa-solid fa-trophy filter-icon"></i>
        <select id="filter-mastery">
          <option value="all">Todos los niveles</option>
          <option value="due">🔔 Pendientes (${t.dueForReview})</option>
          <option value="new">🌱 Nuevo</option>
          <option value="apprentice">🌿 Aprendiz</option>
          <option value="guru">🌳 Experto</option>
          <option value="master">👑 Maestro</option>
        </select>
      </div>
      <div class="filter-group">
        <i class="fa-solid fa-shapes filter-icon"></i>
        <select id="filter-type">
          <option value="all">Todos los tipos</option>
          <option value="word">Palabras</option>
          <option value="phrasal">Phrasal verbs</option>
          <option value="expression">Expresiones</option>
          <option value="connector">Conectores</option>
        </select>
      </div>
      <div class="filter-group">
        <i class="fa-solid fa-folder-tree filter-icon"></i>
        <select id="filter-category">
          <option value="all">Todas las categorías</option>
          ${a.map(u=>`<option value="${u}">${u}</option>`).join("")}
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
    
    <!-- Hidden file input for import (JSON and CSV) -->
    <input type="file" id="import-file" accept=".json,.csv" style="display: none;" />
  `;const p=document.getElementById("word-list"),r=document.getElementById("filter-mastery"),b=document.getElementById("filter-type"),g=document.getElementById("filter-category"),T=document.getElementById("sort-by"),c=document.getElementById("search-input"),w=document.getElementById("clear-search"),L=document.getElementById("results-info"),A=document.getElementById("export-btn"),B=document.getElementById("import-btn"),C=document.getElementById("add-packs-btn"),z=document.getElementById("import-file");function $(){p.innerHTML="";let u=c.value.trim()?Ge(c.value.trim()):P();const k=Date.now();u=u.filter(v=>{let h=!0;r.value!=="all"&&(r.value==="due"?h=!v.nextReviewAt||v.nextReviewAt<=k:h=Le(v)===r.value);const E=b.value==="all"||v.type===b.value,m=g.value==="all"||v.category===g.value;return h&&E&&m}),u=Oe(u,T.value);const x=P().length;if(c.value.trim()?(L.innerHTML=`<span class="results-count">${u.length} resultados</span> para "<strong>${c.value}</strong>"`,L.style.display="block"):u.length!==x?(L.innerHTML=`<span class="results-count">${u.length} de ${x}</span> palabras`,L.style.display="block"):L.style.display="none",u.length===0){p.innerHTML=`
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-book-open"></i></div>
          <h3>${c.value.trim()?"No se encontraron resultados":"Tu vocabulario está vacío"}</h3>
          <p>${c.value.trim()?"Intenta con otra búsqueda.":"Empieza añadiendo tu primera palabra o carga un pack de inicio para arrancar."}</p>
          
          ${c.value.trim()?"":`
            <div class="empty-actions">
              <button class="add-word-btn" onclick="document.querySelector('[data-view=add]').click()">
                <i class="fa-solid fa-plus"></i> Añadir mi primera palabra
              </button>
            </div>
            
            <div class="starter-packs-section">
              <div class="packs-header">
                <h4>O elige packs para empezar:</h4>
                <button id="import-packs-btn" class="import-packs-btn" disabled>
                  Selecciona packs
                </button>
              </div>
              <div class="starter-packs-grid">
                ${R.map(h=>`
                  <div class="pack-card" data-pack-id="${h.id}">
                    <div class="pack-check"><i class="fa-solid fa-circle-check"></i></div>
                    <div class="pack-icon"><i class="fa-solid ${h.icon}"></i></div>
                    <div class="pack-info">
                      <h4>${h.name}</h4>
                      <p>${h.description}</p>
                      <div class="pack-count"><i class="fa-solid fa-layer-group"></i> ${h.words.length} palabras</div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `}
        </div>
      `;const v=p.querySelector("#import-packs-btn");if(v){let h=new Set;const E=()=>{const m=h.size;if(v.disabled=m===0,m===0)v.textContent="Selecciona packs",v.classList.remove("active");else{let S=0;h.forEach(M=>{const V=R.find(J=>J.id===M);V&&(S+=V.words.length)}),v.innerHTML=`<i class="fa-solid fa-download"></i> Añadir ${m} pack${m>1?"s":""} (${S} palabras)`,v.classList.add("active")}};p.querySelectorAll(".pack-card").forEach(m=>{m.addEventListener("click",()=>{const S=m.dataset.packId;h.has(S)?(h.delete(S),m.classList.remove("selected")):(h.add(S),m.classList.add("selected")),E()})}),v.addEventListener("click",()=>{if(h.size!==0&&confirm(`¿Añadir ${h.size} packs a tu vocabulario?`)){let m=[];h.forEach(V=>{const J=R.find(Ne=>Ne.id===V);J&&(m=m.concat(J.words))});const S=JSON.stringify({words:m}),M=ae(S);M.success?(q("Packs añadidos",`¡Genial! Se han añadido ${M.imported} palabras nuevas.`,"success"),re(e)):q("Error","Hubo un problema al cargar los packs.","error")}})}}else u.forEach(v=>{p.appendChild(ua(v,$))})}r.addEventListener("change",$),b.addEventListener("change",$),g.addEventListener("change",$),T.addEventListener("change",$);let F;c.addEventListener("input",()=>{w.style.display=c.value?"flex":"none",clearTimeout(F),F=setTimeout($,300)}),w.addEventListener("click",()=>{c.value="",w.style.display="none",$()}),A.addEventListener("click",()=>{const u=Je(),k=new Blob([u],{type:"application/json"}),x=URL.createObjectURL(k),v=document.createElement("a");v.href=x,v.download=`emowords-backup-${new Date().toISOString().split("T")[0]}.json`,v.click(),URL.revokeObjectURL(x)}),C&&C.addEventListener("click",()=>{y()}),B.addEventListener("click",()=>{z.click()}),z.addEventListener("change",u=>{const k=u.target.files[0];if(!k)return;const x=k.name.toLowerCase().endsWith(".csv"),v=new FileReader;v.onload=h=>{const E=h.target.result;let m;if(x)if(m=Ze(E),m.success){let S=`${m.imported} palabras importadas.`;m.duplicates>0&&(S+=` ${m.duplicates} duplicadas omitidas.`),m.skipped>0&&(S+=` ${m.skipped} con errores.`),q("Importación CSV completada",S,"success"),setTimeout(()=>location.reload(),1500)}else q("Error de importación CSV",m.error,"error");else m=ae(E),m.success?(q("Importación completada",`${m.imported} palabras importadas.`,"success"),setTimeout(()=>location.reload(),1500)):q("Error de importación",m.error,"error")},v.readAsText(k),u.target.value=""});const j=document.getElementById("goal-settings-btn");j&&j.addEventListener("click",()=>{f()});const K=document.getElementById("explore-packs-btn");K&&K.addEventListener("click",()=>{y()});function y(){document.querySelector(".packs-modal")?.remove();let u=new Set;const k=document.createElement("div");k.className="packs-modal edit-modal",k.innerHTML=`
      <div class="modal-overlay"></div>
      <div class="modal-content" style="max-width: 700px;">
        <div class="modal-header">
          <h3><i class="fa-solid fa-layer-group"></i> Packs de Inicio</h3>
          <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <p style="padding: 0 1.5rem; color: var(--gray-500); margin-bottom: 1rem;">Selecciona los packs que quieras añadir a tu vocabulario:</p>
        <div class="packs-modal-grid">
          ${R.map(E=>{const m=localStorage.getItem("pack_"+E.id);return`
            <div class="pack-card-modal ${m?"added":""}" data-pack-id="${E.id}">
              <div class="pack-check"><i class="fa-solid ${m?"fa-check":"fa-circle-check"}"></i></div>
              <div class="pack-icon"><i class="fa-solid ${E.icon}"></i></div>
              <div class="pack-info">
                <h4>${E.name}</h4>
                <p>${E.description}</p>
                <div class="pack-count"><i class="fa-solid fa-layer-group"></i> ${E.words.length} palabras</div>
              </div>
            </div>
          `}).join("")}
        </div>
        <div class="modal-actions" style="padding: 1.5rem;">
          <button type="button" class="btn-cancel">Cancelar</button>
          <button type="button" class="btn-save btn-import-packs" disabled>Selecciona packs</button>
        </div>
      </div>
    `,document.body.appendChild(k),requestAnimationFrame(()=>{k.classList.add("active")});const x=()=>{k.classList.remove("active"),setTimeout(()=>k.remove(),300)};k.querySelector(".modal-overlay").addEventListener("click",x),k.querySelector(".modal-close").addEventListener("click",x),k.querySelector(".btn-cancel").addEventListener("click",x);const v=k.querySelector(".btn-import-packs"),h=()=>{const E=u.size;if(v.disabled=E===0,E===0)v.textContent="Selecciona packs";else{let m=0;u.forEach(S=>{const M=R.find(V=>V.id===S);M&&(m+=M.words.length)}),v.innerHTML=`<i class="fa-solid fa-download"></i> Añadir ${E} pack${E>1?"s":""} (${m} palabras)`}};k.querySelectorAll(".pack-card-modal").forEach(E=>{E.classList.contains("added")||E.addEventListener("click",()=>{const m=E.dataset.packId;u.has(m)?(u.delete(m),E.classList.remove("selected")):(u.add(m),E.classList.add("selected")),h()})}),v.addEventListener("click",()=>{if(u.size===0)return;let E=[];u.forEach(S=>{const M=R.find(V=>V.id===S);M&&(E=[...E,...M.words],localStorage.setItem("pack_"+S,"true"))});const m=ae(JSON.stringify({words:E}));m.success?(q("¡Packs importados!",`Se añadieron ${m.imported} palabras.`,"success"),x(),setTimeout(()=>location.reload(),1e3)):q("Error",m.error,"error")})}function f(){document.querySelector(".goal-settings-modal")?.remove();const u=se().dailyGoal.target,k=[5,10,15,20,30,50],x=document.createElement("div");x.className="goal-settings-modal edit-modal",x.innerHTML=`
      <div class="modal-overlay"></div>
      <div class="modal-content" style="max-width: 400px;">
        <div class="modal-header">
          <h3><i class="fa-solid fa-bullseye"></i> Meta Diaria</h3>
          <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="goal-options-grid">
          ${k.map(h=>`
            <button class="goal-option ${h===u?"active":""}" data-value="${h}">
              <span class="goal-number">${h}</span>
              <span class="goal-label">palabras</span>
            </button>
          `).join("")}
        </div>
        <div class="modal-actions" style="margin-top: 1.5rem;">
          <button type="button" class="btn-cancel">Cancelar</button>
        </div>
      </div>
    `,document.body.appendChild(x),requestAnimationFrame(()=>{x.classList.add("active")});const v=()=>{x.classList.remove("active"),setTimeout(()=>x.remove(),300)};x.querySelector(".modal-overlay").addEventListener("click",v),x.querySelector(".modal-close").addEventListener("click",v),x.querySelector(".btn-cancel").addEventListener("click",v),x.querySelectorAll(".goal-option").forEach(h=>{h.addEventListener("click",()=>{const E=parseInt(h.dataset.value);Qe(E),q("Meta actualizada",`Tu nueva meta diaria es ${E} palabras.`,"success"),v(),re(e)})}),document.addEventListener("keydown",function h(E){E.key==="Escape"&&(v(),document.removeEventListener("keydown",h))})}$()}function va(e){return 100*Math.pow(e,2)}function fa(e,t){const a=100*Math.pow(t-1,2),n=100*Math.pow(t,2)-a,i=e-a;return Math.min(100,Math.max(0,i/n*100))}function ya(e,t){return e>=t?"¡Objetivo completado!":e>=t*.75?"¡Casi lo tienes!":e>=t*.5?"¡Ya vas por la mitad!":"¡Vamos a por ello!"}function ha(e){const t=Te();e.innerHTML=`
    <form id="add-word-form" class="form-grid">
      <div class="form-header">
        <h2 class="form-title-add"><i class="fa-solid fa-sparkles"></i> Añadir nueva palabra</h2>
        <p class="form-subtitle">Crea conexiones emocionales para recordar mejor</p>
        

      </div>
      
      <!-- Essential fields (always visible) -->
      <div class="essential-fields">
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
              <option value="connector">Conector</option>
            </select>
          </div>
          <div class="form-field">
            <label for="category">
              <i class="fa-solid fa-folder"></i> Categoría
            </label>
            <div class="category-input-wrapper">
              <input type="text" id="category" list="category-list" placeholder="Ej. Trabajo, Viajes..." autocomplete="off" />
              <datalist id="category-list">
                ${t.map(w=>`<option value="${w}">`).join("")}
              </datalist>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Optional fields -->
      
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
        <label>
          <i class="fa-solid fa-image"></i> Imagen asociativa
          <span class="optional">(opcional)</span>
        </label>
        
        <!-- Image source tabs -->
        <div class="image-source-tabs">
          <button type="button" class="image-tab active" data-tab="upload">
            <i class="fa-solid fa-upload"></i> Subir imagen
          </button>
          <button type="button" class="image-tab" data-tab="url">
            <i class="fa-solid fa-link"></i> URL de internet
          </button>
        </div>
        
        <!-- Upload tab content -->
        <div class="image-tab-content active" id="upload-content">
          <div class="upload-area" id="upload-area">
            <input type="file" id="image-file" accept="image/*" />
            <div class="upload-placeholder">
              <i class="fa-solid fa-cloud-arrow-up"></i>
              <span>Arrastra una imagen aquí</span>
              <span class="upload-hint">o haz clic para seleccionar</span>
            </div>
          </div>
          <small>Formatos: JPG, PNG, GIF, WebP (máx. 2MB)</small>
        </div>
        
        <!-- URL tab content -->
        <div class="image-tab-content" id="url-content">
          <div class="image-input-wrapper">
            <input type="url" id="image-url" placeholder="https://ejemplo.com/imagen.jpg" />
            <button type="button" id="preview-url-btn" class="preview-btn" title="Vista previa">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
          <small>Pega la URL de cualquier imagen de internet</small>
        </div>
        
        <!-- Image preview (shared) -->
        <div id="image-preview" class="image-preview" style="display: none;">
          <img id="preview-img" src="" alt="Preview" />
          <button type="button" id="remove-preview" class="remove-preview-btn" title="Eliminar imagen">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <!-- Hidden input to store final image data -->
        <input type="hidden" id="image-data" />
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
  `;const a=document.getElementById("add-word-form"),o=document.getElementById("image-preview"),n=document.getElementById("preview-img"),i=document.getElementById("remove-preview"),s=document.getElementById("clear-form"),d=document.getElementById("image-data"),l=document.querySelectorAll(".image-tab"),p=document.querySelectorAll(".image-tab-content"),r=document.getElementById("upload-area"),b=document.getElementById("image-file"),g=document.getElementById("image-url"),T=document.getElementById("preview-url-btn");l.forEach(w=>{w.addEventListener("click",()=>{const L=w.dataset.tab;l.forEach(A=>A.classList.remove("active")),w.classList.add("active"),p.forEach(A=>{A.classList.remove("active"),A.id===`${L}-content`&&A.classList.add("active")})})}),r.addEventListener("click",()=>{b.click()}),r.addEventListener("dragover",w=>{w.preventDefault(),r.classList.add("dragover")}),r.addEventListener("dragleave",()=>{r.classList.remove("dragover")}),r.addEventListener("drop",w=>{w.preventDefault(),r.classList.remove("dragover");const L=w.dataTransfer.files;L.length>0&&c(L[0])}),b.addEventListener("change",w=>{w.target.files.length>0&&c(w.target.files[0])});function c(w){if(!w.type.startsWith("image/")){q("Archivo inválido","Por favor selecciona un archivo de imagen.","error");return}const L=2*1024*1024;if(w.size>L){q("Imagen muy grande","La imagen debe ser menor a 2MB.","error");return}const A=new FileReader;A.onload=B=>{const C=B.target.result;n.src=C,o.style.display="block",d.value=C,r.classList.add("has-file"),q("Imagen cargada","La imagen se ha cargado correctamente.","success")},A.onerror=()=>{q("Error","No se pudo leer la imagen.","error")},A.readAsDataURL(w)}T.addEventListener("click",()=>{const w=g.value.trim();w&&(n.src=w,o.style.display="block",d.value=w,n.onerror=()=>{o.style.display="none",d.value="",q("Error de imagen","No se pudo cargar la imagen. Verifica la URL.","warning")})}),g.addEventListener("keypress",w=>{w.key==="Enter"&&(w.preventDefault(),T.click())}),i.addEventListener("click",()=>{g.value="",b.value="",d.value="",o.style.display="none",n.src="",r.classList.remove("has-file")}),s.addEventListener("click",()=>{a.reset(),o.style.display="none",n.src="",d.value="",r.classList.remove("has-file")}),a.addEventListener("submit",w=>{w.preventDefault();const L=document.getElementById("word").value.trim(),A=document.getElementById("meaning").value.trim(),B=document.getElementById("type").value,C=document.getElementById("category").value.trim(),z=document.getElementById("emotion").value.trim(),$=document.getElementById("example").value.trim(),F=d.value.trim();if(!L||!A){q("Faltan datos","Por favor completa al menos la palabra y su significado.","error");return}if(Se(L)){q("Palabra duplicada",`La palabra "${L}" ya existe en tu vocabulario.`,"error");return}const j={id:Date.now(),word:L,meaning:A,type:B,category:C||null,emotion:z,example:$,image:F,remembered:!1};je(j),a.reset(),o.style.display="none",n.src="",d.value="",r.classList.remove("has-file"),q("¡Guardado!",`"${L}" se ha añadido correctamente.`,"success"),document.getElementById("word").focus()})}const ba="modulepreload",wa=function(e){return"/emowords/"+e},xe={},xa=function(t,a,o){let n=Promise.resolve();if(a&&a.length>0){let p=function(r){return Promise.all(r.map(b=>Promise.resolve(b).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};var s=p;document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),l=d?.nonce||d?.getAttribute("nonce");n=p(a.map(r=>{if(r=wa(r),r in xe)return;xe[r]=!0;const b=r.endsWith(".css"),g=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${g}`))return;const T=document.createElement("link");if(T.rel=b?"stylesheet":ba,b||(T.as="script"),T.crossOrigin="",T.href=r,l&&T.setAttribute("nonce",l),document.head.appendChild(T),b)return new Promise((c,w)=>{T.addEventListener("load",c),T.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${r}`)))})}))}function i(d){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=d,window.dispatchEvent(l),!l.defaultPrevented)throw d}return n.then(d=>{for(const l of d||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};function Ea(e){let t=null,a=null,o=!1,n=[],i={correct:0,incorrect:0,xp:0},s=new Map;const d=2;n=Xe(),j(n);function l(){e.innerHTML="",t||p()}function p(){const y=n.length;e.innerHTML=`
      <h2 style="text-align: center; justify-content: center; margin-bottom: 0.5rem;">Modo de Repaso</h2>
      <p style="text-align: center; color: var(--gray-500); margin-bottom: 2rem;">
        Tienes <strong style="color: var(--primary-600);">${y}</strong> palabras pendientes
      </p>
      
      ${y===0?`
        <div class="empty-review-state">
          <div class="empty-review-icon">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <h3>¡Todo al día!</h3>
          <p>No tienes palabras pendientes para repasar. Añade más vocabulario para seguir aprendiendo.</p>
          <div class="empty-review-actions">
            <button class="primary-btn" onclick="document.querySelector('[data-view=add]').click()">
              <i class="fa-solid fa-plus"></i> Añadir palabras
            </button>
            <button class="secondary-btn" id="explore-packs-review-btn">
              <i class="fa-solid fa-download"></i> Explorar packs
            </button>
          </div>
        </div>
      `:""}
      
      <div class="mode-grid">
        <div class="mode-card featured" data-mode="mixed">
          <div class="mode-badge">⭐ Recomendado</div>
          <div class="mode-icon"><i class="fa-solid fa-shuffle"></i></div>
          <div class="mode-title">Mixto</div>
          <div class="mode-desc">Combina todos los modos aleatoriamente. ¡La forma más completa de repasar!</div>
        </div>
        
        <div class="mode-card" data-mode="flashcard">
          <div class="mode-icon"><i class="fa-solid fa-layer-group"></i></div>
          <div class="mode-title">Flashcards</div>
          <div class="mode-desc">El método clásico. Voltea la tarjeta para ver la respuesta.</div>
        </div>
        
        <div class="mode-card" data-mode="quiz">
          <div class="mode-icon"><i class="fa-solid fa-list-check"></i></div>
          <div class="mode-title">Quiz</div>
          <div class="mode-desc">Selecciona la respuesta correcta entre 4 opciones.</div>
        </div>
        
        <div class="mode-card" data-mode="typing">
          <div class="mode-icon"><i class="fa-solid fa-keyboard"></i></div>
          <div class="mode-title">Escritura</div>
          <div class="mode-desc">Escribe la palabra correctamente. Mejora tu spelling.</div>
        </div>
        
        <div class="mode-card" data-mode="listening">
          <div class="mode-icon"><i class="fa-solid fa-headphones"></i></div>
          <div class="mode-title">Listening</div>
          <div class="mode-desc">Escucha la palabra y selecciona el significado correcto.</div>
        </div>
      </div>
    `,e.querySelectorAll(".mode-card").forEach(u=>{u.addEventListener("click",()=>{if(t=u.dataset.mode,console.log(`Starting mode: ${t} with queue size: ${n.length}`),n.length===0){q("Sin palabras","No hay palabras pendientes para repasar ahora.","info"),z(e);return}l(),r(),c()})});const f=e.querySelector("#explore-packs-review-btn");f&&f.addEventListener("click",()=>{document.querySelector("[data-view=home]").click(),setTimeout(()=>{const u=document.getElementById("explore-packs-btn");u&&u.click()},100)})}function r(){if(e.querySelector(".review-header"))return;const y=document.createElement("div");y.className="review-header",y.innerHTML=`
       <button class="back-btn" id="exit-mode" title="Salir"><i class="fa-solid fa-arrow-left"></i></button>
       <div class="review-progress">
         <div class="progress-stat" id="stat-queue">
           <i class="fa-solid fa-book progress-icon"></i>
           <span class="val">${n.length}</span>
         </div>
         <div class="progress-stat session-correct" id="stat-correct">
           <i class="fa-solid fa-check progress-icon"></i>
           <span class="val">${i.correct}</span>
         </div>
         <div class="progress-stat" style="color: var(--warning-600); background: var(--warning-50);" id="stat-xp">
           <i class="fa-solid fa-bolt progress-icon"></i>
           <span class="val">${i.xp} XP</span>
         </div>
       </div>
     `,e.insertBefore(y,e.firstChild),document.getElementById("exit-mode").addEventListener("click",k=>{k.preventDefault(),i.correct>0||i.incorrect>0?confirm("¿Salir del modo repaso? Tu progreso se perderá.")&&g():g()});const u=document.createElement("div");u.id="active-content",u.className="review-container",e.appendChild(u)}function b(){const y=document.querySelector("#stat-queue .val"),f=document.querySelector("#stat-correct .val"),u=document.querySelector("#stat-xp .val");y&&(y.textContent=n.length),f&&(f.textContent=i.correct),u&&(u.textContent=`${i.xp} XP`)}function g(){t=null,l()}function T(){return n.shift()||null}function c(){if(!t){l();return}const y=document.getElementById("active-content");if(!y){l();return}if(a=T(),!a){z(y);return}let f=t;if(t==="mixed"){const u=["flashcard","quiz","typing","listening"];f=u[Math.floor(Math.random()*u.length)]}switch(f){case"flashcard":w(y);break;case"quiz":L(y);break;case"typing":A(y);break;case"listening":B(y);break}}function w(y){o=!1,a.reviewCount,y.innerHTML=`
      <div class="review-card" id="review-card">
        <div class="review-card-inner">
           <div class="review-meta">
              <span class="tag type-tag">${K(a.type)}</span>
              ${a.category?`<span class="tag category-tag"><i class="fa-solid fa-folder"></i> ${a.category}</span>`:""}
           </div>

           <div class="review-header-row" style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 1rem;">
              <h3 class="review-word" style="margin-bottom: 0;">${a.word}</h3>
              <button class="speak-btn" id="review-speak-btn" title="Escuchar">
                <i class="fa-solid fa-volume-high"></i>
              </button>
           </div>
           
           ${a.image?`<img src="${a.image}" class="review-image" style="max-height: 200px; object-fit: contain; margin: 0 auto 1rem; display: block;" />`:""}

           <button id="show-answer" class="reveal-btn">
              <i class="fa-solid fa-eye"></i>
              <span>Mostrar respuesta</span>
           </button>
           
           <div id="review-answer" class="review-answer" style="display: none;">
              <div class="answer-content">
                <p class="meaning">${a.meaning}</p>
                ${a.example?`<p class="example">"${a.example}"</p>`:""}
              </div>
           </div>
        </div>
        
        <div class="review-actions" id="review-actions" style="margin-top: 1rem;">
           <button id="remembered-btn" class="review-btn success-btn" disabled><i class="fa-solid fa-circle-check"></i> Recordada</button>
           <button id="forgotten-btn" class="review-btn danger-btn" disabled><i class="fa-solid fa-circle-xmark"></i> Olvidada</button>
        </div>
      </div>
    `,document.getElementById("review-speak-btn").addEventListener("click",v=>{v.stopPropagation(),H(a.word)});const f=document.getElementById("show-answer"),u=document.getElementById("review-answer"),k=document.getElementById("remembered-btn"),x=document.getElementById("forgotten-btn");f.addEventListener("click",()=>{o=!0,u.style.display="block",f.style.display="none",k.disabled=!1,x.disabled=!1,u.classList.add("fade-in")}),k.addEventListener("click",()=>C(!0)),x.addEventListener("click",()=>C(!1)),F(v=>{v==="Space"&&!o&&f.click(),v==="ArrowRight"&&o&&C(!0),v==="ArrowLeft"&&o&&C(!1)})}function L(y){const u=P().filter(h=>h.id!==a.id).sort(()=>.5-Math.random()).slice(0,3),k=[a,...u];j(k),y.innerHTML=`
      <div class="quiz-container">
         <div class="quiz-question">
            <h3 class="quiz-word">${a.word}</h3>
            <button class="speak-btn" id="quiz-speak-btn" style="margin: 0 auto; width: 40px; height: 40px; font-size: 1.2rem;">
                <i class="fa-solid fa-volume-high"></i>
            </button>
         </div>

         <div class="quiz-options">
            ${k.map(h=>`
                <button class="quiz-option" data-id="${h.id}">
                    ${h.meaning}
                </button>
            `).join("")}
         </div>
      </div>
    `,document.getElementById("quiz-speak-btn").addEventListener("click",()=>H(a.word));const x=y.querySelectorAll(".quiz-option");let v=!1;x.forEach(h=>{h.addEventListener("click",()=>{if(v)return;v=!0,String(h.dataset.id)===String(a.id)?(h.classList.add("correct"),setTimeout(()=>C(!0),800)):(h.classList.add("wrong"),x.forEach(S=>{String(S.dataset.id)===String(a.id)&&S.classList.add("correct")}),setTimeout(()=>C(!1),1500))})})}function A(y){y.innerHTML=`
      <div class="typing-container">
         <div class="review-card-inner" style="margin-bottom: 2rem;">
             <p style="font-size: 1.5rem; margin-bottom: 0.5rem; font-weight:700; color:var(--primary-600);">${a.meaning}</p>
             ${a.example?`<p style="font-style:italic; color:var(--gray-500)">"${a.example.replace(new RegExp(a.word,"gi"),"___")}"</p>`:""}
         </div>
         
         <input type="text" class="typing-input" id="type-input" placeholder="Escribe la palabra en inglés..." autocomplete="off">
         
         <button id="check-btn" class="add-word-btn" style="width: 100%;">Comprobar</button>
         <button id="give-up-btn" style="background:none; border:none; color:var(--gray-500); margin-top:1rem; cursor:pointer;">No lo sé</button>
      </div>
    `,setTimeout(()=>document.getElementById("type-input").focus(),100);const f=document.getElementById("type-input"),u=document.getElementById("check-btn"),k=document.getElementById("give-up-btn");function x(){f.value.trim().toLowerCase()===a.word.toLowerCase()?(f.classList.add("correct"),u.innerHTML='<i class="fa-solid fa-check"></i> Correcto',H(a.word),setTimeout(()=>C(!0),1e3)):(f.classList.add("wrong"),H("Incorrect","en-US"),setTimeout(()=>f.classList.remove("wrong"),500))}u.addEventListener("click",x),f.addEventListener("keydown",v=>{v.key==="Enter"&&x()}),k.addEventListener("click",()=>{f.value=a.word,f.classList.add("wrong"),H(a.word),setTimeout(()=>C(!1),2e3)})}function B(y){const u=P().filter(m=>m.id!==a.id).sort(()=>.5-Math.random()).slice(0,3),k=[a,...u];j(k),y.innerHTML=`
      <div class="quiz-container">
         <div class="quiz-question">
            <div style="font-size: 4rem; color: var(--primary-500); cursor: pointer; margin-bottom: 1rem;" id="listen-icon">
                <i class="fa-solid fa-circle-play"></i>
            </div>
            <p style="color: var(--gray-500);">Escucha y selecciona el significado</p>
         </div>

         <div class="quiz-options">
            ${k.map(m=>`
                <button class="quiz-option" data-id="${m.id}">
                    ${m.meaning}
                </button>
            `).join("")}
         </div>
      </div>
    `;const x=document.getElementById("listen-icon"),v=()=>{x.style.transform="scale(0.9)",setTimeout(()=>x.style.transform="scale(1)",150),H(a.word)};x.addEventListener("click",v),setTimeout(v,500);const h=y.querySelectorAll(".quiz-option");let E=!1;h.forEach(m=>{m.addEventListener("click",()=>{if(E)return;E=!0,String(m.dataset.id)===String(a.id)?(m.classList.add("correct"),setTimeout(()=>C(!0),800)):(m.classList.add("wrong"),h.forEach(V=>{String(V.dataset.id)===String(a.id)&&V.classList.add("correct")}),setTimeout(()=>C(!1),1500))})})}function C(y){try{if(!a)return;if(Ke(a.id,y),y){i.correct++,i.xp+=10;try{he(1)}catch(f){console.error(f)}s.delete(a.id)}else{i.incorrect++;const f=s.get(a.id)||0;f<d&&(s.set(a.id,f+1),n.push(a))}a=null,b(),c()}catch(f){console.error("Error in handleResult:",f)}}function z(y){try{const f=i.incorrect===0&&i.correct>=5,u=he(0,{perfectSession:f}),k=document.querySelector(".review-header");k&&(k.style.display="none");let x;try{x=se()}catch{x={streak:0,dailyGoal:{count:0,target:20}}}const v=ce(),h=ea(v),E=aa(h);la(),y.innerHTML=`
          <div class="empty-review-state">
            <div class="empty-icon" style="color: var(--success-500); animation: bounce 1s infinite;"><i class="fa-solid fa-trophy"></i></div>
            <h3>¡Sesión completada!</h3>
            <p>Has ganado <strong style="color:var(--warning-500)">${i.xp} XP</strong></p>
            
            ${f?`
              <div class="perfect-session-badge" style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; padding: 0.5rem 1rem; border-radius: 999px; font-weight: 600; margin: 0.5rem 0;">
                <i class="fa-solid fa-star"></i> ¡Sesión Perfecta!
              </div>
            `:""}
            
            <div class="session-summary">
                <div class="summary-stats">
                  <span class="stat correct"><i class="fa-solid fa-circle-check"></i> ${i.correct}</span>
                  <span class="stat incorrect"><i class="fa-solid fa-circle-xmark"></i> ${i.incorrect}</span>
                </div>
            </div>
            
            <div class="streak-mini" style="margin: 1.5rem 0; padding: 1rem; background: #fffbeb; border-radius: 8px; border: 1px solid #fcd34d;">
                <p style="color: #b45309; font-weight: bold;"><i class="fa-solid fa-fire"></i> Racha: ${x.streak} días</p>
                <p style="font-size: 0.9rem; color: #92400e;">Meta diaria: ${x.dailyGoal.count} / ${x.dailyGoal.target}</p>
            </div>
    
            <button class="add-word-btn" id="finish-btn">Volver al inicio</button>
          </div>
        `,u.leveledUp&&setTimeout(()=>{sa(u.newLevel)},500),E.length>0&&setTimeout(()=>{$e(E)},u.leveledUp?5500:1e3),window.confetti||window.canvasConfetti?(window.confetti||window.canvasConfetti)({particleCount:100,spread:70,origin:{y:.6}}):xa(()=>import("./confetti.module-C2jkTI5u.js"),[]).then(S=>{const M=S.default;M({particleCount:100,spread:70,origin:{y:.6}})}).catch(S=>console.log("Confetti not found",S));const m=document.getElementById("finish-btn");m&&m.addEventListener("click",()=>{t=null;const S=document.querySelector('[data-view="home"]');S?S.click():l()})}catch(f){console.error("Error in renderSummary:",f),y.innerHTML='<p class="error">Error al mostrar resumen. <button onclick="location.reload()">Recargar</button></p>'}}let $=null;function F(y){$&&$();const f=u=>{document.getElementById("active-content")&&document.activeElement.tagName!=="INPUT"&&y(u.code)};document.addEventListener("keydown",f),$=()=>document.removeEventListener("keydown",f),window._reviewCleanup=$}function j(y){for(let f=y.length-1;f>0;f--){const u=Math.floor(Math.random()*(f+1));[y[f],y[u]]=[y[u],y[f]]}return y}function K(y){return{word:"Palabra",phrasal:"Phrasal Verb",expression:"Expresión",connector:"Conector"}[y]||"Otro"}l()}function ka(e){const t=P(),a=ce();if(e.innerHTML="",e.className="stats-view animate__animated animate__fadeIn",a.total===0){Ta(e);return}let o=0,n={master:0,guru:0,apprentice:0,new:0};t.forEach(r=>{const b=r.correctCount||0;b>=10?(o+=100,n.master++):b>=5?(o+=75,n.guru++):b>=2?(o+=40,n.apprentice++):(o+=10,n.new++)});const i=a.total>0?Math.round(o/a.total):0,s=La(t),d=Sa(t),l=qa(t),p=`
    <header class="dashboard-header" style="text-align: center;">
        <div class="header-content" style="display: flex; flex-direction: column; align-items: center;">
            <h2 class="title">Centro de Estadísticas</h2>
            <p class="subtitle">Visualiza tu evolución y optimiza tu aprendizaje</p>
        </div>
        <div class="global-grade">
            <span class="grade-label">Nivel General</span>
            <span class="grade-value ${Ia(i)}">${Ca(i)}</span>
        </div>
    </header>

    <!-- KPI Grid -->
    <div class="kpi-grid">
        <!-- Total Words -->
        <div class="kpi-card total-words">
            <div class="kpi-top">
                <div class="kpi-icon"><i class="fa-solid fa-book-open"></i></div>
                <div class="kpi-content">
                    <span class="value">${a.total}</span>
                    <span class="label">Palabras Totales</span>
                </div>
            </div>
            <div class="kpi-chart-mini">
                ${$a(s)}
            </div>
        </div>

        <!-- Mastery Gauge -->
        <div class="kpi-card mastery">
            <div class="kpi-top">
                <div class="kpi-icon"><i class="fa-solid fa-brain"></i></div>
                <div class="kpi-content">
                    <span class="value">${i}%</span>
                    <span class="label">Dominio del Vocabulario</span>
                </div>
            </div>
            <div class="circular-progress" style="--percent: ${i}">
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
                    <span class="value">${a.retentionRate}%</span>
                    <span class="label">Precisión de Repaso</span>
                </div>
            </div>
             <div class="progress-bar-mini">
                <div class="fill" style="width: ${a.retentionRate}%"></div>
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
                    ${Aa(s)}
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
                        ${Pa(d)}
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
                            <div class="lvl-bar"><div class="fill" style="width: ${Z(n.master,a.total)}%"></div></div>
                            <span class="lvl-count">${n.master}</span>
                        </div>
                        <div class="level-item guru">
                            <span class="lvl-name">Experto (5-9)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${Z(n.guru,a.total)}%"></div></div>
                            <span class="lvl-count">${n.guru}</span>
                        </div>
                        <div class="level-item apprentice">
                            <span class="lvl-name">Aprendiz (2-4)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${Z(n.apprentice,a.total)}%"></div></div>
                            <span class="lvl-count">${n.apprentice}</span>
                        </div>
                        <div class="level-item new">
                            <span class="lvl-name">Nuevo (0-1)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${Z(n.new,a.total)}%"></div></div>
                            <span class="lvl-count">${n.new}</span>
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
                    ${l.length>0?l.map(r=>`
                        <div class="struggling-item">
                            <div class="s-info">
                                <span class="s-word">${r.word}</span>
                                <span class="s-meaning">${r.meaning}</span>
                            </div>
                            <div class="s-metric">
                                <span class="error-badge">${r.incorrectCount} fallos</span>
                            </div>
                        </div>
                    `).join(""):'<div class="empty-state-mini">¡Todo va genial! No tienes palabras críticas.</div>'}
                </div>
                ${l.length>0?`
                   <!-- Potential future Feature: <button class="btn-secondary full-width-btn">Practicar Errores</button> -->
                `:""}
            </div>

            <!-- Achievements Section -->
            <div class="dashboard-card achievements-card">
                <div class="card-header">
                    <h3><i class="fa-solid fa-medal"></i> Logros</h3>
                    <span class="achievements-counter">${ie().unlocked}/${ie().total}</span>
                </div>
                <div class="achievements-progress-bar">
                    <div class="fill" style="width: ${ie().percent}%"></div>
                </div>
                <div class="achievements-mini-grid">
                    ${ta().slice(0,8).map(r=>`
                        <div class="achievement-mini ${r.unlocked?"unlocked":"locked"}" title="${r.name}: ${r.description}">
                            <i class="fa-solid ${r.icon}"></i>
                        </div>
                    `).join("")}
                </div>
                <button class="btn-secondary full-width-btn" id="view-all-achievements">Ver todos los logros</button>
            </div>

        </div>
    </div>
    
    <!-- Activity Heatmap Section -->
    <div class="dashboard-card heatmap-card">
        <div class="card-header">
            <h3><i class="fa-solid fa-calendar-days"></i> Actividad de Estudio</h3>
            <span class="period-badge">Últimos 3 meses</span>
        </div>
        <div class="heatmap-container" id="activity-heatmap">
            ${Ma(t)}
        </div>
        <div class="heatmap-legend">
            <span class="legend-label">Menos</span>
            <div class="legend-boxes">
                <div class="legend-box level-0"></div>
                <div class="legend-box level-1"></div>
                <div class="legend-box level-2"></div>
                <div class="legend-box level-3"></div>
                <div class="legend-box level-4"></div>
            </div>
            <span class="legend-label">Más</span>
        </div>
    </div>
    
    <!-- Prediction Card -->
    <div class="dashboard-card prediction-card">
        <div class="card-header">
            <h3><i class="fa-solid fa-crystal-ball"></i> Proyección de Progreso</h3>
        </div>
        <div class="prediction-content">
            ${Va(t,s)}
        </div>
    </div>
  `;e.innerHTML=p}function Ta(e){e.innerHTML=`
        <div class="empty-stats-enhanced">
            <div class="empty-stats-hero">
                <div class="empty-icon-container">
                    <i class="fa-solid fa-chart-line"></i>
                </div>
                <h2>Tu historia de aprendizaje empieza aquí</h2>
                <p>Añade tus primeras palabras y observa cómo crece tu dominio del inglés con el tiempo.</p>
            </div>
            
            <div class="benefits-grid">
                <div class="benefit-card">
                    <i class="fa-solid fa-brain"></i>
                    <h4>Memoria Visual</h4>
                    <p>Gráficos que muestran tu progreso real</p>
                </div>
                <div class="benefit-card">
                    <i class="fa-solid fa-fire"></i>
                    <h4>Racha de Estudio</h4>
                    <p>Mantén la constancia día a día</p>
                </div>
                <div class="benefit-card">
                    <i class="fa-solid fa-trophy"></i>
                    <h4>Logros</h4>
                    <p>Desbloquea medallas por tu esfuerzo</p>
                </div>
            </div>
            
            <div class="empty-stats-cta">
                <button class="primary-btn" onclick="document.querySelector('[data-view=add]').click()">
                    <i class="fa-solid fa-plus"></i> Añadir primera palabra
                </button>
                <button class="secondary-btn" id="explore-packs-stats-btn">
                    <i class="fa-solid fa-download"></i> Explorar packs
                </button>
            </div>
        </div>
    `;const t=e.querySelector("#explore-packs-stats-btn");t&&t.addEventListener("click",()=>{document.querySelector("[data-view=home]").click(),setTimeout(()=>{const a=document.getElementById("explore-packs-btn");a&&a.click()},100)})}function La(e){const t=[...e].sort((i,s)=>(i.createdAt||0)-(s.createdAt||0)),a=new Map;let o=0;t.forEach(i=>{o++;const s=new Date(i.createdAt||Date.now()).toISOString().split("T")[0];a.set(s,o)});const n=Array.from(a.entries()).map(([i,s])=>({date:i,count:s}));if(n.length>0&&n.length<2){const i=new Date(n[0].date);i.setDate(i.getDate()-1),n.unshift({date:i.toISOString().split("T")[0],count:0})}return n}function Sa(e){const t=["word","phrasal","expression","connector"],a={};return t.forEach(o=>{const n=e.filter(r=>r.type===o),i=n.length;if(i===0)return;let s=0,d=0;n.forEach(r=>{s+=r.correctCount||0,d+=r.incorrectCount||0});const l=s+d,p=l===0?0:Math.round(s/l*100);a[o]={count:i,accuracy:p}}),a}function qa(e){return[...e].filter(t=>(t.incorrectCount||0)>0).sort((t,a)=>{const o=t.incorrectCount/(t.reviewCount||1);return a.incorrectCount/(a.reviewCount||1)-o}).slice(0,5)}function Z(e,t){return t?Math.round(e/t*100):0}function Ca(e){return e>=90?"S":e>=80?"A":e>=60?"B":e>=40?"C":"D"}function Ia(e){return e>=90?"text-legendary":e>=80?"text-success":e>=60?"text-primary":e>=40?"text-warning":"text-danger"}function Aa(e){if(!e||e.length===0)return"";const t=800,a=300,o=20,n=e[e.length-1].count;if(n===0)return"";const i=e.map((p,r)=>{const b=r/(e.length-1)*(t-2*o)+o,g=a-(p.count/n*(a-2*o)+o);return`${b},${g}`}).join(" "),s=o,d=t-o,l=`${s},${a} ${i} ${d},${a}`;return`
        <svg viewBox="0 0 ${t} ${a}" class="svg-chart" preserveAspectRatio="none">
            <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="var(--primary-500)" stop-opacity="0.4"/>
                    <stop offset="100%" stop-color="var(--primary-500)" stop-opacity="0"/>
                </linearGradient>
            </defs>
            <!-- Grid Lines (Horizontal) -->
            <line x1="0" y1="${a-o}" x2="${t}" y2="${a-o}" stroke="var(--gray-800)" stroke-width="1" />
            <line x1="0" y1="${a/2}" x2="${t}" y2="${a/2}" stroke="var(--gray-800)" stroke-width="1" stroke-dasharray="5,5" />
            
            <!-- Area Fill -->
            <polygon points="${l}" fill="url(#chartGradient)" />
            
            <!-- Line -->
            <polyline points="${i}" fill="none" stroke="var(--primary-400)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `}function $a(e){if(!e||e.length<2)return"";const t=100,a=40,o=e[e.length-1].count,n=e.map((i,s)=>{const d=s/(e.length-1)*t,l=a-i.count/o*a;return`${d},${l}`}).join(" ");return`
        <svg viewBox="0 0 ${t} ${a}" class="sparkline" preserveAspectRatio="none">
             <polyline points="${n}" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
    `}function Pa(e){const t={word:"Palabras",phrasal:"Phrasal Verbs",expression:"Expresiones",connector:"Conectores"};return Object.entries(e).map(([a,o])=>`
        <div class="type-stat-row">
            <div class="row-header">
                <span class="t-name">${t[a]}</span>
                <span class="t-val">${o.count}</span>
            </div>
            <div class="row-bar-bg">
                <div class="row-bar-fill ${a}" style="width: ${o.accuracy}%"></div>
            </div>
            <div class="row-meta">Precisión: ${o.accuracy}%</div>
        </div>
    `).join("")}function Ma(e){const t=new Date,a=13,o=a*7,n=new Map;e.forEach(p=>{if(p.lastReviewedAt){const r=new Date(p.lastReviewedAt).toISOString().split("T")[0];n.set(r,(n.get(r)||0)+1)}if(p.createdAt){const r=new Date(p.createdAt).toISOString().split("T")[0];n.set(r,(n.get(r)||0)+1)}});const i=Math.max(...Array.from(n.values()),1);let s='<div class="heatmap-grid">';const d=new Date(t);d.setDate(d.getDate()-o+1);const l=d.getDay();d.setDate(d.getDate()-(l===0?6:l-1));for(let p=0;p<a;p++){s+='<div class="heatmap-week">';for(let r=0;r<7;r++){const b=new Date(d);b.setDate(d.getDate()+p*7+r);const g=b.toISOString().split("T")[0],T=n.get(g)||0,c=T===0?0:Math.min(4,Math.ceil(T/i*4)),w=b>t;s+=`<div class="heatmap-day level-${w?"future":c}" title="${g}: ${T} actividades"></div>`}s+="</div>"}return s+="</div>",s}function Va(e,t){const a=e.length;if(a<2||t.length<2)return`
            <div class="prediction-placeholder">
                <i class="fa-solid fa-chart-line"></i>
                <p>Añade más palabras para ver tu proyección de progreso</p>
            </div>
        `;const o=t[0]?.date?new Date(t[0].date):new Date,n=t[t.length-1]?.date?new Date(t[t.length-1].date):new Date,i=Math.max(1,Math.ceil((n-o)/(1440*60*1e3))),s=a/i,d=Math.round(a+s*30),l=Math.round(a+s*90),p=a<500?Math.ceil((500-a)/s):0,r=a<1e3?Math.ceil((1e3-a)/s):0;return`
        <div class="prediction-stats">
            <div class="pred-stat">
                <span class="pred-value">${s.toFixed(1)}</span>
                <span class="pred-label">palabras/día</span>
            </div>
            <div class="pred-stat highlight">
                <span class="pred-value">${d}</span>
                <span class="pred-label">en 30 días</span>
            </div>
            <div class="pred-stat">
                <span class="pred-value">${l}</span>
                <span class="pred-label">en 90 días</span>
            </div>
        </div>
        ${a<500?`
            <div class="prediction-milestone">
                <i class="fa-solid fa-flag-checkered"></i>
                <span>Alcanzarás <strong>500 palabras</strong> en ~${p} días</span>
            </div>
        `:""}
        ${a>=500&&a<1e3?`
            <div class="prediction-milestone">
                <i class="fa-solid fa-trophy"></i>
                <span>Alcanzarás <strong>1000 palabras</strong> en ~${r} días</span>
            </div>
        `:""}
        ${a>=1e3?`
            <div class="prediction-milestone achieved">
                <i class="fa-solid fa-crown"></i>
                <span>¡Increíble! Ya tienes <strong>${a}</strong> palabras 🎉</span>
            </div>
        `:""}
    `}const Pe="emowords_onboarding_completed",Me="emowords_user_level",Q=[{id:"welcome",target:null,title:"¡Bienvenido a EmoWords! 👋",content:"Aprende vocabulario conectando cada palabra con tus recuerdos personales. Te guiaremos en 30 segundos.",position:"center",icon:"fa-solid fa-rocket"},{id:"level-select",target:null,title:"¿Cuál es tu nivel de inglés?",content:"Esto nos ayudará a sugerirte los packs más adecuados para ti.",position:"center",icon:"fa-solid fa-graduation-cap",type:"level-selection"},{id:"pack-select",target:null,title:"¡Empieza con ventaja! 🎁",content:"Hemos seleccionado estos packs ideales para tu nivel. Añádelos para empezar con vocabulario útil desde el primer minuto.",position:"center",type:"pack-selection",icon:"fa-solid fa-gift"},{id:"nav-add",target:'[data-view="add"]',title:"1. Añadir Vocabulario",content:"Aquí añades palabras, phrasal verbs o expresiones con su significado.",position:"bottom",icon:"fa-solid fa-plus"},{id:"nav-review",target:'[data-view="review"]',title:"2. Repasar",content:"5 modos de práctica: Flashcards, Quiz, Escritura, Listening y Mixto.",position:"bottom",icon:"fa-solid fa-graduation-cap"},{id:"nav-stats",target:'[data-view="stats"]',title:"3. Tu Progreso",content:"Visualiza tu evolución, logros y palabras que necesitan más atención.",position:"bottom",icon:"fa-solid fa-chart-line"},{id:"secret",target:null,title:"🧠 El Secreto de EmoWords",content:"Al añadir palabras, conecta cada una con un recuerdo personal o emoción. ¡Tu memoria será 10 veces más fuerte!",position:"center",icon:"fa-solid fa-heart"},{id:"ready",target:null,title:"¡Listo para aprender! 🚀",content:"Empieza añadiendo tu primera palabra o explora los packs predefinidos. ¡Las emociones graban, la repetición se olvida!",position:"center",icon:"fa-solid fa-check-circle"}],Ba=[{code:"A1-A2",label:"Básico",description:"Principiante"},{code:"B1",label:"Intermedio bajo",description:"Pre-intermedio"},{code:"B2",label:"Intermedio alto",description:"Intermedio"},{code:"C1-C2",label:"Avanzado",description:"Avanzado/Nativo"}];let _=localStorage.getItem(Me)||null,W=0,I=null,N=null,G=null;function Ve(){return!localStorage.getItem(Pe)}function Da(){localStorage.setItem(Pe,"true")}function Ra(){Ve()&&(W=0,za(),ue(W))}function za(){document.querySelector(".onboarding-overlay")?.remove(),N=document.createElement("div"),N.className="onboarding-overlay",N.innerHTML=`
    <div class="onboarding-backdrop"></div>
    <div class="onboarding-spotlight"></div>
  `,document.body.appendChild(N),G=N.querySelector(".onboarding-spotlight")}function ue(e){const t=Q[e];if(!t){De();return}I&&I.remove(),t.position==="center"||!t.target?G.style.display="none":G.style.display="block",I=document.createElement("div"),I.className="onboarding-tooltip";const a=e===Q.length-1,o=e===0,n=t.type==="level-selection",i=(e+1)/Q.length*100,s=n?`
    <div class="level-grid">
      ${Ba.map(r=>`
        <button class="level-btn" data-level="${r.code}">
          <span class="level-code">${r.code}</span>
          <span class="level-label">${r.label}</span>
        </button>
      `).join("")}
    </div>
  `:"";if(I.innerHTML=`
    <div class="tooltip-progress-bar">
      <div class="tooltip-progress-fill" style="width: ${i}%"></div>
    </div>
    <div class="tooltip-header-row">
      <span class="tooltip-step">${e+1} de ${Q.length}</span>
      <button class="tooltip-skip" title="Saltar tutorial">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="tooltip-body">
      ${t.icon?`<div class="tooltip-icon"><i class="${t.icon}"></i></div>`:""}
      <h4 class="tooltip-title">${t.title}</h4>
      <p class="tooltip-content">${t.content}</p>
      ${s}
    </div>
    <div class="tooltip-actions">
      ${o?"<div></div>":'<button class="tooltip-prev"><i class="fa-solid fa-arrow-left"></i></button>'}
      <button class="tooltip-next ${a?"finish":""}" ${n&&!_?"disabled":""}>
        ${a?"¡Empezar!":"Siguiente"} 
        ${a?'<i class="fa-solid fa-rocket"></i>':'<i class="fa-solid fa-arrow-right"></i>'}
      </button>
    </div>
  `,t.type==="pack-selection"&&_){let r=[];_==="A1-A2"?r=R.filter(c=>c.level==="A1"||c.level==="A2"):_==="C1-C2"?r=R.filter(c=>c.level==="C1"||c.level==="C2"):r=R.filter(c=>c.level===_);const b=`
      <div class="packs-grid-onboarding">
        ${r.map(c=>`
          <div class="pack-card-mini ${localStorage.getItem("pack_"+c.id)?"added":""}" data-pack-id="${c.id}">
            <div class="pack-icon-mini"><i class="fa-solid ${c.icon}"></i></div>
            <div class="pack-info-mini">
              <h5>${c.name}</h5>
              <span>${c.words.length} palabras</span>
            </div>
            <button class="pack-add-btn" title="Añadir pack">
              <i class="fa-solid ${localStorage.getItem("pack_"+c.id)?"fa-check":"fa-plus"}"></i>
            </button>
          </div>
        `).join("")}
      </div>
      <p class="packs-note"><small>Puedes añadir más packs tarde en el Dashboard.</small></p>
    `,g=document.createElement("div");g.innerHTML=I.innerHTML;const T=g.querySelector(".tooltip-body");T&&(T.insertAdjacentHTML("beforeend",b),I.innerHTML=g.innerHTML)}if(N.appendChild(I),t.position==="center"||!t.target)I.classList.add("centered"),Be();else{I.classList.remove("centered");const r=document.querySelector(t.target);r?Na(r,t.position):(I.classList.add("centered"),G.style.display="none")}const d=I.querySelector(".tooltip-skip"),l=I.querySelector(".tooltip-next"),p=I.querySelector(".tooltip-prev");if(d.addEventListener("click",Wa),l.addEventListener("click",ja),p&&p.addEventListener("click",Ha),n){const r=I.querySelectorAll(".level-btn");r.forEach(b=>{b.addEventListener("click",()=>{r.forEach(g=>g.classList.remove("active")),b.classList.add("active"),_=b.dataset.level,localStorage.setItem(Me,_),l.removeAttribute("disabled")})})}t.type==="pack-selection"&&I.querySelectorAll(".pack-card-mini").forEach(b=>{b.addEventListener("click",()=>{const g=b.dataset.packId,c=b.querySelector(".pack-add-btn").querySelector("i"),w=R.find(L=>L.id===g);b.classList.contains("added")?q("Pack ya añadido","Este pack ya está en tu colección","info"):w&&ae(JSON.stringify({words:w.words})).success&&(b.classList.add("added"),c.classList.remove("fa-plus"),c.classList.add("fa-check"),localStorage.setItem("pack_"+g,"true"),q("Pack añadido",`Has añadido ${w.name} a tu colección`,"success"))})}),requestAnimationFrame(()=>{I.classList.add("visible")})}function Na(e,t){const a=e.getBoundingClientRect(),o=8,n=16;G.style.top=`${a.top-o}px`,G.style.left=`${a.left-o}px`,G.style.width=`${a.width+o*2}px`,G.style.height=`${a.height+o*2}px`;const i=I.getBoundingClientRect();let s,d;switch(t){case"bottom":s=a.bottom+n,d=a.left+a.width/2-i.width/2;break;case"top":s=a.top-n-i.height,d=a.left+a.width/2-i.width/2;break;case"left":s=a.top+a.height/2-i.height/2,d=a.left-n-i.width;break;case"right":s=a.top+a.height/2-i.height/2,d=a.right+n;break;default:s=a.bottom+n,d=a.left+a.width/2-i.width/2}const l=window.innerWidth,p=window.innerHeight;d<16&&(d=16),d+i.width>l-16&&(d=l-i.width-16),s<16&&(s=16),s+i.height>p-16&&(s=p-i.height-16),I.style.position="fixed",I.style.top=`${s}px`,I.style.left=`${d}px`}function Be(){document.querySelectorAll(".onboarding-highlight").forEach(e=>{e.classList.remove("onboarding-highlight")})}function ja(){W++,ue(W)}function Ha(){W--,W<0&&(W=0),ue(W)}function Wa(){De()}function De(){Da(),I&&(I.classList.remove("visible"),setTimeout(()=>I?.remove(),200)),N&&(N.classList.add("fade-out"),setTimeout(()=>N?.remove(),300)),Be()}const D=document.getElementById("app");window.addEventListener("offline",()=>{q("Sin conexión","Estás trabajando en modo offline.","warning",5e3),document.body.classList.add("offline-mode")});window.addEventListener("online",()=>{q("Conexión restaurada","Tus cambios se guardarán correctamente.","success",3e3),document.body.classList.remove("offline-mode")});window.addEventListener("error",e=>{console.error("Global error:",e.error),q("Error inesperado","Ha ocurrido un error. Intenta recargar la página.","error",0)});window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason)});const Re=document.querySelectorAll(".nav-link"),te=document.getElementById("theme-toggle"),Ee=document.getElementById("audio-settings-btn");function Ga(){const t=X().theme||"dark";me(t)}function me(e){document.documentElement.setAttribute("data-theme",e);const t=te.querySelector("i");e==="dark"?(t.className="fa-solid fa-sun",te.title="Cambiar a modo claro"):(t.className="fa-solid fa-moon",te.title="Cambiar a modo oscuro");const a=X();a.theme=e,qe(a)}function Oa(){const t=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.body.classList.add("theme-transitioning"),me(t),setTimeout(()=>{document.body.classList.remove("theme-transitioning")},300)}te.addEventListener("click",Oa);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{X().theme||me(e.matches?"dark":"light")});function ze(){const e=document.getElementById("review-badge");if(!e)return;const t=Ue();t>0?(e.textContent=t>99?"99+":t,e.style.display="flex"):e.style.display="none"}function _a(e){Re.forEach(t=>{t.dataset.view===e?t.classList.add("active"):t.classList.remove("active")})}function ge(e){window._reviewCleanup&&(window._reviewCleanup(),window._reviewCleanup=null),_a(e),D.style.opacity="0",D.style.transform="translateY(10px)",setTimeout(()=>{switch(e){case"home":re(D);break;case"add":ha(D);break;case"review":Ea(D);break;case"stats":ka(D);break;default:D.innerHTML="<p>Vista no encontrada</p>"}window.scrollTo({top:0,left:0,behavior:"instant"}),requestAnimationFrame(()=>{D.style.opacity="1",D.style.transform="translateY(0)"}),ze()},150)}D.style.transition="opacity 0.15s ease, transform 0.15s ease";Re.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.view;ge(a)})});const ee=document.querySelector(".logo");ee&&ee.dataset.view&&ee.addEventListener("click",e=>{e.preventDefault(),ge(ee.dataset.view)});Ga();Fa();ze();ge("home");setTimeout(()=>{Ve()&&Ra()},500);function Fa(){Ee&&Ee.addEventListener("click",Ua)}function Ua(){document.querySelector(".audio-settings-modal")?.remove();const e=pe(),t=document.createElement("div");t.className="audio-settings-modal edit-modal",t.innerHTML=`
    <div class="modal-overlay"></div>
    <div class="modal-content" style="max-width: 420px;">
      <div class="modal-header">
        <h3><i class="fa-solid fa-volume-high"></i> Configuración de Audio</h3>
        <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
      </div>
      
      <div class="audio-settings-body">
        <!-- Accent Selection -->
        <div class="settings-section">
          <label class="settings-label"><i class="fa-solid fa-globe"></i> Acento</label>
          <div class="accent-options">
            <button class="accent-option ${e.accent==="en-US"?"active":""}" data-accent="en-US">
              <span class="flag">🇺🇸</span>
              <span class="label">Americano</span>
            </button>
            <button class="accent-option ${e.accent==="en-GB"?"active":""}" data-accent="en-GB">
              <span class="flag">🇬🇧</span>
              <span class="label">Británico</span>
            </button>
          </div>
        </div>
        
        <!-- Speed Selection -->
        <div class="settings-section">
          <label class="settings-label"><i class="fa-solid fa-gauge"></i> Velocidad</label>
          <div class="speed-options">
            <button class="speed-option ${e.speed<=.7?"active":""}" data-speed="0.6">
              <i class="fa-solid fa-hourglass-start"></i>
              <span>Lento</span>
            </button>
            <button class="speed-option ${e.speed>.7&&e.speed<=1.1?"active":""}" data-speed="1">
              <i class="fa-solid fa-person-walking"></i>
              <span>Normal</span>
            </button>
            <button class="speed-option ${e.speed>1.1?"active":""}" data-speed="1.3">
              <i class="fa-solid fa-person-running"></i>
              <span>Rápido</span>
            </button>
          </div>
        </div>
        
        <!-- Preview -->
        <div class="settings-section preview-section">
          <button class="preview-btn" id="preview-audio">
            <i class="fa-solid fa-play"></i> Probar pronunciación
          </button>
        </div>
      </div>
      
      <div class="modal-actions">
        <button type="button" class="btn-cancel">Cerrar</button>
      </div>
    </div>
  `,document.body.appendChild(t),requestAnimationFrame(()=>{t.classList.add("active")});const a=()=>{t.classList.remove("active"),setTimeout(()=>t.remove(),300)};t.querySelector(".modal-overlay").addEventListener("click",a),t.querySelector(".modal-close").addEventListener("click",a),t.querySelector(".btn-cancel").addEventListener("click",a),t.querySelectorAll(".accent-option").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".accent-option").forEach(n=>n.classList.remove("active")),o.classList.add("active"),we({accent:o.dataset.accent}),q("Acento actualizado",da(o.dataset.accent),"success")})}),t.querySelectorAll(".speed-option").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".speed-option").forEach(i=>i.classList.remove("active")),o.classList.add("active");const n=parseFloat(o.dataset.speed);we({speed:n}),q("Velocidad actualizada",pa(n),"success")})}),t.querySelector("#preview-audio").addEventListener("click",()=>{H("Hello, how are you today?")}),document.addEventListener("keydown",function o(n){n.key==="Escape"&&(a(),document.removeEventListener("keydown",o))})}"serviceWorker"in navigator&&window.addEventListener("load",()=>{const t="/emowords/"+"sw.js";navigator.serviceWorker.register(t).then(a=>{console.log("SW registered: ",a)}).catch(a=>{console.log("SW registration failed: ",a)})});
