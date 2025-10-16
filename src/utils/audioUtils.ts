// Audio context singleton
let audioContext: AudioContext | null = null;
let masterGainNode: GainNode | null = null;
let analyserNode: AnalyserNode | null = null;

// Initialize or get audio context
export const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

// Get or create a master gain node
export const getMasterGain = (volume: number = 0.7): GainNode => {
  const ctx = getAudioContext();
  
  if (!masterGainNode) {
    masterGainNode = ctx.createGain();
    
    // Create analyser node for visualizations
    if (!analyserNode) {
      analyserNode = ctx.createAnalyser();
      analyserNode.fftSize = 256;
      analyserNode.smoothingTimeConstant = 0.8;
    }
    
    // Connect: masterGain -> analyser -> destination
    masterGainNode.connect(analyserNode);
    analyserNode.connect(ctx.destination);
  }
  
  // Update the gain value using exponential ramp for smoother transition
  if (ctx.state === 'running') {
    masterGainNode.gain.setValueAtTime(masterGainNode.gain.value, ctx.currentTime);
    masterGainNode.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume), ctx.currentTime + 0.02);
  } else {
    // Fallback to direct assignment if audio context isn't running
    masterGainNode.gain.value = volume;
  }
  
  // Resume the audio context if it's suspended
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  return masterGainNode;
};

// Get the analyser node for visualizations
export const getAnalyser = (): AnalyserNode | null => {
  // Ensure the master gain is created first (which creates the analyser)
  getMasterGain();
  return analyserNode;
};

