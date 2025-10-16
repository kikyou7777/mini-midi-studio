import React from "react";
import {
  Instrument,
  useGrooveBox,
} from "../contexts/GrooveBoxContext";
import { Trees, Waves, Cloud, Sun, Moon } from "lucide-react";
import { playKick, playSynth, playBass, playDrop, playStrings, getMasterGain } from "../utils/audioUtils";

export const InstrumentSelector: React.FC = () => {
  const {
    activeInstrument,
    setActiveInstrument,
    theme,
    cycleTheme,
    volume,
  } = useGrooveBox();

  const playPreviewSound = (instrument: Instrument) => {
    const masterGain = getMasterGain(volume);
    
    switch (instrument) {
      case 'drums':
        playKick(masterGain);
        break;
      case 'bass':
        playBass(2, masterGain); // Play middle note
        break;
      case 'synth':
        playSynth(3, masterGain); // Play middle note
        break;
      case 'strings':
        playStrings(4, masterGain); // Play higher note
        break;
      case 'drop':
        playDrop(0.5, masterGain); // Play short drop
        break;
    }
  };

  const handleInstrumentClick = (instrument: Instrument) => {
    playPreviewSound(instrument);
    setActiveInstrument(instrument);
  };

  const isLight = theme === "light";
  const textColor = isLight ? "#1a1a1a" : "#ffffff";
  const borderColor = isLight
    ? "rgba(0,0,0,0.3)"
    : "rgba(255,255,255,0.4)";

  const instruments: {
    id: Instrument;
    name: string;
    color: string;
  }[] = [
    { id: "drums", name: "Drums", color: "#FD8EFF" },
    { id: "bass", name: "Bass", color: "#56BEFF" },
    { id: "synth", name: "Synth", color: "#99ff71" },
    { id: "strings", name: "Strings", color: "#C06BFF" },
    { id: "drop", name: "Drop", color: "#ff9a00" },
  ];

  const getThemeColor = () => {
    switch (theme) {
      case "cloudfbm":
        return "#87b7ff";
      case "forest":
        return "#99ff71";
      case "sanddune":
        return "#ff9a00";
      case "dark":
        return "#ffffff";
      case "light":
        return "#FFD700";
      default:
        return "#87b7ff";
    }
  };

  const getThemeIcon = () => {
    const color = getThemeColor();
    const iconSize = 24;

    switch (theme) {
      case "cloudfbm":
        return <Cloud size={iconSize} style={{ color }} />;
      case "forest":
        return <Trees size={iconSize} style={{ color }} />;
      case "sanddune":
        return <Waves size={iconSize} style={{ color }} />;
      case "dark":
        return <Moon size={iconSize} style={{ color }} />;
      case "light":
        return <Sun size={iconSize} style={{ color }} />;
      default:
        return <Cloud size={iconSize} style={{ color }} />;
    }
  };

  return (
    <div className="relative shrink-0">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
          {/* Theme Button */}
          <button
            onClick={cycleTheme}
            style={{
              backgroundColor: "transparent",
              border: `1px solid ${borderColor}`,
              borderRadius: "8px",
              width: "64px",
              height: "64px",
              flexShrink: 0,
              position: "relative",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Cycle theme"
          >
            {getThemeIcon()}
          </button>

          {instruments.map((instrument) => (
            <button
              key={instrument.id}
              onClick={() => handleInstrumentClick(instrument.id)}
              style={{
                backgroundColor:
                  activeInstrument === instrument.id
                    ? instrument.color
                    : "transparent",
                border:
                  activeInstrument === instrument.id
                    ? "none"
                    : `1px solid ${borderColor}`,
                borderRadius: "8px",
                width: "64px",
                height: "64px",
                flexShrink: 0,
                position: "relative",
                transition: "all 0.2s ease",
              }}
              aria-label={`Select ${instrument.name}`}
            >
              <div className="flex flex-row items-center justify-center relative size-full">
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative size-16">
                  <div
                    style={{
                      color:
                        activeInstrument === instrument.id
                          ? "#292929"
                          : textColor,
                      fontSize: "14px",
                      fontWeight: "normal",
                      lineHeight: 0,
                      letterSpacing: "0.56px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    <div className="leading-none whitespace-pre">
                      {instrument.name}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};