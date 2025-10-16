import React from 'react';
import { StepSequencer } from './StepSequencer';
import { useGrooveBox } from '../contexts/GrooveBoxContext';

export const DrumSequencer: React.FC = () => {
  const { sequence, toggleStep } = useGrooveBox();
  const { drums } = sequence;
  
  // Using pink as the color for drums
  const DRUM_COLOR = "#FD8EFF";

  // Define drum parts in order from high to low frequency
  const drumParts = [
    { id: 'hihat', sequence: drums.hihat },
    { id: 'snare', sequence: drums.snare },
    { id: 'kick', sequence: drums.kick }
  ];

  return (
    <div className="flex flex-col gap-4 w-full mx-auto">
      {drumParts.map(({ id, sequence }) => (
        <div key={`drum-${id}`} className="flex items-center gap-4">
          <div className="w-20"></div>
          <StepSequencer
            sequence={sequence}
            rowIndex={id}
            color={DRUM_COLOR}
            onToggle={(step) => toggleStep('drums', id, step)}
          />
        </div>
      ))}
    </div>
  );
};