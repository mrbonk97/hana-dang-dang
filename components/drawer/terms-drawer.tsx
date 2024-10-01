"use client";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";

const LOAN_TERM = [
  { id: "term-1", title: "본인확인 동의" },
  { id: "term-2", title: "하나은행 개인(신용)정보 처리 동의" },
  { id: "term-3", title: "금융기관 개인(신용)정보 처리 동의" },
  { id: "term-4", title: "금융기관 대안정보 처리 동의" },
  { id: "term-6", title: "정부지원 SGI 개인(신용)정보 처리 동의" },
  { id: "term-7", title: "건강보험공단 정보 가져오기 동의" },
  { id: "term-8", title: "KCB 신용조회 서비스 이용약관" },
];

interface TermsDrawerProps {
  children: React.ReactNode;
}
export const TermsDrawer = ({ children }: TermsDrawerProps) => {
  const [checked, setChecked] = useState(
    new Array(LOAN_TERM.length).fill(false)
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>필수 약관</DrawerTitle>
        </DrawerHeader>
        <ul className="w-full flex flex-col items-center gap-5">
          {LOAN_TERM.map((item, idx) => (
            <li key={item.id} className="w-96 flex items-center gap-2">
              <Checkbox
                id={item.id}
                onCheckedChange={(e: boolean) => {
                  const _checked = [...checked];
                  _checked[idx] = e;
                  setChecked(_checked);
                }}
              />
              <label htmlFor={item.id}>{item.title}</label>
            </li>
          ))}
        </ul>
        <DrawerFooter className="mt-5 w-full flex-row justify-center">
          <Button className="p-6 max-w-96 w-full" asChild>
            <Link
              aria-disabled={!checked.every((item) => item == true)}
              href={"/loan/chat/hana"}
            >
              시작하기
            </Link>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
