import React, { useState, useEffect } from 'react';

function ShadowArchive() {
  const [archives, setArchives] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState(null);

  useEffect(() => {
    const generateArchives = () => {
      const archiveData = [
        {
          id: 1,
          title: '古雷伝説 - Ancient Thunder Legend',
          date: '2024-01-15',
          type: 'Historical Data',
          description: 'Records of the first lightning storm captured by the system. Peak intensity: 99.7%. Duration: 3 hours 42 minutes.',
          intensity: 99.7
        },
        {
          id: 2,
          title: '雷神降臨 - Thunder God Descent', 
          date: '2024-02-03',
          type: 'Anomalous Event',
          description: 'Unprecedented electromagnetic phenomenon detected. Multiple lightning strikes in perfect synchronization.',
          intensity: 87.3
        },
        {
          id: 3,
          title: '静寂の前 - Before the Silence',
          date: '2024-02-20',
          type: 'System Log',
          description: 'Complete atmospheric calm recorded for 6 hours before massive storm outbreak. Rarest meteorological event.',
          intensity: 45.2
        },
        {
          id: 4,
          title: '雷鳴共鳴 - Thunder Resonance',
          date: '2024-03-10',
          type: 'Frequency Data',
          description: 'Seven thunder claps produced perfect harmonic resonance. Sound waves created standing wave pattern.',
          intensity: 76.8
        },
        {
          id: 5,
          title: '影の稲妻 - Shadow Lightning',
          date: '2024-03-25', 
          type: 'Classified',
          description: 'Lightning strikes with no visible flash detected. Energy signatures suggest unknown phenomenon.',
          intensity: 91.4
        }
      ];
      
      setArchives(archiveData);
    };

    generateArchives();
  }, []);

  const getArchiveTypeColor = (type) => {
    switch (type) {
      case 'Historical Data': return 'text-[#FFD700]';
      case 'Anomalous Event': return 'text-red-400';
      case 'System Log': return 'text-[#87CEFA]';
      case 'Frequency Data': return 'text-green-400';
      case 'Classified': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getIntensityLevel = (intensity) => {
    if (intensity > 90) return { level: 'EXTREME', color: 'text-red-400' };
    if (intensity > 70) return { level: 'HIGH', color: 'text-[#FFD700]' };
    if (intensity > 50) return { level: 'MODERATE', color: 'text-[#87CEFA]' };
    return { level: 'LOW', color: 'text-green-400' };
  };

  return (
    <div className="p-8 space-y-6">
      <div className="terminal-text text-2xl mb-8">
        影 SHADOW ARCHIVE <span className="terminal-cursor">_</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        {/* Archive List */}
        <div className="border border-gray-700 rounded p-6 bg-gray-900/30 overflow-y-auto">
          <div className="terminal-text text-lg mb-4">ARCHIVED EVENTS</div>
          <div className="space-y-4">
            {archives.map((archive) => {
              const intensityInfo = getIntensityLevel(archive.intensity);
              return (
                <div 
                  key={archive.id}
                  onClick={() => setSelectedArchive(archive)}
                  className={`cursor-pointer border rounded p-4 transition-all duration-300 hover:border-[#87CEFA] ${
                    selectedArchive?.id === archive.id 
                      ? 'border-[#87CEFA] bg-[#87CEFA]/10' 
                      : 'border-gray-600 bg-gray-800/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="terminal-text font-semibold text-sm">
                      {archive.title}
                    </div>
                    <div className={`text-xs ${intensityInfo.color}`}>
                      {intensityInfo.level}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs ${getArchiveTypeColor(archive.type)}`}>
                      {archive.type}
                    </span>
                    <span className="text-xs text-gray-500">{archive.date}</span>
                  </div>

                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        archive.intensity > 90 ? 'bg-red-500' :
                        archive.intensity > 70 ? 'bg-[#FFD700]' :
                        archive.intensity > 50 ? 'bg-[#87CEFA]' : 'bg-green-500'
                      }`}
                      style={{ width: `${archive.intensity}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Archive Details */}
        <div className="border border-gray-700 rounded p-6 bg-gray-900/30">
          <div className="terminal-text text-lg mb-4">ARCHIVE DETAILS</div>
          
          {selectedArchive ? (
            <div className="space-y-6">
              <div>
                <div className="terminal-text text-xl font-bold mb-2">
                  {selectedArchive.title}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`${getArchiveTypeColor(selectedArchive.type)}`}>
                    {selectedArchive.type}
                  </span>
                  <span className="text-gray-400">{selectedArchive.date}</span>
                </div>
              </div>

              <div>
                <div className="terminal-text mb-2">INTENSITY LEVEL</div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-gray-800 h-4 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        selectedArchive.intensity > 90 ? 'bg-red-500' :
                        selectedArchive.intensity > 70 ? 'bg-[#FFD700]' :
                        selectedArchive.intensity > 50 ? 'bg-[#87CEFA]' : 'bg-green-500'
                      }`}
                      style={{ width: `${selectedArchive.intensity}%` }}
                    />
                  </div>
                  <span className="terminal-text font-bold">{selectedArchive.intensity}%</span>
                </div>
              </div>

              <div>
                <div className="terminal-text mb-2">DESCRIPTION</div>
                <div className="text-gray-300 leading-relaxed">
                  {selectedArchive.description}
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="terminal-text mb-2">SECURITY CLEARANCE</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#87CEFA] rounded-full animate-pulse"></div>
                  <span className="text-[#87CEFA]">LEVEL 3 - AUTHORIZED</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4 opacity-20">影</div>
              <div className="text-gray-500">Select an archive to view details</div>
            </div>
          )}
        </div>
      </div>

      {/* Archive Statistics */}
      <div className="border border-gray-700 rounded p-6 bg-gray-900/30">
        <div className="terminal-text text-lg mb-4">ARCHIVE STATISTICS</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="gold-accent text-2xl font-bold">{archives.length}</div>
            <div className="text-sm text-gray-400">Total Archives</div>
          </div>
          <div className="text-center">
            <div className="text-[#87CEFA] text-2xl font-bold">
              {archives.filter(a => a.intensity > 80).length}
            </div>
            <div className="text-sm text-gray-400">High Intensity</div>
          </div>
          <div className="text-center">
            <div className="text-red-400 text-2xl font-bold">
              {archives.filter(a => a.type === 'Classified').length}
            </div>
            <div className="text-sm text-gray-400">Classified</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 text-2xl font-bold">
              {(archives.reduce((sum, a) => sum + a.intensity, 0) / archives.length).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400">Avg Intensity</div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ShadowArchive = ShadowArchive;