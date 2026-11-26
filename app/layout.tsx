import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const SITE_TITLE = 'SkinGlow Clinic – Dr. Shantanu Kesharwani | Dermatology, Sagar';
const SITE_DESCRIPTION =
  'Visit SkinGlow Clinic in Sagar, MP led by Dr. Shantanu Kesharwani (MBBS, MD Skin & VD) for Laser Hair Removal, PRP, HydraFacial, Scar & Hair treatments.';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    'SkinGlow Clinic Sagar',
    'Dr. Shantanu Kesharwani',
    'Dermatologist in Sagar MP',
    'Laser Hair Removal Sagar',
    'Hair Transplant Sagar',
    'Hydra Facial Sagar',
    'PRP GFC Therapy Sagar',
    'Scar Treatment Sagar',
    'Carbon Facial Sagar',
    'Chemical Peels Sagar',
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'en_IN',
    siteName: 'SkinGlow Clinic',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const clinicStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'SkinGlow Clinic',
  description: SITE_DESCRIPTION,
  medicalSpecialty: 'Dermatology',
  telephone: '+91-84508-25800',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'In Front of Hotel Devyog, Teenbatti, Katra Bazaar',
    addressLocality: 'Sagar',
    addressRegion: 'Madhya Pradesh',
    postalCode: '470002',
    addressCountry: 'IN',
  },
  physician: {
    '@type': 'Physician',
    name: 'Dr. Shantanu Kesharwani',
    medicalSpecialty: 'Dermatology, Venereology and Leprology (MBBS, MD Skin & VD)',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '164',
    bestRating: '5',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-[#F8FBFC] text-slate-900 antialiased selection:bg-teal-100 selection:text-teal-950" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicStructuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
