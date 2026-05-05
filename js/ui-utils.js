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
      SAMAKI: 'sah-MAH-kee',
      KACHUMBARI: 'kah-choom-BAH-ree',
      KARIBU: 'kah-REE-boo',
      ASANTE: 'ah-SAHN-teh',
      SHIKAMOO: 'shee-kah-MOH',
      KWAHERI: 'kwah-HEH-ree',
      DALADALA: 'dah-lah-DAH-lah',
      BAJAJI: 'bah-JAH-jee',
      KILIMANJARO: 'kee-lee-mahn-JAH-roh',
      ZANZIBAR: 'zahn-zee-BAHR',
      PUNDAMILIA: 'poon-dah-MEE-lee-ah',
    };
    const key = word.replace(/\s+/g, '').toUpperCase();
    if (manual[key]) return manual[key];
    return key.toLowerCase()
      .replace(/a/g, 'ah')
      .replace(/e/g, 'eh')
      .replace(/i/g, 'ee')
      .replace(/o/g, 'oh')
      .replace(/u/g, 'oo');
  }

  window.NenoSafariUiUtils = {
    audioFileForWord,
    dailyKey,
    displayWord,
    getPronunciation,
    previousDailyKey,
  };
})();
