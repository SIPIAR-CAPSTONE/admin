import { useEffect, useState } from "react";

export default function BarChartSkeleton() {
  const barCount = 12; // Number of bars
  const chartWidth = 750; // Width of the entire chart
  const [chartHeight, setChartHeight] = useState(230);
  const barWidth = chartWidth / (barCount * 2); // Width of each bar
  const maxBarHeight = chartHeight * 0.8; // Maximum height for a bar
  const barGap = barWidth; // Gap between bars

  useEffect(() => {
    const handleResize = () => {
      const screenHeight = window.innerHeight;
      setChartHeight(screenHeight - 468); // Adjust proportion (e.g., 60% of screen height)
    };

    handleResize(); // Set initial height
    window.addEventListener("resize", handleResize); // Update on window resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup listener
  }, []);

  return (
    <div className="bg-red-20 flex items-center justify-center">
      <svg
        width={chartWidth}
        height={chartHeight}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        className="bar-chart-skeleton"
      >
        {Array.from({ length: barCount }).map((_, index) => {
          const randomHeight = Math.random() * maxBarHeight; // Simulate varying bar heights
          const x = index * (barWidth + barGap);
          const y = chartHeight - randomHeight;

          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={randomHeight}
              fill="#fafafa"
              rx="4" // Rounded corners
            >
              <animate
                attributeName="fill"
                values="#fafafa;#e7e5e4;#fafafa"
                dur="4s"
                repeatCount="indefinite"
              />
            </rect>
          );
        })}
      </svg>
    </div>
  );
}
