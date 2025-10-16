import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { DrumSequencer } from './DrumSequencer';
import { BassSequencer } from './BassSequencer';
import { SynthSequencer } from './SynthSequencer';
import { StringSequencer } from './StringSequencer';
import { DropSequencer } from './DropSequencer';
import { CloudFBM } from './CloudFBM';
import { ForestScene } from './ForestScene';
import { SandDune } from './SandDune';
import { Instrument, useGrooveBox } from '../contexts/GrooveBoxContext';

export const GrooveBox: React.FC = () => {
  const { activeInstrument, theme } = useGrooveBox();
  
  const isLight = theme === 'light';
  const hrStroke = isLight ? '#c0c0c0' : '#626262';

  const renderSequencer = (instrument: Instrument) => {
    switch (instrument) {
      case 'drums':
        return <DrumSequencer />;
      case 'bass':
        return <BassSequencer />;
      case 'synth':
        return <SynthSequencer />;
      case 'strings':
        return <StringSequencer />;
      case 'drop':
        return <DropSequencer />;
      default:
        return null;
    }
  };

  const getThemeBackground = () => {
    switch (theme) {
      case 'light':
        return 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 50%, #f5f5f5 100%)';
      case 'dark':
        return '#292929';
      case 'cloudfbm':
      case 'forest':
      case 'sanddune':
        return 'transparent';
      default:
        return 'transparent';
    }
  };

  const renderThemeVisualizer = () => {
    switch (theme) {
      case 'cloudfbm':
        return <CloudFBM isDarkMode={true} />;
      case 'forest':
        return <ForestScene />;
      case 'sanddune':
        return <SandDune />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="relative flex flex-col min-h-screen w-full"
      style={{ 
        background: getThemeBackground(),
        transition: 'background 0.3s ease-in-out'
      }}
    >
      {renderThemeVisualizer()}
      <div className="px-[25.6px] pt-[25.6px] pb-0 flex-shrink-0 relative z-10">
        <Header />
        <div className="h-0 relative shrink-0 w-full mt-[25.6px]" data-name="hr">
          <div className="absolute bottom-[-0.4px] left-0 right-0 top-[-0.4px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 1389 2"
            >
              <path
                d="M0 1H1388.8"
                id="hr"
                stroke={hrStroke}
                strokeWidth="0.8"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center px-[25.6px] py-8 overflow-x-auto relative z-10 bg-[rgba(255,255,255,0)]">
        <div className="w-full max-w-[1024px] mx-auto">
          {renderSequencer(activeInstrument)}
        </div>
      </div>

      <div className="px-[25.6px] pb-[25.6px] pt-0 flex-shrink-0 relative z-10">
        <div className="h-0 relative shrink-0 w-full mb-[25.6px]" data-name="hr">
          <div className="absolute bottom-[-0.4px] left-0 right-0 top-[-0.4px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 1389 2"
            >
              <path
                d="M0 1H1388.8"
                id="hr"
                stroke={hrStroke}
                strokeWidth="0.8"
              />
            </svg>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};