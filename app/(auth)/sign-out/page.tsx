"use client";
import { Button } from "@/components/ui/button";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { useQueryClient } from "@tanstack/react-query";
import { Sprout } from "lucide-react";
import Link from "next/link";

const SignOutPage = () => {
  const qc = useQueryClient();

  qc.clear();

  const selector = createSelectors(store).use;
  const signOut = selector.signOut();
  signOut();

  return (
    <main className="pb-20 min-h-96 min-w-80 h-full w-full flex2 flex-col gap-5">
      <Sprout className="text-c1-300" size={96} />
      <h1 className="text-lg font-bold opacity-80">로그아웃 완료</h1>
      <Button variant={"link"} asChild>
        <Link href={"/"} className="opacity-80">
          메인으로 돌아가기
        </Link>
      </Button>
    </main>
  );
};

export default SignOutPage;
