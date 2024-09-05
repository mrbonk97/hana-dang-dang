import { CHAT_MESSAGE } from "@/constants";
import { MessageTemplate } from "./message-template";

export const Message8 = () => {
  return (
    <MessageTemplate
      face
      type="BOT"
      title={CHAT_MESSAGE[8].title}
      message={CHAT_MESSAGE[8].message}
    ></MessageTemplate>
  );
};
