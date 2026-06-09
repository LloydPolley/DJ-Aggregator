const shimmer = "linear-gradient(90deg, #1b1b20 0%, #28282f 50%, #1b1b20 100%)";

const Bar = ({ width, delay }: { width: string; delay: string }) => (
  <div
    className="h-[9px]"
    style={{ width, backgroundImage: shimmer, backgroundSize: "300% auto", animation: `shimmer 2s linear ${delay} infinite` }}
  />
);

export default function SkeletonCard({ index }: { index: number }) {
  return (
    <div style={{ animation: `fadeIn 0.3s ease ${index * 0.06}s both` }}>
      <div
        className="rounded-xl"
        style={{ paddingTop: "118%", backgroundImage: shimmer, backgroundSize: "300% auto", animation: "shimmer 2s linear infinite" }}
      />
      <div className="flex flex-col gap-2 pt-[14px]">
        <Bar width="55%" delay="0.1s" />
        <Bar width="70%" delay="0.2s" />
      </div>
    </div>
  );
}
