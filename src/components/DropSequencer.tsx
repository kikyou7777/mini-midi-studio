import React from 'react';
import { StepSequencer } from './StepSequencer';
import { useGrooveBox } from '../contexts/GrooveBoxContext';

export const DropSequencer: React.FC = () => {
  const { sequence, toggleStep } = useGrooveBox();
  const { drop } = sequence;
  
  // Using orange as the color for drop sounds
  const DROP_COLOR = "#ff9a00";

  // Labels for each row of the EDM drop sound
  const dropLabels = [
    'Epic', // Longest duration, full impact drop
    'Long', // Extended duration
    'Medium', // Medium duration
    'Short', // Shortest duration
  ];

  return (
    <div className="flex flex-col gap-4 w-full mx-auto">
      {/* Render rows in reverse order, but keep the note indices correct */}
      {[...Array(drop.length)].map((_, i) => {
        const rowIndex = drop.length - 1 - i; // Visual order (reversed)
        const noteIndex = rowIndex; // Actual note index for audio
        const label = dropLabels[rowIndex];
        
        return (
          <div key={`drop-${noteIndex}`} className="flex items-center gap-4">
            <div className="w-20 text-right pr-2 text-white opacity-80">{label}</div>
            <StepSequencer
              sequence={drop[noteIndex]}
              rowIndex={noteIndex}
              color={DROP_COLOR}
              onToggle={(step) => toggleStep('drop', noteIndex, step)}
            />
          </div>
        );
      })}
    </div>
  );
};