export default function DonutChartSkeleton() {
  const size = 245; // diameter of the chart
  const strokeWidth = 70; // width of the donut chart's stroke
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex items-center mt-14 justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        className="donut-chart-skeleton"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f5f5f5"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Animated circle to simulate loading */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f0f0f0"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference / 2} // Adjust this for the skeleton animation
          fill="none"
          style={{
            animation: "dash-animation 4s ease-in-out infinite",
          }}
        />

        <style>
          {`
          @keyframes dash-animation {
            0% {
              stroke-dashoffset: ${circumference};
            }
            50% {
              stroke-dashoffset: ${circumference / 4};
            }
            100% {
              stroke-dashoffset: ${circumference};
            }
          }
        `}
        </style>
      </svg>
    </div>
  );
}
