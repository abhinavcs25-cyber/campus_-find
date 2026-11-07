'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useItems } from '../../context/ItemContext';
import StatusBadge from '../../components/StatusBadge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import EmptyState from '../../components/EmptyState';
import { 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  GraduationCap, 
  PlusCircle, 
  CheckCircle2, 
  Trash2, 
  ExternalLink, 
  RotateCcw,
  Tag,
  MapPin,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export default function MyReportsPage() {
  const { 
    currentUser, 
    getUserReports, 
    updateItemStatus, 
    deleteItem, 
    resetToSampleData 
  } = useItems();

  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Lost' | 'Found' | 'Returned'
  const [itemToDelete, setItemToDelete] = useState(null);

  const userReports = getUserReports(currentUser.email);

  const filteredReports = userReports.filter((item) => {
    if (activeTab === 'Lost') return item.type === 'Lost' && item.status !== 'Returned';
    if (activeTab === 'Found') return item.type === 'Found' && item.status !== 'Returned';
    if (activeTab === 'Returned') return item.status === 'Returned';
    return true;
  });

  const counts = {
    all: userReports.length,
    lost: userReports.filter((i) => i.type === 'Lost' && i.status !== 'Returned').length,
    found: userReports.filter((i) => i.type === 'Found' && i.status !== 'Returned').length,
    returned: userReports.filter((i) => i.status === 'Returned').length,
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* User Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              AJ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-100">
                  Simulated Student
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser.department}</span>
                <span className="text-slate-300">•</span>
                <span className="font-mono text-slate-600">{currentUser.studentId}</span>
              </p>
            </div>
          </div>

          {/* Contact Details & Demo Reset */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-xs text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.email}</span>
            </div>
            <div className="text-xs text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.phone}</span>
            </div>
            <button
              onClick={resetToSampleData}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5"
              title="Reset sample campus data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>

        {/* User Mini Stat Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-2xl text-center">
            <div className="text-2xl font-black text-slate-900">{counts.all}</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase">My Total Reports</div>
          </div>
          <div className="p-3 bg-red-50/60 rounded-2xl text-center">
            <div className="text-2xl font-black text-red-600">{counts.lost}</div>
            <div className="text-[11px] font-semibold text-red-700 uppercase">My Active Lost</div>
          </div>
          <div className="p-3 bg-emerald-50/60 rounded-2xl text-center">
            <div className="text-2xl font-black text-emerald-600">{counts.found}</div>
            <div className="text-[11px] font-semibold text-emerald-700 uppercase">My Active Found</div>
          </div>
          <div className="p-3 bg-blue-50/60 rounded-2xl text-center">
            <div className="text-2xl font-black text-blue-600">{counts.returned}</div>
            <div className="text-[11px] font-semibold text-blue-700 uppercase">Resolved / Returned</div>
          </div>
        </div>
      </div>

      {/* Tabs & Report Controls Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center p-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {[
            { id: 'All', label: 'All My Reports', count: counts.all },
            { id: 'Lost', label: 'My Lost Items', count: counts.lost },
            { id: 'Found', label: 'My Found Items', count: counts.found },
            { id: 'Returned', label: 'Resolved / Returned', count: counts.returned },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-primary text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Report Buttons */}
        <div className="flex items-center gap-2">
          <Button
            href="/report-lost"
            variant="danger"
            size="sm"
            icon={PlusCircle}
          >
            Report Lost
          </Button>
          <Button
            href="/report-found"
            variant="success"
            size="sm"
            icon={CheckCircle2}
          >
            Report Found
          </Button>
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Header Image & Badges */}
                <div className="relative h-44 bg-slate-100 overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image || '/images/placeholder.svg'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder.svg';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <StatusBadge status={item.status} type={item.type} size="sm" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/90 text-slate-700 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  href={`/items/${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover hover:underline"
                >
                  <span>Details</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-2">
                  {item.status !== 'Returned' && (
                    <button
                      type="button"
                      onClick={() => updateItemStatus(item.id, 'Returned')}
                      className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                      title="Mark as returned to owner"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Returned</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setItemToDelete(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No ${activeTab === 'All' ? '' : activeTab} Reports`}
          description={
            activeTab === 'All'
              ? "You haven't reported any lost or found belongings yet. Post a report to help or recover an item!"
              : `You have no reports under the "${activeTab}" category right now.`
          }
          actionLabel="Report an Item Now"
          actionHref="/report-lost"
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        title="Confirm Report Deletion"
        description="Are you sure you want to permanently delete this report?"
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        confirmVariant="danger"
        onConfirm={handleDeleteConfirm}
      >
        <p>
          You are about to delete <strong>&ldquo;{itemToDelete?.name}&rdquo;</strong>. This item will be removed from both your personal reports list and the public campus dashboard.
        </p>
      </Modal>
    </div>
  );
}

