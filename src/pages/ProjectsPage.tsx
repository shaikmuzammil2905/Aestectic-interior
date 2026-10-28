import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { projectsData, projectCategories } from '../data/projectsData';
import { ProjectItem } from '../types';

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.categorySlug === activeCategory);

  return (
    <div className="w-full bg-ivory">
      
      {/* Page Header */}
      <section className="relative py-20 bg-charcoal text-softwhite overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="/assets/hero-desktop.png"
            alt="Interior Portfolio"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="w-6 h-px bg-gold"></span>
            <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase font-sans">
              CURATED PORTFOLIO
            </span>
            <span className="w-6 h-px bg-gold"></span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
            Our Architectural Projects
          </h1>

          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-normal leading-relaxed">
            A celebration of bespoke design, premium materiality, and flawless factory manufacturing across Telangana.
          </p>

          {/* Filter Categories */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-gold text-charcoal shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-softwhite'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase Grid */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-softwhite rounded-3xl overflow-hidden border border-subtle/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Lightbox Trigger */}
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                  {/* Quick Expand Lightbox Button */}
                  <button
                    onClick={() => setLightboxImage(project.coverImage)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-charcoal/60 hover:bg-gold text-softwhite hover:text-charcoal backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer"
                    title="Enlarge Image"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold block mb-0.5">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-softwhite font-medium drop-shadow-md">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Details & Action */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="flex items-center space-x-1.5 text-xs text-muted">
                    <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{project.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.highlights.slice(0, 2).map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-ivory text-[10px] font-medium text-espresso border border-subtle/60"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-subtle/50 flex items-center justify-between">
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-espresso hover:text-gold transition-colors"
                    >
                      <span>Explore Project</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </Link>

                    <Link
                      to="/contact"
                      className="text-[11px] font-semibold text-gold hover:underline"
                    >
                      Discuss Similar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-gold text-softwhite hover:text-charcoal flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <img
            src={lightboxImage}
            alt="Enlarged Project View"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
          />
        </div>
      )}

    </div>
  );
};
