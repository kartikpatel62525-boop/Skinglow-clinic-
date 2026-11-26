'use client';

import React from 'react';
import { Phone, MapPin, MessageCircle, ExternalLink, Edit3 } from 'lucide-react';
import { ClinicLogo } from '@/components/ClinicLogo';
import { useClinic } from '@/components/ClinicProvider';
import {
  buildGoogleMapsSearchUrl,
  DERMATOLOGY_SERVICES,
  sanitizePhoneForTel,
  sanitizePhoneForWhatsApp,
} from '@/lib/clinic-data';

export function Footer() {
  const { config, scrollToBooking, openEditor } = useClinic();
  const waNumber = sanitizePhoneForWhatsApp(config.whatsappNumber);
  const mapsUrl = buildGoogleMapsSearchUrl(config.address, config.clinicName);

  return (
    <footer className="bg-[#0B252C] text-slate-200 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-4 space-y-4">
            <ClinicLogo name={config.clinicName} dark />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {config.doctorName} · {config.qualification}
              <br />
              Specialized medical dermatology, laser procedures, hair restoration, and nail care in
              Sagar, Madhya Pradesh.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Google Maps</span>
              </a>
              {config.instagramUrl && (
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              )}
              {config.facebookUrl && (
                <a
                  href={config.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold text-white">Clinic Navigation</h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#top" className="hover:text-teal-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about-doctor" className="hover:text-teal-300 transition-colors">
                  About Doctor
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-teal-300 transition-colors">
                  Clinic Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-teal-300 transition-colors">
                  Patient Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-teal-300 transition-colors">
                  Contact &amp; Hours
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-white">Treatments</h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {DERMATOLOGY_SERVICES.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => scrollToBooking(service.title)}
                    className="hover:text-teal-300 transition-colors text-left cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-white">Clinic Address &amp; Phone</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{config.address}</p>
            <a
              href={`tel:${sanitizePhoneForTel(config.phone)}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200 tabular-nums"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>{config.phone}</span>
            </a>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => openEditor('details')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Edit Clinic Details</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {config.clinicName} · {config.doctorName}. All rights
            reserved.
          </p>
          <p>Skin | Laser | Hair | Nail · Sagar, Madhya Pradesh</p>
        </div>
      </div>
    </footer>
  );
}
