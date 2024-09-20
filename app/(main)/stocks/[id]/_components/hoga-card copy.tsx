// "use client";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { decodeStockHoka, formatNumber } from "@/lib/utils";
// import { useEffect, useRef } from "react";

// const WS_URL = "ws://ops.koreainvestment.com:21000";
// interface HogaCardProps {
//   id: string;
// }

// export const HokaCard = ({ id }: HogaCardProps) => {
//   const socket = useRef<WebSocket>();

//   // prettier-ignore
//   const sellPriceRefs = Array.from({ length: 10 }, () => useRef<HTMLDivElement>(null));
//   // prettier-ignore
//   const sellRemainRefs = Array.from({ length: 10 }, () => useRef<HTMLDivElement>(null));
//   // prettier-ignore
//   const sellRemainValueRefs = Array.from({ length: 10 }, () => useRef<HTMLDivElement>(null));
//   // prettier-ignore
//   const buyPriceRefs = Array.from({ length: 10 }, () => useRef<HTMLDivElement>(null));
//   // prettier-ignore
//   const buyRemainRefs = Array.from({ length: 10 }, () => useRef<HTMLDivElement>(null));
//   // prettier-ignore
//   const buyRemainValueRefs = Array.from({ length: 10 }, () => useRef<HTMLDivElement>(null));

//   const CONNECT_MESSAGE = {
//     header: {
//       approval_key: process.env.NEXT_PUBLIC_HANTU_APPROVAL_KEY,
//       custtype: "P",
//       tr_type: "1",
//       "content-type": "utf-8",
//     },
//     body: {
//       input: {
//         tr_id: "H0STASP0",
//         tr_key: id,
//       },
//     },
//   };

//   useEffect(() => {
//     const startWebSocket = () => {
//       socket.current = new WebSocket(WS_URL);

//       socket.current.onopen = () => {
//         if (socket.current?.readyState === 1) {
//           socket.current?.send(JSON.stringify(CONNECT_MESSAGE));
//           console.log("소켓 연결 시도");
//         }
//       };

//       socket.current.onmessage = (e) => {
//         const data2 = decodeStockHoka(e.data);
//         console.log(e.data);

//         // 매도 호가
//         data2.sell.map((item, idx) => {
//           if (sellPriceRefs[idx].current != undefined)
//             sellPriceRefs[idx].current.innerText =
//               formatNumber(item.price) + "원";
//           if (sellRemainValueRefs[idx].current != undefined)
//             sellRemainValueRefs[idx].current.innerText = formatNumber(
//               item.remain
//             );
//           if (sellRemainRefs[idx].current != undefined)
//             sellRemainRefs[idx].current.style.width = `${
//               (item.remain / data2.totalSellRemain) * 100
//             }%`;
//         });

//         // 매수 호가
//         data2.buy.map((item, idx) => {
//           if (buyPriceRefs[idx].current != undefined)
//             buyPriceRefs[idx].current.innerText =
//               formatNumber(item.price) + "원";
//           if (buyRemainValueRefs[idx].current != undefined)
//             buyRemainValueRefs[idx].current.innerText = formatNumber(
//               item.remain
//             );
//           if (buyRemainRefs[idx].current != undefined)
//             buyRemainRefs[idx].current.style.width = `${
//               (item.remain / data2.totalBuyRemain) * 100
//             }%`;
//         });
//       };

//       socket.current.onclose = (e) => {
//         if (e.wasClean == false) {
//           setTimeout(() => startWebSocket(), 500);
//           console.log("다시연결요청");
//         }
//       };
//     };

//     startWebSocket;

//     return () => {
//       if (socket.current == null) return;

//       if (socket.current.readyState === 1) {
//         socket.current.close();
//       }
//     };
//   }, []);

//   return (
//     <Card className="w-1/4">
//       <CardHeader>
//         <CardTitle>호가</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ul className="font-medium opacity-80 space-y-1 text-blue-500">
//           {Array.from({ length: 10 }).map((_, idx) => (
//             <li key={`sell-${idx}`} className="flex gap-2">
//               <div className="w-full bg-blue-100 flex justify-end rounded-sm">
//                 <div
//                   ref={sellRemainRefs[idx]}
//                   className="h-6 bg-blue-200 rounded-sm rounded-l-lg relative"
//                 >
//                   <span
//                     ref={sellRemainValueRefs[idx]}
//                     className="absolute -left-20"
//                   />
//                 </div>
//               </div>
//               <div
//                 ref={sellPriceRefs[idx]}
//                 className="text-right w-20 flex-shrink-0"
//               />
//             </li>
//           ))}
//         </ul>
//         <Separator className="my-5" />
//         <ul className="font-medium opacity-80 space-y-1 text-rose-500">
//           {Array.from({ length: 10 }).map((_, idx) => (
//             <li key={`buy-${idx}`} className="flex gap-2">
//               <div ref={buyPriceRefs[idx]} className="flex-shrink-0 w-20" />

//               <div className="w-full bg-rose-100 rounded-sm">
//                 <div
//                   ref={buyRemainRefs[idx]}
//                   className="w-0 relative h-6 bg-rose-300 rounded-sm rounded-r-lg"
//                 >
//                   <span
//                     ref={buyRemainValueRefs[idx]}
//                     className="absolute left-20"
//                   />
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </CardContent>
//     </Card>
//   );
// };
