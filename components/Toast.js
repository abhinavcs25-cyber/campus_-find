'use client';

import React from 'react';
import { useItems } from '../context/ItemContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function Toast() {
  const { toast, hideToast } = useItems();

  if (!toast) return null;

  const { message, type } = toast;

  const config = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
    },
    error: {
      bg: 'bg-red-50 border-red-200 text-red-900',
      icon: AlertCircle,
      iconColor: 'text-red-600',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
    },
    info: {
      bg: 'bg-blue-50 border-blue-200 text-blue-900',
      icon: Info,
      iconColor: 'text-blue-600',
    },
  };

  const current = config[type] || config.info;
  const IconComponent = current.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-once">
      <div
        className={`flex items-start gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-md ${current.bg} transition-all duration-300`}
        role="alert"
      >
        <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${current.iconColor}`} />
        <div className="flex-1 text-sm font-medium pr-2">
          {message}
        </div>
        <button
          onClick={hideToast}
          className="text-slate-400 hover:text-slate-600 rounded-lg p-0.5 focus:outline-none"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

