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
      { word: 'Be', meaning: 'Ser / Estar', type: 'word', category: 'Verbos', example: 'I am tired. She is my friend.', emotionalTip: 'Piensa en esa pregunta que te haces a las 3am cuando no puedes dormir: "¿Quién SOY yo realmente?" BE es existir, ser tú.' },
      { word: 'Have', meaning: 'Tener', type: 'word', category: 'Verbos', example: 'I have a question.', emotionalTip: 'Esa sensación cuando te das cuenta de que no tienes la cartera encima. "I don\'t HAVE it." El vacío en el estómago.' },
      { word: 'Want', meaning: 'Querer', type: 'word', category: 'Verbos', example: 'I want coffee, please.', emotionalTip: 'El deseo intenso de algo que no puedes tener. Ese "lo QUIERO" de niño pequeño. WANT es deseo puro, sin filtros.' },
      { word: 'Need', meaning: 'Necesitar', type: 'word', category: 'Verbos', example: 'I need help.', emotionalTip: 'Cuando estás perdido en una ciudad extranjera de noche y NECESITAS ayuda de verdad. No es capricho, es supervivencia.' },
      { word: 'Like', meaning: 'Gustar', type: 'word', category: 'Verbos', example: 'I like this song.', emotionalTip: 'Esa canción que te transporta a un momento feliz de tu vida. I LIKE it. Te gusta, te hace sentir bien.' },
      { word: 'Go', meaning: 'Ir', type: 'word', category: 'Verbos', example: 'I go to work by metro.', emotionalTip: 'El impulso de huir cuando una situación te supera. "I need to GO." Escapar, moverte, liberarte.' },
      { word: 'Know', meaning: 'Saber / Conocer', type: 'word', category: 'Verbos', example: 'I don\'t know.', emotionalTip: 'Esa impotencia cuando alguien te pregunta algo y no tienes ni idea. "I don\'t KNOW" con vergüenza en la voz.' },
      { word: 'Think', meaning: 'Pensar / Creer', type: 'word', category: 'Verbos', example: 'I think so.', emotionalTip: 'Cuando te preguntan tu opinión y todas las miradas están sobre ti. "I THINK that..." y tu corazón se acelera.' },
      { word: 'See', meaning: 'Ver', type: 'word', category: 'Verbos', example: 'See you tomorrow!', emotionalTip: 'El momento de reconocer a alguien querido entre la multitud del aeropuerto. I SEE you. Alivio y alegría.' },
      { word: 'Work', meaning: 'Trabajar / Funcionar', type: 'word', category: 'Verbos', example: 'It doesn\'t work.', emotionalTip: 'La frustración cuando algo no funciona justo antes de una entrega importante. "It doesn\'t WORK!" Desesperación.' },

      // --- 10 CONECTORES BÁSICOS ---
      { word: 'And', meaning: 'Y', type: 'connector', category: 'Conectores', example: 'Coffee and a sandwich, please.', emotionalTip: 'Cuando enumeras todo lo bueno que tienes: mi familia AND mis amigos AND mi salud. Gratitud acumulada.' },
      { word: 'But', meaning: 'Pero', type: 'connector', category: 'Conectores', example: 'I like it, but it\'s expensive.', emotionalTip: 'El BUT que rompe ilusiones. "Te quiero, BUT..." Ese momento donde sabes que viene algo malo.' },
      { word: 'Or', meaning: 'O', type: 'connector', category: 'Conectores', example: 'Tea or coffee?', emotionalTip: 'Esa decisión difícil que te quita el sueño. ¿Esto OR aquello? La ansiedad de elegir mal.' },
      { word: 'Because', meaning: 'Porque', type: 'connector', category: 'Conectores', example: 'I\'m late because of the traffic.', emotionalTip: 'Cuando te pillan en una mentira y tienes que justificarte. "BECAUSE..." buscando excusas desesperadamente.' },
      { word: 'So', meaning: 'Así que / Entonces', type: 'connector', category: 'Conectores', example: 'I was hungry, so I ordered food.', emotionalTip: 'Las consecuencias de tus acciones. Bebí demasiado, SO ahora me duele la cabeza. Causa y efecto.' },
      { word: 'Then', meaning: 'Luego / Entonces', type: 'connector', category: 'Conectores', example: 'First we eat, then we go.', emotionalTip: 'Cuando planeas algo con ilusión. Primero esto, THEN aquello. La anticipación de algo bueno.' },
      { word: 'Also', meaning: 'También', type: 'connector', category: 'Conectores', example: 'I also want dessert.', emotionalTip: 'Cuando ya has pedido mucho pero aún quieres más. "ALSO..." con un poco de vergüenza.' },
      { word: 'Maybe', meaning: 'Quizás / A lo mejor', type: 'connector', category: 'Conectores', example: 'Maybe tomorrow.', emotionalTip: 'Esa respuesta que das cuando no quieres decir que no directamente. MAYBE = probablemente no, pero no quiero herirte.' },
      { word: 'Really', meaning: 'De verdad / Muy', type: 'connector', category: 'Conectores', example: 'I\'m really tired.', emotionalTip: 'Cuando necesitas que te crean. "REALLY, te lo juro, es verdad." Énfasis desesperado.' },
      { word: 'Actually', meaning: 'En realidad', type: 'connector', category: 'Conectores', example: 'Actually, I changed my mind.', emotionalTip: 'Cuando confiesas la verdad después de haber mentido. "ACTUALLY... no era así." El alivio de sincerarte.' },

      // --- 10 PHRASAL VERBS BÁSICOS ---
      { word: 'Wake up', meaning: 'Despertarse', type: 'phrasal', category: 'Phrasal Verbs', example: 'I wake up at 7.', emotionalTip: 'Ese terror cuando miras el reloj y llegas tarde. O la paz de despertar sin alarma un domingo.' },
      { word: 'Get up', meaning: 'Levantarse', type: 'phrasal', category: 'Phrasal Verbs', example: 'Get up, we\'re late!', emotionalTip: 'La lucha interna cada mañana fría de invierno. Tu cama caliente vs. tus responsabilidades.' },
      { word: 'Turn on', meaning: 'Encender', type: 'phrasal', category: 'Phrasal Verbs', example: 'Turn on the lights.', emotionalTip: 'Entrar a casa de noche a oscuras, ese alivio cuando la luz revela que no hay nadie escondido.' },
      { word: 'Turn off', meaning: 'Apagar', type: 'phrasal', category: 'Phrasal Verbs', example: 'Turn off your phone.', emotionalTip: 'Apagar el móvil para desconectar del mundo. Ese silencio liberador y un poco aterrador.' },
      { word: 'Come in', meaning: 'Entrar / Pasa', type: 'phrasal', category: 'Phrasal Verbs', example: 'Come in, sit down!', emotionalTip: 'Cuando te invitan a pasar a una casa donde te sientes bienvenido. Calidez y pertenencia.' },
      { word: 'Go out', meaning: 'Salir', type: 'phrasal', category: 'Phrasal Verbs', example: 'Let\'s go out tonight.', emotionalTip: 'Esa emoción del viernes noche cuando sales con amigos. Libertad, posibilidades, diversión.' },
      { word: 'Sit down', meaning: 'Sentarse', type: 'phrasal', category: 'Phrasal Verbs', example: 'Please sit down.', emotionalTip: 'Cuando tu jefe dice "siéntate" con cara seria. El corazón se acelera, ¿qué he hecho?' },
      { word: 'Put on', meaning: 'Ponerse (ropa)', type: 'phrasal', category: 'Phrasal Verbs', example: 'Put on your jacket, it\'s cold.', emotionalTip: 'Ponerte esa ropa especial para una cita importante. Los nervios de querer causar buena impresión.' },
      { word: 'Take off', meaning: 'Quitarse (ropa)', type: 'phrasal', category: 'Phrasal Verbs', example: 'Take off your shoes.', emotionalTip: 'Quitarte los zapatos después de un día larguísimo. Ese alivio físico de llegar a casa.' },
      { word: 'Look at', meaning: 'Mirar', type: 'phrasal', category: 'Phrasal Verbs', example: 'Look at this!', emotionalTip: 'Cuando alguien te muestra algo increíble y quiere compartir su asombro contigo. Complicidad.' },

      // --- 10 EXPRESIONES DEL DÍA A DÍA ---
      { word: 'How are you?', meaning: '¿Cómo estás?', type: 'expression', category: 'Expresiones', example: 'Hey! How are you?', emotionalTip: 'Cuando alguien te lo pregunta de verdad y espera una respuesta honesta. Sentirte visto.' },
      { word: 'I\'m fine, thanks', meaning: 'Bien, gracias', type: 'expression', category: 'Expresiones', example: 'I\'m fine, thanks. And you?', emotionalTip: 'La mentira social que todos decimos aunque estemos destrozados por dentro. La máscara.' },
      { word: 'Nice to meet you', meaning: 'Encantado/a', type: 'expression', category: 'Expresiones', example: 'Hi, I\'m Ana. Nice to meet you.', emotionalTip: 'Los nervios de conocer a alguien que podría ser importante en tu vida. Primera impresión.' },
      { word: 'See you later', meaning: 'Hasta luego', type: 'expression', category: 'Expresiones', example: 'Bye! See you later.', emotionalTip: 'Despedirte de alguien sin saber si le volverás a ver. Esa incertidumbre suave.' },
      { word: 'No problem', meaning: 'No hay problema / De nada', type: 'expression', category: 'Expresiones', example: 'Thanks! - No problem.', emotionalTip: 'Cuando ayudas a alguien y te sientes bien haciéndolo. Generosidad natural.' },
      { word: 'I don\'t understand', meaning: 'No entiendo', type: 'expression', category: 'Expresiones', example: 'Sorry, I don\'t understand.', emotionalTip: 'La vergüenza de admitir que no entiendes algo que todos parecen entender. Vulnerabilidad.' },
      { word: 'Can you repeat?', meaning: '¿Puedes repetir?', type: 'expression', category: 'Expresiones', example: 'Can you repeat, please?', emotionalTip: 'Cuando no has pillado algo importante y temes parecer tonto al preguntar de nuevo.' },
      { word: 'Excuse me', meaning: 'Disculpa / Perdona', type: 'expression', category: 'Expresiones', example: 'Excuse me, where is the bathroom?', emotionalTip: 'Interrumpir a un desconocido con el corazón un poco acelerado. Invadir su espacio.' },
      { word: 'I\'m sorry', meaning: 'Lo siento', type: 'expression', category: 'Expresiones', example: 'I\'m sorry, I\'m late.', emotionalTip: 'Cuando de verdad sientes haber hecho daño a alguien que te importa. Culpa genuina.' },
      { word: 'Of course', meaning: 'Por supuesto / Claro', type: 'expression', category: 'Expresiones', example: 'Can I sit here? - Of course!', emotionalTip: 'Decir que sí con el corazón, no solo con la boca. Aceptación total, sin reservas.' }
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
      { word: 'Try', meaning: 'Intentar / Probar', type: 'word', category: 'Verbos', example: 'Try this, it\'s delicious!', emotionalTip: 'El miedo antes de lanzarte a hacer algo nuevo. TRY es ese segundo de valentía antes del salto.' },
      { word: 'Wait', meaning: 'Esperar', type: 'word', category: 'Verbos', example: 'Wait for me!', emotionalTip: 'El nudo en el estómago mientras esperas los resultados del médico. WAIT es ansiedad contenida.' },
      { word: 'Tell', meaning: 'Decir / Contar', type: 'word', category: 'Verbos', example: 'Tell me more.', emotionalTip: 'Cuando te mueres por saber un secreto. "TELL me!" Curiosidad que te consume.' },
      { word: 'Ask', meaning: 'Preguntar / Pedir', type: 'word', category: 'Verbos', example: 'Can I ask you something?', emotionalTip: 'El terror de pedir un aumento a tu jefe. ASK cuando tu voz tiembla un poco.' },
      { word: 'Feel', meaning: 'Sentir / Sentirse', type: 'word', category: 'Verbos', example: 'I feel tired today.', emotionalTip: 'Cuando alguien pregunta cómo estás y no tienes palabras para explicarlo. I FEEL... todo y nada.' },
      { word: 'Remember', meaning: 'Recordar', type: 'word', category: 'Verbos', example: 'I don\'t remember his name.', emotionalTip: 'Ese olor que te transporta a casa de tus abuelos. REMEMBER es nostalgia instantánea.' },
      { word: 'Forget', meaning: 'Olvidar', type: 'word', category: 'Verbos', example: 'I forgot my wallet.', emotionalTip: 'El pánico de olvidar algo importante: un cumpleaños, una cita, la estufa encendida.' },
      { word: 'Leave', meaning: 'Irse / Dejar', type: 'word', category: 'Verbos', example: 'I\'m leaving now.', emotionalTip: 'Cerrar la puerta de casa de tus padres por última vez. LEAVE duele cuando es definitivo.' },
      { word: 'Stay', meaning: 'Quedarse', type: 'word', category: 'Verbos', example: 'Stay here, I\'ll be back.', emotionalTip: 'Cuando alguien que amas se va pero tú no puedes acompañarle. "STAY with me." La súplica.' },
      { word: 'Send', meaning: 'Enviar', type: 'word', category: 'Verbos', example: 'Send me the details.', emotionalTip: 'Enviar ese mensaje arriesgado y quedarte mirando la pantalla esperando respuesta.' },

      // --- 10 CONECTORES PARA CONTAR COSAS ---
      { word: 'After', meaning: 'Después de', type: 'connector', category: 'Conectores', example: 'After work, I go to the gym.', emotionalTip: 'El alivio que sientes después de superar algo duro. AFTER the storm, la calma.' },
      { word: 'Before', meaning: 'Antes de', type: 'connector', category: 'Conectores', example: 'Before I forget...', emotionalTip: 'Los nervios la noche BEFORE de un examen importante. La anticipación nerviosa.' },
      { word: 'When', meaning: 'Cuando', type: 'connector', category: 'Conectores', example: 'When I was young...', emotionalTip: 'Cuando recuerdas épocas mejores. WHEN I was happy... Nostalgia de lo que fue.' },
      { word: 'While', meaning: 'Mientras', type: 'connector', category: 'Conectores', example: 'I listen to music while I work.', emotionalTip: 'Esos pequeños placeres que haces mientras trabajas. WHILE: robar momentos de felicidad.' },
      { word: 'If', meaning: 'Si (condicional)', type: 'connector', category: 'Conectores', example: 'If you want, we can go.', emotionalTip: 'El condicional de los arrepentimientos. "IF I had..." Las decisiones que no tomaste.' },
      { word: 'Anyway', meaning: 'De todas formas / Bueno', type: 'connector', category: 'Conectores', example: 'Anyway, let\'s go.', emotionalTip: 'Cuando cambias de tema incómodo. ANYWAY... cortando una conversación difícil.' },
      { word: 'By the way', meaning: 'Por cierto', type: 'connector', category: 'Conectores', example: 'By the way, where is John?', emotionalTip: 'Cuando quieres preguntar algo pero finges que es casual. Como si no te importara.' },
      { word: 'For example', meaning: 'Por ejemplo', type: 'connector', category: 'Conectores', example: 'I like fruits, for example, apples.', emotionalTip: 'Cuando intentas explicarte y buscas algo concreto para que te entiendan.' },
      { word: 'I mean', meaning: 'O sea / Quiero decir', type: 'connector', category: 'Conectores', example: 'I mean, it\'s not bad.', emotionalTip: 'Cuando metes la pata y tratas de arreglarlo. I MEAN... retrocediendo torpemente.' },
      { word: 'You know', meaning: 'Ya sabes / Sabes', type: 'connector', category: 'Conectores', example: 'It\'s like, you know, complicated.', emotionalTip: 'Buscando complicidad cuando no sabes explicarte. YOU KNOW... esperando que te entiendan.' },

      // --- 10 PHRASAL VERBS COMUNES ---
      { word: 'Look for', meaning: 'Buscar', type: 'phrasal', category: 'Phrasal Verbs', example: 'I\'m looking for my keys.', emotionalTip: 'La desesperación de buscar las llaves cuando llegas tarde. Frustración pura.' },
      { word: 'Pick up', meaning: 'Recoger / Coger', type: 'phrasal', category: 'Phrasal Verbs', example: 'I\'ll pick you up at 8.', emotionalTip: 'Que alguien venga a recogerte. Sentirte cuidado, no tener que apañártelas solo.' },
      { word: 'Give up', meaning: 'Rendirse / Dejar de', type: 'phrasal', category: 'Phrasal Verbs', example: 'Don\'t give up!', emotionalTip: 'El momento de rendirte después de intentarlo todo. La derrota que duele en el pecho.' },
      { word: 'Come back', meaning: 'Volver', type: 'phrasal', category: 'Phrasal Verbs', example: 'When are you coming back?', emotionalTip: 'Esperar el regreso de alguien querido. La esperanza mezclada con añoranza.' },
      { word: 'Find out', meaning: 'Descubrir / Enterarse', type: 'phrasal', category: 'Expresiones', example: 'I found out he lied.', emotionalTip: 'El golpe de descubrir una traición. Enterarte de algo que te rompe por dentro.' },
      { word: 'Hurry up', meaning: 'Darse prisa', type: 'phrasal', category: 'Phrasal Verbs', example: 'Hurry up, we\'re late!', emotionalTip: 'La adrenalina del estrés cuando vas contra reloj. El corazón acelerado.' },
      { word: 'Grow up', meaning: 'Crecer / Madurar', type: 'phrasal', category: 'Phrasal Verbs', example: 'I grew up in Madrid.', emotionalTip: 'Cuando alguien te dice que madures y te duele porque sabes que tiene razón.' },
      { word: 'Give back', meaning: 'Devolver', type: 'phrasal', category: 'Phrasal Verbs', example: 'Give me back my phone!', emotionalTip: 'Que alguien tenga algo tuyo y se niegue a devolverlo. Impotencia y rabia.' },
      { word: 'Write down', meaning: 'Apuntar / Anotar', type: 'phrasal', category: 'Phrasal Verbs', example: 'Write down the address.', emotionalTip: 'Apuntar algo importante con miedo de olvidarlo. La inseguridad de tu memoria.' },
      { word: 'Log in', meaning: 'Iniciar sesión', type: 'phrasal', category: 'Phrasal Verbs', example: 'Log in with your email.', emotionalTip: 'No recordar la contraseña después de mil intentos. La frustración digital moderna.' },

      // --- 10 EXPRESIONES MUY COMUNES ---
      { word: 'What\'s up?', meaning: '¿Qué pasa? / ¿Qué tal?', type: 'expression', category: 'Expresiones', example: 'Hey! What\'s up?', emotionalTip: 'Ese amigo que te saluda como si no pasara el tiempo. Familiaridad instantánea.' },
      { word: 'Take care', meaning: 'Cuídate', type: 'expression', category: 'Expresiones', example: 'See you! Take care.', emotionalTip: 'Decirle a alguien que se cuide porque de verdad te importa su bienestar.' },
      { word: 'Good luck', meaning: 'Buena suerte', type: 'expression', category: 'Expresiones', example: 'Good luck with your exam!', emotionalTip: 'Cuando alguien te desea suerte y sientes que alguien cree en ti.' },
      { word: 'Never mind', meaning: 'No importa / Déjalo', type: 'expression', category: 'Expresiones', example: 'Never mind, forget it.', emotionalTip: 'Cuando renuncias a explicar algo porque nadie te entiende. Resignación silenciosa.' },
      { word: 'It doesn\'t matter', meaning: 'No importa / Da igual', type: 'expression', category: 'Expresiones', example: 'It doesn\'t matter, really.', emotionalTip: 'Decir que no importa cuando en realidad sí importa. La mentira piadosa.' },
      { word: 'I have no idea', meaning: 'Ni idea / No tengo ni idea', type: 'expression', category: 'Expresiones', example: 'I have no idea what happened.', emotionalTip: 'Cuando estás completamente perdido y lo admites. Honestidad vulnerable.' },
      { word: 'Just a moment', meaning: 'Un momento', type: 'expression', category: 'Expresiones', example: 'Just a moment, please.', emotionalTip: 'Pedir tiempo cuando te presionan. Necesitar un respiro antes de continuar.' },
      { word: 'That\'s fine', meaning: 'Está bien / Vale', type: 'expression', category: 'Expresiones', example: 'That\'s fine with me.', emotionalTip: 'Conformarte con algo aunque preferirías otra cosa. Ceder para evitar conflicto.' },
      { word: 'I\'m not sure', meaning: 'No estoy seguro/a', type: 'expression', category: 'Expresiones', example: 'I\'m not sure if I can go.', emotionalTip: 'La duda que te paraliza. No saber qué hacer y temer equivocarte.' },
      { word: 'Well done!', meaning: '¡Bien hecho!', type: 'expression', category: 'Expresiones', example: 'You passed! Well done!', emotionalTip: 'Cuando alguien reconoce tu esfuerzo. Sentir que has valido la pena.' }
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
      { word: 'Seem', meaning: 'Parecer', type: 'word', category: 'Verbos', example: 'It seems like a good idea.', emotionalTip: 'Cuando algo PARECE perfecto pero tu intuición te dice que no. SEEM es la máscara que oculta la realidad.' },
      { word: 'Guess', meaning: 'Suponer / Adivinar', type: 'word', category: 'Verbos', example: 'I guess you\'re right.', emotionalTip: 'Cuando no estás seguro pero tienes que responder igual. I GUESS... inseguridad disfrazada de respuesta.' },
      { word: 'Expect', meaning: 'Esperar (expectativa)', type: 'word', category: 'Verbos', example: 'I didn\'t expect that.', emotionalTip: 'La decepción cuando la realidad no coincide con lo que esperabas. Expectativas rotas.' },
      { word: 'Realize', meaning: 'Darse cuenta', type: 'word', category: 'Verbos', example: 'I just realized I forgot my wallet.', emotionalTip: 'Ese momento de horror cuando COMPRENDES lo que has hecho mal. La verdad que te golpea.' },
      { word: 'Agree', meaning: 'Estar de acuerdo', type: 'word', category: 'Verbos', example: 'I totally agree with you.', emotionalTip: 'Cuando por fin alguien piensa como tú y no te sientes solo. Conexión de ideas.' },
      { word: 'Suggest', meaning: 'Sugerir', type: 'word', category: 'Verbos', example: 'I suggest we take a break.', emotionalTip: 'Proponer algo con miedo a que lo rechacen. SUGGEST es la idea tímida que lanzas al aire.' },
      { word: 'Recommend', meaning: 'Recomendar', type: 'word', category: 'Verbos', example: 'I recommend this restaurant.', emotionalTip: 'Cuando recomiendas algo personal y temes que no les guste. Tu gusto expuesto al juicio.' },
      { word: 'Manage', meaning: 'Conseguir / Arreglárselas', type: 'word', category: 'Verbos', example: 'I managed to finish on time.', emotionalTip: 'El orgullo de lograrlo cuando todos pensaban que fallarías. Contra todo pronóstico, lo conseguiste.' },
      { word: 'Afford', meaning: 'Permitirse (dinero)', type: 'word', category: 'Verbos', example: 'I can\'t afford a new car.', emotionalTip: 'Mirar el precio de algo y sentir que la vida es injusta. No poder permitírtelo duele.' },
      { word: 'Improve', meaning: 'Mejorar', type: 'word', category: 'Verbos', example: 'My English is improving.', emotionalTip: 'Ver tu propio progreso después de mucho esfuerzo. Esa satisfacción de ser mejor que ayer.' },

      // --- 10 CONECTORES PARA HABLAR FLUIDO ---
      { word: 'Although', meaning: 'Aunque', type: 'connector', category: 'Conectores', example: 'Although it was late, I finished.', emotionalTip: 'Cuando reconoces un problema pero sigues adelante. ALTHOUGH: sí, es difícil, pero no me rindo.' },
      { word: 'However', meaning: 'Sin embargo', type: 'connector', category: 'Conectores', example: 'It\'s cheap. However, it\'s bad quality.', emotionalTip: 'El "pero" elegante que rompe las ilusiones. Te digo algo bueno... HOWEVER, viene lo malo.' },
      { word: 'Instead', meaning: 'En su lugar', type: 'connector', category: 'Conectores', example: 'Let\'s do this instead.', emotionalTip: 'Cambiar de plan cuando el original no funciona. Adaptarse o morir.' },
      { word: 'Besides', meaning: 'Además', type: 'connector', category: 'Conectores', example: 'It\'s late, and besides, I\'m tired.', emotionalTip: 'Acumular razones para justificarte. Y además... y ADEMÁS... la lista de excusas crece.' },
      { word: 'Otherwise', meaning: 'Si no / De lo contrario', type: 'connector', category: 'Conectores', example: 'Hurry up, otherwise we\'ll be late.', emotionalTip: 'La amenaza que anticipa consecuencias. Hazlo... OTHERWISE la vas a liar.' },
      { word: 'Even though', meaning: 'Aunque (enfático)', type: 'connector', category: 'Conectores', example: 'Even though I studied, I failed.', emotionalTip: 'La injusticia de esforzarte y fracasar igual. Hice TODO bien y aun así...' },
      { word: 'Basically', meaning: 'Básicamente', type: 'connector', category: 'Conectores', example: 'Basically, it\'s done.', emotionalTip: 'Cuando resumes porque la otra persona no pilla los detalles. Simplificando para tontos.' },
      { word: 'Apparently', meaning: 'Por lo visto / Al parecer', type: 'connector', category: 'Conectores', example: 'Apparently, he quit his job.', emotionalTip: 'El cotilleo elegante. No lo sé de primera mano, pero APPARENTLY... el chismorreo educado.' },
      { word: 'Obviously', meaning: 'Obviamente', type: 'connector', category: 'Conectores', example: 'Obviously, I said yes.', emotionalTip: 'Cuando algo es tan evidente que te sorprende tener que explicarlo. Puro duh.' },
      { word: 'Hopefully', meaning: 'Ojalá / Con suerte', type: 'connector', category: 'Conectores', example: 'Hopefully, it will work.', emotionalTip: 'Esa esperanza frágil cuando no tienes el control. HOPEFULLY... cruzando los dedos.' },

      // --- 10 PHRASAL VERBS ESENCIALES ---
      { word: 'Figure out', meaning: 'Entender / Resolver', type: 'phrasal', category: 'Phrasal Verbs', example: 'I can\'t figure out this problem.', emotionalTip: 'La frustración de no entender algo que deberías entender. La solución que se te escapa.' },
      { word: 'Work out', meaning: 'Hacer ejercicio / Funcionar', type: 'phrasal', category: 'Phrasal Verbs', example: 'Things will work out, don\'t worry.', emotionalTip: 'La fe de que todo se solucionará aunque no veas cómo. Optimismo en la incertidumbre.' },
      { word: 'Show up', meaning: 'Aparecer / Presentarse', type: 'phrasal', category: 'Phrasal Verbs', example: 'He didn\'t show up to the meeting.', emotionalTip: 'Esperar a alguien que nunca llega. El plantón, la decepción de que no aparezca.' },
      { word: 'Run out of', meaning: 'Quedarse sin', type: 'phrasal', category: 'Phrasal Verbs', example: 'We ran out of milk.', emotionalTip: 'Ese vacío cuando se acaba algo que necesitabas. No queda nada y lo descubres demasiado tarde.' },
      { word: 'Get along with', meaning: 'Llevarse bien con', type: 'phrasal', category: 'Phrasal Verbs', example: 'I get along with my boss.', emotionalTip: 'La paz de trabajar con alguien que te cae bien. Cuando las relaciones fluyen sin esfuerzo.' },
      { word: 'Set up', meaning: 'Organizar / Configurar', type: 'phrasal', category: 'Phrasal Verbs', example: 'Let\'s set up a meeting.', emotionalTip: 'Tomar las riendas y organizar algo. Sentirte capaz de crear orden del caos.' },
      { word: 'Catch up', meaning: 'Ponerse al día', type: 'phrasal', category: 'Phrasal Verbs', example: 'Let\'s catch up over coffee!', emotionalTip: 'Reencontrarte con un viejo amigo y contaros todo. El calor de retomar una amistad.' },
      { word: 'Check out', meaning: 'Echar un vistazo', type: 'phrasal', category: 'Phrasal Verbs', example: 'Check out this video!', emotionalTip: 'Compartir algo que te encanta esperando que al otro también le guste.' },
      { word: 'Look forward to', meaning: 'Tener ganas de', type: 'phrasal', category: 'Phrasal Verbs', example: 'I\'m looking forward to the weekend!', emotionalTip: 'La ilusión de algo bueno que está por venir. Anticipación feliz.' },
      { word: 'Put off', meaning: 'Posponer', type: 'phrasal', category: 'Phrasal Verbs', example: 'Stop putting it off, do it now!', emotionalTip: 'El arte de dejar para mañana lo que deberías hacer hoy. La culpa del procrastinador.' },

      // --- 10 EXPRESIONES PARA EL DÍA A DÍA ---
      { word: 'It\'s up to you', meaning: 'Tú decides / Depende de ti', type: 'expression', category: 'Expresiones', example: 'Pizza or sushi? It\'s up to you.', emotionalTip: 'Cuando te dan el poder de decidir y no sabes si es un regalo o una carga.' },
      { word: 'That makes sense', meaning: 'Tiene sentido', type: 'expression', category: 'Expresiones', example: 'Oh, that makes sense now!', emotionalTip: 'El click mental cuando por fin entiendes algo. El alivio de que encaje.' },
      { word: 'It\'s not a big deal', meaning: 'No es para tanto', type: 'expression', category: 'Expresiones', example: 'Relax, it\'s not a big deal.', emotionalTip: 'Calmar a alguien que exagera. O fingir que algo no te afecta cuando sí lo hace.' },
      { word: 'Let me know', meaning: 'Avísame / Dime', type: 'expression', category: 'Expresiones', example: 'Let me know if you need help.', emotionalTip: 'Ofrecer ayuda genuina. Estar ahí para alguien sin imponerte.' },
      { word: 'To be honest', meaning: 'Para ser sincero/a', type: 'expression', category: 'Expresiones', example: 'To be honest, I don\'t like it.', emotionalTip: 'Armarte de valor para decir la verdad incómoda. Honestidad que puede doler.' },
      { word: 'I\'m not in the mood', meaning: 'No me apetece', type: 'expression', category: 'Expresiones', example: 'I\'m not in the mood for a party.', emotionalTip: 'Cuando tu cuerpo y tu mente dicen que no. Respetar tu propio estado emocional.' },
      { word: 'Fair enough', meaning: 'Me parece bien / Vale', type: 'expression', category: 'Expresiones', example: 'Fair enough, let\'s do it.', emotionalTip: 'Aceptar el argumento del otro aunque no estés 100% convencido. Ceder con dignidad.' },
      { word: 'It depends', meaning: 'Depende', type: 'expression', category: 'Expresiones', example: 'Are you coming? It depends.', emotionalTip: 'La respuesta cobarde cuando no quieres comprometerte. Dejando todas las puertas abiertas.' },
      { word: 'That\'s the thing', meaning: 'Esa es la cuestión', type: 'expression', category: 'Expresiones', example: 'That\'s the thing, I don\'t know.', emotionalTip: 'Señalar el problema central. Ir al meollo del asunto, al quid de la cuestión.' },
      { word: 'I\'ll let you know', meaning: 'Ya te diré / Te aviso', type: 'expression', category: 'Expresiones', example: 'I\'ll let you know tomorrow.', emotionalTip: 'Ganar tiempo para pensarlo. O una forma educada de no comprometerse.' }
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
      { word: 'Assume', meaning: 'Suponer / Asumir', type: 'word', category: 'Verbos', example: 'I assume you know about it.', emotionalTip: 'Cuando das algo por hecho y luego descubres que estabas equivocado. La vergüenza de asumir.' },
      { word: 'Consider', meaning: 'Considerar / Plantearse', type: 'word', category: 'Verbos', example: 'Have you considered moving?', emotionalTip: 'Esa pregunta que te hace replantearte toda tu vida. ¿Y si todo pudiera ser diferente?' },
      { word: 'Tend to', meaning: 'Tender a / Soler', type: 'word', category: 'Verbos', example: 'I tend to wake up early.', emotionalTip: 'Reconocer tus patrones, buenos o malos. Ser consciente de quién eres realmente.' },
      { word: 'Involve', meaning: 'Implicar / Involucrar', type: 'word', category: 'Verbos', example: 'What does the job involve?', emotionalTip: 'Antes de meterte en algo, preguntar qué implica. El miedo a comprometerte sin saber.' },
      { word: 'Struggle', meaning: 'Luchar / Costar (esfuerzo)', type: 'word', category: 'Verbos', example: 'I struggle with mornings.', emotionalTip: 'Esa batalla diaria contra algo que otros hacen fácilmente. Sentirte incapaz a veces.' },
      { word: 'Achieve', meaning: 'Lograr / Conseguir', type: 'word', category: 'Verbos', example: 'She achieved her goals.', emotionalTip: 'Cruzar la meta después de sacrificarlo todo. El orgullo que te llena el pecho.' },
      { word: 'Avoid', meaning: 'Evitar', type: 'word', category: 'Verbos', example: 'I try to avoid sugar.', emotionalTip: 'Los caminos largos que tomas para no enfrentar algo. Huir de lo que te asusta.' },
      { word: 'Convince', meaning: 'Convencer', type: 'word', category: 'Verbos', example: 'You convinced me!', emotionalTip: 'Cuando alguien cambia tu mente con argumentos. Rendirte ante una verdad mejor.' },
      { word: 'Complain', meaning: 'Quejarse', type: 'word', category: 'Verbos', example: 'Stop complaining!', emotionalTip: 'Ese alivio de desahogarte, aunque nadie pueda arreglarlo. Necesitar que te escuchen.' },
      { word: 'Appreciate', meaning: 'Agradecer / Valorar', type: 'word', category: 'Verbos', example: 'I really appreciate your help.', emotionalTip: 'Gratitud genuina hacia alguien que estuvo ahí cuando lo necesitabas. Reconocer el valor.' },

      // --- 10 CONECTORES PARA DEBATIR ---
      { word: 'Therefore', meaning: 'Por lo tanto', type: 'connector', category: 'Conectores', example: 'It was late, therefore we left.', emotionalTip: 'La conclusión inevitable después de analizar todo. No hay más opción que...' },
      { word: 'Nevertheless', meaning: 'Sin embargo / Aun así', type: 'connector', category: 'Conectores', example: 'It was hard. Nevertheless, I did it.', emotionalTip: 'Cuando todo estaba en contra pero lo hiciste igual. La terquedad que te salvó.' },
      { word: 'On the other hand', meaning: 'Por otro lado', type: 'connector', category: 'Conectores', example: 'It\'s cheap, but on the other hand, it\'s slow.', emotionalTip: 'Ver las dos caras de la moneda. Esa duda entre dos verdades que compiten.' },
      { word: 'In that case', meaning: 'En ese caso', type: 'connector', category: 'Conectores', example: 'In that case, count me in!', emotionalTip: 'Cuando una nueva información cambia tu decisión completamente. Adaptarte sobre la marcha.' },
      { word: 'As long as', meaning: 'Siempre que / Mientras', type: 'connector', category: 'Conectores', example: 'You can go as long as you\'re back by 10.', emotionalTip: 'La condición que pones para dar permiso. Control y confianza a partes iguales.' },
      { word: 'Unless', meaning: 'A menos que', type: 'connector', category: 'Conectores', example: 'I\'ll go unless it rains.', emotionalTip: 'La excepción que podría arruinarlo todo. La puerta de escape que te dejas.' },
      { word: 'Despite', meaning: 'A pesar de', type: 'connector', category: 'Conectores', example: 'Despite the rain, we had fun.', emotionalTip: 'Cuando las circunstancias eran malas pero tú eras más fuerte. Victoria sobre la adversidad.' },
      { word: 'Whereas', meaning: 'Mientras que', type: 'connector', category: 'Conectores', example: 'I like tea, whereas he prefers coffee.', emotionalTip: 'Las diferencias que hacen única cada relación. Aceptar que no todos somos iguales.' },
      { word: 'On top of that', meaning: 'Además de eso / Encima', type: 'connector', category: 'Conectores', example: 'I\'m tired and, on top of that, hungry.', emotionalTip: 'Cuando los problemas se acumulan uno encima del otro. La gota que colma el vaso.' },
      { word: 'That being said', meaning: 'Dicho esto', type: 'connector', category: 'Conectores', example: 'That being said, I still think it\'s worth it.', emotionalTip: 'Reconocer lo malo pero seguir adelante. Realismo optimista.' },

      // --- 10 PHRASAL VERBS NATIVOS ---
      { word: 'Come up with', meaning: 'Idear / Se me ocurrió', type: 'phrasal', category: 'Phrasal Verbs', example: 'She came up with a great idea.', emotionalTip: 'Ese momento brillante cuando la solución aparece de la nada. La chispa creativa.' },
      { word: 'Turn out', meaning: 'Resultar ser', type: 'phrasal', category: 'Phrasal Verbs', example: 'It turned out to be a good decision.', emotionalTip: 'Cuando la realidad supera o destroza tus expectativas. La sorpresa del final.' },
      { word: 'Bring up', meaning: 'Sacar un tema', type: 'phrasal', category: 'Phrasal Verbs', example: 'Why did you bring that up?', emotionalTip: 'Mencionar algo incómodo que nadie quería tocar. El silencio tenso que sigue.' },
      { word: 'Get over', meaning: 'Superar', type: 'phrasal', category: 'Phrasal Verbs', example: 'I can\'t get over it.', emotionalTip: 'Intentar dejar atrás algo que te destrozó. El dolor que se niega a irse.' },
      { word: 'Put up with', meaning: 'Aguantar / Tolerar', type: 'phrasal', category: 'Phrasal Verbs', example: 'I can\'t put up with this noise.', emotionalTip: 'Soportar algo horrible porque no tienes otra opción. Paciencia que se agota.' },
      { word: 'Get away with', meaning: 'Salirse con la suya', type: 'phrasal', category: 'Phrasal Verbs', example: 'You won\'t get away with this!', emotionalTip: 'La rabia de ver que alguien escapa sin consecuencias. La injusticia que quema.' },
      { word: 'Hold on', meaning: 'Espera / Aguanta', type: 'phrasal', category: 'Phrasal Verbs', example: 'Hold on, I\'ll be right back.', emotionalTip: 'Pedir a alguien que espere cuando todo va demasiado rápido. Necesitar un segundo.' },
      { word: 'Mess up', meaning: 'Cagarla / Estropear', type: 'phrasal', category: 'Phrasal Verbs', example: 'I totally messed up.', emotionalTip: 'Ese momento horrible cuando te das cuenta de que la has liado. Arrepentimiento instantáneo.' },
      { word: 'Freak out', meaning: 'Flipar / Entrar en pánico', type: 'phrasal', category: 'Phrasal Verbs', example: 'Don\'t freak out, it\'s fine.', emotionalTip: 'Perder el control emocional completamente. El pánico que te consume.' },
      { word: 'End up', meaning: 'Acabar / Terminar', type: 'phrasal', category: 'Phrasal Verbs', example: 'We ended up staying until midnight.', emotionalTip: 'Cuando las cosas no salen como planeabas pero no está mal. Destinos inesperados.' },

      // --- 10 EXPRESIONES DE SERIES Y PELÍCULAS ---
      { word: 'No way!', meaning: '¡Ni de broma! / ¡No me digas!', type: 'expression', category: 'Expresiones', example: 'You quit your job? No way!', emotionalTip: 'Incredulidad total ante algo que no puedes creer. La sorpresa que te deja sin palabras.' },
      { word: 'I\'m done', meaning: 'He terminado / Paso de esto', type: 'expression', category: 'Expresiones', example: 'I\'m done with this situation.', emotionalTip: 'El hartazgo de decir basta. Cuando tu paciencia finalmente se agota.' },
      { word: 'That\'s insane', meaning: 'Eso es una locura', type: 'expression', category: 'Expresiones', example: 'You swam 5km? That\'s insane!', emotionalTip: 'Asombro ante algo extraordinario. Cuando alguien hace lo que tú ni te atreverías.' },
      { word: 'Get the point', meaning: 'Captar la idea / Entender', type: 'expression', category: 'Expresiones', example: 'I get the point, you can stop.', emotionalTip: 'Cuando ya entiendes pero el otro sigue explicando. Paciencia contada.' },
      { word: 'You\'re kidding', meaning: 'Estás de broma', type: 'expression', category: 'Expresiones', example: 'You won? You\'re kidding!', emotionalTip: 'No poder creer lo que te cuentan. Esa mezcla de sorpresa y escepticismo.' },
      { word: 'I couldn\'t care less', meaning: 'Me importa un bledo', type: 'expression', category: 'Expresiones', example: 'I couldn\'t care less about what he thinks.', emotionalTip: 'Indiferencia total hacia algo o alguien. La libertad de que te dé igual.' },
      { word: 'That\'s not the point', meaning: 'Esa no es la cuestión', type: 'expression', category: 'Expresiones', example: 'Yeah but that\'s not the point.', emotionalTip: 'La frustración cuando alguien se va por la tangente. Querer volver al tema.' },
      { word: 'Keep it real', meaning: 'Sé auténtico / Sin rollos', type: 'expression', category: 'Expresiones', example: 'Forget the drama, keep it real.', emotionalTip: 'Pedir honestidad en un mundo de mentiras. Valorar la autenticidad.' },
      { word: 'Been there, done that', meaning: 'Ya pasé por eso', type: 'expression', category: 'Expresiones', example: 'Drama at work? Been there, done that.', emotionalTip: 'La experiencia que te da perspectiva. Haber sufrido algo similar antes.' },
      { word: 'It is what it is', meaning: 'Es lo que hay', type: 'expression', category: 'Expresiones', example: 'The deadline is tomorrow. It is what it is.', emotionalTip: 'Aceptar una realidad que no puedes cambiar. Rendirse con paz, no con derrota.' }
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
      { word: 'Address', meaning: 'Abordar / Tratar (un tema)', type: 'word', category: 'Verbos', example: 'We need to address this issue.', emotionalTip: 'El momento de enfrentar un problema que todos evitaban. Tomar la iniciativa cuando nadie más lo hace.' },
      { word: 'Implement', meaning: 'Implementar', type: 'word', category: 'Verbos', example: 'We\'ll implement the changes next week.', emotionalTip: 'Pasar de la idea al hecho. Ese nervio de poner en marcha algo que podría fallar o triunfar.' },
      { word: 'Ensure', meaning: 'Asegurar(se)', type: 'word', category: 'Verbos', example: 'Please ensure everyone is informed.', emotionalTip: 'La responsabilidad de que todo salga bien. Cargar con las consecuencias si falla.' },
      { word: 'Clarify', meaning: 'Aclarar', type: 'word', category: 'Verbos', example: 'Let me clarify what I mean.', emotionalTip: 'Cuando sientes que te han malinterpretado. La urgencia de ser entendido correctamente.' },
      { word: 'Prioritize', meaning: 'Priorizar', type: 'word', category: 'Verbos', example: 'We need to prioritize this task.', emotionalTip: 'Decidir qué importa más cuando todo parece urgente. El peso de elegir.' },
      { word: 'Overcome', meaning: 'Superar', type: 'word', category: 'Verbos', example: 'She overcame many challenges.', emotionalTip: 'Mirar atrás y ver todos los obstáculos que venciste. Orgullo de haber sobrevivido.' },
      { word: 'Acknowledge', meaning: 'Reconocer / Admitir', type: 'word', category: 'Verbos', example: 'I acknowledge my mistake.', emotionalTip: 'Tragar tu orgullo y admitir que te equivocaste. La humildad que cuesta.' },
      { word: 'Pursue', meaning: 'Perseguir (objetivo)', type: 'word', category: 'Verbos', example: 'She decided to pursue her dreams.', emotionalTip: 'Dejarlo todo por perseguir algo que te importa. El salto de fe.' },
      { word: 'Delegate', meaning: 'Delegar', type: 'word', category: 'Verbos', example: 'Learn to delegate tasks.', emotionalTip: 'Confiar en que otros hagan lo que tú harías. Soltar el control es difícil.' },
      { word: 'Leverage', meaning: 'Aprovechar / Sacar partido', type: 'word', category: 'Verbos', example: 'Let\'s leverage our experience.', emotionalTip: 'Usar todo lo que tienes a tu favor. Maximizar tus ventajas para ganar.' },

      // --- 10 CONECTORES ELEGANTES PERO NATURALES ---
      { word: 'Having said that', meaning: 'Dicho esto', type: 'connector', category: 'Conectores', example: 'It\'s expensive. Having said that, it\'s worth it.', emotionalTip: 'Reconocer un problema pero no dejar que te detenga. Equilibrio y madurez.' },
      { word: 'That said', meaning: 'Dicho esto (más corto)', type: 'connector', category: 'Conectores', example: 'He\'s difficult. That said, he\'s talented.', emotionalTip: 'Admitir lo malo de alguien antes de defenderlo. Justicia en la crítica.' },
      { word: 'Either way', meaning: 'De cualquier forma', type: 'connector', category: 'Conectores', example: 'Either way, we need to decide.', emotionalTip: 'Cuando ya no importa qué opción elijas. El alivio de aceptar cualquier resultado.' },
      { word: 'At the end of the day', meaning: 'Al fin y al cabo', type: 'connector', category: 'Conectores', example: 'At the end of the day, it\'s your choice.', emotionalTip: 'Lo que realmente importa cuando quitas todo lo superficial. La esencia.' },
      { word: 'To be fair', meaning: 'Para ser justos', type: 'connector', category: 'Conectores', example: 'To be fair, he did apologize.', emotionalTip: 'Defender a alguien aunque estés enfadado con él. Justicia por encima de emociones.' },
      { word: 'As a matter of fact', meaning: 'De hecho', type: 'connector', category: 'Conectores', example: 'As a matter of fact, I agree with you.', emotionalTip: 'Sorprender a alguien diciendo que tiene razón. El giro inesperado.' },
      { word: 'For what it\'s worth', meaning: 'Por lo que pueda valer', type: 'connector', category: 'Conectores', example: 'For what it\'s worth, I think you\'re great.', emotionalTip: 'Ofrecer tu opinión con humildad. No imponerla, solo compartirla.' },
      { word: 'Mind you', meaning: 'Eso sí / Aunque', type: 'connector', category: 'Conectores', example: 'Good restaurant. Mind you, it\'s pricey.', emotionalTip: 'La advertencia justa después del halago. No engañar con expectativas falsas.' },
      { word: 'Not to mention', meaning: 'Por no hablar de', type: 'connector', category: 'Conectores', example: 'It\'s cold, not to mention raining.', emotionalTip: 'Cuando los problemas se acumulan y ni siquiera has mencionado el peor.' },
      { word: 'In a nutshell', meaning: 'En resumen / Resumiendo', type: 'connector', category: 'Conectores', example: 'In a nutshell, we need more time.', emotionalTip: 'Destilar todo en una frase. La claridad mental de quien entiende de verdad.' },

      // --- 10 PHRASAL VERBS DE NIVEL NATIVO ---
      { word: 'Play it down', meaning: 'Quitarle importancia', type: 'phrasal', category: 'Phrasal Verbs', example: 'Don\'t play it down, it\'s serious.', emotionalTip: 'Minimizar algo para no preocupar a los demás. O para no enfrentar la verdad.' },
      { word: 'Rule out', meaning: 'Descartar', type: 'phrasal', category: 'Phrasal Verbs', example: 'We can\'t rule out that option.', emotionalTip: 'Cerrar puertas definitivamente. Tomar decisiones que eliminan posibilidades.' },
      { word: 'Back out', meaning: 'Echarse atrás', type: 'phrasal', category: 'Phrasal Verbs', example: 'He backed out at the last minute.', emotionalTip: 'El miedo que te hace abandonar justo antes. La decepción de quien contaba contigo.' },
      { word: 'Step up', meaning: 'Dar un paso al frente', type: 'phrasal', category: 'Phrasal Verbs', example: 'Someone needs to step up.', emotionalTip: 'Cuando nadie actúa y tú decides hacerlo. Liderazgo en la incertidumbre.' },
      { word: 'Fall through', meaning: 'Fracasar / No salir adelante', type: 'phrasal', category: 'Phrasal Verbs', example: 'The deal fell through.', emotionalTip: 'Cuando algo prometedor se desmorona. La decepción de lo que pudo ser.' },
      { word: 'Look into', meaning: 'Investigar / Estudiar', type: 'phrasal', category: 'Phrasal Verbs', example: 'I\'ll look into it.', emotionalTip: 'Prometer que investigarás algo. A veces sincero, a veces solo para ganar tiempo.' },
      { word: 'Iron out', meaning: 'Resolver / Limar', type: 'phrasal', category: 'Phrasal Verbs', example: 'Let\'s iron out the details.', emotionalTip: 'Pulir los últimos detalles antes de algo importante. Perfeccionismo en acción.' },
      { word: 'Pull off', meaning: 'Lograr (algo difícil)', type: 'phrasal', category: 'Phrasal Verbs', example: 'I can\'t believe we pulled it off!', emotionalTip: 'La euforia de lograr lo imposible. El orgullo de haber demostrado que podías.' },
      { word: 'Get back to', meaning: 'Volver a contactar', type: 'phrasal', category: 'Phrasal Verbs', example: 'I\'ll get back to you on that.', emotionalTip: 'Prometer una respuesta que a veces nunca llega. Esperanza o fantasía.' },
      { word: 'Follow through', meaning: 'Cumplir / Llevar a cabo', type: 'phrasal', category: 'Phrasal Verbs', example: 'Make sure you follow through.', emotionalTip: 'Terminar lo que empezaste. La diferencia entre intención y acción.' },

      // --- 10 EXPRESIONES DE PERSONA CULTA ---
      { word: 'The thing is', meaning: 'El caso es / La cosa es que', type: 'expression', category: 'Expresiones', example: 'The thing is, I need more time.', emotionalTip: 'Cuando tienes que decir algo difícil. La preparación antes del golpe.' },
      { word: 'To cut a long story short', meaning: 'Resumiendo / Yendo al grano', type: 'expression', category: 'Expresiones', example: 'To cut a long story short, we won.', emotionalTip: 'Saltarte el drama y llegar al final. Respetar el tiempo del otro.' },
      { word: 'Go the extra mile', meaning: 'Hacer un esfuerzo extra', type: 'expression', category: 'Expresiones', example: 'She always goes the extra mile.', emotionalTip: 'Dar más de lo que te piden. El compromiso que te distingue de los demás.' },
      { word: 'Be on the same page', meaning: 'Estar en la misma onda', type: 'expression', category: 'Expresiones', example: 'Let\'s make sure we\'re on the same page.', emotionalTip: 'Esa conexión cuando todos entienden lo mismo. Trabajo en equipo real.' },
      { word: 'Think outside the box', meaning: 'Pensar de forma creativa', type: 'expression', category: 'Expresiones', example: 'We need to think outside the box.', emotionalTip: 'Cuando las soluciones normales no funcionan. Creatividad forzada por la necesidad.' },
      { word: 'Hit the ground running', meaning: 'Empezar con buen pie', type: 'expression', category: 'Expresiones', example: 'I want to hit the ground running.', emotionalTip: 'Empezar fuerte desde el primer día. La presión de demostrar tu valía rápido.' },
      { word: 'A steep learning curve', meaning: 'Una curva de aprendizaje', type: 'expression', category: 'Expresiones', example: 'This job has a steep learning curve.', emotionalTip: 'Cuando todo es nuevo y te sientes abrumado. El estrés del principiante.' },
      { word: 'Touch base', meaning: 'Ponerse en contacto', type: 'expression', category: 'Expresiones', example: 'Let\'s touch base next week.', emotionalTip: 'Mantener la conexión sin comprometerse a mucho. Networking ligero.' },
      { word: 'Get the ball rolling', meaning: 'Poner algo en marcha', type: 'expression', category: 'Expresiones', example: 'Let\'s get the ball rolling.', emotionalTip: 'El impulso inicial que cuesta más que el resto. Superar la inercia.' },
      { word: 'Keep me in the loop', meaning: 'Mantenme informado', type: 'expression', category: 'Expresiones', example: 'Keep me in the loop, please.', emotionalTip: 'No querer quedarte fuera de las decisiones. El miedo a ser ignorado.' }
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
      { word: 'Anticipate', meaning: 'Anticipar / Prever', type: 'word', category: 'Verbos', example: 'We didn\'t anticipate this problem.', emotionalTip: 'No ver venir algo que te golpea. La frustración de no haber preparado nada.' },
      { word: 'Undermine', meaning: 'Socavar / Minar', type: 'word', category: 'Verbos', example: 'Don\'t undermine my authority.', emotionalTip: 'Cuando alguien destruye tu trabajo en silencio. La traición que no ves hasta que es tarde.' },
      { word: 'Advocate', meaning: 'Defender / Abogar por', type: 'word', category: 'Verbos', example: 'I advocate for change.', emotionalTip: 'Luchar por algo en lo que crees aunque nadie te escuche. Convicción solitaria.' },
      { word: 'Tackle', meaning: 'Abordar / Hacer frente a', type: 'word', category: 'Verbos', example: 'Let\'s tackle this problem.', emotionalTip: 'Lanzarte contra un problema con determinación. Sin miedo, a por todas.' },
      { word: 'Navigate', meaning: 'Navegar / Manejarse en', type: 'word', category: 'Verbos', example: 'It\'s hard to navigate office politics.', emotionalTip: 'Moverte en situaciones complicadas sin hundirte. El arte de sobrevivir.' },
      { word: 'Thrive', meaning: 'Prosperar / Florecer', type: 'word', category: 'Verbos', example: 'She thrives under pressure.', emotionalTip: 'No solo sobrevivir sino brillar. Cuando la adversidad te hace más fuerte.' },
      { word: 'Resonate', meaning: 'Resonar / Conectar (con)', type: 'word', category: 'Verbos', example: 'This message resonates with me.', emotionalTip: 'Cuando algo te toca por dentro sin saber por qué. Conexión profunda e inexplicable.' },
      { word: 'Overlook', meaning: 'Pasar por alto / Ignorar', type: 'word', category: 'Verbos', example: 'Don\'t overlook the details.', emotionalTip: 'No ver algo que estaba delante de ti. El error que pudiste evitar.' },
      { word: 'Embrace', meaning: 'Abrazar / Aceptar', type: 'word', category: 'Verbos', example: 'Embrace change.', emotionalTip: 'Aceptar algo que te asusta en lugar de huir. La valentía de abrirse.' },
      { word: 'Streamline', meaning: 'Simplificar / Optimizar', type: 'word', category: 'Verbos', example: 'We need to streamline the process.', emotionalTip: 'Eliminar lo innecesario para quedarte solo con lo esencial. Claridad mental.' },

      // --- 10 CONECTORES PARA ARGUMENTAR CON ELEGANCIA ---
      { word: 'Be that as it may', meaning: 'Sea como sea', type: 'connector', category: 'Conectores', example: 'Be that as it may, we still need to act.', emotionalTip: 'Aceptar una realidad incómoda pero actuar igual. Pragmatismo maduro.' },
      { word: 'More often than not', meaning: 'La mayoría de las veces', type: 'connector', category: 'Conectores', example: 'More often than not, he\'s right.', emotionalTip: 'Reconocer que alguien suele tener razón aunque te cueste admitirlo.' },
      { word: 'By and large', meaning: 'En general', type: 'connector', category: 'Conectores', example: 'By and large, people are kind.', emotionalTip: 'Creer que el mundo es bueno a pesar de las excepciones. Optimismo informado.' },
      { word: 'All things considered', meaning: 'Teniendo todo en cuenta', type: 'connector', category: 'Conectores', example: 'All things considered, it was a success.', emotionalTip: 'El balance final después de pesar lo bueno y lo malo. Perspectiva completa.' },
      { word: 'For the most part', meaning: 'En su mayor parte', type: 'connector', category: 'Conectores', example: 'For the most part, I agree.', emotionalTip: 'Estar de acuerdo pero con matices. No todo es blanco o negro.' },
      { word: 'On balance', meaning: 'Sopesándolo todo', type: 'connector', category: 'Conectores', example: 'On balance, it was worth it.', emotionalTip: 'Decidir que valió la pena a pesar del sufrimiento. Paz después de la tormenta.' },
      { word: 'As it turns out', meaning: 'Resulta que', type: 'connector', category: 'Conectores', example: 'As it turns out, I was wrong.', emotionalTip: 'Descubrir que te equivocabas. La humildad de aceptar otro final.' },
      { word: 'Needless to say', meaning: 'Ni que decir tiene', type: 'connector', category: 'Conectores', example: 'Needless to say, I was shocked.', emotionalTip: 'Algo tan obvio que no debería tener que decirlo. Pero lo dices igual.' },
      { word: 'Notwithstanding', meaning: 'No obstante / A pesar de', type: 'connector', category: 'Conectores', example: 'Notwithstanding the law, he did it.', emotionalTip: 'Actuar a pesar de los obstáculos. Determinación que ignora las barreras.' },
      { word: 'With that in mind', meaning: 'Teniendo eso en cuenta', type: 'connector', category: 'Conectores', example: 'With that in mind, let\'s continue.', emotionalTip: 'Considerar algo importante antes de seguir adelante. Prudencia estratégica.' },

      // --- 10 PHRASAL VERBS SUTILES ---
      { word: 'Brush off', meaning: 'Ignorar / No hacer caso', type: 'phrasal', category: 'Phrasal Verbs', example: 'Don\'t brush off my concerns.', emotionalTip: 'Que te ignoren cuando intentas expresar algo importante. El desprecio que duele.' },
      { word: 'Chime in', meaning: 'Intervenir / Meter baza', type: 'phrasal', category: 'Phrasal Verbs', example: 'Feel free to chime in.', emotionalTip: 'Unirte a una conversación aportando tu perspectiva. El coraje de opinar.' },
      { word: 'Pan out', meaning: 'Resultar / Salir', type: 'phrasal', category: 'Phrasal Verbs', example: 'Let\'s see how things pan out.', emotionalTip: 'Esperar a ver cómo termina algo. La incertidumbre del futuro.' },
      { word: 'Touch on', meaning: 'Tocar / Mencionar brevemente', type: 'phrasal', category: 'Phrasal Verbs', example: 'I\'d like to touch on one point.', emotionalTip: 'Mencionar algo sin profundizar. Dejar temas abiertos a propósito.' },
      { word: 'Zone out', meaning: 'Desconectar / Quedarse en blanco', type: 'phrasal', category: 'Phrasal Verbs', example: 'Sorry, I zoned out for a moment.', emotionalTip: 'Cuando tu mente se va sin permiso. La desconexión involuntaria.' },
      { word: 'Play up', meaning: 'Exagerar / Dar problemas', type: 'phrasal', category: 'Phrasal Verbs', example: 'My back is playing up again.', emotionalTip: 'Cuando algo te falla justo cuando menos lo necesitas. La traición del cuerpo.' },
      { word: 'Kick in', meaning: 'Empezar a hacer efecto', type: 'phrasal', category: 'Phrasal Verbs', example: 'The coffee is starting to kick in.', emotionalTip: 'El momento en que empiezas a sentir el efecto. El alivio que llega.' },
      { word: 'Wind down', meaning: 'Relajarse / Ir terminando', type: 'phrasal', category: 'Phrasal Verbs', example: 'Time to wind down for the day.', emotionalTip: 'El ritual de bajar revoluciones al final del día. Soltar la tensión.' },
      { word: 'Mull over', meaning: 'Darle vueltas a', type: 'phrasal', category: 'Phrasal Verbs', example: 'I need to mull it over.', emotionalTip: 'Pensar algo una y otra vez antes de decidir. La mente que no descansa.' },
      { word: 'Stumble upon', meaning: 'Encontrar por casualidad', type: 'phrasal', category: 'Phrasal Verbs', example: 'I stumbled upon this article.', emotionalTip: 'Descubrir algo valioso sin buscarlo. Los regalos del azar.' },

      // --- 10 IDIOMS DE NATIVO EDUCADO ---
      { word: 'The elephant in the room', meaning: 'El tema incómodo que nadie menciona', type: 'expression', category: 'Expresiones', example: 'Let\'s address the elephant in the room.', emotionalTip: 'Ese problema enorme que todos ven pero nadie quiere tocar. La tensión silenciosa.' },
      { word: 'A blessing in disguise', meaning: 'Una bendición disfrazada', type: 'expression', category: 'Expresiones', example: 'Losing that job was a blessing in disguise.', emotionalTip: 'Algo terrible que acabó siendo lo mejor que te pasó. Gratitud inesperada.' },
      { word: 'Break the ice', meaning: 'Romper el hielo', type: 'expression', category: 'Expresiones', example: 'Let\'s play a game to break the ice.', emotionalTip: 'El primer paso incómodo para conectar con desconocidos. Valentía social.' },
      { word: 'Hit the nail on the head', meaning: 'Dar en el clavo', type: 'expression', category: 'Expresiones', example: 'You hit the nail on the head.', emotionalTip: 'Cuando alguien dice exactamente lo que pensabas. Sentirte comprendido.' },
      { word: 'Easier said than done', meaning: 'Del dicho al hecho hay un trecho', type: 'expression', category: 'Expresiones', example: 'Getting fit is easier said than done.', emotionalTip: 'La distancia enorme entre la intención y la acción. Frustrarse con uno mismo.' },
      { word: 'The ball is in your court', meaning: 'Te toca a ti', type: 'expression', category: 'Expresiones', example: 'I made my offer, the ball is in your court.', emotionalTip: 'Cuando la decisión depende de ti y no puedes evitarla. La presión de elegir.' },
      { word: 'Read the room', meaning: 'Leer el ambiente', type: 'expression', category: 'Expresiones', example: 'You need to learn to read the room.', emotionalTip: 'Captar lo que los demás sienten sin que lo digan. Inteligencia emocional.' },
      { word: 'Miss the boat', meaning: 'Perder la oportunidad', type: 'expression', category: 'Expresiones', example: 'If you don\'t apply now, you\'ll miss the boat.', emotionalTip: 'Ver cómo la oportunidad se aleja sin ti. El arrepentimiento de no actuar.' },
      { word: 'Put your foot in your mouth', meaning: 'Meter la pata', type: 'expression', category: 'Expresiones', example: 'I really put my foot in my mouth there.', emotionalTip: 'Decir algo terrible sin darte cuenta. La vergüenza instantánea.' },
      { word: 'Under the weather', meaning: 'Pachucho / Indispuesto', type: 'expression', category: 'Expresiones', example: 'I\'m feeling a bit under the weather.', emotionalTip: 'No estar enfermo pero tampoco bien. Ese malestar vago que no puedes explicar.' }
    ]
  }
];
