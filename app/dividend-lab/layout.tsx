import { Leftnav } from "@/components/nav/left-nav";
import { Topnav } from "@/components/nav/top-nav";

interface DividendLabProps {
  children: React.ReactNode;
}
const MainLayout = ({ children }: DividendLabProps) => {
  return (
    <>
      <Topnav />
      <Leftnav />
      {children}
    </>
  );
};

export default MainLayout;
