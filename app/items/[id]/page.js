import React from 'react';
import ItemDetailsClient from '../../../components/ItemDetailsClient';
import { INITIAL_ITEMS } from '../../../data/items';

// Pre-render all initial dummy items at build time
export async function generateStaticParams() {
  return INITIAL_ITEMS.map((item) => ({
    id: String(item.id),
  }));
}

// Enable dynamic params for newly added items from context
export const dynamicParams = true;

export default function ItemDetailsPage({ params }) {
  return <ItemDetailsClient id={params.id} />;
}
