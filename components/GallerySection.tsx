'use client';

import React, { useRef, useState } from 'react';
import {
  Building2,
  Camera,
  Cpu,
  DoorOpen,
  Sparkles,
  Upload,
  Maximize2,
  Trash2,
  X,
} from 'lucide-react';
import { useClinic } from '@/components/ClinicProvider';
import { type GallerySlot } from '@/lib/clinic-data';

function getSlotIcon(category: GallerySlot['category']) {
  switch (category) {
    case 'exterior':
      return Building2;
    case 'reception':
      return DoorOpen;
    case 'treatment':
      return Sparkles;
    case 'equipment':
      return Cpu;
    default:
      return Camera;
  }
}

export function GallerySection() {
  const { config, updateGalleryPhoto, openEditor } = useClinic();
  const [lightboxSlot, setLightboxSlot] = useState<GallerySlot | null>(null);
  const fileInputsRef = useRef<Record<string, HTMLInputElement | null>>({});

  const uploadedCount = config.gallerySlots.filter((s) => Boolean(s.photoDataUrl)).length;

  const handleFileChange = (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateGalleryPhoto(slotId, reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-teal-700 mb-2">Clinic Gallery</p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Inside {config.clinicName}, Sagar
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              Dedicated photo spaces for our clinic exterior, reception, treatment suite,
              dermatology equipment, and skin care rooms. Only authentic clinic photographs
              uploaded by our team appear here.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-sm text-slate-500 tabular-nums">
              {uploadedCount} of {config.gallerySlots.length} real photos added
            </span>
            <button
              type="button"
              onClick={() => openEditor('gallery')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-teal-200 bg-teal-50/70 hover:bg-teal-100/70 text-xs sm:text-sm font-semibold text-teal-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Upload className="w-4 h-4" aria-hidden="true" />
              <span>Manage Clinic Photos</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.gallerySlots.map((slot, index) => {
            const Icon = getSlotIcon(slot.category);
            const isHeroSpan = index === 0;

            return (
              <div
                key={slot.id}
                className={`rounded-2xl overflow-hidden border border-teal-900/10 bg-[#F7FBFC] flex flex-col ${
                  isHeroSpan ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    isHeroSpan ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3]'
                  }`}
                >
                  {slot.photoDataUrl ? (
                    <>
                      <img
                        src={slot.photoDataUrl}
                        alt={`${config.clinicName} – ${slot.title}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setLightboxSlot(slot)}
                          aria-label={`View ${slot.title} full size`}
                          className="w-9 h-9 rounded-lg bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-sm cursor-pointer transition-colors"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => updateGalleryPhoto(slot.id, null)}
                          aria-label={`Remove ${slot.title} photograph`}
                          className="w-9 h-9 rounded-lg bg-white/90 hover:bg-white text-rose-600 flex items-center justify-center shadow-sm cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#EAF6F8] via-[#F5FAFC] to-[#E6F2FA] flex flex-col items-center justify-center p-6 text-center border-b border-teal-900/8">
                      <div className="w-12 h-12 rounded-xl bg-white border border-teal-900/10 flex items-center justify-center shadow-xs mb-3">
                        <Icon className="w-6 h-6 text-teal-700" aria-hidden="true" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        Authentic Clinic Photograph Slot
                      </p>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                        Awaiting actual client photograph for {slot.title.toLowerCase()}.
                      </p>
                      <button
                        type="button"
                        onClick={() => fileInputsRef.current[slot.id]?.click()}
                        className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800 shadow-xs transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Upload Photo</span>
                      </button>
                    </div>
                  )}

                  <input
                    ref={(el) => {
                      fileInputsRef.current[slot.id] = el;
                    }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(slot.id, e)}
                    className="sr-only"
                    aria-label={`Upload photograph for ${slot.title}`}
                  />
                </div>

                <div className="p-5 flex items-center justify-between gap-4 bg-white">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{slot.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{slot.subtitle}</p>
                  </div>
                  {slot.photoDataUrl && (
                    <button
                      type="button"
                      onClick={() => fileInputsRef.current[slot.id]?.click()}
                      className="text-xs font-semibold text-teal-700 hover:text-teal-900 shrink-0 cursor-pointer"
                    >
                      Replace
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {lightboxSlot && lightboxSlot.photoDataUrl && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxSlot.title}
          onClick={() => setLightboxSlot(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxSlot(null)}
              aria-label="Close image preview"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxSlot.photoDataUrl}
              alt={`${config.clinicName} – ${lightboxSlot.title}`}
              referrerPolicy="no-referrer"
              className="w-full max-h-[78vh] object-contain bg-slate-950"
            />
            <div className="p-4 sm:p-5 bg-white border-t border-slate-100">
              <p className="text-base font-semibold text-slate-900">{lightboxSlot.title}</p>
              <p className="text-sm text-slate-600">{lightboxSlot.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
