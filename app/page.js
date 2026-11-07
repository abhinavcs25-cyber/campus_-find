'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useItems } from '../context/ItemContext';
import ItemCard from '../components/ItemCard';
import StatCard from '../components/StatCard';
import Button from '../components/Button';
import { 
  Search, 
  PlusCircle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Clock, 
  FolderCheck,
  FileQuestion,
  MapPin,
  HeartHandshake
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { items, stats } = useItems();
  const [heroSearch, setHeroSearch] = useState('');

  // Handle Hero Search submission
  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/dashboard?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      router.push('/dashboard');
    }
  };

  // 4 Most recently reported items
  const recentItems = [...items]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 4);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 bg-gradient-to-b from-blue-50/60 via-white to-background border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-primary text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Official Campus Community Hub</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Lost Something on <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Campus?</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                CampusFind connects students, professors, and facility staff in one centralized, real-time board. Report lost belongings, post found items, and recover your misplaced essentials with ease.
              </p>

              {/* Functional Search Input */}
              <form onSubmit={handleHeroSearch} className="max-w-xl mx-auto lg:mx-0 pt-2">
                <div className="relative flex items-center shadow-lg rounded-2xl bg-white border border-slate-200 p-1.5 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all">
                  <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search by item name, e.g. 'Casio Calculator', 'Blue Bottle'..."
                    className="w-full px-3 py-3 text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-sm transition-all shrink-0"
                  >
                    Search
                  </button>
                </div>

                {/* Popular Keywords Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500 justify-center lg:justify-start">
                  <span className="font-medium text-slate-400">Popular:</span>
                  {['Student ID', 'Scientific Calculator', 'Wallet', 'Charger', 'Earbuds'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => router.push(`/dashboard?search=${encodeURIComponent(tag)}`)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </form>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Button
                  href="/dashboard"
                  variant="primary"
                  size="lg"
                  icon={Search}
                >
                  Browse Items
                </Button>
                <Button
                  href="/report-lost"
                  variant="danger"
                  size="lg"
                  icon={PlusCircle}
                >
                  Report Lost Item
                </Button>
                <Button
                  href="/report-found"
                  variant="success"
                  size="lg"
                  icon={CheckCircle2}
                >
                  Report Found
                </Button>
              </div>

              {/* Mini social proof */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Campus Emails</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Real-Time Notifications</span>
                </div>
              </div>
            </div>

            {/* Right Visual / Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-xl opacity-20"></div>
                <div className="relative rounded-3xl bg-white border border-slate-200/80 shadow-2xl overflow-hidden p-2">
                  <img
                    src="/images/hero-illustration.svg"
                    alt="Campus Lost and Found Network"
                    className="w-full h-auto object-contain rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus Activity & Recovery Record
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time numbers from our campus directory and student contributions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Reports Logged"
            value={stats.totalReports}
            description="Active lost and found catalog listings"
            icon={FolderCheck}
            color="primary"
            badgeText="All Time"
          />
          <StatCard
            title="Active Lost Items"
            value={stats.lostCount}
            description="Students currently looking for their items"
            icon={FileQuestion}
            color="red"
            badgeText="Awaiting Find"
          />
          <StatCard
            title="Found Awaiting Claim"
            value={stats.foundCount}
            description="Items secured and waiting for rightful owner"
            icon={CheckCircle2}
            color="emerald"
            badgeText="Safely Held"
          />
          <StatCard
            title="Successfully Returned"
            value={stats.returnedCount}
            description="Belongings returned to thankful owners"
            icon={HeartHandshake}
            color="purple"
            badgeText="Recovered"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              How CampusFind Works
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Designed specifically for campus life to minimize friction and connect finders with owners in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl mb-5 shadow-md shadow-primary/20 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Report an Item</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fill in the item description, upload an image or choose a preset, specify the campus building, and submit your contact info.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-purple-200 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-secondary text-white flex items-center justify-center font-bold text-xl mb-5 shadow-md shadow-secondary/20 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Discover Matching Items</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use our real-time filter by category, keyword search, or status tabs to locate what was reported lost or found near your classes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl mb-5 shadow-md shadow-emerald-600/20 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Contact & Recover</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click "Contact Reporter" to send an email or call the student reporter directly, arrange a safe campus meetup, and resolve the listing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RECENTLY REPORTED ITEMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              Live Updates
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Recently Reported Belongings
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Check if your misplaced item has just been posted by a fellow student.
            </p>
          </div>

          <Button
            href="/dashboard"
            variant="outline"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
          >
            View All ({items.length}) Items
          </Button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* CAMPUS CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Found an abandoned item on campus grounds?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Don’t leave it on the bench! A fellow classmate might be searching frantically for their notes, ID card, or keys right now. It takes less than 60 seconds to file a report.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button
                href="/report-found"
                variant="subtle"
                size="md"
                className="bg-white text-primary hover:bg-blue-50 font-bold"
              >
                Post Found Item
              </Button>
              <Button
                href="/report-lost"
                variant="outline"
                size="md"
                className="border-white/40 text-white hover:bg-white/10"
              >
                I Lost An Item
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

