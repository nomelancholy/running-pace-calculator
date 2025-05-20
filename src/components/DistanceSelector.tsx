import React from "react";

export type DistanceOption = {
  label: string;
  value: number;
};

const DISTANCES: DistanceOption[] = [
  { label: "5km", value: 5 },
  { label: "10km", value: 10 },
  { label: "Half (21km)", value: 21 },
  { label: "Full (42km)", value: 42 },
];

interface DistanceSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function DistanceSelector({
  value,
  onChange,
}: DistanceSelectorProps) {
  return (
    <div className="flex gap-4 mb-4">
      {DISTANCES.map((d) => (
        <label key={d.value} className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            name="distance"
            value={d.value}
            checked={value === d.value}
            onChange={() => onChange(d.value)}
            className="accent-blue-500"
          />
          {d.label}
        </label>
      ))}
    </div>
  );
}
