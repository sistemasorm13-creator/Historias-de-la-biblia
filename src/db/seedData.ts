export interface BookSeed {
  slug: string;
  name: string;
  testament: "OT" | "NT";
  category: "Pentateuco" | "Históricos" | "Poéticos" | "Profetas Mayores" | "Profetas Menores" | "Evangelios" | "Hechos" | "Cartas" | "Apocalipsis";
  description: string;
  author: string;
  historicalContext: string;
  bookOrder: number;
  chaptersCount: number;
  iconType: string;
}

export interface StorySeed {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  bookSlug: string;
  chapterReference: string;
  readingTimeMinutes: number;
  category: string;
  emotionalTheme: string;
  featured: boolean;
  imageUrl: string;
  audioUrl?: string;
  narrativeContent: string;
  literalContent: string;
  scenes: {
    scene: number;
    title: string;
    image: string;
    narrative: string;
    quote: string;
  }[];
}

export const BOOKS_DATA: BookSeed[] = [
  // Antiguo Testamento (39 libros)
  // Pentateuco
  { slug: "genesis", name: "Génesis", testament: "OT", category: "Pentateuco", description: "El libro de los comienzos: la creación del universo, la humanidad y el pueblo de Israel.", author: "Moisés", historicalContext: "Escrito durante el éxodo de Israel en el desierto (aprox. 1440-1400 a.C.).", bookOrder: 1, chaptersCount: 50, iconType: "globe" },
  { slug: "exodo", name: "Éxodo", testament: "OT", category: "Pentateuco", description: "La liberación de Israel de Egipto y la entrega de la Ley en el monte Sinaí.", author: "Moisés", historicalContext: "Relata los acontecimientos de la salida de Egipto hacia la tierra prometida.", bookOrder: 2, chaptersCount: 40, iconType: "waves" },
  { slug: "levitico", name: "Levítico", testament: "OT", category: "Pentateuco", description: "Leyes sobre la santidad, sacrificios, sacerdocio y fiestas de Israel.", author: "Moisés", historicalContext: "Instrucciones dadas en el monte Sinaí para el culto y la vida santa.", bookOrder: 3, chaptersCount: 27, iconType: "flame" },
  { slug: "numeros", name: "Números", testament: "OT", category: "Pentateuco", description: "El peregrinaje de 40 años de los israelitas por el desierto.", author: "Moisés", historicalContext: "Acontecimientos en el desierto entre Sinaí y los campos de Moab.", bookOrder: 4, chaptersCount: 36, iconType: "scroll" },
  { slug: "deuteronomio", name: "Deuteronomio", testament: "OT", category: "Pentateuco", description: "Discursos de Moisés renovando el pacto antes de entrar a Canaán.", author: "Moisés", historicalContext: "Pronunciado en las llanuras de Moab justo antes de la muerte de Moisés.", bookOrder: 5, chaptersCount: 34, iconType: "book" },

  // Históricos
  { slug: "josue", name: "Josué", testament: "OT", category: "Históricos", description: "La conquista y repartición de la Tierra Prometida bajo el liderazgo de Josué.", author: "Josué (tradicional)", historicalContext: "Periodo de asentamiento israelita en Canaán (aprox. 1400-1370 a.C.).", bookOrder: 6, chaptersCount: 24, iconType: "sword" },
  { slug: "jueces", name: "Jueces", testament: "OT", category: "Históricos", description: "Historia de Israel durante el periodo de los líderes y libertadores regionales.", author: "Samuel (tradicional)", historicalContext: "Época sin rey en Israel marcada por ciclos de desobediencia y liberación.", bookOrder: 7, chaptersCount: 21, iconType: "shield" },
  { slug: "rut", name: "Rut", testament: "OT", category: "Históricos", description: "Historia de fidelidad, amor y redención en los días de los jueces.", author: "Samuel (tradicional)", historicalContext: "Ambientado en los días de los jueces en Belén de Judá.", bookOrder: 8, chaptersCount: 4, iconType: "heart" },
  { slug: "1-samuel", name: "1 Samuel", testament: "OT", category: "Históricos", description: "Transición del periodo de los jueces a la monarquía con Saúl y David.", author: "Samuel, Gad y Natán", historicalContext: "Establecimiento del reino unificado de Israel (aprox. 1050-1010 a.C.).", bookOrder: 9, chaptersCount: 31, iconType: "crown" },
  { slug: "2-samuel", name: "2 Samuel", testament: "OT", category: "Históricos", description: "El reinado del rey David, sus grandes victorias y sus pruebas personales.", author: "Gad y Natán", historicalContext: "Reinado de David en Hebrón y Jerusalén (1010-970 a.C.).", bookOrder: 10, chaptersCount: 24, iconType: "crown" },
  { slug: "1-reyes", name: "1 Reyes", testament: "OT", category: "Históricos", description: "El reino de Salomón, la construcción del Templo y la división del reino.", author: "Jeremías (tradicional)", historicalContext: "Apogeo del reino unido y posterior división en Israel y Judá.", bookOrder: 11, chaptersCount: 22, iconType: "crown" },
  { slug: "2-reyes", name: "2 Reyes", testament: "OT", category: "Históricos", description: "La decadencia de los reinos divididos y los cautiverios asirio y babilónico.", author: "Jeremías (tradicional)", historicalContext: "Caída de Samaria (722 a.C.) y Jerusalén (586 a.C.).", bookOrder: 12, chaptersCount: 25, iconType: "crown" },
  { slug: "1-cronicas", name: "1 Crónicas", testament: "OT", category: "Históricos", description: "Genealogías e historia detallada del reinado de David enfocado en el templo.", author: "Esdras (tradicional)", historicalContext: "Escrito después del exilio para infundir esperanza al remanente.", bookOrder: 13, chaptersCount: 29, iconType: "scroll" },
  { slug: "2-cronicas", name: "2 Crónicas", testament: "OT", category: "Históricos", description: "Historia del reino de Judá desde Salomón hasta el decreto de Ciro.", author: "Esdras (tradicional)", historicalContext: "Reseña de los reyes temerosos de Dios y las reformas espirituales.", bookOrder: 14, chaptersCount: 36, iconType: "scroll" },
  { slug: "esdras", name: "Esdras", testament: "OT", category: "Históricos", description: "El regreso de los exiliados babilónicos y la reconstrucción del Templo.", author: "Esdras", historicalContext: "Periodo persa tras el edicto de Ciro el Grande (538 a.C.).", bookOrder: 15, chaptersCount: 10, iconType: "scroll" },
  { slug: "nehemias", name: "Nehemías", testament: "OT", category: "Históricos", description: "La reconstrucción de los muros de Jerusalén y la renovación espiritual.", author: "Nehemías", historicalContext: "Gobernador enviado por el rey Artajerjes de Persia (445 a.C.).", bookOrder: 16, chaptersCount: 13, iconType: "shield" },
  { slug: "ester", name: "Ester", testament: "OT", category: "Históricos", description: "Dios preserva providencialmente a su pueblo en el imperio persa.", author: "Desconocido (Mardoqueo)", historicalContext: "Reinado de Asuero (Jerjes I) en Susa, Persia.", bookOrder: 17, chaptersCount: 10, iconType: "crown" },

  // Poéticos
  { slug: "job", name: "Job", testament: "OT", category: "Poéticos", description: "El misterio del sufrimiento de los justos y la soberanía inescrutable de Dios.", author: "Desconocido", historicalContext: "Época patriarcal en la tierra de Uz.", bookOrder: 18, chaptersCount: 42, iconType: "sun" },
  { slug: "salmos", name: "Salmos", testament: "OT", category: "Poéticos", description: "Colección de himnos, alabanzas, oraciones y poemas espirituales.", author: "David, Asaf, Hijos de Coré y otros", historicalContext: "Escritos a lo largo de varios siglos de adoración israelita.", bookOrder: 19, chaptersCount: 150, iconType: "harp" },
  { slug: "proverbios", name: "Proverbios", testament: "OT", category: "Poéticos", description: "Sabiduría práctica para la vida diaria fundada en el temor de Dios.", author: "Salomón y sabios de Israel", historicalContext: "Colección de máximas de conducta para reyes y ciudadanos.", bookOrder: 20, chaptersCount: 31, iconType: "star" },
  { slug: "eclesiastes", name: "Eclesiastés", testament: "OT", category: "Poéticos", description: "Reflexión sobre el sentido de la vida humana y la vanidad sin Dios.", author: "Salomón (El Predicador)", historicalContext: "Meditación madura sobre los afanes terrenales.", bookOrder: 21, chaptersCount: 12, iconType: "sun" },
  { slug: "cantares", name: "Cantares", testament: "OT", category: "Poéticos", description: "Un canto lírico que celebra el amor matrimonial puro e inspirador.", author: "Salomón", historicalContext: "Poesía de amor del antiguo Oriente Próximo.", bookOrder: 22, chaptersCount: 8, iconType: "heart" },

  // Profetas Mayores
  { slug: "isaias", name: "Isaías", testament: "OT", category: "Profetas Mayores", description: "Profecías del juicio divino, la restauración y la llegada del Mesías Sufriente.", author: "Isaías", historicalContext: "Ministerio en Jerusalén bajo Uzías, Jotán, Acaz y Ezequías.", bookOrder: 23, chaptersCount: 66, iconType: "flame" },
  { slug: "jeremias", name: "Jeremías", testament: "OT", category: "Profetas Mayores", description: "Llamado al arrepentimiento antes del cautiverio babilónico y la promesa del Nuevo Pacto.", author: "Jeremías", historicalContext: "Últimos años del reino de Judá y la destrucción de Jerusalén.", bookOrder: 24, chaptersCount: 52, iconType: "flame" },
  { slug: "lamentaciones", name: "Lamentaciones", testament: "OT", category: "Profetas Mayores", description: "Elegías sobre la caída y ruina de la amada ciudad de Jerusalén.", author: "Jeremías", historicalContext: "Escrito tras el saqueo de Jerusalén en 586 a.C.", bookOrder: 25, chaptersCount: 5, iconType: "scroll" },
  { slug: "ezequiel", name: "Ezequiel", testament: "OT", category: "Profetas Mayores", description: "Visiones de la gloria divina, el templo restaurado y el aliento de los huesos secos.", author: "Ezequiel", historicalContext: "Profeta entre los exiliados a orillas del río Quebar en Babilonia.", bookOrder: 26, chaptersCount: 48, iconType: "star" },
  { slug: "daniel", name: "Daniel", testament: "OT", category: "Profetas Mayores", description: "Historias de fe inquebrantable en Babilonia y visiones de los reinos del mundo.", author: "Daniel", historicalContext: "Corte real de Babilonia y Persia desde Nabucodonosor hasta Ciro.", bookOrder: 27, chaptersCount: 12, iconType: "shield" },

  // Profetas Menores
  { slug: "oseas", name: "Oseas", testament: "OT", category: "Profetas Menores", description: "El amor incondicional de Dios hacia un pueblo espiritualmente infiel.", author: "Oseas", historicalContext: "Reino del Norte (Israel) antes de su caída ante Asiria.", bookOrder: 28, chaptersCount: 14, iconType: "heart" },
  { slug: "joel", name: "Joel", testament: "OT", category: "Profetas Menores", description: "El Día del Señor, el derramamiento del Espíritu y laplaga de langostas.", author: "Joel", historicalContext: "Llamamiento urgente al ayuno y oración sincera en Judá.", bookOrder: 29, chaptersCount: 3, iconType: "flame" },
  { slug: "amos", name: "Amós", testament: "OT", category: "Profetas Menores", description: "Denuncia de la injusticia social y la hipocresía religiosa.", author: "Amós", historicalContext: "Pastor de Tecoa que profetizó en el próspero Reino del Norte.", bookOrder: 30, chaptersCount: 9, iconType: "shield" },
  { slug: "abdias", name: "Abdías", testament: "OT", category: "Profetas Menores", description: "Juicio profético contra Edom por su orgullo y maltrato a su hermano Jacob.", author: "Abdías", historicalContext: "El profeta más breve del Antiguo Testamento.", bookOrder: 31, chaptersCount: 1, iconType: "sword" },
  { slug: "jonas", name: "Jonás", testament: "OT", category: "Profetas Menores", description: "El profeta rebelde enviado a anunciar la misericordia divina a Nínive.", author: "Jonás", historicalContext: "Reinado de Jeroboam II en Israel.", bookOrder: 32, chaptersCount: 4, iconType: "waves" },
  { slug: "miqueas", name: "Miqueas", testament: "OT", category: "Profetas Menores", description: "Exigencia de justicia y humildad, y profecía del nacimiento del Mesías en Belén.", author: "Miqueas", historicalContext: "Contemporáneo de Isaías en la región rural de Judá.", bookOrder: 33, chaptersCount: 7, iconType: "star" },
  { slug: "nahum", name: "Nahúm", testament: "OT", category: "Profetas Menores", description: "Profecía del juicio definitivo sobre la crueldad de la capital asiria, Nínive.", author: "Nahúm", historicalContext: "Caída de la capital asiria entre 663 y 612 a.C.", bookOrder: 34, chaptersCount: 3, iconType: "sword" },
  { slug: "habacuc", name: "Habacuc", testament: "OT", category: "Profetas Menores", description: "El diálogo de un profeta con Dios sobre el problema del mal: El justo por su fe vivirá.", author: "Habacuc", historicalContext: "Vísperas de la invasión babilónica en Judá.", bookOrder: 35, chaptersCount: 3, iconType: "harp" },
  { slug: "sofanias", name: "Sofonías", testament: "OT", category: "Profetas Menores", description: "Advertencia sobre el Día del Señor y la promesa de un remanente humilde.", author: "Sofonías", historicalContext: "Reinado del rey Josías en Judá.", bookOrder: 36, chaptersCount: 3, iconType: "flame" },
  { slug: "hageo", name: "Hageo", testament: "OT", category: "Profetas Menores", description: "Exhortación a los exiliados retornados para dar prioridad a la reconstrucción del Templo.", author: "Hageo", historicalContext: "Segundo año de Darío rey de Persia (520 a.C.).", bookOrder: 37, chaptersCount: 2, iconType: "book" },
  { slug: "zacarias", name: "Zacarías", testament: "OT", category: "Profetas Menores", description: "Visiones mesiánicas de consuelo y esperanza para la restauración de Jerusalén.", author: "Zacarías", historicalContext: "Contemporáneo de Hageo tras el regreso de Babilonia.", bookOrder: 38, chaptersCount: 14, iconType: "star" },
  { slug: "malaquias", name: "Malaquías", testament: "OT", category: "Profetas Menores", description: "El último profeta del Antiguo Testamento anunciando la venida del mensajero del pacto.", author: "Malaquías", historicalContext: "Época de Nehemías (aprox. 430 a.C.).", bookOrder: 39, chaptersCount: 4, iconType: "sun" },

  // Nuevo Testamento (27 libros)
  // Evangelios
  { slug: "mateo", name: "Mateo", testament: "NT", category: "Evangelios", description: "El Evangelio del Rey Mesías que cumple las profecías del Antiguo Testamento.", author: "Mateo (Leví)", historicalContext: "Escrito para una audiencia judía-cristiana del siglo I.", bookOrder: 40, chaptersCount: 28, iconType: "scroll" },
  { slug: "marcos", name: "Marcos", testament: "NT", category: "Evangelios", description: "El Evangelio de acción rápida que presenta a Jesús como el Siervo de Dios.", author: "Juan Marcos", historicalContext: "Escrito principalmente para creyentes de Roma.", bookOrder: 41, chaptersCount: 16, iconType: "book" },
  { slug: "lucas", name: "Lucas", testament: "NT", category: "Evangelios", description: "Relato ordenado e histórico de Jesús como el Hijo del Hombre y Salvador de todos.", author: "Lucas (el médico amado)", historicalContext: "Dirigido al excelentísimo Teófilo con investigación minuciosa.", bookOrder: 42, chaptersCount: 24, iconType: "book" },
  { slug: "juan", name: "Juan", testament: "NT", category: "Evangelios", description: "El Evangelio espiritual que revela a Jesús como el Verbo encarnado e Hijo de Dios.", author: "Juan el Apóstol", historicalContext: "Escrito desde Éfeso a finales del siglo I.", bookOrder: 43, chaptersCount: 21, iconType: "star" },

  // Hechos
  { slug: "hechos", name: "Hechos", testament: "NT", category: "Hechos", description: "El nacimiento de la Iglesia y la expansión del Evangelio por el poder del Espíritu Santo.", author: "Lucas", historicalContext: "Abarca desde la Ascensión de Cristo hasta el encarcelamiento de Pablo en Roma.", bookOrder: 44, chaptersCount: 28, iconType: "flame" },

  // Cartas
  { slug: "romanos", name: "Romanos", testament: "NT", category: "Cartas", description: "La gran exposición de la salvación por gracia mediante la fe en Jesucristo.", author: "Pablo", historicalContext: "Carta escrita desde Corinto antes de viajar a Jerusalén.", bookOrder: 45, chaptersCount: 16, iconType: "scroll" },
  { slug: "1-corintios", name: "1 Corintios", testament: "NT", category: "Cartas", description: "Instrucciones sobre la unidad, la pureza moral, los dones espirituales y el amor.", author: "Pablo", historicalContext: "Respuesta a los problemas reportados en la iglesia de Corinto.", bookOrder: 46, chaptersCount: 16, iconType: "heart" },
  { slug: "2-corintios", name: "2 Corintios", testament: "NT", category: "Cartas", description: "La defensa de la autoridad apostólica y el poder manifestado en la debilidad.", author: "Pablo", historicalContext: "Escrita desde Macedonia para reconciliarse con la congregación.", bookOrder: 47, chaptersCount: 13, iconType: "scroll" },
  { slug: "galatas", name: "Gálatas", testament: "NT", category: "Cartas", description: "La carta de la libertad en Cristo frente al legalismo de la Ley.", author: "Pablo", historicalContext: "Dirigida a las iglesias de Galacia acechadas por judaizantes.", bookOrder: 48, chaptersCount: 6, iconType: "shield" },
  { slug: "efesios", name: "Efesios", testament: "NT", category: "Cartas", description: "El glorioso diseño de la Iglesia como el cuerpo celestial de Cristo.", author: "Pablo", historicalContext: "Epístola de la prisión escrita desde Roma.", bookOrder: 49, chaptersCount: 6, iconType: "star" },
  { slug: "filipenses", name: "Filipenses", testament: "NT", category: "Cartas", description: "La epístola del gozo inalterable y la actitud de siervo de Cristo.", author: "Pablo", historicalContext: "Escrita con gozo desde las cadenas en Roma.", bookOrder: 50, chaptersCount: 4, iconType: "heart" },
  { slug: "colosenses", name: "Colosenses", testament: "NT", category: "Cartas", description: "La suprema preeminencia y suficiencia absoluta de Jesucristo.", author: "Pablo", historicalContext: "Escrita para combatir filosofías gnósticas tempranas.", bookOrder: 51, chaptersCount: 4, iconType: "crown" },
  { slug: "1-tesalonicenses", name: "1 Tesalonicenses", testament: "NT", category: "Cartas", description: "Ánimo para una iglesia joven y la bendita esperanza del regreso de Cristo.", author: "Pablo", historicalContext: "Una de las cartas más tempranas de Pablo desde Corinto.", bookOrder: 52, chaptersCount: 5, iconType: "sun" },
  { slug: "2-tesalonicenses", name: "2 Tesalonicenses", testament: "NT", category: "Cartas", description: "Aclaraciones sobre el Día del Señor y la perseverancia constante.", author: "Pablo", historicalContext: "Escrita poco después de la primera carta.", bookOrder: 53, chaptersCount: 3, iconType: "sun" },
  { slug: "1-timoteo", name: "1 Timoteo", testament: "NT", category: "Cartas", description: "Instrucciones pastorales sobre la doctrina pura y el orden en la casa de Dios.", author: "Pablo", historicalContext: "Dirigida a Timoteo mientras lideraba la iglesia en Éfeso.", bookOrder: 54, chaptersCount: 6, iconType: "book" },
  { slug: "2-timoteo", name: "2 Timoteo", testament: "NT", category: "Cartas", description: "Última carta de Pablo encomendando a Timoteo a predicar fielmente la Palabra.", author: "Pablo", historicalContext: "Escrita desde un calabozos romano antes de su martirio.", bookOrder: 55, chaptersCount: 4, iconType: "flame" },
  { slug: "tito", name: "Tito", testament: "NT", category: "Cartas", description: "Liderazgo piadoso y buenas obras en la isla de Creta.", author: "Pablo", historicalContext: "Instrucciones para organizar las iglesias cretenses.", bookOrder: 56, chaptersCount: 3, iconType: "shield" },
  { slug: "filemon", name: "Filemón", testament: "NT", category: "Cartas", description: "Una conmovedora petición de perdón y fraternidad para el esclavo Onésimo.", author: "Pablo", historicalContext: "Carta personal a Filemón de Colosas.", bookOrder: 57, chaptersCount: 1, iconType: "heart" },
  { slug: "hebreos", name: "Hebreos", testament: "NT", category: "Cartas", description: "Jesús como el Gran Sumo Sacerdote de un Pacto Superior.", author: "Desconocido (Atribuido tradicionalmente a Pablo)", historicalContext: "Dirigida a judíos cristianos tentados a volver al judaísmo.", bookOrder: 58, chaptersCount: 13, iconType: "crown" },
  { slug: "santiago", name: "Santiago", testament: "NT", category: "Cartas", description: "La fe viva demostrada a través de las obras y la sabiduría pacífica.", author: "Santiago (hermano del Señor)", historicalContext: "Escrita a las doce tribus dispersas en el mundo grecorromano.", bookOrder: 59, chaptersCount: 5, iconType: "star" },
  { slug: "1-pedro", name: "1 Pedro", testament: "NT", category: "Cartas", description: "Esperanza viva y victoria para los creyentes que sufren persecución.", author: "Pedro", historicalContext: "Dirigida a los peregrinos de la dispersión en Asia Menor.", bookOrder: 60, chaptersCount: 5, iconType: "shield" },
  { slug: "2-pedro", name: "2 Pedro", testament: "NT", category: "Cartas", description: "Advertencia contra los falsos maestros y crecimiento en la gracia de Dios.", author: "Pedro", historicalContext: "Último testimonio del apóstol Pedro antes de su muerte.", bookOrder: 61, chaptersCount: 3, iconType: "sun" },
  { slug: "1-juan", name: "1 Juan", testament: "NT", category: "Cartas", description: "Certeza de la vida eterna, el amor fraterno y andar en la luz de Dios.", author: "Juan", historicalContext: "Escrita a la red de iglesias de Asia Menor.", bookOrder: 62, chaptersCount: 5, iconType: "heart" },
  { slug: "2-juan", name: "2 Juan", testament: "NT", category: "Cartas", description: "Exhortación a andar en la verdad y alejarse del engaño.", author: "Juan", historicalContext: "Dirigida a la señora elegida y sus hijos.", bookOrder: 63, chaptersCount: 1, iconType: "star" },
  { slug: "3-juan", name: "3 Juan", testament: "NT", category: "Cartas", description: "Alabanza a Gayo por su hospitalidad y firmeza en la verdad.", author: "Juan", historicalContext: "Carta personal sobre el amor y el servicio cristiano.", bookOrder: 64, chaptersCount: 1, iconType: "heart" },
  { slug: "judas", name: "Judas", testament: "NT", category: "Cartas", description: "Un llamado ardiente a contender ardientemente por la fe dada a los santos.", author: "Judas (hermano de Santiago)", historicalContext: "Advertencia contra falsos creyentes licenciosos.", bookOrder: 65, chaptersCount: 1, iconType: "sword" },

  // Apocalipsis
  { slug: "apocalipsis", name: "Apocalipsis", testament: "NT", category: "Apocalipsis", description: "La revelación victoriosa de Jesucristo, la derrota final del mal y el Rey Eterno.", author: "Juan el Apóstol", historicalContext: "Escrito en la isla de Patmos durante el reinado de Domiciano.", bookOrder: 66, chaptersCount: 22, iconType: "crown" },
];

