import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Topnav } from "@/components/nav/top-nav";
import QueryProvider from "@/tanstack-query/query-provider";
import { Leftnav } from "@/components/nav/left-nav";
import { Leftnav2 } from "@/components/nav/left-nav-2";

const inter = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "하나당당",
  description: "배당주 관리 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className + " min-h-[600px]"}>
        <QueryProvider>
          <Topnav />
          <Leftnav />
          <Leftnav2 />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
