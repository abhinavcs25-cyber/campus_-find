'use client';

import React from 'react';
import Link from 'next/link';
import ItemForm from '../../components/ItemForm';
import { ArrowLeft, AlertCircle, ShieldAlert } from 'lucide-react';

export default function ReportLostPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top back navigation */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
          <ShieldAlert className="w-4 h-4" />
          <span>Missing Belongings Report</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Report a Lost Item
        </h1>
        <p className="text-sm text-slate-500 mt-1.5 max-w-2xl leading-relaxed">
          Provide as many details as possible. Your post will be immediately broadcast on the campus dashboard, enabling fellow students to notify you if they spot it.
        </p>
      </div>

      {/* The Form */}
      <ItemForm type="Lost" />
    </div>
  );
}

