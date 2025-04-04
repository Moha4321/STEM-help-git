'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black/50 backdrop-blur-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          STEM Odyssey
        </Link>
        <div className="space-x-4">
          <Link 
            href="/tests" 
            className={`text-white hover:text-blue-400 ${pathname === '/tests' ? 'text-blue-400' : ''}`}
          >
            Tests
          </Link>
          <Link 
            href="/progress" 
            className={`text-white hover:text-blue-400 ${pathname === '/progress' ? 'text-blue-400' : ''}`}
          >
            Progress
          </Link>
          {user ? (
            <>
              <Link 
                href="/profile" 
                className={`text-white hover:text-blue-400 ${pathname === '/profile' ? 'text-blue-400' : ''}`}
              >
                Profile
              </Link>
              <button
                onClick={() => logout()}
                className="text-white hover:text-blue-400"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              className={`text-white hover:text-blue-400 ${pathname === '/login' ? 'text-blue-400' : ''}`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 