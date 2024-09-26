"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { FillAccountBalanceApi } from "@/lib/account-api";

export const MoneyDialog = () => {
  const useStore = createSelectors(store);
  const qc = useQueryClient();
  const account = useStore.use.account();
  const [money, setMoney] = useState<number | null>(null);
  const mutation = useMutation({
    mutationFn: () =>
      FillAccountBalanceApi(account!.accountNo, money == null ? 0 : money),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const handleClick = () => {
    if (account == null) return;
    console.log(account.accountNo, money);
    mutation.mutate();
  };
  return (
    <AlertDialog onOpenChange={() => setMoney(null)}>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="py-6 w-1/3">
          채우기
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>예수금 채우기</AlertDialogTitle>
          <AlertDialogDescription>
            주식 거래에 필요한 예수금을 채울 수 있습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          className="py-6"
          placeholder="금액을 입력해주세요"
          value={money == null ? "" : new Intl.NumberFormat().format(money)}
          onChange={(e) => {
            console.log(e.target.value);
            let val = e.target.value.replaceAll(",", "");
            const fVal = parseInt(val);
            setMoney(fVal);
          }}
        />
        <div className="flex justify-between gap-5">
          <Button
            onClick={() =>
              setMoney((cur) => {
                if (cur == null) return 1000000;
                else return cur + 1000000;
              })
            }
            className="py-6 w-full"
            variant={"secondary"}
          >
            100만
          </Button>
          <Button
            onClick={() =>
              setMoney((cur) => {
                if (cur == null) return 100000;
                else return cur + 100000;
              })
            }
            className="py-6 w-full"
            variant={"secondary"}
          >
            10만
          </Button>
          <Button
            onClick={() =>
              setMoney((cur) => {
                if (cur == null) return 50000;
                else return cur + 50000;
              })
            }
            className="py-6 w-full"
            variant={"secondary"}
          >
            5만
          </Button>
          <Button
            onClick={() =>
              setMoney((cur) => {
                if (cur == null) return 10000;
                else return cur + 10000;
              })
            }
            className="py-6 w-full"
            variant={"secondary"}
          >
            1만
          </Button>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="py-6">닫기</AlertDialogCancel>
          <Button onClick={handleClick} className="w-full py-6">
            충전하기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
