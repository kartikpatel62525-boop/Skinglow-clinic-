'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ClinicLogo } from '@/components/ClinicLogo';
import { useClinic } from '@/components/ClinicProvider';
import { sanitizePhoneForTel } from '@/lib/clinic-data';

const NAV_ITEMS = [
  { label: 'About', href: '#about-doctor' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const { config, scrollToBooking } = useClinic();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  const handleBookClick = () => {
    setMobileOpen(false);
    scrollToBooking();
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/85 backdrop-blur-md border-b border-teal-900/10">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg"
          aria-label={`${config.clinicName} Home`}
        >
          <ClinicLogo name={config.clinicName} />
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-teal-700 transition-colors after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-teal-600 after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleBookClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            Book Appointment
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-teal-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-teal-900/10 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleBookClick}
                className="w-full py-3 px-4 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Book Appointment
              </button>
              <a
                href={`tel:${sanitizePhoneForTel(config.phone)}`}
                onClick={handleNavClick}
                className="w-full py-3 px-4 rounded-lg border border-teal-200 bg-teal-50/50 text-teal-900 text-sm font-semibold text-center transition-colors"
              >
                Call Now: {config.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
