"use client";
import { Spinner } from "@/components/spinner/spinner";
import { Button } from "@/components/ui/button";
import { getAccountDetailApi } from "@/lib/user-api";
import { formatNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import Image from "next/image";

interface Props {
  accountId: string;
}

export const MainSection = ({ accountId }: Props) => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getAccountDetailApi(accountId),
  });

  if (isPending || !isSuccess) {
    return (
      <section className="py-10 h-[337px] border-b flex2">
        <Spinner />
      </section>
    );
  }

  console.log(data);

  let color = "";
  if (data.profitPercentage < 0) color = "text-blue-500";
  if (data.profitPercentage > 0) color = "text-rose-500";

  return (
    <section className="py-16 border-b flex justify-center">
      <div className="w-[1000px] flex items-center justify-between gap-20">
        <div className="relative">
          <Button
            variant={"outline"}
            className="absolute rounded-full h-10 w-10 p-0 right-4 bottom-4"
          >
            <Pencil size={16} className="text-c1-300" />
          </Button>
          <Image
            src={"/images/person-2.png"}
            width={256}
            height={256}
            alt="person"
            className="border rounded-full overflow-hidden"
          />
        </div>
        <div>
          <h1 className="text-center font-bold opacity-60">총 자산</h1>
          <h2 className="mt-1 text-center text-2xl font-bold opacity-80">
            {formatNumber(data.totalBalance)}원
          </h2>
          <div className="mt-16 flex justify-evenly gap-20">
            <div className="font-medium">
              <h4 className="text-sm text-right opacity-60">예수금</h4>
              <p className="text-lg text-right opacity-80">
                {formatNumber(data.balance)}원
              </p>
            </div>
            <div className="font-medium">
              <h4 className="text-sm text-right opacity-60">출금가능금액</h4>
              <p className="text-lg text-right opacity-80">
                {formatNumber(data.withDrawAmount)}원
              </p>
            </div>
            <div className="font-medium">
              <h4 className="text-sm text-right opacity-60">손익</h4>
              <p className={`text-lg text-right opacity-80 ${color}`}>
                {formatNumber(data.profit)}원
              </p>
            </div>
            <div className="font-medium">
              <h4 className="text-sm text-right opacity-60">수익률</h4>
              <p className={`text-lg text-right opacity-80 ${color}`}>
                {data.profitPercentage.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
