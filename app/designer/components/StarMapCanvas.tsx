'use client';

import { useEffect, useRef, useState } from 'react';
import type { DesignerConfig } from '../types';
import { COLOR_THEMES } from '../types';

interface StarMapCanvasProps {
  config: DesignerConfig;
  className?: string;
}

export default function StarMapCanvas({ config, className = '' }: StarMapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [celestial, setCelestial] = useState<any>(null);

  useEffect(() => {
    // Dynamically import d3-celestial (client-side only)
    const loadCelestial = async () => {
      try {
        setIsLoading(true);
        const Celestial = (await import('d3-celestial')).default;
        setCelestial(Celestial);
      } catch (error) {
        console.error('Failed to load d3-celestial:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCelestial();
  }, []);

  useEffect(() => {
    if (!celestial || !canvasRef.current) return;

    const theme = COLOR_THEMES[config.colorTheme];

    // Calculate datetime from config
    const dateTime = new Date(`${config.date}T${config.time}:00`);

    // Configure celestial display
    const celestialConfig = {
      width: 0, // Auto-size to container
      projection: 'airy',
      transform: 'equatorial',
      center: [config.location.lng, config.location.lat, 0],
      adaptable: true,
      interactive: false,
      form: false,
      location: true,
      container: canvasRef.current,
      datapath: 'https://cdn.jsdelivr.net/npm/d3-celestial@0.7.24/data/',
      stars: {
        colors: true,
        style: { fill: theme.fg, opacity: 0.8 },
        limit: 6,
        size: 5,
        exponent: -0.28,
        designation: config.showLabels,
        designationStyle: {
          fill: theme.fg,
          font: '11px "Open Sans", Helvetica, Arial, sans-serif',
          align: 'left',
          baseline: 'top',
        },
        propername: config.showLabels,
        propernameStyle: {
          fill: theme.fg,
          font: '13px "Open Sans", Helvetica, Arial, sans-serif',
          align: 'right',
          baseline: 'bottom',
        },
        show: true,
      },
      dsos: {
        show: false,
      },
      constellations: {
        names: config.showLabels,
        namesType: 'name',
        nameStyle: {
          fill: theme.accent,
          align: 'center',
          baseline: 'middle',
          font: ['14px "Open Sans", Helvetica, Arial, sans-serif', '12px "Open Sans", Helvetica, Arial, sans-serif', '11px "Open Sans", Helvetica, Arial, sans-serif'],
        },
        lines: config.showConstellations,
        lineStyle: { stroke: theme.accent, width: 1, opacity: 0.6 },
        bounds: false,
        show: config.showConstellations,
      },
      mw: {
        show: config.showMilkyWay,
        style: { fill: theme.fg, opacity: 0.15 },
      },
      lines: {
        graticule: {
          show: config.showGrid,
          stroke: theme.fg,
          width: 0.6,
          opacity: 0.3,
        },
        equatorial: { show: false },
        ecliptic: { show: false },
        galactic: { show: false },
        supergalactic: { show: false },
      },
      background: {
        fill: theme.bg,
        opacity: 1,
        stroke: theme.fg,
        width: 1.5,
      },
      horizon: {
        show: false,
      },
      planets: {
        show: false,
      },
    };

    // Clear previous render
    if (canvasRef.current) {
      canvasRef.current.innerHTML = '';
    }

    // Render celestial map
    try {
      celestial.display(celestialConfig);

      // Set the date/time
      celestial.date(dateTime);

      // Apply location
      celestial.location([config.location.lat, config.location.lng]);

      // Redraw
      celestial.redraw();
    } catch (error) {
      console.error('Error rendering celestial map:', error);
    }
  }, [celestial, config]);

  const theme = COLOR_THEMES[config.colorTheme];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl animate-pulse"
          style={{ backgroundColor: theme.bg }}
        >
          <div className="text-center" style={{ color: theme.fg }}>
            <div className="text-4xl mb-4">✨</div>
            <div className="text-sm opacity-60">Loading star map...</div>
          </div>
        </div>
      )}

      {/* Celestial canvas container */}
      <div
        ref={canvasRef}
        className={`w-full h-full rounded-2xl overflow-hidden ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ backgroundColor: theme.bg }}
      />

      {/* Shape mask overlay */}
      {config.shapeMask !== 'plain' && !isLoading && (
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <mask id="shape-mask">
                <rect width="100" height="100" fill="white" />
                {config.shapeMask === 'circle' && (
                  <circle cx="50" cy="50" r="45" fill="black" />
                )}
                {config.shapeMask === 'heart' && (
                  <path
                    d="M50,85 C50,85 15,60 15,40 C15,25 25,15 35,15 C42,15 48,20 50,25 C52,20 58,15 65,15 C75,15 85,25 85,40 C85,60 50,85 50,85 Z"
                    fill="black"
                  />
                )}
              </mask>
            </defs>
            <rect width="100" height="100" fill={theme.bg} mask="url(#shape-mask)" />
          </svg>
        </div>
      )}

      {/* Title and footnote overlays */}
      {(config.title || config.footnote) && !isLoading && (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">
          {config.title && (
            <div
              className="text-center font-bold text-2xl tracking-wide"
              style={{ color: theme.fg }}
            >
              {config.title}
            </div>
          )}
          {config.footnote && (
            <div
              className="text-center text-sm tracking-wider opacity-80"
              style={{ color: theme.fg }}
            >
              {config.footnote}
            </div>
          )}
        </div>
      )}

      {/* Frame overlay */}
      {config.showFrame && !isLoading && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 border-8 rounded-2xl"
            style={{
              borderColor: theme.fg,
              boxShadow: `inset 0 0 0 2px ${theme.bg}, inset 0 0 20px rgba(0,0,0,0.3)`
            }}
          />
        </div>
      )}
    </div>
  );
}
