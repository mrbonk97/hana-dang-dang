import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StockOpinion } from "@/lib/stock-api";

interface Props {
  data: StockOpinion[];
}

export const OpinionCard = ({ data }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="opacity-80">종목 투자의견</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <CardDescription className="text-right cursor-pointer">
              더보기
            </CardDescription>
          </DialogTrigger>
          <DialogContent className="w-full max-w-[600px]">
            <DialogHeader>
              <DialogTitle>종목투자의견</DialogTitle>
              <DialogDescription>
                최신 종목 투자의견을 조회하실 수 있습니다.
              </DialogDescription>
            </DialogHeader>
            <ul className="space-y-2 overflow-y-auto h-96 pr-5">
              <li className="border-b pb-2 grid grid-cols-6 items-center font-bold opacity-70">
                <div className="col-span-2">기관</div>
                <div className="col-span-1">의견</div>
                <div className="col-span-1">직전 의견</div>
                <div className="col-span-2 text-right">날짜</div>
              </li>
              {data.map((item, idx) => {
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
                    className="grid grid-cols-6 items-center font-medium opacity-70"
                  >
                    <div className="col-span-2">{item.mbcr_name}</div>
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
                    <div className="col-span-2 text-right">
                      {item.stck_bsop_date}
                    </div>
                  </li>
                );
              })}
            </ul>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 text-sm">
          <li className="grid grid-cols-5 items-center font-bold opacity-70">
            <div className="col-span-2">날짜</div>
            <div className="col-span-1">의견</div>
            <div className="col-span-2">기관</div>
          </li>
          {data.length == 0 && (
            <p className="pt-7 text-center opacity-70 font-medium">의견 없음</p>
          )}
          {data.slice(0, 4).map((item, idx) => {
            item.invt_opnn = item.invt_opnn == "BUY" ? "매수" : item.invt_opnn;
            item.invt_opnn = item.invt_opnn == "SELL" ? "매도" : item.invt_opnn;

            return (
              <li
                key={"ocul02" + idx}
                className="grid grid-cols-5 items-center font-medium opacity-70"
              >
                <div className="col-span-2">
                  {item.stck_bsop_date.substring(0, 4)}.
                  {item.stck_bsop_date.substring(4, 6)}.
                  {item.stck_bsop_date.substring(6, 8)}
                </div>
                <div
                  className={`col-span-1
                      ${item.invt_opnn == "매수" && "text-rose-500"}
                      ${item.invt_opnn == "매도" && "text-blue-500"}
                      `}
                >
                  {item.invt_opnn}
                </div>
                <div className="col-span-2">{item.mbcr_name}</div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};
