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
  ];

  window.NenoSafariDaily = { DAILY_PUZZLE_SETS };
})();
