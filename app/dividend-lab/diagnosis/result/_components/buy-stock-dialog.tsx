"use client";
import { Spinner } from "@/components/spinner/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { BuyStockApi, getStockPriceApi } from "@/lib/stock-api";
import { formatNumber } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PartyPopper } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface BuyStockDialogProps {
  title: string;
  quantity: number;
  imgUrl: string;
  code: string;
  accountNo: string;
  accountBalance: number;
  children: React.ReactNode;
}

export const BuyStockDialog = ({
  title,
  quantity,
  imgUrl,
  code,
  accountNo,
  accountBalance,
  children,
}: BuyStockDialogProps) => {
  const { toast } = useToast();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [buyQuantity, setBuyQuantity] = useState<number | "">(quantity);
  const { isPending, isSuccess, data } = useQuery({
    queryKey: ["dividend", "buy-stock", code],
    queryFn: () => getStockPriceApi(code),
  });

  const buyMutation = useMutation({
    mutationFn: ({ buyQ, curPrice }: { buyQ: number; curPrice: number }) =>
      BuyStockApi(accountNo, code, buyQ, curPrice),
    onSuccess: (e) => {
      setIsOrderComplete(true);
      toast({
        title: "매수 체결 알림",
        description: `${formatNumber(e.data.price)}원에 ${formatNumber(
          e.data.quantity
        )}주 체결`,
      });
    },
  });

  const handleBuy = () => {
    if (buyQuantity == "") return;
    if (buyQuantity < 0) return;
    if (isPending || !isSuccess) return;
    if (data == undefined || data.stck_prpr == undefined) return;

    if (accountBalance < parseInt(data.stck_prpr) * buyQuantity) {
      toast({
        variant: "destructive",
        title: "매수 실패",
        description: "예수금이 부족합니다.",
      });
      return;
    }

    buyMutation.mutate({
      buyQ: buyQuantity,
      curPrice: parseInt(data.stck_prpr),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>주문하기</DialogTitle>
          <DialogDescription>
            추천받은 종목을 주문하실 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        {(isPending || !isSuccess) && <Spinner />}
        {isOrderComplete && (
          <div className="py-10 flex2 flex-col gap-10">
            <h1 className="text-xl font-bold opacity-80">
              주문을 완료했습니다.
            </h1>
            <PartyPopper className="text-c1-300" size={96} />
          </div>
        )}
        {isSuccess && !isOrderComplete && (
          <div className="grid gap-4 py-4">
            <div className="flex justify-center">
              <Image
                src={`/kospi-icons/${imgUrl}.png`}
                width={96}
                height={96}
                alt={title}
                className="rounded-xl overflow-hidden"
              />
            </div>

            <div className="pt-2 grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                현재가
              </Label>
              <Input
                id="price"
                value={formatNumber(data.stck_prpr) + "원"}
                className="col-span-3 text-right font-medium opacity-80"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                수량
              </Label>
              <Input
                type="number"
                id="quantity"
                value={buyQuantity}
                onChange={(e) => {
                  if (e.target.value == "") setBuyQuantity("");
                  else setBuyQuantity(Math.max(0, parseInt(e.target.value)));
                }}
                placeholder="수량을 입력해주세요"
                className="col-span-3 text-right font-medium opacity-80"
              />
            </div>
            <Separator />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total" className="text-right">
                총금액
              </Label>
              <Input
                readOnly
                id="total"
                value={
                  buyQuantity == ""
                    ? ""
                    : formatNumber(buyQuantity * parseInt(data.stck_prpr)) +
                      "원"
                }
                className="font-bold opacity-80 col-span-3 text-right"
              />
            </div>
            <p className="text-right font-bold text-sm opacity-70">
              보유 예수금: {formatNumber(accountBalance)}원
            </p>
          </div>
        )}
        <DialogFooter>
          <DialogClose>
            <Button className="py-6">닫기</Button>
          </DialogClose>
          <Button
            className="py-6 w-full"
            variant={"destructive"}
            onClick={handleBuy}
            disabled={
              isPending ||
              !isSuccess ||
              data == undefined ||
              buyQuantity == "" ||
              buyMutation.isPending ||
              isOrderComplete
            }
          >
            {isOrderComplete ? "주문완료" : "주문하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
