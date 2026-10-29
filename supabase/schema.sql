-- ==============================================================================
-- AESTHETIC INTERIORS & MODULAR FACTORY — COMPLETE SUPABASE DATABASE SCHEMA
-- Production Schema: Tables, Indexes, RLS Policies, Triggers & Initial Seed Data
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Generic timestamp updater function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- TABLE 1: SITE SETTINGS (Key-Value configuration for brand info, phones, etc.)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trigger_site_settings_updated_at ON site_settings;
CREATE TRIGGER trigger_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- TABLE 2: HERO SLIDES (Carousel slides, headlines, and background visuals)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  eyebrow TEXT NOT NULL DEFAULT 'LUXURY MADE INTO REALITY',
  heading_line1 TEXT NOT NULL,
  heading_line2 TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  tags TEXT DEFAULT 'Residential Interiors • Modular Kitchens • Custom Furniture',
  desktop_bg TEXT NOT NULL DEFAULT '/assets/hero-desktop.png',
  mobile_bg TEXT NOT NULL DEFAULT '/assets/hero-mobile.png',
  cta_primary_text TEXT DEFAULT 'Explore Our Work',
  cta_primary_link TEXT DEFAULT '/projects',
  cta_secondary_text TEXT DEFAULT 'Book a Consultation',
  cta_secondary_action TEXT DEFAULT 'consultation_modal',
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trigger_hero_slides_updated_at ON hero_slides;
CREATE TRIGGER trigger_hero_slides_updated_at
  BEFORE UPDATE ON hero_slides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- TABLE 3: SERVICES (Complete catalog of modular and interior services)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Interior Design',
  short_desc TEXT NOT NULL,
  full_desc TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Home',
  image TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  scope JSONB DEFAULT '[]'::jsonb,
  materials JSONB DEFAULT '[]'::jsonb,
  timeline TEXT DEFAULT '2 - 4 Weeks',
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trigger_services_updated_at ON services;
CREATE TRIGGER trigger_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- TABLE 4: PROJECTS (Portfolio showcase)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  location TEXT NOT NULL,
  area TEXT,
  duration TEXT,
  description TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  highlights JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trigger_projects_updated_at ON projects;
CREATE TRIGGER trigger_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- TABLE 5: BEFORE & AFTER PROJECTS (Interactive dual-image comparisons)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS before_after_projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  before_image TEXT NOT NULL,
  after_image TEXT NOT NULL,
  details JSONB DEFAULT '[]'::jsonb,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trigger_before_after_updated_at ON before_after_projects;
CREATE TRIGGER trigger_before_after_updated_at
  BEFORE UPDATE ON before_after_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- TABLE 6: TESTIMONIALS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INT DEFAULT 5,
  project_type TEXT,
  avatar TEXT,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trigger_testimonials_updated_at ON testimonials;
CREATE TRIGGER trigger_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- TABLE 7: ENQUIRIES & CONSULTATIONS (Public submissions & Admin CRM)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL DEFAULT 'Hyderabad',
  service_required TEXT NOT NULL,
  property_type TEXT,
  approx_budget TEXT,
  preferred_contact TEXT DEFAULT 'phone',
  requirements TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'scheduled', 'completed', 'archived'
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trigger_enquiries_updated_at ON enquiries;
CREATE TRIGGER trigger_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- TABLE 8: MEDIA ASSETS (Cloudinary metadata tracker)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  public_id TEXT NOT NULL,
  url TEXT NOT NULL,
  original_name TEXT,
  format TEXT,
  width INT,
  height INT,
  bytes INT,
  alt_text TEXT,
  section TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- TABLE 9: ADMIN ACTIVITY LOGS (Audit trail)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE before_after_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- 1. Site Settings Policies
DROP POLICY IF EXISTS "Public can view site settings" ON site_settings;
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated admins can manage site settings" ON site_settings;
CREATE POLICY "Authenticated admins can manage site settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- 2. Hero Slides Policies
DROP POLICY IF EXISTS "Public can view published hero slides" ON hero_slides;
CREATE POLICY "Public can view published hero slides" ON hero_slides FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated admins can manage hero slides" ON hero_slides;
CREATE POLICY "Authenticated admins can manage hero slides" ON hero_slides FOR ALL USING (auth.role() = 'authenticated');

