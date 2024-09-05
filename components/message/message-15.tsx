import { CHAT_MESSAGE } from "@/constants";
import { MessageTemplate } from "./message-template";

export const Message15 = () => {
  return (
    <MessageTemplate
      face
      type="BOT"
      title={CHAT_MESSAGE[15].title}
      message={CHAT_MESSAGE[15].message}
    ></MessageTemplate>
  );
};
