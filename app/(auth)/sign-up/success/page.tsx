"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import Link from "next/link";

const SignUpSuccessPage = () => {
  const name = sessionStorage.getItem("name");
  const username = sessionStorage.getItem("username");
  const accountNo = sessionStorage.getItem("account_no");

  return (
    <main className="pt-32 pb-20 h-full min-h-[700px] flex items-center flex-col">
      <Check
        size={64}
        className="p-2 h-20 w-20 rounded-full bg-c1-100 text-c1-300"
      />
      <h1 className="mt-10 text-center text-xl font-bold opacity-80">
        {name}님의 <br />
        계좌가 개설되었습니다.
      </h1>
      <section className="mt-16 w-96">
        <div className="text-lg font-medium opacity-80">나의 신청현황</div>
        <Separator className="my-2" />
        <div className="pt-2 font-medium opacity-80 flex items-center justify-between">
          <span>아이디</span>
          <span>{username}</span>
        </div>
        <div className="pt-2 font-medium opacity-80 flex items-center justify-between">
          <span>주식거래계좌</span>
          <span>{accountNo}</span>
        </div>
      </section>
      <section className="mt-10 opacity-60">
        <ul className="list-disc max-w-96 space-y-5">
          <li>
            상기내용은 금융소비자 보호 법력 및 내부통제기준에 따른 절치를 거쳐
            제공됩니다.
          </li>
          <li>
            미국 애프터마켓 연장 신청을 원하시는 경우, '애프터마켓 연장
            신청/해지 화면에서 별도로 신청하시길 바랍니다.'
          </li>
        </ul>
      </section>
      <section className="w-96">
        <Button className="mt-10 py-6 w-full" asChild>
          <Link href={"/sign-in"}>로그인</Link>
        </Button>
      </section>
    </main>
  );
};

export default SignUpSuccessPage;
