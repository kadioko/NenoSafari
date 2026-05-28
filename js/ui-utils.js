(function () {
  function displayWord(wordObj) {
    if (wordObj.display) return wordObj.display;
    if (Array.isArray(wordObj.parts) && wordObj.parts.length) return wordObj.parts.join(' ');
    return wordObj.sw;
  }

  function dailyKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function previousDailyKey(key) {
    const [year, month, day] = key.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() - 1);
    return dailyKey(date);
  }

  function audioFileForWord(wordObj) {
    return `audio/${wordObj.sw.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.mp3`;
  }

  function getPronunciation(word) {
    const manual = {
      UGALI: 'oo-GAH-lee',
      PILAU: 'pee-LAU',
      WALI: 'WAH-lee',
      NYAMA: 'NYAH-mah',
      SAMAKI: 'sah-MAH-kee',
      NDIZI: 'n-DEE-zee',
      CHIPSI: 'CHEEP-see',
      MAHARAGE: 'mah-hah-RAH-geh',
      MCHICHA: 'm-CHEE-chah',
      KACHUMBARI: 'kah-choom-BAH-ree',
      MBOGA: 'm-BOH-gah',
      KARANGA: 'kah-RAHN-gah',
      VITUMBUA: 'vee-toom-BOO-ah',
      MIHOGO: 'mee-HOH-goh',
      VIAZI: 'vee-AH-zee',
      DARESSALAAM: 'dah-reh-s-sah-LAHM',
      ARUSHA: 'ah-ROO-shah',
      MWANZA: 'MWAHN-zah',
      DODOMA: 'doh-DOH-mah',
      MBEYA: 'm-BEH-yah',
      MOROGORO: 'moh-roh-GOH-roh',
      TANGA: 'TAHN-gah',
      KIGOMA: 'kee-GOH-mah',
      MOSHI: 'MOH-shee',
      IRINGA: 'ee-REEN-gah',
      LINDI: 'LEEN-dee',
      TABORA: 'tah-BOH-rah',
      BAGAMOYO: 'bah-gah-MOH-yoh',
      SONGEA: 'sohn-GEH-ah',
      SIMBA: 'SEEM-bah',
      TEMBO: 'TEHM-boh',
      TWIGA: 'TWEE-gah',
      NYATI: 'NYAH-tee',
      CHUI: 'CHOO-ee',
      KIFARU: 'kee-FAH-roo',
      NYUMBU: 'NYOOM-boo',
      FISI: 'FEE-see',
      NYANI: 'NYAH-nee',
      TAUSI: 'tah-OO-see',
      KOBE: 'KOH-beh',
      MAMBA: 'MAHM-bah',
      CHURA: 'CHOO-rah',
      KIMA: 'KEE-mah',
      HABARI: 'hah-BAH-ree',
      MAMBO: 'MAHM-boh',
      POA: 'POH-ah',
      KARIBU: 'kah-REE-boo',
      ASANTE: 'ah-SAHN-teh',
      SAMAHANI: 'sah-mah-HAH-nee',
      NDIYO: 'n-DEE-yoh',
      HAPANA: 'hah-PAH-nah',
      TAFADHALI: 'tah-fah-DHAH-lee',
      SHIKAMOO: 'shee-kah-MOH',
      MARAHABA: 'mah-rah-HAH-bah',
      SAFI: 'SAH-fee',
      TUTAONANA: 'too-tah-oh-NAH-nah',
      SHUKRANI: 'shoo-KRAH-nee',
      NASHUKURU: 'nah-shoo-KOO-roo',
      KWAHERI: 'kwah-HEH-ree',
      MAMA: 'MAH-mah',
      BABA: 'BAH-bah',
      DADA: 'DAH-dah',
      KAKA: 'KAH-kah',
      MTOTO: 'm-TOH-toh',
      BABU: 'BAH-boo',
      BIBI: 'BEE-bee',
      MJOMBA: 'm-JOHM-bah',
      SHANGAZI: 'shahn-GAH-zee',
      BINAMU: 'bee-NAH-moo',
      SHEMEJI: 'sheh-MEH-jee',
      MPWA: 'm-PWAH',
      FAMILIA: 'fah-MEE-lee-ah',
      WAZAZI: 'wah-ZAH-zee',
      WAJUKUU: 'wah-joo-KOO',
      SOKO: 'SOH-koh',
      DUKA: 'DOO-kah',
      BEI: 'BEH-ee',
      PESA: 'PEH-sah',
      NUNUA: 'noo-NOO-ah',
      UZA: 'OO-zah',
      BIDHAA: 'bee-DHAA',
      FAIDA: 'fah-EE-dah',
      HASARA: 'hah-SAH-rah',
      MTEJA: 'm-TEH-jah',
      RISITI: 'ree-SEE-tee',
      CHENJI: 'CHEHN-jee',
      KIPIMO: 'kee-PEE-moh',
      MTAJI: 'm-TAH-jee',
      MNADA: 'm-NAH-dah',
      GARI: 'GAH-ree',
      BASI: 'BAH-see',
      DALADALA: 'dah-lah-DAH-lah',
      BODA: 'BOH-dah',
      BAJAJI: 'bah-JAH-jee',
      NDEGE: 'n-DEH-geh',
      TRENI: 'TREH-nee',
      BANDARI: 'bahn-DAH-ree',
      BARABARA: 'bah-rah-BAH-rah',
      SAFARI: 'sah-FAH-ree',
      ABIRIA: 'ah-BEE-ree-ah',
      KITUO: 'kee-TOO-oh',
      NAULI: 'nah-OO-lee',
      UWANJA: 'oo-WAHN-jah',
      KIVUKO: 'kee-VOO-koh',
      JUA: 'JOO-ah',
      MVUA: 'm-VOO-ah',
      UPEPO: 'oo-PEH-poh',
      BAHARI: 'bah-HAH-ree',
      MLIMA: 'm-LEE-mah',
      MTO: 'm-TOH',
      ZIWA: 'ZEE-wah',
      MSITU: 'm-SEE-too',
      JOTO: 'JOH-toh',
      BARIDI: 'bah-REE-dee',
      MAWINGU: 'mah-WEEN-goo',
      KISIWA: 'kee-SEE-wah',
      BONDE: 'BOHN-deh',
      MAPOROMOKO: 'mah-poh-roh-MOH-koh',
      NYANDA: 'NYAHN-dah',
      NGOMA: 'n-GOH-mah',
      KANGA: 'KAHN-gah',
      KITENGE: 'kee-TEHN-geh',
      TAARAB: 'tah-AH-rahb',
      BONGO: 'BOHN-goh',
      HARUSI: 'hah-ROO-see',
      SHEREHE: 'sheh-REH-heh',
      MILA: 'MEE-lah',
      LUGHA: 'LOO-ghah',
      TAIFA: 'tah-EE-fah',
      METHALI: 'meh-THAH-lee',
      JANDO: 'JAHN-doh',
      MAPISHI: 'mah-PEE-shee',
      USHAIRI: 'oo-SHAH-ee-ree',
      VYOMBO: 'VYOHM-boh',
      UHURU: 'oo-HOO-roo',
      MUUNGANO: 'moo-oon-GAH-noh',
      BENDERA: 'behn-DEH-rah',
      RAIS: 'rah-EES',
      WANANCHI: 'wah-NAHN-chee',
      SERIKALI: 'seh-ree-KAH-lee',
      KATIBA: 'kah-TEE-bah',
      AMANI: 'ah-MAH-nee',
      MAENDELEO: 'mah-ehn-deh-LEH-oh',
      IKULU: 'ee-KOO-loo',
      BUNGE: 'BOON-geh',
      KURA: 'KOO-rah',
      AZIMIO: 'ah-ZEE-mee-oh',
      URITHI: 'oo-REE-thee',
      KILIMANJARO: 'kee-lee-mahn-JAH-roh',
      ZANZIBAR: 'zahn-zee-BAHR',
      PUNDAMILIA: 'poon-dah-MEE-lee-ah',
    };
    const key = word.replace(/\s+/g, '').toUpperCase();
    if (manual[key]) return manual[key];
    return key.toLowerCase()
      .replace(/ng/g, 'ng')
      .replace(/ny/g, 'ny')
      .replace(/ch/g, 'ch')
      .replace(/sh/g, 'sh')
      .replace(/dh/g, 'dh')
      .replace(/gh/g, 'gh')
      .replace(/([bcdfghjklmnpqrstvwxyz])([aeiou])/g, '$1-$2')
      .replace(/a/g, 'ah')
      .replace(/e/g, 'eh')
      .replace(/i/g, 'ee')
      .replace(/o/g, 'oh')
      .replace(/u/g, 'oo')
      .replace(/-/g, '');
  }

  window.NenoSafariUiUtils = {
    audioFileForWord,
    dailyKey,
    displayWord,
    getPronunciation,
    previousDailyKey,
  };
})();
