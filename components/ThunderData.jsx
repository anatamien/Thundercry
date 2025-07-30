import React, { useState, useEffect } from 'react';

function ThunderData() {
  const [thunderEvents, setThunderEvents] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(true);

  useEffect(() => {
    const generateThunderEvent = () => {
      const events = [
        'Lightning Strike Detected',
        'Thunder Resonance Peak',
        'Storm Cell Formation',
        'Electric Field Surge', 
        'Atmospheric Discharge',
        'Ion Concentration Spike',
        'Thunder Frequency Shift',
        'Lightning Rod Activation'
      ];

      const newEvent = {
        id: Date.now(),
        type: events[Math.floor(Math.random() * events.length)],
        intensity: Math.floor(Math.random() * 100),
        timestamp: new Date(),
        location: `Grid-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`
      };

      setThunderEvents(prev => [newEvent, ...prev.slice(0, 9)]);
    };

    if (isMonitoring) {
      generateThunderEvent();
      const interval = setInterval(generateThunderEvent, 3000);
      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const getIntensityColor = (intensity) => {
    if (intensity > 80) return 'text-red-400';
    if (intensity > 50) return 'text-[#FFD700]';
    return 'text-[#87CEFA]';
  };

  const getIntensityBar = (intensity) => {
    const width = `${intensity}%`;
    let colorClass = 'bg-[#87CEFA]';
    if (intensity > 80) colorClass = 'bg-red-500';
    else if (intensity > 50) colorClass = 'bg-[#FFD700]';

    return (
      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
        <div 
          className={`${colorClass} h-full rounded-full transition-all duration-500`}
          style={{ width }}
        />
      </div>
    );
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div className="terminal-text text-2xl">
          雷 THUNDER DATA <span className="terminal-cursor">_</span>
        </div>
        <button
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={`px-4 py-2 border rounded ${
            isMonitoring 
              ? 'border-[#87CEFA] text-[#87CEFA]' 
              : 'border-gray-600 text-gray-400'
          } transition-all duration-300`}
        >
          {isMonitoring ? '⚡ MONITORING' : '⏸ PAUSED'}
        </button>
      </div>

      {/* Real-time Thunder Activity */}
      <div className="border border-gray-700 rounded p-6 bg-gray-900/30">
        <div className="terminal-text text-lg mb-4">REAL-TIME ACTIVITY</div>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {thunderEvents.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              Waiting for thunder data...
            </div>
          ) : (
            thunderEvents.map((event) => (
              <div key={event.id} className="border-l-4 border-[#87CEFA] pl-4 py-2 bg-gray-800/50 rounded-r">
                <div className="flex justify-between items-start mb-2">
                  <div className="terminal-text font-semibold">{event.type}</div>
                  <div className={`text-lg font-bold ${getIntensityColor(event.intensity)}`}>
                    {event.intensity}%
                  </div>
                </div>
                <div className="mb-2">
                  {getIntensityBar(event.intensity)}
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{event.location}</span>
                  <span>{event.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Thunder Frequency Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-700 rounded p-6 bg-gray-900/30">
          <div className="terminal-text text-lg mb-4">FREQUENCY ANALYSIS</div>
          <div className="space-y-3">
            {['Low Frequency', 'Mid Frequency', 'High Frequency'].map((freq, index) => (
              <div key={freq} className="flex items-center justify-between">
                <span className="terminal-text">{freq}</span>
                <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#87CEFA] h-full rounded-full power-bar"
                    style={{ width: `${20 + index * 25 + Math.random() * 20}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-700 rounded p-6 bg-gray-900/30">
          <div className="terminal-text text-lg mb-4">STORM TRACKING</div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Active Storms:</span>
              <span className="gold-accent">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Peak Intensity:</span>
              <span className="text-[#87CEFA]">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Average Duration:</span>
              <span className="terminal-text">4.2min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Strike Rate:</span>
              <span className="gold-accent">2.8/sec</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightning Pattern Visualization */}
      <div className="border border-gray-700 rounded p-6 bg-gray-900/30">
        <div className="terminal-text text-lg mb-4">LIGHTNING PATTERN</div>
        <div className="grid grid-cols-8 gap-2 h-32">
          {Array.from({ length: 32 }, (_, i) => (
            <div 
              key={i}
              className="bg-gray-800 rounded"
            >
              <div 
                className={`bg-[#87CEFA] rounded transition-all duration-1000 ${Math.random() > 0.7 ? 'power-bar' : ''}`}
                style={{ 
                  height: `${Math.random() * 100}%`,
                  opacity: Math.random() > 0.5 ? 1 : 0.3
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.ThunderData = ThunderData;