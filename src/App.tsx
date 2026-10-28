import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ConsultationModal } from './components/ConsultationModal';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { BeforeAfterPage } from './pages/BeforeAfterPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [modalInitialService, setModalInitialService] = useState<string | undefined>(undefined);

  const openConsultation = (serviceName?: string) => {
    setModalInitialService(serviceName);
    setIsConsultationModalOpen(true);
  };

  const closeConsultation = () => {
    setIsConsultationModalOpen(false);
    setModalInitialService(undefined);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-ivory text-espresso selection:bg-gold/30 selection:text-espresso">
        
        {/* Main Sticky Header */}
        <Header onOpenConsultation={() => openConsultation()} />

        {/* Dynamic Route Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenConsultation={() => openConsultation()} />} />
            <Route path="/about" element={<AboutPage onOpenConsultation={() => openConsultation()} />} />
            <Route path="/services" element={<ServicesPage onOpenConsultation={(srv) => openConsultation(srv)} />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/before-after" element={<BeforeAfterPage onOpenConsultation={() => openConsultation()} />} />
            <Route path="/process" element={<ProcessPage onOpenConsultation={() => openConsultation()} />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Fallback route */}
            <Route path="*" element={<HomePage onOpenConsultation={() => openConsultation()} />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile Fixed Bottom Bar (WhatsApp, Call, and Nav tabs as in image copy.png) */}
        <MobileBottomNav />

        {/* Floating WhatsApp Action (Desktop/Tablet) */}
        <WhatsAppFloatingButton />

        {/* Global Consultation Modal */}
        <ConsultationModal
          isOpen={isConsultationModalOpen}
          onClose={closeConsultation}
          initialService={modalInitialService}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;

