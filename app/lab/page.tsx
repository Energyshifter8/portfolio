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
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A space for experiments, prototypes, and unfinished ideas. These are projects where I explore new technologies and push my creative boundaries.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiments.map((exp, index) => (
            <div 
              key={index} 
              className="group p-8 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {exp.status}
                </span>
                <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{exp.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                {exp.description}
              </p>
              <button className="text-sm font-bold border-b-2 border-zinc-900 dark:border-zinc-100 pb-1">
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
