'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Mail, MapPin, Phone, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & About */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                CampusFind
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Campus-exclusive Lost and Found system connecting students, faculty, and campus security to recover misplaced belongings quickly and safely.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              College Milestone Project MVP
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home Landing Page
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Browse All Items
                </Link>
              </li>
              <li>
                <Link href="/report-lost" className="hover:text-white transition-colors">
                  Report a Lost Item
                </Link>
              </li>
              <li>
                <Link href="/report-found" className="hover:text-white transition-colors">
                  Report a Found Item
                </Link>
              </li>
              <li>
                <Link href="/my-reports" className="hover:text-white transition-colors">
                  My Reports & History
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Item Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Electronics & Chargers</li>
              <li>Student ID & Bank Cards</li>
              <li>Backpacks & Wallets</li>
              <li>Keys & Smart Fobs</li>
              <li>Books & Lab Notebooks</li>
              <li>Eyewear & Accessories</li>
            </ul>
          </div>

          {/* Col 4: Campus Helpdesk */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Campus Support
            </h3>
            <div className="flex items-start gap-3 text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Student Services Building, Room 102, Central Campus</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>Campus Security: (555) 019-9000</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>lostandfound@campus.edu</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; 2026 CampusFind. Built for College Technology Milestone.
          </div>
          <div className="flex items-center gap-2">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for student community safety & recovery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

