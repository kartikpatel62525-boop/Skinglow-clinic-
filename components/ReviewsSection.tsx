'use client';

import React from 'react';
import { Star, ExternalLink, ShieldCheck, MessageSquarePlus, Settings2 } from 'lucide-react';
import { useClinic } from '@/components/ClinicProvider';

const CARE_COMMITMENTS = [
  {
    index: '01',
    title: 'Direct Specialist Consultation',
    detail: 'Consultations and clinical treatment plans led directly by Dr. Shantanu Kesharwani (MBBS, MD Skin & VD).',
  },
  {
    index: '02',
    title: 'Transparent Procedure Guidance',
    detail: 'Clear discussion of realistic results, number of sessions, and post-care before beginning any procedure.',
  },
  {
    index: '03',
    title: 'Clinical Hygiene & Safety',
    detail: 'Sterile instrument handling and calibrated dermatology protocols suitable for Indian skin types.',
  },
];

export function ReviewsSection() {
  const { config, openEditor } = useClinic();

  const googleSearchFallbackUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `${config.clinicName} ${config.doctorName} Sagar reviews`
  )}`;

  const hasCustomReviewLink = Boolean(config.googleReviewUrl.trim());
  const reviewHref = hasCustomReviewLink ? config.googleReviewUrl.trim() : googleSearchFallbackUrl;

  return (
    <section
      id="reviews"
      className="py-16 lg:py-24 bg-gradient-to-b from-[#EDF7F9] to-[#F8FBFC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 glass-card-strong rounded-2xl p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-teal-700 mb-3">Patient Rating on Google</p>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-display text-6xl font-semibold text-slate-900 tabular-nums leading-none">
                  {config.googleRating}
                </span>
                <span className="text-xl text-slate-400 font-medium tabular-nums">/ 5</span>
              </div>

              <div className="flex items-center gap-1 mb-3" aria-label={`Rated ${config.googleRating} out of 5 stars`}>
                {[0, 1, 2, 3, 4].map((starIndex) => (
                  <Star
                    key={starIndex}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="text-base font-semibold text-slate-900 tabular-nums">
                Based on {config.googleReviewCount} Google Reviews
              </p>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Patient feedback reflects verified clinic visits for skin, laser, hair, and nail
                consultations at {config.clinicName}, Teenbatti, Katra Bazaar, Sagar.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-teal-900/10 space-y-3">
              <a
                href={reviewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition-colors"
              >
                <span>
                  {hasCustomReviewLink
                    ? 'Read & Leave Reviews on Google'
                    : 'View Google Reviews for SkinGlow Clinic'}
                </span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>

              {!hasCustomReviewLink && (
                <button
                  type="button"
                  onClick={() => openEditor('details')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-teal-200 bg-white hover:bg-teal-50 text-xs font-semibold text-teal-800 transition-colors cursor-pointer"
                >
                  <Settings2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Add Direct Google Review Page URL</span>
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-teal-700 mb-2">Patient Trust &amp; Transparency</p>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-3"
                style={{ textWrap: 'balance' }}
              >
                Verified Care Without Fabricated Testimonials
              </h2>
              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                We publish only our verified Google rating ({config.googleRating}/5 across{' '}
                {config.googleReviewCount} reviews) and link directly to Google so prospective
                patients can read authentic, unfiltered patient experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CARE_COMMITMENTS.map((item) => (
                <div
                  key={item.index}
                  className="glass-card rounded-xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-teal-700 tabular-nums mb-2">
                      {item.index}
                    </p>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Already visited {config.clinicName}?
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Share your consultation experience directly on our Google Maps listing.
                  </p>
                </div>
              </div>
              <a
                href={reviewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-teal-200 bg-white hover:bg-teal-50 text-xs sm:text-sm font-semibold text-teal-800 whitespace-nowrap shrink-0 transition-colors"
              >
                <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
                <span>Google Review Page</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
