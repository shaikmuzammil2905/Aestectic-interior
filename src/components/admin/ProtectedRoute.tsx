import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
        <span className="text-softwhite text-xs font-semibold uppercase tracking-widest font-sans">
          Verifying Admin Credentials...
        </span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
