import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface TermsDrawerProps {
  children: React.ReactNode;
}
export const Drawer1 = ({ children }: TermsDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>상품내용 및 투자대상</DrawerTitle>
        </DrawerHeader>
        <div className="py-10 w-full flex justify-center">
          <div className="opacity-80">
            <div className="font-bold">위탁계좌란?</div>
            <div className="pl-5">
              거래소에 상장된 주식을 매매할 수 있느 계좌
            </div>
            <div className="mt-5 font-bold">투자대상</div>
            <div className="pl-5">
              거래소에 상장된 코스피,코스닥,코넥스,ETF/ETN,ELW,K-OTC
            </div>
          </div>
        </div>

        <DrawerFooter className="mt-5 w-full flex-row justify-center">
          <DrawerClose>
            <Button className="py-6 w-96">확인</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
