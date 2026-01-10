(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const q="emowords_vocab",Y="emowords_settings";function k(){const e=localStorage.getItem(q);return e?JSON.parse(e):[]}function se(e){const t=k(),a={...e,createdAt:Date.now(),lastReviewedAt:null,reviewCount:0,correctCount:0,incorrectCount:0,nextReviewAt:Date.now(),difficulty:0};t.push(a),localStorage.setItem(q,JSON.stringify(t))}function N(e){const t=k().map(a=>a.id===e.id?e:a);localStorage.setItem(q,JSON.stringify(t))}function ce(e){const t=k().filter(a=>a.id!==e);localStorage.setItem(q,JSON.stringify(t))}function le(e){return k().find(t=>t.id===e)}function de(e){const t=k(),a=e.toLowerCase().trim();return a?t.filter(r=>r.word.toLowerCase().includes(a)||r.meaning.toLowerCase().includes(a)||r.example&&r.example.toLowerCase().includes(a)||r.emotion&&r.emotion.toLowerCase().includes(a)||r.category&&r.category.toLowerCase().includes(a)):t}function Q(){const e=k(),t=new Set;return e.forEach(a=>{a.category&&t.add(a.category)}),Array.from(t).sort()}function me(e,t="date-desc"){const a=[...e];switch(t){case"date-asc":return a.sort((r,o)=>(r.createdAt||r.id)-(o.createdAt||o.id));case"date-desc":return a.sort((r,o)=>(o.createdAt||o.id)-(r.createdAt||r.id));case"alpha-asc":return a.sort((r,o)=>r.word.localeCompare(o.word));case"alpha-desc":return a.sort((r,o)=>o.word.localeCompare(r.word));case"review-count":return a.sort((r,o)=>(o.reviewCount||0)-(r.reviewCount||0));case"difficulty":return a.sort((r,o)=>(o.difficulty||0)-(r.difficulty||0));default:return a}}function pe(){const e=k(),t=e.length,a=e.filter(m=>m.remembered).length,r=t-a,o=e.reduce((m,p)=>m+(p.reviewCount||0),0),n=t>0?(o/t).toFixed(1):0,c={word:e.filter(m=>m.type==="word").length,phrasal:e.filter(m=>m.type==="phrasal").length,expression:e.filter(m=>m.type==="expression").length,connector:e.filter(m=>m.type==="connector").length},h=e.reduce((m,p)=>m+(p.correctCount||0),0),l=e.reduce((m,p)=>m+(p.incorrectCount||0),0),E=h+l>0?(h/(h+l)*100).toFixed(1):0,u=Date.now(),S=e.filter(m=>!m.nextReviewAt||m.nextReviewAt<=u).length;return{total:t,remembered:a,forgotten:r,totalReviews:o,averageReviews:n,byType:c,retentionRate:E,dueForReview:S}}function ge(){const e=k(),t=Date.now(),a=e.filter(l=>!l.remembered),r=e.filter(l=>l.remembered&&(!l.nextReviewAt||l.nextReviewAt<=t)),o=e.filter(l=>!l.lastReviewedAt),n=[...a,...o,...r],c=new Set,h=n.filter(l=>c.has(l.id)?!1:(c.add(l.id),!0));return h.length>0?h:e}function ue(e,t){const a=le(e);if(a){if(a.remembered=t,a.lastReviewedAt=Date.now(),a.reviewCount=(a.reviewCount||0)+1,t){a.correctCount=(a.correctCount||0)+1,a.difficulty=Math.max(-3,(a.difficulty||0)-1);const r=1440*60*1e3,o=Math.pow(2,Math.min(a.correctCount,5));a.nextReviewAt=Date.now()+r*o}else a.incorrectCount=(a.incorrectCount||0)+1,a.difficulty=Math.min(3,(a.difficulty||0)+1),a.nextReviewAt=Date.now();return N(a),a}}function ye(){const e=k(),t={version:"1.0",exportedAt:new Date().toISOString(),wordCount:e.length,words:e};return JSON.stringify(t,null,2)}function _(e){try{const t=JSON.parse(e);if(!t.words||!Array.isArray(t.words))throw new Error("Invalid data format: missing words array");const a=k(),r=new Set(a.map(c=>c.id));let o=0,n=0;return t.words.forEach(c=>{if(!c.word||!c.meaning){n++;return}(!c.id||r.has(c.id))&&(c.id=Date.now()+Math.random()),c.type=c.type||"word",c.remembered=c.remembered||!1,c.createdAt=c.createdAt||Date.now(),a.push(c),r.add(c.id),o++}),localStorage.setItem(q,JSON.stringify(a)),{success:!0,imported:o,skipped:n}}catch(t){return{success:!1,error:t.message}}}function Z(e,t=null){const a=k(),r=e.toLowerCase().trim();return a.some(o=>o.word.toLowerCase().trim()===r&&o.id!==t)}function W(){const e=localStorage.getItem(Y);return e?JSON.parse(e):{theme:"dark",language:"es",showExampleInReview:!0,autoPlayAudio:!1}}function fe(e){localStorage.setItem(Y,JSON.stringify(e))}const ee="emowords_gamification";function ae(){const e=localStorage.getItem(ee);return e?JSON.parse(e):{streak:0,lastStudyDate:null,maxStreak:0,dailyGoal:{date:new Date().toLocaleDateString(),count:0,target:20},totalXp:0,level:1}}function te(e){localStorage.setItem(ee,JSON.stringify(e))}function oe(){const e=ae(),t=new Date().toLocaleDateString();if(e.dailyGoal.date!==t){e.dailyGoal={date:t,count:0,target:e.dailyGoal.target||20};const a=new Date;a.setDate(a.getDate()-1),e.lastStudyDate!==a.toLocaleDateString()&&e.lastStudyDate!==t&&(e.streak>0,e.streak=0),te(e)}return e}function J(e=1){const t=ae(),a=new Date().toLocaleDateString();if(t.dailyGoal.date!==a&&(t.dailyGoal={date:a,count:0,target:20}),t.dailyGoal.count+=e,t.lastStudyDate!==a){const r=new Date;r.setDate(r.getDate()-1);const o=r.toLocaleDateString();t.lastStudyDate===o?t.streak+=1:t.streak=1,t.streak>t.maxStreak&&(t.maxStreak=t.streak),t.lastStudyDate=a}return t.totalXp+=e*10,t.level=Math.floor(Math.sqrt(t.totalXp/100))+1,te(t),t}const H=[{id:"survival-a1",name:"Survival Essentials (A1)",icon:"fa-life-ring",description:"Palabras sin las que no puedes vivir.",words:[{word:"Water",meaning:"Agua",type:"word",category:"Esencial",example:"Can I have some water, please?"},{word:"Bathroom",meaning:"Baño",type:"word",category:"Esencial",example:"Where is the bathroom?"},{word:"Wifi",meaning:"Wifi/Internet",type:"word",category:"Esencial",example:"What is the wifi password?"},{word:"Charger",meaning:"Cargador",type:"word",category:"Tecnología",example:"Do you have a phone charger?"},{word:"Password",meaning:"Contraseña",type:"word",category:"Seguridad",example:"I forgot my password."},{word:"ATM",meaning:"Cajero automático",type:"word",category:"Dinero",example:"Is there an ATM near here?"},{word:"Help",meaning:"Ayuda",type:"word",category:"Esencial",emotion:"Urgencia, necesidad"},{word:"Late",meaning:"Tarde",type:"word",category:"Tiempo",example:"Sorry I'm late."},{word:"Ready",meaning:"Listo/Preparado",type:"word",category:"Estado",example:"Are you ready?"},{word:"Bill",meaning:"Cuenta (restaurante)",type:"word",category:"Viajes",example:"Can we have the bill?"}]},{id:"digital-life-a2",name:"Digital Life (A2)",icon:"fa-mobile-screen",description:"Para moverte en apps y redes.",words:[{word:"Share",meaning:"Compartir",type:"word",category:"Redes Sociales",example:"Share this post."},{word:"Like",meaning:"Gustar / Dar like",type:"word",category:"Redes Sociales",example:"Like and subscribe."},{word:"Search",meaning:"Buscar",type:"word",category:"Internet",example:"Search on Google."},{word:"Download",meaning:"Descargar",type:"word",category:"Tecnología",example:"Download the app."},{word:"Login",meaning:"Iniciar sesión",type:"word",category:"Seguridad",example:"Login to your account."},{word:"Settings",meaning:"Ajustes/Configuración",type:"word",category:"Tecnología",example:"Check your privacy settings."},{word:"Message",meaning:"Mensaje",type:"word",category:"Comunicación",example:"Send me a message."},{word:"Profile",meaning:"Perfil",type:"word",category:"Redes Sociales",example:"Update your profile picture."},{word:"Link",meaning:"Enlace",type:"word",category:"Internet",example:"Click the link in bio."},{word:"Follow",meaning:"Seguir",type:"word",category:"Redes Sociales",example:"Follow me on Instagram."}]},{id:"daily-routine-a2",name:"Modern Routine (A2)",icon:"fa-mug-hot",description:"Tu día a día real.",words:[{word:"Coffee",meaning:"Café",type:"word",category:"Rutina",emotion:"Energía mañanera"},{word:"Gym",meaning:"Gimnasio",type:"word",category:"Estilo de vida",example:"I go to the gym after work."},{word:"Traffic",meaning:"Tráfico",type:"word",category:"Transporte",emotion:"Estrés, bocinas"},{word:"Meeting",meaning:"Reunión",type:"word",category:"Trabajo",example:"I have a Zoom meeting."},{word:"Lunch",meaning:"Almuerzo",type:"word",category:"Comida",example:"Let's grab lunch."},{word:"Tired",meaning:"Cansado",type:"word",category:"Estado",emotion:"Necesito dormir"},{word:"Weekend",meaning:"Fin de semana",type:"word",category:"Tiempo",emotion:"Libertad, descanso"},{word:"Watch",meaning:"Mirar (pantallas)",type:"word",category:"Ocio",example:"Watch Netflix."},{word:"Cook",meaning:"Cocinar",type:"word",category:"Casa",example:"I don't like to cook."},{word:"Clean",meaning:"Limpiar",type:"word",category:"Casa",example:"Clean your room."}]},{id:"cool-slang-a2",name:"Basic Slang (A1/A2)",icon:"fa-bolt",description:"Palabras que oyes en series y YouTube.",words:[{word:"Cool",meaning:"Genial/Guay",type:"word",category:"Slang",example:"That car is so cool."},{word:"Dude",meaning:"Tío/Colega",type:"word",category:"Slang",example:"Hey dude, what's up?"},{word:"Chill",meaning:"Relajado/Tranquilo",type:"word",category:"Slang",example:"Just chill out."},{word:"No way",meaning:"Ni de broma / No me digas",type:"expression",category:"Slang",emotion:"Sorpresa total"},{word:"Awesome",meaning:"Impresionante",type:"word",category:"Slang",example:"The movie was awesome."},{word:"Weird",meaning:"Raro",type:"word",category:"Adjetivos",example:"That guy is weird."},{word:"Guys",meaning:"Chicos/Gente",type:"word",category:"Slang",example:"Hi guys!"},{word:"Stuff",meaning:"Cosas",type:"word",category:"General",example:"I have a lot of stuff to do."},{word:"Sucks",meaning:"Apesta (es malo)",type:"word",category:"Slang",example:"This weather sucks."},{word:"Whatever",meaning:"Lo que sea / Me da igual",type:"word",category:"Slang",emotion:"Indiferencia"}]},{id:"travel-smart-a2",name:"Smart Travel (A2)",icon:"fa-plane-departure",description:"Viajar hoy en día.",words:[{word:"Booking",meaning:"Reserva",type:"word",category:"Viajes",example:"I made a booking online."},{word:"Review",meaning:"Reseña/Opinión",type:"word",category:"Internet",example:"Check the reviews first."},{word:"Location",meaning:"Ubicación",type:"word",category:"Viajes",example:"Send me your location."},{word:"Ticket",meaning:"Entrada/Billete",type:"word",category:"Viajes",example:"Digital ticket."},{word:"Delay",meaning:"Retraso",type:"word",category:"Viajes",emotion:"Espera en aeropuerto"},{word:"Subway",meaning:"Metro",type:"word",category:"Transporte",example:"Take the subway."},{word:"Cheap",meaning:"Barato",type:"word",category:"Dinero",example:"It is very cheap."},{word:"Safe",meaning:"Seguro",type:"word",category:"Seguridad",example:"Is this area safe?"},{word:"Trip",meaning:"Viaje (corto)",type:"word",category:"Viajes",example:"Have a nice trip."},{word:"Bag",meaning:"Bolsa/Maleta",type:"word",category:"Viajes",example:"Pack your bags."}]},{id:"remote-work-b1",name:"Remote Work (B1)",icon:"fa-laptop-house",description:"Inglés para trabajar desde casa o la oficina.",words:[{word:"Schedule",meaning:"Horario/Agendar",type:"word",category:"Trabajo",example:"Let's schedule a call."},{word:"Deadline",meaning:"Fecha límite",type:"word",category:"Trabajo",emotion:"Reloj tic-tac, entrega"},{word:"Feedback",meaning:"Opinión/Corrección",type:"word",category:"Trabajo",example:"Thanks for the feedback."},{word:"Screen",meaning:"Pantalla",type:"word",category:"Tecnología",example:"Can you see my screen?"},{word:"Update",meaning:"Poner al día/Actualizar",type:"word",category:"Trabajo",example:"Give me an update."},{word:"Bug",meaning:"Error (informático)",type:"word",category:"Tecnología",example:"There is a bug in the system."},{word:"Team",meaning:"Equipo",type:"word",category:"Trabajo",example:"Great team work."},{word:"Break",meaning:"Descanso",type:"word",category:"Trabajo",emotion:"Café, relax 5 min"},{word:"Task",meaning:"Tarea",type:"word",category:"Trabajo",example:"Focus on this task."},{word:"Support",meaning:"Soporte/Apoyo",type:"word",category:"Trabajo",example:"Contact tech support."}]},{id:"phrasals-must-b1",name:"Must-Know Phrasals (B1)",icon:"fa-star",description:"Los 10 phrasal verbs que USAS cada día.",words:[{word:"Pick up",meaning:"Recoger/Contestar",type:"word",category:"Phrasal Verbs",example:"Pick up the phone."},{word:"Find out",meaning:"Descubrir/Enterarse",type:"word",category:"Phrasal Verbs",emotion:"Luz, información nueva"},{word:"Give up",meaning:"Rendirse/Dejar (hábito)",type:"word",category:"Phrasal Verbs",example:"Don't give up."},{word:"Go on",meaning:"Continuar/Suceder",type:"word",category:"Phrasal Verbs",example:"What is going on?"},{word:"Come back",meaning:"Volver",type:"word",category:"Phrasal Verbs",example:"Come back here."},{word:"Turn on",meaning:"Encender",type:"word",category:"Phrasal Verbs",example:"Turn on the TV."},{word:"Wake up",meaning:"Despertarse",type:"word",category:"Phrasal Verbs",emotion:"Ojos abiertos, mañana"},{word:"Log in",meaning:"Entrar (web)",type:"word",category:"Phrasal Verbs",example:"Log in with your email."},{word:"Set up",meaning:"Configurar/Montar",type:"word",category:"Phrasal Verbs",example:"Set up the wifi."},{word:"Work out",meaning:"Hacer ejercicio / Funcionar",type:"word",category:"Phrasal Verbs",example:"I work out every day."}]},{id:"streaming-b1",name:"Streaming & Media (B1)",icon:"fa-play",description:"Vocabulario de Netflix, YouTube y Podcasts.",words:[{word:"Episode",meaning:"Episodio",type:"word",category:"Ocio",example:"Last episode was crazy."},{word:"Season",meaning:"Temporada",type:"word",category:"Ocio",example:"Waiting for season 2."},{word:"Spoiler",meaning:"Destripe",type:"word",category:"Ocio",emotion:"Arruinar la sorpresa"},{word:"Trending",meaning:"Tendencia",type:"word",category:"Redes Sociales",example:"It is trending on Twitter."},{word:"Skip",meaning:"Saltar (intro/anuncio)",type:"word",category:"Acción",example:"Skip intro."},{word:"Subscribe",meaning:"Suscribirse",type:"word",category:"Internet",example:"Subscribe for more."},{word:"Content",meaning:"Contenido",type:"word",category:"Internet",example:"Creator of content."},{word:"Ad/Advertisement",meaning:"Anuncio",type:"word",category:"Marketing",example:"Too many ads."},{word:"Stream",meaning:"Retransmitir",type:"word",category:"Internet",example:"Live stream."},{word:"Host",meaning:"Anfitrión/Presentador",type:"word",category:"Personas",example:"The podcast host."}]},{id:"dating-social-b1",name:"Dating & Social (B1)",icon:"fa-heart",description:"Relaciones modernas y vida social.",words:[{word:"Date",meaning:"Cita (romántica)",type:"word",category:"Relaciones",example:"I have a date tonight."},{word:"Hang out",meaning:"Pasar el rato",type:"word",category:"Social",example:"Let's hang out later."},{word:"Single",meaning:"Soltero/a",type:"word",category:"Relaciones",example:"Are you single?"},{word:"Break up",meaning:"Romper (relación)",type:"word",category:"Phrasal Verbs",emotion:"Corazón roto"},{word:"Ex",meaning:"Ex pareja",type:"word",category:"Relaciones",example:"Don't text your ex."},{word:"Couple",meaning:"Pareja",type:"word",category:"Relaciones",example:"Cute couple."},{word:"Ghosting",meaning:"Desaparecer (ignorar)",type:"word",category:"Slang",emotion:"Silencio, visto"},{word:"Crush",meaning:"Amor platónico",type:"word",category:"Slang",emotion:"Mariposas, ilusión"},{word:"Friendzone",meaning:"Zona de amigos",type:"word",category:"Slang",example:"I am in the friendzone."},{word:"Cheat",meaning:"Engañar (infiel)",type:"word",category:"Relaciones",emotion:"Mentira, traición"}]},{id:"fitness-health-b1",name:"Fitness Lifestyle (B1)",icon:"fa-dumbbell",description:"Cuerpo sano, mente sana.",words:[{word:"Workout",meaning:"Entrenamiento",type:"word",category:"Deporte",example:"Good workout today."},{word:"Healthy",meaning:"Saludable",type:"word",category:"Salud",example:"Eat healthy food."},{word:"Muscle",meaning:"Músculo",type:"word",category:"Cuerpo",example:"Build muscle."},{word:"Weight",meaning:"Peso",type:"word",category:"Salud",example:"Lose weight."},{word:"Tired",meaning:"Cansado",type:"word",category:"Estado",emotion:"Sin energía"},{word:"Shape",meaning:"Forma física",type:"word",category:"Salud",example:"Get in shape."},{word:"Stretch",meaning:"Estirar",type:"word",category:"Deporte",example:"Stretch after ranning."},{word:"Injured",meaning:"Lesionado",type:"word",category:"Salud",emotion:"Dolor, vendaje"},{word:"Laziness",meaning:"Pereza",type:"word",category:"Estado",emotion:"Sofá, no hacer nada"},{word:"Goal",meaning:"Meta/Objetivo",type:"word",category:"Motivación",example:"Fitness goals."}]},{id:"speaking-connectors-b2",name:"Speaking Flow (B2)",icon:"fa-comments",description:"Conectores para no quedarte callado pensando.",words:[{word:"Actually",meaning:"En realidad / De hecho",type:"connector",category:"Speaking",example:"Actually, I don't know."},{word:"Basically",meaning:"Básicamente",type:"connector",category:"Speaking",example:"Basically, it's done."},{word:"Anyway",meaning:"En fin / De todas formas",type:"connector",category:"Speaking",example:"Anyway, let's go."},{word:"Literally",meaning:"Literalmente",type:"connector",category:"Speaking",example:"I was literally dying."},{word:"Though",meaning:"Aunque (al final)",type:"connector",category:"Speaking",example:"Thanks, though."},{word:"I mean",meaning:"O sea / Quiero decir",type:"connector",category:"Speaking",example:"I mean, it's okay."},{word:"On the other hand",meaning:"Por otro lado",type:"connector",category:"Speaking",emotion:"Balanza, otra opción"},{word:"Whatever",meaning:"Lo que sea",type:"connector",category:"Speaking",example:"Do whatever you want."},{word:"Meaning",meaning:"Es decir",type:"connector",category:"Speaking",example:"It's red, meaning stop."},{word:"Hopefully",meaning:"Ojalá / Con suerte",type:"connector",category:"Speaking",emotion:"Esperanza, dedos cruzados"}]},{id:"startup-tech-b2",name:"Startup & Tech (B2)",icon:"fa-rocket",description:"Lenguaje de negocios modernos y startups.",words:[{word:"Pitch",meaning:"Presentación breve",type:"word",category:"Business",example:"Sales pitch."},{word:"Founder",meaning:"Fundador",type:"word",category:"Business",example:"The founder of Amazon."},{word:"Launch",meaning:"Lanzar (producto)",type:"word",category:"Business",emotion:"Cohete, inicio"},{word:"Growth",meaning:"Crecimiento",type:"word",category:"Business",emotion:"Gráfica subiendo"},{word:"Remote",meaning:"Remoto",type:"word",category:"Trabajo",example:"Remote job."},{word:"Skill",meaning:"Habilidad",type:"word",category:"Trabajo",example:"Soft skills."},{word:"Data",meaning:"Datos",type:"word",category:"Tecnología",example:"Big data."},{word:"User",meaning:"Usuario",type:"word",category:"Tecnología",example:"User experience (UX)."},{word:"Networking",meaning:"Hacer contactos",type:"word",category:"Business",emotion:"Conexiones, café"},{word:"Value",meaning:"Valor",type:"word",category:"Business",example:"Add value."}]},{id:"phrasals-native-b2",name:"Sounding Native (B2)",icon:"fa-microphone",description:"Phrasal verbs para dejar de sonar como un libro.",words:[{word:"Figure out",meaning:"Resolver / Entender",type:"word",category:"Phrasal Verbs",example:"I will figure it out."},{word:"Run out of",meaning:"Quedarse sin",type:"word",category:"Phrasal Verbs",example:"We ran out of coffee."},{word:"Show up",meaning:"Aparecer (llegar)",type:"word",category:"Phrasal Verbs",example:"He didn't show up."},{word:"Get along",meaning:"Llevarse bien",type:"word",category:"Phrasal Verbs",emotion:"Amigos, sin peleas"},{word:"Freak out",meaning:"Entrar en pánico / Flipar",type:"word",category:"Phrasal Verbs",emotion:"Grito, locura"},{word:"Hang on",meaning:"Esperar un momento",type:"word",category:"Phrasal Verbs",example:"Hang on a second."},{word:"Mess up",meaning:"Estropear / Cagarla",type:"word",category:"Phrasal Verbs",example:"I messed up the exam."},{word:"Catch up",meaning:"Ponerse al día",type:"word",category:"Phrasal Verbs",example:"Let's catch up soon."},{word:"Chill out",meaning:"Relajarse",type:"word",category:"Phrasal Verbs",emotion:"Sofá, calma"},{word:"Check out",meaning:"Echar un vistazo",type:"word",category:"Phrasal Verbs",example:"Check out this video."}]},{id:"emotions-deep-b2",name:"Deep Emotions (B2)",icon:"fa-masks-theater",description:"Para expresar cómo te sientes de verdad.",words:[{word:"Overwhelmed",meaning:"Abrumado/Agobiado",type:"word",category:"Emociones",emotion:"Demasiadas cosas, peso"},{word:"Relieved",meaning:"Aliviado",type:"word",category:"Emociones",emotion:"Suspiro, peso fuera"},{word:"Awkward",meaning:"Incómodo (situación)",type:"word",category:"Emociones",emotion:"Silencio, tierra trágame"},{word:"Proud",meaning:"Orgulloso",type:"word",category:"Emociones",emotion:"Pecho inflado"},{word:"Disappointed",meaning:"Decepcionado",type:"word",category:"Emociones",emotion:"Expectativa rota"},{word:"Annoying",meaning:"Molesto",type:"word",category:"Adjetivos",example:"He is so annoying."},{word:"Grateful",meaning:"Agradecido",type:"word",category:"Emociones",emotion:"Gracias, plenitud"},{word:"Upset",meaning:"Disgustado/Molesto",type:"word",category:"Emociones",emotion:"Triste y enfadado"},{word:"Excited",meaning:"Emocionado",type:"word",category:"Emociones",emotion:"Energía, ganas"},{word:"Mood",meaning:'Estado de ánimo / "Yo total"',type:"word",category:"Slang",example:"Big mood."}]},{id:"debating-b2",name:"Winning Debates (B2)",icon:"fa-gavel",description:"Para dar tu opinión y tener razón.",words:[{word:"Agree",meaning:"Estar de acuerdo",type:"word",category:"Opinión",example:"I totally agree."},{word:"Disagree",meaning:"No estar de acuerdo",type:"word",category:"Opinión",example:"I respectfully disagree."},{word:"Depend",meaning:"Depender",type:"word",category:"Opinión",example:"It depends on the price."},{word:"Point",meaning:"Punto/Argumento",type:"word",category:"Opinión",example:"That is a good point."},{word:"Sense",meaning:"Sentido",type:"word",category:"Opinión",example:"That makes no sense."},{word:"Guess",meaning:"Suponer/Adivinar",type:"word",category:"Opinión",example:"I guess you are right."},{word:"Sure",meaning:"Seguro",type:"word",category:"Certeza",example:"Are you sure?"},{word:"Notice",meaning:"Notar/Darse cuenta",type:"word",category:"Percepción",example:"Did you notice that?"},{word:"Advice",meaning:"Consejo",type:"word",category:"Ayuda",example:"Give me some advice."},{word:"Fair",meaning:"Justo",type:"word",category:"Justicia",example:"That is not fair."}]},{id:"mindset-c1",name:"Growth Mindset (C1)",icon:"fa-brain",description:"Palabras para desarrollo personal y éxito.",words:[{word:"Mindset",meaning:"Mentalidad",type:"word",category:"Psicología",example:"Change your mindset."},{word:"Challenge",meaning:"Desafío/Reto",type:"word",category:"Desarrollo",emotion:"Montaña a escalar"},{word:"Achieve",meaning:"Lograr/Conseguir",type:"word",category:"Éxito",emotion:"Meta cruzada"},{word:"Failure",meaning:"Fracaso",type:"word",category:"Aprendizaje",emotion:"Caída, lección"},{word:"Improve",meaning:"Mejorar",type:"word",category:"Desarrollo",example:"Improve yourself."},{word:"Habit",meaning:"Hábito",type:"word",category:"Rutina",example:"Good habits."},{word:"Focus",meaning:"Enfoque/Concentración",type:"word",category:"Productividad",emotion:"Láser"},{word:"Aware",meaning:"Consciente",type:"word",category:"Mente",example:"Be aware of your thoughts."},{word:"Purpose",meaning:"Propósito",type:"word",category:"Vida",emotion:"Brújula, razón de ser"},{word:"Struggle",meaning:"Lucha/Esfuerzo costoso",type:"word",category:"Vida",emotion:"Cuesta arriba"}]},{id:"pro-connectors-c1",name:"Smart Connectors (C1)",icon:"fa-link",description:"Para conectar ideas como un intelectual.",words:[{word:"However",meaning:"Sin embargo",type:"connector",category:"Escritura",example:"Cheap. However, bad quality."},{word:"Therefore",meaning:"Por lo tanto",type:"connector",category:"Escritura",example:"I think, therefore I am."},{word:"Although",meaning:"Aunque",type:"connector",category:"Escritura",example:"Although it rained..."},{word:"Instead",meaning:"En su lugar",type:"connector",category:"Escritura",example:"Do this instead."},{word:"Unless",meaning:"A menos que",type:"connector",category:"Condición",example:"Don't call unless it's urgent."},{word:"Meanwhile",meaning:"Mientras tanto",type:"connector",category:"Tiempo",example:"Meanwhile, in London..."},{word:"Despite",meaning:"A pesar de",type:"connector",category:"Contraste",example:"Despite the weather."},{word:"Eventually",meaning:"Finalmente (tras tiempo)",type:"connector",category:"Tiempo",emotion:"Al final de todo"},{word:"Overall",meaning:"En general / Globalmente",type:"connector",category:"Resumen",example:"Overall, it was good."},{word:"Apparently",meaning:"Al parecer / Por lo visto",type:"connector",category:"Duda",example:"Apparently, he left."}]},{id:"news-media-c1",name:"News & Media (C1)",icon:"fa-newspaper",description:"Para entender lo que pasa en el mundo.",words:[{word:"Issue",meaning:"Asunto/Problema clave",type:"word",category:"Actualidad",example:"Global issues."},{word:"Source",meaning:"Fuente (info)",type:"word",category:"Periodismo",example:"Check your sources."},{word:"Claim",meaning:"Afirmar/Reclamar",type:"word",category:"Verbos",example:"He claims to be innocent."},{word:"Report",meaning:"Informe/Informar",type:"word",category:"Business",example:"Read the report."},{word:"Statement",meaning:"Declaración",type:"word",category:"Legal",example:"Official statement."},{word:"Threat",meaning:"Amenaza",type:"word",category:"Seguridad",emotion:"Peligro inminente"},{word:"Crisis",meaning:"Crisis",type:"word",category:"Actualidad",example:"Economic crisis."},{word:"Policy",meaning:"Política/Normativa",type:"word",category:"Gobierno",example:"Privacy policy."},{word:"Strike",meaning:"Huelga / Golpe",type:"word",category:"Actualidad",example:"Workers on strike."},{word:"Trend",meaning:"Tendencia",type:"word",category:"Actualidad",example:"Market trends."}]},{id:"abstract-feelings-c1",name:"Complex & Abstract (C1)",icon:"fa-cloud-moon",description:"Para describir sensaciones difíciles.",words:[{word:"Nostalgia",meaning:"Nostalgia",type:"word",category:"Sentimientos",emotion:"Dolor y amor al pasado"},{word:"Vibe",meaning:"Vibra / Ambiente",type:"word",category:"Slang",emotion:"Energía del lugar"},{word:"Gut feeling",meaning:"Corazonada / Instinto",type:"expression",category:"Instinto",emotion:"Estómago avisando"},{word:"Burnout",meaning:"Agotamiento extremo",type:"word",category:"Salud",emotion:"Batería muerta, cenizas"},{word:"Hype",meaning:"Expectación exagerada",type:"word",category:"Slang",emotion:"Ruido, marketing"},{word:"Red flag",meaning:"Señal de alerta",type:"expression",category:"Slang",emotion:"Bandera roja, peligro"},{word:"Cringe",meaning:"Vergüenza ajena",type:"word",category:"Slang",emotion:"Escalofrío, arrugarse"},{word:"FOMO",meaning:"Miedo a perderse algo",type:"word",category:"Acronimo",emotion:"Ansiedad social"},{word:"Mood swing",meaning:"Cambio de humor",type:"expression",category:"Psicología",emotion:"Montaña rusa"},{word:"Comfort zone",meaning:"Zona de confort",type:"expression",category:"Desarrollo",emotion:"Sofá seguro"}]},{id:"idioms-useful-c1",name:"Real Idioms (C1)",icon:"fa-comment-dots",description:"Expresiones que SÍ se usan.",words:[{word:"Piece of cake",meaning:"Pan comido (muy fácil)",type:"expression",category:"Idioms",example:"The test was a piece of cake."},{word:"Break a leg",meaning:"Mucha mierda (suerte)",type:"expression",category:"Idioms",example:"Go on stage and break a leg."},{word:"Call it a day",meaning:"Dar por terminado (trabajo)",type:"expression",category:"Idioms",emotion:"Cerrar portátil"},{word:"So far so good",meaning:"Hasta ahora todo bien",type:"expression",category:"Idioms",example:"How is it going? So far so good."},{word:"Make sense",meaning:"Tener sentido",type:"expression",category:"Común",example:"It makes sense."},{word:"Keep in touch",meaning:"Mantenerse en contacto",type:"expression",category:"Social",example:"Let's keep in touch."},{word:"Take it easy",meaning:"Tomárselo con calma",type:"expression",category:"Consejo",emotion:"Relax"},{word:"Better safe than sorry",meaning:"Mejor prevenir que curar",type:"expression",category:"Consejo",emotion:"Casco, seguro"},{word:"Long story short",meaning:"Resumiendo",type:"expression",category:"Speaking",emotion:"Tijeras al relato"},{word:"Get used to",meaning:"Acostumbrarse",type:"expression",category:"Hábito",example:"I got used to the cold."}]}],K="toast-container";function ve(){let e=document.getElementById(K);return e||(e=document.createElement("div"),e.id=K,e.className="toast-container",document.body.appendChild(e)),e}function L(e,t,a="info",r=4e3){const o=ve(),n=document.createElement("div"),c={info:"fa-circle-info",success:"fa-circle-check",warning:"fa-triangle-exclamation",error:"fa-circle-xmark"};n.className=`toast ${a}`,n.innerHTML=`
    <i class="fa-solid ${c[a]||"fa-bell"}"></i>
    <div class="toast-content">
      <span class="toast-title">${e}</span>
      <span class="toast-message">${t}</span>
    </div>
  `,o.appendChild(n),r>0&&setTimeout(()=>{n.classList.add("removing"),n.addEventListener("animationend",()=>{n.remove(),o.children.length===0&&o.remove()})},r)}function B(e,t="en-US",a=1){if(!("speechSynthesis"in window)){L("Error","Tu navegador no soporta síntesis de voz.","error");return}window.speechSynthesis.cancel();const r=new SpeechSynthesisUtterance(e);r.lang=t,r.rate=a;const n=window.speechSynthesis.getVoices().find(c=>c.lang===t&&(c.name.includes("Google")||c.name.includes("Premium")));n&&(r.voice=n),r.onerror=c=>{console.error("TTS Error:",c),L("Error","No se pudo reproducir el audio.","error")},window.speechSynthesis.speak(r)}function we(e,t){const a=document.createElement("div");a.className="word-card",a.dataset.wordId=e.id;const r=e.reviewCount||0,o=e.createdAt?new Date(e.createdAt).toLocaleDateString():"";return a.innerHTML=`
    ${e.image?`<img src="${e.image}" alt="${e.word}" class="word-image" />`:""}

    <div class="tags">
      <span class="tag type-tag">${be(e.type)}</span>
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
        <p class="section-label"><i class="fa-solid fa-heart"></i> Asociación emocional</p>
        <p class="emotion-text">${e.emotion}</p>`:""}

      ${e.example?`
        <p class="section-label"><i class="fa-solid fa-quote-left"></i> Ejemplo</p>
        <p class="example">${e.example}</p>`:""}
      
      <div class="word-meta">
        ${r>0?`<span class="meta-item"><i class="fa-solid fa-chart-simple"></i> ${r} repasos</span>`:""}
        ${o?`<span class="meta-item"><i class="fa-regular fa-calendar"></i> ${o}</span>`:""}
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
  `,a.querySelector(".speak-btn").addEventListener("click",n=>{n.stopPropagation(),B(e.word)}),a.querySelector(".toggle").addEventListener("click",()=>{e.remembered=!e.remembered,N(e),t()}),a.querySelector(".delete").addEventListener("click",()=>{confirm(`¿Eliminar "${e.word}"?`)&&(ce(e.id),t())}),a.querySelector(".edit-btn").addEventListener("click",()=>{he(e,t)}),a}function he(e,t){document.querySelector(".edit-modal")?.remove();const a=document.createElement("div");a.className="edit-modal",a.innerHTML=`
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
            <input type="text" id="edit-word" value="${M(e.word)}" required />
          </div>
          <div class="form-field">
            <label><i class="fa-solid fa-language"></i> Significado</label>
            <input type="text" id="edit-meaning" value="${M(e.meaning)}" required />
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
            <input type="text" id="edit-category" value="${M(e.category||"")}" />
          </div>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-heart"></i> Asociación emocional</label>
          <textarea id="edit-emotion" rows="3">${M(e.emotion||"")}</textarea>
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-quote-left"></i> Ejemplo</label>
          <input type="text" id="edit-example" value="${M(e.example||"")}" />
        </div>
        <div class="form-field">
          <label><i class="fa-solid fa-image"></i> URL de imagen</label>
          <input type="url" id="edit-image" value="${M(e.image||"")}" />
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-cancel">Cancelar</button>
          <button type="submit" class="btn-save"><i class="fa-solid fa-check"></i> Guardar cambios</button>
        </div>
        <div class="edit-feedback" style="display: none; color: var(--danger); font-size: 0.9rem; margin-top: 1rem; text-align: center;"></div>
      </form>
    </div>
  `,document.body.appendChild(a),requestAnimationFrame(()=>{a.classList.add("active")});const r=()=>{a.classList.remove("active"),setTimeout(()=>a.remove(),300)};a.querySelector(".modal-overlay").addEventListener("click",r),a.querySelector(".modal-close").addEventListener("click",r),a.querySelector(".btn-cancel").addEventListener("click",r),a.querySelector(".edit-form").addEventListener("submit",o=>{o.preventDefault();const n=document.getElementById("edit-word").value.trim(),c=a.querySelector(".edit-feedback");if(Z(n,e.id)){c.textContent=`La palabra "${n}" ya existe.`,c.style.display="block";return}e.word=n,e.meaning=document.getElementById("edit-meaning").value.trim(),e.type=document.getElementById("edit-type").value,e.category=document.getElementById("edit-category").value.trim()||null,e.emotion=document.getElementById("edit-emotion").value.trim(),e.example=document.getElementById("edit-example").value.trim(),e.image=document.getElementById("edit-image").value.trim(),N(e),r(),t()}),document.addEventListener("keydown",function o(n){n.key==="Escape"&&(r(),document.removeEventListener("keydown",o))})}function M(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function be(e){switch(e){case"word":return'<i class="fa-solid fa-font"></i> Palabra';case"phrasal":return'<i class="fa-solid fa-link"></i> Phrasal Verb';case"expression":return'<i class="fa-solid fa-comment"></i> Expresión';case"connector":return'<i class="fa-solid fa-arrows-left-right"></i> Conector';default:return'<i class="fa-solid fa-file"></i> Otro'}}function re(e){const t=pe(),a=Q(),r=oe(),o=24,n=2*Math.PI*o,c=Math.min(r.dailyGoal.count/r.dailyGoal.target,1),h=n-c*n;e.innerHTML=`
    <!-- Gamification Hub -->
    <div class="gamification-hub">
      <div class="stat-card streak-card">
        <div class="stat-icon streak-flame"><i class="fa-solid fa-fire"></i></div>
        <div class="stat-content">
          <span class="streak-count">${r.streak} <span style="font-size: 1rem; color: #b45309;">días</span></span>
          <span class="stat-label">Racha actual</span>
        </div>
      </div>
      
      <div class="stat-card daily-goal-card">
        <div class="stat-content">
          <span class="stat-value">${r.dailyGoal.count} / ${r.dailyGoal.target}</span>
          <span class="stat-label">Meta diaria</span>
        </div>
        <div class="progress-ring">
          <svg width="60" height="60">
            <circle stroke="#e5e7eb" stroke-width="4" fill="transparent" r="${o}" cx="30" cy="30" />
            <circle stroke="#3b82f6" stroke-width="4" fill="transparent" r="${o}" cx="30" cy="30" 
              style="stroke-dasharray: ${n} ${n}; stroke-dashoffset: ${h};" />
          </svg>
        </div>
      </div>
    </div>

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
        <div class="progress-item">
          <div class="progress-label">
            <span>Conectores</span>
            <span>${t.byType.connector}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill info" style="width: ${t.total>0?t.byType.connector/t.total*100:0}%"></div>
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
          <option value="connector">Conectores</option>
        </select>
      </div>
      <div class="filter-group">
        <i class="fa-solid fa-folder filter-icon"></i>
        <select id="filter-category">
          <option value="all">Todas las categorías</option>
          ${a.map(v=>`<option value="${v}">${v}</option>`).join("")}
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
  `;const l=document.getElementById("word-list"),E=document.getElementById("filter-status"),u=document.getElementById("filter-type"),S=document.getElementById("filter-category"),m=document.getElementById("sort-by"),p=document.getElementById("search-input"),I=document.getElementById("clear-search"),T=document.getElementById("results-info"),D=document.getElementById("export-btn"),R=document.getElementById("import-btn"),z=document.getElementById("import-file");function x(){l.innerHTML="";let v=p.value.trim()?de(p.value.trim()):k();v=v.filter(y=>{const f=E.value==="all"||E.value==="remembered"&&y.remembered||E.value==="forgotten"&&!y.remembered,s=u.value==="all"||y.type===u.value,i=S.value==="all"||y.category===S.value;return f&&s&&i}),v=me(v,m.value);const $=k().length;if(p.value.trim()?(T.innerHTML=`<span class="results-count">${v.length} resultados</span> para "<strong>${p.value}</strong>"`,T.style.display="block"):v.length!==$?(T.innerHTML=`<span class="results-count">${v.length} de ${$}</span> palabras`,T.style.display="block"):T.style.display="none",v.length===0){l.innerHTML=`
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-book-open"></i></div>
          <h3>${p.value.trim()?"No se encontraron resultados":"Tu vocabulario está vacío"}</h3>
          <p>${p.value.trim()?"Intenta con otra búsqueda.":"Empieza añadiendo tu primera palabra o carga un pack de inicio para arrancar."}</p>
          
          ${p.value.trim()?"":`
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
                ${H.map(f=>`
                  <div class="pack-card" data-pack-id="${f.id}">
                    <div class="pack-check"><i class="fa-solid fa-circle-check"></i></div>
                    <div class="pack-icon"><i class="fa-solid ${f.icon}"></i></div>
                    <div class="pack-info">
                      <h4>${f.name}</h4>
                      <p>${f.description}</p>
                      <div class="pack-count"><i class="fa-solid fa-layer-group"></i> ${f.words.length} palabras</div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `}
        </div>
      `;const y=l.querySelector("#import-packs-btn");if(y){let f=new Set;const s=()=>{const i=f.size;if(y.disabled=i===0,i===0)y.textContent="Selecciona packs",y.classList.remove("active");else{let d=0;f.forEach(b=>{const g=H.find(w=>w.id===b);g&&(d+=g.words.length)}),y.innerHTML=`<i class="fa-solid fa-download"></i> Añadir ${i} pack${i>1?"s":""} (${d} palabras)`,y.classList.add("active")}};l.querySelectorAll(".pack-card").forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.packId;f.has(d)?(f.delete(d),i.classList.remove("selected")):(f.add(d),i.classList.add("selected")),s()})}),y.addEventListener("click",()=>{if(f.size!==0&&confirm(`¿Añadir ${f.size} packs a tu vocabulario?`)){let i=[];f.forEach(g=>{const w=H.find(C=>C.id===g);w&&(i=i.concat(w.words))});const d=JSON.stringify({words:i}),b=_(d);b.success?(L("Packs añadidos",`¡Genial! Se han añadido ${b.imported} palabras nuevas.`,"success"),re(e)):L("Error","Hubo un problema al cargar los packs.","error")}})}}else v.forEach(y=>{l.appendChild(we(y,x))})}E.addEventListener("change",x),u.addEventListener("change",x),S.addEventListener("change",x),m.addEventListener("change",x);let j;p.addEventListener("input",()=>{I.style.display=p.value?"flex":"none",clearTimeout(j),j=setTimeout(x,300)}),I.addEventListener("click",()=>{p.value="",I.style.display="none",x()}),D.addEventListener("click",()=>{const v=ye(),$=new Blob([v],{type:"application/json"}),y=URL.createObjectURL($),f=document.createElement("a");f.href=y,f.download=`emowords-backup-${new Date().toISOString().split("T")[0]}.json`,f.click(),URL.revokeObjectURL(y)}),R.addEventListener("click",()=>{z.click()}),z.addEventListener("change",v=>{const $=v.target.files[0];if(!$)return;const y=new FileReader;y.onload=f=>{const s=_(f.target.result);s.success?(L("Importación completada",`${s.imported} palabras importadas correctamente.`,"success"),setTimeout(()=>location.reload(),1500)):L("Error de importación",s.error,"error")},y.readAsText($)}),x()}function xe(e){const t=Q();e.innerHTML=`
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
              ${t.map(E=>`<option value="${E}">`).join("")}
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
  `;const a=document.getElementById("add-word-form"),r=document.getElementById("image"),o=document.getElementById("preview-image-btn"),n=document.getElementById("image-preview"),c=document.getElementById("preview-img"),h=document.getElementById("remove-preview"),l=document.getElementById("clear-form");o.addEventListener("click",()=>{const E=r.value.trim();E&&(c.src=E,n.style.display="block",c.onerror=()=>{n.style.display="none",L("Error de imagen","No se pudo cargar la imagen. Verifica la URL.","warning")})}),h.addEventListener("click",()=>{r.value="",n.style.display="none",c.src=""}),l.addEventListener("click",()=>{a.reset(),n.style.display="none",c.src=""}),a.addEventListener("submit",E=>{E.preventDefault();const u=document.getElementById("word").value.trim(),S=document.getElementById("meaning").value.trim(),m=document.getElementById("type").value,p=document.getElementById("category").value.trim(),I=document.getElementById("emotion").value.trim(),T=document.getElementById("example").value.trim(),D=document.getElementById("image").value.trim();if(!u||!S){L("Faltan datos","Por favor completa al menos la palabra y su significado.","error");return}if(Z(u)){L("Palabra duplicada",`La palabra "${u}" ya existe en tu vocabulario.`,"error");return}const R={id:Date.now(),word:u,meaning:S,type:m,category:p||null,emotion:I,example:T,image:D,remembered:!1};se(R),a.reset(),n.style.display="none",c.src="",L("¡Guardado!",`"${u}" se ha añadido correctamente.`,"success"),document.getElementById("word").focus()})}const Ee="modulepreload",Se=function(e){return"/emowords/"+e},X={},ke=function(t,a,r){let o=Promise.resolve();if(a&&a.length>0){let E=function(u){return Promise.all(u.map(S=>Promise.resolve(S).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};var c=E;document.getElementsByTagName("link");const h=document.querySelector("meta[property=csp-nonce]"),l=h?.nonce||h?.getAttribute("nonce");o=E(a.map(u=>{if(u=Se(u),u in X)return;X[u]=!0;const S=u.endsWith(".css"),m=S?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${m}`))return;const p=document.createElement("link");if(p.rel=S?"stylesheet":Ee,S||(p.as="script"),p.crossOrigin="",p.href=u,l&&p.setAttribute("nonce",l),document.head.appendChild(p),S)return new Promise((I,T)=>{p.addEventListener("load",I),p.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${u}`)))})}))}function n(h){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=h,window.dispatchEvent(l),!l.defaultPrevented)throw h}return o.then(h=>{for(const l of h||[])l.status==="rejected"&&n(l.reason);return t().catch(n)})};function Ce(e){let t=null,a=null,r=!1,o=[],n={correct:0,incorrect:0,xp:0},c=new Map;const h=2;o=ge(),y(o);function l(){e.innerHTML="",t||E()}function E(){const s=o.length;e.innerHTML=`
      <h2 style="text-align: center; margin-bottom: 0.5rem;">Modo de Repaso</h2>
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
    `,e.querySelectorAll(".mode-card").forEach(i=>{i.addEventListener("click",()=>{if(t=i.dataset.mode,console.log(`Starting mode: ${t} with queue size: ${o.length}`),o.length===0){L("Sin palabras","No hay palabras pendientes para repasar ahora.","info"),j(e);return}l(),u(),I()})})}function u(){if(e.querySelector(".review-header"))return;const s=document.createElement("div");s.className="review-header",s.innerHTML=`
       <button class="back-btn" id="exit-mode" title="Salir"><i class="fa-solid fa-arrow-left"></i></button>
       <div class="review-progress">
         <div class="progress-stat" id="stat-queue">
           <i class="fa-solid fa-book progress-icon"></i>
           <span class="val">${o.length}</span>
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
     `,e.insertBefore(s,e.firstChild),document.getElementById("exit-mode").addEventListener("click",b=>{b.preventDefault(),n.correct>0||n.incorrect>0?confirm("¿Salir del modo repaso? Tu progreso se perderá.")&&m():m()});const d=document.createElement("div");d.id="active-content",d.className="review-container",e.appendChild(d)}function S(){const s=document.querySelector("#stat-queue .val"),i=document.querySelector("#stat-correct .val"),d=document.querySelector("#stat-xp .val");s&&(s.textContent=o.length),i&&(i.textContent=n.correct),d&&(d.textContent=`${n.xp} XP`)}function m(){t=null,l()}function p(){return o.shift()||null}function I(){if(!t){l();return}const s=document.getElementById("active-content");if(!s){l();return}if(a=p(),!a){j(s);return}switch(t){case"flashcard":T(s);break;case"quiz":D(s);break;case"typing":R(s);break;case"listening":z(s);break}}function T(s){r=!1,a.reviewCount,s.innerHTML=`
      <div class="review-card" id="review-card">
        <div class="review-card-inner">
           <div class="review-meta">
              <span class="tag type-tag">${f(a.type)}</span>
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
    `,document.getElementById("review-speak-btn").addEventListener("click",w=>{w.stopPropagation(),B(a.word)});const i=document.getElementById("show-answer"),d=document.getElementById("review-answer"),b=document.getElementById("remembered-btn"),g=document.getElementById("forgotten-btn");i.addEventListener("click",()=>{r=!0,d.style.display="block",i.style.display="none",b.disabled=!1,g.disabled=!1,d.classList.add("fade-in")}),b.addEventListener("click",()=>x(!0)),g.addEventListener("click",()=>x(!1)),$(w=>{w==="Space"&&!r&&i.click(),w==="ArrowRight"&&r&&x(!0),w==="ArrowLeft"&&r&&x(!1)})}function D(s){const d=k().filter(C=>C.id!==a.id).sort(()=>.5-Math.random()).slice(0,3),b=[a,...d];y(b),s.innerHTML=`
      <div class="quiz-container">
         <div class="quiz-question">
            <h3 class="quiz-word">${a.word}</h3>
            <button class="speak-btn" id="quiz-speak-btn" style="margin: 0 auto; width: 40px; height: 40px; font-size: 1.2rem;">
                <i class="fa-solid fa-volume-high"></i>
            </button>
         </div>

         <div class="quiz-options">
            ${b.map(C=>`
                <button class="quiz-option" data-id="${C.id}">
                    ${C.meaning}
                </button>
            `).join("")}
         </div>
      </div>
    `,document.getElementById("quiz-speak-btn").addEventListener("click",()=>B(a.word));const g=s.querySelectorAll(".quiz-option");let w=!1;g.forEach(C=>{C.addEventListener("click",()=>{if(w)return;w=!0,String(C.dataset.id)===String(a.id)?(C.classList.add("correct"),setTimeout(()=>x(!0),800)):(C.classList.add("wrong"),g.forEach(V=>{String(V.dataset.id)===String(a.id)&&V.classList.add("correct")}),setTimeout(()=>x(!1),1500))})})}function R(s){s.innerHTML=`
      <div class="typing-container">
         <div class="review-card-inner" style="margin-bottom: 2rem;">
             <p style="font-size: 1.5rem; margin-bottom: 0.5rem; font-weight:700; color:var(--primary-600);">${a.meaning}</p>
             ${a.example?`<p style="font-style:italic; color:var(--gray-500)">"${a.example.replace(new RegExp(a.word,"gi"),"___")}"</p>`:""}
         </div>
         
         <input type="text" class="typing-input" id="type-input" placeholder="Escribe la palabra en inglés..." autocomplete="off">
         
         <button id="check-btn" class="add-word-btn" style="width: 100%;">Comprobar</button>
         <button id="give-up-btn" style="background:none; border:none; color:var(--gray-500); margin-top:1rem; cursor:pointer;">No lo sé</button>
      </div>
    `,setTimeout(()=>document.getElementById("type-input").focus(),100);const i=document.getElementById("type-input"),d=document.getElementById("check-btn"),b=document.getElementById("give-up-btn");function g(){i.value.trim().toLowerCase()===a.word.toLowerCase()?(i.classList.add("correct"),d.innerHTML='<i class="fa-solid fa-check"></i> Correcto',B(a.word),setTimeout(()=>x(!0),1e3)):(i.classList.add("wrong"),B("Incorrect","en-US"),setTimeout(()=>i.classList.remove("wrong"),500))}d.addEventListener("click",g),i.addEventListener("keydown",w=>{w.key==="Enter"&&g()}),b.addEventListener("click",()=>{i.value=a.word,i.classList.add("wrong"),B(a.word),setTimeout(()=>x(!1),2e3)})}function z(s){const d=k().filter(A=>A.id!==a.id).sort(()=>.5-Math.random()).slice(0,3),b=[a,...d];y(b),s.innerHTML=`
      <div class="quiz-container">
         <div class="quiz-question">
            <div style="font-size: 4rem; color: var(--primary-500); cursor: pointer; margin-bottom: 1rem;" id="listen-icon">
                <i class="fa-solid fa-circle-play"></i>
            </div>
            <p style="color: var(--gray-500);">Escucha y selecciona el significado</p>
         </div>

         <div class="quiz-options">
            ${b.map(A=>`
                <button class="quiz-option" data-id="${A.id}">
                    ${A.meaning}
                </button>
            `).join("")}
         </div>
      </div>
    `;const g=document.getElementById("listen-icon"),w=()=>{g.style.transform="scale(0.9)",setTimeout(()=>g.style.transform="scale(1)",150),B(a.word)};g.addEventListener("click",w),setTimeout(w,500);const C=s.querySelectorAll(".quiz-option");let O=!1;C.forEach(A=>{A.addEventListener("click",()=>{if(O)return;O=!0,String(A.dataset.id)===String(a.id)?(A.classList.add("correct"),setTimeout(()=>x(!0),800)):(A.classList.add("wrong"),C.forEach(U=>{String(U.dataset.id)===String(a.id)&&U.classList.add("correct")}),setTimeout(()=>x(!1),1500))})})}function x(s){try{if(!a)return;if(ue(a.id,s),s){n.correct++,n.xp+=10;try{J(1)}catch(i){console.error(i)}c.delete(a.id)}else{n.incorrect++;const i=c.get(a.id)||0;i<h&&(c.set(a.id,i+1),o.push(a))}a=null,S(),I()}catch(i){console.error("Error in handleResult:",i)}}function j(s){try{J(0);const i=document.querySelector(".review-header");i&&(i.style.display="none");let d;try{d=oe()}catch{d={streak:0,dailyGoal:{count:0,target:20}}}s.innerHTML=`
          <div class="empty-review-state">
            <div class="empty-icon" style="color: var(--success-500); animation: bounce 1s infinite;"><i class="fa-solid fa-trophy"></i></div>
            <h3>¡Sesión completada!</h3>
            <p>Has ganado <strong style="color:var(--warning-500)">${n.xp} XP</strong></p>
            
            <div class="session-summary">
                <div class="summary-stats">
                  <span class="stat correct"><i class="fa-solid fa-circle-check"></i> ${n.correct}</span>
                  <span class="stat incorrect"><i class="fa-solid fa-circle-xmark"></i> ${n.incorrect}</span>
                </div>
            </div>
            
            <div class="streak-mini" style="margin: 1.5rem 0; padding: 1rem; background: #fffbeb; border-radius: 8px; border: 1px solid #fcd34d;">
                <p style="color: #b45309; font-weight: bold;"><i class="fa-solid fa-fire"></i> Racha: ${d.streak} días</p>
                <p style="font-size: 0.9rem; color: #92400e;">Meta diaria: ${d.dailyGoal.count} / ${d.dailyGoal.target}</p>
            </div>
    
            <button class="add-word-btn" id="finish-btn">Volver al inicio</button>
          </div>
        `,window.confetti||window.canvasConfetti?(window.confetti||window.canvasConfetti)({particleCount:100,spread:70,origin:{y:.6}}):ke(()=>import("./confetti.module-C2jkTI5u.js"),[]).then(g=>{const w=g.default;w({particleCount:100,spread:70,origin:{y:.6}})}).catch(g=>console.log("Confetti not found",g));const b=document.getElementById("finish-btn");b&&b.addEventListener("click",()=>{t=null;const g=document.querySelector('[data-view="home"]');g?g.click():l()})}catch(i){console.error("Error in renderSummary:",i),s.innerHTML='<p class="error">Error al mostrar resumen. <button onclick="location.reload()">Recargar</button></p>'}}let v=null;function $(s){v&&v();const i=d=>{document.getElementById("active-content")&&document.activeElement.tagName!=="INPUT"&&s(d.code)};document.addEventListener("keydown",i),v=()=>document.removeEventListener("keydown",i),window._reviewCleanup=v}function y(s){for(let i=s.length-1;i>0;i--){const d=Math.floor(Math.random()*(i+1));[s[i],s[d]]=[s[d],s[i]]}return s}function f(s){return{word:"Palabra",phrasal:"Phrasal Verb",expression:"Expresión",connector:"Conector"}[s]||"Otro"}l()}const P=document.getElementById("app");window.addEventListener("offline",()=>{L("Sin conexión","Estás trabajando en modo offline.","warning",5e3),document.body.classList.add("offline-mode")});window.addEventListener("online",()=>{L("Conexión restaurada","Tus cambios se guardarán correctamente.","success",3e3),document.body.classList.remove("offline-mode")});window.addEventListener("error",e=>{console.error("Global error:",e.error),L("Error inesperado","Ha ocurrido un error. Intenta recargar la página.","error",0)});window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason)});const ne=document.querySelectorAll(".nav-link"),G=document.getElementById("theme-toggle");function Le(){const t=W().theme||"dark";F(t)}function F(e){document.documentElement.setAttribute("data-theme",e);const t=G.querySelector("i");e==="dark"?(t.className="fa-solid fa-sun",G.title="Cambiar a modo claro"):(t.className="fa-solid fa-moon",G.title="Cambiar a modo oscuro");const a=W();a.theme=e,fe(a)}function Te(){const t=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.body.classList.add("theme-transitioning"),F(t),setTimeout(()=>{document.body.classList.remove("theme-transitioning")},300)}G.addEventListener("click",Te);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{W().theme||F(e.matches?"dark":"light")});function Ie(e){ne.forEach(t=>{t.dataset.view===e?t.classList.add("active"):t.classList.remove("active")})}function ie(e){window._reviewCleanup&&(window._reviewCleanup(),window._reviewCleanup=null),Ie(e),P.style.opacity="0",P.style.transform="translateY(10px)",setTimeout(()=>{switch(e){case"home":re(P);break;case"add":xe(P);break;case"review":Ce(P);break;default:P.innerHTML="<p>Vista no encontrada</p>"}window.scrollTo({top:0,left:0,behavior:"instant"}),requestAnimationFrame(()=>{P.style.opacity="1",P.style.transform="translateY(0)"})},150)}P.style.transition="opacity 0.15s ease, transform 0.15s ease";ne.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const a=e.dataset.view;ie(a)})});Le();ie("home");"serviceWorker"in navigator&&window.addEventListener("load",()=>{const t="/emowords/"+"sw.js";navigator.serviceWorker.register(t).then(a=>{console.log("SW registered: ",a)}).catch(a=>{console.log("SW registration failed: ",a)})});
