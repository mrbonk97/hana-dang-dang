import { Leftnav } from "@/components/nav/left-nav";
import { Leftnav2 } from "@/components/nav/left-nav-2";
import { Topnav } from "@/components/nav/top-nav";

interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Topnav />
      <Leftnav />
      <Leftnav2 />
      {children}
    </>
  );
};

export default MainLayout;
