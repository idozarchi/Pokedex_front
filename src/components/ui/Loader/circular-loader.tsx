import React from "react";

export type CircularLoaderProps = {
  size?: number; // px
  color?: string;
  thickness?: number; // px
  className?: string;
};

export const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = 40,
  color = "#eab308", // Tailwind yellow-500
  thickness = 4,
  className = "",
}) => (
  <span
    className={`inline-block animate-spin ${className}`}
    style={{ width: size, height: size }}
    role="status"
    aria-label="Loading"
  >
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={(size - thickness) / 2}
        stroke="#e5e7eb" // Tailwind gray-200
        strokeWidth={thickness}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={(size - thickness) / 2}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={Math.PI * (size - thickness)}
        strokeDashoffset={Math.PI * (size - thickness) * 0.25}
      />
    </svg>
  </span>
);

export default CircularLoader;
