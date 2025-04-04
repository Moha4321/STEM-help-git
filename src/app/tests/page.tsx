'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import ComponentTests from './component-tests';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProgressProvider } from '@/contexts/ProgressContext';

export default function TestsPage() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Layout>
          <ComponentTests />
        </Layout>
      </ProgressProvider>
    </AuthProvider>
  );
} 