import { StepTemplate } from "@/components/step/step-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

interface StepProps {
  state: string | undefined;
  setState: Dispatch<SetStateAction<string>>;
  onNext: () => void;
}

export const StepInfo6 = ({ state, setState, onNext }: StepProps) => {
  return (
    <StepTemplate
      title="고객님(신청인)의 계약서상 전세 보증금액 또는 예상금액은 얼마 입니까?"
      onNext={onNext}
      isDisabled={state == ""}
    >
      <Input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="소득을 입력해주세요"
      />
    </StepTemplate>
  );
};
