const HEIGHTS = [51,43,35,26,29,48,58,48,55,28,35,28,43,32,44,25,43,44,55,24,39,48,58,20,40,48,52,35,43,27,27,30,48,42,55,55,23,44,59,27,29,51,24,36,44,29,37,46,42,18,39,35,46,29,50,18];

export default function Waveform() {
  return (
    <div className="flex items-center gap-[1.5px] flex-1 min-w-0" style={{ height: 30 }}>
      {HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-[1px]"
          style={{ height: `${h}%`, background: "rgba(255,85,0,.30)" }}
        />
      ))}
    </div>
  );
}
