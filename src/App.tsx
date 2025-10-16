import React from 'react';
import { GrooveBox } from './components/GrooveBox';
import { GrooveBoxProvider } from './contexts/GrooveBoxContext';

export default function App() {
  return (
    <GrooveBoxProvider>
      <GrooveBox />
    </GrooveBoxProvider>
  );
}