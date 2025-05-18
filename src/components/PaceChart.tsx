import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { PaceSection } from "./PaceInput";

function paceToSeconds(min: number, sec: number) {
  return min * 60 + sec;
}

function secondsToPace(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getMinMaxPace(
  sections: PaceSection[],
  defaultPace: { min: number; sec: number },
  totalDistance: number
) {
  // 모든 구간의 페이스(초) 배열
  const paces: number[] = [];
  for (let km = 0; km <= totalDistance; km += 0.5) {
    const section = sections.find((s) => km >= s.from && km < s.to);
    const pace = section
      ? paceToSeconds(section.min, section.sec)
      : paceToSeconds(defaultPace.min, defaultPace.sec);
    paces.push(pace);
  }
  // 마지막 거리(정확히 totalDistance)도 입력 구간에 포함되면 해당 페이스로 추가
  const lastSection = sections.find(
    (s) => totalDistance >= s.from && totalDistance <= s.to
  );
  if (lastSection) {
    paces.push(paceToSeconds(lastSection.min, lastSection.sec));
  }
  const min = Math.min(...paces);
  const max = Math.max(...paces);
  return { min, max };
}

interface PaceChartProps {
  sections: PaceSection[];
  totalDistance: number;
  defaultPace?: { min: number; sec: number };
}

export default function PaceChart({
  sections,
  totalDistance,
  defaultPace = { min: 6, sec: 0 },
}: PaceChartProps) {
  // 0.5km 단위로 데이터 생성
  const points: { x: number; y: number }[] = [];
  for (let km = 0; km < totalDistance; km += 0.5) {
    const section = sections.find((s) => km >= s.from && km < s.to);
    const pace = section
      ? paceToSeconds(section.min, section.sec)
      : paceToSeconds(defaultPace.min, defaultPace.sec);
    points.push({ x: Number(km.toFixed(2)), y: pace });
  }
  // 마지막 거리(정확히 totalDistance)도 입력 구간에 포함되면 해당 페이스로 추가
  const lastSection = sections.find(
    (s) => totalDistance > s.from && totalDistance <= s.to
  );
  const lastPace = lastSection
    ? paceToSeconds(lastSection.min, lastSection.sec)
    : paceToSeconds(defaultPace.min, defaultPace.sec);
  points.push({ x: Number(totalDistance.toFixed(2)), y: lastPace });

  // min/max pace 계산 (초)
  const { min, max } = getMinMaxPace(sections, defaultPace, totalDistance);
  // 30초씩 여유, 10초 단위로 라운딩
  const yMin = Math.floor((min - 30) / 10) * 10;
  const yMax = Math.ceil((max + 30) / 10) * 10;
  // y축 tick 값 생성 (10초 단위)
  const ticks: number[] = [];
  for (let t = yMin; t <= yMax; t += 10) {
    ticks.push(t);
  }

  const data = [
    {
      id: "페이스",
      data: points,
    },
  ];

  return (
    <div style={{ height: 300 }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 30, right: 40, bottom: 50, left: 60 }}
        xScale={{ type: "linear", min: 0, max: totalDistance }}
        yScale={{ type: "linear", min: yMin, max: yMax, reverse: false }}
        axisBottom={{
          legend: "거리 (km)",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          legend: "페이스 (분:초)",
          legendOffset: -50,
          legendPosition: "middle",
          format: (v) => secondsToPace(Number(v)),
          tickValues: ticks,
        }}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        enableArea={false}
        useMesh={true}
        colors={["#2563eb"]}
        curve="stepAfter"
        enableGridX={false}
        enableGridY={true}
        tooltip={({ point }) => (
          <div className="bg-white text-xs p-1 border rounded shadow">
            {point.data.x}km
            <br />
            {secondsToPace(Number(point.data.y))} /km
          </div>
        )}
      />
    </div>
  );
}
