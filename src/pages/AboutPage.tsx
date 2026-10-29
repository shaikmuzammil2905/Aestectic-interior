import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  Factory, 
  HeartHandshake, 
  ArrowRight,
  MapPin,
  Calendar,
  X,
  Check
} from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface AboutPageProps {
  onOpenConsultation?: () => void;
}

interface ValueCardData {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  extendedTitle: string;
  extendedDesc: string;
  checkpoints: string[];
  clientAssurance: string;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultation }) => {
  const { settings } = useSiteSettings();
  const [activePopupValue, setActivePopupValue] = useState<ValueCardData | null>(null);

  const companyValues: ValueCardData[] = [
    {
      id: 'thoughtful-design',
      title: 'Thoughtful Design',
      desc: 'We begin with your daily habits, morning routines, and aesthetic dreams, crafting spaces that feel natural and authentic.',
      icon: <Sparkles className="w-5 h-5 text-gold" />,
      extendedTitle: 'Human-Centered Architectural Philosophy',
      extendedDesc: 'Design is not mere ornamentation—it is the seamless harmonization of circulation, natural daylight, acoustic comfort, and tactile intimacy. Our senior architects study your family rhythms to create spatial blueprints tailored uniquely to you.',
      checkpoints: [
        'Detailed lifestyle interview before drawing a single floor layout',
        'Natural lighting orientation and shadow optimization',
        'Custom furniture proportioning to maximize clear walkway space',
        'Harmonized sensory palettes blending natural stone, wood veneers, and soft textiles'
      ],
      clientAssurance: 'Guaranteed 100% bespoke design customized to your personal taste without generic cookie-cutter templates.'
    },
    {
      id: 'clear-communication',
      title: 'Clear Communication',
      desc: 'Transparent budgets, realistic timelines, and regular progress reports so you are always in complete control.',
      icon: <MessageSquare className="w-5 h-5 text-gold" />,
      extendedTitle: 'Complete Transparency at Every Milestone',
      extendedDesc: 'Interior transformations can often feel opaque and stressful. We eliminate all anxiety with structured weekly updates, transparent itemized BOQs (Bill of Quantities), and dedicated single-point project managers.',
      checkpoints: [
        'Itemized component-by-component price transparency with zero hidden extras',
        'Dedicated WhatsApp coordination group with site engineer and design lead',
        'Weekly video & photo walkthroughs of site and factory fabrication progress',
        'Pre-agreed realistic handover schedule with penalty assurances'
      ],
      clientAssurance: 'You will always know what is being built, when it arrives, and exactly what it costs.'
    },
    {
      id: 'quality-execution',
      title: 'Quality-Focused Execution',
      desc: 'Zero tolerance for substandard hardware. Every panel, screw, and hinge is calibrated to exacting standards.',
      icon: <ShieldCheck className="w-5 h-5 text-gold" />,
      extendedTitle: 'Direct In-House Factory Standards',
      extendedDesc: 'By manufacturing modular cabinetry in our own facility in Mallapur, Hyderabad, we maintain ruthless quality control over edge banding, moisture barrier seals, and hardware calibration that third-party contractors simply cannot match.',
      checkpoints: [
        '100% BWP (Boiling Waterproof) and calibrated high-density marine ply carcass',
        'PUR hot-melt moisture proof edge banding with zero peeling risk',
        'German soft-close hinges and tandem box runners tested for 100,000 cycles',
        'Laser-guided leveling for precision zero-gap installation'
      ],
      clientAssurance: 'Factory-tested modular durability built to withstand humid Indian monsoon conditions.'
    },
    {
      id: 'personalized-solutions',
      title: 'Personalized Solutions',
      desc: 'No cookie-cutter templates. Every layout, wardrobe drawer, and kitchen carousel is built around your specific lifestyle.',
      icon: <HeartHandshake className="w-5 h-5 text-gold" />,
      extendedTitle: 'Tailored Down to the Millimeter',
      extendedDesc: 'Whether you need specialized pull-outs for traditional spice containers, dedicated jewelry drawers with velvet lining, or concealed gaming console wire conduits, our modular units are crafted to your exact specifications.',
      checkpoints: [
        'Custom modular depths and heights to fit specific room architectural alcoves',
        'Ergonomic internal partitioning designed around your apparel and accessories',
        'Vastu-compliant sanctuary placements and serene temple mandir detailing',
        'Personalized finish matching across Italian marble, acrylic, and PU polish'
      ],
      clientAssurance: 'Every square foot is engineered around how you live and work.'
    },
    {
      id: 'functional-planning',
      title: 'Functional Planning',
      desc: 'Balancing visual grandeur with practical storage, ergonomics, ventilation, and durable surface engineering.',
      icon: <CheckCircle2 className="w-5 h-5 text-gold" />,
      extendedTitle: 'Ergonomic Excellence & Practical Storage',
      extendedDesc: 'A home must be as enjoyable to live in as it is stunning to look at. We plan spatial flow, kitchen work triangles, ventilation paths, and concealed utility conduits so your daily living remains effortless.',
      checkpoints: [
        'Golden work triangle optimization for effortless cooking movement',
        'Concealed cable routing and integrated charging points in all consoles',
        'Anti-scratch, anti-fingerprint surface treatments for high-traffic zones',
        'Maximized overhead and loft storage integrated into false ceilings'
      ],
      clientAssurance: 'Effortless maintenance and clutter-free living built into the architectural foundation.'
    },
    {
      id: 'customer-satisfaction',
      title: 'Customer Satisfaction',
      desc: 'Our work is not complete until every snag is resolved and you step into a spotless, beautifully finished home.',
      icon: <Factory className="w-5 h-5 text-gold" />,
      extendedTitle: 'Turnkey Handover & Continued Support',
      extendedDesc: 'Our relationship does not end at key handover. We perform an exhaustive 45-point snag inspection, professional deep cleaning, and provide ongoing maintenance support so you enjoy total peace of mind.',
      checkpoints: [
        'Comprehensive 45-point joint inspection before handover',
        'Professional deep-cleaning and surface sanitization prior to move-in',
        'Detailed hardware maintenance manual and warranty documentation',
        'Responsive post-handover customer support team in Hyderabad'
      ],
      clientAssurance: 'A stress-free handover and a home ready for you to make memories in.'
    },
  ];

  return (
    <div className="w-full bg-ivory">
      
      {/* Page Header */}
      <section className="relative py-20 bg-charcoal text-softwhite overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/hero-desktop.png"
            alt="Interior Studio"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="w-6 h-px bg-gold"></span>
            <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase font-sans">
              ABOUT AESTHETIC INTERIORS
            </span>
            <span className="w-6 h-px bg-gold"></span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
            Designing Spaces. Creating Experiences.
          </h1>

          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-normal leading-relaxed">
            {settings.experienceYears || '8+'} years of transforming residential and commercial environments across Telangana through thoughtful planning and in-house modular manufacturing.
          </p>
        </div>
      </section>

      {/* Philosophy & Story Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Mosaic */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-subtle">
                <img
                  src="/assets/hero-desktop.png"
                  alt="Aesthetic Interiors Living Architecture"
                  className="w-full h-[420px] object-cover"
                />
              </div>

              {/* In-House Manufacturing Floating Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-softwhite rounded-2xl p-5 shadow-xl border border-gold/40 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center flex-shrink-0">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-espresso leading-tight">
                      In-House Modular Factory
                    </h4>
                    <p className="text-[11px] text-muted mt-0.5">
                      Direct quality control & precision CNC joinery at Mallapur, Hyderabad.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2">
                <span className="w-6 h-px bg-gold"></span>
                <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase font-sans">
                  OUR PHILOSOPHY
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-espresso tracking-tight leading-snug">
                Balancing Beauty, Functionality, and Everyday Comfort
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed font-normal">
                <p>
                  <strong>Aesthetic Interiors & Modular Factory</strong> brings together interior design and modular solutions to create spaces that balance beauty, functionality, and everyday comfort.
                </p>
                <p>
                  With {settings.experienceYears || '8+'} years of industry experience, our approach begins with understanding your requirements, planning carefully, communicating clearly, and maintaining quality throughout the project.
                </p>
                <p>
                  From residential interiors to modular kitchens and custom furniture, we aim to make the design journey organized, transparent, and stress-free.
                </p>
              </div>

              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={onOpenConsultation || (() => window.location.href = '/contact')}
                  className="inline-flex items-center space-x-2 bg-espresso hover:bg-espresso-light text-softwhite px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer group"
                >
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold transition-transform group-hover:translate-x-1" />
                </button>

                <Link
                  to="/process"
                  className="text-xs font-semibold uppercase tracking-wider text-espresso hover:text-gold transition-colors"
                >
                  Explore Our Process →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Company Values Grid with INTERACTIVE POPUPS (image copy 7) */}
      <section className="py-20 bg-ivory-50 border-t border-subtle/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase font-sans">
              STANDARDS WE LIVE BY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-espresso tracking-tight">
              Our Core Commitments
            </h2>
            <p className="text-sm text-muted">
              Click any standard below to inspect our detailed architectural principles & factory execution guarantees.
            </p>
          </div>

          {/* The 6 Cards from image copy 7 - Click to Open Popup! */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyValues.map((val) => (
              <div
                key={val.id}
                onClick={() => setActivePopupValue(val)}
                className="bg-softwhite rounded-3xl p-7 border border-subtle/80 shadow-sm hover:shadow-xl hover:border-gold/60 transition-all duration-300 space-y-3 cursor-pointer group relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-2xl bg-ivory flex items-center justify-center border border-subtle group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                  {val.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-espresso group-hover:text-gold-dark transition-colors">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">
                  {val.desc}
                </p>

                <div className="pt-3 flex items-center space-x-1 text-gold text-xs font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MODAL POPUP FOR CORE VALUE DETAILS (image copy 7) */}
      {activePopupValue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal/80 backdrop-blur-md animate-fade-in">
          <div 
            className="fixed inset-0" 
            onClick={() => setActivePopupValue(null)}
            aria-hidden="true"
          ></div>

          <div className="relative w-full max-w-2xl bg-softwhite rounded-3xl shadow-2xl border border-gold/40 overflow-hidden z-10 animate-fade-up">
            
            {/* Modal Header */}
            <div className="bg-espresso text-softwhite p-6 flex items-center justify-between border-b border-gold/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center border border-gold/40">
                  {activePopupValue.icon}
                </div>
                <div>
                  <span className="text-[10px] tracking-widest text-gold font-bold uppercase block">
                    AESTHETIC ARCHITECTURAL STANDARD
                  </span>
                  <h3 className="font-serif text-2xl font-bold">
                    {activePopupValue.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActivePopupValue(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-charcoal text-softwhite flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <div>
                <h4 className="font-serif text-lg font-bold text-espresso mb-2">
                  {activePopupValue.extendedTitle}
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  {activePopupValue.extendedDesc}
                </p>
              </div>

              {/* Execution Checkpoints */}
              <div className="bg-ivory/60 rounded-2xl p-5 border border-subtle/80 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-espresso block">
                  Quality Checkpoints & Deliverables:
                </span>
                <div className="space-y-2">
                  {activePopupValue.checkpoints.map((cp, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-espresso">
                      <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>{cp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Assurance */}
              <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-xs sm:text-sm text-espresso font-medium flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0" />
                <span>{activePopupValue.clientAssurance}</span>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setActivePopupValue(null)}
                  className="px-5 py-2.5 rounded-full border border-subtle text-xs font-semibold uppercase tracking-wider text-espresso hover:bg-ivory transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActivePopupValue(null);
                    if (onOpenConsultation) {
                      onOpenConsultation();
                    } else {
                      window.location.href = '/contact';
                    }
                  }}
                  className="px-6 py-2.5 rounded-full bg-espresso hover:bg-espresso-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-colors shadow cursor-pointer flex items-center space-x-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  <span>Discuss Your Project</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Office & Workshop Presence */}
      <section className="py-16 bg-charcoal text-softwhite border-t border-espresso-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-widest text-gold uppercase">
              FACILITY & REGISTERED ADDRESS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium">
              Sultanpur, Mallapur, Hyderabad
            </h3>
            <p className="text-xs text-ivory/70 max-w-xl">
              Telangana – 500005, India. Complete modular manufacturing line with German hardware calibration and finish testing.
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href={settings.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-charcoal text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions on Map</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
