import Image from "next/image";
import { Baloo_2 } from "next/font/google";
import Link from "next/link";
import LogoIcon from "../icons/LogoIcon";

const ballo2 = Baloo_2({ subsets: ["latin"] });

export default function Logo() {
  return (
    <Link href="/" className="flex">
      <span className={"mt-auto text-xl font-semibold " + ballo2.className}>
        PicTok
      </span>
      <LogoIcon />
      {/* <Image
        src="/images/assets/pictok.png"
        className="mb-5"
        alt="Pictok Logo"
        width={40}
        height={40}
      /> */}
    </Link>
  );
}
