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

  return (
    <div className="space-y-2 mb-4">
      {sections.map((section, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span>{idx + 1}.</span>
          <input
            type="number"
            min={0}
            max={totalDistance}
            value={section.from}
            onChange={(e) =>
              handleSectionChange(idx, "from", Number(e.target.value))
            }
            className="w-16 border rounded px-1 py-0.5"
          />
          ~
          <input
            type="number"
            min={section.from}
            max={totalDistance}
            value={section.to}
            onChange={(e) =>
              handleSectionChange(idx, "to", Number(e.target.value))
            }
            className="w-16 border rounded px-1 py-0.5"
          />
          km :
          <input
            type="number"
            min={0}
            max={59}
            value={section.min}
            onChange={(e) =>
              handleSectionChange(idx, "min", Number(e.target.value))
            }
            className="w-12 border rounded px-1 py-0.5"
          />
          분
          <input
            type="number"
            min={0}
            max={59}
            value={section.sec}
            onChange={(e) =>
              handleSectionChange(idx, "sec", Number(e.target.value))
            }
            className="w-12 border rounded px-1 py-0.5"
          />
          초
          <button
            type="button"
            onClick={() => handleRemoveSection(idx)}
            className="text-red-500 ml-2"
          >
            삭제
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddSection}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        구간 추가
      </button>
    </div>
  );
}
