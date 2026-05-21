import React from 'react';
import DraggableCards from '../ui/DraggableCards';
import { services } from '@/data/services';

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div className="grid md:grid-cols-12 gap-12 mb-20">
        <div className="md:col-span-4">
          <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-muted mb-8">## Үйлчилгээ</h2>
          <p className="text-xl leading-relaxed text-muted">
            Орчин үеийн дижитал асуудлуудын цогц шийдэл. Үзэл баримтлал боловсруулахаас эхлээд эцсийн нэвтрүүлэлт хүртэл.
          </p>
        </div>
        <div className="md:col-span-8 flex items-end justify-end">
          <div className="font-mono text-[10px] text-muted flex gap-8">
            <span>[ СИСТЕМ БЭЛЭН ]</span>
            <span>[ ХУВИЛБАР 2.0.4 ]</span>
          </div>
        </div>
      </div>
      
      <DraggableCards services={services} />
    </section>
  );
};

export default Services;
