"use client";
import dynamic from "next/dynamic";
import { IndexApi, KospiIndexApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { GraphSkeleton } from "../skeleton/graph-skeleton";

interface IndexChartProps {
  title: string;
  code: string;
}

export const KospiChart = ({ title, code }: IndexChartProps) => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [isOk, setIsOk] = useState(false);
  const query = useQuery({
    queryKey: ["index", code],
    queryFn: () => IndexApi(code),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    setIsOk(true);
  }, [query.isSuccess]);

  if (!isOk || query.data == undefined) return <GraphSkeleton title={title} />;

  const jisu = query.data.data.bstp_nmix_prpr;
  const date = query.data.data.stckBsopDate;

  const series = [
    {
      name: "지수",
      data: jisu,
    },
  ];
  const len = query.data.data.bstp_nmix_prpr.length;
  const i1 = query.data.data.bstp_nmix_prpr[len - 2];
  const i2 = query.data.data.bstp_nmix_prpr[len - 1];
  const color = i1 < i2 ? "#ec417a" : "#3182F6";

  return (
    <Card className="h-full w-full bg-secondary">
      <CardHeader>
        <CardTitle className="font-bold opacity-70">{title}</CardTitle>
        <CardDescription>
          {/* <div className="flex flex-col items-end">
            <span
              className={`opacity-80
              ${i1 < i2 ? "text-rose-500" : "text-blue-500"}`}
            >
              {query.data.data.bstp_nmix_prpr[len - 1]}
            </span>
            <span
              className={`-mr-0.5 opacity-80 text-xs
              ${i1 < i2 ? "text-rose-500" : "text-blue-500"}`}
            >
              ({(i2 - i1).toFixed(2)})
            </span>
          </div> */}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Chart
          options={{
            xaxis: {
              categories: date,
              labels: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            dataLabels: {
              enabled: false,
            },
            chart: {
              toolbar: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            colors: [color],
            stroke: {
              curve: "smooth",
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100],
              },
            },
          }}
          series={series}
          type="area"
          width="100%"
          height="70%"
        />
      </CardContent>
    </Card>
  );
};
