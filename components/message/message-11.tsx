import { CHAT_MESSAGE } from "@/constants";
import { MessageTemplate } from "./message-template";

export const Message11 = () => {
  return (
    <MessageTemplate
      face
      type="BOT"
      title={CHAT_MESSAGE[11].title}
      message={CHAT_MESSAGE[11].message}
    ></MessageTemplate>
  );
};
