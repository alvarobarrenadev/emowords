(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const U="emowords_vocab",Ee="emowords_settings";function j(){const e=localStorage.getItem(U);return e?JSON.parse(e):[]}function Be(e){const o=j(),a={...e,createdAt:Date.now(),lastReviewedAt:null,reviewCount:0,correctCount:0,incorrectCount:0,nextReviewAt:Date.now(),difficulty:0};o.push(a),localStorage.setItem(U,JSON.stringify(o))}function le(e){const o=j().map(a=>a.id===e.id?e:a);localStorage.setItem(U,JSON.stringify(o))}function We(e){const o=j().filter(a=>a.id!==e);localStorage.setItem(U,JSON.stringify(o))}function Oe(e){return j().find(o=>o.id===e)}function He(e){const o=j(),a=e.toLowerCase().trim();return a?o.filter(t=>t.word.toLowerCase().includes(a)||t.meaning.toLowerCase().includes(a)||t.example&&t.example.toLowerCase().includes(a)||t.emotion&&t.emotion.toLowerCase().includes(a)||t.category&&t.category.toLowerCase().includes(a)):o}function ke(){const e=j(),o=new Set;return e.forEach(a=>{a.category&&o.add(a.category)}),Array.from(o).sort()}function Ge(e,o="date-desc"){const a=[...e];switch(o){case"date-asc":return a.sort((t,n)=>(t.createdAt||t.id)-(n.createdAt||n.id));case"date-desc":return a.sort((t,n)=>(n.createdAt||n.id)-(t.createdAt||t.id));case"alpha-asc":return a.sort((t,n)=>t.word.localeCompare(n.word));case"alpha-desc":return a.sort((t,n)=>n.word.localeCompare(t.word));case"review-count":return a.sort((t,n)=>(n.reviewCount||0)-(t.reviewCount||0));case"difficulty":return a.sort((t,n)=>(n.difficulty||0)-(t.difficulty||0));default:return a}}function ce(){const e=j(),o=e.length,a=e.filter(g=>g.remembered).length,t=o-a,n=e.reduce((g,k)=>g+(k.reviewCount||0),0),i=o>0?(n/o).toFixed(1):0,r={word:e.filter(g=>g.type==="word").length,phrasal:e.filter(g=>g.type==="phrasal").length,expression:e.filter(g=>g.type==="expression").length,connector:e.filter(g=>g.type==="connector").length},d=e.reduce((g,k)=>g+(k.correctCount||0),0),l=e.reduce((g,k)=>g+(k.incorrectCount||0),0),p=d+l>0?(d/(d+l)*100).toFixed(1):0,s=Date.now(),w=e.filter(g=>!g.nextReviewAt||g.nextReviewAt<=s).length;return{total:o,remembered:a,forgotten:t,totalReviews:n,averageReviews:i,byType:r,retentionRate:p,dueForReview:w}}const ye=[1,3,7,14,30,60,120,240];function Le(e){const o=e.correctCount||0;return o>=10?"master":o>=5?"guru":o>=2?"apprentice":"new"}function _e(e){const o=Le(e);return{level:o,...{new:{label:"Nuevo",class:"mastery-new",icon:"fa-seedling",percent:10},apprentice:{label:"Aprendiz",class:"mastery-apprentice",icon:"fa-leaf",percent:40},guru:{label:"Experto",class:"mastery-guru",icon:"fa-tree",percent:75},master:{label:"Maestro",class:"mastery-master",icon:"fa-crown",percent:100}}[o]}}function Fe(e){if(!e.nextReviewAt)return!0;const o=new Date().setHours(23,59,59,999);return e.nextReviewAt<=o}function Ue(){const e=j(),o=Date.now();return e.filter(a=>!a.nextReviewAt||a.nextReviewAt<=o).length}function ve(e,o){const a=Date.now(),t=1440*60*1e3;if(!o)return a+600*1e3;const n=e.correctCount||0,i=Math.min(n,ye.length-1),r=ye[i],l=1-(e.difficulty||0)*.1,p=Math.max(1,Math.round(r*l));return a+p*t}function Ye(e){if(!e.nextReviewAt)return"Ahora";const o=Date.now(),a=e.nextReviewAt-o;if(a<=0)return"Ahora";const t=Math.floor(a/(60*1e3)),n=Math.floor(a/(3600*1e3)),i=Math.floor(a/(1440*60*1e3));return t<60?`${t}min`:n<24?`${n}h`:i===1?"Mañana":i<7?`${i} días`:i<30?`${Math.floor(i/7)} sem`:`${Math.floor(i/30)} mes${Math.floor(i/30)>1?"es":""}`}function Ke(){const e=j(),o=Date.now();return e.filter(t=>!t.nextReviewAt||t.nextReviewAt<=o).sort((t,n)=>{const i=o-(t.nextReviewAt||0),r=o-(n.nextReviewAt||0);if(i!==r)return r-i;const d=t.difficulty||0,l=n.difficulty||0;return d!==l?l-d:(t.reviewCount||0)-(n.reviewCount||0)})}function Xe(e,o){const a=Oe(e);if(a)return a.remembered=o,a.lastReviewedAt=Date.now(),a.reviewCount=(a.reviewCount||0)+1,o?(a.correctCount=(a.correctCount||0)+1,a.difficulty=Math.max(-3,(a.difficulty||0)-1),a.nextReviewAt=ve(a,!0)):(a.incorrectCount=(a.incorrectCount||0)+1,a.difficulty=Math.min(3,(a.difficulty||0)+1),a.correctCount=Math.max(0,(a.correctCount||0)-2),a.nextReviewAt=ve(a,!1)),le(a),a}function Je(){const e=j(),o={version:"1.0",exportedAt:new Date().toISOString(),wordCount:e.length,words:e};return JSON.stringify(o,null,2)}function ae(e){try{const o=JSON.parse(e);if(!o.words||!Array.isArray(o.words))throw new Error("Invalid data format: missing words array");const a=j(),t=new Set(a.map(r=>r.id));let n=0,i=0;return o.words.forEach(r=>{if(!r.word||!r.meaning){i++;return}(!r.id||t.has(r.id))&&(r.id=Date.now()+Math.random()),r.type=r.type||"word",r.remembered=r.remembered||!1,r.createdAt=r.createdAt||Date.now(),a.push(r),t.add(r.id),n++}),localStorage.setItem(U,JSON.stringify(a)),{success:!0,imported:n,skipped:i}}catch(o){return{success:!1,error:o.message}}}function Qe(e){try{const o=e.trim().split(`
`);if(o.length<2)throw new Error("El archivo CSV debe tener al menos una fila de encabezados y una de datos");const a=fe(o[0]).map(c=>c.toLowerCase().trim()),t=a.findIndex(c=>c==="word"||c==="palabra"||c==="english"),n=a.findIndex(c=>c==="meaning"||c==="significado"||c==="spanish"||c==="traduccion"||c==="traducción");if(t===-1||n===-1)throw new Error('El CSV debe tener columnas "word" y "meaning" (o "palabra" y "significado")');const i=a.findIndex(c=>c==="type"||c==="tipo"),r=a.findIndex(c=>c==="category"||c==="categoria"||c==="categoría"),d=a.findIndex(c=>c==="example"||c==="ejemplo"),l=a.findIndex(c=>c==="emotion"||c==="emocion"||c==="emoción"||c==="association"||c==="asociacion"),p=j(),s=new Set(p.map(c=>c.word.toLowerCase().trim()));let w=0,g=0,k=0;for(let c=1;c<o.length;c++){const b=o[c].trim();if(!b)continue;const L=fe(b),A=L[t]?.trim(),V=L[n]?.trim();if(!A||!V){g++;continue}if(s.has(A.toLowerCase())){k++;continue}let I="word";if(i!==-1&&L[i]){const P=L[i].toLowerCase().trim();["phrasal","phrasal verb","phrasal-verb"].includes(P)?I="phrasal":["expression","expresion","expresión"].includes(P)?I="expression":["connector","conector"].includes(P)?I="connector":["word","palabra"].includes(P)&&(I="word")}const z={id:Date.now()+Math.random(),word:A,meaning:V,type:I,category:r!==-1&&L[r]?.trim()||null,example:d!==-1&&L[d]?.trim()||"",emotion:l!==-1&&L[l]?.trim()||"",image:"",remembered:!1,createdAt:Date.now(),lastReviewedAt:null,reviewCount:0,correctCount:0,incorrectCount:0,nextReviewAt:Date.now(),difficulty:0};p.push(z),s.add(A.toLowerCase()),w++}return localStorage.setItem(U,JSON.stringify(p)),{success:!0,imported:w,skipped:g,duplicates:k}}catch(o){return{success:!1,error:o.message}}}function fe(e){const o=[];let a="",t=!1;for(let n=0;n<e.length;n++){const i=e[n];i==='"'?t=!t:(i===","||i===";")&&!t?(o.push(a.trim()),a=""):a+=i}return o.push(a.trim()),o}function qe(e,o=null){const a=j(),t=e.toLowerCase().trim();return a.some(n=>n.word.toLowerCase().trim()===t&&n.id!==o)}function K(){const e=localStorage.getItem(Ee);return e?JSON.parse(e):{theme:"dark",language:"es",showExampleInReview:!0,autoPlayAudio:!1}}function Ce(e){localStorage.setItem(Ee,JSON.stringify(e))}const Ie="emowords_gamification";function te(){const e=localStorage.getItem(Ie);return e?JSON.parse(e):{streak:0,lastStudyDate:null,maxStreak:0,dailyGoal:{date:new Date().toLocaleDateString(),count:0,target:20},totalXp:0,level:1,perfectSessions:0,totalReviews:0}}function de(e){localStorage.setItem(Ie,JSON.stringify(e))}function re(){const e=te(),o=new Date().toLocaleDateString();if(e.dailyGoal.date!==o){e.dailyGoal={date:o,count:0,target:e.dailyGoal.target||20};const a=new Date;a.setDate(a.getDate()-1),e.lastStudyDate!==a.toLocaleDateString()&&e.lastStudyDate!==o&&(e.streak>0,e.streak=0),de(e)}return e}function he(e=1,o={}){const a=te(),t=new Date().toLocaleDateString(),n=a.level;if(a.dailyGoal.date!==t&&(a.dailyGoal={date:t,count:0,target:a.dailyGoal.target||20}),a.dailyGoal.count+=e,a.totalReviews=(a.totalReviews||0)+e,o.perfectSession&&(a.perfectSessions=(a.perfectSessions||0)+1),a.lastStudyDate!==t){const r=new Date;r.setDate(r.getDate()-1);const d=r.toLocaleDateString();a.lastStudyDate===d?a.streak+=1:a.streak=1,a.streak>a.maxStreak&&(a.maxStreak=a.streak),a.lastStudyDate=t}a.totalXp+=e*10,a.level=Math.floor(Math.sqrt(a.totalXp/100))+1,de(a);const i=a.level>n;return{...a,leveledUp:i,newLevel:i?a.level:null}}function Ze(e){const o=te();o.dailyGoal.target=e,de(o)}function ea(e){const o=te();return{totalWords:e?.total||0,masteredWords:e?.mastered||0,wordsByType:e?.byType||{word:0,phrasal:0,expression:0,connector:0},maxStreak:o.maxStreak||0,streak:o.streak||0,totalReviews:o.totalReviews||0,perfectSessions:o.perfectSessions||0,level:o.level||1,studiedAtNight:!1,studiedEarly:!1}}const Se="emowords_achievements",Y={first_word:{id:"first_word",name:"Primera Palabra",description:"Añade tu primera palabra",icon:"fa-seedling",category:"vocabulary",xpReward:10,condition:e=>e.totalWords>=1},collector_10:{id:"collector_10",name:"Coleccionista",description:"Alcanza 10 palabras en tu vocabulario",icon:"fa-layer-group",category:"vocabulary",xpReward:25,condition:e=>e.totalWords>=10},collector_50:{id:"collector_50",name:"Bibliotecario",description:"Alcanza 50 palabras en tu vocabulario",icon:"fa-book",category:"vocabulary",xpReward:50,condition:e=>e.totalWords>=50},collector_100:{id:"collector_100",name:"Erudito",description:"Alcanza 100 palabras en tu vocabulario",icon:"fa-graduation-cap",category:"vocabulary",xpReward:100,condition:e=>e.totalWords>=100},collector_500:{id:"collector_500",name:"Maestro del Léxico",description:"Alcanza 500 palabras en tu vocabulario",icon:"fa-crown",category:"vocabulary",xpReward:250,condition:e=>e.totalWords>=500},streak_3:{id:"streak_3",name:"En Racha",description:"Mantén una racha de 3 días",icon:"fa-fire",category:"streak",xpReward:30,condition:e=>e.maxStreak>=3},streak_7:{id:"streak_7",name:"Semana Perfecta",description:"Mantén una racha de 7 días",icon:"fa-fire-flame-curved",category:"streak",xpReward:70,condition:e=>e.maxStreak>=7},streak_30:{id:"streak_30",name:"Mes de Fuego",description:"Mantén una racha de 30 días",icon:"fa-meteor",category:"streak",xpReward:200,condition:e=>e.maxStreak>=30},streak_100:{id:"streak_100",name:"Imparable",description:"Mantén una racha de 100 días",icon:"fa-dragon",category:"streak",xpReward:500,condition:e=>e.maxStreak>=100},first_review:{id:"first_review",name:"Primer Repaso",description:"Completa tu primera sesión de repaso",icon:"fa-play",category:"review",xpReward:15,condition:e=>e.totalReviews>=1},reviewer_50:{id:"reviewer_50",name:"Repasador",description:"Completa 50 repasos",icon:"fa-rotate",category:"review",xpReward:50,condition:e=>e.totalReviews>=50},reviewer_200:{id:"reviewer_200",name:"Experto en Repasos",description:"Completa 200 repasos",icon:"fa-brain",category:"review",xpReward:100,condition:e=>e.totalReviews>=200},perfect_session:{id:"perfect_session",name:"Sesión Perfecta",description:"Completa una sesión sin errores (mín. 5 palabras)",icon:"fa-star",category:"review",xpReward:40,condition:e=>e.perfectSessions>=1},first_master:{id:"first_master",name:"Primera Maestría",description:"Domina completamente tu primera palabra",icon:"fa-gem",category:"mastery",xpReward:30,condition:e=>e.masteredWords>=1},master_10:{id:"master_10",name:"Dominador",description:"Domina 10 palabras",icon:"fa-trophy",category:"mastery",xpReward:75,condition:e=>e.masteredWords>=10},master_50:{id:"master_50",name:"Gran Maestro",description:"Domina 50 palabras",icon:"fa-medal",category:"mastery",xpReward:200,condition:e=>e.masteredWords>=50},level_5:{id:"level_5",name:"Aprendiz Dedicado",description:"Alcanza el nivel 5",icon:"fa-arrow-up",category:"level",xpReward:50,condition:e=>e.level>=5},level_10:{id:"level_10",name:"Estudiante Avanzado",description:"Alcanza el nivel 10",icon:"fa-ranking-star",category:"level",xpReward:100,condition:e=>e.level>=10},level_25:{id:"level_25",name:"Leyenda del Vocabulario",description:"Alcanza el nivel 25",icon:"fa-chess-king",category:"level",xpReward:300,condition:e=>e.level>=25},variety_master:{id:"variety_master",name:"Variedad",description:"Tiene al menos 5 de cada tipo (palabra, phrasal, expresión, conector)",icon:"fa-shapes",category:"special",xpReward:60,condition:e=>e.wordsByType.word>=5&&e.wordsByType.phrasal>=5&&e.wordsByType.expression>=5&&e.wordsByType.connector>=5},night_owl:{id:"night_owl",name:"Búho Nocturno",description:"Estudia después de medianoche",icon:"fa-moon",category:"special",xpReward:20,condition:e=>e.studiedAtNight},early_bird:{id:"early_bird",name:"Madrugador",description:"Estudia antes de las 7am",icon:"fa-sun",category:"special",xpReward:20,condition:e=>e.studiedEarly}};function ne(){const e=localStorage.getItem(Se);return e?JSON.parse(e):[]}function Ae(e){localStorage.setItem(Se,JSON.stringify(e))}function aa(e){const o=ne(),a=[];return Object.values(Y).forEach(t=>{o.includes(t.id)||t.condition(e)&&(o.push(t.id),a.push(t))}),a.length>0&&Ae(o),a}function oa(){const e=ne();return Object.values(Y).map(o=>({...o,unlocked:e.includes(o.id)}))}function ie(){const e=Object.keys(Y).length,o=ne().length;return{total:e,unlocked:o,percent:Math.round(o/e*100)}}function ta(){const e=new Date().getHours(),o={studiedAtNight:e>=0&&e<5,studiedEarly:e>=5&&e<7},a=ne(),t=[];return o.studiedAtNight&&!a.includes("night_owl")&&(a.push("night_owl"),t.push(Y.night_owl)),o.studiedEarly&&!a.includes("early_bird")&&(a.push("early_bird"),t.push(Y.early_bird)),t.length>0&&Ae(a),t}const we="toast-container";function na(){let e=document.getElementById(we);return e||(e=document.createElement("div"),e.id=we,e.className="toast-container",document.body.appendChild(e)),e}function C(e,o,a="info",t=4e3){const n=na(),i=document.createElement("div"),r={info:"fa-circle-info",success:"fa-circle-check",warning:"fa-triangle-exclamation",error:"fa-circle-xmark"};i.className=`toast ${a}`,i.innerHTML=`
    <i class="fa-solid ${r[a]||"fa-bell"}"></i>
    <div class="toast-content">
      <span class="toast-title">${e}</span>
      <span class="toast-message">${o}</span>
    </div>
  `,n.appendChild(i),t>0&&setTimeout(()=>{i.classList.add("removing"),i.addEventListener("animationend",()=>{i.remove(),n.children.length===0&&n.remove()})},t)}function ia(e){document.querySelector(".achievement-notification")?.remove();const o=document.createElement("div");o.className="achievement-notification animate__animated animate__fadeInUp",o.innerHTML=`
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
  `,document.body.appendChild(o);try{const a=new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp+fl5OQioR7d3d9hY+YoaWloJuVjIN4cHBzfoqWoKWmoZqUiXxxamp0f4yYoaSnop2XjIN4bWxzfouXn6OkoJqUiX5zamxxfIiUnKGjop6Zkoh+c21wd4OOl52hoZ6Zk4h9cWxveYOPmJ6hoZ2YkoZ7bmtvd4SPmZ6hoJ6YkYV4bWtvdoKNl52fn5yXkIR3a2pvdYGMl52fn5yXj4N2amluc4CLlpyenZuWjoJ1Zmhsb36Kk5qbnJqVjIBzZGZqa3yHkJaZmZeUi35wYmRnanyGj5WWlpSRiXxuX2JkanyEjZKVlJKPhnluXl9ibHqCi5GTk5GNhHZqXF1fanyBiY+RkZCLgXNmWlxdaHmAh4yPj46Kg3JlWVpbZ3d/hYqNjYyIf29iV1hZZXR9goiLi4qHfWxfVFVXY3J6gIWJiYeEe2pbUlNVYXB4foSHhoWCeGdYUFBTX21zeoCDg4KAdmVWTk5QXGpxdnyAf358b2NUT01UXGZ0eH17fHt5bWJUR01TV2RvdHp9fHt5cGVYUE1TV2Jwdnp7e3p4cGZaU09UWGRvdXp7e3l3cGdcVlNXXGZwd3t8e3l2b2heWVdaX2lzent7enl0bmVfW1lfZG50e3t6eHVvZ2JeXGBla3R6e3t4dXBpY19eY2dsc3l7enh1cWpkYWFkaW90eXt5d3RvamVjY2drcnl6eXd0cGtmZGVobnN4enl3dHFsZ2ZnaWx0eHp4dnRwbGhnZ2ltd3l5d3Vybmtnamp0d3h4dnVxbWppcHN2eHd2dHFtamxvc3Z4dnVzb2xsbW5zdnd1dHNvbW1ucnV3dnV0cm9ubm9xc3V1dHNxb25ub3Bxc3NycXBub25vb3ByMDEwMC8wLy8vLy8vLy4uLi4uLi4uLi4tLS0tLS0tLSwsKyssKysrKysrKioqKioqKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSg=");a.volume=.3,a.play().catch(()=>{})}catch{}setTimeout(()=>{o.classList.remove("animate__fadeInUp"),o.classList.add("animate__fadeOutUp"),setTimeout(()=>o.remove(),500)},4e3)}function Pe(e){if(!e||e.length===0)return;let o=0;e.forEach(a=>{setTimeout(()=>{ia(a)},o),o+=4500})}function ra(e){document.querySelector(".level-up-celebration")?.remove();const o=document.createElement("div");o.className="level-up-celebration",o.innerHTML=`
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
  `,document.body.appendChild(o),sa();const a=()=>{o.classList.add("fade-out"),setTimeout(()=>o.remove(),300)};o.querySelector(".level-up-close").addEventListener("click",a),o.querySelector(".level-up-overlay").addEventListener("click",a),setTimeout(a,5e3)}function sa(){const e=["#6366f1","#8b5cf6","#ec4899","#f59e0b","#10b981","#3b82f6"];for(let a=0;a<50;a++){const t=document.createElement("div");t.className="confetti",t.style.left=Math.random()*100+"vw",t.style.backgroundColor=e[Math.floor(Math.random()*e.length)],t.style.animationDuration=Math.random()*2+2+"s",t.style.animationDelay=Math.random()*.5+"s",document.body.appendChild(t),setTimeout(()=>t.remove(),4e3)}}function la(){const e=ta();e.length>0&&Pe(e)}const D=[{id:"a1-complete",name:"A1 - Beginner Pack",icon:"fa-seedling",description:"Lo esencial para sobrevivir: verbos del día a día, conectores básicos, tus primeros phrasal verbs y frases que usarás constantemente.",level:"A1",words:[{word:"Be",meaning:"Ser / Estar",type:"word",category:"Verbos",example:"I am tired. She is my friend.",emotionalTip:'Piensa en esa pregunta que te haces a las 3am cuando no puedes dormir: "¿Quién SOY yo realmente?" BE es existir, ser tú.'},{word:"Have",meaning:"Tener",type:"word",category:"Verbos",example:"I have a question.",emotionalTip:`Esa sensación cuando te das cuenta de que no tienes la cartera encima. "I don't HAVE it." El vacío en el estómago.`},{word:"Want",meaning:"Querer",type:"word",category:"Verbos",example:"I want coffee, please.",emotionalTip:'El deseo intenso de algo que no puedes tener. Ese "lo QUIERO" de niño pequeño. WANT es deseo puro, sin filtros.'},{word:"Need",meaning:"Necesitar",type:"word",category:"Verbos",example:"I need help.",emotionalTip:"Cuando estás perdido en una ciudad extranjera de noche y NECESITAS ayuda de verdad. No es capricho, es supervivencia."},{word:"Like",meaning:"Gustar",type:"word",category:"Verbos",example:"I like this song.",emotionalTip:"Esa canción que te transporta a un momento feliz de tu vida. I LIKE it. Te gusta, te hace sentir bien."},{word:"Go",meaning:"Ir",type:"word",category:"Verbos",example:"I go to work by metro.",emotionalTip:'El impulso de huir cuando una situación te supera. "I need to GO." Escapar, moverte, liberarte.'},{word:"Know",meaning:"Saber / Conocer",type:"word",category:"Verbos",example:"I don't know.",emotionalTip:`Esa impotencia cuando alguien te pregunta algo y no tienes ni idea. "I don't KNOW" con vergüenza en la voz.`},{word:"Think",meaning:"Pensar / Creer",type:"word",category:"Verbos",example:"I think so.",emotionalTip:'Cuando te preguntan tu opinión y todas las miradas están sobre ti. "I THINK that..." y tu corazón se acelera.'},{word:"See",meaning:"Ver",type:"word",category:"Verbos",example:"See you tomorrow!",emotionalTip:"El momento de reconocer a alguien querido entre la multitud del aeropuerto. I SEE you. Alivio y alegría."},{word:"Work",meaning:"Trabajar / Funcionar",type:"word",category:"Verbos",example:"It doesn't work.",emotionalTip:`La frustración cuando algo no funciona justo antes de una entrega importante. "It doesn't WORK!" Desesperación.`},{word:"And",meaning:"Y",type:"connector",category:"Conectores",example:"Coffee and a sandwich, please.",emotionalTip:"Cuando enumeras todo lo bueno que tienes: mi familia AND mis amigos AND mi salud. Gratitud acumulada."},{word:"But",meaning:"Pero",type:"connector",category:"Conectores",example:"I like it, but it's expensive.",emotionalTip:'El BUT que rompe ilusiones. "Te quiero, BUT..." Ese momento donde sabes que viene algo malo.'},{word:"Or",meaning:"O",type:"connector",category:"Conectores",example:"Tea or coffee?",emotionalTip:"Esa decisión difícil que te quita el sueño. ¿Esto OR aquello? La ansiedad de elegir mal."},{word:"Because",meaning:"Porque",type:"connector",category:"Conectores",example:"I'm late because of the traffic.",emotionalTip:'Cuando te pillan en una mentira y tienes que justificarte. "BECAUSE..." buscando excusas desesperadamente.'},{word:"So",meaning:"Así que / Entonces",type:"connector",category:"Conectores",example:"I was hungry, so I ordered food.",emotionalTip:"Las consecuencias de tus acciones. Bebí demasiado, SO ahora me duele la cabeza. Causa y efecto."},{word:"Then",meaning:"Luego / Entonces",type:"connector",category:"Conectores",example:"First we eat, then we go.",emotionalTip:"Cuando planeas algo con ilusión. Primero esto, THEN aquello. La anticipación de algo bueno."},{word:"Also",meaning:"También",type:"connector",category:"Conectores",example:"I also want dessert.",emotionalTip:'Cuando ya has pedido mucho pero aún quieres más. "ALSO..." con un poco de vergüenza.'},{word:"Maybe",meaning:"Quizás / A lo mejor",type:"connector",category:"Conectores",example:"Maybe tomorrow.",emotionalTip:"Esa respuesta que das cuando no quieres decir que no directamente. MAYBE = probablemente no, pero no quiero herirte."},{word:"Really",meaning:"De verdad / Muy",type:"connector",category:"Conectores",example:"I'm really tired.",emotionalTip:'Cuando necesitas que te crean. "REALLY, te lo juro, es verdad." Énfasis desesperado.'},{word:"Actually",meaning:"En realidad",type:"connector",category:"Conectores",example:"Actually, I changed my mind.",emotionalTip:'Cuando confiesas la verdad después de haber mentido. "ACTUALLY... no era así." El alivio de sincerarte.'},{word:"Wake up",meaning:"Despertarse",type:"phrasal",category:"Phrasal Verbs",example:"I wake up at 7.",emotionalTip:"Ese terror cuando miras el reloj y llegas tarde. O la paz de despertar sin alarma un domingo."},{word:"Get up",meaning:"Levantarse",type:"phrasal",category:"Phrasal Verbs",example:"Get up, we're late!",emotionalTip:"La lucha interna cada mañana fría de invierno. Tu cama caliente vs. tus responsabilidades."},{word:"Turn on",meaning:"Encender",type:"phrasal",category:"Phrasal Verbs",example:"Turn on the lights.",emotionalTip:"Entrar a casa de noche a oscuras, ese alivio cuando la luz revela que no hay nadie escondido."},{word:"Turn off",meaning:"Apagar",type:"phrasal",category:"Phrasal Verbs",example:"Turn off your phone.",emotionalTip:"Apagar el móvil para desconectar del mundo. Ese silencio liberador y un poco aterrador."},{word:"Come in",meaning:"Entrar / Pasa",type:"phrasal",category:"Phrasal Verbs",example:"Come in, sit down!",emotionalTip:"Cuando te invitan a pasar a una casa donde te sientes bienvenido. Calidez y pertenencia."},{word:"Go out",meaning:"Salir",type:"phrasal",category:"Phrasal Verbs",example:"Let's go out tonight.",emotionalTip:"Esa emoción del viernes noche cuando sales con amigos. Libertad, posibilidades, diversión."},{word:"Sit down",meaning:"Sentarse",type:"phrasal",category:"Phrasal Verbs",example:"Please sit down.",emotionalTip:'Cuando tu jefe dice "siéntate" con cara seria. El corazón se acelera, ¿qué he hecho?'},{word:"Put on",meaning:"Ponerse (ropa)",type:"phrasal",category:"Phrasal Verbs",example:"Put on your jacket, it's cold.",emotionalTip:"Ponerte esa ropa especial para una cita importante. Los nervios de querer causar buena impresión."},{word:"Take off",meaning:"Quitarse (ropa)",type:"phrasal",category:"Phrasal Verbs",example:"Take off your shoes.",emotionalTip:"Quitarte los zapatos después de un día larguísimo. Ese alivio físico de llegar a casa."},{word:"Look at",meaning:"Mirar",type:"phrasal",category:"Phrasal Verbs",example:"Look at this!",emotionalTip:"Cuando alguien te muestra algo increíble y quiere compartir su asombro contigo. Complicidad."},{word:"How are you?",meaning:"¿Cómo estás?",type:"expression",category:"Expresiones",example:"Hey! How are you?",emotionalTip:"Cuando alguien te lo pregunta de verdad y espera una respuesta honesta. Sentirte visto."},{word:"I'm fine, thanks",meaning:"Bien, gracias",type:"expression",category:"Expresiones",example:"I'm fine, thanks. And you?",emotionalTip:"La mentira social que todos decimos aunque estemos destrozados por dentro. La máscara."},{word:"Nice to meet you",meaning:"Encantado/a",type:"expression",category:"Expresiones",example:"Hi, I'm Ana. Nice to meet you.",emotionalTip:"Los nervios de conocer a alguien que podría ser importante en tu vida. Primera impresión."},{word:"See you later",meaning:"Hasta luego",type:"expression",category:"Expresiones",example:"Bye! See you later.",emotionalTip:"Despedirte de alguien sin saber si le volverás a ver. Esa incertidumbre suave."},{word:"No problem",meaning:"No hay problema / De nada",type:"expression",category:"Expresiones",example:"Thanks! - No problem.",emotionalTip:"Cuando ayudas a alguien y te sientes bien haciéndolo. Generosidad natural."},{word:"I don't understand",meaning:"No entiendo",type:"expression",category:"Expresiones",example:"Sorry, I don't understand.",emotionalTip:"La vergüenza de admitir que no entiendes algo que todos parecen entender. Vulnerabilidad."},{word:"Can you repeat?",meaning:"¿Puedes repetir?",type:"expression",category:"Expresiones",example:"Can you repeat, please?",emotionalTip:"Cuando no has pillado algo importante y temes parecer tonto al preguntar de nuevo."},{word:"Excuse me",meaning:"Disculpa / Perdona",type:"expression",category:"Expresiones",example:"Excuse me, where is the bathroom?",emotionalTip:"Interrumpir a un desconocido con el corazón un poco acelerado. Invadir su espacio."},{word:"I'm sorry",meaning:"Lo siento",type:"expression",category:"Expresiones",example:"I'm sorry, I'm late.",emotionalTip:"Cuando de verdad sientes haber hecho daño a alguien que te importa. Culpa genuina."},{word:"Of course",meaning:"Por supuesto / Claro",type:"expression",category:"Expresiones",example:"Can I sit here? - Of course!",emotionalTip:"Decir que sí con el corazón, no solo con la boca. Aceptación total, sin reservas."}]},{id:"a1-travel",name:"A1 - Viajes y Supervivencia",icon:"fa-plane-departure",description:"Vocabulario esencial para sobrevivir viajando: aeropuertos, hoteles, restaurantes y emergencias.",level:"A1",words:[{word:"Ticket",meaning:"Billete / Entrada",type:"word",category:"Viajes",example:"I need a ticket to London.",emotionalTip:"Ese papel o código que te abre puertas a otro lugar. La llave a la aventura."},{word:"Passport",meaning:"Pasaporte",type:"word",category:"Viajes",example:"Don't forget your passport!",emotionalTip:"El pánico de buscarlo en el aeropuerto. Tu identidad en un pequeño libro."},{word:"Luggage",meaning:"Equipaje",type:"word",category:"Viajes",example:"My luggage is too heavy.",emotionalTip:"Cargar con todo lo que crees necesitar. A veces demasiado, siempre algo falta."},{word:"Flight",meaning:"Vuelo",type:"word",category:"Viajes",example:"My flight is delayed.",emotionalTip:"La emoción del despegue o el estrés del retraso. Estar suspendido entre dos mundos."},{word:"Gate",meaning:"Puerta de embarque",type:"word",category:"Viajes",example:"Gate 23, please hurry!",emotionalTip:"Correr por el aeropuerto buscando tu puerta. El corazón acelerado."},{word:"Delay",meaning:"Retraso",type:"word",category:"Viajes",example:"There's a 2-hour delay.",emotionalTip:"La frustración de esperar sin poder hacer nada. Tiempo robado."},{word:"Book",meaning:"Reservar",type:"word",category:"Viajes",example:"I want to book a room.",emotionalTip:"Asegurar tu sitio en algún lugar. La tranquilidad de tener un plan."},{word:"Check in",meaning:"Registrarse",type:"phrasal",category:"Viajes",example:"What time can I check in?",emotionalTip:"El momento de entrar oficialmente. Por fin has llegado."},{word:"Check out",meaning:"Dejar el hotel",type:"phrasal",category:"Viajes",example:"We check out at 11.",emotionalTip:"Dejar un lugar que fue tu casa temporal. Un pequeño adiós."},{word:"Room",meaning:"Habitación",type:"word",category:"Viajes",example:"Is there a room available?",emotionalTip:"Tu refugio en un lugar desconocido. Donde caes agotado después de explorar."},{word:"Bill",meaning:"Cuenta",type:"word",category:"Viajes",example:"Can I have the bill, please?",emotionalTip:"El momento de verdad: cuánto costó todo. A veces sorprende, a veces duele."},{word:"Tip",meaning:"Propina",type:"word",category:"Viajes",example:"Should I leave a tip?",emotionalTip:"La duda de cuánto dejar. No quieres parecer tacaño ni exagerado."},{word:"Menu",meaning:"Carta / Menú",type:"word",category:"Viajes",example:"Can I see the menu?",emotionalTip:"Estudiar opciones en un idioma que no dominas. El dedo apuntando y la esperanza."},{word:"Order",meaning:"Pedir / Pedido",type:"word",category:"Viajes",example:"I'd like to order now.",emotionalTip:"El momento de decidirte. Esperar que llegue lo que imaginabas."},{word:"Change",meaning:"Cambio / Cambiar",type:"word",category:"Viajes",example:"Keep the change.",emotionalTip:"Las monedas que pesan en el bolsillo. El gesto de generosidad pequeña."},{word:"Where is...?",meaning:"¿Dónde está...?",type:"expression",category:"Viajes",example:"Where is the bathroom?",emotionalTip:"La pregunta más importante cuando estás perdido. Tu salvavidas."},{word:"How much?",meaning:"¿Cuánto cuesta?",type:"expression",category:"Viajes",example:"How much is this?",emotionalTip:"La pregunta antes de decidir. El nervio de no saber si puedes permitírtelo."},{word:"I'm lost",meaning:"Estoy perdido/a",type:"expression",category:"Viajes",example:"Sorry, I'm lost.",emotionalTip:"Admitir que no sabes dónde estás. Vulnerabilidad que pide ayuda."},{word:"Help me",meaning:"Ayúdame",type:"expression",category:"Viajes",example:"Can you help me, please?",emotionalTip:"Pedir auxilio a un desconocido. Confiar en la bondad de otros."},{word:"I don't speak...",meaning:"No hablo...",type:"expression",category:"Viajes",example:"I don't speak French.",emotionalTip:"La barrera del idioma. Sentirte fuera y querer conectar igual."},{word:"Slowly please",meaning:"Despacio por favor",type:"expression",category:"Viajes",example:"Can you speak slowly, please?",emotionalTip:"Cuando las palabras pasan demasiado rápido. Pedir paciencia."},{word:"Bathroom",meaning:"Baño",type:"word",category:"Viajes",example:"Where is the bathroom?",emotionalTip:"La urgencia que todo el mundo entiende. Sin palabras, solo necesidad."},{word:"Exit",meaning:"Salida",type:"word",category:"Viajes",example:"Where is the exit?",emotionalTip:"El camino hacia afuera. A veces buscado con desesperación."},{word:"Entrance",meaning:"Entrada",type:"word",category:"Viajes",example:"The main entrance is closed.",emotionalTip:"Por donde empiezas. El primer paso hacia dentro."},{word:"Map",meaning:"Mapa",type:"word",category:"Viajes",example:"Do you have a map?",emotionalTip:"Tu guía en lo desconocido. Antes papel, ahora pantalla."},{word:"Station",meaning:"Estación",type:"word",category:"Viajes",example:"How do I get to the train station?",emotionalTip:"Punto de partida o llegada. Donde los viajes empiezan y terminan."},{word:"Platform",meaning:"Andén",type:"word",category:"Viajes",example:"Which platform for Madrid?",emotionalTip:"Ese sitio específico donde esperas. No equivocarse es importante."},{word:"Single",meaning:"Sencillo / Individual",type:"word",category:"Viajes",example:"A single room, please.",emotionalTip:"Viajar solo. Libertad y a veces un poco de soledad."},{word:"Return",meaning:"Ida y vuelta / Volver",type:"word",category:"Viajes",example:"A return ticket to Barcelona.",emotionalTip:"La certeza de que volverás. El viaje tiene un final planeado."},{word:"Reservation",meaning:"Reserva",type:"word",category:"Viajes",example:"I have a reservation.",emotionalTip:"Tu nombre esperándote en algún sitio. Alguien preparó algo para ti."},{word:"Available",meaning:"Disponible",type:"word",category:"Viajes",example:"Is this seat available?",emotionalTip:"La pregunta antes de ocupar. Respetar el espacio del otro."},{word:"Full",meaning:"Lleno / Completo",type:"word",category:"Viajes",example:"Sorry, we're full tonight.",emotionalTip:"La decepción de no caber. Tener que buscar alternativas."},{word:"Free",meaning:"Gratis / Libre",type:"word",category:"Viajes",example:"Is this seat free?",emotionalTip:"La alegría de lo gratuito o disponible. Un pequeño regalo."},{word:"Cash",meaning:"Efectivo",type:"word",category:"Viajes",example:"Do you accept cash?",emotionalTip:"El dinero físico que se agota visiblemente. Control tangible."},{word:"Card",meaning:"Tarjeta",type:"word",category:"Viajes",example:"Can I pay by card?",emotionalTip:"La magia del plástico. A veces funciona, a veces no."},{word:"WiFi",meaning:"WiFi",type:"word",category:"Viajes",example:"What's the WiFi password?",emotionalTip:"La conexión con tu mundo. El primer alivio al llegar a un sitio."},{word:"Emergency",meaning:"Emergencia",type:"word",category:"Viajes",example:"This is an emergency!",emotionalTip:"Cuando algo va muy mal. La palabra que activa la ayuda."},{word:"Hospital",meaning:"Hospital",type:"word",category:"Viajes",example:"I need to go to the hospital.",emotionalTip:"El lugar que esperas no necesitar. Pero saber dónde está es vital."},{word:"Police",meaning:"Policía",type:"word",category:"Viajes",example:"Call the police!",emotionalTip:"Buscar protección cuando algo va mal. Confiar en desconocidos con uniforme."},{word:"Safe",meaning:"Seguro",type:"word",category:"Viajes",example:"Is this area safe?",emotionalTip:"La pregunta que todo viajero hace. Querer protegerte en lo desconocido."}]},{id:"a2-complete",name:"A2 - Elementary Pack",icon:"fa-leaf",description:"Para empezar a conversar: verbos de acción, conectores para contar cosas, phrasal verbs súper comunes y expresiones que oyes en todas partes.",level:"A2",words:[{word:"Try",meaning:"Intentar / Probar",type:"word",category:"Verbos",example:"Try this, it's delicious!",emotionalTip:"El miedo antes de lanzarte a hacer algo nuevo. TRY es ese segundo de valentía antes del salto."},{word:"Wait",meaning:"Esperar",type:"word",category:"Verbos",example:"Wait for me!",emotionalTip:"El nudo en el estómago mientras esperas los resultados del médico. WAIT es ansiedad contenida."},{word:"Tell",meaning:"Decir / Contar",type:"word",category:"Verbos",example:"Tell me more.",emotionalTip:'Cuando te mueres por saber un secreto. "TELL me!" Curiosidad que te consume.'},{word:"Ask",meaning:"Preguntar / Pedir",type:"word",category:"Verbos",example:"Can I ask you something?",emotionalTip:"El terror de pedir un aumento a tu jefe. ASK cuando tu voz tiembla un poco."},{word:"Feel",meaning:"Sentir / Sentirse",type:"word",category:"Verbos",example:"I feel tired today.",emotionalTip:"Cuando alguien pregunta cómo estás y no tienes palabras para explicarlo. I FEEL... todo y nada."},{word:"Remember",meaning:"Recordar",type:"word",category:"Verbos",example:"I don't remember his name.",emotionalTip:"Ese olor que te transporta a casa de tus abuelos. REMEMBER es nostalgia instantánea."},{word:"Forget",meaning:"Olvidar",type:"word",category:"Verbos",example:"I forgot my wallet.",emotionalTip:"El pánico de olvidar algo importante: un cumpleaños, una cita, la estufa encendida."},{word:"Leave",meaning:"Irse / Dejar",type:"word",category:"Verbos",example:"I'm leaving now.",emotionalTip:"Cerrar la puerta de casa de tus padres por última vez. LEAVE duele cuando es definitivo."},{word:"Stay",meaning:"Quedarse",type:"word",category:"Verbos",example:"Stay here, I'll be back.",emotionalTip:'Cuando alguien que amas se va pero tú no puedes acompañarle. "STAY with me." La súplica.'},{word:"Send",meaning:"Enviar",type:"word",category:"Verbos",example:"Send me the details.",emotionalTip:"Enviar ese mensaje arriesgado y quedarte mirando la pantalla esperando respuesta."},{word:"After",meaning:"Después de",type:"connector",category:"Conectores",example:"After work, I go to the gym.",emotionalTip:"El alivio que sientes después de superar algo duro. AFTER the storm, la calma."},{word:"Before",meaning:"Antes de",type:"connector",category:"Conectores",example:"Before I forget...",emotionalTip:"Los nervios la noche BEFORE de un examen importante. La anticipación nerviosa."},{word:"When",meaning:"Cuando",type:"connector",category:"Conectores",example:"When I was young...",emotionalTip:"Cuando recuerdas épocas mejores. WHEN I was happy... Nostalgia de lo que fue."},{word:"While",meaning:"Mientras",type:"connector",category:"Conectores",example:"I listen to music while I work.",emotionalTip:"Esos pequeños placeres que haces mientras trabajas. WHILE: robar momentos de felicidad."},{word:"If",meaning:"Si (condicional)",type:"connector",category:"Conectores",example:"If you want, we can go.",emotionalTip:'El condicional de los arrepentimientos. "IF I had..." Las decisiones que no tomaste.'},{word:"Anyway",meaning:"De todas formas / Bueno",type:"connector",category:"Conectores",example:"Anyway, let's go.",emotionalTip:"Cuando cambias de tema incómodo. ANYWAY... cortando una conversación difícil."},{word:"By the way",meaning:"Por cierto",type:"connector",category:"Conectores",example:"By the way, where is John?",emotionalTip:"Cuando quieres preguntar algo pero finges que es casual. Como si no te importara."},{word:"For example",meaning:"Por ejemplo",type:"connector",category:"Conectores",example:"I like fruits, for example, apples.",emotionalTip:"Cuando intentas explicarte y buscas algo concreto para que te entiendan."},{word:"I mean",meaning:"O sea / Quiero decir",type:"connector",category:"Conectores",example:"I mean, it's not bad.",emotionalTip:"Cuando metes la pata y tratas de arreglarlo. I MEAN... retrocediendo torpemente."},{word:"You know",meaning:"Ya sabes / Sabes",type:"connector",category:"Conectores",example:"It's like, you know, complicated.",emotionalTip:"Buscando complicidad cuando no sabes explicarte. YOU KNOW... esperando que te entiendan."},{word:"Look for",meaning:"Buscar",type:"phrasal",category:"Phrasal Verbs",example:"I'm looking for my keys.",emotionalTip:"La desesperación de buscar las llaves cuando llegas tarde. Frustración pura."},{word:"Pick up",meaning:"Recoger / Coger",type:"phrasal",category:"Phrasal Verbs",example:"I'll pick you up at 8.",emotionalTip:"Que alguien venga a recogerte. Sentirte cuidado, no tener que apañártelas solo."},{word:"Give up",meaning:"Rendirse / Dejar de",type:"phrasal",category:"Phrasal Verbs",example:"Don't give up!",emotionalTip:"El momento de rendirte después de intentarlo todo. La derrota que duele en el pecho."},{word:"Come back",meaning:"Volver",type:"phrasal",category:"Phrasal Verbs",example:"When are you coming back?",emotionalTip:"Esperar el regreso de alguien querido. La esperanza mezclada con añoranza."},{word:"Find out",meaning:"Descubrir / Enterarse",type:"phrasal",category:"Expresiones",example:"I found out he lied.",emotionalTip:"El golpe de descubrir una traición. Enterarte de algo que te rompe por dentro."},{word:"Hurry up",meaning:"Darse prisa",type:"phrasal",category:"Phrasal Verbs",example:"Hurry up, we're late!",emotionalTip:"La adrenalina del estrés cuando vas contra reloj. El corazón acelerado."},{word:"Grow up",meaning:"Crecer / Madurar",type:"phrasal",category:"Phrasal Verbs",example:"I grew up in Madrid.",emotionalTip:"Cuando alguien te dice que madures y te duele porque sabes que tiene razón."},{word:"Give back",meaning:"Devolver",type:"phrasal",category:"Phrasal Verbs",example:"Give me back my phone!",emotionalTip:"Que alguien tenga algo tuyo y se niegue a devolverlo. Impotencia y rabia."},{word:"Write down",meaning:"Apuntar / Anotar",type:"phrasal",category:"Phrasal Verbs",example:"Write down the address.",emotionalTip:"Apuntar algo importante con miedo de olvidarlo. La inseguridad de tu memoria."},{word:"Log in",meaning:"Iniciar sesión",type:"phrasal",category:"Phrasal Verbs",example:"Log in with your email.",emotionalTip:"No recordar la contraseña después de mil intentos. La frustración digital moderna."},{word:"What's up?",meaning:"¿Qué pasa? / ¿Qué tal?",type:"expression",category:"Expresiones",example:"Hey! What's up?",emotionalTip:"Ese amigo que te saluda como si no pasara el tiempo. Familiaridad instantánea."},{word:"Take care",meaning:"Cuídate",type:"expression",category:"Expresiones",example:"See you! Take care.",emotionalTip:"Decirle a alguien que se cuide porque de verdad te importa su bienestar."},{word:"Good luck",meaning:"Buena suerte",type:"expression",category:"Expresiones",example:"Good luck with your exam!",emotionalTip:"Cuando alguien te desea suerte y sientes que alguien cree en ti."},{word:"Never mind",meaning:"No importa / Déjalo",type:"expression",category:"Expresiones",example:"Never mind, forget it.",emotionalTip:"Cuando renuncias a explicar algo porque nadie te entiende. Resignación silenciosa."},{word:"It doesn't matter",meaning:"No importa / Da igual",type:"expression",category:"Expresiones",example:"It doesn't matter, really.",emotionalTip:"Decir que no importa cuando en realidad sí importa. La mentira piadosa."},{word:"I have no idea",meaning:"Ni idea / No tengo ni idea",type:"expression",category:"Expresiones",example:"I have no idea what happened.",emotionalTip:"Cuando estás completamente perdido y lo admites. Honestidad vulnerable."},{word:"Just a moment",meaning:"Un momento",type:"expression",category:"Expresiones",example:"Just a moment, please.",emotionalTip:"Pedir tiempo cuando te presionan. Necesitar un respiro antes de continuar."},{word:"That's fine",meaning:"Está bien / Vale",type:"expression",category:"Expresiones",example:"That's fine with me.",emotionalTip:"Conformarte con algo aunque preferirías otra cosa. Ceder para evitar conflicto."},{word:"I'm not sure",meaning:"No estoy seguro/a",type:"expression",category:"Expresiones",example:"I'm not sure if I can go.",emotionalTip:"La duda que te paraliza. No saber qué hacer y temer equivocarte."},{word:"Well done!",meaning:"¡Bien hecho!",type:"expression",category:"Expresiones",example:"You passed! Well done!",emotionalTip:"Cuando alguien reconoce tu esfuerzo. Sentir que has valido la pena."}]},{id:"a2-work",name:"A2 - Trabajo y Oficina",icon:"fa-briefcase",description:"Vocabulario básico para el entorno laboral: emails, reuniones, compañeros y tareas diarias.",level:"A2",words:[{word:"Meeting",meaning:"Reunión",type:"word",category:"Trabajo",example:"We have a meeting at 3.",emotionalTip:"Esa cita que a veces ayuda y a veces roba tiempo. El ritual corporativo."},{word:"Email",meaning:"Correo electrónico",type:"word",category:"Trabajo",example:"I'll send you an email.",emotionalTip:"El inbox que nunca para. Mensajes esperando tu respuesta."},{word:"Boss",meaning:"Jefe/a",type:"word",category:"Trabajo",example:"My boss is in a meeting.",emotionalTip:"La persona que puede hacerte el día fácil o difícil. Respeto y a veces miedo."},{word:"Team",meaning:"Equipo",type:"word",category:"Trabajo",example:"Our team is growing.",emotionalTip:"Las personas con las que compartes horas de tu vida. Tu segunda familia."},{word:"Colleague",meaning:"Compañero/a de trabajo",type:"word",category:"Trabajo",example:"She's my colleague.",emotionalTip:"Alguien que entiende tu día a día. Aliado en las trincheras."},{word:"Deadline",meaning:"Fecha límite",type:"word",category:"Trabajo",example:"The deadline is Friday.",emotionalTip:"La fecha que te persigue. El estrés que aumenta cada día."},{word:"Task",meaning:"Tarea",type:"word",category:"Trabajo",example:"I have many tasks today.",emotionalTip:"La lista que parece no acabar. Pequeñas victorias al tacharlas."},{word:"Project",meaning:"Proyecto",type:"word",category:"Trabajo",example:"We're starting a new project.",emotionalTip:"Algo grande que construyes poco a poco. Orgullo cuando sale bien."},{word:"Office",meaning:"Oficina",type:"word",category:"Trabajo",example:"I work in an office.",emotionalTip:"El lugar donde pasas tanto tiempo. A veces cárcel, a veces hogar."},{word:"Desk",meaning:"Escritorio",type:"word",category:"Trabajo",example:"My desk is a mess.",emotionalTip:"Tu pequeño territorio personal. Refleja quién eres."},{word:"Salary",meaning:"Salario / Sueldo",type:"word",category:"Trabajo",example:"What's the salary?",emotionalTip:"El número que define tu mes. El valor que ponen a tu tiempo."},{word:"Interview",meaning:"Entrevista",type:"word",category:"Trabajo",example:"I have a job interview tomorrow.",emotionalTip:"Los nervios de venderte a ti mismo. Esperando que te elijan."},{word:"Apply",meaning:"Solicitar / Aplicar",type:"word",category:"Trabajo",example:"I want to apply for this job.",emotionalTip:"Dar el primer paso hacia algo nuevo. Esperanza y miedo."},{word:"Hire",meaning:"Contratar",type:"word",category:"Trabajo",example:"We want to hire you!",emotionalTip:"Las palabras que cambian tu vida. La puerta que se abre."},{word:"Fire",meaning:"Despedir",type:"word",category:"Trabajo",example:"They fired him yesterday.",emotionalTip:"El golpe que nadie espera. El suelo que desaparece bajo tus pies."},{word:"Quit",meaning:"Dimitir / Dejar",type:"word",category:"Trabajo",example:"She quit her job.",emotionalTip:"La decisión valiente de irte. Libertad mezclada con incertidumbre."},{word:"Busy",meaning:"Ocupado/a",type:"word",category:"Trabajo",example:"Sorry, I'm really busy now.",emotionalTip:"La excusa más usada. A veces verdad, a veces escudo."},{word:"Flexible",meaning:"Flexible",type:"word",category:"Trabajo",example:"We need to be flexible with deadlines.",emotionalTip:"Adaptarte a los cambios sin romperte. La elasticidad profesional."},{word:"Urgent",meaning:"Urgente",type:"word",category:"Trabajo",example:"This is urgent!",emotionalTip:"Todo parece urgente siempre. El estrés de lo inmediato."},{word:"Important",meaning:"Importante",type:"word",category:"Trabajo",example:"This is very important.",emotionalTip:"Lo que de verdad merece tu atención. Separar lo esencial."},{word:"Schedule",meaning:"Horario / Programar",type:"word",category:"Trabajo",example:"Let me check my schedule.",emotionalTip:"El puzzle de encajar todo. Tu tiempo organizado en bloques."},{word:"Report",meaning:"Informe",type:"word",category:"Trabajo",example:"I need to write a report.",emotionalTip:"Poner en papel lo que hiciste. Demostrar tu trabajo."},{word:"Presentation",meaning:"Presentación",type:"word",category:"Trabajo",example:"I have a presentation tomorrow.",emotionalTip:"Hablar delante de otros. Los nervios antes, el alivio después."},{word:"Client",meaning:"Cliente",type:"word",category:"Trabajo",example:"The client is happy.",emotionalTip:"La persona a quien sirves. Su satisfacción es tu éxito."},{word:"Contract",meaning:"Contrato",type:"word",category:"Trabajo",example:"Please sign the contract.",emotionalTip:"El papel que formaliza todo. Seguridad en tinta."},{word:"Shift",meaning:"Turno",type:"word",category:"Trabajo",example:"My shift ends at 6.",emotionalTip:"Las horas que vendes. Contar el tiempo hasta irte."},{word:"Break",meaning:"Descanso",type:"word",category:"Trabajo",example:"Let's take a break.",emotionalTip:"El respiro que necesitas. Recuperar energía para seguir."},{word:"Overtime",meaning:"Horas extra",type:"word",category:"Trabajo",example:"I worked overtime yesterday.",emotionalTip:"Dar más de lo que deberías. A veces voluntario, a veces no."},{word:"Promotion",meaning:"Ascenso",type:"word",category:"Trabajo",example:"I got a promotion!",emotionalTip:"El reconocimiento que esperabas. Subir un peldaño."},{word:"Raise",meaning:"Aumento de sueldo",type:"word",category:"Trabajo",example:"I asked for a raise.",emotionalTip:"Pedir lo que crees merecer. El valor de tu trabajo."},{word:"Thank you for your email",meaning:"Gracias por tu email",type:"expression",category:"Trabajo",example:"Thank you for your email.",emotionalTip:"La cortesía digital. Empezar con educación."},{word:"Please find attached",meaning:"Adjunto encontrarás",type:"expression",category:"Trabajo",example:"Please find attached the report.",emotionalTip:"El archivo que acompaña tus palabras. Prueba tangible."},{word:"As soon as possible",meaning:"Lo antes posible",type:"expression",category:"Trabajo",example:"I need this ASAP.",emotionalTip:"La urgencia en cuatro letras. Presión del tiempo."},{word:"Looking forward to",meaning:"Esperando con ganas",type:"expression",category:"Trabajo",example:"Looking forward to your reply.",emotionalTip:"Anticipar la respuesta. Educada forma de presionar."},{word:"Get back to you",meaning:"Responder / Volver a contactar",type:"expression",category:"Trabajo",example:"I'll get back to you on that.",emotionalTip:"La promesa de una respuesta. A veces llega, a veces no."},{word:"Sorry for the delay",meaning:"Perdón por la demora",type:"expression",category:"Trabajo",example:"Sorry for the delay in replying.",emotionalTip:"Reconocer que tardaste. La culpa del inbox lleno."},{word:"Best regards",meaning:"Saludos cordiales",type:"expression",category:"Trabajo",example:"Best regards, John.",emotionalTip:"El cierre estándar. Neutral y profesional."},{word:"I'm calling about",meaning:"Llamo por / respecto a",type:"expression",category:"Trabajo",example:"I'm calling about the invoice.",emotionalTip:"Ir al grano por teléfono. Explicar tu propósito."},{word:"Could you please",meaning:"¿Podrías por favor?",type:"expression",category:"Trabajo",example:"Could you please send me the file?",emotionalTip:"Pedir con educación. La cortesía que abre puertas."},{word:"I'll do my best",meaning:"Haré lo que pueda",type:"expression",category:"Trabajo",example:"I'll do my best to finish on time.",emotionalTip:"Prometer esfuerzo, no resultado. Honestidad moderada."}]},{id:"b1-complete",name:"B1 - Intermediate Pack",icon:"fa-tree",description:"Para hablar con fluidez: verbos para opinar y expresarte, conectores para no quedarte callado, phrasal verbs esenciales y expresiones que usas cada día.",level:"B1",words:[{word:"Seem",meaning:"Parecer",type:"word",category:"Verbos",example:"It seems like a good idea.",emotionalTip:"Cuando algo PARECE perfecto pero tu intuición te dice que no. SEEM es la máscara que oculta la realidad."},{word:"Guess",meaning:"Suponer / Adivinar",type:"word",category:"Verbos",example:"I guess you're right.",emotionalTip:"Cuando no estás seguro pero tienes que responder igual. I GUESS... inseguridad disfrazada de respuesta."},{word:"Expect",meaning:"Esperar (expectativa)",type:"word",category:"Verbos",example:"I didn't expect that.",emotionalTip:"La decepción cuando la realidad no coincide con lo que esperabas. Expectativas rotas."},{word:"Realize",meaning:"Darse cuenta",type:"word",category:"Verbos",example:"I just realized I forgot my wallet.",emotionalTip:"Ese momento de horror cuando COMPRENDES lo que has hecho mal. La verdad que te golpea."},{word:"Agree",meaning:"Estar de acuerdo",type:"word",category:"Verbos",example:"I totally agree with you.",emotionalTip:"Cuando por fin alguien piensa como tú y no te sientes solo. Conexión de ideas."},{word:"Suggest",meaning:"Sugerir",type:"word",category:"Verbos",example:"I suggest we take a break.",emotionalTip:"Proponer algo con miedo a que lo rechacen. SUGGEST es la idea tímida que lanzas al aire."},{word:"Recommend",meaning:"Recomendar",type:"word",category:"Verbos",example:"I recommend this restaurant.",emotionalTip:"Cuando recomiendas algo personal y temes que no les guste. Tu gusto expuesto al juicio."},{word:"Manage",meaning:"Conseguir / Arreglárselas",type:"word",category:"Verbos",example:"I managed to finish on time.",emotionalTip:"El orgullo de lograrlo cuando todos pensaban que fallarías. Contra todo pronóstico, lo conseguiste."},{word:"Afford",meaning:"Permitirse (dinero)",type:"word",category:"Verbos",example:"I can't afford a new car.",emotionalTip:"Mirar el precio de algo y sentir que la vida es injusta. No poder permitírtelo duele."},{word:"Improve",meaning:"Mejorar",type:"word",category:"Verbos",example:"My English is improving.",emotionalTip:"Ver tu propio progreso después de mucho esfuerzo. Esa satisfacción de ser mejor que ayer."},{word:"Although",meaning:"Aunque",type:"connector",category:"Conectores",example:"Although it was late, I finished.",emotionalTip:"Cuando reconoces un problema pero sigues adelante. ALTHOUGH: sí, es difícil, pero no me rindo."},{word:"However",meaning:"Sin embargo",type:"connector",category:"Conectores",example:"It's cheap. However, it's bad quality.",emotionalTip:'El "pero" elegante que rompe las ilusiones. Te digo algo bueno... HOWEVER, viene lo malo.'},{word:"Instead",meaning:"En su lugar",type:"connector",category:"Conectores",example:"Let's do this instead.",emotionalTip:"Cambiar de plan cuando el original no funciona. Adaptarse o morir."},{word:"Besides",meaning:"Además",type:"connector",category:"Conectores",example:"It's late, and besides, I'm tired.",emotionalTip:"Acumular razones para justificarte. Y además... y ADEMÁS... la lista de excusas crece."},{word:"Otherwise",meaning:"Si no / De lo contrario",type:"connector",category:"Conectores",example:"Hurry up, otherwise we'll be late.",emotionalTip:"La amenaza que anticipa consecuencias. Hazlo... OTHERWISE la vas a liar."},{word:"Even though",meaning:"Aunque (enfático)",type:"connector",category:"Conectores",example:"Even though I studied, I failed.",emotionalTip:"La injusticia de esforzarte y fracasar igual. Hice TODO bien y aun así..."},{word:"Basically",meaning:"Básicamente",type:"connector",category:"Conectores",example:"Basically, it's done.",emotionalTip:"Cuando resumes porque la otra persona no pilla los detalles. Simplificando para tontos."},{word:"Apparently",meaning:"Por lo visto / Al parecer",type:"connector",category:"Conectores",example:"Apparently, he quit his job.",emotionalTip:"El cotilleo elegante. No lo sé de primera mano, pero APPARENTLY... el chismorreo educado."},{word:"Obviously",meaning:"Obviamente",type:"connector",category:"Conectores",example:"Obviously, I said yes.",emotionalTip:"Cuando algo es tan evidente que te sorprende tener que explicarlo. Puro duh."},{word:"Hopefully",meaning:"Ojalá / Con suerte",type:"connector",category:"Conectores",example:"Hopefully, it will work.",emotionalTip:"Esa esperanza frágil cuando no tienes el control. HOPEFULLY... cruzando los dedos."},{word:"Figure out",meaning:"Entender / Resolver",type:"phrasal",category:"Phrasal Verbs",example:"I can't figure out this problem.",emotionalTip:"La frustración de no entender algo que deberías entender. La solución que se te escapa."},{word:"Work out",meaning:"Hacer ejercicio / Funcionar",type:"phrasal",category:"Phrasal Verbs",example:"Things will work out, don't worry.",emotionalTip:"La fe de que todo se solucionará aunque no veas cómo. Optimismo en la incertidumbre."},{word:"Show up",meaning:"Aparecer / Presentarse",type:"phrasal",category:"Phrasal Verbs",example:"He didn't show up to the meeting.",emotionalTip:"Esperar a alguien que nunca llega. El plantón, la decepción de que no aparezca."},{word:"Run out of",meaning:"Quedarse sin",type:"phrasal",category:"Phrasal Verbs",example:"We ran out of milk.",emotionalTip:"Ese vacío cuando se acaba algo que necesitabas. No queda nada y lo descubres demasiado tarde."},{word:"Get along with",meaning:"Llevarse bien con",type:"phrasal",category:"Phrasal Verbs",example:"I get along with my boss.",emotionalTip:"La paz de trabajar con alguien que te cae bien. Cuando las relaciones fluyen sin esfuerzo."},{word:"Set up",meaning:"Organizar / Configurar",type:"phrasal",category:"Phrasal Verbs",example:"Let's set up a meeting.",emotionalTip:"Tomar las riendas y organizar algo. Sentirte capaz de crear orden del caos."},{word:"Catch up",meaning:"Ponerse al día",type:"phrasal",category:"Phrasal Verbs",example:"Let's catch up over coffee!",emotionalTip:"Reencontrarte con un viejo amigo y contaros todo. El calor de retomar una amistad."},{word:"Hang up",meaning:"Colgar (teléfono)",type:"phrasal",category:"Phrasal Verbs",example:"Don't hang up on me!",emotionalTip:"Cortar una llamada en medio de una discusión. El silencio que sigue al click."},{word:"Look forward to",meaning:"Tener ganas de",type:"phrasal",category:"Phrasal Verbs",example:"I'm looking forward to the weekend!",emotionalTip:"La ilusión de algo bueno que está por venir. Anticipación feliz."},{word:"Put off",meaning:"Posponer",type:"phrasal",category:"Phrasal Verbs",example:"Stop putting it off, do it now!",emotionalTip:"El arte de dejar para mañana lo que deberías hacer hoy. La culpa del procrastinador."},{word:"It's up to you",meaning:"Tú decides / Depende de ti",type:"expression",category:"Expresiones",example:"Pizza or sushi? It's up to you.",emotionalTip:"Cuando te dan el poder de decidir y no sabes si es un regalo o una carga."},{word:"That makes sense",meaning:"Tiene sentido",type:"expression",category:"Expresiones",example:"Oh, that makes sense now!",emotionalTip:"El click mental cuando por fin entiendes algo. El alivio de que encaje."},{word:"It's not a big deal",meaning:"No es para tanto",type:"expression",category:"Expresiones",example:"Relax, it's not a big deal.",emotionalTip:"Calmar a alguien que exagera. O fingir que algo no te afecta cuando sí lo hace."},{word:"Let me know",meaning:"Avísame / Dime",type:"expression",category:"Expresiones",example:"Let me know if you need help.",emotionalTip:"Ofrecer ayuda genuina. Estar ahí para alguien sin imponerte."},{word:"To be honest",meaning:"Para ser sincero/a",type:"expression",category:"Expresiones",example:"To be honest, I don't like it.",emotionalTip:"Armarte de valor para decir la verdad incómoda. Honestidad que puede doler."},{word:"I'm not in the mood",meaning:"No me apetece",type:"expression",category:"Expresiones",example:"I'm not in the mood for a party.",emotionalTip:"Cuando tu cuerpo y tu mente dicen que no. Respetar tu propio estado emocional."},{word:"Fair enough",meaning:"Me parece bien / Vale",type:"expression",category:"Expresiones",example:"Fair enough, let's do it.",emotionalTip:"Aceptar el argumento del otro aunque no estés 100% convencido. Ceder con dignidad."},{word:"It depends",meaning:"Depende",type:"expression",category:"Expresiones",example:"Are you coming? It depends.",emotionalTip:"La respuesta cobarde cuando no quieres comprometerte. Dejando todas las puertas abiertas."},{word:"That's the thing",meaning:"Esa es la cuestión",type:"expression",category:"Expresiones",example:"That's the thing, I don't know.",emotionalTip:"Señalar el problema central. Ir al meollo del asunto, al quid de la cuestión."},{word:"I'll let you know",meaning:"Ya te diré / Te aviso",type:"expression",category:"Expresiones",example:"I'll let you know tomorrow.",emotionalTip:"Ganar tiempo para pensarlo. O una forma educada de no comprometerse."}]},{id:"b1-relationships",name:"B1 - Conexiones y Relaciones",icon:"fa-handshake",description:"Vocabulario para hacer amigos, conocer gente, citas y relaciones sociales.",level:"B1",words:[{word:"Get on well",meaning:"Llevarse bien",type:"phrasal",category:"Relaciones",example:"We get on really well.",emotionalTip:"Esa química natural con alguien. Cuando todo fluye sin esfuerzo."},{word:"Fall out",meaning:"Pelearse / Distanciarse",type:"phrasal",category:"Relaciones",example:"They fell out over money.",emotionalTip:"Cuando una amistad se rompe. El silencio después de la pelea."},{word:"Make up",meaning:"Reconciliarse",type:"phrasal",category:"Relaciones",example:"They made up after the fight.",emotionalTip:"El alivio de recuperar a alguien. El abrazo después del orgullo."},{word:"Ask out",meaning:"Pedir una cita",type:"phrasal",category:"Relaciones",example:"He asked her out.",emotionalTip:"El terror de arriesgarte a un no. El corazón latiendo antes de hablar."},{word:"Break up",meaning:"Romper (relación)",type:"phrasal",category:"Relaciones",example:"They broke up last month.",emotionalTip:"El final de algo que fue bueno. Dolor aunque sea lo correcto."},{word:"Hit it off",meaning:"Conectar enseguida",type:"phrasal",category:"Relaciones",example:"We hit it off immediately.",emotionalTip:"Cuando la conexión con alguien es instantánea. Química natural."},{word:"Hang out",meaning:"Pasar el rato",type:"phrasal",category:"Relaciones",example:"We hang out every weekend.",emotionalTip:"Tiempo sin planes concretos. La presencia vale más que la actividad."},{word:"Keep in touch",meaning:"Mantener el contacto",type:"expression",category:"Relaciones",example:"Let's keep in touch!",emotionalTip:"La promesa que a veces se olvida. La intención de no perder a alguien."},{word:"Drift apart",meaning:"Distanciarse poco a poco",type:"phrasal",category:"Relaciones",example:"We drifted apart over the years.",emotionalTip:"Cuando la amistad se enfría sin drama. El vacío silencioso."},{word:"Trust",meaning:"Confiar / Confianza",type:"word",category:"Relaciones",example:"I trust you completely.",emotionalTip:"Poner tu vulnerabilidad en manos de otro. El regalo de la fe ciega."},{word:"Honest",meaning:"Honesto/a",type:"word",category:"Relaciones",example:"Be honest with me.",emotionalTip:"Pedir la verdad aunque duela. Preferir el dolor a la mentira."},{word:"Loyal",meaning:"Leal",type:"word",category:"Relaciones",example:"She's a loyal friend.",emotionalTip:"Alguien que está cuando todos se van. El tesoro humano."},{word:"Supportive",meaning:"Que apoya",type:"word",category:"Relaciones",example:"My family is very supportive.",emotionalTip:"Sentir que alguien cree en ti. El empujón cuando te falta fuerza."},{word:"Jealous",meaning:"Celoso/a",type:"word",category:"Relaciones",example:"Don't be jealous.",emotionalTip:"El miedo a perder a alguien. La inseguridad que quema."},{word:"Awkward",meaning:"Incómodo",type:"word",category:"Relaciones",example:"It was really awkward.",emotionalTip:"Esos silencios que te hacen querer desaparecer. La incomodidad social."},{word:"Comfortable",meaning:"Cómodo/a",type:"word",category:"Relaciones",example:"I feel comfortable with her.",emotionalTip:"Poder ser tú mismo sin filtros. La paz de ser aceptado."},{word:"Chemistry",meaning:"Química (atracción)",type:"word",category:"Relaciones",example:"There's real chemistry between us.",emotionalTip:"Esa conexión inexplicable. Cuando algo funciona sin razón aparente."},{word:"Committed",meaning:"Comprometido/a",type:"word",category:"Relaciones",example:"We're in a committed relationship.",emotionalTip:"Elegir a alguien cada día. La decisión de quedarse."},{word:"Casual",meaning:"Informal / Sin compromiso",type:"word",category:"Relaciones",example:"It's just casual.",emotionalTip:"Sin ataduras pero a veces sin claridad. La libertad confusa."},{word:"Boundaries",meaning:"Límites",type:"word",category:"Relaciones",example:"We need to set boundaries.",emotionalTip:"Proteger tu espacio emocional. Decir hasta aquí con respeto."},{word:"We have a lot in common",meaning:"Tenemos mucho en común",type:"expression",category:"Relaciones",example:"We have a lot in common.",emotionalTip:"Descubrir que alguien comparte tu mundo. La emoción de no estar solo."},{word:"We clicked instantly",meaning:"Conectamos al instante",type:"expression",category:"Relaciones",example:"We clicked instantly.",emotionalTip:"Cuando conoces a alguien y parece que ya lo conocías. Magia social."},{word:"Let's grab a coffee",meaning:"Tomemos un café",type:"expression",category:"Relaciones",example:"Let's grab a coffee sometime.",emotionalTip:"La invitación casual que puede cambiar todo. El primer paso."},{word:"Are you seeing anyone?",meaning:"¿Estás saliendo con alguien?",type:"expression",category:"Relaciones",example:"Are you seeing anyone?",emotionalTip:"La pregunta de reconocimiento. Querer saber si hay posibilidad."},{word:"It's complicated",meaning:"Es complicado",type:"expression",category:"Relaciones",example:"Our situation is complicated.",emotionalTip:"Cuando no hay una respuesta simple. Relaciones que no encajan en cajas."},{word:"Give me space",meaning:"Dame espacio",type:"expression",category:"Relaciones",example:"I need you to give me space.",emotionalTip:"Necesitar aire para pensar. Pedir distancia sin cerrar la puerta."},{word:"I'm not ready",meaning:"No estoy preparado/a",type:"expression",category:"Relaciones",example:"I'm not ready for a relationship.",emotionalTip:"Reconocer tus limitaciones. El no honesto que protege a ambos."},{word:"We need to talk",meaning:"Tenemos que hablar",type:"expression",category:"Relaciones",example:"We need to talk.",emotionalTip:"Las palabras que hielan la sangre. La conversación que viene."},{word:"I'm here for you",meaning:"Estoy aquí para ti",type:"expression",category:"Relaciones",example:"Whatever happens, I'm here for you.",emotionalTip:"La promesa de apoyo incondicional. Saber que no estás solo."},{word:"Let's take it slow",meaning:"Vayamos despacio",type:"expression",category:"Relaciones",example:"Let's take things slow.",emotionalTip:"No querer estropear algo bueno. Cuidar lo que empieza."},{word:"Ghost",meaning:"Ignorar / Desaparecer",type:"word",category:"Relaciones",example:"He ghosted me.",emotionalTip:"Desaparecer sin explicación. El silencio que duele más que un no."},{word:"Red flag",meaning:"Señal de alarma",type:"expression",category:"Relaciones",example:"That's a red flag.",emotionalTip:"Ver algo que te advierte de peligro. La intuición que protege."},{word:"Mixed signals",meaning:"Señales confusas",type:"expression",category:"Relaciones",example:"He's sending mixed signals.",emotionalTip:"No saber a qué atenerte. La confusión que agota."},{word:"Open up",meaning:"Abrirse (emocionalmente)",type:"phrasal",category:"Relaciones",example:"It's hard for me to open up.",emotionalTip:"Mostrar tu vulnerabilidad. El miedo a ser juzgado."},{word:"Let someone down",meaning:"Defraudar a alguien",type:"phrasal",category:"Relaciones",example:"I don't want to let you down.",emotionalTip:"El peso de las expectativas de otros. No querer decepcionar."},{word:"Stand by someone",meaning:"Apoyar a alguien",type:"phrasal",category:"Relaciones",example:"I'll stand by you no matter what.",emotionalTip:"Estar al lado de alguien pase lo que pase. Lealtad en acción."},{word:"Look out for",meaning:"Cuidar de / Proteger",type:"phrasal",category:"Relaciones",example:"We look out for each other.",emotionalTip:"Vigilar el bienestar de alguien. El cuidado que va en ambos sentidos."},{word:"Count on",meaning:"Contar con",type:"phrasal",category:"Relaciones",example:"You can count on me.",emotionalTip:"Saber que alguien estará ahí. La seguridad de no enfrentar solo."},{word:"Bond",meaning:"Vínculo / Unirse",type:"word",category:"Relaciones",example:"We bonded over our love of music.",emotionalTip:"Crear una conexión profunda. Lo que une almas diferentes."},{word:"Mutual",meaning:"Mutuo",type:"word",category:"Relaciones",example:"The feeling is mutual.",emotionalTip:"Cuando ambos sienten lo mismo. La reciprocidad perfecta."}]},{id:"b2-complete",name:"B2 - Upper-Intermediate Pack",icon:"fa-mountain",description:"Para sonar natural: verbos que usan los nativos, conectores para debatir, phrasal verbs del día a día y expresiones que escuchas en series y películas.",level:"B2",words:[{word:"Assume",meaning:"Suponer / Asumir",type:"word",category:"Verbos",example:"I assume you know about it.",emotionalTip:"Cuando das algo por hecho y luego descubres que estabas equivocado. La vergüenza de asumir."},{word:"Consider",meaning:"Considerar / Plantearse",type:"word",category:"Verbos",example:"Have you considered moving?",emotionalTip:"Esa pregunta que te hace replantearte toda tu vida. ¿Y si todo pudiera ser diferente?"},{word:"Tend to",meaning:"Tender a / Soler",type:"word",category:"Verbos",example:"I tend to wake up early.",emotionalTip:"Reconocer tus patrones, buenos o malos. Ser consciente de quién eres realmente."},{word:"Involve",meaning:"Implicar / Involucrar",type:"word",category:"Verbos",example:"What does the job involve?",emotionalTip:"Antes de meterte en algo, preguntar qué implica. El miedo a comprometerte sin saber."},{word:"Struggle",meaning:"Luchar / Costar (esfuerzo)",type:"word",category:"Verbos",example:"I struggle with mornings.",emotionalTip:"Esa batalla diaria contra algo que otros hacen fácilmente. Sentirte incapaz a veces."},{word:"Achieve",meaning:"Lograr / Conseguir",type:"word",category:"Verbos",example:"She achieved her goals.",emotionalTip:"Cruzar la meta después de sacrificarlo todo. El orgullo que te llena el pecho."},{word:"Avoid",meaning:"Evitar",type:"word",category:"Verbos",example:"I try to avoid sugar.",emotionalTip:"Los caminos largos que tomas para no enfrentar algo. Huir de lo que te asusta."},{word:"Convince",meaning:"Convencer",type:"word",category:"Verbos",example:"You convinced me!",emotionalTip:"Cuando alguien cambia tu mente con argumentos. Rendirte ante una verdad mejor."},{word:"Complain",meaning:"Quejarse",type:"word",category:"Verbos",example:"Stop complaining!",emotionalTip:"Ese alivio de desahogarte, aunque nadie pueda arreglarlo. Necesitar que te escuchen."},{word:"Appreciate",meaning:"Agradecer / Valorar",type:"word",category:"Verbos",example:"I really appreciate your help.",emotionalTip:"Gratitud genuina hacia alguien que estuvo ahí cuando lo necesitabas. Reconocer el valor."},{word:"Therefore",meaning:"Por lo tanto",type:"connector",category:"Conectores",example:"It was late, therefore we left.",emotionalTip:"La conclusión inevitable después de analizar todo. No hay más opción que..."},{word:"Nevertheless",meaning:"Sin embargo / Aun así",type:"connector",category:"Conectores",example:"It was hard. Nevertheless, I did it.",emotionalTip:"Cuando todo estaba en contra pero lo hiciste igual. La terquedad que te salvó."},{word:"On the other hand",meaning:"Por otro lado",type:"connector",category:"Conectores",example:"It's cheap, but on the other hand, it's slow.",emotionalTip:"Ver las dos caras de la moneda. Esa duda entre dos verdades que compiten."},{word:"In that case",meaning:"En ese caso",type:"connector",category:"Conectores",example:"In that case, count me in!",emotionalTip:"Cuando una nueva información cambia tu decisión completamente. Adaptarte sobre la marcha."},{word:"As long as",meaning:"Siempre que / Mientras",type:"connector",category:"Conectores",example:"You can go as long as you're back by 10.",emotionalTip:"La condición que pones para dar permiso. Control y confianza a partes iguales."},{word:"Unless",meaning:"A menos que",type:"connector",category:"Conectores",example:"I'll go unless it rains.",emotionalTip:"La excepción que podría arruinarlo todo. La puerta de escape que te dejas."},{word:"Despite",meaning:"A pesar de",type:"connector",category:"Conectores",example:"Despite the rain, we had fun.",emotionalTip:"Cuando las circunstancias eran malas pero tú eras más fuerte. Victoria sobre la adversidad."},{word:"Whereas",meaning:"Mientras que",type:"connector",category:"Conectores",example:"I like tea, whereas he prefers coffee.",emotionalTip:"Las diferencias que hacen única cada relación. Aceptar que no todos somos iguales."},{word:"On top of that",meaning:"Además de eso / Encima",type:"connector",category:"Conectores",example:"I'm tired and, on top of that, hungry.",emotionalTip:"Cuando los problemas se acumulan uno encima del otro. La gota que colma el vaso."},{word:"That being said",meaning:"Dicho esto",type:"connector",category:"Conectores",example:"That being said, I still think it's worth it.",emotionalTip:"Reconocer lo malo pero seguir adelante. Realismo optimista."},{word:"Come up with",meaning:"Idear / Se me ocurrió",type:"phrasal",category:"Phrasal Verbs",example:"She came up with a great idea.",emotionalTip:"Ese momento brillante cuando la solución aparece de la nada. La chispa creativa."},{word:"Turn out",meaning:"Resultar ser",type:"phrasal",category:"Phrasal Verbs",example:"It turned out to be a good decision.",emotionalTip:"Cuando la realidad supera o destroza tus expectativas. La sorpresa del final."},{word:"Bring up",meaning:"Sacar un tema",type:"phrasal",category:"Phrasal Verbs",example:"Why did you bring that up?",emotionalTip:"Mencionar algo incómodo que nadie quería tocar. El silencio tenso que sigue."},{word:"Get over",meaning:"Superar",type:"phrasal",category:"Phrasal Verbs",example:"I can't get over it.",emotionalTip:"Intentar dejar atrás algo que te destrozó. El dolor que se niega a irse."},{word:"Put up with",meaning:"Aguantar / Tolerar",type:"phrasal",category:"Phrasal Verbs",example:"I can't put up with this noise.",emotionalTip:"Soportar algo horrible porque no tienes otra opción. Paciencia que se agota."},{word:"Get away with",meaning:"Salirse con la suya",type:"phrasal",category:"Phrasal Verbs",example:"You won't get away with this!",emotionalTip:"La rabia de ver que alguien escapa sin consecuencias. La injusticia que quema."},{word:"Hold on",meaning:"Espera / Aguanta",type:"phrasal",category:"Phrasal Verbs",example:"Hold on, I'll be right back.",emotionalTip:"Pedir a alguien que espere cuando todo va demasiado rápido. Necesitar un segundo."},{word:"Mess up",meaning:"Cagarla / Estropear",type:"phrasal",category:"Phrasal Verbs",example:"I totally messed up.",emotionalTip:"Ese momento horrible cuando te das cuenta de que la has liado. Arrepentimiento instantáneo."},{word:"Freak out",meaning:"Flipar / Entrar en pánico",type:"phrasal",category:"Phrasal Verbs",example:"Don't freak out, it's fine.",emotionalTip:"Perder el control emocional completamente. El pánico que te consume."},{word:"End up",meaning:"Acabar / Terminar",type:"phrasal",category:"Phrasal Verbs",example:"We ended up staying until midnight.",emotionalTip:"Cuando las cosas no salen como planeabas pero no está mal. Destinos inesperados."},{word:"No way!",meaning:"¡Ni de broma! / ¡No me digas!",type:"expression",category:"Expresiones",example:"You quit your job? No way!",emotionalTip:"Incredulidad total ante algo que no puedes creer. La sorpresa que te deja sin palabras."},{word:"I'm done",meaning:"He terminado / Paso de esto",type:"expression",category:"Expresiones",example:"I'm done with this situation.",emotionalTip:"El hartazgo de decir basta. Cuando tu paciencia finalmente se agota."},{word:"That's insane",meaning:"Eso es una locura",type:"expression",category:"Expresiones",example:"You swam 5km? That's insane!",emotionalTip:"Asombro ante algo extraordinario. Cuando alguien hace lo que tú ni te atreverías."},{word:"Get the point",meaning:"Captar la idea / Entender",type:"expression",category:"Expresiones",example:"I get the point, you can stop.",emotionalTip:"Cuando ya entiendes pero el otro sigue explicando. Paciencia contada."},{word:"You're kidding",meaning:"Estás de broma",type:"expression",category:"Expresiones",example:"You won? You're kidding!",emotionalTip:"No poder creer lo que te cuentan. Esa mezcla de sorpresa y escepticismo."},{word:"I couldn't care less",meaning:"Me importa un bledo",type:"expression",category:"Expresiones",example:"I couldn't care less about what he thinks.",emotionalTip:"Indiferencia total hacia algo o alguien. La libertad de que te dé igual."},{word:"That's not the point",meaning:"Esa no es la cuestión",type:"expression",category:"Expresiones",example:"Yeah but that's not the point.",emotionalTip:"La frustración cuando alguien se va por la tangente. Querer volver al tema."},{word:"Keep it real",meaning:"Sé auténtico / Sin rollos",type:"expression",category:"Expresiones",example:"Forget the drama, keep it real.",emotionalTip:"Pedir honestidad en un mundo de mentiras. Valorar la autenticidad."},{word:"Been there, done that",meaning:"Ya pasé por eso",type:"expression",category:"Expresiones",example:"Drama at work? Been there, done that.",emotionalTip:"La experiencia que te da perspectiva. Haber sufrido algo similar antes."},{word:"It is what it is",meaning:"Es lo que hay",type:"expression",category:"Expresiones",example:"The deadline is tomorrow. It is what it is.",emotionalTip:"Aceptar una realidad que no puedes cambiar. Rendirse con paz, no con derrota."}]},{id:"b2-opinions",name:"B2 - Opiniones y Debates",icon:"fa-comments",description:"Vocabulario para expresar opiniones, estar de acuerdo, discrepar y debatir con elegancia.",level:"B2",words:[{word:"I strongly believe",meaning:"Creo firmemente",type:"expression",category:"Opiniones",example:"I strongly believe in education.",emotionalTip:"La convicción que no se tambalea. Tu verdad sin dudas."},{word:"In my opinion",meaning:"En mi opinión",type:"expression",category:"Opiniones",example:"In my opinion, this is wrong.",emotionalTip:"Reclamar tu derecho a pensar diferente. Tu perspectiva importa."},{word:"As far as I'm concerned",meaning:"En lo que a mí respecta",type:"expression",category:"Opiniones",example:"As far as I'm concerned, it's over.",emotionalTip:"Hablar solo por ti mismo. Tu posición clara."},{word:"The way I see it",meaning:"Tal y como yo lo veo",type:"expression",category:"Opiniones",example:"The way I see it, we have no choice.",emotionalTip:"Tu interpretación personal de la realidad. Tu lente única."},{word:"I couldn't agree more",meaning:"No puedo estar más de acuerdo",type:"expression",category:"Opiniones",example:"I couldn't agree more with you.",emotionalTip:"Cuando alguien dice exactamente lo que piensas. Conexión de ideas."},{word:"That's a good point",meaning:"Buen punto",type:"expression",category:"Opiniones",example:"That's a good point, I hadn't thought of that.",emotionalTip:"Reconocer que otro tiene razón. La humildad de aprender."},{word:"I see what you mean",meaning:"Entiendo lo que quieres decir",type:"expression",category:"Opiniones",example:"I see what you mean, but...",emotionalTip:"Mostrar que escuchas antes de discrepar. Respeto en el desacuerdo."},{word:"I beg to differ",meaning:"Me permito discrepar",type:"expression",category:"Opiniones",example:"I beg to differ on that point.",emotionalTip:"La forma elegante de decir que estás en desacuerdo."},{word:"I'm not so sure about that",meaning:"No estoy tan seguro de eso",type:"expression",category:"Opiniones",example:"I'm not so sure about that.",emotionalTip:"La duda educada. Cuestionar sin atacar."},{word:"That's debatable",meaning:"Eso es discutible",type:"expression",category:"Opiniones",example:"That's debatable.",emotionalTip:"Abrir la puerta al debate. No todo es blanco o negro."},{word:"You have a point",meaning:"Tienes razón en algo",type:"expression",category:"Opiniones",example:"You have a point there.",emotionalTip:"Ceder parcialmente. Reconocer verdad en el argumento ajeno."},{word:"To be frank",meaning:"Para ser franco",type:"expression",category:"Opiniones",example:"To be frank, I disagree.",emotionalTip:"Preparar al otro para una verdad directa. Honestidad sin rodeos."},{word:"Biased",meaning:"Parcial / Sesgado",type:"word",category:"Opiniones",example:"That report is biased.",emotionalTip:"Ver solo un lado de la historia. La parcialidad que distorsiona."},{word:"Objective",meaning:"Objetivo",type:"word",category:"Opiniones",example:"Try to be objective.",emotionalTip:"Separar emoción de hechos. La difícil neutralidad."},{word:"Subjective",meaning:"Subjetivo",type:"word",category:"Opiniones",example:"That's very subjective.",emotionalTip:"Lo que depende de quién mira. Tu verdad no es la única."},{word:"Controversial",meaning:"Polémico",type:"word",category:"Opiniones",example:"It's a controversial topic.",emotionalTip:"Lo que divide opiniones. El tema que enciende discusiones."},{word:"Perspective",meaning:"Perspectiva",type:"word",category:"Opiniones",example:"From my perspective...",emotionalTip:"El ángulo desde el que miras. Cada uno tiene el suyo."},{word:"Valid",meaning:"Válido",type:"word",category:"Opiniones",example:"That's a valid argument.",emotionalTip:"Un argumento que tiene peso. Digno de consideración."},{word:"Flawed",meaning:"Defectuoso / Con fallos",type:"word",category:"Opiniones",example:"Your logic is flawed.",emotionalTip:"Encontrar el error en el razonamiento. La grieta en el argumento."},{word:"Emphasize",meaning:"Enfatizar / Recalcar",type:"word",category:"Opiniones",example:"I want to emphasize this point.",emotionalTip:"Subrayar lo importante para que no pase desapercibido. El énfasis que importa."},{word:"Persuade",meaning:"Persuadir",type:"word",category:"Opiniones",example:"She persuaded me to go.",emotionalTip:"El arte de hacer que otros quieran lo que tú quieres."},{word:"Argue",meaning:"Argumentar / Discutir",type:"word",category:"Opiniones",example:"I'm not here to argue.",emotionalTip:"Defender tu posición con pasión. A veces productivo, a veces no."},{word:"Claim",meaning:"Afirmar / Sostener",type:"word",category:"Opiniones",example:"He claims to be an expert.",emotionalTip:"Decir algo como verdad. La afirmación que puede ser retada."},{word:"Exaggerate",meaning:"Exagerar",type:"word",category:"Opiniones",example:"Don't exaggerate, it wasn't that bad.",emotionalTip:"Estirar la realidad más de la cuenta. Cuando la verdad no parece suficiente."},{word:"Jump to conclusions",meaning:"Sacar conclusiones precipitadas",type:"expression",category:"Opiniones",example:"Don't jump to conclusions.",emotionalTip:"Decidir antes de tener toda la información. El error de la prisa."},{word:"With all due respect",meaning:"Con todo el respeto",type:"expression",category:"Opiniones",example:"With all due respect, I disagree.",emotionalTip:"Suavizar un golpe verbal. El respeto antes del desacuerdo."},{word:"Let me put it this way",meaning:"Déjame ponerlo así",type:"expression",category:"Opiniones",example:"Let me put it this way...",emotionalTip:"Reexplicar de forma más clara. Otro ángulo para entender."},{word:"That's beside the point",meaning:"Eso no viene al caso",type:"expression",category:"Opiniones",example:"That's beside the point.",emotionalTip:"Cuando alguien se desvía del tema. Redirigir la conversación."},{word:"The bottom line is",meaning:"El punto clave es",type:"expression",category:"Opiniones",example:"The bottom line is we need more money.",emotionalTip:"Ir a lo esencial. Lo que de verdad importa."},{word:"Weigh up",meaning:"Sopesar",type:"phrasal",category:"Opiniones",example:"Let's weigh up the pros and cons.",emotionalTip:"Poner en la balanza opciones. Decidir con cuidado."},{word:"Back up",meaning:"Respaldar / Apoyar",type:"phrasal",category:"Opiniones",example:"Can you back up that claim?",emotionalTip:"Pedir pruebas de lo que se dice. No creer sin evidencia."},{word:"Point out",meaning:"Señalar / Hacer notar",type:"phrasal",category:"Opiniones",example:"I'd like to point out that...",emotionalTip:"Llamar la atención sobre algo importante. El dedo que señala."},{word:"Agree to disagree",meaning:"Acordar que no estamos de acuerdo",type:"expression",category:"Opiniones",example:"Let's just agree to disagree.",emotionalTip:"Aceptar que nunca coincidirán. La paz sin victoria."},{word:"See eye to eye",meaning:"Estar de acuerdo / Ver igual",type:"expression",category:"Opiniones",example:"We don't see eye to eye on this.",emotionalTip:"Cuando las miradas no se cruzan. Visiones diferentes."},{word:"Think twice",meaning:"Pensarlo dos veces",type:"expression",category:"Opiniones",example:"I'd think twice before doing that.",emotionalTip:"Reconsiderar antes de actuar. La cautela sabia."},{word:"Have mixed feelings",meaning:"Tener sentimientos encontrados",type:"expression",category:"Opiniones",example:"I have mixed feelings about it.",emotionalTip:"Cuando no sabes si te gusta o no. La ambivalencia."},{word:"Take something with a pinch of salt",meaning:"Tomar algo con cautela",type:"expression",category:"Opiniones",example:"Take that with a pinch of salt.",emotionalTip:"No creer todo lo que oyes. El escepticismo sano."},{word:"Open-minded",meaning:"De mente abierta",type:"word",category:"Opiniones",example:"Try to be open-minded.",emotionalTip:"Dispuesto a escuchar ideas nuevas. La flexibilidad mental."},{word:"Narrow-minded",meaning:"De mente cerrada",type:"word",category:"Opiniones",example:"Don't be so narrow-minded.",emotionalTip:"Negarse a considerar otras opciones. La rigidez que limita."},{word:"Pros and cons",meaning:"Pros y contras",type:"expression",category:"Opiniones",example:"What are the pros and cons?",emotionalTip:"Lo bueno y lo malo de algo. El análisis equilibrado."}]},{id:"c1-complete",name:"C1 - Advanced Pack",icon:"fa-rocket",description:"Para sonar sofisticado: verbos de trabajo y negocios, conectores elegantes pero naturales, phrasal verbs de nivel nativo y expresiones de persona culta.",level:"C1",words:[{word:"Address",meaning:"Abordar / Tratar (un tema)",type:"word",category:"Verbos",example:"We need to address this issue.",emotionalTip:"El momento de enfrentar un problema que todos evitaban. Tomar la iniciativa cuando nadie más lo hace."},{word:"Implement",meaning:"Implementar",type:"word",category:"Verbos",example:"We'll implement the changes next week.",emotionalTip:"Pasar de la idea al hecho. Ese nervio de poner en marcha algo que podría fallar o triunfar."},{word:"Ensure",meaning:"Asegurar(se)",type:"word",category:"Verbos",example:"Please ensure everyone is informed.",emotionalTip:"La responsabilidad de que todo salga bien. Cargar con las consecuencias si falla."},{word:"Clarify",meaning:"Aclarar",type:"word",category:"Verbos",example:"Let me clarify what I mean.",emotionalTip:"Cuando sientes que te han malinterpretado. La urgencia de ser entendido correctamente."},{word:"Prioritize",meaning:"Priorizar",type:"word",category:"Verbos",example:"We need to prioritize this task.",emotionalTip:"Decidir qué importa más cuando todo parece urgente. El peso de elegir."},{word:"Overcome",meaning:"Superar",type:"word",category:"Verbos",example:"She overcame many challenges.",emotionalTip:"Mirar atrás y ver todos los obstáculos que venciste. Orgullo de haber sobrevivido."},{word:"Acknowledge",meaning:"Reconocer / Admitir",type:"word",category:"Verbos",example:"I acknowledge my mistake.",emotionalTip:"Tragar tu orgullo y admitir que te equivocaste. La humildad que cuesta."},{word:"Pursue",meaning:"Perseguir (objetivo)",type:"word",category:"Verbos",example:"She decided to pursue her dreams.",emotionalTip:"Dejarlo todo por perseguir algo que te importa. El salto de fe."},{word:"Delegate",meaning:"Delegar",type:"word",category:"Verbos",example:"Learn to delegate tasks.",emotionalTip:"Confiar en que otros hagan lo que tú harías. Soltar el control es difícil."},{word:"Leverage",meaning:"Aprovechar / Sacar partido",type:"word",category:"Verbos",example:"Let's leverage our experience.",emotionalTip:"Usar todo lo que tienes a tu favor. Maximizar tus ventajas para ganar."},{word:"Having said that",meaning:"Dicho esto",type:"connector",category:"Conectores",example:"It's expensive. Having said that, it's worth it.",emotionalTip:"Reconocer un problema pero no dejar que te detenga. Equilibrio y madurez."},{word:"That said",meaning:"Dicho esto (más corto)",type:"connector",category:"Conectores",example:"He's difficult. That said, he's talented.",emotionalTip:"Admitir lo malo de alguien antes de defenderlo. Justicia en la crítica."},{word:"Either way",meaning:"De cualquier forma",type:"connector",category:"Conectores",example:"Either way, we need to decide.",emotionalTip:"Cuando ya no importa qué opción elijas. El alivio de aceptar cualquier resultado."},{word:"At the end of the day",meaning:"Al fin y al cabo",type:"connector",category:"Conectores",example:"At the end of the day, it's your choice.",emotionalTip:"Lo que realmente importa cuando quitas todo lo superficial. La esencia."},{word:"To be fair",meaning:"Para ser justos",type:"connector",category:"Conectores",example:"To be fair, he did apologize.",emotionalTip:"Defender a alguien aunque estés enfadado con él. Justicia por encima de emociones."},{word:"As a matter of fact",meaning:"De hecho",type:"connector",category:"Conectores",example:"As a matter of fact, I agree with you.",emotionalTip:"Sorprender a alguien diciendo que tiene razón. El giro inesperado."},{word:"For what it's worth",meaning:"Por lo que pueda valer",type:"connector",category:"Conectores",example:"For what it's worth, I think you're great.",emotionalTip:"Ofrecer tu opinión con humildad. No imponerla, solo compartirla."},{word:"Mind you",meaning:"Eso sí / Aunque",type:"connector",category:"Conectores",example:"Good restaurant. Mind you, it's pricey.",emotionalTip:"La advertencia justa después del halago. No engañar con expectativas falsas."},{word:"Not to mention",meaning:"Por no hablar de",type:"connector",category:"Conectores",example:"It's cold, not to mention raining.",emotionalTip:"Cuando los problemas se acumulan y ni siquiera has mencionado el peor."},{word:"In a nutshell",meaning:"En resumen / Resumiendo",type:"connector",category:"Conectores",example:"In a nutshell, we need more time.",emotionalTip:"Destilar todo en una frase. La claridad mental de quien entiende de verdad."},{word:"Play it down",meaning:"Quitarle importancia",type:"phrasal",category:"Phrasal Verbs",example:"Don't play it down, it's serious.",emotionalTip:"Minimizar algo para no preocupar a los demás. O para no enfrentar la verdad."},{word:"Rule out",meaning:"Descartar",type:"phrasal",category:"Phrasal Verbs",example:"We can't rule out that option.",emotionalTip:"Cerrar puertas definitivamente. Tomar decisiones que eliminan posibilidades."},{word:"Back out",meaning:"Echarse atrás",type:"phrasal",category:"Phrasal Verbs",example:"He backed out at the last minute.",emotionalTip:"El miedo que te hace abandonar justo antes. La decepción de quien contaba contigo."},{word:"Step up",meaning:"Dar un paso al frente",type:"phrasal",category:"Phrasal Verbs",example:"Someone needs to step up.",emotionalTip:"Cuando nadie actúa y tú decides hacerlo. Liderazgo en la incertidumbre."},{word:"Fall through",meaning:"Fracasar / No salir adelante",type:"phrasal",category:"Phrasal Verbs",example:"The deal fell through.",emotionalTip:"Cuando algo prometedor se desmorona. La decepción de lo que pudo ser."},{word:"Look into",meaning:"Investigar / Estudiar",type:"phrasal",category:"Phrasal Verbs",example:"I'll look into it.",emotionalTip:"Prometer que investigarás algo. A veces sincero, a veces solo para ganar tiempo."},{word:"Iron out",meaning:"Resolver / Limar",type:"phrasal",category:"Phrasal Verbs",example:"Let's iron out the details.",emotionalTip:"Pulir los últimos detalles antes de algo importante. Perfeccionismo en acción."},{word:"Pull off",meaning:"Lograr (algo difícil)",type:"phrasal",category:"Phrasal Verbs",example:"I can't believe we pulled it off!",emotionalTip:"La euforia de lograr lo imposible. El orgullo de haber demostrado que podías."},{word:"Get back to",meaning:"Volver a contactar",type:"phrasal",category:"Phrasal Verbs",example:"I'll get back to you on that.",emotionalTip:"Prometer una respuesta que a veces nunca llega. Esperanza o fantasía."},{word:"Follow through",meaning:"Cumplir / Llevar a cabo",type:"phrasal",category:"Phrasal Verbs",example:"Make sure you follow through.",emotionalTip:"Terminar lo que empezaste. La diferencia entre intención y acción."},{word:"The thing is",meaning:"El caso es / La cosa es que",type:"expression",category:"Expresiones",example:"The thing is, I need more time.",emotionalTip:"Cuando tienes que decir algo difícil. La preparación antes del golpe."},{word:"To cut a long story short",meaning:"Resumiendo / Yendo al grano",type:"expression",category:"Expresiones",example:"To cut a long story short, we won.",emotionalTip:"Saltarte el drama y llegar al final. Respetar el tiempo del otro."},{word:"Go the extra mile",meaning:"Hacer un esfuerzo extra",type:"expression",category:"Expresiones",example:"She always goes the extra mile.",emotionalTip:"Dar más de lo que te piden. El compromiso que te distingue de los demás."},{word:"Be on the same page",meaning:"Estar en la misma onda",type:"expression",category:"Expresiones",example:"Let's make sure we're on the same page.",emotionalTip:"Esa conexión cuando todos entienden lo mismo. Trabajo en equipo real."},{word:"Think outside the box",meaning:"Pensar de forma creativa",type:"expression",category:"Expresiones",example:"We need to think outside the box.",emotionalTip:"Cuando las soluciones normales no funcionan. Creatividad forzada por la necesidad."},{word:"Hit the ground running",meaning:"Empezar con buen pie",type:"expression",category:"Expresiones",example:"I want to hit the ground running.",emotionalTip:"Empezar fuerte desde el primer día. La presión de demostrar tu valía rápido."},{word:"A steep learning curve",meaning:"Una curva de aprendizaje",type:"expression",category:"Expresiones",example:"This job has a steep learning curve.",emotionalTip:"Cuando todo es nuevo y te sientes abrumado. El estrés del principiante."},{word:"Touch base",meaning:"Ponerse en contacto",type:"expression",category:"Expresiones",example:"Let's touch base next week.",emotionalTip:"Mantener la conexión sin comprometerse a mucho. Networking ligero."},{word:"Get the ball rolling",meaning:"Poner algo en marcha",type:"expression",category:"Expresiones",example:"Let's get the ball rolling.",emotionalTip:"El impulso inicial que cuesta más que el resto. Superar la inercia."},{word:"Keep me in the loop",meaning:"Mantenme informado",type:"expression",category:"Expresiones",example:"Keep me in the loop, please.",emotionalTip:"No querer quedarte fuera de las decisiones. El miedo a ser ignorado."}]},{id:"c1-networking",name:"C1 - Networking Profesional",icon:"fa-network-wired",description:"Vocabulario para eventos profesionales, crear contactos, LinkedIn y oportunidades laborales.",level:"C1",words:[{word:"Network",meaning:"Crear contactos",type:"word",category:"Networking",example:"I'm here to network.",emotionalTip:"El arte de conocer a las personas correctas. Sembrar para el futuro."},{word:"Connect",meaning:"Conectar",type:"word",category:"Networking",example:"Let's connect on LinkedIn.",emotionalTip:"Crear un puente digital con alguien. El primer paso profesional."},{word:"Reach out",meaning:"Contactar / Escribir",type:"phrasal",category:"Networking",example:"Feel free to reach out anytime.",emotionalTip:"Dar el primer paso para comunicarte. La iniciativa que abre puertas."},{word:"Follow up",meaning:"Hacer seguimiento",type:"phrasal",category:"Networking",example:"I'll follow up next week.",emotionalTip:"No dejar que el contacto se enfríe. Mantener viva la conexión."},{word:"Pitch",meaning:"Presentar / Propuesta",type:"word",category:"Networking",example:"What's your elevator pitch?",emotionalTip:"Venderte en segundos. Capturar atención antes de que se vaya."},{word:"Opportunity",meaning:"Oportunidad",type:"word",category:"Networking",example:"This is a great opportunity.",emotionalTip:"La puerta que se abre una vez. No siempre vuelve a aparecer."},{word:"Referral",meaning:"Recomendación",type:"word",category:"Networking",example:"I got the job through a referral.",emotionalTip:"Alguien pone su nombre por ti. El favor que vale oro."},{word:"Introduce",meaning:"Presentar",type:"word",category:"Networking",example:"Let me introduce you to someone.",emotionalTip:"Abrir puertas para otros. El generoso acto de conectar."},{word:"Mentor",meaning:"Mentor",type:"word",category:"Networking",example:"She's been my mentor for years.",emotionalTip:"Alguien que ilumina tu camino. La guía que no olvidarás."},{word:"Mentee",meaning:"Pupilo / Aprendiz",type:"word",category:"Networking",example:"I have three mentees.",emotionalTip:"El que recibe la sabiduría. Humildad para aprender."},{word:"Pick someone's brain",meaning:"Pedir consejo / Aprender de",type:"expression",category:"Networking",example:"Can I pick your brain?",emotionalTip:"Aprovechar la experiencia de otro. El halago de ser consultado."},{word:"Build rapport",meaning:"Crear buena relación",type:"expression",category:"Networking",example:"It's important to build rapport.",emotionalTip:"La química profesional. Hacer que alguien se sienta cómodo contigo."},{word:"Mutual benefit",meaning:"Beneficio mutuo",type:"expression",category:"Networking",example:"This is for our mutual benefit.",emotionalTip:"Ambos ganan. La relación que tiene sentido para los dos."},{word:"Add value",meaning:"Aportar valor",type:"expression",category:"Networking",example:"How can I add value to this?",emotionalTip:"No solo pedir, también dar. La generosidad estratégica."},{word:"Strategic partnership",meaning:"Alianza estratégica",type:"expression",category:"Networking",example:"We're looking for strategic partnerships.",emotionalTip:"Unir fuerzas para llegar más lejos. El poder de la colaboración."},{word:"Leverage contacts",meaning:"Aprovechar contactos",type:"expression",category:"Networking",example:"You should leverage your contacts.",emotionalTip:"Usar tu red para avanzar. El capital social en acción."},{word:"Keep someone posted",meaning:"Mantener informado",type:"expression",category:"Networking",example:"I'll keep you posted.",emotionalTip:"Prometer actualizaciones. Mantener la conexión viva."},{word:"Circle back",meaning:"Retomar / Volver al tema",type:"expression",category:"Networking",example:"Let's circle back on this.",emotionalTip:"Prometer que volverás. A veces pasa, a veces no."},{word:"Put in a good word",meaning:"Hablar bien de alguien",type:"expression",category:"Networking",example:"Can you put in a good word for me?",emotionalTip:"Pedir que alguien te recomiende. El favor que cambia destinos."},{word:"Word of mouth",meaning:"Boca a boca",type:"expression",category:"Networking",example:"Most clients come through word of mouth.",emotionalTip:"La reputación que viaja de persona a persona. La mejor publicidad."},{word:"Industry",meaning:"Industria / Sector",type:"word",category:"Networking",example:"What industry are you in?",emotionalTip:"Tu mundo profesional. Donde encajas en el mapa laboral."},{word:"Background",meaning:"Trayectoria / Experiencia",type:"word",category:"Networking",example:"Tell me about your background.",emotionalTip:"Tu historia profesional. De dónde vienes y qué has hecho."},{word:"Portfolio",meaning:"Portafolio",type:"word",category:"Networking",example:"Can I see your portfolio?",emotionalTip:"La prueba visual de tu talento. Tu trabajo habla por ti."},{word:"Track record",meaning:"Historial / Trayectoria",type:"expression",category:"Networking",example:"She has a great track record.",emotionalTip:"Las pruebas de lo que has logrado. El pasado que predice el futuro."},{word:"Foot in the door",meaning:"Primera oportunidad",type:"expression",category:"Networking",example:"I just need a foot in the door.",emotionalTip:"La pequeña entrada que puede abrir todo. El primer paso."},{word:"Open doors",meaning:"Abrir puertas",type:"expression",category:"Networking",example:"This connection could open doors.",emotionalTip:"Crear oportunidades donde no las había. El poder de conocer gente."},{word:"Personal brand",meaning:"Marca personal",type:"expression",category:"Networking",example:"Work on your personal brand.",emotionalTip:"Cómo te ve el mundo profesional. Tu reputación en un concepto."},{word:"Thought leader",meaning:"Líder de opinión",type:"expression",category:"Networking",example:"She's a thought leader in AI.",emotionalTip:"Alguien cuya opinión importa. La voz que otros escuchan."},{word:"Synergy",meaning:"Sinergia",type:"word",category:"Networking",example:"There's great synergy between us.",emotionalTip:"Cuando juntos sois más que separados. La magia de la colaboración."},{word:"Value proposition",meaning:"Propuesta de valor",type:"expression",category:"Networking",example:"What's your value proposition?",emotionalTip:"Lo que ofreces que otros no. Tu diferencia única."},{word:"Win-win",meaning:"Ganar-ganar",type:"expression",category:"Networking",example:"It's a win-win situation.",emotionalTip:"Cuando todos ganan. El acuerdo perfecto."},{word:"Schedule a call",meaning:"Agendar una llamada",type:"expression",category:"Networking",example:"Can we schedule a call?",emotionalTip:"Formalizar el siguiente paso. Pasar de la charla a la acción."},{word:"Catch you later",meaning:"Luego hablamos",type:"expression",category:"Networking",example:"Great talking! Catch you later!",emotionalTip:"La despedida casual que deja la puerta abierta."},{word:"Looking to expand",meaning:"Buscando crecer",type:"expression",category:"Networking",example:"We're looking to expand our team.",emotionalTip:"La señal de que hay oportunidad. Orejas atentas."},{word:"I'd love to learn more",meaning:"Me encantaría saber más",type:"expression",category:"Networking",example:"I'd love to learn more about what you do.",emotionalTip:"Mostrar interés genuino. El halago que abre conversaciones."},{word:"Happy to help",meaning:"Encantado de ayudar",type:"expression",category:"Networking",example:"If you ever need anything, happy to help.",emotionalTip:"Ofrecer ayuda sin esperar nada. La generosidad que se recuerda."},{word:"Same here",meaning:"Igual aquí / Lo mismo digo",type:"expression",category:"Networking",example:"Great meeting you! Same here!",emotionalTip:"Reciprocar el sentimiento. El espejo social."},{word:"Small world",meaning:"El mundo es un pañuelo",type:"expression",category:"Networking",example:"You know her too? Small world!",emotionalTip:"Descubrir conexiones inesperadas. Las coincidencias que unen."},{word:"Stay in touch",meaning:"Mantengamos el contacto",type:"expression",category:"Networking",example:"Let's stay in touch!",emotionalTip:"La promesa de no olvidarse. A veces se cumple."},{word:"Keep me posted",meaning:"Mantenme informado",type:"expression",category:"Networking",example:"Keep me posted on how it goes.",emotionalTip:"Querer saber cómo sigue la historia. Interés genuino o cortés."}]},{id:"c2-complete",name:"C2 - Proficiency Pack",icon:"fa-crown",description:"Para impresionar: verbos precisos de alto nivel, conectores para argumentar con elegancia, phrasal verbs sutiles e idioms para sonar como un nativo educado.",level:"C2",words:[{word:"Anticipate",meaning:"Anticipar / Prever",type:"word",category:"Verbos",example:"We didn't anticipate this problem.",emotionalTip:"No ver venir algo que te golpea. La frustración de no haber preparado nada."},{word:"Undermine",meaning:"Socavar / Minar",type:"word",category:"Verbos",example:"Don't undermine my authority.",emotionalTip:"Cuando alguien destruye tu trabajo en silencio. La traición que no ves hasta que es tarde."},{word:"Advocate",meaning:"Defender / Abogar por",type:"word",category:"Verbos",example:"I advocate for change.",emotionalTip:"Luchar por algo en lo que crees aunque nadie te escuche. Convicción solitaria."},{word:"Tackle",meaning:"Abordar / Hacer frente a",type:"word",category:"Verbos",example:"Let's tackle this problem.",emotionalTip:"Lanzarte contra un problema con determinación. Sin miedo, a por todas."},{word:"Navigate",meaning:"Navegar / Manejarse en",type:"word",category:"Verbos",example:"It's hard to navigate office politics.",emotionalTip:"Moverte en situaciones complicadas sin hundirte. El arte de sobrevivir."},{word:"Thrive",meaning:"Prosperar / Florecer",type:"word",category:"Verbos",example:"She thrives under pressure.",emotionalTip:"No solo sobrevivir sino brillar. Cuando la adversidad te hace más fuerte."},{word:"Resonate",meaning:"Resonar / Conectar (con)",type:"word",category:"Verbos",example:"This message resonates with me.",emotionalTip:"Cuando algo te toca por dentro sin saber por qué. Conexión profunda e inexplicable."},{word:"Overlook",meaning:"Pasar por alto / Ignorar",type:"word",category:"Verbos",example:"Don't overlook the details.",emotionalTip:"No ver algo que estaba delante de ti. El error que pudiste evitar."},{word:"Embrace",meaning:"Abrazar / Aceptar",type:"word",category:"Verbos",example:"Embrace change.",emotionalTip:"Aceptar algo que te asusta en lugar de huir. La valentía de abrirse."},{word:"Streamline",meaning:"Simplificar / Optimizar",type:"word",category:"Verbos",example:"We need to streamline the process.",emotionalTip:"Eliminar lo innecesario para quedarte solo con lo esencial. Claridad mental."},{word:"Be that as it may",meaning:"Sea como sea",type:"connector",category:"Conectores",example:"Be that as it may, we still need to act.",emotionalTip:"Aceptar una realidad incómoda pero actuar igual. Pragmatismo maduro."},{word:"More often than not",meaning:"La mayoría de las veces",type:"connector",category:"Conectores",example:"More often than not, he's right.",emotionalTip:"Reconocer que alguien suele tener razón aunque te cueste admitirlo."},{word:"By and large",meaning:"En general",type:"connector",category:"Conectores",example:"By and large, people are kind.",emotionalTip:"Creer que el mundo es bueno a pesar de las excepciones. Optimismo informado."},{word:"All things considered",meaning:"Teniendo todo en cuenta",type:"connector",category:"Conectores",example:"All things considered, it was a success.",emotionalTip:"El balance final después de pesar lo bueno y lo malo. Perspectiva completa."},{word:"For the most part",meaning:"En su mayor parte",type:"connector",category:"Conectores",example:"For the most part, I agree.",emotionalTip:"Estar de acuerdo pero con matices. No todo es blanco o negro."},{word:"On balance",meaning:"Sopesándolo todo",type:"connector",category:"Conectores",example:"On balance, it was worth it.",emotionalTip:"Decidir que valió la pena a pesar del sufrimiento. Paz después de la tormenta."},{word:"As it turns out",meaning:"Resulta que",type:"connector",category:"Conectores",example:"As it turns out, I was wrong.",emotionalTip:"Descubrir que te equivocabas. La humildad de aceptar otro final."},{word:"Needless to say",meaning:"Ni que decir tiene",type:"connector",category:"Conectores",example:"Needless to say, I was shocked.",emotionalTip:"Algo tan obvio que no debería tener que decirlo. Pero lo dices igual."},{word:"Notwithstanding",meaning:"No obstante / A pesar de",type:"connector",category:"Conectores",example:"Notwithstanding the law, he did it.",emotionalTip:"Actuar a pesar de los obstáculos. Determinación que ignora las barreras."},{word:"With that in mind",meaning:"Teniendo eso en cuenta",type:"connector",category:"Conectores",example:"With that in mind, let's continue.",emotionalTip:"Considerar algo importante antes de seguir adelante. Prudencia estratégica."},{word:"Brush off",meaning:"Ignorar / No hacer caso",type:"phrasal",category:"Phrasal Verbs",example:"Don't brush off my concerns.",emotionalTip:"Que te ignoren cuando intentas expresar algo importante. El desprecio que duele."},{word:"Chime in",meaning:"Intervenir / Meter baza",type:"phrasal",category:"Phrasal Verbs",example:"Feel free to chime in.",emotionalTip:"Unirte a una conversación aportando tu perspectiva. El coraje de opinar."},{word:"Pan out",meaning:"Resultar / Salir",type:"phrasal",category:"Phrasal Verbs",example:"Let's see how things pan out.",emotionalTip:"Esperar a ver cómo termina algo. La incertidumbre del futuro."},{word:"Touch on",meaning:"Tocar / Mencionar brevemente",type:"phrasal",category:"Phrasal Verbs",example:"I'd like to touch on one point.",emotionalTip:"Mencionar algo sin profundizar. Dejar temas abiertos a propósito."},{word:"Zone out",meaning:"Desconectar / Quedarse en blanco",type:"phrasal",category:"Phrasal Verbs",example:"Sorry, I zoned out for a moment.",emotionalTip:"Cuando tu mente se va sin permiso. La desconexión involuntaria."},{word:"Play up",meaning:"Exagerar / Dar problemas",type:"phrasal",category:"Phrasal Verbs",example:"My back is playing up again.",emotionalTip:"Cuando algo te falla justo cuando menos lo necesitas. La traición del cuerpo."},{word:"Kick in",meaning:"Empezar a hacer efecto",type:"phrasal",category:"Phrasal Verbs",example:"The coffee is starting to kick in.",emotionalTip:"El momento en que empiezas a sentir el efecto. El alivio que llega."},{word:"Wind down",meaning:"Relajarse / Ir terminando",type:"phrasal",category:"Phrasal Verbs",example:"Time to wind down for the day.",emotionalTip:"El ritual de bajar revoluciones al final del día. Soltar la tensión."},{word:"Mull over",meaning:"Darle vueltas a",type:"phrasal",category:"Phrasal Verbs",example:"I need to mull it over.",emotionalTip:"Pensar algo una y otra vez antes de decidir. La mente que no descansa."},{word:"Stumble upon",meaning:"Encontrar por casualidad",type:"phrasal",category:"Phrasal Verbs",example:"I stumbled upon this article.",emotionalTip:"Descubrir algo valioso sin buscarlo. Los regalos del azar."},{word:"The elephant in the room",meaning:"El tema incómodo que nadie menciona",type:"expression",category:"Expresiones",example:"Let's address the elephant in the room.",emotionalTip:"Ese problema enorme que todos ven pero nadie quiere tocar. La tensión silenciosa."},{word:"A blessing in disguise",meaning:"Una bendición disfrazada",type:"expression",category:"Expresiones",example:"Losing that job was a blessing in disguise.",emotionalTip:"Algo terrible que acabó siendo lo mejor que te pasó. Gratitud inesperada."},{word:"Break the ice",meaning:"Romper el hielo",type:"expression",category:"Expresiones",example:"Let's play a game to break the ice.",emotionalTip:"El primer paso incómodo para conectar con desconocidos. Valentía social."},{word:"Hit the nail on the head",meaning:"Dar en el clavo",type:"expression",category:"Expresiones",example:"You hit the nail on the head.",emotionalTip:"Cuando alguien dice exactamente lo que pensabas. Sentirte comprendido."},{word:"Easier said than done",meaning:"Del dicho al hecho hay un trecho",type:"expression",category:"Expresiones",example:"Getting fit is easier said than done.",emotionalTip:"La distancia enorme entre la intención y la acción. Frustrarse con uno mismo."},{word:"The ball is in your court",meaning:"Te toca a ti",type:"expression",category:"Expresiones",example:"I made my offer, the ball is in your court.",emotionalTip:"Cuando la decisión depende de ti y no puedes evitarla. La presión de elegir."},{word:"Read the room",meaning:"Leer el ambiente",type:"expression",category:"Expresiones",example:"You need to learn to read the room.",emotionalTip:"Captar lo que los demás sienten sin que lo digan. Inteligencia emocional."},{word:"Miss the boat",meaning:"Perder la oportunidad",type:"expression",category:"Expresiones",example:"If you don't apply now, you'll miss the boat.",emotionalTip:"Ver cómo la oportunidad se aleja sin ti. El arrepentimiento de no actuar."},{word:"Put your foot in your mouth",meaning:"Meter la pata",type:"expression",category:"Expresiones",example:"I really put my foot in my mouth there.",emotionalTip:"Decir algo terrible sin darte cuenta. La vergüenza instantánea."},{word:"Under the weather",meaning:"Pachucho / Indispuesto",type:"expression",category:"Expresiones",example:"I'm feeling a bit under the weather.",emotionalTip:"No estar enfermo pero tampoco bien. Ese malestar vago que no puedes explicar."}]},{id:"c2-emotions",name:"C2 - Emociones y Matices",icon:"fa-heart",description:"Vocabulario avanzado para expresar emociones complejas, estados de ánimo y matices psicológicos.",level:"C2",words:[{word:"Overwhelmed",meaning:"Abrumado/a",type:"word",category:"Emociones",example:"I feel completely overwhelmed.",emotionalTip:"Cuando todo te supera. Demasiadas cosas, muy poco tú."},{word:"Relieved",meaning:"Aliviado/a",type:"word",category:"Emociones",example:"I'm so relieved it's over.",emotionalTip:"El peso que se va de tus hombros. Respirar por fin."},{word:"Resentful",meaning:"Resentido/a",type:"word",category:"Emociones",example:"I feel resentful about what happened.",emotionalTip:"El rencor que guardas. La herida que no perdonaste."},{word:"Nostalgic",meaning:"Nostálgico/a",type:"word",category:"Emociones",example:"This song makes me feel nostalgic.",emotionalTip:"Añorar tiempos que ya no volverán. El dulce dolor del pasado."},{word:"Content",meaning:"Satisfecho/a / En paz",type:"word",category:"Emociones",example:"I feel content with my life.",emotionalTip:"No necesitar más. La paz de tener lo suficiente."},{word:"Restless",meaning:"Inquieto/a",type:"word",category:"Emociones",example:"I've been feeling restless lately.",emotionalTip:"No poder estar quieto. Algo dentro pide movimiento."},{word:"Drained",meaning:"Agotado/a (emocionalmente)",type:"word",category:"Emociones",example:"I feel emotionally drained.",emotionalTip:"Vacío de energía interna. Cuando ya no queda nada que dar."},{word:"Bitter",meaning:"Amargado/a",type:"word",category:"Emociones",example:"Don't become bitter about it.",emotionalTip:"El sabor de la decepción que se queda. El resentimiento crónico."},{word:"Torn",meaning:"Dividido/a",type:"word",category:"Emociones",example:"I'm torn between two options.",emotionalTip:"Partido en dos. Cuando dos caminos te llaman igual."},{word:"Numb",meaning:"Insensible / Entumecido",type:"word",category:"Emociones",example:"I felt numb after the news.",emotionalTip:"Cuando ya no sientes nada. El shock que anestesia."},{word:"Vulnerable",meaning:"Vulnerable",type:"word",category:"Emociones",example:"It's hard to feel vulnerable.",emotionalTip:"Estar expuesto sin armadura. El riesgo de ser auténtico."},{word:"Fulfilled",meaning:"Realizado/a",type:"word",category:"Emociones",example:"I finally feel fulfilled in my career.",emotionalTip:"Cuando tu vida tiene sentido. El propósito encontrado."},{word:"Gutted",meaning:"Destrozado/a (informal)",type:"word",category:"Emociones",example:"I was gutted when I heard.",emotionalTip:"La noticia que te vacía por dentro. Devastación total."},{word:"Chuffed",meaning:"Contentísimo/a (UK)",type:"word",category:"Emociones",example:"I'm chuffed with the results.",emotionalTip:"Orgullo mezclado con alegría. El logro que saboreas."},{word:"Ambivalent",meaning:"Ambivalente",type:"word",category:"Emociones",example:"I feel ambivalent about leaving.",emotionalTip:"Querer y no querer a la vez. Sentimientos que compiten."},{word:"Melancholic",meaning:"Melancólico/a",type:"word",category:"Emociones",example:"The music is quite melancholic.",emotionalTip:"Tristeza hermosa y profunda. El sentimiento de la pérdida."},{word:"Resentment",meaning:"Resentimiento",type:"word",category:"Emociones",example:"I need to let go of this resentment.",emotionalTip:"El veneno que guardas. El rencor que te enferma a ti."},{word:"Empathy",meaning:"Empatía",type:"word",category:"Emociones",example:"Show some empathy.",emotionalTip:"Sentir lo que el otro siente. Ponerte en sus zapatos."},{word:"Compassion",meaning:"Compasión",type:"word",category:"Emociones",example:"Have compassion for others.",emotionalTip:"Querer aliviar el sufrimiento ajeno. El amor en acción."},{word:"Bittersweet",meaning:"Agridulce",type:"word",category:"Emociones",example:"It was a bittersweet moment.",emotionalTip:"Felicidad y tristeza mezcladas. Lo bueno que duele un poco."},{word:"I'm at peace with",meaning:"Estoy en paz con",type:"expression",category:"Emociones",example:"I'm at peace with my decision.",emotionalTip:"Aceptar sin luchar más. El final de la guerra interna."},{word:"It weighs on me",meaning:"Me pesa / Me preocupa",type:"expression",category:"Emociones",example:"The guilt weighs on me.",emotionalTip:"Algo que no te deja tranquilo. La carga invisible."},{word:"I'm at a loss",meaning:"No sé qué hacer",type:"expression",category:"Emociones",example:"I'm at a loss for words.",emotionalTip:"Cuando no tienes respuestas. La confusión que paraliza."},{word:"Get something off my chest",meaning:"Desahogarse",type:"expression",category:"Emociones",example:"I need to get this off my chest.",emotionalTip:"Soltar lo que llevas dentro. El alivio de confesar."},{word:"Hit close to home",meaning:"Tocar la fibra sensible",type:"expression",category:"Emociones",example:"That comment hit close to home.",emotionalTip:"Cuando algo te toca personalmente. La verdad que duele."},{word:"Be on edge",meaning:"Estar tenso/ansioso",type:"expression",category:"Emociones",example:"I've been on edge all day.",emotionalTip:"Al borde del colapso. La tensión constante."},{word:"Bottle up emotions",meaning:"Reprimir emociones",type:"expression",category:"Emociones",example:"Don't bottle up your emotions.",emotionalTip:"Guardar lo que deberías soltar. La olla a presión."},{word:"Wear your heart on your sleeve",meaning:"Llevar el corazón en la mano",type:"expression",category:"Emociones",example:"She wears her heart on her sleeve.",emotionalTip:"No ocultar lo que sientes. La transparencia emocional."},{word:"Have a heart-to-heart",meaning:"Tener una charla íntima",type:"expression",category:"Emociones",example:"We had a heart-to-heart.",emotionalTip:"Conversación profunda y honesta. Cuando bajan las barreras."},{word:"Mixed emotions",meaning:"Emociones encontradas",type:"expression",category:"Emociones",example:"I have mixed emotions about it.",emotionalTip:"Cuando sientes varias cosas a la vez. El caos interno."},{word:"Come to terms with",meaning:"Aceptar / Asimilar",type:"expression",category:"Emociones",example:"I'm coming to terms with it.",emotionalTip:"El proceso de aceptar lo inevitable. La paz que llega."},{word:"Take its toll",meaning:"Pasar factura",type:"expression",category:"Emociones",example:"The stress is taking its toll.",emotionalTip:"Cuando algo te cobra el precio. El coste emocional."},{word:"Cathartic",meaning:"Catártico / Liberador",type:"word",category:"Emociones",example:"Crying can be cathartic.",emotionalTip:"El alivio de liberar emociones. La purga necesaria."},{word:"Vindicated",meaning:"Reivindicado",type:"word",category:"Emociones",example:"I finally felt vindicated.",emotionalTip:"Cuando se demuestra que tenías razón. Justicia personal."},{word:"Wistful",meaning:"Melancólico / Añorante",type:"word",category:"Emociones",example:"She had a wistful look.",emotionalTip:"Desear algo que no puedes tener. La tristeza del anhelo."},{word:"Elated",meaning:"Eufórico / Exultante",type:"word",category:"Emociones",example:"I was elated when I heard!",emotionalTip:"Alegría que te eleva. El pico de felicidad."},{word:"Disheartened",meaning:"Desanimado/a",type:"word",category:"Emociones",example:"I felt disheartened by the rejection.",emotionalTip:"Cuando la esperanza se cae. El golpe al ánimo."},{word:"Apprehensive",meaning:"Aprensivo / Preocupado",type:"word",category:"Emociones",example:"I'm apprehensive about the results.",emotionalTip:"Miedo anticipado a algo. La ansiedad del no saber."},{word:"Sentimental",meaning:"Sentimental",type:"word",category:"Emociones",example:"I get sentimental about old photos.",emotionalTip:"Emocionarte con recuerdos. El corazón blando."},{word:"Conflicted",meaning:"Conflictuado / En conflicto",type:"word",category:"Emociones",example:"I feel conflicted about the decision.",emotionalTip:"Cuando dos partes de ti pelean. La guerra interior."}]}],ca={accent:"en-US",speed:1};function pe(){return K().tts||ca}function be(e){const o=K();o.tts={...pe(),...e},Ce(o)}function W(e,o={}){if(!("speechSynthesis"in window)){C("Error","Tu navegador no soporta síntesis de voz.","error");return}window.speechSynthesis.cancel();const a=pe(),t=o.accent||a.accent,n=o.speed||a.speed,i=new SpeechSynthesisUtterance(e);i.lang=t,i.rate=n;const r=window.speechSynthesis.getVoices(),d=r.find(l=>l.lang.startsWith(t.substring(0,2))&&l.lang===t&&(l.name.includes("Google")||l.name.includes("Premium")||l.name.includes("Microsoft")))||r.find(l=>l.lang===t);d&&(i.voice=d),i.onerror=l=>{console.error("TTS Error:",l),C("Error","No se pudo reproducir el audio.","error")},window.speechSynthesis.speak(i)}function da(e){return{"en-US":"🇺🇸 Americano","en-GB":"🇬🇧 Británico"}[e]||e}function pa(e){return e<=.6?"🐢 Muy lento":e<=.8?"🐌 Lento":e<=1.1?"🎯 Normal":e<=1.3?"🐇 Rápido":"⚡ Muy rápido"}function ma(e,o){const a=document.createElement("div");a.className="word-card",a.dataset.wordId=e.id;const t=e.reviewCount||0,n=e.createdAt?new Date(e.createdAt).toLocaleDateString():"",i=_e(e),r=Ye(e),d=Fe(e);return a.innerHTML=`
    ${e.image?`<img src="${e.image}" alt="${e.word}" class="word-image" />`:""}

    <div class="tags">
      <span class="tag type-tag type-${e.type}">${ga(e.type)}</span>
      <span class="tag mastery-tag ${i.class}" title="${i.label}">
        <i class="fa-solid ${i.icon}"></i>
        ${i.label}
      </span>
      ${d?`<span class="tag due-tag"><i class="fa-solid fa-clock"></i> ${r}</span>`:""}
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
        ${t>0?`<span class="meta-item"><i class="fa-solid fa-chart-simple"></i> ${t} repasos</span>`:""}
        ${!d&&e.nextReviewAt?`<span class="meta-item next-review"><i class="fa-solid fa-calendar-check"></i> Próximo: ${r}</span>`:""}
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
  `,a.querySelector(".speak-btn").addEventListener("click",l=>{l.stopPropagation(),W(e.word)}),a.querySelector(".toggle").addEventListener("click",()=>{e.remembered=!e.remembered,le(e),o()}),a.querySelector(".delete").addEventListener("click",()=>{confirm(`¿Eliminar "${e.word}"?`)&&(We(e.id),o())}),a.querySelector(".edit-btn").addEventListener("click",()=>{ua(e,o)}),a}function ua(e,o){document.querySelector(".edit-modal")?.remove();const a=document.createElement("div");a.className="edit-modal",a.innerHTML=`
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
            <input type="text" id="edit-word" value="${G(e.word)}" required />
          </div>
          <div class="form-field">
            <label><i class="fa-solid fa-language"></i> Significado</label>
            <input type="text" id="edit-meaning" value="${G(e.meaning)}" required />
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
            <input type="text" id="edit-category" value="${G(e.category||"")}" />
          </div>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-heart"></i> Asociación emocional</label>
          <textarea id="edit-emotion" rows="3">${G(e.emotion||"")}</textarea>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-quote-left"></i> Ejemplo</label>
          <input type="text" id="edit-example" value="${G(e.example||"")}" />
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-image"></i> Imagen</label>
          <div class="image-tabs">
            <button type="button" class="image-tab active" data-tab="url"><i class="fa-solid fa-link"></i> URL</button>
            <button type="button" class="image-tab" data-tab="upload"><i class="fa-solid fa-upload"></i> Subir</button>
          </div>
          <div class="image-tab-content" id="tab-url">
            <input type="url" id="edit-image" value="${G(e.image||"")}" placeholder="https://ejemplo.com/imagen.jpg" />
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
          ${e.image?`<div class="image-preview-mini"><img src="${G(e.image)}" alt="Preview" /></div>`:""}
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-cancel">Cancelar</button>
          <button type="submit" class="btn-save"><i class="fa-solid fa-check"></i> Guardar cambios</button>
        </div>
        <div class="edit-feedback" style="display: none; color: var(--danger); font-size: 0.9rem; margin-top: 1rem; text-align: center;"></div>
      </form>
    </div>
  `,document.body.appendChild(a),requestAnimationFrame(()=>{a.classList.add("active")});const t=()=>{a.classList.remove("active"),setTimeout(()=>a.remove(),300)};a.querySelector(".modal-overlay").addEventListener("click",t),a.querySelector(".modal-close").addEventListener("click",t),a.querySelector(".btn-cancel").addEventListener("click",t);let n=null;a.querySelectorAll(".image-tab").forEach(l=>{l.addEventListener("click",()=>{a.querySelectorAll(".image-tab").forEach(s=>s.classList.remove("active")),l.classList.add("active");const p=l.dataset.tab;a.querySelector("#tab-url").style.display=p==="url"?"block":"none",a.querySelector("#tab-upload").style.display=p==="upload"?"block":"none"})});const i=a.querySelector("#edit-image-file"),r=a.querySelector("#edit-dropzone");if(i&&r){let l=function(p){const s=new FileReader;s.onload=w=>{n=w.target.result,r.classList.add("has-file");const g=r.querySelector(".dropzone-text"),k=r.querySelector(".dropzone-subtext");g&&(g.textContent=p.name),k&&(k.textContent=`${(p.size/1024).toFixed(1)} KB`);let c=a.querySelector(".image-preview-mini");c||(c=document.createElement("div"),c.className="image-preview-mini",r.parentElement.after(c)),c.innerHTML=`<img src="${n}" alt="Preview" />`},s.readAsDataURL(p)};var d=l;["dragenter","dragover"].forEach(p=>{r.addEventListener(p,s=>{s.preventDefault(),r.classList.add("dragover")})}),["dragleave","drop"].forEach(p=>{r.addEventListener(p,s=>{s.preventDefault(),r.classList.remove("dragover")})}),r.addEventListener("drop",p=>{const s=p.dataTransfer.files[0];s&&s.type.startsWith("image/")&&l(s)}),i.addEventListener("change",p=>{const s=p.target.files[0];s&&l(s)})}a.querySelector(".edit-form").addEventListener("submit",l=>{l.preventDefault();const p=document.getElementById("edit-word").value.trim(),s=a.querySelector(".edit-feedback");if(qe(p,e.id)){s.textContent=`La palabra "${p}" ya existe.`,s.style.display="block";return}e.word=p,e.meaning=document.getElementById("edit-meaning").value.trim(),e.type=document.getElementById("edit-type").value,e.category=document.getElementById("edit-category").value.trim()||null,e.emotion=document.getElementById("edit-emotion").value.trim(),e.example=document.getElementById("edit-example").value.trim(),n?e.image=n:e.image=document.getElementById("edit-image").value.trim(),le(e),t(),o()}),document.addEventListener("keydown",function l(p){p.key==="Escape"&&(t(),document.removeEventListener("keydown",l))})}function G(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function ga(e){switch(e){case"word":return'<i class="fa-solid fa-font"></i> Palabra';case"phrasal":return'<i class="fa-solid fa-link"></i> Phrasal Verb';case"expression":return'<i class="fa-solid fa-comment"></i> Expresión';case"connector":return'<i class="fa-solid fa-arrows-left-right"></i> Conector';default:return'<i class="fa-solid fa-file"></i> Otro'}}function se(e){const o=ce(),a=ke(),t=re(),n=24,i=2*Math.PI*n,r=Math.min(t.dailyGoal.count/t.dailyGoal.target,1),d=i-r*i,l=o.total>0;e.innerHTML=`
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
                 <span class="stat-value-sm">Lvl ${t.level}</span>
              </div>
              
              <div class="xp-progress-container">
                 <div class="xp-bar" style="width: ${va(t.totalXp,t.level)}%"></div>
              </div>
              <div class="xp-meta">
                 <span>${t.totalXp} XP Totales</span>
                 <span>Siguiente: ${ya(t.level)} XP</span>
              </div>
           </div>
        </div>

        <!-- Streak Card -->
        <div class="stat-card streak-card">
          <div class="icon-bg flame"><i class="fa-solid fa-fire"></i></div>
          <div class="stat-content">
            <span class="stat-value">${t.streak} <small>días</small></span>
            <span class="stat-label">Racha Actual</span>
            ${t.streak>0?'<div class="streak-badge active">¡En llamas! <i class="fa-solid fa-fire-flame-curved"></i></div>':'<div class="streak-badge">¡Empieza hoy!</div>'}
          </div>
        </div>
        
        <!-- Daily Goal Card -->
        <div class="stat-card daily-goal-card">
          <button class="goal-settings-btn" id="goal-settings-btn" title="Cambiar meta diaria">
            <i class="fa-solid fa-gear"></i>
          </button>
          <div class="stat-content">
             <span class="stat-value">${t.dailyGoal.count}<span class="separator">/</span>${t.dailyGoal.target}</span>
             <span class="stat-label">Meta Diaria</span>
             <span class="goal-msg-sm">${fa(t.dailyGoal.count,t.dailyGoal.target)}</span>
          </div>
          <div class="progress-ring-mini">
             <svg width="60" height="60">
              <circle class="bg" stroke-width="4" fill="transparent" r="${n}" cx="30" cy="30" />
              <circle class="fg" stroke-width="4" fill="transparent" r="${n}" cx="30" cy="30" 
                style="stroke-dasharray: ${i}; stroke-dashoffset: ${d};" />
            </svg>
             ${t.dailyGoal.count>=t.dailyGoal.target?'<div class="check-mark"><i class="fa-solid fa-check"></i></div>':""}
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
          <option value="due">🔔 Pendientes (${o.dueForReview})</option>
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
          ${a.map(m=>`<option value="${m}">${m}</option>`).join("")}
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
  `;const p=document.getElementById("word-list"),s=document.getElementById("filter-mastery"),w=document.getElementById("filter-type"),g=document.getElementById("filter-category"),k=document.getElementById("sort-by"),c=document.getElementById("search-input"),b=document.getElementById("clear-search"),L=document.getElementById("results-info"),A=document.getElementById("export-btn"),V=document.getElementById("import-btn"),I=document.getElementById("add-packs-btn"),z=document.getElementById("import-file");function P(){p.innerHTML="";let m=c.value.trim()?He(c.value.trim()):j();const E=Date.now();m=m.filter(y=>{let h=!0;s.value!=="all"&&(s.value==="due"?h=!y.nextReviewAt||y.nextReviewAt<=E:h=Le(y)===s.value);const T=w.value==="all"||y.type===w.value,u=g.value==="all"||y.category===g.value;return h&&T&&u}),m=Ge(m,k.value);const x=j().length;if(c.value.trim()?(L.innerHTML=`<span class="results-count">${m.length} resultados</span> para "<strong>${c.value}</strong>"`,L.style.display="block"):m.length!==x?(L.innerHTML=`<span class="results-count">${m.length} de ${x}</span> palabras`,L.style.display="block"):L.style.display="none",m.length===0){p.innerHTML=`
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
                ${D.map(h=>`
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
      `;const y=p.querySelector("#import-packs-btn");if(y){let h=new Set;const T=()=>{const u=h.size;if(y.disabled=u===0,u===0)y.textContent="Selecciona packs",y.classList.remove("active");else{let q=0;h.forEach(R=>{const $=D.find(J=>J.id===R);$&&(q+=$.words.length)}),y.innerHTML=`<i class="fa-solid fa-download"></i> Añadir ${u} pack${u>1?"s":""} (${q} palabras)`,y.classList.add("active")}};p.querySelectorAll(".pack-card").forEach(u=>{u.addEventListener("click",()=>{const q=u.dataset.packId;h.has(q)?(h.delete(q),u.classList.remove("selected")):(h.add(q),u.classList.add("selected")),T()})}),y.addEventListener("click",()=>{if(h.size!==0&&confirm(`¿Añadir ${h.size} packs a tu vocabulario?`)){let u=[];h.forEach($=>{const J=D.find(Ne=>Ne.id===$);J&&(u=u.concat(J.words))});const q=JSON.stringify({words:u}),R=ae(q);R.success?(C("Packs añadidos",`¡Genial! Se han añadido ${R.imported} palabras nuevas.`,"success"),se(e)):C("Error","Hubo un problema al cargar los packs.","error")}})}}else m.forEach(y=>{p.appendChild(ma(y,P))})}s.addEventListener("change",P),w.addEventListener("change",P),g.addEventListener("change",P),k.addEventListener("change",P);let F;c.addEventListener("input",()=>{b.style.display=c.value?"flex":"none",clearTimeout(F),F=setTimeout(P,300)}),b.addEventListener("click",()=>{c.value="",b.style.display="none",P()}),A.addEventListener("click",()=>{const m=Je(),E=new Blob([m],{type:"application/json"}),x=URL.createObjectURL(E),y=document.createElement("a");y.href=x,y.download=`emowords-backup-${new Date().toISOString().split("T")[0]}.json`,y.click(),URL.revokeObjectURL(x)}),I&&I.addEventListener("click",()=>{f()}),V.addEventListener("click",()=>{z.click()}),z.addEventListener("change",m=>{const E=m.target.files[0];if(!E)return;const x=E.name.toLowerCase().endsWith(".csv"),y=new FileReader;y.onload=h=>{const T=h.target.result;let u;if(x)if(u=Qe(T),u.success){let q=`${u.imported} palabras importadas.`;u.duplicates>0&&(q+=` ${u.duplicates} duplicadas omitidas.`),u.skipped>0&&(q+=` ${u.skipped} con errores.`),C("Importación CSV completada",q,"success"),setTimeout(()=>location.reload(),1500)}else C("Error de importación CSV",u.error,"error");else u=ae(T),u.success?(C("Importación completada",`${u.imported} palabras importadas.`,"success"),setTimeout(()=>location.reload(),1500)):C("Error de importación",u.error,"error")},y.readAsText(E),m.target.value=""});const B=document.getElementById("goal-settings-btn");B&&B.addEventListener("click",()=>{v()});const X=document.getElementById("explore-packs-btn");X&&X.addEventListener("click",()=>{f()});function f(){document.querySelector(".packs-modal")?.remove();let m=new Set;const E=document.createElement("div");E.className="packs-modal edit-modal",E.innerHTML=`
      <div class="modal-overlay"></div>
      <div class="modal-content" style="max-width: 700px;">
        <div class="modal-header">
          <h3><i class="fa-solid fa-layer-group"></i> Packs de Inicio</h3>
          <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <p style="padding: 0 1.5rem; color: var(--gray-500); margin-bottom: 1rem;">Selecciona los packs que quieras añadir a tu vocabulario:</p>
        <div class="packs-modal-grid">
          ${D.map(T=>{const u=localStorage.getItem("pack_"+T.id);return`
            <div class="pack-card-modal ${u?"added":""}" data-pack-id="${T.id}">
              <div class="pack-check"><i class="fa-solid ${u?"fa-check":"fa-circle-check"}"></i></div>
              <div class="pack-icon"><i class="fa-solid ${T.icon}"></i></div>
              <div class="pack-info">
                <h4>${T.name}</h4>
                <p>${T.description}</p>
                <div class="pack-count"><i class="fa-solid fa-layer-group"></i> ${T.words.length} palabras</div>
              </div>
            </div>
          `}).join("")}
        </div>
        <div class="modal-actions" style="padding: 1.5rem;">
          <button type="button" class="btn-cancel">Cancelar</button>
          <button type="button" class="btn-save btn-import-packs" disabled>Selecciona packs</button>
        </div>
      </div>
    `,document.body.appendChild(E),requestAnimationFrame(()=>{E.classList.add("active")});const x=()=>{E.classList.remove("active"),setTimeout(()=>E.remove(),300)};E.querySelector(".modal-overlay").addEventListener("click",x),E.querySelector(".modal-close").addEventListener("click",x),E.querySelector(".btn-cancel").addEventListener("click",x);const y=E.querySelector(".btn-import-packs"),h=()=>{const T=m.size;if(y.disabled=T===0,T===0)y.textContent="Selecciona packs";else{let u=0;m.forEach(q=>{const R=D.find($=>$.id===q);R&&(u+=R.words.length)}),y.innerHTML=`<i class="fa-solid fa-download"></i> Añadir ${T} pack${T>1?"s":""} (${u} palabras)`}};E.querySelectorAll(".pack-card-modal").forEach(T=>{T.classList.contains("added")||T.addEventListener("click",()=>{const u=T.dataset.packId;m.has(u)?(m.delete(u),T.classList.remove("selected")):(m.add(u),T.classList.add("selected")),h()})}),y.addEventListener("click",()=>{if(m.size===0)return;let T=[];m.forEach(q=>{const R=D.find($=>$.id===q);R&&(T=[...T,...R.words],localStorage.setItem("pack_"+q,"true"))});const u=ae(JSON.stringify({words:T}));u.success?(C("¡Packs importados!",`Se añadieron ${u.imported} palabras.`,"success"),x(),setTimeout(()=>location.reload(),1e3)):C("Error",u.error,"error")})}function v(){document.querySelector(".goal-settings-modal")?.remove();const m=re().dailyGoal.target,E=[5,10,15,20,30,50],x=document.createElement("div");x.className="goal-settings-modal edit-modal",x.innerHTML=`
      <div class="modal-overlay"></div>
      <div class="modal-content" style="max-width: 400px;">
        <div class="modal-header">
          <h3><i class="fa-solid fa-bullseye"></i> Meta Diaria</h3>
          <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="goal-options-grid">
          ${E.map(h=>`
            <button class="goal-option ${h===m?"active":""}" data-value="${h}">
              <span class="goal-number">${h}</span>
              <span class="goal-label">palabras</span>
            </button>
          `).join("")}
        </div>
        <div class="modal-actions" style="margin-top: 1.5rem;">
          <button type="button" class="btn-cancel">Cancelar</button>
        </div>
      </div>
    `,document.body.appendChild(x),requestAnimationFrame(()=>{x.classList.add("active")});const y=()=>{x.classList.remove("active"),setTimeout(()=>x.remove(),300)};x.querySelector(".modal-overlay").addEventListener("click",y),x.querySelector(".modal-close").addEventListener("click",y),x.querySelector(".btn-cancel").addEventListener("click",y),x.querySelectorAll(".goal-option").forEach(h=>{h.addEventListener("click",()=>{const T=parseInt(h.dataset.value);Ze(T),C("Meta actualizada",`Tu nueva meta diaria es ${T} palabras.`,"success"),y(),se(e)})}),document.addEventListener("keydown",function h(T){T.key==="Escape"&&(y(),document.removeEventListener("keydown",h))})}P()}function ya(e){return 100*Math.pow(e,2)}function va(e,o){const a=100*Math.pow(o-1,2),n=100*Math.pow(o,2)-a,i=e-a;return Math.min(100,Math.max(0,i/n*100))}function fa(e,o){return e>=o?"¡Objetivo completado!":e>=o*.75?"¡Casi lo tienes!":e>=o*.5?"¡Ya vas por la mitad!":"¡Vamos a por ello!"}function ha(e){const o=ke();e.innerHTML=`
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
                ${o.map(b=>`<option value="${b}">`).join("")}
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
  `;const a=document.getElementById("add-word-form"),t=document.getElementById("image-preview"),n=document.getElementById("preview-img"),i=document.getElementById("remove-preview"),r=document.getElementById("clear-form"),d=document.getElementById("image-data"),l=document.querySelectorAll(".image-tab"),p=document.querySelectorAll(".image-tab-content"),s=document.getElementById("upload-area"),w=document.getElementById("image-file"),g=document.getElementById("image-url"),k=document.getElementById("preview-url-btn");l.forEach(b=>{b.addEventListener("click",()=>{const L=b.dataset.tab;l.forEach(A=>A.classList.remove("active")),b.classList.add("active"),p.forEach(A=>{A.classList.remove("active"),A.id===`${L}-content`&&A.classList.add("active")})})}),s.addEventListener("click",()=>{w.click()}),s.addEventListener("dragover",b=>{b.preventDefault(),s.classList.add("dragover")}),s.addEventListener("dragleave",()=>{s.classList.remove("dragover")}),s.addEventListener("drop",b=>{b.preventDefault(),s.classList.remove("dragover");const L=b.dataTransfer.files;L.length>0&&c(L[0])}),w.addEventListener("change",b=>{b.target.files.length>0&&c(b.target.files[0])});function c(b){if(!b.type.startsWith("image/")){C("Archivo inválido","Por favor selecciona un archivo de imagen.","error");return}const L=2*1024*1024;if(b.size>L){C("Imagen muy grande","La imagen debe ser menor a 2MB.","error");return}const A=new FileReader;A.onload=V=>{const I=V.target.result;n.src=I,t.style.display="block",d.value=I,s.classList.add("has-file"),C("Imagen cargada","La imagen se ha cargado correctamente.","success")},A.onerror=()=>{C("Error","No se pudo leer la imagen.","error")},A.readAsDataURL(b)}k.addEventListener("click",()=>{const b=g.value.trim();b&&(n.src=b,t.style.display="block",d.value=b,n.onerror=()=>{t.style.display="none",d.value="",C("Error de imagen","No se pudo cargar la imagen. Verifica la URL.","warning")})}),g.addEventListener("keypress",b=>{b.key==="Enter"&&(b.preventDefault(),k.click())}),i.addEventListener("click",()=>{g.value="",w.value="",d.value="",t.style.display="none",n.src="",s.classList.remove("has-file")}),r.addEventListener("click",()=>{a.reset(),t.style.display="none",n.src="",d.value="",s.classList.remove("has-file")}),a.addEventListener("submit",b=>{b.preventDefault();const L=document.getElementById("word").value.trim(),A=document.getElementById("meaning").value.trim(),V=document.getElementById("type").value,I=document.getElementById("category").value.trim(),z=document.getElementById("emotion").value.trim(),P=document.getElementById("example").value.trim(),F=d.value.trim();if(!L||!A){C("Faltan datos","Por favor completa al menos la palabra y su significado.","error");return}if(qe(L)){C("Palabra duplicada",`La palabra "${L}" ya existe en tu vocabulario.`,"error");return}const B={id:Date.now(),word:L,meaning:A,type:V,category:I||null,emotion:z,example:P,image:F,remembered:!1};Be(B),a.reset(),t.style.display="none",n.src="",d.value="",s.classList.remove("has-file"),C("¡Guardado!",`"${L}" se ha añadido correctamente.`,"success"),document.getElementById("word").focus()})}const wa="modulepreload",ba=function(e){return"/emowords/"+e},xe={},xa=function(o,a,t){let n=Promise.resolve();if(a&&a.length>0){let p=function(s){return Promise.all(s.map(w=>Promise.resolve(w).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};var r=p;document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),l=d?.nonce||d?.getAttribute("nonce");n=p(a.map(s=>{if(s=ba(s),s in xe)return;xe[s]=!0;const w=s.endsWith(".css"),g=w?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${g}`))return;const k=document.createElement("link");if(k.rel=w?"stylesheet":wa,w||(k.as="script"),k.crossOrigin="",k.href=s,l&&k.setAttribute("nonce",l),document.head.appendChild(k),w)return new Promise((c,b)=>{k.addEventListener("load",c),k.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${s}`)))})}))}function i(d){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=d,window.dispatchEvent(l),!l.defaultPrevented)throw d}return n.then(d=>{for(const l of d||[])l.status==="rejected"&&i(l.reason);return o().catch(i)})};function Ta(e){let o=null,a=null,t=!1,n=[],i={correct:0,incorrect:0,xp:0},r=new Map;const d=2;n=Ke(),B(n);function l(){e.innerHTML="",o||p()}function p(){const f=n.length;e.innerHTML=`
      <h2 style="text-align: center; justify-content: center; margin-bottom: 0.5rem;">Modo de Repaso</h2>
      <p style="text-align: center; color: var(--gray-500); margin-bottom: 2rem;">
        Tienes <strong style="color: var(--primary-600);">${f}</strong> palabras pendientes
      </p>
      
      ${f===0?`
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
    `,e.querySelectorAll(".mode-card").forEach(m=>{m.addEventListener("click",()=>{if(o=m.dataset.mode,console.log(`Starting mode: ${o} with queue size: ${n.length}`),n.length===0){C("Sin palabras","No hay palabras pendientes para repasar ahora.","info"),z(e);return}l(),s(),c()})});const v=e.querySelector("#explore-packs-review-btn");v&&v.addEventListener("click",()=>{document.querySelector("[data-view=home]").click(),setTimeout(()=>{const m=document.getElementById("explore-packs-btn");m&&m.click()},100)})}function s(){if(e.querySelector(".review-header"))return;const f=document.createElement("div");f.className="review-header",f.innerHTML=`
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
     `,e.insertBefore(f,e.firstChild),document.getElementById("exit-mode").addEventListener("click",E=>{E.preventDefault(),i.correct>0||i.incorrect>0?confirm("¿Salir del modo repaso? Tu progreso se perderá.")&&g():g()});const m=document.createElement("div");m.id="active-content",m.className="review-container",e.appendChild(m)}function w(){const f=document.querySelector("#stat-queue .val"),v=document.querySelector("#stat-correct .val"),m=document.querySelector("#stat-xp .val");f&&(f.textContent=n.length),v&&(v.textContent=i.correct),m&&(m.textContent=`${i.xp} XP`)}function g(){o=null,l()}function k(){return n.shift()||null}function c(){if(!o){l();return}const f=document.getElementById("active-content");if(!f){l();return}if(a=k(),!a){z(f);return}let v=o;if(o==="mixed"){const m=["flashcard","quiz","typing","listening"];v=m[Math.floor(Math.random()*m.length)]}switch(v){case"flashcard":b(f);break;case"quiz":L(f);break;case"typing":A(f);break;case"listening":V(f);break}}function b(f){t=!1,a.reviewCount,f.innerHTML=`
      <div class="review-card" id="review-card">
        <div class="review-card-inner">
           <div class="review-meta">
              <span class="tag type-tag">${X(a.type)}</span>
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
    `,document.getElementById("review-speak-btn").addEventListener("click",y=>{y.stopPropagation(),W(a.word)});const v=document.getElementById("show-answer"),m=document.getElementById("review-answer"),E=document.getElementById("remembered-btn"),x=document.getElementById("forgotten-btn");v.addEventListener("click",()=>{t=!0,m.style.display="block",v.style.display="none",E.disabled=!1,x.disabled=!1,m.classList.add("fade-in")}),E.addEventListener("click",()=>I(!0)),x.addEventListener("click",()=>I(!1)),F(y=>{y==="Space"&&!t&&v.click(),y==="ArrowRight"&&t&&I(!0),y==="ArrowLeft"&&t&&I(!1)})}function L(f){const m=j().filter(h=>h.id!==a.id).sort(()=>.5-Math.random()).slice(0,3),E=[a,...m];B(E),f.innerHTML=`
      <div class="quiz-container">
         <div class="quiz-question">
            <h3 class="quiz-word">${a.word}</h3>
            <button class="speak-btn" id="quiz-speak-btn" style="margin: 0 auto; width: 40px; height: 40px; font-size: 1.2rem;">
                <i class="fa-solid fa-volume-high"></i>
            </button>
         </div>

         <div class="quiz-options">
            ${E.map(h=>`
                <button class="quiz-option" data-id="${h.id}">
                    ${h.meaning}
                </button>
            `).join("")}
         </div>
      </div>
    `,document.getElementById("quiz-speak-btn").addEventListener("click",()=>W(a.word));const x=f.querySelectorAll(".quiz-option");let y=!1;x.forEach(h=>{h.addEventListener("click",()=>{if(y)return;y=!0,String(h.dataset.id)===String(a.id)?(h.classList.add("correct"),setTimeout(()=>I(!0),800)):(h.classList.add("wrong"),x.forEach(q=>{String(q.dataset.id)===String(a.id)&&q.classList.add("correct")}),setTimeout(()=>I(!1),1500))})})}function A(f){f.innerHTML=`
      <div class="typing-container">
         <div class="review-card-inner" style="margin-bottom: 2rem;">
             <p style="font-size: 1.5rem; margin-bottom: 0.5rem; font-weight:700; color:var(--primary-600);">${a.meaning}</p>
             ${a.example?`<p style="font-style:italic; color:var(--gray-500)">"${a.example.replace(new RegExp(a.word,"gi"),"___")}"</p>`:""}
         </div>
         
         <input type="text" class="typing-input" id="type-input" placeholder="Escribe la palabra en inglés..." autocomplete="off">
         
         <button id="check-btn" class="add-word-btn" style="width: 100%;">Comprobar</button>
         <button id="give-up-btn" style="background:none; border:none; color:var(--gray-500); margin-top:1rem; cursor:pointer;">No lo sé</button>
      </div>
    `,setTimeout(()=>document.getElementById("type-input").focus(),100);const v=document.getElementById("type-input"),m=document.getElementById("check-btn"),E=document.getElementById("give-up-btn");function x(){v.value.trim().toLowerCase()===a.word.toLowerCase()?(v.classList.add("correct"),m.innerHTML='<i class="fa-solid fa-check"></i> Correcto',W(a.word),setTimeout(()=>I(!0),1e3)):(v.classList.add("wrong"),W("Incorrect","en-US"),setTimeout(()=>v.classList.remove("wrong"),500))}m.addEventListener("click",x),v.addEventListener("keydown",y=>{y.key==="Enter"&&x()}),E.addEventListener("click",()=>{v.value=a.word,v.classList.add("wrong"),W(a.word),setTimeout(()=>I(!1),2e3)})}function V(f){const m=j().filter(u=>u.id!==a.id).sort(()=>.5-Math.random()).slice(0,3),E=[a,...m];B(E),f.innerHTML=`
      <div class="quiz-container">
         <div class="quiz-question">
            <div style="font-size: 4rem; color: var(--primary-500); cursor: pointer; margin-bottom: 1rem;" id="listen-icon">
                <i class="fa-solid fa-circle-play"></i>
            </div>
            <p style="color: var(--gray-500);">Escucha y selecciona el significado</p>
         </div>

         <div class="quiz-options">
            ${E.map(u=>`
                <button class="quiz-option" data-id="${u.id}">
                    ${u.meaning}
                </button>
            `).join("")}
         </div>
      </div>
    `;const x=document.getElementById("listen-icon"),y=()=>{x.style.transform="scale(0.9)",setTimeout(()=>x.style.transform="scale(1)",150),W(a.word)};x.addEventListener("click",y),setTimeout(y,500);const h=f.querySelectorAll(".quiz-option");let T=!1;h.forEach(u=>{u.addEventListener("click",()=>{if(T)return;T=!0,String(u.dataset.id)===String(a.id)?(u.classList.add("correct"),setTimeout(()=>I(!0),800)):(u.classList.add("wrong"),h.forEach($=>{String($.dataset.id)===String(a.id)&&$.classList.add("correct")}),setTimeout(()=>I(!1),1500))})})}function I(f){try{if(!a)return;if(Xe(a.id,f),f){i.correct++,i.xp+=10;try{he(1)}catch(v){console.error(v)}r.delete(a.id)}else{i.incorrect++;const v=r.get(a.id)||0;v<d&&(r.set(a.id,v+1),n.push(a))}a=null,w(),c()}catch(v){console.error("Error in handleResult:",v)}}function z(f){try{const v=i.incorrect===0&&i.correct>=5,m=he(0,{perfectSession:v}),E=document.querySelector(".review-header");E&&(E.style.display="none");let x;try{x=re()}catch{x={streak:0,dailyGoal:{count:0,target:20}}}const y=ce(),h=ea(y),T=aa(h);la(),f.innerHTML=`
          <div class="empty-review-state">
            <div class="empty-icon" style="color: var(--success-500); animation: bounce 1s infinite;"><i class="fa-solid fa-trophy"></i></div>
            <h3>¡Sesión completada!</h3>
            <p>Has ganado <strong style="color:var(--warning-500)">${i.xp} XP</strong></p>
            
            ${v?`
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
        `,m.leveledUp&&setTimeout(()=>{ra(m.newLevel)},500),T.length>0&&setTimeout(()=>{Pe(T)},m.leveledUp?5500:1e3),window.confetti||window.canvasConfetti?(window.confetti||window.canvasConfetti)({particleCount:100,spread:70,origin:{y:.6}}):xa(()=>import("./confetti.module-C2jkTI5u.js"),[]).then(q=>{const R=q.default;R({particleCount:100,spread:70,origin:{y:.6}})}).catch(q=>console.log("Confetti not found",q));const u=document.getElementById("finish-btn");u&&u.addEventListener("click",()=>{o=null;const q=document.querySelector('[data-view="home"]');q?q.click():l()})}catch(v){console.error("Error in renderSummary:",v),f.innerHTML='<p class="error">Error al mostrar resumen. <button onclick="location.reload()">Recargar</button></p>'}}let P=null;function F(f){P&&P();const v=m=>{document.getElementById("active-content")&&document.activeElement.tagName!=="INPUT"&&f(m.code)};document.addEventListener("keydown",v),P=()=>document.removeEventListener("keydown",v),window._reviewCleanup=P}function B(f){for(let v=f.length-1;v>0;v--){const m=Math.floor(Math.random()*(v+1));[f[v],f[m]]=[f[m],f[v]]}return f}function X(f){return{word:"Palabra",phrasal:"Phrasal Verb",expression:"Expresión",connector:"Conector"}[f]||"Otro"}l()}function Ea(e){const o=j(),a=ce();if(e.innerHTML="",e.className="stats-view animate__animated animate__fadeIn",a.total===0){ka(e);return}let t=0,n={master:0,guru:0,apprentice:0,new:0};o.forEach(s=>{const w=s.correctCount||0;w>=10?(t+=100,n.master++):w>=5?(t+=75,n.guru++):w>=2?(t+=40,n.apprentice++):(t+=10,n.new++)});const i=a.total>0?Math.round(t/a.total):0,r=La(o),d=qa(o),l=Ca(o),p=`
    <header class="dashboard-header" style="text-align: center;">
        <div class="header-content" style="display: flex; flex-direction: column; align-items: center;">
            <h2 class="title">Centro de Estadísticas</h2>
            <p class="subtitle">Visualiza tu evolución y optimiza tu aprendizaje</p>
        </div>
        <div class="global-grade">
            <span class="grade-label">Nivel General</span>
            <span class="grade-value ${Sa(i)}">${Ia(i)}</span>
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
                ${Pa(r)}
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
                    ${Aa(r)}
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
                        ${ja(d)}
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
                            <div class="lvl-bar"><div class="fill" style="width: ${Q(n.master,a.total)}%"></div></div>
                            <span class="lvl-count">${n.master}</span>
                        </div>
                        <div class="level-item guru">
                            <span class="lvl-name">Experto (5-9)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${Q(n.guru,a.total)}%"></div></div>
                            <span class="lvl-count">${n.guru}</span>
                        </div>
                        <div class="level-item apprentice">
                            <span class="lvl-name">Aprendiz (2-4)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${Q(n.apprentice,a.total)}%"></div></div>
                            <span class="lvl-count">${n.apprentice}</span>
                        </div>
                        <div class="level-item new">
                            <span class="lvl-name">Nuevo (0-1)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${Q(n.new,a.total)}%"></div></div>
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
                    ${l.length>0?l.map(s=>`
                        <div class="struggling-item">
                            <div class="s-info">
                                <span class="s-word">${s.word}</span>
                                <span class="s-meaning">${s.meaning}</span>
                            </div>
                            <div class="s-metric">
                                <span class="error-badge">${s.incorrectCount} fallos</span>
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
                    ${oa().slice(0,8).map(s=>`
                        <div class="achievement-mini ${s.unlocked?"unlocked":"locked"}" title="${s.name}: ${s.description}">
                            <i class="fa-solid ${s.icon}"></i>
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
            ${Ra(o)}
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
            ${$a(o,r)}
        </div>
    </div>
  `;e.innerHTML=p}function ka(e){e.innerHTML=`
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
    `;const o=e.querySelector("#explore-packs-stats-btn");o&&o.addEventListener("click",()=>{document.querySelector("[data-view=home]").click(),setTimeout(()=>{const a=document.getElementById("explore-packs-btn");a&&a.click()},100)})}function La(e){const o=[...e].sort((i,r)=>(i.createdAt||0)-(r.createdAt||0)),a=new Map;let t=0;o.forEach(i=>{t++;const r=new Date(i.createdAt||Date.now()).toISOString().split("T")[0];a.set(r,t)});const n=Array.from(a.entries()).map(([i,r])=>({date:i,count:r}));if(n.length>0&&n.length<2){const i=new Date(n[0].date);i.setDate(i.getDate()-1),n.unshift({date:i.toISOString().split("T")[0],count:0})}return n}function qa(e){const o=["word","phrasal","expression","connector"],a={};return o.forEach(t=>{const n=e.filter(s=>s.type===t),i=n.length;if(i===0)return;let r=0,d=0;n.forEach(s=>{r+=s.correctCount||0,d+=s.incorrectCount||0});const l=r+d,p=l===0?0:Math.round(r/l*100);a[t]={count:i,accuracy:p}}),a}function Ca(e){return[...e].filter(o=>(o.incorrectCount||0)>0).sort((o,a)=>{const t=o.incorrectCount/(o.reviewCount||1);return a.incorrectCount/(a.reviewCount||1)-t}).slice(0,5)}function Q(e,o){return o?Math.round(e/o*100):0}function Ia(e){return e>=90?"S":e>=80?"A":e>=60?"B":e>=40?"C":"D"}function Sa(e){return e>=90?"text-legendary":e>=80?"text-success":e>=60?"text-primary":e>=40?"text-warning":"text-danger"}function Aa(e){if(!e||e.length===0)return"";const o=800,a=300,t=20,n=e[e.length-1].count;if(n===0)return"";const i=e.map((p,s)=>{const w=s/(e.length-1)*(o-2*t)+t,g=a-(p.count/n*(a-2*t)+t);return`${w},${g}`}).join(" "),r=t,d=o-t,l=`${r},${a} ${i} ${d},${a}`;return`
        <svg viewBox="0 0 ${o} ${a}" class="svg-chart" preserveAspectRatio="none">
            <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="var(--primary-500)" stop-opacity="0.4"/>
                    <stop offset="100%" stop-color="var(--primary-500)" stop-opacity="0"/>
                </linearGradient>
            </defs>
            <!-- Grid Lines (Horizontal) -->
            <line x1="0" y1="${a-t}" x2="${o}" y2="${a-t}" stroke="var(--gray-800)" stroke-width="1" />
            <line x1="0" y1="${a/2}" x2="${o}" y2="${a/2}" stroke="var(--gray-800)" stroke-width="1" stroke-dasharray="5,5" />
            
            <!-- Area Fill -->
            <polygon points="${l}" fill="url(#chartGradient)" />
            
            <!-- Line -->
            <polyline points="${i}" fill="none" stroke="var(--primary-400)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `}function Pa(e){if(!e||e.length<2)return"";const o=100,a=40,t=e[e.length-1].count,n=e.map((i,r)=>{const d=r/(e.length-1)*o,l=a-i.count/t*a;return`${d},${l}`}).join(" ");return`
        <svg viewBox="0 0 ${o} ${a}" class="sparkline" preserveAspectRatio="none">
             <polyline points="${n}" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
    `}function ja(e){const o={word:"Palabras",phrasal:"Phrasal Verbs",expression:"Expresiones",connector:"Conectores"};return Object.entries(e).map(([a,t])=>`
        <div class="type-stat-row">
            <div class="row-header">
                <span class="t-name">${o[a]}</span>
                <span class="t-val">${t.count}</span>
            </div>
            <div class="row-bar-bg">
                <div class="row-bar-fill ${a}" style="width: ${t.accuracy}%"></div>
            </div>
            <div class="row-meta">Precisión: ${t.accuracy}%</div>
        </div>
    `).join("")}function Ra(e){const o=new Date,a=13,t=a*7,n=new Map;e.forEach(p=>{if(p.lastReviewedAt){const s=new Date(p.lastReviewedAt).toISOString().split("T")[0];n.set(s,(n.get(s)||0)+1)}if(p.createdAt){const s=new Date(p.createdAt).toISOString().split("T")[0];n.set(s,(n.get(s)||0)+1)}});const i=Math.max(...Array.from(n.values()),1);let r='<div class="heatmap-grid">';const d=new Date(o);d.setDate(d.getDate()-t+1);const l=d.getDay();d.setDate(d.getDate()-(l===0?6:l-1));for(let p=0;p<a;p++){r+='<div class="heatmap-week">';for(let s=0;s<7;s++){const w=new Date(d);w.setDate(d.getDate()+p*7+s);const g=w.toISOString().split("T")[0],k=n.get(g)||0,c=k===0?0:Math.min(4,Math.ceil(k/i*4)),b=w>o;r+=`<div class="heatmap-day level-${b?"future":c}" title="${g}: ${k} actividades"></div>`}r+="</div>"}return r+="</div>",r}function $a(e,o){const a=e.length;if(a<2||o.length<2)return`
            <div class="prediction-placeholder">
                <i class="fa-solid fa-chart-line"></i>
                <p>Añade más palabras para ver tu proyección de progreso</p>
            </div>
        `;const t=o[0]?.date?new Date(o[0].date):new Date,n=o[o.length-1]?.date?new Date(o[o.length-1].date):new Date,i=Math.max(1,Math.ceil((n-t)/(1440*60*1e3))),r=a/i,d=Math.round(a+r*30),l=Math.round(a+r*90),p=a<500?Math.ceil((500-a)/r):0,s=a<1e3?Math.ceil((1e3-a)/r):0;return`
        <div class="prediction-stats">
            <div class="pred-stat">
                <span class="pred-value">${r.toFixed(1)}</span>
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
                <span>Alcanzarás <strong>1000 palabras</strong> en ~${s} días</span>
            </div>
        `:""}
        ${a>=1e3?`
            <div class="prediction-milestone achieved">
                <i class="fa-solid fa-crown"></i>
                <span>¡Increíble! Ya tienes <strong>${a}</strong> palabras 🎉</span>
            </div>
        `:""}
    `}const je="emowords_onboarding_completed",Re="emowords_user_level",Z=[{id:"welcome",target:null,title:"¡Bienvenido a EmoWords! 👋",content:"Aprende vocabulario conectando cada palabra con tus recuerdos personales. Te guiaremos en 30 segundos.",position:"center",icon:"fa-solid fa-rocket"},{id:"level-select",target:null,title:"¿Cuál es tu nivel de inglés?",content:"Esto nos ayudará a sugerirte los packs más adecuados para ti.",position:"center",icon:"fa-solid fa-graduation-cap",type:"level-selection"},{id:"pack-select",target:null,title:"¡Empieza con ventaja! 🎁",content:"Hemos seleccionado estos packs ideales para tu nivel. Añádelos para empezar con vocabulario útil desde el primer minuto.",position:"center",type:"pack-selection",icon:"fa-solid fa-gift"},{id:"nav-add",target:'[data-view="add"]',title:"1. Añadir Vocabulario",content:"Aquí añades palabras, phrasal verbs o expresiones con su significado.",position:"bottom",icon:"fa-solid fa-plus"},{id:"nav-review",target:'[data-view="review"]',title:"2. Repasar",content:"5 modos de práctica: Flashcards, Quiz, Escritura, Listening y Mixto.",position:"bottom",icon:"fa-solid fa-graduation-cap"},{id:"nav-stats",target:'[data-view="stats"]',title:"3. Tu Progreso",content:"Visualiza tu evolución, logros y palabras que necesitan más atención.",position:"bottom",icon:"fa-solid fa-chart-line"},{id:"secret",target:null,title:"🧠 El Secreto de EmoWords",content:"Al añadir palabras, conecta cada una con un recuerdo personal o emoción. ¡Tu memoria será 10 veces más fuerte!",position:"center",icon:"fa-solid fa-heart"},{id:"ready",target:null,title:"¡Listo para aprender! 🚀",content:"Empieza añadiendo tu primera palabra o explora los packs predefinidos. ¡Las emociones graban, la repetición se olvida!",position:"center",icon:"fa-solid fa-check-circle"}],Va=[{code:"A1-A2",label:"Básico",description:"Principiante"},{code:"B1",label:"Intermedio bajo",description:"Pre-intermedio"},{code:"B2",label:"Intermedio alto",description:"Intermedio"},{code:"C1-C2",label:"Avanzado",description:"Avanzado/Nativo"}];let _=localStorage.getItem(Re)||null,O=0,S=null,N=null,H=null;function $e(){return!localStorage.getItem(je)}function Ma(){localStorage.setItem(je,"true")}function Da(){$e()&&(O=0,za(),me(O))}function za(){document.querySelector(".onboarding-overlay")?.remove(),N=document.createElement("div"),N.className="onboarding-overlay",N.innerHTML=`
    <div class="onboarding-backdrop"></div>
    <div class="onboarding-spotlight"></div>
  `,document.body.appendChild(N),H=N.querySelector(".onboarding-spotlight")}function me(e){const o=Z[e];if(!o){Me();return}S&&S.remove(),o.position==="center"||!o.target?H.style.display="none":H.style.display="block",S=document.createElement("div"),S.className="onboarding-tooltip";const a=e===Z.length-1,t=e===0,n=o.type==="level-selection",i=(e+1)/Z.length*100,r=n?`
    <div class="level-grid">
      ${Va.map(s=>`
        <button class="level-btn" data-level="${s.code}">
          <span class="level-code">${s.code}</span>
          <span class="level-label">${s.label}</span>
        </button>
      `).join("")}
    </div>
  `:"";if(S.innerHTML=`
    <div class="tooltip-progress-bar">
      <div class="tooltip-progress-fill" style="width: ${i}%"></div>
    </div>
    <div class="tooltip-header-row">
      <span class="tooltip-step">${e+1} de ${Z.length}</span>
      <button class="tooltip-skip" title="Saltar tutorial">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="tooltip-body">
      ${o.icon?`<div class="tooltip-icon"><i class="${o.icon}"></i></div>`:""}
      <h4 class="tooltip-title">${o.title}</h4>
      <p class="tooltip-content">${o.content}</p>
      ${r}
    </div>
    <div class="tooltip-actions">
      ${t?"<div></div>":'<button class="tooltip-prev"><i class="fa-solid fa-arrow-left"></i></button>'}
      <button class="tooltip-next ${a?"finish":""}" ${n&&!_?"disabled":""}>
        ${a?"¡Empezar!":"Siguiente"} 
        ${a?'<i class="fa-solid fa-rocket"></i>':'<i class="fa-solid fa-arrow-right"></i>'}
      </button>
    </div>
  `,o.type==="pack-selection"&&_){let s=[];_==="A1-A2"?s=D.filter(c=>c.level==="A1"||c.level==="A2"):_==="C1-C2"?s=D.filter(c=>c.level==="C1"||c.level==="C2"):s=D.filter(c=>c.level===_);const w=`
      <div class="packs-grid-onboarding">
        ${s.map(c=>`
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
    `,g=document.createElement("div");g.innerHTML=S.innerHTML;const k=g.querySelector(".tooltip-body");k&&(k.insertAdjacentHTML("beforeend",w),S.innerHTML=g.innerHTML)}if(N.appendChild(S),o.position==="center"||!o.target)S.classList.add("centered"),Ve();else{S.classList.remove("centered");const s=document.querySelector(o.target);s?Na(s,o.position):(S.classList.add("centered"),H.style.display="none")}const d=S.querySelector(".tooltip-skip"),l=S.querySelector(".tooltip-next"),p=S.querySelector(".tooltip-prev");if(d.addEventListener("click",Oa),l.addEventListener("click",Ba),p&&p.addEventListener("click",Wa),n){const s=S.querySelectorAll(".level-btn");s.forEach(w=>{w.addEventListener("click",()=>{s.forEach(g=>g.classList.remove("active")),w.classList.add("active"),_=w.dataset.level,localStorage.setItem(Re,_),l.removeAttribute("disabled")})})}o.type==="pack-selection"&&S.querySelectorAll(".pack-card-mini").forEach(w=>{w.addEventListener("click",()=>{const g=w.dataset.packId,c=w.querySelector(".pack-add-btn").querySelector("i"),b=D.find(L=>L.id===g);w.classList.contains("added")?C("Pack ya añadido","Este pack ya está en tu colección","info"):b&&ae(JSON.stringify({words:b.words})).success&&(w.classList.add("added"),c.classList.remove("fa-plus"),c.classList.add("fa-check"),localStorage.setItem("pack_"+g,"true"),C("Pack añadido",`Has añadido ${b.name} a tu colección`,"success"))})}),requestAnimationFrame(()=>{S.classList.add("visible")})}function Na(e,o){const a=e.getBoundingClientRect(),t=8,n=16;H.style.top=`${a.top-t}px`,H.style.left=`${a.left-t}px`,H.style.width=`${a.width+t*2}px`,H.style.height=`${a.height+t*2}px`;const i=S.getBoundingClientRect();let r,d;switch(o){case"bottom":r=a.bottom+n,d=a.left+a.width/2-i.width/2;break;case"top":r=a.top-n-i.height,d=a.left+a.width/2-i.width/2;break;case"left":r=a.top+a.height/2-i.height/2,d=a.left-n-i.width;break;case"right":r=a.top+a.height/2-i.height/2,d=a.right+n;break;default:r=a.bottom+n,d=a.left+a.width/2-i.width/2}const l=window.innerWidth,p=window.innerHeight;d<16&&(d=16),d+i.width>l-16&&(d=l-i.width-16),r<16&&(r=16),r+i.height>p-16&&(r=p-i.height-16),S.style.position="fixed",S.style.top=`${r}px`,S.style.left=`${d}px`}function Ve(){document.querySelectorAll(".onboarding-highlight").forEach(e=>{e.classList.remove("onboarding-highlight")})}function Ba(){O++,me(O)}function Wa(){O--,O<0&&(O=0),me(O)}function Oa(){Me()}function Me(){Ma(),S&&(S.classList.remove("visible"),setTimeout(()=>S?.remove(),200)),N&&(N.classList.add("fade-out"),setTimeout(()=>N?.remove(),300)),Ve()}const M=document.getElementById("app");window.addEventListener("offline",()=>{C("Sin conexión","Estás trabajando en modo offline.","warning",5e3),document.body.classList.add("offline-mode")});window.addEventListener("online",()=>{C("Conexión restaurada","Tus cambios se guardarán correctamente.","success",3e3),document.body.classList.remove("offline-mode")});window.addEventListener("error",e=>{console.error("Global error:",e.error),C("Error inesperado","Ha ocurrido un error. Intenta recargar la página.","error",0)});window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason)});const De=document.querySelectorAll(".nav-link"),oe=document.getElementById("theme-toggle"),Te=document.getElementById("audio-settings-btn");function Ha(){const o=K().theme||"dark";ue(o)}function ue(e){document.documentElement.setAttribute("data-theme",e);const o=oe.querySelector("i");e==="dark"?(o.className="fa-solid fa-sun",oe.title="Cambiar a modo claro"):(o.className="fa-solid fa-moon",oe.title="Cambiar a modo oscuro");const a=K();a.theme=e,Ce(a)}function Ga(){const o=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.body.classList.add("theme-transitioning"),ue(o),setTimeout(()=>{document.body.classList.remove("theme-transitioning")},300)}oe.addEventListener("click",Ga);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{K().theme||ue(e.matches?"dark":"light")});function ze(){const e=document.getElementById("review-badge");if(!e)return;const o=Ue();o>0?(e.textContent=o>99?"99+":o,e.style.display="flex"):e.style.display="none"}function _a(e){De.forEach(o=>{o.dataset.view===e?o.classList.add("active"):o.classList.remove("active")})}function ge(e){window._reviewCleanup&&(window._reviewCleanup(),window._reviewCleanup=null),_a(e),M.style.opacity="0",M.style.transform="translateY(10px)",setTimeout(()=>{switch(e){case"home":se(M);break;case"add":ha(M);break;case"review":Ta(M);break;case"stats":Ea(M);break;default:M.innerHTML="<p>Vista no encontrada</p>"}window.scrollTo({top:0,left:0,behavior:"instant"}),requestAnimationFrame(()=>{M.style.opacity="1",M.style.transform="translateY(0)"}),ze()},150)}M.style.transition="opacity 0.15s ease, transform 0.15s ease";De.forEach(e=>{e.addEventListener("click",o=>{o.preventDefault();const a=e.dataset.view;ge(a)})});const ee=document.querySelector(".logo");ee&&ee.dataset.view&&ee.addEventListener("click",e=>{e.preventDefault(),ge(ee.dataset.view)});Ha();Fa();ze();ge("home");setTimeout(()=>{$e()&&Da()},500);function Fa(){Te&&Te.addEventListener("click",Ua)}function Ua(){document.querySelector(".audio-settings-modal")?.remove();const e=pe(),o=document.createElement("div");o.className="audio-settings-modal edit-modal",o.innerHTML=`
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
  `,document.body.appendChild(o),requestAnimationFrame(()=>{o.classList.add("active")});const a=()=>{o.classList.remove("active"),setTimeout(()=>o.remove(),300)};o.querySelector(".modal-overlay").addEventListener("click",a),o.querySelector(".modal-close").addEventListener("click",a),o.querySelector(".btn-cancel").addEventListener("click",a),o.querySelectorAll(".accent-option").forEach(t=>{t.addEventListener("click",()=>{o.querySelectorAll(".accent-option").forEach(n=>n.classList.remove("active")),t.classList.add("active"),be({accent:t.dataset.accent}),C("Acento actualizado",da(t.dataset.accent),"success")})}),o.querySelectorAll(".speed-option").forEach(t=>{t.addEventListener("click",()=>{o.querySelectorAll(".speed-option").forEach(i=>i.classList.remove("active")),t.classList.add("active");const n=parseFloat(t.dataset.speed);be({speed:n}),C("Velocidad actualizada",pa(n),"success")})}),o.querySelector("#preview-audio").addEventListener("click",()=>{W("Hello, how are you today?")}),document.addEventListener("keydown",function t(n){n.key==="Escape"&&(a(),document.removeEventListener("keydown",t))})}"serviceWorker"in navigator&&window.addEventListener("load",()=>{const o="/emowords/"+"sw.js";navigator.serviceWorker.register(o).then(a=>{console.log("SW registered: ",a)}).catch(a=>{console.log("SW registration failed: ",a)})});
