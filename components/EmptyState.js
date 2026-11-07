'use client';

import React from 'react';
import { SearchX, Inbox } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title = 'No Items Found',
  description = 'We couldn’t find any matching lost or found records. Try adjusting your filters or search keywords.',
  icon: Icon = SearchX,
  actionLabel,
  onAction,
  actionHref,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-10 sm:p-14 text-center bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm max-w-xl mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-inner">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {(actionLabel && (onAction || actionHref)) && (
        <Button
          onClick={onAction}
          href={actionHref}
          variant="primary"
          size="md"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

