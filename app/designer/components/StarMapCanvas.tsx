'use client';

import { useEffect, useRef } from 'react';
import type { DesignerConfig } from '../types';
import { COLOR_THEMES } from '../types';

// Extend Window interface for Celestial
interface CelestialConfig {
  width?: number;
  projection?: string;
  transform?: string;
  center?: [number, number, number];
  adaptable?: boolean;
  interactive?: boolean;
  form?: boolean;
  location?: boolean;
  container?: HTMLElement;
  datapath?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    Celestial?: {
      display(config: CelestialConfig): void;
      date(date: Date): void;
      location(coords: [number, number]): void;
      redraw(): void;
    };
  }
}

interface StarMapCanvasProps {
  config: DesignerConfig;
  className?: string;
}

export default function StarMapCanvas({ config, className = '' }: StarMapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasOwnRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    if (!window.Celestial || !canvasRef.current || !containerRef.current) return;

    const theme = COLOR_THEMES[config.colorTheme];

    // Calculate datetime from config
    const dateTime = new Date(`${config.date}T${config.time}:00`);

    // Set hidden container size for proper Celestial rendering
    if (canvasRef.current && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 800;
      const containerHeight = containerRef.current.offsetHeight || 800;
      canvasRef.current.style.width = `${containerWidth}px`;
      canvasRef.current.style.height = `${containerHeight}px`;
    }

    // Function to copy Celestial image to our canvas
    const copyCelestialToCanvas = () => {
      if (!canvasRef.current || !canvasOwnRef.current || !containerRef.current) return;

      // Find the SVG element created by Celestial
      const celestialSvg = canvasRef.current.querySelector('svg');
      if (!celestialSvg) {
        console.warn('Celestial SVG not found');
        return;
      }

      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const canvas = canvasOwnRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Set canvas size to match container
      canvas.width = containerWidth;
      canvas.height = containerHeight;

      // Clone and style the SVG for export
      const svgClone = celestialSvg.cloneNode(true) as SVGElement;
      const svgData = new XMLSerializer().serializeToString(svgClone);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      // Load SVG as image and draw on canvas
      const img = new Image();
      img.onload = () => {
        // Clear canvas
        ctx.fillStyle = theme.bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Celestial image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply shape mask if needed
        if (config.shapeMask !== 'plain') {
          ctx.globalCompositeOperation = 'destination-in';
          ctx.beginPath();
          if (config.shapeMask === 'circle') {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(canvas.width, canvas.height) * 0.45;
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          } else if (config.shapeMask === 'heart') {
            // Draw heart shape
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const size = Math.min(canvas.width, canvas.height) * 0.35;
            ctx.moveTo(centerX, centerY + size * 0.4);
            ctx.bezierCurveTo(
              centerX, centerY,
              centerX - size * 0.35, centerY - size * 0.1,
              centerX - size * 0.35, centerY + size * 0.15
            );
            ctx.bezierCurveTo(
              centerX - size * 0.35, centerY + size * 0.5,
              centerX, centerY + size * 0.6,
              centerX, centerY + size * 0.6
            );
            ctx.bezierCurveTo(
              centerX, centerY + size * 0.6,
              centerX + size * 0.35, centerY + size * 0.5,
              centerX + size * 0.35, centerY + size * 0.15
            );
            ctx.bezierCurveTo(
              centerX + size * 0.35, centerY - size * 0.1,
              centerX, centerY,
              centerX, centerY + size * 0.4
            );
          }
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
        }

        // Draw text overlays
        ctx.fillStyle = theme.fg;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw title at top
        if (config.title) {
          ctx.font = 'bold 24px "Open Sans", Helvetica, Arial, sans-serif';
          ctx.fillStyle = theme.fg;
          const titleY = 40;
          ctx.fillText(config.title, canvas.width / 2, titleY);
        }

        // Draw date/time in the middle-bottom area
        const dateTimeStr = new Date(`${config.date}T${config.time}:00`).toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        ctx.font = '14px "Open Sans", Helvetica, Arial, sans-serif';
        ctx.fillStyle = theme.fg;
        ctx.globalAlpha = 0.9;
        ctx.fillText(dateTimeStr, canvas.width / 2, canvas.height / 2 + canvas.height * 0.35);
        ctx.globalAlpha = 1;

        // Draw footnote at bottom
        if (config.footnote) {
          ctx.font = '12px "Open Sans", Helvetica, Arial, sans-serif';
          ctx.fillStyle = theme.fg;
          ctx.globalAlpha = 0.8;
          const footnoteY = canvas.height - 40;
          ctx.fillText(config.footnote, canvas.width / 2, footnoteY);
          ctx.globalAlpha = 1;
        }

        // Draw frame if needed
        if (config.showFrame) {
          ctx.strokeStyle = theme.fg;
          ctx.lineWidth = 8;
          ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
          ctx.lineWidth = 2;
          ctx.strokeStyle = theme.bg;
          ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
        }

        URL.revokeObjectURL(svgUrl);
      };
      img.onerror = () => {
        console.error('Failed to load SVG image');
        URL.revokeObjectURL(svgUrl);
      };
      img.src = svgUrl;
    };

    // Use a small delay to ensure container has computed dimensions
    const timeoutId = setTimeout(() => {
      if (!canvasRef.current || !containerRef.current) return;

      // Get container dimensions explicitly
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      // Ensure we have valid dimensions
      if (containerWidth === 0 || containerHeight === 0) {
        console.warn('Container has zero dimensions, skipping render');
        return;
      }

      // Set hidden container size for proper Celestial rendering
      canvasRef.current.style.width = `${containerWidth}px`;
      canvasRef.current.style.height = `${containerHeight}px`;

      // Configure celestial display
      const celestialConfig: CelestialConfig = {
      width: Math.min(containerWidth, containerHeight), // Use explicit dimensions
      projection: 'airy',
      transform: 'equatorial',
      center: [config.location.lng, config.location.lat, 0] as [number, number, number],
      adaptable: true,
      interactive: false,
      form: false,
      location: true,
      container: canvasRef.current,
      datapath: 'https://cdn.jsdelivr.net/npm/d3-celestial@0.7.35/data/',
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
        if (!window.Celestial) {
          console.error('Celestial library not available');
          return;
        }

        window.Celestial.display(celestialConfig);

        // Set the date/time
        window.Celestial.date(dateTime);

        // Apply location
        window.Celestial.location([config.location.lat, config.location.lng]);

        // Redraw
        window.Celestial.redraw();

        // Hide Celestial form if it exists
        const hideCelestialForm = () => {
          const form = document.querySelector('.celestial-form');
          if (form) {
            (form as HTMLElement).style.display = 'none';
          }
        };

        // Wait for Celestial to render, then copy to our canvas and hide form
        setTimeout(() => {
          hideCelestialForm();
          copyCelestialToCanvas();
        }, 200);
      } catch (error) {
        console.error('Error rendering celestial map:', error);
      }
    }, 100); // 100ms delay to allow DOM to settle

    return () => clearTimeout(timeoutId);
  }, [config]);

  const theme = COLOR_THEMES[config.colorTheme];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Celestial canvas container - hidden but used for rendering */}
      <div
        ref={canvasRef}
        className={`rounded-2xl overflow-hidden`}
        style={{ 
          backgroundColor: theme.bg,
          position: 'absolute',
          visibility: 'hidden',
          left: '-9999px',
          pointerEvents: 'none'
        }}
      />
      
      {/* Our own canvas for display */}
      <canvas
        ref={canvasOwnRef}
        className={`w-full h-full rounded-2xl`}
        style={{ backgroundColor: theme.bg }}
      />



    </div>
  );
}
