import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-mono text-[10px] text-muted uppercase tracking-[0.2em]">
          © 2025 Таны Нэр <span className="mx-4 text-border">|</span> Бүх эрх хуулиар хамгаалагдсан
        </div>
        
        <div className="flex gap-12">
          {['Twitter', 'LinkedIn', 'GitHub', 'Behance'].map((social) => (
            <a 
              key={social} 
              href="#" 
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
