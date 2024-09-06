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
import { LOAN_TERM } from "@/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

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
                  let _checked = [...checked];
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
