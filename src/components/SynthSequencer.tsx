import React from 'react';
import { StepSequencer } from './StepSequencer';
import { useGrooveBox } from '../contexts/GrooveBoxContext';

export const SynthSequencer: React.FC = () => {
  const { sequence, toggleStep } = useGrooveBox();
  const { synth } = sequence;
  
  // Using green as the color for synth
  const SYNTH_COLOR = "#99ff71";

  return (
    <div className="flex flex-col gap-4 w-full mx-auto">
      {/* Render rows in reverse order, but keep the note indices correct */}
      {[...Array(synth.length)].map((_, i) => {
        const rowIndex = synth.length - 1 - i; // Visual order (reversed)
        const noteIndex = rowIndex; // Actual note index for audio
        
        return (
          <div key={`synth-${noteIndex}`} className="flex items-center gap-4">
            <div className="w-20"></div>
            <StepSequencer
              sequence={synth[noteIndex]}
              rowIndex={noteIndex}
              color={SYNTH_COLOR}
              onToggle={(step) => toggleStep('synth', noteIndex, step)}
            />
          </div>
        );
      })}
    </div>
  );
};