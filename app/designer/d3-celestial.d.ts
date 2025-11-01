declare module 'd3-celestial' {
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
    stars?: {
      colors?: boolean;
      style?: {
        fill?: string;
        opacity?: number;
      };
      limit?: number;
      size?: number;
      exponent?: number;
      designation?: boolean;
      designationStyle?: {
        fill?: string;
        font?: string;
        align?: string;
        baseline?: string;
      };
      propername?: boolean;
      propernameStyle?: {
        fill?: string;
        font?: string;
        align?: string;
        baseline?: string;
      };
      show?: boolean;
    };
    dsos?: {
      show?: boolean;
    };
    constellations?: {
      names?: boolean;
      namesType?: string;
      nameStyle?: {
        fill?: string;
        align?: string;
        baseline?: string;
        font?: string | string[];
      };
      lines?: boolean;
      lineStyle?: {
        stroke?: string;
        width?: number;
        opacity?: number;
      };
      bounds?: boolean;
      show?: boolean;
    };
    mw?: {
      show?: boolean;
      style?: {
        fill?: string;
        opacity?: number;
      };
    };
    lines?: {
      graticule?: {
        show?: boolean;
        stroke?: string;
        width?: number;
        opacity?: number;
      };
      equatorial?: { show?: boolean };
      ecliptic?: { show?: boolean };
      galactic?: { show?: boolean };
      supergalactic?: { show?: boolean };
    };
    background?: {
      fill?: string;
      opacity?: number;
      stroke?: string;
      width?: number;
    };
    horizon?: {
      show?: boolean;
    };
    planets?: {
      show?: boolean;
    };
  }

  interface Celestial {
    display(config: CelestialConfig): void;
    date(date: Date): void;
    location(coords: [number, number]): void;
    redraw(): void;
  }

  const celestial: Celestial;
  export default celestial;
}
