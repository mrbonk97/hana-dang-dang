"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export function MainCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      //   onMouseEnter={plugin.current.stop}
      //   onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="m-0">
        <CarouselItem className="h-[600px] w-full flex2 gap-20 bg-[#EFECFF]">
          <hgroup>
            <h2 className="text-6xl font-bold opacity-80 leading-[1.45]">
              하나 어린이 적립식 <br />
              특판RP 연7%
            </h2>
            <h3 className="mt-5 text-3xl font-medium opacity-60">
              세전, 최초 매수일로부터 12개월
            </h3>
          </hgroup>
          <Image
            src={"/images/banner/banner2.png"}
            alt="banner2"
            width={300}
            height={300}
          />
        </CarouselItem>
        <CarouselItem className="h-[600px] w-full flex2 gap-20 bg-[#FFEFF2]">
          <hgroup>
            <h2 className="text-6xl font-bold opacity-80 leading-[1.45]">
              미국주식 소수점 <br />
              적립식 투자 챌린지
            </h2>
            <h3 className="mt-5 text-3xl font-medium opacity-60">
              원큐스탁 소수점 주문 이벤트
            </h3>
          </hgroup>
          <Image
            src={"/images/banner/banner1.png"}
            alt="banner1"
            width={300}
            height={300}
          />
        </CarouselItem>
        <CarouselItem className="h-[600px] w-full flex2 gap-20 bg-[#FAF6EA]">
          <hgroup>
            <h2 className="text-6xl font-bold opacity-80 leading-[1.45]">
              TIGER ETF <br />
              적립식 투자이벤트
            </h2>
            <h3 className="mt-5 text-3xl font-medium opacity-60">
              미래에셋자산운용
            </h3>
          </hgroup>
          <Image
            src={"/images/banner/banner3.png"}
            alt="banner3"
            width={300}
            height={300}
          />
        </CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
