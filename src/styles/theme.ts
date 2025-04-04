export const theme = {
  colors: {
    primary: {
      blue: '#2B6CB0',
      green: '#38A169',
      orange: '#DD6B20',
      red: '#E53E3E',
    },
    secondary: {
      blue: '#4299E1',
      green: '#68D391',
      orange: '#F6AD55',
      red: '#FC8181',
    },
  },
  typography: {
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
      code: 'Fira Code, monospace',
      math: 'STIX Two Math, serif',
    },
    weights: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    default: '0.2s ease-in-out',
    fast: '0.1s ease-in-out',
    slow: '0.3s ease-in-out',
  },
} as const;

export type Theme = typeof theme; 