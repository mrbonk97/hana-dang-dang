import { MessageTemplate } from "./message-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

interface Message5Props {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  fixed: boolean;
  setFixed: () => void;
}

export const Message5 = ({
  state,
  setState,
  fixed,
  setFixed,
}: Message5Props) => {
  return (
    <MessageTemplate face type="BOT" title={"임차보증금액을 입력해주세요"}>
      <div className="pt-2 flex items-center gap-2">
        <Input
          value={state}
          onChange={(e) => setState(e.target.value)}
          readOnly={fixed}
        />

        <Button className="py-6" onClick={() => setFixed()} disabled={fixed}>
          제출
        </Button>
      </div>
    </MessageTemplate>
  );
};
