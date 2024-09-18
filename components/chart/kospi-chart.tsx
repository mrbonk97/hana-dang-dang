"use client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getIndexDetailApi } from "@/lib/index-api";

interface IndexChartProps {
  title: string;
  code: string;
}

export const KospiChart = ({ title, code }: IndexChartProps) => {
  const query = useQuery({
    queryKey: ["index", code],
    queryFn: () => getIndexDetailApi(code),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <Card className="h-full w-full bg-secondary">
      <CardHeader>
        <CardTitle className="font-bold opacity-70">{title}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
