export default function SunriseMark() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="18" fill="#1B1918" />
      {/* Radiating spikes */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 18 + 9 * Math.cos(rad);
        const y1 = 18 + 9 * Math.sin(rad);
        const x2 = 18 + 15 * Math.cos(rad);
        const y2 = 18 + 15 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#7DD3FC"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="18" cy="18" r="7" fill="#7DD3FC" />
    </svg>
  );
}
