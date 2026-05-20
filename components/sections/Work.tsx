import React from 'react';
import ProjectCard from '../ui/ProjectCard';
import { projects } from '@/data/projects';

const Work = () => {
  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto border-t border-border mt-24">
      <div className="flex items-baseline justify-between mb-16">
        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-muted">## Ажил</h2>
        <span className="font-mono text-xs text-muted">СОНГОСОН_ТӨСЛҮҮД.LOG</span>
      </div>
      
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.slug} 
            project={project} 
            index={index} 
            total={projects.length} 
          />
        ))}
      </div>
      
      <div className="mt-16 border-t border-border pt-8 flex justify-end">
        <button className="font-mono text-xs uppercase tracking-widest group flex items-center gap-4 hover:text-muted transition-colors">
          Бүх архивыг үзэх <span className="group-hover:translate-x-2 transition-transform">→</span>
        </button>
      </div>
    </section>
  );
};

export default Work;
