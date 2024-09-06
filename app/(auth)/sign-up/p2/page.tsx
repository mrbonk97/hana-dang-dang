"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SignUpP2Page = () => {
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <main className="py-20 px-[10%] h-full min-h-[100vh]">
      <hgroup>
        <h1 className="text-3xl font-bold opacity-80">신분증 촬영</h1>
        <p className="mt-1 font-medium opacity-60">
          모바일 신분증앱 혹은 신분증 촬용 중 한가지를 선택하여 본인인증을
          진행해 주세요
        </p>
      </hgroup>
      <section className="mt-20 w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold opacity-70">
          휴대폰으로 본인인증 링크 전송
        </h1>
        <div className="mt-10 relative">
          <Input className="p-10 rounded-full text-2xl opacity-70 font-bold tracking-widest" />
          <Button
            onClick={() => setIsSubmit(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-16 w-16 rounded-full"
          >
            전송
          </Button>
        </div>
        {isSubmit && (
          <div className="mt-5 font-medium opacity-60">
            전송이 완료되었습니다.
          </div>
        )}
      </section>
    </main>
  );
};

export default SignUpP2Page;
