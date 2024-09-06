import { StepTemplate } from "@/components/step/step-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

interface StepProps {
  state: string | undefined;
  setState: Dispatch<SetStateAction<string>>;
  onNext: () => void;
}

export const StepInfo3 = ({ state, setState, onNext }: StepProps) => {
  return (
    <StepTemplate
      title="금리 우대 해당 사항을 선택해 주세요."
      onNext={onNext}
      isDisabled={state == ""}
    >
      <Button
        aria-selected={state == "부동산전자계약"}
        onClick={() => setState("부동산전자계약")}
        className="py-6 px-10"
        variant={"custom"}
      >
        부동산전자계약
      </Button>
      <Button
        aria-selected={state == "없음"}
        onClick={() => setState("없음")}
        className="py-6 px-10"
        variant={"custom"}
      >
        없음
      </Button>
    </StepTemplate>
  );
};
