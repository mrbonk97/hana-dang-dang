import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StockRecentPriceType } from "@/lib/stock-api2";
import { formatNumber } from "@/lib/utils";

interface Props {
  data: StockRecentPriceType;
}
export const StockPriceHistoryCard = ({ data }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="opacity-80">일자별 시세</CardTitle>
        <Dialog>
          <DialogTrigger>
            <CardTitle className="opacity-80 text-right font-medium text-sm">
              더보기
            </CardTitle>
          </DialogTrigger>
          <DialogContent className="w-[600px] max-w-3xl">
            <DialogHeader>
              <DialogTitle>일자별 시세</DialogTitle>
            </DialogHeader>
            <ul className="space-y-1 overflow-y-auto h-96">
              <li className="grid grid-cols-4 items-center font-bold opacity-70">
                <div className="col-span-1">날짜</div>
                <div className="col-span-1 text-right">가격</div>
                <div className="col-span-1 text-right">최고가</div>
                <div className="col-span-1 text-right">최저가</div>
              </li>
              {data.output.map((item, idx) => {
                return (
                  <li
                    key={"ul01" + idx}
                    className="grid grid-cols-4 items-center font-medium opacity-70"
                  >
                    <div className="col-span-1">
                      {item.stck_bsop_date.substring(4, 6)}.
                      {item.stck_bsop_date.substring(6, 8)}
                    </div>
                    <div className="col-span-1 text-right">
                      {formatNumber(parseInt(item.stck_oprc))}
                    </div>
                    <div className="col-span-1 text-right text-rose-500">
                      {formatNumber(parseInt(item.stck_hgpr))}
                    </div>
                    <div className="col-span-1 text-right text-blue-500">
                      {formatNumber(parseInt(item.stck_lwpr))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          <li className="grid grid-cols-4 items-center font-bold opacity-70">
            <div className="col-span-1">날짜</div>
            <div className="col-span-1 text-right">가격</div>
            <div className="col-span-1 text-right">최고가</div>
            <div className="col-span-1 text-right">최저가</div>
          </li>
          {data.output.slice(1, 4).map((item, idx) => {
            return (
              <li
                key={"ul02" + idx}
                className="grid grid-cols-4 items-center font-medium opacity-70"
              >
                <div className="col-span-1">
                  {item.stck_bsop_date.substring(0, 4)}.
                  {item.stck_bsop_date.substring(4, 6)}.
                  {item.stck_bsop_date.substring(6, 8)}
                </div>
                <div className="col-span-1 text-right">
                  {formatNumber(parseInt(item.stck_oprc))}
                </div>
                <div className="col-span-1 text-rose-500 text-right">
                  {formatNumber(parseInt(item.stck_hgpr))}
                </div>
                <div className="col-span-1 text-blue-500 text-right">
                  {formatNumber(parseInt(item.stck_lwpr))}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};
