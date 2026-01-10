export const starterPacks = [
  // --- NIVEL A1/A2 (BÁSICO / SUPERVIVENCIA) ---
  {
    id: 'survival-a1',
    name: 'Survival Essentials (A1)',
    icon: 'fa-life-ring',
    description: 'Palabras sin las que no puedes vivir.',
    words: [
      { word: 'Water', meaning: 'Agua', type: 'word', category: 'Esencial', example: 'Can I have some water, please?' },
      { word: 'Bathroom', meaning: 'Baño', type: 'word', category: 'Esencial', example: 'Where is the bathroom?' },
      { word: 'Wifi', meaning: 'Wifi/Internet', type: 'word', category: 'Esencial', example: 'What is the wifi password?' },
      { word: 'Charger', meaning: 'Cargador', type: 'word', category: 'Tecnología', example: 'Do you have a phone charger?' },
      { word: 'Password', meaning: 'Contraseña', type: 'word', category: 'Seguridad', example: 'I forgot my password.' },
      { word: 'ATM', meaning: 'Cajero automático', type: 'word', category: 'Dinero', example: 'Is there an ATM near here?' },
      { word: 'Help', meaning: 'Ayuda', type: 'word', category: 'Esencial', emotion: 'Urgencia, necesidad' },
      { word: 'Late', meaning: 'Tarde', type: 'word', category: 'Tiempo', example: 'Sorry I\'m late.' },
      { word: 'Ready', meaning: 'Listo/Preparado', type: 'word', category: 'Estado', example: 'Are you ready?' },
      { word: 'Bill', meaning: 'Cuenta (restaurante)', type: 'word', category: 'Viajes', example: 'Can we have the bill?' }
    ]
  },
  {
    id: 'digital-life-a2',
    name: 'Digital Life (A2)',
    icon: 'fa-mobile-screen',
    description: 'Para moverte en apps y redes.',
    words: [
      { word: 'Share', meaning: 'Compartir', type: 'word', category: 'Redes Sociales', example: 'Share this post.' },
      { word: 'Like', meaning: 'Gustar / Dar like', type: 'word', category: 'Redes Sociales', example: 'Like and subscribe.' },
      { word: 'Search', meaning: 'Buscar', type: 'word', category: 'Internet', example: 'Search on Google.' },
      { word: 'Download', meaning: 'Descargar', type: 'word', category: 'Tecnología', example: 'Download the app.' },
      { word: 'Login', meaning: 'Iniciar sesión', type: 'word', category: 'Seguridad', example: 'Login to your account.' },
      { word: 'Settings', meaning: 'Ajustes/Configuración', type: 'word', category: 'Tecnología', example: 'Check your privacy settings.' },
      { word: 'Message', meaning: 'Mensaje', type: 'word', category: 'Comunicación', example: 'Send me a message.' },
      { word: 'Profile', meaning: 'Perfil', type: 'word', category: 'Redes Sociales', example: 'Update your profile picture.' },
      { word: 'Link', meaning: 'Enlace', type: 'word', category: 'Internet', example: 'Click the link in bio.' },
      { word: 'Follow', meaning: 'Seguir', type: 'word', category: 'Redes Sociales', example: 'Follow me on Instagram.' }
    ]
  },
  {
    id: 'daily-routine-a2',
    name: 'Modern Routine (A2)',
    icon: 'fa-mug-hot',
    description: 'Tu día a día real.',
    words: [
      { word: 'Coffee', meaning: 'Café', type: 'word', category: 'Rutina', emotion: 'Energía mañanera' },
      { word: 'Gym', meaning: 'Gimnasio', type: 'word', category: 'Estilo de vida', example: 'I go to the gym after work.' },
      { word: 'Traffic', meaning: 'Tráfico', type: 'word', category: 'Transporte', emotion: 'Estrés, bocinas' },
      { word: 'Meeting', meaning: 'Reunión', type: 'word', category: 'Trabajo', example: 'I have a Zoom meeting.' },
      { word: 'Lunch', meaning: 'Almuerzo', type: 'word', category: 'Comida', example: 'Let\'s grab lunch.' },
      { word: 'Tired', meaning: 'Cansado', type: 'word', category: 'Estado', emotion: 'Necesito dormir' },
      { word: 'Weekend', meaning: 'Fin de semana', type: 'word', category: 'Tiempo', emotion: 'Libertad, descanso' },
      { word: 'Watch', meaning: 'Mirar (pantallas)', type: 'word', category: 'Ocio', example: 'Watch Netflix.' },
      { word: 'Cook', meaning: 'Cocinar', type: 'word', category: 'Casa', example: 'I don\'t like to cook.' },
      { word: 'Clean', meaning: 'Limpiar', type: 'word', category: 'Casa', example: 'Clean your room.' }
    ]
  },
  {
    id: 'cool-slang-a2',
    name: 'Basic Slang (A1/A2)',
    icon: 'fa-bolt',
    description: 'Palabras que oyes en series y YouTube.',
    words: [
      { word: 'Cool', meaning: 'Genial/Guay', type: 'word', category: 'Slang', example: 'That car is so cool.' },
      { word: 'Dude', meaning: 'Tío/Colega', type: 'word', category: 'Slang', example: 'Hey dude, what\'s up?' },
      { word: 'Chill', meaning: 'Relajado/Tranquilo', type: 'word', category: 'Slang', example: 'Just chill out.' },
      { word: 'No way', meaning: 'Ni de broma / No me digas', type: 'expression', category: 'Slang', emotion: 'Sorpresa total' },
      { word: 'Awesome', meaning: 'Impresionante', type: 'word', category: 'Slang', example: 'The movie was awesome.' },
      { word: 'Weird', meaning: 'Raro', type: 'word', category: 'Adjetivos', example: 'That guy is weird.' },
      { word: 'Guys', meaning: 'Chicos/Gente', type: 'word', category: 'Slang', example: 'Hi guys!' },
      { word: 'Stuff', meaning: 'Cosas', type: 'word', category: 'General', example: 'I have a lot of stuff to do.' },
      { word: 'Sucks', meaning: 'Apesta (es malo)', type: 'word', category: 'Slang', example: 'This weather sucks.' },
      { word: 'Whatever', meaning: 'Lo que sea / Me da igual', type: 'word', category: 'Slang', emotion: 'Indiferencia' }
    ]
  },
  {
    id: 'travel-smart-a2',
    name: 'Smart Travel (A2)',
    icon: 'fa-plane-departure',
    description: 'Viajar hoy en día.',
    words: [
      { word: 'Booking', meaning: 'Reserva', type: 'word', category: 'Viajes', example: 'I made a booking online.' },
      { word: 'Review', meaning: 'Reseña/Opinión', type: 'word', category: 'Internet', example: 'Check the reviews first.' },
      { word: 'Location', meaning: 'Ubicación', type: 'word', category: 'Viajes', example: 'Send me your location.' },
      { word: 'Ticket', meaning: 'Entrada/Billete', type: 'word', category: 'Viajes', example: 'Digital ticket.' },
      { word: 'Delay', meaning: 'Retraso', type: 'word', category: 'Viajes', emotion: 'Espera en aeropuerto' },
      { word: 'Subway', meaning: 'Metro', type: 'word', category: 'Transporte', example: 'Take the subway.' },
      { word: 'Cheap', meaning: 'Barato', type: 'word', category: 'Dinero', example: 'It is very cheap.' },
      { word: 'Safe', meaning: 'Seguro', type: 'word', category: 'Seguridad', example: 'Is this area safe?' },
      { word: 'Trip', meaning: 'Viaje (corto)', type: 'word', category: 'Viajes', example: 'Have a nice trip.' },
      { word: 'Bag', meaning: 'Bolsa/Maleta', type: 'word', category: 'Viajes', example: 'Pack your bags.' }
    ]
  },

  // --- NIVEL B1 (INTERMEDIO - EL MÁS ÚTIL) ---
  {
    id: 'remote-work-b1',
    name: 'Remote Work (B1)',
    icon: 'fa-laptop-house',
    description: 'Inglés para trabajar desde casa o la oficina.',
    words: [
      { word: 'Schedule', meaning: 'Horario/Agendar', type: 'word', category: 'Trabajo', example: 'Let\'s schedule a call.' },
      { word: 'Deadline', meaning: 'Fecha límite', type: 'word', category: 'Trabajo', emotion: 'Reloj tic-tac, entrega' },
      { word: 'Feedback', meaning: 'Opinión/Corrección', type: 'word', category: 'Trabajo', example: 'Thanks for the feedback.' },
      { word: 'Screen', meaning: 'Pantalla', type: 'word', category: 'Tecnología', example: 'Can you see my screen?' },
      { word: 'Update', meaning: 'Poner al día/Actualizar', type: 'word', category: 'Trabajo', example: 'Give me an update.' },
      { word: 'Bug', meaning: 'Error (informático)', type: 'word', category: 'Tecnología', example: 'There is a bug in the system.' },
      { word: 'Team', meaning: 'Equipo', type: 'word', category: 'Trabajo', example: 'Great team work.' },
      { word: 'Break', meaning: 'Descanso', type: 'word', category: 'Trabajo', emotion: 'Café, relax 5 min' },
      { word: 'Task', meaning: 'Tarea', type: 'word', category: 'Trabajo', example: 'Focus on this task.' },
      { word: 'Support', meaning: 'Soporte/Apoyo', type: 'word', category: 'Trabajo', example: 'Contact tech support.' }
    ]
  },
  {
    id: 'phrasals-must-b1',
    name: 'Must-Know Phrasals (B1)',
    icon: 'fa-star',
    description: 'Los 10 phrasal verbs que USAS cada día.',
    words: [
      { word: 'Pick up', meaning: 'Recoger/Contestar', type: 'word', category: 'Phrasal Verbs', example: 'Pick up the phone.' },
      { word: 'Find out', meaning: 'Descubrir/Enterarse', type: 'word', category: 'Phrasal Verbs', emotion: 'Luz, información nueva' },
      { word: 'Give up', meaning: 'Rendirse/Dejar (hábito)', type: 'word', category: 'Phrasal Verbs', example: 'Don\'t give up.' },
      { word: 'Go on', meaning: 'Continuar/Suceder', type: 'word', category: 'Phrasal Verbs', example: 'What is going on?' },
      { word: 'Come back', meaning: 'Volver', type: 'word', category: 'Phrasal Verbs', example: 'Come back here.' },
      { word: 'Turn on', meaning: 'Encender', type: 'word', category: 'Phrasal Verbs', example: 'Turn on the TV.' },
      { word: 'Wake up', meaning: 'Despertarse', type: 'word', category: 'Phrasal Verbs', emotion: 'Ojos abiertos, mañana' },
      { word: 'Log in', meaning: 'Entrar (web)', type: 'word', category: 'Phrasal Verbs', example: 'Log in with your email.' },
      { word: 'Set up', meaning: 'Configurar/Montar', type: 'word', category: 'Phrasal Verbs', example: 'Set up the wifi.' },
      { word: 'Work out', meaning: 'Hacer ejercicio / Funcionar', type: 'word', category: 'Phrasal Verbs', example: 'I work out every day.' }
    ]
  },
  {
    id: 'streaming-b1',
    name: 'Streaming & Media (B1)',
    icon: 'fa-play',
    description: 'Vocabulario de Netflix, YouTube y Podcasts.',
    words: [
      { word: 'Episode', meaning: 'Episodio', type: 'word', category: 'Ocio', example: 'Last episode was crazy.' },
      { word: 'Season', meaning: 'Temporada', type: 'word', category: 'Ocio', example: 'Waiting for season 2.' },
      { word: 'Spoiler', meaning: 'Destripe', type: 'word', category: 'Ocio', emotion: 'Arruinar la sorpresa' },
      { word: 'Trending', meaning: 'Tendencia', type: 'word', category: 'Redes Sociales', example: 'It is trending on Twitter.' },
      { word: 'Skip', meaning: 'Saltar (intro/anuncio)', type: 'word', category: 'Acción', example: 'Skip intro.' },
      { word: 'Subscribe', meaning: 'Suscribirse', type: 'word', category: 'Internet', example: 'Subscribe for more.' },
      { word: 'Content', meaning: 'Contenido', type: 'word', category: 'Internet', example: 'Creator of content.' },
      { word: 'Ad/Advertisement', meaning: 'Anuncio', type: 'word', category: 'Marketing', example: 'Too many ads.' },
      { word: 'Stream', meaning: 'Retransmitir', type: 'word', category: 'Internet', example: 'Live stream.' },
      { word: 'Host', meaning: 'Anfitrión/Presentador', type: 'word', category: 'Personas', example: 'The podcast host.' }
    ]
  },
  {
    id: 'dating-social-b1',
    name: 'Dating & Social (B1)',
    icon: 'fa-heart',
    description: 'Relaciones modernas y vida social.',
    words: [
      { word: 'Date', meaning: 'Cita (romántica)', type: 'word', category: 'Relaciones', example: 'I have a date tonight.' },
      { word: 'Hang out', meaning: 'Pasar el rato', type: 'word', category: 'Social', example: 'Let\'s hang out later.' },
      { word: 'Single', meaning: 'Soltero/a', type: 'word', category: 'Relaciones', example: 'Are you single?' },
      { word: 'Break up', meaning: 'Romper (relación)', type: 'word', category: 'Phrasal Verbs', emotion: 'Corazón roto' },
      { word: 'Ex', meaning: 'Ex pareja', type: 'word', category: 'Relaciones', example: 'Don\'t text your ex.' },
      { word: 'Couple', meaning: 'Pareja', type: 'word', category: 'Relaciones', example: 'Cute couple.' },
      { word: 'Ghosting', meaning: 'Desaparecer (ignorar)', type: 'word', category: 'Slang', emotion: 'Silencio, visto' },
      { word: 'Crush', meaning: 'Amor platónico', type: 'word', category: 'Slang', emotion: 'Mariposas, ilusión' },
      { word: 'Friendzone', meaning: 'Zona de amigos', type: 'word', category: 'Slang', example: 'I am in the friendzone.' },
      { word: 'Cheat', meaning: 'Engañar (infiel)', type: 'word', category: 'Relaciones', emotion: 'Mentira, traición' }
    ]
  },
  {
    id: 'fitness-health-b1',
    name: 'Fitness Lifestyle (B1)',
    icon: 'fa-dumbbell',
    description: 'Cuerpo sano, mente sana.',
    words: [
      { word: 'Workout', meaning: 'Entrenamiento', type: 'word', category: 'Deporte', example: 'Good workout today.' },
      { word: 'Healthy', meaning: 'Saludable', type: 'word', category: 'Salud', example: 'Eat healthy food.' },
      { word: 'Muscle', meaning: 'Músculo', type: 'word', category: 'Cuerpo', example: 'Build muscle.' },
      { word: 'Weight', meaning: 'Peso', type: 'word', category: 'Salud', example: 'Lose weight.' },
      { word: 'Tired', meaning: 'Cansado', type: 'word', category: 'Estado', emotion: 'Sin energía' },
      { word: 'Shape', meaning: 'Forma física', type: 'word', category: 'Salud', example: 'Get in shape.' },
      { word: 'Stretch', meaning: 'Estirar', type: 'word', category: 'Deporte', example: 'Stretch after ranning.' },
      { word: 'Injured', meaning: 'Lesionado', type: 'word', category: 'Salud', emotion: 'Dolor, vendaje' },
      { word: 'Laziness', meaning: 'Pereza', type: 'word', category: 'Estado', emotion: 'Sofá, no hacer nada' },
      { word: 'Goal', meaning: 'Meta/Objetivo', type: 'word', category: 'Motivación', example: 'Fitness goals.' }
    ]
  },

  // --- NIVEL B2 (FLUIDEZ REAL - NO ACADÉMICO) ---
  {
    id: 'speaking-connectors-b2',
    name: 'Speaking Flow (B2)',
    icon: 'fa-comments',
    description: 'Conectores para no quedarte callado pensando.',
    words: [
      { word: 'Actually', meaning: 'En realidad / De hecho', type: 'connector', category: 'Speaking', example: 'Actually, I don\'t know.' },
      { word: 'Basically', meaning: 'Básicamente', type: 'connector', category: 'Speaking', example: 'Basically, it\'s done.' },
      { word: 'Anyway', meaning: 'En fin / De todas formas', type: 'connector', category: 'Speaking', example: 'Anyway, let\'s go.' },
      { word: 'Literally', meaning: 'Literalmente', type: 'connector', category: 'Speaking', example: 'I was literally dying.' },
      { word: 'Though', meaning: 'Aunque (al final)', type: 'connector', category: 'Speaking', example: 'Thanks, though.' },
      { word: 'I mean', meaning: 'O sea / Quiero decir', type: 'connector', category: 'Speaking', example: 'I mean, it\'s okay.' },
      { word: 'On the other hand', meaning: 'Por otro lado', type: 'connector', category: 'Speaking', emotion: 'Balanza, otra opción' },
      { word: 'Whatever', meaning: 'Lo que sea', type: 'connector', category: 'Speaking', example: 'Do whatever you want.' },
      { word: 'Meaning', meaning: 'Es decir', type: 'connector', category: 'Speaking', example: 'It\'s red, meaning stop.' },
      { word: 'Hopefully', meaning: 'Ojalá / Con suerte', type: 'connector', category: 'Speaking', emotion: 'Esperanza, dedos cruzados' }
    ]
  },
  {
    id: 'startup-tech-b2',
    name: 'Startup & Tech (B2)',
    icon: 'fa-rocket',
    description: 'Lenguaje de negocios modernos y startups.',
    words: [
      { word: 'Pitch', meaning: 'Presentación breve', type: 'word', category: 'Business', example: 'Sales pitch.' },
      { word: 'Founder', meaning: 'Fundador', type: 'word', category: 'Business', example: 'The founder of Amazon.' },
      { word: 'Launch', meaning: 'Lanzar (producto)', type: 'word', category: 'Business', emotion: 'Cohete, inicio' },
      { word: 'Growth', meaning: 'Crecimiento', type: 'word', category: 'Business', emotion: 'Gráfica subiendo' },
      { word: 'Remote', meaning: 'Remoto', type: 'word', category: 'Trabajo', example: 'Remote job.' },
      { word: 'Skill', meaning: 'Habilidad', type: 'word', category: 'Trabajo', example: 'Soft skills.' },
      { word: 'Data', meaning: 'Datos', type: 'word', category: 'Tecnología', example: 'Big data.' },
      { word: 'User', meaning: 'Usuario', type: 'word', category: 'Tecnología', example: 'User experience (UX).' },
      { word: 'Networking', meaning: 'Hacer contactos', type: 'word', category: 'Business', emotion: 'Conexiones, café' },
      { word: 'Value', meaning: 'Valor', type: 'word', category: 'Business', example: 'Add value.' }
    ]
  },
  {
    id: 'phrasals-native-b2',
    name: 'Sounding Native (B2)',
    icon: 'fa-microphone',
    description: 'Phrasal verbs para dejar de sonar como un libro.',
    words: [
      { word: 'Figure out', meaning: 'Resolver / Entender', type: 'word', category: 'Phrasal Verbs', example: 'I will figure it out.' },
      { word: 'Run out of', meaning: 'Quedarse sin', type: 'word', category: 'Phrasal Verbs', example: 'We ran out of coffee.' },
      { word: 'Show up', meaning: 'Aparecer (llegar)', type: 'word', category: 'Phrasal Verbs', example: 'He didn\'t show up.' },
      { word: 'Get along', meaning: 'Llevarse bien', type: 'word', category: 'Phrasal Verbs', emotion: 'Amigos, sin peleas' },
      { word: 'Freak out', meaning: 'Entrar en pánico / Flipar', type: 'word', category: 'Phrasal Verbs', emotion: 'Grito, locura' },
      { word: 'Hang on', meaning: 'Esperar un momento', type: 'word', category: 'Phrasal Verbs', example: 'Hang on a second.' },
      { word: 'Mess up', meaning: 'Estropear / Cagarla', type: 'word', category: 'Phrasal Verbs', example: 'I messed up the exam.' },
      { word: 'Catch up', meaning: 'Ponerse al día', type: 'word', category: 'Phrasal Verbs', example: 'Let\'s catch up soon.' },
      { word: 'Chill out', meaning: 'Relajarse', type: 'word', category: 'Phrasal Verbs', emotion: 'Sofá, calma' },
      { word: 'Check out', meaning: 'Echar un vistazo', type: 'word', category: 'Phrasal Verbs', example: 'Check out this video.' }
    ]
  },
  {
    id: 'emotions-deep-b2',
    name: 'Deep Emotions (B2)',
    icon: 'fa-masks-theater',
    description: 'Para expresar cómo te sientes de verdad.',
    words: [
      { word: 'Overwhelmed', meaning: 'Abrumado/Agobiado', type: 'word', category: 'Emociones', emotion: 'Demasiadas cosas, peso' },
      { word: 'Relieved', meaning: 'Aliviado', type: 'word', category: 'Emociones', emotion: 'Suspiro, peso fuera' },
      { word: 'Awkward', meaning: 'Incómodo (situación)', type: 'word', category: 'Emociones', emotion: 'Silencio, tierra trágame' },
      { word: 'Proud', meaning: 'Orgulloso', type: 'word', category: 'Emociones', emotion: 'Pecho inflado' },
      { word: 'Disappointed', meaning: 'Decepcionado', type: 'word', category: 'Emociones', emotion: 'Expectativa rota' },
      { word: 'Annoying', meaning: 'Molesto', type: 'word', category: 'Adjetivos', example: 'He is so annoying.' },
      { word: 'Grateful', meaning: 'Agradecido', type: 'word', category: 'Emociones', emotion: 'Gracias, plenitud' },
      { word: 'Upset', meaning: 'Disgustado/Molesto', type: 'word', category: 'Emociones', emotion: 'Triste y enfadado' },
      { word: 'Excited', meaning: 'Emocionado', type: 'word', category: 'Emociones', emotion: 'Energía, ganas' },
      { word: 'Mood', meaning: 'Estado de ánimo / "Yo total"', type: 'word', category: 'Slang', example: 'Big mood.' }
    ]
  },
  {
    id: 'debating-b2',
    name: 'Winning Debates (B2)',
    icon: 'fa-gavel',
    description: 'Para dar tu opinión y tener razón.',
    words: [
      { word: 'Agree', meaning: 'Estar de acuerdo', type: 'word', category: 'Opinión', example: 'I totally agree.' },
      { word: 'Disagree', meaning: 'No estar de acuerdo', type: 'word', category: 'Opinión', example: 'I respectfully disagree.' },
      { word: 'Depend', meaning: 'Depender', type: 'word', category: 'Opinión', example: 'It depends on the price.' },
      { word: 'Point', meaning: 'Punto/Argumento', type: 'word', category: 'Opinión', example: 'That is a good point.' },
      { word: 'Sense', meaning: 'Sentido', type: 'word', category: 'Opinión', example: 'That makes no sense.' },
      { word: 'Guess', meaning: 'Suponer/Adivinar', type: 'word', category: 'Opinión', example: 'I guess you are right.' },
      { word: 'Sure', meaning: 'Seguro', type: 'word', category: 'Certeza', example: 'Are you sure?' },
      { word: 'Notice', meaning: 'Notar/Darse cuenta', type: 'word', category: 'Percepción', example: 'Did you notice that?' },
      { word: 'Advice', meaning: 'Consejo', type: 'word', category: 'Ayuda', example: 'Give me some advice.' },
      { word: 'Fair', meaning: 'Justo', type: 'word', category: 'Justicia', example: 'That is not fair.' }
    ]
  },

  // --- NIVEL C1 (ELITE - SOLO LO ÚTIL) ---
  {
    id: 'mindset-c1',
    name: 'Growth Mindset (C1)',
    icon: 'fa-brain',
    description: 'Palabras para desarrollo personal y éxito.',
    words: [
      { word: 'Mindset', meaning: 'Mentalidad', type: 'word', category: 'Psicología', example: 'Change your mindset.' },
      { word: 'Challenge', meaning: 'Desafío/Reto', type: 'word', category: 'Desarrollo', emotion: 'Montaña a escalar' },
      { word: 'Achieve', meaning: 'Lograr/Conseguir', type: 'word', category: 'Éxito', emotion: 'Meta cruzada' },
      { word: 'Failure', meaning: 'Fracaso', type: 'word', category: 'Aprendizaje', emotion: 'Caída, lección' },
      { word: 'Improve', meaning: 'Mejorar', type: 'word', category: 'Desarrollo', example: 'Improve yourself.' },
      { word: 'Habit', meaning: 'Hábito', type: 'word', category: 'Rutina', example: 'Good habits.' },
      { word: 'Focus', meaning: 'Enfoque/Concentración', type: 'word', category: 'Productividad', emotion: 'Láser' },
      { word: 'Aware', meaning: 'Consciente', type: 'word', category: 'Mente', example: 'Be aware of your thoughts.' },
      { word: 'Purpose', meaning: 'Propósito', type: 'word', category: 'Vida', emotion: 'Brújula, razón de ser' },
      { word: 'Struggle', meaning: 'Lucha/Esfuerzo costoso', type: 'word', category: 'Vida', emotion: 'Cuesta arriba' }
    ]
  },
  {
    id: 'pro-connectors-c1',
    name: 'Smart Connectors (C1)',
    icon: 'fa-link',
    description: 'Para conectar ideas como un intelectual.',
    words: [
      { word: 'However', meaning: 'Sin embargo', type: 'connector', category: 'Escritura', example: 'Cheap. However, bad quality.' },
      { word: 'Therefore', meaning: 'Por lo tanto', type: 'connector', category: 'Escritura', example: 'I think, therefore I am.' },
      { word: 'Although', meaning: 'Aunque', type: 'connector', category: 'Escritura', example: 'Although it rained...' },
      { word: 'Instead', meaning: 'En su lugar', type: 'connector', category: 'Escritura', example: 'Do this instead.' },
      { word: 'Unless', meaning: 'A menos que', type: 'connector', category: 'Condición', example: 'Don\'t call unless it\'s urgent.' },
      { word: 'Meanwhile', meaning: 'Mientras tanto', type: 'connector', category: 'Tiempo', example: 'Meanwhile, in London...' },
      { word: 'Despite', meaning: 'A pesar de', type: 'connector', category: 'Contraste', example: 'Despite the weather.' },
      { word: 'Eventually', meaning: 'Finalmente (tras tiempo)', type: 'connector', category: 'Tiempo', emotion: 'Al final de todo' },
      { word: 'Overall', meaning: 'En general / Globalmente', type: 'connector', category: 'Resumen', example: 'Overall, it was good.' },
      { word: 'Apparently', meaning: 'Al parecer / Por lo visto', type: 'connector', category: 'Duda', example: 'Apparently, he left.' }
    ]
  },
  {
    id: 'news-media-c1',
    name: 'News & Media (C1)',
    icon: 'fa-newspaper',
    description: 'Para entender lo que pasa en el mundo.',
    words: [
      { word: 'Issue', meaning: 'Asunto/Problema clave', type: 'word', category: 'Actualidad', example: 'Global issues.' },
      { word: 'Source', meaning: 'Fuente (info)', type: 'word', category: 'Periodismo', example: 'Check your sources.' },
      { word: 'Claim', meaning: 'Afirmar/Reclamar', type: 'word', category: 'Verbos', example: 'He claims to be innocent.' },
      { word: 'Report', meaning: 'Informe/Informar', type: 'word', category: 'Business', example: 'Read the report.' },
      { word: 'Statement', meaning: 'Declaración', type: 'word', category: 'Legal', example: 'Official statement.' },
      { word: 'Threat', meaning: 'Amenaza', type: 'word', category: 'Seguridad', emotion: 'Peligro inminente' },
      { word: 'Crisis', meaning: 'Crisis', type: 'word', category: 'Actualidad', example: 'Economic crisis.' },
      { word: 'Policy', meaning: 'Política/Normativa', type: 'word', category: 'Gobierno', example: 'Privacy policy.' },
      { word: 'Strike', meaning: 'Huelga / Golpe', type: 'word', category: 'Actualidad', example: 'Workers on strike.' },
      { word: 'Trend', meaning: 'Tendencia', type: 'word', category: 'Actualidad', example: 'Market trends.' }
    ]
  },
  {
    id: 'abstract-feelings-c1',
    name: 'Complex & Abstract (C1)',
    icon: 'fa-cloud-moon',
    description: 'Para describir sensaciones difíciles.',
    words: [
      { word: 'Nostalgia', meaning: 'Nostalgia', type: 'word', category: 'Sentimientos', emotion: 'Dolor y amor al pasado' },
      { word: 'Vibe', meaning: 'Vibra / Ambiente', type: 'word', category: 'Slang', emotion: 'Energía del lugar' },
      { word: 'Gut feeling', meaning: 'Corazonada / Instinto', type: 'expression', category: 'Instinto', emotion: 'Estómago avisando' },
      { word: 'Burnout', meaning: 'Agotamiento extremo', type: 'word', category: 'Salud', emotion: 'Batería muerta, cenizas' },
      { word: 'Hype', meaning: 'Expectación exagerada', type: 'word', category: 'Slang', emotion: 'Ruido, marketing' },
      { word: 'Red flag', meaning: 'Señal de alerta', type: 'expression', category: 'Slang', emotion: 'Bandera roja, peligro' },
      { word: 'Cringe', meaning: 'Vergüenza ajena', type: 'word', category: 'Slang', emotion: 'Escalofrío, arrugarse' },
      { word: 'FOMO', meaning: 'Miedo a perderse algo', type: 'word', category: 'Acronimo', emotion: 'Ansiedad social' },
      { word: 'Mood swing', meaning: 'Cambio de humor', type: 'expression', category: 'Psicología', emotion: 'Montaña rusa' },
      { word: 'Comfort zone', meaning: 'Zona de confort', type: 'expression', category: 'Desarrollo', emotion: 'Sofá seguro' }
    ]
  },
  {
    id: 'idioms-useful-c1',
    name: 'Real Idioms (C1)',
    icon: 'fa-comment-dots',
    description: 'Expresiones que SÍ se usan.',
    words: [
      { word: 'Piece of cake', meaning: 'Pan comido (muy fácil)', type: 'expression', category: 'Idioms', example: 'The test was a piece of cake.' },
      { word: 'Break a leg', meaning: 'Mucha mierda (suerte)', type: 'expression', category: 'Idioms', example: 'Go on stage and break a leg.' },
      { word: 'Call it a day', meaning: 'Dar por terminado (trabajo)', type: 'expression', category: 'Idioms', emotion: 'Cerrar portátil' },
      { word: 'So far so good', meaning: 'Hasta ahora todo bien', type: 'expression', category: 'Idioms', example: 'How is it going? So far so good.' },
      { word: 'Make sense', meaning: 'Tener sentido', type: 'expression', category: 'Común', example: 'It makes sense.' },
      { word: 'Keep in touch', meaning: 'Mantenerse en contacto', type: 'expression', category: 'Social', example: 'Let\'s keep in touch.' },
      { word: 'Take it easy', meaning: 'Tomárselo con calma', type: 'expression', category: 'Consejo', emotion: 'Relax' },
      { word: 'Better safe than sorry', meaning: 'Mejor prevenir que curar', type: 'expression', category: 'Consejo', emotion: 'Casco, seguro' },
      { word: 'Long story short', meaning: 'Resumiendo', type: 'expression', category: 'Speaking', emotion: 'Tijeras al relato' },
      { word: 'Get used to', meaning: 'Acostumbrarse', type: 'expression', category: 'Hábito', example: 'I got used to the cold.' }
    ]
  }
];