-- 3. Services Policies
DROP POLICY IF EXISTS "Public can view published services" ON services;
CREATE POLICY "Public can view published services" ON services FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated admins can manage services" ON services;
CREATE POLICY "Authenticated admins can manage services" ON services FOR ALL USING (auth.role() = 'authenticated');

-- 4. Projects Policies
DROP POLICY IF EXISTS "Public can view published projects" ON projects;
CREATE POLICY "Public can view published projects" ON projects FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated admins can manage projects" ON projects;
CREATE POLICY "Authenticated admins can manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- 5. Before & After Policies
DROP POLICY IF EXISTS "Public can view published before_after" ON before_after_projects;
CREATE POLICY "Public can view published before_after" ON before_after_projects FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated admins can manage before_after" ON before_after_projects;
CREATE POLICY "Authenticated admins can manage before_after" ON before_after_projects FOR ALL USING (auth.role() = 'authenticated');

-- 6. Testimonials Policies
DROP POLICY IF EXISTS "Public can view published testimonials" ON testimonials;
CREATE POLICY "Public can view published testimonials" ON testimonials FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated admins can manage testimonials" ON testimonials;
CREATE POLICY "Authenticated admins can manage testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- 7. Enquiries Policies
DROP POLICY IF EXISTS "Public can insert enquiries" ON enquiries;
CREATE POLICY "Public can insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated admins can view and manage enquiries" ON enquiries;
CREATE POLICY "Authenticated admins can view and manage enquiries" ON enquiries FOR ALL USING (auth.role() = 'authenticated');

-- 8. Media Assets Policies
DROP POLICY IF EXISTS "Public can view media assets" ON media_assets;
CREATE POLICY "Public can view media assets" ON media_assets FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated admins can manage media assets" ON media_assets;
CREATE POLICY "Authenticated admins can manage media assets" ON media_assets FOR ALL USING (auth.role() = 'authenticated');

-- 9. Admin Logs Policies
DROP POLICY IF EXISTS "Authenticated admins can view and insert logs" ON admin_activity_logs;
CREATE POLICY "Authenticated admins can view and insert logs" ON admin_activity_logs FOR ALL USING (auth.role() = 'authenticated');

