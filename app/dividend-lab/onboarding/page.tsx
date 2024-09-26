"use client";
import { useState } from "react";
import { QuestionCard } from "./_components/question-card";
import { QuestionCard2 } from "./_components/question-card2";
import { ResultCard } from "./_components/result-card";
import { motion } from "framer-motion";
import { Spinner } from "@/components/spinner/spinner";
import { useMutation } from "@tanstack/react-query";
import { registerDividendLabApi } from "@/lib/user-api";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import { useRouter } from "next/navigation";

const OnboardingPage = () => {
  const router = useRouter();
  const useStore = createSelectors(store).use;
  const isLoggedIn = useStore.isLoggedIn();
  const user = useStore.user();
  const setUser = useStore.setUser();

  if (!isLoggedIn || user == null) {
    router.push("/sign-in");
    return <main />;
  }

  // if (user.isDividendCreated) {
  //   router.push("/dividend-lab");
  //   return <main />;
  // }

  const [page, setPage] = useState(0);
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: () => {
      setIsLoading(true);
      return registerDividendLabApi(user.id, q5, q2, q3, q4);
    },
    onSuccess: (data) => {
      setUser(data.data);

      setTimeout(() => {
        router.push("/dividend-lab");
      }, 2000);
    },
  });

  const handleClick = (ans: string, idx: number) => {
    if (idx == 1) setQ1(ans);
    if (idx == 2) setQ2(ans);
    if (idx == 3) setQ3(ans);
    if (idx == 4) setQ4(ans);
    if (idx == 5) setQ5(ans);
    setPage((cur) => cur + 1);
  };

  if (isLoading)
    return (
      <main className="min-h-[800px] h-full pt-14 pl-16 flex justify-center bg-secondary">
        <section className="px-10 py-20 h-full w-[800px] border-x bg-background">
          <p className="text-center text-lg font-medium opacity-70">
            보유하고 계신 종목을 분석 중입니다.
          </p>
          <div className="h-full flex2">
            <Spinner />
          </div>
        </section>
      </main>
    );

  return (
    <main className="min-h-[800px] h-full overflow-y-hidden pt-14 pl-16 flex justify-center bg-secondary">
      <section className="px-10 py-20 h-full w-[800px] border-x flex flex-col justify-between bg-background">
        <div
          className="h-10 w-full flex2"
          onClick={() => setPage((cur) => cur + 1)}
        >
          <div className="w-full h-2 bg-c1-300" />
        </div>

        <motion.div
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              ease: "easeIn",
              duration: 0.3,
              delay: 0.2,
            },
          }}
          initial={{ y: 100, opacity: 0.3 }}
          className="h-full w-full overflow-hidden"
        >
          <div
            className="h-full duration-700 flex"
            style={{ transform: `translateX(${page * -100}%)` }}
          >
            <QuestionCard
              idx={1}
              type=""
              question="시작에 앞서 고객님을 성향을 파악하기 위해 몇가지 질문을 준비했습니다."
              answers={[
                { ans: "답변하기", onClick: () => handleClick("답변하기", 1) },
                { ans: "건너뛰기", onClick: () => handleClick("건너뛰기", 1) },
              ]}
            />
            <QuestionCard
              idx={2}
              type="리스크 성향"
              question="어떤 리스크 수준을 감수할 준비가 되어 있나요?"
              answers={[
                {
                  ans: "낮은 리스크",
                  onClick: () => handleClick("낮은 리스크", 2),
                },
                {
                  ans: "중간 리스크",
                  onClick: () => handleClick("중간 리스크", 2),
                },
                {
                  ans: "높은 리스크",
                  onClick: () => handleClick("높은 리스크", 2),
                },
              ]}
            />
            <QuestionCard
              idx={3}
              type="배당 선호도"
              question="배당금 수익률에 대한 선호는 어떤가요?"
              answers={[
                { ans: "월 배당", onClick: () => handleClick("월 배당", 3) },
                {
                  ans: "분기 배당",
                  onClick: () => handleClick("분기 배당", 3),
                },
                { ans: "결산배당", onClick: () => handleClick("결산 배당", 3) },
                {
                  ans: "선호 없음",
                  onClick: () => handleClick("선호 없음", 3),
                },
              ]}
            />
            <QuestionCard
              idx={4}
              type="관심 산업/분야"
              question="어떤 산업이나 분야에 관심이 있으신가요?"
              answers={[
                {
                  ans: "IT/컴퓨터",
                  onClick: () => handleClick("IT/컴퓨터", 4),
                },
                { ans: "식품", onClick: () => handleClick("식품", 4) },
                { ans: "부동산", onClick: () => handleClick("부동산", 4) },
                { ans: "금융", onClick: () => handleClick("금융", 4) },
                { ans: "기타", onClick: () => handleClick("기타", 4) },
              ]}
            />
            <QuestionCard2
              idx={5}
              type="수익"
              question="목표하는 연간 배당 수익률은 얼마인가요?"
              value={q5}
              setValue={setQ5}
              onClick={() => setPage((cur) => cur + 1)}
            />
            <ResultCard
              q2={q2}
              q3={q3}
              q4={q4}
              q5={q5}
              onClick={() => {
                mutation.mutate();
              }}
            />
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default OnboardingPage;
