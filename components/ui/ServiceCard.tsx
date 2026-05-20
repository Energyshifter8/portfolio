"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '@/data/services';
import Tag from './Tag';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-8 border border-border bg-white/[0.01] hover:bg-white/[0.02] transition-colors group"
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="font-mono text-xs text-muted mb-1">ҮЙЛЧИЛГЭЭ</div>
          <div className="font-mono text-3xl font-bold tracking-tighter">{service.code}</div>
        </div>
        <div className="font-mono text-xs text-muted">{service.dateCode}</div>
      </div>
      
      <h3 className="text-2xl font-bold tracking-tighter uppercase mb-6">{service.title}</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap gap-3">
          {service.upperTags.map(tag => (
            <Tag key={tag} variant="up">{tag}</Tag>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {service.lowerTags.map(tag => (
            <Tag key={tag} variant="down">{tag}</Tag>
          ))}
        </div>
      </div>
      
      <div className="pt-6 border-t border-border flex items-center justify-between font-mono text-[10px] text-muted tracking-widest uppercase">
        <div className="flex items-center gap-2">
          {service.processFrom} <span className="text-foreground">→</span> {service.processTo}
        </div>
        <div className="w-4 h-4 rounded-full border border-border group-hover:bg-foreground transition-colors" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
