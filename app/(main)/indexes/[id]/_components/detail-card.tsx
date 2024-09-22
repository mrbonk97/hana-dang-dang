import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { IndexInfoType } from "@/type";

interface DetailCardProps {
  data: IndexInfoType;
}

export const DetailCard = ({ data }: DetailCardProps) => {
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="opacity-80">상세정보</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          <ListItem label="현재가" value={data.bstp_nmix_prpr} />
          <ListItem label="최고가" value={data.bstp_nmix_hgpr} />
          <ListItem label="최저가" value={data.bstp_nmix_lwpr} />
          <ListItem label="누적 거래 대금" value={data.acml_tr_pbmn} />
          <ListItem label="누적 거래량" value={data.acml_vol} />
        </ul>
      </CardContent>
    </Card>
  );
};

interface ListItemProps {
  label: string;
  value: string;
}

const ListItem = ({ label, value }: ListItemProps) => {
  return (
    <li className="flex justify-between opacity-70">
      <span className="">{label}</span>
      <span className="font-medium text-right">
        {formatNumber(parseFloat(value))}
      </span>
    </li>
  );
};
