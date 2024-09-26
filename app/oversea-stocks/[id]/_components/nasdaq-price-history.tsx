import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatNumber } from "@/lib/utils";

interface Props {
  data: {
    xymd: string;
    clos: string;
    sign: string;
    diff: string;
    rate: string;
    open: string;
    high: string;
    low: string;
    tvol: string;
    tamt: string;
    pbid: string;
    vbid: string;
    pask: string;
    vask: string;
  }[];
}
export const NasdaqPriceHistory = ({ data }: Props) => {
  console.log(data);
  return (
    <Card className="h-72 flex-shrink-0 w-full">
      <CardHeader>
        <CardTitle className="opacity-80">일자별 시세</CardTitle>
        <Dialog>
          <DialogTrigger>
            <CardTitle className="opacity-80 text-right font-medium text-sm">
              더보기
            </CardTitle>
          </DialogTrigger>
          <DialogContent className="w-[750px] max-w-3xl">
            <DialogHeader>
              <DialogTitle>일자별 시세</DialogTitle>
            </DialogHeader>
            <ul className="space-y-1 overflow-y-auto h-96">
              <li className="grid grid-cols-5 items-center font-bold opacity-70">
                <div className="col-span-1">날짜</div>
                <div className="col-span-1 text-right">시가</div>
                <div className="col-span-1 text-right">종가</div>
                <div className="col-span-1 text-right">최고가</div>
                <div className="col-span-1 text-right">최저가</div>
              </li>
              {data.map((item, idx) => {
                return (
                  <li
                    key={"ul01" + idx}
                    className="grid grid-cols-5 items-center font-medium opacity-70"
                  >
                    <div className="col-span-1">
                      {item.xymd.substring(0, 4)}.{item.xymd.substring(4, 6)}.
                      {item.xymd.substring(6, 8)}
                    </div>
                    <div className="col-span-1 text-right">
                      ${formatNumber(parseFloat(item.open))}
                    </div>
                    <div className="col-span-1 text-right">
                      ${formatNumber(parseFloat(item.clos))}
                    </div>
                    <div className="col-span-1 text-right text-rose-500">
                      ${formatNumber(parseFloat(item.high))}
                    </div>
                    <div className="col-span-1 text-right text-blue-500">
                      ${formatNumber(parseFloat(item.low))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1.5">
          <li className="pb-1 border-b grid grid-cols-4 items-center font-bold opacity-70">
            <div className="col-span-1">날짜</div>
            <div className="col-span-1 text-right">종가</div>
            <div className="col-span-1 text-right">최고가</div>
            <div className="col-span-1 text-right">최저가</div>
          </li>
          {data.slice(1, 6).map((item, idx) => {
            return (
              <li
                key={"ul02" + idx}
                className="grid grid-cols-4 items-center font-medium opacity-70"
              >
                <div className="col-span-1">
                  {item.xymd.substring(0, 4)}.{item.xymd.substring(4, 6)}.
                  {item.xymd.substring(6, 8)}
                </div>
                <div className="col-span-1 text-right">
                  ${formatNumber(parseFloat(item.clos))}
                </div>
                <div className="col-span-1 text-rose-500 text-right">
                  ${formatNumber(parseFloat(item.high))}
                </div>
                <div className="col-span-1 text-blue-500 text-right">
                  ${formatNumber(parseFloat(item.low))}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};
