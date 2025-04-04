'use client';

import React from 'react';
import { Navbar } from '../navigation/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-space bg-cover bg-center">
      <Navbar />
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
} 