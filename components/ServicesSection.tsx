'use client';

import React, { useState } from 'react';
import { ArrowRight, Calendar, Stethoscope } from 'lucide-react';
import {
  DERMATOLOGY_SERVICES,
  type DermatologyService,
  type ServiceCategory,
} from '@/lib/clinic-data';
import { useClinic } from '@/components/ClinicProvider';
import { ServiceDetailModal } from '@/components/ServiceDetailModal';

const FILTER_TABS: { id: ServiceCategory; label: string }[] = [
  { id: 'all', label: 'All Treatments' },
  { id: 'laser', label: 'Laser & Resurfacing' },
  { id: 'skin', label: 'Skin & Aesthetics' },
  { id: 'hair', label: 'Hair Restoration' },
];

export function ServicesSection() {
  const { scrollToBooking } = useClinic();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [activeModalService, setActiveModalService] = useState<DermatologyService | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredServices =
    activeCategory === 'all'
      ? DERMATOLOGY_SERVICES
      : DERMATOLOGY_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section
      id="services"
      className="py-16 lg:py-24 bg-gradient-to-b from-[#F4FAFB] to-[#EDF7F9]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-teal-700 mb-2">Our Services</p>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold text-slate-900 tracking-tight leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Specialized Skin, Hair &amp; Laser Procedures
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              Seven core clinical and aesthetic dermatology services performed with medical-grade
              protocols tailored to your skin and hair profile.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter clinic treatments"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white/80 border border-teal-900/10 self-start lg:self-auto"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-teal-50/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {filteredServices.map((service, idx) => {
            const hasFailed = Boolean(failedImages[service.id]);
            const isFeatured =
              activeCategory === 'all' && idx === 6;

            return (
              <article
                key={service.id}
                className={`group glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                  isFeatured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-teal-50 to-sky-100">
                  {!hasFailed ? (
                    <img
                      src={service.image.src}
                      alt={service.imageAlt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [service.id]: true }))
                      }
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-teal-50 via-white to-sky-100">
                      <Stethoscope className="w-10 h-10 text-teal-700 mb-2" />
                      <p className="text-sm font-semibold text-slate-900">{service.title}</p>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-medium text-teal-800 mb-2 tabular-nums">
                    <span>{service.index}</span>
                    <span aria-hidden="true" className="text-teal-400">·</span>
                    <span>{service.categoryLabel}</span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-slate-900 leading-snug mb-2">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                    {service.shortDescription}
                  </p>

                  <div className="pt-4 border-t border-teal-900/10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModalService(service)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-teal-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1.5"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToBooking(service.title)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                    >
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Book Appointment</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <ServiceDetailModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
      />
    </section>
  );
}
