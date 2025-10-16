import React from 'react';
import { StepSequencer } from './StepSequencer';
import { useGrooveBox } from '../contexts/GrooveBoxContext';

export const BassSequencer: React.FC = () => {
  const { sequence, toggleStep } = useGrooveBox();
  const { bass } = sequence;
  
  // Using light blue as the color for bass
  const BASS_COLOR = "#56BEFF";

  return (
    <div className="flex flex-col gap-4 w-full mx-auto">
      {/* Render rows in reverse order, but keep the note indices correct */}
      {[...Array(bass.length)].map((_, i) => {
        const rowIndex = bass.length - 1 - i; // Visual order (reversed)
        const noteIndex = rowIndex; // Actual note index for audio
        
        return (
          <div key={`bass-${noteIndex}`} className="flex items-center gap-4">
            <div className="w-20"></div>
            <StepSequencer
              sequence={bass[noteIndex]}
              rowIndex={noteIndex}
              color={BASS_COLOR}
              onToggle={(step) => toggleStep('bass', noteIndex, step)}
            />
          </div>
        );
      })}
    </div>
  );
};