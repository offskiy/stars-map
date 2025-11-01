'use client';

import { useCallback } from 'react';
import type { DesignerConfig, ColorTheme, ShapeMask } from '../types';
import { COLOR_THEMES } from '../types';

interface DesignFormProps {
  config: DesignerConfig;
  onChange: (updates: Partial<DesignerConfig>) => void;
}

export default function DesignForm({ config, onChange }: DesignFormProps) {
  const handleThemeChange = useCallback((colorTheme: ColorTheme) => {
    onChange({ colorTheme });
  }, [onChange]);

  const handleShapeChange = useCallback((shapeMask: ShapeMask) => {
    onChange({ shapeMask });
  }, [onChange]);

  const handleToggle = useCallback((key: keyof DesignerConfig, value: boolean) => {
    onChange({ [key]: value });
  }, [onChange]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Design</h3>
        <p className="text-sm text-gray-600 mb-6">
          Customize the look and feel of your star map
        </p>
      </div>

      {/* Color Theme */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Color Theme
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {(Object.keys(COLOR_THEMES) as ColorTheme[]).map((theme) => {
            const themeData = COLOR_THEMES[theme];
            const isSelected = config.colorTheme === theme;

            return (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                className={`relative p-4 rounded-lg border-2 transition ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                aria-label={`Select ${themeData.label} theme`}
              >
                <div
                  className="w-full aspect-square rounded-md mb-2"
                  style={{ backgroundColor: themeData.bg }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center text-xs font-bold"
                    style={{ color: themeData.fg }}
                  >
                    ✨
                  </div>
                </div>
                <div className="text-xs font-medium text-gray-900 text-center">
                  {themeData.label}
                </div>
                {isSelected && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shape Mask */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Shape
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['plain', 'circle', 'heart'] as ShapeMask[]).map((shape) => {
            const isSelected = config.shapeMask === shape;
            const icons = {
              plain: '▢',
              circle: '●',
              heart: '♥',
            };

            return (
              <button
                key={shape}
                onClick={() => handleShapeChange(shape)}
                className={`p-4 rounded-lg border-2 transition ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
                aria-label={`Select ${shape} shape`}
              >
                <div className="text-3xl text-center mb-1">{icons[shape]}</div>
                <div className="text-xs font-medium text-gray-900 text-center capitalize">
                  {shape}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Display Options */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Display Options
        </label>
        <div className="space-y-3">
          {/* Constellations */}
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <div className="font-medium text-gray-900">Constellations</div>
              <div className="text-xs text-gray-600">Show constellation lines</div>
            </div>
            <input
              type="checkbox"
              checked={config.showConstellations}
              onChange={(e) => handleToggle('showConstellations', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              aria-label="Show constellations"
            />
          </label>

          {/* Labels */}
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <div className="font-medium text-gray-900">Labels</div>
              <div className="text-xs text-gray-600">Show star and constellation names</div>
            </div>
            <input
              type="checkbox"
              checked={config.showLabels}
              onChange={(e) => handleToggle('showLabels', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              aria-label="Show labels"
            />
          </label>

          {/* Grid */}
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <div className="font-medium text-gray-900">Grid</div>
              <div className="text-xs text-gray-600">Show coordinate grid lines</div>
            </div>
            <input
              type="checkbox"
              checked={config.showGrid}
              onChange={(e) => handleToggle('showGrid', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              aria-label="Show grid"
            />
          </label>

          {/* Milky Way */}
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <div className="font-medium text-gray-900">Milky Way</div>
              <div className="text-xs text-gray-600">Show the Milky Way galaxy</div>
            </div>
            <input
              type="checkbox"
              checked={config.showMilkyWay}
              onChange={(e) => handleToggle('showMilkyWay', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              aria-label="Show Milky Way"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
