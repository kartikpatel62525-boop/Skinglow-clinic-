'use client';

import React, { useEffect, useRef } from 'react';
import { X, RotateCcw, Upload, Trash2 } from 'lucide-react';
import { useClinic } from '@/components/ClinicProvider';

export function ClinicEditorDrawer() {
  const {
    config,
    updateConfig,
    updateOpeningHour,
    updateGalleryPhoto,
    resetConfig,
    isEditorOpen,
    closeEditor,
    editorTab,
    setEditorTab,
  } = useClinic();

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!isEditorOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeEditor();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isEditorOpen, closeEditor]);

  if (!isEditorOpen) return null;

  const handleGalleryUpload = (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Edit Clinic Details and Opening Hours"
      onClick={closeEditor}
    >
      <div
        className="w-full max-w-lg h-full bg-white shadow-2xl border-l border-teal-900/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-900">
              Manage Clinic Details
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Changes save automatically in your browser.
            </p>
          </div>
          <button
            type="button"
            onClick={closeEditor}
            aria-label="Close clinic editor"
            className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pt-3 border-b border-slate-100 flex items-center gap-2">
          {(
            [
              { id: 'details', label: 'Contact & Links' },
              { id: 'hours', label: 'Opening Hours' },
              { id: 'gallery', label: 'Real Photos' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setEditorTab(tab.id)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                editorTab === tab.id
                  ? 'border-teal-700 text-teal-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {editorTab === 'details' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Clinic Name</label>
                <input
                  type="text"
                  value={config.clinicName}
                  onChange={(e) => updateConfig({ clinicName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    value={config.doctorName}
                    onChange={(e) => updateConfig({ doctorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={config.qualification}
                    onChange={(e) => updateConfig({ qualification: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Display Phone
                  </label>
                  <input
                    type="tel"
                    value={config.phone}
                    onChange={(e) => updateConfig({ phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={config.whatsappNumber}
                    onChange={(e) => updateConfig({ whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm tabular-nums"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Clinic Address
                </label>
                <textarea
                  rows={2}
                  value={config.address}
                  onChange={(e) => updateConfig({ address: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={config.email}
                  onChange={(e) => updateConfig({ email: e.target.value })}
                  placeholder="clinic@example.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Google Review Page URL
                </label>
                <input
                  type="url"
                  value={config.googleReviewUrl}
                  onChange={(e) => updateConfig({ googleReviewUrl: e.target.value })}
                  placeholder="https://g.page/r/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Instagram URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={config.instagramUrl}
                    onChange={(e) => updateConfig({ instagramUrl: e.target.value })}
                    placeholder="https://instagram.com/..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Facebook URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={config.facebookUrl}
                    onChange={(e) => updateConfig({ facebookUrl: e.target.value })}
                    placeholder="https://facebook.com/..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {editorTab === 'hours' && (
            <div className="space-y-3">
              {config.openingHours.map((row, idx) => (
                <div
                  key={row.day}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">{row.day}</span>
                    <label className="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={row.isClosed}
                        onChange={(e) =>
                          updateOpeningHour(idx, {
                            ...row,
                            isClosed: e.target.checked,
                            hours: e.target.checked ? 'Closed' : '10:30 AM – 02:00 PM, 05:30 PM – 08:30 PM',
                          })
                        }
                        className="rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                      />
                      <span>Closed / By Appointment</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={row.hours}
                    onChange={(e) =>
                      updateOpeningHour(idx, { ...row, hours: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm tabular-nums"
                  />
                </div>
              ))}
            </div>
          )}

          {editorTab === 'gallery' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload actual photographs of SkinGlow Clinic for each space below. Generated
                service visuals are never used as fake clinic photos.
              </p>
              {config.gallerySlots.map((slot) => (
                <div
                  key={slot.id}
                  className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {slot.photoDataUrl ? (
                      <img
                        src={slot.photoDataUrl}
                        alt={slot.title}
                        referrerPolicy="no-referrer"
                        className="w-14 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-12 rounded-lg bg-teal-50 border border-dashed border-teal-200 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{slot.title}</p>
                      <p className="text-xs text-slate-500 truncate">{slot.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[slot.id]?.click()}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{slot.photoDataUrl ? 'Replace' : 'Upload'}</span>
                    </button>
                    {slot.photoDataUrl && (
                      <button
                        type="button"
                        onClick={() => updateGalleryPhoto(slot.id, null)}
                        aria-label={`Delete ${slot.title} photo`}
                        className="p-1.5 rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <input
                      ref={(el) => {
                        fileInputRefs.current[slot.id] = el;
                      }}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGalleryUpload(slot.id, e)}
                      className="sr-only"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={resetConfig}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-rose-700 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={closeEditor}
            className="px-5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
