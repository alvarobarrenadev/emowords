(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const G="emowords_vocab",ie="emowords_settings";function S(){const e=localStorage.getItem(G);return e?JSON.parse(e):[]}function ye(e){const t=S(),a={...e,createdAt:Date.now(),lastReviewedAt:null,reviewCount:0,correctCount:0,incorrectCount:0,nextReviewAt:Date.now(),difficulty:0};t.push(a),localStorage.setItem(G,JSON.stringify(t))}function U(e){const t=S().map(a=>a.id===e.id?e:a);localStorage.setItem(G,JSON.stringify(t))}function ve(e){const t=S().filter(a=>a.id!==e);localStorage.setItem(G,JSON.stringify(t))}function fe(e){return S().find(t=>t.id===e)}function he(e){const t=S(),a=e.toLowerCase().trim();return a?t.filter(o=>o.word.toLowerCase().includes(a)||o.meaning.toLowerCase().includes(a)||o.example&&o.example.toLowerCase().includes(a)||o.emotion&&o.emotion.toLowerCase().includes(a)||o.category&&o.category.toLowerCase().includes(a)):t}function le(){const e=S(),t=new Set;return e.forEach(a=>{a.category&&t.add(a.category)}),Array.from(t).sort()}function we(e,t="date-desc"){const a=[...e];switch(t){case"date-asc":return a.sort((o,r)=>(o.createdAt||o.id)-(r.createdAt||r.id));case"date-desc":return a.sort((o,r)=>(r.createdAt||r.id)-(o.createdAt||o.id));case"alpha-asc":return a.sort((o,r)=>o.word.localeCompare(r.word));case"alpha-desc":return a.sort((o,r)=>r.word.localeCompare(o.word));case"review-count":return a.sort((o,r)=>(r.reviewCount||0)-(o.reviewCount||0));case"difficulty":return a.sort((o,r)=>(r.difficulty||0)-(o.difficulty||0));default:return a}}function ce(){const e=S(),t=e.length,a=e.filter(g=>g.remembered).length,o=t-a,r=e.reduce((g,b)=>g+(b.reviewCount||0),0),s=t>0?(r/t).toFixed(1):0,n={word:e.filter(g=>g.type==="word").length,phrasal:e.filter(g=>g.type==="phrasal").length,expression:e.filter(g=>g.type==="expression").length,connector:e.filter(g=>g.type==="connector").length},u=e.reduce((g,b)=>g+(b.correctCount||0),0),p=e.reduce((g,b)=>g+(b.incorrectCount||0),0),w=u+p>0?(u/(u+p)*100).toFixed(1):0,m=Date.now(),h=e.filter(g=>!g.nextReviewAt||g.nextReviewAt<=m).length;return{total:t,remembered:a,forgotten:o,totalReviews:r,averageReviews:s,byType:n,retentionRate:w,dueForReview:h}}const ae=[1,3,7,14,30,60,120,240];function de(e){const t=e.correctCount||0;return t>=10?"master":t>=5?"guru":t>=2?"apprentice":"new"}function be(e){const t=de(e);return{level:t,...{new:{label:"Nuevo",class:"mastery-new",icon:"fa-seedling",percent:10},apprentice:{label:"Aprendiz",class:"mastery-apprentice",icon:"fa-leaf",percent:40},guru:{label:"Experto",class:"mastery-guru",icon:"fa-tree",percent:75},master:{label:"Maestro",class:"mastery-master",icon:"fa-crown",percent:100}}[t]}}function xe(e){if(!e.nextReviewAt)return!0;const t=new Date().setHours(23,59,59,999);return e.nextReviewAt<=t}function Ee(){const e=S(),t=Date.now();return e.filter(a=>!a.nextReviewAt||a.nextReviewAt<=t).length}function te(e,t){const a=Date.now(),o=1440*60*1e3;if(!t)return a+600*1e3;const r=e.correctCount||0,s=Math.min(r,ae.length-1),n=ae[s],p=1-(e.difficulty||0)*.1,w=Math.max(1,Math.round(n*p));return a+w*o}function ke(e){if(!e.nextReviewAt)return"Ahora";const t=Date.now(),a=e.nextReviewAt-t;if(a<=0)return"Ahora";const o=Math.floor(a/(60*1e3)),r=Math.floor(a/(3600*1e3)),s=Math.floor(a/(1440*60*1e3));return o<60?`${o}min`:r<24?`${r}h`:s===1?"Mañana":s<7?`${s} días`:s<30?`${Math.floor(s/7)} sem`:`${Math.floor(s/30)} mes${Math.floor(s/30)>1?"es":""}`}function Ie(){const e=S(),t=Date.now();return e.filter(o=>!o.nextReviewAt||o.nextReviewAt<=t).sort((o,r)=>{const s=t-(o.nextReviewAt||0),n=t-(r.nextReviewAt||0);if(s!==n)return n-s;const u=o.difficulty||0,p=r.difficulty||0;return u!==p?p-u:(o.reviewCount||0)-(r.reviewCount||0)})}function Le(e,t){const a=fe(e);if(a)return a.remembered=t,a.lastReviewedAt=Date.now(),a.reviewCount=(a.reviewCount||0)+1,t?(a.correctCount=(a.correctCount||0)+1,a.difficulty=Math.max(-3,(a.difficulty||0)-1),a.nextReviewAt=te(a,!0)):(a.incorrectCount=(a.incorrectCount||0)+1,a.difficulty=Math.min(3,(a.difficulty||0)+1),a.correctCount=Math.max(0,(a.correctCount||0)-2),a.nextReviewAt=te(a,!1)),U(a),a}function Ce(){const e=S(),t={version:"1.0",exportedAt:new Date().toISOString(),wordCount:e.length,words:e};return JSON.stringify(t,null,2)}function oe(e){try{const t=JSON.parse(e);if(!t.words||!Array.isArray(t.words))throw new Error("Invalid data format: missing words array");const a=S(),o=new Set(a.map(n=>n.id));let r=0,s=0;return t.words.forEach(n=>{if(!n.word||!n.meaning){s++;return}(!n.id||o.has(n.id))&&(n.id=Date.now()+Math.random()),n.type=n.type||"word",n.remembered=n.remembered||!1,n.createdAt=n.createdAt||Date.now(),a.push(n),o.add(n.id),r++}),localStorage.setItem(G,JSON.stringify(a)),{success:!0,imported:r,skipped:s}}catch(t){return{success:!1,error:t.message}}}function pe(e,t=null){const a=S(),o=e.toLowerCase().trim();return a.some(r=>r.word.toLowerCase().trim()===o&&r.id!==t)}function Y(){const e=localStorage.getItem(ie);return e?JSON.parse(e):{theme:"dark",language:"es",showExampleInReview:!0,autoPlayAudio:!1}}function Se(e){localStorage.setItem(ie,JSON.stringify(e))}const me="emowords_gamification";function X(){const e=localStorage.getItem(me);return e?JSON.parse(e):{streak:0,lastStudyDate:null,maxStreak:0,dailyGoal:{date:new Date().toLocaleDateString(),count:0,target:20},totalXp:0,level:1}}function J(e){localStorage.setItem(me,JSON.stringify(e))}function F(){const e=X(),t=new Date().toLocaleDateString();if(e.dailyGoal.date!==t){e.dailyGoal={date:t,count:0,target:e.dailyGoal.target||20};const a=new Date;a.setDate(a.getDate()-1),e.lastStudyDate!==a.toLocaleDateString()&&e.lastStudyDate!==t&&(e.streak>0,e.streak=0),J(e)}return e}function re(e=1){const t=X(),a=new Date().toLocaleDateString();if(t.dailyGoal.date!==a&&(t.dailyGoal={date:a,count:0,target:20}),t.dailyGoal.count+=e,t.lastStudyDate!==a){const o=new Date;o.setDate(o.getDate()-1);const r=o.toLocaleDateString();t.lastStudyDate===r?t.streak+=1:t.streak=1,t.streak>t.maxStreak&&(t.maxStreak=t.streak),t.lastStudyDate=a}return t.totalXp+=e*10,t.level=Math.floor(Math.sqrt(t.totalXp/100))+1,J(t),t}function Pe(e){const t=X();t.dailyGoal.target=e,J(t)}const O=[{id:"a1-complete",name:"A1 - Beginner Pack",icon:"fa-seedling",description:"Lo esencial para sobrevivir: verbos del día a día, conectores básicos, tus primeros phrasal verbs y frases que usarás constantemente.",level:"A1",words:[{word:"Be",meaning:"Ser / Estar",type:"word",category:"Verbos",example:"I am tired. She is my friend."},{word:"Have",meaning:"Tener",type:"word",category:"Verbos",example:"I have a question."},{word:"Want",meaning:"Querer",type:"word",category:"Verbos",example:"I want coffee, please."},{word:"Need",meaning:"Necesitar",type:"word",category:"Verbos",example:"I need help."},{word:"Like",meaning:"Gustar",type:"word",category:"Verbos",example:"I like this song."},{word:"Go",meaning:"Ir",type:"word",category:"Verbos",example:"I go to work by metro."},{word:"Know",meaning:"Saber / Conocer",type:"word",category:"Verbos",example:"I don't know."},{word:"Think",meaning:"Pensar / Creer",type:"word",category:"Verbos",example:"I think so."},{word:"See",meaning:"Ver",type:"word",category:"Verbos",example:"See you tomorrow!"},{word:"Work",meaning:"Trabajar / Funcionar",type:"word",category:"Verbos",example:"It doesn't work."},{word:"And",meaning:"Y",type:"connector",category:"Conectores",example:"Coffee and a sandwich, please."},{word:"But",meaning:"Pero",type:"connector",category:"Conectores",example:"I like it, but it's expensive."},{word:"Or",meaning:"O",type:"connector",category:"Conectores",example:"Tea or coffee?"},{word:"Because",meaning:"Porque",type:"connector",category:"Conectores",example:"I'm late because of the traffic."},{word:"So",meaning:"Así que / Entonces",type:"connector",category:"Conectores",example:"I was hungry, so I ordered food."},{word:"Then",meaning:"Luego / Entonces",type:"connector",category:"Conectores",example:"First we eat, then we go."},{word:"Also",meaning:"También",type:"connector",category:"Conectores",example:"I also want dessert."},{word:"Maybe",meaning:"Quizás / A lo mejor",type:"connector",category:"Conectores",example:"Maybe tomorrow."},{word:"Really",meaning:"De verdad / Muy",type:"connector",category:"Conectores",example:"I'm really tired."},{word:"Actually",meaning:"En realidad",type:"connector",category:"Conectores",example:"Actually, I changed my mind."},{word:"Wake up",meaning:"Despertarse",type:"phrasal",category:"Phrasal Verbs",example:"I wake up at 7."},{word:"Get up",meaning:"Levantarse",type:"phrasal",category:"Phrasal Verbs",example:"Get up, we're late!"},{word:"Turn on",meaning:"Encender",type:"phrasal",category:"Phrasal Verbs",example:"Turn on the lights."},{word:"Turn off",meaning:"Apagar",type:"phrasal",category:"Phrasal Verbs",example:"Turn off your phone."},{word:"Come in",meaning:"Entrar / Pasa",type:"phrasal",category:"Phrasal Verbs",example:"Come in, sit down!"},{word:"Go out",meaning:"Salir",type:"phrasal",category:"Phrasal Verbs",example:"Let's go out tonight."},{word:"Sit down",meaning:"Sentarse",type:"phrasal",category:"Phrasal Verbs",example:"Please sit down."},{word:"Put on",meaning:"Ponerse (ropa)",type:"phrasal",category:"Phrasal Verbs",example:"Put on your jacket, it's cold."},{word:"Take off",meaning:"Quitarse (ropa)",type:"phrasal",category:"Phrasal Verbs",example:"Take off your shoes."},{word:"Look at",meaning:"Mirar",type:"phrasal",category:"Phrasal Verbs",example:"Look at this!"},{word:"How are you?",meaning:"¿Cómo estás?",type:"expression",category:"Expresiones",example:"Hey! How are you?"},{word:"I'm fine, thanks",meaning:"Bien, gracias",type:"expression",category:"Expresiones",example:"I'm fine, thanks. And you?"},{word:"Nice to meet you",meaning:"Encantado/a",type:"expression",category:"Expresiones",example:"Hi, I'm Ana. Nice to meet you."},{word:"See you later",meaning:"Hasta luego",type:"expression",category:"Expresiones",example:"Bye! See you later."},{word:"No problem",meaning:"No hay problema / De nada",type:"expression",category:"Expresiones",example:"Thanks! - No problem."},{word:"I don't understand",meaning:"No entiendo",type:"expression",category:"Expresiones",example:"Sorry, I don't understand."},{word:"Can you repeat?",meaning:"¿Puedes repetir?",type:"expression",category:"Expresiones",example:"Can you repeat, please?"},{word:"Excuse me",meaning:"Disculpa / Perdona",type:"expression",category:"Expresiones",example:"Excuse me, where is the bathroom?"},{word:"I'm sorry",meaning:"Lo siento",type:"expression",category:"Expresiones",example:"I'm sorry, I'm late."},{word:"Of course",meaning:"Por supuesto / Claro",type:"expression",category:"Expresiones",example:"Can I sit here? - Of course!"}]},{id:"a2-complete",name:"A2 - Elementary Pack",icon:"fa-leaf",description:"Para empezar a conversar: verbos de acción, conectores para contar cosas, phrasal verbs súper comunes y expresiones que oyes en todas partes.",level:"A2",words:[{word:"Try",meaning:"Intentar / Probar",type:"word",category:"Verbos",example:"Try this, it's delicious!"},{word:"Wait",meaning:"Esperar",type:"word",category:"Verbos",example:"Wait for me!"},{word:"Tell",meaning:"Decir / Contar",type:"word",category:"Verbos",example:"Tell me more."},{word:"Ask",meaning:"Preguntar / Pedir",type:"word",category:"Verbos",example:"Can I ask you something?"},{word:"Feel",meaning:"Sentir / Sentirse",type:"word",category:"Verbos",example:"I feel tired today."},{word:"Remember",meaning:"Recordar",type:"word",category:"Verbos",example:"I don't remember his name."},{word:"Forget",meaning:"Olvidar",type:"word",category:"Verbos",example:"I forgot my wallet."},{word:"Leave",meaning:"Irse / Dejar",type:"word",category:"Verbos",example:"I'm leaving now."},{word:"Stay",meaning:"Quedarse",type:"word",category:"Verbos",example:"Stay here, I'll be back."},{word:"Send",meaning:"Enviar",type:"word",category:"Verbos",example:"Send me the details."},{word:"After",meaning:"Después de",type:"connector",category:"Conectores",example:"After work, I go to the gym."},{word:"Before",meaning:"Antes de",type:"connector",category:"Conectores",example:"Before I forget..."},{word:"When",meaning:"Cuando",type:"connector",category:"Conectores",example:"When I was young..."},{word:"While",meaning:"Mientras",type:"connector",category:"Conectores",example:"I listen to music while I work."},{word:"If",meaning:"Si (condicional)",type:"connector",category:"Conectores",example:"If you want, we can go."},{word:"Anyway",meaning:"De todas formas / Bueno",type:"connector",category:"Conectores",example:"Anyway, let's go."},{word:"By the way",meaning:"Por cierto",type:"connector",category:"Conectores",example:"By the way, where is John?"},{word:"For example",meaning:"Por ejemplo",type:"connector",category:"Conectores",example:"I like fruits, for example, apples."},{word:"I mean",meaning:"O sea / Quiero decir",type:"connector",category:"Conectores",example:"I mean, it's not bad."},{word:"You know",meaning:"Ya sabes / Sabes",type:"connector",category:"Conectores",example:"It's like, you know, complicated."},{word:"Look for",meaning:"Buscar",type:"phrasal",category:"Phrasal Verbs",example:"I'm looking for my keys."},{word:"Pick up",meaning:"Recoger / Coger",type:"phrasal",category:"Phrasal Verbs",example:"I'll pick you up at 8."},{word:"Give up",meaning:"Rendirse / Dejar de",type:"phrasal",category:"Phrasal Verbs",example:"Don't give up!"},{word:"Come back",meaning:"Volver",type:"phrasal",category:"Phrasal Verbs",example:"When are you coming back?"},{word:"Find out",meaning:"Descubrir / Enterarse",type:"phrasal",category:"Phrasal Verbs",example:"I found out he lied."},{word:"Hurry up",meaning:"Darse prisa",type:"phrasal",category:"Phrasal Verbs",example:"Hurry up, we're late!"},{word:"Grow up",meaning:"Crecer / Madurar",type:"phrasal",category:"Phrasal Verbs",example:"I grew up in Madrid."},{word:"Give back",meaning:"Devolver",type:"phrasal",category:"Phrasal Verbs",example:"Give me back my phone!"},{word:"Write down",meaning:"Apuntar / Anotar",type:"phrasal",category:"Phrasal Verbs",example:"Write down the address."},{word:"Log in",meaning:"Iniciar sesión",type:"phrasal",category:"Phrasal Verbs",example:"Log in with your email."},{word:"What's up?",meaning:"¿Qué pasa? / ¿Qué tal?",type:"expression",category:"Expresiones",example:"Hey! What's up?"},{word:"Take care",meaning:"Cuídate",type:"expression",category:"Expresiones",example:"See you! Take care."},{word:"Good luck",meaning:"Buena suerte",type:"expression",category:"Expresiones",example:"Good luck with your exam!"},{word:"Never mind",meaning:"No importa / Déjalo",type:"expression",category:"Expresiones",example:"Never mind, forget it."},{word:"It doesn't matter",meaning:"No importa / Da igual",type:"expression",category:"Expresiones",example:"It doesn't matter, really."},{word:"I have no idea",meaning:"Ni idea / No tengo ni idea",type:"expression",category:"Expresiones",example:"I have no idea what happened."},{word:"Just a moment",meaning:"Un momento",type:"expression",category:"Expresiones",example:"Just a moment, please."},{word:"That's fine",meaning:"Está bien / Vale",type:"expression",category:"Expresiones",example:"That's fine with me."},{word:"I'm not sure",meaning:"No estoy seguro/a",type:"expression",category:"Expresiones",example:"I'm not sure if I can go."},{word:"Well done!",meaning:"¡Bien hecho!",type:"expression",category:"Expresiones",example:"You passed! Well done!"}]},{id:"b1-complete",name:"B1 - Intermediate Pack",icon:"fa-tree",description:"Para hablar con fluidez: verbos para opinar y expresarte, conectores para no quedarte callado, phrasal verbs esenciales y expresiones que usas cada día.",level:"B1",words:[{word:"Seem",meaning:"Parecer",type:"word",category:"Verbos",example:"It seems like a good idea."},{word:"Guess",meaning:"Suponer / Adivinar",type:"word",category:"Verbos",example:"I guess you're right."},{word:"Expect",meaning:"Esperar (expectativa)",type:"word",category:"Verbos",example:"I didn't expect that."},{word:"Realize",meaning:"Darse cuenta",type:"word",category:"Verbos",example:"I just realized I forgot my wallet."},{word:"Agree",meaning:"Estar de acuerdo",type:"word",category:"Verbos",example:"I totally agree with you."},{word:"Suggest",meaning:"Sugerir",type:"word",category:"Verbos",example:"I suggest we take a break."},{word:"Recommend",meaning:"Recomendar",type:"word",category:"Verbos",example:"I recommend this restaurant."},{word:"Manage",meaning:"Conseguir / Arreglárselas",type:"word",category:"Verbos",example:"I managed to finish on time."},{word:"Afford",meaning:"Permitirse (dinero)",type:"word",category:"Verbos",example:"I can't afford a new car."},{word:"Improve",meaning:"Mejorar",type:"word",category:"Verbos",example:"My English is improving."},{word:"Although",meaning:"Aunque",type:"connector",category:"Conectores",example:"Although it was late, I finished."},{word:"However",meaning:"Sin embargo",type:"connector",category:"Conectores",example:"It's cheap. However, it's bad quality."},{word:"Instead",meaning:"En su lugar",type:"connector",category:"Conectores",example:"Let's do this instead."},{word:"Besides",meaning:"Además",type:"connector",category:"Conectores",example:"It's late, and besides, I'm tired."},{word:"Otherwise",meaning:"Si no / De lo contrario",type:"connector",category:"Conectores",example:"Hurry up, otherwise we'll be late."},{word:"Even though",meaning:"Aunque (enfático)",type:"connector",category:"Conectores",example:"Even though I studied, I failed."},{word:"Basically",meaning:"Básicamente",type:"connector",category:"Conectores",example:"Basically, it's done."},{word:"Apparently",meaning:"Por lo visto / Al parecer",type:"connector",category:"Conectores",example:"Apparently, he quit his job."},{word:"Obviously",meaning:"Obviamente",type:"connector",category:"Conectores",example:"Obviously, I said yes."},{word:"Hopefully",meaning:"Ojalá / Con suerte",type:"connector",category:"Conectores",example:"Hopefully, it will work."},{word:"Figure out",meaning:"Entender / Resolver",type:"phrasal",category:"Phrasal Verbs",example:"I can't figure out this problem."},{word:"Work out",meaning:"Hacer ejercicio / Funcionar",type:"phrasal",category:"Phrasal Verbs",example:"Things will work out, don't worry."},{word:"Show up",meaning:"Aparecer / Presentarse",type:"phrasal",category:"Phrasal Verbs",example:"He didn't show up to the meeting."},{word:"Run out of",meaning:"Quedarse sin",type:"phrasal",category:"Phrasal Verbs",example:"We ran out of milk."},{word:"Get along with",meaning:"Llevarse bien con",type:"phrasal",category:"Phrasal Verbs",example:"I get along with my boss."},{word:"Set up",meaning:"Organizar / Configurar",type:"phrasal",category:"Phrasal Verbs",example:"Let's set up a meeting."},{word:"Catch up",meaning:"Ponerse al día",type:"phrasal",category:"Phrasal Verbs",example:"Let's catch up over coffee!"},{word:"Check out",meaning:"Echar un vistazo",type:"phrasal",category:"Phrasal Verbs",example:"Check out this video!"},{word:"Look forward to",meaning:"Tener ganas de",type:"phrasal",category:"Phrasal Verbs",example:"I'm looking forward to the weekend!"},{word:"Put off",meaning:"Posponer",type:"phrasal",category:"Phrasal Verbs",example:"Stop putting it off, do it now!"},{word:"It's up to you",meaning:"Tú decides / Depende de ti",type:"expression",category:"Expresiones",example:"Pizza or sushi? It's up to you."},{word:"That makes sense",meaning:"Tiene sentido",type:"expression",category:"Expresiones",example:"Oh, that makes sense now!"},{word:"It's not a big deal",meaning:"No es para tanto",type:"expression",category:"Expresiones",example:"Relax, it's not a big deal."},{word:"Let me know",meaning:"Avísame / Dime",type:"expression",category:"Expresiones",example:"Let me know if you need help."},{word:"To be honest",meaning:"Para ser sincero/a",type:"expression",category:"Expresiones",example:"To be honest, I don't like it."},{word:"I'm not in the mood",meaning:"No me apetece",type:"expression",category:"Expresiones",example:"I'm not in the mood for a party."},{word:"Fair enough",meaning:"Me parece bien / Vale",type:"expression",category:"Expresiones",example:"Fair enough, let's do it."},{word:"It depends",meaning:"Depende",type:"expression",category:"Expresiones",example:"Are you coming? It depends."},{word:"That's the thing",meaning:"Esa es la cuestión",type:"expression",category:"Expresiones",example:"That's the thing, I don't know."},{word:"I'll let you know",meaning:"Ya te diré / Te aviso",type:"expression",category:"Expresiones",example:"I'll let you know tomorrow."}]},{id:"b2-complete",name:"B2 - Upper-Intermediate Pack",icon:"fa-mountain",description:"Para sonar natural: verbos que usan los nativos, conectores para debatir, phrasal verbs del día a día y expresiones que escuchas en series y películas.",level:"B2",words:[{word:"Assume",meaning:"Suponer / Asumir",type:"word",category:"Verbos",example:"I assume you know about it."},{word:"Consider",meaning:"Considerar / Plantearse",type:"word",category:"Verbos",example:"Have you considered moving?"},{word:"Tend to",meaning:"Tender a / Soler",type:"word",category:"Verbos",example:"I tend to wake up early."},{word:"Involve",meaning:"Implicar / Involucrar",type:"word",category:"Verbos",example:"What does the job involve?"},{word:"Struggle",meaning:"Luchar / Costar (esfuerzo)",type:"word",category:"Verbos",example:"I struggle with mornings."},{word:"Achieve",meaning:"Lograr / Conseguir",type:"word",category:"Verbos",example:"She achieved her goals."},{word:"Avoid",meaning:"Evitar",type:"word",category:"Verbos",example:"I try to avoid sugar."},{word:"Convince",meaning:"Convencer",type:"word",category:"Verbos",example:"You convinced me!"},{word:"Complain",meaning:"Quejarse",type:"word",category:"Verbos",example:"Stop complaining!"},{word:"Appreciate",meaning:"Agradecer / Valorar",type:"word",category:"Verbos",example:"I really appreciate your help."},{word:"Therefore",meaning:"Por lo tanto",type:"connector",category:"Conectores",example:"It was late, therefore we left."},{word:"Nevertheless",meaning:"Sin embargo / Aun así",type:"connector",category:"Conectores",example:"It was hard. Nevertheless, I did it."},{word:"On the other hand",meaning:"Por otro lado",type:"connector",category:"Conectores",example:"It's cheap, but on the other hand, it's slow."},{word:"In that case",meaning:"En ese caso",type:"connector",category:"Conectores",example:"In that case, count me in!"},{word:"As long as",meaning:"Siempre que / Mientras",type:"connector",category:"Conectores",example:"You can go as long as you're back by 10."},{word:"Unless",meaning:"A menos que",type:"connector",category:"Conectores",example:"I'll go unless it rains."},{word:"Despite",meaning:"A pesar de",type:"connector",category:"Conectores",example:"Despite the rain, we had fun."},{word:"Whereas",meaning:"Mientras que",type:"connector",category:"Conectores",example:"I like tea, whereas he prefers coffee."},{word:"On top of that",meaning:"Además de eso / Encima",type:"connector",category:"Conectores",example:"I'm tired and, on top of that, hungry."},{word:"That being said",meaning:"Dicho esto",type:"connector",category:"Conectores",example:"That being said, I still think it's worth it."},{word:"Come up with",meaning:"Idear / Se me ocurrió",type:"phrasal",category:"Phrasal Verbs",example:"She came up with a great idea."},{word:"Turn out",meaning:"Resultar ser",type:"phrasal",category:"Phrasal Verbs",example:"It turned out to be a good decision."},{word:"Bring up",meaning:"Sacar un tema",type:"phrasal",category:"Phrasal Verbs",example:"Why did you bring that up?"},{word:"Get over",meaning:"Superar",type:"phrasal",category:"Phrasal Verbs",example:"I can't get over it."},{word:"Put up with",meaning:"Aguantar / Tolerar",type:"phrasal",category:"Phrasal Verbs",example:"I can't put up with this noise."},{word:"Get away with",meaning:"Salirse con la suya",type:"phrasal",category:"Phrasal Verbs",example:"You won't get away with this!"},{word:"Hold on",meaning:"Espera / Aguanta",type:"phrasal",category:"Phrasal Verbs",example:"Hold on, I'll be right back."},{word:"Mess up",meaning:"Cagarla / Estropear",type:"phrasal",category:"Phrasal Verbs",example:"I totally messed up."},{word:"Freak out",meaning:"Flipar / Entrar en pánico",type:"phrasal",category:"Phrasal Verbs",example:"Don't freak out, it's fine."},{word:"End up",meaning:"Acabar / Terminar",type:"phrasal",category:"Phrasal Verbs",example:"We ended up staying until midnight."},{word:"No way!",meaning:"¡Ni de broma! / ¡No me digas!",type:"expression",category:"Expresiones",example:"You quit your job? No way!"},{word:"I'm done",meaning:"He terminado / Paso de esto",type:"expression",category:"Expresiones",example:"I'm done with this situation."},{word:"That's insane",meaning:"Eso es una locura",type:"expression",category:"Expresiones",example:"You swam 5km? That's insane!"},{word:"Get the point",meaning:"Captar la idea / Entender",type:"expression",category:"Expresiones",example:"I get the point, you can stop."},{word:"You're kidding",meaning:"Estás de broma",type:"expression",category:"Expresiones",example:"You won? You're kidding!"},{word:"I couldn't care less",meaning:"Me importa un bledo",type:"expression",category:"Expresiones",example:"I couldn't care less about what he thinks."},{word:"That's not the point",meaning:"Esa no es la cuestión",type:"expression",category:"Expresiones",example:"Yeah but that's not the point."},{word:"Keep it real",meaning:"Sé auténtico / Sin rollos",type:"expression",category:"Expresiones",example:"Forget the drama, keep it real."},{word:"Been there, done that",meaning:"Ya pasé por eso",type:"expression",category:"Expresiones",example:"Drama at work? Been there, done that."},{word:"It is what it is",meaning:"Es lo que hay",type:"expression",category:"Expresiones",example:"The deadline is tomorrow. It is what it is."}]},{id:"c1-complete",name:"C1 - Advanced Pack",icon:"fa-rocket",description:"Para sonar sofisticado: verbos de trabajo y negocios, conectores elegantes pero naturales, phrasal verbs de nivel nativo y expresiones de persona culta.",level:"C1",words:[{word:"Address",meaning:"Abordar / Tratar (un tema)",type:"word",category:"Verbos",example:"We need to address this issue."},{word:"Implement",meaning:"Implementar",type:"word",category:"Verbos",example:"We'll implement the changes next week."},{word:"Ensure",meaning:"Asegurar(se)",type:"word",category:"Verbos",example:"Please ensure everyone is informed."},{word:"Clarify",meaning:"Aclarar",type:"word",category:"Verbos",example:"Let me clarify what I mean."},{word:"Prioritize",meaning:"Priorizar",type:"word",category:"Verbos",example:"We need to prioritize this task."},{word:"Overcome",meaning:"Superar",type:"word",category:"Verbos",example:"She overcame many challenges."},{word:"Acknowledge",meaning:"Reconocer / Admitir",type:"word",category:"Verbos",example:"I acknowledge my mistake."},{word:"Pursue",meaning:"Perseguir (objetivo)",type:"word",category:"Verbos",example:"She decided to pursue her dreams."},{word:"Delegate",meaning:"Delegar",type:"word",category:"Verbos",example:"Learn to delegate tasks."},{word:"Leverage",meaning:"Aprovechar / Sacar partido",type:"word",category:"Verbos",example:"Let's leverage our experience."},{word:"Having said that",meaning:"Dicho esto",type:"connector",category:"Conectores",example:"It's expensive. Having said that, it's worth it."},{word:"That said",meaning:"Dicho esto (más corto)",type:"connector",category:"Conectores",example:"He's difficult. That said, he's talented."},{word:"Either way",meaning:"De cualquier forma",type:"connector",category:"Conectores",example:"Either way, we need to decide."},{word:"At the end of the day",meaning:"Al fin y al cabo",type:"connector",category:"Conectores",example:"At the end of the day, it's your choice."},{word:"To be fair",meaning:"Para ser justos",type:"connector",category:"Conectores",example:"To be fair, he did apologize."},{word:"As a matter of fact",meaning:"De hecho",type:"connector",category:"Conectores",example:"As a matter of fact, I agree with you."},{word:"For what it's worth",meaning:"Por lo que pueda valer",type:"connector",category:"Conectores",example:"For what it's worth, I think you're great."},{word:"Mind you",meaning:"Eso sí / Aunque",type:"connector",category:"Conectores",example:"Good restaurant. Mind you, it's pricey."},{word:"Not to mention",meaning:"Por no hablar de",type:"connector",category:"Conectores",example:"It's cold, not to mention raining."},{word:"In a nutshell",meaning:"En resumen / Resumiendo",type:"connector",category:"Conectores",example:"In a nutshell, we need more time."},{word:"Play it down",meaning:"Quitarle importancia",type:"phrasal",category:"Phrasal Verbs",example:"Don't play it down, it's serious."},{word:"Rule out",meaning:"Descartar",type:"phrasal",category:"Phrasal Verbs",example:"We can't rule out that option."},{word:"Back out",meaning:"Echarse atrás",type:"phrasal",category:"Phrasal Verbs",example:"He backed out at the last minute."},{word:"Step up",meaning:"Dar un paso al frente",type:"phrasal",category:"Phrasal Verbs",example:"Someone needs to step up."},{word:"Fall through",meaning:"Fracasar / No salir adelante",type:"phrasal",category:"Phrasal Verbs",example:"The deal fell through."},{word:"Look into",meaning:"Investigar / Estudiar",type:"phrasal",category:"Phrasal Verbs",example:"I'll look into it."},{word:"Iron out",meaning:"Resolver / Limar",type:"phrasal",category:"Phrasal Verbs",example:"Let's iron out the details."},{word:"Pull off",meaning:"Lograr (algo difícil)",type:"phrasal",category:"Phrasal Verbs",example:"I can't believe we pulled it off!"},{word:"Get back to",meaning:"Volver a contactar",type:"phrasal",category:"Phrasal Verbs",example:"I'll get back to you on that."},{word:"Follow through",meaning:"Cumplir / Llevar a cabo",type:"phrasal",category:"Phrasal Verbs",example:"Make sure you follow through."},{word:"The thing is",meaning:"El caso es / La cosa es que",type:"expression",category:"Expresiones",example:"The thing is, I need more time."},{word:"To cut a long story short",meaning:"Resumiendo / Yendo al grano",type:"expression",category:"Expresiones",example:"To cut a long story short, we won."},{word:"Go the extra mile",meaning:"Hacer un esfuerzo extra",type:"expression",category:"Expresiones",example:"She always goes the extra mile."},{word:"Be on the same page",meaning:"Estar en la misma onda",type:"expression",category:"Expresiones",example:"Let's make sure we're on the same page."},{word:"Think outside the box",meaning:"Pensar de forma creativa",type:"expression",category:"Expresiones",example:"We need to think outside the box."},{word:"Hit the ground running",meaning:"Empezar con buen pie",type:"expression",category:"Expresiones",example:"I want to hit the ground running."},{word:"A steep learning curve",meaning:"Una curva de aprendizaje",type:"expression",category:"Expresiones",example:"This job has a steep learning curve."},{word:"Touch base",meaning:"Ponerse en contacto",type:"expression",category:"Expresiones",example:"Let's touch base next week."},{word:"Get the ball rolling",meaning:"Poner algo en marcha",type:"expression",category:"Expresiones",example:"Let's get the ball rolling."},{word:"Keep me in the loop",meaning:"Mantenme informado",type:"expression",category:"Expresiones",example:"Keep me in the loop, please."}]},{id:"c2-complete",name:"C2 - Proficiency Pack",icon:"fa-crown",description:"Para impresionar: verbos precisos de alto nivel, conectores para argumentar con elegancia, phrasal verbs sutiles e idioms para sonar como un nativo educado.",level:"C2",words:[{word:"Anticipate",meaning:"Anticipar / Prever",type:"word",category:"Verbos",example:"We didn't anticipate this problem."},{word:"Undermine",meaning:"Socavar / Minar",type:"word",category:"Verbos",example:"Don't undermine my authority."},{word:"Advocate",meaning:"Defender / Abogar por",type:"word",category:"Verbos",example:"I advocate for change."},{word:"Tackle",meaning:"Abordar / Hacer frente a",type:"word",category:"Verbos",example:"Let's tackle this problem."},{word:"Navigate",meaning:"Navegar / Manejarse en",type:"word",category:"Verbos",example:"It's hard to navigate office politics."},{word:"Thrive",meaning:"Prosperar / Florecer",type:"word",category:"Verbos",example:"She thrives under pressure."},{word:"Resonate",meaning:"Resonar / Conectar (con)",type:"word",category:"Verbos",example:"This message resonates with me."},{word:"Overlook",meaning:"Pasar por alto / Ignorar",type:"word",category:"Verbos",example:"Don't overlook the details."},{word:"Embrace",meaning:"Abrazar / Aceptar",type:"word",category:"Verbos",example:"Embrace change."},{word:"Streamline",meaning:"Simplificar / Optimizar",type:"word",category:"Verbos",example:"We need to streamline the process."},{word:"Be that as it may",meaning:"Sea como sea",type:"connector",category:"Conectores",example:"Be that as it may, we still need to act."},{word:"More often than not",meaning:"La mayoría de las veces",type:"connector",category:"Conectores",example:"More often than not, he's right."},{word:"By and large",meaning:"En general",type:"connector",category:"Conectores",example:"By and large, people are kind."},{word:"All things considered",meaning:"Teniendo todo en cuenta",type:"connector",category:"Conectores",example:"All things considered, it was a success."},{word:"For the most part",meaning:"En su mayor parte",type:"connector",category:"Conectores",example:"For the most part, I agree."},{word:"On balance",meaning:"Sopesándolo todo",type:"connector",category:"Conectores",example:"On balance, it was worth it."},{word:"As it turns out",meaning:"Resulta que",type:"connector",category:"Conectores",example:"As it turns out, I was wrong."},{word:"Needless to say",meaning:"Ni que decir tiene",type:"connector",category:"Conectores",example:"Needless to say, I was shocked."},{word:"That notwithstanding",meaning:"A pesar de eso",type:"connector",category:"Conectores",example:"That notwithstanding, we should proceed."},{word:"With that in mind",meaning:"Teniendo eso en cuenta",type:"connector",category:"Conectores",example:"With that in mind, let's continue."},{word:"Brush off",meaning:"Ignorar / No hacer caso",type:"phrasal",category:"Phrasal Verbs",example:"Don't brush off my concerns."},{word:"Chime in",meaning:"Intervenir / Meter baza",type:"phrasal",category:"Phrasal Verbs",example:"Feel free to chime in."},{word:"Pan out",meaning:"Resultar / Salir",type:"phrasal",category:"Phrasal Verbs",example:"Let's see how things pan out."},{word:"Touch on",meaning:"Tocar / Mencionar brevemente",type:"phrasal",category:"Phrasal Verbs",example:"I'd like to touch on one point."},{word:"Zone out",meaning:"Desconectar / Quedarse en blanco",type:"phrasal",category:"Phrasal Verbs",example:"Sorry, I zoned out for a moment."},{word:"Play up",meaning:"Exagerar / Dar problemas",type:"phrasal",category:"Phrasal Verbs",example:"My back is playing up again."},{word:"Kick in",meaning:"Empezar a hacer efecto",type:"phrasal",category:"Phrasal Verbs",example:"The coffee is starting to kick in."},{word:"Wind down",meaning:"Relajarse / Ir terminando",type:"phrasal",category:"Phrasal Verbs",example:"Time to wind down for the day."},{word:"Mull over",meaning:"Darle vueltas a",type:"phrasal",category:"Phrasal Verbs",example:"I need to mull it over."},{word:"Stumble upon",meaning:"Encontrar por casualidad",type:"phrasal",category:"Phrasal Verbs",example:"I stumbled upon this article."},{word:"The elephant in the room",meaning:"El tema incómodo que nadie menciona",type:"expression",category:"Expresiones",example:"Let's address the elephant in the room."},{word:"A blessing in disguise",meaning:"Una bendición disfrazada",type:"expression",category:"Expresiones",example:"Losing that job was a blessing in disguise."},{word:"Break the ice",meaning:"Romper el hielo",type:"expression",category:"Expresiones",example:"Let's play a game to break the ice."},{word:"Hit the nail on the head",meaning:"Dar en el clavo",type:"expression",category:"Expresiones",example:"You hit the nail on the head."},{word:"Easier said than done",meaning:"Del dicho al hecho hay un trecho",type:"expression",category:"Expresiones",example:"Getting fit is easier said than done."},{word:"The ball is in your court",meaning:"Te toca a ti",type:"expression",category:"Expresiones",example:"I made my offer, the ball is in your court."},{word:"Read the room",meaning:"Leer el ambiente",type:"expression",category:"Expresiones",example:"You need to learn to read the room."},{word:"Miss the boat",meaning:"Perder la oportunidad",type:"expression",category:"Expresiones",example:"If you don't apply now, you'll miss the boat."},{word:"Put your foot in your mouth",meaning:"Meter la pata",type:"expression",category:"Expresiones",example:"I really put my foot in my mouth there."},{word:"Under the weather",meaning:"Pachucho / Indispuesto",type:"expression",category:"Expresiones",example:"I'm feeling a bit under the weather."}]}],se="toast-container";function $e(){let e=document.getElementById(se);return e||(e=document.createElement("div"),e.id=se,e.className="toast-container",document.body.appendChild(e)),e}function I(e,t,a="info",o=4e3){const r=$e(),s=document.createElement("div"),n={info:"fa-circle-info",success:"fa-circle-check",warning:"fa-triangle-exclamation",error:"fa-circle-xmark"};s.className=`toast ${a}`,s.innerHTML=`
    <i class="fa-solid ${n[a]||"fa-bell"}"></i>
    <div class="toast-content">
      <span class="toast-title">${e}</span>
      <span class="toast-message">${t}</span>
    </div>
  `,r.appendChild(s),o>0&&setTimeout(()=>{s.classList.add("removing"),s.addEventListener("animationend",()=>{s.remove(),r.children.length===0&&r.remove()})},o)}function R(e,t="en-US",a=1){if(!("speechSynthesis"in window)){I("Error","Tu navegador no soporta síntesis de voz.","error");return}window.speechSynthesis.cancel();const o=new SpeechSynthesisUtterance(e);o.lang=t,o.rate=a;const s=window.speechSynthesis.getVoices().find(n=>n.lang===t&&(n.name.includes("Google")||n.name.includes("Premium")));s&&(o.voice=s),o.onerror=n=>{console.error("TTS Error:",n),I("Error","No se pudo reproducir el audio.","error")},window.speechSynthesis.speak(o)}function Ae(e,t){const a=document.createElement("div");a.className="word-card",a.dataset.wordId=e.id;const o=e.reviewCount||0,r=e.createdAt?new Date(e.createdAt).toLocaleDateString():"",s=be(e),n=ke(e),u=xe(e);return a.innerHTML=`
    ${e.image?`<img src="${e.image}" alt="${e.word}" class="word-image" />`:""}

    <div class="tags">
      <span class="tag type-tag type-${e.type}">${Ve(e.type)}</span>
      <span class="tag mastery-tag ${s.class}" title="${s.label}">
        <i class="fa-solid ${s.icon}"></i>
        ${s.label}
      </span>
      ${u?`<span class="tag due-tag"><i class="fa-solid fa-clock"></i> ${n}</span>`:""}
      ${e.category?`<span class="tag category-tag"><i class="fa-solid fa-folder"></i> ${e.category}</span>`:""}
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
        ${!u&&e.nextReviewAt?`<span class="meta-item next-review"><i class="fa-solid fa-calendar-check"></i> Próximo: ${n}</span>`:""}
        ${r?`<span class="meta-item"><i class="fa-regular fa-calendar"></i> ${r}</span>`:""}
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
  `,a.querySelector(".speak-btn").addEventListener("click",p=>{p.stopPropagation(),R(e.word)}),a.querySelector(".toggle").addEventListener("click",()=>{e.remembered=!e.remembered,U(e),t()}),a.querySelector(".delete").addEventListener("click",()=>{confirm(`¿Eliminar "${e.word}"?`)&&(ve(e.id),t())}),a.querySelector(".edit-btn").addEventListener("click",()=>{Te(e,t)}),a}function Te(e,t){document.querySelector(".edit-modal")?.remove();const a=document.createElement("div");a.className="edit-modal",a.innerHTML=`
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
          <label><i class="fa-solid fa-image"></i> URL de imagen</label>
          <input type="url" id="edit-image" value="${j(e.image||"")}" />
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-cancel">Cancelar</button>
          <button type="submit" class="btn-save"><i class="fa-solid fa-check"></i> Guardar cambios</button>
        </div>
        <div class="edit-feedback" style="display: none; color: var(--danger); font-size: 0.9rem; margin-top: 1rem; text-align: center;"></div>
      </form>
    </div>
  `,document.body.appendChild(a),requestAnimationFrame(()=>{a.classList.add("active")});const o=()=>{a.classList.remove("active"),setTimeout(()=>a.remove(),300)};a.querySelector(".modal-overlay").addEventListener("click",o),a.querySelector(".modal-close").addEventListener("click",o),a.querySelector(".btn-cancel").addEventListener("click",o),a.querySelector(".edit-form").addEventListener("submit",r=>{r.preventDefault();const s=document.getElementById("edit-word").value.trim(),n=a.querySelector(".edit-feedback");if(pe(s,e.id)){n.textContent=`La palabra "${s}" ya existe.`,n.style.display="block";return}e.word=s,e.meaning=document.getElementById("edit-meaning").value.trim(),e.type=document.getElementById("edit-type").value,e.category=document.getElementById("edit-category").value.trim()||null,e.emotion=document.getElementById("edit-emotion").value.trim(),e.example=document.getElementById("edit-example").value.trim(),e.image=document.getElementById("edit-image").value.trim(),U(e),o(),t()}),document.addEventListener("keydown",function r(s){s.key==="Escape"&&(o(),document.removeEventListener("keydown",r))})}function j(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function Ve(e){switch(e){case"word":return'<i class="fa-solid fa-font"></i> Palabra';case"phrasal":return'<i class="fa-solid fa-link"></i> Phrasal Verb';case"expression":return'<i class="fa-solid fa-comment"></i> Expresión';case"connector":return'<i class="fa-solid fa-arrows-left-right"></i> Conector';default:return'<i class="fa-solid fa-file"></i> Otro'}}function _(e){const t=ce(),a=le(),o=F(),r=24,s=2*Math.PI*r,n=Math.min(o.dailyGoal.count/o.dailyGoal.target,1),u=s-n*s,p=t.total>0;e.innerHTML=`
    <!-- Dynamic Content: Hero or Dashboard -->
    ${p?`
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
                 <div class="xp-bar" style="width: ${Be(o.totalXp,o.level)}%"></div>
              </div>
              <div class="xp-meta">
                 <span>${o.totalXp} XP Totales</span>
                 <span>Siguiente: ${Me(o.level)} XP</span>
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
             <span class="goal-msg-sm">${De(o.dailyGoal.count,o.dailyGoal.target)}</span>
          </div>
          <div class="progress-ring-mini">
             <svg width="60" height="60">
              <circle class="bg" stroke-width="4" fill="transparent" r="${r}" cx="30" cy="30" />
              <circle class="fg" stroke-width="4" fill="transparent" r="${r}" cx="30" cy="30" 
                style="stroke-dasharray: ${s}; stroke-dashoffset: ${u};" />
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
          <h1>Tu vocabulario, <br/>conectado con tus emociones.</h1>
          <p>Olvida las listas interminables. EmoWords utiliza tus recuerdos y sensaciones para que cada palabra se quede contigo para siempre.</p>
          
          <div class="hero-actions">
            <button class="primary-hero-btn" onclick="document.querySelector('[data-view=add]').click()">
              <i class="fa-solid fa-plus"></i> Añadir mi primera palabra
            </button>
            <button class="secondary-hero-btn" onclick="document.getElementById('import-packs-btn').click()">
              <i class="fa-solid fa-download"></i> Explorar packs
            </button>
          </div>
        </div>
      </div>
    `}

    <h2 class="${p?"":"hidden"}" style="margin-bottom: 1.5rem;">Tu vocabulario</h2>
    
    <!-- Search and Controls Bar (Hidden if empty) -->
    <div class="controls-bar ${p?"":"hidden"}">
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
    <div class="filters ${p?"":"hidden"}">
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
          ${a.map(k=>`<option value="${k}">${k}</option>`).join("")}
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
  `;const w=document.getElementById("word-list"),m=document.getElementById("filter-mastery"),h=document.getElementById("filter-type"),g=document.getElementById("filter-category"),b=document.getElementById("sort-by"),L=document.getElementById("search-input"),y=document.getElementById("clear-search"),E=document.getElementById("results-info"),P=document.getElementById("export-btn"),D=document.getElementById("import-btn"),C=document.getElementById("import-file");function A(){w.innerHTML="";let k=L.value.trim()?he(L.value.trim()):S();const c=Date.now();k=k.filter(l=>{let d=!0;m.value!=="all"&&(m.value==="due"?d=!l.nextReviewAt||l.nextReviewAt<=c:d=de(l)===m.value);const f=h.value==="all"||l.type===h.value,v=g.value==="all"||l.category===g.value;return d&&f&&v}),k=we(k,b.value);const i=S().length;if(L.value.trim()?(E.innerHTML=`<span class="results-count">${k.length} resultados</span> para "<strong>${L.value}</strong>"`,E.style.display="block"):k.length!==i?(E.innerHTML=`<span class="results-count">${k.length} de ${i}</span> palabras`,E.style.display="block"):E.style.display="none",k.length===0){w.innerHTML=`
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-book-open"></i></div>
          <h3>${L.value.trim()?"No se encontraron resultados":"Tu vocabulario está vacío"}</h3>
          <p>${L.value.trim()?"Intenta con otra búsqueda.":"Empieza añadiendo tu primera palabra o carga un pack de inicio para arrancar."}</p>
          
          ${L.value.trim()?"":`
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
                ${O.map(d=>`
                  <div class="pack-card" data-pack-id="${d.id}">
                    <div class="pack-check"><i class="fa-solid fa-circle-check"></i></div>
                    <div class="pack-icon"><i class="fa-solid ${d.icon}"></i></div>
                    <div class="pack-info">
                      <h4>${d.name}</h4>
                      <p>${d.description}</p>
                      <div class="pack-count"><i class="fa-solid fa-layer-group"></i> ${d.words.length} palabras</div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `}
        </div>
      `;const l=w.querySelector("#import-packs-btn");if(l){let d=new Set;const f=()=>{const v=d.size;if(l.disabled=v===0,v===0)l.textContent="Selecciona packs",l.classList.remove("active");else{let x=0;d.forEach(M=>{const $=O.find(B=>B.id===M);$&&(x+=$.words.length)}),l.innerHTML=`<i class="fa-solid fa-download"></i> Añadir ${v} pack${v>1?"s":""} (${x} palabras)`,l.classList.add("active")}};w.querySelectorAll(".pack-card").forEach(v=>{v.addEventListener("click",()=>{const x=v.dataset.packId;d.has(x)?(d.delete(x),v.classList.remove("selected")):(d.add(x),v.classList.add("selected")),f()})}),l.addEventListener("click",()=>{if(d.size!==0&&confirm(`¿Añadir ${d.size} packs a tu vocabulario?`)){let v=[];d.forEach($=>{const B=O.find(Z=>Z.id===$);B&&(v=v.concat(B.words))});const x=JSON.stringify({words:v}),M=oe(x);M.success?(I("Packs añadidos",`¡Genial! Se han añadido ${M.imported} palabras nuevas.`,"success"),_(e)):I("Error","Hubo un problema al cargar los packs.","error")}})}}else k.forEach(l=>{w.appendChild(Ae(l,A))})}m.addEventListener("change",A),h.addEventListener("change",A),g.addEventListener("change",A),b.addEventListener("change",A);let V;L.addEventListener("input",()=>{y.style.display=L.value?"flex":"none",clearTimeout(V),V=setTimeout(A,300)}),y.addEventListener("click",()=>{L.value="",y.style.display="none",A()}),P.addEventListener("click",()=>{const k=Ce(),c=new Blob([k],{type:"application/json"}),i=URL.createObjectURL(c),l=document.createElement("a");l.href=i,l.download=`emowords-backup-${new Date().toISOString().split("T")[0]}.json`,l.click(),URL.revokeObjectURL(i)}),D.addEventListener("click",()=>{C.click()}),C.addEventListener("change",k=>{const c=k.target.files[0];if(!c)return;const i=new FileReader;i.onload=l=>{const d=oe(l.target.result);d.success?(I("Importación completada",`${d.imported} palabras importadas correctamente.`,"success"),setTimeout(()=>location.reload(),1500)):I("Error de importación",d.error,"error")},i.readAsText(c)});const N=document.getElementById("goal-settings-btn");N&&N.addEventListener("click",()=>{q()});function q(){document.querySelector(".goal-settings-modal")?.remove();const k=F().dailyGoal.target,c=[5,10,15,20,30,50],i=document.createElement("div");i.className="goal-settings-modal edit-modal",i.innerHTML=`
      <div class="modal-overlay"></div>
      <div class="modal-content" style="max-width: 400px;">
        <div class="modal-header">
          <h3><i class="fa-solid fa-bullseye"></i> Meta Diaria</h3>
          <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="goal-options-grid">
          ${c.map(d=>`
            <button class="goal-option ${d===k?"active":""}" data-value="${d}">
              <span class="goal-number">${d}</span>
              <span class="goal-label">palabras</span>
            </button>
          `).join("")}
        </div>
        <div class="modal-actions" style="margin-top: 1.5rem;">
          <button type="button" class="btn-cancel">Cancelar</button>
        </div>
      </div>
    `,document.body.appendChild(i),requestAnimationFrame(()=>{i.classList.add("active")});const l=()=>{i.classList.remove("active"),setTimeout(()=>i.remove(),300)};i.querySelector(".modal-overlay").addEventListener("click",l),i.querySelector(".modal-close").addEventListener("click",l),i.querySelector(".btn-cancel").addEventListener("click",l),i.querySelectorAll(".goal-option").forEach(d=>{d.addEventListener("click",()=>{const f=parseInt(d.dataset.value);Pe(f),I("Meta actualizada",`Tu nueva meta diaria es ${f} palabras.`,"success"),l(),_(e)})}),document.addEventListener("keydown",function d(f){f.key==="Escape"&&(l(),document.removeEventListener("keydown",d))})}A()}function Me(e){return 100*Math.pow(e,2)}function Be(e,t){const a=100*Math.pow(t-1,2),r=100*Math.pow(t,2)-a,s=e-a;return Math.min(100,Math.max(0,s/r*100))}function De(e,t){return e>=t?"¡Objetivo completado!":e>=t*.75?"¡Casi lo tienes!":e>=t*.5?"¡Ya vas por la mitad!":"¡Vamos a por ello!"}function qe(e){const t=le();e.innerHTML=`
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
            <option value="connector">Conector</option>
          </select>
        </div>
        <div class="form-field">
          <label for="category">
            <i class="fa-solid fa-folder"></i> Categoría
          </label>
          <div class="category-input-wrapper">
            <input type="text" id="category" list="category-list" placeholder="Ej. Trabajo, Viajes, Emociones..." autocomplete="off" />
            <datalist id="category-list">
              ${t.map(y=>`<option value="${y}">`).join("")}
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
  `;const a=document.getElementById("add-word-form"),o=document.getElementById("image-preview"),r=document.getElementById("preview-img"),s=document.getElementById("remove-preview"),n=document.getElementById("clear-form"),u=document.getElementById("image-data"),p=document.querySelectorAll(".image-tab"),w=document.querySelectorAll(".image-tab-content"),m=document.getElementById("upload-area"),h=document.getElementById("image-file"),g=document.getElementById("image-url"),b=document.getElementById("preview-url-btn");p.forEach(y=>{y.addEventListener("click",()=>{const E=y.dataset.tab;p.forEach(P=>P.classList.remove("active")),y.classList.add("active"),w.forEach(P=>{P.classList.remove("active"),P.id===`${E}-content`&&P.classList.add("active")})})}),m.addEventListener("click",()=>{h.click()}),m.addEventListener("dragover",y=>{y.preventDefault(),m.classList.add("dragover")}),m.addEventListener("dragleave",()=>{m.classList.remove("dragover")}),m.addEventListener("drop",y=>{y.preventDefault(),m.classList.remove("dragover");const E=y.dataTransfer.files;E.length>0&&L(E[0])}),h.addEventListener("change",y=>{y.target.files.length>0&&L(y.target.files[0])});function L(y){if(!y.type.startsWith("image/")){I("Archivo inválido","Por favor selecciona un archivo de imagen.","error");return}const E=2*1024*1024;if(y.size>E){I("Imagen muy grande","La imagen debe ser menor a 2MB.","error");return}const P=new FileReader;P.onload=D=>{const C=D.target.result;r.src=C,o.style.display="block",u.value=C,m.classList.add("has-file"),I("Imagen cargada","La imagen se ha cargado correctamente.","success")},P.onerror=()=>{I("Error","No se pudo leer la imagen.","error")},P.readAsDataURL(y)}b.addEventListener("click",()=>{const y=g.value.trim();y&&(r.src=y,o.style.display="block",u.value=y,r.onerror=()=>{o.style.display="none",u.value="",I("Error de imagen","No se pudo cargar la imagen. Verifica la URL.","warning")})}),g.addEventListener("keypress",y=>{y.key==="Enter"&&(y.preventDefault(),b.click())}),s.addEventListener("click",()=>{g.value="",h.value="",u.value="",o.style.display="none",r.src="",m.classList.remove("has-file")}),n.addEventListener("click",()=>{a.reset(),o.style.display="none",r.src="",u.value="",m.classList.remove("has-file")}),a.addEventListener("submit",y=>{y.preventDefault();const E=document.getElementById("word").value.trim(),P=document.getElementById("meaning").value.trim(),D=document.getElementById("type").value,C=document.getElementById("category").value.trim(),A=document.getElementById("emotion").value.trim(),V=document.getElementById("example").value.trim(),N=u.value.trim();if(!E||!P){I("Faltan datos","Por favor completa al menos la palabra y su significado.","error");return}if(pe(E)){I("Palabra duplicada",`La palabra "${E}" ya existe en tu vocabulario.`,"error");return}const q={id:Date.now(),word:E,meaning:P,type:D,category:C||null,emotion:A,example:V,image:N,remembered:!1};ye(q),a.reset(),o.style.display="none",r.src="",u.value="",m.classList.remove("has-file"),I("¡Guardado!",`"${E}" se ha añadido correctamente.`,"success"),document.getElementById("word").focus()})}const Re="modulepreload",Ne=function(e){return"/emowords/"+e},ne={},je=function(t,a,o){let r=Promise.resolve();if(a&&a.length>0){let w=function(m){return Promise.all(m.map(h=>Promise.resolve(h).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};var n=w;document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),p=u?.nonce||u?.getAttribute("nonce");r=w(a.map(m=>{if(m=Ne(m),m in ne)return;ne[m]=!0;const h=m.endsWith(".css"),g=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${g}`))return;const b=document.createElement("link");if(b.rel=h?"stylesheet":Re,h||(b.as="script"),b.crossOrigin="",b.href=m,p&&b.setAttribute("nonce",p),document.head.appendChild(b),h)return new Promise((L,y)=>{b.addEventListener("load",L),b.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${m}`)))})}))}function s(u){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=u,window.dispatchEvent(p),!p.defaultPrevented)throw u}return r.then(u=>{for(const p of u||[])p.status==="rejected"&&s(p.reason);return t().catch(s)})};function Ge(e){let t=null,a=null,o=!1,r=[],s={correct:0,incorrect:0,xp:0},n=new Map;const u=2;r=Ie(),q(r);function p(){e.innerHTML="",t||w()}function w(){const c=r.length;e.innerHTML=`
      <h2 style="text-align: center; justify-content: center; margin-bottom: 0.5rem;">Modo de Repaso</h2>
      <p style="text-align: center; color: var(--gray-500); margin-bottom: 2rem;">
        Tienes <strong style="color: var(--primary-600);">${c}</strong> palabras pendientes
      </p>
      
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
    `,e.querySelectorAll(".mode-card").forEach(i=>{i.addEventListener("click",()=>{if(t=i.dataset.mode,console.log(`Starting mode: ${t} with queue size: ${r.length}`),r.length===0){I("Sin palabras","No hay palabras pendientes para repasar ahora.","info"),A(e);return}p(),m(),L()})})}function m(){if(e.querySelector(".review-header"))return;const c=document.createElement("div");c.className="review-header",c.innerHTML=`
       <button class="back-btn" id="exit-mode" title="Salir"><i class="fa-solid fa-arrow-left"></i></button>
       <div class="review-progress">
         <div class="progress-stat" id="stat-queue">
           <i class="fa-solid fa-book progress-icon"></i>
           <span class="val">${r.length}</span>
         </div>
         <div class="progress-stat session-correct" id="stat-correct">
           <i class="fa-solid fa-check progress-icon"></i>
           <span class="val">${s.correct}</span>
         </div>
         <div class="progress-stat" style="color: var(--warning-600); background: var(--warning-50);" id="stat-xp">
           <i class="fa-solid fa-bolt progress-icon"></i>
           <span class="val">${s.xp} XP</span>
         </div>
       </div>
     `,e.insertBefore(c,e.firstChild),document.getElementById("exit-mode").addEventListener("click",d=>{d.preventDefault(),s.correct>0||s.incorrect>0?confirm("¿Salir del modo repaso? Tu progreso se perderá.")&&g():g()});const l=document.createElement("div");l.id="active-content",l.className="review-container",e.appendChild(l)}function h(){const c=document.querySelector("#stat-queue .val"),i=document.querySelector("#stat-correct .val"),l=document.querySelector("#stat-xp .val");c&&(c.textContent=r.length),i&&(i.textContent=s.correct),l&&(l.textContent=`${s.xp} XP`)}function g(){t=null,p()}function b(){return r.shift()||null}function L(){if(!t){p();return}const c=document.getElementById("active-content");if(!c){p();return}if(a=b(),!a){A(c);return}let i=t;if(t==="mixed"){const l=["flashcard","quiz","typing","listening"];i=l[Math.floor(Math.random()*l.length)]}switch(i){case"flashcard":y(c);break;case"quiz":E(c);break;case"typing":P(c);break;case"listening":D(c);break}}function y(c){o=!1,a.reviewCount,c.innerHTML=`
      <div class="review-card" id="review-card">
        <div class="review-card-inner">
           <div class="review-meta">
              <span class="tag type-tag">${k(a.type)}</span>
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
    `,document.getElementById("review-speak-btn").addEventListener("click",v=>{v.stopPropagation(),R(a.word)});const i=document.getElementById("show-answer"),l=document.getElementById("review-answer"),d=document.getElementById("remembered-btn"),f=document.getElementById("forgotten-btn");i.addEventListener("click",()=>{o=!0,l.style.display="block",i.style.display="none",d.disabled=!1,f.disabled=!1,l.classList.add("fade-in")}),d.addEventListener("click",()=>C(!0)),f.addEventListener("click",()=>C(!1)),N(v=>{v==="Space"&&!o&&i.click(),v==="ArrowRight"&&o&&C(!0),v==="ArrowLeft"&&o&&C(!1)})}function E(c){const l=S().filter(x=>x.id!==a.id).sort(()=>.5-Math.random()).slice(0,3),d=[a,...l];q(d),c.innerHTML=`
      <div class="quiz-container">
         <div class="quiz-question">
            <h3 class="quiz-word">${a.word}</h3>
            <button class="speak-btn" id="quiz-speak-btn" style="margin: 0 auto; width: 40px; height: 40px; font-size: 1.2rem;">
                <i class="fa-solid fa-volume-high"></i>
            </button>
         </div>

         <div class="quiz-options">
            ${d.map(x=>`
                <button class="quiz-option" data-id="${x.id}">
                    ${x.meaning}
                </button>
            `).join("")}
         </div>
      </div>
    `,document.getElementById("quiz-speak-btn").addEventListener("click",()=>R(a.word));const f=c.querySelectorAll(".quiz-option");let v=!1;f.forEach(x=>{x.addEventListener("click",()=>{if(v)return;v=!0,String(x.dataset.id)===String(a.id)?(x.classList.add("correct"),setTimeout(()=>C(!0),800)):(x.classList.add("wrong"),f.forEach(B=>{String(B.dataset.id)===String(a.id)&&B.classList.add("correct")}),setTimeout(()=>C(!1),1500))})})}function P(c){c.innerHTML=`
      <div class="typing-container">
         <div class="review-card-inner" style="margin-bottom: 2rem;">
             <p style="font-size: 1.5rem; margin-bottom: 0.5rem; font-weight:700; color:var(--primary-600);">${a.meaning}</p>
             ${a.example?`<p style="font-style:italic; color:var(--gray-500)">"${a.example.replace(new RegExp(a.word,"gi"),"___")}"</p>`:""}
         </div>
         
         <input type="text" class="typing-input" id="type-input" placeholder="Escribe la palabra en inglés..." autocomplete="off">
         
         <button id="check-btn" class="add-word-btn" style="width: 100%;">Comprobar</button>
         <button id="give-up-btn" style="background:none; border:none; color:var(--gray-500); margin-top:1rem; cursor:pointer;">No lo sé</button>
      </div>
    `,setTimeout(()=>document.getElementById("type-input").focus(),100);const i=document.getElementById("type-input"),l=document.getElementById("check-btn"),d=document.getElementById("give-up-btn");function f(){i.value.trim().toLowerCase()===a.word.toLowerCase()?(i.classList.add("correct"),l.innerHTML='<i class="fa-solid fa-check"></i> Correcto',R(a.word),setTimeout(()=>C(!0),1e3)):(i.classList.add("wrong"),R("Incorrect","en-US"),setTimeout(()=>i.classList.remove("wrong"),500))}l.addEventListener("click",f),i.addEventListener("keydown",v=>{v.key==="Enter"&&f()}),d.addEventListener("click",()=>{i.value=a.word,i.classList.add("wrong"),R(a.word),setTimeout(()=>C(!1),2e3)})}function D(c){const l=S().filter($=>$.id!==a.id).sort(()=>.5-Math.random()).slice(0,3),d=[a,...l];q(d),c.innerHTML=`
      <div class="quiz-container">
         <div class="quiz-question">
            <div style="font-size: 4rem; color: var(--primary-500); cursor: pointer; margin-bottom: 1rem;" id="listen-icon">
                <i class="fa-solid fa-circle-play"></i>
            </div>
            <p style="color: var(--gray-500);">Escucha y selecciona el significado</p>
         </div>

         <div class="quiz-options">
            ${d.map($=>`
                <button class="quiz-option" data-id="${$.id}">
                    ${$.meaning}
                </button>
            `).join("")}
         </div>
      </div>
    `;const f=document.getElementById("listen-icon"),v=()=>{f.style.transform="scale(0.9)",setTimeout(()=>f.style.transform="scale(1)",150),R(a.word)};f.addEventListener("click",v),setTimeout(v,500);const x=c.querySelectorAll(".quiz-option");let M=!1;x.forEach($=>{$.addEventListener("click",()=>{if(M)return;M=!0,String($.dataset.id)===String(a.id)?($.classList.add("correct"),setTimeout(()=>C(!0),800)):($.classList.add("wrong"),x.forEach(ee=>{String(ee.dataset.id)===String(a.id)&&ee.classList.add("correct")}),setTimeout(()=>C(!1),1500))})})}function C(c){try{if(!a)return;if(Le(a.id,c),c){s.correct++,s.xp+=10;try{re(1)}catch(i){console.error(i)}n.delete(a.id)}else{s.incorrect++;const i=n.get(a.id)||0;i<u&&(n.set(a.id,i+1),r.push(a))}a=null,h(),L()}catch(i){console.error("Error in handleResult:",i)}}function A(c){try{re(0);const i=document.querySelector(".review-header");i&&(i.style.display="none");let l;try{l=F()}catch{l={streak:0,dailyGoal:{count:0,target:20}}}c.innerHTML=`
          <div class="empty-review-state">
            <div class="empty-icon" style="color: var(--success-500); animation: bounce 1s infinite;"><i class="fa-solid fa-trophy"></i></div>
            <h3>¡Sesión completada!</h3>
            <p>Has ganado <strong style="color:var(--warning-500)">${s.xp} XP</strong></p>
            
            <div class="session-summary">
                <div class="summary-stats">
                  <span class="stat correct"><i class="fa-solid fa-circle-check"></i> ${s.correct}</span>
                  <span class="stat incorrect"><i class="fa-solid fa-circle-xmark"></i> ${s.incorrect}</span>
                </div>
            </div>
            
            <div class="streak-mini" style="margin: 1.5rem 0; padding: 1rem; background: #fffbeb; border-radius: 8px; border: 1px solid #fcd34d;">
                <p style="color: #b45309; font-weight: bold;"><i class="fa-solid fa-fire"></i> Racha: ${l.streak} días</p>
                <p style="font-size: 0.9rem; color: #92400e;">Meta diaria: ${l.dailyGoal.count} / ${l.dailyGoal.target}</p>
            </div>
    
            <button class="add-word-btn" id="finish-btn">Volver al inicio</button>
          </div>
        `,window.confetti||window.canvasConfetti?(window.confetti||window.canvasConfetti)({particleCount:100,spread:70,origin:{y:.6}}):je(()=>import("./confetti.module-C2jkTI5u.js"),[]).then(f=>{const v=f.default;v({particleCount:100,spread:70,origin:{y:.6}})}).catch(f=>console.log("Confetti not found",f));const d=document.getElementById("finish-btn");d&&d.addEventListener("click",()=>{t=null;const f=document.querySelector('[data-view="home"]');f?f.click():p()})}catch(i){console.error("Error in renderSummary:",i),c.innerHTML='<p class="error">Error al mostrar resumen. <button onclick="location.reload()">Recargar</button></p>'}}let V=null;function N(c){V&&V();const i=l=>{document.getElementById("active-content")&&document.activeElement.tagName!=="INPUT"&&c(l.code)};document.addEventListener("keydown",i),V=()=>document.removeEventListener("keydown",i),window._reviewCleanup=V}function q(c){for(let i=c.length-1;i>0;i--){const l=Math.floor(Math.random()*(i+1));[c[i],c[l]]=[c[l],c[i]]}return c}function k(c){return{word:"Palabra",phrasal:"Phrasal Verb",expression:"Expresión",connector:"Conector"}[c]||"Otro"}p()}function We(e){const t=S(),a=ce();if(e.innerHTML="",e.className="stats-view animate__animated animate__fadeIn",a.total===0){ze(e);return}let o=0,r={master:0,guru:0,apprentice:0,new:0};t.forEach(m=>{const h=m.correctCount||0;h>=10?(o+=100,r.master++):h>=5?(o+=75,r.guru++):h>=2?(o+=40,r.apprentice++):(o+=10,r.new++)});const s=a.total>0?Math.round(o/a.total):0,n=He(t),u=Oe(t),p=Fe(t),w=`
    <header class="dashboard-header" style="text-align: center;">
        <div class="header-content" style="display: flex; flex-direction: column; align-items: center;">
            <h2 class="title">Centro de Estadísticas</h2>
            <p class="subtitle">Visualiza tu evolución y optimiza tu aprendizaje</p>
        </div>
        <div class="global-grade">
            <span class="grade-label">Nivel General</span>
            <span class="grade-value ${Ue(s)}">${_e(s)}</span>
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
                ${Xe(n)}
            </div>
        </div>

        <!-- Mastery Gauge -->
        <div class="kpi-card mastery">
            <div class="kpi-top">
                <div class="kpi-icon"><i class="fa-solid fa-brain"></i></div>
                <div class="kpi-content">
                    <span class="value">${s}%</span>
                    <span class="label">Dominio del Vocabulario</span>
                </div>
            </div>
            <div class="circular-progress" style="--percent: ${s}">
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
                    ${Ye(n)}
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
                        ${Je(u)}
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
                            <div class="lvl-bar"><div class="fill" style="width: ${W(r.master,a.total)}%"></div></div>
                            <span class="lvl-count">${r.master}</span>
                        </div>
                        <div class="level-item guru">
                            <span class="lvl-name">Experto (5-9)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${W(r.guru,a.total)}%"></div></div>
                            <span class="lvl-count">${r.guru}</span>
                        </div>
                        <div class="level-item apprentice">
                            <span class="lvl-name">Aprendiz (2-4)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${W(r.apprentice,a.total)}%"></div></div>
                            <span class="lvl-count">${r.apprentice}</span>
                        </div>
                        <div class="level-item new">
                            <span class="lvl-name">Nuevo (0-1)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${W(r.new,a.total)}%"></div></div>
                            <span class="lvl-count">${r.new}</span>
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
                    ${p.length>0?p.map(m=>`
                        <div class="struggling-item">
                            <div class="s-info">
                                <span class="s-word">${m.word}</span>
                                <span class="s-meaning">${m.meaning}</span>
                            </div>
                            <div class="s-metric">
                                <span class="error-badge">${m.incorrectCount} fallos</span>
                            </div>
                        </div>
                    `).join(""):'<div class="empty-state-mini">¡Todo va genial! No tienes palabras críticas.</div>'}
                </div>
                ${p.length>0?`
                   <!-- Potential future Feature: <button class="btn-secondary full-width-btn">Practicar Errores</button> -->
                `:""}
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
  `;e.innerHTML=w}function ze(e){e.innerHTML=`
        <div class="empty-stats">
            <i class="fa-solid fa-chart-simple"></i>
            <h2>Sin datos suficientes</h2>
            <p>Añade algunas palabras para empezar a ver tus estadísticas.</p>
        </div>
    `}function He(e){const t=[...e].sort((s,n)=>(s.createdAt||0)-(n.createdAt||0)),a=new Map;let o=0;t.forEach(s=>{o++;const n=new Date(s.createdAt||Date.now()).toISOString().split("T")[0];a.set(n,o)});const r=Array.from(a.entries()).map(([s,n])=>({date:s,count:n}));if(r.length>0&&r.length<2){const s=new Date(r[0].date);s.setDate(s.getDate()-1),r.unshift({date:s.toISOString().split("T")[0],count:0})}return r}function Oe(e){const t=["word","phrasal","expression","connector"],a={};return t.forEach(o=>{const r=e.filter(m=>m.type===o),s=r.length;if(s===0)return;let n=0,u=0;r.forEach(m=>{n+=m.correctCount||0,u+=m.incorrectCount||0});const p=n+u,w=p===0?0:Math.round(n/p*100);a[o]={count:s,accuracy:w}}),a}function Fe(e){return[...e].filter(t=>(t.incorrectCount||0)>0).sort((t,a)=>{const o=t.incorrectCount/(t.reviewCount||1);return a.incorrectCount/(a.reviewCount||1)-o}).slice(0,5)}function W(e,t){return t?Math.round(e/t*100):0}function _e(e){return e>=90?"S":e>=80?"A":e>=60?"B":e>=40?"C":"D"}function Ue(e){return e>=90?"text-legendary":e>=80?"text-success":e>=60?"text-primary":e>=40?"text-warning":"text-danger"}function Ye(e){if(!e||e.length===0)return"";const t=800,a=300,o=20,r=e[e.length-1].count;if(r===0)return"";const s=e.map((w,m)=>{const h=m/(e.length-1)*(t-2*o)+o,g=a-(w.count/r*(a-2*o)+o);return`${h},${g}`}).join(" "),n=o,u=t-o,p=`${n},${a} ${s} ${u},${a}`;return`
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
            <polygon points="${p}" fill="url(#chartGradient)" />
            
            <!-- Line -->
            <polyline points="${s}" fill="none" stroke="var(--primary-400)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `}function Xe(e){if(!e||e.length<2)return"";const t=100,a=40,o=e[e.length-1].count,r=e.map((s,n)=>{const u=n/(e.length-1)*t,p=a-s.count/o*a;return`${u},${p}`}).join(" ");return`
        <svg viewBox="0 0 ${t} ${a}" class="sparkline" preserveAspectRatio="none">
             <polyline points="${r}" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
    `}function Je(e){const t={word:"Palabras",phrasal:"Phrasal Verbs",expression:"Expresiones",connector:"Conectores"};return Object.entries(e).map(([a,o])=>`
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
    `).join("")}const T=document.getElementById("app");window.addEventListener("offline",()=>{I("Sin conexión","Estás trabajando en modo offline.","warning",5e3),document.body.classList.add("offline-mode")});window.addEventListener("online",()=>{I("Conexión restaurada","Tus cambios se guardarán correctamente.","success",3e3),document.body.classList.remove("offline-mode")});window.addEventListener("error",e=>{console.error("Global error:",e.error),I("Error inesperado","Ha ocurrido un error. Intenta recargar la página.","error",0)});window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason)});const ue=document.querySelectorAll(".nav-link"),H=document.getElementById("theme-toggle");function Qe(){const t=Y().theme||"dark";Q(t)}function Q(e){document.documentElement.setAttribute("data-theme",e);const t=H.querySelector("i");e==="dark"?(t.className="fa-solid fa-sun",H.title="Cambiar a modo claro"):(t.className="fa-solid fa-moon",H.title="Cambiar a modo oscuro");const a=Y();a.theme=e,Se(a)}function Ke(){const t=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.body.classList.add("theme-transitioning"),Q(t),setTimeout(()=>{document.body.classList.remove("theme-transitioning")},300)}H.addEventListener("click",Ke);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{Y().theme||Q(e.matches?"dark":"light")});function ge(){const e=document.getElementById("review-badge");if(!e)return;const t=Ee();t>0?(e.textContent=t>99?"99+":t,e.style.display="flex"):e.style.display="none"}function Ze(e){ue.forEach(t=>{t.dataset.view===e?t.classList.add("active"):t.classList.remove("active")})}function K(e){window._reviewCleanup&&(window._reviewCleanup(),window._reviewCleanup=null),Ze(e),T.style.opacity="0",T.style.transform="translateY(10px)",setTimeout(()=>{switch(e){case"home":_(T);break;case"add":qe(T);break;case"review":Ge(T);break;case"stats":We(T);break;default:T.innerHTML="<p>Vista no encontrada</p>"}window.scrollTo({top:0,left:0,behavior:"instant"}),requestAnimationFrame(()=>{T.style.opacity="1",T.style.transform="translateY(0)"}),ge()},150)}T.style.transition="opacity 0.15s ease, transform 0.15s ease";ue.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.view;K(a)})});const z=document.querySelector(".logo");z&&z.dataset.view&&z.addEventListener("click",e=>{e.preventDefault(),K(z.dataset.view)});Qe();ge();K("home");"serviceWorker"in navigator&&window.addEventListener("load",()=>{const t="/emowords/"+"sw.js";navigator.serviceWorker.register(t).then(a=>{console.log("SW registered: ",a)}).catch(a=>{console.log("SW registration failed: ",a)})});