// Base drum sounds
export const playKick = (masterGain?: GainNode) => {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
  
  gain.gain.setValueAtTime(1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
  
  osc.connect(gain);
  gain.connect(masterGain || ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.5);
};

export const playSnare = (masterGain?: GainNode) => {
  const ctx = getAudioContext();
  const noise = ctx.createBufferSource();
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  
  const gain = ctx.createGain();
  
  // Fill buffer with noise
  for (let i = 0; i < noiseBuffer.length; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }
  
  noise.buffer = noiseBuffer;
  
  gain.gain.setValueAtTime(1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
  
  noise.connect(gain);
  gain.connect(masterGain || ctx.destination);
  
  noise.start(ctx.currentTime);
};

export const playHiHat = (masterGain?: GainNode) => {
  const ctx = getAudioContext();
  const noise = ctx.createBufferSource();
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  
  const gain = ctx.createGain();
  const highpass = ctx.createBiquadFilter();
  
  // Fill buffer with noise
  for (let i = 0; i < noiseBuffer.length; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }
  
  noise.buffer = noiseBuffer;
  
  highpass.type = "highpass";
  highpass.frequency.value = 8000;
  
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  
  noise.connect(highpass);
  highpass.connect(gain);
  gain.connect(masterGain || ctx.destination);
  
  noise.start(ctx.currentTime);
};

// Play an epic EDM-style boom/drop sound
export const playDrop = (noteDuration: number = 0.5, masterGain?: GainNode) => {
  const ctx = getAudioContext();
  
  // Create compressor for punch and impact
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -24;
  compressor.knee.value = 4;
  compressor.ratio.value = 12;
  compressor.attack.value = 0.003;
  compressor.release.value = 0.25;
  
  // Create final gain node
  const masterDropGain = ctx.createGain();
  masterDropGain.gain.value = 0.9; // Overall volume
  
  // Full duration with reverb tail
  const fullDuration = noteDuration * 1.5;
  
  // ======= SUB LAYER (deep sub-bass) =======
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  
  subOsc.type = "sine";
  // Start with a lower frequency for deeper sub-bass
  subOsc.frequency.setValueAtTime(55, ctx.currentTime); // A1 note
  subOsc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + noteDuration);
  
  // Sub-bass envelope - quick attack, longer decay
  subGain.gain.setValueAtTime(0, ctx.currentTime);
  subGain.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 0.01);
  subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + fullDuration);
  
  subOsc.connect(subGain);
  subGain.connect(compressor);
  
  // ======= MID LAYER (body and character) =======
  const midOsc = ctx.createOscillator();
  const midGain = ctx.createGain();
  const midFilter = ctx.createBiquadFilter();
  
  midOsc.type = "sawtooth";
  midOsc.frequency.setValueAtTime(110, ctx.currentTime); // A2 note
  midOsc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + noteDuration * 0.8);
  
  // Mid-layer filter
  midFilter.type = "lowpass";
  midFilter.Q.value = 8;
  // Dramatic filter sweep
  midFilter.frequency.setValueAtTime(8000, ctx.currentTime);
  midFilter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + noteDuration * 0.1);
  midFilter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + noteDuration);
  
  // Mid layer envelope
  midGain.gain.setValueAtTime(0, ctx.currentTime);
  midGain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.01);
  midGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + noteDuration * 0.9);
  
  midOsc.connect(midFilter);
  midFilter.connect(midGain);
  midGain.connect(compressor);
  
  // ======= NOISE LAYER (for texture and impact) =======
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * fullDuration, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  
  // Fill buffer with noise
  for (let i = 0; i < noiseBuffer.length; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }
  
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 2000;
  noiseFilter.Q.value = 1;
  
  const noiseGain = ctx.createGain();
  // Noise layer fades out quickly
  noiseGain.gain.setValueAtTime(0.3, ctx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + noteDuration * 0.3);
  
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(compressor);
  
  // ======= WOBBLE MODULATION (characteristic of EDM) =======
  const modulator = ctx.createOscillator();
  const modulatorGain = ctx.createGain();
  
  // Faster modulation for wobble effect
  modulator.frequency.value = 8 + (noteDuration * 5); // Faster for shorter notes
  modulatorGain.gain.value = 50; // Modulation amount
  
  // Connect modulator to mid-layer frequency for wobble
  modulator.connect(modulatorGain);
  modulatorGain.connect(midOsc.frequency);
  
  // ======= REVERB SIMULATION (for spaciousness) =======
  // Using a feedback delay network for reverb-like effect
  const delay = ctx.createDelay(fullDuration);
  delay.delayTime.value = 0.1;
  
  const delayGain = ctx.createGain();
  delayGain.gain.value = 0.3;
  
  const delayFilter = ctx.createBiquadFilter();
  delayFilter.type = "lowpass";
  delayFilter.frequency.value = 1000;
  
  compressor.connect(delay);
  delay.connect(delayFilter);
  delayFilter.connect(delayGain);
  delayGain.connect(delay); // Feedback
  delayGain.connect(masterDropGain);
  
  // Direct signal path
  compressor.connect(masterDropGain);
  masterDropGain.connect(masterGain || ctx.destination);
  
  // Start everything
  const startTime = ctx.currentTime;
  subOsc.start(startTime);
  midOsc.start(startTime);
  noise.start(startTime);
  modulator.start(startTime);
  
  // Stop oscillators
  subOsc.stop(startTime + fullDuration);
  midOsc.stop(startTime + fullDuration);
  modulator.stop(startTime + fullDuration);
  
  // Fade out the master gain to avoid clicks
  masterDropGain.gain.setValueAtTime(masterDropGain.gain.value, startTime + fullDuration - 0.05);
  masterDropGain.gain.linearRampToValueAtTime(0, startTime + fullDuration);
};

// A Minor pentatonic scale frequencies - 6 notes
const AMinorPentatonicNotes = [
  220.00,  // Note 1
  261.63,  // Note 2
  293.66,  // Note 3
  329.63,  // Note 4
  392.00,  // Note 5
  440.00   // Note 6
];

