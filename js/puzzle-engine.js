(function () {
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [1, 1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  function seededRandom(seed) {
    let value = seed >>> 0;
    return function nextRandom() {
      value = (value * 1664525 + 1013904223) >>> 0;
      return value / 4294967296;
    };
  }

  function dateSeed(date = new Date()) {
    return Number(`${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`);
  }

  function shuffleWithRng(items, rng = Math.random) {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function allowedDirections(difficulty) {
    if (difficulty === 'rahisi') return [[0, 1], [1, 0]];
    if (difficulty === 'kati') return [[0, 1], [1, 0], [1, 1], [0, -1]];
    return DIRECTIONS;
  }

  function generateGrid(words, size, difficulty = 'kati', rng = Math.random) {
    const grid = Array.from({ length: size }, () => Array(size).fill(''));
    const placements = [];
    const dirs = allowedDirections(difficulty);
    const sortedWords = [...words].sort((a, b) => b.sw.length - a.sw.length);

    for (const wordObj of sortedWords) {
      const word = wordObj.sw.replace(/\s+/g, '');
      let placed = false;

      for (let attempt = 0; attempt < 200 && !placed; attempt++) {
        const [dr, dc] = dirs[Math.floor(rng() * dirs.length)];
        const len = word.length;
        const rowStart = dr === 1 ? 0 : (dr === -1 ? len - 1 : 0);
        const rowEnd = dr === 1 ? size - len : (dr === -1 ? size - 1 : size - 1);
        const colStart = dc === 1 ? 0 : (dc === -1 ? len - 1 : 0);
        const colEnd = dc === 1 ? size - len : (dc === -1 ? size - 1 : size - 1);

        if (rowStart > rowEnd || colStart > colEnd) continue;

        const r = rowStart + Math.floor(rng() * (rowEnd - rowStart + 1));
        const c = colStart + Math.floor(rng() * (colEnd - colStart + 1));
        const cells = [];
        let valid = true;

        for (let i = 0; i < len; i++) {
          const nr = r + i * dr;
          const nc = c + i * dc;
          if (nr < 0 || nr >= size || nc < 0 || nc >= size) {
            valid = false;
            break;
          }
          if (grid[nr][nc] !== '' && grid[nr][nc] !== word[i]) {
            valid = false;
            break;
          }
          cells.push([nr, nc]);
        }

        if (valid) {
          cells.forEach(([nr, nc], i) => {
            grid[nr][nc] = word[i];
          });
          placements.push({ word, wordObj, cells, direction: [dr, dc] });
          placed = true;
        }
      }
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === '') {
          grid[r][c] = ALPHABET[Math.floor(rng() * ALPHABET.length)];
        }
      }
    }

    return { grid, placements };
  }

  window.NenoSafariEngine = {
    seededRandom,
    dateSeed,
    shuffleWithRng,
    allowedDirections,
    generateGrid,
  };
})();
