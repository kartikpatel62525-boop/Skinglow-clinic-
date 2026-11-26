'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useClinic } from '@/components/ClinicProvider';
import { sanitizePhoneForTel, sanitizePhoneForWhatsApp } from '@/lib/clinic-data';

export function FloatingActions() {
  const { config } = useClinic();
  const telHref = `tel:${sanitizePhoneForTel(config.phone)}`;
  const waHref = `https://wa.me/${sanitizePhoneForWhatsApp(config.whatsappNumber)}`;

  return (
    <div
      className="fixed bottom-4 right-4 z-30 flex items-center gap-2.5"
      aria-label="Quick Contact Actions"
    >
      <a
        href={telHref}
        aria-label={`Call ${config.clinicName} now at ${config.phone}`}
        className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full bg-white/95 backdrop-blur-md border border-teal-900/15 text-slate-900 hover:bg-teal-50 shadow-lg text-xs sm:text-sm font-semibold transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
      >
        <Phone className="w-4 h-4 text-teal-700" aria-hidden="true" />
        <span className="whitespace-nowrap">Call Now</span>
      </a>

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp with ${config.clinicName}`}
        className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-lg text-xs sm:text-sm font-semibold transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
      >
        <MessageCircle className="w-4 h-4" aria-hidden="true" />
        <span className="whitespace-nowrap">WhatsApp</span>
      </a>
    </div>
  );
}
