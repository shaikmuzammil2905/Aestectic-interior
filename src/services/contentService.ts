import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { siteConfig } from '../data/siteConfig';
import { servicesData } from '../data/servicesData';
import { projectsData } from '../data/projectsData';
import { beforeAfterData } from '../data/beforeAfterData';
import { ServiceItem, ProjectItem, BeforeAfterItem, TestimonialItem, ConsultationFormData } from '../types';

export interface HeroSlideItem {
  id?: string;
  eyebrow: string;
  heading_line1: string;
  heading_line2: string;
  subtitle: string;
  tags: string;
  desktop_bg?: string;
  mobile_bg?: string;
  cta_primary_text?: string;
  cta_primary_link?: string;
  cta_secondary_text?: string;
  cta_secondary_action?: string;
  display_order?: number;
  is_published?: boolean;
}

export interface MediaAssetItem {
  id?: string;
  public_id: string;
  url: string;
  original_name?: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  alt_text?: string;
  section?: string;
  created_at?: string;
}

export interface EnquiryItem {
  id?: string;
  full_name: string;
  phone: string;
  email?: string;
  city: string;
  service_required: string;
  property_type?: string;
  approx_budget?: string;
  preferred_contact?: 'phone' | 'whatsapp' | string;
  requirements?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'archived';
  admin_notes?: string;
  created_at?: string;
}

const DEFAULT_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'hero-1',
    eyebrow: 'LUXURY MADE INTO REALITY',
    heading_line1: 'Thoughtfully Designed.',
    heading_line2: 'Beautifully Lived.',
    subtitle: 'We create bespoke interiors and premium modular spaces with in-house modular manufacturing, blending style, functionality and timeless elegance.',
    tags: 'Residential Interiors • Modular Kitchens • Custom Furniture',
    desktop_bg: '/assets/hero-desktop.png',
    mobile_bg: '/assets/hero-mobile.png',
    display_order: 0,
    is_published: true,
  },
  {
    id: 'hero-2',
    eyebrow: 'IN-HOUSE MODULAR FACTORY',
    heading_line1: 'Precision Engineered.',
    heading_line2: 'Direct From Factory.',
    subtitle: 'German-grade hardware, zero-defect edge banding, and high-density marine ply crafted to perfection in our Hyderabad manufacturing facility.',
    tags: 'Modular Wardrobes • Modular Kitchens • TV Units',
    desktop_bg: '/assets/hero-desktop.png',
    mobile_bg: '/assets/hero-mobile.png',
    display_order: 1,
    is_published: true,
  },
  {
    id: 'hero-3',
    eyebrow: '8+ YEARS OF EXCELLENCE',
    heading_line1: 'Seamless Execution.',
    heading_line2: 'Zero Stress Journey.',
    subtitle: 'From 3D photorealistic visualization to turnkey civil and carpentry coordination, we bring complete transparency to your home transformation.',
    tags: 'Turnkey Living • Luxury Villas • Commercial Studios',
    desktop_bg: '/assets/hero-desktop.png',
    mobile_bg: '/assets/hero-mobile.png',
    display_order: 2,
    is_published: true,
  },
];

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Dr. S. K. Reddy',
    location: 'Jubilee Hills, Hyderabad',
    quote: 'Aesthetic Interiors transformed our 4BHK villa beyond our expectations. Having their own modular factory made all the difference in precision and finishing. Flawless execution from day one.',
    rating: 5,
    projectType: '4BHK Villa Turnkey Interior',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 't-2',
    name: 'Priya & Rohan Verma',
    location: 'Gachibowli, Hyderabad',
    quote: 'The modular kitchen and master bedroom wardrobes are world class. German fittings, silent soft-close, and zero defects. Their team kept us informed every single week.',
    rating: 5,
    projectType: 'Modular Kitchen & Wardrobes',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 't-3',
    name: 'K. Venkat Rao',
    location: 'Madhapur, Hyderabad',
    quote: 'They finished our commercial studio on time and within budget. The 3D render matched the final reality 100%. Highly recommended for anyone wanting honest, quality work in Telangana.',
    rating: 5,
    projectType: 'Commercial Creative Studio',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
];

