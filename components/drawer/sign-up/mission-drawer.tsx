import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Dispatch, SetStateAction } from "react";

interface DrawerProps {
  setState: Dispatch<SetStateAction<string>>;
  children: React.ReactNode;
}

export const MissionDrawer = ({ setState, children }: DrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger className="w-full">{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>거래 목적 선택</DrawerTitle>
        </DrawerHeader>
        <div className="py-10 flex justify-center">
          <div className="w-96 space-y-5 font-bold opacity-70">
            <DrawerClose
              className="block"
              onClick={() => setState("급여 및 생활비 예치")}
            >
              급여 및 생활비 예치
            </DrawerClose>
            <DrawerClose
              className="block"
              onClick={() => setState("여유자금 운용(저축 및 투자)")}
            >
              여유자금 운용(저축 및 투자)
            </DrawerClose>
            <DrawerClose
              className="block"
              onClick={() => setState("사업상 거래")}
            >
              사업상 거래
            </DrawerClose>
            <DrawerClose
              className="block"
              onClick={() => setState("카드대금결제")}
            >
              카드대금결제
            </DrawerClose>
            <DrawerClose
              className="block"
              onClick={() => setState("공과금납부결제")}
            >
              공과금납부결제
            </DrawerClose>
            <DrawerClose onClick={() => setState("보험료납부결제")}>
              보험료납부결제
            </DrawerClose>
            <DrawerClose
              className="block"
              onClick={() => setState("보험료납부결제")}
            >
              보험료납부결제
            </DrawerClose>
            <DrawerClose className="block" onClick={() => setState("기타")}>
              기타
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
