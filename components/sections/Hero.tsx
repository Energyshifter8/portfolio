import React from 'react';

const Hero = () => {
  return (
    <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-8">
          Hey! I&apos;m a developer building digital products.
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10">
          I specialize in building high-performance web applications with a focus on clean code and user experience. Currently exploring the intersection of design and technology.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Available for new projects
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
