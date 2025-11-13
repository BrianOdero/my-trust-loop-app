import { useColorScheme } from 'react-native';

export interface Theme {
  colors: {
    background: string;
    surface: string;
    surfaceSecondary: string;
    surfaceTertiary: string;
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    border: string;
    borderLight: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    white: string;
    black: string;
    overlay: string;
    card: string;
    shadow: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    background: '#ffffff',
    surface: '#f9fafb',
    surfaceSecondary: '#f3f4f6',
    surfaceTertiary: '#e5e7eb',
    primary: '#10b981',
    primaryDark: '#059669',
    primaryLight: '#34d399',
    secondary: '#3b82f6',
    text: '#111827',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
    border: '#d1d5db',
    borderLight: '#e5e7eb',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    info: '#3b82f6',
    white: '#ffffff',
    black: '#000000',
    overlay: 'rgba(0, 0, 0, 0.5)',
    card: '#ffffff',
    shadow: '#000000',
  },
};

export const darkTheme: Theme = {
  colors: {
    background: '#0f0f0f',
    surface: '#1a1a1a',
    surfaceSecondary: '#2a2a2a',
    surfaceTertiary: '#374151',
    primary: '#10b981',
    primaryDark: '#059669',
    primaryLight: '#34d399',
    secondary: '#3b82f6',
    text: '#ffffff',
    textSecondary: '#9ca3af',
    textTertiary: '#6b7280',
    border: '#374151',
    borderLight: '#2a2a2a',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    info: '#3b82f6',
    white: '#ffffff',
    black: '#000000',
    overlay: 'rgba(0, 0, 0, 0.5)',
    card: '#2a2a2a',
    shadow: '#000000',
  },
};

export const useTheme = (): Theme => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};
