(function () {
// ============================================================
// DATA: CATEGORIES & WORDS
// ============================================================
const CATEGORIES = [
  {
    id: 'chakula',
    name: 'Vyakula vya Tanzania',
    sub: 'Tanzania Food',
    icon: '🍽️',
    color: '#FF7043',
    words: [
      { sw: 'UGALI', en: 'Maize porridge / staple meal', ex: 'Ninakula ugali na samaki kila siku.', note: 'Ugali ni chakula kikuu cha Tanzania.' },
      { sw: 'PILAU', en: 'Spiced rice with meat', ex: 'Pilau ya Zanzibar ni tamu sana.', note: 'Pilau ina viungo vingi kama karafuu na pilipili manga.' },
      { sw: 'WALI', en: 'Cooked rice', ex: 'Ninapenda wali na maharage.', note: 'Wali ni chakula cha kawaida pwani.' },
      { sw: 'NYAMA', en: 'Meat', ex: 'Ananunua nyama sokoni asubuhi.' },
      { sw: 'SAMAKI', en: 'Fish', ex: 'Samaki wa Ziwa Victoria ni mkubwa sana.' },
      { sw: 'NDIZI', en: 'Banana / plantain', ex: 'Ndizi za Tanzania ni tamu.', note: 'Ndizi za kupika ni tofauti na ndizi za kula moja kwa moja.' },
      { sw: 'CHIPSI', en: 'French fries / chips', ex: 'Watoto wanakula chipsi baada ya shule.' },
      { sw: 'MAHARAGE', en: 'Beans', ex: 'Maharage na wali ni mlo wa pamoja.' },
      { sw: 'MCHICHA', en: 'Spinach / leafy greens', ex: 'Mama anapika mchicha na nyanya.' },
      { sw: 'KACHUMBARI', en: 'Fresh tomato and onion salad', ex: 'Kachumbari ina nyanya, kitunguu na limau.' },
      { sw: 'MANDAZI', en: 'Fried dough bread', ex: 'Mandazi na chai ni kifungua kinywa kizuri.' },
      { sw: 'SUPU', en: 'Soup / broth', ex: 'Supu ya nyama inanipa nguvu.' },
    ]
  },
  {
    id: 'miji',
    name: 'Miji na Maeneo',
    sub: 'Cities & Places',
    icon: '🏙️',
    color: '#42A5F5',
    words: [
      { sw: 'DODOMA', en: 'Capital city of Tanzania', ex: 'Dodoma ni mji mkuu wa Tanzania.', note: 'Dodoma imekuwa mji mkuu rasmi tangu 1996.' },
      { sw: 'ARUSHA', en: 'Major city near Kilimanjaro', ex: 'Tunaenda Arusha kuona wanyama.', note: 'Arusha ni lango la safari nyingi.' },
      { sw: 'MWANZA', en: 'City on Lake Victoria', ex: 'Mwanza iko kandoni mwa Ziwa Victoria.' },
      { sw: 'MBEYA', en: 'City in Southern Highlands', ex: 'Mbeya ina hali ya hewa ya baridi.', note: 'Mbeya inajulikana kwa kilimo cha chai na kahawa.' },
      { sw: 'TANGA', en: 'Coastal city in northeastern Tanzania', ex: 'Tanga ina pwani nzuri sana.' },
      { sw: 'KIGOMA', en: 'City on Lake Tanganyika', ex: 'Kigoma ipo karibu na Ziwa Tanganyika.' },
      { sw: 'MOSHI', en: 'City at foot of Kilimanjaro', ex: 'Moshi iko chini ya Mlima Kilimanjaro.' },
      { sw: 'MOROGORO', en: 'City with Uluguru Mountains', ex: 'Morogoro ina milima mizuri ya Uluguru.' },
      { sw: 'ZANZIBAR', en: 'Island famous for spices', ex: 'Zanzibar inajulikana kwa viungo na pwani.', note: 'Zanzibar ni sehemu ya Jamhuri ya Muungano wa Tanzania.' },
      { sw: 'DARESSALAAM', display: 'Dar es Salaam', en: 'Dar es Salaam, Tanzania largest city', ex: 'Dar es Salaam ni jiji kubwa la biashara.' },
    ]
  },
  {
    id: 'wanyama',
    name: 'Wanyama wa Tanzania',
    sub: 'Tanzanian Animals',
    icon: '🦁',
    color: '#66BB6A',
    words: [
      { sw: 'SIMBA', en: 'Lion', ex: 'Simba anaishi mbugani na familia yake.', note: 'Tanzania ina idadi kubwa ya simba duniani.' },
      { sw: 'TEMBO', en: 'Elephant', ex: 'Tembo mkubwa ananywa maji mtoni.', note: 'Serengeti na Mikumi vina tembo wengi.' },
      { sw: 'TWIGA', en: 'Giraffe', ex: 'Twiga anakula majani ya mti mrefu.' },
      { sw: 'NYATI', en: 'Buffalo', ex: 'Nyati ni hatari sana ukimkaribia.' },
      { sw: 'CHUI', en: 'Leopard', ex: 'Chui anapanda mti usiku na nyama yake.' },
      { sw: 'KIFARU', en: 'Rhinoceros', ex: 'Kifaru ni mnyama alio hatarini kutoweka.' },
      { sw: 'PUNDAMILIA', en: 'Zebra', ex: 'Pundamilia wana mistari nyeusi na nyeupe.', note: 'Jina linahusishwa na mistari ya mwilini kama milia.' },
      { sw: 'NYUMBU', en: 'Wildebeest / gnu', ex: 'Nyumbu wengi wanahamia kila mwaka.', note: 'Uhamaji wa nyumbu Serengeti ni maarufu duniani.' },
      { sw: 'FISI', en: 'Hyena', ex: 'Fisi analia usiku na sauti ya ajabu.' },
      { sw: 'NYANI', en: 'Monkey / baboon', ex: 'Nyani anakula matunda msituni.' },
      { sw: 'KIBOKO', en: 'Hippopotamus', ex: 'Kiboko anaishi mtoni na anakula nyasi.' },
      { sw: 'SWALA', en: 'Gazelle / antelope', ex: 'Swala anaruka mbio mbugani.' },
    ]
  },
  {
    id: 'salamu',
    name: 'Salamu na Mazungumzo',
    sub: 'Greetings & Conversation',
    icon: '👋',
    color: '#AB47BC',
    words: [
      { sw: 'HABARI', en: 'News / how are you?', ex: 'Habari za asubuhi? Nzuri!', note: 'Majibu ya kawaida: Nzuri, Safi, Poa.' },
      { sw: 'KARIBU', en: 'Welcome / come in', ex: 'Karibu nyumbani kwangu!', note: 'Unaweza pia kusema "Karibu sana" kwa msisitizo.' },
      { sw: 'ASANTE', en: 'Thank you', ex: 'Asante sana kwa msaada wako.', note: 'Jibu la asante ni "Karibu" au "Sawa".' },
      { sw: 'SAMAHANI', en: 'Sorry / excuse me', ex: 'Samahani, naweza kupita?', note: 'Pia hutumika kusema "Msamaha" rasmi zaidi.' },
      { sw: 'TAFADHALI', en: 'Please', ex: 'Tafadhali nipe maji, nina kiu.' },
      { sw: 'KWAHERI', en: 'Goodbye', ex: 'Kwaheri! Tutaonana kesho.', note: 'Kwa watu wengi unasema "Kwaherini".' },
      { sw: 'NDIYO', en: 'Yes', ex: 'Ndiyo, ninaelewa vizuri.' },
      { sw: 'HAPANA', en: 'No', ex: 'Hapana, sitaki sukari kwenye chai yangu.' },
      { sw: 'SHIKAMOO', en: 'Respectful greeting (to elders)', ex: 'Shikamoo babu! Habari za leo?', note: 'Jibu ni "Marahaba" — heshima muhimu sana Tanzania.' },
      { sw: 'MAMBO', en: 'How\'s things? (informal)', ex: 'Mambo vipi? — Poa kabisa!', note: '"Mambo" ni salamu ya vijana na marafiki.' },
      { sw: 'SAWA', en: 'OK / alright', ex: 'Sawa, nitakuja saa tatu.' },
      { sw: 'POLE', en: 'Sorry (empathy) / slowly', ex: 'Pole sana kwa msiba wako.', note: '"Pole pole" inamaanisha "slowly slowly".' },
    ]
  },
  {
    id: 'familia',
    name: 'Familia',
    sub: 'Family',
    icon: '👨‍👩‍👧‍👦',
    color: '#FFA726',
    words: [
      { sw: 'MAMA', en: 'Mother', ex: 'Mama wangu anapika chakula kitamu.', note: '"Mama" pia ni salamu ya heshima kwa mwanamke mzima.' },
      { sw: 'BABA', en: 'Father', ex: 'Baba ananisaidia na kazi za shule.' },
      { sw: 'DADA', en: 'Sister (older)', ex: 'Dada yangu anaishi Dar es Salaam.' },
      { sw: 'KAKA', en: 'Brother (older)', ex: 'Kaka yangu ni daktari.' },
      { sw: 'MTOTO', en: 'Child', ex: 'Mtoto anacheza kwa furaha.' },
      { sw: 'BABU', en: 'Grandfather', ex: 'Babu ananieleza hadithi za zamani.', note: '"Bibi" ni bibi (grandmother) na "babu" ni babu (grandfather).' },
      { sw: 'BIBI', en: 'Grandmother / older woman', ex: 'Bibi ananitengenezea chai.' },
      { sw: 'MJOMBA', en: 'Uncle (mother\'s brother)', ex: 'Mjomba wangu anaishi Mwanza.' },
      { sw: 'SHANGAZI', en: 'Aunt (father\'s sister)', ex: 'Shangazi ananiletea zawadi sikukuu.' },
      { sw: 'BINAMU', en: 'Cousin', ex: 'Binamu zangu wanakaa Arusha.' },
      { sw: 'MUME', en: 'Husband', ex: 'Mume wake ni mwalimu mzuri.' },
      { sw: 'MKE', en: 'Wife', ex: 'Mke wake anapenda kupika pilau.' },
    ]
  },
  {
    id: 'biashara',
    name: 'Biashara na Sokoni',
    sub: 'Business & Market',
    icon: '🛒',
    color: '#26C6DA',
    words: [
      { sw: 'SOKO', en: 'Market', ex: 'Mama anaenda sokoni kununua mboga.', note: 'Masoko ya Tanzania ni ya rangi na ya kupendeza sana.' },
      { sw: 'DUKA', en: 'Shop / store', ex: 'Duka hili lina vitu vingi.' },
      { sw: 'BEI', en: 'Price', ex: 'Bei ya mchele ni ngapi leo?' },
      { sw: 'PESA', en: 'Money', ex: 'Sina pesa za kutosha kununua hilo.' },
      { sw: 'NUNUA', en: 'To buy', ex: 'Ninataka kununua kanga mbili.' },
      { sw: 'UZA', en: 'To sell', ex: 'Anauza samaki bei nzuri.' },
      { sw: 'BIDHAA', en: 'Goods / products', ex: 'Bidhaa hizi zimetoka China.' },
      { sw: 'FAIDA', en: 'Profit / benefit', ex: 'Biashara yake ina faida kubwa.' },
      { sw: 'MTEJA', en: 'Customer / client', ex: 'Wateja wengi wanakuja asubuhi.' },
      { sw: 'PUNGUZA', en: 'To reduce / discount', ex: 'Tafadhali punguza bei kidogo.' },
      { sw: 'LIPA', en: 'To pay', ex: 'Nimelipa kwa simu ya Mpesa.' },
      { sw: 'HESABU', en: 'Calculation / arithmetic', ex: 'Hesabu yake ni sahihi kabisa.' },
    ]
  },
  {
    id: 'usafiri',
    name: 'Usafiri',
    sub: 'Transport & Travel',
    icon: '🚌',
    color: '#EC407A',
    words: [
      { sw: 'SAFARI', en: 'Journey / trip', ex: 'Tunaenda safari ya Arusha kesho.', note: 'Neno "safari" limetoka Kiswahili hadi lugha za Ulaya!' },
      { sw: 'GARI', en: 'Car / vehicle', ex: 'Gari lake ni jipya na zuri.' },
      { sw: 'BASI', en: 'Bus', ex: 'Napanda basi kwenda mjini kila asubuhi.' },
      { sw: 'DALADALA', en: 'Minibus / shared taxi', ex: 'Daladala ni usafiri wa kawaida Dar es Salaam.', note: 'Daladala zinaitwa hivyo kwa sababu zilikuwa zinagharimu "dollar dollar" zamani.' },
      { sw: 'BODA', en: 'Motorcycle taxi', ex: 'Boda inafika haraka mtaani.' },
      { sw: 'BAJAJI', en: 'Three-wheeled auto-rickshaw', ex: 'Napanda bajaji kwenda stendi.' },
      { sw: 'NDEGE', en: 'Airplane / bird', ex: 'Ndege inaondoka saa mbili usiku.' },
      { sw: 'TRENI', en: 'Train', ex: 'Treni ya TAZARA inakwenda Zambia.' },
      { sw: 'BARABARA', en: 'Road / street', ex: 'Barabara hii imejengwa vizuri.' },
      { sw: 'BANDARI', en: 'Port / harbour', ex: 'Bandari ya Dar es Salaam ni kubwa.' },
      { sw: 'TIKETI', en: 'Ticket', ex: 'Nimenunua tiketi ya basi tayari.' },
      { sw: 'STENDI', en: 'Bus station / stop', ex: 'Nitakungojea stendi ya mabasi.' },
      { sw: 'DEREVA', en: 'Driver', ex: 'Dereva wetu anajua njia vizuri.' },
    ]
  },
  {
    id: 'mazingira',
    name: 'Mazingira na Hali ya Hewa',
    sub: 'Environment & Weather',
    icon: '🌍',
    color: '#8D6E63',
    words: [
      { sw: 'JUA', en: 'Sun / sunshine', ex: 'Jua la Tanzania linawaka sana mchana.' },
      { sw: 'MVUA', en: 'Rain', ex: 'Mvua inanyesha masika yote.' },
      { sw: 'UPEPO', en: 'Wind', ex: 'Upepo wa baharini ni baridi na mzuri.' },
      { sw: 'BAHARI', en: 'Ocean / sea', ex: 'Bahari ya Hindi ipo mashariki mwa Tanzania.' },
      { sw: 'MLIMA', en: 'Mountain', ex: 'Mlima Kilimanjaro ni mrefu zaidi Afrika.', note: 'Kilimanjaro ni mlima mrefu zaidi barani Afrika — 5,895m.' },
      { sw: 'MTO', en: 'River', ex: 'Mto Rufiji ni mrefu zaidi Tanzania.' },
      { sw: 'ZIWA', en: 'Lake', ex: 'Ziwa Victoria ni kubwa zaidi Afrika.' },
      { sw: 'MSITU', en: 'Forest / jungle', ex: 'Msitu wa Udzungwa una miti mingi.' },
      { sw: 'JOTO', en: 'Heat / warmth', ex: 'Joto la pwani ni kali sana Januari.' },
      { sw: 'BARIDI', en: 'Cold / cool', ex: 'Baridi inaingia Julai na Agosti.' },
      { sw: 'PWANI', en: 'Coast / beach', ex: 'Pwani ya Zanzibar ni nzuri sana.' },
      { sw: 'ARDHI', en: 'Land / soil / earth', ex: 'Ardhi ya Tanzania ni nzuri kwa kilimo.' },
    ]
  },
  {
    id: 'utamaduni',
    name: 'Utamaduni wa Tanzania',
    sub: 'Tanzanian Culture',
    icon: '🥁',
    color: '#7E57C2',
    words: [
      { sw: 'NGOMA', en: 'Drum / traditional dance', ex: 'Ngoma zinapigiwa sherehe ya harusi.', note: 'Kuna aina nyingi za ngoma Tanzania, kila kabila lina zake.' },
      { sw: 'KANGA', en: 'Colorful traditional cloth with a saying', ex: 'Mama anabeba mtoto kwa kanga mgongoni.', note: 'Kanga ina methali au ujumbe mfupi katika Kiswahili.' },
      { sw: 'KITENGE', en: 'Colorful wax print fabric', ex: 'Amelishwa nguo nzuri ya kitenge.' },
      { sw: 'TAARAB', en: 'Musical genre mixing Arabic and Swahili', ex: 'Taarab ni muziki maarufu Zanzibar.', note: 'Taarab inachanganya athari za Kiarabu, Kiafrika na Kihindi.' },
      { sw: 'HARUSI', en: 'Wedding', ex: 'Harusi ya jirani ilikuwa na furaha nyingi.' },
      { sw: 'SHEREHE', en: 'Celebration / party', ex: 'Sherehe ya uhuru ni tarehe 9 Desemba.', note: 'Tanzania ilipata uhuru tarehe 9 Desemba 1961.' },
      { sw: 'MILA', en: 'Culture / traditions / customs', ex: 'Mila za Tanzania ni nyingi na tofauti.' },
      { sw: 'HADITHI', en: 'Story / tale', ex: 'Bibi ananieleza hadithi za kimapokeo.', note: 'Hadithi za kimapokeo za Kiswahili zinaanza na "Hadithi hadithi — hadithi njoo!"' },
      { sw: 'SANAA', en: 'Art / craft', ex: 'Sanaa za Tanzania zinauza vizuri kwa watalii.' },
      { sw: 'WIMBO', en: 'Song', ex: 'Wimbo huu wa bongo flava ni mzuri.' },
    ]
  },
  {
    id: 'historia',
    name: 'Historia na Taifa',
    sub: 'History & Nation',
    icon: '🏛️',
    color: '#EF5350',
    words: [
      { sw: 'UHURU', en: 'Freedom / independence', ex: 'Uhuru wa Tanzania ulipatikana 1961.', note: 'Tanganyika ilipata uhuru 9 Desemba 1961. Muungano na Zanzibar ulianza 1964.' },
      { sw: 'AMANI', en: 'Peace', ex: 'Tanzania inajulikana kwa amani na utulivu.' },
      { sw: 'TAIFA', en: 'Nation / country', ex: 'Taifa letu linastawi kila siku.' },
      { sw: 'RAIS', en: 'President', ex: 'Rais wa Tanzania anaishi Ikulu Dar es Salaam.' },
      { sw: 'BENDERA', en: 'Flag', ex: 'Bendera ya Tanzania ina rangi nne.', note: 'Rangi za bendera: kijani, njano, nyeusi, na bluu.' },
      { sw: 'SERIKALI', en: 'Government', ex: 'Serikali inajengea barabara mpya.' },
      { sw: 'KATIBA', en: 'Constitution', ex: 'Katiba ya Tanzania inalinda haki za wananchi.' },
      { sw: 'WANANCHI', en: 'Citizens / the people', ex: 'Wananchi wanaomba maendeleo zaidi.' },
      { sw: 'MUUNGANO', en: 'Union', ex: 'Muungano wa Tanganyika na Zanzibar ni nguvu.', note: 'Muungano ulianzishwa tarehe 26 Aprili 1964.' },
      { sw: 'LUGHA', en: 'Language', ex: 'Lugha ya taifa ya Tanzania ni Kiswahili.' },
    ]
  }
];

// Daily puzzle seed words
const DAILY_WORDS = [
  { sw: 'KILIMANJARO', en: 'Highest mountain in Africa', ex: 'Kilimanjaro ni mlima mrefu zaidi Afrika.', note: 'Urefu wake ni mita 5,895.' },
  { sw: 'SERENGETI', en: 'Famous national park in Tanzania', ex: 'Serengeti inajulikana duniani kote.', note: 'Serengeti ina wanyama wengi na mazingira mazuri.' },
  { sw: 'SWAHILI', en: 'The Swahili language', ex: 'Ninajifunza Kiswahili kwa furaha.' },
  { sw: 'BONGO', en: 'Tanzania (slang)', ex: 'Ninapenda kuishi bongo nchi yangu.', note: '"Bongo" ni jina la kimombo la Tanzania linalotumika katika muziki wa bongo flava.' },
  { sw: 'UJAMAA', en: 'African socialism / unity', ex: 'Ujamaa ulianzishwa na Mwalimu Nyerere.', note: 'Ujamaa ulikuwa sera ya Tanzania baada ya uhuru.' },
];

// Word of the day list
const WODS = [
  { word: 'Karibu', meaning: 'Welcome — "Karibu Tanzania!"' },
  { word: 'Ujamaa', meaning: 'Unity/Socialism — "Ujamaa ni nguvu yetu."' },
  { word: 'Poa', meaning: 'Cool/Great — "Mambo? — Poa kabisa!"' },
  { word: 'Asante', meaning: 'Thank you — "Asante sana!"' },
      { word: 'Polepole', meaning: 'Slowly/calmly — "Twende polepole."' },
  { word: 'Subira', meaning: 'Patience — "Subira huvuta heri."' },
  { word: 'Upole', meaning: 'Gentleness — "Upole ni nguvu ya mtu mzima."' },
  { word: 'Safari', meaning: 'Journey — "Safari ndefu huanza hatua moja."' },
  { word: 'Umoja', meaning: 'Unity — "Umoja ni nguvu, utengano ni udhaifu."' },
  { word: 'Pamoja', meaning: 'Together — "Pamoja tutafika mbali."' },
];

const ENCOURAGEMENTS = [
  'Hongera! 🎉', 'Umefanikiwa! 🏆', 'Vizuri sana! ⭐',
  'Nzuri kabisa! 🌟', 'Bora sana! 💪', 'Poa kabisa! 🔥',
  'Endelea hivyo! 👍', 'Wewe ni bingwa! 🦁',
];

const EXTRA_WORDS = {
  chakula: [
    { sw: 'MBOGA', en: 'Vegetables', ex: 'Mboga zinafaa kwa afya.' },
    { sw: 'KARANGA', en: 'Groundnuts / peanuts', ex: 'Karanga huliwa kama kitafunwa.' },
    { sw: 'VITUMBUA', en: 'Rice cakes', ex: 'Vitumbua ni vitamu na chai.' },
  ],
  miji: [
    { sw: 'IRINGA', en: 'City in the Southern Highlands', ex: 'Iringa ina hali ya hewa nzuri.' },
    { sw: 'LINDI', en: 'Coastal town in southern Tanzania', ex: 'Lindi iko kusini mwa Tanzania.' },
    { sw: 'TABORA', en: 'Historic inland town', ex: 'Tabora ina historia ndefu ya biashara.' },
  ],
  wanyama: [
    { sw: 'TAUSI', en: 'Peacock', ex: 'Tausi ana manyoya mazuri.' },
    { sw: 'KOBE', en: 'Tortoise', ex: 'Kobe hutembea polepole.' },
    { sw: 'MAMBA', en: 'Crocodile', ex: 'Mamba anaishi majini.' },
  ],
  salamu: [
    { sw: 'MARAHABA', en: 'Respectful reply to Shikamoo', ex: 'Bibi anajibu, Marahaba.' },
    { sw: 'SAFI', en: 'Fine / clean / good', ex: 'Habari? Safi kabisa.' },
    { sw: 'TUTAONANA', en: 'See you', ex: 'Tutaonana kesho asubuhi.' },
  ],
  familia: [
    { sw: 'SHEMEJI', en: 'In-law', ex: 'Shemeji yangu ametutembelea.' },
    { sw: 'MPWA', en: 'Niece / nephew', ex: 'Mpwa wangu anasoma shule.' },
    { sw: 'FAMILIA', en: 'Family', ex: 'Familia yetu inaishi Mwanza.' },
  ],
  biashara: [
    { sw: 'RISITI', en: 'Receipt', ex: 'Nipe risiti baada ya kulipa.' },
    { sw: 'CHENJI', en: 'Change / balance', ex: 'Muuzaji amenirudishia chenji.' },
    { sw: 'KIPIMO', en: 'Measure / scale', ex: 'Kipimo kinaonyesha kilo moja.' },
  ],
  usafiri: [
    { sw: 'ABIRIA', en: 'Passenger', ex: 'Abiria wanasubiri basi.' },
    { sw: 'KITUO', en: 'Station / stop', ex: 'Kituo cha daladala kiko karibu.' },
    { sw: 'NAULI', en: 'Fare', ex: 'Nauli ya basi imeongezeka.' },
  ],
  mazingira: [
    { sw: 'MAWINGU', en: 'Clouds', ex: 'Mawingu yamefunika jua.' },
    { sw: 'KISIWA', en: 'Island', ex: 'Kisiwa cha Zanzibar ni maarufu.' },
    { sw: 'BONDE', en: 'Valley', ex: 'Bonde lina miti mingi.' },
  ],
  utamaduni: [
    { sw: 'METHALI', en: 'Proverb', ex: 'Methali hufundisha hekima.' },
    { sw: 'JANDO', en: 'Traditional initiation', ex: 'Jando ni sehemu ya mila katika jamii fulani.' },
    { sw: 'MAPISHI', en: 'Cooking / cuisine', ex: 'Mapishi ya Tanzania ni tofauti.' },
  ],
  historia: [
    { sw: 'IKULU', en: 'State House', ex: 'Ikulu ni ofisi muhimu ya nchi.' },
    { sw: 'BUNGE', en: 'Parliament', ex: 'Bunge hukutana Dodoma.' },
    { sw: 'KURA', en: 'Vote', ex: 'Wananchi wanapiga kura.' },
  ],
};

const ADVANCED_WORDS = {
  chakula: [
    { sw: 'MIHOGO', en: 'Cassava', ex: 'Mihogo huliwa kwa chai au nazi.' },
    { sw: 'VIAZI', en: 'Potatoes', ex: 'Viazi vya kukaanga vinapendwa sana.' },
  ],
  miji: [
    { sw: 'BAGAMOYO', en: 'Historic coastal town', ex: 'Bagamoyo ina historia ya pwani.' },
    { sw: 'SONGEA', en: 'Town in southern Tanzania', ex: 'Songea iko kusini mwa Tanzania.' },
  ],
  wanyama: [
    { sw: 'CHURA', en: 'Frog', ex: 'Chura husikika wakati wa mvua.' },
    { sw: 'KIMA', en: 'Small monkey', ex: 'Kima anakaa kwenye miti.' },
  ],
  salamu: [
    { sw: 'SHUKRANI', en: 'Thanks / gratitude', ex: 'Shukrani kwa msaada wako.' },
    { sw: 'NASHUKURU', en: 'I am thankful', ex: 'Nashukuru kwa chakula.' },
  ],
  familia: [
    { sw: 'WAZAZI', en: 'Parents', ex: 'Wazazi wangu wanaishi Dodoma.' },
    { sw: 'WAJUKUU', en: 'Grandchildren', ex: 'Bibi anawapenda wajukuu wake.' },
  ],
  biashara: [
    { sw: 'MTAJI', en: 'Capital for business', ex: 'Anahitaji mtaji kuanza biashara.' },
    { sw: 'MNADA', en: 'Auction / market day', ex: 'Mnada unafanyika Jumamosi.' },
  ],
  usafiri: [
    { sw: 'UWANJA', en: 'Airport / field', ex: 'Uwanja wa ndege uko karibu.' },
    { sw: 'KIVUKO', en: 'Ferry', ex: 'Kivuko kinabeba abiria.' },
  ],
  mazingira: [
    { sw: 'MAPOROMOKO', en: 'Waterfalls', ex: 'Maporomoko ya maji ni mazuri.' },
    { sw: 'NYANDA', en: 'Grasslands / plains', ex: 'Nyanda zina majani mengi.' },
  ],
  utamaduni: [
    { sw: 'USHAIRI', en: 'Poetry', ex: 'Ushairi wa Kiswahili una mizani.' },
    { sw: 'VYOMBO', en: 'Utensils / instruments', ex: 'Vyombo vya ngoma vinapigwa.' },
  ],
  historia: [
    { sw: 'AZIMIO', en: 'Declaration', ex: 'Azimio ni tamko muhimu.' },
    { sw: 'URITHI', en: 'Heritage', ex: 'Urithi wa taifa unalindwa.' },
  ],
};

const BADGE_DEFS = [
  { id: 'first-puzzle', icon: '🏆', sw: 'Fumbo la Kwanza', en: 'First Puzzle', descSw: 'Kamilisha fumbo lako la kwanza.', descEn: 'Complete your first puzzle.' },
  { id: 'words-10', icon: '📚', sw: 'Maneno 10', en: '10 Words', descSw: 'Pata maneno 10.', descEn: 'Find 10 words.' },
  { id: 'daily-3', icon: '☀️', sw: 'Siku 3', en: '3 Day Streak', descSw: 'Kamilisha fumbo la leo siku 3.', descEn: 'Complete daily puzzles for 3 days.' },
  { id: 'three-star', icon: '⭐', sw: 'Nyota Tatu', en: 'Three Star', descSw: 'Pata nyota 3 kwenye mada yoyote.', descEn: 'Earn 3 stars in any category.' },
];

const SHOP_ITEMS = [
  { id: 'theme-ocean', type: 'theme', cost: 80, sw: 'Mandhari ya Bahari', en: 'Ocean Theme', descSw: 'Rangi ya bluu ya pwani.', descEn: 'A coastal blue accent theme.' },
  { id: 'theme-savanna', type: 'theme', cost: 80, sw: 'Mandhari ya Savana', en: 'Savanna Theme', descSw: 'Rangi ya njano ya savana.', descEn: 'A warm savanna accent theme.' },
  { id: 'theme-kilimanjaro', type: 'theme', cost: 120, sw: 'Mandhari ya Kilimanjaro', en: 'Kilimanjaro Theme', descSw: 'Rangi safi za mlima na anga.', descEn: 'Cool mountain and sky colors.' },
  { id: 'theme-zanzibar', type: 'theme', cost: 120, sw: 'Mandhari ya Zanzibar', en: 'Zanzibar Theme', descSw: 'Rangi za pwani, viungo, na jua.', descEn: 'Coastal spice-island colors.' },
  { id: 'theme-dar', type: 'theme', cost: 140, sw: 'Mandhari ya Dar', en: 'Dar Theme', descSw: 'Rangi za jiji na usiku wa pwani.', descEn: 'City-night coastal colors.' },
  { id: 'badge-gold', type: 'badge', cost: 60, sw: 'Fremu ya Dhahabu', en: 'Gold Badge Frame', descSw: 'Pamba beji zako kwa dhahabu.', descEn: 'Dress your badges with a gold frame.' },
  { id: 'badge-kanga', type: 'badge', cost: 90, sw: 'Fremu ya Kanga', en: 'Kanga Badge Frame', descSw: 'Mwonekano wa kanga kwa beji.', descEn: 'A kanga-style badge frame.' },
  { id: 'trail-spark', type: 'effect', cost: 110, sw: 'Mwangaza wa Neno', en: 'Word Spark Trail', descSw: 'Mwangaza mdogo ukipata neno.', descEn: 'A small spark effect when finding words.' },
];

window.NenoSafariContent = {
  CATEGORIES,
  DAILY_WORDS,
  WODS,
  ENCOURAGEMENTS,
  EXTRA_WORDS,
  ADVANCED_WORDS,
  BADGE_DEFS,
  SHOP_ITEMS,
};
})();
