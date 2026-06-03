'use client';

import { useState, useMemo } from 'react';
import { creatives, Creative } from '@/data/creatives';
import CreativeCard from './CreativeCard';

type Filter = 'all' | Creative['status'];

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'In review', value: 'in_review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Archived', value: 'archived' },
];

export default function CreativesGallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? creatives
        : creatives.filter((c) => c.status === activeFilter),
    [activeFilter]
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Filter bar */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === f.value
                ? 'bg-[#1B1918] text-[#F1F1F1]'
                : 'bg-white text-[#1B1918]/60 hover:text-[#1B1918] border border-black/10'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#1B1918]/40">
          <div className="text-3xl mb-3">○</div>
          <div className="text-sm font-medium">
            No {activeFilter === 'in_review' ? 'in review' : activeFilter} creatives yet
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((creative) => (
            <CreativeCard key={creative.id} creative={creative} />
          ))}
        </div>
      )}
    </div>
  );
}
