import { CHAT_MESSAGE } from "@/constants";
import { MessageTemplate } from "./message-template";

export const Message12 = () => {
  return (
    <MessageTemplate
      face
      type="BOT"
      title={CHAT_MESSAGE[12].title}
      message={CHAT_MESSAGE[12].message}
    ></MessageTemplate>
  );
};
