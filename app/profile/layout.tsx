import { Topnav } from "@/components/nav/top-nav";
import { Leftnav } from "@/components/nav/left-nav";

interface ProfileLayoutProps {
  children: React.ReactNode;
}
const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <>
      <Topnav />
      <Leftnav />
      {children}
    </>
  );
};

export default ProfileLayout;
