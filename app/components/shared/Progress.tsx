import React from "react";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className = "",
}) => {
  const percentage = (value / max) * 100;

  return (
    <div
      className={`w-full bg-gray-700 rounded-full h-3 overflow-hidden ${className}`}
    >
      <div
        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