export const STORIES_DATA: StorySeed[] = [
  {
    slug: "david-y-goliat",
    title: "David y Goliat",
    subtitle: "El joven pastor frente al gigante filisteo",
    description: "Un joven pastor con una honda y una fe inquebrantable desafía al guerrero más temido de toda la antigüedad.",
    bookSlug: "1-samuel",
    chapterReference: "1 Samuel 17",
    readingTimeMinutes: 15,
    category: "Destacado del Día",
    emotionalTheme: "Valentía",
    featured: true,
    imageUrl: "/images/david-goliath.jpg",
    narrativeContent: `
En el árido valle de Elah, los ejércitos de Israel y los filisteos se encontraban frente a frente, separados únicamente por una profunda quebrada. La tensión en el aire era insoportable. Durante cuarenta días, mañana y tarde, un gigante de tres metros de altura llamado Goliat salía de las filas filisteas cubierto con una reluciente armadura de bronce, vociferando insultos contra el Dios viviente y desafiando a cualquier israelita a un duelo a muerte.

El rey Saúl y todos los soldados de Israel estaban aterrorizados. Nadie se atrevía a cruzar el valle. Fue en medio de este ambiente de desesperanza que llegó al campamento David, el hijo menor de Isaí, un humilde pastor de Belén que traía provisiones de pan y queso para sus tres hermanos mayores que servían en el ejército.

Al escuchar las blasfemias del gigante filisteo y ver el pánico de sus compatriotas, el corazón de David se encendió de santo celo. —¿Quién es este filisteo incircunciso para que desafíe a los escuadrones del Dios viviente? —preguntó indignado a los soldados.

A pesar de las burlas de sus hermanos y la vacilación del rey Saúl, David se presentó ante el monarca. Cuando Saúl le dijo que era solo un muchacho frente a un guerrero experimentado, David le contó cómo, cuidando las ovejas de su padre, había luchado contra leones y osos y los había vencido con la ayuda de Dios. —El mismo Señor que me libró de las garras del león y del oso me librará de la mano de este filisteo —afirmó David con absoluta convicción.

Saúl intentó vestir a David con su propia armadura real, pero era demasiado pesada e incómoda para el joven pastor. David se la quitó, tomó su cayado de pastor, seleccionó cinco piedras lisas de un arroyo cercano y las guardó en su zurrón de cuero. Tomando únicamente su honda en la mano, caminó decididamente hacia el gigante.

Goliat, al ver acercarse a un muchacho rubio y sin armadura, lo despreció profundamente y maldijo a David por sus dioses, diciendo: —¿Soy yo acaso un perro para que vengas a mí con palos? ¡Ven y daré tu carne a las aves del cielo!

David no retrocedió. Miró fijamente al gigante y respondió con voz firme que resonó en todo el valle: —Tú vienes a mí con espada, lanza y jabalina; pero yo vengo a ti en el nombre del Señor de los ejércitos, el Dios de los escuadrones de Israel, a quien tú has desafiado. Hoy mismo el Señor te entregará en mis manos, para que toda la tierra sepa que hay Dios en Israel.

Cuando el gigante avanzó para atacarlo, David corrió rápidamente hacia la línea de batalla. Sacó una piedra de su bolsa, la colocó en la honda, la giró con velocidad y la lanzó con precisión mortal. La piedra voló por el aire y se incrustó directamente en la frente de Goliat. El gigante vaciló y cayó de cara en tierra. David corrió, tomó la espada del propio gigante y culminó la victoria. Al ver caído a su campeón, los filisteos huyeron aterrorizados y el ejército de Israel prorrumpió en gritos de victoria.
    `,
    literalContent: `
Texto Bíblico Literal (1 Samuel 17:45-47, RVR1909 - Dominio Público):

"Entonces dijo David al filisteo: Tú vienes a mí con espada y lanza y escudo; mas yo vengo a ti en el nombre de Jehová de los ejércitos, el Dios de los escuadrones de Israel, que tú has provocado.

Jehová te entregará hoy en mi mano, y yo te venceré, y te quitaré la cabeza, y daré hoy los cuerpos de los filisteos a las aves del cielo y a las bestias de la tierra; y sabrá toda la tierra que hay Dios en Israel.

Y sabrá toda esta congregación que Jehová no salva con espada ni con lanza; porque de Jehová es la batalla, y él os entregará en nuestras manos."
    `,
    scenes: [
      {
        scene: 1,
        title: "El desafío en el valle de Elah",
        image: "/images/david-goliath.jpg",
        narrative: "Durante cuarenta días, el gigante Goliat resonaba sus burlas frente al ejército de Israel en el valle de Elah.",
        quote: "1 Samuel 17:10 - Y añadió el filisteo: Hoy yo he desafiado el campamento de Israel; dadme un hombre que pelee conmigo."
      },
      {
        scene: 2,
        title: "El joven pastor en el campamento",
        image: "/images/david-goliath.jpg",
        narrative: "David llega trayendo alimentos para sus hermanos y escucha las provocaciones contra el Dios viviente.",
        quote: "1 Samuel 17:26 - ¿Quién es este filisteo incircunciso, para que provoque a los escuadrones del Dios viviente?"
      },
      {
        scene: 3,
        title: "Fe sobre la armadura de Saúl",
        image: "/images/david-goliath.jpg",
        narrative: "David rechaza la pesada armadura del rey y decide confiar en la protección divina y sus herramientas de pastor.",
        quote: "1 Samuel 17:37 - Jehová, que me ha librado de las garras del león y del oso, él también me librará de la mano de este filisteo."
      },
      {
        scene: 4,
        title: "Las cinco piedras del arroyo",
        image: "/images/david-goliath.jpg",
        narrative: "David recolecta cinco piedras lisas del arroyo y toma su honda para enfrentar al coloso.",
        quote: "1 Samuel 17:40 - Y tomó su cayado en su mano, y escogió cinco piedras lisas del arroyo, y las puso en el saco pastoril."
      },
      {
        scene: 5,
        title: "La victoria de la fe",
        image: "/images/david-goliath.jpg",
        narrative: "Con una sola piedra y la bendición del Señor, David derriba al gigante y libra al pueblo de Israel.",
        quote: "1 Samuel 17:50 - Así venció David al filisteo con honda y piedra; e hirió al filisteo y lo mató, sin tener David espada en su mano."
      }
    ]
  },
  {
    slug: "la-creacion",
    title: "La Creación",
    subtitle: "El origen del universo y la humanidad",
    description: "En el principio, Dios creó los cielos y la tierra con la sola fuerza de su voz majestuosa.",
    bookSlug: "genesis",
    chapterReference: "Génesis 1",
    readingTimeMinutes: 8,
    category: "Historias Populares",
    emotionalTheme: "Gratitud",
    featured: false,
    imageUrl: "/images/creation.jpg",
    narrativeContent: `
En el principio, antes de que existiera el tiempo, las estrellas o las galaxias, la tierra estaba desordenada y vacía, y las tinieblas cubrían la faz del abismo. Pero el Espíritu de Dios se movía sobre la faz de las aguas.

Entonces Dios dijo: "Sea la luz", y la luz apareció disipando la oscuridad eterna. Dios vio que la luz era buena y separó la luz de las tinieblas, llamando a la luz "Día" y a la oscuridad "Noche". Así fue el primer día.

En el segundo día, Dios creó el firmamento, expandiendo la bóveda celeste para separar las aguas superiores de las inferiores. En el tercer día, por mandato divino, las aguas bajo los cielos se reunieron en mares y emergió la tierra seca. Inmediatamente, la tierra comenzó a brotar vegetación verde, hierbas con semilla y árboles frutales de toda especie.

En el cuarto día, Dios colocó en el firmamento las dos grandes lumbreras: el sol para gobernar el día y la luna con las brillantes estrellas para iluminar la noche y señalar las estaciones, días y años. En el quinto día, los mares se poblaron de gigantescas criaturas marinas y cardúmenes de peces, mientras los cielos se llenaron de aves de hermosos plumajes.

El sexto día fue el punto culminante de la creación. Dios hizo los animales terrestres, los ganados y los reptiles según su especie. Y finalmente dijo: "Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza". Dios formó al ser humano y le infundió aliento de vida, encomendándole cuidar de toda la creación con sabiduría y amor. Dios contempló todo lo que había hecho, y vio que era bueno en gran manera. En el séptimo día, Dios descansó de su obra maestra.
    `,
    literalContent: `
Texto Bíblico Literal (Génesis 1:1-3, RVR1909):

"En el principio crió Dios los cielos y la tierra. Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas. Y dijo Dios: Sea la luz; y fue la luz."
    `,
    scenes: [
      {
        scene: 1,
        title: "Sea la luz",
        image: "/images/creation.jpg",
        narrative: "Dios habla en la oscuridad absoluta y la luz resplandece por primera vez.",
        quote: "Génesis 1:3 - Y dijo Dios: Sea la luz; y fue la luz."
      },
      {
        scene: 2,
        title: "Cielos, mares y tierra verde",
        image: "/images/creation.jpg",
        narrative: "Emergen los continentes y las plantas comienzan a florecer en la tierra.",
        quote: "Génesis 1:11 - Produzca la tierra hierba verde, hierba que dé semilla."
      },
      {
        scene: 3,
        title: "La vida humana a imagen de Dios",
        image: "/images/creation.jpg",
        narrative: "Dios crea a la humanidad para reflejar su amor y administrar la tierra.",
        quote: "Génesis 1:27 - Y crió Dios al hombre a su imagen, a imagen de Dios lo crió; varón y hembra los crió."
      }
    ]
  },
  {
    slug: "daniel-en-el-foso-de-los-leones",
    title: "Daniel en el foso de los leones",
    subtitle: "Integridad y fe inquebrantable en Babilonia",
    description: "La envidia de los sátrapas persas lleva a Daniel al foso de los feroces leones, pero el ángel de Dios cierra la boca de las bestias.",
    bookSlug: "daniel",
    chapterReference: "Daniel 6",
    readingTimeMinutes: 10,
    category: "Historias Populares",
    emotionalTheme: "Fe",
    featured: false,
    imageUrl: "/images/daniel-lions.jpg",
    narrativeContent: `
Durante el reinado de Darío el Medo, el anciano profeta Daniel se distinguía entre todos los gobernadores y sátrapas del imperio persa por su espíritu superior, rectitud e intachable sabiduría. El rey consideraba nombrarlo sobre todo el reino, lo que desató la envidia furiosa de los demás funcionarios.

Buscando una forma de arruinarlo, los sátrapas investigaron la conducta de Daniel, pero no hallaron falta alguna ni corrupción. Conscientes de su fidelidad religiosa, convencieron astutamente al rey Darío para que firmara un edicto irrevocable: durante treinta días, cualquiera que hiciera una petición o oración a cualquier dios u hombre fuera del rey, sería arrojado al foso de los leones.

Cuando Daniel supo que el edicto había sido firmado, entró en su casa, abrió las ventanas de su cámara alta que daban hacia Jerusalén, y como era su costumbre tres veces al día, se arrodilló para orar y dar gracias a su Dios. Los conspiradores lo sorprendieron orando y de inmediato lo denunciaron ante el rey.

Al darse cuenta del engaño, el rey Darío intentó por todos los medios salvar a Daniel, pero las leyes de los medos y persas eran inmutables. Con gran pesar en su corazón, el rey ordenó traer a Daniel y arrojarlo al foso profundo donde rugían feroces leones hambrientos. El rey le dijo: —El Dios tuyo, a quien tú continuamente sirves, él te libre. Una gran piedra fue colocada sobre la boca del foso y sellada con el anillo real.

Esa noche, el rey Darío no pudo comer ni dormir. Al rayar el alba, corrió apresuradamente al foso de los leones y gritó con voz atribulada: —¡Daniel, siervo del Dios viviente! ¿Te ha podido librar tu Dios?

Para su inmensa alegría, la voz clara de Daniel resonó desde las profundidades: —¡Oh rey, vive para siempre! Mi Dios envió su ángel, el cual cerró la boca de los leones para que no me hiciesen daño, porque ante él fui hallado inocente. El rey ordenó sacar a Daniel de inmediato, y se comprobó que ni un solo rasguño había en su cuerpo, porque había confiado en su Dios.
    `,
    literalContent: `
Texto Bíblico Literal (Daniel 6:21-22, RVR1909):

"Entonces Daniel habló con el rey: Oh rey, para siempre vive. El Dios mío envió su ángel, el cual cerró la boca de los leones, para que no me hiciesen daño; porque delante de él fui hallado inocente; y aun delante de ti, oh rey, no he hecho cero daño."
    `,
    scenes: [
      {
        scene: 1,
        title: "La trampa de los envidiosos",
        image: "/images/daniel-lions.jpg",
        narrative: "Los funcionarios persas manipulan al rey para prohibir la oración durante 30 días.",
        quote: "Daniel 6:7 - Cualquiera que pida petición de cualquier dios u hombre en espacio de treinta días, sino de ti, oh rey, sea echado en el foso de los leones."
      },
      {
        scene: 2,
        title: "Oración continua en las ventanas de Jerusalén",
        image: "/images/daniel-lions.jpg",
        narrative: "Daniel no esconde su fe y continúa orando a Dios tres veces al día.",
        quote: "Daniel 6:10 - Daniel... hincábase de rodillas tres veces al día, y oraba y confesaba delante de su Dios."
      },
      {
        scene: 3,
        title: "Arrojado al foso nocturno",
        image: "/images/daniel-lions.jpg",
        narrative: "Daniel es descendido al foso con las fieras bajo el sello real persa.",
        quote: "Daniel 6:16 - Trajeron a Daniel, y le echaron en el foso de los leones."
      },
      {
        scene: 4,
        title: "El ángel divino silencia las garras",
        image: "/images/daniel-lions.jpg",
        narrative: "Un ángel enviado del cielo acuna y amansa a los leones en la oscuridad.",
        quote: "Daniel 6:22 - Mi Dios envió su ángel, el cual cerró la boca de los leones."
      }
    ]
  },
  {
    slug: "moises-y-el-mar-rojo",
    title: "Moisés y el Mar Rojo",
    subtitle: "El milagro que libertó a Israel del imperio faraónico",
    description: "Acorralados entre el ejército egipcio y el agua profunda, Israel presencia el poder del Señor dividiendo las olas.",
    bookSlug: "exodo",
    chapterReference: "Éxodo 14",
    readingTimeMinutes: 12,
    category: "Milagros de Jesús",
    emotionalTheme: "Esperanza",
    featured: false,
    imageUrl: "/images/moses-red-sea.jpg",
    narrativeContent: `
Tras diez plagas devastadoras, el faraón de Egipto permitió finalmente que el pueblo de Israel saliera de la esclavitud. Cerca de dos millones de personas, junto con sus rebaños, iniciaron la marcha hacia la Libertad guiados por Moisés. Dios los conducía de día con una columna de nube y de noche con una columna de fuego.

Sin embargo, poco después, el faraón cambió de opinión. Arrepentido de haber dejado ir a su fuerza laboral, movilizó a todo su ejército imperial: seiscientos carros de guerra escogidos y miles de jinetes persiguieron al pueblo hasta acorralarlos en las playas de Pi-hahirot, con el rugiente Mar Rojo al frente y el ejército carroñero a sus espaldas.

Al ver aproximarse las nubes de polvo de la caballería egipcia, el pánico se apoderó de los israelitas. Clamaron a Moisés con angustia: —¿No había sepulcros en Egipto, que nos has sacado para morir en el desierto?

Moisés, manteniendo una calma sobrehumana fundada en la fe, respondió con voz potente: —No temáis; estad firmes y ved la salvación que el Señor hará hoy con vosotros; porque los egipcios que hoy habéis visto, nunca más para siempre los veréis. El Señor peleará por vosotros, y vosotros estaréis tranquilos.

Entonces el Señor le dijo a Moisés: —¿Por qué clamas a mí? Di a los hijos de Israel que marchen. Y tú, alza tu vara y extiende tu mano sobre el mar, y divídelo.

Moisés extendió su vara sobre las aguas. Inmediatamente, un recio viento del oriente sopló durante toda la noche, dividiendo las aguas como enormes murallas líquidas a la derecha y a la izquierda, dejando el lecho del mar completamente seco. Los hijos de Israel caminaron por en medio del mar sobre tierra firme.

Los egipcios intentaron perseguirlos adentrándose en el lecho seco, pero la columna de nube sembró la confusión entre ellos y las ruedas de sus carros se atascaron. Cuando el último israelita tocó la orilla opuesta, Dios ordenó a Moisés extender nuevamente su mano. Las murallas de agua colapsaron bruscamente sobre el ejército del faraón, sepultando carros y jinetes. Aquel día Israel vio la gran mano del Señor y creyó en Él y en Moisés su siervo.
    `,
    literalContent: `
Texto Bíblico Literal (Éxodo 14:13-14, RVR1909):

"Y Moisés dijo al pueblo: No temáis; estaos quedos, y ved la salud de Jehová, que él hará hoy con vosotros; porque los Egipcios que hoy habéis visto, nunca más para siempre los veréis. Jehová peleará por vosotros, y vosotros estaréis quietos."
    `,
    scenes: [
      {
        scene: 1,
        title: "Acorralados frente a las olas",
        image: "/images/moses-red-sea.jpg",
        narrative: "El ejército egipcio se aproxima por el desierto mientras las profundidades del mar bloquean la huida.",
        quote: "Éxodo 14:10 - Los hijos de Israel alzaron sus ojos, y he aquí que los egipcios venían tras ellos."
      },
      {
        scene: 2,
        title: "El viento recio de la noche",
        image: "/images/moses-red-sea.jpg",
        narrative: "Moisés alza la vara y Dios envía un viento del oriente que abre un camino seco entre los muros de agua.",
        quote: "Éxodo 14:21 - E hizo Jehová que el mar se retirase por medio de un recio viento oriental toda aquella noche."
      },
      {
        scene: 3,
        title: "Caminando en tierra firme",
        image: "/images/moses-red-sea.jpg",
        narrative: "Toda la multitud cruza sana y salva por el lecho del mar seco.",
        quote: "Éxodo 14:22 - Entonces los hijos de Israel entraron por medio del mar en seco."
      }
    ]
  },
  {
    slug: "noe-y-el-arca",
    title: "Noé y el Arca",
    subtitle: "Obediencia y preservación en medio del diluvio",
    description: "Frente a la corrupción humana, Noé edifica una colosal nave de madera de gofer para salvar a su familia y a las especies.",
    bookSlug: "genesis",
    chapterReference: "Génesis 6-9",
    readingTimeMinutes: 12,
    category: "Historias Populares",
    emotionalTheme: "Paciencia",
    featured: false,
    imageUrl: "/images/noah-ark.jpg",
    narrativeContent: `
En una época en que la maldad de los hombres se había multiplicado sobre la tierra y cada pensamiento del corazón humano era continuamente hacia el mal, Noé halló gracia ante los ojos del Señor. Noé era un hombre justo, honrado y temeroso de Dios entre sus contemporáneos.

Dios le advirtió que enviaría un gran diluvio de aguas sobre la tierra para limpiar el mundo de la violencia e injusticia, y le ordenó construir un Arca gigantesca de madera de gofer, de tres pisos, calafateada con brea por dentro y por fuera. Dios le dio las dimensiones exactas: trescientos codos de longitud, cincuenta de anchura y treinta de altura.

Durante años, mientras Noé construía la nave en medio de las burlas del pueblo, predicó la justicia. Cuando el Arca estuvo lista, Dios hizo venir parejas de animales limpios e inmundos, aves y reptiles de toda especie, para que entraran al refugio. Finalmente, Noé, su esposa, sus tres hijos (Sem, Cam y Jafet) y sus nueras entraron, y Dios mismo cerró la puerta por fuera.

Siete días después, las fuentes del gran abismo se rompieron y las cataratas de los cielos se abrieron. Llovió ininterrumpidamente durante cuarenta días y cuarenta noches. Las aguas subieron tanto que cubrieron todas las montañas más altas bajo los cielos. La nave flotaba con seguridad sobre las turbulentas olas.

Después de ciento cincuenta días, Dios hizo pasar un viento sobre la tierra y las aguas comenzaron a descender. El Arca reposó sobre los montes de Ararat. Noé soltó un cuervo y luego una paloma para ver si la tierra se había secado. Cuando la paloma regresó con una hoja verde de olivo en el pico, Noé supo que la vida recomenzaba. Al salir del Arca, Noé edificó un altar al Señor. Dios colocó un resplandeciente arcoíris en las nubes como señal de su pacto eterno con toda la creación.
    `,
    literalContent: `
Texto Bíblico Literal (Génesis 9:13, RVR1909):

"Mi arco pondré en las nubes, el cual será por señal del pacto entre mí y la tierra."
    `,
    scenes: [
      {
        scene: 1,
        title: "El mandato divino de madera de gofer",
        image: "/images/noah-ark.jpg",
        narrative: "Noé obedece las instrucciones exactas para construir el refugio en medio del escepticismo.",
        quote: "Génesis 6:22 - Y lo hizo así Noé; hizo conforme a todo lo que Dios le mandó."
      },
      {
        scene: 2,
        title: "La paloma y la hoja de olivo",
        image: "/images/noah-ark.jpg",
        narrative: "La paloma trae la señal de que la vegetación y la vida renacen en la tierra renovada.",
        quote: "Génesis 8:11 - Y la paloma volvió a él a la hora de la tarde; y he aquí que traía una hoja de oliva tomada en el pico."
      },
      {
        scene: 3,
        title: "El arcoíris del pacto",
        image: "/images/noah-ark.jpg",
        narrative: "Dios despliega el arcoíris brillante como promesa eterna de misericordia.",
        quote: "Génesis 9:15 - Y me acordaré del pacto mío, que hay entre mí y vosotros."
      }
    ]
  },
  {
    slug: "la-resurreccion-de-jesus",
    title: "La resurrección de Jesús",
    subtitle: "El triunfo de la vida sobre la muerte y la tumba vacía",
    description: "Al tercer día, las mujeres encuentran la piedra removida y el mensajero celestial proclama: ¡No está aquí, ha resucitado!",
    bookSlug: "juan",
    chapterReference: "Juan 20",
    readingTimeMinutes: 12,
    category: "Vida de Jesús",
    emotionalTheme: "Esperanza",
    featured: false,
    imageUrl: "/images/jesus-resurrection.jpg",
    narrativeContent: `
El primer día de la semana, muy de mañana, siendo aún oscuro, María Magdalena fue al sepulcro de piedra donde Jesús había sido sepultado tras su crucifixión. Llevaba especias aromáticas para ungir su cuerpo. Pero al llegar al huerto, vio con asombro que la enorme piedra de la entrada había sido removida.

Llana de angustia, corrió a buscar a Simón Pedro y al apóstol Juan, diciendo: —Se han llevado del sepulcro al Señor, y no sabemos dónde le han puesto.

Pedro y Juan corrieron juntos hacia el sepulcro. Juan llegó primero y, asomándose, vio los lienzos de lino caídos en el suelo. Pedro entró inmediatamente y observó los lienzos doblados y el sudario que había estado sobre la cabeza de Jesús, enrollado en un lugar aparte. Entendieron que el cuerpo no había sido robado, sino que la vida había vencido a la muerte.

María Magdalena se quedó afuera llorando junto al sepulcro. Mientras lloraba, se inclinó a mirar dentro y vio a dos ángeles vestidos de blanco, sentados donde había estado el cuerpo de Jesús. Le preguntaron: —¿Mujer, por qué lloras? Ella respondió: —Porque se han llevado a mi Señor.

Al decir esto, se volvió y vio a una persona de pie, pero no reconoció que era Jesús. Él le dijo: —Mujer, ¿por qué lloras? ¿A quién buscas? Ella, pensando que era el jardinero, le dijo: —Señor, si tú te lo has llevado, dime dónde lo has puesto, y yo lo llevaré.

Jesús le dijo simplemente una palabra con ternura infinita: —¡María!

Ella se volvió al instante y exclamó en arameo: —¡Raboni! (que significa Maestro). Jesús le encargó ir a anunciar la noticia a los discípulos. María Magdalena fue corriendo a los discípulos proclamando con gozo inefable: —¡He visto al Señor! Ese mismo domingo al anochecer, Jesús se presentó en medio de sus discípulos congregados, diciendo: —¡Paz a vosotros!
    `,
    literalContent: `
Texto Bíblico Literal (Juan 20:19-20, RVR1909):

"Y como fue la tarde de aquel día, el primero de la semana, y estando las puertas cerradas donde los discípulos estaban juntos por miedo de los Judíos, vino Jesús, y púsose en medio, y dijóles: Paz a vosotros. Y como hubo dicho esto, mostróles las manos y el costado. Y los discípulos se gozaron viendo al Señor."
    `,
    scenes: [
      {
        scene: 1,
        title: "La piedra corrida de madrugada",
        image: "/images/jesus-resurrection.jpg",
        narrative: "De mañana temprano, las mujeres encuentran el sepulcro abierto y la tumba vacía.",
        quote: "Juan 20:1 - El primer día de la semana, María Magdalena vino de mañana, siendo aún oscuro, al sepulcro; y vio la piedra quitada del sepulcro."
      },
      {
        scene: 2,
        title: "Los lienzos en el huerto",
        image: "/images/jesus-resurrection.jpg",
        narrative: "Pedro y Juan contemplan los lienzos cuidadosamente enrollados.",
        quote: "Juan 20:6-7 - Entró Simón Pedro... y vio los lienzos puestos en el suelo, y el sudario..."
      },
      {
        scene: 3,
        title: "María en el jardín",
        image: "/images/jesus-resurrection.jpg",
        narrative: "Jesús pronuncia el nombre de María y la luz de la resurrección inunda el mundo.",
        quote: "Juan 20:16 - Jesús le dice: ¡María! Volviéndose ella, le dice: ¡Raboni!"
      }
    ]
  },
  {
    slug: "el-nacimiento-de-jesus",
    title: "El nacimiento de Jesús",
    subtitle: "La luz del mundo en un pesebre de Belén",
    description: "En una humilde cueva de Judea, nace el Salvador anunciado por los profetas bajo la estrella resplandeciente.",
    bookSlug: "lucas",
    chapterReference: "Lucas 2",
    readingTimeMinutes: 10,
    category: "Vida de Jesús",
    emotionalTheme: "Esperanza",
    featured: false,
    imageUrl: "/images/nativity.jpg",
    narrativeContent: `
En aquellos días, el emperador Augusto promulgó un edicto ordenando un censo en todo el Imperio Romano. Cada habitante debía acudir a su ciudad de origen para inscribirse. José, siendo descendiente directo del rey David, subió desde la ciudad de Nazaret en Galilea hasta Belén de Judea, llevando consigo a María, su esposa, que estaba encinta.

Cuando llegaron a Belén, las posadas estaban abarrotadas de forasteros. No habiendo lugar para ellos en el mesón, encontraron cobijo en un sencillo establo. Allí le llegó a María el momento del parto, y dio a luz a su hijo primogénito. Lo envolvió cuidadosamente en pañales y lo acostó con ternura en un pesebre de paja.

En esa misma región había pastores que velaban en el campo, guardando sus rebaños durante las vigilias de la noche. De repente, un ángel del Señor se les presentó y la gloria del Señor los rodeó de un resplandor celestial, llenándolos de gran temor. Pero el ángel les dijo: —No temáis, porque he aquí os doy nuevas de gran gozo, que será para todo el pueblo: que os ha nacido hoy, en la ciudad de David, un Salvador, que es Cristo el Señor. Y esto os servirá de señal: hallaréis al niño envuelto en pañales, acostado en un pesebre.

Repentinamente apareció con el ángel una multitud de los ejércitos celestiales, alabando a Dios y diciendo: —¡Gloria a Dios en las alturas, y en la tierra paz, buena voluntad para con los hombres!

Cuando los ángeles regresaron al cielo, los pastores se dijeron unos a otros: —Vamos a Belén a ver esto que ha sucedido. Fueron a toda prisa y hallaron a María, a José y al niño acostado en el pesebre. Al verlo, contaron lo que se les había dicho sobre el niño, y todos los que oyeron se maravillaron.
    `,
    literalContent: `
Texto Bíblico Literal (Lucas 2:10-11, RVR1909):

"Y el ángel les dijo: No temáis; porque he aquí os doy nuevas de gran gozo, que será para todo el pueblo: Que os ha nacido hoy, en la ciudad de David, un Salvador, que es CRISTO el Señor."
    `,
    scenes: [
      {
        scene: 1,
        title: "El viaje a Belén de Judá",
        image: "/images/nativity.jpg",
        narrative: "José y María recorren el camino montañoso cumpliendo el censo decretado.",
        quote: "Lucas 2:4 - Y José subió de Galilea... a la ciudad de David, que se llama Belén."
      },
      {
        scene: 2,
        title: "El pesebre en la noche santa",
        image: "/images/nativity.jpg",
        narrative: "Nace el Salvador en la humildad del pesebre envuelto en pañales cálidos.",
        quote: "Lucas 2:7 - Y parió a su hijo primogénito, y le envolvió en pañales, y acostóle en un pesebre."
      },
      {
        scene: 3,
        title: "El coro angélico en los campos",
        image: "/images/nativity.jpg",
        narrative: "Los ángeles anuncian la buena noticia de paz y salvación a los sencillos pastores.",
        quote: "Lucas 2:14 - ¡Gloria en las alturas a Dios, y en la tierra paz, buena voluntad para con los hombres!"
      }
    ]
  },
  {
    slug: "jesus-camina-sobre-el-agua",
    title: "Jesús camina sobre el agua",
    subtitle: "Señorío sobre la tempestad y socorro en el mar",
    description: "En la cuarta vigilia de la noche, en medio del viento contrario, Jesús camina sobre el mar de Galilea e invita a Pedro a dar pasos de fe.",
    bookSlug: "mateo",
    chapterReference: "Mateo 14",
    readingTimeMinutes: 8,
    category: "Milagros de Jesús",
    emotionalTheme: "Fe",
    featured: false,
    imageUrl: "/images/jesus-water.jpg",
    narrativeContent: `
Inmediatamente después de haber alimentado a cinco mil hombres, Jesús hizo que sus discípulos subieran a la barca y se le adelantaran hacia la otra orilla del mar de Galilea, mientras él despedía a la multitud. Una vez despedida la gente, subió al monte a orar a solas. Al llegar la noche, estaba allí solo.

Entretanto, la barca de los discípulos ya estaba a varios estadios de tierra, azotada violentamente por las olas, porque el viento le era contrario. En la cuarta vigilia de la noche (entre las tres y las seis de la mañana), Jesús fue hacia ellos caminando sobre las agitadas aguas del mar.

Cuando los discípulos lo vieron caminar sobre el agua, se turbaron enormemente, pensando que era un fantasma, y dieron gritos de pavor. Pero Jesús les habló en seguida, diciéndoles con calma: —¡Tened ánimo; yo soy, no temáis!

Entonces Pedro le respondió: —Señor, si eres tú, manda que yo vaya a ti sobre las aguas. Jesús le dijo: —Ven.

Pedro bajó de la barca y comenzó a caminar sobre las aguas hacia Jesús. Pero al ver la fuerza del viento provocando olas embravecidas, tuvo miedo, e impulsado por la duda empezó a hundirse. Gritó desesperadamente: —¡Señor, sálvame!

Al momento Jesús, extendiendo la mano, lo asió firmemente y le dijo con amor: —¡Hombre de poca fe! ¿Por qué dudaste? Cuando ambos subieron a la barca, el viento cesó por completo. Entonces los que estaban en la barca se postraron ante él, diciendo: —Verdaderamente eres Hijo de Dios.
    `,
    literalContent: `
Texto Bíblico Literal (Mateo 14:30-31, RVR1909):

"Mas viendo el viento fuerte, tuvo miedo; y comenzando a hundirse, dio voces diciendo: ¡Señor, sálvame! Y luego Jesús, extendiendo la mano, trabó de él, y le dijo: Oh hombre de poca fe, ¿por qué dudaste?"
    `,
    scenes: [
      {
        scene: 1,
        title: "La tormenta en la cuarta vigilia",
        image: "/images/jesus-water.jpg",
        narrative: "Los apóstoles reman con fatiga contra vientos feroces en mitad de la noche.",
        quote: "Mateo 14:24 - Y ya la barca estaba en medio del mar, atormentada de las ondas; porque el viento era contrario."
      },
      {
        scene: 2,
        title: "Pasos sobre las olas embravecidas",
        image: "/images/jesus-water.jpg",
        narrative: "Jesús se aproxima caminando sobre la superficie líquida infundiendo paz.",
        quote: "Mateo 14:27 - Pero enseguida Jesús les habló, diciendo: ¡Tened ánimo; yo soy, no temáis!"
      },
      {
        scene: 3,
        title: "La mano extendida que salva",
        image: "/images/jesus-water.jpg",
        narrative: "Pedro se hunde al mirar la tormenta, pero la mano de Cristo lo sostiene instantáneamente.",
        quote: "Mateo 14:31 - Y luego Jesús, extendiendo la mano, trabó de él."
      }
    ]
  },
  {
    slug: "jonas-y-la-ballena",
    title: "Jonás y el gran pez",
    subtitle: "La fuga del profeta y la misericordia divina para Nínive",
    description: "Intentando huir de la presencia de Dios hacia Tarsis, Jonás aprende en el vientre del mar que la salvación pertenece al Señor.",
    bookSlug: "jonas",
    chapterReference: "Jonás 1-4",
    readingTimeMinutes: 9,
    category: "Historias Populares",
    emotionalTheme: "Perdón",
    featured: false,
    imageUrl: "/images/jonah-whale.jpg",
    narrativeContent: `
La palabra del Señor vino al profeta Jonás con una misión: —Levántate y ve a Nínive, aquella gran ciudad, y pregona contra ella; porque su maldad ha subido delante de mí. Pero Jonás, aborreciendo a los asirios por sus crueldades, decidió huir de la presencia del Señor hacia Tarsis. Bajó al puerto de Jope, pagó su pasaje y embarcó.

Pero el Señor hizo levantar un gran viento en el mar, desencadenando una tempestad tan violenta que la nave estaba a punto de romperse. Los marineros, aterrorizados, invocaban cada uno a su dios y arrojaban el cargamento al mar. Mientras tanto, Jonás dormía en el fondo del barco. El capitán lo despertó pidiéndole que orara a su Dios. Echando suertes para saber por culpa de quién les venía ese mal, la suerte cayó sobre Jonás.

Él confesó: —Soy hebreo y temo al Señor, Dios de los cielos, que hizo el mar y la tierra. Sabedor de que por su causa venía la tempestad, les dijo: —Tomadme y echadme al mar, y el mar se os aquietará. Con pesar, los marineros lo arrojaron por la borda, e inmediatamente la furia del mar cesó.

Pero el Señor tenía preparado un gran pez que se tragó a Jonás. Estuvo Jonás en el vientre del pez tres días y tres noches. Desde la profundidad del abismo, Jonás oró con arrepentimiento sincero y alabanza. Entonces el Señor mandó al pez, y este vomitó a Jonás en tierra seca. Jonás fue finalmente a Nínive, predicó la palabra, y toda la ciudad, desde el rey hasta el menor, se arrepintió con ayuno. Dios perdonó a la ciudad.
    `,
    literalContent: `
Texto Bíblico Literal (Jonás 2:9, RVR1909):

"Yo empero con voz de alabanza te ofreceré sacrificios; pagaré lo que prometí. La salvación es de Jehová."
    `,
    scenes: [
      {
        scene: 1,
        title: "La tormenta en el Mediterráneo",
        image: "/images/jonah-whale.jpg",
        narrative: "Jonás huye en barco pero Dios envía una tormenta que detiene la nave.",
        quote: "Jonás 1:4 - Mas Jehová hizo levantar un gran viento en el mar, y fue hecha una tan gran tempestad."
      },
      {
        scene: 2,
        title: "Tres días en las profundidades",
        image: "/images/jonah-whale.jpg",
        narrative: "Desde las entrañas del gran pez, Jonás eleva su oración de gratitud y entrega.",
        quote: "Jonás 2:1 - Y oró Jonás desde el vientre del pez a Jehová su Dios."
      }
    ]
  },
  {
    slug: "el-buen-samaritano",
    title: "El buen samaritano",
    subtitle: "Parábola sobre el amor práctico al prójimo",
    description: "Jesús enseña a través de una parábola quién es verdaderamente nuestro prójimo en el camino de Jerusalén a Jericó.",
    bookSlug: "lucas",
    chapterReference: "Lucas 10",
    readingTimeMinutes: 7,
    category: "Parábolas",
    emotionalTheme: "Amor",
    featured: false,
    imageUrl: "/images/creation.jpg",
    narrativeContent: `
Un intérprete de la ley se levantó para poner a prueba a Jesús, preguntándole: —Maestro, ¿qué debo hacer para heredar la vida eterna? Jesús le respondió: —¿Qué está escrito en la ley? Él contestó: —Amarás al Señor tu Dios con todo tu corazón, y a tu prójimo como a ti mismo. Jesús le dijo: —Bien has respondido; haz esto y vivirás.

Pero el interprete, queriendo justificarse a sí mismo, preguntó: —¿Y quién es mi prójimo?

Jesús le relató esta parábola: —Un hombre bajaba de Jerusalén a Jericó cuando cayó en manos de unos ladrones. Le quitaron la ropa, lo golpearon despiadadamente y se fueron dejándolo medio muerto a la orilla del camino.

Aconteció que bajaba por aquel camino un sacerdote judío. Al ver al herido, se desvió y pasó de largo por el otro lado. De la misma manera, un levita, llegando cerca del lugar, lo miró y también pasó de largo.

Pero un samaritano, que iba de viaje, llegó cerca de él y, al verlo, fue movido a profunda compasión. Se acercó, vendó sus heridas derramando en ellas aceite y vino; luego lo montó en su propia cabalgadura, lo llevó a una posada y cuidó de él. Al día siguiente, sacó dos denarios, se los dio al posadero y le dijo: "Cuida de él; y todo lo que gastes de más, yo te lo pagaré cuando regrese".

Jesús le preguntó al intérprete de la ley: —¿Quién de estos tres te parece que fue el prójimo del que cayó en manos de los ladrones? Él respondió: —El que tuvo misericordia de él. Entonces Jesús le dijo: —Ve y haz tú lo mismo.
    `,
    literalContent: `
Texto Bíblico Literal (Lucas 10:36-37, RVR1909):

"¿Quién, pues, de estos tres te parece que fue el prójimo de aquél que cayó en manos de los ladrones? Y él dijo: El que usó con él de misericordia. Entonces Jesús le dijo: Ve, y haz tú lo mismo."
    `,
    scenes: [
      {
        scene: 1,
        title: "El herido en el camino de Jericó",
        image: "/images/creation.jpg",
        narrative: "Un viajero es asaltado y abandonado sin auxilio en la ruta árida.",
        quote: "Lucas 10:30 - Cayó en manos de ladrones, los cuales le despojaron... dejándole medio muerto."
      },
      {
        scene: 2,
        title: "La compasión sin prejuicios",
        image: "/images/creation.jpg",
        narrative: "El samaritano detiene su marcha, cura las heridas y paga los gastos de la posada.",
        quote: "Lucas 10:33 - Mas un Samaritano... como le vio, fue movido a compasión."
      }
    ]
  },
  {
    slug: "el-hijo-prodigo",
    title: "El hijo pródigo",
    subtitle: "El amor incondicional del Padre que perdona y restaura",
    description: "Un hijo malgasta su herencia lejos de casa, pero al regresar arrepentido es recibido con un abrazo lleno de gracia.",
    bookSlug: "lucas",
    chapterReference: "Lucas 15",
    readingTimeMinutes: 9,
    category: "Parábolas",
    emotionalTheme: "Perdón",
    featured: false,
    imageUrl: "/images/nativity.jpg",
    narrativeContent: `
Jesús dijo: —Un hombre tenía dos hijos. El menor de ellos le dijo a su padre: "Padre, dame la parte de los bienes que me corresponde". Y el padre les repartió sus bienes.

Pocos días después, juntándolo todo, el hijo menor se fue a una provincia lejana, y allí desperdició toda su fortuna viviendo desenfrenadamente. Cuando lo hubo malgastado todo, vino una gran hambre en aquella región y comenzó a pasar necesidad. Fue y se arrimó a uno de los ciudadanos de aquel país, quien lo envió a sus campos a apacentar cerdos. Anhelaba saciarse con las algarrobas que comían los cerdos, pero nadie se las daba.

Volviendo en sí, recapacitó: "¡Cuántos jornaleros en la casa de mi padre tienen abundancia de pan, y yo aquí me muero de hambre! Me levantaré e iré a mi padre, y le diré: Padre, he pecado contra el cielo y contra ti. Ya no soy digno de ser llamado tu hijo; hazme como a uno de tus jornaleros".

Se levantó y vino a su padre. Cuando aún estaba lejos, su padre lo vio y fue movido a profunda compasión; corrió hacia él, se echó sobre su cuello y lo besó apasionadamente.

El hijo le dijo: "Padre, he pecado contra el cielo y contra ti, y ya no soy digno de ser llamado tu hijo". Pero el padre dijo a sus siervos: "Sacad el mejor vestido y vestidle; poned un anillo en su mano y calzado en sus pies. Traed el becerro gordo y matadlo, y comamos y hagamos fiesta; porque este mi hijo muerto era, y ha revivido; se había perdido, y es hallado".
    `,
    literalContent: `
Texto Bíblico Literal (Lucas 15:20, RVR1909):

"Y levantándose, vino a su padre. Y como aun estuviese lejos, viole su padre, y fue movido a compasión, y corrió, y cayó sobre su cuello, y le besó."
    `,
    scenes: [
      {
        scene: 1,
        title: "La partida y el desarraigo",
        image: "/images/nativity.jpg",
        narrative: "El hijo menor reclama sus bienes y se aleja a despilfarrar su futuro.",
        quote: "Lucas 15:13 - Juntándolo todo el hijo menor, se fue lejos a una provincia apartada."
      },
      {
        scene: 2,
        title: "El abrazo del Padre amoroso",
        image: "/images/nativity.jpg",
        narrative: "El padre corre al encuentro del hijo arrepentido y viste su dignidad con fiesta.",
        quote: "Lucas 15:24 - Porque este mi hijo muerto era, y ha revivido; habíase perdido, y es hallado."
      }
    ]
  }
];
