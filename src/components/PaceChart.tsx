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
  for (let km = 0; km <= totalDistance; km += 0.5) {
    // 해당 km에 적용되는 페이스 찾기
    const section = sections.find((s) => km >= s.from && km < s.to);
    const pace = section
      ? paceToSeconds(section.min, section.sec)
      : paceToSeconds(defaultPace.min, defaultPace.sec);
    points.push({ x: Number(km.toFixed(2)), y: pace });
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
        yScale={{ type: "linear", min: "auto", max: "auto", reverse: true }}
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
        }}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        enableArea={true}
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
