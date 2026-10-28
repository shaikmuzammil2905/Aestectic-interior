import { ProcessStage, TestimonialItem } from '../types';

export const processStages: ProcessStage[] = [
  {
    step: '01',
    title: 'Consultation',
    description: 'Understand the customer’s space, personal lifestyle, design preferences, and estimated budget.',
    details: [
      'In-depth discussion on how you and your family live in your space',
      'Site measurement and preliminary spatial appraisal',
      'Aesthetic preferences: contemporary, minimalist, traditional, or transitional',
      'Clear definition of project priorities and expected timelines',
    ],
    icon: 'Coffee',
  },
  {
    step: '02',
    title: 'Planning',
    description: 'Review layouts, priorities, functionality, and the proposed scope before execution begins.',
    details: [
      'Ergonomic spatial zoning and traffic flow optimization',
      '2D floor layout options with exact dimensioning',
      'Civil, plumbing, and electrical feasibility validation',
      'Transparent budget allocation matching agreed priorities',
    ],
    icon: 'Compass',
  },
  {
    step: '03',
    title: 'Design Development',
    description: 'Present suitable concepts, finishes, physical material samples, and 3D visual references.',
    details: [
      'Hyper-realistic photorealistic 3D renders with true lighting simulations',
      'Tactile material board: veneers, laminates, fabrics, and stone swatches',
      'Hardware and fixture selection with transparent technical specifications',
      'Design revisions until complete client alignment is reached',
    ],
    icon: 'Layers',
  },
  {
    step: '04',
    title: 'Execution Coordination',
    description: 'Coordinate the agreed work and maintain proactive communication about progress and quality.',
    details: [
      'Direct factory precision manufacturing of modular components',
      'Strict quality checks at factory prior to site dispatch',
      'Dedicated project manager supervising on-site civil and assembly teams',
      'Weekly transparent photo/video progress reporting',
    ],
    icon: 'Hammer',
  },
  {
    step: '05',
    title: 'Final Review',
    description: 'Review completed work within the agreed project scope and address outstanding items for handover.',
    details: [
      'Thorough joint walkthrough and comprehensive snag checklist verification',
      'Deep cleaning and polish before client move-in',
      'Hardware care guide and operational walkthrough',
      'Official handover of keys with ongoing support assurance',
    ],
    icon: 'CheckCircle2',
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    location: 'Hyderabad',
    quote: 'Aesthetic Interiors transformed our home beyond our expectations. The team was professional, creative and delivered on time. Highly recommended!',
    rating: 5,
    projectType: 'Residential Interiors',
    avatar: 'public/assets/client_avatar.png',
  },
  {
    id: '2',
    name: 'Rajesh Varma',
    location: 'Secunderabad',
    quote: 'The in-house modular manufacturing makes a tremendous difference in quality. Every cabinet shut with flawless precision and zero delay.',
    rating: 5,
    projectType: 'Modular Kitchen & Wardrobes',
  },
  {
    id: '3',
    name: 'Ananya Reddy',
    location: 'Gachibowli, Hyderabad',
    quote: 'From 3D designs to final handover, their communication was completely clear and transparent. True luxury aesthetic without the usual stress.',
    rating: 5,
    projectType: 'Turnkey Villa Interiors',
  },
];

