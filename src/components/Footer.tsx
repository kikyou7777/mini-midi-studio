import React from 'react';
import { useGrooveBox } from '../contexts/GrooveBoxContext';
import { demoNames } from '../contexts/GrooveBoxContext';
import { VolumeSlider } from './VolumeSlider';

export const Footer: React.FC = () => {
  const { isPlaying, togglePlayback, tempo, setTempo, playDemo, clearSequence, volume, setVolume, theme, currentDemoIndex } = useGrooveBox();
  
  const isLight = theme === 'light';
  const isBrightTheme = theme === 'light' || theme === 'cloudfbm';
  const textColor = isLight ? '#1a1a1a' : '#ffffff';
  const borderColor = isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)';
  const hoverBg = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)';
  const buttonBg = isBrightTheme ? '#e0e0e0' : '#3b3b3b';

  return (
    <div className="h-16 relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row h-16 items-center justify-between p-0 relative w-full">
          <div className="relative shrink-0">
            <div className="flex flex-row items-center relative size-full">
              <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
                <button
                  onClick={togglePlayback}
                  className="relative rounded-lg shrink-0 size-16 border transition-colors"
                  style={{ borderColor, backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverBg}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  aria-label={isPlaying ? "Stop" : "Play"}
                >
                  <div className="flex flex-row items-center justify-center relative size-full">
                    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative size-16">
                      <div 
                        className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-left text-nowrap tracking-[0.56px]"
                        style={{ color: textColor }}
                      >
                        <div className="leading-none whitespace-pre">
                          {isPlaying ? "Stop" : "Play"}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={clearSequence}
                  className="relative rounded-lg shrink-0 size-16 border transition-colors"
                  style={{ borderColor, backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverBg}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  aria-label="Clear"
                >
                  <div className="flex flex-row items-center justify-center relative size-full">
                    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative size-16">
                      <div 
                        className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-left text-nowrap tracking-[0.56px]"
                        style={{ color: textColor }}
                      >
                        <div className="leading-none whitespace-pre">Clear</div>
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={playDemo}
                  className="relative rounded-lg shrink-0 size-16 border transition-colors"
                  style={{ borderColor, backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverBg}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  aria-label="Demo"
                  title={`Current: ${demoNames[currentDemoIndex]} (Click for next)`}
                >
                  <div className="flex flex-row items-center justify-center relative size-full">
                    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative size-16">
                      <div 
                        className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-left text-nowrap tracking-[0.56px]"
                        style={{ color: textColor }}
                      >
                        <div className="leading-none whitespace-pre">Demo</div>
                      </div>
                    </div>
                  </div>
                </button>
                <div className="flex flex-col items-start justify-center ml-2 min-w-[120px]">
                  <div 
                    className="font-['Geist:Regular',_sans-serif] text-[10px] tracking-wide opacity-70"
                    style={{ color: textColor }}
                  >
                    {demoNames[currentDemoIndex]}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2 w-28">
                  <VolumeSlider 
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={setVolume}
                    className="py-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-16 relative shrink-0">
            <div className="flex flex-col items-center relative size-full">
              <div className="box-border content-stretch flex flex-col h-16 items-center justify-between p-0 relative">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTempo(Math.max(60, tempo - 10))}
                    className="rounded-[7.65957px] h-[42px] px-3 border border-white"
                    style={{ backgroundColor: 'transparent', color: textColor }}
                    aria-label="Decrease tempo"
                  >
                    -
                  </button>
                  <div className="h-[42px] relative rounded-[7.65957px] shrink-0 border border-white" style={{ backgroundColor: 'transparent' }}>
                    <div className="flex flex-row items-center justify-center relative size-full">
                      <div className="box-border content-stretch flex flex-row gap-2 h-[42px] items-center justify-center p-[8px] relative">
                        <div 
                          className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[20px] text-left text-nowrap"
                          style={{ color: textColor }}
                        >
                          <div className="leading-none whitespace-pre">{tempo}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setTempo(Math.min(200, tempo + 10))}
                    className="rounded-[7.65957px] h-[42px] px-3 border border-white"
                    style={{ backgroundColor: 'transparent', color: textColor }}
                    aria-label="Increase tempo"
                  >
                    +
                  </button>
                </div>
                <div 
                  className="font-['Figma_Sans_VF:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-left text-nowrap"
                  style={{ color: textColor }}
                >
                  <div className="leading-none whitespace-pre">Tempo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};