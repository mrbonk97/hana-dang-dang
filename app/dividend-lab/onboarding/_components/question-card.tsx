import { Button } from "@/components/ui/button";

interface Props {
  idx: number;
  type: string;
  question: string;
  answers: {
    ans: string;
    onClick: () => void;
  }[];
}
export const QuestionCard = ({ idx, type, question, answers }: Props) => {
  return (
    <div className="p-5 h-full w-full flex flex-col justify-between flex-shrink-0">
      <hgroup>
        <p className="text-lg font-bold text-c1-300 opacity-80">Q{idx}.</p>
        <p className="text-lg font-bold opacity-70">{type}</p>
        <p className="text-center text-lg font-medium opacity-80">{question}</p>
      </hgroup>
      <div className="w-full flex flex-col gap-2">
        {answers.map((item, key) => (
          <Button
            key={`${idx}-${key}`}
            className="py-8 text-lg font-bold w-full"
            onClick={item.onClick}
          >
            {item.ans}
          </Button>
        ))}
      </div>
    </div>
  );
};
