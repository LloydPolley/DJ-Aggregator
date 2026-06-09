const shimmer = {
  animation: "shimmer 1.4s ease infinite",
  background: "linear-gradient(90deg,#1d1d20 25%,#262629 50%,#1d1d20 75%)",
  backgroundSize: "300% 100%",
};

export default function SkeletonRow() {
  return (
    <div
      className="grid items-center py-5 border-b border-line"
      style={{ gridTemplateColumns: "56px 1fr auto", columnGap: 18 }}
    >
      <div className="w-14 h-14 rounded-lg" style={shimmer} />
      <div className="flex flex-col gap-2">
        <div className="h-5 w-36 rounded" style={shimmer} />
        <div className="h-3 w-48 rounded" style={{ ...shimmer, animationDelay: "0.1s" }} />
      </div>
      <div className="h-3 w-16 rounded" style={{ ...shimmer, animationDelay: "0.2s" }} />
    </div>
  );
}
