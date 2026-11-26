'use client';

import React, { useState } from 'react';
import { Calendar, Phone, Star, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_CLINIC_IMAGE, sanitizePhoneForTel } from '@/lib/clinic-data';
import { useClinic } from '@/components/ClinicProvider';

const CLINICAL_PILLARS = [
  {
    index: '01',
    title: 'Skin Dermatology',
    detail: 'Medical diagnosis & aesthetic skin rejuvenation protocols',
  },
  {
    index: '02',
    title: 'Precision Laser',
    detail: 'Calibrated diode & Q-switched laser skin procedures',
  },
  {
    index: '03',
    title: 'Hair & Trichology',
    detail: 'PRP, GFC growth factor care & follicular hair restoration',
  },
  {
    index: '04',
    title: 'Nail Care',
    detail: 'Clinical management of nail infections & structural concerns',
  },
];

export function HeroSection() {
  const { config, scrollToBooking } = useClinic();
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-[#EDF7F9] via-[#F5FAFC] to-[#F8FBFC] pt-10 pb-14 lg:pt-14 lg:pb-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-0 w-[520px] h-[520px] rounded-full bg-sky-200/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-24 w-[420px] h-[420px] rounded-full bg-teal-200/30 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center py-2"
          >
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-teal-800 mb-4">
              <span>{config.clinicName}</span>
              <span aria-hidden="true" className="text-teal-400">·</span>
              <span>Sagar, Madhya Pradesh</span>
            </div>

            <h1
              className="font-display text-slate-900 font-semibold tracking-tight leading-[1.06] mb-5"
              style={{ fontSize: 'clamp(2.5rem, 4.6vw, 4.1rem)', textWrap: 'balance' }}
            >
              Healthy Skin. Confident You.
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed max-w-xl mb-6">
              Advanced Skin, Hair &amp; Laser Treatments.
            </p>

            <div className="glass-card rounded-xl p-4 sm:p-5 mb-8 max-w-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-slate-900">{config.doctorName}</p>
                  <p className="text-sm text-slate-600 mt-0.5">
                    {config.qualification}
                    <span aria-hidden="true" className="mx-2 text-slate-300">·</span>
                    <span>{config.specialties.join(' | ')}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 tabular-nums shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span>{config.googleRating}/5</span>
                  <span className="text-slate-500 font-normal">({config.googleReviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => scrollToBooking()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm sm:text-base font-semibold shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Book Appointment</span>
              </button>

              <a
                href={`tel:${sanitizePhoneForTel(config.phone)}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-white hover:bg-sky-50 text-slate-900 border border-teal-900/15 text-sm sm:text-base font-semibold transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                <Phone className="w-4 h-4 text-teal-700" aria-hidden="true" />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex"
          >
            <div className="relative w-full min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-teal-900/10 bg-gradient-to-br from-teal-50 to-sky-100 shadow-sm">
              {!imgError ? (
                <img
                  src={HERO_CLINIC_IMAGE.src}
                  alt="Modern dermatology and laser skin care clinic consultation environment"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-teal-50 via-white to-sky-100">
                  <ShieldCheck className="w-12 h-12 text-teal-700 mb-3" />
                  <p className="font-display text-2xl font-semibold text-slate-900">{config.clinicName}</p>
                  <p className="text-sm text-slate-600 mt-1">Dermatology &amp; Laser Care · Sagar</p>
                </div>
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent"
              />

              <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5 glass-card-strong rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-teal-800">Katra Bazaar · Teenbatti, Sagar</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">
                    In Front of Hotel Devyog, MP 470002
                  </p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900 whitespace-nowrap shrink-0 transition-colors"
                >
                  <span>Directions &amp; Hours</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 lg:mt-14 glass-card rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-teal-900/10">
          {CLINICAL_PILLARS.map((pillar) => (
            <div key={pillar.index} className="p-5 sm:p-6">
              <p className="text-xs font-semibold text-teal-700 tabular-nums mb-1.5">{pillar.index}</p>
              <h2 className="text-base font-semibold text-slate-900 mb-1">{pillar.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{pillar.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
