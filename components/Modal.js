'use client';

import React, { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Button from './Button';

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  confirmVariant = 'danger',
  isLoading = false,
  icon: Icon = AlertTriangle,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-slate-100 animate-in zoom-in-95 duration-200">
          <div className="p-6 sm:p-7">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                    <Icon className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                  {description && (
                    <p className="text-xs text-slate-500 mt-0.5">{description}</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {children && <div className="mt-4 text-sm text-slate-600">{children}</div>}

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                size="md"
                onClick={onClose}
                disabled={isLoading}
              >
                {cancelLabel}
              </Button>
              {onConfirm && (
                <Button
                  variant={confirmVariant}
                  size="md"
                  onClick={onConfirm}
                  disabled={isLoading}
                >
                  {confirmLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

