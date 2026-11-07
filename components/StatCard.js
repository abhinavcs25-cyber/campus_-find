'use client';

import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  color = 'primary',
  badgeText 
}) {
  const colorMap = {
    primary: {
      bg: 'bg-blue-50 text-blue-600',
      border: 'border-blue-100',
      accent: 'text-primary',
    },
    red: {
      bg: 'bg-red-50 text-red-600',
      border: 'border-red-100',
      accent: 'text-red-600',
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-600',
      border: 'border-emerald-100',
      accent: 'text-emerald-600',
    },
    purple: {
      bg: 'bg-purple-50 text-purple-600',
      border: 'border-purple-100',
      accent: 'text-purple-600',
    },
    amber: {
      bg: 'bg-amber-50 text-amber-600',
      border: 'border-amber-100',
      accent: 'text-amber-600',
    },
  };

  const scheme = colorMap[color] || colorMap.primary;

  return (
    <div className={`p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-slate-500">{title}</span>
        {Icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${scheme.bg} ${scheme.border} border`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </div>
        {badgeText && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {badgeText}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-2 text-xs text-slate-500 line-clamp-1">{description}</p>
      )}
    </div>
  );
}