-- ==============================================================================
-- REALTIME REPLICATION ENABLEMENT
-- ==============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE site_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE hero_slides;
ALTER PUBLICATION supabase_realtime ADD TABLE services;
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE before_after_projects;
ALTER PUBLICATION supabase_realtime ADD TABLE testimonials;
ALTER PUBLICATION supabase_realtime ADD TABLE enquiries;

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Site Settings
INSERT INTO site_settings (key, value) VALUES
('general', '{
  "businessName": "Aesthetic Interiors & Modular Factory",
  "brandWordmark": "AESTHETIC INTERIORS",
  "brandDescriptor": "& MODULAR FACTORY",
  "tagline": "Luxury Made Into Reality",
  "experienceYears": 8,
  "officeAddress": "Sultanpur, Mallapur, Hyderabad, Telangana – 500005, India",
  "serviceArea": "Telangana",
  "primaryPhone": "+918712376914",
  "primaryPhoneDisplay": "+91 8712376914",
  "secondaryPhone": "+919703297187",
  "secondaryPhoneDisplay": "+91 9703297187",
  "whatsappNumber": "918712376914",
  "whatsappSecondary": "919703297187",
  "brandPhilosophy": "Clear communication, thoughtful planning, customized designs, consistent quality, and a smooth, stress-free customer experience.",
  "heroScriptText": "Your Dream Our Design",
  "heroBadges": [
    {"label": "MODERN", "sub": "Designs", "icon": "Sparkles"},
    {"label": "PREMIUM", "sub": "Materials", "icon": "Layers"},
    {"label": "EXPERT", "sub": "Execution", "icon": "Award"}
  ]
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Hero Slides
INSERT INTO hero_slides (eyebrow, heading_line1, heading_line2, subtitle, tags, desktop_bg, mobile_bg, display_order)
VALUES
('LUXURY MADE INTO REALITY', 'Thoughtfully Designed.', 'Beautifully Lived.', 'We create bespoke interiors and premium modular spaces with in-house modular manufacturing, blending style, functionality and timeless elegance.', 'Residential Interiors • Modular Kitchens • Custom Furniture', '/assets/hero-desktop.png', '/assets/hero-mobile.png', 0),
('IN-HOUSE MODULAR FACTORY', 'Precision Engineered.', 'Direct From Factory.', 'German-grade hardware, zero-defect edge banding, and high-density marine ply crafted to perfection in our Hyderabad manufacturing facility.', 'Modular Wardrobes • Modular Kitchens • TV Units', '/assets/hero-desktop.png', '/assets/hero-mobile.png', 1),
('8+ YEARS OF EXCELLENCE', 'Seamless Execution.', 'Zero Stress Journey.', 'From 3D photorealistic visualization to turnkey civil and carpentry coordination, we bring complete transparency to your home transformation.', 'Turnkey Living • Luxury Villas • Commercial Studios', '/assets/hero-desktop.png', '/assets/hero-mobile.png', 2);

-- Before & After Projects
INSERT INTO before_after_projects (id, title, category, description, before_image, after_image, details, display_order)
VALUES
('living-room-transformation', 'Modern Living Room Transformation', 'Living Room', 'Transforming an unadorned, flat room into an opulent living lounge with cove recessed ceiling lights, fluted wall treatments, custom sofa, and ambient warmth.', '/assets/transformation_before_hd.jpg', '/assets/transformation_after_hd.jpg', '["Installed tiered false ceiling with warm indirect 3000K cove LEDs", "Engineered acoustic wall panels with brushed gold trims", "Replaced dated seating with custom modular sectional lounge", "Added architectural marble coffee table and lush indoor planter accents"]'::jsonb, 0),
('kitchen-remodel', 'Chef Modular Kitchen Renovation', 'Modular Kitchen', 'A dark, closed kitchen transformed into an open-concept modular culinary haven with quartz island and automated Blum lift-up wall cabinets.', 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80', '/assets/projects/proj_kitchen_hd.jpg', '["Removed non-loadbearing dividing wall for an open spatial connection", "Installed anti-scratch acrylic finish shutters in dual champagne & charcoal tones", "Added heavy-duty pantry units, spice carousels, and quartz countertop", "Concealed ducting chimney and under-cabinet task illumination"]'::jsonb, 1),
('master-bedroom-revamp', 'Master Bedroom Suite Makeover', 'Master Bedroom', 'From an ordinary bedroom to a 5-star hotel style sanctuary with acoustic fluted headboard wall and floating ambient bedside consoles.', 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80', '/assets/projects/proj_bedroom_hd.jpg', '["Acoustic suede and wood fluted feature headboard running wall-to-wall", "Integrated floating nightstands with built-in wireless charging stations", "Concealed cove lighting and bedside architectural reading pendants", "Plush velvet accents complementing warm oak wood flooring"]'::jsonb, 2)
ON CONFLICT (id) DO NOTHING;

-- Projects
INSERT INTO projects (id, title, category, category_slug, location, description, cover_image, gallery, highlights, is_featured, display_order)
VALUES
('modern-living-room', 'Modern Living Room', 'Residential Interiors', 'living', 'Jubilee Hills, Hyderabad', 'A sun-drenched contemporary living space featuring Italian travertine accent paneling, bespoke curved upholstery, concealed linear LED lighting, and custom marble-top nested coffee tables.', '/assets/projects/proj_living_hd.jpg', '["/assets/projects/proj_living_hd.jpg", "/assets/hero-desktop.png", "/assets/custom-furniture-hd.png"]'::jsonb, '["Bespoke Curved L-Sofa", "Fluted Charcoal Accents", "Integrated Acoustic Wall", "Concealed Kick Lights"]'::jsonb, true, 0),
('modular-kitchen-suite', 'Modular Kitchen', 'Modular Solutions', 'kitchen', 'Gachibowli, Hyderabad', 'An executive chef kitchen with scratch-resistant acrylic glass finishes, quartz breakfast bar island, imported Blum tip-on storage drawers, and ambient under-cabinet glow.', '/assets/projects/proj_kitchen_hd.jpg', '["/assets/projects/proj_kitchen_hd.jpg", "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"]'::jsonb, '["Anti-fingerprint Matte Finish", "Pantry Tall Unit with Servo-Drive", "Calacatta Quartz Island", "Concealed Spice Pull-outs"]'::jsonb, true, 1),
('luxury-bedroom-haven', 'Luxury Bedroom', 'Residential Interiors', 'bedroom', 'Financial District, Hyderabad', 'A tranquil master suite highlighted by a floor-to-ceiling padded suede headboard, warm indirect cove illumination, integrated floating consoles, and acoustically cushioned walls.', '/assets/projects/proj_bedroom_hd.jpg', '["/assets/projects/proj_bedroom_hd.jpg", "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"]'::jsonb, '["Full Wall Upholstered Headboard", "Hidden Vanity Dresser", "Warm 2700K Reading Pendants", "Engineered Oak Flooring"]'::jsonb, true, 2),
('wardrobes-and-storage', 'Wardrobes & Storage', 'Modular Storage', 'wardrobe', 'Banjara Hills, Hyderabad', 'Precision-engineered floor-to-ceiling walk-in closet with champagne aluminum profiles, tinted fluted glass doors, and automated motion-sensor LED backlighting.', '/assets/projects/proj_wardrobe_hd.jpg', '["/assets/projects/proj_wardrobe_hd.jpg", "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80"]'::jsonb, '["Champagne Gold Profiles", "Sensor LED Shelf Lights", "Velvet Jewelry Drawers", "Soft Close German Sliders"]'::jsonb, true, 3),
('tv-units-entertainment', 'TV Units & Consoles', 'Living Spaces', 'tv-unit', 'Madhapur, Hyderabad', 'Minimalist media wall incorporating acoustic wood fluted paneling, floating marble console, concealed cable management, and subtle ambient perimeter backlighting.', '/assets/projects/proj_tvunit_hd.jpg', '["/assets/projects/proj_tvunit_hd.jpg", "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80"]'::jsonb, '["Floating Marble Console", "Hidden Cable Ducts", "Warm Backlight Halo", "Acoustic Slat Paneling"]'::jsonb, false, 4),
('custom-furniture-craft', 'Custom Luxury Furniture', 'Factory Manufacturing', 'furniture', 'Hitec City, Hyderabad', 'Bespoke hand-crafted modular dining suites, armchairs, and credenzas manufactured directly in our Hyderabad facility with marine plywood and Italian PU polish.', '/assets/custom-furniture-hd.png', '["/assets/custom-furniture-hd.png", "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80"]'::jsonb, '["Solid Wood Joinery", "High-Density Foam", "Custom Stain Matching", "Factory Direct Quality"]'::jsonb, true, 5)
ON CONFLICT (id) DO NOTHING;

-- Services (14 Core Services)
INSERT INTO services (id, title, category, short_desc, full_desc, icon, image, features, scope, materials, timeline, display_order)
VALUES
('home-interior-design', 'Home Interior Design', 'Residential', 'Complete home interior concepts designed around personal preferences, comfort, functionality, and the character of the space.', 'We curate cohesive residential concepts that turn houses into warm, sophisticated homes. From initial floor plan optimization to bespoke material palettes, our comprehensive home interior service balances architectural elegance with everyday livability.', 'Home', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', '["Comprehensive space planning and spatial flow", "Harmonized color palettes and luxury textures", "Curated furniture layout and custom built-ins", "Integrated mood and ambient lighting schemes"]'::jsonb, '["Full Living & Dining", "Master & Guest Bedrooms", "Kitchen Integration", "Foyer & Balconies"]'::jsonb, '["Natural Veneers", "Italian Marble Accents", "Textured Wall Liners", "Matte PU Finishes"]'::jsonb, '3 - 6 Weeks Planning & Execution', 0),
('modular-kitchen-design', 'Modular Kitchen Design', 'Modular', 'Practical and elegant modular kitchens with carefully planned storage, work zones, finishes, and layouts.', 'Engineered for the discerning culinary enthusiast, our modular kitchens unite ergonomic work triangles with German-grade soft-close hardware and moisture-resistant marine ply carcass construction. Tailored to Indian cooking requirements with easy-clean surfaces.', 'UtensilsCrossed', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', '["Ergonomic golden triangle kitchen workflow", "Heavy-duty tandem boxes and pantry pull-outs", "Quartz and granite heat-resistant countertops", "Integrated chimneys, hobs, and cutlery organizers"]'::jsonb, '["Island Kitchens", "L-Shaped & U-Shaped Layouts", "Parallel Kitchens", "Breakfast Counters"]'::jsonb, '["BWP Grade Marine Ply", "Acrylic / Ceramic Shutters", "Hettich/Blum Fittings", "Seamless Quartz"]'::jsonb, '2 - 4 Weeks Manufacturing & Assembly', 1),
('wardrobes-and-storage', 'Wardrobes & Storage Units', 'Storage', 'Customized wardrobes and storage solutions that maximize usable space while complementing the interior design.', 'Floor-to-ceiling wardrobe architecture crafted with precision aluminum profiles, tinted fluted glass, integrated sensor LED illumination, and customized compartments for watches, jewelry, accessories, and full-length apparel.', 'Layers', 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80', '["Sliding and hinged wardrobe configurations", "Velvet-lined jewelry and accessory organizers", "Automated interior motion-sensor strip lights", "Damp-proof back paneling and concealed hardware"]'::jsonb, '["Walk-in Closets", "Master Wardrobes", "Kids Modular Closets", "Overhead Loft Storage"]'::jsonb, '["Synchronized Melamine", "Smoked Glass Shutters", "Champagne Gold Profiles", "Soft-close Sliders"]'::jsonb, '2 - 3 Weeks Custom Build', 2),
('bedroom-interiors', 'Bedroom Interiors', 'Residential', 'Comfortable, coordinated bedroom interiors with thoughtful lighting, furniture, storage, and material selections.', 'A sanctuary of peace and restorative rest. We orchestrate cushioned acoustic headboards, bespoke bedside tables, concealed cove lighting, and balanced finishes that create an indulgent 5-star hotel atmosphere right in your home.', 'BedDouble', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', '["Acoustically treated upholstered feature headboard", "Integrated bedside floating nightstands with power ports", "Layered ambient, task, and accent lighting design", "Ergonomically placed dressers and mirrors"]'::jsonb, '["Master Suites", "Guest Bedrooms", "Childrens Themed Rooms", "Elder-friendly Rooms"]'::jsonb, '["Warm Fabric Linens", "Natural Oak & Walnut Accents", "Indirect LED Ribbons", "Brushed Brass Trims"]'::jsonb, '3 - 4 Weeks', 3),
('living-room-interiors', 'Living Room Interiors', 'Residential', 'Inviting living spaces created for family gathering, entertainment, and everyday relaxation.', 'The heart of your luxury home. We design conversational seating arrangements, statement focal walls, architectural false ceilings, and nested coffee table configurations that evoke effortless grandeur.', 'Sofa', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', '["Grand architectural false ceiling with indirect cove", "Custom designed high-resilience sectional sofas", "Marble, onyx, or fluted stone focal backdrop", "Acoustic optimization for home theatre integration"]'::jsonb, '["Formal Living Rooms", "Family Lounges", "Open Concept Great Rooms", "Foyer Connections"]'::jsonb, '["Full-Grain Leathers", "Boucle Fabrics", "Italian Marble", "Architectural Wood Slats"]'::jsonb, '3 - 5 Weeks', 4),
('tv-units-and-entertainment', 'TV Units & Entertainment Centers', 'Living', 'Clean, modern TV units and feature walls with integrated cable management and display areas.', 'Sleek, wall-hung entertainment consoles featuring concealed wire races, back-lit fluted wood panels, floating low-profile drawers, and dedicated soundbar niches designed to frame your screen with cinematic poise.', 'Tv', 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80', '["100% concealed in-wall wire channels and conduits", "Floating media consoles with soft-touch push latches", "Ambient halo backlighting behind fluted paneling", "Acoustically transparent cloth panels for subwoofers"]'::jsonb, '["Living Media Walls", "Master Bedroom Consoles", "Dedicated Home Theatres", "Minimalist TV Shelves"]'::jsonb, '["Fluted MDF / Charcoal Louvers", "Veneer / PU Polish", "Toughened Smoked Glass", "Warm 3000K LED Strips"]'::jsonb, '1 - 2 Weeks', 5),
('dining-room-interiors', 'Dining Room Interiors', 'Residential', 'Thoughtfully designed dining environments with coordinated tables, chairs, display units, and ambient lighting.', 'Elevate every family meal and celebration. We craft bespoke solid surface dining tables, sculpted ergonomic chairs, ambient statement chandeliers, and integrated bar/crockery display consoles.', 'Utensils', 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80', '["Custom marble or live-edge wooden dining tables", "Ergonomically contoured upholstered dining armchairs", "Integrated crockery consoles with glass lighting displays", "Central architectural chandelier & recessed accents"]'::jsonb, '["Formal Dining Rooms", "Breakfast Dining Nooks", "Kitchen Open Dining Areas", "Wine & Bar Corners"]'::jsonb, '["Stain-Resistant Marble", "High-Grade Plywood Carcass", "Toughened Glass", "Champagne Metal Legs"]'::jsonb, '2 - 4 Weeks', 6),
('false-ceiling-and-lighting', 'False Ceiling & Lighting Design', 'Architectural', 'Well-planned false ceilings and architectural lighting schemes that enhance mood, dimension, and spatial comfort.', 'Transform flat overhead spaces into sculptural planes of warmth. We install precision gypsum ceiling layers, indirect cove channels, magnetic track lights, and glare-free architectural spots.', 'Lightbulb', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', '["Multi-level acoustic gypsum & moisture-resistant boards", "Concealed 3000K warm-white architectural LED cove lighting", "Magnetic track spotlights for dynamic illumination", "Clean shadow-line wall perimeters without bulky cornices"]'::jsonb, '["Living & Dining Ceilings", "Bedroom Floating Ceilings", "Foyer Accent Ceilings", "Corridor Runways"]'::jsonb, '["Saint-Gobain Gyproc Plasterboard", "Aluminum Track Profiles", "High-CRI LED Strips", "Concealed Transformers"]'::jsonb, '1 - 3 Weeks', 7),
('custom-furniture-manufacturing', 'Custom Furniture Manufacturing', 'Modular Factory', 'Custom-built furniture pieces manufactured to exact room dimensions, finish requirements, and design details.', 'Direct from our Hyderabad modular factory: bespoke sofas, accent consoles, nested center tables, vanity counters, and study desks engineered with precision CNC routers and heavy-duty edge-banding machinery.', 'Hammer', '/assets/custom-furniture-hd.png', '["Built to millimeter-exact specifications of your home", "Direct factory pricing with no middleman retail markups", "Zero-gap edge banding with waterproof PUR glue technology", "Rigorous load and durability testing before dispatch"]'::jsonb, '["Custom Sectional Sofas", "Study Desks & Bookcases", "Pooja Room Units", "Vanity & Dressing Consoles"]'::jsonb, '["IS-710 Marine Grade Plywood", "Bespoke High-Pressure Laminates", "PU Matte & High-Gloss Lacquers", "German Hardware"]'::jsonb, '2 - 4 Weeks Production', 8),
('commercial-and-office-interiors', 'Commercial & Office Interiors', 'Commercial', 'Professional interior planning for offices, retail spaces, studios, and reception areas.', 'Productive, brand-defining workplaces. From ergonomic workstation layouts and acoustic conference rooms to welcoming executive reception foyers, we create functional commercial spaces delivered strictly on schedule.', 'Building2', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', '["Ergonomic workstation clusters with cable ducts", "Sound-damped meeting rooms and client reception areas", "Commercial-grade fire-retardant ceiling and floor systems", "Brand color and corporate identity spatial integration"]'::jsonb, '["Corporate Offices", "Creative Agency Studios", "Medical & Dental Clinics", "Retail Showrooms"]'::jsonb, '["Commercial Laminates", "Tempered Glass Partitions", "Carpet Tile & Vinyl", "Heavy-Duty Channel Profiles"]'::jsonb, '4 - 8 Weeks', 9),
('space-planning-and-layout', 'Space Planning & 3D Visualization', 'Design & Architecture', 'Detailed layout planning, furniture arrangement, and spatial organization to make every square foot work efficiently.', 'Eliminate all guesswork. Before any construction commences, walk through your future home in photorealistic 3D renders, detailed 2D CAD elevations, electrical layout blueprints, and material mood boards.', 'LayoutGrid', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80', '["Millimeter-accurate 2D floor plans & furniture layouts", "Photorealistic 3D perspective interior renderings", "Comprehensive electrical, plumbing, and HVAC layouts", "Physical sample mood board reviews at our facility"]'::jsonb, '["New Flat Handover Layouts", "Villa Renovation Plans", "Commercial Floor Layouts", "Kitchen Ergonomics"]'::jsonb, '["Photorealistic Ray-Traced 3D", "AutoCAD Architectural Blueprints", "Material Swatch Boards"]'::jsonb, '1 - 2 Weeks', 10),
('renovation-and-remodeling', 'Renovation & Remodeling', 'Turnkey', 'Full and partial renovation services to refresh older homes and reconfigure existing interiors.', 'Breathe new life into aging spaces. We manage demolition, tile replacement, wall re-plastering, plumbing modernization, false ceiling additions, and complete modular refits with turnkey coordination.', 'Wrench', '/assets/transformation_after_hd.jpg', '["Structural feasibility study and safe non-load wall removal", "Complete plumbing, rewiring, and bathroom tile remodeling", "Direct replacement of old wooden carpentry with modular systems", "Turnkey cleanup and move-in ready handover"]'::jsonb, '["Full Apartment Overhauls", "Independent House Upgrades", "Kitchen & Bath Renovations", "Room Additions & Expansion"]'::jsonb, '["High-Durability Civil Materials", "Vitrified Large-Format Tiles", "Anti-Corrosive Plumbing", "Modular Cabinets"]'::jsonb, '4 - 8 Weeks', 11),
('pooja-room-design', 'Pooja Room & Mandir Design', 'Traditional & Sacred', 'Serene, auspicious pooja units and sacred mandir spaces crafted with traditional reverence and contemporary detailing.', 'Sacred sanctity tailored for spiritual tranquility. We design backlit Corian CNC jali screens, marble mandir platforms, brass inlays, and organized storage for sacred items and pooja essentials.', 'Sparkles', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', '["Laser-cut backlit acrylic and Corian om/mandir jalis", "Solid marble and treated teakwood sanctum platforms", "Integrated bell niches, brass inlays, and diya drawers", "Concealed smoke exhaust and gentle 2700K ambient glow"]'::jsonb, '["Dedicated Pooja Rooms", "Compact Foyer Mandir Units", "Wall-Hung Modern Shrines", "Carved Wood Temples"]'::jsonb, '["White Makrana / Composite Marble", "Corian Solid Surface", "Brushed Brass Accents", "Teak & Steam Beach Wood"]'::jsonb, '2 - 3 Weeks', 12),
('balcony-and-utility-spaces', 'Balcony & Utility Spaces', 'Outdoor Living', 'Functional utility zones and charming balcony retreats with weatherproof materials and smart storage.', 'Turn overlooked balconies and utility balconies into tranquil green retreats or efficient laundry zones with vertical gardens, weatherproof decking, and washing machine enclosures.', 'Maximize', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', '["Weatherproof composite wooden decking and artificial turf", "Vertical greenery wall gardens with drip irrigation", "Custom concealed washing machine and cleaning cabinets", "Tempered glass balcony railings and bar-counter ledges"]'::jsonb, '["Balcony Coffee Nooks", "Utility / Wet Kitchens", "Terrace Lounges", "Sit-Out Decks"]'::jsonb, '["WPC (Wood Polymer Composite)", "BWP Marine Ply with Exterior Laminate", "Stainless Steel 304 Hardware"]'::jsonb, '1 - 2 Weeks', 13)
ON CONFLICT (id) DO NOTHING;

-- Testimonials
INSERT INTO testimonials (name, location, quote, rating, project_type, avatar)
VALUES
('Dr. S. K. Reddy', 'Jubilee Hills, Hyderabad', 'Aesthetic Interiors transformed our 4BHK villa beyond our expectations. Having their own modular factory made all the difference in precision and finishing. Flawless execution from day one.', 5, '4BHK Villa Turnkey Interior', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'),
('Priya & Rohan Verma', 'Gachibowli, Hyderabad', 'The modular kitchen and master bedroom wardrobes are world class. German fittings, silent soft-close, and zero defects. Their team kept us informed every single week.', 5, 'Modular Kitchen & Wardrobes', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'),
('K. Venkat Rao', 'Madhapur, Hyderabad', 'They finished our commercial studio on time and within budget. The 3D render matched the final reality 100%. Highly recommended for anyone wanting honest, quality work in Telangana.', 5, 'Commercial Creative Studio', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80');
