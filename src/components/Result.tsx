import React from "react";
import { PaceSection } from "./PaceInput";

function paceToSeconds(min: number, sec: number) {
  return min * 60 + sec;
}

function formatTime(totalSec: number) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${h > 0 ? h + "시간 " : ""}${m}분 ${s}초`;
}

interface ResultProps {
  sections: PaceSection[];
  totalDistance: number;
  defaultPace?: { min: number; sec: number };
}

export default function Result({
  sections,
  totalDistance,
  defaultPace = { min: 6, sec: 0 },
}: ResultProps) {
  // 구간별로 합산, 빈 구간은 default pace로 채움
  let totalSec = 0;
  let covered = 0;
  for (const s of sections) {
    const dist = Math.max(
      0,
      Math.min(s.to, totalDistance) - Math.max(s.from, 0)
    );
    if (dist > 0) {
      totalSec += dist * paceToSeconds(s.min, s.sec);
      covered += dist;
    }
  }
  // 남은 구간은 default pace
  if (covered < totalDistance) {
    totalSec +=
      (totalDistance - covered) *
      paceToSeconds(defaultPace.min, defaultPace.sec);
  }

  return (
    <div className="mb-4">
      <div className="font-bold">
        예상 완주 기록: {formatTime(Math.round(totalSec))}
      </div>
    </div>
  );
}
