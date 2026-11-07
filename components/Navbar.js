'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useItems } from '../context/ItemContext';
import { 
  Compass, 
  Search, 
  PlusCircle, 
  CheckCircle, 
  User, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, stats } = useItems();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reportDropdownOpen, setReportDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Items', href: '/dashboard' },
    { name: 'My Reports', href: '/my-reports' },
  ];

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                CampusFind
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-100">
                Student Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/80">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-white text-primary shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Report Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setReportDropdownOpen(!reportDropdownOpen)}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Report Item</span>
                <ChevronDown className="w-4 h-4 opacity-80" />
              </button>

              {reportDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setReportDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-200 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Submit a Campus Report
                    </div>
                    <Link
                      href="/report-lost"
                      onClick={() => setReportDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div>
                        <div className="font-semibold">I Lost Something</div>
                        <div className="text-xs text-slate-500">Ask the campus for help</div>
                      </div>
                    </Link>
                    <Link
                      href="/report-found"
                      onClick={() => setReportDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <div>
                        <div className="font-semibold">I Found Something</div>
                        <div className="text-xs text-slate-500">Help return it to owner</div>
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Profile / Demo User pill */}
            <Link
              href="/my-reports"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-all text-left"
              title="View your reported items"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-secondary to-primary text-white flex items-center justify-center font-bold text-xs shadow-sm">
                AJ
              </div>
              <div className="hidden lg:block leading-tight">
                <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                <div className="text-[11px] text-slate-500">Demo Student</div>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/my-reports"
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
              title="My Reports"
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                    active
                      ? 'bg-blue-50 text-primary'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
              Report Belongings
            </div>
            <Link
              href="/report-lost"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-red-50 text-red-700 font-semibold border border-red-200"
            >
              <span>Report Lost Item</span>
              <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">Lost</span>
            </Link>
            <Link
              href="/report-found"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200"
            >
              <span>Report Found Item</span>
              <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">Found</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between px-2 text-xs text-slate-500">
            <span>Signed in as: <strong className="text-slate-800">{currentUser.name}</strong></span>
            <span>{stats.totalReports} Campus Reports</span>
          </div>
        </div>
      )}
    </header>
  );
}

