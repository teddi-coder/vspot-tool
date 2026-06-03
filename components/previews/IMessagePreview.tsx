export default function IMessagePreview() {
  const messages = [
    { from: 'them', text: 'omg have you tried that Axiology lipstick yet??' },
    { from: 'me', text: 'not yet!! been meaning to — is it actually worth it?' },
    {
      from: 'them',
      text: "yes!! I got it from The V Spot, they stock like all the good vegan brands 🌿",
    },
    { from: 'me', text: 'wait what?? how have I never heard of them' },
    { from: 'them', text: 'honestly no idea, I shop there all the time now' },
    { from: 'them', text: '👇', link: 'thevspot.com.au/collections/all' },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        width: 260,
        background: '#000000',
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

      {/* iMessage header */}
      <div className="flex flex-col items-center py-3 border-b border-white/10">
        <div className="w-9 h-9 rounded-full bg-[#636366] flex items-center justify-center text-white text-sm font-medium mb-1">
          S
        </div>
        <div className="text-white text-[12px] font-semibold">Sophie</div>
        <div className="text-[9px] text-white/40">iMessage</div>
      </div>

      {/* Messages */}
      <div className="px-3 py-3 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[80%] px-3 py-1.5 rounded-2xl text-[11px] leading-snug"
              style={{
                backgroundColor: msg.from === 'me' ? '#0B84FE' : '#1C1C1E',
                color: 'white',
              }}
            >
              {msg.link ? (
                <span className="text-[#0A84FF] underline">{msg.link}</span>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="h-4" />
    </div>
  );
}
