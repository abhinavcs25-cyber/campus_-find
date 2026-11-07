'use client';

import React from 'react';

export default function StatusBadge({ status, type, size = 'md' }) {
  const currentStatus = status || type || 'Lost';
  const norm = currentStatus.toLowerCase();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';
  let label = currentStatus;

  if (norm === 'lost') {
    // Red badge
    colorClasses = 'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-500/10';
    dotColor = 'bg-red-500';
    label = 'Lost Item';
  } else if (norm === 'found') {
    // Green badge
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/10';
    dotColor = 'bg-emerald-500';
    label = 'Found Item';
  } else if (norm === 'returned' || norm === 'resolved') {
    // Blue badge
    colorClasses = 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-500/10';
    dotColor = 'bg-blue-500';
    label = 'Returned to Owner';
  }

  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2.5 py-0.5' 
    : size === 'lg'
    ? 'text-sm px-3.5 py-1.5'
    : 'text-xs font-medium px-3 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${colorClasses} ${sizeClasses} shadow-sm transition-colors`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      <span>{label}</span>
    </span>
  );
}

