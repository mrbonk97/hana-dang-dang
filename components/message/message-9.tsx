import { CHAT_MESSAGE } from "@/constants";
import { MessageTemplate } from "./message-template";

export const Message9 = () => {
  return (
    <MessageTemplate
      face
      type="BOT"
      title={CHAT_MESSAGE[10].title}
      message={CHAT_MESSAGE[10].message}
    ></MessageTemplate>
  );
};
