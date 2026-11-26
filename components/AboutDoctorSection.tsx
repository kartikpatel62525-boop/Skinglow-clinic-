'use client';

import React, { useRef } from 'react';
import { Stethoscope, ShieldCheck, Microscope, Upload, Trash2, Calendar } from 'lucide-react';
import { useClinic } from '@/components/ClinicProvider';

const EXPERTISE_AREAS = [
  {
    icon: Stethoscope,
    title: 'Clinical Dermatology (Skin & VD)',
    description:
      'Evidence-based diagnosis and medical management of acute and chronic skin conditions, allergies, acne, pigmentation, and venereological care.',
  },
  {
    icon: Microscope,
    title: 'Laser & Aesthetic Procedures',
    description:
      'Dermatologist-supervised laser hair removal, carbon toning, chemical peels, scar revision, and HydraFacial protocols adapted for Indian skin.',
  },
  {
    icon: ShieldCheck,
    title: 'Hair, Scalp & Nail Care',
    description:
      'Structured trichology assessment, PRP & GFC scalp therapies, hair transplantation guidance, and clinical treatment of nail disorders.',
  },
];

export function AboutDoctorSection() {
  const { config, updateDoctorPhoto, scrollToBooking } = useClinic();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateDoctorPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <section id="about-doctor" className="py-16 lg:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 rounded-2xl border border-teal-900/10 bg-gradient-to-br from-[#EAF6F8] via-white to-[#EEF7FC] p-6 sm:p-8 flex flex-col justify-between">
              {config.doctorPhotoDataUrl ? (
                <div className="relative flex-1 min-h-[340px] rounded-xl overflow-hidden border border-teal-900/10 bg-white mb-5">
                  <img
                    src={config.doctorPhotoDataUrl}
                    alt={`${config.doctorName}, ${config.qualification}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => updateDoctorPhoto(null)}
                    aria-label="Remove doctor portrait"
                    className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-xs font-semibold text-slate-700 shadow-sm cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Remove</span>
                  </button>
                </div>
              ) : (
                <div className="flex-1 min-h-[300px] rounded-xl border border-dashed border-teal-300/70 bg-white/75 flex flex-col items-center justify-center p-6 text-center mb-5">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-700 to-sky-600 text-white flex items-center justify-center font-display text-4xl font-semibold tracking-tight shadow-sm mb-4">
                    SK
                  </div>
                  <p className="font-display text-2xl font-semibold text-slate-900">
                    {config.doctorName}
                  </p>
                  <p className="text-sm font-medium text-teal-800 mt-1">{config.qualification}</p>
                  <p className="text-xs text-slate-500 mt-3 max-w-xs leading-relaxed">
                    Upload {config.doctorName}&rsquo;s official portrait photograph to display it here.
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-teal-200 bg-teal-50/70 hover:bg-teal-100/70 text-xs font-semibold text-teal-900 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Upload Doctor Portrait</span>
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="sr-only"
                aria-label="Upload Doctor Portrait"
              />

              <div className="pt-4 border-t border-teal-900/10 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-500">Clinical Specialization</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">
                    {config.specialties.join(' · ')}
                  </p>
                </div>
                {config.doctorPhotoDataUrl && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900 cursor-pointer"
                  >
                    Replace Photo
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-semibold text-teal-700 mb-2">About the Dermatologist</p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-2"
              style={{ textWrap: 'balance' }}
            >
              {config.doctorName}
            </h2>
            <p className="text-base font-semibold text-sky-800 mb-6">
              {config.qualification}
              <span aria-hidden="true" className="mx-2 text-slate-300">·</span>
              <span className="text-slate-600 font-medium">Consultant Dermatologist</span>
            </p>

            <p className="text-base text-slate-600 leading-relaxed mb-4 max-w-2xl">
              At {config.clinicName} in Sagar, {config.doctorName} provides specialized medical and
              procedural dermatology across Skin, Laser, Hair, and Nail care. Every patient
              consultation begins with an accurate clinical evaluation rather than one-size-fits-all
              cosmetic recommendations.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-8 max-w-2xl">
              Trained as an MBBS, MD (Skin &amp; VD) specialist, Dr. Kesharwani combines medical
              dermatology with modern laser and trichology procedures—prioritizing patient safety,
              skin-barrier health, and realistic clinical outcomes.
            </p>

            <div className="space-y-4 mb-8">
              {EXPERTISE_AREAS.map((area) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.title}
                    className="flex items-start gap-4 p-4 rounded-xl border border-slate-200/80 bg-[#F8FBFC]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-teal-700" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{area.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mt-1">{area.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <button
                type="button"
                onClick={() => scrollToBooking('General Skin Consultation')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Schedule a Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
