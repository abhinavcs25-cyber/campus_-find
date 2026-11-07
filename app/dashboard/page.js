'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useItems } from '../../context/ItemContext';
import { CATEGORIES } from '../../data/items';
import ItemGrid from '../../components/ItemGrid';
import SearchBar from '../../components/SearchBar';
import CategoryFilter from '../../components/CategoryFilter';
import EmptyState from '../../components/EmptyState';
import Button from '../../components/Button';
import { 
  Filter, 
  RotateCcw, 
  ArrowUpDown, 
  Compass, 
  Layers,
  PlusCircle,
  CheckCircle2,
  ListFilter
} from 'lucide-react';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const { items, isLoaded } = useItems();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Lost' | 'Found' | 'Returned'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'name'

  // Sync if URL search param changes
  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  // Combined Filter & Search & Sort logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Tab filter
      if (activeTab === 'Lost' && item.type !== 'Lost' && item.status !== 'Lost') return false;
      if (activeTab === 'Found' && item.type !== 'Found' && item.status !== 'Found') return false;
      if (activeTab === 'Returned' && item.status !== 'Returned') return false;

      // 2. Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;

      // 3. Search query (matches name, description, location, or reporter)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesLoc = item.location.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesLoc && !matchesCat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date || 0) - new Date(a.date || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.date || 0) - new Date(b.date || 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [items, activeTab, selectedCategory, searchQuery, sortBy]);

  // Tab counts
  const counts = useMemo(() => {
    return {
      all: items.length,
      lost: items.filter((i) => i.status === 'Lost' || i.type === 'Lost').length,
      found: items.filter((i) => i.status === 'Found' || i.type === 'Found').length,
      returned: items.filter((i) => i.status === 'Returned').length,
    };
  }, [items]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setActiveTab('All');
    setSortBy('newest');
    router.replace('/dashboard');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || activeTab !== 'All' || sortBy !== 'newest';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Campus Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Find Lost and Found Items
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Search active campus reports, filter by category or status, and contact the student finder or owner.
          </p>
        </div>

        {/* Quick Report Buttons on top of dashboard */}
        <div className="flex items-center gap-2 shrink-0">
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

      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        {/* Row 1: Search Bar & Category Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by item name, description, or campus building..."
              onClear={() => setSearchQuery('')}
            />
          </div>
          <div className="md:col-span-4">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Row 2: Status Tabs + Sort Controls + Reset */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
          {/* Status Tabs */}
          <div className="flex items-center p-1 bg-slate-100/80 rounded-2xl border border-slate-200 overflow-x-auto">
            {[
              { id: 'All', label: 'All Items', count: counts.all },
              { id: 'Lost', label: 'Lost', count: counts.lost },
              { id: 'Found', label: 'Found', count: counts.found },
              { id: 'Returned', label: 'Returned', count: counts.returned },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-white text-slate-900 shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                      active ? 'bg-slate-100 text-slate-800' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort By & Clear Filters */}
          <div className="flex items-center gap-2 justify-end">
            <div className="relative flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-8 pr-7 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="name">Sort: Name (A-Z)</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors border border-red-200/60"
                title="Reset all search queries and active filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RESULTS HEADER & COUNTER */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          Showing <span className="font-bold text-slate-900">{filteredItems.length}</span> of {items.length} items
          {searchQuery && (
            <span> for &ldquo;<strong className="text-slate-800">{searchQuery}</strong>&rdquo;</span>
          )}
          {selectedCategory !== 'All' && (
            <span> in <strong className="text-slate-800">{selectedCategory}</strong></span>
          )}
        </div>

        {hasActiveFilters && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            <Filter className="w-3 h-3" /> Filters Applied
          </span>
        )}
      </div>

      {/* ITEMS GRID OR EMPTY STATE */}
      {filteredItems.length > 0 ? (
        <ItemGrid items={filteredItems} />
      ) : (
        <EmptyState
          title="No Matching Items Found"
          description={`We couldn't find any lost or found items matching your current filters${
            searchQuery ? ` ("${searchQuery}")` : ''
          }. Try clearing some filters or report a new item.`}
          actionLabel="Clear All Filters"
          onAction={handleResetFilters}
        />
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        Loading campus listings...
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}

