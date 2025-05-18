"use client";
import React, { useState } from "react";
import DistanceSelector from "@/components/DistanceSelector";
import PaceInput, { PaceSection } from "@/components/PaceInput";
import Result from "@/components/Result";
import PaceChart from "@/components/PaceChart";

const DEFAULT_PACE = { min: 6, sec: 0 };

function timeToSeconds(h: number, m: number, s: number) {
  return h * 3600 + m * 60 + s;
}

export default function Home() {
  const [distance, setDistance] = useState<number>(10);
  const [sections, setSections] = useState<PaceSection[]>([
    { from: 0, to: 3, min: 6, sec: 30 },
    { from: 3, to: 5, min: 6, sec: 0 },
  ]);
  const [goalHour, setGoalHour] = useState(1);
  const [goalMin, setGoalMin] = useState(0);
  const [goalSec, setGoalSec] = useState(0);

  // 거리 변경 시 구간 초기화
  const handleDistanceChange = (d: number) => {
    setDistance(d);
    setSections([]);
  };

  // 완주 기록 계산 (Result와 동일 로직)
  let totalSec = 0;
  let covered = 0;
  for (const s of sections) {
    const dist = Math.max(0, Math.min(s.to, distance) - Math.max(s.from, 0));
    if (dist > 0) {
      totalSec += dist * (s.min * 60 + s.sec);
      covered += dist;
    }
  }
  if (covered < distance) {
    totalSec +=
      (distance - covered) * (DEFAULT_PACE.min * 60 + DEFAULT_PACE.sec);
  }
  const goalTotalSec = timeToSeconds(goalHour, goalMin, goalSec);
  const isAchievable = totalSec <= goalTotalSec && goalTotalSec > 0;

  // 입력값이 0일 때 빈 문자열로 표시
  const displayValue = (v: number) => (v === 0 ? "" : String(v));

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100">
        <h2 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-blue-700 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" /> 1.
          목표 거리 선택
        </h2>
        <DistanceSelector value={distance} onChange={handleDistanceChange} />
        <div className="mt-4">
          <h3 className="font-semibold text-sm mb-2 text-blue-700 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full" />{" "}
            2. 목표 완주 시간 입력
          </h3>
          <div className="flex flex-row flex-wrap gap-1 sm:gap-2 items-center">
            <input
              type="number"
              min={0}
              max={23}
              value={displayValue(goalHour)}
              onChange={(e) => setGoalHour(Number(e.target.value) || 0)}
              className="w-12 sm:w-16 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shrink-0"
              placeholder="시"
            />
            <span className="text-sm text-gray-500">시간</span>
            <input
              type="number"
              min={0}
              max={59}
              value={displayValue(goalMin)}
              onChange={(e) => setGoalMin(Number(e.target.value) || 0)}
              className="w-12 sm:w-16 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shrink-0"
              placeholder="분"
            />
            <span className="text-sm text-gray-500">분</span>
            <input
              type="number"
              min={0}
              max={59}
              value={displayValue(goalSec)}
              onChange={(e) => setGoalSec(Number(e.target.value) || 0)}
              className="w-12 sm:w-16 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shrink-0"
              placeholder="초"
            />
            <span className="text-sm text-gray-500">초</span>
          </div>
        </div>
      </section>
      <section className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100">
        <h2 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-blue-700 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" /> 3.
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
      <section className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100">
        <h2 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-blue-700 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" /> 5.
          예상 완주 기록
        </h2>
        <Result
          sections={sections}
          totalDistance={distance}
          defaultPace={DEFAULT_PACE}
        />
        <div className="mt-4">
          {goalTotalSec > 0 ? (
            isAchievable ? (
              <div className="text-green-600 font-bold text-lg">
                목표 완주 시간 달성이 가능합니다!
              </div>
            ) : (
              <div className="text-red-600 font-bold text-lg">
                목표 완주 시간 달성이 어렵습니다
              </div>
            )
          ) : null}
        </div>
      </section>
    </div>
  );
}
