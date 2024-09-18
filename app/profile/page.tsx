import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CopyIcon,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountCard } from "./_components/account-card";
import { TransactionCard } from "./_components/transaction-card";
import { AccountTransactionCard } from "./_components/account-transaction-card";

const ProfilePage = () => {
  return (
    <main className="py-14 pl-24 pr-4">
      <section className="px-5 lg:px-[20%] py-10 border-b">
        <h1 className="text-center font-bold opacity-60">총 자산</h1>
        <h2 className="mt-1 text-center text-2xl font-bold opacity-80">
          28,637,333원
        </h2>
        <div className="mt-16 flex justify-evenly gap-20">
          <div className="font-medium">
            <h4 className="text-sm text-right opacity-60">예수금</h4>
            <p className="text-lg text-right opacity-80">29,238원</p>
          </div>
          <div className="font-medium">
            <h4 className="text-sm text-right opacity-60">출금가능금액</h4>
            <p className="text-lg text-right opacity-80">29,238원</p>
          </div>
          <div className="font-medium">
            <h4 className="text-sm text-right opacity-60">손익</h4>
            <p className="text-lg text-right opacity-80 text-blue-500">
              -88,009원
            </p>
          </div>

          <div className="font-medium">
            <h4 className="text-sm text-right opacity-60">수익률</h4>
            <p className="text-lg text-right opacity-80 text-blue-500">
              -0.30%
            </p>
          </div>
        </div>
      </section>
      <div className="p-10 w-full flex flex-col justify-center items-center gap-10">
        <section className="w-full max-w-[1000px] flex justify-between gap-10">
          <TransactionCard />
          <AccountCard />
        </section>
        <section className="w-full max-w-[1000px] flex justify-center gap-10">
          <AccountTransactionCard />
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
