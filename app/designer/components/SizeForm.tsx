'use client';

import { useCallback } from 'react';
import type { DesignerConfig, PosterSize } from '../types';
import { POSTER_SIZES } from '../types';

interface SizeFormProps {
  config: DesignerConfig;
  onChange: (updates: Partial<DesignerConfig>) => void;
}

const PRICING = {
  S: 49,
  M: 79,
  L: 99,
  XL: 119,
};

export default function SizeForm({ config, onChange }: SizeFormProps) {
  const handleSizeChange = useCallback((posterSize: PosterSize) => {
    onChange({ posterSize });
  }, [onChange]);

  const handleFrameToggle = useCallback((showFrame: boolean) => {
    onChange({ showFrame });
  }, [onChange]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Size & Format</h3>
        <p className="text-sm text-gray-600 mb-6">
          Choose the perfect size for your space
        </p>
      </div>

      {/* Size Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Poster Size
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Object.keys(POSTER_SIZES) as PosterSize[]).map((size) => {
            const sizeData = POSTER_SIZES[size];
            const isSelected = config.posterSize === size;
            const price = PRICING[size];
            const isPopular = size === 'M';

            return (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`relative p-4 rounded-lg border-2 transition ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
                aria-label={`Select ${size} size - ${sizeData.label}`}
              >
                {isPopular && !isSelected && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{size}</div>
                  <div className="text-xs text-gray-600 mb-2">{sizeData.label}</div>
                  <div className="text-sm font-bold text-gray-900">${price}</div>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
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

      {/* Frame Option */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Preview Options
        </label>
        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition border border-gray-200">
          <div>
            <div className="font-medium text-gray-900">Show Frame Preview</div>
            <div className="text-xs text-gray-600">See how it looks with a frame (preview only)</div>
          </div>
          <input
            type="checkbox"
            checked={config.showFrame}
            onChange={(e) => handleFrameToggle(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            aria-label="Show frame preview"
          />
        </label>
      </div>

      {/* Size comparison */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-xs font-semibold text-gray-700 mb-3">Size Comparison</div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-10 bg-gray-300 rounded flex-shrink-0"></div>
            <div className="text-xs">
              <div className="font-medium text-gray-900">Small (S)</div>
              <div className="text-gray-600">Perfect for desks or shelves</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-12 bg-gray-400 rounded flex-shrink-0"></div>
            <div className="text-xs">
              <div className="font-medium text-gray-900">Medium (M) - Most Popular</div>
              <div className="text-gray-600">Ideal for living rooms or bedrooms</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-14 bg-gray-500 rounded flex-shrink-0"></div>
            <div className="text-xs">
              <div className="font-medium text-gray-900">Large (L)</div>
              <div className="text-gray-600">Makes a statement on any wall</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-14 h-16 bg-gray-600 rounded flex-shrink-0"></div>
            <div className="text-xs">
              <div className="font-medium text-gray-900">Extra Large (XL)</div>
              <div className="text-gray-600">Premium centerpiece for large spaces</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-xs font-semibold text-blue-900 mb-2">Included with all sizes:</div>
        <ul className="text-xs text-blue-800 space-y-1">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Premium matte photo paper
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Archival quality inks
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Free shipping on orders over $75
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            30-day satisfaction guarantee
          </li>
        </ul>
      </div>
    </div>
  );
}
