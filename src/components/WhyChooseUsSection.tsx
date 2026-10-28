import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Factory, 
  CheckCircle, 
  ShieldCheck, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const highlights = [
    { title: 'Customized Designs', icon: <Compass className="w-5 h-5 text-gold" /> },
    { title: 'In-house Manufacturing', icon: <Factory className="w-5 h-5 text-gold" /> },
    { title: 'End-to-End Execution', icon: <CheckCircle className="w-5 h-5 text-gold" /> },
    { title: 'Quality Control', icon: <ShieldCheck className="w-5 h-5 text-gold" /> },
    { title: 'Transparent Communication', icon: <MessageSquare className="w-5 h-5 text-gold" /> },
  ];

  return (
    <section className="bg-charcoal text-softwhite py-16 sm:py-20 border-t border-espresso-light relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-gold uppercase font-sans">
              WHY CHOOSE US?
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-softwhite tracking-tight leading-tight">
              Quality. Creativity. Commitment.
            </h2>

            <p className="text-sm text-ivory/80 leading-relaxed max-w-xl font-normal">
              We believe in clear communication, thoughtful planning, and maintaining quality throughout the project. Your satisfaction is our priority, and we make the journey smooth and stress-free.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 bg-espresso-light hover:bg-gold hover:text-charcoal text-softwhite px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border border-gold/30 group"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold group-hover:text-charcoal transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Highlights: 5 Circular Badges */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-espresso/50 border border-gold/20 hover:border-gold/60 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-2.5 group-hover:bg-gold/20 group-hover:scale-110 transition-all">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-medium text-ivory leading-snug">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

