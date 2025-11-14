

import React from 'react';

// Helper component for daily forecast card
function DayForecastCard({ day, icon, high, low, precip, details }) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className="bg-white rounded-xl shadow-lg p-2 flex flex-col items-center border border-purple-200 text-xs">
      <div className="flex items-center justify-between w-full mb-1">
        <span className="font-bold text-purple-700 text-base">{day}</span>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="flex items-center gap-1 mb-1">
        <span className="text-blue-700 font-bold text-base">{high}°</span>
        <span className="text-gray-400">/</span>
        <span className="text-blue-400 font-bold text-base">{low}°</span>
      </div>
      <div className="text-xs text-purple-500 mb-1">Precip: {precip}%</div>
      <button
        className="text-[10px] text-purple-600 underline mb-1 focus:outline-none"
        onClick={() => setExpanded(e => !e)}
      >
        {expanded ? 'Hide Details' : 'Show Details'}
      </button>
      {expanded && (
        <div className="text-[10px] text-gray-600 bg-purple-50 rounded p-1 w-full mt-1">{details}</div>
      )}
    </div>
  );
}

const sevenDayData = [
  { day: 'Mon', icon: '🌤️', high: 75, low: 60, precip: 10, details: 'Partly cloudy. Humidity: 55%. Wind: 7 mph.' },
  { day: 'Tue', icon: '🌦️', high: 72, low: 58, precip: 40, details: 'Showers likely. Humidity: 65%. Wind: 10 mph.' },
  { day: 'Wed', icon: '☀️', high: 78, low: 62, precip: 0, details: 'Sunny. Humidity: 50%. Wind: 5 mph.' },
  { day: 'Thu', icon: '🌧️', high: 70, low: 57, precip: 60, details: 'Rainy. Humidity: 70%. Wind: 12 mph.' },
  { day: 'Fri', icon: '⛅', high: 74, low: 59, precip: 20, details: 'Mostly cloudy. Humidity: 60%. Wind: 8 mph.' },
  { day: 'Sat', icon: '🌦️', high: 73, low: 58, precip: 30, details: 'Scattered showers. Humidity: 63%. Wind: 9 mph.' },
  { day: 'Sun', icon: '☀️', high: 80, low: 65, precip: 0, details: 'Sunny. Humidity: 48%. Wind: 6 mph.' },
];

