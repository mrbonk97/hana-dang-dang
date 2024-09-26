"use client";
import { NextButton } from "@/components/next-button";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const RecommendPreferencePage = () => {
  const [preference, setPreference] = useState("");
  const router = useRouter();

  const handleClick = (title: string) => {
    if (preference == title) setPreference("");
    else setPreference(title);
  };

  return (
    <main className="py-20 h-full flex2 flex-col gap-20">
      <section className="h-[400px] flex justify-center gap-10">
        <Card
          checked={preference == "beginner"}
          onClick={() => handleClick("beginner")}
          title="주식 입문자"
          description="아직 헷갈리는 내 투자 성향, 주식의 첫 단추를 잘 꿰고 싶어요."
          imageUrl="/images/chobo.png"
          alt="chobo"
          bg="bg-c1-100"
        />
        <Card
          checked={preference == "intermidiate"}
          onClick={() => handleClick("intermidiate")}
          title="주식 경험자"
          description="어느 정도 경험해본 주식, 이젠 내 인생 종목을 찾고 싶어요."
          imageUrl="/images/gosu.png"
          alt="gosu"
          bg="bg-c2-100"
        />
      </section>
      <motion.div
        className="h-28"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <NextButton
          onClick={() => router.push("/recommend/beginner")}
          isDisabled={preference == ""}
          text="찾아보기"
        />
      </motion.div>
    </main>
  );
};

export default RecommendPreferencePage;

interface CardProps {
  onClick: () => void;
  checked: boolean;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  bg: string;
}

const Card = ({
  onClick,
  checked,
  title,
  description,
  imageUrl,
  alt,
  bg,
}: CardProps) => (
  <motion.article
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01],
    }}
    onClick={onClick}
    className="relative max-h-[400px] max-w-72 w-full h-full flex flex-col border overflow-hidden shadow-lg rounded-3xl"
  >
    <CircleCheck
      className={`absolute top-4 left-4
        ${checked ? "text-c1-300" : "text-zinc-300"}`}
    />
    <div className={`h-full flex2 ${bg}`}>
      <Image
        src={imageUrl}
        alt={alt}
        width={120}
        height={120}
        className="rounded-full overflow-hidden"
      />
    </div>
    <hgroup className="p-5 border-t">
      <h2 className="mt-1 text-lg font-bold opacity-80">{title}</h2>
      <p className="mt-1 text-sm font-medium opacity-70">{description}</p>
    </hgroup>
  </motion.article>
);
