import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  playKick, playSnare, playHiHat, 
  playSynth, playBass, playDrop, playStrings, getAudioContext, getMasterGain
} from '../utils/audioUtils';

// Define the step sequence types
export type StepSequence = boolean[];
export type DrumSequence = {
  kick: StepSequence;
  snare: StepSequence;
  hihat: StepSequence;
};
export type InstrumentSequence = {
  drums: DrumSequence;
  bass: StepSequence[];
  synth: StepSequence[];
  drop: StepSequence[];
  strings: StepSequence[];
};

export type Instrument = 'drums' | 'bass' | 'synth' | 'drop' | 'strings';
export type Theme = 'cloudfbm' | 'forest' | 'sanddune' | 'dark' | 'light';

export type GrooveBoxContextType = {
  activeInstrument: Instrument;
  setActiveInstrument: (instrument: Instrument) => void;
  sequence: InstrumentSequence;
  toggleStep: (
    instrument: Instrument,
    row: number | keyof DrumSequence,
    step: number
  ) => void;
  isPlaying: boolean;
  togglePlayback: () => void;
  currentStep: number;
  tempo: number;
  setTempo: (tempo: number) => void;
  playDemo: () => void;
  clearSequence: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  theme: Theme;
  cycleTheme: () => void;
  currentDemoIndex: number;
};

// Create the context
const GrooveBoxContext = createContext<GrooveBoxContextType | undefined>(undefined);

// Number of steps in a pattern
const STEP_COUNT = 16;

// Create empty sequences
const createEmptyStepSequence = (): StepSequence => 
  Array(STEP_COUNT).fill(false);

const createEmptyDrumSequence = (): DrumSequence => ({
  kick: createEmptyStepSequence(),
  snare: createEmptyStepSequence(),
  hihat: createEmptyStepSequence(),
});

// Create 6 empty sequences for bass and synth
const createEmptyMelodicSequence = (): StepSequence[] => 
  Array(6).fill(null).map(() => createEmptyStepSequence());

// Create 4 empty sequences for drop effect
const createEmptyDropSequence = (): StepSequence[] => 
  Array(4).fill(null).map(() => createEmptyStepSequence());

// Demo Song 1: Classic House
const createDemo1Sequence = (): InstrumentSequence => {
  const demo: InstrumentSequence = {
    drums: {
      kick: Array(STEP_COUNT).fill(false),
      snare: Array(STEP_COUNT).fill(false),
      hihat: Array(STEP_COUNT).fill(false),
    },
    bass: createEmptyMelodicSequence(),
    synth: createEmptyMelodicSequence(),
    drop: createEmptyDropSequence(),
    strings: createEmptyMelodicSequence(),
  };
  
  // Four-on-the-floor kick pattern
  demo.drums.kick[0] = true;
  demo.drums.kick[4] = true;
  demo.drums.kick[8] = true;
  demo.drums.kick[12] = true;
  
  // Snare on 2 and 4
  demo.drums.snare[4] = true;
  demo.drums.snare[12] = true;
  
  // Hi-hat every other beat
  for (let i = 0; i < STEP_COUNT; i += 2) {
    demo.drums.hihat[i] = true;
  }
  
  // Groovy bass pattern
  demo.bass[0][0] = true;
  demo.bass[0][8] = true;
  demo.bass[1][4] = true;
  demo.bass[2][12] = true;
  
  // Melodic synth arpeggios
  demo.synth[4][2] = true;
  demo.synth[3][6] = true;
  demo.synth[2][10] = true;
  demo.synth[1][14] = true;
  
  // Drop accents
  demo.drop[0][0] = true;
  demo.drop[1][4] = true;
  demo.drop[2][8] = true;
  demo.drop[3][12] = true;
  
  // Lush strings
  demo.strings[5][0] = true;
  demo.strings[3][4] = true;
  demo.strings[4][8] = true;
  demo.strings[2][12] = true;
  
  return demo;
};

