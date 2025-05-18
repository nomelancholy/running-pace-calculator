"use client";
import React, { useState } from "react";
import DistanceSelector from "@/components/DistanceSelector";
import PaceInput, { PaceSection } from "@/components/PaceInput";
import Result from "@/components/Result";
import PaceChart from "@/components/PaceChart";

const DEFAULT_PACE = { min: 6, sec: 0 };

export default function Home() {
  const [distance, setDistance] = useState<number>(10);
  const [sections, setSections] = useState<PaceSection[]>([
    { from: 0, to: 3, min: 6, sec: 30 },
    { from: 3, to: 5, min: 6, sec: 0 },
  ]);

  // 거리 변경 시 구간 초기화
  const handleDistanceChange = (d: number) => {
    setDistance(d);
    setSections([]);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100">
        <h2 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-blue-700 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" /> 1.
          목표 거리 선택
        </h2>
        <DistanceSelector value={distance} onChange={handleDistanceChange} />
      </section>
      <section className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100">
        <h2 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-blue-700 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" /> 2.
          구간별 목표 페이스 입력
        </h2>
        <PaceInput
          sections={sections}
          onChange={setSections}
          totalDistance={distance}
          defaultPace={DEFAULT_PACE}
        />
        <div className="text-xs text-gray-500 mt-1">
          선택하지 않은 구간은 기본값 6:00 페이스로 계산됩니다.
        </div>
      </section>
      <section className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100">
        <h2 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-blue-700 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" /> 3.
          예상 완주 기록
        </h2>
        <Result
          sections={sections}
          totalDistance={distance}
          defaultPace={DEFAULT_PACE}
        />
      </section>
      <section className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100">
        <h2 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-blue-700 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" /> 4.
          페이스 변화 시각화
        </h2>
        <div className="-mx-2 sm:mx-0">
          <PaceChart
            sections={sections}
            totalDistance={distance}
            defaultPace={DEFAULT_PACE}
          />
        </div>
      </section>
    </div>
  );
}
