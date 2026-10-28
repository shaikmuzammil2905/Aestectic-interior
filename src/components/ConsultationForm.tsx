import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Send, 
  MessageCircle, 
  Phone, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Calendar
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { siteConfig, getWhatsAppLink } from '../data/siteConfig';
import { ConsultationFormData } from '../types';

interface ConsultationFormProps {
  initialService?: string;
  onSuccess?: () => void;
  className?: string;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  initialService,
  onSuccess,
  className = '',
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    phone: '',
    email: '',
    city: 'Hyderabad',
    serviceRequired: initialService || servicesData[0].title,
    propertyType: 'Apartment',
    approxBudget: '₹10L - ₹20L',
    preferredContact: 'phone',
    requirements: '',
    consent: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ConsultationFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    const cleanedPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!cleanedPhone) {
      newErrors.phone = 'Phone number is required';
    } else if (cleanedPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please confirm consent to be contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simulate real asynchronous submission / webhook endpoint
      await new Promise((resolve) => setTimeout(resolve, 900));

      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#B59A69', '#30251F', '#E6D8C4', '#211C19'],
      });

      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (err) {
      alert('Unable to submit enquiry right now. Please message directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDirectWhatsAppUrl = () => {
    const msg = `Hello Aesthetic Interiors & Modular Factory,
My Name: ${formData.fullName || 'Prospective Client'}
Phone: ${formData.phone || 'Provided via form'}
Location: ${formData.city}
Property: ${formData.propertyType}
Service: ${formData.serviceRequired}
Budget: ${formData.approxBudget}
Details: ${formData.requirements || 'Interested in a design consultation.'}`;
    return getWhatsAppLink(msg);
  };

  if (isSubmitted) {
    return (
      <div className="bg-softwhite rounded-3xl p-8 border border-gold/40 shadow-xl text-center space-y-5 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-espresso">
          Consultation Request Received!
        </h3>
        <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="text-espresso">{formData.fullName}</strong>. Our senior interior architect will review your project requirements and connect with you within 24 business hours.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getDirectWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp Now</span>
          </a>

          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-ivory text-espresso border border-subtle text-xs font-semibold uppercase tracking-wider hover:bg-sand/30 transition-colors cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} noValidate>
      {/* Full Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1">
            Full Name <span className="text-amber-700">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Srikant Rao"
            className={`w-full px-4 py-2.5 rounded-xl bg-ivory/60 border text-xs sm:text-sm text-espresso placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-gold transition-colors ${
              errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-subtle'
            }`}
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1">
            Phone Number <span className="text-amber-700">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. 98765 43210"
            className={`w-full px-4 py-2.5 rounded-xl bg-ivory/60 border text-xs sm:text-sm text-espresso placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-gold transition-colors ${
              errors.phone ? 'border-red-400 bg-red-50/30' : 'border-subtle'
            }`}
          />
          {errors.phone && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      {/* Email & City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1">
            Email Address <span className="text-muted/70 text-[10px] lowercase">(optional)</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. srikant@example.com"
            className="w-full px-4 py-2.5 rounded-xl bg-ivory/60 border border-subtle text-xs sm:text-sm text-espresso placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
          />
          {errors.email && (
            <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1">
            City / Locality <span className="text-amber-700">*</span>
          </label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-ivory/60 border border-subtle text-xs sm:text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
          >
            <option value="Hyderabad">Hyderabad</option>
            <option value="Secunderabad">Secunderabad</option>
            <option value="Mallapur / Sultanpur">Mallapur / Sultanpur</option>
            <option value="Jubilee Hills / Banjara Hills">Jubilee Hills / Banjara Hills</option>
            <option value="Gachibowli / Financial District">Gachibowli / Financial District</option>
            <option value="Warangal">Warangal</option>
            <option value="Karimnagar">Karimnagar</option>
            <option value="Nizamabad">Nizamabad</option>
            <option value="Other Telangana">Other Telangana</option>
          </select>
        </div>
      </div>

      {/* Service Required & Property Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1">
            Service Required <span className="text-amber-700">*</span>
          </label>
          <select
            value={formData.serviceRequired}
            onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-ivory/60 border border-subtle text-xs sm:text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
          >
            {servicesData.map((srv) => (
              <option key={srv.id} value={srv.title}>
                {srv.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1">
            Property Type <span className="text-amber-700">*</span>
          </label>
          <select
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-ivory/60 border border-subtle text-xs sm:text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
          >
            <option value="Apartment">Apartment (2BHK / 3BHK / 4BHK)</option>
            <option value="Villa">Villa / Gated Community</option>
            <option value="Independent House">Independent House</option>
            <option value="Office">Office / Workplace</option>
            <option value="Commercial Space">Commercial / Retail Space</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Approximate Budget & Preferred Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1">
            Approximate Budget <span className="text-muted/70 text-[10px] lowercase">(optional)</span>
          </label>
          <select
            value={formData.approxBudget}
            onChange={(e) => setFormData({ ...formData, approxBudget: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-ivory/60 border border-subtle text-xs sm:text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
          >
            <option value="Under ₹5 Lakhs">Under ₹5 Lakhs</option>
            <option value="₹5L - ₹10L">₹5 Lakhs – ₹10 Lakhs</option>
            <option value="₹10L - ₹20L">₹10 Lakhs – ₹20 Lakhs</option>
            <option value="₹20L - ₹35L">₹20 Lakhs – ₹35 Lakhs</option>
            <option value="₹35L+ Luxury">₹35 Lakhs+ (Ultra Luxury)</option>
            <option value="To be discussed">To be discussed</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1">
            Preferred Contact Method
          </label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, preferredContact: 'phone' })}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                formData.preferredContact === 'phone'
                  ? 'bg-espresso text-softwhite border-espresso'
                  : 'bg-ivory/60 text-espresso border-subtle hover:bg-sand/30'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Phone Call</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, preferredContact: 'whatsapp' })}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                formData.preferredContact === 'whatsapp'
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-ivory/60 text-espresso border-subtle hover:bg-sand/30'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Project Requirements */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-espresso mb-1">
          Project Requirements & Notes <span className="text-muted/70 text-[10px] lowercase">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          placeholder="Tell us about your space, carpet area, expected handover timeline, or specific modular requirements..."
          className="w-full px-4 py-2.5 rounded-xl bg-ivory/60 border border-subtle text-xs sm:text-sm text-espresso placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
        />
      </div>

      {/* Consent Checkbox */}
      <div className="pt-1">
        <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-muted leading-relaxed select-none">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            className="mt-0.5 rounded border-subtle text-gold focus:ring-gold w-4 h-4"
          />
          <span>
            I agree to be contacted by <strong className="text-espresso">Aesthetic Interiors & Modular Factory</strong> via phone or WhatsApp regarding my enquiry.
          </span>
        </label>
        {errors.consent && (
          <p className="text-[11px] text-red-600 mt-1">{errors.consent}</p>
        )}
      </div>

      {/* Submit Action & WhatsApp Shortcut */}
      <div className="pt-3 space-y-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-full bg-espresso hover:bg-espresso-light text-softwhite text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting Your Request...</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 text-gold" />
              <span>Request Free Consultation</span>
              <Send className="w-4 h-4 text-gold ml-1" />
            </>
          )}
        </button>

        <div className="text-center">
          <span className="text-[11px] text-muted">or submit directly:</span>
          <a
            href={getDirectWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center justify-center space-x-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat Directly on WhatsApp (+91 8712376914)</span>
          </a>
        </div>
      </div>
    </form>
  );
};

