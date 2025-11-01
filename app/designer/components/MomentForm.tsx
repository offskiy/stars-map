'use client';

import { useState, useCallback, useEffect } from 'react';
import type { DesignerConfig, Location } from '../types';

interface MomentFormProps {
  config: DesignerConfig;
  onChange: (updates: Partial<DesignerConfig>) => void;
}

// Popular cities for quick selection
const POPULAR_CITIES: Location[] = [
  { name: 'New York, USA', lat: 40.7128, lng: -74.006, timezone: 'America/New_York' },
  { name: 'London, UK', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London' },
  { name: 'Paris, France', lat: 48.8566, lng: 2.3522, timezone: 'Europe/Paris' },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, timezone: 'Asia/Tokyo' },
  { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093, timezone: 'Australia/Sydney' },
  { name: 'Los Angeles, USA', lat: 34.0522, lng: -118.2437, timezone: 'America/Los_Angeles' },
  { name: 'Rome, Italy', lat: 41.9028, lng: 12.4964, timezone: 'Europe/Rome' },
  { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708, timezone: 'Asia/Dubai' },
];

export default function MomentForm({ config, onChange }: MomentFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const filteredCities = POPULAR_CITIES.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = useCallback((location: Location) => {
    onChange({ location });
    setSearchQuery('');
    setShowSuggestions(false);
  }, [onChange]);

  const handleDetectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onChange({
          location: {
            name: 'Current Location',
            lat: latitude,
            lng: longitude,
          },
        });
        setIsDetectingLocation(false);
      },
      (error) => {
        console.error('Error detecting location:', error);
        alert('Failed to detect location. Please enter manually.');
        setIsDetectingLocation(false);
      }
    );
  }, [onChange]);

  const handleDateChange = useCallback((date: string) => {
    onChange({ date });
  }, [onChange]);

  const handleTimeChange = useCallback((time: string) => {
    onChange({ time });
  }, [onChange]);

  const setToday = useCallback(() => {
    onChange({ date: new Date().toISOString().split('T')[0] });
  }, [onChange]);

  const setNow = useCallback(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    onChange({ time: `${hours}:${minutes}` });
  }, [onChange]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">When & Where</h3>
        <p className="text-sm text-gray-600 mb-6">
          Choose the moment you want to capture in the stars
        </p>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
          Location
        </label>
        <div className="relative">
          <input
            id="location"
            type="text"
            value={searchQuery || config.location.name}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for a city..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Location search"
          />

          {/* Suggestions dropdown */}
          {showSuggestions && searchQuery && filteredCities.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredCities.map((city, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLocationSelect(city)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition"
                >
                  <div className="font-medium text-gray-900">{city.name}</div>
                  <div className="text-xs text-gray-500">
                    {city.lat.toFixed(4)}°, {city.lng.toFixed(4)}°
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleDetectLocation}
          disabled={isDetectingLocation}
          className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
        >
          {isDetectingLocation ? 'Detecting...' : '📍 Use my current location'}
        </button>

        {/* Selected location display */}
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-900">{config.location.name}</div>
          <div className="text-xs text-gray-600">
            Coordinates: {config.location.lat.toFixed(4)}°, {config.location.lng.toFixed(4)}°
          </div>
        </div>
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
          Date
        </label>
        <div className="flex gap-2">
          <input
            id="date"
            type="date"
            value={config.date}
            onChange={(e) => handleDateChange(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Date"
          />
          <button
            onClick={setToday}
            className="px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            Today
          </button>
        </div>
      </div>

      {/* Time */}
      <div>
        <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">
          Time (optional)
        </label>
        <div className="flex gap-2">
          <input
            id="time"
            type="time"
            value={config.time}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Time"
          />
          <button
            onClick={setNow}
            className="px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            Now
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Enter the time in 24-hour format (e.g., 20:00 for 8:00 PM)
        </p>
      </div>
    </div>
  );
}
