import { MessageTemplate } from "./message-template";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface Message4Props {
  setState: Dispatch<SetStateAction<string>>;
}
export const Message4 = ({ setState }: Message4Props) => {
  return (
    <MessageTemplate face type="BOT" title={"직업을 선택해주세요"}>
      <div className="pt-2 space-y-2">
        <Button className="py-6 w-full" onClick={() => setState("직장인")}>
          직장인
        </Button>
        <Button className="py-6 w-full" onClick={() => setState("공무원")}>
          공무원
        </Button>
        <Button className="py-6 w-full" onClick={() => setState("개인사업자")}>
          개인사업자
        </Button>
        <Button className="py-6 w-full" onClick={() => setState("임대사업자")}>
          임대사업자
        </Button>
        <Button className="py-6 w-full" onClick={() => setState("프리랜서")}>
          프리랜서
        </Button>
        <Button className="py-6 w-full" onClick={() => setState("무직")}>
          무직
        </Button>
      </div>
    </MessageTemplate>
  );
};
