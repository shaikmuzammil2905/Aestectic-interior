import React from 'react';
import { 
  Coffee, 
  Compass, 
  Layers, 
  Hammer, 
  CheckCircle2, 
  ArrowRight,
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { processStages } from '../data/processData';

interface ProcessPageProps {
  onOpenConsultation?: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenConsultation }) => {
  const stageIcons: Record<string, React.ReactNode> = {
    '01': <Coffee className="w-5 h-5 text-gold" />,
    '02': <Compass className="w-5 h-5 text-gold" />,
    '03': <Layers className="w-5 h-5 text-gold" />,
    '04': <Hammer className="w-5 h-5 text-gold" />,
    '05': <CheckCircle2 className="w-5 h-5 text-gold" />,
  };

  return (
    <div className="w-full bg-ivory">
      
      {/* Header */}
      <section className="relative py-20 bg-charcoal text-softwhite overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/hero-desktop.png"
            alt="Execution Process"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="w-6 h-px bg-gold"></span>
            <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase font-sans">
              HOW WE WORK
            </span>
            <span className="w-6 h-px bg-gold"></span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
            Our 5-Stage Journey
          </h1>

          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-normal leading-relaxed">
            From preliminary thoughts to final keys: a clear, organized, transparent methodology that eliminates design guesswork and execution delays.
          </p>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-12">
            {processStages.map((stage, idx) => (
              <div
                key={stage.step}
                className="bg-softwhite rounded-3xl p-6 sm:p-10 border border-subtle/80 shadow-md hover:shadow-xl hover:border-gold/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Large Background Step Number */}
                <span className="absolute -top-4 -right-4 font-serif text-8xl sm:text-9xl font-bold text-sand/20 select-none pointer-events-none">
                  {stage.step}
                </span>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Step Identifier */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="inline-flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-espresso text-gold flex items-center justify-center shadow-md">
                        {stageIcons[stage.step]}
                      </div>
                      <span className="font-serif text-2xl font-bold text-gold">
                        Stage {stage.step}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-medium text-espresso tracking-tight">
                      {stage.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  {/* Step Deliverables */}
                  <div className="lg:col-span-8 bg-ivory/60 rounded-2xl p-6 border border-subtle/60">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-espresso mb-4">
                      Key Activities & Deliverables:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {stage.details.map((detail, i) => (
                        <div key={i} className="flex items-start space-x-2.5">
                          <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-espresso/90 leading-relaxed">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-20 bg-charcoal text-softwhite rounded-3xl p-8 sm:p-12 border border-espresso-light shadow-xl text-center space-y-5">
            <span className="text-xs font-semibold tracking-widest text-gold uppercase">
              READY TO COMMENCE?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium">
              Start with Stage 01: Initial Consultation
            </h2>
            <p className="text-xs sm:text-sm text-ivory/70 max-w-xl mx-auto leading-relaxed">
              Book a free discovery session with our senior interior architects to explore concepts, materials, and preliminary budget frameworks.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenConsultation || (() => window.location.href = '/contact')}
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gold hover:bg-gold-light text-charcoal text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Consultation Today</span>
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

