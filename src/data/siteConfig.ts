export const siteConfig = {
  businessName: 'Aesthetic Interiors & Modular Factory',
  brandWordmark: 'AESTHETIC INTERIORS',
  brandDescriptor: '& MODULAR FACTORY',
  tagline: 'Luxury Made Into Reality',
  heroHeadline: 'Thoughtfully Designed. Beautifully Lived.',
  heroSubtitle: 'We create bespoke interiors and premium modular spaces with in-house modular manufacturing, blending style, functionality and timeless elegance.',
  experienceYears: 8,
  officeAddress: 'Sultanpur, Mallapur, Hyderabad, Telangana – 500005, India',
  serviceArea: 'Telangana',
  primaryPhone: '+918712376914',
  primaryPhoneDisplay: '+91 8712376914',
  secondaryPhone: '+919703297187',
  secondaryPhoneDisplay: '+91 9703297187',
  whatsappNumber: '918712376914',
  whatsappSecondary: '919703297187',
  brandPhilosophy: 'Clear communication, thoughtful planning, customized designs, consistent quality, and a smooth, stress-free customer experience.',
  
  // Navigation
  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Our Projects', path: '/projects' },
    { label: 'Before & After', path: '/before-after' },
    { label: 'Our Process', path: '/process' },
    { label: 'Contact', path: '/contact' },
  ],

  // Trust Indicators
  trustIndicators: [
    { title: '8+ Years', subtitle: 'of Experience', icon: 'ShieldCheck' },
    { title: '25+ Interior', subtitle: 'Solutions', icon: 'Home' },
    { title: 'In-house Modular', subtitle: 'Manufacturing', icon: 'Factory' },
    { title: 'Serving Across', subtitle: 'Telangana', icon: 'MapPin' },
  ],

  // Differentiators for Why Choose Us
  whyChooseUs: [
    {
      title: '8 Years of Experience',
      desc: 'Proven track record of turning complex spaces into harmonious, livable architectural statements.',
      icon: 'Award'
    },
    {
      title: 'In-House Modular Manufacturing',
      desc: 'Direct factory precision, high-grade hardware, and strict quality control without third-party delays.',
      icon: 'Cpu'
    },
    {
      title: 'Thoughtful Planning & 3D Previews',
      desc: 'Visual clarity and layout ergonomics before a single screw is fixed or wall is finished.',
      icon: 'Ruler'
    },
    {
      title: 'Clear Communication',
      desc: 'Transparent timelines, dedicated project coordination, and honest progress updates at every phase.',
      icon: 'MessageSquare'
    },
    {
      title: 'End-to-End Execution',
      desc: 'Seamless civil, carpentry, electrical, ceiling, and modular assembly delivered under one roof.',
      icon: 'CheckCircle'
    },
    {
      title: 'Personalized Designs',
      desc: 'Tailored specifically around your family routines, storage needs, and lifestyle aesthetic.',
      icon: 'Sparkles'
    }
  ],

  // Office Location Coordinates / Map Link
  mapDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=Sultanpur+Mallapur+Hyderabad+Telangana+500005',
};

export const getWhatsAppLink = (message?: string, number = siteConfig.whatsappNumber) => {
  const defaultMsg = 'Hello Aesthetic Interiors & Modular Factory, I would like to discuss an interior design project. Please contact me to arrange a consultation.';
  const text = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${number}?text=${text}`;
};
