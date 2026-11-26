import type { StaticImageData } from 'next/image';

import heroClinicImg from '@/src/assets/images/hero_dermatology_clinic_1795705069911.jpg';
import laserHairRemovalImg from '@/src/assets/images/service_laser_hair_removal_1795705070426.jpg';
import scarTreatmentImg from '@/src/assets/images/service_scar_treatment_1795705093253.jpg';
import carbonFacialImg from '@/src/assets/images/service_carbon_facial_1795705071694.jpg';
import prpGfcTherapyImg from '@/src/assets/images/service_prp_gfc_therapy_1795705072557.jpg';
import chemicalPeelsImg from '@/src/assets/images/service_chemical_peels_1795705073136.jpg';
import hydraFacialImg from '@/src/assets/images/service_hydra_facial_1795705073907.jpg';
import hairTransplantImg from '@/src/assets/images/service_hair_transplant_1795705074700.jpg';

export const HERO_CLINIC_IMAGE = heroClinicImg;

export type ServiceCategory = 'all' | 'skin' | 'laser' | 'hair';

export interface DermatologyService {
  id: string;
  index: string;
  title: string;
  category: Exclude<ServiceCategory, 'all'>;
  categoryLabel: string;
  image: StaticImageData;
  imageAlt: string;
  shortDescription: string;
  detailedOverview: string;
  keyBenefits: string[];
  sessionNotes: string;
}

