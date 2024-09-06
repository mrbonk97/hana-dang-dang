import { StepTemplate } from "@/components/step/step-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

interface StepProps {
  state: string | undefined;
  setState: Dispatch<SetStateAction<string>>;
  onNext: () => void;
}

export const StepInfo4 = ({ state, setState, onNext }: StepProps) => {
  return (
    <StepTemplate
      title="대출접수일 기준 출생 후 2년 미만인 미성년 자녀는 몇명 입니까?"
      onNext={onNext}
      isDisabled={state == ""}
    >
      <Button
        aria-selected={state == "0"}
        onClick={() => setState("0")}
        className="py-6 px-10"
        variant={"custom"}
      >
        없음
      </Button>
      <Button
        aria-selected={state == "1"}
        onClick={() => setState("1")}
        className="py-6 px-10"
        variant={"custom"}
      >
        1명
      </Button>
      <Button
        aria-selected={state == "2"}
        onClick={() => setState("2")}
        className="py-6 px-10"
        variant={"custom"}
      >
        2명
      </Button>
      <Button
        aria-selected={state == "3"}
        onClick={() => setState("3")}
        className="py-6 px-10"
        variant={"custom"}
      >
        3명
      </Button>
    </StepTemplate>
  );
};
