import { ref } from 'vue';

/** Sound is on by default; the browser only plays it after the first user gesture. */
const enabled = ref(true);
let context: AudioContext | null = null;
let noise: AudioBuffer | null = null;

const TURN_DURATION_S = 0.55;

function getContext(): AudioContext | null {
  if (!context) {
    if (!('AudioContext' in window)) return null;
    context = new AudioContext();
  }
  return context;
}

/** One shared buffer of white noise, shaped into a paper rustle by the filter and envelope. */
function getNoise(ctx: AudioContext): AudioBuffer {
  if (!noise || noise.sampleRate !== ctx.sampleRate) {
    const length = Math.floor(ctx.sampleRate * TURN_DURATION_S);
    noise = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noise;
}

/** Synthesised page-turn sound, so no audio asset has to be shipped. */
export function usePageSound() {
  function playPageTurn() {
    if (!enabled.value) return;
    const ctx = getContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') void ctx.resume();

    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    source.buffer = getNoise(ctx);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2400;
    filter.Q.value = 0.7;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + TURN_DURATION_S);

    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start(now);
    source.stop(now + TURN_DURATION_S);
  }

  function toggleSound() {
    enabled.value = !enabled.value;
  }

  return { soundEnabled: enabled, playPageTurn, toggleSound };
}
