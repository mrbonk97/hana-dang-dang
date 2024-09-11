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

export const JobDrawer = ({ setState, children }: DrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger className="w-full">{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>직업 선택</DrawerTitle>
        </DrawerHeader>
        <div className="py-10 flex justify-center">
          <div className="w-96 space-y-5 font-bold opacity-70">
            <DrawerClose className="block" onClick={() => setState("직장인")}>
              직장인
            </DrawerClose>
            <DrawerClose
              className="block"
              onClick={() => setState("개인사업자")}
            >
              개인사업자
            </DrawerClose>
            <DrawerClose
              className="block"
              onClick={() => setState("자유직/프리랜서")}
            >
              자유직/프리랜서
            </DrawerClose>
            <DrawerClose className="block" onClick={() => setState("학생")}>
              학생
            </DrawerClose>
            <DrawerClose className="block" onClick={() => setState("주부")}>
              주부
            </DrawerClose>
            <DrawerClose
              onClick={() => setState("전문직(변호사, 의사 회계사 등)")}
            >
              전문직(변호사, 의사 회계사 등)
            </DrawerClose>
            <DrawerClose className="block" onClick={() => setState("무직")}>
              무직
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
