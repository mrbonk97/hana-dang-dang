"use client";
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
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "../ui/button";
import { LOAN_TERM } from "@/constants";
import { useState } from "react";
import Link from "next/link";
import { PhoneIcon } from "lucide-react";

interface TermsDrawerProps {
  children: React.ReactNode;
}
export const JeonseCallDrawer = ({ children }: TermsDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>상담 신청</DrawerTitle>
        </DrawerHeader>
        <div className="flex justify-center items-center gap-5">
          <hgroup className="max-w-xl break-keep">
            <p className="opacity-90">
              이어서 진행하실 수 있도록 SC제일은행 상담원(02-1588-1599)이
              전화드릴 예정이에요
            </p>
            <p className="text-sm opacity-70">
              영업 시간(평일 오전 9시-오후 6시)이 아닌 경우 다음 영업일에
              순차적으로 전화드릴게요.
            </p>
          </hgroup>
          <PhoneIcon size={128} className="text-primary/20" />
        </div>
        <DrawerFooter className="pb-10">
          <DrawerClose>
            <Button className="py-7 w-60 font-xl rounded-xl bg-custom-300 hover:bg-custom-300/80">
              확인
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

// 이어서 진행하실 수 있도록
// SC제일은행 상담원(02-1588-1599)이
// 전화드릴 예정이에요
// 영업 시간(평일 오전 9시-오후 6시)이 아닌 경우 다음 영업일에 순차적으로 전화드릴게요.
