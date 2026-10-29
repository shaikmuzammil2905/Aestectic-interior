import React, { useEffect, useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Search,
  ExternalLink,
  Clock
} from 'lucide-react';
import { contentService, EnquiryItem } from '../../services/contentService';

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<EnquiryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadEnquiries = async () => {
    try {
      const data = await contentService.getEnquiries();
      setEnquiries(data);
      setFilteredEnquiries(data);
    } catch (err) {
      console.error('Error loading enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();

    // Subscribe to realtime updates
    const unsubscribe = contentService.subscribeToTable('enquiries', () => {
      loadEnquiries();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let result = enquiries;

    if (statusFilter !== 'all') {
      result = result.filter((e) => e.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.full_name?.toLowerCase().includes(q) ||
          e.phone?.toLowerCase().includes(q) ||
          e.service_required?.toLowerCase().includes(q) ||
          e.city?.toLowerCase().includes(q)
      );
    }

    setFilteredEnquiries(result);
  }, [searchQuery, statusFilter, enquiries]);

  const handleStatusChange = async (id?: string, newStatus?: string) => {
    if (!id || !newStatus) return;
    try {
      await contentService.updateEnquiryStatus(id, newStatus as any);
      setMessage({ type: 'success', text: 'Status updated.' });
      loadEnquiries();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update status.' });
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm('Delete this client enquiry record?')) return;
    try {
      await contentService.deleteEnquiry(id);
      setMessage({ type: 'success', text: 'Enquiry deleted.' });
      loadEnquiries();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete.' });
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center space-x-2 text-xs text-muted">
        <RefreshCw className="w-4 h-4 animate-spin text-gold" />
        <span>Loading consultation leads...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-espresso">
            Consultations & Customer Leads ({enquiries.length})
          </h1>
          <p className="text-xs text-muted mt-1">
            Real-time enquiries submitted via website consultation modals and contact forms.
          </p>
        </div>

        <button
          onClick={loadEnquiries}
          className="px-4 py-2 rounded-xl border border-subtle bg-white hover:bg-ivory text-xs font-semibold text-espresso flex items-center space-x-1.5 transition-colors shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 text-gold" />
          <span>Refresh Leads</span>
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center space-x-2.5 ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, phone, or service..."
            className="w-full bg-white border border-subtle focus:border-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-espresso focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
          {['all', 'new', 'contacted', 'scheduled', 'completed', 'archived'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-xl text-xs font-medium uppercase tracking-wider capitalize whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-espresso text-softwhite shadow-xs'
                  : 'bg-white border border-subtle text-muted hover:text-espresso'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries List */}
      {filteredEnquiries.length === 0 ? (
        <div className="bg-white border border-subtle rounded-2xl p-12 text-center text-xs text-muted space-y-2">
          <MessageSquare className="w-8 h-8 text-gold/60 mx-auto" />
          <p className="font-semibold text-espresso">No consultation enquiries found</p>
          <p>When visitors submit consultation requests, they will show up here instantly with phone and WhatsApp actions.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEnquiries.map((enq) => {
            const rawPhone = enq.phone.replace(/[^0-9]/g, '');
            const waPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

            return (
              <div
                key={enq.id}
                className="bg-white border border-subtle/80 rounded-2xl p-6 shadow-xs hover:border-gold/50 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-subtle/60 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gold/15 text-gold-dark font-bold font-serif flex items-center justify-center text-sm border border-gold/30">
                      {enq.full_name?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-espresso">
                        {enq.full_name}
                      </h3>
                      <div className="flex items-center space-x-3 text-[11px] text-muted">
                        <span>📍 {enq.city}</span>
                        {enq.created_at && (
                          <span>🕒 {new Date(enq.created_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border border-subtle uppercase tracking-wider focus:outline-none ${
                        enq.status === 'new'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : enq.status === 'contacted'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : enq.status === 'scheduled'
                          ? 'bg-purple-50 text-purple-800 border-purple-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      <option value="new">New Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="scheduled">Consultation Scheduled</option>
                      <option value="completed">Completed / Won</option>
                      <option value="archived">Archived</option>
                    </select>

                    <button
                      onClick={() => handleDelete(enq.id)}
                      className="p-2 rounded-xl border border-subtle hover:border-red-400 text-espresso hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-ivory/40 p-3 rounded-xl border border-subtle/60">
                    <span className="text-[10px] text-muted uppercase font-bold tracking-wider block mb-1">
                      Service Interested
                    </span>
                    <span className="font-semibold text-espresso">
                      {enq.service_required}
                    </span>
                  </div>

                  <div className="bg-ivory/40 p-3 rounded-xl border border-subtle/60">
                    <span className="text-[10px] text-muted uppercase font-bold tracking-wider block mb-1">
                      Property & Budget
                    </span>
                    <span className="font-medium text-espresso">
                      {enq.property_type || 'Residential'} • {enq.approx_budget || 'Standard'}
                    </span>
                  </div>

                  <div className="bg-ivory/40 p-3 rounded-xl border border-subtle/60">
                    <span className="text-[10px] text-muted uppercase font-bold tracking-wider block mb-1">
                      Contact Preference
                    </span>
                    <span className="font-medium text-espresso capitalize">
                      {enq.preferred_contact || 'Phone Call'}
                    </span>
                  </div>
                </div>

                {/* Message / Requirements */}
                {enq.requirements && (
                  <div className="p-3 rounded-xl bg-sand/30 border border-subtle/60 text-xs text-espresso/90 leading-relaxed">
                    <strong className="text-[11px] font-semibold text-espresso block mb-0.5">
                      Client Message:
                    </strong>
                    {enq.requirements}
                  </div>
                )}

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                      `Hello ${enq.full_name}, thank you for reaching out to Aesthetic Interiors & Modular Factory regarding your ${enq.service_required} enquiry. When is a convenient time for a brief discussion?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Client ({enq.phone})</span>
                  </a>

                  <a
                    href={`tel:${enq.phone}`}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-subtle hover:border-gold bg-white text-xs font-semibold text-espresso transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold" />
                    <span>Call Directly</span>
                  </a>

                  {enq.email && (
                    <a
                      href={`mailto:${enq.email}`}
                      className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-subtle hover:border-gold bg-white text-xs text-muted hover:text-espresso transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{enq.email}</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
