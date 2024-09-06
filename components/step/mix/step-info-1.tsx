import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { StepTemplate } from "../step-template";

interface StepProps {
  state: string | null;
  setState: Dispatch<SetStateAction<string>>;
  onNext: () => void;
}

export const StepInfo1 = ({ state, setState, onNext }: StepProps) => {
  return (
    <StepTemplate
      title="소재지를 선택해주세요"
      onNext={onNext}
      isDisabled={state == ""}
    >
      <Button
        aria-selected={state == "yes"}
        onClick={() => setState("yes")}
        className="py-6 px-10"
      >
        수도권
      </Button>
      <Button
        aria-selected={state == "no"}
        onClick={() => setState("no")}
        className="py-6 px-10"
      >
        수도권 외
      </Button>
    </StepTemplate>
  );
};
