import { MessageTemplate } from "./message-template";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface Message3Props {
  setMessage: Dispatch<SetStateAction<string>>;
}

export const Message3 = ({ setMessage }: Message3Props) => {
  return (
    <MessageTemplate type="BOT" title={"변동성이 큰게 좋으신가요?"}>
      <div className="pt-2 space-y-2">
        <Button className="py-6 w-full" onClick={() => setMessage("네")}>
          네
        </Button>
        <Button className="py-6 w-full" onClick={() => setMessage("아니요")}>
          아니요
        </Button>
      </div>
    </MessageTemplate>
  );
};
