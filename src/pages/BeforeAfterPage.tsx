import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Calendar
} from 'lucide-react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { beforeAfterData } from '../data/beforeAfterData';
import { contentService } from '../services/contentService';
import { BeforeAfterItem } from '../types';

interface BeforeAfterPageProps {
  onOpenConsultation?: () => void;
}

export const BeforeAfterPage: React.FC<BeforeAfterPageProps> = ({ onOpenConsultation }) => {
  const [items, setItems] = useState<BeforeAfterItem[]>(beforeAfterData);
  const [selectedId, setSelectedId] = useState(beforeAfterData[0].id);

  useEffect(() => {
    contentService.getBeforeAfter().then((data) => {
      if (data && data.length > 0) {
        setItems(data);
        if (!data.some((d) => d.id === selectedId)) {
          setSelectedId(data[0].id);
        }
      }
    });

    const unsub = contentService.subscribeToTable('before_after_projects', () => {
      contentService.getBeforeAfter().then((data) => {
        if (data && data.length > 0) setItems(data);
      });
    });

    return () => unsub();
  }, [selectedId]);

  const currentItem = items.find((b) => b.id === selectedId) || items[0] || beforeAfterData[0];

  return (
    <div className="w-full bg-ivory">
      
      {/* Header */}
      <section className="relative py-20 bg-charcoal text-softwhite overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="/assets/transformation_after_hd.jpg"
            alt="Transformations"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="w-6 h-px bg-gold"></span>
            <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase font-sans">
              REAL TRANSFORMATIONS
            </span>
            <span className="w-6 h-px bg-gold"></span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
            Before & After Showcase
          </h1>

          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-normal leading-relaxed">
            Drag the gold vertical handle left and right to inspect how thoughtful space planning and modular engineering turn plain rooms into warm architectural havens.
          </p>

          {/* Transformation Switchers */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedId === item.id
                    ? 'bg-gold text-charcoal shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-softwhite'
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Interactive Comparison */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="bg-softwhite rounded-3xl p-6 sm:p-10 border border-subtle/80 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-subtle/50 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-accent block mb-1">
                  {currentItem.category} Transformation
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-espresso tracking-tight">
                  {currentItem.title}
                </h2>
                <p className="text-sm text-muted mt-2 max-w-2xl leading-relaxed">
                  {currentItem.description}
                </p>
              </div>

              <div className="text-xs text-muted/80 bg-ivory px-3.5 py-1.5 rounded-full border border-subtle flex-shrink-0">
                Tip: Drag slider horizontally or use ← / → arrow keys
              </div>
            </div>

            {/* Large Interactive Comparison Slider with Crystal-Clear HD Pictures */}
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl border border-subtle">
              <BeforeAfterSlider
                beforeImage={currentItem.beforeImage}
                afterImage={currentItem.afterImage}
                beforeLabel="Before"
                afterLabel="After"
                aspectRatio="aspect-[16/10]"
                className="w-full h-full object-cover max-h-[600px]"
              />
            </div>

            {/* Scope & Details Breakdown */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-xl font-bold text-espresso">
                Key Upgrades Executed:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentItem.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-3.5 rounded-xl bg-ivory/60 border border-subtle/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-espresso font-medium leading-relaxed">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 border-t border-subtle/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted">
                Have a space in Hyderabad or Telangana that needs transforming?
              </p>

              <button
                onClick={onOpenConsultation || (() => window.location.href = '/contact')}
                className="inline-flex items-center space-x-2 bg-espresso hover:bg-espresso-light text-softwhite px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-gold" />
                <span>Discuss Your Transformation</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
