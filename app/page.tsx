import React from 'react';
import { ClinicProvider } from '@/components/ClinicProvider';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutDoctorSection } from '@/components/AboutDoctorSection';
import { ServicesSection } from '@/components/ServicesSection';
import { GallerySection } from '@/components/GallerySection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { BookingSection } from '@/components/BookingSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { FloatingActions } from '@/components/FloatingActions';
import { ClinicEditorDrawer } from '@/components/ClinicEditorDrawer';

export default function HomePage() {
  return (
    <ClinicProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <AboutDoctorSection />
          <ServicesSection />
          <GallerySection />
          <ReviewsSection />
          <BookingSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingActions />
        <ClinicEditorDrawer />
      </div>
    </ClinicProvider>
  );
}
