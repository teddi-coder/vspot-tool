'use client';

import { useState } from 'react';
import { Creative } from '@/data/creatives';
import NotesPreview from './previews/NotesPreview';
import IMessagePreview from './previews/IMessagePreview';
import RedditPreview from './previews/RedditPreview';
import GoogleSearchPreview from './previews/GoogleSearchPreview';

const previewMap: Record<string, React.ComponentType> = {
  NotesPreview,
  IMessagePreview,
  RedditPreview,
  GoogleSearchPreview,
};

const statusConfig = {
  in_review: { label: 'In review', className: 'bg-amber-100 text-amber-800' },
  approved: { label: 'Approved', className: 'bg-green-100 text-green-800' },
  archived: { label: 'Archived', className: 'bg-gray-100 text-gray-500' },
};

export default function CreativeCard({ creative }: { creative: Creative }) {
  const [status, setStatus] = useState<Creative['status']>(creative.status);
  const [copyOpen, setCopyOpen] = useState(false);

  const Preview = previewMap[creative.previewComponent];
  const statusInfo = statusConfig[status];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 flex flex-col">
      {/* Preview area */}
      <div
        className="flex items-center justify-center py-8"
        style={{ backgroundColor: '#F1F1F1' }}
      >
        {Preview ? <Preview /> : (
          <div className="text-sm text-gray-400">Preview not available</div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title + status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-sm font-semibold text-[#1B1918] leading-tight">{creative.title}</h3>
          <span
            className={`flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ${statusInfo.className}`}
          >
            {statusInfo.label}
          </span>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Chip>{creative.format}</Chip>
          {creative.platform.map((p) => <Chip key={p} accent>{p}</Chip>)}
        </div>

        {/* Copy & strategy accordion */}
        <div className="border-t border-gray-100 pt-3 mt-auto">
          <button
            onClick={() => setCopyOpen((o) => !o)}
            className="flex items-center justify-between w-full text-left text-xs font-medium text-[#1B1918]/60 hover:text-[#1B1918] transition-colors"
          >
            <span>Copy &amp; strategy</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${copyOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {copyOpen && (
            <div className="mt-3 space-y-2 text-[11px] text-[#1B1918]/70">
              <Field label="Primary copy" value={creative.primaryCopy} />
              <Field label="Headline" value={creative.headline} />
              <Field label="CTA" value={creative.cta} />
              <Field label="Landing page" value={creative.landingPage} mono />
              <Field label="Strategy note" value={creative.strategyNote} />
            </div>
          )}
        </div>

        {/* Approve button */}
        {status === 'in_review' && (
          <button
            onClick={() => setStatus('approved')}
            className="mt-4 w-full text-sm font-medium py-2 rounded-lg border-2 border-[#65E499] text-[#1B1918] hover:bg-[#65E499] transition-colors"
          >
            Approve
          </button>
        )}
      </div>
    </div>
  );
}

function Chip({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
        accent
          ? 'bg-[#7DD3FC]/20 text-[#1B1918]'
          : 'bg-[#1B1918]/8 text-[#1B1918]/70'
      }`}
    >
      {children}
    </span>
  );
}

function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] font-semibold text-[#1B1918]/40 uppercase tracking-wide mb-0.5">
        {label}
      </div>
      <div className={mono ? 'font-mono text-[10px] text-[#1B1918]/80' : ''}>{value}</div>
    </div>
  );
}