// Demo Song 2: Breakbeat Jungle
const createDemo2Sequence = (): InstrumentSequence => {
  const demo: InstrumentSequence = {
    drums: {
      kick: Array(STEP_COUNT).fill(false),
      snare: Array(STEP_COUNT).fill(false),
      hihat: Array(STEP_COUNT).fill(false),
    },
    bass: createEmptyMelodicSequence(),
    synth: createEmptyMelodicSequence(),
    drop: createEmptyDropSequence(),
    strings: createEmptyMelodicSequence(),
  };
  
  // Breakbeat kick pattern
  demo.drums.kick[0] = true;
  demo.drums.kick[3] = true;
  demo.drums.kick[6] = true;
  demo.drums.kick[10] = true;
  demo.drums.kick[13] = true;
  
  // Syncopated snare
  demo.drums.snare[4] = true;
  demo.drums.snare[7] = true;
  demo.drums.snare[12] = true;
  
  // Fast hi-hats
  for (let i = 0; i < STEP_COUNT; i++) {
    demo.drums.hihat[i] = true;
  }
  
  // Deep rolling bass
  demo.bass[0][0] = true;
  demo.bass[1][2] = true;
  demo.bass[0][4] = true;
  demo.bass[2][6] = true;
  demo.bass[0][8] = true;
  demo.bass[1][10] = true;
  demo.bass[0][12] = true;
  demo.bass[2][14] = true;
  
  // Atmospheric synth stabs
  demo.synth[5][4] = true;
  demo.synth[4][8] = true;
  demo.synth[5][12] = true;
  
  // Jungle drops
  demo.drop[1][6] = true;
  demo.drop[2][14] = true;
  
  // Dark strings
  demo.strings[1][0] = true;
  demo.strings[2][8] = true;
  
  return demo;
};

// Demo Song 3: Ambient Chill
const createDemo3Sequence = (): InstrumentSequence => {
  const demo: InstrumentSequence = {
    drums: {
      kick: Array(STEP_COUNT).fill(false),
      snare: Array(STEP_COUNT).fill(false),
      hihat: Array(STEP_COUNT).fill(false),
    },
    bass: createEmptyMelodicSequence(),
    synth: createEmptyMelodicSequence(),
    drop: createEmptyDropSequence(),
    strings: createEmptyMelodicSequence(),
  };
  
  // Minimal kick
  demo.drums.kick[0] = true;
  demo.drums.kick[8] = true;
  
  // Soft snare
  demo.drums.snare[6] = true;
  demo.drums.snare[14] = true;
  
  // Sparse hi-hats
  demo.drums.hihat[2] = true;
  demo.drums.hihat[6] = true;
  demo.drums.hihat[10] = true;
  demo.drums.hihat[14] = true;
  
  // Gentle bass pulse
  demo.bass[1][0] = true;
  demo.bass[2][8] = true;
  
  // Dreamy synth chords
  demo.synth[5][0] = true;
  demo.synth[4][4] = true;
  demo.synth[3][8] = true;
  demo.synth[4][12] = true;
  
  // Subtle drops
  demo.drop[0][4] = true;
  demo.drop[1][12] = true;
  
  // Warm strings pad
  demo.strings[4][0] = true;
  demo.strings[5][4] = true;
  demo.strings[3][8] = true;
  demo.strings[4][12] = true;
  
  return demo;
};

// Demo Song 4: Techno Banger
const createDemo4Sequence = (): InstrumentSequence => {
  const demo: InstrumentSequence = {
    drums: {
      kick: Array(STEP_COUNT).fill(false),
      snare: Array(STEP_COUNT).fill(false),
      hihat: Array(STEP_COUNT).fill(false),
    },
    bass: createEmptyMelodicSequence(),
    synth: createEmptyMelodicSequence(),
    drop: createEmptyDropSequence(),
    strings: createEmptyMelodicSequence(),
  };
  
  // Hard four-on-the-floor
  for (let i = 0; i < STEP_COUNT; i += 4) {
    demo.drums.kick[i] = true;
  }
  
  // Industrial snare/clap
  demo.drums.snare[2] = true;
  demo.drums.snare[6] = true;
  demo.drums.snare[10] = true;
  demo.drums.snare[14] = true;
  
  // Relentless hi-hats
  for (let i = 1; i < STEP_COUNT; i += 2) {
    demo.drums.hihat[i] = true;
  }
  
  // Driving bass line
  demo.bass[0][0] = true;
  demo.bass[1][3] = true;
  demo.bass[0][6] = true;
  demo.bass[2][9] = true;
  demo.bass[0][12] = true;
  demo.bass[1][15] = true;
  
  // Acid synth sequence
  demo.synth[2][0] = true;
  demo.synth[3][2] = true;
  demo.synth[4][4] = true;
  demo.synth[3][6] = true;
  demo.synth[2][8] = true;
  demo.synth[3][10] = true;
  demo.synth[4][12] = true;
  demo.synth[5][14] = true;
  
  // Epic drops
  demo.drop[2][0] = true;
  demo.drop[3][8] = true;
  
  return demo;
};

