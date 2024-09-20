import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-1">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={32}
        height={32}
        style={{ width: "auto", height: "100%" }}
      />
      <span className="text-lg font-bold opacity-70">하나당당</span>
    </Link>
  );
};
