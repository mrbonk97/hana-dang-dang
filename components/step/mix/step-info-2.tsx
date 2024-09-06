import { StepTemplate } from "@/components/step/step-template";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

interface StepProps {
  state: string | undefined;
  setState: Dispatch<SetStateAction<string>>;
  onNext: () => void;
}

export const StepInfo2 = ({ state, setState, onNext }: StepProps) => {
  return (
    <StepTemplate
      title="고객님의 총 연소득은 얼마입니까?"
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
