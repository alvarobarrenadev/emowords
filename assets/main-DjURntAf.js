(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=a(r);fetch(r.href,i)}})();const G="emowords_vocab",Q="emowords_settings";function S(){const e=localStorage.getItem(G);return e?JSON.parse(e):[]}function le(e){const t=S(),a={...e,createdAt:Date.now(),lastReviewedAt:null,reviewCount:0,correctCount:0,incorrectCount:0,nextReviewAt:Date.now(),difficulty:0};t.push(a),localStorage.setItem(G,JSON.stringify(t))}function W(e){const t=S().map(a=>a.id===e.id?e:a);localStorage.setItem(G,JSON.stringify(t))}function de(e){const t=S().filter(a=>a.id!==e);localStorage.setItem(G,JSON.stringify(t))}function pe(e){return S().find(t=>t.id===e)}function me(e){const t=S(),a=e.toLowerCase().trim();return a?t.filter(o=>o.word.toLowerCase().includes(a)||o.meaning.toLowerCase().includes(a)||o.example&&o.example.toLowerCase().includes(a)||o.emotion&&o.emotion.toLowerCase().includes(a)||o.category&&o.category.toLowerCase().includes(a)):t}function Z(){const e=S(),t=new Set;return e.forEach(a=>{a.category&&t.add(a.category)}),Array.from(t).sort()}function ue(e,t="date-desc"){const a=[...e];switch(t){case"date-asc":return a.sort((o,r)=>(o.createdAt||o.id)-(r.createdAt||r.id));case"date-desc":return a.sort((o,r)=>(r.createdAt||r.id)-(o.createdAt||o.id));case"alpha-asc":return a.sort((o,r)=>o.word.localeCompare(r.word));case"alpha-desc":return a.sort((o,r)=>r.word.localeCompare(o.word));case"review-count":return a.sort((o,r)=>(r.reviewCount||0)-(o.reviewCount||0));case"difficulty":return a.sort((o,r)=>(r.difficulty||0)-(o.difficulty||0));default:return a}}function ee(){const e=S(),t=e.length,a=e.filter(m=>m.remembered).length,o=t-a,r=e.reduce((m,h)=>m+(h.reviewCount||0),0),i=t>0?(r/t).toFixed(1):0,n={word:e.filter(m=>m.type==="word").length,phrasal:e.filter(m=>m.type==="phrasal").length,expression:e.filter(m=>m.type==="expression").length,connector:e.filter(m=>m.type==="connector").length},u=e.reduce((m,h)=>m+(h.correctCount||0),0),l=e.reduce((m,h)=>m+(h.incorrectCount||0),0),y=u+l>0?(u/(u+l)*100).toFixed(1):0,p=Date.now(),v=e.filter(m=>!m.nextReviewAt||m.nextReviewAt<=p).length;return{total:t,remembered:a,forgotten:o,totalReviews:r,averageReviews:i,byType:n,retentionRate:y,dueForReview:v}}function ge(){const e=S(),t=Date.now(),a=e.filter(l=>!l.remembered),o=e.filter(l=>l.remembered&&(!l.nextReviewAt||l.nextReviewAt<=t)),r=e.filter(l=>!l.lastReviewedAt),i=[...a,...r,...o],n=new Set,u=i.filter(l=>n.has(l.id)?!1:(n.add(l.id),!0));return u.length>0?u:e}function ye(e,t){const a=pe(e);if(a){if(a.remembered=t,a.lastReviewedAt=Date.now(),a.reviewCount=(a.reviewCount||0)+1,t){a.correctCount=(a.correctCount||0)+1,a.difficulty=Math.max(-3,(a.difficulty||0)-1);const o=1440*60*1e3,r=Math.pow(2,Math.min(a.correctCount,5));a.nextReviewAt=Date.now()+o*r}else a.incorrectCount=(a.incorrectCount||0)+1,a.difficulty=Math.min(3,(a.difficulty||0)+1),a.nextReviewAt=Date.now();return W(a),a}}function fe(){const e=S(),t={version:"1.0",exportedAt:new Date().toISOString(),wordCount:e.length,words:e};return JSON.stringify(t,null,2)}function X(e){try{const t=JSON.parse(e);if(!t.words||!Array.isArray(t.words))throw new Error("Invalid data format: missing words array");const a=S(),o=new Set(a.map(n=>n.id));let r=0,i=0;return t.words.forEach(n=>{if(!n.word||!n.meaning){i++;return}(!n.id||o.has(n.id))&&(n.id=Date.now()+Math.random()),n.type=n.type||"word",n.remembered=n.remembered||!1,n.createdAt=n.createdAt||Date.now(),a.push(n),o.add(n.id),r++}),localStorage.setItem(G,JSON.stringify(a)),{success:!0,imported:r,skipped:i}}catch(t){return{success:!1,error:t.message}}}function ae(e,t=null){const a=S(),o=e.toLowerCase().trim();return a.some(r=>r.word.toLowerCase().trim()===o&&r.id!==t)}function F(){const e=localStorage.getItem(Q);return e?JSON.parse(e):{theme:"dark",language:"es",showExampleInReview:!0,autoPlayAudio:!1}}function ve(e){localStorage.setItem(Q,JSON.stringify(e))}const te="emowords_gamification";function oe(){const e=localStorage.getItem(te);return e?JSON.parse(e):{streak:0,lastStudyDate:null,maxStreak:0,dailyGoal:{date:new Date().toLocaleDateString(),count:0,target:20},totalXp:0,level:1}}function re(e){localStorage.setItem(te,JSON.stringify(e))}function ie(){const e=oe(),t=new Date().toLocaleDateString();if(e.dailyGoal.date!==t){e.dailyGoal={date:t,count:0,target:e.dailyGoal.target||20};const a=new Date;a.setDate(a.getDate()-1),e.lastStudyDate!==a.toLocaleDateString()&&e.lastStudyDate!==t&&(e.streak>0,e.streak=0),re(e)}return e}function J(e=1){const t=oe(),a=new Date().toLocaleDateString();if(t.dailyGoal.date!==a&&(t.dailyGoal={date:a,count:0,target:20}),t.dailyGoal.count+=e,t.lastStudyDate!==a){const o=new Date;o.setDate(o.getDate()-1);const r=o.toLocaleDateString();t.lastStudyDate===r?t.streak+=1:t.streak=1,t.streak>t.maxStreak&&(t.maxStreak=t.streak),t.lastStudyDate=a}return t.totalXp+=e*10,t.level=Math.floor(Math.sqrt(t.totalXp/100))+1,re(t),t}const N=[{id:"survival-a1",name:"Survival Essentials (A1)",icon:"fa-life-ring",description:"Palabras sin las que no puedes vivir.",words:[{word:"Water",meaning:"Agua",type:"word",category:"Esencial",example:"Can I have some water, please?"},{word:"Bathroom",meaning:"Baño",type:"word",category:"Esencial",example:"Where is the bathroom?"},{word:"Wifi",meaning:"Wifi/Internet",type:"word",category:"Esencial",example:"What is the wifi password?"},{word:"Charger",meaning:"Cargador",type:"word",category:"Tecnología",example:"Do you have a phone charger?"},{word:"Password",meaning:"Contraseña",type:"word",category:"Seguridad",example:"I forgot my password."},{word:"ATM",meaning:"Cajero automático",type:"word",category:"Dinero",example:"Is there an ATM near here?"},{word:"Help",meaning:"Ayuda",type:"word",category:"Esencial",emotion:"Urgencia, necesidad"},{word:"Late",meaning:"Tarde",type:"word",category:"Tiempo",example:"Sorry I'm late."},{word:"Ready",meaning:"Listo/Preparado",type:"word",category:"Estado",example:"Are you ready?"},{word:"Bill",meaning:"Cuenta (restaurante)",type:"word",category:"Viajes",example:"Can we have the bill?"}]},{id:"digital-life-a2",name:"Digital Life (A2)",icon:"fa-mobile-screen",description:"Para moverte en apps y redes.",words:[{word:"Share",meaning:"Compartir",type:"word",category:"Redes Sociales",example:"Share this post."},{word:"Like",meaning:"Gustar / Dar like",type:"word",category:"Redes Sociales",example:"Like and subscribe."},{word:"Search",meaning:"Buscar",type:"word",category:"Internet",example:"Search on Google."},{word:"Download",meaning:"Descargar",type:"word",category:"Tecnología",example:"Download the app."},{word:"Login",meaning:"Iniciar sesión",type:"word",category:"Seguridad",example:"Login to your account."},{word:"Settings",meaning:"Ajustes/Configuración",type:"word",category:"Tecnología",example:"Check your privacy settings."},{word:"Message",meaning:"Mensaje",type:"word",category:"Comunicación",example:"Send me a message."},{word:"Profile",meaning:"Perfil",type:"word",category:"Redes Sociales",example:"Update your profile picture."},{word:"Link",meaning:"Enlace",type:"word",category:"Internet",example:"Click the link in bio."},{word:"Follow",meaning:"Seguir",type:"word",category:"Redes Sociales",example:"Follow me on Instagram."}]},{id:"daily-routine-a2",name:"Modern Routine (A2)",icon:"fa-mug-hot",description:"Tu día a día real.",words:[{word:"Coffee",meaning:"Café",type:"word",category:"Rutina",emotion:"Energía mañanera"},{word:"Gym",meaning:"Gimnasio",type:"word",category:"Estilo de vida",example:"I go to the gym after work."},{word:"Traffic",meaning:"Tráfico",type:"word",category:"Transporte",emotion:"Estrés, bocinas"},{word:"Meeting",meaning:"Reunión",type:"word",category:"Trabajo",example:"I have a Zoom meeting."},{word:"Lunch",meaning:"Almuerzo",type:"word",category:"Comida",example:"Let's grab lunch."},{word:"Tired",meaning:"Cansado",type:"word",category:"Estado",emotion:"Necesito dormir"},{word:"Weekend",meaning:"Fin de semana",type:"word",category:"Tiempo",emotion:"Libertad, descanso"},{word:"Watch",meaning:"Mirar (pantallas)",type:"word",category:"Ocio",example:"Watch Netflix."},{word:"Cook",meaning:"Cocinar",type:"word",category:"Casa",example:"I don't like to cook."},{word:"Clean",meaning:"Limpiar",type:"word",category:"Casa",example:"Clean your room."}]},{id:"cool-slang-a2",name:"Basic Slang (A1/A2)",icon:"fa-bolt",description:"Palabras que oyes en series y YouTube.",words:[{word:"Cool",meaning:"Genial/Guay",type:"word",category:"Slang",example:"That car is so cool."},{word:"Dude",meaning:"Tío/Colega",type:"word",category:"Slang",example:"Hey dude, what's up?"},{word:"Chill",meaning:"Relajado/Tranquilo",type:"word",category:"Slang",example:"Just chill out."},{word:"No way",meaning:"Ni de broma / No me digas",type:"expression",category:"Slang",emotion:"Sorpresa total"},{word:"Awesome",meaning:"Impresionante",type:"word",category:"Slang",example:"The movie was awesome."},{word:"Weird",meaning:"Raro",type:"word",category:"Adjetivos",example:"That guy is weird."},{word:"Guys",meaning:"Chicos/Gente",type:"word",category:"Slang",example:"Hi guys!"},{word:"Stuff",meaning:"Cosas",type:"word",category:"General",example:"I have a lot of stuff to do."},{word:"Sucks",meaning:"Apesta (es malo)",type:"word",category:"Slang",example:"This weather sucks."},{word:"Whatever",meaning:"Lo que sea / Me da igual",type:"word",category:"Slang",emotion:"Indiferencia"}]},{id:"travel-smart-a2",name:"Smart Travel (A2)",icon:"fa-plane-departure",description:"Viajar hoy en día.",words:[{word:"Booking",meaning:"Reserva",type:"word",category:"Viajes",example:"I made a booking online."},{word:"Review",meaning:"Reseña/Opinión",type:"word",category:"Internet",example:"Check the reviews first."},{word:"Location",meaning:"Ubicación",type:"word",category:"Viajes",example:"Send me your location."},{word:"Ticket",meaning:"Entrada/Billete",type:"word",category:"Viajes",example:"Digital ticket."},{word:"Delay",meaning:"Retraso",type:"word",category:"Viajes",emotion:"Espera en aeropuerto"},{word:"Subway",meaning:"Metro",type:"word",category:"Transporte",example:"Take the subway."},{word:"Cheap",meaning:"Barato",type:"word",category:"Dinero",example:"It is very cheap."},{word:"Safe",meaning:"Seguro",type:"word",category:"Seguridad",example:"Is this area safe?"},{word:"Trip",meaning:"Viaje (corto)",type:"word",category:"Viajes",example:"Have a nice trip."},{word:"Bag",meaning:"Bolsa/Maleta",type:"word",category:"Viajes",example:"Pack your bags."}]},{id:"remote-work-b1",name:"Remote Work (B1)",icon:"fa-laptop-house",description:"Inglés para trabajar desde casa o la oficina.",words:[{word:"Schedule",meaning:"Horario/Agendar",type:"word",category:"Trabajo",example:"Let's schedule a call."},{word:"Deadline",meaning:"Fecha límite",type:"word",category:"Trabajo",emotion:"Reloj tic-tac, entrega"},{word:"Feedback",meaning:"Opinión/Corrección",type:"word",category:"Trabajo",example:"Thanks for the feedback."},{word:"Screen",meaning:"Pantalla",type:"word",category:"Tecnología",example:"Can you see my screen?"},{word:"Update",meaning:"Poner al día/Actualizar",type:"word",category:"Trabajo",example:"Give me an update."},{word:"Bug",meaning:"Error (informático)",type:"word",category:"Tecnología",example:"There is a bug in the system."},{word:"Team",meaning:"Equipo",type:"word",category:"Trabajo",example:"Great team work."},{word:"Break",meaning:"Descanso",type:"word",category:"Trabajo",emotion:"Café, relax 5 min"},{word:"Task",meaning:"Tarea",type:"word",category:"Trabajo",example:"Focus on this task."},{word:"Support",meaning:"Soporte/Apoyo",type:"word",category:"Trabajo",example:"Contact tech support."}]},{id:"phrasals-must-b1",name:"Must-Know Phrasals (B1)",icon:"fa-star",description:"Los 10 phrasal verbs que USAS cada día.",words:[{word:"Pick up",meaning:"Recoger/Contestar",type:"word",category:"Phrasal Verbs",example:"Pick up the phone."},{word:"Find out",meaning:"Descubrir/Enterarse",type:"word",category:"Phrasal Verbs",emotion:"Luz, información nueva"},{word:"Give up",meaning:"Rendirse/Dejar (hábito)",type:"word",category:"Phrasal Verbs",example:"Don't give up."},{word:"Go on",meaning:"Continuar/Suceder",type:"word",category:"Phrasal Verbs",example:"What is going on?"},{word:"Come back",meaning:"Volver",type:"word",category:"Phrasal Verbs",example:"Come back here."},{word:"Turn on",meaning:"Encender",type:"word",category:"Phrasal Verbs",example:"Turn on the TV."},{word:"Wake up",meaning:"Despertarse",type:"word",category:"Phrasal Verbs",emotion:"Ojos abiertos, mañana"},{word:"Log in",meaning:"Entrar (web)",type:"word",category:"Phrasal Verbs",example:"Log in with your email."},{word:"Set up",meaning:"Configurar/Montar",type:"word",category:"Phrasal Verbs",example:"Set up the wifi."},{word:"Work out",meaning:"Hacer ejercicio / Funcionar",type:"word",category:"Phrasal Verbs",example:"I work out every day."}]},{id:"streaming-b1",name:"Streaming & Media (B1)",icon:"fa-play",description:"Vocabulario de Netflix, YouTube y Podcasts.",words:[{word:"Episode",meaning:"Episodio",type:"word",category:"Ocio",example:"Last episode was crazy."},{word:"Season",meaning:"Temporada",type:"word",category:"Ocio",example:"Waiting for season 2."},{word:"Spoiler",meaning:"Destripe",type:"word",category:"Ocio",emotion:"Arruinar la sorpresa"},{word:"Trending",meaning:"Tendencia",type:"word",category:"Redes Sociales",example:"It is trending on Twitter."},{word:"Skip",meaning:"Saltar (intro/anuncio)",type:"word",category:"Acción",example:"Skip intro."},{word:"Subscribe",meaning:"Suscribirse",type:"word",category:"Internet",example:"Subscribe for more."},{word:"Content",meaning:"Contenido",type:"word",category:"Internet",example:"Creator of content."},{word:"Ad/Advertisement",meaning:"Anuncio",type:"word",category:"Marketing",example:"Too many ads."},{word:"Stream",meaning:"Retransmitir",type:"word",category:"Internet",example:"Live stream."},{word:"Host",meaning:"Anfitrión/Presentador",type:"word",category:"Personas",example:"The podcast host."}]},{id:"dating-social-b1",name:"Dating & Social (B1)",icon:"fa-heart",description:"Relaciones modernas y vida social.",words:[{word:"Date",meaning:"Cita (romántica)",type:"word",category:"Relaciones",example:"I have a date tonight."},{word:"Hang out",meaning:"Pasar el rato",type:"word",category:"Social",example:"Let's hang out later."},{word:"Single",meaning:"Soltero/a",type:"word",category:"Relaciones",example:"Are you single?"},{word:"Break up",meaning:"Romper (relación)",type:"word",category:"Phrasal Verbs",emotion:"Corazón roto"},{word:"Ex",meaning:"Ex pareja",type:"word",category:"Relaciones",example:"Don't text your ex."},{word:"Couple",meaning:"Pareja",type:"word",category:"Relaciones",example:"Cute couple."},{word:"Ghosting",meaning:"Desaparecer (ignorar)",type:"word",category:"Slang",emotion:"Silencio, visto"},{word:"Crush",meaning:"Amor platónico",type:"word",category:"Slang",emotion:"Mariposas, ilusión"},{word:"Friendzone",meaning:"Zona de amigos",type:"word",category:"Slang",example:"I am in the friendzone."},{word:"Cheat",meaning:"Engañar (infiel)",type:"word",category:"Relaciones",emotion:"Mentira, traición"}]},{id:"fitness-health-b1",name:"Fitness Lifestyle (B1)",icon:"fa-dumbbell",description:"Cuerpo sano, mente sana.",words:[{word:"Workout",meaning:"Entrenamiento",type:"word",category:"Deporte",example:"Good workout today."},{word:"Healthy",meaning:"Saludable",type:"word",category:"Salud",example:"Eat healthy food."},{word:"Muscle",meaning:"Músculo",type:"word",category:"Cuerpo",example:"Build muscle."},{word:"Weight",meaning:"Peso",type:"word",category:"Salud",example:"Lose weight."},{word:"Tired",meaning:"Cansado",type:"word",category:"Estado",emotion:"Sin energía"},{word:"Shape",meaning:"Forma física",type:"word",category:"Salud",example:"Get in shape."},{word:"Stretch",meaning:"Estirar",type:"word",category:"Deporte",example:"Stretch after ranning."},{word:"Injured",meaning:"Lesionado",type:"word",category:"Salud",emotion:"Dolor, vendaje"},{word:"Laziness",meaning:"Pereza",type:"word",category:"Estado",emotion:"Sofá, no hacer nada"},{word:"Goal",meaning:"Meta/Objetivo",type:"word",category:"Motivación",example:"Fitness goals."}]},{id:"speaking-connectors-b2",name:"Speaking Flow (B2)",icon:"fa-comments",description:"Conectores para no quedarte callado pensando.",words:[{word:"Actually",meaning:"En realidad / De hecho",type:"connector",category:"Speaking",example:"Actually, I don't know."},{word:"Basically",meaning:"Básicamente",type:"connector",category:"Speaking",example:"Basically, it's done."},{word:"Anyway",meaning:"En fin / De todas formas",type:"connector",category:"Speaking",example:"Anyway, let's go."},{word:"Literally",meaning:"Literalmente",type:"connector",category:"Speaking",example:"I was literally dying."},{word:"Though",meaning:"Aunque (al final)",type:"connector",category:"Speaking",example:"Thanks, though."},{word:"I mean",meaning:"O sea / Quiero decir",type:"connector",category:"Speaking",example:"I mean, it's okay."},{word:"On the other hand",meaning:"Por otro lado",type:"connector",category:"Speaking",emotion:"Balanza, otra opción"},{word:"Whatever",meaning:"Lo que sea",type:"connector",category:"Speaking",example:"Do whatever you want."},{word:"Meaning",meaning:"Es decir",type:"connector",category:"Speaking",example:"It's red, meaning stop."},{word:"Hopefully",meaning:"Ojalá / Con suerte",type:"connector",category:"Speaking",emotion:"Esperanza, dedos cruzados"}]},{id:"startup-tech-b2",name:"Startup & Tech (B2)",icon:"fa-rocket",description:"Lenguaje de negocios modernos y startups.",words:[{word:"Pitch",meaning:"Presentación breve",type:"word",category:"Business",example:"Sales pitch."},{word:"Founder",meaning:"Fundador",type:"word",category:"Business",example:"The founder of Amazon."},{word:"Launch",meaning:"Lanzar (producto)",type:"word",category:"Business",emotion:"Cohete, inicio"},{word:"Growth",meaning:"Crecimiento",type:"word",category:"Business",emotion:"Gráfica subiendo"},{word:"Remote",meaning:"Remoto",type:"word",category:"Trabajo",example:"Remote job."},{word:"Skill",meaning:"Habilidad",type:"word",category:"Trabajo",example:"Soft skills."},{word:"Data",meaning:"Datos",type:"word",category:"Tecnología",example:"Big data."},{word:"User",meaning:"Usuario",type:"word",category:"Tecnología",example:"User experience (UX)."},{word:"Networking",meaning:"Hacer contactos",type:"word",category:"Business",emotion:"Conexiones, café"},{word:"Value",meaning:"Valor",type:"word",category:"Business",example:"Add value."}]},{id:"phrasals-native-b2",name:"Sounding Native (B2)",icon:"fa-microphone",description:"Phrasal verbs para dejar de sonar como un libro.",words:[{word:"Figure out",meaning:"Resolver / Entender",type:"word",category:"Phrasal Verbs",example:"I will figure it out."},{word:"Run out of",meaning:"Quedarse sin",type:"word",category:"Phrasal Verbs",example:"We ran out of coffee."},{word:"Show up",meaning:"Aparecer (llegar)",type:"word",category:"Phrasal Verbs",example:"He didn't show up."},{word:"Get along",meaning:"Llevarse bien",type:"word",category:"Phrasal Verbs",emotion:"Amigos, sin peleas"},{word:"Freak out",meaning:"Entrar en pánico / Flipar",type:"word",category:"Phrasal Verbs",emotion:"Grito, locura"},{word:"Hang on",meaning:"Esperar un momento",type:"word",category:"Phrasal Verbs",example:"Hang on a second."},{word:"Mess up",meaning:"Estropear / Cagarla",type:"word",category:"Phrasal Verbs",example:"I messed up the exam."},{word:"Catch up",meaning:"Ponerse al día",type:"word",category:"Phrasal Verbs",example:"Let's catch up soon."},{word:"Chill out",meaning:"Relajarse",type:"word",category:"Phrasal Verbs",emotion:"Sofá, calma"},{word:"Check out",meaning:"Echar un vistazo",type:"word",category:"Phrasal Verbs",example:"Check out this video."}]},{id:"emotions-deep-b2",name:"Deep Emotions (B2)",icon:"fa-masks-theater",description:"Para expresar cómo te sientes de verdad.",words:[{word:"Overwhelmed",meaning:"Abrumado/Agobiado",type:"word",category:"Emociones",emotion:"Demasiadas cosas, peso"},{word:"Relieved",meaning:"Aliviado",type:"word",category:"Emociones",emotion:"Suspiro, peso fuera"},{word:"Awkward",meaning:"Incómodo (situación)",type:"word",category:"Emociones",emotion:"Silencio, tierra trágame"},{word:"Proud",meaning:"Orgulloso",type:"word",category:"Emociones",emotion:"Pecho inflado"},{word:"Disappointed",meaning:"Decepcionado",type:"word",category:"Emociones",emotion:"Expectativa rota"},{word:"Annoying",meaning:"Molesto",type:"word",category:"Adjetivos",example:"He is so annoying."},{word:"Grateful",meaning:"Agradecido",type:"word",category:"Emociones",emotion:"Gracias, plenitud"},{word:"Upset",meaning:"Disgustado/Molesto",type:"word",category:"Emociones",emotion:"Triste y enfadado"},{word:"Excited",meaning:"Emocionado",type:"word",category:"Emociones",emotion:"Energía, ganas"},{word:"Mood",meaning:'Estado de ánimo / "Yo total"',type:"word",category:"Slang",example:"Big mood."}]},{id:"debating-b2",name:"Winning Debates (B2)",icon:"fa-gavel",description:"Para dar tu opinión y tener razón.",words:[{word:"Agree",meaning:"Estar de acuerdo",type:"word",category:"Opinión",example:"I totally agree."},{word:"Disagree",meaning:"No estar de acuerdo",type:"word",category:"Opinión",example:"I respectfully disagree."},{word:"Depend",meaning:"Depender",type:"word",category:"Opinión",example:"It depends on the price."},{word:"Point",meaning:"Punto/Argumento",type:"word",category:"Opinión",example:"That is a good point."},{word:"Sense",meaning:"Sentido",type:"word",category:"Opinión",example:"That makes no sense."},{word:"Guess",meaning:"Suponer/Adivinar",type:"word",category:"Opinión",example:"I guess you are right."},{word:"Sure",meaning:"Seguro",type:"word",category:"Certeza",example:"Are you sure?"},{word:"Notice",meaning:"Notar/Darse cuenta",type:"word",category:"Percepción",example:"Did you notice that?"},{word:"Advice",meaning:"Consejo",type:"word",category:"Ayuda",example:"Give me some advice."},{word:"Fair",meaning:"Justo",type:"word",category:"Justicia",example:"That is not fair."}]},{id:"mindset-c1",name:"Growth Mindset (C1)",icon:"fa-brain",description:"Palabras para desarrollo personal y éxito.",words:[{word:"Mindset",meaning:"Mentalidad",type:"word",category:"Psicología",example:"Change your mindset."},{word:"Challenge",meaning:"Desafío/Reto",type:"word",category:"Desarrollo",emotion:"Montaña a escalar"},{word:"Achieve",meaning:"Lograr/Conseguir",type:"word",category:"Éxito",emotion:"Meta cruzada"},{word:"Failure",meaning:"Fracaso",type:"word",category:"Aprendizaje",emotion:"Caída, lección"},{word:"Improve",meaning:"Mejorar",type:"word",category:"Desarrollo",example:"Improve yourself."},{word:"Habit",meaning:"Hábito",type:"word",category:"Rutina",example:"Good habits."},{word:"Focus",meaning:"Enfoque/Concentración",type:"word",category:"Productividad",emotion:"Láser"},{word:"Aware",meaning:"Consciente",type:"word",category:"Mente",example:"Be aware of your thoughts."},{word:"Purpose",meaning:"Propósito",type:"word",category:"Vida",emotion:"Brújula, razón de ser"},{word:"Struggle",meaning:"Lucha/Esfuerzo costoso",type:"word",category:"Vida",emotion:"Cuesta arriba"}]},{id:"pro-connectors-c1",name:"Smart Connectors (C1)",icon:"fa-link",description:"Para conectar ideas como un intelectual.",words:[{word:"However",meaning:"Sin embargo",type:"connector",category:"Escritura",example:"Cheap. However, bad quality."},{word:"Therefore",meaning:"Por lo tanto",type:"connector",category:"Escritura",example:"I think, therefore I am."},{word:"Although",meaning:"Aunque",type:"connector",category:"Escritura",example:"Although it rained..."},{word:"Instead",meaning:"En su lugar",type:"connector",category:"Escritura",example:"Do this instead."},{word:"Unless",meaning:"A menos que",type:"connector",category:"Condición",example:"Don't call unless it's urgent."},{word:"Meanwhile",meaning:"Mientras tanto",type:"connector",category:"Tiempo",example:"Meanwhile, in London..."},{word:"Despite",meaning:"A pesar de",type:"connector",category:"Contraste",example:"Despite the weather."},{word:"Eventually",meaning:"Finalmente (tras tiempo)",type:"connector",category:"Tiempo",emotion:"Al final de todo"},{word:"Overall",meaning:"En general / Globalmente",type:"connector",category:"Resumen",example:"Overall, it was good."},{word:"Apparently",meaning:"Al parecer / Por lo visto",type:"connector",category:"Duda",example:"Apparently, he left."}]},{id:"news-media-c1",name:"News & Media (C1)",icon:"fa-newspaper",description:"Para entender lo que pasa en el mundo.",words:[{word:"Issue",meaning:"Asunto/Problema clave",type:"word",category:"Actualidad",example:"Global issues."},{word:"Source",meaning:"Fuente (info)",type:"word",category:"Periodismo",example:"Check your sources."},{word:"Claim",meaning:"Afirmar/Reclamar",type:"word",category:"Verbos",example:"He claims to be innocent."},{word:"Report",meaning:"Informe/Informar",type:"word",category:"Business",example:"Read the report."},{word:"Statement",meaning:"Declaración",type:"word",category:"Legal",example:"Official statement."},{word:"Threat",meaning:"Amenaza",type:"word",category:"Seguridad",emotion:"Peligro inminente"},{word:"Crisis",meaning:"Crisis",type:"word",category:"Actualidad",example:"Economic crisis."},{word:"Policy",meaning:"Política/Normativa",type:"word",category:"Gobierno",example:"Privacy policy."},{word:"Strike",meaning:"Huelga / Golpe",type:"word",category:"Actualidad",example:"Workers on strike."},{word:"Trend",meaning:"Tendencia",type:"word",category:"Actualidad",example:"Market trends."}]},{id:"abstract-feelings-c1",name:"Complex & Abstract (C1)",icon:"fa-cloud-moon",description:"Para describir sensaciones difíciles.",words:[{word:"Nostalgia",meaning:"Nostalgia",type:"word",category:"Sentimientos",emotion:"Dolor y amor al pasado"},{word:"Vibe",meaning:"Vibra / Ambiente",type:"word",category:"Slang",emotion:"Energía del lugar"},{word:"Gut feeling",meaning:"Corazonada / Instinto",type:"expression",category:"Instinto",emotion:"Estómago avisando"},{word:"Burnout",meaning:"Agotamiento extremo",type:"word",category:"Salud",emotion:"Batería muerta, cenizas"},{word:"Hype",meaning:"Expectación exagerada",type:"word",category:"Slang",emotion:"Ruido, marketing"},{word:"Red flag",meaning:"Señal de alerta",type:"expression",category:"Slang",emotion:"Bandera roja, peligro"},{word:"Cringe",meaning:"Vergüenza ajena",type:"word",category:"Slang",emotion:"Escalofrío, arrugarse"},{word:"FOMO",meaning:"Miedo a perderse algo",type:"word",category:"Acronimo",emotion:"Ansiedad social"},{word:"Mood swing",meaning:"Cambio de humor",type:"expression",category:"Psicología",emotion:"Montaña rusa"},{word:"Comfort zone",meaning:"Zona de confort",type:"expression",category:"Desarrollo",emotion:"Sofá seguro"}]},{id:"idioms-useful-c1",name:"Real Idioms (C1)",icon:"fa-comment-dots",description:"Expresiones que SÍ se usan.",words:[{word:"Piece of cake",meaning:"Pan comido (muy fácil)",type:"expression",category:"Idioms",example:"The test was a piece of cake."},{word:"Break a leg",meaning:"Mucha mierda (suerte)",type:"expression",category:"Idioms",example:"Go on stage and break a leg."},{word:"Call it a day",meaning:"Dar por terminado (trabajo)",type:"expression",category:"Idioms",emotion:"Cerrar portátil"},{word:"So far so good",meaning:"Hasta ahora todo bien",type:"expression",category:"Idioms",example:"How is it going? So far so good."},{word:"Make sense",meaning:"Tener sentido",type:"expression",category:"Común",example:"It makes sense."},{word:"Keep in touch",meaning:"Mantenerse en contacto",type:"expression",category:"Social",example:"Let's keep in touch."},{word:"Take it easy",meaning:"Tomárselo con calma",type:"expression",category:"Consejo",emotion:"Relax"},{word:"Better safe than sorry",meaning:"Mejor prevenir que curar",type:"expression",category:"Consejo",emotion:"Casco, seguro"},{word:"Long story short",meaning:"Resumiendo",type:"expression",category:"Speaking",emotion:"Tijeras al relato"},{word:"Get used to",meaning:"Acostumbrarse",type:"expression",category:"Hábito",example:"I got used to the cold."}]}],K="toast-container";function we(){let e=document.getElementById(K);return e||(e=document.createElement("div"),e.id=K,e.className="toast-container",document.body.appendChild(e)),e}function C(e,t,a="info",o=4e3){const r=we(),i=document.createElement("div"),n={info:"fa-circle-info",success:"fa-circle-check",warning:"fa-triangle-exclamation",error:"fa-circle-xmark"};i.className=`toast ${a}`,i.innerHTML=`
    <i class="fa-solid ${n[a]||"fa-bell"}"></i>
    <div class="toast-content">
      <span class="toast-title">${e}</span>
      <span class="toast-message">${t}</span>
    </div>
  `,r.appendChild(i),o>0&&setTimeout(()=>{i.classList.add("removing"),i.addEventListener("animationend",()=>{i.remove(),r.children.length===0&&r.remove()})},o)}function D(e,t="en-US",a=1){if(!("speechSynthesis"in window)){C("Error","Tu navegador no soporta síntesis de voz.","error");return}window.speechSynthesis.cancel();const o=new SpeechSynthesisUtterance(e);o.lang=t,o.rate=a;const i=window.speechSynthesis.getVoices().find(n=>n.lang===t&&(n.name.includes("Google")||n.name.includes("Premium")));i&&(o.voice=i),o.onerror=n=>{console.error("TTS Error:",n),C("Error","No se pudo reproducir el audio.","error")},window.speechSynthesis.speak(o)}function he(e,t){const a=document.createElement("div");a.className="word-card",a.dataset.wordId=e.id;const o=e.reviewCount||0,r=e.createdAt?new Date(e.createdAt).toLocaleDateString():"";return a.innerHTML=`
    ${e.image?`<img src="${e.image}" alt="${e.word}" class="word-image" />`:""}

    <div class="tags">
      <span class="tag type-tag type-${e.type}">${xe(e.type)}</span>
      <span class="tag ${e.remembered?"remembered":"forgotten"}">
        <i class="fa-solid ${e.remembered?"fa-check":"fa-rotate"}"></i>
        ${e.remembered?"Recordada":"Olvidada"}
      </span>
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
  `,a.querySelector(".speak-btn").addEventListener("click",i=>{i.stopPropagation(),D(e.word)}),a.querySelector(".toggle").addEventListener("click",()=>{e.remembered=!e.remembered,W(e),t()}),a.querySelector(".delete").addEventListener("click",()=>{confirm(`¿Eliminar "${e.word}"?`)&&(de(e.id),t())}),a.querySelector(".edit-btn").addEventListener("click",()=>{be(e,t)}),a}function be(e,t){document.querySelector(".edit-modal")?.remove();const a=document.createElement("div");a.className="edit-modal",a.innerHTML=`
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
  `,document.body.appendChild(a),requestAnimationFrame(()=>{a.classList.add("active")});const o=()=>{a.classList.remove("active"),setTimeout(()=>a.remove(),300)};a.querySelector(".modal-overlay").addEventListener("click",o),a.querySelector(".modal-close").addEventListener("click",o),a.querySelector(".btn-cancel").addEventListener("click",o),a.querySelector(".edit-form").addEventListener("submit",r=>{r.preventDefault();const i=document.getElementById("edit-word").value.trim(),n=a.querySelector(".edit-feedback");if(ae(i,e.id)){n.textContent=`La palabra "${i}" ya existe.`,n.style.display="block";return}e.word=i,e.meaning=document.getElementById("edit-meaning").value.trim(),e.type=document.getElementById("edit-type").value,e.category=document.getElementById("edit-category").value.trim()||null,e.emotion=document.getElementById("edit-emotion").value.trim(),e.example=document.getElementById("edit-example").value.trim(),e.image=document.getElementById("edit-image").value.trim(),W(e),o(),t()}),document.addEventListener("keydown",function r(i){i.key==="Escape"&&(o(),document.removeEventListener("keydown",r))})}function j(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function xe(e){switch(e){case"word":return'<i class="fa-solid fa-font"></i> Palabra';case"phrasal":return'<i class="fa-solid fa-link"></i> Phrasal Verb';case"expression":return'<i class="fa-solid fa-comment"></i> Expresión';case"connector":return'<i class="fa-solid fa-arrows-left-right"></i> Conector';default:return'<i class="fa-solid fa-file"></i> Otro'}}function ne(e){const t=ee(),a=Z(),o=ie(),r=24,i=2*Math.PI*r,n=Math.min(o.dailyGoal.count/o.dailyGoal.target,1),u=i-n*i,l=t.total>0;e.innerHTML=`
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
                 <div class="xp-bar" style="width: ${Ee(o.totalXp,o.level)}%"></div>
              </div>
              <div class="xp-meta">
                 <span>${o.totalXp} XP Totales</span>
                 <span>Siguiente: ${ke(o.level)} XP</span>
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
          <div class="stat-content">
             <span class="stat-value">${o.dailyGoal.count}<span class="separator">/</span>${o.dailyGoal.target}</span>
             <span class="stat-label">Meta Diaria</span>
             <span class="goal-msg-sm">${Se(o.dailyGoal.count,o.dailyGoal.target)}</span>
          </div>
          <div class="progress-ring-mini">
             <svg width="60" height="60">
              <circle class="bg" stroke-width="4" fill="transparent" r="${r}" cx="30" cy="30" />
              <circle class="fg" stroke-width="4" fill="transparent" r="${r}" cx="30" cy="30" 
                style="stroke-dasharray: ${i}; stroke-dashoffset: ${u};" />
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
        <i class="fa-solid fa-sliders filter-icon"></i>
        <select id="filter-status">
          <option value="all">Todas</option>
          <option value="remembered">Recordadas</option>
          <option value="forgotten">Olvidadas</option>
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
          ${a.map(x=>`<option value="${x}">${x}</option>`).join("")}
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
  `;const y=document.getElementById("word-list"),p=document.getElementById("filter-status"),v=document.getElementById("filter-type"),m=document.getElementById("filter-category"),h=document.getElementById("sort-by"),k=document.getElementById("search-input"),P=document.getElementById("clear-search"),M=document.getElementById("results-info"),R=document.getElementById("export-btn"),O=document.getElementById("import-btn"),L=document.getElementById("import-file");function T(){y.innerHTML="";let x=k.value.trim()?me(k.value.trim()):S();x=x.filter(w=>{const s=p.value==="all"||p.value==="remembered"&&w.remembered||p.value==="forgotten"&&!w.remembered,c=v.value==="all"||w.type===v.value,d=m.value==="all"||w.category===m.value;return s&&c&&d}),x=ue(x,h.value);const $=S().length;if(k.value.trim()?(M.innerHTML=`<span class="results-count">${x.length} resultados</span> para "<strong>${k.value}</strong>"`,M.style.display="block"):x.length!==$?(M.innerHTML=`<span class="results-count">${x.length} de ${$}</span> palabras`,M.style.display="block"):M.style.display="none",x.length===0){y.innerHTML=`
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-book-open"></i></div>
          <h3>${k.value.trim()?"No se encontraron resultados":"Tu vocabulario está vacío"}</h3>
          <p>${k.value.trim()?"Intenta con otra búsqueda.":"Empieza añadiendo tu primera palabra o carga un pack de inicio para arrancar."}</p>
          
          ${k.value.trim()?"":`
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
                ${N.map(s=>`
                  <div class="pack-card" data-pack-id="${s.id}">
                    <div class="pack-check"><i class="fa-solid fa-circle-check"></i></div>
                    <div class="pack-icon"><i class="fa-solid ${s.icon}"></i></div>
                    <div class="pack-info">
                      <h4>${s.name}</h4>
                      <p>${s.description}</p>
                      <div class="pack-count"><i class="fa-solid fa-layer-group"></i> ${s.words.length} palabras</div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `}
        </div>
      `;const w=y.querySelector("#import-packs-btn");if(w){let s=new Set;const c=()=>{const d=s.size;if(w.disabled=d===0,d===0)w.textContent="Selecciona packs",w.classList.remove("active");else{let f=0;s.forEach(g=>{const b=N.find(E=>E.id===g);b&&(f+=b.words.length)}),w.innerHTML=`<i class="fa-solid fa-download"></i> Añadir ${d} pack${d>1?"s":""} (${f} palabras)`,w.classList.add("active")}};y.querySelectorAll(".pack-card").forEach(d=>{d.addEventListener("click",()=>{const f=d.dataset.packId;s.has(f)?(s.delete(f),d.classList.remove("selected")):(s.add(f),d.classList.add("selected")),c()})}),w.addEventListener("click",()=>{if(s.size!==0&&confirm(`¿Añadir ${s.size} packs a tu vocabulario?`)){let d=[];s.forEach(b=>{const E=N.find(q=>q.id===b);E&&(d=d.concat(E.words))});const f=JSON.stringify({words:d}),g=X(f);g.success?(C("Packs añadidos",`¡Genial! Se han añadido ${g.imported} palabras nuevas.`,"success"),ne(e)):C("Error","Hubo un problema al cargar los packs.","error")}})}}else x.forEach(w=>{y.appendChild(he(w,T))})}p.addEventListener("change",T),v.addEventListener("change",T),m.addEventListener("change",T),h.addEventListener("change",T);let B;k.addEventListener("input",()=>{P.style.display=k.value?"flex":"none",clearTimeout(B),B=setTimeout(T,300)}),P.addEventListener("click",()=>{k.value="",P.style.display="none",T()}),R.addEventListener("click",()=>{const x=fe(),$=new Blob([x],{type:"application/json"}),w=URL.createObjectURL($),s=document.createElement("a");s.href=w,s.download=`emowords-backup-${new Date().toISOString().split("T")[0]}.json`,s.click(),URL.revokeObjectURL(w)}),O.addEventListener("click",()=>{L.click()}),L.addEventListener("change",x=>{const $=x.target.files[0];if(!$)return;const w=new FileReader;w.onload=s=>{const c=X(s.target.result);c.success?(C("Importación completada",`${c.imported} palabras importadas correctamente.`,"success"),setTimeout(()=>location.reload(),1500)):C("Error de importación",c.error,"error")},w.readAsText($)}),T()}function ke(e){return 100*Math.pow(e,2)}function Ee(e,t){const a=100*Math.pow(t-1,2),r=100*Math.pow(t,2)-a,i=e-a;return Math.min(100,Math.max(0,i/r*100))}function Se(e,t){return e>=t?"¡Objetivo completado!":e>=t*.75?"¡Casi lo tienes!":e>=t*.5?"¡Ya vas por la mitad!":"¡Vamos a por ello!"}function Ce(e){const t=Z();e.innerHTML=`
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
  `;const a=document.getElementById("add-word-form"),o=document.getElementById("image"),r=document.getElementById("preview-image-btn"),i=document.getElementById("image-preview"),n=document.getElementById("preview-img"),u=document.getElementById("remove-preview"),l=document.getElementById("clear-form");r.addEventListener("click",()=>{const y=o.value.trim();y&&(n.src=y,i.style.display="block",n.onerror=()=>{i.style.display="none",C("Error de imagen","No se pudo cargar la imagen. Verifica la URL.","warning")})}),u.addEventListener("click",()=>{o.value="",i.style.display="none",n.src=""}),l.addEventListener("click",()=>{a.reset(),i.style.display="none",n.src=""}),a.addEventListener("submit",y=>{y.preventDefault();const p=document.getElementById("word").value.trim(),v=document.getElementById("meaning").value.trim(),m=document.getElementById("type").value,h=document.getElementById("category").value.trim(),k=document.getElementById("emotion").value.trim(),P=document.getElementById("example").value.trim(),M=document.getElementById("image").value.trim();if(!p||!v){C("Faltan datos","Por favor completa al menos la palabra y su significado.","error");return}if(ae(p)){C("Palabra duplicada",`La palabra "${p}" ya existe en tu vocabulario.`,"error");return}const R={id:Date.now(),word:p,meaning:v,type:m,category:h||null,emotion:k,example:P,image:M,remembered:!1};le(R),a.reset(),i.style.display="none",n.src="",C("¡Guardado!",`"${p}" se ha añadido correctamente.`,"success"),document.getElementById("word").focus()})}const Le="modulepreload",Te=function(e){return"/emowords/"+e},Y={},$e=function(t,a,o){let r=Promise.resolve();if(a&&a.length>0){let y=function(p){return Promise.all(p.map(v=>Promise.resolve(v).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};var n=y;document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),l=u?.nonce||u?.getAttribute("nonce");r=y(a.map(p=>{if(p=Te(p),p in Y)return;Y[p]=!0;const v=p.endsWith(".css"),m=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${m}`))return;const h=document.createElement("link");if(h.rel=v?"stylesheet":Le,v||(h.as="script"),h.crossOrigin="",h.href=p,l&&h.setAttribute("nonce",l),document.head.appendChild(h),v)return new Promise((k,P)=>{h.addEventListener("load",k),h.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${p}`)))})}))}function i(u){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=u,window.dispatchEvent(l),!l.defaultPrevented)throw u}return r.then(u=>{for(const l of u||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};function Ie(e){let t=null,a=null,o=!1,r=[],i={correct:0,incorrect:0,xp:0},n=new Map;const u=2;r=ge(),$(r);function l(){e.innerHTML="",t||y()}function y(){const s=r.length;e.innerHTML=`
      <h2 style="text-align: center; justify-content: center; margin-bottom: 0.5rem;">Modo de Repaso</h2>
      <p style="text-align: center; color: var(--gray-500); margin-bottom: 2rem;">
        Tienes <strong style="color: var(--primary-600);">${s}</strong> palabras pendientes
      </p>
      
      <div class="mode-grid">
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
    `,e.querySelectorAll(".mode-card").forEach(c=>{c.addEventListener("click",()=>{if(t=c.dataset.mode,console.log(`Starting mode: ${t} with queue size: ${r.length}`),r.length===0){C("Sin palabras","No hay palabras pendientes para repasar ahora.","info"),T(e);return}l(),p(),k()})})}function p(){if(e.querySelector(".review-header"))return;const s=document.createElement("div");s.className="review-header",s.innerHTML=`
       <button class="back-btn" id="exit-mode" title="Salir"><i class="fa-solid fa-arrow-left"></i></button>
       <div class="review-progress">
         <div class="progress-stat" id="stat-queue">
           <i class="fa-solid fa-book progress-icon"></i>
           <span class="val">${r.length}</span>
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
     `,e.insertBefore(s,e.firstChild),document.getElementById("exit-mode").addEventListener("click",f=>{f.preventDefault(),i.correct>0||i.incorrect>0?confirm("¿Salir del modo repaso? Tu progreso se perderá.")&&m():m()});const d=document.createElement("div");d.id="active-content",d.className="review-container",e.appendChild(d)}function v(){const s=document.querySelector("#stat-queue .val"),c=document.querySelector("#stat-correct .val"),d=document.querySelector("#stat-xp .val");s&&(s.textContent=r.length),c&&(c.textContent=i.correct),d&&(d.textContent=`${i.xp} XP`)}function m(){t=null,l()}function h(){return r.shift()||null}function k(){if(!t){l();return}const s=document.getElementById("active-content");if(!s){l();return}if(a=h(),!a){T(s);return}switch(t){case"flashcard":P(s);break;case"quiz":M(s);break;case"typing":R(s);break;case"listening":O(s);break}}function P(s){o=!1,a.reviewCount,s.innerHTML=`
      <div class="review-card" id="review-card">
        <div class="review-card-inner">
           <div class="review-meta">
              <span class="tag type-tag">${w(a.type)}</span>
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
    `,document.getElementById("review-speak-btn").addEventListener("click",b=>{b.stopPropagation(),D(a.word)});const c=document.getElementById("show-answer"),d=document.getElementById("review-answer"),f=document.getElementById("remembered-btn"),g=document.getElementById("forgotten-btn");c.addEventListener("click",()=>{o=!0,d.style.display="block",c.style.display="none",f.disabled=!1,g.disabled=!1,d.classList.add("fade-in")}),f.addEventListener("click",()=>L(!0)),g.addEventListener("click",()=>L(!1)),x(b=>{b==="Space"&&!o&&c.click(),b==="ArrowRight"&&o&&L(!0),b==="ArrowLeft"&&o&&L(!1)})}function M(s){const d=S().filter(E=>E.id!==a.id).sort(()=>.5-Math.random()).slice(0,3),f=[a,...d];$(f),s.innerHTML=`
      <div class="quiz-container">
         <div class="quiz-question">
            <h3 class="quiz-word">${a.word}</h3>
            <button class="speak-btn" id="quiz-speak-btn" style="margin: 0 auto; width: 40px; height: 40px; font-size: 1.2rem;">
                <i class="fa-solid fa-volume-high"></i>
            </button>
         </div>

         <div class="quiz-options">
            ${f.map(E=>`
                <button class="quiz-option" data-id="${E.id}">
                    ${E.meaning}
                </button>
            `).join("")}
         </div>
      </div>
    `,document.getElementById("quiz-speak-btn").addEventListener("click",()=>D(a.word));const g=s.querySelectorAll(".quiz-option");let b=!1;g.forEach(E=>{E.addEventListener("click",()=>{if(b)return;b=!0,String(E.dataset.id)===String(a.id)?(E.classList.add("correct"),setTimeout(()=>L(!0),800)):(E.classList.add("wrong"),g.forEach(V=>{String(V.dataset.id)===String(a.id)&&V.classList.add("correct")}),setTimeout(()=>L(!1),1500))})})}function R(s){s.innerHTML=`
      <div class="typing-container">
         <div class="review-card-inner" style="margin-bottom: 2rem;">
             <p style="font-size: 1.5rem; margin-bottom: 0.5rem; font-weight:700; color:var(--primary-600);">${a.meaning}</p>
             ${a.example?`<p style="font-style:italic; color:var(--gray-500)">"${a.example.replace(new RegExp(a.word,"gi"),"___")}"</p>`:""}
         </div>
         
         <input type="text" class="typing-input" id="type-input" placeholder="Escribe la palabra en inglés..." autocomplete="off">
         
         <button id="check-btn" class="add-word-btn" style="width: 100%;">Comprobar</button>
         <button id="give-up-btn" style="background:none; border:none; color:var(--gray-500); margin-top:1rem; cursor:pointer;">No lo sé</button>
      </div>
    `,setTimeout(()=>document.getElementById("type-input").focus(),100);const c=document.getElementById("type-input"),d=document.getElementById("check-btn"),f=document.getElementById("give-up-btn");function g(){c.value.trim().toLowerCase()===a.word.toLowerCase()?(c.classList.add("correct"),d.innerHTML='<i class="fa-solid fa-check"></i> Correcto',D(a.word),setTimeout(()=>L(!0),1e3)):(c.classList.add("wrong"),D("Incorrect","en-US"),setTimeout(()=>c.classList.remove("wrong"),500))}d.addEventListener("click",g),c.addEventListener("keydown",b=>{b.key==="Enter"&&g()}),f.addEventListener("click",()=>{c.value=a.word,c.classList.add("wrong"),D(a.word),setTimeout(()=>L(!1),2e3)})}function O(s){const d=S().filter(I=>I.id!==a.id).sort(()=>.5-Math.random()).slice(0,3),f=[a,...d];$(f),s.innerHTML=`
      <div class="quiz-container">
         <div class="quiz-question">
            <div style="font-size: 4rem; color: var(--primary-500); cursor: pointer; margin-bottom: 1rem;" id="listen-icon">
                <i class="fa-solid fa-circle-play"></i>
            </div>
            <p style="color: var(--gray-500);">Escucha y selecciona el significado</p>
         </div>

         <div class="quiz-options">
            ${f.map(I=>`
                <button class="quiz-option" data-id="${I.id}">
                    ${I.meaning}
                </button>
            `).join("")}
         </div>
      </div>
    `;const g=document.getElementById("listen-icon"),b=()=>{g.style.transform="scale(0.9)",setTimeout(()=>g.style.transform="scale(1)",150),D(a.word)};g.addEventListener("click",b),setTimeout(b,500);const E=s.querySelectorAll(".quiz-option");let q=!1;E.forEach(I=>{I.addEventListener("click",()=>{if(q)return;q=!0,String(I.dataset.id)===String(a.id)?(I.classList.add("correct"),setTimeout(()=>L(!0),800)):(I.classList.add("wrong"),E.forEach(U=>{String(U.dataset.id)===String(a.id)&&U.classList.add("correct")}),setTimeout(()=>L(!1),1500))})})}function L(s){try{if(!a)return;if(ye(a.id,s),s){i.correct++,i.xp+=10;try{J(1)}catch(c){console.error(c)}n.delete(a.id)}else{i.incorrect++;const c=n.get(a.id)||0;c<u&&(n.set(a.id,c+1),r.push(a))}a=null,v(),k()}catch(c){console.error("Error in handleResult:",c)}}function T(s){try{J(0);const c=document.querySelector(".review-header");c&&(c.style.display="none");let d;try{d=ie()}catch{d={streak:0,dailyGoal:{count:0,target:20}}}s.innerHTML=`
          <div class="empty-review-state">
            <div class="empty-icon" style="color: var(--success-500); animation: bounce 1s infinite;"><i class="fa-solid fa-trophy"></i></div>
            <h3>¡Sesión completada!</h3>
            <p>Has ganado <strong style="color:var(--warning-500)">${i.xp} XP</strong></p>
            
            <div class="session-summary">
                <div class="summary-stats">
                  <span class="stat correct"><i class="fa-solid fa-circle-check"></i> ${i.correct}</span>
                  <span class="stat incorrect"><i class="fa-solid fa-circle-xmark"></i> ${i.incorrect}</span>
                </div>
            </div>
            
            <div class="streak-mini" style="margin: 1.5rem 0; padding: 1rem; background: #fffbeb; border-radius: 8px; border: 1px solid #fcd34d;">
                <p style="color: #b45309; font-weight: bold;"><i class="fa-solid fa-fire"></i> Racha: ${d.streak} días</p>
                <p style="font-size: 0.9rem; color: #92400e;">Meta diaria: ${d.dailyGoal.count} / ${d.dailyGoal.target}</p>
            </div>
    
            <button class="add-word-btn" id="finish-btn">Volver al inicio</button>
          </div>
        `,window.confetti||window.canvasConfetti?(window.confetti||window.canvasConfetti)({particleCount:100,spread:70,origin:{y:.6}}):$e(()=>import("./confetti.module-C2jkTI5u.js"),[]).then(g=>{const b=g.default;b({particleCount:100,spread:70,origin:{y:.6}})}).catch(g=>console.log("Confetti not found",g));const f=document.getElementById("finish-btn");f&&f.addEventListener("click",()=>{t=null;const g=document.querySelector('[data-view="home"]');g?g.click():l()})}catch(c){console.error("Error in renderSummary:",c),s.innerHTML='<p class="error">Error al mostrar resumen. <button onclick="location.reload()">Recargar</button></p>'}}let B=null;function x(s){B&&B();const c=d=>{document.getElementById("active-content")&&document.activeElement.tagName!=="INPUT"&&s(d.code)};document.addEventListener("keydown",c),B=()=>document.removeEventListener("keydown",c),window._reviewCleanup=B}function $(s){for(let c=s.length-1;c>0;c--){const d=Math.floor(Math.random()*(c+1));[s[c],s[d]]=[s[d],s[c]]}return s}function w(s){return{word:"Palabra",phrasal:"Phrasal Verb",expression:"Expresión",connector:"Conector"}[s]||"Otro"}l()}function Ae(e){const t=S(),a=ee();if(e.innerHTML="",e.className="stats-view animate__animated animate__fadeIn",a.total===0){Pe(e);return}let o=0,r={master:0,guru:0,apprentice:0,new:0};t.forEach(p=>{const v=p.correctCount||0;v>=10?(o+=100,r.master++):v>=5?(o+=75,r.guru++):v>=2?(o+=40,r.apprentice++):(o+=10,r.new++)});const i=a.total>0?Math.round(o/a.total):0,n=Me(t),u=Be(t),l=De(t),y=`
    <header class="dashboard-header" style="text-align: center;">
        <div class="header-content" style="display: flex; flex-direction: column; align-items: center;">
            <h2 class="title">Centro de Estadísticas</h2>
            <p class="subtitle">Visualiza tu evolución y optimiza tu aprendizaje</p>
        </div>
        <div class="global-grade">
            <span class="grade-label">Nivel General</span>
            <span class="grade-value ${Re(i)}">${je(i)}</span>
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
                ${Ge(n)}
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
                    ${qe(n)}
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
                        ${ze(u)}
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
                            <div class="lvl-bar"><div class="fill" style="width: ${z(r.master,a.total)}%"></div></div>
                            <span class="lvl-count">${r.master}</span>
                        </div>
                        <div class="level-item guru">
                            <span class="lvl-name">Experto (5-9)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${z(r.guru,a.total)}%"></div></div>
                            <span class="lvl-count">${r.guru}</span>
                        </div>
                        <div class="level-item apprentice">
                            <span class="lvl-name">Aprendiz (2-4)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${z(r.apprentice,a.total)}%"></div></div>
                            <span class="lvl-count">${r.apprentice}</span>
                        </div>
                        <div class="level-item new">
                            <span class="lvl-name">Nuevo (0-1)</span>
                             <div class="lvl-bar"><div class="fill" style="width: ${z(r.new,a.total)}%"></div></div>
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
                    ${l.length>0?l.map(p=>`
                        <div class="struggling-item">
                            <div class="s-info">
                                <span class="s-word">${p.word}</span>
                                <span class="s-meaning">${p.meaning}</span>
                            </div>
                            <div class="s-metric">
                                <span class="error-badge">${p.incorrectCount} fallos</span>
                            </div>
                        </div>
                    `).join(""):'<div class="empty-state-mini">¡Todo va genial! No tienes palabras críticas.</div>'}
                </div>
                ${l.length>0?`
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
  `;e.innerHTML=y}function Pe(e){e.innerHTML=`
        <div class="empty-stats">
            <i class="fa-solid fa-chart-simple"></i>
            <h2>Sin datos suficientes</h2>
            <p>Añade algunas palabras para empezar a ver tus estadísticas.</p>
        </div>
    `}function Me(e){const t=[...e].sort((i,n)=>(i.createdAt||0)-(n.createdAt||0)),a=new Map;let o=0;t.forEach(i=>{o++;const n=new Date(i.createdAt||Date.now()).toISOString().split("T")[0];a.set(n,o)});const r=Array.from(a.entries()).map(([i,n])=>({date:i,count:n}));if(r.length>0&&r.length<2){const i=new Date(r[0].date);i.setDate(i.getDate()-1),r.unshift({date:i.toISOString().split("T")[0],count:0})}return r}function Be(e){const t=["word","phrasal","expression","connector"],a={};return t.forEach(o=>{const r=e.filter(p=>p.type===o),i=r.length;if(i===0)return;let n=0,u=0;r.forEach(p=>{n+=p.correctCount||0,u+=p.incorrectCount||0});const l=n+u,y=l===0?0:Math.round(n/l*100);a[o]={count:i,accuracy:y}}),a}function De(e){return[...e].filter(t=>(t.incorrectCount||0)>0).sort((t,a)=>{const o=t.incorrectCount/(t.reviewCount||1);return a.incorrectCount/(a.reviewCount||1)-o}).slice(0,5)}function z(e,t){return t?Math.round(e/t*100):0}function je(e){return e>=90?"S":e>=80?"A":e>=60?"B":e>=40?"C":"D"}function Re(e){return e>=90?"text-legendary":e>=80?"text-success":e>=60?"text-primary":e>=40?"text-warning":"text-danger"}function qe(e){if(!e||e.length===0)return"";const t=800,a=300,o=20,r=e[e.length-1].count;if(r===0)return"";const i=e.map((y,p)=>{const v=p/(e.length-1)*(t-2*o)+o,m=a-(y.count/r*(a-2*o)+o);return`${v},${m}`}).join(" "),n=o,u=t-o,l=`${n},${a} ${i} ${u},${a}`;return`
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
    `}function Ge(e){if(!e||e.length<2)return"";const t=100,a=40,o=e[e.length-1].count,r=e.map((i,n)=>{const u=n/(e.length-1)*t,l=a-i.count/o*a;return`${u},${l}`}).join(" ");return`
        <svg viewBox="0 0 ${t} ${a}" class="sparkline" preserveAspectRatio="none">
             <polyline points="${r}" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
    `}function ze(e){const t={word:"Palabras",phrasal:"Phrasal Verbs",expression:"Expresiones",connector:"Conectores"};return Object.entries(e).map(([a,o])=>`
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
    `).join("")}const A=document.getElementById("app");window.addEventListener("offline",()=>{C("Sin conexión","Estás trabajando en modo offline.","warning",5e3),document.body.classList.add("offline-mode")});window.addEventListener("online",()=>{C("Conexión restaurada","Tus cambios se guardarán correctamente.","success",3e3),document.body.classList.remove("offline-mode")});window.addEventListener("error",e=>{console.error("Global error:",e.error),C("Error inesperado","Ha ocurrido un error. Intenta recargar la página.","error",0)});window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason)});const se=document.querySelectorAll(".nav-link"),H=document.getElementById("theme-toggle");function He(){const t=F().theme||"dark";_(t)}function _(e){document.documentElement.setAttribute("data-theme",e);const t=H.querySelector("i");e==="dark"?(t.className="fa-solid fa-sun",H.title="Cambiar a modo claro"):(t.className="fa-solid fa-moon",H.title="Cambiar a modo oscuro");const a=F();a.theme=e,ve(a)}function Oe(){const t=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.body.classList.add("theme-transitioning"),_(t),setTimeout(()=>{document.body.classList.remove("theme-transitioning")},300)}H.addEventListener("click",Oe);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{F().theme||_(e.matches?"dark":"light")});function Ve(e){se.forEach(t=>{t.dataset.view===e?t.classList.add("active"):t.classList.remove("active")})}function ce(e){window._reviewCleanup&&(window._reviewCleanup(),window._reviewCleanup=null),Ve(e),A.style.opacity="0",A.style.transform="translateY(10px)",setTimeout(()=>{switch(e){case"home":ne(A);break;case"add":Ce(A);break;case"review":Ie(A);break;case"stats":Ae(A);break;default:A.innerHTML="<p>Vista no encontrada</p>"}window.scrollTo({top:0,left:0,behavior:"instant"}),requestAnimationFrame(()=>{A.style.opacity="1",A.style.transform="translateY(0)"})},150)}A.style.transition="opacity 0.15s ease, transform 0.15s ease";se.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.view;ce(a)})});He();ce("home");"serviceWorker"in navigator&&window.addEventListener("load",()=>{const t="/emowords/"+"sw.js";navigator.serviceWorker.register(t).then(a=>{console.log("SW registered: ",a)}).catch(a=>{console.log("SW registration failed: ",a)})});
