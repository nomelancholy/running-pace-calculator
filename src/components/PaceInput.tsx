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
          {/* 넘버링: 모바일에서는 숨김, sm 이상에서만 표시 */}
          <span className="text-sm text-gray-500 hidden sm:inline">
            {idx + 1}.
          </span>
          <div className="flex flex-row w-full sm:w-auto gap-2 items-center">
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
            <span className="text-sm text-gray-500">km</span>
          </div>
          {/* 분/초 입력과 삭제 버튼을 모바일에서 세로로 쌓음 */}
          <div className="flex flex-col w-full sm:w-auto">
            <div className="flex flex-row gap-2 items-center mt-1 sm:mt-0">
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
              {/* sm 이상에서만 한 줄에 삭제 버튼 */}
              <button
                type="button"
                onClick={() => handleRemoveSection(idx)}
                className="hidden sm:block ml-0 sm:ml-2 text-xs bg-red-100 text-red-600 rounded px-2 py-1 hover:bg-red-200 transition"
              >
                삭제
              </button>
            </div>
            {/* 모바일에서만 아래에 block으로 삭제 버튼 */}
            <button
              type="button"
              onClick={() => handleRemoveSection(idx)}
              className="block sm:hidden w-full mt-2 text-xs bg-red-100 text-red-600 rounded px-2 py-1 hover:bg-red-200 transition"
            >
              삭제
            </button>
          </div>
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
