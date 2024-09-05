import { CHAT_MESSAGE } from "@/constants";
import { MessageTemplate } from "./message-template";

export const Message7 = () => {
  return (
    <MessageTemplate
      face
      type="BOT"
      title={CHAT_MESSAGE[7].title}
      message={CHAT_MESSAGE[7].message}
    ></MessageTemplate>
  );
};
