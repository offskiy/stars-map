'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import type { DesignerConfig, DesignerStep } from './types';
import { DEFAULT_CONFIG } from './types';
import StarMapCanvas from './components/StarMapCanvas';
import StepIndicator from './components/StepIndicator';
import MomentForm from './components/MomentForm';
import DesignForm from './components/DesignForm';
import TextForm from './components/TextForm';
import SizeForm from './components/SizeForm';
import Script from 'next/script';

const STORAGE_KEY = 'starmap-designer-config';

export default function Designer() {
  const [config, setConfig] = useState<DesignerConfig>(DEFAULT_CONFIG);
  const [currentStep, setCurrentStep] = useState<DesignerStep>('moment');
  const [isClient, setIsClient] = useState(false);

  // Load config from localStorage and URL params on mount
  useEffect(() => {
    setIsClient(true);

    // Load from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConfig(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse stored config:', error);
      }
    }

    // Load from URL params
    const params = new URLSearchParams(window.location.search);
    const updates: Partial<DesignerConfig> = {};

    if (params.has('lat') && params.has('lng')) {
      updates.location = {
        name: params.get('location') || 'Custom Location',
        lat: parseFloat(params.get('lat')!),
        lng: parseFloat(params.get('lng')!),
      };
    }
    if (params.has('date')) updates.date = params.get('date')!;
    if (params.has('time')) updates.time = params.get('time')!;
    if (params.has('theme')) updates.colorTheme = params.get('theme') as any;
    if (params.has('shape')) updates.shapeMask = params.get('shape') as any;
    if (params.has('title')) updates.title = decodeURIComponent(params.get('title')!);
    if (params.has('footnote')) updates.footnote = decodeURIComponent(params.get('footnote')!);

    if (Object.keys(updates).length > 0) {
      setConfig(prev => ({ ...prev, ...updates }));
    }

    // Auto-detect location on first visit
    const hasVisited = localStorage.getItem('starmap-visited');
    if (!hasVisited && navigator.geolocation && !params.has('lat')) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setConfig(prev => ({
            ...prev,
            location: {
              name: 'Current Location',
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
        },
        (error) => {
          console.log('Geolocation not available:', error);
        }
      );
      localStorage.setItem('starmap-visited', 'true');
    }
  }, []);

  // Save to localStorage whenever config changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }
  }, [config, isClient]);

  // Update URL params
  useEffect(() => {
    if (!isClient) return;

    const params = new URLSearchParams();
    params.set('lat', config.location.lat.toString());
    params.set('lng', config.location.lng.toString());
    params.set('location', config.location.name);
    params.set('date', config.date);
    params.set('time', config.time);
    params.set('theme', config.colorTheme);
    params.set('shape', config.shapeMask);
    if (config.title) params.set('title', encodeURIComponent(config.title));
    if (config.footnote) params.set('footnote', encodeURIComponent(config.footnote));

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [config, isClient]);

  const handleConfigChange = useCallback((updates: Partial<DesignerConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const handleReset = useCallback(() => {
    if (confirm('Reset all settings to default?')) {
      setConfig(DEFAULT_CONFIG);
      setCurrentStep('moment');
    }
  }, []);

  const handleShare = useCallback(() => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'My Star Map Design',
        text: 'Check out my custom star map!',
        url,
      }).catch(err => console.log('Share failed:', err));
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  }, []);

  const handleNext = useCallback(() => {
    const steps: DesignerStep[] = ['moment', 'design', 'text', 'size'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    const steps: DesignerStep[] = ['moment', 'design', 'text', 'size'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  }, [currentStep]);

  const handleCheckout = useCallback(() => {
    // TODO: Implement checkout flow
    alert('Checkout feature coming soon! Your design has been saved.');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Script src="/d3.min.js" strategy="beforeInteractive" />
      <Script src="/d3.geo.projection.min.js" strategy="beforeInteractive" />
      <Script src="/celestial.min.js" strategy="beforeInteractive" />


      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
              ✨ Star Map Designer
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                aria-label="Share design"
              >
                Share
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                aria-label="Reset to defaults"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} onStepChange={setCurrentStep} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel: Star Map Preview */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-32">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="aspect-square w-full">
                  <StarMapCanvas config={config} className="w-full h-full" />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <div>
                    {config.location.name}
                  </div>
                  <div>
                    {new Date(config.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Form Controls */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              {/* Form content based on current step */}
              {currentStep === 'moment' && (
                <MomentForm config={config} onChange={handleConfigChange} />
              )}
              {currentStep === 'design' && (
                <DesignForm config={config} onChange={handleConfigChange} />
              )}
              {currentStep === 'text' && (
                <TextForm config={config} onChange={handleConfigChange} />
              )}
              {currentStep === 'size' && (
                <SizeForm config={config} onChange={handleConfigChange} />
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between gap-4">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 'moment'}
                  className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Back
                </button>

                {currentStep === 'size' ? (
                  <button
                    onClick={handleCheckout}
                    className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md"
                  >
                    Proceed to Checkout →
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md"
                  >
                    Next →
                  </button>
                )}
              </div>

              {/* Help text */}
              <div className="mt-4 text-xs text-center text-gray-500">
                Your design is automatically saved. You can return anytime.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <div>
              © 2024 Star Map. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-gray-900 transition">Home</Link>
              <a href="#" className="hover:text-gray-900 transition">Help</a>
              <a href="#" className="hover:text-gray-900 transition">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
