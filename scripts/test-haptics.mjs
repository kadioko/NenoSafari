import fs from 'node:fs';
import vm from 'node:vm';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const nativeCalls = [];
const nativeSandbox = {
  window: {
    Capacitor: {
      Plugins: {
        Haptics: {
          impact: async options => nativeCalls.push(['impact', options]),
          notification: async options => nativeCalls.push(['notification', options]),
        },
      },
    },
  },
  navigator: { vibrate: () => false },
};
vm.runInNewContext(fs.readFileSync('js/haptics.js', 'utf8'), nativeSandbox);

await nativeSandbox.window.NenoSafariHaptics.trigger({ haptics: true }, 'success');
assert(nativeCalls[0]?.[0] === 'notification', 'Success should use native notification feedback');
assert(nativeCalls[0]?.[1]?.type === 'SUCCESS', 'Success should use the native success type');

await nativeSandbox.window.NenoSafariHaptics.trigger({ haptics: true }, 'miss');
assert(nativeCalls[1]?.[0] === 'impact', 'A miss should use native impact feedback');

await nativeSandbox.window.NenoSafariHaptics.trigger({ haptics: false }, 'complete');
assert(nativeCalls.length === 2, 'Disabled haptics should not call the native plugin');

const fallbackCalls = [];
const fallbackSandbox = {
  window: {},
  navigator: { vibrate: pattern => fallbackCalls.push(pattern) },
};
vm.runInNewContext(fs.readFileSync('js/haptics.js', 'utf8'), fallbackSandbox);
await fallbackSandbox.window.NenoSafariHaptics.trigger({}, 'reward');
assert(Array.isArray(fallbackCalls[0]), 'Web fallback should use a vibration pattern');

console.log('Haptics tests OK');
