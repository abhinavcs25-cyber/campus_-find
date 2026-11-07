'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '../data/items';
import { useItems } from '../context/ItemContext';
import Button from './Button';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Tag, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function ItemForm({ type = 'Lost' }) {
  const router = useRouter();
  const { addLostItem, addFoundItem, currentUser } = useItems();
  const fileInputRef = useRef(null);

  const isLost = type === 'Lost';
  const defaultCategory = 'Electronics';

  const [formData, setFormData] = useState({
    name: '',
    category: defaultCategory,
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    image: '',
    reporter: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [objectUrlToClean, setObjectUrlToClean] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clean up Object URL on unmount
  useEffect(() => {
    return () => {
      if (objectUrlToClean) {
        URL.revokeObjectURL(objectUrlToClean);
      }
    };
  }, [objectUrlToClean]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Item name must be at least 3 characters.';
    }

    if (!formData.category || formData.category === 'All') {
      newErrors.category = 'Please choose a specific category.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a detailed description.';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description should be at least 10 characters to help identify the item.';
    }

    if (!formData.date) {
      newErrors.date = `Please select the date it was ${isLost ? 'lost' : 'found'}.`;
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Campus location is required (e.g., Library 2nd floor, Science Hall 104).';
    }

    if (!formData.reporter.trim()) {
      newErrors.reporter = 'Your name is required so the student knows who to contact.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Campus contact email is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address (e.g. name@campus.edu).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, image: 'Please select a JPG, PNG, or WEBP image.' }));
      return;
    }

    // Clean up previous preview url if existed
    if (objectUrlToClean) {
      URL.revokeObjectURL(objectUrlToClean);
    }

    const previewUrl = URL.createObjectURL(file);
    setObjectUrlToClean(previewUrl);
    setImagePreview(previewUrl);
    setFormData((prev) => ({ ...prev, image: previewUrl }));
    setErrors((prev) => ({ ...prev, image: undefined }));
  };

  const handleRemoveImage = () => {
    if (objectUrlToClean) {
      URL.revokeObjectURL(objectUrlToClean);
      setObjectUrlToClean(null);
    }
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Quick preset sample images helper for testing convenience
  const applyPresetImage = (url) => {
    if (objectUrlToClean) {
      URL.revokeObjectURL(objectUrlToClean);
      setObjectUrlToClean(null);
    }
    setImagePreview(url);
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) element.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      let createdItem;
      const submissionData = {
        ...formData,
        image: formData.image || '/images/placeholder.svg',
      };

      if (isLost) {
        createdItem = addLostItem(submissionData);
      } else {
        createdItem = addFoundItem(submissionData);
      }

      // Short delay for visual polish then redirect
      setTimeout(() => {
        router.push(`/items/${createdItem.id}`);
      }, 500);
    } catch (err) {
      console.error('Failed to submit item report:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Top Banner */}
      <div className={`p-4 rounded-2xl border ${isLost ? 'bg-red-50/70 border-red-200' : 'bg-emerald-50/70 border-emerald-200'} flex items-start gap-3`}>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isLost ? 'bg-red-500 text-white' : 'bg-emerald-600 text-white'}`}>
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-xs sm:text-sm">
          <p className="font-bold text-slate-900">
            {isLost ? 'Reporting a Lost Item' : 'Reporting a Found Item'}
          </p>
          <p className="text-slate-600 mt-0.5">
            {isLost
              ? 'Provide detailed descriptions and location clues. Once posted, campus peers can cross-reference found belongings.'
              : 'Thank you for being a good Samaritan! Help return this item to its rightful student owner.'}
          </p>
        </div>
      </div>

      {/* Section 1: Item Information */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">1. Item Details</h2>
          <p className="text-xs text-slate-500 mt-0.5">Describe the item as accurately as possible.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Item Name */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Item Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Wireless Noise-Cancelling Headphones, Student ID, Blue Backpack"
                className={`w-full px-4 py-3 bg-slate-50 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.name ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
                }`}
              />
            </div>
            {errors.name && (
              <p className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-50 rounded-xl border text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                  errors.category ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
                }`}
              >
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && (
              <p className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.category}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              {isLost ? 'Date Lost' : 'Date Found'} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="date"
                type="date"
                value={formData.date}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-50 rounded-xl border text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.date ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
                }`}
              />
            </div>
            {errors.date && (
              <p className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.date}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              {isLost ? 'Estimated Location Lost' : 'Location Where Found'} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Central Library 2nd floor silent zone, Science Block Cafeteria"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.location ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
                }`}
              />
            </div>
            {errors.location && (
              <p className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.location}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Include distinguishing marks, brand, color, stickers, scratches, contents, or unique tags..."
              className={`w-full px-4 py-3 bg-slate-50 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.description ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
              }`}
            />
            {errors.description && (
              <p className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Image Upload */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">2. Item Image (Preview & Upload)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Attach a clear photo or illustration. JPG, PNG, or WEBP supported.
          </p>
        </div>

        {/* File Input hidden */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageFileChange}
          className="hidden"
          id="item-image-upload"
        />

        {imagePreview ? (
          <div className="space-y-4">
            <div className="relative w-full max-w-sm mx-auto h-56 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Selected item preview"
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 text-white hover:bg-slate-900 shadow-md transition-all"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={Upload}
                onClick={() => fileInputRef.current?.click()}
              >
                Replace Image
              </Button>
              <Button
                type="button"
                variant="dangerOutline"
                size="sm"
                icon={X}
                onClick={handleRemoveImage}
              >
                Remove Image
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-primary hover:bg-blue-50/30 rounded-3xl p-8 text-center cursor-pointer transition-all group"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-primary group-hover:scale-110 flex items-center justify-center mb-4 transition-transform shadow-sm">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">
              Click to choose an image from your device
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports PNG, JPG, or WEBP (Max 5MB preview)
            </p>
          </div>
        )}

        {/* Quick Sample Image Presets */}
        <div className="pt-2">
          <p className="text-xs font-semibold text-slate-500 mb-2">
            Or select a campus illustration preset:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Wallet', src: '/images/wallet.svg' },
              { label: 'Bottle', src: '/images/bottle.svg' },
              { label: 'ID Card', src: '/images/id-card.svg' },
              { label: 'Calculator', src: '/images/calculator.svg' },
              { label: 'Earbuds', src: '/images/earbuds.svg' },
              { label: 'Backpack', src: '/images/backpack.svg' },
              { label: 'Keys', src: '/images/keys.svg' },
              { label: 'Umbrella', src: '/images/umbrella.svg' },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPresetImage(preset.src)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-primary hover:text-white text-slate-700 font-medium transition-all"
              >
                + {preset.label}
              </button>
            ))}
          </div>
        </div>

        {errors.image && (
          <p className="text-xs text-red-600 font-medium">{errors.image}</p>
        )}
      </div>

      {/* Section 3: Contact & Reporter Information */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">3. Student Contact Information</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            How other campus students can reach you when there is a match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="reporter" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Your Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="reporter"
                type="text"
                value={formData.reporter}
                onChange={(e) => handleInputChange('reporter', e.target.value)}
                placeholder="e.g. Alex Johnson"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.reporter ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
                }`}
              />
            </div>
            {errors.reporter && (
              <p className="text-xs text-red-600 font-medium mt-1">{errors.reporter}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Campus Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="e.g. alex.j@campus.edu"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.email ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 font-medium mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Phone Number <span className="text-slate-400 text-[10px] lowercase font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="e.g. (555) 019-2834"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push('/dashboard')}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant={isLost ? 'danger' : 'success'}
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting 
            ? 'Publishing Report...' 
            : isLost 
            ? 'Submit Lost Item Report' 
            : 'Submit Found Item Report'}
        </Button>
      </div>
    </form>
  );
}

