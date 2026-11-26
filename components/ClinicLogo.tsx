import React from 'react';

interface ClinicLogoProps {
  name?: string;
  dark?: boolean;
}

export function ClinicLogo({ name = 'SkinGlow Clinic', dark = false }: ClinicLogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <svg
        width="32"
        height="32"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="clinicMarkGrad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="10" fill="url(#clinicMarkGrad)" />
        <path
          d="M20 8.5C20 8.5 11.5 17.2 11.5 23.4C11.5 28.1 15.3 31.5 20 31.5C24.7 31.5 28.5 28.1 28.5 23.4C28.5 17.2 20 8.5 20 8.5Z"
          stroke="white"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M16.2 23.5C16.2 25.6 17.9 27.3 20 27.3C22.1 27.3 23.8 25.6 23.8 23.5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M20 14.5V18.5M18 16.5H22" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span
        className={`font-display text-[22px] font-semibold tracking-tight leading-none ${
          dark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {name}
      </span>
    </span>
  );
}
