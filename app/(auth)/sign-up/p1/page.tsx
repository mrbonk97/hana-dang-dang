"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, CircleAlert } from "lucide-react";
import { Drawer1 } from "./_component/drawer1";
import { useState } from "react";
import { Drawer2 } from "./_component/drawer2";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignUpProcessPage = () => {
  const router = useRouter();
  const [s1, setS1] = useState(false);
  const [s2, setS2] = useState(false);
  return (
    <main className="py-20 px-[10%] h-full min-h-[100vh] flex flex-col">
      <hgroup>
        <h1 className="text-xl font-bold opacity-80">투자 주요내용 위탁계좌</h1>
        <p className="text-sm font-medium opacity-60">
          상품의 주요 내용과 설명서를 확인해 주세요
        </p>
        <p className="px-5 py-2 mt-2 max-w-96 text-sm rounded-xl opacity-70 bg-neutral-300 break-keep">
          금융소비자법 제 19조제1항에 따라, 상품에 대한 자세한 내용을
          안내합니다.
        </p>
      </hgroup>
      <section className="-mt-5 w-full flex flex-col items-center">
        <div className="flex items-center gap-5">
          <Badge variant={"destructive"} className="mt-1 px-2 rounded-full">
            2등급
          </Badge>
          <h3 className="text-4xl font-bold opacity-80">높은 위험</h3>
        </div>
        <div className="mt-10 w-full flex justify-center gap-10">
          <div>
            <div className="h-32 w-32 rounded-full bg-secondary flex2">
              <Image
                src={"/icons/angry-customer.png"}
                alt="img"
                width={60}
                height={60}
              />
            </div>
            <p className="mt-2 text-sm font-medium opacity-70 text-center">
              예금자비보호
            </p>
          </div>
          <div>
            <div className="h-32 w-32 rounded-full bg-secondary flex2">
              <Image
                src={"/icons/graph.png"}
                alt="img"
                width={50}
                height={50}
              />
            </div>
            <p className="mt-2 text-sm font-medium opacity-70 text-center">
              원금손실가능
            </p>
          </div>
          <div>
            <div className="h-32 w-32 rounded-full bg-secondary flex2">
              <Image
                src={"/icons/checklist.png"}
                alt="img"
                width={50}
                height={50}
              />
            </div>
            <p className="mt-2 text-sm font-medium opacity-70 text-center">
              자기책임원칙
            </p>
          </div>
        </div>
      </section>
      <section className="mt-14 flex justify-center">
        <div className="max-w-md w-full space-y-5">
          <Drawer1>
            <div
              onClick={() => setS1(true)}
              className={`cursor-pointer p-5 border-2 rounded-xl w-full flex justify-between ${
                s1
                  ? "border-blue-400 bg-blue-100 text-blue-400"
                  : "border-destructive bg-rose-100 text-destructive"
              }`}
            >
              <span className="flex items-center gap-2">
                <CircleAlert />
                상품내용 및 투자대상
              </span>
              <span className="flex items-center gap-2">
                확인 필요 <ChevronRightIcon />
              </span>
            </div>
          </Drawer1>
          <Drawer2>
            <div
              onClick={() => setS2(true)}
              className={`cursor-pointer p-5 border-2 rounded-xl w-full flex justify-between ${
                s2 && "border-blue-400 bg-blue-100 text-blue-400"
              }`}
            >
              <span className="flex items-center gap-2">
                <CircleAlert />
                투지위험 및 불이익
              </span>
              <span className="flex items-center gap-2">있음</span>
            </div>
          </Drawer2>
          <Button
            disabled={!s1 || !s2}
            className="py-8 w-full rounded-xl text-xl"
            onClick={() => router.replace("/sign-up/p2")}
          >
            다음
          </Button>
        </div>
      </section>
    </main>
  );
};

export default SignUpProcessPage;