const WeatherApp = ({ onBackToDashboard, user }) => {

  // All state hooks first
  const [recentSearches, setRecentSearches] = React.useState([]);
  const [weatherData, setWeatherData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('');
  const [customLocation, setCustomLocation] = React.useState('');
  const [showRecentDropdown, setShowRecentDropdown] = React.useState(false);
  // Automatically set current location on startup
  React.useEffect(() => {
    if (!selectedLocation && navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
          const geoData = await geoRes.json();
          if (geoData && geoData[0] && geoData[0].name) {
            setSelectedLocation(geoData[0].name);
            setRecentSearches(prev => {
              const updated = [geoData[0].name, ...prev.filter(l => l !== geoData[0].name)].slice(0, 5);
              return updated;
            });
          } else {
            setSelectedLocation('Current Location');
          }
        } catch {
          setSelectedLocation('Current Location');
        }
        setLoading(false);
        setCustomLocation('');
        setShowRecentDropdown(false);
      }, () => {
        setSelectedLocation('Current Location');
        setLoading(false);
        setCustomLocation('');
        setShowRecentDropdown(false);
      });
    }
  }, [selectedLocation]);

  // Fetch weather data when selectedLocation changes
  React.useEffect(() => {
    if (!selectedLocation) return;
    setLoading(true);
    setError('');
    // Backend integration: Use deployed backend URL
    const fetchWeather = async (city) => {
      try {
        const response = await fetch(`https://cdsback-backend.onrender.com/weather?city=${encodeURIComponent(city)}`);
        if (!response.ok) throw new Error('Failed to fetch weather');
        const data = await response.json();
        // Use data as you did before (data.main.temp, data.weather[0].description, etc.)
        return data;
      } catch (error) {
        console.error('Weather fetch error:', error);
        return null;
      }
    };

    fetchWeather(selectedLocation)
      .then(data => {
        if (data) {
          setWeatherData(data);
        } else {
          setError('Error fetching weather data');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err?.message || 'Error fetching weather data');
        setLoading(false);
      });
  }, [selectedLocation]);



  // Location select handler (ready for API integration)
  async function handleLocationSelect(location) {
    if (location === 'Current Location' && navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        // Use OpenWeatherMap reverse geocoding API to get city name
        try {
          const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
          const geoData = await geoRes.json();
          if (geoData && geoData[0] && geoData[0].name) {
            // Only use the city name, ignore state completely
            setSelectedLocation(geoData[0].name);
            setRecentSearches(prev => {
              const updated = [geoData[0].name, ...prev.filter(l => l !== geoData[0].name)].slice(0, 5);
              return updated;
            });
          } else {
            setSelectedLocation('Current Location');
          }
        } catch {
          setSelectedLocation('Current Location');
        }
        setLoading(false);
        setCustomLocation('');
        setShowRecentDropdown(false);
      }, () => {
        setSelectedLocation('Current Location');
        setLoading(false);
        setCustomLocation('');
        setShowRecentDropdown(false);
      });
      return;
    }
    if (location) {
      setSelectedLocation(location);
      setRecentSearches(prev => {
        const updated = [location, ...prev.filter(l => l !== location)].slice(0, 5);
        return updated;
      });
    }
    setCustomLocation('');
    setShowRecentDropdown(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-0">
      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-full p-8 shadow-lg flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-blue-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="text-blue-700 font-semibold">Wait I'm Thinking...</span>
          </div>
        </div>
      )}
      {/* Error Message Banner */}
      {error && (
        <div className="fixed top-0 left-0 w-full bg-red-100 text-red-700 font-bold py-2 px-4 text-center z-50 shadow-lg">
          {error}
        </div>
      )}
      {/* Header - Unified style */}
      <header className="w-full bg-slate-800 p-4 shadow-xl">
        <div className="flex items-center justify-between w-full gap-4">
              {/* Spacer to help center title with card */}
              <div style={{ width: '112px' }}></div>
          {/* Centered Title */}
          <h1 className="text-3xl font-extrabold text-white text-center tracking-wider flex-1">
            Cassandra's Digital Solutions
          </h1>
          {/* Header Navigation Buttons (far right) */}
          <div className="flex space-x-2">
            <button
              onClick={onBackToDashboard}
              className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  window.location.href = '/';
                }
              }}
              className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
            >
              Logout
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Logo Section - Enhanced (outside main content container) */}
      <div className="w-full flex justify-center py-8">
        <div className="mb-6 text-center">
          {/* Logo Container with Animation */}
          <div className="relative inline-block">
            <div className="w-40 h-40 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-white">
              <span className="text-white font-bold text-4xl tracking-wider">CDS</span>
            </div>
            {/* Animated Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Main Content - Weather App Layout */}
      <div className="flex flex-col items-center w-full px-4 py-8 flex-grow">
  <div className="bg-blue-100 rounded-2xl shadow-2xl p-4 w-full max-w-3xl transition-all duration-300 border border-blue-200 -mt-12 mb-2">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center border-b pb-2 border-gray-100">
            {user?.firstName ? `${user.firstName}'s` : "Cassandra's"} Weather Forecast
          </h2>

          {/* LAYOUT PLANNING SECTION - NO FUNCTIONALITY YET */}
          {/* Logo Section - Enhanced */}
          
          {/* Search Section - Compact Professional Design */}
          <div className="mb-8">
            {/* Search Bar and Controls */}
            <div className="flex flex-col items-center w-full mb-6">
              <div className="relative w-full max-w-md mb-4">
                <div className="flex w-full items-center gap-2">
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex-1 flex justify-end">
                      <button
                        type="button"
                        className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-blue-700 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition-all duration-200 ${selectedLocation === 'Current Location' ? 'ring-2 ring-blue-400' : ''}`}
                        style={{ minWidth: '220px', height: '40px', fontSize: '1rem', paddingLeft: '1.25rem', paddingRight: '1.25rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', lineHeight: '1.2', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
                        onClick={() => handleLocationSelect('Current Location')}
                      >
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.42 1.42M6.35 17.65l-1.42 1.42m12.02 0l-1.42-1.42M6.35 6.35L4.93 4.93" />
                        </svg>
                        <span className="whitespace-nowrap">Set Current Location</span>
                      </button>
                    </div>
                    <div className="relative flex-1 flex justify-center">
                      <input
                        type="text"
                        placeholder="Search city or state..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base pr-10"
                        value={customLocation}
                        onChange={e => setCustomLocation(e.target.value)}
                        onFocus={() => setShowRecentDropdown(true)}
                        onBlur={() => setTimeout(() => setShowRecentDropdown(false), 150)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') handleLocationSelect(customLocation);
                        }}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="11" cy="11" r="8" stroke="currentColor" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                {/* Recent Searches Dropdown */}
                {showRecentDropdown && recentSearches.length > 0 && (
                  <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2">
                    <div className="text-xs text-gray-500 mb-2">Recent Searches</div>
                    {recentSearches.map((loc, idx) => (
                      <button
                        key={idx}
                        className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-700 text-sm font-medium"
                        onMouseDown={() => handleLocationSelect(loc)}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>



            {/* Search Bar and Controls - Update location on submit */}

            {/* Controls moved to Settings card */}

            {/* Current Weather Card Only */}
            <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Current Weather</h2>
            <div className="flex justify-center w-full mb-8">
              <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <span className="text-3xl mr-3">{weatherData ? '�️' : '�🌤️'}</span>
                  <span className="text-2xl font-bold text-gray-800">{selectedLocation}</span>
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-5xl font-bold text-blue-600 mr-4">
                    {weatherData ? `${Math.round(weatherData.main.temp)}°F` : '72°F'}
                  </span>
                  <span className="text-lg text-gray-500">
                    {weatherData ? weatherData.weather[0].description : 'Partly Cloudy'}
                  </span>
                </div>
                <div className="flex flex-row justify-between w-full text-sm text-gray-600">
                  <div className="flex flex-col items-center flex-1">
                    <span className="font-semibold">Humidity</span>
                    <span>{weatherData ? `${weatherData.main.humidity}%` : '60%'}</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="font-semibold">Wind</span>
                    <span>{weatherData ? `${weatherData.wind.speed} mph` : '8 mph'}</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="font-semibold">Feels Like</span>
                    <span>{weatherData ? `${Math.round(weatherData.main.feels_like)}°F` : '70°F'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast Section - Now replaces 24-hour forecast */}
            <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">7-Day Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
              {sevenDayData.map((day, idx) => (
                <DayForecastCard key={idx} {...day} />
              ))}
            </div>


            <div className="mt-10 mb-8 flex flex-row justify-center w-full gap-8">
              {/* Weather Details Card */}
              <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <span className="text-3xl mr-3">🌅</span>
                  <span className="text-2xl font-bold text-gray-800">Weather Details</span>
                </div>
                <div className="flex flex-col w-full text-sm text-gray-600 mt-4">
                  <div className="mb-2">
                    <span className="font-semibold">• Sunrise/Sunset times:</span>
                    <span className="ml-2">
                      {weatherData && weatherData.sys ?
                        `${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} / ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                        : '--:-- / --:--'}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">• Moon phase:</span>
                    <span className="ml-2">--</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">• Air quality index:</span>
                    <span className="ml-2">--</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">• Wind direction & gusts:</span>
                    <span className="ml-2">
                      {weatherData && weatherData.wind ? `${weatherData.wind.deg}° / ${weatherData.wind.gust ? weatherData.wind.gust + ' mph' : '-- mph'}` : '-- / -- mph'}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">• Dew point:</span>
                    <span className="ml-2">--°F</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">• Cloud coverage:</span>
                    <span className="ml-2">{weatherData && weatherData.clouds ? `${weatherData.clouds.all}%` : '--%'}</span>
                  </div>
                </div>
              </div>
              {/* Settings Card */}
              <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-gray-800 mr-2">⚙️ Settings</span>
                </div>
                <div className="flex flex-wrap gap-4 w-full justify-center">
                  {/* Theme Toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">Theme:</span>
                    <button type="button" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-blue-700 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition-all duration-200" style={{ minWidth: '120px', height: '36px', fontSize: '1rem', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', lineHeight: '1.2', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75z"/></svg>
                      Light
                    </button>
                    <button type="button" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-blue-700 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition-all duration-200" style={{ minWidth: '120px', height: '36px', fontSize: '1rem', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', lineHeight: '1.2', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18z"/></svg>
                      Dark
                    </button>
                  </div>
                  {/* Unit Toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">Units:</span>
                    <button type="button" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-blue-700 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition-all duration-200" style={{ minWidth: '120px', height: '36px', fontSize: '1rem', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', lineHeight: '1.2', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
                      °F
                    </button>
                    <button type="button" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-blue-700 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition-all duration-200" style={{ minWidth: '120px', height: '36px', fontSize: '1rem', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', lineHeight: '1.2', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12"/></svg>
                      °C
                    </button>
                  </div>
                  {/* Alerts Button */}
                  <button type="button" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-blue-700 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition-all duration-200" style={{ minWidth: '120px', height: '36px', fontSize: '1rem', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', lineHeight: '1.2', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd"/></svg>
                    Alerts
                  </button>
                  {/* Notify Button */}
                  <button type="button" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-blue-700 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition-all duration-200" style={{ minWidth: '120px', height: '36px', fontSize: '1rem', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', lineHeight: '1.2', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.243.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd"/></svg>
                    Notify
                  </button>
                </div>
              </div>
            </div>







          </div> {/* Close main content container */}
        </div> {/* Close flex-col container */}
      </div> {/* Close min-h-screen container */}
      {/* Footer - Consistent with other apps */}
      <footer className="w-full bg-slate-800 p-4 shadow-xl mt-auto">
        <p className="text-gray-300 text-center text-sm font-medium">
          &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default WeatherApp;