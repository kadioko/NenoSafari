(function () {
  const DAY_MS = 24 * 60 * 60 * 1000;
  const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 60];

  function asDate(value) {
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function normalizeSavedWord(word, now = new Date()) {
    const current = asDate(now) || new Date();
    const nextReview = asDate(word?.nextReviewAt);
    return {
      ...word,
      reviewed: Math.max(0, Number(word?.reviewed) || 0),
      reviewLevel: Math.max(0, Math.floor(Number(word?.reviewLevel) || 0)),
      nextReviewAt: (nextReview || current).toISOString(),
      lastReviewed: asDate(word?.lastReviewed)?.toISOString() || '',
    };
  }

  function isDue(word, now = new Date()) {
    const current = asDate(now) || new Date();
    const nextReview = asDate(word?.nextReviewAt);
    return !nextReview || nextReview.getTime() <= current.getTime();
  }

  function scheduleReview(word, rating, now = new Date()) {
    const current = asDate(now) || new Date();
    const normalized = normalizeSavedWord(word, current);
    let reviewLevel = normalized.reviewLevel;
    let delayMs = 10 * 60 * 1000;

    if (rating === 'hard') {
      delayMs = DAY_MS;
    } else if (rating === 'got') {
      reviewLevel = Math.min(reviewLevel + 1, REVIEW_INTERVAL_DAYS.length);
      delayMs = REVIEW_INTERVAL_DAYS[Math.max(0, reviewLevel - 1)] * DAY_MS;
    } else {
      reviewLevel = 0;
    }

    return {
      ...normalized,
      reviewed: normalized.reviewed + 1,
      reviewLevel,
      lastReviewed: current.toISOString(),
      nextReviewAt: new Date(current.getTime() + delayMs).toISOString(),
    };
  }

  function compareReviewPriority(a, b, now = new Date()) {
    const aDue = isDue(a, now);
    const bDue = isDue(b, now);
    if (aDue !== bDue) return aDue ? -1 : 1;
    const aTime = asDate(a?.nextReviewAt)?.getTime() || 0;
    const bTime = asDate(b?.nextReviewAt)?.getTime() || 0;
    if (aTime !== bTime) return aTime - bTime;
    return (Number(a?.reviewed) || 0) - (Number(b?.reviewed) || 0);
  }

  function dueCount(words, now = new Date()) {
    return (words || []).filter(word => isDue(word, now)).length;
  }

  function dueLabel(word, language = 'sw', now = new Date()) {
    const current = asDate(now) || new Date();
    const nextReview = asDate(word?.nextReviewAt);
    if (!nextReview || nextReview.getTime() <= current.getTime()) {
      return language === 'en' ? 'Due now' : 'Ni wakati wa kurudia';
    }
    const days = Math.max(1, Math.ceil((nextReview.getTime() - current.getTime()) / DAY_MS));
    if (days === 1) return language === 'en' ? 'Due tomorrow' : 'Rudia kesho';
    return language === 'en' ? `Due in ${days} days` : `Rudia baada ya siku ${days}`;
  }

  window.NenoSafariReviewScheduler = {
    REVIEW_INTERVAL_DAYS,
    normalizeSavedWord,
    isDue,
    scheduleReview,
    compareReviewPriority,
    dueCount,
    dueLabel,
  };
})();
