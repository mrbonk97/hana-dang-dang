import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/utils";
import { Index2Type } from "@/type";
import Link from "next/link";

interface IndexListCardProps {
  data: Index2Type[];
}
export const IndexListCard = ({ data }: IndexListCardProps) => {
  return (
    <Card className="h-full border">
      <CardHeader>
        <CardTitle className="opacity-80">급상승 지수 🔥</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          <li className="p-2 rounded-lg grid grid-cols-5 font-bold opacity-80 text-sm gap-x-1">
            <span className="col-span-3">지수</span>
            <span className="col-span-1 text-right">전일대비</span>
            <span className="col-span-1 text-right">현재가</span>
          </li>
          <Separator />
          {data
            .sort(
              (a, b) =>
                parseFloat(b.bstp_nmix_prdy_ctrt) -
                parseFloat(a.bstp_nmix_prdy_ctrt)
            )
            .slice(0, 7)
            .map((item) => {
              return (
                <ListItem
                  key={item.bstp_cls_code}
                  code={item.bstp_cls_code}
                  prdr_vrss={item.bstp_nmix_prdy_vrss}
                  prdr_ctcr={item.bstp_nmix_prdy_ctrt}
                  label={item.hts_kor_isnm}
                  value={item.bstp_nmix_prpr}
                />
              );
            })}
        </ul>
      </CardContent>
    </Card>
  );
};

interface ListItemProps {
  code: string;
  label: string;
  prdr_vrss: string;
  prdr_ctcr: string;
  value: string;
}

const ListItem = ({
  code,
  label,
  prdr_vrss,
  prdr_ctcr,
  value,
}: ListItemProps) => {
  return (
    <Link
      role="list"
      href={`/indexes/${code}`}
      className="hover:bg-secondary duration-150 p-2 rounded-lg grid grid-cols-5 opacity-70 text-sm font-medium gap-x-1"
    >
      <span className="col-span-3 max-w-44 overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </span>
      <span className="col-span-1 text-right text-rose-500">
        {formatNumber(parseFloat(prdr_ctcr))}%
      </span>
      <span className="col-span-1 text-right">
        {formatNumber(parseFloat(value))}
      </span>
    </Link>
  );
};
