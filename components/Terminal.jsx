import React, { useState } from 'react';

function Terminal({ currentTime, activeSection, onSectionChange, lightningStrike }) {
  const [electricEffect, setElectricEffect] = useState(false);

  const handleElectricEffect = () => {
    setElectricEffect(true);
    setTimeout(() => setElectricEffect(false), 300);
  };

  const formatTime = (date) => {
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const menuSections = [
    { id: 'power', label: '力', title: 'Power Metrics' },
    { id: 'thunder', label: '雷', title: 'Thunder Data' },
    { id: 'shadow', label: '影', title: 'Shadow Archive' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'power':
        return <window.PowerMetrics />;
      case 'thunder':
        return <window.ThunderData />;
      case 'shadow':
        return <window.ShadowArchive />;
      default:
        return <window.PowerMetrics />;
    }
  };

  return (
    <div className={`min-h-screen crt-screen ${lightningStrike ? 'thunder-flash' : ''}`}>
      {/* Header with logo and time */}
      <div className="flex justify-between items-center p-6 border-b border-gray-800">
        <div className="terminal-logo">
          ⚡「雷鳴」
        </div>
        <div className="terminal-time">
          {formatTime(currentTime)}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex min-h-[calc(100vh-100px)]">
        {/* Left menu */}
        <div className="w-24 border-r border-gray-800 flex flex-col items-center py-8 space-y-8">
          {menuSections.map((section) => (
            <window.MenuButton
              key={section.id}
              hieroglyph={section.label}
              title={section.title}
              active={activeSection === section.id}
              onClick={() => {
                onSectionChange(section.id);
                handleElectricEffect();
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 relative">
          {/* Lightning effects */}
          {lightningStrike && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <window.LightningBolt 
                key={Date.now()} 
                startX={Math.random() * 100} 
                intensity={Math.random() * 5 + 2}
              />
            </div>
          )}

          {/* Section content */}
          <div className={`h-full ${electricEffect ? 'electric-discharge' : ''}`}>
            {renderActiveSection()}
          </div>
        </div>
      </div>

      {/* Random ambient lightning */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        {Array.from({ length: 3 }, (_, i) => (
          <div 
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${20 + i * 30}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '8s',
              animation: 'lightning-flash infinite ease-in-out'
            }}
          >
            <window.LightningBolt 
              startX={50} 
              intensity={1}
              ambient={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

window.Terminal = Terminal;