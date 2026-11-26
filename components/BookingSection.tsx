'use client';

import React, { useRef, useState, useSyncExternalStore } from 'react';
import { Calendar, Clock, MessageCircle, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import {
  DERMATOLOGY_SERVICES,
  sanitizePhoneForTel,
  sanitizePhoneForWhatsApp,
} from '@/lib/clinic-data';
import { useClinic } from '@/components/ClinicProvider';

const TREATMENT_OPTIONS = [
  ...DERMATOLOGY_SERVICES.map((s) => s.title),
  'General Skin Consultation',
  'Hair & Scalp Consultation',
  'Nail Care Consultation',
];

const TIME_SLOTS = [
  '10:30 AM – 12:00 PM (Morning)',
  '12:00 PM – 02:00 PM (Afternoon)',
  '05:30 PM – 07:00 PM (Evening)',
  '07:00 PM – 08:30 PM (Evening)',
];

interface FormErrors {
  patientName?: string;
  mobile?: string;
  treatment?: string;
  preferredDate?: string;
  preferredTime?: string;
}

const emptySubscribe = () => () => {};
function getLocalTodayString(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function BookingSection() {
  const { config, selectedTreatment, setSelectedTreatment } = useClinic();
  const minDate = useSyncExternalStore(emptySubscribe, getLocalTodayString, () => '');

  const [patientName, setPatientName] = useState('');
  const [mobile, setMobile] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState(TIME_SLOTS[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  const whatsappTriggerRef = useRef<HTMLAnchorElement>(null);

  const activeDate = preferredDate || minDate;

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (patientName.trim().length < 2) {
      nextErrors.patientName = 'Please enter the patient’s full name.';
    }
    const digits = mobile.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 13) {
      nextErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    }
    if (!selectedTreatment) {
      nextErrors.treatment = 'Please select a treatment or consultation.';
    }
    if (!activeDate) {
      nextErrors.preferredDate = 'Please choose a preferred date.';
    } else if (minDate && activeDate < minDate) {
      nextErrors.preferredDate = 'Please choose today or a future date.';
    }
    if (!preferredTime) {
      nextErrors.preferredTime = 'Please select a preferred time slot.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const waDigits = sanitizePhoneForWhatsApp(config.whatsappNumber);
    const lines = [
      `Hello ${config.clinicName} (${config.doctorName}),`,
      `I would like to request an appointment:`,
      ``,
      `*Patient Name:* ${patientName.trim()}`,
      `*Mobile Number:* ${mobile.trim()}`,
      `*Treatment:* ${selectedTreatment}`,
      `*Preferred Date:* ${activeDate}`,
      `*Preferred Time:* ${preferredTime}`,
      message.trim() ? `*Message:* ${message.trim()}` : null,
    ].filter((line): line is string => line !== null);

    const waUrl = `https://wa.me/${waDigits}?text=${encodeURIComponent(lines.join('\n'))}`;
    setSubmittedUrl(waUrl);

    setTimeout(() => {
      whatsappTriggerRef.current?.click();
    }, 50);
  };

  return (
    <section id="book-appointment" className="py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-semibold text-teal-700 mb-2">Appointment Booking</p>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Book Your Consultation with {config.doctorName}
              </h2>
              <p className="text-base text-slate-600 mt-3 leading-relaxed">
                Select your treatment, preferred date, and time window. Submitting this form opens
                WhatsApp directly with your appointment request pre-filled for fast confirmation.
              </p>
            </div>

            <div className="rounded-2xl border border-teal-900/10 bg-[#F4FAFB] p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Direct WhatsApp Scheduling</p>
                  <p className="text-sm text-slate-600 mt-0.5">
                    Requests go straight to our clinic desk at {config.phone}.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-4 border-t border-teal-900/10">
                <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Need Immediate Assistance?</p>
                  <p className="text-sm text-slate-600 mt-0.5">
                    Call the clinic reception directly during working hours.
                  </p>
                  <a
                    href={`tel:${sanitizePhoneForTel(config.phone)}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 hover:text-teal-950 mt-2"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span className="tabular-nums">{config.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-teal-900/12 bg-white shadow-sm p-6 sm:p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Patient Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      value={patientName}
                      onChange={(e) => {
                        setPatientName(e.target.value);
                        if (errors.patientName) setErrors((p) => ({ ...p, patientName: undefined }));
                      }}
                      placeholder="Enter patient full name"
                      aria-invalid={Boolean(errors.patientName)}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                        errors.patientName ? 'border-rose-400' : 'border-slate-300'
                      }`}
                    />
                    {errors.patientName && (
                      <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.patientName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-mobile"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Mobile Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="booking-mobile"
                      type="tel"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                        if (errors.mobile) setErrors((p) => ({ ...p, mobile: undefined }));
                      }}
                      placeholder="e.g. 98765 43210"
                      aria-invalid={Boolean(errors.mobile)}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-white tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                        errors.mobile ? 'border-rose-400' : 'border-slate-300'
                      }`}
                    />
                    {errors.mobile && (
                      <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.mobile}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-treatment"
                    className="block text-sm font-medium text-slate-800 mb-1.5"
                  >
                    Select Treatment <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="booking-treatment"
                    value={selectedTreatment}
                    onChange={(e) => {
                      setSelectedTreatment(e.target.value);
                      if (errors.treatment) setErrors((p) => ({ ...p, treatment: undefined }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    {TREATMENT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="booking-date"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Preferred Date <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      min={minDate}
                      value={activeDate}
                      onChange={(e) => {
                        setPreferredDate(e.target.value);
                        if (errors.preferredDate)
                          setErrors((p) => ({ ...p, preferredDate: undefined }));
                      }}
                      aria-invalid={Boolean(errors.preferredDate)}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-white tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                        errors.preferredDate ? 'border-rose-400' : 'border-slate-300'
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.preferredDate}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-time"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Preferred Time <span className="text-rose-600">*</span>
                    </label>
                    <select
                      id="booking-time"
                      value={preferredTime}
                      onChange={(e) => {
                        setPreferredTime(e.target.value);
                        if (errors.preferredTime)
                          setErrors((p) => ({ ...p, preferredTime: undefined }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-message"
                    className="block text-sm font-medium text-slate-800 mb-1.5"
                  >
                    Message <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="booking-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your skin, hair, laser, or nail concern..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm sm:text-base font-semibold shadow-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Confirm &amp; Send on WhatsApp</span>
                  </button>
                </div>

                <a
                  ref={whatsappTriggerRef}
                  href={submittedUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sr-only"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  Open WhatsApp
                </a>

                {submittedUrl && (
                  <div
                    role="status"
                    className="mt-4 p-4 rounded-xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-teal-950">
                          Appointment details prepared for WhatsApp
                        </p>
                        <p className="text-xs text-teal-800 mt-0.5">
                          If WhatsApp did not open automatically, click the button to send your request.
                        </p>
                      </div>
                    </div>
                    <a
                      href={submittedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold whitespace-nowrap shrink-0 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Open WhatsApp</span>
                    </a>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
