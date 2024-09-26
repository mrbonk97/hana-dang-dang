"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formatNumber } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useState } from "react";

interface Props {
  code: string;
  minuteData: {
    x: Date;
    y: [number, number, number, number];
  }[];
  dailyData: {
    x: Date;
    y: [number, number, number, number];
  }[];
}

export const ChartCard = ({ code, minuteData, dailyData }: Props) => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [mode, setMode] = useState("daily");

  return (
    <Card className="h-full w-full overflow-hidden">
      <CardHeader className="py-3 flex flex-row items-center justify-between gap-5">
        <CardTitle className="opacity-80">차트</CardTitle>
        <div className="flex">
          <ToggleGroup className="opacity-70" type="single" defaultValue="b">
            <ToggleGroupItem value="a" onClick={() => setMode("minute")}>
              분
            </ToggleGroupItem>
            <ToggleGroupItem value="b" onClick={() => setMode("daily")}>
              일
            </ToggleGroupItem>
            <ToggleGroupItem value="c">주</ToggleGroupItem>
            <ToggleGroupItem value="d">월</ToggleGroupItem>
            <ToggleGroupItem value="e">년</ToggleGroupItem>
          </ToggleGroup>

          <Toggle className="opacity-70">보조지표</Toggle>
        </div>
      </CardHeader>
      <CardContent>
        <Chart
          options={{
            chart: {
              locales: [
                {
                  name: "en", // 한국어를 뜻하는 'ko' 사용
                  options: {
                    months: [
                      "1월",
                      "2월",
                      "3월",
                      "4월",
                      "5월",
                      "6월",
                      "7월",
                      "8월",
                      "9월",
                      "10월",
                      "11월",
                      "12월",
                    ],
                    shortMonths: [
                      "1월",
                      "2월",
                      "3월",
                      "4월",
                      "5월",
                      "6월",
                      "7월",
                      "8월",
                      "9월",
                      "10월",
                      "11월",
                      "12월",
                    ],
                    days: [
                      "일요일",
                      "월요일",
                      "화요일",
                      "수요일",
                      "목요일",
                      "금요일",
                      "토요일",
                    ],
                    shortDays: ["일", "월", "화", "수", "목", "금", "토"],
                    toolbar: {
                      exportToSVG: "SVG 다운로드",
                      exportToPNG: "PNG 다운로드",
                      selection: "선택",
                      selectionZoom: "선택 확대",
                      zoomIn: "확대",
                      zoomOut: "축소",
                      pan: "이동",
                      reset: "확대/축소 초기화",
                    },
                  },
                },
              ],
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              tickAmount: 10,
              type: "datetime",
              labels: {
                hideOverlappingLabels: true,
                rotate: 0,
                style: {
                  colors: "#71717a",
                  fontWeight: 700,
                },
              },
              tooltip: {
                enabled: true,
              },
            },
            yaxis: {
              labels: {
                formatter: (value, timeStamp) => {
                  return formatNumber(value) + "원";
                },
                style: {
                  colors: "#71717a",
                  fontWeight: 700,
                },
              },
              tooltip: {
                enabled: true,
              },
            },
          }}
          series={[
            {
              data: mode == "daily" ? dailyData : minuteData,
            },
          ]}
          type="candlestick"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};