export const contentService = {
  // --------------------------------------------------------------------------
  // Site Settings
  // --------------------------------------------------------------------------
  async getSiteSettings() {
    if (!isSupabaseConfigured()) return siteConfig;
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'general')
        .maybeSingle();

      if (error || !data) return siteConfig;
      return { ...siteConfig, ...data.value };
    } catch {
      return siteConfig;
    }
  },

  async updateSiteSettings(settings: Record<string, any>) {
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({
        key: 'general',
        value: settings,
        updated_at: new Date().toISOString(),
      })
      .select();

    if (error) throw error;
    await this.logActivity('UPDATE', 'site_settings', 'general', { fields: Object.keys(settings) });
    return data;
  },

  // --------------------------------------------------------------------------
  // Hero Slides
  // --------------------------------------------------------------------------
  async getHeroSlides(includeDrafts = false): Promise<HeroSlideItem[]> {
    if (!isSupabaseConfigured()) return DEFAULT_HERO_SLIDES;
    try {
      let query = supabase
        .from('hero_slides')
        .select('*')
        .order('display_order', { ascending: true });

      if (!includeDrafts) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query;

      if (error || !data || data.length === 0) {
        // Fallback to all if none published
        if (!includeDrafts) return this.getHeroSlides(true);
        return DEFAULT_HERO_SLIDES;
      }
      return data;
    } catch {
      return DEFAULT_HERO_SLIDES;
    }
  },

  async saveHeroSlide(slide: Partial<HeroSlideItem>) {
    const { data, error } = await supabase
      .from('hero_slides')
      .upsert(slide)
      .select()
      .single();

    if (error) throw error;
    await this.logActivity(slide.id ? 'UPDATE' : 'CREATE', 'hero_slides', data.id, { heading: data.heading_line1 });
    return data;
  },

  async deleteHeroSlide(id: string) {
    const { error } = await supabase.from('hero_slides').delete().eq('id', id);
    if (error) throw error;
    await this.logActivity('DELETE', 'hero_slides', id, {});
  },

  // --------------------------------------------------------------------------
  // Services
  // --------------------------------------------------------------------------
  async getServices(includeDrafts = false): Promise<ServiceItem[]> {
    if (!isSupabaseConfigured()) return servicesData;
    try {
      let query = supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (!includeDrafts) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query;

      if (error || !data || data.length === 0) {
        if (!includeDrafts) return this.getServices(true);
        return servicesData;
      }
      return data.map((d: any) => ({
        id: d.id,
        title: d.title,
        shortDesc: d.short_desc,
        fullDesc: d.full_desc,
        icon: d.icon,
        image: d.image,
        features: Array.isArray(d.features) ? d.features : [],
        scope: Array.isArray(d.scope) ? d.scope : [],
        materials: Array.isArray(d.materials) ? d.materials : [],
        timeline: d.timeline || '2 - 4 Weeks',
        is_published: d.is_published ?? true,
        display_order: d.display_order ?? 0,
      }));
    } catch {
      return servicesData;
    }
  },

  async getServiceById(id: string): Promise<ServiceItem | undefined> {
    const services = await this.getServices();
    return services.find((s) => s.id === id);
  },

  async saveService(service: any) {
    const payload = {
      id: service.id,
      title: service.title,
      category: service.category || 'Interior Design',
      short_desc: service.shortDesc || service.short_desc,
      full_desc: service.fullDesc || service.full_desc,
      icon: service.icon || 'Home',
      image: service.image,
      features: service.features || [],
      scope: service.scope || [],
      materials: service.materials || [],
      timeline: service.timeline || '2 - 4 Weeks',
      display_order: service.display_order ?? 0,
      is_published: service.is_published ?? true,
    };

    const { data, error } = await supabase
      .from('services')
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    await this.logActivity('UPSERT', 'services', data.id, { title: data.title });
    return data;
  },

  async deleteService(id: string) {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) throw error;
    await this.logActivity('DELETE', 'services', id, {});
  },

  // --------------------------------------------------------------------------
  // Projects
  // --------------------------------------------------------------------------
  async getProjects(includeDrafts = false): Promise<ProjectItem[]> {
    if (!isSupabaseConfigured()) return projectsData;
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (!includeDrafts) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query;

      if (error || !data || data.length === 0) {
        if (!includeDrafts) return this.getProjects(true);
        return projectsData;
      }
      return data.map((d: any) => ({
        id: d.id,
        title: d.title,
        category: d.category,
        categorySlug: d.category_slug,
        location: d.location,
        description: d.description,
        coverImage: d.cover_image,
        gallery: Array.isArray(d.gallery) ? d.gallery : [d.cover_image],
        highlights: Array.isArray(d.highlights) ? d.highlights : [],
        is_featured: d.is_featured ?? true,
        is_published: d.is_published ?? true,
        display_order: d.display_order ?? 0,
      }));
    } catch {
      return projectsData;
    }
  },

  async getProjectById(id: string): Promise<ProjectItem | undefined> {
    const projects = await this.getProjects();
    return projects.find((p) => p.id === id);
  },

  async saveProject(proj: any) {
    const payload = {
      id: proj.id,
      title: proj.title,
      category: proj.category,
      category_slug: proj.categorySlug || proj.category_slug,
      location: proj.location,
      description: proj.description,
      cover_image: proj.coverImage || proj.cover_image,
      gallery: proj.gallery || [],
      highlights: proj.highlights || [],
      is_featured: proj.is_featured ?? true,
      display_order: proj.display_order ?? 0,
      is_published: proj.is_published ?? true,
    };

    const { data, error } = await supabase
      .from('projects')
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    await this.logActivity('UPSERT', 'projects', data.id, { title: data.title });
    return data;
  },

  async deleteProject(id: string) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    await this.logActivity('DELETE', 'projects', id, {});
  },

  // --------------------------------------------------------------------------
  // Before & After Comparisons
  // --------------------------------------------------------------------------
  async getBeforeAfter(includeDrafts = false): Promise<BeforeAfterItem[]> {
    if (!isSupabaseConfigured()) return beforeAfterData;
    try {
      let query = supabase
        .from('before_after_projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (!includeDrafts) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query;

      if (error || !data || data.length === 0) {
        if (!includeDrafts) return this.getBeforeAfter(true);
        return beforeAfterData;
      }
      return data.map((d: any) => ({
        id: d.id,
        title: d.title,
        category: d.category,
        description: d.description,
        beforeImage: d.before_image,
        afterImage: d.after_image,
        details: Array.isArray(d.details) ? d.details : [],
        is_published: d.is_published ?? true,
        display_order: d.display_order ?? 0,
      }));
    } catch {
      return beforeAfterData;
    }
  },

  async saveBeforeAfter(item: any) {
    const payload = {
      id: item.id,
      title: item.title,
      category: item.category,
      description: item.description,
      before_image: item.beforeImage || item.before_image,
      after_image: item.afterImage || item.after_image,
      details: item.details || [],
      display_order: item.display_order ?? 0,
      is_published: item.is_published ?? true,
    };

    const { data, error } = await supabase
      .from('before_after_projects')
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    await this.logActivity('UPSERT', 'before_after_projects', data.id, { title: data.title });
    return data;
  },

  async deleteBeforeAfter(id: string) {
    const { error } = await supabase.from('before_after_projects').delete().eq('id', id);
    if (error) throw error;
    await this.logActivity('DELETE', 'before_after_projects', id, {});
  },

  // --------------------------------------------------------------------------
  // Testimonials
  // --------------------------------------------------------------------------
  async getTestimonials(includeDrafts = false): Promise<TestimonialItem[]> {
    if (!isSupabaseConfigured()) return DEFAULT_TESTIMONIALS;
    try {
      let query = supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (!includeDrafts) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query;

      if (error || !data || data.length === 0) {
        if (!includeDrafts) return this.getTestimonials(true);
        return DEFAULT_TESTIMONIALS;
      }
      return data.map((d: any) => ({
        id: d.id,
        name: d.name,
        location: d.location,
        quote: d.quote,
        rating: d.rating || 5,
        projectType: d.project_type || 'Interior Project',
        avatar: d.avatar,
        is_published: d.is_published ?? true,
        display_order: d.display_order ?? 0,
      }));
    } catch {
      return DEFAULT_TESTIMONIALS;
    }
  },

  async saveTestimonial(item: Partial<TestimonialItem> & { display_order?: number; is_published?: boolean }) {
    const payload = {
      ...(item.id ? { id: item.id } : {}),
      name: item.name,
      location: item.location,
      quote: item.quote,
      rating: item.rating ?? 5,
      project_type: item.projectType,
      avatar: item.avatar,
      display_order: item.display_order ?? 0,
      is_published: item.is_published ?? true,
    };

    const { data, error } = await supabase
      .from('testimonials')
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    await this.logActivity('UPSERT', 'testimonials', data.id, { name: data.name });
    return data;
  },

  async deleteTestimonial(id: string) {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) throw error;
    await this.logActivity('DELETE', 'testimonials', id, {});
  },

  // --------------------------------------------------------------------------
  // Enquiries & Consultations
  // --------------------------------------------------------------------------
  async submitEnquiry(formData: ConsultationFormData) {
    const payload = {
      full_name: formData.fullName,
      phone: formData.phone,
      email: formData.email || null,
      city: formData.city || 'Hyderabad',
      service_required: formData.serviceRequired,
      property_type: formData.propertyType || null,
      approx_budget: formData.approxBudget || null,
      preferred_contact: formData.preferredContact || 'phone',
      requirements: formData.requirements || null,
      status: 'new',
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('enquiries')
          .insert([payload])
          .select()
          .single();

        if (error) {
          console.warn('Supabase enquiry insert failed, continuing gracefully:', error.message);
        } else {
          return { success: true, id: data.id };
        }
      } catch (err) {
        console.warn('Enquiry submission network fallback:', err);
      }
    }
    return { success: true, fallback: true };
  },

  async getEnquiries(): Promise<EnquiryItem[]> {
    if (!isSupabaseConfigured()) return [];
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch {
      return [];
    }
  },

  async updateEnquiryStatus(id: string, status: EnquiryItem['status'], adminNotes?: string) {
    const updates: any = { status };
    if (adminNotes !== undefined) updates.admin_notes = adminNotes;

    const { data, error } = await supabase
      .from('enquiries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    await this.logActivity('UPDATE', 'enquiries', id, { status, adminNotes });
    return data;
  },

  async deleteEnquiry(id: string) {
    const { error } = await supabase.from('enquiries').delete().eq('id', id);
    if (error) throw error;
    await this.logActivity('DELETE', 'enquiries', id, {});
  },

  // --------------------------------------------------------------------------
  // Media Assets Library
  // --------------------------------------------------------------------------
  async getMediaAssets(): Promise<MediaAssetItem[]> {
    if (!isSupabaseConfigured()) return [];
    try {
      const { data, error } = await supabase
        .from('media_assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!data || data.length === 0) {
        await this.seedDefaultMediaAssets();
        const { data: seeded } = await supabase
          .from('media_assets')
          .select('*')
          .order('created_at', { ascending: false });
        return seeded || [];
      }
      return data || [];
    } catch (err) {
      console.warn('Failed to get media assets:', err);
      return [];
    }
  },

  async saveMediaAsset(asset: Partial<MediaAssetItem>) {
    if (!isSupabaseConfigured()) return asset;
    const payload = {
      public_id: asset.public_id || 'asset-' + Date.now(),
      url: asset.url,
      original_name: asset.original_name || 'image_' + Date.now(),
      format: asset.format || 'jpg',
      width: asset.width || 1200,
      height: asset.height || 800,
      bytes: asset.bytes || 0,
      alt_text: asset.alt_text || 'Aesthetic Interiors media asset',
      section: asset.section || 'general',
    };

    const { data, error } = await supabase
      .from('media_assets')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    await this.logActivity('CREATE', 'media_assets', data.id, { url: data.url });
    return data;
  },

  async deleteMediaAsset(id: string) {
    const { error } = await supabase.from('media_assets').delete().eq('id', id);
    if (error) throw error;
    await this.logActivity('DELETE', 'media_assets', id, {});
  },

  async seedDefaultMediaAssets() {
    const defaultAssets = [
      { public_id: 'logo-brand', url: '/assets/logo.png', original_name: 'logo.png', section: 'branding', alt_text: 'Aesthetic Interiors Brand Logo' },
      { public_id: 'hero-banner-main', url: '/assets/hero-desktop.png', original_name: 'hero-desktop.png', section: 'hero', alt_text: 'Living Room Hero Master Banner' },
      { public_id: 'proj-living', url: '/assets/projects/proj_living_hd.jpg', original_name: 'proj_living_hd.jpg', section: 'projects', alt_text: 'Modern Living Room' },
      { public_id: 'proj-kitchen', url: '/assets/projects/proj_kitchen_hd.jpg', original_name: 'proj_kitchen_hd.jpg', section: 'projects', alt_text: 'Modular Kitchen Suite' },
      { public_id: 'proj-bedroom', url: '/assets/projects/proj_bedroom_hd.jpg', original_name: 'proj_bedroom_hd.jpg', section: 'projects', alt_text: 'Luxury Bedroom Sanctuary' },
      { public_id: 'proj-wardrobe', url: '/assets/projects/proj_wardrobe_hd.jpg', original_name: 'proj_wardrobe_hd.jpg', section: 'projects', alt_text: 'Walk-in Wardrobe Closet' },
      { public_id: 'proj-tvunit', url: '/assets/projects/proj_tvunit_hd.jpg', original_name: 'proj_tvunit_hd.jpg', section: 'projects', alt_text: 'Acoustic TV Media Wall' },
      { public_id: 'custom-furniture-banner', url: '/assets/custom-furniture-hd.png', original_name: 'custom-furniture-hd.png', section: 'furniture', alt_text: 'Custom Furniture Direct Factory' },
      { public_id: 'before-trans', url: '/assets/transformation_before_hd.jpg', original_name: 'transformation_before_hd.jpg', section: 'transformations', alt_text: 'Living Room Before Renovation' },
      { public_id: 'after-trans', url: '/assets/transformation_after_hd.jpg', original_name: 'transformation_after_hd.jpg', section: 'transformations', alt_text: 'Living Room After Renovation' },
      { public_id: 'service-kitchen', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', original_name: 'modular-kitchen.jpg', section: 'services', alt_text: 'Modular Kitchen Design' },
      { public_id: 'service-wardrobes', url: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80', original_name: 'wardrobes.jpg', section: 'services', alt_text: 'Wardrobes & Storage' },
    ];

    try {
      await supabase.from('media_assets').insert(defaultAssets);
    } catch {
      // non-blocking
    }
  },

  // --------------------------------------------------------------------------
  // Realtime Subscriptions
  // --------------------------------------------------------------------------
  subscribeToTable(table: string, callback: () => void) {
    if (!isSupabaseConfigured()) return () => {};

    try {
      const channelId = `realtime_${table}_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
      const channel = supabase
        .channel(channelId)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table },
          () => {
            callback();
          }
        )
        .subscribe();

      return () => {
        try {
          supabase.removeChannel(channel);
        } catch {
          // Graceful cleanup
        }
      };
    } catch (err) {
      console.warn(`Failed to subscribe to ${table}:`, err);
      return () => {};
    }
  },

  // --------------------------------------------------------------------------
  // Activity Logging
  // --------------------------------------------------------------------------
  async logActivity(action: string, entityType: string, entityId: string, details: any) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('admin_activity_logs').insert([
        {
          admin_email: user?.email || 'admin@aestheticinteriors.com',
          action,
          entity_type: entityType,
          entity_id: entityId,
          details,
        },
      ]);
    } catch {
      // Non-blocking log
    }
  },

  async getActivityLogs(limit = 30) {
    if (!isSupabaseConfigured()) return [];
    try {
      const { data, error } = await supabase
        .from('admin_activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) return [];
      return data || [];
    } catch {
      return [];
    }
  },
};

