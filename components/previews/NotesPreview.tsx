export default function NotesPreview() {
  const items = [
    { text: 'Swap: regular foundation → Ere Perez oat milk', done: true },
    { text: 'Swap: lip gloss → Axiology tinted balm', done: true },
    { text: 'Swap: mascara → Kjaer Weis', done: false },
    { text: 'Swap: moisturiser → Pai Skincare', done: false },
    { text: 'Swap: perfume → Ellis Brooklyn', done: false },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        width: 260,
        background: '#1C1C1E',
        fontFamily: '-apple-system, "SF Pro Text", "Helvetica Neue", sans-serif',
      }}
    >
      {/* Status bar */}
      <div className="flex justify-between items-center px-4 pt-3 pb-1">
        <span className="text-[11px] text-white font-medium">9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-1.5 bg-white rounded-sm opacity-80" />
          <div className="w-2.5 h-1.5 border border-white/60 rounded-sm" />
        </div>
      </div>

      {/* Notes header */}
      <div className="px-4 pt-2 pb-3 border-b border-white/10">
        <div className="text-[10px] text-[#FFD60A] font-medium mb-1">Notes</div>
        <div className="text-base font-semibold text-white">Clean beauty swap list</div>
        <div className="text-[10px] text-white/40 mt-0.5">Today at 9:41 AM — 5 items</div>
      </div>

      {/* Checklist */}
      <div className="px-4 py-3 space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div
              className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center"
              style={{
                borderColor: item.done ? '#30D158' : '#636366',
                backgroundColor: item.done ? '#30D158' : 'transparent',
              }}
            >
              {item.done && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              className="text-[11px] leading-tight"
              style={{
                color: item.done ? '#636366' : '#EBEBF5',
                textDecoration: item.done ? 'line-through' : 'none',
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* Footer link */}
      <div className="px-4 pb-4 pt-1">
        <div className="text-[10px] text-[#0A84FF] underline">thevspot.com.au/collections/all</div>
      </div>
    </div>
  );
}
