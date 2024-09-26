import { Leftnav } from "@/components/nav/left-nav";
import { Topnav } from "@/components/nav/top-nav";
import { UsaStockNav } from "./_components/usa-stock-nav";

interface UsaStockLayoutProps {
  children: React.ReactNode;
}
const UsaStockLayout = ({ children }: UsaStockLayoutProps) => {
  return (
    <>
      <Topnav />
      <Leftnav />
      <UsaStockNav />
      {children}
    </>
  );
};

export default UsaStockLayout;
