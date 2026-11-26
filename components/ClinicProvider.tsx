'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  type ClinicConfig,
  DEFAULT_CLINIC_CONFIG,
  type OpeningHourRow,
} from '@/lib/clinic-data';

const STORAGE_KEY = 'skinglow_clinic_config_v1';

let cachedRaw: string | null = null;
let cachedConfig: ClinicConfig = DEFAULT_CLINIC_CONFIG;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribeConfig(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      listener();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function mergeConfig(parsed: Partial<ClinicConfig>): ClinicConfig {
  return {
    ...DEFAULT_CLINIC_CONFIG,
    ...parsed,
    openingHours:
      Array.isArray(parsed.openingHours) && parsed.openingHours.length === 7
        ? parsed.openingHours
        : DEFAULT_CLINIC_CONFIG.openingHours,
    gallerySlots:
      Array.isArray(parsed.gallerySlots) && parsed.gallerySlots.length > 0
        ? DEFAULT_CLINIC_CONFIG.gallerySlots.map((defaultSlot) => {
            const match = parsed.gallerySlots?.find((s) => s.id === defaultSlot.id);
            return match ? { ...defaultSlot, photoDataUrl: match.photoDataUrl } : defaultSlot;
          })
        : DEFAULT_CLINIC_CONFIG.gallerySlots,
  };
}

function getClientSnapshot(): ClinicConfig {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) {
      return cachedConfig;
    }
    cachedRaw = raw;
    if (!raw) {
      cachedConfig = DEFAULT_CLINIC_CONFIG;
      return cachedConfig;
    }
    const parsed = JSON.parse(raw) as Partial<ClinicConfig>;
    cachedConfig = mergeConfig(parsed);
    return cachedConfig;
  } catch {
    return DEFAULT_CLINIC_CONFIG;
  }
}

function getServerSnapshot(): ClinicConfig {
  return DEFAULT_CLINIC_CONFIG;
}

function persistNextConfig(updater: (prev: ClinicConfig) => ClinicConfig) {
  const prev = getClientSnapshot();
  const next = updater(prev);
  try {
    const serialized = JSON.stringify(next);
    window.localStorage.setItem(STORAGE_KEY, serialized);
    cachedRaw = serialized;
    cachedConfig = next;
  } catch {
    cachedConfig = next;
  }
  emitChange();
}

interface ClinicContextValue {
  config: ClinicConfig;
  updateConfig: (partial: Partial<ClinicConfig>) => void;
  updateOpeningHour: (index: number, updated: OpeningHourRow) => void;
  updateGalleryPhoto: (slotId: string, photoDataUrl: string | null) => void;
  updateDoctorPhoto: (photoDataUrl: string | null) => void;
  resetConfig: () => void;
  selectedTreatment: string;
  setSelectedTreatment: (treatment: string) => void;
  isEditorOpen: boolean;
  openEditor: (focusTab?: 'details' | 'hours' | 'gallery') => void;
  closeEditor: () => void;
  editorTab: 'details' | 'hours' | 'gallery';
  setEditorTab: (tab: 'details' | 'hours' | 'gallery') => void;
  scrollToBooking: (treatmentName?: string) => void;
}

const ClinicContext = createContext<ClinicContextValue | null>(null);

export function ClinicProvider({ children }: { children: React.ReactNode }) {
  const config = useSyncExternalStore(subscribeConfig, getClientSnapshot, getServerSnapshot);
  const [selectedTreatment, setSelectedTreatment] = useState<string>('Laser Hair Removal');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState<'details' | 'hours' | 'gallery'>('details');

  const updateConfig = useCallback((partial: Partial<ClinicConfig>) => {
    persistNextConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  const updateOpeningHour = useCallback((index: number, updated: OpeningHourRow) => {
    persistNextConfig((prev) => {
      const nextHours = [...prev.openingHours];
      nextHours[index] = updated;
      return { ...prev, openingHours: nextHours };
    });
  }, []);

  const updateGalleryPhoto = useCallback((slotId: string, photoDataUrl: string | null) => {
    persistNextConfig((prev) => ({
      ...prev,
      gallerySlots: prev.gallerySlots.map((slot) =>
        slot.id === slotId ? { ...slot, photoDataUrl } : slot
      ),
    }));
  }, []);

  const updateDoctorPhoto = useCallback((photoDataUrl: string | null) => {
    persistNextConfig((prev) => ({ ...prev, doctorPhotoDataUrl: photoDataUrl }));
  }, []);

  const resetConfig = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    cachedRaw = null;
    cachedConfig = DEFAULT_CLINIC_CONFIG;
    emitChange();
  }, []);

  const openEditor = useCallback((focusTab: 'details' | 'hours' | 'gallery' = 'details') => {
    setEditorTab(focusTab);
    setIsEditorOpen(true);
  }, []);

  const closeEditor = useCallback(() => {
    setIsEditorOpen(false);
  }, []);

  const scrollToBooking = useCallback((treatmentName?: string) => {
    if (treatmentName) {
      setSelectedTreatment(treatmentName);
    }
    const el = document.getElementById('book-appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <ClinicContext.Provider
      value={{
        config,
        updateConfig,
        updateOpeningHour,
        updateGalleryPhoto,
        updateDoctorPhoto,
        resetConfig,
        selectedTreatment,
        setSelectedTreatment,
        isEditorOpen,
        openEditor,
        closeEditor,
        editorTab,
        setEditorTab,
        scrollToBooking,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
}

export function useClinic() {
  const ctx = useContext(ClinicContext);
  if (!ctx) {
    throw new Error('useClinic must be used within ClinicProvider');
  }
  return ctx;
}
