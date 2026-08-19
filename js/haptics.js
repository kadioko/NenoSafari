(function () {
  const FALLBACK_PATTERNS = {
    selection: 10,
    miss: 16,
    success: [12, 24, 12],
    reward: [18, 35, 24],
    complete: [20, 35, 30, 45, 45],
  };

  async function trigger(settings = {}, kind = 'selection') {
    if (settings.haptics === false) return false;

    const plugin = window.Capacitor?.Plugins?.Haptics;
    try {
      if (plugin) {
        if (kind === 'success' || kind === 'reward' || kind === 'complete') {
          await plugin.notification({ type: 'SUCCESS' });
        } else {
          await plugin.impact({ style: kind === 'miss' ? 'MEDIUM' : 'LIGHT' });
        }
        return true;
      }

      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate(FALLBACK_PATTERNS[kind] || FALLBACK_PATTERNS.selection);
        return true;
      }
    } catch {
      // Haptics are optional and should never interrupt play.
    }
    return false;
  }

  window.NenoSafariHaptics = { trigger };
})();
