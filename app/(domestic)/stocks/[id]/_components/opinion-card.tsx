import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StockOpinionType } from "@/lib/stock-api2";

interface Props {
  data: StockOpinionType;
}

export const OpinionCard = ({ data }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="opacity-80">종목 투자의견</CardTitle>
        <Dialog>
          <DialogTrigger>
            <CardTitle className="opacity-80 text-right font-medium text-sm">
              더보기
            </CardTitle>
          </DialogTrigger>
          <DialogContent className="w-[600px] max-w-3xl">
            <DialogHeader>
              <DialogTitle>종목투자의견</DialogTitle>
              <DialogDescription>
                최신 종목 투자의견을 조회하실 수 있습니다.
              </DialogDescription>
            </DialogHeader>
            <ul className="space-y-1 overflow-y-auto h-96">
              <li className="pb-2 grid grid-cols-4 items-center font-bold opacity-70">
                <div className="col-span-1">기관</div>
                <div className="col-span-1">의견</div>
                <div className="col-span-1">직전 의견</div>
                <div className="col-span-1">날짜</div>
              </li>
              {data.output.map((item, idx) => {
                item.invt_opnn =
                  item.invt_opnn == "BUY" ? "매수" : item.invt_opnn;
                item.invt_opnn =
                  item.invt_opnn == "SELL" ? "매도" : item.invt_opnn;

                item.rgbf_invt_opnn =
                  item.rgbf_invt_opnn == "BUY" ? "매수" : item.rgbf_invt_opnn;
                item.rgbf_invt_opnn =
                  item.rgbf_invt_opnn == "SELL" ? "매도" : item.rgbf_invt_opnn;

                return (
                  <li
                    key={"ocul01" + idx}
                    className="grid grid-cols-4 items-center font-medium opacity-70"
                  >
                    <div className="col-span-1">{item.mbcr_name}</div>
                    <div
                      className={`col-span-1
                      ${item.invt_opnn == "매수" && "text-rose-500"}
                      ${item.invt_opnn == "매도" && "text-blue-500"}
                      `}
                    >
                      {item.invt_opnn}
                    </div>
                    <div
                      className={`col-span-1
                      ${item.invt_opnn == "매수" && "text-rose-500"}
                      ${item.invt_opnn == "매도" && "text-blue-500"}
                      `}
                    >
                      {item.rgbf_invt_opnn}
                    </div>
                    <div className="col-span-1">{item.stck_bsop_date}</div>
                  </li>
                );
              })}
            </ul>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          <li className="grid grid-cols-3 items-center font-bold opacity-70">
            <div className="col-span-1">기관</div>
            <div className="col-span-1">의견</div>
            <div className="col-span-1">날짜</div>
          </li>
          {data.output.length == 0 && (
            <p className="pt-7 text-center opacity-70 font-medium">의견 없음</p>
          )}
          {data.output.slice(0, 3).map((item, idx) => {
            item.invt_opnn = item.invt_opnn == "BUY" ? "매수" : item.invt_opnn;
            item.invt_opnn = item.invt_opnn == "SELL" ? "매도" : item.invt_opnn;

            return (
              <li
                key={"ocul02" + idx}
                className="grid grid-cols-3 items-center font-medium opacity-70"
              >
                <div className="col-span-1">{item.mbcr_name}</div>
                <div
                  className={`col-span-1
                      ${item.invt_opnn == "매수" && "text-rose-500"}
                      ${item.invt_opnn == "매도" && "text-blue-500"}
                      `}
                >
                  {item.invt_opnn}
                </div>
                <div className="col-span-1">{item.stck_bsop_date}</div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};
