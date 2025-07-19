 "use client";
 import { useState, useEffect } from 'react';

// Mock data for the ponds
const mockPondData = {
  pond1: {
    name: "Pond 1",
    currentData: {
      healthScore: 92,
      temperature: 85,
      waterQuality: 92,
      threats: 4,
      bacteriaLevel: 15,
      status: "warning"
    },
    historicalData: [
      { date: "7/3/2025", day: "Thursday", healthScore: 95, bacteriaLevel: 14, temperature: 86, status: "good" },
      { date: "7/4/2025", day: "Friday", healthScore: 93, bacteriaLevel: 12, temperature: 87, status: "good" },
      { date: "7/5/2025", day: "Saturday", healthScore: 98, bacteriaLevel: 8, temperature: 88, status: "good" },
      { date: "7/6/2025", day: "Sunday", healthScore: 99, bacteriaLevel: 15, temperature: 83, status: "good" },
      { date: "7/7/2025", day: "Monday", healthScore: 85, bacteriaLevel: 10, temperature: 85, status: "good" },
      { date: "7/8/2025", day: "Tuesday", healthScore: 81, bacteriaLevel: 16, temperature: 80, status: "good" },
      { date: "7/9/2025", day: "Wednesday", healthScore: 97, bacteriaLevel: 14, temperature: 0, status: "good" },
      { date: "7/10/2025", day: "Thursday", healthScore: 98, bacteriaLevel: 7, temperature: 0, status: "good" },
      { date: "7/11/2025", day: "Friday", healthScore: 80, bacteriaLevel: 15, temperature: 0, status: "warning" }
    ]
  },
  pond2: {
    name: "Pond 2",
    currentData: {
      healthScore: 88,
      temperature: 85,
      waterQuality: 88,
      threats: 0,
      bacteriaLevel: 12,
      status: "good"
    },
    historicalData: [
      { date: "7/3/2025", day: "Thursday", healthScore: 95, bacteriaLevel: 14, temperature: 86, status: "good" },
      { date: "7/4/2025", day: "Friday", healthScore: 93, bacteriaLevel: 12, temperature: 87, status: "good" },
      { date: "7/5/2025", day: "Saturday", healthScore: 98, bacteriaLevel: 8, temperature: 88, status: "good" },
      { date: "7/6/2025", day: "Sunday", healthScore: 99, bacteriaLevel: 15, temperature: 83, status: "good" },
      { date: "7/7/2025", day: "Monday", healthScore: 85, bacteriaLevel: 10, temperature: 85, status: "good" },
      { date: "7/8/2025", day: "Tuesday", healthScore: 81, bacteriaLevel: 16, temperature: 80, status: "good" },
      { date: "7/9/2025", day: "Wednesday", healthScore: 97, bacteriaLevel: 14, temperature: 0, status: "good" },
      { date: "7/10/2025", day: "Thursday", healthScore: 98, bacteriaLevel: 7, temperature: 0, status: "good" },
      { date: "7/11/2025", day: "Friday", healthScore: 80, bacteriaLevel: 15, temperature: 0, status: "good" }
    ]
  }
};

const threatData = {
  chemical: {
    ammonia: { level: 0.8, status: "danger", unit: "ppm" },
    nitrites: { level: 0.1, status: "good", unit: "ppm" },
    pesticides: { level: 0, status: "good", unit: "ppm" },
    heavyMetals: { level: 0.3, status: "danger", unit: "ppm" }
  },
  biological: {
    bacteria: { level: "medium", status: "danger" },
    virus: { level: "low", status: "good" },
    parasites: { level: "low", status: "good" },
    fungi: { level: "low", status: "danger" }
  },
  weeklyAnalysis: [
    { temp: 29, day: "Mon", status: "good" },
    { temp: 22, day: "Tue", status: "warning" },
    { temp: 19, day: "Wed", status: "good" },
    { temp: 28, day: "Thu", status: "biological" }
  ]
};

const qpcrData = [
  { month: "Jan", value: 18 },
  { month: "Feb", value: 22 },
  { month: "Mar", value: 25 },
  { month: "Apr", value: 35 },
  { month: "May", value: 32 },
  { month: "Jun", value: 28 }
];

