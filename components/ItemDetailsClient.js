'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useItems } from '../context/ItemContext';
import StatusBadge from './StatusBadge';
import Button from './Button';
import Modal from './Modal';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Tag, 
  Mail, 
  Phone, 
  Share2, 
  CheckCircle2, 
  Trash2, 
  AlertTriangle,
  Check,
  ShieldCheck
} from 'lucide-react';

export default function ItemDetailsClient({ id }) {
  const router = useRouter();
  const { getItemById, updateItemStatus, deleteItem, currentUser, showToast } = useItems();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const item = getItemById(id);

  // If item ID does not exist
  if (!item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Item Not Found
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          The listing with ID #{id} may have been resolved, deleted, or does not exist on our campus registry.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/dashboard" variant="primary" size="md">
            Browse All Items
          </Button>
          <Button href="/" variant="outline" size="md">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = 
    item.email?.toLowerCase() === currentUser.email?.toLowerCase() || 
    item.reporter?.toLowerCase() === currentUser.name?.toLowerCase();

  const isLost = item.type === 'Lost';

  const mailSubject = encodeURIComponent(`Regarding your ${item.type} Item: ${item.name} on CampusFind`);
  const mailBody = encodeURIComponent(
    `Hi ${item.reporter},\n\nI am contacting you regarding your CampusFind report for "${item.name}" (${item.category}) reported at "${item.location}".\n\nLooking forward to coordinating safely!\n\nBest,\n`
  );
  const mailtoUrl = `mailto:${item.email}?subject=${mailSubject}&body=${mailBody}`;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast('Listing link copied to clipboard!', 'info');
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDeleteConfirm = () => {
    deleteItem(item.id);
    setIsDeleteModalOpen(false);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-sm transition-all"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Listing</span>
            </>
          )}
        </button>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Col 1: Large Image */}
          <div className="lg:col-span-5 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-100 flex items-center justify-center p-8 relative min-h-[300px] lg:min-h-[420px]">
            <img
              src={item.image || '/images/placeholder.svg'}
              alt={item.name}
              className="max-h-[360px] w-auto max-w-full object-contain rounded-2xl drop-shadow-sm transition-transform hover:scale-105 duration-300"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.svg';
              }}
            />
            {/* Corner Badge */}
            <div className="absolute top-4 left-4">
              <StatusBadge status={item.status} type={item.type} size="md" />
            </div>
          </div>

          {/* Col 2: Info & Actions */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    <Tag className="w-3 h-3 text-slate-400" />
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ID #{item.id}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {item.name}
                </h1>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Item Description
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                  {item.description}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Location</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {item.location}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Date {isLost ? 'Lost' : 'Found'}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {item.date}
                  </div>
                </div>
              </div>

              {/* Reporter Information Box */}
              <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Reported By
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" /> Campus Verified
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {item.reporter ? item.reporter.slice(0, 2).toUpperCase() : 'ST'}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      {item.reporter}
                    </div>
                    <div className="text-xs text-slate-500">
                      {item.email}
                    </div>
                  </div>
                </div>

                {item.phone && (
                  <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Phone: {item.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-8 border-t border-slate-100 mt-6 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Contact Reporter button with mailto */}
                <a
                  href={mailtoUrl}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-sm hover:shadow transition-all text-center"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Reporter ({item.reporter})</span>
                </a>

                {item.phone && (
                  <a
                    href={`tel:${item.phone}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </a>
                )}
              </div>

              {/* Owner quick controls if current simulated student */}
              {isOwner && (
                <div className="pt-3 border-t border-dashed border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Your Report Controls:
                  </span>
                  <div className="flex items-center gap-2">
                    {item.status !== 'Returned' && (
                      <button
                        onClick={() => updateItemStatus(item.id, 'Returned')}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark as Returned</span>
                      </button>
                    )}
                    <button
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Delete */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Campus Report"
        description="Are you sure you want to delete this listing? This action cannot be undone."
        confirmLabel="Yes, Delete Report"
        cancelLabel="Keep Listing"
        confirmVariant="danger"
        onConfirm={handleDeleteConfirm}
      >
        <p>
          You are removing the listing for <strong>&ldquo;{item.name}&rdquo;</strong> from the campus registry.
        </p>
      </Modal>
    </div>
  );
}

