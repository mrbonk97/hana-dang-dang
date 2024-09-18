import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/nav/footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MainCarousel } from "./_component/main-carousel";

const MainPage = () => {
  return (
    <main className="min-h-full pt-14">
      <MainCarousel />
      <section className="border-y h-14 py-5 flex items-center justify-center text-sm gap-10 opacity-70">
        <div className="flex items-center">
          <strong>공지사항</strong>
          <span className="ml-2">
            2024년 6월말 반기보고서 기준 사채관리계약 이행상황보고서 (풀무원 외)
          </span>
        </div>
        <Separator orientation="vertical" className="h-full" />
        <div>
          미래에셋자산운용 TIGER 글로벌AI인프라액티브 ETF(491010) 상장 안내
        </div>
      </section>
      <section className="p-10 min-h-[800px] flex items-center justify-center gap-20">
        <hgroup className="text-6xl font-bold opacity-80 space-y-3">
          <h1>국내 유일한</h1>
          <h1>증권 + 배당 관리</h1>
          <h1 className="pb-5">하나 배당당입니다.</h1>
          <Button className="rounded-full py-8 px-16 text-lg" asChild>
            <Link href={"/stocks"}>시작하기</Link>
          </Button>
        </hgroup>
        <video autoPlay muted loop className="w-1/3">
          <source src="/videos/Dollar Coins.mp4" type="video/mp4" />
        </video>
      </section>
      <section className="p-10 pb-40 bg-secondary">
        <h1 className="mt-10 font-bold text-4xl text-center opacity-70">
          인기있는 서비스를 확인해보세요
        </h1>
        <div className="mt-20 flex items-center justify-center gap-10">
          <MenuCard
            link="/profile/diagnosis"
            title="포트폴리오 진단"
            description="나의 투자 성향에 맞는 포트폴리오 제안"
            imgUrl="/icons/pie-graph.png"
          />
          <MenuCard
            link="/stocks/recommend"
            title="주식 추천"
            description="하나배당당에서 주식을 추천해드립니다."
            imgUrl="/icons/like.png"
          />
          <MenuCard
            link="/dividen-lab"
            title="배당주 관리"
            description="오직 하나배당당만이 가능합니다."
            imgUrl="/icons/doubt.png"
          />
          <MenuCard
            link="/news"
            title="시장 분석"
            description="세계 뉴스와 차트로 시장을 예측하세요"
            imgUrl="/icons/globe.png"
          />
        </div>
      </section>
      <section className="p-10 pb-20">
        <h2 className="mt-10 text-center text-3xl font-bold opacity-70">
          하나배당당에 대해 궁금하실 수 있는 질문들을 모아봤어요
        </h2>
        <div className="mt-20 px-[20%] opacity-80">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>'하나배당당' 이란 무엇인가요?</AccordionTrigger>
              <AccordionContent>
                '하나배당당'은 사용자에게 주식 배당금의 수익을 체계적으로
                관리하고 분석할 수 있는 증권 배당 관리 서비스입니다. 사용자는
                배당금 지급일정을 확인하고, 배당 수익을 추적하며, 투자 성과를
                분석할 수 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                '하나배당당'을 사용하려면 어떻게 해야 하나요?
              </AccordionTrigger>
              <AccordionContent>
                서비스를 이용하려면 먼저 ‘하나배당당’ 웹사이트나 모바일
                애플리케이션에서 회원가입을 하셔야 합니다. 이후, 자신의 투자
                계좌를 연결하고 배당 관련 정보를 입력하면 서비스를 이용할 수
                있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                배당금 지급일정을 어떻게 확인하나요?
              </AccordionTrigger>
              <AccordionContent>
                로그인 후, 대시보드에서 '배당금 일정' 탭을 클릭하시면, 예정된
                배당금 지급일과 관련 정보를 확인할 수 있습니다. 사용자는 자신의
                포트폴리오에 포함된 주식의 배당금 지급일정을 자동으로 업데이트
                받을 수 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                배당 수익을 어떻게 추적하나요?
              </AccordionTrigger>
              <AccordionContent>
                ‘하나배당당’의 ‘배당 수익 추적’ 기능을 통해 배당금 지급 내역과
                총 수익을 확인할 수 있습니다. 수익 내역은 그래프 및 차트로
                시각화되어, 한눈에 쉽게 이해할 수 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                서비스에 대한 지원은 어떻게 받을 수 있나요?
              </AccordionTrigger>
              <AccordionContent>
                서비스와 관련된 모든 질문이나 문제는 ‘고객 지원’ 페이지를 통해
                문의하실 수 있습니다. 이메일, 전화, 채팅 지원을 통해 빠르게
                도움을 드리고 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                배당금과 관련된 세금은 어떻게 처리하나요?
              </AccordionTrigger>
              <AccordionContent>
                배당금에 대한 세금은 사용자가 직접 세무 관련 자문을 받아야
                합니다. ‘하나배당당’은 세금 계산이나 신고 서비스를 제공하지
                않습니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <Footer />
      <Button
        variant={"outline"}
        className="fixed right-10 bottom-10 rounded-full py-8 px-7 flex items-center justify-center gap-2"
      >
        <Image src={"/icons/robot.png"} alt="robot" height={30} width={30} />
        <span className="opacity-70">챗봇 상담하기</span>
      </Button>
    </main>
  );
};

export default MainPage;

interface MenuCardProps {
  link: string;
  title: string;
  description: string;
  imgUrl: string;
}

const MenuCard = ({ link, title, description, imgUrl }: MenuCardProps) => {
  return (
    <Link href={link}>
      <Card className="relative w-[17.5rem] cursor-pointer group overflow-hidden">
        <CardHeader className="relative z-10">
          <CardTitle className="opacity-70 group-hover:opacity-100 group-hover:text-primary-foreground duration-300">
            {title}
          </CardTitle>
          <CardDescription className="opacity-70 group-hover:opacity-100 group-hover:text-primary-foreground duration-300">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 py-16 flex justify-center">
          <Image src={imgUrl} alt={title} width={128} height={128} />
        </CardContent>
        <div className="rounded-xl opacity-0 group-hover:opacity-100 duration-500 absolute top-0 h-full w-full bg-gradient-to-br from-c1-300 to-c1-300/40" />
      </Card>
    </Link>
  );
};
