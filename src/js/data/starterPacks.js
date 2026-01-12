export const starterPacks = [
  // ==========================================
  // NIVEL A1 - SUPERVIVENCIA BÁSICA
  // ==========================================
  {
    id: 'a1-complete',
    name: 'A1 - Beginner Pack',
    icon: 'fa-seedling',
    description: 'Lo esencial para sobrevivir: verbos del día a día, conectores básicos, tus primeros phrasal verbs y frases que usarás constantemente.',
    level: 'A1',
    words: [
      // --- 10 VERBOS ESENCIALES ---
      { word: 'Be', meaning: 'Ser / Estar', type: 'word', category: 'Verbos', example: 'I am tired. She is my friend.' },
      { word: 'Have', meaning: 'Tener', type: 'word', category: 'Verbos', example: 'I have a question.' },
      { word: 'Want', meaning: 'Querer', type: 'word', category: 'Verbos', example: 'I want coffee, please.' },
      { word: 'Need', meaning: 'Necesitar', type: 'word', category: 'Verbos', example: 'I need help.' },
      { word: 'Like', meaning: 'Gustar', type: 'word', category: 'Verbos', example: 'I like this song.' },
      { word: 'Go', meaning: 'Ir', type: 'word', category: 'Verbos', example: 'I go to work by metro.' },
      { word: 'Know', meaning: 'Saber / Conocer', type: 'word', category: 'Verbos', example: 'I don\'t know.' },
      { word: 'Think', meaning: 'Pensar / Creer', type: 'word', category: 'Verbos', example: 'I think so.' },
      { word: 'See', meaning: 'Ver', type: 'word', category: 'Verbos', example: 'See you tomorrow!' },
      { word: 'Work', meaning: 'Trabajar / Funcionar', type: 'word', category: 'Verbos', example: 'It doesn\'t work.' },

      // --- 10 CONECTORES BÁSICOS ---
      { word: 'And', meaning: 'Y', type: 'connector', category: 'Conectores', example: 'Coffee and a sandwich, please.' },
      { word: 'But', meaning: 'Pero', type: 'connector', category: 'Conectores', example: 'I like it, but it\'s expensive.' },
      { word: 'Or', meaning: 'O', type: 'connector', category: 'Conectores', example: 'Tea or coffee?' },
      { word: 'Because', meaning: 'Porque', type: 'connector', category: 'Conectores', example: 'I\'m late because of the traffic.' },
      { word: 'So', meaning: 'Así que / Entonces', type: 'connector', category: 'Conectores', example: 'I was hungry, so I ordered food.' },
      { word: 'Then', meaning: 'Luego / Entonces', type: 'connector', category: 'Conectores', example: 'First we eat, then we go.' },
      { word: 'Also', meaning: 'También', type: 'connector', category: 'Conectores', example: 'I also want dessert.' },
      { word: 'Maybe', meaning: 'Quizás / A lo mejor', type: 'connector', category: 'Conectores', example: 'Maybe tomorrow.' },
      { word: 'Really', meaning: 'De verdad / Muy', type: 'connector', category: 'Conectores', example: 'I\'m really tired.' },
      { word: 'Actually', meaning: 'En realidad', type: 'connector', category: 'Conectores', example: 'Actually, I changed my mind.' },

      // --- 10 PHRASAL VERBS BÁSICOS ---
      { word: 'Wake up', meaning: 'Despertarse', type: 'phrasal', category: 'Phrasal Verbs', example: 'I wake up at 7.' },
      { word: 'Get up', meaning: 'Levantarse', type: 'phrasal', category: 'Phrasal Verbs', example: 'Get up, we\'re late!' },
      { word: 'Turn on', meaning: 'Encender', type: 'phrasal', category: 'Phrasal Verbs', example: 'Turn on the lights.' },
      { word: 'Turn off', meaning: 'Apagar', type: 'phrasal', category: 'Phrasal Verbs', example: 'Turn off your phone.' },
      { word: 'Come in', meaning: 'Entrar / Pasa', type: 'phrasal', category: 'Phrasal Verbs', example: 'Come in, sit down!' },
      { word: 'Go out', meaning: 'Salir', type: 'phrasal', category: 'Phrasal Verbs', example: 'Let\'s go out tonight.' },
      { word: 'Sit down', meaning: 'Sentarse', type: 'phrasal', category: 'Phrasal Verbs', example: 'Please sit down.' },
      { word: 'Put on', meaning: 'Ponerse (ropa)', type: 'phrasal', category: 'Phrasal Verbs', example: 'Put on your jacket, it\'s cold.' },
      { word: 'Take off', meaning: 'Quitarse (ropa)', type: 'phrasal', category: 'Phrasal Verbs', example: 'Take off your shoes.' },
      { word: 'Look at', meaning: 'Mirar', type: 'phrasal', category: 'Phrasal Verbs', example: 'Look at this!' },

      // --- 10 EXPRESIONES DEL DÍA A DÍA ---
      { word: 'How are you?', meaning: '¿Cómo estás?', type: 'expression', category: 'Expresiones', example: 'Hey! How are you?' },
      { word: 'I\'m fine, thanks', meaning: 'Bien, gracias', type: 'expression', category: 'Expresiones', example: 'I\'m fine, thanks. And you?' },
      { word: 'Nice to meet you', meaning: 'Encantado/a', type: 'expression', category: 'Expresiones', example: 'Hi, I\'m Ana. Nice to meet you.' },
      { word: 'See you later', meaning: 'Hasta luego', type: 'expression', category: 'Expresiones', example: 'Bye! See you later.' },
      { word: 'No problem', meaning: 'No hay problema / De nada', type: 'expression', category: 'Expresiones', example: 'Thanks! - No problem.' },
      { word: 'I don\'t understand', meaning: 'No entiendo', type: 'expression', category: 'Expresiones', example: 'Sorry, I don\'t understand.' },
      { word: 'Can you repeat?', meaning: '¿Puedes repetir?', type: 'expression', category: 'Expresiones', example: 'Can you repeat, please?' },
      { word: 'Excuse me', meaning: 'Disculpa / Perdona', type: 'expression', category: 'Expresiones', example: 'Excuse me, where is the bathroom?' },
      { word: 'I\'m sorry', meaning: 'Lo siento', type: 'expression', category: 'Expresiones', example: 'I\'m sorry, I\'m late.' },
      { word: 'Of course', meaning: 'Por supuesto / Claro', type: 'expression', category: 'Expresiones', example: 'Can I sit here? - Of course!' }
    ]
  },

  // ==========================================
  // NIVEL A2 - CONVERSACIÓN BÁSICA
  // ==========================================
  {
    id: 'a2-complete',
    name: 'A2 - Elementary Pack',
    icon: 'fa-leaf',
    description: 'Para empezar a conversar: verbos de acción, conectores para contar cosas, phrasal verbs súper comunes y expresiones que oyes en todas partes.',
    level: 'A2',
    words: [
      // --- 10 VERBOS DE ACCIÓN ---
      { word: 'Try', meaning: 'Intentar / Probar', type: 'word', category: 'Verbos', example: 'Try this, it\'s delicious!' },
      { word: 'Wait', meaning: 'Esperar', type: 'word', category: 'Verbos', example: 'Wait for me!' },
      { word: 'Tell', meaning: 'Decir / Contar', type: 'word', category: 'Verbos', example: 'Tell me more.' },
      { word: 'Ask', meaning: 'Preguntar / Pedir', type: 'word', category: 'Verbos', example: 'Can I ask you something?' },
      { word: 'Feel', meaning: 'Sentir / Sentirse', type: 'word', category: 'Verbos', example: 'I feel tired today.' },
      { word: 'Remember', meaning: 'Recordar', type: 'word', category: 'Verbos', example: 'I don\'t remember his name.' },
      { word: 'Forget', meaning: 'Olvidar', type: 'word', category: 'Verbos', example: 'I forgot my wallet.' },
      { word: 'Leave', meaning: 'Irse / Dejar', type: 'word', category: 'Verbos', example: 'I\'m leaving now.' },
      { word: 'Stay', meaning: 'Quedarse', type: 'word', category: 'Verbos', example: 'Stay here, I\'ll be back.' },
      { word: 'Send', meaning: 'Enviar', type: 'word', category: 'Verbos', example: 'Send me the details.' },

      // --- 10 CONECTORES PARA CONTAR COSAS ---
      { word: 'After', meaning: 'Después de', type: 'connector', category: 'Conectores', example: 'After work, I go to the gym.' },
      { word: 'Before', meaning: 'Antes de', type: 'connector', category: 'Conectores', example: 'Before I forget...' },
      { word: 'When', meaning: 'Cuando', type: 'connector', category: 'Conectores', example: 'When I was young...' },
      { word: 'While', meaning: 'Mientras', type: 'connector', category: 'Conectores', example: 'I listen to music while I work.' },
      { word: 'If', meaning: 'Si (condicional)', type: 'connector', category: 'Conectores', example: 'If you want, we can go.' },
      { word: 'Anyway', meaning: 'De todas formas / Bueno', type: 'connector', category: 'Conectores', example: 'Anyway, let\'s go.' },
      { word: 'By the way', meaning: 'Por cierto', type: 'connector', category: 'Conectores', example: 'By the way, where is John?' },
      { word: 'For example', meaning: 'Por ejemplo', type: 'connector', category: 'Conectores', example: 'I like fruits, for example, apples.' },
      { word: 'I mean', meaning: 'O sea / Quiero decir', type: 'connector', category: 'Conectores', example: 'I mean, it\'s not bad.' },
      { word: 'You know', meaning: 'Ya sabes / Sabes', type: 'connector', category: 'Conectores', example: 'It\'s like, you know, complicated.' },

      // --- 10 PHRASAL VERBS COMUNES ---
      { word: 'Look for', meaning: 'Buscar', type: 'phrasal', category: 'Phrasal Verbs', example: 'I\'m looking for my keys.' },
      { word: 'Pick up', meaning: 'Recoger / Coger', type: 'phrasal', category: 'Phrasal Verbs', example: 'I\'ll pick you up at 8.' },
      { word: 'Give up', meaning: 'Rendirse / Dejar de', type: 'phrasal', category: 'Phrasal Verbs', example: 'Don\'t give up!' },
      { word: 'Come back', meaning: 'Volver', type: 'phrasal', category: 'Phrasal Verbs', example: 'When are you coming back?' },
      { word: 'Find out', meaning: 'Descubrir / Enterarse', type: 'phrasal', category: 'Phrasal Verbs', example: 'I found out he lied.' },
      { word: 'Hurry up', meaning: 'Darse prisa', type: 'phrasal', category: 'Phrasal Verbs', example: 'Hurry up, we\'re late!' },
      { word: 'Grow up', meaning: 'Crecer / Madurar', type: 'phrasal', category: 'Phrasal Verbs', example: 'I grew up in Madrid.' },
      { word: 'Give back', meaning: 'Devolver', type: 'phrasal', category: 'Phrasal Verbs', example: 'Give me back my phone!' },
      { word: 'Write down', meaning: 'Apuntar / Anotar', type: 'phrasal', category: 'Phrasal Verbs', example: 'Write down the address.' },
      { word: 'Log in', meaning: 'Iniciar sesión', type: 'phrasal', category: 'Phrasal Verbs', example: 'Log in with your email.' },

      // --- 10 EXPRESIONES MUY COMUNES ---
      { word: 'What\'s up?', meaning: '¿Qué pasa? / ¿Qué tal?', type: 'expression', category: 'Expresiones', example: 'Hey! What\'s up?' },
      { word: 'Take care', meaning: 'Cuídate', type: 'expression', category: 'Expresiones', example: 'See you! Take care.' },
      { word: 'Good luck', meaning: 'Buena suerte', type: 'expression', category: 'Expresiones', example: 'Good luck with your exam!' },
      { word: 'Never mind', meaning: 'No importa / Déjalo', type: 'expression', category: 'Expresiones', example: 'Never mind, forget it.' },
      { word: 'It doesn\'t matter', meaning: 'No importa / Da igual', type: 'expression', category: 'Expresiones', example: 'It doesn\'t matter, really.' },
      { word: 'I have no idea', meaning: 'Ni idea / No tengo ni idea', type: 'expression', category: 'Expresiones', example: 'I have no idea what happened.' },
      { word: 'Just a moment', meaning: 'Un momento', type: 'expression', category: 'Expresiones', example: 'Just a moment, please.' },
      { word: 'That\'s fine', meaning: 'Está bien / Vale', type: 'expression', category: 'Expresiones', example: 'That\'s fine with me.' },
      { word: 'I\'m not sure', meaning: 'No estoy seguro/a', type: 'expression', category: 'Expresiones', example: 'I\'m not sure if I can go.' },
      { word: 'Well done!', meaning: '¡Bien hecho!', type: 'expression', category: 'Expresiones', example: 'You passed! Well done!' }
    ]
  },

  // ==========================================
  // NIVEL B1 - CONVERSACIÓN FLUIDA
  // ==========================================
  {
    id: 'b1-complete',
    name: 'B1 - Intermediate Pack',
    icon: 'fa-tree',
    description: 'Para hablar con fluidez: verbos para opinar y expresarte, conectores para no quedarte callado, phrasal verbs esenciales y expresiones que usas cada día.',
    level: 'B1',
    words: [
      // --- 10 VERBOS PARA EXPRESARTE ---
      { word: 'Seem', meaning: 'Parecer', type: 'word', category: 'Verbos', example: 'It seems like a good idea.' },
      { word: 'Guess', meaning: 'Suponer / Adivinar', type: 'word', category: 'Verbos', example: 'I guess you\'re right.' },
      { word: 'Expect', meaning: 'Esperar (expectativa)', type: 'word', category: 'Verbos', example: 'I didn\'t expect that.' },
      { word: 'Realize', meaning: 'Darse cuenta', type: 'word', category: 'Verbos', example: 'I just realized I forgot my wallet.' },
      { word: 'Agree', meaning: 'Estar de acuerdo', type: 'word', category: 'Verbos', example: 'I totally agree with you.' },
      { word: 'Suggest', meaning: 'Sugerir', type: 'word', category: 'Verbos', example: 'I suggest we take a break.' },
      { word: 'Recommend', meaning: 'Recomendar', type: 'word', category: 'Verbos', example: 'I recommend this restaurant.' },
      { word: 'Manage', meaning: 'Conseguir / Arreglárselas', type: 'word', category: 'Verbos', example: 'I managed to finish on time.' },
      { word: 'Afford', meaning: 'Permitirse (dinero)', type: 'word', category: 'Verbos', example: 'I can\'t afford a new car.' },
      { word: 'Improve', meaning: 'Mejorar', type: 'word', category: 'Verbos', example: 'My English is improving.' },

      // --- 10 CONECTORES PARA HABLAR FLUIDO ---
      { word: 'Although', meaning: 'Aunque', type: 'connector', category: 'Conectores', example: 'Although it was late, I finished.' },
      { word: 'However', meaning: 'Sin embargo', type: 'connector', category: 'Conectores', example: 'It\'s cheap. However, it\'s bad quality.' },
      { word: 'Instead', meaning: 'En su lugar', type: 'connector', category: 'Conectores', example: 'Let\'s do this instead.' },
      { word: 'Besides', meaning: 'Además', type: 'connector', category: 'Conectores', example: 'It\'s late, and besides, I\'m tired.' },
      { word: 'Otherwise', meaning: 'Si no / De lo contrario', type: 'connector', category: 'Conectores', example: 'Hurry up, otherwise we\'ll be late.' },
      { word: 'Even though', meaning: 'Aunque (enfático)', type: 'connector', category: 'Conectores', example: 'Even though I studied, I failed.' },
      { word: 'Basically', meaning: 'Básicamente', type: 'connector', category: 'Conectores', example: 'Basically, it\'s done.' },
      { word: 'Apparently', meaning: 'Por lo visto / Al parecer', type: 'connector', category: 'Conectores', example: 'Apparently, he quit his job.' },
      { word: 'Obviously', meaning: 'Obviamente', type: 'connector', category: 'Conectores', example: 'Obviously, I said yes.' },
      { word: 'Hopefully', meaning: 'Ojalá / Con suerte', type: 'connector', category: 'Conectores', example: 'Hopefully, it will work.' },

      // --- 10 PHRASAL VERBS ESENCIALES ---
      { word: 'Figure out', meaning: 'Entender / Resolver', type: 'phrasal', category: 'Phrasal Verbs', example: 'I can\'t figure out this problem.' },
      { word: 'Work out', meaning: 'Hacer ejercicio / Funcionar', type: 'phrasal', category: 'Phrasal Verbs', example: 'Things will work out, don\'t worry.' },
      { word: 'Show up', meaning: 'Aparecer / Presentarse', type: 'phrasal', category: 'Phrasal Verbs', example: 'He didn\'t show up to the meeting.' },
      { word: 'Run out of', meaning: 'Quedarse sin', type: 'phrasal', category: 'Phrasal Verbs', example: 'We ran out of milk.' },
      { word: 'Get along with', meaning: 'Llevarse bien con', type: 'phrasal', category: 'Phrasal Verbs', example: 'I get along with my boss.' },
      { word: 'Set up', meaning: 'Organizar / Configurar', type: 'phrasal', category: 'Phrasal Verbs', example: 'Let\'s set up a meeting.' },
      { word: 'Catch up', meaning: 'Ponerse al día', type: 'phrasal', category: 'Phrasal Verbs', example: 'Let\'s catch up over coffee!' },
      { word: 'Check out', meaning: 'Echar un vistazo', type: 'phrasal', category: 'Phrasal Verbs', example: 'Check out this video!' },
      { word: 'Look forward to', meaning: 'Tener ganas de', type: 'phrasal', category: 'Phrasal Verbs', example: 'I\'m looking forward to the weekend!' },
      { word: 'Put off', meaning: 'Posponer', type: 'phrasal', category: 'Phrasal Verbs', example: 'Stop putting it off, do it now!' },

      // --- 10 EXPRESIONES PARA EL DÍA A DÍA ---
      { word: 'It\'s up to you', meaning: 'Tú decides / Depende de ti', type: 'expression', category: 'Expresiones', example: 'Pizza or sushi? It\'s up to you.' },
      { word: 'That makes sense', meaning: 'Tiene sentido', type: 'expression', category: 'Expresiones', example: 'Oh, that makes sense now!' },
      { word: 'It\'s not a big deal', meaning: 'No es para tanto', type: 'expression', category: 'Expresiones', example: 'Relax, it\'s not a big deal.' },
      { word: 'Let me know', meaning: 'Avísame / Dime', type: 'expression', category: 'Expresiones', example: 'Let me know if you need help.' },
      { word: 'To be honest', meaning: 'Para ser sincero/a', type: 'expression', category: 'Expresiones', example: 'To be honest, I don\'t like it.' },
      { word: 'I\'m not in the mood', meaning: 'No me apetece', type: 'expression', category: 'Expresiones', example: 'I\'m not in the mood for a party.' },
      { word: 'Fair enough', meaning: 'Me parece bien / Vale', type: 'expression', category: 'Expresiones', example: 'Fair enough, let\'s do it.' },
      { word: 'It depends', meaning: 'Depende', type: 'expression', category: 'Expresiones', example: 'Are you coming? It depends.' },
      { word: 'That\'s the thing', meaning: 'Esa es la cuestión', type: 'expression', category: 'Expresiones', example: 'That\'s the thing, I don\'t know.' },
      { word: 'I\'ll let you know', meaning: 'Ya te diré / Te aviso', type: 'expression', category: 'Expresiones', example: 'I\'ll let you know tomorrow.' }
    ]
  },

  // ==========================================
  // NIVEL B2 - SONAR NATURAL
  // ==========================================
  {
    id: 'b2-complete',
    name: 'B2 - Upper-Intermediate Pack',
    icon: 'fa-mountain',
    description: 'Para sonar natural: verbos que usan los nativos, conectores para debatir, phrasal verbs del día a día y expresiones que escuchas en series y películas.',
    level: 'B2',
    words: [
      // --- 10 VERBOS QUE USAN LOS NATIVOS ---
      { word: 'Assume', meaning: 'Suponer / Asumir', type: 'word', category: 'Verbos', example: 'I assume you know about it.' },
      { word: 'Consider', meaning: 'Considerar / Plantearse', type: 'word', category: 'Verbos', example: 'Have you considered moving?' },
      { word: 'Tend to', meaning: 'Tender a / Soler', type: 'word', category: 'Verbos', example: 'I tend to wake up early.' },
      { word: 'Involve', meaning: 'Implicar / Involucrar', type: 'word', category: 'Verbos', example: 'What does the job involve?' },
      { word: 'Struggle', meaning: 'Luchar / Costar (esfuerzo)', type: 'word', category: 'Verbos', example: 'I struggle with mornings.' },
      { word: 'Achieve', meaning: 'Lograr / Conseguir', type: 'word', category: 'Verbos', example: 'She achieved her goals.' },
      { word: 'Avoid', meaning: 'Evitar', type: 'word', category: 'Verbos', example: 'I try to avoid sugar.' },
      { word: 'Convince', meaning: 'Convencer', type: 'word', category: 'Verbos', example: 'You convinced me!' },
      { word: 'Complain', meaning: 'Quejarse', type: 'word', category: 'Verbos', example: 'Stop complaining!' },
      { word: 'Appreciate', meaning: 'Agradecer / Valorar', type: 'word', category: 'Verbos', example: 'I really appreciate your help.' },

      // --- 10 CONECTORES PARA DEBATIR ---
      { word: 'Therefore', meaning: 'Por lo tanto', type: 'connector', category: 'Conectores', example: 'It was late, therefore we left.' },
      { word: 'Nevertheless', meaning: 'Sin embargo / Aun así', type: 'connector', category: 'Conectores', example: 'It was hard. Nevertheless, I did it.' },
      { word: 'On the other hand', meaning: 'Por otro lado', type: 'connector', category: 'Conectores', example: 'It\'s cheap, but on the other hand, it\'s slow.' },
      { word: 'In that case', meaning: 'En ese caso', type: 'connector', category: 'Conectores', example: 'In that case, count me in!' },
      { word: 'As long as', meaning: 'Siempre que / Mientras', type: 'connector', category: 'Conectores', example: 'You can go as long as you\'re back by 10.' },
      { word: 'Unless', meaning: 'A menos que', type: 'connector', category: 'Conectores', example: 'I\'ll go unless it rains.' },
      { word: 'Despite', meaning: 'A pesar de', type: 'connector', category: 'Conectores', example: 'Despite the rain, we had fun.' },
      { word: 'Whereas', meaning: 'Mientras que', type: 'connector', category: 'Conectores', example: 'I like tea, whereas he prefers coffee.' },
      { word: 'On top of that', meaning: 'Además de eso / Encima', type: 'connector', category: 'Conectores', example: 'I\'m tired and, on top of that, hungry.' },
      { word: 'That being said', meaning: 'Dicho esto', type: 'connector', category: 'Conectores', example: 'That being said, I still think it\'s worth it.' },

      // --- 10 PHRASAL VERBS NATIVOS ---
      { word: 'Come up with', meaning: 'Idear / Se me ocurrió', type: 'phrasal', category: 'Phrasal Verbs', example: 'She came up with a great idea.' },
      { word: 'Turn out', meaning: 'Resultar ser', type: 'phrasal', category: 'Phrasal Verbs', example: 'It turned out to be a good decision.' },
      { word: 'Bring up', meaning: 'Sacar un tema', type: 'phrasal', category: 'Phrasal Verbs', example: 'Why did you bring that up?' },
      { word: 'Get over', meaning: 'Superar', type: 'phrasal', category: 'Phrasal Verbs', example: 'I can\'t get over it.' },
      { word: 'Put up with', meaning: 'Aguantar / Tolerar', type: 'phrasal', category: 'Phrasal Verbs', example: 'I can\'t put up with this noise.' },
      { word: 'Get away with', meaning: 'Salirse con la suya', type: 'phrasal', category: 'Phrasal Verbs', example: 'You won\'t get away with this!' },
      { word: 'Hold on', meaning: 'Espera / Aguanta', type: 'phrasal', category: 'Phrasal Verbs', example: 'Hold on, I\'ll be right back.' },
      { word: 'Mess up', meaning: 'Cagarla / Estropear', type: 'phrasal', category: 'Phrasal Verbs', example: 'I totally messed up.' },
      { word: 'Freak out', meaning: 'Flipar / Entrar en pánico', type: 'phrasal', category: 'Phrasal Verbs', example: 'Don\'t freak out, it\'s fine.' },
      { word: 'End up', meaning: 'Acabar / Terminar', type: 'phrasal', category: 'Phrasal Verbs', example: 'We ended up staying until midnight.' },

      // --- 10 EXPRESIONES DE SERIES Y PELÍCULAS ---
      { word: 'No way!', meaning: '¡Ni de broma! / ¡No me digas!', type: 'expression', category: 'Expresiones', example: 'You quit your job? No way!' },
      { word: 'I\'m done', meaning: 'He terminado / Paso de esto', type: 'expression', category: 'Expresiones', example: 'I\'m done with this situation.' },
      { word: 'That\'s insane', meaning: 'Eso es una locura', type: 'expression', category: 'Expresiones', example: 'You swam 5km? That\'s insane!' },
      { word: 'Get the point', meaning: 'Captar la idea / Entender', type: 'expression', category: 'Expresiones', example: 'I get the point, you can stop.' },
      { word: 'You\'re kidding', meaning: 'Estás de broma', type: 'expression', category: 'Expresiones', example: 'You won? You\'re kidding!' },
      { word: 'I couldn\'t care less', meaning: 'Me importa un bledo', type: 'expression', category: 'Expresiones', example: 'I couldn\'t care less about what he thinks.' },
      { word: 'That\'s not the point', meaning: 'Esa no es la cuestión', type: 'expression', category: 'Expresiones', example: 'Yeah but that\'s not the point.' },
      { word: 'Keep it real', meaning: 'Sé auténtico / Sin rollos', type: 'expression', category: 'Expresiones', example: 'Forget the drama, keep it real.' },
      { word: 'Been there, done that', meaning: 'Ya pasé por eso', type: 'expression', category: 'Expresiones', example: 'Drama at work? Been there, done that.' },
      { word: 'It is what it is', meaning: 'Es lo que hay', type: 'expression', category: 'Expresiones', example: 'The deadline is tomorrow. It is what it is.' }
    ]
  },

  // ==========================================
  // NIVEL C1 - INGLÉS AVANZADO REAL
  // ==========================================
  {
    id: 'c1-complete',
    name: 'C1 - Advanced Pack',
    icon: 'fa-rocket',
    description: 'Para sonar sofisticado: verbos de trabajo y negocios, conectores elegantes pero naturales, phrasal verbs de nivel nativo y expresiones de persona culta.',
    level: 'C1',
    words: [
      // --- 10 VERBOS DE TRABAJO Y NEGOCIOS ---
      { word: 'Address', meaning: 'Abordar / Tratar (un tema)', type: 'word', category: 'Verbos', example: 'We need to address this issue.' },
      { word: 'Implement', meaning: 'Implementar', type: 'word', category: 'Verbos', example: 'We\'ll implement the changes next week.' },
      { word: 'Ensure', meaning: 'Asegurar(se)', type: 'word', category: 'Verbos', example: 'Please ensure everyone is informed.' },
      { word: 'Clarify', meaning: 'Aclarar', type: 'word', category: 'Verbos', example: 'Let me clarify what I mean.' },
      { word: 'Prioritize', meaning: 'Priorizar', type: 'word', category: 'Verbos', example: 'We need to prioritize this task.' },
      { word: 'Overcome', meaning: 'Superar', type: 'word', category: 'Verbos', example: 'She overcame many challenges.' },
      { word: 'Acknowledge', meaning: 'Reconocer / Admitir', type: 'word', category: 'Verbos', example: 'I acknowledge my mistake.' },
      { word: 'Pursue', meaning: 'Perseguir (objetivo)', type: 'word', category: 'Verbos', example: 'She decided to pursue her dreams.' },
      { word: 'Delegate', meaning: 'Delegar', type: 'word', category: 'Verbos', example: 'Learn to delegate tasks.' },
      { word: 'Leverage', meaning: 'Aprovechar / Sacar partido', type: 'word', category: 'Verbos', example: 'Let\'s leverage our experience.' },

      // --- 10 CONECTORES ELEGANTES PERO NATURALES ---
      { word: 'Having said that', meaning: 'Dicho esto', type: 'connector', category: 'Conectores', example: 'It\'s expensive. Having said that, it\'s worth it.' },
      { word: 'That said', meaning: 'Dicho esto (más corto)', type: 'connector', category: 'Conectores', example: 'He\'s difficult. That said, he\'s talented.' },
      { word: 'Either way', meaning: 'De cualquier forma', type: 'connector', category: 'Conectores', example: 'Either way, we need to decide.' },
      { word: 'At the end of the day', meaning: 'Al fin y al cabo', type: 'connector', category: 'Conectores', example: 'At the end of the day, it\'s your choice.' },
      { word: 'To be fair', meaning: 'Para ser justos', type: 'connector', category: 'Conectores', example: 'To be fair, he did apologize.' },
      { word: 'As a matter of fact', meaning: 'De hecho', type: 'connector', category: 'Conectores', example: 'As a matter of fact, I agree with you.' },
      { word: 'For what it\'s worth', meaning: 'Por lo que pueda valer', type: 'connector', category: 'Conectores', example: 'For what it\'s worth, I think you\'re great.' },
      { word: 'Mind you', meaning: 'Eso sí / Aunque', type: 'connector', category: 'Conectores', example: 'Good restaurant. Mind you, it\'s pricey.' },
      { word: 'Not to mention', meaning: 'Por no hablar de', type: 'connector', category: 'Conectores', example: 'It\'s cold, not to mention raining.' },
      { word: 'In a nutshell', meaning: 'En resumen / Resumiendo', type: 'connector', category: 'Conectores', example: 'In a nutshell, we need more time.' },

      // --- 10 PHRASAL VERBS DE NIVEL NATIVO ---
      { word: 'Play it down', meaning: 'Quitarle importancia', type: 'phrasal', category: 'Phrasal Verbs', example: 'Don\'t play it down, it\'s serious.' },
      { word: 'Rule out', meaning: 'Descartar', type: 'phrasal', category: 'Phrasal Verbs', example: 'We can\'t rule out that option.' },
      { word: 'Back out', meaning: 'Echarse atrás', type: 'phrasal', category: 'Phrasal Verbs', example: 'He backed out at the last minute.' },
      { word: 'Step up', meaning: 'Dar un paso al frente', type: 'phrasal', category: 'Phrasal Verbs', example: 'Someone needs to step up.' },
      { word: 'Fall through', meaning: 'Fracasar / No salir adelante', type: 'phrasal', category: 'Phrasal Verbs', example: 'The deal fell through.' },
      { word: 'Look into', meaning: 'Investigar / Estudiar', type: 'phrasal', category: 'Phrasal Verbs', example: 'I\'ll look into it.' },
      { word: 'Iron out', meaning: 'Resolver / Limar', type: 'phrasal', category: 'Phrasal Verbs', example: 'Let\'s iron out the details.' },
      { word: 'Pull off', meaning: 'Lograr (algo difícil)', type: 'phrasal', category: 'Phrasal Verbs', example: 'I can\'t believe we pulled it off!' },
      { word: 'Get back to', meaning: 'Volver a contactar', type: 'phrasal', category: 'Phrasal Verbs', example: 'I\'ll get back to you on that.' },
      { word: 'Follow through', meaning: 'Cumplir / Llevar a cabo', type: 'phrasal', category: 'Phrasal Verbs', example: 'Make sure you follow through.' },

      // --- 10 EXPRESIONES DE PERSONA CULTA ---
      { word: 'The thing is', meaning: 'El caso es / La cosa es que', type: 'expression', category: 'Expresiones', example: 'The thing is, I need more time.' },
      { word: 'To cut a long story short', meaning: 'Resumiendo / Yendo al grano', type: 'expression', category: 'Expresiones', example: 'To cut a long story short, we won.' },
      { word: 'Go the extra mile', meaning: 'Hacer un esfuerzo extra', type: 'expression', category: 'Expresiones', example: 'She always goes the extra mile.' },
      { word: 'Be on the same page', meaning: 'Estar en la misma onda', type: 'expression', category: 'Expresiones', example: 'Let\'s make sure we\'re on the same page.' },
      { word: 'Think outside the box', meaning: 'Pensar de forma creativa', type: 'expression', category: 'Expresiones', example: 'We need to think outside the box.' },
      { word: 'Hit the ground running', meaning: 'Empezar con buen pie', type: 'expression', category: 'Expresiones', example: 'I want to hit the ground running.' },
      { word: 'A steep learning curve', meaning: 'Una curva de aprendizaje', type: 'expression', category: 'Expresiones', example: 'This job has a steep learning curve.' },
      { word: 'Touch base', meaning: 'Ponerse en contacto', type: 'expression', category: 'Expresiones', example: 'Let\'s touch base next week.' },
      { word: 'Get the ball rolling', meaning: 'Poner algo en marcha', type: 'expression', category: 'Expresiones', example: 'Let\'s get the ball rolling.' },
      { word: 'Keep me in the loop', meaning: 'Mantenme informado', type: 'expression', category: 'Expresiones', example: 'Keep me in the loop, please.' }
    ]
  },

  // ==========================================
  // NIVEL C2 - INGLÉS DE EXPERTO
  // ==========================================
  {
    id: 'c2-complete',
    name: 'C2 - Proficiency Pack',
    icon: 'fa-crown',
    description: 'Para impresionar: verbos precisos de alto nivel, conectores para argumentar con elegancia, phrasal verbs sutiles e idioms para sonar como un nativo educado.',
    level: 'C2',
    words: [
      // --- 10 VERBOS PRECISOS DE ALTO NIVEL ---
      { word: 'Anticipate', meaning: 'Anticipar / Prever', type: 'word', category: 'Verbos', example: 'We didn\'t anticipate this problem.' },
      { word: 'Undermine', meaning: 'Socavar / Minar', type: 'word', category: 'Verbos', example: 'Don\'t undermine my authority.' },
      { word: 'Advocate', meaning: 'Defender / Abogar por', type: 'word', category: 'Verbos', example: 'I advocate for change.' },
      { word: 'Tackle', meaning: 'Abordar / Hacer frente a', type: 'word', category: 'Verbos', example: 'Let\'s tackle this problem.' },
      { word: 'Navigate', meaning: 'Navegar / Manejarse en', type: 'word', category: 'Verbos', example: 'It\'s hard to navigate office politics.' },
      { word: 'Thrive', meaning: 'Prosperar / Florecer', type: 'word', category: 'Verbos', example: 'She thrives under pressure.' },
      { word: 'Resonate', meaning: 'Resonar / Conectar (con)', type: 'word', category: 'Verbos', example: 'This message resonates with me.' },
      { word: 'Overlook', meaning: 'Pasar por alto / Ignorar', type: 'word', category: 'Verbos', example: 'Don\'t overlook the details.' },
      { word: 'Embrace', meaning: 'Abrazar / Aceptar', type: 'word', category: 'Verbos', example: 'Embrace change.' },
      { word: 'Streamline', meaning: 'Simplificar / Optimizar', type: 'word', category: 'Verbos', example: 'We need to streamline the process.' },

      // --- 10 CONECTORES PARA ARGUMENTAR CON ELEGANCIA ---
      { word: 'Be that as it may', meaning: 'Sea como sea', type: 'connector', category: 'Conectores', example: 'Be that as it may, we still need to act.' },
      { word: 'More often than not', meaning: 'La mayoría de las veces', type: 'connector', category: 'Conectores', example: 'More often than not, he\'s right.' },
      { word: 'By and large', meaning: 'En general', type: 'connector', category: 'Conectores', example: 'By and large, people are kind.' },
      { word: 'All things considered', meaning: 'Teniendo todo en cuenta', type: 'connector', category: 'Conectores', example: 'All things considered, it was a success.' },
      { word: 'For the most part', meaning: 'En su mayor parte', type: 'connector', category: 'Conectores', example: 'For the most part, I agree.' },
      { word: 'On balance', meaning: 'Sopesándolo todo', type: 'connector', category: 'Conectores', example: 'On balance, it was worth it.' },
      { word: 'As it turns out', meaning: 'Resulta que', type: 'connector', category: 'Conectores', example: 'As it turns out, I was wrong.' },
      { word: 'Needless to say', meaning: 'Ni que decir tiene', type: 'connector', category: 'Conectores', example: 'Needless to say, I was shocked.' },
      { word: 'Notwithstanding', meaning: 'No obstante / A pesar de', type: 'connector', category: 'Conectores', example: 'Notwithstanding the law, he did it.' },
      { word: 'With that in mind', meaning: 'Teniendo eso en cuenta', type: 'connector', category: 'Conectores', example: 'With that in mind, let\'s continue.' },

      // --- 10 PHRASAL VERBS SUTILES ---
      { word: 'Brush off', meaning: 'Ignorar / No hacer caso', type: 'phrasal', category: 'Phrasal Verbs', example: 'Don\'t brush off my concerns.' },
      { word: 'Chime in', meaning: 'Intervenir / Meter baza', type: 'phrasal', category: 'Phrasal Verbs', example: 'Feel free to chime in.' },
      { word: 'Pan out', meaning: 'Resultar / Salir', type: 'phrasal', category: 'Phrasal Verbs', example: 'Let\'s see how things pan out.' },
      { word: 'Touch on', meaning: 'Tocar / Mencionar brevemente', type: 'phrasal', category: 'Phrasal Verbs', example: 'I\'d like to touch on one point.' },
      { word: 'Zone out', meaning: 'Desconectar / Quedarse en blanco', type: 'phrasal', category: 'Phrasal Verbs', example: 'Sorry, I zoned out for a moment.' },
      { word: 'Play up', meaning: 'Exagerar / Dar problemas', type: 'phrasal', category: 'Phrasal Verbs', example: 'My back is playing up again.' },
      { word: 'Kick in', meaning: 'Empezar a hacer efecto', type: 'phrasal', category: 'Phrasal Verbs', example: 'The coffee is starting to kick in.' },
      { word: 'Wind down', meaning: 'Relajarse / Ir terminando', type: 'phrasal', category: 'Phrasal Verbs', example: 'Time to wind down for the day.' },
      { word: 'Mull over', meaning: 'Darle vueltas a', type: 'phrasal', category: 'Phrasal Verbs', example: 'I need to mull it over.' },
      { word: 'Stumble upon', meaning: 'Encontrar por casualidad', type: 'phrasal', category: 'Phrasal Verbs', example: 'I stumbled upon this article.' },

      // --- 10 IDIOMS DE NATIVO EDUCADO ---
      { word: 'The elephant in the room', meaning: 'El tema incómodo que nadie menciona', type: 'expression', category: 'Expresiones', example: 'Let\'s address the elephant in the room.' },
      { word: 'A blessing in disguise', meaning: 'Una bendición disfrazada', type: 'expression', category: 'Expresiones', example: 'Losing that job was a blessing in disguise.' },
      { word: 'Break the ice', meaning: 'Romper el hielo', type: 'expression', category: 'Expresiones', example: 'Let\'s play a game to break the ice.' },
      { word: 'Hit the nail on the head', meaning: 'Dar en el clavo', type: 'expression', category: 'Expresiones', example: 'You hit the nail on the head.' },
      { word: 'Easier said than done', meaning: 'Del dicho al hecho hay un trecho', type: 'expression', category: 'Expresiones', example: 'Getting fit is easier said than done.' },
      { word: 'The ball is in your court', meaning: 'Te toca a ti', type: 'expression', category: 'Expresiones', example: 'I made my offer, the ball is in your court.' },
      { word: 'Read the room', meaning: 'Leer el ambiente', type: 'expression', category: 'Expresiones', example: 'You need to learn to read the room.' },
      { word: 'Miss the boat', meaning: 'Perder la oportunidad', type: 'expression', category: 'Expresiones', example: 'If you don\'t apply now, you\'ll miss the boat.' },
      { word: 'Put your foot in your mouth', meaning: 'Meter la pata', type: 'expression', category: 'Expresiones', example: 'I really put my foot in my mouth there.' },
      { word: 'Under the weather', meaning: 'Pachucho / Indispuesto', type: 'expression', category: 'Expresiones', example: 'I\'m feeling a bit under the weather.' }
    ]
  }
];
