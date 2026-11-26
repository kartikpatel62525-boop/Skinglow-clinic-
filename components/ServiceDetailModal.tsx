'use client';

import React, { useEffect } from 'react';
import { X, Check, Calendar, ShieldCheck } from 'lucide-react';
import { type DermatologyService } from '@/lib/clinic-data';
import { useClinic } from '@/components/ClinicProvider';

interface ServiceDetailModalProps {
  service: DermatologyService | null;
  onClose: () => void;
}

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const { scrollToBooking, config } = useClinic();

  useEffect(() => {
    if (!service) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [service, onClose]);

  if (!service) return null;

  const handleBook = () => {
    const title = service.title;
    onClose();
    scrollToBooking(title);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/55 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-teal-900/15 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
          <img
            src={service.image.src}
            alt={service.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close treatment details"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-sm cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <p className="text-xs font-medium text-teal-200 tabular-nums">
              {service.index} · {service.categoryLabel}
            </p>
            <h3 id="service-modal-title" className="font-display text-3xl font-semibold mt-0.5">
              {service.title}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-teal-800 mb-2">Clinical Overview</h4>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {service.detailedOverview}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-teal-800 mb-3">Key Treatment Highlights</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.keyBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2.5 text-sm text-slate-700 bg-[#F4FAFB] border border-teal-900/8 rounded-lg p-3"
                >
                  <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-sky-50/70 border border-sky-200/70 text-sm text-slate-700">
            <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold text-slate-900">
                Supervised by {config.doctorName} ({config.qualification})
              </p>
              <p className="text-slate-600 mt-0.5">{service.sessionNotes}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleBook}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
