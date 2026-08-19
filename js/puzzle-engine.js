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

  function wordsThatFit(words, size) {
    const limit = Math.max(0, Number(size) || 0);
    return (words || []).filter(word => String(word?.sw || '').replace(/\s+/g, '').length <= limit);
  }

  function placementCandidates(grid, word, directions) {
    const size = grid.length;
    const candidates = [];
    for (const [dr, dc] of directions) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          let overlap = 0;
          const cells = [];
          let valid = true;
          for (let i = 0; i < word.length; i++) {
            const nr = r + i * dr;
            const nc = c + i * dc;
            if (nr < 0 || nr >= size || nc < 0 || nc >= size) {
              valid = false;
              break;
            }
            const current = grid[nr][nc];
            if (current && current !== word[i]) {
              valid = false;
              break;
            }
            if (current === word[i]) overlap++;
            cells.push([nr, nc]);
          }
          if (valid) candidates.push({ cells, direction: [dr, dc], overlap });
        }
      }
    }
    return candidates;
  }

  function placeWords(words, size, directions, rng) {
    const grid = Array.from({ length: size }, () => Array(size).fill(''));
    const placements = [];
    for (const wordObj of words) {
      const word = wordObj.sw.replace(/\s+/g, '');
      const candidates = placementCandidates(grid, word, directions);
      if (!candidates.length) continue;
      const bestOverlap = Math.max(...candidates.map(candidate => candidate.overlap));
      const preferred = candidates.filter(candidate => candidate.overlap === bestOverlap);
      const selected = preferred[Math.floor(rng() * preferred.length)];
      selected.cells.forEach(([r, c], index) => {
        grid[r][c] = word[index];
      });
      placements.push({ word, wordObj, cells: selected.cells, direction: selected.direction });
    }
    return { grid, placements };
  }

  function generateGrid(words, size, difficulty = 'kati', rng = Math.random) {
    const dirs = allowedDirections(difficulty);
    const sortedWords = [...words].sort((a, b) => b.sw.length - a.sw.length);
    let best = { grid: [], placements: [] };
    for (let attempt = 0; attempt < 10; attempt++) {
      const candidate = placeWords(sortedWords, size, dirs, rng);
      if (attempt === 0 || candidate.placements.length > best.placements.length) best = candidate;
      if (best.placements.length === sortedWords.length) break;
    }

    const { grid, placements } = best;

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
    wordsThatFit,
  };
})();
