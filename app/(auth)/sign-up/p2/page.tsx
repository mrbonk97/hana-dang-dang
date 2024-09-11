"use client";

import { Button } from "@/components/ui/button";
import { CircleAlert, CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

const SignUpP2Page = () => {
  const router = useRouter();
  const [q1, setQ1] = useState<boolean | null>(null);
  const [q2, setQ2] = useState<boolean | null>(null);
  const [q3, setQ3] = useState<boolean | null>(null);

  return (
    <main className="py-20 px-[10%] h-full min-h-[100vh]">
      <hgroup>
        <h1 className="text-xl font-bold opacity-80">이해 여부 확인</h1>
        <p className="text-sm font-medium opacity-60">
          세 가지 질문에 답변해주세요
        </p>
      </hgroup>
      <div className="flex justify-center">
        <section className="mt-10 max-w-md w-full space-y-10">
          <Question
            title="Q1"
            body="본 상품의 원금손실이 발생할 가능성을 어떻게 이해하셨나요?"
            ans1="가능성 있음"
            ans2="가능성 없음"
            state={q1}
            setState={setQ1}
          />
          <Question
            title="Q2"
            body="설명서 및 약관 등의 내용을 읽고 상품의 주요내용과 핵심 투자위험, 최대손실가능성에 대해 이해하셨나요?"
            ans1="예"
            ans2="아니요"
            state={q2}
            setState={setQ2}
          />
          <Question
            title="Q3"
            body="이 금융상품은 예비자보호법에 따라 보호되지 않습니다. 금융소비자의 권리에 대해 충분히 확인하셨나요?"
            ans1="예"
            ans2="아니요"
            state={q3}
            setState={setQ3}
          />
          <Button
            className="mt-5 py-5 w-full"
            disabled={!q1 || !q2 || !q3}
            onClick={() => router.replace("/sign-up/p3")}
          >
            다음
          </Button>
        </section>
      </div>
    </main>
  );
};

export default SignUpP2Page;

interface QuestionProps {
  title: string;
  body: string;
  ans1: string;
  ans2: string;
  state: boolean | null;
  setState: Dispatch<SetStateAction<boolean | null>>;
}
const Question = ({
  title,
  body,
  ans1,
  ans2,
  state,
  setState,
}: QuestionProps) => {
  return (
    <article>
      <h4 className="font-bold opacity-80">{title}</h4>
      <p className="mt-1 text-sm font-medium opacity-70">{body}</p>
      <div className="mt-2 flex">
        <Button
          onClick={() => setState(true)}
          className="py-5 w-full rounded-none border-r-0"
          variant={state == true ? "default" : "outline"}
        >
          {ans1}
        </Button>
        <Button
          onClick={() => setState(false)}
          className="py-5 w-full rounded-none"
          variant={state == false ? "destructive" : "outline"}
        >
          {ans2}
        </Button>
      </div>
      {state == null && (
        <p className="mt-3 flex items-center gap-1 text-xs text-c1-300">
          <CircleAlert size={16} />
          답변을 선택해주세요
        </p>
      )}
      {state != null && state && (
        <p className="mt-3 flex items-center gap-1 text-xs text-c2-300">
          <CircleCheck size={16} />
          상품 주요사항을 이해하였습니다.
        </p>
      )}
      {state != null && !state && (
        <p className="mt-3 flex items-center gap-1 text-xs text-destructive">
          <CircleAlert size={16} />
          틀렸습니다. 다시 확인해주세요
        </p>
      )}
    </article>
  );
};
