"use client";

import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-8 flex justify-between items-center pointer-events-none">
      <Link href="/" className="pointer-events-auto">
        <div className="font-mono text-xs uppercase tracking-[0.4em] font-bold">
          [YH] — СИСТЕМ
        </div>
      </Link>
      
      <nav className="pointer-events-auto">
        <ul className="flex gap-8 font-mono text-[10px] uppercase tracking-widest">
          <li>
            <Link href="/lab" className="hover:opacity-60 transition-opacity">
              ЛАБОРАТОРИЙН_ТУРШИЛТУУД
            </Link>
          </li>
          <li>
            <a href="mailto:hello@example.com" className="hover:opacity-60 transition-opacity">
              ХОЛБОО_ТОГТООХ
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
