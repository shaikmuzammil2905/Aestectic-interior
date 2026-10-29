import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  MessageCircle, 
  Maximize2, 
  X,
  Sparkles
} from 'lucide-react';
import { projectsData as fallbackProjects } from '../data/projectsData';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { contentService } from '../services/contentService';
import { ProjectItem } from '../types';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getWhatsAppUrl } = useSiteSettings();
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    contentService.getProjects().then((data) => {
      if (data && data.length > 0) setProjects(data);
      setLoading(false);
    });

    const unsub = contentService.subscribeToTable('projects', () => {
      contentService.getProjects().then((data) => {
        if (data && data.length > 0) setProjects(data);
      });
    });

    return () => unsub();
  }, []);

  const project = projects.find((p) => p.id === id);

  if (!project && !loading) {
    return <Navigate to="/projects" replace />;
  }

  if (!project) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center bg-ivory">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-ivory">
      
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 bg-charcoal text-softwhite overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/40"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gold hover:text-softwhite transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase font-sans">
              {project.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
              {project.title}
            </h1>
            <div className="flex items-center space-x-2 text-sm text-ivory/80 pt-1">
              <MapPin className="w-4 h-4 text-gold" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Narrative & Image Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 8 Cols: Description & Large Images */}
            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-espresso tracking-tight">
                  Design Narrative & Spatial Architecture
                </h2>
                <p className="text-sm sm:text-base text-muted leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Gallery Grid */}
              <div className="space-y-6">
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-espresso">
                  Project Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.gallery.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImg(imgUrl)}
                      className="group relative rounded-2xl overflow-hidden shadow-md border border-subtle aspect-[16/11] cursor-pointer"
                    >
                      <img
                        src={imgUrl}
                        alt={`${project.title} view ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-softwhite/90 text-charcoal flex items-center justify-center shadow-lg">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Highlights & CTA */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              
              <div className="bg-softwhite rounded-3xl p-6 sm:p-8 border border-subtle/80 shadow-lg space-y-6">
                <h3 className="font-serif text-xl font-bold text-espresso border-b border-subtle/60 pb-3">
                  Key Specifications
                </h3>

                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-espresso font-medium">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-subtle/60 space-y-3">
                  <Link
                    to={`/contact?project=${encodeURIComponent(project.title)}`}
                    className="w-full py-3 rounded-full bg-espresso hover:bg-espresso-light text-softwhite text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-sm"
                  >
                    <Calendar className="w-4 h-4 text-gold" />
                    <span>Plan a Similar Project</span>
                  </Link>

                  <a
                    href={getWhatsAppUrl(`Hello Aesthetic Interiors, I love your ${project.title} project and would like to discuss a similar interior design.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImg && (
        <div className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-gold text-softwhite hover:text-charcoal flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={selectedImg}
            alt="Enlarged gallery view"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
          />
        </div>
      )}

    </div>
  );
};

