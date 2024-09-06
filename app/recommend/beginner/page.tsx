"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { NextButton } from "@/components/next-button";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const BeginnerPage = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [ans1, setAns1] = useState("");

  const handleClick = (topic: string) => {
    if (checked.find((item) => item == topic)) {
      setChecked((cur) => checked.filter((item) => item != topic));
    } else setChecked((cur) => [...cur, topic]);
  };

  if (step == 0)
    return (
      <main className="p-20 pt-32 h-full">
        <hgroup>
          <h1 className="text-3xl font-bold opacity-80">
            관심이 가는 테마를 모두 선택해주세요
          </h1>
          <p className="mt-1 font-medium opacity-70">
            다음은 하나증권이 분석한 인기 테마입니다.
          </p>
          <p className="mt-1 font-medium opacity-70 text-destructive">
            최대 3개까지 테마를 선택하실 수 있습니다.
          </p>
        </hgroup>
        <section className="mt-10 flex justify-between">
          <div className="w-full flex flex-wrap gap-10">
            <TopicCard
              selected={checked.find((item) => item == "2차전지") != undefined}
              onClick={() => handleClick("2차전지")}
              title="2차전지"
              topic={["케이엔솔", "세방전지", "DI동일"]}
            />
            <TopicCard
              selected={checked.find((item) => item == "전기차") != undefined}
              onClick={() => handleClick("전기차")}
              title="전기차"
              topic={["기아", "현대차", "한국앤컴퍼니"]}
            />
            <TopicCard
              selected={
                checked.find((item) => item == "자율주행차") != undefined
              }
              onClick={() => handleClick("자율주행차")}
              title="자율주행차"
              topic={["한국단자", "기아", "현대차"]}
            />
            <TopicCard
              selected={checked.find((item) => item == "OLED") != undefined}
              onClick={() => handleClick("OLED")}
              title="OLED"
              topic={["AP시스템", "한국컴퓨터", "LG전자"]}
            />
            <TopicCard
              selected={checked.find((item) => item == "아이폰") != undefined}
              onClick={() => handleClick("아이폰")}
              title="아이폰"
              topic={["LG이노텍", "인터플렉스", "SK하이닉스"]}
            />
          </div>
          <div className="border-l w-full flex justify-center">
            <Card className="flex flex-col justify-between border-none shadow-none rounded-none">
              <CardHeader>
                <CardTitle className="text-xl opacity-80">
                  선택한 테마
                </CardTitle>
                <CardContent>
                  <ul className="mt-2 list-decimal text-lg font-medium opacity-80 space-y-2">
                    {checked.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </CardHeader>
              <CardFooter>
                <NextButton
                  onClick={() => setStep((cur) => cur + 1)}
                  isDisabled={checked.length == 0}
                />
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
    );

  if (step > 0) {
    return (
      <main className="p-20 h-full">
        <h3 className="pt-10 text-3xl font-bold opacity-80 text-center">
          어떤 기업에 투자하고 싶으신가요?
        </h3>
        <section className="mt-20 w-full flex justify-evenly">
          <div className="relative h-80 w-80 overflow-hidden">
            <div
              className={`absolute flex h-full duration-500 
            ${step == 1 && ""}
            ${step == 2 && "-ml-[320px]"}
            ${step == 3 && "-ml-[640px]"}
            ${step == 4 && "-ml-[960px]"}
              `}
            >
              <Image
                src={"/icons/world-creativity-and-innovation-day.gif"}
                alt="women"
                width={320}
                height={320}
              />
              <Image
                src={"/icons/idea.gif"}
                alt="women"
                width={320}
                height={320}
              />
            </div>
          </div>
          <motion.article className="w-[450px] flex flex-col justify-evenly gap-10">
            <Button
              aria-pressed={ans1 == "대기업"}
              onClick={() => setAns1("대기업")}
              variant={"recommend"}
              className={`pl-8 h-full max-h-20`}
            >
              <CircleCheck size={32} />
              대기업에 투자할게요
            </Button>
            <Button
              aria-pressed={ans1 == "소기업"}
              onClick={() => setAns1("소기업")}
              variant={"recommend"}
              className="pl-8 h-full max-h-20"
            >
              <CircleCheck size={32} />
              유망한 코스닥에 투자할게요
            </Button>
          </motion.article>
        </section>
        <section className="mt-20 w-full flex justify-center">
          <NextButton
            isDisabled={ans1 == ""}
            onClick={() => setStep((cur) => cur + 1)}
          />
        </section>
      </main>
    );
  }
};

export default BeginnerPage;

interface TopicCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  topic: string[];
}

const TopicCard = ({ selected, onClick, title, topic }: TopicCardProps) => {
  return (
    <Card onClick={onClick} className={`relative ${selected && "bg-c1-100"}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CircleCheck
          className={`absolute right-1 top-0 ${
            selected ? "text-green-400" : "text-zinc-400"
          }`}
        />
      </CardHeader>
      <CardContent className="space-x-2">
        {topic.map((item) => (
          <Badge key={item} className="py-2 px-4">
            {item}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
};
