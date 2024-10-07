"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GosuDialog } from "./_components/gosu-dialog";

const RecommendPage = () => {
  return (
    <main className="pl-16 pt-14 h-full">
      <h1 className="pt-16 text-4xl font-bold opacity-80 text-center">
        <strong className="text-c1-300">배당주</strong> 종목추천
      </h1>
      <section className="h-[600px] flex2 gap-40">
        <motion.div
          initial={{ opacity: 0.1, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut" }}
        >
          <Card className="h-96 border bg-yellow-200/80 flex-shrink-0">
            <CardHeader>
              <CardTitle className="text-lg opacity-80">초보자</CardTitle>
            </CardHeader>
            <CardContent className="py-5 flex flex-col items-center">
              <Image
                src={"/images/chobo.png"}
                alt="chobo"
                width={128}
                height={128}
                className="rounded-full overflow-hidden"
              />
              <h4 className="mt-5">주식 경험이 적은 초보자를 위한 추천</h4>
              <Button className="mt-10 w-full py-6" asChild>
                <Link href={"/dividend/recommend/beginner"}>시작하기</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.1, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", delay: 0.3 }}
        >
          <Card className="h-96 border bg-blue-200/80 flex-shrink-0">
            <CardHeader>
              <CardTitle className="text-lg opacity-80">고수</CardTitle>
            </CardHeader>
            <CardContent className="py-5 flex flex-col items-center">
              <Image
                src={"/images/gosu.png"}
                alt="chobo"
                width={128}
                height={128}
                className="rounded-full overflow-hidden"
              />
              <h4 className="mt-5">주식 경험이 풍부한 고수를 위한 추천</h4>
              <GosuDialog />
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
};

export default RecommendPage;
