import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'up' | 'down';
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, variant = 'down', className = "" }) => {
  const icon = variant === 'up' ? '▲' : '▼';
  
  return (
    <div className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-tighter ${className}`}>
      <span className="text-muted">{icon}</span>
      <span className="text-foreground">{children}</span>
    </div>
  );
};

export default Tag;
