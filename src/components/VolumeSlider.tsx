import React, { useRef, useState, useEffect } from 'react';
import { useGrooveBox } from '../contexts/GrooveBoxContext';

interface VolumeSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export const VolumeSlider: React.FC<VolumeSliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  className = '',
}) => {
  const { theme } = useGrooveBox();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const isLight = theme === 'light';
  const trackBg = isLight ? '#d0d0d0' : '#000000';
  const activeBg = isLight ? '#4a4a4a' : '#ffffff';
  const thumbBg = isLight ? '#4a4a4a' : '#ffffff';
  const thumbBorder = isLight ? '#1a1a1a' : '#000000';
  
  // Calculate percentage for styling
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Handle mouse/touch interactions
  const updateValue = (clientX: number) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const width = rect.width;
    const offset = clientX - rect.left;
    
    // Calculate new value based on position
    let newPercentage = offset / width;
    newPercentage = Math.max(0, Math.min(1, newPercentage));
    
    // Convert to actual value
    const range = max - min;
    const rawValue = min + newPercentage * range;
    
    // Apply step constraints
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));
    
    onChange(clampedValue);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateValue(e.clientX);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateValue(e.touches[0].clientX);
  };
  
  // Add global event listeners for drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateValue(e.clientX);
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        updateValue(e.touches[0].clientX);
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);
  
  return (
    <div 
      className={`relative h-6 w-full cursor-pointer ${className}`}
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={0}
      aria-label="Volume Control"
      title="Adjust volume"
    >
      {/* Slider track - thin line */}
      <div 
        className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded-full"
        style={{ backgroundColor: trackBg }}
      >
        {/* Active part of track */}
        <div 
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: activeBg }}
        ></div>
      </div>
      
      {/* Thumb/handle */}
      <div 
        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full border"
        style={{ 
          left: `${percentage}%`,
          backgroundColor: thumbBg,
          borderColor: thumbBorder
        }}
      ></div>
    </div>
  );
};