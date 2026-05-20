"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import Tag from './Tag';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, total }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link 
        href={`/work/${project.slug}`}
        className="group block border-t border-border py-8 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex flex-col md:grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-2">
            <div className="font-mono text-xs text-muted mb-1">CLIENT</div>
            <div className="font-mono text-4xl font-bold tracking-tighter">{project.code}</div>
          </div>
          
          <div className="md:col-span-6">
            <div className="font-mono text-xs text-muted mb-1">{project.client}</div>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-4">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-4">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 flex items-center md:justify-center">
            <span className="font-mono text-sm text-muted">
              {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </span>
          </div>
          
          <div className="md:col-span-2 flex items-center justify-end">
            <div className="w-12 h-12 border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
              <span className="text-xl">→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
