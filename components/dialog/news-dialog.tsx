import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface NewsDialogProps {
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  children: React.ReactNode;
}

export const NewsDialog = ({
  title,
  content,
  imageUrl,
  children,
  createdAt,
}: NewsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div>
          <Image src={imageUrl} alt="news" width={256} height={256} />
          <p className="whitespace-pre-line leading-relaxed">{content}</p>
        </div>
        <DialogFooter className="w-full">
          <DialogClose>
            <Button className="py-7 px-10" variant={"secondary"}>
              원본으로 이동
            </Button>
          </DialogClose>
          <DialogClose>
            <Button className="py-7 px-10">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
