"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import createSelectors from "@/zustand/selectors";
import store from "@/zustand/store";
import Link from "next/link";

export const UserAvatar = () => {
  const user = createSelectors(store).use.user();
  console.log(user?.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ring-0 focus-visible:ring-0 focus-visible:outline-none">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/sign-out"}>로그아웃</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
