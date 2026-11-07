'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search by item name, keyword, or description...',
  onClear,
  className = '',
}) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <div className="absolute left-4 pointer-events-none text-slate-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            if (onClear) onClear();
            else onChange('');
          }}
          className="absolute right-3.5 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

