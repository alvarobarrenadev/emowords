(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();const U="emowords_vocab",Ae="emowords_settings";function M(){const e=localStorage.getItem(U);return e?JSON.parse(e):[]}function Ge(e){const t=M(),a={...e,createdAt:Date.now(),lastReviewedAt:null,reviewCount:0,correctCount:0,incorrectCount:0,nextReviewAt:Date.now(),difficulty:0};t.push(a),localStorage.setItem(U,JSON.stringify(t))}function ce(e){const t=M().map(a=>a.id===e.id?e:a);localStorage.setItem(U,JSON.stringify(t))}function ye(e){const t=M().filter(a=>a.id!==e);localStorage.setItem(U,JSON.stringify(t))}function je(e){return M().find(t=>t.id===e)}function Oe(e){const t=M(),a=e.toLowerCase().trim();return a?t.filter(o=>o.word.toLowerCase().includes(a)||o.meaning.toLowerCase().includes(a)||o.example&&o.example.toLowerCase().includes(a)||o.emotion&&o.emotion.toLowerCase().includes(a)||o.category&&o.category.toLowerCase().includes(a)):t}function Ce(){const e=M(),t=new Set;return e.forEach(a=>{a.category&&t.add(a.category)}),Array.from(t).sort()}function Fe(e,t="date-desc"){const a=[...e];switch(t){case"date-asc":return a.sort((o,s)=>(o.createdAt||o.id)-(s.createdAt||s.id));case"date-desc":return a.sort((o,s)=>(s.createdAt||s.id)-(o.createdAt||o.id));case"alpha-asc":return a.sort((o,s)=>o.word.localeCompare(s.word));case"alpha-desc":return a.sort((o,s)=>s.word.localeCompare(o.word));case"review-count":return a.sort((o,s)=>(s.reviewCount||0)-(o.reviewCount||0));case"difficulty":return a.sort((o,s)=>(s.difficulty||0)-(o.difficulty||0));default:return a}}function de(){const e=M(),t=e.length,a=e.filter(v=>v.remembered).length,o=t-a,s=e.reduce((v,S)=>v+(S.reviewCount||0),0),n=t>0?(s/t).toFixed(1):0,i={word:e.filter(v=>v.type==="word").length,phrasal:e.filter(v=>v.type==="phrasal").length,expression:e.filter(v=>v.type==="expression").length,connector:e.filter(v=>v.type==="connector").length},p=e.reduce((v,S)=>v+(S.correctCount||0),0),l=e.reduce((v,S)=>v+(S.incorrectCount||0),0),c=p+l>0?(p/(p+l)*100).toFixed(1):0,r=Date.now(),b=e.filter(v=>!v.nextReviewAt||v.nextReviewAt<=r).length;return{total:t,remembered:a,forgotten:o,totalReviews:s,averageReviews:n,byType:i,retentionRate:c,dueForReview:b}}const fe=[1,3,7,14,30,60,120,240];function $e(e){const t=e.correctCount||0;return t>=10?"master":t>=5?"guru":t>=2?"apprentice":"new"}function Ue(e){const t=$e(e);return{level:t,...{new:{label:"Nuevo",class:"mastery-new",icon:"fa-seedling",percent:10},apprentice:{label:"Aprendiz",class:"mastery-apprentice",icon:"fa-leaf",percent:40},guru:{label:"Experto",class:"mastery-guru",icon:"fa-tree",percent:75},master:{label:"Maestro",class:"mastery-master",icon:"fa-crown",percent:100}}[t]}}function Xe(e){if(!e.nextReviewAt)return!0;const t=new Date().setHours(23,59,59,999);return e.nextReviewAt<=t}function Ye(){const e=M(),t=Date.now();return e.filter(a=>!a.nextReviewAt||a.nextReviewAt<=t).length}function he(e,t){const a=Date.now(),o=1440*60*1e3;if(!t)return a+600*1e3;const s=e.correctCount||0,n=Math.min(s,fe.length-1),i=fe[n],l=1-(e.difficulty||0)*.1,c=Math.max(1,Math.round(i*l));return a+c*o}function Ke(e){if(!e.nextReviewAt)return"Ahora";const t=Date.now(),a=e.nextReviewAt-t;if(a<=0)return"Ahora";const o=Math.floor(a/(60*1e3)),s=Math.floor(a/(3600*1e3)),n=Math.floor(a/(1440*60*1e3));return o<60?`${o}min`:s<24?`${s}h`:n===1?"Mañana":n<7?`${n} días`:n<30?`${Math.floor(n/7)} sem`:`${Math.floor(n/30)} mes${Math.floor(n/30)>1?"es":""}`}function Je(){const e=M(),t=Date.now();return e.filter(o=>!o.nextReviewAt||o.nextReviewAt<=t).sort((o,s)=>{const n=t-(o.nextReviewAt||0),i=t-(s.nextReviewAt||0);if(n!==i)return i-n;const p=o.difficulty||0,l=s.difficulty||0;return p!==l?l-p:(o.reviewCount||0)-(s.reviewCount||0)})}function Ze(e,t){const a=je(e);if(a)return a.remembered=t,a.lastReviewedAt=Date.now(),a.reviewCount=(a.reviewCount||0)+1,t?(a.correctCount=(a.correctCount||0)+1,a.difficulty=Math.max(-3,(a.difficulty||0)-1),a.nextReviewAt=he(a,!0)):(a.incorrectCount=(a.incorrectCount||0)+1,a.difficulty=Math.min(3,(a.difficulty||0)+1),a.correctCount=Math.max(0,(a.correctCount||0)-2),a.nextReviewAt=he(a,!1)),ce(a),a}function Qe(){const e=M(),t={version:"1.0",exportedAt:new Date().toISOString(),wordCount:e.length,words:e};return JSON.stringify(t,null,2)}function se(e){try{const t=JSON.parse(e);if(!t.words||!Array.isArray(t.words))throw new Error("Invalid data format: missing words array");const a=M(),o=new Set(a.map(i=>i.id));let s=0,n=0;return t.words.forEach(i=>{if(!i.word||!i.meaning){n++;return}(!i.id||o.has(i.id))&&(i.id=Date.now()+Math.random()),i.type=i.type||"word",i.remembered=i.remembered||!1,i.createdAt=i.createdAt||Date.now(),a.push(i),o.add(i.id),s++}),localStorage.setItem(U,JSON.stringify(a)),{success:!0,imported:s,skipped:n}}catch(t){return{success:!1,error:t.message}}}function ea(e){try{const t=e.trim().split(`
`);if(t.length<2)throw new Error("El archivo CSV debe tener al menos una fila de encabezados y una de datos");const a=we(t[0]).map(m=>m.toLowerCase().trim()),o=a.findIndex(m=>m==="word"||m==="palabra"||m==="english"),s=a.findIndex(m=>m==="meaning"||m==="significado"||m==="spanish"||m==="traduccion"||m==="traducción");if(o===-1||s===-1)throw new Error('El CSV debe tener columnas "word" y "meaning" (o "palabra" y "significado")');const n=a.findIndex(m=>m==="type"||m==="tipo"),i=a.findIndex(m=>m==="category"||m==="categoria"||m==="categoría"),p=a.findIndex(m=>m==="example"||m==="ejemplo"),l=a.findIndex(m=>m==="emotion"||m==="emocion"||m==="emoción"||m==="association"||m==="asociacion"),c=M(),r=new Set(c.map(m=>m.word.toLowerCase().trim()));let b=0,v=0,S=0;for(let m=1;m<t.length;m++){const T=t[m].trim();if(!T)continue;const P=we(T),B=P[o]?.trim(),x=P[s]?.trim();if(!B||!x){v++;continue}if(r.has(B.toLowerCase())){S++;continue}let E="word";if(n!==-1&&P[n]){const V=P[n].toLowerCase().trim();["phrasal","phrasal verb","phrasal-verb"].includes(V)?E="phrasal":["expression","expresion","expresión"].includes(V)?E="expression":["connector","conector"].includes(V)?E="connector":["word","palabra"].includes(V)&&(E="word")}const I={id:Date.now()+Math.random(),word:B,meaning:x,type:E,category:i!==-1&&P[i]?.trim()||null,example:p!==-1&&P[p]?.trim()||"",emotion:l!==-1&&P[l]?.trim()||"",image:"",remembered:!1,createdAt:Date.now(),lastReviewedAt:null,reviewCount:0,correctCount:0,incorrectCount:0,nextReviewAt:Date.now(),difficulty:0};c.push(I),r.add(B.toLowerCase()),b++}return localStorage.setItem(U,JSON.stringify(c)),{success:!0,imported:b,skipped:v,duplicates:S}}catch(t){return{success:!1,error:t.message}}}function we(e){const t=[];let a="",o=!1;for(let s=0;s<e.length;s++){const n=e[s];n==='"'?o=!o:(n===","||n===";")&&!o?(t.push(a.trim()),a=""):a+=n}return t.push(a.trim()),t}function Te(e,t=null){const a=M(),o=e.toLowerCase().trim();return a.some(s=>s.word.toLowerCase().trim()===o&&s.id!==t)}function K(){const e=localStorage.getItem(Ae);return e?JSON.parse(e):{theme:"dark",language:"es",showExampleInReview:!0,autoPlayAudio:!1}}function Pe(e){localStorage.setItem(Ae,JSON.stringify(e))}const Me="emowords_gamification";function te(){const e=localStorage.getItem(Me);return e?JSON.parse(e):{streak:0,lastStudyDate:null,maxStreak:0,dailyGoal:{date:new Date().toLocaleDateString(),count:0,target:20},totalXp:0,level:1,perfectSessions:0,totalReviews:0}}function pe(e){localStorage.setItem(Me,JSON.stringify(e))}function re(){const e=te(),t=new Date().toLocaleDateString();if(e.dailyGoal.date!==t){e.dailyGoal={date:t,count:0,target:e.dailyGoal.target||20};const a=new Date;a.setDate(a.getDate()-1),e.lastStudyDate!==a.toLocaleDateString()&&e.lastStudyDate!==t&&(e.streak>0,e.streak=0),pe(e)}return e}function be(e=1,t={}){const a=te(),o=new Date().toLocaleDateString(),s=a.level;if(a.dailyGoal.date!==o&&(a.dailyGoal={date:o,count:0,target:a.dailyGoal.target||20}),a.dailyGoal.count+=e,a.totalReviews=(a.totalReviews||0)+e,t.perfectSession&&(a.perfectSessions=(a.perfectSessions||0)+1),a.lastStudyDate!==o){const i=new Date;i.setDate(i.getDate()-1);const p=i.toLocaleDateString();a.lastStudyDate===p?a.streak+=1:a.streak=1,a.streak>a.maxStreak&&(a.maxStreak=a.streak),a.lastStudyDate=o}a.totalXp+=e*10,a.level=Math.floor(Math.sqrt(a.totalXp/100))+1,pe(a);const n=a.level>s;return{...a,leveledUp:n,newLevel:n?a.level:null}}function aa(e){const t=te();t.dailyGoal.target=e,pe(t)}function ta(e){const t=te();return{totalWords:e?.total||0,masteredWords:e?.mastered||0,wordsByType:e?.byType||{word:0,phrasal:0,expression:0,connector:0},maxStreak:t.maxStreak||0,streak:t.streak||0,totalReviews:t.totalReviews||0,perfectSessions:t.perfectSessions||0,level:t.level||1,studiedAtNight:!1,studiedEarly:!1}}const Ve="emowords_achievements",Y={first_word:{id:"first_word",name:"Primera Palabra",description:"Añade tu primera palabra",icon:"fa-seedling",category:"vocabulary",xpReward:10,condition:e=>e.totalWords>=1},collector_10:{id:"collector_10",name:"Coleccionista",description:"Alcanza 10 palabras en tu vocabulario",icon:"fa-layer-group",category:"vocabulary",xpReward:25,condition:e=>e.totalWords>=10},collector_50:{id:"collector_50",name:"Bibliotecario",description:"Alcanza 50 palabras en tu vocabulario",icon:"fa-book",category:"vocabulary",xpReward:50,condition:e=>e.totalWords>=50},collector_100:{id:"collector_100",name:"Erudito",description:"Alcanza 100 palabras en tu vocabulario",icon:"fa-graduation-cap",category:"vocabulary",xpReward:100,condition:e=>e.totalWords>=100},collector_500:{id:"collector_500",name:"Maestro del Léxico",description:"Alcanza 500 palabras en tu vocabulario",icon:"fa-crown",category:"vocabulary",xpReward:250,condition:e=>e.totalWords>=500},streak_3:{id:"streak_3",name:"En Racha",description:"Mantén una racha de 3 días",icon:"fa-fire",category:"streak",xpReward:30,condition:e=>e.maxStreak>=3},streak_7:{id:"streak_7",name:"Semana Perfecta",description:"Mantén una racha de 7 días",icon:"fa-fire-flame-curved",category:"streak",xpReward:70,condition:e=>e.maxStreak>=7},streak_30:{id:"streak_30",name:"Mes de Fuego",description:"Mantén una racha de 30 días",icon:"fa-meteor",category:"streak",xpReward:200,condition:e=>e.maxStreak>=30},streak_100:{id:"streak_100",name:"Imparable",description:"Mantén una racha de 100 días",icon:"fa-dragon",category:"streak",xpReward:500,condition:e=>e.maxStreak>=100},first_review:{id:"first_review",name:"Primer Repaso",description:"Completa tu primera sesión de repaso",icon:"fa-play",category:"review",xpReward:15,condition:e=>e.totalReviews>=1},reviewer_50:{id:"reviewer_50",name:"Repasador",description:"Completa 50 repasos",icon:"fa-rotate",category:"review",xpReward:50,condition:e=>e.totalReviews>=50},reviewer_200:{id:"reviewer_200",name:"Experto en Repasos",description:"Completa 200 repasos",icon:"fa-brain",category:"review",xpReward:100,condition:e=>e.totalReviews>=200},perfect_session:{id:"perfect_session",name:"Sesión Perfecta",description:"Completa una sesión sin errores (mín. 5 palabras)",icon:"fa-star",category:"review",xpReward:40,condition:e=>e.perfectSessions>=1},first_master:{id:"first_master",name:"Primera Maestría",description:"Domina completamente tu primera palabra",icon:"fa-gem",category:"mastery",xpReward:30,condition:e=>e.masteredWords>=1},master_10:{id:"master_10",name:"Dominador",description:"Domina 10 palabras",icon:"fa-trophy",category:"mastery",xpReward:75,condition:e=>e.masteredWords>=10},master_50:{id:"master_50",name:"Gran Maestro",description:"Domina 50 palabras",icon:"fa-medal",category:"mastery",xpReward:200,condition:e=>e.masteredWords>=50},level_5:{id:"level_5",name:"Aprendiz Dedicado",description:"Alcanza el nivel 5",icon:"fa-arrow-up",category:"level",xpReward:50,condition:e=>e.level>=5},level_10:{id:"level_10",name:"Estudiante Avanzado",description:"Alcanza el nivel 10",icon:"fa-ranking-star",category:"level",xpReward:100,condition:e=>e.level>=10},level_25:{id:"level_25",name:"Leyenda del Vocabulario",description:"Alcanza el nivel 25",icon:"fa-chess-king",category:"level",xpReward:300,condition:e=>e.level>=25},variety_master:{id:"variety_master",name:"Variedad",description:"Tiene al menos 5 de cada tipo (palabra, phrasal, expresión, conector)",icon:"fa-shapes",category:"special",xpReward:60,condition:e=>e.wordsByType.word>=5&&e.wordsByType.phrasal>=5&&e.wordsByType.expression>=5&&e.wordsByType.connector>=5},night_owl:{id:"night_owl",name:"Búho Nocturno",description:"Estudia después de medianoche",icon:"fa-moon",category:"special",xpReward:20,condition:e=>e.studiedAtNight},early_bird:{id:"early_bird",name:"Madrugador",description:"Estudia antes de las 7am",icon:"fa-sun",category:"special",xpReward:20,condition:e=>e.studiedEarly}};function oe(){const e=localStorage.getItem(Ve);return e?JSON.parse(e):[]}function Be(e){localStorage.setItem(Ve,JSON.stringify(e))}function oa(e){const t=oe(),a=[];return Object.values(Y).forEach(o=>{t.includes(o.id)||o.condition(e)&&(t.push(o.id),a.push(o))}),a.length>0&&Be(t),a}function sa(){const e=oe();return Object.values(Y).map(t=>({...t,unlocked:e.includes(t.id)}))}function ne(){const e=Object.keys(Y).length,t=oe().length;return{total:e,unlocked:t,percent:Math.round(t/e*100)}}function na(){const e=new Date().getHours(),t={studiedAtNight:e>=0&&e<5,studiedEarly:e>=5&&e<7},a=oe(),o=[];return t.studiedAtNight&&!a.includes("night_owl")&&(a.push("night_owl"),o.push(Y.night_owl)),t.studiedEarly&&!a.includes("early_bird")&&(a.push("early_bird"),o.push(Y.early_bird)),o.length>0&&Be(a),o}const xe="toast-container";function ia(){let e=document.getElementById(xe);return e||(e=document.createElement("div"),e.id=xe,e.className="toast-container",document.body.appendChild(e)),e}function A(e,t,a="info",o=4e3){const s=ia(),n=document.createElement("div"),i={info:"fa-circle-info",success:"fa-circle-check",warning:"fa-triangle-exclamation",error:"fa-circle-xmark"};n.className=`toast ${a}`,n.innerHTML=`
    <i class="fa-solid ${i[a]||"fa-bell"}"></i>
    <div class="toast-content">
      <span class="toast-title">${e}</span>
      <span class="toast-message">${t}</span>
    </div>
  `,s.appendChild(n),o>0&&setTimeout(()=>{n.classList.add("removing"),n.addEventListener("animationend",()=>{n.remove(),s.children.length===0&&s.remove()})},o)}function ra(e){document.querySelector(".achievement-notification")?.remove();const t=document.createElement("div");t.className="achievement-notification animate__animated animate__fadeInUp",t.innerHTML=`
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
  `,document.body.appendChild(t);try{const a=new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp+fl5OQioR7d3d9hY+YoaWloJuVjIN4cHBzfoqWoKWmoZqUiXxxamp0f4yYoaSnop2XjIN4bWxzfouXn6OkoJqUiX5zamxxfIiUnKGjop6Zkoh+c21wd4OOl52hoZ6Zk4h9cWxveYOPmJ6hoZ2YkoZ7bmtvd4SPmZ6hoJ6YkYV4bWtvdoKNl52fn5yXkIR3a2pvdYGMl52fn5yXj4N2amluc4CLlpyenZuWjoJ1Zmhsb36Kk5qbnJqVjIBzZGZqa3yHkJaZmZeUi35wYmRnanyGj5WWlpSRiXxuX2JkanyEjZKVlJKPhnluXl9ibHqCi5GTk5GNhHZqXF1fanyBiY+RkZCLgXNmWlxdaHmAh4yPj46Kg3JlWVpbZ3d/hYqNjYyIf29iV1hZZXR9goiLi4qHfWxfVFVXY3J6gIWJiYeEe2pbUlNVYXB4foSHhoWCeGdYUFBTX21zeoCDg4KAdmVWTk5QXGpxdnyAf358b2NUT01UXGZ0eH17fHt5bWJUR01TV2RvdHp9fHt5cGVYUE1TV2Jwdnp7e3p4cGZaU09UWGRvdXp7e3l3cGdcVlNXXGZwd3t8e3l2b2heWVdaX2lzent7enl0bmVfW1lfZG50e3t6eHVvZ2JeXGBla3R6e3t4dXBpY19eY2dsc3l7enh1cWpkYWFkaW90eXt5d3RvamVjY2drcnl6eXd0cGtmZGVobnN4enl3dHFsZ2ZnaWx0eHp4dnRwbGhnZ2ltd3l5d3Vybmtnamp0d3h4dnVxbWppcHN2eHd2dHFtamxvc3Z4dnVzb2xsbW5zdnd1dHNvbW1ucnV3dnV0cm9ubm9xc3V1dHNxb25ub3Bxc3NycXBub25vb3ByMDEwMC8wLy8vLy8vLy4uLi4uLi4uLi4tLS0tLS0tLSwsKyssKysrKysrKioqKioqKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSg=");a.volume=.3,a.play().catch(()=>{})}catch{}setTimeout(()=>{t.classList.remove("animate__fadeInUp"),t.classList.add("animate__fadeOutUp"),setTimeout(()=>t.remove(),500)},4e3)}function qe(e){if(!e||e.length===0)return;let t=0;e.forEach(a=>{setTimeout(()=>{ra(a)},t),t+=4500})}function la(e){document.querySelector(".level-up-celebration")?.remove();const t=document.createElement("div");t.className="level-up-celebration",t.innerHTML=`
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
  `,document.body.appendChild(t),ca();const a=()=>{t.classList.add("fade-out"),setTimeout(()=>t.remove(),300)};t.querySelector(".level-up-close").addEventListener("click",a),t.querySelector(".level-up-overlay").addEventListener("click",a),setTimeout(a,5e3)}function ca(){const e=["#6366f1","#8b5cf6","#ec4899","#f59e0b","#10b981","#3b82f6"];for(let a=0;a<50;a++){const o=document.createElement("div");o.className="confetti",o.style.left=Math.random()*100+"vw",o.style.backgroundColor=e[Math.floor(Math.random()*e.length)],o.style.animationDuration=Math.random()*2+2+"s",o.style.animationDelay=Math.random()*.5+"s",document.body.appendChild(o),setTimeout(()=>o.remove(),4e3)}}function da(){const e=na();e.length>0&&qe(e)}const O=[{id:"a1-complete",name:"A1 - Beginner Pack",icon:"fa-seedling",description:"Lo esencial para sobrevivir: verbos del día a día, conectores básicos, tus primeros phrasal verbs y frases que usarás constantemente.",level:"A1",words:[{word:"Be",meaning:"Ser / Estar",type:"word",category:"Verbos",example:"I am tired. She is my friend."},{word:"Have",meaning:"Tener",type:"word",category:"Verbos",example:"I have a question."},{word:"Want",meaning:"Querer",type:"word",category:"Verbos",example:"I want coffee, please."},{word:"Need",meaning:"Necesitar",type:"word",category:"Verbos",example:"I need help."},{word:"Like",meaning:"Gustar",type:"word",category:"Verbos",example:"I like this song."},{word:"Go",meaning:"Ir",type:"word",category:"Verbos",example:"I go to work by metro."},{word:"Know",meaning:"Saber / Conocer",type:"word",category:"Verbos",example:"I don't know."},{word:"Think",meaning:"Pensar / Creer",type:"word",category:"Verbos",example:"I think so."},{word:"See",meaning:"Ver",type:"word",category:"Verbos",example:"See you tomorrow!"},{word:"Work",meaning:"Trabajar / Funcionar",type:"word",category:"Verbos",example:"It doesn't work."},{word:"And",meaning:"Y",type:"connector",category:"Conectores",example:"Coffee and a sandwich, please."},{word:"But",meaning:"Pero",type:"connector",category:"Conectores",example:"I like it, but it's expensive."},{word:"Or",meaning:"O",type:"connector",category:"Conectores",example:"Tea or coffee?"},{word:"Because",meaning:"Porque",type:"connector",category:"Conectores",example:"I'm late because of the traffic."},{word:"So",meaning:"Así que / Entonces",type:"connector",category:"Conectores",example:"I was hungry, so I ordered food."},{word:"Then",meaning:"Luego / Entonces",type:"connector",category:"Conectores",example:"First we eat, then we go."},{word:"Also",meaning:"También",type:"connector",category:"Conectores",example:"I also want dessert."},{word:"Maybe",meaning:"Quizás / A lo mejor",type:"connector",category:"Conectores",example:"Maybe tomorrow."},{word:"Really",meaning:"De verdad / Muy",type:"connector",category:"Conectores",example:"I'm really tired."},{word:"Actually",meaning:"En realidad",type:"connector",category:"Conectores",example:"Actually, I changed my mind."},{word:"Wake up",meaning:"Despertarse",type:"phrasal",category:"Phrasal Verbs",example:"I wake up at 7."},{word:"Get up",meaning:"Levantarse",type:"phrasal",category:"Phrasal Verbs",example:"Get up, we're late!"},{word:"Turn on",meaning:"Encender",type:"phrasal",category:"Phrasal Verbs",example:"Turn on the lights."},{word:"Turn off",meaning:"Apagar",type:"phrasal",category:"Phrasal Verbs",example:"Turn off your phone."},{word:"Come in",meaning:"Entrar / Pasa",type:"phrasal",category:"Phrasal Verbs",example:"Come in, sit down!"},{word:"Go out",meaning:"Salir",type:"phrasal",category:"Phrasal Verbs",example:"Let's go out tonight."},{word:"Sit down",meaning:"Sentarse",type:"phrasal",category:"Phrasal Verbs",example:"Please sit down."},{word:"Put on",meaning:"Ponerse (ropa)",type:"phrasal",category:"Phrasal Verbs",example:"Put on your jacket, it's cold."},{word:"Take off",meaning:"Quitarse (ropa)",type:"phrasal",category:"Phrasal Verbs",example:"Take off your shoes."},{word:"Look at",meaning:"Mirar",type:"phrasal",category:"Phrasal Verbs",example:"Look at this!"},{word:"How are you?",meaning:"¿Cómo estás?",type:"expression",category:"Expresiones",example:"Hey! How are you?"},{word:"I'm fine, thanks",meaning:"Bien, gracias",type:"expression",category:"Expresiones",example:"I'm fine, thanks. And you?"},{word:"Nice to meet you",meaning:"Encantado/a",type:"expression",category:"Expresiones",example:"Hi, I'm Ana. Nice to meet you."},{word:"See you later",meaning:"Hasta luego",type:"expression",category:"Expresiones",example:"Bye! See you later."},{word:"No problem",meaning:"No hay problema / De nada",type:"expression",category:"Expresiones",example:"Thanks! - No problem."},{word:"I don't understand",meaning:"No entiendo",type:"expression",category:"Expresiones",example:"Sorry, I don't understand."},{word:"Can you repeat?",meaning:"¿Puedes repetir?",type:"expression",category:"Expresiones",example:"Can you repeat, please?"},{word:"Excuse me",meaning:"Disculpa / Perdona",type:"expression",category:"Expresiones",example:"Excuse me, where is the bathroom?"},{word:"I'm sorry",meaning:"Lo siento",type:"expression",category:"Expresiones",example:"I'm sorry, I'm late."},{word:"Of course",meaning:"Por supuesto / Claro",type:"expression",category:"Expresiones",example:"Can I sit here? - Of course!"}]},{id:"a2-complete",name:"A2 - Elementary Pack",icon:"fa-leaf",description:"Para empezar a conversar: verbos de acción, conectores para contar cosas, phrasal verbs súper comunes y expresiones que oyes en todas partes.",level:"A2",words:[{word:"Try",meaning:"Intentar / Probar",type:"word",category:"Verbos",example:"Try this, it's delicious!"},{word:"Wait",meaning:"Esperar",type:"word",category:"Verbos",example:"Wait for me!"},{word:"Tell",meaning:"Decir / Contar",type:"word",category:"Verbos",example:"Tell me more."},{word:"Ask",meaning:"Preguntar / Pedir",type:"word",category:"Verbos",example:"Can I ask you something?"},{word:"Feel",meaning:"Sentir / Sentirse",type:"word",category:"Verbos",example:"I feel tired today."},{word:"Remember",meaning:"Recordar",type:"word",category:"Verbos",example:"I don't remember his name."},{word:"Forget",meaning:"Olvidar",type:"word",category:"Verbos",example:"I forgot my wallet."},{word:"Leave",meaning:"Irse / Dejar",type:"word",category:"Verbos",example:"I'm leaving now."},{word:"Stay",meaning:"Quedarse",type:"word",category:"Verbos",example:"Stay here, I'll be back."},{word:"Send",meaning:"Enviar",type:"word",category:"Verbos",example:"Send me the details."},{word:"After",meaning:"Después de",type:"connector",category:"Conectores",example:"After work, I go to the gym."},{word:"Before",meaning:"Antes de",type:"connector",category:"Conectores",example:"Before I forget..."},{word:"When",meaning:"Cuando",type:"connector",category:"Conectores",example:"When I was young..."},{word:"While",meaning:"Mientras",type:"connector",category:"Conectores",example:"I listen to music while I work."},{word:"If",meaning:"Si (condicional)",type:"connector",category:"Conectores",example:"If you want, we can go."},{word:"Anyway",meaning:"De todas formas / Bueno",type:"connector",category:"Conectores",example:"Anyway, let's go."},{word:"By the way",meaning:"Por cierto",type:"connector",category:"Conectores",example:"By the way, where is John?"},{word:"For example",meaning:"Por ejemplo",type:"connector",category:"Conectores",example:"I like fruits, for example, apples."},{word:"I mean",meaning:"O sea / Quiero decir",type:"connector",category:"Conectores",example:"I mean, it's not bad."},{word:"You know",meaning:"Ya sabes / Sabes",type:"connector",category:"Conectores",example:"It's like, you know, complicated."},{word:"Look for",meaning:"Buscar",type:"phrasal",category:"Phrasal Verbs",example:"I'm looking for my keys."},{word:"Pick up",meaning:"Recoger / Coger",type:"phrasal",category:"Phrasal Verbs",example:"I'll pick you up at 8."},{word:"Give up",meaning:"Rendirse / Dejar de",type:"phrasal",category:"Phrasal Verbs",example:"Don't give up!"},{word:"Come back",meaning:"Volver",type:"phrasal",category:"Phrasal Verbs",example:"When are you coming back?"},{word:"Find out",meaning:"Descubrir / Enterarse",type:"phrasal",category:"Phrasal Verbs",example:"I found out he lied."},{word:"Hurry up",meaning:"Darse prisa",type:"phrasal",category:"Phrasal Verbs",example:"Hurry up, we're late!"},{word:"Grow up",meaning:"Crecer / Madurar",type:"phrasal",category:"Phrasal Verbs",example:"I grew up in Madrid."},{word:"Give back",meaning:"Devolver",type:"phrasal",category:"Phrasal Verbs",example:"Give me back my phone!"},{word:"Write down",meaning:"Apuntar / Anotar",type:"phrasal",category:"Phrasal Verbs",example:"Write down the address."},{word:"Log in",meaning:"Iniciar sesión",type:"phrasal",category:"Phrasal Verbs",example:"Log in with your email."},{word:"What's up?",meaning:"¿Qué pasa? / ¿Qué tal?",type:"expression",category:"Expresiones",example:"Hey! What's up?"},{word:"Take care",meaning:"Cuídate",type:"expression",category:"Expresiones",example:"See you! Take care."},{word:"Good luck",meaning:"Buena suerte",type:"expression",category:"Expresiones",example:"Good luck with your exam!"},{word:"Never mind",meaning:"No importa / Déjalo",type:"expression",category:"Expresiones",example:"Never mind, forget it."},{word:"It doesn't matter",meaning:"No importa / Da igual",type:"expression",category:"Expresiones",example:"It doesn't matter, really."},{word:"I have no idea",meaning:"Ni idea / No tengo ni idea",type:"expression",category:"Expresiones",example:"I have no idea what happened."},{word:"Just a moment",meaning:"Un momento",type:"expression",category:"Expresiones",example:"Just a moment, please."},{word:"That's fine",meaning:"Está bien / Vale",type:"expression",category:"Expresiones",example:"That's fine with me."},{word:"I'm not sure",meaning:"No estoy seguro/a",type:"expression",category:"Expresiones",example:"I'm not sure if I can go."},{word:"Well done!",meaning:"¡Bien hecho!",type:"expression",category:"Expresiones",example:"You passed! Well done!"}]},{id:"b1-complete",name:"B1 - Intermediate Pack",icon:"fa-tree",description:"Para hablar con fluidez: verbos para opinar y expresarte, conectores para no quedarte callado, phrasal verbs esenciales y expresiones que usas cada día.",level:"B1",words:[{word:"Seem",meaning:"Parecer",type:"word",category:"Verbos",example:"It seems like a good idea."},{word:"Guess",meaning:"Suponer / Adivinar",type:"word",category:"Verbos",example:"I guess you're right."},{word:"Expect",meaning:"Esperar (expectativa)",type:"word",category:"Verbos",example:"I didn't expect that."},{word:"Realize",meaning:"Darse cuenta",type:"word",category:"Verbos",example:"I just realized I forgot my wallet."},{word:"Agree",meaning:"Estar de acuerdo",type:"word",category:"Verbos",example:"I totally agree with you."},{word:"Suggest",meaning:"Sugerir",type:"word",category:"Verbos",example:"I suggest we take a break."},{word:"Recommend",meaning:"Recomendar",type:"word",category:"Verbos",example:"I recommend this restaurant."},{word:"Manage",meaning:"Conseguir / Arreglárselas",type:"word",category:"Verbos",example:"I managed to finish on time."},{word:"Afford",meaning:"Permitirse (dinero)",type:"word",category:"Verbos",example:"I can't afford a new car."},{word:"Improve",meaning:"Mejorar",type:"word",category:"Verbos",example:"My English is improving."},{word:"Although",meaning:"Aunque",type:"connector",category:"Conectores",example:"Although it was late, I finished."},{word:"However",meaning:"Sin embargo",type:"connector",category:"Conectores",example:"It's cheap. However, it's bad quality."},{word:"Instead",meaning:"En su lugar",type:"connector",category:"Conectores",example:"Let's do this instead."},{word:"Besides",meaning:"Además",type:"connector",category:"Conectores",example:"It's late, and besides, I'm tired."},{word:"Otherwise",meaning:"Si no / De lo contrario",type:"connector",category:"Conectores",example:"Hurry up, otherwise we'll be late."},{word:"Even though",meaning:"Aunque (enfático)",type:"connector",category:"Conectores",example:"Even though I studied, I failed."},{word:"Basically",meaning:"Básicamente",type:"connector",category:"Conectores",example:"Basically, it's done."},{word:"Apparently",meaning:"Por lo visto / Al parecer",type:"connector",category:"Conectores",example:"Apparently, he quit his job."},{word:"Obviously",meaning:"Obviamente",type:"connector",category:"Conectores",example:"Obviously, I said yes."},{word:"Hopefully",meaning:"Ojalá / Con suerte",type:"connector",category:"Conectores",example:"Hopefully, it will work."},{word:"Figure out",meaning:"Entender / Resolver",type:"phrasal",category:"Phrasal Verbs",example:"I can't figure out this problem."},{word:"Work out",meaning:"Hacer ejercicio / Funcionar",type:"phrasal",category:"Phrasal Verbs",example:"Things will work out, don't worry."},{word:"Show up",meaning:"Aparecer / Presentarse",type:"phrasal",category:"Phrasal Verbs",example:"He didn't show up to the meeting."},{word:"Run out of",meaning:"Quedarse sin",type:"phrasal",category:"Phrasal Verbs",example:"We ran out of milk."},{word:"Get along with",meaning:"Llevarse bien con",type:"phrasal",category:"Phrasal Verbs",example:"I get along with my boss."},{word:"Set up",meaning:"Organizar / Configurar",type:"phrasal",category:"Phrasal Verbs",example:"Let's set up a meeting."},{word:"Catch up",meaning:"Ponerse al día",type:"phrasal",category:"Phrasal Verbs",example:"Let's catch up over coffee!"},{word:"Check out",meaning:"Echar un vistazo",type:"phrasal",category:"Phrasal Verbs",example:"Check out this video!"},{word:"Look forward to",meaning:"Tener ganas de",type:"phrasal",category:"Phrasal Verbs",example:"I'm looking forward to the weekend!"},{word:"Put off",meaning:"Posponer",type:"phrasal",category:"Phrasal Verbs",example:"Stop putting it off, do it now!"},{word:"It's up to you",meaning:"Tú decides / Depende de ti",type:"expression",category:"Expresiones",example:"Pizza or sushi? It's up to you."},{word:"That makes sense",meaning:"Tiene sentido",type:"expression",category:"Expresiones",example:"Oh, that makes sense now!"},{word:"It's not a big deal",meaning:"No es para tanto",type:"expression",category:"Expresiones",example:"Relax, it's not a big deal."},{word:"Let me know",meaning:"Avísame / Dime",type:"expression",category:"Expresiones",example:"Let me know if you need help."},{word:"To be honest",meaning:"Para ser sincero/a",type:"expression",category:"Expresiones",example:"To be honest, I don't like it."},{word:"I'm not in the mood",meaning:"No me apetece",type:"expression",category:"Expresiones",example:"I'm not in the mood for a party."},{word:"Fair enough",meaning:"Me parece bien / Vale",type:"expression",category:"Expresiones",example:"Fair enough, let's do it."},{word:"It depends",meaning:"Depende",type:"expression",category:"Expresiones",example:"Are you coming? It depends."},{word:"That's the thing",meaning:"Esa es la cuestión",type:"expression",category:"Expresiones",example:"That's the thing, I don't know."},{word:"I'll let you know",meaning:"Ya te diré / Te aviso",type:"expression",category:"Expresiones",example:"I'll let you know tomorrow."}]},{id:"b2-complete",name:"B2 - Upper-Intermediate Pack",icon:"fa-mountain",description:"Para sonar natural: verbos que usan los nativos, conectores para debatir, phrasal verbs del día a día y expresiones que escuchas en series y películas.",level:"B2",words:[{word:"Assume",meaning:"Suponer / Asumir",type:"word",category:"Verbos",example:"I assume you know about it."},{word:"Consider",meaning:"Considerar / Plantearse",type:"word",category:"Verbos",example:"Have you considered moving?"},{word:"Tend to",meaning:"Tender a / Soler",type:"word",category:"Verbos",example:"I tend to wake up early."},{word:"Involve",meaning:"Implicar / Involucrar",type:"word",category:"Verbos",example:"What does the job involve?"},{word:"Struggle",meaning:"Luchar / Costar (esfuerzo)",type:"word",category:"Verbos",example:"I struggle with mornings."},{word:"Achieve",meaning:"Lograr / Conseguir",type:"word",category:"Verbos",example:"She achieved her goals."},{word:"Avoid",meaning:"Evitar",type:"word",category:"Verbos",example:"I try to avoid sugar."},{word:"Convince",meaning:"Convencer",type:"word",category:"Verbos",example:"You convinced me!"},{word:"Complain",meaning:"Quejarse",type:"word",category:"Verbos",example:"Stop complaining!"},{word:"Appreciate",meaning:"Agradecer / Valorar",type:"word",category:"Verbos",example:"I really appreciate your help."},{word:"Therefore",meaning:"Por lo tanto",type:"connector",category:"Conectores",example:"It was late, therefore we left."},{word:"Nevertheless",meaning:"Sin embargo / Aun así",type:"connector",category:"Conectores",example:"It was hard. Nevertheless, I did it."},{word:"On the other hand",meaning:"Por otro lado",type:"connector",category:"Conectores",example:"It's cheap, but on the other hand, it's slow."},{word:"In that case",meaning:"En ese caso",type:"connector",category:"Conectores",example:"In that case, count me in!"},{word:"As long as",meaning:"Siempre que / Mientras",type:"connector",category:"Conectores",example:"You can go as long as you're back by 10."},{word:"Unless",meaning:"A menos que",type:"connector",category:"Conectores",example:"I'll go unless it rains."},{word:"Despite",meaning:"A pesar de",type:"connector",category:"Conectores",example:"Despite the rain, we had fun."},{word:"Whereas",meaning:"Mientras que",type:"connector",category:"Conectores",example:"I like tea, whereas he prefers coffee."},{word:"On top of that",meaning:"Además de eso / Encima",type:"connector",category:"Conectores",example:"I'm tired and, on top of that, hungry."},{word:"That being said",meaning:"Dicho esto",type:"connector",category:"Conectores",example:"That being said, I still think it's worth it."},{word:"Come up with",meaning:"Idear / Se me ocurrió",type:"phrasal",category:"Phrasal Verbs",example:"She came up with a great idea."},{word:"Turn out",meaning:"Resultar ser",type:"phrasal",category:"Phrasal Verbs",example:"It turned out to be a good decision."},{word:"Bring up",meaning:"Sacar un tema",type:"phrasal",category:"Phrasal Verbs",example:"Why did you bring that up?"},{word:"Get over",meaning:"Superar",type:"phrasal",category:"Phrasal Verbs",example:"I can't get over it."},{word:"Put up with",meaning:"Aguantar / Tolerar",type:"phrasal",category:"Phrasal Verbs",example:"I can't put up with this noise."},{word:"Get away with",meaning:"Salirse con la suya",type:"phrasal",category:"Phrasal Verbs",example:"You won't get away with this!"},{word:"Hold on",meaning:"Espera / Aguanta",type:"phrasal",category:"Phrasal Verbs",example:"Hold on, I'll be right back."},{word:"Mess up",meaning:"Cagarla / Estropear",type:"phrasal",category:"Phrasal Verbs",example:"I totally messed up."},{word:"Freak out",meaning:"Flipar / Entrar en pánico",type:"phrasal",category:"Phrasal Verbs",example:"Don't freak out, it's fine."},{word:"End up",meaning:"Acabar / Terminar",type:"phrasal",category:"Phrasal Verbs",example:"We ended up staying until midnight."},{word:"No way!",meaning:"¡Ni de broma! / ¡No me digas!",type:"expression",category:"Expresiones",example:"You quit your job? No way!"},{word:"I'm done",meaning:"He terminado / Paso de esto",type:"expression",category:"Expresiones",example:"I'm done with this situation."},{word:"That's insane",meaning:"Eso es una locura",type:"expression",category:"Expresiones",example:"You swam 5km? That's insane!"},{word:"Get the point",meaning:"Captar la idea / Entender",type:"expression",category:"Expresiones",example:"I get the point, you can stop."},{word:"You're kidding",meaning:"Estás de broma",type:"expression",category:"Expresiones",example:"You won? You're kidding!"},{word:"I couldn't care less",meaning:"Me importa un bledo",type:"expression",category:"Expresiones",example:"I couldn't care less about what he thinks."},{word:"That's not the point",meaning:"Esa no es la cuestión",type:"expression",category:"Expresiones",example:"Yeah but that's not the point."},{word:"Keep it real",meaning:"Sé auténtico / Sin rollos",type:"expression",category:"Expresiones",example:"Forget the drama, keep it real."},{word:"Been there, done that",meaning:"Ya pasé por eso",type:"expression",category:"Expresiones",example:"Drama at work? Been there, done that."},{word:"It is what it is",meaning:"Es lo que hay",type:"expression",category:"Expresiones",example:"The deadline is tomorrow. It is what it is."}]},{id:"c1-complete",name:"C1 - Advanced Pack",icon:"fa-rocket",description:"Para sonar sofisticado: verbos de trabajo y negocios, conectores elegantes pero naturales, phrasal verbs de nivel nativo y expresiones de persona culta.",level:"C1",words:[{word:"Address",meaning:"Abordar / Tratar (un tema)",type:"word",category:"Verbos",example:"We need to address this issue."},{word:"Implement",meaning:"Implementar",type:"word",category:"Verbos",example:"We'll implement the changes next week."},{word:"Ensure",meaning:"Asegurar(se)",type:"word",category:"Verbos",example:"Please ensure everyone is informed."},{word:"Clarify",meaning:"Aclarar",type:"word",category:"Verbos",example:"Let me clarify what I mean."},{word:"Prioritize",meaning:"Priorizar",type:"word",category:"Verbos",example:"We need to prioritize this task."},{word:"Overcome",meaning:"Superar",type:"word",category:"Verbos",example:"She overcame many challenges."},{word:"Acknowledge",meaning:"Reconocer / Admitir",type:"word",category:"Verbos",example:"I acknowledge my mistake."},{word:"Pursue",meaning:"Perseguir (objetivo)",type:"word",category:"Verbos",example:"She decided to pursue her dreams."},{word:"Delegate",meaning:"Delegar",type:"word",category:"Verbos",example:"Learn to delegate tasks."},{word:"Leverage",meaning:"Aprovechar / Sacar partido",type:"word",category:"Verbos",example:"Let's leverage our experience."},{word:"Having said that",meaning:"Dicho esto",type:"connector",category:"Conectores",example:"It's expensive. Having said that, it's worth it."},{word:"That said",meaning:"Dicho esto (más corto)",type:"connector",category:"Conectores",example:"He's difficult. That said, he's talented."},{word:"Either way",meaning:"De cualquier forma",type:"connector",category:"Conectores",example:"Either way, we need to decide."},{word:"At the end of the day",meaning:"Al fin y al cabo",type:"connector",category:"Conectores",example:"At the end of the day, it's your choice."},{word:"To be fair",meaning:"Para ser justos",type:"connector",category:"Conectores",example:"To be fair, he did apologize."},{word:"As a matter of fact",meaning:"De hecho",type:"connector",category:"Conectores",example:"As a matter of fact, I agree with you."},{word:"For what it's worth",meaning:"Por lo que pueda valer",type:"connector",category:"Conectores",example:"For what it's worth, I think you're great."},{word:"Mind you",meaning:"Eso sí / Aunque",type:"connector",category:"Conectores",example:"Good restaurant. Mind you, it's pricey."},{word:"Not to mention",meaning:"Por no hablar de",type:"connector",category:"Conectores",example:"It's cold, not to mention raining."},{word:"In a nutshell",meaning:"En resumen / Resumiendo",type:"connector",category:"Conectores",example:"In a nutshell, we need more time."},{word:"Play it down",meaning:"Quitarle importancia",type:"phrasal",category:"Phrasal Verbs",example:"Don't play it down, it's serious."},{word:"Rule out",meaning:"Descartar",type:"phrasal",category:"Phrasal Verbs",example:"We can't rule out that option."},{word:"Back out",meaning:"Echarse atrás",type:"phrasal",category:"Phrasal Verbs",example:"He backed out at the last minute."},{word:"Step up",meaning:"Dar un paso al frente",type:"phrasal",category:"Phrasal Verbs",example:"Someone needs to step up."},{word:"Fall through",meaning:"Fracasar / No salir adelante",type:"phrasal",category:"Phrasal Verbs",example:"The deal fell through."},{word:"Look into",meaning:"Investigar / Estudiar",type:"phrasal",category:"Phrasal Verbs",example:"I'll look into it."},{word:"Iron out",meaning:"Resolver / Limar",type:"phrasal",category:"Phrasal Verbs",example:"Let's iron out the details."},{word:"Pull off",meaning:"Lograr (algo difícil)",type:"phrasal",category:"Phrasal Verbs",example:"I can't believe we pulled it off!"},{word:"Get back to",meaning:"Volver a contactar",type:"phrasal",category:"Phrasal Verbs",example:"I'll get back to you on that."},{word:"Follow through",meaning:"Cumplir / Llevar a cabo",type:"phrasal",category:"Phrasal Verbs",example:"Make sure you follow through."},{word:"The thing is",meaning:"El caso es / La cosa es que",type:"expression",category:"Expresiones",example:"The thing is, I need more time."},{word:"To cut a long story short",meaning:"Resumiendo / Yendo al grano",type:"expression",category:"Expresiones",example:"To cut a long story short, we won."},{word:"Go the extra mile",meaning:"Hacer un esfuerzo extra",type:"expression",category:"Expresiones",example:"She always goes the extra mile."},{word:"Be on the same page",meaning:"Estar en la misma onda",type:"expression",category:"Expresiones",example:"Let's make sure we're on the same page."},{word:"Think outside the box",meaning:"Pensar de forma creativa",type:"expression",category:"Expresiones",example:"We need to think outside the box."},{word:"Hit the ground running",meaning:"Empezar con buen pie",type:"expression",category:"Expresiones",example:"I want to hit the ground running."},{word:"A steep learning curve",meaning:"Una curva de aprendizaje",type:"expression",category:"Expresiones",example:"This job has a steep learning curve."},{word:"Touch base",meaning:"Ponerse en contacto",type:"expression",category:"Expresiones",example:"Let's touch base next week."},{word:"Get the ball rolling",meaning:"Poner algo en marcha",type:"expression",category:"Expresiones",example:"Let's get the ball rolling."},{word:"Keep me in the loop",meaning:"Mantenme informado",type:"expression",category:"Expresiones",example:"Keep me in the loop, please."}]},{id:"c2-complete",name:"C2 - Proficiency Pack",icon:"fa-crown",description:"Para impresionar: verbos precisos de alto nivel, conectores para argumentar con elegancia, phrasal verbs sutiles e idioms para sonar como un nativo educado.",level:"C2",words:[{word:"Anticipate",meaning:"Anticipar / Prever",type:"word",category:"Verbos",example:"We didn't anticipate this problem."},{word:"Undermine",meaning:"Socavar / Minar",type:"word",category:"Verbos",example:"Don't undermine my authority."},{word:"Advocate",meaning:"Defender / Abogar por",type:"word",category:"Verbos",example:"I advocate for change."},{word:"Tackle",meaning:"Abordar / Hacer frente a",type:"word",category:"Verbos",example:"Let's tackle this problem."},{word:"Navigate",meaning:"Navegar / Manejarse en",type:"word",category:"Verbos",example:"It's hard to navigate office politics."},{word:"Thrive",meaning:"Prosperar / Florecer",type:"word",category:"Verbos",example:"She thrives under pressure."},{word:"Resonate",meaning:"Resonar / Conectar (con)",type:"word",category:"Verbos",example:"This message resonates with me."},{word:"Overlook",meaning:"Pasar por alto / Ignorar",type:"word",category:"Verbos",example:"Don't overlook the details."},{word:"Embrace",meaning:"Abrazar / Aceptar",type:"word",category:"Verbos",example:"Embrace change."},{word:"Streamline",meaning:"Simplificar / Optimizar",type:"word",category:"Verbos",example:"We need to streamline the process."},{word:"Be that as it may",meaning:"Sea como sea",type:"connector",category:"Conectores",example:"Be that as it may, we still need to act."},{word:"More often than not",meaning:"La mayoría de las veces",type:"connector",category:"Conectores",example:"More often than not, he's right."},{word:"By and large",meaning:"En general",type:"connector",category:"Conectores",example:"By and large, people are kind."},{word:"All things considered",meaning:"Teniendo todo en cuenta",type:"connector",category:"Conectores",example:"All things considered, it was a success."},{word:"For the most part",meaning:"En su mayor parte",type:"connector",category:"Conectores",example:"For the most part, I agree."},{word:"On balance",meaning:"Sopesándolo todo",type:"connector",category:"Conectores",example:"On balance, it was worth it."},{word:"As it turns out",meaning:"Resulta que",type:"connector",category:"Conectores",example:"As it turns out, I was wrong."},{word:"Needless to say",meaning:"Ni que decir tiene",type:"connector",category:"Conectores",example:"Needless to say, I was shocked."},{word:"That notwithstanding",meaning:"A pesar de eso",type:"connector",category:"Conectores",example:"That notwithstanding, we should proceed."},{word:"With that in mind",meaning:"Teniendo eso en cuenta",type:"connector",category:"Conectores",example:"With that in mind, let's continue."},{word:"Brush off",meaning:"Ignorar / No hacer caso",type:"phrasal",category:"Phrasal Verbs",example:"Don't brush off my concerns."},{word:"Chime in",meaning:"Intervenir / Meter baza",type:"phrasal",category:"Phrasal Verbs",example:"Feel free to chime in."},{word:"Pan out",meaning:"Resultar / Salir",type:"phrasal",category:"Phrasal Verbs",example:"Let's see how things pan out."},{word:"Touch on",meaning:"Tocar / Mencionar brevemente",type:"phrasal",category:"Phrasal Verbs",example:"I'd like to touch on one point."},{word:"Zone out",meaning:"Desconectar / Quedarse en blanco",type:"phrasal",category:"Phrasal Verbs",example:"Sorry, I zoned out for a moment."},{word:"Play up",meaning:"Exagerar / Dar problemas",type:"phrasal",category:"Phrasal Verbs",example:"My back is playing up again."},{word:"Kick in",meaning:"Empezar a hacer efecto",type:"phrasal",category:"Phrasal Verbs",example:"The coffee is starting to kick in."},{word:"Wind down",meaning:"Relajarse / Ir terminando",type:"phrasal",category:"Phrasal Verbs",example:"Time to wind down for the day."},{word:"Mull over",meaning:"Darle vueltas a",type:"phrasal",category:"Phrasal Verbs",example:"I need to mull it over."},{word:"Stumble upon",meaning:"Encontrar por casualidad",type:"phrasal",category:"Phrasal Verbs",example:"I stumbled upon this article."},{word:"The elephant in the room",meaning:"El tema incómodo que nadie menciona",type:"expression",category:"Expresiones",example:"Let's address the elephant in the room."},{word:"A blessing in disguise",meaning:"Una bendición disfrazada",type:"expression",category:"Expresiones",example:"Losing that job was a blessing in disguise."},{word:"Break the ice",meaning:"Romper el hielo",type:"expression",category:"Expresiones",example:"Let's play a game to break the ice."},{word:"Hit the nail on the head",meaning:"Dar en el clavo",type:"expression",category:"Expresiones",example:"You hit the nail on the head."},{word:"Easier said than done",meaning:"Del dicho al hecho hay un trecho",type:"expression",category:"Expresiones",example:"Getting fit is easier said than done."},{word:"The ball is in your court",meaning:"Te toca a ti",type:"expression",category:"Expresiones",example:"I made my offer, the ball is in your court."},{word:"Read the room",meaning:"Leer el ambiente",type:"expression",category:"Expresiones",example:"You need to learn to read the room."},{word:"Miss the boat",meaning:"Perder la oportunidad",type:"expression",category:"Expresiones",example:"If you don't apply now, you'll miss the boat."},{word:"Put your foot in your mouth",meaning:"Meter la pata",type:"expression",category:"Expresiones",example:"I really put my foot in my mouth there."},{word:"Under the weather",meaning:"Pachucho / Indispuesto",type:"expression",category:"Expresiones",example:"I'm feeling a bit under the weather."}]}],pa={accent:"en-US",speed:1};function me(){return K().tts||pa}function ke(e){const t=K();t.tts={...me(),...e},Pe(t)}function z(e,t={}){if(!("speechSynthesis"in window)){A("Error","Tu navegador no soporta síntesis de voz.","error");return}window.speechSynthesis.cancel();const a=me(),o=t.accent||a.accent,s=t.speed||a.speed,n=new SpeechSynthesisUtterance(e);n.lang=o,n.rate=s;const i=window.speechSynthesis.getVoices(),p=i.find(l=>l.lang.startsWith(o.substring(0,2))&&l.lang===o&&(l.name.includes("Google")||l.name.includes("Premium")||l.name.includes("Microsoft")))||i.find(l=>l.lang===o);p&&(n.voice=p),n.onerror=l=>{console.error("TTS Error:",l),A("Error","No se pudo reproducir el audio.","error")},window.speechSynthesis.speak(n)}function ma(e){return{"en-US":"🇺🇸 Americano","en-GB":"🇬🇧 Británico"}[e]||e}function ua(e){return e<=.6?"🐢 Muy lento":e<=.8?"🐌 Lento":e<=1.1?"🎯 Normal":e<=1.3?"🐇 Rápido":"⚡ Muy rápido"}function ga(e,t){const a=document.createElement("div");a.className="swipe-container",a.dataset.wordId=e.id;const o=document.createElement("div");o.className="word-card";const s=e.reviewCount||0,n=e.createdAt?new Date(e.createdAt).toLocaleDateString():"",i=Ue(e),p=Ke(e),l=Xe(e);o.innerHTML=`
    ${e.image?`<img src="${e.image}" alt="${e.word}" class="word-image" />`:""}

    <div class="tags">
      <span class="tag type-tag type-${e.type}">${va(e.type)}</span>
      <span class="tag mastery-tag ${i.class}" title="${i.label}">
        <i class="fa-solid ${i.icon}"></i>
        ${i.label}
      </span>
      ${l?`<span class="tag due-tag"><i class="fa-solid fa-clock"></i> ${p}</span>`:""}
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
        ${s>0?`<span class="meta-item"><i class="fa-solid fa-chart-simple"></i> ${s} repasos</span>`:""}
        ${!l&&e.nextReviewAt?`<span class="meta-item next-review"><i class="fa-solid fa-calendar-check"></i> Próximo: ${p}</span>`:""}
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
  `,o.querySelector(".speak-btn").addEventListener("click",r=>{r.stopPropagation(),z(e.word)}),o.querySelector(".toggle").addEventListener("click",()=>{e.remembered=!e.remembered,ce(e),t()}),o.querySelector(".delete").addEventListener("click",()=>{confirm(`¿Eliminar "${e.word}"?`)&&(ye(e.id),t())}),o.querySelector(".edit-btn").addEventListener("click",()=>{Ee(e,t)});const c=document.createElement("div");return c.className="swipe-actions",c.innerHTML=`
    <button class="swipe-action swipe-edit" title="Editar">
      <i class="fa-solid fa-pen"></i>
    </button>
    <button class="swipe-action swipe-delete" title="Eliminar">
      <i class="fa-solid fa-trash"></i>
    </button>
  `,a.appendChild(c),a.appendChild(o),c.querySelector(".swipe-edit").addEventListener("click",()=>{ae(a),Ee(e,t)}),c.querySelector(".swipe-delete").addEventListener("click",()=>{ae(a),confirm(`¿Eliminar "${e.word}"?`)&&(ye(e.id),t())}),ya(a,o),a}function Ee(e,t){document.querySelector(".edit-modal")?.remove();const a=document.createElement("div");a.className="edit-modal",a.innerHTML=`
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
            <input type="text" id="edit-word" value="${j(e.word)}" required />
          </div>
          <div class="form-field">
            <label><i class="fa-solid fa-language"></i> Significado</label>
            <input type="text" id="edit-meaning" value="${j(e.meaning)}" required />
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
            <input type="text" id="edit-category" value="${j(e.category||"")}" />
          </div>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-heart"></i> Asociación emocional</label>
          <textarea id="edit-emotion" rows="3">${j(e.emotion||"")}</textarea>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-quote-left"></i> Ejemplo</label>
          <input type="text" id="edit-example" value="${j(e.example||"")}" />
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-image"></i> Imagen</label>
          <div class="image-tabs">
            <button type="button" class="image-tab active" data-tab="url"><i class="fa-solid fa-link"></i> URL</button>
            <button type="button" class="image-tab" data-tab="upload"><i class="fa-solid fa-upload"></i> Subir</button>
          </div>
          <div class="image-tab-content" id="tab-url">
            <input type="url" id="edit-image" value="${j(e.image||"")}" placeholder="https://ejemplo.com/imagen.jpg" />
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
          ${e.image?`<div class="image-preview-mini"><img src="${j(e.image)}" alt="Preview" /></div>`:""}
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-cancel">Cancelar</button>
          <button type="submit" class="btn-save"><i class="fa-solid fa-check"></i> Guardar cambios</button>
        </div>
        <div class="edit-feedback" style="display: none; color: var(--danger); font-size: 0.9rem; margin-top: 1rem; text-align: center;"></div>
      </form>
    </div>
  `,document.body.appendChild(a),requestAnimationFrame(()=>{a.classList.add("active")});const o=()=>{a.classList.remove("active"),setTimeout(()=>a.remove(),300)};a.querySelector(".modal-overlay").addEventListener("click",o),a.querySelector(".modal-close").addEventListener("click",o),a.querySelector(".btn-cancel").addEventListener("click",o);let s=null;a.querySelectorAll(".image-tab").forEach(l=>{l.addEventListener("click",()=>{a.querySelectorAll(".image-tab").forEach(r=>r.classList.remove("active")),l.classList.add("active");const c=l.dataset.tab;a.querySelector("#tab-url").style.display=c==="url"?"block":"none",a.querySelector("#tab-upload").style.display=c==="upload"?"block":"none"})});const n=a.querySelector("#edit-image-file"),i=a.querySelector("#edit-dropzone");if(n&&i){let l=function(c){const r=new FileReader;r.onload=b=>{s=b.target.result,i.classList.add("has-file");const v=i.querySelector(".dropzone-text"),S=i.querySelector(".dropzone-subtext");v&&(v.textContent=c.name),S&&(S.textContent=`${(c.size/1024).toFixed(1)} KB`);let m=a.querySelector(".image-preview-mini");m||(m=document.createElement("div"),m.className="image-preview-mini",i.parentElement.after(m)),m.innerHTML=`<img src="${s}" alt="Preview" />`},r.readAsDataURL(c)};var p=l;["dragenter","dragover"].forEach(c=>{i.addEventListener(c,r=>{r.preventDefault(),i.classList.add("dragover")})}),["dragleave","drop"].forEach(c=>{i.addEventListener(c,r=>{r.preventDefault(),i.classList.remove("dragover")})}),i.addEventListener("drop",c=>{const r=c.dataTransfer.files[0];r&&r.type.startsWith("image/")&&l(r)}),n.addEventListener("change",c=>{const r=c.target.files[0];r&&l(r)})}a.querySelector(".edit-form").addEventListener("submit",l=>{l.preventDefault();const c=document.getElementById("edit-word").value.trim(),r=a.querySelector(".edit-feedback");if(Te(c,e.id)){r.textContent=`La palabra "${c}" ya existe.`,r.style.display="block";return}e.word=c,e.meaning=document.getElementById("edit-meaning").value.trim(),e.type=document.getElementById("edit-type").value,e.category=document.getElementById("edit-category").value.trim()||null,e.emotion=document.getElementById("edit-emotion").value.trim(),e.example=document.getElementById("edit-example").value.trim(),s?e.image=s:e.image=document.getElementById("edit-image").value.trim(),ce(e),o(),t()}),document.addEventListener("keydown",function l(c){c.key==="Escape"&&(o(),document.removeEventListener("keydown",l))})}function j(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function va(e){switch(e){case"word":return'<i class="fa-solid fa-font"></i> Palabra';case"phrasal":return'<i class="fa-solid fa-link"></i> Phrasal Verb';case"expression":return'<i class="fa-solid fa-comment"></i> Expresión';case"connector":return'<i class="fa-solid fa-arrows-left-right"></i> Conector';default:return'<i class="fa-solid fa-file"></i> Otro'}}const Se=50,F=80;function ya(e,t){let a=0,o=0,s=!1,n=!1;const i=c=>{window.innerWidth>768||(a=c.touches[0].clientX,s=!0,t.style.transition="none")},p=c=>{if(!s||window.innerWidth>768)return;o=c.touches[0].clientX;const r=o-a;if(r<0){const b=n?Math.max(-F*2,r-F):Math.max(-F*1.5,r);t.style.transform=`translateX(${b}px)`}else if(n){const b=Math.min(0,r-F);t.style.transform=`translateX(${b}px)`}},l=()=>{if(!s||window.innerWidth>768)return;s=!1,t.style.transition="transform 0.3s ease";const c=o-a;c<-Se&&!n?(t.style.transform=`translateX(-${F}px)`,e.classList.add("swiped"),n=!0):c>Se&&n?(ae(e),n=!1):n?t.style.transform=`translateX(-${F}px)`:t.style.transform="translateX(0)",a=0,o=0};t.addEventListener("touchstart",i,{passive:!0}),t.addEventListener("touchmove",p,{passive:!0}),t.addEventListener("touchend",l),document.addEventListener("touchstart",c=>{n&&!e.contains(c.target)&&(ae(e),n=!1)})}function ae(e){const t=e.querySelector(".word-card");t&&(t.style.transition="transform 0.3s ease",t.style.transform="translateX(0)"),e.classList.remove("swiped")}function le(e){const t=de(),a=Ce(),o=re(),s=24,n=2*Math.PI*s,i=Math.min(o.dailyGoal.count/o.dailyGoal.target,1),p=n-i*n,l=t.total>0;e.innerHTML=`
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
                 <div class="xp-bar" style="width: ${ha(o.totalXp,o.level)}%"></div>
              </div>
              <div class="xp-meta">
                 <span>${o.totalXp} XP Totales</span>
                 <span>Siguiente: ${fa(o.level)} XP</span>
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
             <span class="goal-msg-sm">${wa(o.dailyGoal.count,o.dailyGoal.target)}</span>
          </div>
          <div class="progress-ring-mini">
             <svg width="60" height="60">
              <circle class="bg" stroke-width="4" fill="transparent" r="${s}" cx="30" cy="30" />
              <circle class="fg" stroke-width="4" fill="transparent" r="${s}" cx="30" cy="30" 
                style="stroke-dasharray: ${n}; stroke-dashoffset: ${p};" />
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
    
    <!-- Hidden file input for import (JSON and CSV) -->
    <input type="file" id="import-file" accept=".json,.csv" style="display: none;" />
  `;const c=document.getElementById("word-list"),r=document.getElementById("filter-mastery"),b=document.getElementById("filter-type"),v=document.getElementById("filter-category"),S=document.getElementById("sort-by"),m=document.getElementById("search-input"),T=document.getElementById("clear-search"),P=document.getElementById("results-info"),B=document.getElementById("export-btn"),x=document.getElementById("import-btn"),E=document.getElementById("import-file");function I(){c.innerHTML="";let d=m.value.trim()?Oe(m.value.trim()):M();const u=Date.now();d=d.filter(g=>{let y=!0;r.value!=="all"&&(r.value==="due"?y=!g.nextReviewAt||g.nextReviewAt<=u:y=$e(g)===r.value);const h=b.value==="all"||g.type===b.value,w=v.value==="all"||g.category===v.value;return y&&h&&w}),d=Fe(d,S.value);const k=M().length;if(m.value.trim()?(P.innerHTML=`<span class="results-count">${d.length} resultados</span> para "<strong>${m.value}</strong>"`,P.style.display="block"):d.length!==k?(P.innerHTML=`<span class="results-count">${d.length} de ${k}</span> palabras`,P.style.display="block"):P.style.display="none",d.length===0){c.innerHTML=`
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-book-open"></i></div>
          <h3>${m.value.trim()?"No se encontraron resultados":"Tu vocabulario está vacío"}</h3>
          <p>${m.value.trim()?"Intenta con otra búsqueda.":"Empieza añadiendo tu primera palabra o carga un pack de inicio para arrancar."}</p>
          
          ${m.value.trim()?"":`
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
                ${O.map(y=>`
                  <div class="pack-card" data-pack-id="${y.id}">
                    <div class="pack-check"><i class="fa-solid fa-circle-check"></i></div>
                    <div class="pack-icon"><i class="fa-solid ${y.icon}"></i></div>
                    <div class="pack-info">
                      <h4>${y.name}</h4>
                      <p>${y.description}</p>
                      <div class="pack-count"><i class="fa-solid fa-layer-group"></i> ${y.words.length} palabras</div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `}
        </div>
      `;const g=c.querySelector("#import-packs-btn");if(g){let y=new Set;const h=()=>{const w=y.size;if(g.disabled=w===0,w===0)g.textContent="Selecciona packs",g.classList.remove("active");else{let L=0;y.forEach(C=>{const q=O.find(G=>G.id===C);q&&(L+=q.words.length)}),g.innerHTML=`<i class="fa-solid fa-download"></i> Añadir ${w} pack${w>1?"s":""} (${L} palabras)`,g.classList.add("active")}};c.querySelectorAll(".pack-card").forEach(w=>{w.addEventListener("click",()=>{const L=w.dataset.packId;y.has(L)?(y.delete(L),w.classList.remove("selected")):(y.add(L),w.classList.add("selected")),h()})}),g.addEventListener("click",()=>{if(y.size!==0&&confirm(`¿Añadir ${y.size} packs a tu vocabulario?`)){let w=[];y.forEach(q=>{const G=O.find(_e=>_e.id===q);G&&(w=w.concat(G.words))});const L=JSON.stringify({words:w}),C=se(L);C.success?(A("Packs añadidos",`¡Genial! Se han añadido ${C.imported} palabras nuevas.`,"success"),le(e)):A("Error","Hubo un problema al cargar los packs.","error")}})}}else d.forEach(g=>{c.appendChild(ga(g,I))})}r.addEventListener("change",I),b.addEventListener("change",I),v.addEventListener("change",I),S.addEventListener("change",I);let V;m.addEventListener("input",()=>{T.style.display=m.value?"flex":"none",clearTimeout(V),V=setTimeout(I,300)}),T.addEventListener("click",()=>{m.value="",T.style.display="none",I()}),B.addEventListener("click",()=>{const d=Qe(),u=new Blob([d],{type:"application/json"}),k=URL.createObjectURL(u),g=document.createElement("a");g.href=k,g.download=`emowords-backup-${new Date().toISOString().split("T")[0]}.json`,g.click(),URL.revokeObjectURL(k)}),x.addEventListener("click",()=>{E.click()}),E.addEventListener("change",d=>{const u=d.target.files[0];if(!u)return;const k=u.name.toLowerCase().endsWith(".csv"),g=new FileReader;g.onload=y=>{const h=y.target.result;let w;if(k)if(w=ea(h),w.success){let L=`${w.imported} palabras importadas.`;w.duplicates>0&&(L+=` ${w.duplicates} duplicadas omitidas.`),w.skipped>0&&(L+=` ${w.skipped} con errores.`),A("Importación CSV completada",L,"success"),setTimeout(()=>location.reload(),1500)}else A("Error de importación CSV",w.error,"error");else w=se(h),w.success?(A("Importación completada",`${w.imported} palabras importadas.`,"success"),setTimeout(()=>location.reload(),1500)):A("Error de importación",w.error,"error")},g.readAsText(u),d.target.value=""});const R=document.getElementById("goal-settings-btn");R&&R.addEventListener("click",()=>{f()});const W=document.getElementById("explore-packs-btn");W&&W.addEventListener("click",()=>{X()});function X(){document.querySelector(".packs-modal")?.remove();let d=new Set;const u=document.createElement("div");u.className="packs-modal edit-modal",u.innerHTML=`
      <div class="modal-overlay"></div>
      <div class="modal-content" style="max-width: 700px;">
        <div class="modal-header">
          <h3><i class="fa-solid fa-layer-group"></i> Packs de Inicio</h3>
          <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <p style="padding: 0 1.5rem; color: var(--gray-500); margin-bottom: 1rem;">Selecciona los packs que quieras añadir a tu vocabulario:</p>
        <div class="packs-modal-grid">
          ${O.map(h=>`
            <div class="pack-card-modal" data-pack-id="${h.id}">
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
        <div class="modal-actions" style="padding: 1.5rem;">
          <button type="button" class="btn-cancel">Cancelar</button>
          <button type="button" class="btn-save btn-import-packs" disabled>Selecciona packs</button>
        </div>
      </div>
    `,document.body.appendChild(u),requestAnimationFrame(()=>{u.classList.add("active")});const k=()=>{u.classList.remove("active"),setTimeout(()=>u.remove(),300)};u.querySelector(".modal-overlay").addEventListener("click",k),u.querySelector(".modal-close").addEventListener("click",k),u.querySelector(".btn-cancel").addEventListener("click",k);const g=u.querySelector(".btn-import-packs"),y=()=>{const h=d.size;if(g.disabled=h===0,h===0)g.textContent="Selecciona packs";else{let w=0;d.forEach(L=>{const C=O.find(q=>q.id===L);C&&(w+=C.words.length)}),g.innerHTML=`<i class="fa-solid fa-download"></i> Añadir ${h} pack${h>1?"s":""} (${w} palabras)`}};u.querySelectorAll(".pack-card-modal").forEach(h=>{h.addEventListener("click",()=>{const w=h.dataset.packId;d.has(w)?(d.delete(w),h.classList.remove("selected")):(d.add(w),h.classList.add("selected")),y()})}),g.addEventListener("click",()=>{if(d.size===0)return;let h=[];d.forEach(L=>{const C=O.find(q=>q.id===L);C&&(h=[...h,...C.words])});const w=se(JSON.stringify({words:h}));w.success?(A("¡Packs importados!",`Se añadieron ${w.imported} palabras.`,"success"),k(),setTimeout(()=>location.reload(),1e3)):A("Error",w.error,"error")})}function f(){document.querySelector(".goal-settings-modal")?.remove();const d=re().dailyGoal.target,u=[5,10,15,20,30,50],k=document.createElement("div");k.className="goal-settings-modal edit-modal",k.innerHTML=`
      <div class="modal-overlay"></div>
      <div class="modal-content" style="max-width: 400px;">
        <div class="modal-header">
          <h3><i class="fa-solid fa-bullseye"></i> Meta Diaria</h3>
          <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="goal-options-grid">
          ${u.map(y=>`
            <button class="goal-option ${y===d?"active":""}" data-value="${y}">
              <span class="goal-number">${y}</span>
              <span class="goal-label">palabras</span>
            </button>
          `).join("")}
        </div>
        <div class="modal-actions" style="margin-top: 1.5rem;">
          <button type="button" class="btn-cancel">Cancelar</button>
        </div>
      </div>
    `,document.body.appendChild(k),requestAnimationFrame(()=>{k.classList.add("active")});const g=()=>{k.classList.remove("active"),setTimeout(()=>k.remove(),300)};k.querySelector(".modal-overlay").addEventListener("click",g),k.querySelector(".modal-close").addEventListener("click",g),k.querySelector(".btn-cancel").addEventListener("click",g),k.querySelectorAll(".goal-option").forEach(y=>{y.addEventListener("click",()=>{const h=parseInt(y.dataset.value);aa(h),A("Meta actualizada",`Tu nueva meta diaria es ${h} palabras.`,"success"),g(),le(e)})}),document.addEventListener("keydown",function y(h){h.key==="Escape"&&(g(),document.removeEventListener("keydown",y))})}I()}function fa(e){return 100*Math.pow(e,2)}function ha(e,t){const a=100*Math.pow(t-1,2),s=100*Math.pow(t,2)-a,n=e-a;return Math.min(100,Math.max(0,n/s*100))}function wa(e,t){return e>=t?"¡Objetivo completado!":e>=t*.75?"¡Casi lo tienes!":e>=t*.5?"¡Ya vas por la mitad!":"¡Vamos a por ello!"}function ba(e){const t=Ce();e.innerHTML=`
    <form id="add-word-form" class="form-grid">
      <div class="form-header">
        <h2 class="form-title-add"><i class="fa-solid fa-sparkles"></i> Añadir nueva palabra</h2>
        <p class="form-subtitle">Crea conexiones emocionales para recordar mejor</p>
        
        <div class="form-mode-toggle">
          <button type="button" class="mode-btn active" data-mode="quick">
            <i class="fa-solid fa-bolt"></i> Rápido
          </button>
          <button type="button" class="mode-btn" data-mode="full">
            <i class="fa-solid fa-sliders"></i> Completo
          </button>
        </div>
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
                ${t.map(x=>`<option value="${x}">`).join("")}
              </datalist>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Optional fields (collapsible) -->
      <div class="optional-fields collapsed" id="optional-fields">
        <div class="optional-header">
          <span><i class="fa-solid fa-plus-circle"></i> Detalles opcionales</span>
          <i class="fa-solid fa-chevron-down toggle-icon"></i>
        </div>
        <div class="optional-content">
      
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
      
        </div><!-- /optional-content -->
      </div><!-- /optional-fields -->
      
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
  `;const a=document.getElementById("add-word-form"),o=document.getElementById("image-preview"),s=document.getElementById("preview-img"),n=document.getElementById("remove-preview"),i=document.getElementById("clear-form"),p=document.getElementById("image-data"),l=document.querySelectorAll(".image-tab"),c=document.querySelectorAll(".image-tab-content"),r=document.getElementById("upload-area"),b=document.getElementById("image-file"),v=document.getElementById("image-url"),S=document.getElementById("preview-url-btn"),m=document.querySelectorAll(".mode-btn"),T=document.getElementById("optional-fields"),P=T?.querySelector(".optional-header");m.forEach(x=>{x.addEventListener("click",()=>{const E=x.dataset.mode;m.forEach(I=>I.classList.remove("active")),x.classList.add("active"),E==="full"?T?.classList.remove("collapsed"):T?.classList.add("collapsed")})}),P&&P.addEventListener("click",()=>{T.classList.toggle("collapsed"),T.classList.contains("collapsed")||m.forEach(x=>{x.classList.toggle("active",x.dataset.mode==="full")})}),l.forEach(x=>{x.addEventListener("click",()=>{const E=x.dataset.tab;l.forEach(I=>I.classList.remove("active")),x.classList.add("active"),c.forEach(I=>{I.classList.remove("active"),I.id===`${E}-content`&&I.classList.add("active")})})}),r.addEventListener("click",()=>{b.click()}),r.addEventListener("dragover",x=>{x.preventDefault(),r.classList.add("dragover")}),r.addEventListener("dragleave",()=>{r.classList.remove("dragover")}),r.addEventListener("drop",x=>{x.preventDefault(),r.classList.remove("dragover");const E=x.dataTransfer.files;E.length>0&&B(E[0])}),b.addEventListener("change",x=>{x.target.files.length>0&&B(x.target.files[0])});function B(x){if(!x.type.startsWith("image/")){A("Archivo inválido","Por favor selecciona un archivo de imagen.","error");return}const E=2*1024*1024;if(x.size>E){A("Imagen muy grande","La imagen debe ser menor a 2MB.","error");return}const I=new FileReader;I.onload=V=>{const R=V.target.result;s.src=R,o.style.display="block",p.value=R,r.classList.add("has-file"),A("Imagen cargada","La imagen se ha cargado correctamente.","success")},I.onerror=()=>{A("Error","No se pudo leer la imagen.","error")},I.readAsDataURL(x)}S.addEventListener("click",()=>{const x=v.value.trim();x&&(s.src=x,o.style.display="block",p.value=x,s.onerror=()=>{o.style.display="none",p.value="",A("Error de imagen","No se pudo cargar la imagen. Verifica la URL.","warning")})}),v.addEventListener("keypress",x=>{x.key==="Enter"&&(x.preventDefault(),S.click())}),n.addEventListener("click",()=>{v.value="",b.value="",p.value="",o.style.display="none",s.src="",r.classList.remove("has-file")}),i.addEventListener("click",()=>{a.reset(),o.style.display="none",s.src="",p.value="",r.classList.remove("has-file")}),a.addEventListener("submit",x=>{x.preventDefault();const E=document.getElementById("word").value.trim(),I=document.getElementById("meaning").value.trim(),V=document.getElementById("type").value,R=document.getElementById("category").value.trim(),W=document.getElementById("emotion").value.trim(),X=document.getElementById("example").value.trim(),f=p.value.trim();if(!E||!I){A("Faltan datos","Por favor completa al menos la palabra y su significado.","error");return}if(Te(E)){A("Palabra duplicada",`La palabra "${E}" ya existe en tu vocabulario.`,"error");return}const d={id:Date.now(),word:E,meaning:I,type:V,category:R||null,emotion:W,example:X,image:f,remembered:!1};Ge(d),a.reset(),o.style.display="none",s.src="",p.value="",r.classList.remove("has-file"),A("¡Guardado!",`"${E}" se ha añadido correctamente.`,"success"),document.getElementById("word").focus()})}const xa="modulepreload",ka=function(e){return"/emowords/"+e},Le={},Ea=function(t,a,o){let s=Promise.resolve();if(a&&a.length>0){let c=function(r){return Promise.all(r.map(b=>Promise.resolve(b).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};var i=c;document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),l=p?.nonce||p?.getAttribute("nonce");s=c(a.map(r=>{if(r=ka(r),r in Le)return;Le[r]=!0;const b=r.endsWith(".css"),v=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${v}`))return;const S=document.createElement("link");if(S.rel=b?"stylesheet":xa,b||(S.as="script"),S.crossOrigin="",S.href=r,l&&S.setAttribute("nonce",l),document.head.appendChild(S),b)return new Promise((m,T)=>{S.addEventListener("load",m),S.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${r}`)))})}))}function n(p){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=p,window.dispatchEvent(l),!l.defaultPrevented)throw p}return s.then(p=>{for(const l of p||[])l.status==="rejected"&&n(l.reason);return t().catch(n)})};function Sa(e){let t=null,a=null,o=!1,s=[],n={correct:0,incorrect:0,xp:0},i=new Map;const p=2;s=Je(),W(s);function l(){e.innerHTML="",t||c()}function c(){const f=s.length;e.innerHTML=`
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
    `,e.querySelectorAll(".mode-card").forEach(u=>{u.addEventListener("click",()=>{if(t=u.dataset.mode,console.log(`Starting mode: ${t} with queue size: ${s.length}`),s.length===0){A("Sin palabras","No hay palabras pendientes para repasar ahora.","info"),I(e);return}l(),r(),m()})});const d=e.querySelector("#explore-packs-review-btn");d&&d.addEventListener("click",()=>{document.querySelector("[data-view=home]").click(),setTimeout(()=>{const u=document.getElementById("explore-packs-btn");u&&u.click()},100)})}function r(){if(e.querySelector(".review-header"))return;const f=document.createElement("div");f.className="review-header",f.innerHTML=`
       <button class="back-btn" id="exit-mode" title="Salir"><i class="fa-solid fa-arrow-left"></i></button>
       <div class="review-progress">
         <div class="progress-stat" id="stat-queue">
           <i class="fa-solid fa-book progress-icon"></i>
           <span class="val">${s.length}</span>
         </div>
         <div class="progress-stat session-correct" id="stat-correct">
           <i class="fa-solid fa-check progress-icon"></i>
           <span class="val">${n.correct}</span>
         </div>
         <div class="progress-stat" style="color: var(--warning-600); background: var(--warning-50);" id="stat-xp">
           <i class="fa-solid fa-bolt progress-icon"></i>
           <span class="val">${n.xp} XP</span>
         </div>
       </div>
     `,e.insertBefore(f,e.firstChild),document.getElementById("exit-mode").addEventListener("click",k=>{k.preventDefault(),n.correct>0||n.incorrect>0?confirm("¿Salir del modo repaso? Tu progreso se perderá.")&&v():v()});const u=document.createElement("div");u.id="active-content",u.className="review-container",e.appendChild(u)}function b(){const f=document.querySelector("#stat-queue .val"),d=document.querySelector("#stat-correct .val"),u=document.querySelector("#stat-xp .val");f&&(f.textContent=s.length),d&&(d.textContent=n.correct),u&&(u.textContent=`${n.xp} XP`)}function v(){t=null,l()}function S(){return s.shift()||null}function m(){if(!t){l();return}const f=document.getElementById("active-content");if(!f){l();return}if(a=S(),!a){I(f);return}let d=t;if(t==="mixed"){const u=["flashcard","quiz","typing","listening"];d=u[Math.floor(Math.random()*u.length)]}switch(d){case"flashcard":T(f);break;case"quiz":P(f);break;case"typing":B(f);break;case"listening":x(f);break}}function T(f){o=!1,a.reviewCount,f.innerHTML=`
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
    `,document.getElementById("review-speak-btn").addEventListener("click",y=>{y.stopPropagation(),z(a.word)});const d=document.getElementById("show-answer"),u=document.getElementById("review-answer"),k=document.getElementById("remembered-btn"),g=document.getElementById("forgotten-btn");d.addEventListener("click",()=>{o=!0,u.style.display="block",d.style.display="none",k.disabled=!1,g.disabled=!1,u.classList.add("fade-in")}),k.addEventListener("click",()=>E(!0)),g.addEventListener("click",()=>E(!1)),R(y=>{y==="Space"&&!o&&d.click(),y==="ArrowRight"&&o&&E(!0),y==="ArrowLeft"&&o&&E(!1)})}function P(f){const u=M().filter(h=>h.id!==a.id).sort(()=>.5-Math.random()).slice(0,3),k=[a,...u];W(k),f.innerHTML=`
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
    `,document.getElementById("quiz-speak-btn").addEventListener("click",()=>z(a.word));const g=f.querySelectorAll(".quiz-option");let y=!1;g.forEach(h=>{h.addEventListener("click",()=>{if(y)return;y=!0,String(h.dataset.id)===String(a.id)?(h.classList.add("correct"),setTimeout(()=>E(!0),800)):(h.classList.add("wrong"),g.forEach(C=>{String(C.dataset.id)===String(a.id)&&C.classList.add("correct")}),setTimeout(()=>E(!1),1500))})})}function B(f){f.innerHTML=`
      <div class="typing-container">
         <div class="review-card-inner" style="margin-bottom: 2rem;">
             <p style="font-size: 1.5rem; margin-bottom: 0.5rem; font-weight:700; color:var(--primary-600);">${a.meaning}</p>
             ${a.example?`<p style="font-style:italic; color:var(--gray-500)">"${a.example.replace(new RegExp(a.word,"gi"),"___")}"</p>`:""}
         </div>
         
         <input type="text" class="typing-input" id="type-input" placeholder="Escribe la palabra en inglés..." autocomplete="off">
         
         <button id="check-btn" class="add-word-btn" style="width: 100%;">Comprobar</button>
         <button id="give-up-btn" style="background:none; border:none; color:var(--gray-500); margin-top:1rem; cursor:pointer;">No lo sé</button>
      </div>
    `,setTimeout(()=>document.getElementById("type-input").focus(),100);const d=document.getElementById("type-input"),u=document.getElementById("check-btn"),k=document.getElementById("give-up-btn");function g(){d.value.trim().toLowerCase()===a.word.toLowerCase()?(d.classList.add("correct"),u.innerHTML='<i class="fa-solid fa-check"></i> Correcto',z(a.word),setTimeout(()=>E(!0),1e3)):(d.classList.add("wrong"),z("Incorrect","en-US"),setTimeout(()=>d.classList.remove("wrong"),500))}u.addEventListener("click",g),d.addEventListener("keydown",y=>{y.key==="Enter"&&g()}),k.addEventListener("click",()=>{d.value=a.word,d.classList.add("wrong"),z(a.word),setTimeout(()=>E(!1),2e3)})}function x(f){const u=M().filter(L=>L.id!==a.id).sort(()=>.5-Math.random()).slice(0,3),k=[a,...u];W(k),f.innerHTML=`
      <div class="quiz-container">
         <div class="quiz-question">
            <div style="font-size: 4rem; color: var(--primary-500); cursor: pointer; margin-bottom: 1rem;" id="listen-icon">
                <i class="fa-solid fa-circle-play"></i>
            </div>
            <p style="color: var(--gray-500);">Escucha y selecciona el significado</p>
         </div>

         <div class="quiz-options">
            ${k.map(L=>`
                <button class="quiz-option" data-id="${L.id}">
                    ${L.meaning}
                </button>
            `).join("")}
         </div>
      </div>
    `;const g=document.getElementById("listen-icon"),y=()=>{g.style.transform="scale(0.9)",setTimeout(()=>g.style.transform="scale(1)",150),z(a.word)};g.addEventListener("click",y),setTimeout(y,500);const h=f.querySelectorAll(".quiz-option");let w=!1;h.forEach(L=>{L.addEventListener("click",()=>{if(w)return;w=!0,String(L.dataset.id)===String(a.id)?(L.classList.add("correct"),setTimeout(()=>E(!0),800)):(L.classList.add("wrong"),h.forEach(G=>{String(G.dataset.id)===String(a.id)&&G.classList.add("correct")}),setTimeout(()=>E(!1),1500))})})}function E(f){try{if(!a)return;if(Ze(a.id,f),f){n.correct++,n.xp+=10;try{be(1)}catch(d){console.error(d)}i.delete(a.id)}else{n.incorrect++;const d=i.get(a.id)||0;d<p&&(i.set(a.id,d+1),s.push(a))}a=null,b(),m()}catch(d){console.error("Error in handleResult:",d)}}function I(f){try{const d=n.incorrect===0&&n.correct>=5,u=be(0,{perfectSession:d}),k=document.querySelector(".review-header");k&&(k.style.display="none");let g;try{g=re()}catch{g={streak:0,dailyGoal:{count:0,target:20}}}const y=de(),h=ta(y),w=oa(h);da(),f.innerHTML=`
          <div class="empty-review-state">
            <div class="empty-icon" style="color: var(--success-500); animation: bounce 1s infinite;"><i class="fa-solid fa-trophy"></i></div>
            <h3>¡Sesión completada!</h3>
            <p>Has ganado <strong style="color:var(--warning-500)">${n.xp} XP</strong></p>
            
            ${d?`
              <div class="perfect-session-badge" style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; padding: 0.5rem 1rem; border-radius: 999px; font-weight: 600; margin: 0.5rem 0;">
                <i class="fa-solid fa-star"></i> ¡Sesión Perfecta!
              </div>
            `:""}
            
            <div class="session-summary">
                <div class="summary-stats">
                  <span class="stat correct"><i class="fa-solid fa-circle-check"></i> ${n.correct}</span>
                  <span class="stat incorrect"><i class="fa-solid fa-circle-xmark"></i> ${n.incorrect}</span>
                </div>
            </div>
            
            <div class="streak-mini" style="margin: 1.5rem 0; padding: 1rem; background: #fffbeb; border-radius: 8px; border: 1px solid #fcd34d;">
                <p style="color: #b45309; font-weight: bold;"><i class="fa-solid fa-fire"></i> Racha: ${g.streak} días</p>
                <p style="font-size: 0.9rem; color: #92400e;">Meta diaria: ${g.dailyGoal.count} / ${g.dailyGoal.target}</p>
            </div>
    
            <button class="add-word-btn" id="finish-btn">Volver al inicio</button>
          </div>
        `,u.leveledUp&&setTimeout(()=>{la(u.newLevel)},500),w.length>0&&setTimeout(()=>{qe(w)},u.leveledUp?5500:1e3),window.confetti||window.canvasConfetti?(window.confetti||window.canvasConfetti)({particleCount:100,spread:70,origin:{y:.6}}):Ea(()=>import("./confetti.module-C2jkTI5u.js"),[]).then(C=>{const q=C.default;q({particleCount:100,spread:70,origin:{y:.6}})}).catch(C=>console.log("Confetti not found",C));const L=document.getElementById("finish-btn");L&&L.addEventListener("click",()=>{t=null;const C=document.querySelector('[data-view="home"]');C?C.click():l()})}catch(d){console.error("Error in renderSummary:",d),f.innerHTML='<p class="error">Error al mostrar resumen. <button onclick="location.reload()">Recargar</button></p>'}}let V=null;function R(f){V&&V();const d=u=>{document.getElementById("active-content")&&document.activeElement.tagName!=="INPUT"&&f(u.code)};document.addEventListener("keydown",d),V=()=>document.removeEventListener("keydown",d),window._reviewCleanup=V}function W(f){for(let d=f.length-1;d>0;d--){const u=Math.floor(Math.random()*(d+1));[f[d],f[u]]=[f[u],f[d]]}return f}function X(f){return{word:"Palabra",phrasal:"Phrasal Verb",expression:"Expresión",connector:"Conector"}[f]||"Otro"}l()}function La(e){const t=M(),a=de();if(e.innerHTML="",e.className="stats-view animate__animated animate__fadeIn",a.total===0){Ia(e);return}let o=0,s={master:0,guru:0,apprentice:0,new:0};t.forEach(r=>{const b=r.correctCount||0;b>=10?(o+=100,s.master++):b>=5?(o+=75,s.guru++):b>=2?(o+=40,s.apprentice++):(o+=10,s.new++)});const n=a.total>0?Math.round(o/a.total):0,i=Aa(t),p=Ca(t),l=$a(t),c=`
    <header class="dashboard-header" style="text-align: center;">
        <div class="header-content" style="display: flex; flex-direction: column; align-items: center;">
            <h2 class="title">Centro de Estadísticas</h2>
            <p class="subtitle">Visualiza tu evolución y optimiza tu aprendizaje</p>
        </div>
        <div class="global-grade">
            <span class="grade-label">Nivel General</span>
            <span class="grade-value ${Pa(n)}">${Ta(n)}</span>
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
                ${Va(i)}
            </div>
        </div>

        <!-- Mastery Gauge -->
        <div class="kpi-card mastery">
            <div class="kpi-top">
                <div class="kpi-icon"><i class="fa-solid fa-brain"></i></div>
                <div class="kpi-content">
                    <span class="value">${n}%</span>
                    <span class="label">Dominio del Vocabulario</span>
                </div>
            </div>
            <div class="circular-progress" style="--percent: ${n}">
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
                    ${Ma(i)}
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
                        ${Ba(p)}
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
                            <div class="lvl-bar"><div class="fill" style="width: ${J(s.master,a.total)}%"></div></div>
                            <span class="lvl-count">${s.master}</span>
                        </div>
                        <div class="level-item guru">
                            <span class="lvl-name">Experto (5-9)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${J(s.guru,a.total)}%"></div></div>
                            <span class="lvl-count">${s.guru}</span>
                        </div>
                        <div class="level-item apprentice">
                            <span class="lvl-name">Aprendiz (2-4)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${J(s.apprentice,a.total)}%"></div></div>
                            <span class="lvl-count">${s.apprentice}</span>
                        </div>
                        <div class="level-item new">
                            <span class="lvl-name">Nuevo (0-1)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${J(s.new,a.total)}%"></div></div>
                            <span class="lvl-count">${s.new}</span>
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
                    <span class="achievements-counter">${ne().unlocked}/${ne().total}</span>
                </div>
                <div class="achievements-progress-bar">
                    <div class="fill" style="width: ${ne().percent}%"></div>
                </div>
                <div class="achievements-mini-grid">
                    ${sa().slice(0,8).map(r=>`
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
            ${qa(t)}
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
            ${Da(t,i)}
        </div>
    </div>
  `;e.innerHTML=c}function Ia(e){e.innerHTML=`
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
    `;const t=e.querySelector("#explore-packs-stats-btn");t&&t.addEventListener("click",()=>{document.querySelector("[data-view=home]").click(),setTimeout(()=>{const a=document.getElementById("explore-packs-btn");a&&a.click()},100)})}function Aa(e){const t=[...e].sort((n,i)=>(n.createdAt||0)-(i.createdAt||0)),a=new Map;let o=0;t.forEach(n=>{o++;const i=new Date(n.createdAt||Date.now()).toISOString().split("T")[0];a.set(i,o)});const s=Array.from(a.entries()).map(([n,i])=>({date:n,count:i}));if(s.length>0&&s.length<2){const n=new Date(s[0].date);n.setDate(n.getDate()-1),s.unshift({date:n.toISOString().split("T")[0],count:0})}return s}function Ca(e){const t=["word","phrasal","expression","connector"],a={};return t.forEach(o=>{const s=e.filter(r=>r.type===o),n=s.length;if(n===0)return;let i=0,p=0;s.forEach(r=>{i+=r.correctCount||0,p+=r.incorrectCount||0});const l=i+p,c=l===0?0:Math.round(i/l*100);a[o]={count:n,accuracy:c}}),a}function $a(e){return[...e].filter(t=>(t.incorrectCount||0)>0).sort((t,a)=>{const o=t.incorrectCount/(t.reviewCount||1);return a.incorrectCount/(a.reviewCount||1)-o}).slice(0,5)}function J(e,t){return t?Math.round(e/t*100):0}function Ta(e){return e>=90?"S":e>=80?"A":e>=60?"B":e>=40?"C":"D"}function Pa(e){return e>=90?"text-legendary":e>=80?"text-success":e>=60?"text-primary":e>=40?"text-warning":"text-danger"}function Ma(e){if(!e||e.length===0)return"";const t=800,a=300,o=20,s=e[e.length-1].count;if(s===0)return"";const n=e.map((c,r)=>{const b=r/(e.length-1)*(t-2*o)+o,v=a-(c.count/s*(a-2*o)+o);return`${b},${v}`}).join(" "),i=o,p=t-o,l=`${i},${a} ${n} ${p},${a}`;return`
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
            <polyline points="${n}" fill="none" stroke="var(--primary-400)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `}function Va(e){if(!e||e.length<2)return"";const t=100,a=40,o=e[e.length-1].count,s=e.map((n,i)=>{const p=i/(e.length-1)*t,l=a-n.count/o*a;return`${p},${l}`}).join(" ");return`
        <svg viewBox="0 0 ${t} ${a}" class="sparkline" preserveAspectRatio="none">
             <polyline points="${s}" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
    `}function Ba(e){const t={word:"Palabras",phrasal:"Phrasal Verbs",expression:"Expresiones",connector:"Conectores"};return Object.entries(e).map(([a,o])=>`
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
    `).join("")}function qa(e){const t=new Date,a=13,o=a*7,s=new Map;e.forEach(c=>{if(c.lastReviewedAt){const r=new Date(c.lastReviewedAt).toISOString().split("T")[0];s.set(r,(s.get(r)||0)+1)}if(c.createdAt){const r=new Date(c.createdAt).toISOString().split("T")[0];s.set(r,(s.get(r)||0)+1)}});const n=Math.max(...Array.from(s.values()),1);let i='<div class="heatmap-grid">';const p=new Date(t);p.setDate(p.getDate()-o+1);const l=p.getDay();p.setDate(p.getDate()-(l===0?6:l-1));for(let c=0;c<a;c++){i+='<div class="heatmap-week">';for(let r=0;r<7;r++){const b=new Date(p);b.setDate(p.getDate()+c*7+r);const v=b.toISOString().split("T")[0],S=s.get(v)||0,m=S===0?0:Math.min(4,Math.ceil(S/n*4)),T=b>t;i+=`<div class="heatmap-day level-${T?"future":m}" title="${v}: ${S} actividades"></div>`}i+="</div>"}return i+="</div>",i}function Da(e,t){const a=e.length;if(a<2||t.length<2)return`
            <div class="prediction-placeholder">
                <i class="fa-solid fa-chart-line"></i>
                <p>Añade más palabras para ver tu proyección de progreso</p>
            </div>
        `;const o=t[0]?.date?new Date(t[0].date):new Date,s=t[t.length-1]?.date?new Date(t[t.length-1].date):new Date,n=Math.max(1,Math.ceil((s-o)/(1440*60*1e3))),i=a/n,p=Math.round(a+i*30),l=Math.round(a+i*90),c=a<500?Math.ceil((500-a)/i):0,r=a<1e3?Math.ceil((1e3-a)/i):0;return`
        <div class="prediction-stats">
            <div class="pred-stat">
                <span class="pred-value">${i.toFixed(1)}</span>
                <span class="pred-label">palabras/día</span>
            </div>
            <div class="pred-stat highlight">
                <span class="pred-value">${p}</span>
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
                <span>Alcanzarás <strong>500 palabras</strong> en ~${c} días</span>
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
    `}const De="emowords_onboarding_completed",Ra="emowords_user_level",Z=[{id:"welcome",target:null,title:"¡Bienvenido a EmoWords! 👋",content:"Aprende vocabulario conectando cada palabra con tus recuerdos personales. Te guiaremos en 30 segundos.",position:"center",icon:"fa-solid fa-rocket"},{id:"level-select",target:null,title:"¿Cuál es tu nivel de inglés?",content:"Esto nos ayudará a sugerirte los packs más adecuados para ti.",position:"center",icon:"fa-solid fa-graduation-cap",type:"level-selection"},{id:"nav-add",target:'[data-view="add"]',title:"1. Añadir Vocabulario",content:"Aquí añades palabras, phrasal verbs o expresiones con su significado.",position:"bottom",icon:"fa-solid fa-plus"},{id:"nav-review",target:'[data-view="review"]',title:"2. Repasar",content:"5 modos de práctica: Flashcards, Quiz, Escritura, Listening y Mixto.",position:"bottom",icon:"fa-solid fa-graduation-cap"},{id:"nav-stats",target:'[data-view="stats"]',title:"3. Tu Progreso",content:"Visualiza tu evolución, logros y palabras que necesitan más atención.",position:"bottom",icon:"fa-solid fa-chart-line"},{id:"secret",target:null,title:"🧠 El Secreto de EmoWords",content:"Al añadir palabras, conecta cada una con un recuerdo personal o emoción. ¡Tu memoria será 10 veces más fuerte!",position:"center",icon:"fa-solid fa-heart"},{id:"ready",target:null,title:"¡Listo para aprender! 🚀",content:"Empieza añadiendo tu primera palabra o explora los packs predefinidos. ¡Las emociones graban, la repetición se olvida!",position:"center",icon:"fa-solid fa-check-circle"}],Na=[{code:"A1-A2",label:"Básico",description:"Principiante"},{code:"B1",label:"Intermedio bajo",description:"Pre-intermedio"},{code:"B2",label:"Intermedio alto",description:"Intermedio"},{code:"C1-C2",label:"Avanzado",description:"Avanzado/Nativo"}];let ie=null,H=0,$=null,N=null,_=null;function Re(){return!localStorage.getItem(De)}function Wa(){localStorage.setItem(De,"true")}function za(){Re()&&(H=0,Ha(),ue(H))}function Ha(){document.querySelector(".onboarding-overlay")?.remove(),N=document.createElement("div"),N.className="onboarding-overlay",N.innerHTML=`
    <div class="onboarding-backdrop"></div>
    <div class="onboarding-spotlight"></div>
  `,document.body.appendChild(N),_=N.querySelector(".onboarding-spotlight")}function ue(e){const t=Z[e];if(!t){We();return}$&&$.remove(),t.position==="center"||!t.target?_.style.display="none":_.style.display="block",$=document.createElement("div"),$.className="onboarding-tooltip";const a=e===Z.length-1,o=e===0,s=t.type==="level-selection",n=(e+1)/Z.length*100,i=s?`
    <div class="level-grid">
      ${Na.map(r=>`
        <button class="level-btn" data-level="${r.code}">
          <span class="level-code">${r.code}</span>
          <span class="level-label">${r.label}</span>
        </button>
      `).join("")}
    </div>
  `:"";if($.innerHTML=`
    <div class="tooltip-progress-bar">
      <div class="tooltip-progress-fill" style="width: ${n}%"></div>
    </div>
    <div class="tooltip-header-row">
      <span class="tooltip-step">${e+1} de ${Z.length}</span>
      <button class="tooltip-skip" title="Saltar tutorial">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="tooltip-body">
      ${t.icon?`<div class="tooltip-icon"><i class="${t.icon}"></i></div>`:""}
      <h4 class="tooltip-title">${t.title}</h4>
      <p class="tooltip-content">${t.content}</p>
      ${i}
    </div>
    <div class="tooltip-actions">
      ${o?"<div></div>":'<button class="tooltip-prev"><i class="fa-solid fa-arrow-left"></i></button>'}
      <button class="tooltip-next ${a?"finish":""}" ${s&&!ie?"disabled":""}>
        ${a?"¡Empezar!":"Siguiente"} 
        ${a?'<i class="fa-solid fa-rocket"></i>':'<i class="fa-solid fa-arrow-right"></i>'}
      </button>
    </div>
  `,N.appendChild($),t.position==="center"||!t.target)$.classList.add("centered"),Ne();else{$.classList.remove("centered");const r=document.querySelector(t.target);r?_a(r,t.position):($.classList.add("centered"),_.style.display="none")}const p=$.querySelector(".tooltip-skip"),l=$.querySelector(".tooltip-next"),c=$.querySelector(".tooltip-prev");if(p.addEventListener("click",Oa),l.addEventListener("click",Ga),c&&c.addEventListener("click",ja),s){const r=$.querySelectorAll(".level-btn");r.forEach(b=>{b.addEventListener("click",()=>{r.forEach(v=>v.classList.remove("active")),b.classList.add("active"),ie=b.dataset.level,localStorage.setItem(Ra,ie),l.removeAttribute("disabled")})})}requestAnimationFrame(()=>{$.classList.add("visible")})}function _a(e,t){const a=e.getBoundingClientRect(),o=8,s=16;_.style.top=`${a.top-o}px`,_.style.left=`${a.left-o}px`,_.style.width=`${a.width+o*2}px`,_.style.height=`${a.height+o*2}px`;const n=$.getBoundingClientRect();let i,p;switch(t){case"bottom":i=a.bottom+s,p=a.left+a.width/2-n.width/2;break;case"top":i=a.top-s-n.height,p=a.left+a.width/2-n.width/2;break;case"left":i=a.top+a.height/2-n.height/2,p=a.left-s-n.width;break;case"right":i=a.top+a.height/2-n.height/2,p=a.right+s;break;default:i=a.bottom+s,p=a.left+a.width/2-n.width/2}const l=window.innerWidth,c=window.innerHeight;p<16&&(p=16),p+n.width>l-16&&(p=l-n.width-16),i<16&&(i=16),i+n.height>c-16&&(i=c-n.height-16),$.style.position="fixed",$.style.top=`${i}px`,$.style.left=`${p}px`}function Ne(){document.querySelectorAll(".onboarding-highlight").forEach(e=>{e.classList.remove("onboarding-highlight")})}function Ga(){H++,ue(H)}function ja(){H--,H<0&&(H=0),ue(H)}function Oa(){We()}function We(){Wa(),$&&($.classList.remove("visible"),setTimeout(()=>$?.remove(),200)),N&&(N.classList.add("fade-out"),setTimeout(()=>N?.remove(),300)),Ne()}const D=document.getElementById("app");window.addEventListener("offline",()=>{A("Sin conexión","Estás trabajando en modo offline.","warning",5e3),document.body.classList.add("offline-mode")});window.addEventListener("online",()=>{A("Conexión restaurada","Tus cambios se guardarán correctamente.","success",3e3),document.body.classList.remove("offline-mode")});window.addEventListener("error",e=>{console.error("Global error:",e.error),A("Error inesperado","Ha ocurrido un error. Intenta recargar la página.","error",0)});window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason)});const ze=document.querySelectorAll(".nav-link"),ee=document.getElementById("theme-toggle"),Ie=document.getElementById("audio-settings-btn");function Fa(){const t=K().theme||"dark";ge(t)}function ge(e){document.documentElement.setAttribute("data-theme",e);const t=ee.querySelector("i");e==="dark"?(t.className="fa-solid fa-sun",ee.title="Cambiar a modo claro"):(t.className="fa-solid fa-moon",ee.title="Cambiar a modo oscuro");const a=K();a.theme=e,Pe(a)}function Ua(){const t=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.body.classList.add("theme-transitioning"),ge(t),setTimeout(()=>{document.body.classList.remove("theme-transitioning")},300)}ee.addEventListener("click",Ua);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{K().theme||ge(e.matches?"dark":"light")});function He(){const e=document.getElementById("review-badge");if(!e)return;const t=Ye();t>0?(e.textContent=t>99?"99+":t,e.style.display="flex"):e.style.display="none"}function Xa(e){ze.forEach(t=>{t.dataset.view===e?t.classList.add("active"):t.classList.remove("active")})}function ve(e){window._reviewCleanup&&(window._reviewCleanup(),window._reviewCleanup=null),Xa(e),D.style.opacity="0",D.style.transform="translateY(10px)",setTimeout(()=>{switch(e){case"home":le(D);break;case"add":ba(D);break;case"review":Sa(D);break;case"stats":La(D);break;default:D.innerHTML="<p>Vista no encontrada</p>"}window.scrollTo({top:0,left:0,behavior:"instant"}),requestAnimationFrame(()=>{D.style.opacity="1",D.style.transform="translateY(0)"}),He()},150)}D.style.transition="opacity 0.15s ease, transform 0.15s ease";ze.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.view;ve(a)})});const Q=document.querySelector(".logo");Q&&Q.dataset.view&&Q.addEventListener("click",e=>{e.preventDefault(),ve(Q.dataset.view)});Fa();Ya();He();ve("home");setTimeout(()=>{Re()&&za()},500);function Ya(){Ie&&Ie.addEventListener("click",Ka)}function Ka(){document.querySelector(".audio-settings-modal")?.remove();const e=me(),t=document.createElement("div");t.className="audio-settings-modal edit-modal",t.innerHTML=`
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
  `,document.body.appendChild(t),requestAnimationFrame(()=>{t.classList.add("active")});const a=()=>{t.classList.remove("active"),setTimeout(()=>t.remove(),300)};t.querySelector(".modal-overlay").addEventListener("click",a),t.querySelector(".modal-close").addEventListener("click",a),t.querySelector(".btn-cancel").addEventListener("click",a),t.querySelectorAll(".accent-option").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".accent-option").forEach(s=>s.classList.remove("active")),o.classList.add("active"),ke({accent:o.dataset.accent}),A("Acento actualizado",ma(o.dataset.accent),"success")})}),t.querySelectorAll(".speed-option").forEach(o=>{o.addEventListener("click",()=>{t.querySelectorAll(".speed-option").forEach(n=>n.classList.remove("active")),o.classList.add("active");const s=parseFloat(o.dataset.speed);ke({speed:s}),A("Velocidad actualizada",ua(s),"success")})}),t.querySelector("#preview-audio").addEventListener("click",()=>{z("Hello, how are you today?")}),document.addEventListener("keydown",function o(s){s.key==="Escape"&&(a(),document.removeEventListener("keydown",o))})}"serviceWorker"in navigator&&window.addEventListener("load",()=>{const t="/emowords/"+"sw.js";navigator.serviceWorker.register(t).then(a=>{console.log("SW registered: ",a)}).catch(a=>{console.log("SW registration failed: ",a)})});
