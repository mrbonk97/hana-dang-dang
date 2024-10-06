"use client";
import { NextButton } from "@/components/next-button";
import { NotLoggedInCard } from "@/components/not-logged-in-card";
import { Spinner } from "@/components/spinner/spinner";
import { Input } from "@/components/ui/input";
import { setGoalApi } from "@/lib/user-api";
import { formatNumber } from "@/lib/utils";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OnboardingPage = () => {
  const selector = createSelectors(store).use;
  const setUser = selector.setUser();
  const account = selector.account();
  const user = selector.user();
  const router = useRouter();

  const [goal, setGoal] = useState<number | "">("");
  const [step, setStep] = useState(0);

  const formatString = (value: number | "") => {
    if (value == "") return "";
    if (value < 10000) return formatNumber(value) + "원";

    const man = Math.floor(value / 10000);
    const leftValue = value % 10000;
    if (leftValue == 0) return formatNumber(man) + "만원";
    return man + "만 " + formatNumber(leftValue) + "원";
  };

  const mutation = useMutation({
    mutationFn: (userId: number) => setGoalApi(userId, goal),
    onSuccess: (e) => {
      setUser(e.data);
      router.push("/dividend-lab");
    },
  });

  if (account == null || user == null) return <NotLoggedInCard />;

  if (mutation.isPending || mutation.isSuccess) {
    return (
      <main className="min-h-[600px] h-full flex2 flex-col gap-20">
        <h1>목표를 설정하고 있습니다...</h1>
        <Spinner />
      </main>
    );
  }

  return (
    <main className="min-h-[600px] h-full flex2">
      <div className="h-[450px] w-[500px] overflow-hidden">
        <div
          className="h-full w-[200%] flex duration-700 transition-all"
          style={{ transform: `translateX(${step * -50}%)` }}
        >
          <section className="px-5 h-full w-1/2 flex flex-col justify-between items-center">
            <h1 className="text-xl font-bold opacity-80 text-center">
              배당연구소를 시작하기 전에 질문을 준비했습니다.
            </h1>
            <NextButton
              text="답변하기"
              onClick={() => setStep((cur) => cur + 1)}
            />
          </section>
          <section className="px-5 h-full w-1/2 flex flex-col justify-between items-center">
            <hgroup>
              <h1 className="text-xl font-bold opacity-80">
                목표하시는 연간 배당금을 입력해주세요
              </h1>
              <p className="text-xs opacity-60 font-medium text-right">
                100만원 이상
              </p>
            </hgroup>
            <div className="px-10 w-full relative font-medium">
              <Input
                type="number"
                className="p-8 rounded-full"
                value={goal}
                onChange={(e) => {
                  if (e.target.value == "") setGoal("");
                  else setGoal(Math.max(0, parseInt(e.target.value)));
                }}
              />
              <span className="absolute right-14 top-1/2 -translate-y-1/2 text-sm opacity-60">
                {formatString(goal)}
              </span>
            </div>
            <NextButton
              text="시작하기"
              disableText={"목표를 입력해주세요"}
              isDisabled={goal == "" || goal < 1000000}
              onClick={() => mutation.mutate(user.id)}
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default OnboardingPage;
