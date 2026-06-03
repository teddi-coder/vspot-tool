export default function RedditPreview() {
  const comments = [
    { user: 'u/veganbeautyau', text: 'YES!! They stock everything. Axiology, Ere Perez, Inika — been shopping there for years 😍', votes: 847 },
    { user: 'u/skincareobsessed_mel', text: 'Not late at all but also… how. I discovered them last month and already spent way too much lol', votes: 312 },
    { user: 'u/natural.beauty.nerd', text: 'The V Spot is so good. Great range and everything is properly verified vegan, not just marketing', votes: 203 },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        width: 260,
        background: '#0F1A1C',
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

      {/* Reddit header */}
      <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-[#FF4500] flex items-center justify-center">
          <svg width="11" height="9" viewBox="0 0 11 9" fill="white">
            <circle cx="5.5" cy="3.5" r="3" />
            <ellipse cx="5.5" cy="7.5" rx="3.5" ry="1.5" />
          </svg>
        </div>
        <span className="text-[10px] text-white/60 font-medium">r/AusBeauty</span>
      </div>

      {/* Post */}
      <div className="px-3 pt-3 pb-2 border-b border-white/10">
        <div className="text-[10px] text-white/40 mb-1">u/skintellectual_syd · 3h</div>
        <div className="text-[12px] text-white font-semibold leading-tight mb-2">
          does everyone else already know about The V Spot or am I late??
        </div>
        <div className="text-[10px] text-white/70 leading-snug">
          Just discovered they stock basically every good vegan beauty brand in Australia??
          Been looking for a one-stop shop for clean beauty for so long 😭
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-[9px] text-white/40">
            <span>▲</span>
            <span>1.2k</span>
          </div>
          <span className="text-[9px] text-white/40">💬 847 comments</span>
        </div>
      </div>

      {/* Comments */}
      <div className="divide-y divide-white/5">
        {comments.map((c, i) => (
          <div key={i} className="px-3 py-2">
            <div className="text-[9px] text-[#FF6314] font-medium mb-0.5">{c.user}</div>
            <div className="text-[10px] text-white/80 leading-snug">{c.text}</div>
            <div className="text-[9px] text-white/30 mt-1">▲ {c.votes}</div>
          </div>
        ))}
      </div>

      <div className="h-2" />
    </div>
  );
}
