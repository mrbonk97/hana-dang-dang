"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { JobDrawer } from "@/components/drawer/sign-up/job-drawer";
import { OriginDrawer } from "@/components/drawer/sign-up/origin-drawer";
import { MissionDrawer } from "@/components/drawer/sign-up/mission-drawer";
import { useRouter } from "next/navigation";

const SignUpP4Page = () => {
  const router = useRouter();
  const [job, setJob] = useState("직업을 선택해주세요");
  const [origin, setOrigin] = useState("거래 자금 출처를 선택해주세요");
  const [mission, setMission] = useState("거래 목적을 선택해주세요");

  return (
    <main className="py-20 px-[10%] h-full min-h-[100vh]">
      <hgroup>
        <h1 className="text-xl font-bold opacity-80">투자자정보확인</h1>
        <p className="text-sm font-medium opacity-60">
          고객확인의무를 확인하기 위해 고객님의 투자자정보를 입력해주세요
        </p>
      </hgroup>
      <section className="mt-20 flex justify-center">
        <div className="max-w-[400px] w-full space-y-5">
          <JobDrawer setState={setJob}>
            <CustomButton title="직업" value={job} />
          </JobDrawer>
          <OriginDrawer setState={setOrigin}>
            <CustomButton title="거래 자금 출처" value={origin} />
          </OriginDrawer>
          <MissionDrawer setState={setMission}>
            <CustomButton title="거래 목적" value={mission} />
          </MissionDrawer>
          <CustomButton disabled={true} title="출생 국가" value={"대한민국"} />
          <Button
            disabled={
              job == "직업을 선택해주세요" ||
              origin == "거래 자금 출처를 선택해주세요" ||
              mission == "거래 목적을 선택해주세요"
            }
            className="py-8 w-full text-lg"
            onClick={() => router.replace("/sign-up/p5")}
          >
            다음
          </Button>
        </div>
      </section>
    </main>
  );
};

export default SignUpP4Page;

interface CustomButtonProps {
  title: string;
  value: string;
  disabled?: boolean;
}

const CustomButton = ({ disabled, title, value }: CustomButtonProps) => {
  return (
    <div
      className={`p-3 w-full flex items-center justify-between rounded-lg border duration-150
        ${disabled ? "opacity-70" : "hover:bg-secondary"}`}
    >
      <div>
        <div className="text-sm text-left font-bold opacity-60">{title}</div>
        <div className="text-left font-bold opacity-70">{value}</div>
      </div>
      {!disabled && (
        <div className="opacity-60">
          <ChevronDown />
        </div>
      )}
    </div>
  );
};
