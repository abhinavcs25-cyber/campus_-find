'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ITEMS, CURRENT_USER } from '../data/items';

const ItemContext = createContext(null);

const STORAGE_KEY = 'campusfind_items_v1';

export function ItemProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  // Initialize items from localStorage or fallback to INITIAL_ITEMS
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
          setIsLoaded(true);
          return;
        }
      }
    } catch (err) {
      console.warn('Could not read from localStorage:', err);
    }
    setItems(INITIAL_ITEMS);
    setIsLoaded(true);
  }, []);

  // Sync back to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (err) {
        console.warn('Could not save to localStorage:', err);
      }
    }
  }, [items, isLoaded]);

  // Toast helper
  const showToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current && current.id === id ? null : current));
    }, duration);
  };

  const hideToast = () => {
    setToast(null);
  };

  // Add Lost Item
  const addLostItem = (newItemData) => {
    const newItem = {
      id: Date.now(),
      name: newItemData.name.trim(),
      category: newItemData.category,
      description: newItemData.description.trim(),
      location: newItemData.location.trim(),
      date: newItemData.date || new Date().toISOString().split('T')[0],
      type: 'Lost',
      status: 'Lost',
      image: newItemData.image || '/images/placeholder.svg',
      reporter: newItemData.reporter || CURRENT_USER.name,
      email: newItemData.email || CURRENT_USER.email,
      phone: newItemData.phone || CURRENT_USER.phone,
      createdAt: new Date().toISOString()
    };

    setItems((prev) => [newItem, ...prev]);
    showToast(`Lost item report for "${newItem.name}" published successfully!`, 'success');
    return newItem;
  };

  // Add Found Item
  const addFoundItem = (newItemData) => {
    const newItem = {
      id: Date.now(),
      name: newItemData.name.trim(),
      category: newItemData.category,
      description: newItemData.description.trim(),
      location: newItemData.location.trim(),
      date: newItemData.date || new Date().toISOString().split('T')[0],
      type: 'Found',
      status: 'Found',
      image: newItemData.image || '/images/placeholder.svg',
      reporter: newItemData.reporter || CURRENT_USER.name,
      email: newItemData.email || CURRENT_USER.email,
      phone: newItemData.phone || CURRENT_USER.phone,
      createdAt: new Date().toISOString()
    };

    setItems((prev) => [newItem, ...prev]);
    showToast(`Found item report for "${newItem.name}" published successfully!`, 'success');
    return newItem;
  };

  // Update Item Status (e.g., Mark as Returned / Resolved)
  const updateItemStatus = (id, newStatus) => {
    let updatedItemName = '';
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === Number(id) || item.id === id) {
          updatedItemName = item.name;
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
    showToast(`Item "${updatedItemName || 'listing'}" marked as ${newStatus}!`, 'info');
  };

  // Delete Item
  const deleteItem = (id) => {
    let deletedName = '';
    setItems((prev) => {
      const match = prev.find((item) => item.id === Number(id) || item.id === id);
      if (match) deletedName = match.name;
      return prev.filter((item) => item.id !== Number(id) && item.id !== id);
    });
    showToast(`Report for "${deletedName || 'item'}" has been removed.`, 'warning');
  };

  // Get single item by ID
  const getItemById = (id) => {
    return items.find((item) => String(item.id) === String(id));
  };

  // Get current user's reports
  const getUserReports = (email = CURRENT_USER.email) => {
    return items.filter(
      (item) =>
        item.email?.toLowerCase() === email.toLowerCase() ||
        item.reporter?.toLowerCase() === CURRENT_USER.name.toLowerCase()
    );
  };

  // Reset to initial dummy data
  const resetToSampleData = () => {
    setItems(INITIAL_ITEMS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    showToast('Reset data to initial campus listings.', 'info');
  };

  // Aggregate statistics
  const stats = {
    totalReports: items.length,
    lostCount: items.filter((i) => i.status === 'Lost').length,
    foundCount: items.filter((i) => i.status === 'Found').length,
    returnedCount: items.filter((i) => i.status === 'Returned').length,
  };

  const value = {
    items,
    isLoaded,
    currentUser: CURRENT_USER,
    stats,
    toast,
    showToast,
    hideToast,
    addLostItem,
    addFoundItem,
    updateItemStatus,
    deleteItem,
    getItemById,
    getUserReports,
    resetToSampleData,
  };

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
}

export function useItems() {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
}

