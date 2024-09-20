import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RefObject } from "react";

interface HogaCardProps {
  sellPriceRefs: RefObject<HTMLDivElement>[];
  sellRemainRefs: RefObject<HTMLDivElement>[];
  sellRemainValueRefs: RefObject<HTMLDivElement>[];
  buyPriceRefs: RefObject<HTMLDivElement>[];
  buyRemainRefs: RefObject<HTMLDivElement>[];
  buyRemainValueRefs: RefObject<HTMLDivElement>[];
}

export const HokaCard = ({
  sellPriceRefs,
  sellRemainRefs,
  sellRemainValueRefs,
  buyPriceRefs,
  buyRemainRefs,
  buyRemainValueRefs,
}: HogaCardProps) => {
  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle className="opacity-80">호가</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="font-medium opacity-80 space-y-1 text-blue-500">
          <li className="font-bold flex justify-between pb-1">
            <span>잔량</span>
            <span>매도 가격</span>
          </li>
          {Array.from({ length: 10 }).map((_, idx) => (
            <li key={`sell-${idx}`} className="flex gap-2">
              <div className="w-full bg-blue-100 flex justify-end rounded-sm">
                <div
                  ref={sellRemainRefs[idx]}
                  className="h-6 bg-blue-200 rounded-sm rounded-l-lg relative"
                >
                  <span
                    ref={sellRemainValueRefs[idx]}
                    className="absolute -left-20"
                  />
                </div>
              </div>
              <div
                ref={sellPriceRefs[idx]}
                className="text-right w-20 flex-shrink-0"
              />
            </li>
          ))}
        </ul>
        <Separator className="my-5" />
        <ul className="font-medium opacity-80 space-y-1 text-rose-500">
          <li className="font-bold flex justify-between pb-1">
            <span>매수 가격</span>
            <span>잔량</span>
          </li>
          {Array.from({ length: 10 }).map((_, idx) => (
            <li key={`buy-${idx}`} className="flex gap-2">
              <div ref={buyPriceRefs[idx]} className="flex-shrink-0 w-20" />

              <div className="w-full bg-rose-100 rounded-sm">
                <div
                  ref={buyRemainRefs[idx]}
                  className="w-0 relative h-6 bg-rose-300 rounded-sm rounded-r-lg"
                >
                  <span
                    ref={buyRemainValueRefs[idx]}
                    className="absolute left-20"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
