import { MessageTemplate } from "./message-template";

export const Message1 = () => {
  return (
    <MessageTemplate
      type="BOT"
      face
      message="안녕하세요. 하나당당 종목 추천 AI입니다. 적절한 종목을 추천받기 위해서는 3분 정도면 충분해요. 잘 따라와주세요!😎"
    ></MessageTemplate>
  );
};
