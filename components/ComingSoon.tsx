export default function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-[#1B1918] flex items-center justify-center mb-6">
        <span className="text-[#7DD3FC] text-2xl">✦</span>
      </div>
      <h2
        className="text-2xl font-light text-[#1B1918] mb-3"
        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
      >
        {title}
      </h2>
      <p className="text-sm text-[#1B1918]/50 max-w-sm leading-relaxed">{description}</p>
      <div className="mt-6 text-xs font-medium tracking-wide text-[#7DD3FC] bg-[#1B1918] px-4 py-1.5 rounded-full">
        COMING SOON
      </div>
    </div>
  );
}
