import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  data: {
    record_date: string;
    sht_cd: string;
    isin_name: string;
    gen_meet_dt: string;
    gen_meet_type: string;
    agenda: string;
    vote_tot_qty: string;
  }[];
}

export function BoardMeeting({ data }: Props) {
  const latest = new Date(data[0].gen_meet_dt);
  const today = new Date();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="opacity-80">주주총회 일정</CardTitle>
        <CardDescription className="pt-1 text-lg font-medium">
          {latest < today
            ? "다가오는 주주총회 일정이 없습니다."
            : `다음 주주총회는 ${data[0].gen_meet_dt} 입니다.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-scroll">
        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableHead>주총일자</TableHead>
              <TableHead>주총사유</TableHead>
              <TableHead>주총의안</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.record_date}>
                <TableCell>{item.gen_meet_dt}</TableCell>
                <TableCell>{item.gen_meet_type}</TableCell>
                <TableCell>{item.agenda}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