export const DERMATOLOGY_SERVICES: DermatologyService[] = [
  {
    id: 'laser-hair-removal',
    index: '01',
    title: 'Laser Hair Removal',
    category: 'laser',
    categoryLabel: 'Laser Precision',
    image: laserHairRemovalImg,
    imageAlt: 'Medical diode laser hair removal treatment performed in a sterile dermatology suite',
    shortDescription:
      'Safe, dermatologist-supervised permanent hair reduction tailored to Indian skin tones with integrated cooling comfort.',
    detailedOverview:
      'Precision medical laser hair reduction targets hair follicles cleanly while protecting surrounding skin. Protocols are calibrated by Dr. Shantanu Kesharwani based on skin phototype, hair thickness, and target area for predictable, long-term smoothness.',
    keyBenefits: [
      'Customized energy settings suited for Indian skin tones',
      'Integrated contact cooling for gentle session comfort',
      'Effective for face, underarms, arms, legs, and full body',
      'Reduces ingrown hairs and razor irritation',
    ],
    sessionNotes: 'Performed in scheduled cycles aligned with natural hair growth phases.',
  },
  {
    id: 'scar-treatment',
    index: '02',
    title: 'Scar Treatment',
    category: 'laser',
    categoryLabel: 'Skin Resurfacing',
    image: scarTreatmentImg,
    imageAlt: 'Dermatologist performing clinical resurfacing scar revision treatment',
    shortDescription:
      'Targeted medical protocols for acne scars, post-surgical marks, and uneven skin texture to restore smoother dermal contour.',
    detailedOverview:
      'Every scar pattern—ice-pick, boxcar, rolling, or traumatic—requires an individualized clinical combination. Treatments stimulate controlled collagen remodeling to gradually soften depressions and refine skin texture.',
    keyBenefits: [
      'Tailored assessment for acne scars and injury marks',
      'Supports progressive dermal collagen remodeling',
      'Combines medical resurfacing and targeted dermal therapies',
      'Focused on gradual, natural-looking texture refinement',
    ],
    sessionNotes: 'Includes post-procedure barrier care and strict sun-protection guidance.',
  },
  {
    id: 'carbon-facial',
    index: '03',
    title: 'Carbon Facial',
    category: 'laser',
    categoryLabel: 'Laser Toning',
    image: carbonFacialImg,
    imageAlt: 'Activated carbon laser facial peel procedure in a clinical dermatology room',
    shortDescription:
      'Activated medical carbon paired with gentle laser energy to refine enlarged pores, control excess oil, and brighten dull skin.',
    detailedOverview:
      'A layer of medical-grade liquid carbon binds deep inside pores before laser passes gently vaporize surface debris and excess sebum. Ideal for oily, acne-prone, or congested complexions seeking instant clarity with minimal downtime.',
    keyBenefits: [
      'Deep pore cleansing and sebum regulation',
      'Visible improvement in skin tone uniformity and radiance',
      'Helps calm congested and blemish-prone skin',
      'Zero-downtime lunchtime clinical facial procedure',
    ],
    sessionNotes: 'Quick 30–40 minute clinic session with immediate return to daily routine.',
  },
  {
    id: 'prp-gfc-therapy',
    index: '04',
    title: 'PRP & GFC Therapy',
    category: 'hair',
    categoryLabel: 'Hair & Trichology',
    image: prpGfcTherapyImg,
    imageAlt: 'Clinical PRP and Growth Factor Concentrate hair scalp therapy session',
    shortDescription:
      'Autologous platelet and Growth Factor Concentrate scalp protocols designed to strengthen thinning follicles and reduce hair fall.',
    detailedOverview:
      'Using concentrated growth factors derived safely from your own blood under sterile medical standards, PRP and GFC therapies nourish miniaturized follicles, support scalp microcirculation, and encourage denser hair shafts.',
    keyBenefits: [
      'Uses pure autologous growth factors with sterile preparation',
      'Targets early-to-moderate hair thinning and pattern hair loss',
      'Strengthens existing follicles and improves hair caliber',
      'Pairs effectively alongside medical hair regimens or transplants',
    ],
    sessionNotes: 'Conducted under aseptic dermatology protocols with minimal recovery time.',
  },
  {
    id: 'chemical-peels',
    index: '05',
    title: 'Chemical Peels',
    category: 'skin',
    categoryLabel: 'Medical Aesthetics',
    image: chemicalPeelsImg,
    imageAlt: 'Dermatologist gently applying a medical-grade chemical peel solution with a fan brush',
    shortDescription:
      'Clinically formulated medical peels for pigmentation, melasma, active acne, and sun-damaged skin clarity.',
    detailedOverview:
      'Unlike salon facials, medical-grade chemical peels use precisely buffered concentrations selected by a dermatologist for your skin concern—safely accelerating cellular turnover to fade stubborn pigmentation and calm acne breakouts.',
    keyBenefits: [
      'Targets melasma, post-acne marks, and uneven tanning',
      'Helps unclog comedones and control active acne flares',
      'Strength and formulation matched strictly to your skin barrier',
      'Restores smoother texture and balanced luminosity',
    ],
    sessionNotes: 'Followed by medical sunscreen and gentle barrier repair advice.',
  },
  {
    id: 'hydra-facial',
    index: '06',
    title: 'Hydra Facial',
    category: 'skin',
    categoryLabel: 'Hydration & Glow',
    image: hydraFacialImg,
    imageAlt: 'HydraFacial vortex hydro-dermabrasion skincare procedure on hydrated skin',
    shortDescription:
      'Multi-step vortex cleansing, gentle exfoliation, painless extraction, and antioxidant serum infusion for hydrated radiance.',
    detailedOverview:
      'A soothing, non-irritating hydro-dermabrasion treatment that removes dead skin buildup and impurities while simultaneously bathing fresh skin in hyaluronic hydration and peptides—leaving skin supple and camera-ready.',
    keyBenefits: [
      'Gentle vacuum extraction without harsh squeezing',
      'Deep hyaluronic and antioxidant moisture infusion',
      'Suitable for sensitive, dry, dull, or pre-event skin',
      'Instant refreshed glow with zero recovery downtime',
    ],
    sessionNotes: 'Customizable serum boosters selected after skin evaluation.',
  },
  {
    id: 'hair-transplant',
    index: '07',
    title: 'Hair Transplant',
    category: 'hair',
    categoryLabel: 'Hair Restoration',
    image: hairTransplantImg,
    imageAlt: 'Modern hair restoration and follicular unit micro-grafting clinical suite',
    shortDescription:
      'Doctor-led follicular hair restoration focused on natural hairline design, density planning, and lasting coverage.',
    detailedOverview:
      'Comprehensive evaluation of donor density, scalp health, and long-term hair loss progression precedes precision follicular transplantation. Designed to create a natural, age-appropriate hairline and permanent follicular growth.',
    keyBenefits: [
      'Individualized hairline architecture and graft planning',
      'Performed under strict sterile dermatological supervision',
      'Natural angle and density placement for seamless blending',
      'Structured post-procedure follow-up and hair maintenance',
    ],
    sessionNotes: 'Starts with a detailed trichoscopy consultation with Dr. Shantanu Kesharwani.',
  },
];

