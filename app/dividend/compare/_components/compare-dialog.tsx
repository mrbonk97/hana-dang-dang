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
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export function CompareDialog({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, [isLoading]);

  return (
    <Dialog onOpenChange={() => setIsLoading(true)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[900px]">
        <DialogHeader>
          <DialogTitle>AI 분석</DialogTitle>
          <DialogDescription>
            ChatGPT 4o mini가 두 종목을 분석해드립니다.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <section className="flex items-start gap-10">
            <Image
              src={"/icons/green-robot.png"}
              width={96}
              height={96}
              alt="robot"
              className="pt-5"
            />
            <div className="pt-5">
              <Spinner />
            </div>
          </section>
        ) : (
          <section className="flex items-start gap-10">
            <Image
              src={"/icons/green-robot.png"}
              width={96}
              height={96}
              alt="robot"
              className="pt-5"
            />
            <p className="font-medium opacity-80">
              한국쉘석유(002960)는 중간배당이 2,000원에 수익률이 8.96%로
              안정적인 배당을 제공합니다. 최근 3년 동안 연간 배당금액은
              18,000원에서 25,000원 사이로, 수익률은 6.9%에서 10.29%까지
              상승세를 보이고 있습니다. 반면 현대엘레베이터(017800)는 중간배당이
              1,500원에 수익률이 11.93%로 상대적으로 높은 수익률을 자랑하지만,
              최근 3년 동안 연간 배당금액이 500원에서 4,000원 사이로 변동성이
              큽니다. 따라서 안정적인 배당을 원한다면 한국쉘석유가 더 나은
              선택이 될 것이고, 높은 수익률을 추구한다면 현대엘레베이터를
              고려해볼 수 있습니다.
            </p>
          </section>
        )}

        <DialogFooter className="pt-5 w-full">
          <DialogClose className="w-full">
            <Button className="py-6 w-full">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
