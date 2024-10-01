import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

interface DetailCardProps {
  data: {
    bstp_nmix_prdy_vrss: string;
    prdy_vrss_sign: string;
    bstp_nmix_prdy_ctrt: string;
    prdy_nmix: string;
    acml_vol: string;
    acml_tr_pbmn: string;
    hts_kor_isnm: string;
    bstp_nmix_prpr: string;
    bstp_cls_code: string;
    prdy_vol: string;
    bstp_nmix_oprc: string;
    bstp_nmix_hgpr: string;
    bstp_nmix_lwpr: string;
    futs_prdy_oprc: string;
    futs_prdy_hgpr: string;
    futs_prdy_lwpr: string;
  };
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
