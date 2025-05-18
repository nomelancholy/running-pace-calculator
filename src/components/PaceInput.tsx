import React from "react";

export type PaceSection = {
  from: number;
  to: number;
  min: number;
  sec: number;
};

interface PaceInputProps {
  sections: PaceSection[];
  onChange: (sections: PaceSection[]) => void;
  totalDistance: number;
  defaultPace?: { min: number; sec: number };
}

export default function PaceInput({
  sections,
  onChange,
  totalDistance,
  defaultPace = { min: 6, sec: 0 },
}: PaceInputProps) {
  const handleSectionChange = (
    idx: number,
    field: keyof PaceSection,
    value: number
  ) => {
    const next = sections.map((s, i) =>
      i === idx ? { ...s, [field]: value } : s
    );
    onChange(next);
  };

  const handleAddSection = () => {
    const lastTo = sections.length > 0 ? sections[sections.length - 1].to : 0;
    if (lastTo >= totalDistance) return;
    onChange([
      ...sections,
      {
        from: lastTo,
        to: Math.min(lastTo + 1, totalDistance),
        min: defaultPace.min,
        sec: defaultPace.sec,
      },
    ]);
  };

  const handleRemoveSection = (idx: number) => {
    onChange(sections.filter((_, i) => i !== idx));
  };

  // 입력값이 0일 때 빈 문자열로 표시
  const displayValue = (v: number) => (v === 0 ? "" : String(v));

  return (
    <div className="space-y-3 mb-4">
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="flex flex-col sm:flex-row flex-wrap items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
        >
          <span className="text-sm text-gray-500">{idx + 1}.</span>
          <input
            type="number"
            min={0}
            max={totalDistance}
            value={displayValue(section.from)}
            onChange={(e) =>
              handleSectionChange(idx, "from", Number(e.target.value) || 0)
            }
            className="w-full sm:w-16 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
          ~
          <input
            type="number"
            min={section.from}
            max={totalDistance}
            value={displayValue(section.to)}
            onChange={(e) =>
              handleSectionChange(idx, "to", Number(e.target.value) || 0)
            }
            className="w-full sm:w-16 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
          <span className="text-sm text-gray-500">km :</span>
          <input
            type="number"
            min={0}
            max={59}
            value={displayValue(section.min)}
            onChange={(e) =>
              handleSectionChange(idx, "min", Number(e.target.value) || 0)
            }
            className="w-full sm:w-16 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
          <span className="text-sm text-gray-500">분</span>
          <input
            type="number"
            min={0}
            max={59}
            value={displayValue(section.sec)}
            onChange={(e) =>
              handleSectionChange(idx, "sec", Number(e.target.value) || 0)
            }
            className="w-full sm:w-16 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
          <span className="text-sm text-gray-500">초</span>
          <button
            type="button"
            onClick={() => handleRemoveSection(idx)}
            className="w-full sm:w-auto ml-0 sm:ml-2 text-xs bg-red-100 text-red-600 rounded px-2 py-1 hover:bg-red-200 transition"
          >
            삭제
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddSection}
        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow transition"
      >
        구간 추가
      </button>
    </div>
  );
}
