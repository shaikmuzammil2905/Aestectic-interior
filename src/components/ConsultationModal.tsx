import React, { useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { ConsultationForm } from './ConsultationForm';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-charcoal/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="relative w-full max-w-2xl bg-softwhite rounded-3xl shadow-2xl border border-subtle/80 overflow-hidden my-8 z-10 animate-fade-up">
        {/* Header */}
        <div className="bg-espresso text-softwhite px-6 py-5 flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                Book a Free Consultation
              </h3>
              <p className="text-[11px] text-ivory/70">
                Aesthetic Interiors & Modular Factory • Telangana
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-ivory/70 hover:text-softwhite hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          <ConsultationForm
            initialService={initialService}
            onSuccess={() => setTimeout(onClose, 2500)}
          />
        </div>
      </div>
    </div>
  );
};
