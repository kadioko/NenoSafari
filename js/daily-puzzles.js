(function () {
  const DAILY_PUZZLE_SETS = [
    {
      id: 'kilimanjaro',
      name: 'Kilimanjaro na Kaskazini',
      words: [
        { sw: 'KILELE', en: 'Peak / summit', ex: 'Kilele cha Kilimanjaro ni juu sana.', note: 'Kilimanjaro ni mlima mrefu zaidi Afrika.' },
        { sw: 'MOSHI', en: 'Town near Kilimanjaro', ex: 'Moshi iko chini ya Mlima Kilimanjaro.' },
        { sw: 'ARUSHA', en: 'Northern safari city', ex: 'Arusha ni lango la safari nyingi.' },
        { sw: 'SAFARI', en: 'Journey / trip', ex: 'Tunaenda safari ya Arusha.' },
        { sw: 'MLIMA', en: 'Mountain', ex: 'Mlima una theluji juu.' },
        { sw: 'KAHAWA', en: 'Coffee', ex: 'Kahawa ya Kilimanjaro ni maarufu.' },
      ],
    },
    {
      id: 'zanzibar',
      name: 'Zanzibar na Pwani',
      words: [
        { sw: 'ZANZIBAR', en: 'Island famous for spices', ex: 'Zanzibar ina pwani nzuri.' },
        { sw: 'BAHARI', en: 'Ocean / sea', ex: 'Bahari ya Hindi ni kubwa.' },
        { sw: 'PWANI', en: 'Coast / beach', ex: 'Pwani ina upepo mzuri.' },
        { sw: 'TAARAB', en: 'Swahili coastal music', ex: 'Taarab hupigwa Zanzibar.' },
        { sw: 'KARAFUU', en: 'Cloves', ex: 'Karafuu ni kiungo cha Zanzibar.' },
        { sw: 'KISIWA', en: 'Island', ex: 'Kisiwa kina historia ndefu.' },
      ],
    },
    {
      id: 'serengeti',
      name: 'Serengeti na Wanyama',
      words: [
        { sw: 'SERENGETI', en: 'Famous national park', ex: 'Serengeti ina wanyama wengi.' },
        { sw: 'SIMBA', en: 'Lion', ex: 'Simba anaishi mbugani.' },
        { sw: 'TWIGA', en: 'Giraffe', ex: 'Twiga anakula majani.' },
        { sw: 'NYUMBU', en: 'Wildebeest', ex: 'Nyumbu wanahamia kila mwaka.' },
        { sw: 'TEMBO', en: 'Elephant', ex: 'Tembo anakunywa maji.' },
        { sw: 'MBUGA', en: 'Wildlife park / plains', ex: 'Mbuga ina nyasi nyingi.' },
      ],
    },
    {
      id: 'dar',
      name: 'Dar es Salaam',
      words: [
        { sw: 'DARESSALAAM', display: 'Dar es Salaam', en: 'Tanzania largest city', ex: 'Dar es Salaam ni jiji la biashara.' },
        { sw: 'BANDARI', en: 'Port / harbour', ex: 'Bandari ya Dar es Salaam ni kubwa.' },
        { sw: 'DALADALA', en: 'Minibus transport', ex: 'Daladala ni usafiri wa kawaida.' },
        { sw: 'SOKO', en: 'Market', ex: 'Soko lina watu wengi.' },
        { sw: 'BIASHARA', en: 'Business', ex: 'Biashara nyingi ziko mjini.' },
        { sw: 'BAJAJI', en: 'Three-wheeled taxi', ex: 'Bajaji inafika haraka.' },
      ],
    },
    {
      id: 'taifa',
      name: 'Taifa na Historia',
      words: [
        { sw: 'UHURU', en: 'Independence / freedom', ex: 'Uhuru ni jambo muhimu.' },
        { sw: 'MUUNGANO', en: 'Union', ex: 'Muungano ulianza mwaka 1964.' },
        { sw: 'BENDERA', en: 'Flag', ex: 'Bendera ina rangi nne.' },
        { sw: 'AMANI', en: 'Peace', ex: 'Tanzania inajulikana kwa amani.' },
        { sw: 'TAIFA', en: 'Nation', ex: 'Taifa letu ni zuri.' },
        { sw: 'LUGHA', en: 'Language', ex: 'Kiswahili ni lugha ya taifa.' },
      ],
    },
    {
      id: 'sokoni',
      name: 'Sokoni na Biashara',
      words: [
        { sw: 'SOKO', en: 'Market', ex: 'Mama anaenda sokoni kununua mboga.' },
        { sw: 'BEI', en: 'Price', ex: 'Bei ya ndizi ni nzuri leo.' },
        { sw: 'PESA', en: 'Money', ex: 'Nina pesa za kununua matunda.' },
        { sw: 'MTEJA', en: 'Customer', ex: 'Mteja anauliza bei ya mchele.' },
        { sw: 'DUKA', en: 'Shop', ex: 'Duka limefunguliwa asubuhi.' },
        { sw: 'FAIDA', en: 'Profit / benefit', ex: 'Mfanyabiashara anapata faida.' },
      ],
    },
    {
      id: 'usafiri',
      name: 'Usafiri wa Kila Siku',
      words: [
        { sw: 'GARI', en: 'Car', ex: 'Gari linaenda mjini.' },
        { sw: 'BASI', en: 'Bus', ex: 'Basi limesimama kituoni.' },
        { sw: 'BODA', en: 'Motorbike taxi', ex: 'Boda inafika haraka.' },
        { sw: 'TRENI', en: 'Train', ex: 'Treni inaondoka stesheni.' },
        { sw: 'NAULI', en: 'Fare', ex: 'Nauli ya basi ni shilingi ngapi?' },
        { sw: 'SAFARI', en: 'Journey', ex: 'Safari ya leo ni fupi.' },
      ],
    },
    {
      id: 'mazungumzo',
      name: 'Salamu na Mazungumzo',
      words: [
        { sw: 'HABARI', en: 'News / hello', ex: 'Habari za asubuhi?' },
        { sw: 'MAMBO', en: 'How are things?', ex: 'Mambo vipi rafiki?' },
        { sw: 'POA', en: 'Cool / fine', ex: 'Mimi niko poa.' },
        { sw: 'ASANTE', en: 'Thank you', ex: 'Asante kwa msaada wako.' },
        { sw: 'KARIBU', en: 'Welcome', ex: 'Karibu Tanzania.' },
        { sw: 'KWAHERI', en: 'Goodbye', ex: 'Kwaheri, tutaonana kesho.' },
      ],
    },
    {
      id: 'hali-ya-hewa',
      name: 'Hali ya Hewa',
      words: [
        { sw: 'JUA', en: 'Sun', ex: 'Jua linawaka mchana.' },
        { sw: 'MVUA', en: 'Rain', ex: 'Mvua imenyesha usiku.' },
        { sw: 'UPEPO', en: 'Wind', ex: 'Upepo unatoka baharini.' },
        { sw: 'BARIDI', en: 'Cold', ex: 'Leo kuna baridi kidogo.' },
        { sw: 'JOTO', en: 'Heat', ex: 'Dar es Salaam kuna joto.' },
        { sw: 'MAWINGU', en: 'Clouds', ex: 'Mawingu yamefunika anga.' },
      ],
    },
    {
      id: 'utamaduni',
      name: 'Utamaduni wa Nyumbani',
      words: [
        { sw: 'KANGA', en: 'Printed cloth', ex: 'Mama amevaa kanga nzuri.' },
        { sw: 'NGOMA', en: 'Dance / drum', ex: 'Ngoma inapigwa kwenye sherehe.' },
        { sw: 'HARUSI', en: 'Wedding', ex: 'Harusi ina wageni wengi.' },
        { sw: 'MILA', en: 'Customs', ex: 'Mila nzuri huheshimiwa.' },
        { sw: 'LUGHA', en: 'Language', ex: 'Lugha hutuweka pamoja.' },
        { sw: 'SHEREHE', en: 'Celebration', ex: 'Sherehe imeanza jioni.' },
      ],
    },
  ];

  window.NenoSafariDaily = { DAILY_PUZZLE_SETS };
})();
