export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  image: string;
  features: string[];
  scope: string[];
  materials: string[];
  timeline: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  categorySlug: 'living' | 'kitchen' | 'bedroom' | 'wardrobe' | 'tv-unit' | 'commercial' | 'furniture';
  location: string;
  description: string;
  coverImage: string;
  gallery: string[];
  highlights: string[];
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  details: string[];
}

export interface ProcessStage {
  step: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  projectType: string;
  avatar?: string;
}

export interface ConsultationFormData {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  serviceRequired: string;
  propertyType: string;
  approxBudget?: string;
  preferredContact: 'phone' | 'whatsapp';
  requirements: string;
  consent: boolean;
}

