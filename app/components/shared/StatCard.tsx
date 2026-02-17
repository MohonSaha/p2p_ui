import React, { type ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  subtitle: string;
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  highlight = false,
}) => {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        highlight
          ? "border-emerald-500/30 bg-gray-800/30"
          : "border-gray-700 bg-gray-800/20"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{icon}</span>
        <h3 className="text-gray-400 text-sm uppercase tracking-wider font-medium">
          {title}
        </h3>
      </div>
      <div className="mb-2">
        <div className="text-4xl font-bold text-white">{value}</div>
      </div>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );
};
