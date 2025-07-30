import React, { useState, useEffect } from 'react';

function PowerMetrics() {
  const [metrics, setMetrics] = useState({
    systemPower: 0,
    thunderEnergy: 0,
    lightningStorms: 0,
    activeNodes: 0
  });

  const [animatedValues, setAnimatedValues] = useState({
    systemPower: 0,
    thunderEnergy: 0,
    lightningStorms: 0,
    activeNodes: 0
  });

  useEffect(() => {
    // Generate random metrics
    const generateMetrics = () => {
      setMetrics({
        systemPower: Math.floor(Math.random() * 100),
        thunderEnergy: Math.floor(Math.random() * 1000),
        lightningStorms: Math.floor(Math.random() * 50),
        activeNodes: Math.floor(Math.random() * 200)
      });
    };

    generateMetrics();
    const interval = setInterval(generateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate number changes
    const animateValue = (key, targetValue, currentValue) => {
      const diff = targetValue - currentValue;
      const increment = diff / 20;
      
      let frame = 0;
      const animate = () => {
        frame++;
        const newValue = Math.round(currentValue + increment * frame);
        
        setAnimatedValues(prev => ({ ...prev, [key]: newValue }));
        
        if (frame < 20 && Math.abs(newValue - targetValue) > 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimatedValues(prev => ({ ...prev, [key]: targetValue }));
        }
      };
      requestAnimationFrame(animate);
    };

    Object.entries(metrics).forEach(([key, value]) => {
      animateValue(key, value, animatedValues[key]);
    });
  }, [metrics]);

  const createPowerBar = (value, max = 100) => {
    const percentage = (value / max) * 100;
    return (
      <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
        <div 
          className="power-bar h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="p-8 space-y-8">
      <div className="terminal-text text-2xl mb-8">
        力 POWER METRICS <span className="terminal-cursor">_</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* System Power */}
        <div className="border border-gray-700 rounded p-6 bg-gray-900/30">
          <div className="flex justify-between items-center mb-4">
            <span className="terminal-text text-lg">SYSTEM POWER</span>
            <span className="gold-accent text-2xl font-bold">
              {animatedValues.systemPower}%
            </span>
          </div>
          {createPowerBar(animatedValues.systemPower)}
          <div className="terminal-text text-sm mt-2 opacity-60">
            Core Thunder System Status
          </div>
        </div>

        {/* Thunder Energy */}
        <div className="border border-gray-700 rounded p-6 bg-gray-900/30">
          <div className="flex justify-between items-center mb-4">
            <span className="terminal-text text-lg">THUNDER ENERGY</span>
            <span className="text-[#87CEFA] text-2xl font-bold">
              {animatedValues.thunderEnergy}
            </span>
          </div>
          {createPowerBar(animatedValues.thunderEnergy, 1000)}
          <div className="terminal-text text-sm mt-2 opacity-60">
            Lightning Charge Accumulation
          </div>
        </div>

        {/* Lightning Storms */}
        <div className="border border-gray-700 rounded p-6 bg-gray-900/30">
          <div className="flex justify-between items-center mb-4">
            <span className="terminal-text text-lg">ACTIVE STORMS</span>
            <span className="text-[#87CEFA] text-2xl font-bold">
              {animatedValues.lightningStorms}
            </span>
          </div>
          {createPowerBar(animatedValues.lightningStorms, 50)}
          <div className="terminal-text text-sm mt-2 opacity-60">
            Current Weather Disturbances
          </div>
        </div>

        {/* Active Nodes */}
        <div className="border border-gray-700 rounded p-6 bg-gray-900/30">
          <div className="flex justify-between items-center mb-4">
            <span className="terminal-text text-lg">ACTIVE NODES</span>
            <span className="gold-accent text-2xl font-bold">
              {animatedValues.activeNodes}
            </span>
          </div>
          {createPowerBar(animatedValues.activeNodes, 200)}
          <div className="terminal-text text-sm mt-2 opacity-60">
            Connected Thunder Network
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <div className="border-t border-gray-700 pt-6">
        <div className="terminal-text text-lg mb-4">SYSTEM STATUS</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>⚡ Lightning Grid:</span>
            <span className="text-[#87CEFA]">OPERATIONAL</span>
          </div>
          <div className="flex justify-between">
            <span>🌩️ Storm Tracker:</span>
            <span className="gold-accent">ACTIVE</span>
          </div>
          <div className="flex justify-between">
            <span>🔋 Power Reserves:</span>
            <span className="text-[#87CEFA]">CHARGING</span>
          </div>
          <div className="flex justify-between">
            <span>📡 Network Status:</span>
            <span className="gold-accent">CONNECTED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

window.PowerMetrics = PowerMetrics;