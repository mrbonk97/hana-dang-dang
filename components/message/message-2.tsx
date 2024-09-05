import { MessageTemplate } from "./message-template";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface MessageProps {
  setState: Dispatch<SetStateAction<string>>;
}

export const Message2 = ({ setState }: MessageProps) => {
  return (
    <MessageTemplate
      face
      type="BOT"
      message="국내주식 vs 해외주식 어디를 추천받고 싶으신가요"
    >
      <div className="pt-2 space-y-2">
        <Button className="py-6 w-full" onClick={() => setState("국내")}>
          국내
        </Button>
        <Button className="py-6 w-full" onClick={() => setState("해외")}>
          해외
        </Button>
      </div>
    </MessageTemplate>
  );
};
