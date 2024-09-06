import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { NextButton } from "../next-button";

interface StepProps {
  title: string;
  buttonTitle?: string;
  children?: React.ReactNode;
  isDisabled?: boolean;
  onNext: () => void;
}

export const StepTemplate = ({
  title,
  buttonTitle,
  children,
  isDisabled = false,
  onNext,
}: StepProps) => {
  return (
    <Card
      role="group"
      aria-roledescription="slide"
      className="min-h-96 min-w-0 shrink-0 grow-0 basis-full w-full border-none rounded-none shadow-none"
    >
      <CardTitle className="opacity-70 break-keep">{title}</CardTitle>
      <CardContent className="mt-10 min-h-60 flex flex-col items-center gap-10">
        {children}
      </CardContent>
      <CardFooter className="justify-center">
        <NextButton
          onClick={onNext}
          className="mt-10"
          text={buttonTitle}
          isDisabled={isDisabled}
        />
      </CardFooter>
    </Card>
  );
};
