'use client';

import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';

export default function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
