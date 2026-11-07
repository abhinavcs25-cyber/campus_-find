'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StatusBadge from './StatusBadge';
import { MapPin, Calendar, Tag, ArrowRight } from 'lucide-react';

export default function ItemCard({ item, actionSlot }) {
  if (!item) return null;

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-hover hover:-translate-y-1 transition-all duration-200 overflow-hidden">
      {/* Image Container with Badge */}
      <div className="relative w-full h-48 bg-slate-100 overflow-hidden flex items-center justify-center">
        <img
          src={item.image || '/images/placeholder.svg'}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.svg';
          }}
        />
        {/* Status Badge overlay */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={item.status} type={item.type} size="sm" />
        </div>

        {/* Category tag overlay on top right */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-700 shadow-sm border border-slate-200/50">
            <Tag className="w-3 h-3 text-slate-400" />
            {item.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1 mb-1.5">
            {item.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>

          <div className="space-y-1.5 text-xs text-slate-600 mb-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate font-medium">{item.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-500">Reported: {item.date}</span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div>
          {actionSlot ? (
            <div className="pt-2">{actionSlot}</div>
          ) : (
            <Link
              href={`/items/${item.id}`}
              className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-primary group-hover:text-white text-slate-700 text-xs font-semibold border border-slate-200/80 group-hover:border-primary transition-all duration-150"
            >
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

