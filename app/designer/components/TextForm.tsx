'use client';

import { useCallback } from 'react';
import type { DesignerConfig } from '../types';
import { format } from 'date-fns';

interface TextFormProps {
  config: DesignerConfig;
  onChange: (updates: Partial<DesignerConfig>) => void;
}

export default function TextForm({ config, onChange }: TextFormProps) {
  const handleTitleChange = useCallback((title: string) => {
    onChange({ title });
  }, [onChange]);

  const handleFootnoteChange = useCallback((footnote: string) => {
    onChange({ footnote });
  }, [onChange]);

  const useDefaultFootnote = useCallback(() => {
    const date = new Date(config.date);
    const formattedDate = format(date, 'MMMM d, yyyy');
    const footnote = `${config.location.name} • ${formattedDate} • ${config.time}`;
    onChange({ footnote });
  }, [config, onChange]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Personalize</h3>
        <p className="text-sm text-gray-600 mb-6">
          Add a title and details to make your star map unique
        </p>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
          Title (optional)
        </label>
        <input
          id="title"
          type="text"
          value={config.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g., Our Wedding Night"
          maxLength={50}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Title"
        />
        <div className="mt-1 text-xs text-gray-500 text-right">
          {config.title.length}/50 characters
        </div>
      </div>

      {/* Footnote */}
      <div>
        <label htmlFor="footnote" className="block text-sm font-semibold text-gray-700 mb-2">
          Footnote (optional)
        </label>
        <textarea
          id="footnote"
          value={config.footnote}
          onChange={(e) => handleFootnoteChange(e.target.value)}
          placeholder="e.g., New York • January 1, 2025 • 20:00"
          maxLength={100}
          rows={2}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          aria-label="Footnote"
        />
        <div className="flex justify-between items-center mt-1">
          <button
            onClick={useDefaultFootnote}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Use location & date
          </button>
          <div className="text-xs text-gray-500">
            {config.footnote.length}/100 characters
          </div>
        </div>
      </div>

      {/* Preview examples */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-xs font-semibold text-gray-700 mb-3">Examples:</div>
        <div className="space-y-2">
          <button
            onClick={() => onChange({
              title: 'Our Wedding Night',
              footnote: `${config.location.name} • ${format(new Date(config.date), 'MMMM d, yyyy')}`
            })}
            className="w-full text-left p-2 hover:bg-gray-100 rounded transition"
          >
            <div className="text-sm font-medium text-gray-900">Our Wedding Night</div>
            <div className="text-xs text-gray-600">{config.location.name} • {format(new Date(config.date), 'MMMM d, yyyy')}</div>
          </button>
          <button
            onClick={() => onChange({
              title: 'The Night We Met',
              footnote: 'Where it all began ✨'
            })}
            className="w-full text-left p-2 hover:bg-gray-100 rounded transition"
          >
            <div className="text-sm font-medium text-gray-900">The Night We Met</div>
            <div className="text-xs text-gray-600">Where it all began ✨</div>
          </button>
          <button
            onClick={() => onChange({
              title: 'A Moment in Time',
              footnote: `Stars above ${config.location.name.split(',')[0]}`
            })}
            className="w-full text-left p-2 hover:bg-gray-100 rounded transition"
          >
            <div className="text-sm font-medium text-gray-900">A Moment in Time</div>
            <div className="text-xs text-gray-600">Stars above {config.location.name.split(',')[0]}</div>
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-xs font-semibold text-blue-900 mb-1">💡 Tips</div>
        <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
          <li>Keep titles short and meaningful (under 30 characters works best)</li>
          <li>Use the footnote for date, location, or a personal message</li>
          <li>Leave fields empty for a minimalist look</li>
        </ul>
      </div>
    </div>
  );
}
