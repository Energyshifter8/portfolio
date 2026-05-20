import React from 'react';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Tag from '@/components/ui/Tag';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-40 pb-24 px-6 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-8 mb-12 items-center">
             <div>
                <div className="font-mono text-[10px] text-muted mb-1">ХАРИЛЦАГЧИЙН_КОД</div>
                <div className="font-mono text-2xl font-bold">{project.code}</div>
             </div>
             <div className="w-px h-8 bg-border" />
             <div>
                <div className="font-mono text-[10px] text-muted mb-1">ТӨСЛИЙН_ОН</div>
                <div className="font-mono text-2xl font-bold">{project.year}</div>
             </div>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.85] mb-16">
            {project.title}
          </h1>
          
          <div className="aspect-[16/9] bg-white/[0.02] border border-border flex items-center justify-center mb-24 overflow-hidden group">
            <div className="font-mono text-xs text-muted opacity-20 group-hover:opacity-40 transition-opacity uppercase tracking-[1em]">
               {project.client} {/* VISUAL_ASSET_NULL */}
            </div>
          </div>
          
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-4 space-y-12">
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted mb-4">ҮЗҮҮЛЭЛТҮҮД</h4>
                <div className="flex flex-wrap gap-4">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted mb-4">ХАРИЛЦАГЧ</h4>
                <p className="text-xl font-bold uppercase tracking-tight">{project.client}</p>
              </div>
            </div>
            
            <div className="md:col-span-8">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted mb-8">ГҮЙЦЭТГЭХ_ХУРААНГУЙ</h4>
              <div className="space-y-8 text-2xl md:text-3xl leading-tight text-muted">
                <p>
                  {project.client}-д зориулсан цогц визуал системийг нэвтрүүлж байна. Зорилго нь бүтцийн бүрэн бүтэн байдал болон хэрэглэгчийн урсгалыг чухалчилсан, өндөр нарийвчлалтай дижитал интерфэйс бүтээх байсан.
                </p>
                <p>
                  Бүх харилцах цэгүүдэд тогтвортой байдлыг хангахын тулд хязгаарлагдмал өнгөний палитр болон хатуу торны шугам (grid) ашигласан.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
