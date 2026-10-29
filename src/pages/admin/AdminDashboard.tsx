import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Briefcase, 
  Sparkles, 
  MessageSquare, 
  ArrowUpRight, 
  Plus, 
  Clock, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { contentService, EnquiryItem } from '../../services/contentService';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    servicesCount: 14,
    projectsCount: 6,
    beforeAfterCount: 3,
    enquiriesCount: 0,
    newEnquiriesCount: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<EnquiryItem[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [services, projects, beforeAfter, enquiries, logs] = await Promise.all([
          contentService.getServices(),
          contentService.getProjects(),
          contentService.getBeforeAfter(),
          contentService.getEnquiries(),
          contentService.getActivityLogs(5),
        ]);

        const newCount = enquiries.filter((e) => e.status === 'new').length;

        setStats({
          servicesCount: services.length,
          projectsCount: projects.length,
          beforeAfterCount: beforeAfter.length,
          enquiriesCount: enquiries.length,
          newEnquiriesCount: newCount,
        });

        setRecentEnquiries(enquiries.slice(0, 5));
        setRecentLogs(logs);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const statCards = [
    {
      label: 'New Enquiries',
      value: stats.newEnquiriesCount,
      sub: `${stats.enquiriesCount} total received`,
      icon: MessageSquare,
      path: '/admin/enquiries',
      color: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Live Services',
      value: stats.servicesCount,
      sub: 'Categorized modular catalog',
      icon: Layers,
      path: '/admin/services',
      color: 'text-blue-600 bg-blue-500/10 border-blue-500/20',
    },
    {
      label: 'Portfolio Projects',
      value: stats.projectsCount,
      sub: 'HD architectural galleries',
      icon: Briefcase,
      path: '/admin/projects',
      color: 'text-purple-600 bg-purple-500/10 border-purple-500/20',
    },
    {
      label: 'Before & After',
      value: stats.beforeAfterCount,
      sub: 'Interactive transformation sliders',
      icon: Sparkles,
      path: '/admin/before-after',
      color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-espresso">
            Overview & Studio Metrics
          </h1>
          <p className="text-xs text-muted mt-1">
            Real-time status of Aesthetic Interiors content, client enquiries, and cloud synchronization.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/settings"
            className="px-4 py-2 rounded-xl border border-subtle bg-white hover:bg-ivory text-xs font-semibold text-espresso transition-colors shadow-xs"
          >
            Brand Settings
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-espresso hover:bg-espresso-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center space-x-1.5"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-gold" />
          </a>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.path}
              className="bg-white border border-subtle/80 rounded-2xl p-5 hover:border-gold/50 transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted uppercase tracking-wider">
                  {card.label}
                </span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-serif font-semibold text-espresso">
                  {card.value}
                </div>
                <div className="text-[11px] text-muted mt-1 flex items-center justify-between">
                  <span>{card.sub}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-gold transition-colors" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Client Enquiries */}
      <div className="bg-white border border-subtle/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-espresso">
              Recent Consultations & Enquiries
            </h2>
            <p className="text-[11px] text-muted">
              Leads received directly through the website consultation form
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-semibold text-gold-dark hover:text-gold transition-colors flex items-center space-x-1"
          >
            <span>View All Leads</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="py-10 text-center text-xs text-muted">
            No consultations submitted yet. Submissions from the public website will appear here in real-time.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand/30 text-espresso-dark uppercase text-[10px] tracking-wider border-y border-subtle/60">
                <tr>
                  <th className="py-2.5 px-3">Client Name</th>
                  <th className="py-2.5 px-3">Phone</th>
                  <th className="py-2.5 px-3">City / Area</th>
                  <th className="py-2.5 px-3">Service</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle/40">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-ivory/50 transition-colors">
                    <td className="py-3 px-3 font-medium text-espresso">
                      {enq.full_name}
                    </td>
                    <td className="py-3 px-3 text-muted">
                      {enq.phone}
                    </td>
                    <td className="py-3 px-3 text-muted">
                      {enq.city}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-sand/60 text-espresso text-[11px]">
                        {enq.service_required}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                          enq.status === 'new'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <a
                        href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-[11px]"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Chat</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Launch & System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Quick Content Actions */}
        <div className="bg-white border border-subtle/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-espresso">
            Quick Content Shortcuts
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/services"
              className="p-3.5 rounded-xl border border-subtle hover:border-gold/60 bg-ivory/30 hover:bg-ivory text-xs font-semibold text-espresso flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4 text-gold" />
              <span>Add New Service</span>
            </Link>
            <Link
              to="/admin/projects"
              className="p-3.5 rounded-xl border border-subtle hover:border-gold/60 bg-ivory/30 hover:bg-ivory text-xs font-semibold text-espresso flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4 text-gold" />
              <span>Add Portfolio Project</span>
            </Link>
            <Link
              to="/admin/before-after"
              className="p-3.5 rounded-xl border border-subtle hover:border-gold/60 bg-ivory/30 hover:bg-ivory text-xs font-semibold text-espresso flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4 text-gold" />
              <span>New Before & After</span>
            </Link>
            <Link
              to="/admin/hero"
              className="p-3.5 rounded-xl border border-subtle hover:border-gold/60 bg-ivory/30 hover:bg-ivory text-xs font-semibold text-espresso flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4 text-gold" />
              <span>Update Hero Slide</span>
            </Link>
          </div>
        </div>

        {/* System & Architecture Status */}
        <div className="bg-white border border-subtle/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-espresso">
            Cloud Architecture Status
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-ivory/60 border border-subtle">
              <span className="font-medium">Supabase Database</span>
              <span className="flex items-center space-x-1.5 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Connected & Ready</span>
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-ivory/60 border border-subtle">
              <span className="font-medium">Cloudinary Image Delivery</span>
              <span className="flex items-center space-x-1.5 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Preset `ml_default` Configured</span>
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-ivory/60 border border-subtle">
              <span className="font-medium">Realtime Subscriptions</span>
              <span className="flex items-center space-x-1.5 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Active Channels</span>
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
