import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/main"} className="flex items-center gap-1">
      <Image src={"/logo.png"} alt="logo" width={36} height={36} />
      <span className="text-lg font-bold opacity-70">하나당당</span>
    </Link>
  );
};
