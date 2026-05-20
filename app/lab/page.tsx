import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LabPage() {
  const experiments = [
    {
      title: "Interactive WebGL Fluid",
      description: "Experimenting with fluid simulations using WebGL and shaders.",
      status: "In Progress"
    },
    {
      title: "Generative Art Study",
      description: "Automated pattern generation using cellular automata.",
      status: "Completed"
    },
    {
      title: "Custom Physics Engine",
      description: "A lightweight 2D physics engine built from scratch in TypeScript.",
      status: "Alpha"
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 pt-40 pb-24 px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">Lab</h1>
          <p className="text-xl md:text-2xl text-muted leading-relaxed">
            A space for experiments, prototypes, and unfinished ideas. These are projects where I explore new technologies and push my creative boundaries.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiments.map((exp, index) => (
            <div 
              key={index} 
              className="group p-8 border border-border rounded-3xl hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-muted">
                  {exp.status}
                </span>
                <div className="w-2 h-2 rounded-full bg-muted group-hover:bg-foreground transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{exp.title}</h3>
              <p className="text-muted leading-relaxed mb-8">
                {exp.description}
              </p>
              <button className="text-sm font-bold border-b-2 border-foreground pb-1">
                View Source
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
