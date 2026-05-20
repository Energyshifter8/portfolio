import React from 'react';
import ServiceCard from '../ui/ServiceCard';
import { services } from '@/data/services';

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div className="grid md:grid-cols-12 gap-12 mb-20">
        <div className="md:col-span-4">
          <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-muted mb-8">## Services</h2>
          <p className="text-xl leading-relaxed text-muted">
            Comprehensive solutions for modern digital problems. From conceptualization to final deployment.
          </p>
        </div>
        <div className="md:col-span-8 flex items-end justify-end">
          <div className="font-mono text-[10px] text-muted flex gap-8">
            <span>[ SYSTEM READY ]</span>
            <span>[ VERSION 2.0.4 ]</span>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-px bg-border border border-border overflow-hidden">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;