// Array of all demo sequences
const demoSequences = [
  createDemo1Sequence,
  createDemo2Sequence,
  createDemo3Sequence,
  createDemo4Sequence,
];

// Demo names for display
export const demoNames = [
  'Classic House',
  'Breakbeat Jungle',
  'Ambient Chill',
  'Techno Banger',
];

// Provider component
export const GrooveBoxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeInstrument, setActiveInstrument] = useState<Instrument>('synth');
  const [sequence, setSequence] = useState<InstrumentSequence>(createDemo4Sequence());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [tempo, setTempo] = useState<number>(120);
  const [volume, setVolume] = useState<number>(0.7);
  const [theme, setTheme] = useState<Theme>('cloudfbm');
  const [currentDemoIndex, setCurrentDemoIndex] = useState<number>(3);
  
  // Custom volume setter that also updates the master gain
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    // Update the master gain even when not playing
    getMasterGain(newVolume);
  };
  
  // Timer reference
  const timerRef = useRef<number | null>(null);
  
  // Store current audio parameters in refs to avoid recreating interval
  const tempoRef = useRef(tempo);
  const sequenceRef = useRef(sequence);
  const volumeRef = useRef(volume);
  
  // Update refs when values change
  useEffect(() => {
    tempoRef.current = tempo;
  }, [tempo]);
  
  useEffect(() => {
    sequenceRef.current = sequence;
  }, [sequence]);
  
  useEffect(() => {
    volumeRef.current = volume;
    // Update master gain immediately
    getMasterGain(volume);
  }, [volume]);
  
  // Calculate interval based on tempo (BPM)
  const getStepInterval = () => (60 * 1000) / (tempoRef.current * 4);
  
  // Play sounds for the current step
  const playCurrentStepSounds = (step: number) => {
    // Initialize AudioContext if needed (must be triggered by user gesture)
    getAudioContext();
    
    // Get master gain node with current volume from ref
    const masterGain = getMasterGain(volumeRef.current);
    
    // Always read the most current sequence state from ref
    const currentSequence = sequenceRef.current;
    
    // Play drum sounds
    if (currentSequence.drums.kick[step]) playKick(masterGain);
    if (currentSequence.drums.snare[step]) playSnare(masterGain);
    if (currentSequence.drums.hihat[step]) playHiHat(masterGain);
    
    // Play bass notes
    currentSequence.bass.forEach((row, noteIndex) => {
      if (row[step]) playBass(noteIndex, masterGain);
    });
    
    // Play synth notes
    currentSequence.synth.forEach((row, noteIndex) => {
      if (row[step]) playSynth(noteIndex, masterGain);
    });
    
    // Play string notes
    currentSequence.strings.forEach((row, noteIndex) => {
      if (row[step]) playStrings(noteIndex, masterGain);
    });
    
    // Play drop sounds with different durations based on row
    currentSequence.drop.forEach((row, noteIndex) => {
      if (row[step]) {
        // Duration increases for better impact as you go from row 0 (short) to row 3 (epic)
        // Each drop type has a different character and length:
        // noteIndex 0: Short/tight drop - 0.3s
        // noteIndex 1: Medium drop - 0.6s
        // noteIndex 2: Long drop - 1.0s
        // noteIndex 3: Epic drop - 1.5s (full impact)
        const durations = [0.3, 0.6, 1.0, 1.5];
        const duration = durations[noteIndex];
        playDrop(duration, masterGain);
      }
    });
  };
  
  // Toggle a step in the sequence
  const toggleStep = (
    instrument: Instrument,
    row: number | keyof DrumSequence,
    step: number
  ) => {
    setSequence((prev) => {
      const newSequence = { ...prev };
      
      if (instrument === 'drums') {
        const drumRow = row as keyof DrumSequence;
        newSequence.drums[drumRow] = [...prev.drums[drumRow]];
        newSequence.drums[drumRow][step] = !prev.drums[drumRow][step];
      } else {
        const melodicRow = row as number;
        newSequence[instrument] = [...prev[instrument]];
        newSequence[instrument][melodicRow] = [...prev[instrument][melodicRow]];
        newSequence[instrument][melodicRow][step] = !prev[instrument][melodicRow][step];
      }
      
      // Update the sequence ref immediately to ensure current sounds play correctly
      sequenceRef.current = newSequence;
      
      // If we're currently playing the toggled step, play it immediately
      if (isPlaying && currentStep === step) {
        // No need for setTimeout since we're using the ref
        playCurrentStepSounds(step);
      }
      
      return newSequence;
    });
  };
  
  // Start or stop the sequencer
  const togglePlayback = () => {
    if (isPlaying) {
      // Stop playback
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setCurrentStep(0);
      setIsPlaying(false);
    } else {
      // Start playback
      setCurrentStep(0);
      setIsPlaying(true);
      
      // Schedule the first step immediately
      playCurrentStepSounds(0);
      
      // Schedule subsequent steps using current tempo from ref
      timerRef.current = window.setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = (prev + 1) % STEP_COUNT;
          playCurrentStepSounds(nextStep);
          return nextStep;
        });
      }, (60 * 1000) / (tempoRef.current * 4));
    }
  };
  
  // Load demo pattern (cycle through demos)
  const playDemo = () => {
    // Get the next demo in the sequence
    const nextDemoIndex = (currentDemoIndex + 1) % demoSequences.length;
    setCurrentDemoIndex(nextDemoIndex);
    
    const demoSequence = demoSequences[nextDemoIndex]();
    
    // Update ref immediately for current playback
    sequenceRef.current = demoSequence;
    setSequence(demoSequence);
    
    // No need to stop playback anymore - keep it running if it's already playing
  };
  
  // Clear all patterns
  const clearSequence = () => {
    const emptySequence = {
      drums: createEmptyDrumSequence(),
      bass: createEmptyMelodicSequence(),
      synth: createEmptyMelodicSequence(),
      drop: createEmptyDropSequence(),
      strings: createEmptyMelodicSequence(),
    };
    
    // Update ref immediately to ensure playback uses the new sequence
    sequenceRef.current = emptySequence;
    setSequence(emptySequence);
  };
  
  // Cycle through themes
  const cycleTheme = () => {
    const themes: Theme[] = ['cloudfbm', 'light', 'dark', 'forest', 'sanddune'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };
  
  // Only update interval when tempo changes
  useEffect(() => {
    if (isPlaying && timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = (prev + 1) % STEP_COUNT;
          playCurrentStepSounds(nextStep);
          return nextStep;
        });
      }, getStepInterval());
    }
  }, [tempo, isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);
  
  const value: GrooveBoxContextType = {
    activeInstrument,
    setActiveInstrument,
    sequence,
    toggleStep,
    isPlaying,
    togglePlayback,
    currentStep,
    tempo,
    setTempo,
    playDemo,
    clearSequence,
    volume,
    setVolume: handleVolumeChange,
    theme,
    cycleTheme,
    currentDemoIndex,
  };
  
  return (
    <GrooveBoxContext.Provider value={value}>
      {children}
    </GrooveBoxContext.Provider>
  );
};

// Hook for using the context
export const useGrooveBox = () => {
  const context = useContext(GrooveBoxContext);
  if (context === undefined) {
    throw new Error('useGrooveBox must be used within a GrooveBoxProvider');
  }
  return context;
};