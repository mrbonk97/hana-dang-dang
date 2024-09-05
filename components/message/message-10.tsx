import { CHAT_MESSAGE } from "@/constants";
import { MessageTemplate } from "./message-template";
import { Button } from "@/components/ui/button";

export const Message10 = () => {
  return (
    <MessageTemplate
      face
      type="BOT"
      title={CHAT_MESSAGE[10].title}
      message={CHAT_MESSAGE[10].message}
    >
      <div className="pt-2 space-y-2">
        <Button className="py-6 w-full">근로소득</Button>
        <Button className="py-6 w-full">사업소득</Button>
        <Button className="py-6 w-full">기타소득</Button>
        <Button className="py-6 w-full">무소득</Button>
      </div>
    </MessageTemplate>
  );
};
