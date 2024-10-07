import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Squirrel } from "lucide-react";

export const GosuDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-10 w-full py-6">시작하기</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>서비스 준비중</DialogTitle>
        </DialogHeader>
        <p className="pt-5 text-lg font-medium opacity-80 text-center">
          해당 기능은 아직 준비중입니다.
        </p>
        <div className="py-5 flex justify-center">
          <Squirrel size={128} className="text-c1-300 flip-box" />
        </div>
        <DialogFooter>
          <DialogClose className="w-full">
            <Button className="w-full py-6">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
