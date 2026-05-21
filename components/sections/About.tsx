"use client";

import React from 'react';

const About = () => {
  const clients = [
    "Universal Music",
    "The New York Times",
    "Adidas",
    "Stripe",
    "Framestore",
    "R/GA",
    "Locomotive",
    "Active Theory"
  ];

  return (
    <section id="about" className="py-24 border-t border-border mt-24">
      <div className="px-6 max-w-7xl mx-auto mb-32">
        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-muted mb-16">## ТУХАЙ</h2>
        
        <div className="max-w-4xl space-y-12">
          <div className="space-y-6 text-2xl md:text-3xl leading-tight">
            <p>
              Би дизайн болон технологийн огтлолцолд амжилттай ажиллаж, тогтсон хэв маягийг эвдсэн онцгой дижитал туршлагуудыг бүтээдэг.
            </p>
            <p>
              Редакцын гоо зүй болон терминалаас сэдэвлэсэн нарийвчлалд анхаарлаа хандуулж, брэнд, агентлагуудад нарийн төвөгтэй санааг ойлгомжтой визуал систем болгон хөрвүүлэхэд нь тусалдаг.
            </p>
          </div>
          
          <div className="pt-12 border-t border-border">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted mb-8">ОНЦЛОХ_ЖАГСААЛТ.TXT</h4>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {clients.map(client => (
                <li key={client} className="font-mono text-xs uppercase tracking-widest flex items-center gap-3">
                  <span className="w-1 h-1 bg-muted rounded-full" />
                  {client}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
