import { NextButton } from "@/components/next-button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

interface Props {
  idx: number;
  type: string;
  question: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onClick: () => void;
}
export const QuestionCard2 = ({
  idx,
  type,
  question,
  value,
  setValue,
  onClick,
}: Props) => {
  return (
    <div className="p-5 h-full w-full flex flex-col justify-between flex-shrink-0">
      <hgroup>
        <p className="text-lg font-bold text-c1-300 opacity-80">Q{idx}.</p>
        <p className="text-lg font-bold opacity-70">{type}</p>
        <p className="text-center text-lg font-medium opacity-80">{question}</p>
      </hgroup>
      <div className="pt-28 h-full">
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full py-12 text-lg font-bold opacity-80 rounded-full px-20 tracking-wide"
          />
          <span className="absolute right-10 -translate-y-1/2 top-1/2 text-lg font-bold opacity-70">
            만원
          </span>
        </div>
      </div>
      <div className="mt-40 h-16">
        <NextButton
          isDisabled={value == ""}
          className="rounded-sm w-full"
          onClick={onClick}
        />
      </div>
    </div>
  );
};
