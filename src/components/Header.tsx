import React from 'react';
import { InstrumentSelector } from './InstrumentSelector';
import { useGrooveBox } from '../contexts/GrooveBoxContext';

export const Header: React.FC = () => {
  const { theme } = useGrooveBox();
  const isLight = theme === 'light';
  const textColor = isLight ? '#1a1a1a' : '#ffffff';
  
  return (
    <div className="relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative w-full">
          <div 
            className="font-['Michroma:Regular',_sans-serif] font-normal leading-none not-italic relative shrink-0 text-[24px] text-left text-nowrap uppercase whitespace-pre"
            style={{ color: textColor }}
          >
            <div className="mb-0 text-[24px]">MINIMAL</div>
            <div>midi</div>
            <div>studio</div>
          </div>
          <InstrumentSelector />
        </div>
      </div>
    </div>
  );
};