'use client';

import type { DesignerStep } from '../types';

interface StepIndicatorProps {
  currentStep: DesignerStep;
  onStepChange: (step: DesignerStep) => void;
}

const STEPS: { id: DesignerStep; label: string; icon: string }[] = [
  { id: 'moment', label: 'Moment', icon: '📅' },
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'text', label: 'Text', icon: '✏️' },
  { id: 'size', label: 'Size', icon: '📏' },
];

export default function StepIndicator({ currentStep, onStepChange }: StepIndicatorProps) {
  const currentIndex = STEPS.findIndex(step => step.id === currentStep);

  return (
    <div className="w-full">
      {/* Desktop: Horizontal stepper */}
      <div className="hidden md:flex items-center justify-center gap-2">
        {STEPS.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < currentIndex;
          const isClickable = index <= currentIndex;

          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => isClickable && onStepChange(step.id)}
                disabled={!isClickable}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-100 text-blue-900'
                    : isCompleted
                    ? 'bg-green-50 text-green-900 hover:bg-green-100'
                    : 'bg-gray-100 text-gray-500'
                } ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                aria-label={`Step ${index + 1}: ${step.label}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="text-lg">{step.icon}</span>
                <span className="font-semibold text-sm">{step.label}</span>
                {isCompleted && (
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              {index < STEPS.length - 1 && (
                <div className="w-8 h-0.5 bg-gray-300 mx-1"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: Dropdown selector */}
      <div className="md:hidden">
        <label htmlFor="step-select" className="sr-only">Current step</label>
        <select
          id="step-select"
          value={currentStep}
          onChange={(e) => onStepChange(e.target.value as DesignerStep)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {STEPS.map((step, index) => (
            <option key={step.id} value={step.id} disabled={index > currentIndex}>
              {step.icon} {step.label}
              {index < currentIndex ? ' ✓' : ''}
            </option>
          ))}
        </select>
        <div className="mt-2 text-xs text-center text-gray-600">
          Step {currentIndex + 1} of {STEPS.length}
        </div>
      </div>
    </div>
  );
}
