import React, { useState, useRef, useEffect } from 'react';
import { StepSequence, useGrooveBox } from '../contexts/GrooveBoxContext';

interface StepSequencerProps {
  sequence: StepSequence;
  rowIndex: number | string;
  color: string;
  onToggle: (step: number) => void;
}

export const StepSequencer: React.FC<StepSequencerProps> = ({
  sequence,
  rowIndex,
  color,
  onToggle,
}) => {
  const { currentStep, isPlaying, theme } = useGrooveBox();
  
  const isLight = theme === 'light';
  const borderColor = isLight ? 'rgba(0, 0, 0, 0.3)' : 'rgba(240, 240, 240, 0.4)';
  const activeBorderColor = isLight ? '#1a1a1a' : 'white';
  
  // State to track dragging operations
  const [isDragging, setIsDragging] = useState(false);
  const [initialStepState, setInitialStepState] = useState<boolean | null>(null);
  
  // Keep track of steps we've already processed to avoid toggling multiple times
  const processedStepsRef = useRef<Set<number>>(new Set());
  
  // Reset dragging state when mouse is released anywhere in the document
  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
      setInitialStepState(null);
      processedStepsRef.current.clear();
    };
    
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);
  
  // Handle mouse down on a step
  const handleMouseDown = (stepIndex: number, active: boolean) => {
    setIsDragging(true);
    setInitialStepState(active);
    processedStepsRef.current.clear();
    processedStepsRef.current.add(stepIndex);
    onToggle(stepIndex);
  };
  
  // Handle mouse over a step during dragging
  const handleMouseOver = (stepIndex: number) => {
    // Only process if we're dragging and haven't already processed this step
    if (isDragging && initialStepState !== null && !processedStepsRef.current.has(stepIndex)) {
      processedStepsRef.current.add(stepIndex);
      
      // Set this step to the opposite of initialStepState (same as the first step's new state)
      // So if we started with step ON, we want all steps to be OFF
      // If we started with step OFF, we want all steps to be ON
      const currentState = sequence[stepIndex];
      if (currentState === initialStepState) {
        onToggle(stepIndex);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        {sequence.map((active, stepIndex) => (
          <button
            key={`step-${rowIndex}-${stepIndex}`}
            onMouseDown={() => handleMouseDown(stepIndex, active)}
            onTouchStart={() => handleMouseDown(stepIndex, active)}
            onMouseOver={() => handleMouseOver(stepIndex)}
            onTouchMove={(e) => {
              // Prevent default to avoid scrolling while dragging
              e.preventDefault();
              
              // Handle touch dragging
              const touch = e.touches[0];
              const element = document.elementFromPoint(touch.clientX, touch.clientY);
              
              // Get the step index from the element's data attribute if possible
              if (element) {
                const dataKey = element.getAttribute('data-step-key');
                if (dataKey) {
                  // Extract step index from the data-step-key
                  const parts = dataKey.split('-');
                  const touchedStepIndex = parseInt(parts[parts.length - 1]);
                  
                  if (!isNaN(touchedStepIndex)) {
                    handleMouseOver(touchedStepIndex);
                  }
                }
              }
            }}
            data-step-key={`step-${rowIndex}-${stepIndex}`}
            style={{
              backgroundColor: active ? color : 'transparent',
              border: isPlaying && currentStep === stepIndex
                ? `2px solid white`
                : active ? 'none' : `1px solid white`,
              opacity: active ? 1 : 0.4,
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              transition: 'all 100ms',
              flexShrink: 0,
              position: 'relative',
              cursor: 'pointer'
            }}
            aria-label={`Toggle step ${stepIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
};