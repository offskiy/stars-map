// Designer configuration types

export type ColorTheme = 'light' | 'dark' | 'navy' | 'purple' | 'teal' | 'rose' | 'amber';
export type ShapeMask = 'plain' | 'circle' | 'heart';
export type PosterSize = 'S' | 'M' | 'L' | 'XL';
export type DesignerStep = 'design' | 'moment' | 'text' | 'size';

export interface Location {
  name: string;
  lat: number;
  lng: number;
  timezone?: string;
}

export interface DesignerConfig {
  // Moment
  location: Location;
  date: string; // ISO date string
  time: string; // HH:mm format

  // Design
  colorTheme: ColorTheme;
  shapeMask: ShapeMask;
  showConstellations: boolean;
  showLabels: boolean;
  showGrid: boolean;
  showMilkyWay: boolean;

  // Text
  title: string;
  footnote: string;

  // Size
  posterSize: PosterSize;
  showFrame: boolean;
}

export const DEFAULT_CONFIG: DesignerConfig = {
  location: {
    name: 'New York, USA',
    lat: 40.7128,
    lng: -74.0060,
    timezone: 'America/New_York',
  },
  date: new Date().toISOString().split('T')[0],
  time: '20:00',
  colorTheme: 'dark',
  shapeMask: 'plain',
  showConstellations: true,
  showLabels: false,
  showGrid: false,
  showMilkyWay: true,
  title: '',
  footnote: '',
  posterSize: 'M',
  showFrame: false,
};

export const POSTER_SIZES = {
  S: { width: 12, height: 16, label: '12" × 16"' },
  M: { width: 16, height: 20, label: '16" × 20"' },
  L: { width: 20, height: 24, label: '20" × 24"' },
  XL: { width: 24, height: 30, label: '24" × 30"' },
};

export const COLOR_THEMES = {
  light: { bg: '#ffffff', fg: '#000000', accent: '#1F77B4', label: 'Light' },
  dark: { bg: '#000000', fg: '#ffffff', accent: '#FFC857', label: 'Dark' },
  navy: { bg: '#0B132B', fg: '#ffffff', accent: '#FFC857', label: 'Navy' },
  purple: { bg: '#1a0033', fg: '#ffffff', accent: '#9d4edd', label: 'Purple' },
  teal: { bg: '#001a1a', fg: '#ffffff', accent: '#4ecca3', label: 'Teal' },
  rose: { bg: '#1a0a0f', fg: '#ffffff', accent: '#ff6b9d', label: 'Rose' },
  amber: { bg: '#1a1300', fg: '#ffffff', accent: '#ffd60a', label: 'Amber' },
};
