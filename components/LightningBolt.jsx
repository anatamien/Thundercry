import React, { useEffect, useState } from 'react';

function LightningBolt({ startX = 50, intensity = 3, ambient = false }) {
  const [pathData, setPathData] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    generateLightningPath();
    setIsVisible(true);
    
    if (!ambient) {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [startX, intensity]);

  const generateLightningPath = () => {
    const segments = 8 + Math.floor(Math.random() * 4);
    const heightStep = 100 / segments;
    let currentX = startX;
    let path = `M ${currentX} 0`;

    for (let i = 1; i <= segments; i++) {
      const y = i * heightStep;
      const randomOffset = (Math.random() - 0.5) * (30 / intensity);
      currentX += randomOffset;
      
      // Keep within bounds
      currentX = Math.max(5, Math.min(95, currentX));
      
      // Add jagged edges for lightning effect
      const midY = (i - 1) * heightStep + heightStep / 2;
      const midX = currentX + (Math.random() - 0.5) * 10;
      
      path += ` L ${midX} ${midY} L ${currentX} ${y}`;
    }

    setPathData(path);
  };

  if (!isVisible && !ambient) return null;

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`absolute inset-0 w-full h-full ${ambient ? 'opacity-30' : ''}`}
      style={{ pointerEvents: 'none' }}
    >
      <defs>
        <filter id="lightning-glow">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0"/>
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.33  0 0 0 0 0.81  0 0 0 0 0.98  0 0 0 1 0"/>
          <feComposite in2="SourceGraphic" operator="screen"/>
        </filter>
      </defs>
      
      <path
        d={pathData}
        fill="none"
        stroke="#87CEFA"
        strokeWidth={intensity}
        className={ambient ? '' : 'lightning-path'}
        filter="url(#lightning-glow)"
      />
      
      {/* Inner bright core */}
      <path
        d={pathData}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={Math.max(1, intensity - 1)}
        className={ambient ? '' : 'lightning-path'}
        opacity="0.8"
      />
    </svg>
  );
}

window.LightningBolt = LightningBolt;