export interface OpeningHourRow {
  day: string;
  hours: string;
  isClosed: boolean;
}

export interface GallerySlot {
  id: string;
  title: string;
  subtitle: string;
  category: 'exterior' | 'reception' | 'treatment' | 'equipment' | 'care';
  photoDataUrl: string | null;
}

export interface ClinicConfig {
  clinicName: string;
  doctorName: string;
  qualification: string;
  specialties: string[];
  address: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  googleRating: string;
  googleReviewCount: number;
  googleReviewUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  doctorPhotoDataUrl: string | null;
  openingHours: OpeningHourRow[];
  gallerySlots: GallerySlot[];
}

export const DEFAULT_CLINIC_CONFIG: ClinicConfig = {
  clinicName: 'SkinGlow Clinic',
  doctorName: 'Dr. Shantanu Kesharwani',
  qualification: 'MBBS, MD (Skin & VD)',
  specialties: ['Skin', 'Laser', 'Hair', 'Nail'],
  address: 'In Front of Hotel Devyog, Teenbatti, Katra Bazaar, Sagar, Madhya Pradesh 470002, India',
  phone: '+91 84508 25800',
  whatsappNumber: '+918450825800',
  email: '',
  googleRating: '4.9',
  googleReviewCount: 164,
  googleReviewUrl: '',
  instagramUrl: '',
  facebookUrl: '',
  doctorPhotoDataUrl: null,
  openingHours: [
    { day: 'Monday', hours: '10:30 AM – 02:00 PM, 05:30 PM – 08:30 PM', isClosed: false },
    { day: 'Tuesday', hours: '10:30 AM – 02:00 PM, 05:30 PM – 08:30 PM', isClosed: false },
    { day: 'Wednesday', hours: '10:30 AM – 02:00 PM, 05:30 PM – 08:30 PM', isClosed: false },
    { day: 'Thursday', hours: '10:30 AM – 02:00 PM, 05:30 PM – 08:30 PM', isClosed: false },
    { day: 'Friday', hours: '10:30 AM – 02:00 PM, 05:30 PM – 08:30 PM', isClosed: false },
    { day: 'Saturday', hours: '10:30 AM – 02:00 PM, 05:30 PM – 08:30 PM', isClosed: false },
    { day: 'Sunday', hours: 'By Appointment / Closed', isClosed: true },
  ],
  gallerySlots: [
    {
      id: 'clinic-exterior',
      title: 'Clinic Exterior',
      subtitle: 'In Front of Hotel Devyog, Teenbatti, Katra Bazaar, Sagar',
      category: 'exterior',
      photoDataUrl: null,
    },
    {
      id: 'clinic-reception',
      title: 'Clinic Reception',
      subtitle: 'Patient welcome desk & waiting lounge',
      category: 'reception',
      photoDataUrl: null,
    },
    {
      id: 'treatment-room',
      title: 'Treatment Room',
      subtitle: 'Dedicated dermatology & laser procedure suite',
      category: 'treatment',
      photoDataUrl: null,
    },
    {
      id: 'dermatology-equipment',
      title: 'Dermatology Equipment',
      subtitle: 'Medical laser, trichoscopy & clinical instruments',
      category: 'equipment',
      photoDataUrl: null,
    },
    {
      id: 'skin-treatment',
      title: 'Clinical Skin Care',
      subtitle: 'Real patient care & dermatology setup',
      category: 'care',
      photoDataUrl: null,
    },
  ],
};

export function sanitizePhoneForTel(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return cleaned || '+918450825800';
}

export function sanitizePhoneForWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits || '918450825800';
}

export function buildGoogleMapsSearchUrl(address: string, clinicName: string): string {
  const query = encodeURIComponent(`${clinicName}, ${address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function buildGoogleMapsEmbedUrl(address: string): string {
  const query = encodeURIComponent(address);
  return `https://maps.google.com/maps?q=${query}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
}
