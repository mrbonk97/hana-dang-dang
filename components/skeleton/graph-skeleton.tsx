import { Spinner } from "../spinner/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface GraphSkeletonProps {
  title: string;
}

export const GraphSkeleton = ({ title }: GraphSkeletonProps) => {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle className="font-bold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="opacity-80">{title}</span>
            <span className="mt-1 emoji text-2xl">🇰🇷</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex2">
        <Spinner />
      </CardContent>
    </Card>
  );
};
