import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-space bg-cover bg-center">
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
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout; 