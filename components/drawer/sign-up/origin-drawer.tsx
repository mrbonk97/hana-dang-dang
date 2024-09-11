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

export const OriginDrawer = ({ setState, children }: DrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger className="w-full">{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>거래 자금 출처 선택</DrawerTitle>
        </DrawerHeader>
        <div className="py-10 flex justify-center">
          <div className="w-96 space-y-5 font-bold opacity-70">
            <DrawerClose
              className="block"
              onClick={() => setState("급여 및 연금")}
            >
              급여 및 연금
            </DrawerClose>
            <DrawerClose className="block" onClick={() => setState("퇴직금")}>
              퇴직금
            </DrawerClose>
            <DrawerClose
              className="block"
              onClick={() => setState("사업소득(매축대금 등)")}
            >
              사업소득(매축대금 등)
            </DrawerClose>
            <DrawerClose
              className="block"
              onClick={() => setState("부동산 등 임대소득")}
            >
              부동산 등 임대소득
            </DrawerClose>
            <DrawerClose
              className="block"
              onClick={() => setState("금융소득(이자 및 배당)")}
            >
              금융소득(이자 및 배당)
            </DrawerClose>
            <DrawerClose onClick={() => setState("상속/증여")}>
              상속/증여
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