export default function AquaDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPond, setSelectedPond] = useState('pond1');
  const [showAddPond, setShowAddPond] = useState(false);
  const [newPond, setNewPond] = useState({
    name: '',
    temperature: '',
    capacity: '',
    fishType: '',
    location: ''
  });

  // Status indicator component
  const StatusIndicator = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'good': return 'bg-green-500';
        case 'warning': return 'bg-yellow-500';
        case 'danger': return 'bg-red-500';
        default: return 'bg-gray-500';
      }
    };

    return (
      <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
    );
  };

  // Historical data card component
  const HistoricalCard = ({ data }) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-lg font-semibold">{data.date}</p>
          <p className="text-sm opacity-70">{data.day}</p>
        </div>
        <StatusIndicator status={data.status} />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="opacity-70">Health Score</span>
          <span className="font-semibold">{data.healthScore}%</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-70">Bacteria Level</span>
          <span className="font-semibold">{data.bacteriaLevel} CFU/ml</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-70">Temperature</span>
          <span className="font-semibold">{data.temperature}°F</span>
        </div>
      </div>
    </div>
  );

  // Threat item component
  const ThreatItem = ({ name, level, status, unit }) => (
    <div className="flex justify-between items-center py-2">
      <span className="text-white opacity-80">{name}</span>
      <div className="flex items-center space-x-2">
        <span className={`text-sm px-2 py-1 rounded ${
          status === 'danger' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}>
          {status === 'danger' ? 'YES' : 'NO'}
        </span>
        <span className="text-white text-sm">
          {typeof level === 'number' ? `(${level} ${unit})` : `(${level})`}
        </span>
      </div>
    </div>
  );

  // Weekly analysis item component
  const WeeklyItem = ({ temp, day, status }) => (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center space-x-2">
        {status === 'good' ? (
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        ) : status === 'warning' ? (
          <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
            <span className="text-white text-xs">⚠</span>
          </div>
        ) : (
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white text-xs">🧪</span>
          </div>
        )}
        <span className="text-white">{temp}°</span>
        <span className="text-white opacity-70">{day}</span>
      </div>
      <span className="text-white opacity-70 capitalize">
        {status === 'biological' ? 'Biological' : status === 'warning' ? 'Chemical' : 'Clear'}
      </span>
    </div>
  );

  // Simple chart component
  const SimpleChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="h-32 flex items-end justify-between px-4">
        {data.map((point, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div 
              className="w-8 bg-blue-400 rounded-t"
              style={{ height: `${(point.value / maxValue) * 100}px` }}
            ></div>
            <span className="text-xs text-white opacity-70">{point.month}</span>
          </div>
        ))}
      </div>
    );
  };

  // Add pond handler
  const handleAddPond = () => {
    if (newPond.name) {
      // In a real app, this would save to a database
      console.log('Adding pond:', newPond);
      setShowAddPond(false);
      setNewPond({ name: '', temperature: '', capacity: '', fishType: '', location: '' });
    }
  };

  if (currentView === 'history') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-white">
              Historical Data - {mockPondData[selectedPond].name}
            </h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedPond('pond1')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedPond === 'pond1' 
                  ? 'bg-white text-blue-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Pond 1
            </button>
            <button
              onClick={() => setSelectedPond('pond2')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedPond === 'pond2' 
                  ? 'bg-white text-blue-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Pond 2
            </button>
          </div>
        </div>

        {/* Historical Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPondData[selectedPond].historicalData.map((data, index) => (
            <HistoricalCard key={index} data={data} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-00 to-blue-400 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-6">
          <h1 className="text-3xl font-bold text-white">Aqua Dashboard</h1>
          <div className="flex items-center space-x-4 text-sm text-white">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
              <span>Water Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Chemical Threats</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Biological Threats</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>QPCR Analysis</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setCurrentView('history')}
            className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            📊 View History
          </button>
          <button
            onClick={() => setShowAddPond(true)}
            className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            + Add Pond
          </button>
          <span className="text-white px-4 py-2">home</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Threat Analysis */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Threat Analysis</h2>
          
          {/* Active Threats Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-red-400 text-xl">⚠</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Chemical Threats</h3>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">4</div>
                <div className="text-sm text-white opacity-70">Active Threats</div>
              </div>
            </div>

            {/* Chemical Threats */}
            <div className="space-y-2">
              <ThreatItem 
                name="Ammonia" 
                level={threatData.chemical.ammonia.level} 
                status={threatData.chemical.ammonia.status}
                unit={threatData.chemical.ammonia.unit}
              />
              <ThreatItem 
                name="Nitrites" 
                level={threatData.chemical.nitrites.level} 
                status={threatData.chemical.nitrites.status}
                unit={threatData.chemical.nitrites.unit}
              />
              <ThreatItem 
                name="Pesticides" 
                level={threatData.chemical.pesticides.level} 
                status={threatData.chemical.pesticides.status}
                unit={threatData.chemical.pesticides.unit}
              />
              <ThreatItem 
                name="HeavyMetals" 
                level={threatData.chemical.heavyMetals.level} 
                status={threatData.chemical.heavyMetals.status}
                unit={threatData.chemical.heavyMetals.unit}
              />
            </div>

            {/* Biological Threats */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <h4 className="text-white font-semibold mb-4">Biological Threats</h4>
              <div className="space-y-2">
                <ThreatItem 
                  name="Bacteria" 
                  level={threatData.biological.bacteria.level} 
                  status={threatData.biological.bacteria.status}
                />
                <ThreatItem 
                  name="Virus" 
                  level={threatData.biological.virus.level} 
                  status={threatData.biological.virus.status}
                />
                <ThreatItem 
                  name="Parasites" 
                  level={threatData.biological.parasites.level} 
                  status={threatData.biological.parasites.status}
                />
                <ThreatItem 
                  name="Fungi" 
                  level={threatData.biological.fungi.level} 
                  status={threatData.biological.fungi.status}
                />
              </div>
            </div>

            {/* Weekly Analysis */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <h4 className="text-white font-semibold mb-4">Weekly Analysis</h4>
              <div className="space-y-2">
                {threatData.weeklyAnalysis.map((item, index) => (
                  <WeeklyItem 
                    key={index}
                    temp={item.temp}
                    day={item.day}
                    status={item.status}
                  />
                ))}
              </div>
            </div>

            {/* Status indicators */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-white text-sm">Danger</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white text-sm">Clear</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white text-sm">Clear</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Dashboard */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            <span className="text-white opacity-70">88</span>
          </div>

          {/* QPCR Analysis Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 text-xl">⏱</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Temperature</h3>
                </div>
              </div>
              <div className="text-white opacity-70">📊</div>
            </div>

            <SimpleChart data={qpcrData} />
          </div>

          {/* Daily Status */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-400 text-xl">⚠</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Threats</h3>
                  <p className="text-white opacity-70 text-sm">0 active</p>
                </div>
              </div>
              <button className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                Clear
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold">Check Details</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">29°</span>
                    <span className="text-white opacity-70">Mon</span>
                  </div>
                  <span className="text-white opacity-70">Clean</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">22°</span>
                    <span className="text-white opacity-70">Tue</span>
                  </div>
                  <span className="text-white opacity-70">Clear</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">19°</span>
                    <span className="text-white opacity-70">Wed</span>
                  </div>
                  <span className="text-white opacity-70">Clear</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white">28°</span>
                    <span className="text-white opacity-70">Thu</span>
                  </div>
                  <span className="text-white opacity-70">Clear</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-white text-sm">Danger</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white text-sm">Clear</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white text-sm">Clear</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Ponds Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">All Ponds (2)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pond 1 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Pond 1</h3>
              <StatusIndicator status="warning" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white opacity-70">Water Quality</span>
                <span className="text-white font-semibold">92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white opacity-70">Temperature</span>
                <span className="text-white font-semibold">85°F</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white opacity-70">Threats</span>
                <span className="text-white font-semibold">4</span>
              </div>
            </div>
          </div>

          {/* Pond 2 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Pond 2</h3>
              <StatusIndicator status="good" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white opacity-70">Water Quality</span>
                <span className="text-white font-semibold">88%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white opacity-70">Temperature</span>
                <span className="text-white font-semibold">85°F</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white opacity-70">Threats</span>
                <span className="text-white font-semibold">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
   {/* Add Pond Modal */}
   {showAddPond && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Add New Pond</h3>
              <button
                onClick={() => setShowAddPond(false)}
                className="text-white opacity-70 hover:opacity-100"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white opacity-70 mb-2">Pond Name</label>
                <input
                  type="text"
                  placeholder="Enter pond name"
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={newPond.name}
                  onChange={(e) => setNewPond({ ...newPond, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white opacity-70 mb-2">Temperature (°F)</label>
                  <input
                    type="number"
                    placeholder="75"
                    className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newPond.temperature}
                    onChange={(e) => setNewPond({ ...newPond, temperature: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-white opacity-70 mb-2">Capacity (L)</label>
                  <input
                    type="number"
                    placeholder="5000"
                    className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newPond.capacity}
                    onChange={(e) => setNewPond({ ...newPond, capacity: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-white opacity-70 mb-2">Fish Type</label>
                <input
                  type="text"
                  placeholder="Tilapia"
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={newPond.fishType}
                  onChange={(e) => setNewPond({ ...newPond, fishType: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-white opacity-70 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="North Sector A"
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={newPond.location}
                  onChange={(e) => setNewPond({ ...newPond, location: e.target.value })}
                />
              </div>
              <button
                onClick={handleAddPond}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Pond
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

