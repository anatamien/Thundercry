import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('power');
  const [lightningStrike, setLightningStrike] = useState(false);

  useEffect(() => {
    const checkDependencies = () => {
      if (
        window.Terminal &&
        window.LightningBolt &&
        window.MenuButton &&
        window.PowerMetrics &&
        window.ThunderData &&
        window.ShadowArchive
      ) {
        setIsReady(true);
      }
    };

    checkDependencies();
    const interval = setInterval(checkDependencies, 100);
    return () => clearInterval(interval);
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Random lightning strikes
  useEffect(() => {
    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 3 seconds
        setLightningStrike(true);
        setTimeout(() => setLightningStrike(false), 300);
      }
    }, 3000);

    return () => clearInterval(lightningInterval);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="terminal-text text-2xl">
          ⚡ システム起動中 <span className="terminal-cursor">_</span>
        </div>
      </div>
    );
  }

  return (
    <window.Terminal
      currentTime={currentTime}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      lightningStrike={lightningStrike}
    />
  );
}

createRoot(document.getElementById('renderDiv')).render(<App />);