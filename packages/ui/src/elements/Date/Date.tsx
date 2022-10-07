import React from "react";

export interface DateCardProps {
  type?: "primary" | "secondary";
  dayOfMonth?: number;
  month?: string;
  year?: number;
}

export const Date: React.FC<DateCardProps> = ({
  type = "primary",
  dayOfMonth,
  month,
  year,
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-md border px-4 pt-2 pb-4 ${
        type === "primary"
          ? "border-purple-400 text-purple-600"
          : "border-orange-400 text-orange-600"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg font-bold">{dayOfMonth}</h1>
        <p className="text-sm">
          {month} {year}
        </p>
      </div>
    </div>
  );
};
