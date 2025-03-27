
import React from 'react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export const Layout: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={`flex-1 app-container ${isMobile ? 'pb-24' : 'pb-8'}`}>
        <Outlet />
      </main>
    </div>
  );
};
