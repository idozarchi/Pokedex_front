interface CircularLoaderProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const CircularLoader = ({
  size = 40,
  strokeWidth = 4,
  className = "",
}: CircularLoaderProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="animate-spin"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
            strokeLinecap="round"
            className="text-blue-300"
            style={{
              transformOrigin: `${size / 2}px ${size / 2}px`,
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default CircularLoader;
