import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';

// Public Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SideFloatingActions } from './components/SideFloatingActions';
import { ConsultationModal } from './components/ConsultationModal';
import { ScrollToTop } from './components/ScrollToTop';
import { ErrorBoundary } from './components/ErrorBoundary';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { BeforeAfterPage } from './pages/BeforeAfterPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminHeroSlides } from './pages/admin/AdminHeroSlides';
import { AdminServices } from './pages/admin/AdminServices';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminBeforeAfter } from './pages/admin/AdminBeforeAfter';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminDatabase } from './pages/admin/AdminDatabase';
import { AdminMediaLibrary } from './pages/admin/AdminMediaLibrary';

// Public Layout Container
const PublicLayout: React.FC<{
  onOpenConsultation: (serviceName?: string) => void;
  isConsultationModalOpen: boolean;
  closeConsultation: () => void;
  modalInitialService?: string;
}> = ({ onOpenConsultation, isConsultationModalOpen, closeConsultation, modalInitialService }) => (
  <div className="min-h-screen flex flex-col bg-ivory text-espresso selection:bg-gold/30 selection:text-espresso relative">
    {/* Main Sticky Header */}
    <Header onOpenConsultation={() => onOpenConsultation()} />

    {/* Dynamic Route Content */}
    <main className="flex-grow">
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </main>

    {/* Footer */}
    <Footer />

    {/* Mobile Sleek Bottom Navigation Tabs */}
    <MobileBottomNav />

    {/* Luxury Side Floating Buttons with Interactive Popups */}
    <SideFloatingActions onOpenConsultation={(srv) => onOpenConsultation(srv)} />

    {/* Global Consultation Modal Popup */}
    <ConsultationModal
      isOpen={isConsultationModalOpen}
      onClose={closeConsultation}
      initialService={modalInitialService}
    />
  </div>
);

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
    <AuthProvider>
      <SiteSettingsProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin CMS Panel */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="media" element={<AdminMediaLibrary />} />
              <Route path="hero" element={<AdminHeroSlides />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="before-after" element={<AdminBeforeAfter />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="database" element={<AdminDatabase />} />
            </Route>
          </Route>

          {/* Public Website Routes */}
          <Route
            element={
              <PublicLayout
                onOpenConsultation={openConsultation}
                isConsultationModalOpen={isConsultationModalOpen}
                closeConsultation={closeConsultation}
                modalInitialService={modalInitialService}
              />
            }
          >
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
          </Route>
        </Routes>
      </BrowserRouter>
    </SiteSettingsProvider>
  </AuthProvider>
  );
}

export default App;
