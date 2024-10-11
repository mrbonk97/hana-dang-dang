"use client";
import { Bannner2 } from "@/components/banner2";
import { Topnav2 } from "@/components/nav/top-nav2";
import { Button } from "@/components/ui/button";
import { STOCK_TITLES } from "@/constants";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const MainPage = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();
  return (
    <>
      <Topnav2 className="top-2 text-white bg-transparent border-none" />
      <main className={"min-h-full "}>
        <section className="relative h-screen w-full overflow-hidden bg-black/20">
          <div
            className="-z-10 absolute h-full w-full top-0 left-0 duration-1000"
            style={{
              transform: `translateY(${step * -100}%)`,
            }}
          >
            <Image
              src={"/images/bg/bg2.jpg"}
              width={1920}
              height={1080}
              alt="bg1"
              className="-z-10 h-screen w-screen object-cover"
            />
            <Image
              src={"/images/bg/bg3.jpg"}
              width={1920}
              height={1080}
              alt="bg1"
              className="-z-10 h-screen w-screen object-cover"
            />
            <Image
              src={"/images/bg/bg4.jpg"}
              width={1920}
              height={1080}
              alt="bg1"
              className="-z-10 h-screen w-screen object-cover"
            />
            <Image
              src={"/images/bg/bg1.jpg"}
              width={1920}
              height={1080}
              alt="bg5"
              className="-z-10 h-screen w-screen object-cover"
            />
          </div>
          <div className="pt-20 px-40 mt-5 w-full flex items-center justify-center gap-20">
            <div
              className={`h-1.5 w-96 duration-300 bg-white ${
                step < 0 && "opacity-40"
              } `}
            />
            <div
              className={`h-1.5 w-96 duration-300 delay-300 bg-white ${
                step < 1 && "opacity-40"
              } `}
            />
            <div
              className={`h-1.5 w-96 duration-300 delay-400 bg-white ${
                step < 2 && "opacity-40"
              } `}
            />
            <div
              className={`h-1.5 w-96 duration-300 delay-400 bg-white ${
                step < 3 && "opacity-40"
              } `}
            />
          </div>
          <section className="px-32 mt-12 h-[650px] flex justify-between">
            <div className="h-full flex flex-col gap-10">
              <hgroup className=" text-white">
                <h1 className="text-5xl font-bold">하나배당당</h1>
                <h2 className="mt-3 text-xl font-bold">
                  새롭게 선보이는 증권 & 배당주 서비스
                </h2>
              </hgroup>
              <motion.div
                className={`mt-10 text-4xl font-bold text-primary-foreground 
                  ${step == 0 ? "block" : "hidden"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.1, duration: 0.5, type: "spring" },
                }}
              >
                서비스 살펴보기
              </motion.div>
              <motion.div
                className={`mt-10 text-4xl font-bold text-primary-foreground
                  ${step == 1 ? "block" : "hidden"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.1, duration: 0.5, type: "spring" },
                }}
              >
                실시간 주식 매매
              </motion.div>
              <motion.div
                className={`mt-10 text-4xl font-bold text-primary-foreground
                  ${step == 2 ? "block" : "hidden"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.5, duration: 0.5, type: "spring" },
                }}
              >
                배당주 분석
              </motion.div>
              <motion.div
                className={`mt-10 text-4xl font-bold text-primary-foreground
                  ${step == 3 ? "block" : "hidden"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.5, duration: 0.5, type: "spring" },
                }}
              >
                포트폴리오 통계
              </motion.div>

              <button
                onClick={() => {
                  if (step == 3)
                    router.push("#second", {
                      scroll: true,
                    });
                  else setStep((cur) => Math.min(3, cur + 1));
                }}
                className="px-2 pl-10 h-20 w-60 group bg-white hover:bg-c1-300 duration-300 hover:text-white rounded-full text-xl font-bold flex items-center justify-between text-c1-300"
              >
                다음
                <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-c1-300 to-blue-400 flex2 text-white">
                  <ArrowRight size={32} />
                </div>
              </button>
            </div>
            <article className="h-[650px] w-[1000px] rounded-lg overflow-hidden shadow-lg">
              <header className="h-10 px-5 w-full bg-zinc-700 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-zinc-800" />
                  <div className="h-3 w-3 rounded-full bg-zinc-800" />
                  <div className="h-3 w-3 rounded-full bg-zinc-800" />
                </div>
                <div className="w-96 h-6 bg-zinc-600 rounded flex2">
                  <p className="font-xs text-zinc-400 font-medium">
                    www.hana-dividend.site
                  </p>
                </div>
                <div />
              </header>
              <div
                className="flex duration-1000 transition-all delay-150"
                style={{
                  transform: `translateX(${step * -100}%)`,
                }}
              >
                <Image
                  src={"/images/landing/landing7.png"}
                  alt="landing"
                  height={915}
                  width={1500}
                  quality={100}
                />
                <Image
                  src={"/images/landing/landing3.png"}
                  alt="landing"
                  height={915}
                  width={1500}
                  quality={100}
                />
                <Image
                  src={"/images/landing/landing4.png"}
                  alt="landing"
                  height={915}
                  width={1500}
                  quality={100}
                />
                <Image
                  src={"/images/landing/landing5.png"}
                  alt="landing"
                  height={915}
                  width={1500}
                  quality={100}
                />
              </div>
            </article>
          </section>
        </section>
        <section
          className="h-screen w-full relative overflow-hidden"
          id="second"
        >
          <div className="-z-10 absolute h-full w-[120%] -rotate-[30deg] -translate-x-96 -translate-y-96">
            <Bannner2 data={STOCK_TITLES.slice(0, 20)} />
            <Bannner2 data={STOCK_TITLES.slice(20, 40)} />
            <Bannner2 data={STOCK_TITLES.slice(40, 60)} />
            <Bannner2 data={STOCK_TITLES.slice(60, 80)} />
            <Bannner2 data={STOCK_TITLES.slice(80, 100)} />
            <Bannner2 data={STOCK_TITLES.slice(100, 120)} />
            <Bannner2 data={STOCK_TITLES.slice(120, 140)} />
            <Bannner2 data={STOCK_TITLES.slice(140, 160)} />
            <Bannner2 data={STOCK_TITLES.slice(160, 180)} />
            <Bannner2 data={STOCK_TITLES.slice(180, 200)} />
            <Bannner2 data={STOCK_TITLES.slice(200, 220)} />
            <Bannner2 data={STOCK_TITLES.slice(220, 240)} />
            <Bannner2 data={STOCK_TITLES.slice(240, 260)} />
            <Bannner2 data={STOCK_TITLES.slice(260, 280)} />
            <Bannner2 data={STOCK_TITLES.slice(280, 300)} />
            <Bannner2 data={STOCK_TITLES.slice(300, 320)} />
            <Bannner2 data={STOCK_TITLES.slice(320, 340)} />
            <Bannner2 data={STOCK_TITLES.slice(340, 360)} />
            <Bannner2 data={STOCK_TITLES.slice(360, 380)} />
            <Bannner2 data={STOCK_TITLES.slice(380, 400)} />
            <Bannner2 data={STOCK_TITLES.slice(400, 420)} />
            <Bannner2 data={STOCK_TITLES.slice(420, 440)} />
            <Bannner2 data={STOCK_TITLES.slice(440, 460)} />
            <Bannner2 data={STOCK_TITLES.slice(460, 480)} />
            <Bannner2 data={STOCK_TITLES.slice(480, 500)} />
          </div>
          <div className="-z-10 absolute top-0 left-0 h-screen w-screen bg-gradient-to-tl from-black to-transparent" />
          <article className="mt-40 px-20 flex items-start justify-evenly">
            <div>
              <hgroup className="p-5 flex flex-col items-start w-[600px] bg-black/70 shadow-lg">
                <p className="text-5xl text-white font-bold">
                  매일 업데이트 되는 최신
                </p>
                <p className="mt-2 text-5xl text-white font-bold">
                  코스피와 증권 정보
                </p>

                <p className="mt-10 text-4xl text-c1-300 font-bold">
                  +<span className="counter" />
                </p>
              </hgroup>
              <Button
                className="mt-14 rounded-full px-14 py-8 text-lg font-bold"
                asChild
              >
                <Link href={"/sign-up"}>시작하기</Link>
              </Button>
            </div>
            <ul>
              <li className="relative h-52 w-40 flex flex-col justify-center items-center bg-background/80 rounded-xl shadow-lg">
                <Image
                  src={"/kospi-icons/086790.png"}
                  alt="icon"
                  width={96}
                  height={96}
                  className="rounded-xl overflow-hidden"
                />
                <div className="mt-4 font-bold opacity-80">하나금융그룹</div>
                <div className="text-sm font-bold opacity-70">61,400원</div>
              </li>
              <li className="h-52 w-40 flex flex-col justify-center items-center bg-background/80 rounded-xl shadow-lg -mt-10 ml-52">
                <Image
                  src={"/kospi-icons/003530.png"}
                  alt="icon"
                  width={96}
                  height={96}
                  className="rounded-xl overflow-hidden"
                />
                <div className="mt-4 font-bold opacity-80">한화투자증권</div>
                <div className="text-sm font-bold opacity-70">3,255원</div>
              </li>
              <li className="h-52 w-40 flex flex-col justify-center items-center bg-background/80 rounded-xl shadow-lg -mt-16 -ml-24">
                <Image
                  src={"/kospi-icons/090430.png"}
                  alt="icon"
                  width={96}
                  height={96}
                  className="rounded-xl overflow-hidden"
                />
                <div className="mt-4 font-bold opacity-80">아모레퍼시픽</div>
                <div className="text-sm font-bold opacity-70">130,100원</div>
              </li>
            </ul>
          </article>
        </section>
      </main>
    </>
  );
};

export default MainPage;
