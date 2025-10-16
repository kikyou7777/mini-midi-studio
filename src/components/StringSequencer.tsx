import React from 'react';
import { StepSequencer } from './StepSequencer';
import { useGrooveBox } from '../contexts/GrooveBoxContext';

export const StringSequencer: React.FC = () => {
  const { sequence, toggleStep } = useGrooveBox();
  const { strings } = sequence;
  
  // Using purple as the color for strings
  const STRINGS_COLOR = "#C06BFF";

  return (
    <div className="flex flex-col gap-4 w-full mx-auto">
      {/* Render rows in reverse order, but keep the note indices correct */}
      {[...Array(strings.length)].map((_, i) => {
        const rowIndex = strings.length - 1 - i; // Visual order (reversed)
        const noteIndex = rowIndex; // Actual note index for audio
        
        return (
          <div key={`strings-${noteIndex}`} className="flex items-center gap-4">
            <div className="w-20"></div>
            <StepSequencer
              sequence={strings[noteIndex]}
              rowIndex={noteIndex}
              color={STRINGS_COLOR}
              onToggle={(step) => toggleStep('strings', noteIndex, step)}
            />
          </div>
        );
      })}
    </div>
  );
};