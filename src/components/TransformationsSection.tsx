import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { projectsData } from '../data/projectsData';

export const TransformationsSection: React.FC = () => {
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <section className="py-20 lg:py-24 bg-ivory-50 border-t border-subtle/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* ========================================================
              LEFT COLUMN: BEFORE & AFTER SHOWCASE (HD FULL BOX)
             ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2">
                <span className="w-6 h-px bg-gold"></span>
                <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase font-sans">
                  BEFORE & AFTER
                </span>
                <span className="w-6 h-px bg-gold"></span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-espresso tracking-tight leading-[1.15]">
                Real Spaces. Real Transformations.
              </h2>

              <p className="text-sm text-muted font-sans font-normal leading-relaxed">
                See how we turn ordinary spaces into extraordinary living experiences with precision planning and modular craft.
              </p>
            </div>

            {/* Draggable Interactive Slider with HD Pictures filling full box (image copy 10) */}
            <div className="relative w-full overflow-hidden rounded-2xl shadow-xl border border-subtle">
              <BeforeAfterSlider
                beforeImage="/assets/transformation_before_hd.jpg"
                afterImage="/assets/transformation_after_hd.jpg"
                beforeLabel="Before"
                afterLabel="After"
                aspectRatio="aspect-[4/3] sm:aspect-[16/10]"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <Link
                to="/before-after"
                className="inline-flex items-center space-x-2 bg-espresso hover:bg-espresso-light text-softwhite px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow group"
              >
                <span>View More Transformations</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: FEATURED PROJECTS (4 DISTINCT HD PICS)
             ======================================================== */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2">
                  <span className="w-6 h-px bg-gold"></span>
                  <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase font-sans">
                    FEATURED PROJECTS
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-espresso tracking-tight leading-[1.15]">
                  Our Latest Transformations
                </h2>

                <p className="text-sm text-muted font-sans font-normal">
                  Explore some of our beautifully designed spaces.
                </p>
              </div>

              <div>
                <Link
                  to="/projects"
                  className="text-xs font-semibold uppercase tracking-wider text-espresso hover:text-gold inline-flex items-center space-x-1 transition-colors"
                >
                  <span>View All Projects</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gold" />
                </Link>
              </div>
            </div>

            {/* Grid of 4 Projects with Distinct HD Photos (image copy 9) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="group relative block rounded-2xl overflow-hidden shadow-md border border-subtle/80 aspect-[16/10]"
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <div>
                      <h3 className="font-sans text-sm sm:text-base font-semibold text-softwhite leading-tight group-hover:text-gold-light transition-colors drop-shadow">
                        {project.title}
                      </h3>
                      <p className="text-[11px] text-ivory/80 mt-0.5">
                        {project.category}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-softwhite/20 border border-white/30 backdrop-blur-sm text-softwhite flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal group-hover:border-gold transition-all duration-300 flex-shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
