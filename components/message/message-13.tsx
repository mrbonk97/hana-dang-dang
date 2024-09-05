import { CHAT_MESSAGE } from "@/constants";
import { MessageTemplate } from "./message-template";
import { Button } from "@/components/ui/button";

export const Message13 = () => {
  return (
    <MessageTemplate
      face
      type="BOT"
      title={CHAT_MESSAGE[13].title}
      message={CHAT_MESSAGE[13].message}
    >
      <div className="pt-2 space-y-2">
        <Button className="py-6 w-full">보유주택 없음</Button>
        <Button className="py-6 w-full">1주택</Button>
        <Button className="py-6 w-full" disabled>
          2주택 이상(신청불가)
        </Button>
      </div>
    </MessageTemplate>
  );
};
