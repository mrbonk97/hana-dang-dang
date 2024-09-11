import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const stockId = req.nextUrl.searchParams.get("stock");
  if (stockId == null || stockId == undefined) throw "종목 코드를 넣어주세요";

  const BASE_URL =
    "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-price?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=Q500001&FID_PERIOD_DIV_CODE=D&FID_ORG_ADJ_PRC=0";

  const q1 = "FID_COND_MRKT_DIV_CODE=J";
  const q2 = "FID_INPUT_ISCD=" + stockId;
  const q3 = "FID_PERIOD_DIV_CODE=D";
  const q4 = "FID_ORG_ADJ_PRC=0";

  const URL = BASE_URL + "?" + q1 + "&" + q2 + "&" + q3 + "&" + q4;

  const result = await axios.get(URL, {
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjJjMzg3MDYwLTljNTgtNDI1Ny05ZDA5LWZlYTJjM2M3ZTZhMCIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcyNTkyNjk3MiwiaWF0IjoxNzI1ODQwNTcyLCJqdGkiOiJQUzRWb1g1S3RQUGVCdlZXVjBoc241TUFvdU5samxscXRGTWEifQ.906naujHiCSPjFLICzLZYSwKN32qtwpHRLxXBIvuOnqBDjffgwZSRbNFmbFpojwkdUuaOU-r6GgFDr8E-d7qYw",
      "content-type": "application/json; charset=utf-8",
      appkey: "PS4VoX5KtPPeBvVWV0hsn5MAouNljllqtFMa",
      appsecret:
        "tDSJE/HOO7fDgxPkr7XhsNwoiyUJ9vkPvlz4xHtM3unQ6poQaCp+bwpHaxQk/WMpzLWZtcTQygabLg6GAUT+gKNq+AV68eye8xGvOiVaEq2ZlS3ztLBdPj7wz3a4YkDT6yd9ODeS7UoqNANC3h7CixtFRgYlFXJhYjS4W0BJYZXxhdHo19Q=",
      tr_id: "FHKST01010400",
    },
  });

  return NextResponse.json(result.data);
};
