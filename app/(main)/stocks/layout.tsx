import { Leftnav } from "@/components/nav/left-nav";
import { Leftnav2 } from "@/components/nav/left-nav-2";

interface StocksLayoutProps {
  children: React.ReactNode;
}
const MainLayout = ({ children }: StocksLayoutProps) => {
  return (
    <>
      <Leftnav />
      <Leftnav2 />
      {children}
    </>
  );
};

export default MainLayout;
