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

interface TermsDrawerProps {
  children: React.ReactNode;
}
export const Drawer2 = ({ children }: TermsDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>투자위험 및 불이익</DrawerTitle>
          <DrawerDescription>
            해당 상품은 원금손실이 발생할 수 있으며 그 손실은 투자자에게
            귀속됩니다.
          </DrawerDescription>
        </DrawerHeader>
        <div className="py-10 w-full flex justify-center">
          <div className="opacity-80">
            <div className="font-bold">미수거래 및 반대매매</div>
            <div className="mt-2 pl-5 max-w-xl break-keep">
              미수거래 시 수도결제일까지 입금되지 않으면 미수금이 발생하며,
              미수금이 변제될 때까지 연체료(10%) 부과
            </div>
            <div className="mt-2 pl-5 max-w-xl break-keep">
              미수일 발생 당일까지 미수금을 변제하지 못한 경우, 다음 영업일에
              "미수금 + 연체이자"만큼 자동으로 반대매매처리
            </div>
            <div className="mt-2 pl-5 max-w-xl break-keep">
              신용/대출 담보부족 및 만기 미상환 등의 사유로 반대매매가 발생할 수
              있으며, 반대매매 시 영업점 매매 위탁수수료 적용됨
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
