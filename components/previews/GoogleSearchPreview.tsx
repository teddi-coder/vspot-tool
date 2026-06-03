export default function GoogleSearchPreview() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        width: 260,
        background: '#202124',
        fontFamily: 'arial, sans-serif',
      }}
    >
      {/* Status bar */}
      <div className="flex justify-between items-center px-4 pt-3 pb-1">
        <span className="text-[11px] text-white font-medium" style={{ fontFamily: '-apple-system, sans-serif' }}>9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-1.5 bg-white rounded-sm opacity-80" />
          <div className="w-2.5 h-1.5 border border-white/60 rounded-sm" />
        </div>
      </div>

      {/* Search bar */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 bg-[#303134] rounded-full px-3 py-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#9AA0A6" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="#9AA0A6" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] text-[#E8EAED] flex-1">is my moisturiser actually vegan</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#9AA0A6">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </div>
      </div>

      {/* Results count */}
      <div className="px-3 pb-2">
        <span className="text-[9px] text-[#9AA0A6]">About 4,320,000 results (0.43 seconds)</span>
      </div>

      {/* Featured snippet */}
      <div className="mx-3 mb-3 border border-[#3C4043] rounded-xl p-3">
        <div className="text-[9px] text-[#9AA0A6] mb-1.5">Featured snippet from the web</div>
        <div className="text-[11px] text-[#E8EAED] leading-snug font-medium mb-2">
          How to check if your moisturiser is truly vegan
        </div>
        <div className="text-[10px] text-[#BDC1C6] leading-snug mb-2">
          Many moisturisers labelled "natural" still contain beeswax, lanolin, or collagen.
          To confirm a product is vegan, look for third-party certification and shop from
          verified vegan retailers like <span className="text-[#8AB4F8]">thevspot.com.au</span> —
          every product is independently checked before listing.
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#8AB4F8] rounded-sm flex-shrink-0" />
          <div>
            <div className="text-[9px] text-[#8AB4F8]">thevspot.com.au</div>
            <div className="text-[8px] text-[#9AA0A6]">The V Spot — Vegan Beauty Australia</div>
          </div>
        </div>
      </div>

      {/* Organic result */}
      <div className="px-3 pb-4">
        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="w-3 h-3 bg-[#4CAF50] rounded-sm flex-shrink-0" />
          <span className="text-[9px] text-[#9AA0A6]">thevspot.com.au › vegan-guide</span>
        </div>
        <div className="text-[11px] text-[#8AB4F8] mb-0.5">The definitive guide to verified vegan skincare</div>
        <div className="text-[9px] text-[#BDC1C6] leading-snug">
          Our complete guide to knowing what's really vegan — including ingredients to avoid and brands we trust.
        </div>
      </div>
    </div>
  );
}
