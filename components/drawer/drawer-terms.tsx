"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

interface TermsDrawerProps {
  children: React.ReactNode;
}
export const DrawerTerms = ({ children }: TermsDrawerProps) => {
  const router = useRouter();
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>약관 확인</DrawerTitle>
          <DrawerDescription>
            계좌개설에 필요한 약관 및 동의서를 확인해주세요
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex justify-center">
          <ul className="w-96 space-y-5 font-medium opacity-70">
            <li className="w-full flex items-center justify-between">
              <span>계좌개설 주요 약관</span>
              <Badge className="py-2 cursor-pointer" variant={"outline"}>
                상세보기
              </Badge>
            </li>
            <li className="w-full flex items-center justify-between">
              <span>해외주식 주요 약관 및 설명서</span>
              <Badge className="py-2 cursor-pointer" variant={"outline"}>
                상세보기
              </Badge>
            </li>
            <li className="w-full flex items-center justify-between">
              <span>CMA 주요 약관 및 설명서</span>
              <Badge className="py-2 cursor-pointer" variant={"outline"}>
                상세보기
              </Badge>
            </li>
            <li className="w-full flex items-center justify-between">
              <span>수익증권 저축약관</span>
              <Badge className="py-2 cursor-pointer" variant={"outline"}>
                상세보기
              </Badge>
            </li>
            <li className="w-full flex items-center justify-between">
              <span>국내주식 주요 약관 및 설명서</span>
              <Badge className="py-2 cursor-pointer" variant={"outline"}>
                상세보기
              </Badge>
            </li>
          </ul>
        </div>

        <DrawerFooter className="mt-5 w-full flex-row justify-center">
          <Button
            className="py-10 px-6 max-w-96 w-full text-lg"
            onClick={() => router.replace("/sign-up/p1")}
          >
            전체 동의하고 시작하기
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
