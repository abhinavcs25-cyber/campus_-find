'use client';

import React from 'react';
import ItemCard from './ItemCard';

export default function ItemGrid({ items = [], renderItem, columns = 'default' }) {
  const colClass = columns === '4' 
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid ${colClass} gap-6`}>
      {items.map((item) => (
        <div key={item.id} className="h-full">
          {renderItem ? renderItem(item) : <ItemCard item={item} />}
        </div>
      ))}
    </div>
  );
}

