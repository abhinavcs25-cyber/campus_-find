'use client';

import React from 'react';
import { CATEGORIES } from '../data/items';
import { Tag } from 'lucide-react';

export default function CategoryFilter({ selectedCategory, onChange, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor="category-select" className="sr-only">
        Filter by category
      </label>
      <div className="relative flex items-center">
        <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full pl-10 pr-9 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm hover:border-slate-300 cursor-pointer transition-all"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              Category: {cat}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 pointer-events-none text-slate-400">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