// Play a synth tone at the specified note index (0-5)
export const playSynth = (noteIndex: number, masterGain?: GainNode) => {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(AMinorPentatonicNotes[noteIndex], ctx.currentTime);
  
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  
  osc.connect(gain);
  gain.connect(masterGain || ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
};

// Play a bass note at the specified note index (0-5)
export const playBass = (noteIndex: number, masterGain?: GainNode) => {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = "triangle";
  // Set bass one octave lower than synth
  osc.frequency.setValueAtTime(AMinorPentatonicNotes[noteIndex] / 2, ctx.currentTime);
  
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  
  osc.connect(gain);
  gain.connect(masterGain || ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.4);
};

// Play a string/violin note at the specified note index (0-5)
export const playStrings = (noteIndex: number, masterGain?: GainNode) => {
  const ctx = getAudioContext();
  
  // Duration for violin sound
  const noteDuration = 1.2;
  
  // Create the primary oscillator
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const lfo = ctx.createOscillator();
  
  // Create gain nodes for envelope and vibrato
  const mainGain = ctx.createGain();
  const lfoGain = ctx.createGain();
  const modGain = ctx.createGain();
  
  // Set oscillator types for a layered string sound
  osc1.type = "sine";
  osc2.type = "triangle";
  lfo.type = "sine";
  
  // Get the base frequency from the scale
  const baseFreq = AMinorPentatonicNotes[noteIndex];
  
  // Set frequencies - we'll layer these for richness
  osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
  osc2.frequency.setValueAtTime(baseFreq, ctx.currentTime);
  
  // Set vibrato rate - typical violin vibrato is 5-7 Hz
  lfo.frequency.value = 6;
  lfoGain.gain.value = 3; // Vibrato depth
  
  // Connect the vibrato LFO to oscillator frequency
  lfo.connect(lfoGain);
  lfoGain.connect(osc1.frequency);
  lfoGain.connect(osc2.frequency);
  
  // Envelope for string-like attack and sustain
  mainGain.gain.setValueAtTime(0, ctx.currentTime);
  // Slow attack for bowed sound
  mainGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.1);
  // Sustain with slight decay
  mainGain.gain.setValueAtTime(0.35, ctx.currentTime + 0.1);
  mainGain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.3);
  // Release
  mainGain.gain.setValueAtTime(0.3, ctx.currentTime + noteDuration - 0.5);
  mainGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + noteDuration);
  
  // Add a slight modulation at 2x the frequency for harmonics
  const mod = ctx.createOscillator();
  mod.type = "sine";
  mod.frequency.setValueAtTime(baseFreq * 2, ctx.currentTime);
  modGain.gain.value = 0.15; // Subtle harmonics
  
  // Filter to shape the tone
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1200; // Cut some high frequencies for warmer tone
  filter.Q.value = 0.7;
  
  // Reverb simulation
  const convolver = ctx.createConvolver();
  const reverbBuffer = createReverbBuffer(ctx, 1.5);
  convolver.buffer = reverbBuffer;
  
  const reverbGain = ctx.createGain();
  reverbGain.gain.value = 0.25; // Reverb mix level
  
  // Connect everything
  osc1.connect(mainGain);
  osc2.connect(mainGain);
  mod.connect(modGain);
  modGain.connect(mainGain);
  
  mainGain.connect(filter);
  filter.connect(ctx.createGain()).connect(masterGain || ctx.destination);
  
  // Add reverb in parallel
  filter.connect(convolver);
  convolver.connect(reverbGain);
  reverbGain.connect(masterGain || ctx.destination);
  
  // Start and stop
  const startTime = ctx.currentTime;
  osc1.start(startTime);
  osc2.start(startTime);
  lfo.start(startTime);
  mod.start(startTime);
  
  osc1.stop(startTime + noteDuration);
  osc2.stop(startTime + noteDuration);
  lfo.stop(startTime + noteDuration);
  mod.stop(startTime + noteDuration);
};

// Helper function to create a simple reverb buffer
function createReverbBuffer(context: AudioContext, duration: number): AudioBuffer {
  const sampleRate = context.sampleRate;
  const length = sampleRate * duration;
  const impulse = context.createBuffer(2, length, sampleRate);
  const leftChannel = impulse.getChannelData(0);
  const rightChannel = impulse.getChannelData(1);
  
  for (let i = 0; i < length; i++) {
    // Exponential decay for reverb
    const decay = Math.pow(1 - i / length, 2);
    // Random values for diffusion
    leftChannel[i] = (Math.random() * 2 - 1) * decay;
    rightChannel[i] = (Math.random() * 2 - 1) * decay;
  }
  
  return impulse;
}