import { cn } from "@/lib/utils";

interface NextButtonProps {
  text?: string;
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}
export const NextButton = ({
  text = "다음 단계",
  className,
  isDisabled = false,
  onClick,
}: NextButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-16 w-96 rounded-3xl text-lg font-medium overflow-hidden duration-500 bg-c1-300 disabled:bg-primary/50 text-primary-foreground hover:opacity-80 disabled:opacity-100",
        className
      )}
      disabled={isDisabled}
    >
      <div className={`h-[200%] w-full duration-500 ${isDisabled && "-mt-16"}`}>
        <div className="h-1/2 flex2">{text}</div>
        <div className="h-1/2 flex2">선택해주세요</div>
      </div>
    </button>
  );
};
