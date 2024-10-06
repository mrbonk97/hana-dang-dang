import { BirdIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NotLoggedInCard = () => (
  <main className="h-full flex2 flex-col gap-5 font-medium opacity-80">
    <BirdIcon size={96} className="text-c1-300" />
    <h1>로그인이 필요한 서비스입니다.</h1>
    <Button variant={"link"} asChild>
      <Link href={"/sign-in"}>로그인 하러가기</Link>
    </Button>
  </main>
);
