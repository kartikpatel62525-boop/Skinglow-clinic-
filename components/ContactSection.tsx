'use client';

import React, { useRef, useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ExternalLink,
  Edit3,
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
} from 'lucide-react';
import {
  buildGoogleMapsEmbedUrl,
  buildGoogleMapsSearchUrl,
  sanitizePhoneForTel,
  sanitizePhoneForWhatsApp,
} from '@/lib/clinic-data';
import { useClinic } from '@/components/ClinicProvider';

export function ContactSection() {
  const { config, openEditor } = useClinic();
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactWhatsAppUrl, setContactWhatsAppUrl] = useState<string | null>(null);
  const waContactRef = useRef<HTMLAnchorElement>(null);

  const mapsSearchUrl = buildGoogleMapsSearchUrl(config.address, config.clinicName);
  const mapsEmbedUrl = buildGoogleMapsEmbedUrl(config.address);
  const waNumber = sanitizePhoneForWhatsApp(config.whatsappNumber);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim().length < 2) {
      setContactError('Please enter your name.');
      return;
    }
    if (contactMessage.trim().length < 5) {
      setContactError('Please enter a short message or inquiry.');
      return;
    }
    setContactError('');

    const text = [
      `Hello ${config.clinicName},`,
      `Name: ${contactName.trim()}`,
      contactPhone.trim() ? `Phone: ${contactPhone.trim()}` : null,
      `Inquiry: ${contactMessage.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    setContactWhatsAppUrl(url);
    setTimeout(() => {
      waContactRef.current?.click();
    }, 50);
  };

  return (
    <section
      id="contact"
      className="py-16 lg:py-24 bg-gradient-to-b from-[#F4FAFB] to-[#EDF7F9] border-t border-teal-900/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-teal-700 mb-2">Contact &amp; Location</p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Visit {config.clinicName}, Sagar
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              Conveniently located at Teenbatti, Katra Bazaar. Call or message on WhatsApp to
              confirm clinic timings or schedule your visit.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openEditor('details')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-teal-200 bg-white hover:bg-teal-50 text-xs sm:text-sm font-semibold text-teal-900 transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <Edit3 className="w-4 h-4" aria-hidden="true" />
            <span>Edit Contact &amp; Hours</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Clinic Contact Details + Editable Opening Hours */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card-strong rounded-2xl p-6 sm:p-7 space-y-5">
              <div>
                <h3 className="font-display text-2xl font-semibold text-slate-900">
                  {config.clinicName}
                </h3>
                <p className="text-sm font-medium text-teal-800 mt-0.5">
                  {config.doctorName} · {config.qualification}
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-teal-900/10">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-slate-700 leading-relaxed">{config.address}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal-700 shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${sanitizePhoneForTel(config.phone)}`}
                    className="text-sm font-semibold text-slate-900 hover:text-teal-700 tabular-nums"
                  >
                    {config.phone}
                  </a>
                </div>

                {config.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-teal-700 shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${config.email}`}
                      className="text-sm text-slate-700 hover:text-teal-700"
                    >
                      {config.email}
                    </a>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${sanitizePhoneForTel(config.phone)}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-teal-200 bg-white hover:bg-teal-50 text-teal-900 text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-teal-700" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="glass-card-strong rounded-2xl p-6 sm:p-7 flex-1">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-700" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-slate-900">Clinic Opening Hours</h3>
                </div>
                <button
                  type="button"
                  onClick={() => openEditor('hours')}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 cursor-pointer"
                >
                  Edit Hours
                </button>
              </div>

              <dl className="divide-y divide-slate-100 text-sm">
                {config.openingHours.map((row) => (
                  <div
                    key={row.day}
                    className="py-2.5 flex items-start justify-between gap-4"
                  >
                    <dt className="font-medium text-slate-700 shrink-0">{row.day}</dt>
                    <dd
                      className={`text-right tabular-nums ${
                        row.isClosed ? 'text-slate-500 font-medium' : 'text-slate-900'
                      }`}
                    >
                      {row.hours}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right Column: Google Maps Location + Direct Contact Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="glass-card-strong rounded-2xl overflow-hidden flex flex-col">
              <div className="relative h-64 sm:h-72 w-full bg-sky-50 border-b border-teal-900/10">
                <iframe
                  title={`${config.clinicName} Google Maps Location`}
                  src={mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Teenbatti, Katra Bazaar · Sagar, MP 470002
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Landmark: In Front of Hotel Devyog
                  </p>
                </div>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="glass-card-strong rounded-2xl p-6 sm:p-7 flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Send a Quick Inquiry</h3>
              <p className="text-sm text-slate-600 mb-5">
                Have a question about timings, treatment suitability, or follow-ups?
              </p>

              <form onSubmit={handleContactSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700 mb-1">
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 ..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-slate-700 mb-1">
                    Message <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Ask about skin, laser, hair, or nail consultations..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                {contactError && (
                  <p className="text-xs text-rose-600 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{contactError}</span>
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Send Inquiry via WhatsApp</span>
                  </button>

                  <a
                    ref={waContactRef}
                    href={contactWhatsAppUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sr-only"
                    aria-hidden="true"
                    tabIndex={-1}
                  >
                    Open WhatsApp Inquiry
                  </a>

                  {contactWhatsAppUrl && (
                    <a
                      href={contactWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-950"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-700" />
                      <span>Inquiry ready — Open WhatsApp</span>
                    </a>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
