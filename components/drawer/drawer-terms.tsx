import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "../ui/button";
import { LOAN_TERM } from "@/constants";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "../ui/badge";

interface TermsDrawerProps {
  children: React.ReactNode;
}
export const DrawerTerms = ({ children }: TermsDrawerProps) => {
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
          <Button className="py-10 px-6 max-w-96 w-full text-lg" asChild>
            <Link href={"/sign-up/p1"}>전체 동의하고 시작하기</Link>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
