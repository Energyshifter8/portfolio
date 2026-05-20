import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-48 px-6 max-w-7xl mx-auto border-t border-border text-center">
      <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-muted mb-16">## Тоглоход бэлэн үү?</h2>
      
      <div className="space-y-12">
        <a 
          href="mailto:temuulenbold1@gmail.com" 
          className="block text-4xl md:text-7xl font-bold tracking-tighter uppercase hover:text-muted transition-colors underline decoration-border underline-offset-[16px]"
        >
          temuulenbold1@gmail.com
        </a>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-12">
          <div className="text-center">
            <div className="font-mono text-[10px] text-muted uppercase tracking-widest mb-2">УТСНЫ_ШУГАМ</div>
            <div className="text-xl font-bold">(976) 88963679</div>
          </div>
          
          <div className="w-px h-12 bg-border hidden md:block" />
          
          <a 
            href="#" 
            className="px-12 py-5 border border-border font-mono text-sm uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Видео дуудлага товлох
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
